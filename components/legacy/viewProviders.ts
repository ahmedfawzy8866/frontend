import * as vscode from 'vscode';
import { AutoBootManager } from './autoBootManager';

export class ViewProviders {
    private autoBootManager: AutoBootManager;

    constructor(autoBootManager: AutoBootManager) {
        this.autoBootManager = autoBootManager;
    }

    registerViewProviders(context: vscode.ExtensionContext) {
        // Register server status view provider
        const serverStatusProvider = new ServerStatusProvider(this.autoBootManager);
        vscode.window.registerTreeDataProvider('autoboot.serverStatus', serverStatusProvider);

        // Register project info view provider
        const projectInfoProvider = new ProjectInfoProvider(this.autoBootManager);
        vscode.window.registerTreeDataProvider('autoboot.projectInfo', projectInfoProvider);

        // Register quick actions view provider
        const quickActionsProvider = new QuickActionsProvider();
        vscode.window.registerTreeDataProvider('autoboot.quickActions', quickActionsProvider);

        // Register insights view provider
        const insightsProvider = new InsightsProvider(this.autoBootManager);
        vscode.window.registerTreeDataProvider('autoboot.insights', insightsProvider);
    }
}

class ServerStatusProvider implements vscode.TreeDataProvider<ServerStatusItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<ServerStatusItem | undefined | null | void> = new vscode.EventEmitter<ServerStatusItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<ServerStatusItem | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor(private autoBootManager: AutoBootManager) {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: ServerStatusItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: ServerStatusItem): Thenable<ServerStatusItem[]> {
        if (!element) {
            const projectInfo = this.autoBootManager.getProjectInfo();
            if (projectInfo) {
                return Promise.resolve([
                    new ServerStatusItem(`Framework: ${projectInfo.framework}`, vscode.TreeItemCollapsibleState.None),
                    new ServerStatusItem(`Port: ${projectInfo.port}`, vscode.TreeItemCollapsibleState.None),
                    new ServerStatusItem(`Status: ${projectInfo.isRunning ? 'Running' : 'Stopped'}`, vscode.TreeItemCollapsibleState.None)
                ]);
            }
        }
        return Promise.resolve([]);
    }
}

class ProjectInfoProvider implements vscode.TreeDataProvider<ProjectInfoItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<ProjectInfoItem | undefined | null | void> = new vscode.EventEmitter<ProjectInfoItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<ProjectInfoItem | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor(private autoBootManager: AutoBootManager) {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: ProjectInfoItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: ProjectInfoItem): Thenable<ProjectInfoItem[]> {
        if (!element) {
            const projectInfo = this.autoBootManager.getProjectInfo();
            if (projectInfo) {
                return Promise.resolve([
                    new ProjectInfoItem(`Package Manager: ${projectInfo.packageManager}`, vscode.TreeItemCollapsibleState.None),
                    new ProjectInfoItem(`Dev Script: ${projectInfo.devScript}`, vscode.TreeItemCollapsibleState.None)
                ]);
            }
        }
        return Promise.resolve([]);
    }
}

class QuickActionsProvider implements vscode.TreeDataProvider<QuickActionItem> {
    getTreeItem(element: QuickActionItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: QuickActionItem): Thenable<QuickActionItem[]> {
        if (!element) {
            return Promise.resolve([
                new QuickActionItem('Restart Server', 'autoboot.quickRestart', '$(refresh)'),
                new QuickActionItem('Detect Project', 'autoboot.detectProject', '$(search)'),
                new QuickActionItem('Analyze Dependencies', 'autoboot.analyzeDependencies', '$(package)'),
                new QuickActionItem('Analyze Performance', 'autoboot.analyzePerformance', '$(dashboard)')
            ]);
        }
        return Promise.resolve([]);
    }
}

class InsightsProvider implements vscode.TreeDataProvider<InsightItem> {
    constructor(private autoBootManager: AutoBootManager) {}

    getTreeItem(element: InsightItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: InsightItem): Thenable<InsightItem[]> {
        if (!element) {
            return Promise.resolve([
                new InsightItem('No insights available', vscode.TreeItemCollapsibleState.None)
            ]);
        }
        return Promise.resolve([]);
    }
}

class ServerStatusItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }
}

class ProjectInfoItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }
}

class QuickActionItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        commandId: string,
        iconPath: string
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.command = {
            command: commandId,
            title: label
        };
        this.iconPath = new vscode.ThemeIcon(iconPath.replace('$(', '').replace(')', ''));
    }
}

class InsightItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }
}
