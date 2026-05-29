"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStateManager = void 0;
const vscode = require("vscode");
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
            deviceCache: 'deviceCache'
        };
        this.LAST_SEEN_NETWORK_EXPIRATION = 30 * 24 * 60 * 60 * 1000; // 30 days
        this.updateFromVsCodeConfiguration();
        vscode.workspace.onDidChangeConfiguration(() => this.updateFromVsCodeConfiguration());
    }
    updateFromVsCodeConfiguration() {
        var _a;
        let config = vscode.workspace.getConfiguration('brightscript') || {};
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