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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const autoBootManager_1 = require("./autoBootManager");
const statusBarManager_1 = require("./statusBarManager");
const commandManager_1 = require("./commandManager");
const codeQualityInspector_1 = require("./ai/codeQualityInspector");
const qualityReportProvider_1 = require("./ai/qualityReportProvider");
const aiOrchestrator_1 = require("./ai/aiOrchestrator");
const aiChatProvider_1 = require("./ai/aiChatProvider");
const contextSwitcher_1 = require("./context/contextSwitcher");
const contextProvider_1 = require("./context/contextProvider");
let autoBootManager;
let statusBarManager;
let commandManager;
let aiQualityInspector;
let qualityReportProvider;
let aiOrchestrator;
let aiChatProvider;
let contextSwitcher;
let contextSwitcherProvider;
function activate(context) {
    console.log('AutoBoot extension is now active!');
    autoBootManager = new autoBootManager_1.AutoBootManager();
    aiQualityInspector = new codeQualityInspector_1.AICodeQualityInspector();
    qualityReportProvider = new qualityReportProvider_1.QualityReportProvider(context.extensionUri);
    aiOrchestrator = new aiOrchestrator_1.AIOrchestrator(context);
    aiChatProvider = new aiChatProvider_1.AIChatProvider(context.extensionUri, aiOrchestrator);
    contextSwitcher = new contextSwitcher_1.SmartContextSwitcher(context, aiOrchestrator);
    contextSwitcherProvider = new contextProvider_1.ContextSwitcherProvider(context.extensionUri, contextSwitcher);
    statusBarManager = new statusBarManager_1.StatusBarManager();
    commandManager = new commandManager_1.CommandManager(autoBootManager, statusBarManager);
    // Register webview providers
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(qualityReportProvider_1.QualityReportProvider.viewType, qualityReportProvider), vscode.window.registerWebviewViewProvider(aiChatProvider_1.AIChatProvider.viewType, aiChatProvider), vscode.window.registerWebviewViewProvider(contextProvider_1.ContextSwitcherProvider.viewType, contextSwitcherProvider));
    // Register all commands
    registerCommands(context);
    // Initialize status bar
    statusBarManager.initialize();
    // Auto-detect project on activation
    if (vscode.workspace.workspaceFolders) {
        autoBootManager.detectProjectType(vscode.workspace.workspaceFolders[0].uri.fsPath);
    }
    // Watch for workspace changes
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
        if (vscode.workspace.workspaceFolders) {
            autoBootManager.detectProjectType(vscode.workspace.workspaceFolders[0].uri.fsPath);
        }
    });
    // Watch for file changes to trigger auto-restart
    const watcher = vscode.workspace.createFileSystemWatcher('**/*.{js,ts,jsx,tsx,json}');
    watcher.onDidChange(() => {
        const config = vscode.workspace.getConfiguration('autoboot');
        if (config.get('autoRestart')) {
            commandManager.quickRestart();
        }
    });
    context.subscriptions.push(watcher);
}
exports.activate = activate;
function registerCommands(context) {
    const commands = [
        // Original AutoBoot commands
        vscode.commands.registerCommand('autoboot.quickRestart', () => commandManager.quickRestart()),
        vscode.commands.registerCommand('autoboot.detectProject', () => commandManager.detectProject()),
        vscode.commands.registerCommand('autoboot.serverStatus', () => commandManager.serverStatus()),
        vscode.commands.registerCommand('autoboot.analyzeDependencies', () => commandManager.analyzeDependencies()),
        vscode.commands.registerCommand('autoboot.analyzePerformance', () => commandManager.analyzePerformance()),
        vscode.commands.registerCommand('autoboot.analyzeError', () => commandManager.analyzeError()),
        vscode.commands.registerCommand('autoboot.createProject', () => commandManager.createProject()),
        vscode.commands.registerCommand('autoboot.openDashboard', () => commandManager.openDashboard()),
        vscode.commands.registerCommand('autoboot.chooseRunOption', () => commandManager.chooseRunOption()),
        // AI Code Quality Inspector commands
        vscode.commands.registerCommand('autoboot.analyzeCodeQuality', async () => {
            try {
                const score = await aiQualityInspector.analyzeWorkspace();
                vscode.window.showInformationMessage(`Code Quality Score: ${score.overall.toFixed(1)}/10`);
            }
            catch (error) {
                vscode.window.showErrorMessage(`Analysis failed: ${error}`);
            }
        }),
        vscode.commands.registerCommand('autoboot.showQualityReport', () => {
            vscode.commands.executeCommand('autoboot.qualityReport.focus');
        }),
        vscode.commands.registerCommand('autoboot.exportQualityReport', async () => {
            try {
                const score = await aiQualityInspector.analyzeWorkspace();
                const report = {
                    timestamp: new Date().toISOString(),
                    qualityScore: score,
                    version: '1.0'
                };
                const uri = await vscode.window.showSaveDialog({
                    defaultUri: vscode.Uri.file('quality-report.json'),
                    filters: { 'JSON': ['json'] }
                });
                if (uri) {
                    await vscode.workspace.fs.writeFile(uri, Buffer.from(JSON.stringify(report, null, 2)));
                    vscode.window.showInformationMessage('Quality report exported successfully');
                }
            }
            catch (error) {
                vscode.window.showErrorMessage(`Export failed: ${error}`);
            }
        }),
        // AI Orchestrator commands
        vscode.commands.registerCommand('autoboot.openAIChat', () => {
            vscode.commands.executeCommand('autoboot.aiChat.focus');
        }),
        // Context Switcher Commands
        vscode.commands.registerCommand('autoboot.openContextSwitcher', () => {
            vscode.commands.executeCommand('autoboot.contextSwitcher.focus');
        }),
        vscode.commands.registerCommand('autoboot.switchContext', async () => {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
                vscode.window.showErrorMessage('No workspace folders available');
                return;
            }
            const items = workspaceFolders.map(folder => ({
                label: folder.name,
                description: folder.uri.fsPath,
                detail: `Switch to ${folder.name} workspace`
            }));
            const selected = await vscode.window.showQuickPick(items, {
                placeHolder: 'Select workspace to switch to'
            });
            if (selected) {
                await contextSwitcher.switchToProject(selected.description);
            }
        }),
        vscode.commands.registerCommand('autoboot.createBookmark', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active editor to bookmark');
                return;
            }
            const title = await vscode.window.showInputBox({
                prompt: 'Enter bookmark title',
                placeHolder: 'My important bookmark'
            });
            if (!title) {
                return;
            }
            const description = await vscode.window.showInputBox({
                prompt: 'Enter bookmark description (optional)',
                placeHolder: 'Why is this important?'
            });
            await contextSwitcher.createBookmark(title, description || '', editor.document.uri.fsPath, editor.selection.start);
            vscode.window.showInformationMessage(`Bookmark "${title}" created`);
        }),
        vscode.commands.registerCommand('autoboot.captureContext', async () => {
            await contextSwitcher.captureCurrentState();
            vscode.window.showInformationMessage('Context state captured');
        }),
        vscode.commands.registerCommand('autoboot.findReferences', async () => {
            const query = await vscode.window.showInputBox({
                prompt: 'Enter search query for cross-project references',
                placeHolder: 'function name, pattern, or concept'
            });
            if (query) {
                vscode.window.showInformationMessage(`Searching for references: ${query}`);
                // The actual search would be handled by the context switcher
            }
        }),
        vscode.commands.registerCommand('autoboot.configureAIModels', async () => {
            const providers = ['openai', 'anthropic', 'google'];
            for (const provider of providers) {
                const apiKey = await vscode.window.showInputBox({
                    prompt: `Enter your ${provider.toUpperCase()} API key (optional)`,
                    password: true,
                    placeHolder: 'sk-...'
                });
                if (apiKey) {
                    await aiOrchestrator.configureAPIKey(provider, apiKey);
                }
            }
            vscode.window.showInformationMessage('AI models configured successfully');
        }),
        vscode.commands.registerCommand('autoboot.showAIUsageStats', () => {
            const stats = aiOrchestrator.getUsageStats();
            vscode.window.showInformationMessage(`AI Usage: ${stats.totalRequests} requests, $${stats.totalCost.toFixed(4)} total cost`);
        }),
        vscode.commands.registerCommand('autoboot.createPromptTemplate', async () => {
            const name = await vscode.window.showInputBox({
                prompt: 'Enter template name',
                placeHolder: 'My Custom Template'
            });
            if (!name) {
                return;
            }
            const description = await vscode.window.showInputBox({
                prompt: 'Enter template description',
                placeHolder: 'What does this template do?'
            });
            const template = await vscode.window.showInputBox({
                prompt: 'Enter template content (use {{variable}} for placeholders)',
                placeHolder: 'Please {{action}} the following {{language}} code: {{code}}'
            });
            if (name && template) {
                const variables = Array.from(template.matchAll(/{{(\w+)}}/g), m => m[1]);
                const taskTypes = ['code_generation', 'code_review', 'debugging', 'documentation', 'testing', 'refactoring', 'explanation', 'optimization', 'security_analysis', 'translation'];
                const taskType = await vscode.window.showQuickPick(taskTypes, {
                    placeHolder: 'Select task type for this template'
                });
                if (taskType) {
                    await aiOrchestrator.savePromptTemplate({
                        id: Date.now().toString(),
                        name,
                        description: description || '',
                        template,
                        variables,
                        taskType: taskType,
                        tags: [],
                        isPublic: false,
                        createdBy: 'user',
                        usageCount: 0,
                        rating: 0
                    });
                    vscode.window.showInformationMessage('Prompt template created successfully');
                }
            }
        })
    ];
    commands.forEach(command => context.subscriptions.push(command));
}
function registerViewProviders(context) {
    // Register AI Quality Report view provider
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(qualityReportProvider_1.QualityReportProvider.viewType, qualityReportProvider));
}
function deactivate() {
    if (autoBootManager) {
        autoBootManager.dispose();
    }
    if (statusBarManager) {
        statusBarManager.dispose();
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map