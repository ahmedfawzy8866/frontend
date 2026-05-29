export type RelaunchStatus = 'MODIFIED' | 'READY' | 'FAILED' | 'NOT_FOUND';
export type RelauncherLogCallback = (message: string, type: 'info' | 'success' | 'error' | 'warning') => void;
export declare class Relauncher {
    private platform;
    private logCallback?;
    private cdpPort;
    constructor();
    setLogCallback(callback: RelauncherLogCallback): void;
    private log;
    getIdeName(): string;
    getCDPPort(): number;
    getCDPFlag(): string;
    checkCurrentProcessHasFlag(): boolean;
    /**
     * Main entry point: setup CDP and show instructions
     */
    ensureCDPAndPrompt(): Promise<{
        success: boolean;
        relaunched: boolean;
    }>;
    /**
     * Show setup complete dialog with platform-specific instructions
     */
    private showSetupDialog;
    /**
     * macOS: Show dialog with Terminal and Finder options
     */
    private showMacOSDialog;
    /**
     * Windows: Show dialog with CMD/PowerShell instructions
     */
    private showWindowsDialog;
    /**
     * Linux: Show dialog with Terminal instructions
     */
    private showLinuxDialog;
    /**
     * Get launch command for current platform
     * Uses background-friendly commands so user can close terminal
     */
    private getLaunchCommand;
    /**
     * Find executable path for current platform
     */
    private findExecutable;
    /**
     * Show manual instructions
     */
    showManualInstructions(): void;
    /**
     * Modify shortcut/wrapper for current platform
     */
    modifyShortcut(): Promise<RelaunchStatus>;
    /**
     * macOS: Create wrapper script
     */
    private createMacOSWrapper;
    /**
     * Windows: Modify shortcuts using PowerShell
     */
    private modifyWindowsShortcut;
    /**
     * Linux: Modify .desktop file
     */
    private modifyLinuxDesktop;
}
//# sourceMappingURL=Relauncher.d.ts.map