"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RokuFinder = void 0;
const eventemitter3_1 = require("eventemitter3");
const node_ssdp_1 = require("node-ssdp");
class RokuFinder extends eventemitter3_1.EventEmitter {
    constructor() {
        super();
        this.running = false;
        this.scanTimers = [];
        this.aliveDebounceMap = new Map();
        this.ALIVE_DEBOUNCE_MS = 500;
        this.lastCleanupTime = 0;
        this.CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
        this.SCAN_MIN_DURATION_MS = 3000;
        this.SCAN_SETTLE_MS = 1500;
        this.scanMinTimer = null;
        this.scanSettleTimer = null;
        this.isScanning = false;
        this.scanMinTimeElapsed = false;
        this.client = new node_ssdp_1.Client({
            //Bind sockets to each discovered interface explicitly instead of relying on the system. Might help with issues with multiple NICs.
            explicitSocketBind: true
        });
        this.client.on('response', (headers) => {
            this.processSsdpResponse(headers);
        });
        this.server = new node_ssdp_1.Server();
        this.server.on('advertise-alive', (headers) => {
            this.processSsdpNotify(headers);
        });
        this.server.on('advertise-bye', (headers) => {
            this.processSsdpNotify(headers);
        });
    }
    /**
     * Start a scan for devices. Emits scan-started, then scan-ended when complete.
     * Scan ends when both: minimum duration (3s) has passed AND 1.5s since last device response.
     */
    scan() {
        if (this.isScanning) {
            return; // Already scanning
        }
        this.isScanning = true;
        this.scanMinTimeElapsed = false;
        this.emit('scan-started');
        // Start minimum duration timer
        this.scanMinTimer = setTimeout(() => {
            this.scanMinTimeElapsed = true;
            this.checkScanComplete();
        }, this.SCAN_MIN_DURATION_MS);
        // Start initial settle timer
        this.resetSettleTimer();
        // Trigger the actual SSDP searches
        if (this.client) {
            const search = () => {
                if (!this.client) {
                    return;
                }
                Promise.resolve(this.client.search('roku:ecp')).catch((error) => {
                    console.error(error);
                });
            };
            // UDP is unreliable, so we search multiple times
            search();
            this.scanTimers.push(setTimeout(search, 100));
            this.scanTimers.push(setTimeout(search, 200));
        }
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
        this.emit('scan-ended');
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
    /**
     * Start listening for SSDP advertisements
     */
    async start() {
        if (!this.running) {
            this.running = true;
            await this.server.start();
        }
    }
    /**
     * Stop listening for SSDP advertisements.
     * Also ends any in-progress scan (emitting scan-ended).
     */
    stop() {
        // End any in-progress scan first (emits scan-ended)
        if (this.isScanning) {
            this.endScan();
        }
        if (this.running) {
            this.running = false;
            this.server.stop();
        }
    }
    processSsdpResponse(headers) {
        const { ST, LOCATION, USN } = headers;
        if (LOCATION && (ST === null || ST === void 0 ? void 0 : ST.includes('roku'))) {
            try {
                const url = new URL(LOCATION);
                const serialNumber = this.extractSerialFromUsn(USN);
                this.emit('found', url.hostname, { serialNumber: serialNumber });
                // Reset settle timer when device found during active scan
                if (this.isScanning) {
                    this.resetSettleTimer();
                }
            }
            catch (_a) {
                // Invalid URL, ignore
            }
        }
    }
    /**
     * Process an SSDP notification (device announcing its presence)
     */
    processSsdpNotify(data) {
        if (!this.running) {
            return;
        }
        const nts = data.NTS;
        const nt = data.NT;
        const location = data.LOCATION;
        const usn = data.USN;
        // Check if this is a Roku device
        const isRoku = (nt === null || nt === void 0 ? void 0 : nt.includes('roku')) || (usn === null || usn === void 0 ? void 0 : usn.includes('roku'));
        if (!isRoku) {
            return;
        }
        // Handle device leaving (ssdp:byebye)
        if (nts === 'ssdp:byebye') {
            if (location) {
                try {
                    const url = new URL(location);
                    this.emit('lost', url.hostname);
                }
                catch (_a) {
                    // Invalid URL, ignore
                }
            }
            return;
        }
        // Handle device announcing (ssdp:alive)
        if (nts === 'ssdp:alive' && location) {
            try {
                const url = new URL(location);
                const ip = url.hostname;
                const now = Date.now();
                // Periodic cleanup of stale entries
                if (now - this.lastCleanupTime > this.CLEANUP_INTERVAL_MS) {
                    this.lastCleanupTime = now;
                    for (const [cachedIp, timestamp] of this.aliveDebounceMap) {
                        if (now - timestamp > this.CLEANUP_INTERVAL_MS) {
                            this.aliveDebounceMap.delete(cachedIp);
                        }
                    }
                }
                const lastEmit = this.aliveDebounceMap.get(ip);
                if (lastEmit === undefined || now - lastEmit >= this.ALIVE_DEBOUNCE_MS) {
                    this.aliveDebounceMap.set(ip, now);
                    const serialNumber = this.extractSerialFromUsn(usn);
                    this.emit('found', ip, { serialNumber: serialNumber });
                    this.emit('device-online', ip, serialNumber);
                    // Reset settle timer when device found during active scan
                    if (this.isScanning) {
                        this.resetSettleTimer();
                    }
                }
            }
            catch (_b) {
                // Invalid URL, ignore
            }
        }
    }
    /**
     * Extract serial number from USN header.
     * USN format: "uuid:roku:ecp:SERIALNUMBER"
     */
    extractSerialFromUsn(usn) {
        if (!usn) {
            return undefined;
        }
        // USN format is typically "uuid:roku:ecp:SERIALNUMBER"
        // Extract the last segment after the final colon
        const parts = usn.split(':');
        const serial = parts.pop();
        // Validate it looks like a serial (not empty, not another uuid segment)
        if (serial && serial.length > 0 && !serial.includes('-')) {
            return serial;
        }
        return undefined;
    }
    dispose() {
        this.stop();
        // Clear all timers
        for (const timer of this.scanTimers) {
            clearTimeout(timer);
        }
        this.scanTimers = [];
        this.clearScanTimers();
        this.aliveDebounceMap.clear();
        this.client.removeAllListeners();
        this.client.stop();
        delete this.client;
        this.server.removeAllListeners();
        this.server.stop();
        delete this.server;
    }
}
exports.RokuFinder = RokuFinder;
//# sourceMappingURL=RokuFinder.js.map