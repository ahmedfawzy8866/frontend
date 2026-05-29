"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceManager = void 0;
const eventemitter3_1 = require("eventemitter3");
const vscode = require("vscode");
const thenby_1 = require("thenby");
const roku_deploy_1 = require("roku-deploy");
const util_1 = require("roku-debug/dist/util");
const RokuFinder_1 = require("./RokuFinder");
const NetworkChangeMonitor_1 = require("./NetworkChangeMonitor");
const SystemSleepMonitor_1 = require("./SystemSleepMonitor");
const util_2 = require("../util");
const VscodeContextManager_1 = require("../managers/VscodeContextManager");
const lodash_1 = require("lodash");
class DeviceManager {
    // #region constructor
    constructor(context, globalStateManager) {
        this.context = context;
        this.globalStateManager = globalStateManager;
        // #endregion
        // Core state and dependencies
        this.devices = [];
        this.scanNeeded = false;
        this.lastUsedDeviceIp = undefined;
        this.emitter = new eventemitter3_1.EventEmitter();
        this.finder = new RokuFinder_1.RokuFinder();
        // Health check tracking and cooldowns
        this.lastHealthCheckTime = new Map();
        this.resolveDeviceSequence = new Map();
        this.HEALTH_CHECK_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
        // Device info caching (reduces redundant network calls)
        this.DEVICE_INFO_CACHE_TTL_MS = 5000; // 5 seconds
        this.CACHE_CLEANUP_DELAY_MS = 10000; // 10 seconds of inactivity
        this.deviceInfoCache = new Map();
        this.cacheCleanupTimer = null;
        // Notifications and event debouncing
        this.DEVICES_CHANGED_DEBOUNCE_MS = 50;
        this.deviceOnlineNotifiers = new Map();
        // Scan state management
        this.STALE_SCAN_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes
        this.lastScanDate = null;
        this.emitDevicesChanged = throttleBounce(() => {
            this.emitter.emit('devices-changed');
        }, this.DEVICES_CHANGED_DEBOUNCE_MS);
        this.networkId = (0, NetworkChangeMonitor_1.getNetworkHash)();
        this.setupConfiguration();
        this.setupWindowFocusHandling();
        this.setupMonitors();
        this.initialize();
        this.context.subscriptions.push(this);
    }
    setupConfiguration() {
        const applyConfig = (event) => {
            var _a;
            let config = util_2.util.getConfiguration('brightscript') || {};
            void VscodeContextManager_1.vscodeContextManager.set('brightscript.deviceDiscovery.enabled', (_a = config.deviceDiscovery) === null || _a === void 0 ? void 0 : _a.enabled);
            //if the `deviceDiscovery.enabled` setting was changed, start or stop monitoring
            if (event === null || event === void 0 ? void 0 : event.affectsConfiguration('brightscript.deviceDiscovery.enabled')) {
                if (this.deviceDiscoveryEnabled) {
                    //emit that we need a scan (will trigger UI to refresh and show devices as needed when enabled)
                    this.setScanNeeded(true);
                    this.systemSleepMonitor.start();
                    void this.activateMonitoring();
                }
                else {
                    this.systemSleepMonitor.stop();
                    this.deactivateMonitoring();
                }
            }
            //if the `concealDeviceInfo` setting was changed, refresh the UI (no reload needed)
            if (event === null || event === void 0 ? void 0 : event.affectsConfiguration('brightscript.deviceDiscovery.concealDeviceInfo')) {
                this.emitDevicesChanged();
            }
            //if the `devices` setting was changed, re-apply configured devices
            if (event === null || event === void 0 ? void 0 : event.affectsConfiguration('brightscript.devices')) {
                this.loadConfiguredDevices().then(() => {
                    this.emitDevicesChanged();
                }).catch(() => { });
            }
        };
        this.context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(applyConfig));
        applyConfig();
    }
    setupWindowFocusHandling() {
        this.context.subscriptions.push(vscode.window.onDidChangeWindowState((state) => {
            if (state.focused) {
                this.notifyFocusGained();
            }
            else {
                this.notifyFocusLost();
            }
        }));
    }
    setupMonitors() {
        this.systemSleepMonitor = new SystemSleepMonitor_1.SystemSleepMonitor(() => {
            this.setScanNeeded();
        });
        this.networkChangeMonitor = new NetworkChangeMonitor_1.NetworkChangeMonitor(() => {
            this.networkId = (0, NetworkChangeMonitor_1.getNetworkHash)();
            this.deviceInfoCache.clear();
            this.loadLastSeenDevices();
            this.setScanNeeded();
        });
    }
    initialize() {
        //clear any deviceInfo entries older than our max age
        this.globalStateManager.clearExpiredDevices();
        // Load configured devices and cached devices (order doesn't matter due to setDevice merge logic)
        this.loadConfiguredDevices().catch(() => { });
        this.loadLastSeenDevices();
        /**
         * Set up event listeners for the RokuFinder.
         * This must be called regardless of passiveScanPermitted so that
         * active scan responses are processed.
         */
        this.finder.removeAllListeners();
        this.finder.on('found', (ip, options) => {
            void this.processDiscoveredIp(ip, options === null || options === void 0 ? void 0 : options.serialNumber);
        });
        this.finder.on('device-online', (ip, serialNumber) => {
            this.handleDeviceOnline(ip, serialNumber);
        });
        this.finder.on('lost', (ip) => {
            // Find and remove device by IP
            const device = this.getDeviceEntry({ ip: ip });
            if (device) {
                this.removeDevice(device.ip);
            }
        });
        // Forward scan events from RokuFinder
        this.finder.on('scan-started', () => {
            this.emitter.emit('scan-started');
        });
        this.finder.on('scan-ended', () => {
            this.emitter.emit('scan-ended');
        });
        if (this.deviceDiscoveryEnabled) {
            // Sleep monitor runs all the time when enabled (ignores focus state)
            this.systemSleepMonitor.start();
            this.activateMonitoring().then(() => {
                const lastSeenDeviceIds = this.globalStateManager.getLastSeenDevices(this.networkId);
                if (lastSeenDeviceIds.length === 0) {
                    this.refresh();
                }
                else {
                    this.setScanNeeded();
                }
            }).catch((e) => {
                console.error(e);
            });
        }
    }
    on(eventName, handler, disposables) {
        this.emitter.on(eventName, handler);
        const unsubscribe = () => {
            if (this.emitter !== undefined) {
                this.emitter.removeListener(eventName, handler);
            }
        };
        disposables === null || disposables === void 0 ? void 0 : disposables.push({
            dispose: unsubscribe
        });
        return unsubscribe;
    }
    getDevice(keyOrLookup) {
        var _a;
        // Normalize input to lookup object
        let lookup;
        if (typeof keyOrLookup === 'string') {
            // Decode string key - require explicit "s:" or "i:" prefix
            if (keyOrLookup.startsWith('s:')) {
                const serial = keyOrLookup.slice(2);
                if (!serial) {
                    return undefined;
                }
                lookup = { serialNumber: serial };
            }
            else if (keyOrLookup.startsWith('i:')) {
                const ip = keyOrLookup.slice(2);
                if (!ip) {
                    return undefined;
                }
                lookup = { ip: ip };
            }
            else {
                return undefined;
            }
        }
        else {
            lookup = keyOrLookup;
        }
        const device = this.getDeviceEntry(lookup);
        if (!device) {
            return undefined;
        }
        // Hydrate deviceInfo from cache (use getSerial for fallback to IP→serial mapping)
        const serial = this.getSerial(device);
        const cached = serial ? this.globalStateManager.getCachedDevice(serial) : undefined;
        return {
            ...device,
            deviceInfo: (_a = cached === null || cached === void 0 ? void 0 : cached.deviceInfo) !== null && _a !== void 0 ? _a : {}
        };
    }
    /**
     * Get a list of all roku devices known by this extension (by scanning, hardcoded lists, etc)
     * Returns full devices with deviceInfo hydrated from cache.
     * Configured devices are sorted first, then by form factor, name, and id.
     */
    getAllDevices() {
        // Hydrate each device using getDevice()
        const devices = [];
        for (const device of this.devices) {
            const deviceDetail = this.getDevice({ ip: device.ip });
            if (deviceDetail) {
                devices.push(deviceDetail);
            }
        }
        return devices.sort(
        // Sort by form factor
        (0, thenby_1.firstBy)((a, b) => {
            return this.getPriorityForDeviceFormFactor(a.deviceInfo) - this.getPriorityForDeviceFormFactor(b.deviceInfo);
            // Then by name
        }).thenBy((a, b) => {
            const nameA = a.deviceInfo['default-device-name'] || '';
            const nameB = b.deviceInfo['default-device-name'] || '';
            return nameA.localeCompare(nameB);
        }).thenBy((a, b) => {
            const serialA = a.serialNumber || '';
            const serialB = b.serialNumber || '';
            if (serialA < serialB) {
                return -1;
            }
            if (serialA > serialB) {
                return 1;
            }
            // serial numbers must be equal
            return 0;
        }));
    }
    /**
     * Check if a device has cached info (has been successfully resolved before).
     * Used by view providers to determine icon: warning (no cache) vs disconnect (has cache).
     */
    hasDeviceCache(serialNumber) {
        return !!this.globalStateManager.getCachedDevice(serialNumber);
    }
    /**
     * Re-scan the network for devices and health-check existing ones
     */
    refresh(force = false) {
        this.checkDevicesHealth(force).catch(() => { });
        // Block automatic scans when device discovery is disabled
        if (!force && !this.deviceDiscoveryEnabled) {
            return false;
        }
        return this.discoverAll(force);
    }
    /**
     * Clear discovered devices from the device list, keeping configured devices.
     * Useful for refreshing the network scan without losing user-configured devices.
     */
    clearCurrentDeviceList() {
        // Keep configured devices, remove discovered-only devices
        this.devices = this.devices.filter(d => d.isConfigured);
        // Clear short-lived device info cache
        this.deviceInfoCache.clear();
        // Only clear lastUsedDeviceIp if it belonged to a discovered device that was removed
        if (this.lastUsedDeviceIp && !this.devices.some(d => d.ip === this.lastUsedDeviceIp)) {
            this.lastUsedDeviceIp = undefined;
        }
        this.emitDevicesChanged();
    }
    clearAllCache() {
        // Stop any in-progress scan (finder.stop() emits scan-ended if scanning)
        this.finder.stop();
        // Clear current device list
        this.clearCurrentDeviceList();
        // Clear global state
        this.globalStateManager.clearLastSeenDevices();
        this.globalStateManager.clearDeviceCache();
        this.globalStateManager.clearSerialNumberByIpForNetwork();
        // Clear all timestamps and per-device state
        this.lastScanDate = null;
        this.lastHealthCheckTime.clear();
        this.resolveDeviceSequence.clear();
        // Clear cache cleanup timer
        if (this.cacheCleanupTimer) {
            clearTimeout(this.cacheCleanupTimer);
            this.cacheCleanupTimer = null;
        }
    }
    async checkDeviceHealth(deviceOrLookup, force = false, doSyntheticDelay = true) {
        var _a;
        // If already a device object with deviceState, use it directly; otherwise look it up
        const device = 'deviceState' in deviceOrLookup
            ? deviceOrLookup
            : this.getDevice(deviceOrLookup);
        if (!device) {
            return false;
        }
        // If not forcing, respect the per-device cooldown
        if (!force) {
            const lastCheck = (_a = this.lastHealthCheckTime.get(device.ip)) !== null && _a !== void 0 ? _a : 0;
            const now = Date.now();
            if (now - lastCheck <= this.HEALTH_CHECK_COOLDOWN_MS) {
                return true;
            }
            this.lastHealthCheckTime.set(device.ip, now);
        }
        const isHealthy = await this.resolveDevice(device, doSyntheticDelay);
        if (!isHealthy) {
            // force a scan if passive scan is permitted
            this.refresh(this.deviceDiscoveryEnabled);
        }
        return isHealthy;
    }
    getLastUsedDeviceIp() {
        return this.lastUsedDeviceIp;
    }
    setLastUsedDeviceIp(value) {
        this.lastUsedDeviceIp = value;
    }
    dispose() {
        var _a, _b, _c, _d, _e, _f;
        this.deactivateMonitoring();
        (_b = (_a = this.systemSleepMonitor) === null || _a === void 0 ? void 0 : _a.dispose) === null || _b === void 0 ? void 0 : _b.call(_a);
        (_d = (_c = this.networkChangeMonitor) === null || _c === void 0 ? void 0 : _c.dispose) === null || _d === void 0 ? void 0 : _d.call(_c);
        (_f = (_e = this.finder) === null || _e === void 0 ? void 0 : _e.dispose) === null || _f === void 0 ? void 0 : _f.call(_e);
        this.devices = [];
        this.emitter.removeAllListeners();
        //clear any timeouts
        clearTimeout(this.cacheCleanupTimer);
    }
    /**
     * Is device discovery enabled (i.e. passive scans are permitted)
     */
    get deviceDiscoveryEnabled() {
        var _a, _b, _c;
        return (_c = (_b = (_a = util_2.util.getConfiguration('brightscript')) === null || _a === void 0 ? void 0 : _a.deviceDiscovery) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : true;
    }
    /**
     * Should info messages be shown when new devices are discovered (e.g. "Device found: Roku TV")?
     */
    get showInfoMessages() {
        var _a, _b, _c;
        return (_c = (_b = (_a = util_2.util.getConfiguration('brightscript')) === null || _a === void 0 ? void 0 : _a.deviceDiscovery) === null || _b === void 0 ? void 0 : _b.showInfoMessages) !== null && _c !== void 0 ? _c : true;
    }
    /**
     * Get device reference from array (lightweight, no cache lookup).
     * For internal use only - doesn't hydrate from cache.
     *
     * @param lookup - Object with optional ip and/or serialNumber
     * @returns Device reference from array or undefined
     */
    getDeviceEntry(lookup) {
        if (!lookup.ip && !lookup.serialNumber) {
            return undefined;
        }
        if (lookup.ip && lookup.serialNumber) {
            // Both provided: Must match both
            return this.devices.find(d => d.ip === lookup.ip && this.getSerial(d) === lookup.serialNumber);
        }
        else if (lookup.ip) {
            // IP only: Match by IP (primary key)
            return this.devices.find(d => d.ip === lookup.ip);
        }
        else if (lookup.serialNumber) {
            // Serial only: Match by serial in deviceInfo
            return this.devices.find(d => this.getSerial(d) === lookup.serialNumber);
        }
        return undefined;
    }
    /**
     * Get serial number for a device.
     * Checks device.serialNumber first, falls back to IP→serial mapping.
     */
    getSerial(device) {
        var _a;
        return (_a = device.serialNumber) !== null && _a !== void 0 ? _a : this.globalStateManager.getSerialNumberForIp(device.ip, this.networkId);
    }
    get timeSinceLastScan() {
        if (!this.lastScanDate) {
            return Infinity; // Never scanned, so always stale
        }
        return Date.now() - this.lastScanDate.getTime();
    }
    getPriorityForDeviceFormFactor(deviceInfo) {
        if ((deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo['is-stick']) === 'true') {
            return 0;
        }
        if ((deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo['is-tv']) === 'true') {
            return 2;
        }
        return 1;
    }
    /**
     * Add or update a device in the devices array.
     * Computes the device key from serialNumber (or falls back to IP).
     */
    setDevice(input) {
        var _a, _b, _c, _d, _e;
        const index = this.devices.findIndex(d => d.ip === input.ip);
        const isNewDevice = index < 0;
        // Compute key: serial-based when available, IP-based as fallback
        const key = input.serialNumber ? `s:${input.serialNumber}` : `i:${input.ip}`;
        const device = { ...input, key: key };
        if (isNewDevice) {
            this.devices.push(device);
        }
        else {
            // Merge: incoming wins for most fields, but preserve configured properties
            const existing = this.devices[index];
            this.devices[index] = {
                ...existing,
                ...device,
                // Preserve configured status from either side
                isDiscovered: (_a = device.isDiscovered) !== null && _a !== void 0 ? _a : existing.isDiscovered,
                isConfigured: (_b = device.isConfigured) !== null && _b !== void 0 ? _b : existing.isConfigured,
                configuredIn: (_c = device.configuredIn) !== null && _c !== void 0 ? _c : existing.configuredIn,
                configuredName: (_d = device.configuredName) !== null && _d !== void 0 ? _d : existing.configuredName,
                configuredPassword: (_e = device.configuredPassword) !== null && _e !== void 0 ? _e : existing.configuredPassword
            };
        }
        this.emitDevicesChanged();
    }
    /**
     * Deduplicate devices by serial number when a device changes IP (e.g., DHCP reassignment).
     * If an existing device with the same serial exists at a DIFFERENT IP, removes it and
     * returns its configured properties to be preserved on the new entry.
     *
     * @param newIp - The IP address where the device was just discovered/resolved
     * @param serial - The serial number from the device
     * @returns Configured properties to preserve, or undefined if no deduplication needed
     */
    dedupeBySerial(newIp, serial) {
        // Find existing device with same serial at a DIFFERENT IP
        const existingDevice = this.devices.find(d => d.ip !== newIp && this.getSerial(d) === serial);
        if (!existingDevice) {
            return undefined;
        }
        // Capture configured properties to preserve
        const preserved = {
            isConfigured: existingDevice.isConfigured,
            configuredIn: existingDevice.configuredIn,
            configuredName: existingDevice.configuredName,
            configuredPassword: existingDevice.configuredPassword
        };
        // Transfer lastUsedDeviceIp to new IP if it was pointing to old device
        // (User's "active device" should follow the physical device, not the stale IP)
        if (this.lastUsedDeviceIp === existingDevice.ip) {
            this.lastUsedDeviceIp = newIp;
        }
        // Remove old entry directly from array (don't use removeDevice to avoid
        // side effects like removing from lastSeenDevices - device still exists)
        this.devices = this.devices.filter(d => d.ip !== existingDevice.ip);
        return preserved;
    }
    /**
     * Mark a device as unreachable after a failed health check.
     * - Configured devices: marked 'offline', isDiscovered = false
     * - Discovered-only devices: removed from the list
     */
    markDeviceUnreachable(deviceIp) {
        const device = this.getDeviceEntry({ ip: deviceIp });
        if (!device) {
            return;
        }
        if (device.isConfigured) {
            // Configured devices stay but marked offline and not discovered
            device.deviceState = 'offline';
            device.isDiscovered = false;
            this.emitDevicesChanged();
        }
        else {
            // Discovered-only device: remove it
            this.removeDevice(deviceIp);
        }
    }
    /**
     * Remove a device from the devices array.
     */
    removeDevice(deviceIp) {
        const device = this.getDeviceEntry({ ip: deviceIp });
        if (device) {
            this.devices = this.devices.filter(d => d.ip !== deviceIp);
            // Remove from last seen devices (if has serial)
            const serial = this.getSerial(device);
            if (serial) {
                this.globalStateManager.removeLastSeenDevice(this.networkId, serial);
            }
            // Clear lastUsedDeviceIp if the removed device was the last used
            if (this.lastUsedDeviceIp === deviceIp) {
                this.lastUsedDeviceIp = undefined;
            }
            this.emitDevicesChanged();
        }
    }
    /**
     * Load last seen devices from cache.
     * Removes non-configured devices and resets configured devices to pending (no-op at startup).
     * Then loads cached devices for the current network.
     */
    loadLastSeenDevices() {
        // flip configured devices to pending and remove all the rest
        for (let i = this.devices.length - 1; i >= 0; i--) {
            const device = this.devices[i];
            if (device.isConfigured) {
                device.deviceState = 'pending';
            }
            else {
                this.devices.splice(i, 1);
            }
        }
        // Load cached devices for current network
        const lastSeenDevices = this.globalStateManager.getLastSeenDevices(this.networkId);
        for (const serialNumber of lastSeenDevices) {
            const cached = this.globalStateManager.getCachedDevice(serialNumber);
            if (cached && typeof cached === 'object' && !Array.isArray(cached)) {
                // Get IP from ip-to-serial mapping
                const ip = this.globalStateManager.getIpForSerial(serialNumber, this.networkId);
                if (!ip) {
                    // No IP mapping found - remove stale entry
                    this.globalStateManager.removeLastSeenDevice(this.networkId, serialNumber);
                    continue;
                }
                // Create device with serial (key computed by setDevice)
                this.setDevice({
                    ip: ip,
                    serialNumber: serialNumber,
                    deviceState: 'pending',
                    isDiscovered: false
                });
                // Ensure IP→serial mapping is set up
                this.globalStateManager.setSerialNumberForIp(this.networkId, ip, serialNumber);
            }
            else {
                // No cached info - remove stale entry
                this.globalStateManager.removeLastSeenDevice(this.networkId, serialNumber);
            }
        }
    }
    /**
     * Load configured devices from VSCode settings.
     * Handles removals (devices no longer in config) and adds/updates.
     * Safe to call at startup (removal is no-op when devices array is empty).
     * Resolves hostnames to IP addresses using DNS lookup.
     */
    async loadConfiguredDevices() {
        var _a, _b, _c, _d, _e, _f;
        // Read config from all VSCode scopes
        const config = vscode.workspace.getConfiguration('brightscript');
        // inspect may not be available in test mocks
        if (typeof config.inspect !== 'function') {
            return;
        }
        const inspection = config.inspect('devices');
        // Get devices from specific scopes we care about
        const userDevices = (_a = inspection === null || inspection === void 0 ? void 0 : inspection.globalValue) !== null && _a !== void 0 ? _a : [];
        const workspaceDevices = (_b = inspection === null || inspection === void 0 ? void 0 : inspection.workspaceValue) !== null && _b !== void 0 ? _b : [];
        const deviceMap = new Map();
        // Process user settings
        for (const device of userDevices) {
            if (!(device === null || device === void 0 ? void 0 : device.host)) {
                continue;
            }
            const key = device.serialNumber || device.host;
            const existing = deviceMap.get(key);
            const scopes = (_c = existing === null || existing === void 0 ? void 0 : existing.configuredIn) !== null && _c !== void 0 ? _c : [];
            if (!scopes.includes('user')) {
                scopes.push('user');
            }
            deviceMap.set(key, {
                ...existing,
                ...device,
                configuredIn: scopes
            });
        }
        // Process workspace settings
        for (const device of workspaceDevices) {
            if (!(device === null || device === void 0 ? void 0 : device.host)) {
                continue;
            }
            const key = device.serialNumber || device.host;
            const existing = deviceMap.get(key);
            const scopes = (_d = existing === null || existing === void 0 ? void 0 : existing.configuredIn) !== null && _d !== void 0 ? _d : [];
            if (!scopes.includes('workspace')) {
                scopes.push('workspace');
            }
            deviceMap.set(key, {
                ...existing,
                ...device,
                configuredIn: scopes
            });
        }
        const configuredDevices = Array.from(deviceMap.values());
        for (let i = this.devices.length - 1; i >= 0; i--) {
            const device = this.devices[i];
            // Skip non-configured devices
            if (!device.isConfigured) {
                continue;
            }
            // Check if still in config (by IP or serial)
            const serial = this.getSerial(device);
            const stillConfigured = configuredDevices.some(c => c.host === device.ip ||
                (serial && c.serialNumber === serial));
            if (stillConfigured) {
                continue; // Still configured, keep it
            }
            // Device removed from config
            if (device.isDiscovered) {
                // Keep as discovered-only device
                device.isConfigured = false;
                device.configuredIn = [];
                device.configuredName = undefined;
                device.configuredPassword = undefined;
            }
            else {
                // Not discovered either, remove completely
                this.devices.splice(i, 1);
            }
        }
        for (const configured of configuredDevices) {
            // Determine serial number
            let serialNumber = configured.serialNumber;
            if (!serialNumber) {
                serialNumber = this.globalStateManager.getSerialNumberForIp(configured.host, this.networkId);
            }
            // Resolve hostname to IP address (handles both hostnames and IPs)
            let ip = configured.host;
            try {
                ip = await util_1.util.dnsLookup(configured.host);
            }
            catch (_g) {
                // DNS lookup failed - keep original host value as fallback
                // This allows IP addresses to work even if DNS resolution fails
            }
            // Check if device already exists by IP (primary key)
            const existingDevice = this.getDeviceEntry({ ip: ip });
            // Preserve state if device exists
            const deviceState = (_e = existingDevice === null || existingDevice === void 0 ? void 0 : existingDevice.deviceState) !== null && _e !== void 0 ? _e : 'pending';
            const isDiscovered = (_f = existingDevice === null || existingDevice === void 0 ? void 0 : existingDevice.isDiscovered) !== null && _f !== void 0 ? _f : false;
            // Set up IP→serial mapping if we have serial (deviceInfo already cached if it exists)
            if (serialNumber) {
                this.globalStateManager.setSerialNumberForIp(this.networkId, ip, serialNumber);
            }
            // Create device with serial if known (key computed by setDevice)
            this.setDevice({
                ip: ip,
                serialNumber: serialNumber,
                deviceState: deviceState,
                isConfigured: true,
                configuredIn: configured.configuredIn,
                isDiscovered: isDiscovered,
                configuredName: configured.name,
                configuredPassword: configured.password
            });
        }
    }
    async resolveDevice(device, doSyntheticDelay = true) {
        var _a, _b, _c, _d, _e, _f, _g;
        // Increment and capture sequence number to handle concurrent refresh calls
        // Use IP for sequence tracking (primary key)
        const currentSeq = ((_a = this.resolveDeviceSequence.get(device.ip)) !== null && _a !== void 0 ? _a : 0) + 1;
        this.resolveDeviceSequence.set(device.ip, currentSeq);
        // Set to pending during health check with immediate UI feedback
        const existingDevice = this.getDeviceEntry({ ip: device.ip });
        if (existingDevice && existingDevice.deviceState !== 'pending') {
            existingDevice.deviceState = 'pending';
            this.emitDevicesChanged();
        }
        // Fetch latest device info from the network (with short-lived cache)
        let deviceInfo;
        try {
            deviceInfo = await this.getDeviceInfoCached(device.ip, 8060);
            if (doSyntheticDelay) {
                await this.randomDelay(400, 1000);
            }
        }
        catch (_h) {
            deviceInfo = undefined;
        }
        // Only apply result if this is still the latest request for this device
        if (this.resolveDeviceSequence.get(device.ip) !== currentSeq) {
            // Stale response - a newer check was started, ignore this result
            return !!deviceInfo;
        }
        if (deviceInfo) {
            // Extract serial and cache the deviceInfo
            const serial = (_c = (_b = deviceInfo['serial-number']) === null || _b === void 0 ? void 0 : _b.toString) === null || _c === void 0 ? void 0 : _c.call(_b);
            if (serial) {
                this.globalStateManager.setCachedDevice(serial, {
                    serialNumber: serial,
                    deviceInfo: deviceInfo,
                    createdAt: Date.now()
                });
                this.globalStateManager.setSerialNumberForIp(this.networkId, device.ip, serial);
                // Add to last seen devices (successfully resolved with serial)
                this.globalStateManager.addLastSeenDevice(this.networkId, serial);
            }
            // Dedupe by serial - if device moved IPs, remove old entry and preserve its config
            const preserved = serial ? this.dedupeBySerial(device.ip, serial) : undefined;
            // Create device with serial (key computed by setDevice)
            this.setDevice({
                ip: device.ip,
                serialNumber: serial,
                deviceState: 'online',
                isConfigured: (_d = preserved === null || preserved === void 0 ? void 0 : preserved.isConfigured) !== null && _d !== void 0 ? _d : device.isConfigured,
                configuredIn: (_e = preserved === null || preserved === void 0 ? void 0 : preserved.configuredIn) !== null && _e !== void 0 ? _e : device.configuredIn,
                isDiscovered: true,
                configuredName: (_f = preserved === null || preserved === void 0 ? void 0 : preserved.configuredName) !== null && _f !== void 0 ? _f : device.configuredName,
                configuredPassword: (_g = preserved === null || preserved === void 0 ? void 0 : preserved.configuredPassword) !== null && _g !== void 0 ? _g : device.configuredPassword
            });
            return true;
        }
        else {
            this.markDeviceUnreachable(device.ip);
            return false;
        }
    }
    async checkDevicesHealth(force = false) {
        // Use internal devices array directly - no need to hydrate from cache
        const devices = this.devices;
        // Filter to devices that need checking
        const devicesToCheck = force ? devices : devices.filter(d => {
            var _a;
            const lastCheck = (_a = this.lastHealthCheckTime.get(d.ip)) !== null && _a !== void 0 ? _a : 0;
            return Date.now() - lastCheck > this.HEALTH_CHECK_COOLDOWN_MS;
        });
        if (devicesToCheck.length === 0) {
            return;
        }
        // Set all to pending and emit before async work
        for (const device of devicesToCheck) {
            device.deviceState = 'pending';
            this.lastHealthCheckTime.set(device.ip, Date.now());
        }
        this.emitDevicesChanged();
        // Check all devices
        let needsScan = false;
        await Promise.all(devicesToCheck.map(async (device) => {
            const isHealthy = await this.resolveDevice(device);
            if (!isHealthy) {
                needsScan = true;
            }
        }));
        if (needsScan) {
            this.discoverAll(this.deviceDiscoveryEnabled);
        }
    }
    /**
     * Reset the cache cleanup timer. After inactivity, the cache will be cleared.
     */
    resetCacheCleanupTimer() {
        if (this.cacheCleanupTimer) {
            clearTimeout(this.cacheCleanupTimer);
        }
        this.cacheCleanupTimer = setTimeout(() => {
            this.deviceInfoCache.clear();
            this.cacheCleanupTimer = null;
        }, this.CACHE_CLEANUP_DELAY_MS);
    }
    /**
     * Cached wrapper around rokuDeploy.getDeviceInfo to prevent duplicate calls
     * when health checks and SSDP responses race during refresh.
     */
    async getDeviceInfoCached(ip, port) {
        this.resetCacheCleanupTimer();
        const cached = this.deviceInfoCache.get(ip);
        if (cached && Date.now() - cached.timestamp < this.DEVICE_INFO_CACHE_TTL_MS) {
            return cached.info;
        }
        const info = await roku_deploy_1.rokuDeploy.getDeviceInfo({
            host: ip,
            remotePort: port,
            timeout: DeviceManager.HEALTH_CHECK_TIMEOUT_MS
        });
        this.deviceInfoCache.set(ip, { info: info, timestamp: Date.now() });
        return info;
    }
    /**
     * Discover all Roku devices on the network and watch for new ones that connect
     */
    discoverAll(force) {
        if (force || this.scanNeeded || this.timeSinceLastScan > this.STALE_SCAN_THRESHOLD_MS) {
            this.scanNeeded = false;
            this.lastScanDate = new Date();
            this.finder.scan();
            return true;
        }
        return false;
    }
    /**
     * Process a discovered IP address from SSDP.
     * Fetches device info, applies filtering, and sets if valid.
     * @param serialNumber - Serial number from SSDP USN header, if available
     */
    async processDiscoveredIp(ip, serialNumber) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        try {
            const deviceInfo = await this.getDeviceInfoCached(ip, 8060);
            const config = util_2.util.getConfiguration('brightscript') || {};
            const includeNonDeveloperDevices = ((_a = config === null || config === void 0 ? void 0 : config.deviceDiscovery) === null || _a === void 0 ? void 0 : _a.includeNonDeveloperDevices) === true;
            const developerEnabled = deviceInfo['developer-enabled'] === 'true';
            if (!includeNonDeveloperDevices && !developerEnabled) {
                return;
            }
            // Check if device already exists (by IP)
            const existingDevice = this.getDeviceEntry({ ip: ip });
            // Extract serial and cache the deviceInfo
            const serial = (_c = (_b = deviceInfo['serial-number']) === null || _b === void 0 ? void 0 : _b.toString) === null || _c === void 0 ? void 0 : _c.call(_b);
            if (serial) {
                this.globalStateManager.setCachedDevice(serial, {
                    serialNumber: serial,
                    deviceInfo: deviceInfo,
                    createdAt: Date.now()
                });
                this.globalStateManager.setSerialNumberForIp(this.networkId, ip, serial);
            }
            // Dedupe by serial - if device moved IPs, remove old entry and preserve its config
            const preserved = serial ? this.dedupeBySerial(ip, serial) : undefined;
            // Create device with serial (key computed by setDevice)
            this.setDevice({
                ip: ip,
                serialNumber: serial,
                deviceState: 'online',
                isConfigured: (_e = (_d = preserved === null || preserved === void 0 ? void 0 : preserved.isConfigured) !== null && _d !== void 0 ? _d : existingDevice === null || existingDevice === void 0 ? void 0 : existingDevice.isConfigured) !== null && _e !== void 0 ? _e : false,
                configuredIn: (_f = preserved === null || preserved === void 0 ? void 0 : preserved.configuredIn) !== null && _f !== void 0 ? _f : existingDevice === null || existingDevice === void 0 ? void 0 : existingDevice.configuredIn,
                isDiscovered: true,
                configuredName: (_g = preserved === null || preserved === void 0 ? void 0 : preserved.configuredName) !== null && _g !== void 0 ? _g : existingDevice === null || existingDevice === void 0 ? void 0 : existingDevice.configuredName,
                configuredPassword: (_h = preserved === null || preserved === void 0 ? void 0 : preserved.configuredPassword) !== null && _h !== void 0 ? _h : existingDevice === null || existingDevice === void 0 ? void 0 : existingDevice.configuredPassword
            });
        }
        catch (_j) {
            // Device unreachable, ignore
        }
    }
    /**
     * Handle device-online event from RokuFinder.
     * Shows a notification if showInfoMessages is enabled.
     */
    handleDeviceOnline(ip, serialNumber) {
        var _a, _b, _c;
        if (!this.showInfoMessages) {
            return;
        }
        // Get actual serial number from IP→serial mapping (more reliable than SSDP hint)
        const actualSerial = (_a = this.globalStateManager.getSerialNumberForIp(ip, this.networkId)) !== null && _a !== void 0 ? _a : serialNumber;
        // Get cached device directly from globalStateManager
        const cachedDevice = actualSerial
            ? this.globalStateManager.getCachedDevice(actualSerial)
            : undefined;
        // Get display name from cache
        const fallbackName = actualSerial ? `${ip} (${actualSerial})` : ip;
        const displayName = (_c = (_b = cachedDevice === null || cachedDevice === void 0 ? void 0 : cachedDevice.deviceInfo) === null || _b === void 0 ? void 0 : _b['default-device-name']) !== null && _c !== void 0 ? _c : fallbackName;
        const notifierId = actualSerial !== null && actualSerial !== void 0 ? actualSerial : ip;
        if (!this.deviceOnlineNotifiers.has(notifierId)) {
            this.deviceOnlineNotifiers.set(notifierId, (0, lodash_1.debounce)((name) => {
                this.deviceOnlineNotifiers.delete(notifierId);
                void util_2.util.showTimedNotification(`Device Online: ${name}`);
            }, 500));
        }
        this.deviceOnlineNotifiers.get(notifierId)(displayName);
    }
    async activateMonitoring() {
        this.networkChangeMonitor.start();
        await this.startRokuFinder();
    }
    deactivateMonitoring() {
        this.networkChangeMonitor.stop();
        this.stopRokuFinder();
    }
    /**
     * Start listening for passive SSDP announcements from Roku devices
     */
    async startRokuFinder() {
        await this.finder.start();
    }
    stopRokuFinder() {
        this.finder.stop();
    }
    notifyFocusGained() {
        this.networkChangeMonitor.start();
    }
    notifyFocusLost() {
        this.networkChangeMonitor.stop();
    }
    /**
     * Set the flag indicating a scan is needed. Emits 'scanNeeded-changed' event
     * when the flag flips from false to true.
     */
    setScanNeeded(force = false) {
        if (!this.scanNeeded || force) {
            this.scanNeeded = true;
            this.emitter.emit('scanNeeded-changed');
        }
    }
    async randomDelay(min, max) {
        const randomness = Math.random() * ((max - min) + min);
        await util_2.util.sleep(randomness);
    }
}
exports.DeviceManager = DeviceManager;
DeviceManager.HEALTH_CHECK_TIMEOUT_MS = 2000; // 2 seconds
function throttleBounce(callback, threshold) {
    let timer;
    let pending;
    function onTimer() {
        if (pending) {
            callback(...pending);
            pending = undefined;
            timer = setTimeout(onTimer, threshold);
        }
        else {
            timer = undefined;
        }
    }
    return (...args) => {
        if (!timer) {
            callback(...args);
            timer = setTimeout(onTimer, threshold);
        }
        else {
            pending = args;
        }
    };
}
//# sourceMappingURL=DeviceManager.js.map