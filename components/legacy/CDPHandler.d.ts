export interface CDPConfig {
    pollInterval?: number;
    bannedCommands?: string[];
}
export interface CDPStats {
    clicks: number;
    blocked: number;
    fileEdits: number;
    terminalCommands: number;
}
export type CDPLogCallback = (message: string, type: 'info' | 'success' | 'error' | 'warning') => void;
export declare class CDPHandler {
    private connections;
    private isEnabled;
    private msgId;
    private logCallback?;
    private basePort;
    private portRange;
    constructor();
    /**
     * Initialize WebSocket module (lazy load)
     */
    private initWebSocket;
    /**
     * Set log callback for UI updates
     */
    setLogCallback(callback: CDPLogCallback): void;
    /**
     * Log message to callback
     */
    private log;
    /**
     * Check if any CDP port in the target range is active
     */
    isCDPAvailable(): Promise<boolean>;
    /**
     * Get the port where CDP is active
     */
    getActivePort(): Promise<number | null>;
    /**
     * Start/maintain the CDP connection and injection loop
     */
    start(config?: CDPConfig): Promise<boolean>;
    /**
     * Stop the CDP handler
     */
    stop(): Promise<void>;
    /**
     * Get list of pages from CDP endpoint
     */
    private getPages;
    /**
     * Connect to a CDP page via WebSocket
     */
    private connect;
    /**
     * Inject auto-accept script into page
     */
    private inject;
    /**
     * Evaluate JavaScript in the page context
     */
    private evaluate;
    /**
     * Get stats from all connected pages
     */
    getStats(): Promise<CDPStats>;
    /**
     * Reset stats on all connected pages
     */
    resetStats(): Promise<CDPStats>;
    /**
     * Get number of active connections
     */
    getConnectionCount(): number;
    /**
     * Check if handler is running
     */
    isRunning(): boolean;
    /**
     * Get the auto-accept inject script
     */
    private getInjectScript;
}
//# sourceMappingURL=CDPHandler.d.ts.map