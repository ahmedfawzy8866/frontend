import { ConfigService } from './ConfigService';
import { SyncService } from './SyncService';
export declare class WatcherService {
    private configService;
    private syncService;
    private watcher;
    private debounceTimer;
    private pendingChanges;
    constructor(configService: ConfigService, syncService: SyncService);
    /**
     * Start watching for file changes
     */
    start(): void;
    /**
     * Stop watching
     */
    stop(): void;
    /**
     * Handle file change with debouncing
     */
    private handleChange;
    /**
     * Trigger sync after debounce period
     */
    private triggerSync;
}
//# sourceMappingURL=WatcherService.d.ts.map