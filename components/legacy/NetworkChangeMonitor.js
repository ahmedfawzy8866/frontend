"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkChangeMonitor = exports.getNetworkHash = void 0;
const os = require("os");
const md5 = require("md5");
/**
 * Generate a hash of current network interfaces for detecting network changes
 */
function getNetworkHash() {
    var _a;
    const interfaces = os.networkInterfaces();
    const parts = [];
    for (const name of Object.keys(interfaces)) {
        for (const net of (_a = interfaces[name]) !== null && _a !== void 0 ? _a : []) {
            if (!net.internal) {
                parts.push(`${net.address}-${net.netmask}`);
            }
        }
    }
    if (parts.length === 0) {
        return 'no-network';
    }
    return md5(parts.sort().join('|'));
}
exports.getNetworkHash = getNetworkHash;
/**
 * Monitor for network changes by polling IP addresses
 */
class NetworkChangeMonitor {
    constructor(onNetworkChanged) {
        this.timer = null;
        this.lastExecutionTime = 0;
        this.interval = 3 * 60 * 1000; // 3 minutes
        this.previousNetworkHash = '';
        this.onNetworkChanged = onNetworkChanged;
        // Take initial snapshot
        this.previousNetworkHash = getNetworkHash();
    }
    start() {
        const now = Date.now();
        if (now - this.lastExecutionTime > this.interval) {
            this.executeTask();
        }
        else {
            this.setTimer();
        }
    }
    stop() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    executeTask() {
        this.doWork();
        this.lastExecutionTime = Date.now();
        this.setTimer();
    }
    setTimer() {
        this.stop(); // Ensure no existing timer is running
        this.timer = setTimeout(() => {
            this.executeTask();
        }, this.interval - (Date.now() - this.lastExecutionTime));
    }
    doWork() {
        const currentNetworkHash = getNetworkHash();
        if (currentNetworkHash === this.previousNetworkHash) {
            return; // No change detected
        }
        this.onNetworkChanged();
        this.previousNetworkHash = currentNetworkHash;
    }
    dispose() {
        this.stop();
        delete this.onNetworkChanged;
    }
}
exports.NetworkChangeMonitor = NetworkChangeMonitor;
//# sourceMappingURL=NetworkChangeMonitor.js.map