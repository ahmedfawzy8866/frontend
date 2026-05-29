"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStateManager = void 0;
const vscode = require("vscode");
const util_1 = require("./util");
class GlobalStateManager {
    constructor(context) {
        this.context = context;
        this.keys = {
            lastRunExtensionVersion: 'lastRunExtensionVersion',
            lastSeenReleaseNotesVersion: 'lastSeenReleaseNotesVersion',
            sendRemoteTextHistory: 'sendRemoteTextHistory',
            debugProtocolPopupSnoozeUntilDate: 'debugProtocolPopupSnoozeUntilDate',
            debugProtocolPopupSnoozeValue: 'debugProtocolPopupSnoozeValue',
            lastSeenDevicesByNetwork: 'lastSeenDevicesByNetwork',
            deviceCache: 'deviceCache',
            serialNumberByIpForNetwork: 'serialNumberByIpForNetwork'
        };
        this.LAST_SEEN_NETWORK_EXPIRATION = 30 * 24 * 60 * 60 * 1000; // 30 days
        this.LAST_AUDIT_TIME_SERIALNUMBER_BY_IP_FOR_NETWORK = 0;
        this.updateFromVsCodeConfiguration();
        vscode.workspace.onDidChangeConfiguration(() => this.updateFromVsCodeConfiguration());
    }
    updateFromVsCodeConfiguration() {
        var _a;
        let config = util_1.util.getConfiguration('brightscript') || {};
        this.remoteTextHistoryLimit = (config.sendRemoteTextHistory || { limit: 30 }).limit;
        this.remoteTextHistoryEnabled = (_a = config.sendRemoteTextHistory) === null || _a === void 0 ? void 0 : _a.enabled;
    }
    get lastRunExtensionVersion() {
        return this.context.globalState.get(this.keys.lastRunExtensionVersion);
    }
    set lastRunExtensionVersion(value) {
        void this.context.globalState.update(this.keys.lastRunExtensionVersion, value);
    }
    get lastSeenReleaseNotesVersion() {
        return this.context.globalState.get(this.keys.lastSeenReleaseNotesVersion);
    }
    set lastSeenReleaseNotesVersion(value) {
        void this.context.globalState.update(this.keys.lastSeenReleaseNotesVersion, value);
    }
    get sendRemoteTextHistory() {
        var _a;
        return (_a = this.context.globalState.get(this.keys.sendRemoteTextHistory)) !== null && _a !== void 0 ? _a : [];
    }
    set sendRemoteTextHistory(history) {
        history !== null && history !== void 0 ? history : (history = []);
        // only update the results if the user has the the history enabled
        if (this.remoteTextHistoryEnabled) {
            // limit the number of entries saved to history
            history.length = Math.min(history.length, this.remoteTextHistoryLimit);
            void this.context.globalState.update(this.keys.sendRemoteTextHistory, history);
        }
    }
    addTextHistory(value) {
        if (value !== '' && this.remoteTextHistoryEnabled) {
            let history = this.sendRemoteTextHistory;
            const index = history.indexOf(value);
            if (index > -1) {
                // Remove this entry to prevent duplicates in the saved history
                history.splice(index, 1);
            }
            // Add the the start of the array so that the history is most resent to oldest
            history.unshift(value);
            this.sendRemoteTextHistory = history;
        }
    }
    getLastSeenDevices(network) {
        var _a;
        const networks = this.context.globalState.get(this.keys.lastSeenDevicesByNetwork) || {};
        const entry = networks[network];
        const serialNumbers = (_a = entry === null || entry === void 0 ? void 0 : entry.serialNumbers) !== null && _a !== void 0 ? _a : [];
        if (serialNumbers.length !== 0) {
            networks[network] = { serialNumbers: serialNumbers, lastSeen: Date.now() };
            void this.context.globalState.update(this.keys.lastSeenDevicesByNetwork, this.expireOldLastSeenNetworks(networks));
        }
        return serialNumbers;
    }
    setLastSeenDevices(network, serialNumbers) {
        const networks = this.context.globalState.get(this.keys.lastSeenDevicesByNetwork) || {};
        if (serialNumbers.length === 0) {
            delete networks[network];
        }
        else {
            networks[network] = { serialNumbers: serialNumbers, lastSeen: Date.now() };
        }
        void this.context.globalState.update(this.keys.lastSeenDevicesByNetwork, networks);
    }
    addLastSeenDevice(network, serialNumber) {
        const serialNumbers = this.getLastSeenDevices(network);
        if (!serialNumbers.includes(serialNumber)) {
            serialNumbers.push(serialNumber);
            this.setLastSeenDevices(network, serialNumbers);
        }
    }
    removeLastSeenDevice(network, serialNumber) {
        const serialNumbers = this.getLastSeenDevices(network);
        if (serialNumbers.includes(serialNumber)) {
            this.setLastSeenDevices(network, serialNumbers.filter((existing) => existing !== serialNumber));
        }
    }
    /**
     * Get cached device details by serial number
     */
    getCachedDevice(serialNumber) {
        const cache = this.context.globalState.get(this.keys.deviceCache) || {};
        return cache[serialNumber];
    }
    /**
     * Cache device details for future sessions
     */
    setCachedDevice(serialNumber, device) {
        const cache = this.context.globalState.get(this.keys.deviceCache) || {};
        cache[serialNumber] = device;
        void this.context.globalState.update(this.keys.deviceCache, cache);
    }
    /**
     * Delete any device infos from the cache that were created more than LAST_SEEN_NETWORK_EXPIRATION ago
     */
    clearExpiredDevices() {
        const cache = this.context.globalState.get(this.keys.deviceCache) || {};
        const now = Date.now();
        for (const serialNumber in cache) {
            if (now - cache[serialNumber].createdAt > this.LAST_SEEN_NETWORK_EXPIRATION) {
                delete cache[serialNumber];
            }
        }
        void this.context.globalState.update(this.keys.deviceCache, cache);
    }
    /**
     * Remove a device from the cache
     */
    removeCachedDevice(serialNumber) {
        const cache = this.context.globalState.get(this.keys.deviceCache) || {};
        delete cache[serialNumber];
        void this.context.globalState.update(this.keys.deviceCache, cache);
    }
    /**
     * Clear all cached devices
     */
    clearDeviceCache() {
        void this.context.globalState.update(this.keys.deviceCache, undefined);
    }
    /**
     * Clear all last seen devices for all networks
     */
    clearLastSeenDevices() {
        void this.context.globalState.update(this.keys.lastSeenDevicesByNetwork, undefined);
    }
    /**
     * Get serial number for an IP address.
     * First checks the current network, then falls back to searching all networks for the most recent entry.
     * Used for host-only configured devices to look up cached device info.
     */
    getSerialNumberForIp(ip, currentNetworkId) {
        var _a;
        this.clearExpiredEntriesSerialNumberByIpForNetwork();
        const map = this.context.globalState.get(this.keys.serialNumberByIpForNetwork) || {};
        // First, check the current network
        if (currentNetworkId) {
            const currentNetworkEntry = (_a = map[currentNetworkId]) === null || _a === void 0 ? void 0 : _a[ip];
            if (currentNetworkEntry) {
                return currentNetworkEntry.serialNumber;
            }
        }
        // Fall back to searching all networks, return most recent by timestamp
        let mostRecent;
        for (const networkId in map) {
            const networkMap = map[networkId];
            const entry = networkMap === null || networkMap === void 0 ? void 0 : networkMap[ip];
            if (entry && (!mostRecent || entry.timestamp > mostRecent.timestamp)) {
                mostRecent = entry;
            }
        }
        return mostRecent === null || mostRecent === void 0 ? void 0 : mostRecent.serialNumber;
    }
    /**
     * Save IP→serialNumber mapping for the specified network. Called when a device is successfully resolved.
     */
    setSerialNumberForIp(networkId, ip, serialNumber) {
        const map = this.context.globalState.get(this.keys.serialNumberByIpForNetwork) || {};
        if (!map[networkId]) {
            map[networkId] = {};
        }
        map[networkId][ip] = { serialNumber: serialNumber, timestamp: Date.now() };
        void this.context.globalState.update(this.keys.serialNumberByIpForNetwork, map);
    }
    /**
     * Get the most recent IP address for a given serial number.
     * Checks current network first, then falls back to any network.
     */
    getIpForSerial(serialNumber, currentNetworkId) {
        this.clearExpiredEntriesSerialNumberByIpForNetwork();
        const map = this.context.globalState.get(this.keys.serialNumberByIpForNetwork) || {};
        // First try: Current network mapping
        if (currentNetworkId && map[currentNetworkId]) {
            for (const [ip, entry] of Object.entries(map[currentNetworkId])) {
                if (entry.serialNumber === serialNumber) {
                    return ip;
                }
            }
        }
        // Fallback: Any network
        for (const networkId in map) {
            const networkMap = map[networkId];
            for (const [ip, entry] of Object.entries(networkMap)) {
                if (entry.serialNumber === serialNumber) {
                    return ip;
                }
            }
        }
        return undefined;
    }
    /**
     * Clear the IP→serialNumber map
     */
    clearSerialNumberByIpForNetwork() {
        void this.context.globalState.update(this.keys.serialNumberByIpForNetwork, undefined);
    }
    /**
     * Clear expired entries from the IP→serialNumber map (same expiration as other cached data)
     */
    clearExpiredEntriesSerialNumberByIpForNetwork() {
        const now = Date.now();
        if (now - this.LAST_AUDIT_TIME_SERIALNUMBER_BY_IP_FOR_NETWORK < 24 * 60 * 60 * 1000) {
            return;
        }
        this.LAST_AUDIT_TIME_SERIALNUMBER_BY_IP_FOR_NETWORK = now;
        const map = this.context.globalState.get(this.keys.serialNumberByIpForNetwork) || {};
        let changed = false;
        for (const networkId in map) {
            const networkMap = map[networkId];
            for (const ip in networkMap) {
                if (now - networkMap[ip].timestamp > this.LAST_SEEN_NETWORK_EXPIRATION) {
                    delete networkMap[ip];
                    changed = true;
                }
            }
            // Remove empty network entries
            if (Object.keys(networkMap).length === 0) {
                delete map[networkId];
                changed = true;
            }
        }
        if (changed) {
            void this.context.globalState.update(this.keys.serialNumberByIpForNetwork, map);
        }
    }
    expireOldLastSeenNetworks(networks) {
        const now = Date.now();
        for (const network in networks) {
            if (now - networks[network].lastSeen > this.LAST_SEEN_NETWORK_EXPIRATION) {
                delete networks[network];
            }
        }
        return networks;
    }
    /**
     * Clear all known global state values for this extension
     */
    clear() {
        for (let i in this.keys) {
            const key = this.keys[i];
            this[key] = undefined;
        }
    }
}
exports.GlobalStateManager = GlobalStateManager;
//# sourceMappingURL=GlobalStateManager.js.map