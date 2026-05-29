"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceManager = void 0;
const eventemitter3_1 = require("eventemitter3");
const url_1 = require("url");
const vscode = require("vscode");
const thenby_1 = require("thenby");
const roku_deploy_1 = require("roku-deploy");
const RokuFinder_1 = require("./RokuFinder");
const NetworkChangeMonitor_1 = require("./NetworkChangeMonitor");
const SystemSleepMonitor_1 = require("./SystemSleepMonitor");
const util_1 = require("../util");
const VscodeContextManager_1 = require("../managers/VscodeContextManager");
const lodash_1 = require("lodash");
class DeviceManager {
    constructor(context, globalStateManager) {
        this.context = context;
        this.globalStateManager = globalStateManager;
        this.emitter = new eventemitter3_1.EventEmitter();
        this.devices = [];
        this.lastScanDate = null;
        this.finder = new RokuFinder_1.RokuFinder();
        this.lastHealthCheckTime = new Map();
        this.resolveDeviceSequence = new Map();
        this.HEALTH_CHECK_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
        this.DEVICES_CHANGED_DEBOUNCE_MS = 50;
        this.DEVICE_INFO_CACHE_TTL_MS = 5000; // 5 seconds
        this.CACHE_CLEANUP_DELAY_MS = 10000; // 10 seconds of inactivity
        this.deviceInfoCache = new Map();
        this.deviceOnlineNotifiers = new Map();
        this.cacheCleanupTimer = null;
        // Scan state management
        this.SCAN_MIN_DURATION_MS = 3000;
        this.SCAN_SETTLE_MS = 1500;
        this.scanMinTimer = null;
        this.scanSettleTimer = null;
        this.isScanning = false;
        this.scanMinTimeElapsed = false;
        this.scanNeeded = false;
        this.lastUsedDevice = undefined;
        this.emitDevicesChanged = throttleBounce(() => {
            this.emitter.emit('devices-changed');
        }, this.DEVICES_CHANGED_DEBOUNCE_MS);
        this.firstRequestForDevices = true;
        this.networkId = (0, NetworkChangeMonitor_1.getNetworkHash)();
        this.setupConfiguration();
        this.setupWindowFocusHandling();
        this.setupMonitors();
        this.initialize();
        this.context.subscriptions.push(this);
    }
    /**
     * Is device discovery enabled (i.e. passive scans are permitted)
     */
    get deviceDiscoveryEnabled() {
        var _a, _b, _c;
        return (_c = (_b = (_a = vscode.workspace.getConfiguration('brightscript')) === null || _a === void 0 ? void 0 : _a.deviceDiscovery) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : true;
    }
    /**
     * Should info messages be shown when new devices are discovered (e.g. "Device found: Roku TV")?
     */
    get showInfoMessages() {
        var _a, _b, _c;
        return (_c = (_b = (_a = vscode.workspace.getConfiguration('brightscript')) === null || _a === void 0 ? void 0 : _a.deviceDiscovery) === null || _b === void 0 ? void 0 : _b.showInfoMessages) !== null && _c !== void 0 ? _c : true;
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
    get timeSinceLastScan() {
        if (!this.lastScanDate) {
            return Infinity; // Never scanned, so always stale
        }
        return Date.now() - this.lastScanDate.getTime();
    }
    setupConfiguration() {
        const applyConfig = (event) => {
            var _a;
            let config = vscode.workspace.getConfiguration('brightscript') || {};
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
        this.loadLastSeenDevices();
        // Always set up finder event listeners so scan responses are processed
        this.setupFinderEventListeners();
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
    /**
     * Get a list of all roku devices known by this extension (by scanning, hardcoded lists, etc)
     */
    getAllDevices() {
        this.firstRequestForDevices = false;
        return [...this.devices].sort((0, thenby_1.firstBy)((a, b) => {
            return this.getPriorityForDeviceFormFactor(a) - this.getPriorityForDeviceFormFactor(b);
        }).thenBy((a, b) => {
            return a.deviceInfo['default-device-name'].localeCompare(b.deviceInfo['default-device-name']);
        }).thenBy((a, b) => {
            if (a.serialNumber < b.serialNumber) {
                return -1;
            }
            if (a.serialNumber > b.serialNumber) {
                return 1;
            }
            // serial numbers must be equal
            return 0;
        }));
    }
    /**
     * Get a device by its serial number
     */
    getDevice(serialNumber) {
        return this.devices.find(d => d.serialNumber === serialNumber);
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
     * Clear the current list of devices and the cached last-seen-devices list
     */
    clearCurrentDeviceList() {
        this.devices = [];
        this.deviceInfoCache.clear();
        this.globalStateManager.setLastSeenDevices(this.networkId, []);
        // Clear lastUsedDevice since we don't have any device anymore
        this.lastUsedDevice = undefined;
        //TODO when we support hardcoded devices, we should keep those around (or reload them?) instead of clearing everything
        this.emitDevicesChanged();
    }
    clearAllCache() {
        this.clearCurrentDeviceList();
        this.globalStateManager.clearLastSeenDevices();
        this.globalStateManager.clearDeviceCache();
    }
    /**
     * Discover all Roku devices on the network and watch for new ones that connect
     */
    discoverAll(force) {
        if (force || this.scanNeeded || this.timeSinceLastScan > DeviceManager.STALE_SCAN_THRESHOLD_MS) {
            this.scanNeeded = false;
            this.lastScanDate = new Date();
            this.startScan();
            return true;
        }
        return false;
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
    async resolveDevice(device) {
        var _a;
        // Increment and capture sequence number to handle concurrent refresh calls
        const currentSeq = ((_a = this.resolveDeviceSequence.get(device.serialNumber)) !== null && _a !== void 0 ? _a : 0) + 1;
        this.resolveDeviceSequence.set(device.serialNumber, currentSeq);
        // Set to pending during health check with immediate UI feedback
        const existingDevice = this.devices.find(d => d.serialNumber === device.serialNumber);
        if (existingDevice && existingDevice.deviceState !== 'pending') {
            existingDevice.deviceState = 'pending';
            this.emitDevicesChanged();
        }
        // Fetch latest device info from the network (with short-lived cache)
        let freshDevice;
        try {
            const deviceInfo = await this.getDeviceInfoCached(device.ip, parseInt(new url_1.URL(device.location).port || '8060'));
            await this.randomDelay(400, 1000);
            freshDevice = {
                location: device.location,
                ip: device.ip,
                serialNumber: device.serialNumber,
                deviceState: 'online',
                deviceInfo: deviceInfo
            };
        }
        catch (_b) {
            freshDevice = undefined;
        }
        // Only apply result if this is still the latest request for this device
        if (this.resolveDeviceSequence.get(device.serialNumber) !== currentSeq) {
            // Stale response - a newer check was started, ignore this result
            return !!freshDevice;
        }
        if (freshDevice) {
            this.setDevice(freshDevice);
            return true;
        }
        else {
            this.removeDevice(device.serialNumber);
            return false;
        }
    }
    async checkDeviceHealth(device, force = false) {
        var _a;
        // If not forcing, respect the per-device cooldown
        if (!force) {
            const lastCheck = (_a = this.lastHealthCheckTime.get(device.serialNumber)) !== null && _a !== void 0 ? _a : 0;
            const now = Date.now();
            if (now - lastCheck <= this.HEALTH_CHECK_COOLDOWN_MS) {
                return true;
            }
            this.lastHealthCheckTime.set(device.serialNumber, now);
        }
        const isHealthy = await this.resolveDevice(device);
        if (!isHealthy) {
            // force a scan if passive scan is permitted
            this.refresh(this.deviceDiscoveryEnabled);
        }
        return isHealthy;
    }
    async checkDevicesHealth(force = false) {
        const devices = this.getAllDevices();
        // Filter to devices that need checking
        const devicesToCheck = force ? devices : devices.filter(d => {
            var _a;
            const lastCheck = (_a = this.lastHealthCheckTime.get(d.serialNumber)) !== null && _a !== void 0 ? _a : 0;
            return Date.now() - lastCheck > this.HEALTH_CHECK_COOLDOWN_MS;
        });
        if (devicesToCheck.length === 0) {
            return;
        }
        // Set all to pending and emit before async work
        for (const device of devicesToCheck) {
            device.deviceState = 'pending';
            this.lastHealthCheckTime.set(device.serialNumber, Date.now());
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
    async randomDelay(min, max) {
        const randomness = Math.random() * ((max - min) + min);
        await util_1.util.sleep(randomness);
    }
    /**
     * Process a discovered IP address from SSDP.
     * Fetches device info, applies filtering, and upserts if valid.
     * @param serialNumber - Serial number from SSDP USN header, if available
     */
    async processDiscoveredIp(ip, serialNumber) {
        var _a, _b, _c;
        const location = `http://${ip}:8060`;
        try {
            const deviceInfo = await this.getDeviceInfoCached(ip, 8060);
            const config = vscode.workspace.getConfiguration('brightscript') || {};
            const includeNonDeveloperDevices = ((_a = config === null || config === void 0 ? void 0 : config.deviceDiscovery) === null || _a === void 0 ? void 0 : _a.includeNonDeveloperDevices) === true;
            const developerEnabled = deviceInfo['developer-enabled'] === 'true';
            if (!includeNonDeveloperDevices && !developerEnabled) {
                return;
            }
            // Use serial from SSDP if available, otherwise fall back to deviceInfo
            const deviceSerialNumber = serialNumber !== null && serialNumber !== void 0 ? serialNumber : (_c = (_b = deviceInfo['serial-number']) === null || _b === void 0 ? void 0 : _b.toString) === null || _c === void 0 ? void 0 : _c.call(_b);
            const device = {
                location: location,
                ip: ip,
                serialNumber: deviceSerialNumber,
                deviceState: 'online',
                deviceInfo: deviceInfo
            };
            this.setDevice(device);
        }
        catch (_d) {
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
        // Look up cached device by serial number or IP
        const cachedDevice = (_a = this.getDevice(serialNumber)) !== null && _a !== void 0 ? _a : this.devices.find(d => d.ip === ip);
        const displayName = (_c = (_b = cachedDevice === null || cachedDevice === void 0 ? void 0 : cachedDevice.deviceInfo) === null || _b === void 0 ? void 0 : _b['default-device-name']) !== null && _c !== void 0 ? _c : (serialNumber ? `${ip} (${serialNumber})` : ip);
        const notifierId = serialNumber !== null && serialNumber !== void 0 ? serialNumber : ip;
        if (!this.deviceOnlineNotifiers.has(notifierId)) {
            this.deviceOnlineNotifiers.set(notifierId, (0, lodash_1.debounce)((name) => {
                this.deviceOnlineNotifiers.delete(notifierId);
                void util_1.util.showTimedNotification(`Device Online: ${name}`);
            }, 500));
        }
        this.deviceOnlineNotifiers.get(notifierId)(displayName);
    }
    /**
     * Start a scan for devices. Emits scan-started, then scan-ended when complete.
     * Scan ends when both: minimum duration (3s) has passed AND 1.5s since last device response.
     */
    startScan() {
        if (this.isScanning) {
            return; // Already scanning
        }
        this.isScanning = true;
        this.scanMinTimeElapsed = false;
        this.emitter.emit('scan-started');
        // Start minimum duration timer
        this.scanMinTimer = setTimeout(() => {
            this.scanMinTimeElapsed = true;
            this.checkScanComplete();
        }, this.SCAN_MIN_DURATION_MS);
        // Start initial settle timer
        this.resetSettleTimer();
        // Trigger the actual SSDP scan
        this.finder.scan();
    }
    resetSettleTimer() {
        if (this.scanSettleTimer) {
            clearTimeout(this.scanSettleTimer);
        }
        this.scanSettleTimer = setTimeout(() => {
            this.scanSettleTimer = null;
            this.checkScanComplete();
        }, this.SCAN_SETTLE_MS);
    }
    checkScanComplete() {
        if (!this.isScanning) {
            return;
        }
        // Only complete if both conditions met: min time elapsed AND settle timer fired
        if (this.scanMinTimeElapsed && this.scanSettleTimer === null) {
            this.endScan();
        }
    }
    endScan() {
        if (!this.isScanning) {
            return;
        }
        this.isScanning = false;
        this.clearScanTimers();
        this.emitter.emit('scan-ended');
    }
    clearScanTimers() {
        if (this.scanMinTimer) {
            clearTimeout(this.scanMinTimer);
            this.scanMinTimer = null;
        }
        if (this.scanSettleTimer) {
            clearTimeout(this.scanSettleTimer);
            this.scanSettleTimer = null;
        }
    }
    async activateMonitoring() {
        this.networkChangeMonitor.start();
        await this.startRokuFinder();
    }
    deactivateMonitoring() {
        this.networkChangeMonitor.stop();
        this.stopRokuFinder();
    }
    getPriorityForDeviceFormFactor(device) {
        if (device.deviceInfo['is-stick'] === 'true') {
            return 0;
        }
        if (device.deviceInfo['is-tv'] === 'true') {
            return 2;
        }
        return 1;
    }
    /**
     * On startup, load last seen devices from cache.
     * Devices are added as 'pending' - health checks happen lazily when UI requests devices.
     */
    loadLastSeenDevices() {
        // Clear existing devices before loading cached ones for the current network
        this.devices = [];
        const lastSeenDevices = this.globalStateManager.getLastSeenDevices(this.networkId);
        for (const serialNumber of lastSeenDevices) {
            const cached = this.globalStateManager.getCachedDevice(serialNumber);
            //ensure our cached object is actually an object
            if (cached && typeof cached === 'object' && !Array.isArray(cached)) {
                // Add cached device as pending (no network request)
                const device = {
                    ...cached,
                    deviceState: 'pending'
                };
                this.devices.push(device);
            }
            else {
                // No cached info - remove stale entry
                this.globalStateManager.removeLastSeenDevice(this.networkId, serialNumber);
            }
        }
        this.emitDevicesChanged();
    }
    /**
     * Set up event listeners for the RokuFinder.
     * This must be called regardless of passiveScanPermitted so that
     * active scan responses are processed.
     */
    setupFinderEventListeners() {
        this.finder.removeAllListeners();
        this.finder.on('found', (ip, options) => {
            void this.processDiscoveredIp(ip, options === null || options === void 0 ? void 0 : options.serialNumber);
        });
        this.finder.on('device-online', (ip, serialNumber) => {
            this.handleDeviceOnline(ip, serialNumber);
        });
        this.finder.on('lost', (ip) => {
            // Find and remove device by IP
            const device = this.devices.find(d => d.ip === ip);
            if (device) {
                this.removeDevice(device.serialNumber);
            }
        });
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
     * Add or update a device in the devices array
     */
    setDevice(device) {
        const index = this.devices.findIndex(d => d.serialNumber === device.serialNumber);
        const isNewDevice = index < 0;
        if (isNewDevice) {
            this.devices.push(device);
        }
        else {
            // Update existing - merge new info while preserving existing state if not provided
            this.devices[index] = { ...this.devices[index], ...device };
        }
        // Cache device info for future sessions (exclude transient deviceState)
        this.globalStateManager.setCachedDevice(device.serialNumber, {
            location: device.location,
            serialNumber: device.serialNumber,
            ip: device.ip,
            deviceInfo: device.deviceInfo,
            createdAt: Date.now()
        });
        // Reset scan settle timer when device response comes in
        if (this.isScanning) {
            this.resetSettleTimer();
        }
        if (isNewDevice) {
            this.globalStateManager.addLastSeenDevice(this.networkId, device.serialNumber);
        }
        this.emitDevicesChanged();
    }
    /**
     * Remove a device from the devices array
     */
    removeDevice(serialNumber) {
        var _a;
        const device = this.devices.find(d => d.serialNumber === serialNumber);
        if (device) {
            this.devices = this.devices.filter(d => d.serialNumber !== serialNumber);
            this.globalStateManager.removeLastSeenDevice(this.networkId, device.serialNumber);
            // Clear lastUsedDevice if the removed device was the last used
            if (((_a = this.lastUsedDevice) === null || _a === void 0 ? void 0 : _a.serialNumber) === serialNumber) {
                this.lastUsedDevice = undefined;
            }
            this.emitDevicesChanged();
        }
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
        clearTimeout(this.scanMinTimer);
        clearTimeout(this.scanSettleTimer);
    }
}
exports.DeviceManager = DeviceManager;
DeviceManager.HEALTH_CHECK_TIMEOUT_MS = 2000; // 2 seconds
/**
 * If timeSinceLastScan exceeds this threshold, a new scan should be triggered
 */
DeviceManager.STALE_SCAN_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes
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