"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSleepMonitor = void 0;
/**
 * Monitor for system sleep/wake events by detecting gaps in timer execution
 */
class SystemSleepMonitor {
    constructor(onSleepDetected) {
        this.onSleepDetected = onSleepDetected;
        this.timer = null;
        this.lastExecutionTime = 0;
        this.interval = 1 * 60 * 1000; // 1 minute
        this.gapThreshold = 2 * 60 * 1000; // 2 minutes
    }
    start() {
        this.lastExecutionTime = Date.now();
        this.scheduleNext();
    }
    stop() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    scheduleNext() {
        this.timer = setTimeout(() => {
            const lastExecutionTime = this.lastExecutionTime;
            this.lastExecutionTime = Date.now();
            this.scheduleNext(); // Schedule next execution before calling callback to ensure consistent intervals
            if (Date.now() - lastExecutionTime > this.gapThreshold) {
                this.onSleepDetected();
            }
        }, this.interval);
    }
    dispose() {
        this.stop();
        delete this.onSleepDetected;
    }
}
exports.SystemSleepMonitor = SystemSleepMonitor;
//# sourceMappingURL=SystemSleepMonitor.js.map