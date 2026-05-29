/**
 * NotificationService - Handle VS Code notifications
 */
import * as vscode from 'vscode';
export declare enum NotificationType {
    Error = "error",
    Warning = "warning",
    Info = "info"
}
export interface NotificationAction {
    title: string;
    action: () => void | Promise<void>;
}
export declare class NotificationService {
    /**
     * Show an error notification
     */
    static error(message: string, options?: {
        detail?: string;
        actions?: NotificationAction[];
        modal?: boolean;
    }): Promise<void>;
    /**
     * Show a warning notification
     */
    static warning(message: string, options?: {
        detail?: string;
        actions?: NotificationAction[];
    }): Promise<void>;
    /**
     * Show an info notification (only for important events)
     */
    static info(message: string): Promise<void>;
    /**
     * Show progress notification
     */
    static withProgress<T>(title: string, task: (progress: vscode.Progress<{
        message?: string;
        increment?: number;
    }>, token: vscode.CancellationToken) => Promise<T>): Promise<T>;
    /**
     * Pre-defined error handlers
     */
    static handleSyncError(error: Error): void;
    /**
     * Conflict notification
     */
    static handleConflict(files: string[]): void;
}
//# sourceMappingURL=NotificationService.d.ts.map