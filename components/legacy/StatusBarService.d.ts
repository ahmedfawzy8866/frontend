/**
 * StatusBarService - VS Code status bar integration
 */
import * as vscode from 'vscode';
export declare enum SyncState {
    Synced = "synced",
    Syncing = "syncing",
    Pushing = "pushing",
    Pulling = "pulling",
    Pending = "pending",
    Error = "error",
    NotConfigured = "not-configured"
}
export declare class StatusBarService {
    private statusBarItem;
    private currentState;
    constructor();
    /**
     * Update status bar state
     */
    update(state: SyncState): void;
    /**
     * Set error state with custom message
     */
    setError(errorMessage: string): void;
    /**
     * Get current state
     */
    getState(): SyncState;
    /**
     * Show status bar item
     */
    show(): void;
    /**
     * Hide status bar item
     */
    hide(): void;
    /**
     * Get the status bar item for disposal
     */
    getStatusBarItem(): vscode.StatusBarItem;
}
//# sourceMappingURL=StatusBarService.d.ts.map