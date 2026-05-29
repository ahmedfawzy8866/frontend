"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = exports.extension = exports.Extension = void 0;
const vscode = require("vscode");
const prettyBytes = require("pretty-bytes");
const vscode_1 = require("vscode");
const path = require("path");
const fsExtra = require("fs-extra");
const util_1 = require("./util");
const DeviceManager_1 = require("./deviceDiscovery/DeviceManager");
const BrightScriptCommands_1 = require("./BrightScriptCommands");
const BrightScriptXmlDefinitionProvider_1 = require("./BrightScriptXmlDefinitionProvider");
const DebugConfigurationProvider_1 = require("./DebugConfigurationProvider");
const DeclarationProvider_1 = require("./DeclarationProvider");
const DefinitionRepository_1 = require("./DefinitionRepository");
const formatter_1 = require("./formatter");
const LogDocumentLinkProvider_1 = require("./LogDocumentLinkProvider");
const LogOutputManager_1 = require("./LogOutputManager");
const RendezvousViewProvider_1 = require("./viewProviders/RendezvousViewProvider");
const DevicesViewProvider_1 = require("./viewProviders/DevicesViewProvider");
const SceneGraphDebugCommands_1 = require("./SceneGraphDebugCommands");
const GlobalStateManager_1 = require("./GlobalStateManager");
const LanguageServerManager_1 = require("./LanguageServerManager");
const TelemetryManager_1 = require("./managers/TelemetryManager");
const RemoteControlManager_1 = require("./managers/RemoteControlManager");
const WhatsNewManager_1 = require("./managers/WhatsNewManager");
const roku_debug_1 = require("roku-debug");
const RtaManager_1 = require("./managers/RtaManager");
const WebviewViewProviderManager_1 = require("./managers/WebviewViewProviderManager");
const ViewProviderId_1 = require("./viewProviders/ViewProviderId");
const DiagnosticManager_1 = require("./managers/DiagnosticManager");
const constants_1 = require("./constants");
const UserInputManager_1 = require("./managers/UserInputManager");
const LocalPackageManager_1 = require("./managers/LocalPackageManager");
const BrightScriptTaskProvider_1 = require("./BrightScriptTaskProvider");
const brighterscript_1 = require("brighterscript");
const PerfettoEditor_1 = require("./editors/PerfettoEditor");
class Extension {
    constructor() {
        this.diagnosticManager = new DiagnosticManager_1.DiagnosticManager();
    }
    async activate(context) {
        var _a;
        //make this entire extension disposable so that all resources will be cleaned up on extension deactivation
        context.subscriptions.push(this);
        const currentExtensionVersion = (_a = vscode_1.extensions.getExtension(constants_1.EXTENSION_ID)) === null || _a === void 0 ? void 0 : _a.packageJSON.version;
        this.globalStateManager = new GlobalStateManager_1.GlobalStateManager(context);
        this.whatsNewManager = new WhatsNewManager_1.WhatsNewManager(this.globalStateManager, currentExtensionVersion);
        this.chanperfStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
        //initialize the analytics manager
        context.subscriptions.push(this.telemetryManager = new TelemetryManager_1.TelemetryManager({
            extensionId: constants_1.EXTENSION_ID,
            extensionVersion: currentExtensionVersion
        }));
        let localPackageManager = new LocalPackageManager_1.LocalPackageManager((0, brighterscript_1.standardizePath) `${context.globalStorageUri.fsPath}/packages`, context);
        this.telemetryManager.sendStartupEvent();
        this.deviceManager = new DeviceManager_1.DeviceManager(context, this.globalStateManager);
        let userInputManager = new UserInputManager_1.UserInputManager(this.deviceManager);
        this.remoteControlManager = new RemoteControlManager_1.RemoteControlManager(this.telemetryManager);
        this.brightScriptCommands = new BrightScriptCommands_1.BrightScriptCommands(this.remoteControlManager, this.whatsNewManager, context, this.deviceManager, userInputManager, localPackageManager);
        this.rtaManager = new RtaManager_1.RtaManager(context);
        this.webviewViewProviderManager = new WebviewViewProviderManager_1.WebviewViewProviderManager(context, this.rtaManager, this.brightScriptCommands);
        this.rtaManager.setWebviewViewProviderManager(this.webviewViewProviderManager);
        PerfettoEditor_1.PerfettoEditorProvider.register(context);
        //update the tracked version of the extension
        this.globalStateManager.lastRunExtensionVersion = currentExtensionVersion;
        const declarationProvider = new DeclarationProvider_1.DeclarationProvider();
        context.subscriptions.push(declarationProvider);
        //create channels
        this.outputChannel = vscode.window.createOutputChannel('BrightScript Log');
        this.sceneGraphDebugChannel = vscode.window.createOutputChannel('SceneGraph Debug Commands');
        this.extensionOutputChannel = util_1.util.createOutputChannel('BrightScript Extension', this.writeExtensionLog.bind(this));
        this.extensionOutputChannel.appendLine('Extension startup');
        let docLinkProvider = new LogDocumentLinkProvider_1.LogDocumentLinkProvider();
        const logOutputManager = new LogOutputManager_1.LogOutputManager(this.outputChannel, context, docLinkProvider, declarationProvider);
        const definitionRepo = new DefinitionRepository_1.DefinitionRepository(declarationProvider);
        //initialize the LanguageServerManager
        void LanguageServerManager_1.languageServerManager.init(context, definitionRepo, localPackageManager);
        //register a tree data provider for this extension's "RENDEZVOUS" view in the debug area
        let rendezvousViewProvider = new RendezvousViewProvider_1.RendezvousViewProvider(context);
        vscode.window.registerTreeDataProvider(ViewProviderId_1.ViewProviderId.rendezvousView, rendezvousViewProvider);
        //register a tree data provider for this extension's "Devices" view
        let devicesViewProvider = new DevicesViewProvider_1.DevicesViewProvider(this.deviceManager);
        const devicesTreeView = vscode.window.createTreeView(ViewProviderId_1.ViewProviderId.devicesView, {
            treeDataProvider: devicesViewProvider
        });
        devicesViewProvider.setTreeView(devicesTreeView);
        // Initialize tasks manager
        const tasksManager = new BrightScriptTaskProvider_1.BrightScriptTaskProvider();
        context.subscriptions.push(tasksManager);
        context.subscriptions.push(vscode.commands.registerCommand('extension.brightscript.rendezvous.clearHistory', async () => {
            try {
                await vscode.debug.activeDebugSession.customRequest('rendezvous.clearHistory');
            }
            catch (_a) { }
            //also clear the local rendezvous list
            rendezvousViewProvider.clear();
        }));
        context.subscriptions.push(vscode.commands.registerCommand('extension.brightscript.languageServer.restart', async () => {
            await LanguageServerManager_1.languageServerManager.restart();
        }));
        //register the code formatter
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider({
            language: 'brightscript',
            scheme: 'file'
        }, new formatter_1.Formatter()), vscode.languages.registerDocumentRangeFormattingEditProvider({
            language: 'brighterscript',
            scheme: 'file'
        }, new formatter_1.Formatter()));
        //register the debug configuration provider
        let configProvider = new DebugConfigurationProvider_1.BrightScriptDebugConfigurationProvider(context, this.telemetryManager, this.extensionOutputChannel, userInputManager, this.brightScriptCommands);
        context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('brightscript', configProvider));
        //register a descriptor factory so we can inject process-level env vars into the debug adapter before it starts.
        //this is required for features like DAP protocol logging, which must be configured before the first DAP message arrives.
        context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory('brightscript', {
            createDebugAdapterDescriptor: (session, executable) => {
                if (!executable) {
                    return executable;
                }
                const env = {};
                // Only inject the DAP protocol log path if the user explicitly configured it.
                const dapLogFilePath = session.configuration.debugAdapterProtocolLogFilePath;
                if (dapLogFilePath) {
                    env.ROKU_DAP_LOG_FILE = dapLogFilePath;
                }
                return new vscode.DebugAdapterExecutable(executable.command, executable.args, { ...executable.options, env: env });
            }
        }));
        //register a link provider for this extension's "BrightScript Log" output
        context.subscriptions.push(vscode.languages.registerDocumentLinkProvider({ language: 'Log', scheme: 'output' }, docLinkProvider));
        vscode.window.registerUriHandler({
            handleUri: async (uri) => {
                if (uri.path.startsWith('/openFile/')) {
                    let docUri = vscode.Uri.file(uri.path.substr(10));
                    let doc = await vscode.workspace.openTextDocument(docUri);
                    await vscode.window.showTextDocument(doc, { preview: false });
                    let editor = vscode.window.activeTextEditor;
                    let lineNumber = Number(uri.fragment) ? Number(uri.fragment) - 1 : 0;
                    editor.selection = new vscode.Selection(lineNumber, 0, lineNumber, 0);
                    await vscode.commands.executeCommand('revealLine', {
                        lineNumber: lineNumber,
                        at: 'center'
                    });
                }
            }
        });
        //give the launch config to the link provider any time we launch the app
        vscode.debug.onDidReceiveDebugSessionCustomEvent((e) => {
            return this.debugSessionCustomEventHandler(e, context, docLinkProvider, logOutputManager, rendezvousViewProvider);
        });
        //register all commands for this extension
        this.brightScriptCommands.registerCommands();
        SceneGraphDebugCommands_1.sceneGraphDebugCommands.registerCommands(context, this.sceneGraphDebugChannel);
        vscode.debug.onDidStartDebugSession((e) => {
            //if this is a brightscript debug session
            if (e.type === 'brightscript') {
                logOutputManager.onDidStartDebugSession();
                this.webviewViewProviderManager.onDidStartDebugSession(e);
            }
            this.diagnosticManager.clear();
        });
        vscode.debug.onDidTerminateDebugSession((e) => {
            var _a;
            //if this is a brightscript debug session
            if (e.type === 'brightscript') {
                this.chanperfStatusBar.hide();
                const config = e.configuration;
                if ((_a = config.remoteControlMode) === null || _a === void 0 ? void 0 : _a.deactivateOnSessionEnd) {
                    void this.remoteControlManager.setRemoteControlMode(false, 'launch');
                }
                this.webviewViewProviderManager.onDidTerminateDebugSession(e);
            }
            this.diagnosticManager.clear();
        });
        let brightscriptConfig = util_1.util.getConfiguration('brightscript');
        if (brightscriptConfig === null || brightscriptConfig === void 0 ? void 0 : brightscriptConfig.outputPanelStartupBehavior) {
            if (brightscriptConfig.outputPanelStartupBehavior === 'show') {
                //show the output panel on extension startup without taking focus (only if configured to do so...defaults to 'nothing')
                this.outputChannel.show(true);
            }
            else if (brightscriptConfig.outputPanelStartupBehavior === 'focus') {
                //focus the output panel on extension startup (only if configured to do so...defaults to 'nothing')
                this.outputChannel.show();
            }
        }
        else if ((brightscriptConfig === null || brightscriptConfig === void 0 ? void 0 : brightscriptConfig.focusOutputPanelOnStartup) === true) {
            // deprecated legacy config value
            //focus the output panel on extension startup (only if configured to do so...defaults to false)
            this.outputChannel.show();
        }
        //xml support
        const xmlSelector = { scheme: 'file', pattern: '**/*.{xml}' };
        context.subscriptions.push(vscode.languages.registerDefinitionProvider(xmlSelector, new BrightScriptXmlDefinitionProvider_1.default(definitionRepo)));
        await this.whatsNewManager.showWelcomeOrWhatsNewIfRequired();
        //await languageServerPromise;
    }
    async debugSessionCustomEventHandler(e, context, docLinkProvider, logOutputManager, rendezvousViewProvider) {
        var _a, _b, _c, _d;
        if ((0, roku_debug_1.isLaunchStartEvent)(e)) {
            const config = e.body;
            await docLinkProvider.setLaunchConfig(config);
            logOutputManager.setLaunchConfig(config);
            if ((_a = config.remoteControlMode) === null || _a === void 0 ? void 0 : _a.activateOnSessionStart) {
                void this.remoteControlManager.setRemoteControlMode(true, 'launch');
            }
        }
        else if ((0, roku_debug_1.isChannelPublishedEvent)(e)) {
            this.webviewViewProviderManager.onChannelPublishedEvent(e);
            //write debug server log statements to the DebugServer output channel
        }
        else if ((0, roku_debug_1.isDebugServerLogOutputEvent)(e)) {
            this.extensionOutputChannel.appendLine(e.body.line);
        }
        else if ((0, roku_debug_1.isRendezvousEvent)(e)) {
            rendezvousViewProvider.onDidReceiveDebugSessionCustomEvent(e);
        }
        else if ((0, roku_debug_1.isCustomRequestEvent)(e)) {
            await this.processCustomRequestEvent(e, e.session);
        }
        else if ((0, roku_debug_1.isChanperfEvent)(e)) {
            if (!e.body.error) {
                this.chanperfStatusBar.text = `$(dashboard)cpu: ${e.body.cpu.total}%, mem: ${prettyBytes(e.body.memory.total).replace(/ /g, '')}`;
            }
            else {
                this.chanperfStatusBar.text = e.body.error.message;
            }
            this.chanperfStatusBar.show();
        }
        else if ((0, roku_debug_1.isProcessCrashEvent)(e)) {
            const data = e.body;
            const label = data.type === 'uncaughtException' ? 'Uncaught exception' : 'Unhandled rejection';
            const selected = await vscode.window.showErrorMessage(`BrightScript debug adapter crashed (${label}): ${data.message}`, { modal: true }, 'Report Issue');
            void vscode.debug.stopDebugging(e.session);
            if (selected === 'Report Issue') {
                let additionalInfoSection = '';
                if (data.additionalInfo && Object.keys(data.additionalInfo).length > 0) {
                    const lines = Object.entries(data.additionalInfo).map(([key, value]) => {
                        // Insert a space before all uppercase letters preceded by a lowercase letter, then uppercase the first char
                        const spacedString = key.replace(/([a-z])([A-Z])/g, '$1 $2');
                        const formattedKey = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
                        return `|${formattedKey}|${typeof value === 'string' ? value : JSON.stringify(value)}|`;
                    });
                    additionalInfoSection = lines.join('\n');
                }
                await vscode.commands.executeCommand('workbench.action.openIssueReporter', {
                    extensionId: 'RokuCommunity.brightscript',
                    issueType: 0,
                    issueTitle: `DAP crash: ${data.type} - ${data.message}`,
                    issueBody: [
                        '## Debug Adapter Crash',
                        `**Type:** ${data.type}`,
                        `**Message:** ${data.message}`,
                        '',
                        '**Steps to reproduce:**',
                        '<!-- Please describe what you were doing when this crash occurred -->',
                        '',
                        '**Stack:**',
                        '```',
                        `${(_b = data.stack) !== null && _b !== void 0 ? _b : 'N/A'}`,
                        '```',
                        '',
                        `<details>`,
                        `<summary>Additional Info</summary>`,
                        '',
                        `|Item|Value|`,
                        `|---|---|`,
                        `${additionalInfoSection || ''}`,
                        '',
                        `</details>`
                    ].join('\n')
                });
            }
        }
        else if ((0, roku_debug_1.isDiagnosticsEvent)(e)) {
            const diagnostics = (_d = (_c = e.body) === null || _c === void 0 ? void 0 : _c.diagnostics) !== null && _d !== void 0 ? _d : [];
            const firstDiagnostic = diagnostics[0];
            if (firstDiagnostic) {
                // open the first file with a compile error
                let uri = vscode.Uri.file(firstDiagnostic.path);
                let doc = await vscode.workspace.openTextDocument(uri);
                await vscode.window.showTextDocument(doc, {
                    preview: false,
                    selection: util_1.util.toRange(firstDiagnostic.range)
                });
            }
            let errorsByPath = {};
            for (const diagnostic of e.body.diagnostics) {
                if (diagnostic.path) {
                    if (!errorsByPath[diagnostic.path]) {
                        errorsByPath[diagnostic.path] = [];
                    }
                    errorsByPath[diagnostic.path].push(diagnostic);
                }
            }
            for (const path in errorsByPath) {
                if (errorsByPath.hasOwnProperty(path)) {
                    await this.diagnosticManager.addDiagnosticForError(path, errorsByPath[path]).catch(() => { });
                }
            }
        }
        try {
            await logOutputManager.onDidReceiveDebugSessionCustomEvent(e);
        }
        catch (err) {
            console.error('Error handling custom event', e, err);
        }
    }
    async showMessage(e) {
        var _a, _b;
        const methods = {
            error: vscode.window.showErrorMessage,
            info: vscode.window.showInformationMessage,
            warn: vscode.window.showWarningMessage
        };
        return {
            selectedAction: await methods[e.body.severity](e.body.message, { modal: e.body.modal }, ...((_b = (_a = e === null || e === void 0 ? void 0 : e.body) === null || _a === void 0 ? void 0 : _a.actions) !== null && _b !== void 0 ? _b : []))
        };
    }
    async processCustomRequestEvent(event, session) {
        try {
            let response;
            if ((0, roku_debug_1.isExecuteTaskCustomRequest)(event)) {
                response = await this.executeTask(event.body.task);
            }
            else if ((0, roku_debug_1.isShowPopupMessageCustomRequest)(event)) {
                response = await this.showMessage(event);
            }
            //send the response back to the server
            await session.customRequest(roku_debug_1.ClientToServerCustomEventName.customRequestEventResponse, {
                requestId: event.body.requestId,
                ...response !== null && response !== void 0 ? response : {}
            });
        }
        catch (error) {
            //send the error back to the server
            await session.customRequest(roku_debug_1.ClientToServerCustomEventName.customRequestEventResponse, {
                requestId: event.body.requestId,
                error: {
                    message: error === null || error === void 0 ? void 0 : error.message,
                    stack: error === null || error === void 0 ? void 0 : error.stack
                }
            });
        }
    }
    async executeTask(taskName) {
        const tasks = await vscode.tasks.fetchTasks();
        const targetTask = tasks.find(x => x.name === taskName);
        if (!targetTask) {
            throw new Error(`Cannot find task '$taskName}'`);
        }
        let execution;
        let taskFinished = new Promise((resolve, reject) => {
            //monitor all ended tasks to see when our task ends
            const disposable = vscode.tasks.onDidEndTask((e) => {
                if (e.execution === execution) {
                    disposable.dispose();
                    resolve();
                }
            });
        });
        execution = await vscode.tasks.executeTask(targetTask);
        console.log(execution);
        await taskFinished;
    }
    /**
     * Writes text to a logfile if enabled
     */
    writeExtensionLog(text) {
        var _a, _b;
        let extensionLogfilePath = util_1.util.getConfiguration('brightscript').get('extensionLogfilePath');
        if (extensionLogfilePath) {
            //replace the ${workspaceFolder} variable with the path to the first workspace
            extensionLogfilePath = extensionLogfilePath.replace('${workspaceFolder}', (_b = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.uri.fsPath);
            fsExtra.ensureDirSync(path.dirname(extensionLogfilePath));
            fsExtra.appendFileSync(extensionLogfilePath, text);
        }
    }
    dispose() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        (_b = (_a = this.outputChannel) === null || _a === void 0 ? void 0 : _a.dispose) === null || _b === void 0 ? void 0 : _b.call(_a);
        (_d = (_c = this.sceneGraphDebugChannel) === null || _c === void 0 ? void 0 : _c.dispose) === null || _d === void 0 ? void 0 : _d.call(_c);
        (_f = (_e = this.extensionOutputChannel) === null || _e === void 0 ? void 0 : _e.dispose) === null || _f === void 0 ? void 0 : _f.call(_e);
        (_h = (_g = this.chanperfStatusBar) === null || _g === void 0 ? void 0 : _g.dispose) === null || _h === void 0 ? void 0 : _h.call(_g);
        (_k = (_j = this.diagnosticManager) === null || _j === void 0 ? void 0 : _j.dispose) === null || _k === void 0 ? void 0 : _k.call(_j);
        (_m = (_l = this.deviceManager) === null || _l === void 0 ? void 0 : _l.dispose) === null || _m === void 0 ? void 0 : _m.call(_l);
    }
}
exports.Extension = Extension;
exports.extension = new Extension();
async function activate(context) {
    await exports.extension.activate(context);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map