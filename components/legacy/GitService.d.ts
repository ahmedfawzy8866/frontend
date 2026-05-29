export type LogType = 'info' | 'success' | 'error';
export type LoggerCallback = (message: string, type: LogType) => void;
export declare class GitService {
    private git;
    private repoPath;
    private logger?;
    constructor(repoPath: string);
    /**
     * Set logger callback for sending logs to UI
     */
    setLogger(logger: LoggerCallback): void;
    /**
     * Log message to both console and UI (if logger is set)
     */
    private log;
    /**
     * Store credentials in Git credential manager
     * This stores credentials in the system's secure credential store
     */
    storeCredentials(url: string, token: string): Promise<void>;
    /**
     * Retrieve credentials from Git credential manager
     */
    getCredentials(url: string): Promise<string | undefined>;
    /**
     * Delete credentials from Git credential manager
     */
    deleteCredentials(url: string): Promise<void>;
    /**
     * Configure Git credential helper to use system store
     */
    private configureCredentialHelper;
    /**
     * Parse Git URL to extract protocol and host
     */
    private parseGitUrl;
    /**
     * Initialize or clone the repository
     */
    initializeRepository(remoteUrl: string, pat: string): Promise<void>;
    /**
     * Check if directory is a git repository
     */
    isGitRepository(): Promise<boolean>;
    /**
     * Verify token has access to the repository
     * Returns true if token can access repo, throws error otherwise
     */
    verifyAccess(remoteUrl: string, token: string): Promise<void>;
    /**
     * Stage all changes
     */
    stageAll(): Promise<void>;
    /**
     * Commit changes
     */
    commit(message: string): Promise<string | null>;
    /**
     * Push to remote
     */
    push(): Promise<void>;
    /**
     * Fetch from remote (to update tracking info)
     */
    fetch(): Promise<void>;
    /**
     * Resolve binary file conflict using Smart Resolution:
     * - If size difference > 20%: keep larger (more content)
     * - Else: keep newer (more recent)
     * @returns 'local' or 'remote' indicating which version was kept
     */
    private resolveBinaryConflict;
    /**
     * Handle Smart Merge - resolve conflicts using larger/newer wins strategy
     * @param hasStash - whether there's a stash to pop
     */
    private handleSmartMerge;
    /**
     * Pull from remote (handles divergent branches with rebase)
     */
    pull(): Promise<void>;
    /**
     * Get pending changes count
     */
    getPendingChangesCount(): Promise<number>;
    /**
     * Get changed files list (max 10)
     */
    getChangedFiles(maxFiles?: number): Promise<{
        files: string[];
        total: number;
    }>;
    /**
     * Get ahead/behind counts compared to remote
     */
    getAheadBehind(): Promise<{
        ahead: number;
        behind: number;
    }>;
    /**
     * Get last commit date
     */
    getLastCommitDate(): Promise<string | null>;
    /**
     * Build authenticated URL for Git operations
     * Supports any Git provider: GitHub, GitLab, Bitbucket, etc.
     */
    private buildAuthenticatedUrl;
    /**
     * Remove stale index.lock if exists (from crashed git process)
     */
    private cleanupIndexLock;
}
//# sourceMappingURL=GitService.d.ts.map