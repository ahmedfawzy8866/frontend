import { CDPStats } from './CDPHandler';
export type AutoRetryLogCallback = (message: string, type: 'info' | 'success' | 'error' | 'warning') => void;
export interface AutoRetryConfig {
    enabled: boolean;
    intervalSeconds: number;
    maxRetries: number;
    cooldownSeconds: number;
}
export declare class AutoRetryService {
    private isRunning;
    private cdpHandler;
    private relauncher;
    private logCallback?;
    private pollTimer?;
    private config;
    constructor();
    /**
     * Get configuration from VS Code settings
     */
    private getConfig;
    /**
     * Set log callback for UI updates
     */
    setLogCallback(callback: AutoRetryLogCallback): void;
    /**
     * Log message to callback
     */
    private log;
    /**
     * Check if CDP is available (IDE launched with correct flag)
     */
    isCDPAvailable(): Promise<boolean>;
    /**
     * Get the configured CDP port
     */
    getCDPPort(): number;
    /**
     * Get the CDP flag for launching IDE
     */
    getCDPFlag(): string;
    /**
     * Check if current process was launched with CDP flag
     */
    checkCurrentProcessHasFlag(): boolean;
    /**
     * Start the auto-accept service
     * Note: CDP availability should be checked by caller before calling start()
     */
    start(): Promise<boolean>;
    /**
     * Stop the auto-accept service
     */
    stop(): Promise<void>;
    /**
     * Setup CDP by modifying shortcuts
     */
    setupCDP(): Promise<boolean>;
    /**
     * Get service status
     */
    getStatus(): {
        running: boolean;
        retryCount: number;
        connectionCount: number;
    };
    /**
     * Get stats from CDP handler
     */
    getStats(): Promise<CDPStats>;
    /**
     * Reset stats
     */
    resetStats(): Promise<CDPStats>;
    /**
     * Default list of dangerous commands to block
     */
    private getDefaultBannedCommands;
    /**
     * @deprecated Use isCDPAvailable() instead
     */
    isSupported(): boolean;
    /**
     * @deprecated Use getStatus() instead
     */
    getPlatformName(): string;
    /**
     * @deprecated CDP handles retries internally
     */
    triggerRetryCheck(): Promise<boolean>;
}
//# sourceMappingURL=AutoRetryService.d.ts.map