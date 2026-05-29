export declare class FilterService {
    private ig;
    private geminiPath;
    private static readonly DEFAULT_EXCLUDES;
    constructor(geminiPath: string, customPatterns?: string[]);
    /**
     * Load custom ignore patterns from .antigravityignore
     */
    private loadIgnoreFile;
    /**
     * Check if a file should be ignored
     */
    shouldIgnore(relativePath: string): boolean;
    /**
     * Filter a list of files, returning only those that should be synced
     */
    filterFiles(files: string[]): string[];
    /**
     * Get all files that should be synced from the gemini directory
     */
    getFilesToSync(): Promise<string[]>;
    /**
     * Recursively walk directory and collect non-ignored files
     */
    private walkDirectory;
    /**
     * Get the default exclude patterns (for documentation/display)
     */
    static getDefaultExcludes(): string[];
}
//# sourceMappingURL=FilterService.d.ts.map