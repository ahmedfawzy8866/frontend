/**
 * SyncService - Core sync orchestration
 * Provider-agnostic: works with any Git remote (GitHub, GitLab, Bitbucket, etc.)
 */
import * as vscode from 'vscode';
import { ConfigService } from './ConfigService';
import { StatusBarService } from './StatusBarService';
export interface SyncStatus {
    syncStatus: string;
    lastSync: string | null;
    pendingChanges: number;
    repository: string | null;
}
export declare class SyncService {
    private context;
    private configService;
    private statusBar;
    private gitService;
    private filterService;
    private isSyncing;
    private autoSyncTimer;
    private nextSyncTime;
    private countdownCallback;
    private countdownInterval;
    constructor(context: vscode.ExtensionContext, configService: ConfigService, statusBar: StatusBarService);
    /**
     * Initialize sync - setup git and filter services
     * Works with any Git provider (GitHub, GitLab, Bitbucket, etc.)
     */
    initialize(): Promise<void>;
    /**
     * Get lock file path
     */
    private getLockFilePath;
    /**
     * Acquire sync lock - prevents multiple VS Code windows from syncing simultaneously
     * Uses atomic file creation with timeout for stale locks
     */
    private acquireLock;
    /**
     * Release sync lock
     */
    private releaseLock;
    /**
     * Full sync (push + pull)
     */
    sync(): Promise<void>;
    /**
     * Push local changes to remote
     */
    push(): Promise<void>;
    /**
     * Push without initial pull (used by sync() to avoid double pull)
     */
    private pushWithoutPull;
    /**
     * Pull remote changes to local
     */
    pull(): Promise<void>;
    /**
     * Get current sync status
     */
    getStatus(): Promise<SyncStatus>;
    /**
     * Copy files only (for refresh status without push)
     */
    copyFilesOnly(): Promise<void>;
    /**
     * Get detailed git status for UI
     */
    getDetailedStatus(): Promise<{
        ahead: number;
        behind: number;
        files: string[];
        totalFiles: number;
    }>;
    /**
     * Copy filtered files from gemini folder to sync repo
     * @returns number of files copied
     */
    private copyFilesToSyncRepo;
    /**
     * Copy files from sync repo back to gemini folder
     * @returns number of files copied
     */
    private copyFilesFromSyncRepo;
    /**
     * Recursively copy directory contents
     * @returns number of files copied
     */
    private copyDirectoryContents;
    /**
     * Set callback for countdown updates
     */
    setCountdownCallback(callback: (seconds: number) => void): void;
    /**
     * Set logger callback for GitService to send logs to UI
     */
    setGitLogger(logger: (message: string, type: 'info' | 'success' | 'error') => void): void;
    /**
     * Start auto-sync timer
     */
    startAutoSync(): void;
    /**
     * Stop auto-sync timer
     */
    stopAutoSync(): void;
    /**
     * Get next sync time in seconds
     */
    getSecondsUntilNextSync(): number;
}
//# sourceMappingURL=SyncService.d.ts.map