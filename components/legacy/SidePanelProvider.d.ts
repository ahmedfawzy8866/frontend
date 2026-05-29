/**
 * SidePanelProvider - WebviewViewProvider for the side panel
 */
import * as vscode from 'vscode';
import { SyncService } from '../services/SyncService';
import { ConfigService } from '../services/ConfigService';
export declare class SidePanelProvider implements vscode.WebviewViewProvider {
    static readonly viewType = "antigravitySync.mainPanel";
    private _view?;
    private readonly _extensionUri;
    private readonly _syncService;
    private readonly _configService;
    private readonly _autoRetryService;
    constructor(extensionUri: vscode.Uri, syncService: SyncService, configService: ConfigService);
    resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken): void | Thenable<void>;
    /**
     * Send current config state to webview
     */
    private sendConfigState;
    /**
     * Handle save config from webview inline form
     */
    private handleSaveConfig;
    /**
     * Validate Git repository URL format
     */
    private validateGitRepoUrl;
    /**
     * Check if repository is PUBLIC by trying to access it without auth
     * If accessible without auth = PUBLIC = reject
     */
    private checkIsPublicRepo;
    /**
     * Handle sync action
     */
    private handleSync;
    /**
     * Handle push action
     */
    private handlePush;
    /**
     * Handle pull action
     */
    private handlePull;
    /**
     * Handle disconnect
     */
    private handleDisconnect;
    /**
     * Update status in webview
     */
    private updateStatus;
    /**
     * Handle folder toggle from webview
     */
    private handleFolderToggle;
    /**
     * Handle enable/disable sync toggle
     */
    private handleToggleSyncEnabled;
    /**
     * Send log message to webview
     */
    private sendLog;
    /**
     * Send git status to webview
     */
    private sendGitStatus;
    /**
     * Show error in webview
     */
    showError(message: string): void;
    /**
     * Update panel data (for external calls)
     */
    updatePanelData(): Promise<void>;
    /**
     * Try to auto-start Auto Retry (called from extension activation)
     * Only starts if CDP is available, otherwise logs error silently
     */
    tryAutoStartRetry(): Promise<void>;
    /**
     * Handle start auto-retry from webview
     * Single button flow: check CDP -> if OK, start; if not, auto-setup
     */
    private handleStartAutoRetry;
    /**
     * Handle stop auto-retry from webview
     */
    private handleStopAutoRetry;
    /**
     * Send auto-retry status to webview
     */
    private sendAutoRetryStatus;
    /**
     * Send auto-retry log message to webview
     */
    private sendAutoRetryLog;
    /**
     * Handle set auto-start setting from webview
     */
    private handleSetAutoStart;
    /**
     * Send auto-start setting to webview
     */
    private sendAutoStartSetting;
    /**
     * Generate HTML for the webview
     */
    private _getHtmlForWebview;
    private getNonce;
}
//# sourceMappingURL=SidePanelProvider.d.ts.map