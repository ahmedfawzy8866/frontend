import * as vscode from 'vscode';
import { AutoBootManager } from './autoBootManager';
import { StatusBarManager } from './statusBarManager';
import { CommandManager } from './commandManager';
import { AICodeQualityInspector } from './ai/codeQualityInspector';
import { QualityReportProvider } from './ai/qualityReportProvider';
import { AIOrchestrator } from './ai/aiOrchestrator';
import { AIChatProvider } from './ai/aiChatProvider';
import { SmartContextSwitcher } from './context/contextSwitcher';
import { ContextSwitcherProvider } from './context/contextProvider';

let autoBootManager: AutoBootManager;
let statusBarManager: StatusBarManager;
let commandManager: CommandManager;
let aiQualityInspector: AICodeQualityInspector;
let qualityReportProvider: QualityReportProvider;
let aiOrchestrator: AIOrchestrator;
let aiChatProvider: AIChatProvider;
let contextSwitcher: SmartContextSwitcher;
let contextSwitcherProvider: ContextSwitcherProvider;

export function activate(context: vscode.ExtensionContext) {
    console.log('AutoBoot extension is now active!');

    autoBootManager = new AutoBootManager();
    aiQualityInspector = new AICodeQualityInspector();
    qualityReportProvider = new QualityReportProvider(context.extensionUri);
    aiOrchestrator = new AIOrchestrator(context);
    aiChatProvider = new AIChatProvider(context.extensionUri, aiOrchestrator);
    contextSwitcher = new SmartContextSwitcher(context, aiOrchestrator);
    contextSwitcherProvider = new ContextSwitcherProvider(context.extensionUri, contextSwitcher);
    statusBarManager = new StatusBarManager();
    commandManager = new CommandManager(autoBootManager, statusBarManager);

    // Register webview providers
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            QualityReportProvider.viewType,
            qualityReportProvider
        ),
        vscode.window.registerWebviewViewProvider(
            AIChatProvider.viewType,
            aiChatProvider
        ),
        vscode.window.registerWebviewViewProvider(
            ContextSwitcherProvider.viewType,
            contextSwitcherProvider
        )
    );

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

function registerCommands(context: vscode.ExtensionContext) {
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
            } catch (error) {
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
            } catch (error) {
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
            
            if (!title) {return;}
            
            const description = await vscode.window.showInputBox({
                prompt: 'Enter bookmark description (optional)',
                placeHolder: 'Why is this important?'
            });
            
            await contextSwitcher.createBookmark(
                title,
                description || '',
                editor.document.uri.fsPath,
                editor.selection.start
            );
            
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
            vscode.window.showInformationMessage(
                `AI Usage: ${stats.totalRequests} requests, $${stats.totalCost.toFixed(4)} total cost`
            );
        }),

        vscode.commands.registerCommand('autoboot.createPromptTemplate', async () => {
            const name = await vscode.window.showInputBox({
                prompt: 'Enter template name',
                placeHolder: 'My Custom Template'
            });
            
            if (!name) {return;}
            
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
                        taskType: taskType as any,
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

function registerViewProviders(context: vscode.ExtensionContext) {
    // Register AI Quality Report view provider
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            QualityReportProvider.viewType,
            qualityReportProvider
        )
    );
}

export function deactivate() {
    if (autoBootManager) {
        autoBootManager.dispose();
    }
    if (statusBarManager) {
        statusBarManager.dispose();
    }
}
