"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewProviders = void 0;
const vscode = __importStar(require("vscode"));
class ViewProviders {
    constructor(autoBootManager) {
        this.autoBootManager = autoBootManager;
    }
    registerViewProviders(context) {
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
exports.ViewProviders = ViewProviders;
class ServerStatusProvider {
    constructor(autoBootManager) {
        this.autoBootManager = autoBootManager;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
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
class ProjectInfoProvider {
    constructor(autoBootManager) {
        this.autoBootManager = autoBootManager;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
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
class QuickActionsProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
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
class InsightsProvider {
    constructor(autoBootManager) {
        this.autoBootManager = autoBootManager;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            return Promise.resolve([
                new InsightItem('No insights available', vscode.TreeItemCollapsibleState.None)
            ]);
        }
        return Promise.resolve([]);
    }
}
class ServerStatusItem extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
    }
}
class ProjectInfoItem extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
    }
}
class QuickActionItem extends vscode.TreeItem {
    constructor(label, commandId, iconPath) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.label = label;
        this.command = {
            command: commandId,
            title: label
        };
        this.iconPath = new vscode.ThemeIcon(iconPath.replace('$(', '').replace(')', ''));
    }
}
class InsightItem extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
    }
}
//# sourceMappingURL=viewProviders.js.map