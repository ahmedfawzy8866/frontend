/**
 * ConfigService - Manages extension configuration and credentials
 */
import * as vscode from 'vscode';
export interface SyncConfig {
    repositoryUrl: string;
    autoSync: boolean;
    syncIntervalMinutes: number;
    excludePatterns: string[];
    geminiPath: string;
}
export declare class ConfigService {
    private readonly context;
    constructor(context: vscode.ExtensionContext);
    /**
     * Get the full configuration
     */
    getConfig(): SyncConfig;
    /**
     * Check if extension is configured
     */
    isConfigured(): Promise<boolean>;
    /**
     * Get default .gemini/antigravity path (the actual context folder)
     */
    getDefaultGeminiPath(): string;
    /**
     * Get the sync repository local path
     */
    getSyncRepoPath(): string;
    /**
     * Save Git access token using Git credential manager
     * This stores credentials in the system's secure credential store
     */
    saveCredentials(token: string): Promise<void>;
    /**
     * Get Git access token from Git credential manager
     */
    getCredentials(): Promise<string | undefined>;
    /**
     * Delete credentials from Git credential manager
     */
    deleteCredentials(): Promise<void>;
    /**
     * Store credentials in Git credential manager (per-repository)
     */
    private storeGitCredentials;
    /**
     * Retrieve credentials from Git credential manager (per-repository)
     */
    private getGitCredentials;
    /**
     * Delete credentials from Git credential manager (per-repository)
     */
    private deleteGitCredentials;
    /**
     * Configure Git credential helper to use system store
     */
    private configureCredentialHelper;
    /**
     * Parse Git URL to extract protocol, host, and path (for per-repository credentials)
     */
    private parseGitUrl;
    /**
     * Set repository URL
     */
    setRepositoryUrl(url: string): Promise<void>;
    /**
     * Parse repository URL to get owner and repo name
     */
    parseRepositoryUrl(url: string): {
        owner: string;
        repo: string;
    } | null;
}
//# sourceMappingURL=ConfigService.d.ts.map