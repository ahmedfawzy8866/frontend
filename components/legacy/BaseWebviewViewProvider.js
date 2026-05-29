"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWebviewViewProvider = void 0;
const vscode = require("vscode");
const path = require("path");
const fsExtra = require("fs-extra");
const VscodeContextManager_1 = require("../managers/VscodeContextManager");
const ViewProviderEvent_1 = require("./ViewProviderEvent");
const ViewProviderCommand_1 = require("./ViewProviderCommand");
class BaseWebviewViewProvider {
    constructor(extensionContext, dependencies) {
        this.extensionContext = extensionContext;
        this.dependencies = dependencies;
        this.viewReady = false;
        this.queuedMessages = [];
        this.messageCommandCallbacks = {};
        this.webviewBasePath = path.join(extensionContext.extensionPath, 'dist', 'webviews');
        extensionContext.subscriptions.push(this);
        this.extensionContext = extensionContext;
    }
    dispose() {
        var _a;
        void ((_a = this.outDirWatcher) === null || _a === void 0 ? void 0 : _a.unsubscribe());
    }
    setWebviewViewProviderManager(manager) {
        this.webviewViewProviderManager = manager;
    }
    onDidStartDebugSession(e) {
        // Can be overwritten in a child to notify on debug session start
    }
    onDidTerminateDebugSession(e) {
        // Can be overwritten in a child to notify on debug session end
    }
    onChannelPublishedEvent(e) {
        // Can be overwritten in a child to notify on channel publish
    }
    createCommandMessage(command, context = {}) {
        const message = {
            command: command,
            context: context
        };
        return message;
    }
    createEventMessage(event, context = {}) {
        const message = {
            event: event,
            context: context
        };
        return message;
    }
    createResponseMessage(incomingMessage, response = undefined, error = undefined) {
        const message = {
            ...incomingMessage,
            response: response,
            error: error
        };
        return message;
    }
    postOrQueueMessage(message) {
        if (this.viewReady) {
            this.postMessage(message);
        }
        else {
            this.queuedMessages.push(message);
        }
    }
    postMessage(message) {
        var _a, _b;
        (_a = this.view) === null || _a === void 0 ? void 0 : _a.webview.postMessage(message).then(null, (reason) => {
            console.log('postMessage failed: ', reason);
        });
        (_b = this.panel) === null || _b === void 0 ? void 0 : _b.webview.postMessage(message).then(null, (reason) => {
            console.log('postMessage failed: ', reason);
        });
    }
    postQueuedMessages() {
        for (const queuedMessage of this.queuedMessages) {
            this.postMessage(queuedMessage);
        }
    }
    addMessageCommandCallback(command, callback) {
        this.messageCommandCallbacks[command] = callback;
    }
    setupViewMessageObserver(webview) {
        webview.onDidReceiveMessage(async (message) => {
            try {
                const command = message.command;
                if (command === ViewProviderCommand_1.ViewProviderCommand.viewReady) {
                    this.viewReady = true;
                    this.onViewReady();
                    this.postQueuedMessages();
                }
                else if (command === ViewProviderCommand_1.ViewProviderCommand.setVscodeContext) {
                    const context = message.context;
                    await VscodeContextManager_1.vscodeContextManager.set(context.key, context.value);
                }
                else if (command === ViewProviderCommand_1.ViewProviderCommand.getVscodeContext) {
                    const context = message.context;
                    const value = VscodeContextManager_1.vscodeContextManager.get(context.key);
                    this.postOrQueueMessage(this.createResponseMessage(message, {
                        value: value
                    }));
                }
                else if (command === ViewProviderCommand_1.ViewProviderCommand.sendMessageToWebviews) {
                    const context = message.context;
                    this.webviewViewProviderManager.sendMessageToWebviews(context.viewIds, context.message);
                }
                else if (command === ViewProviderCommand_1.ViewProviderCommand.updateWorkspaceState) {
                    const context = message.context;
                    await this.extensionContext.workspaceState.update(context.key, context.value);
                    this.postOrQueueMessage(this.createResponseMessage(message));
                }
                else if (command === ViewProviderCommand_1.ViewProviderCommand.getWorkspaceState) {
                    const context = message.context;
                    const response = await this.extensionContext.workspaceState.get(context.key, context.defaultValue);
                    this.postOrQueueMessage(this.createResponseMessage(message, response));
                }
                else {
                    const callback = this.messageCommandCallbacks[command];
                    if (!callback || !await callback(message)) {
                        console.warn('Did not handle message', message);
                    }
                }
            }
            catch (e) {
                this.postMessage({
                    ...message,
                    error: {
                        message: e.message,
                        stack: e.stack
                    }
                });
            }
        });
    }
    registerCommandWithWebViewNotifier(command, callback = undefined) {
        this.registerCommand(command, async () => {
            if (callback) {
                await callback();
            }
            const message = this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onVscodeCommandReceived, {
                commandName: command
            });
            this.postOrQueueMessage(message);
        });
    }
    registerCommand(command, callback) {
        this.extensionContext.subscriptions.push(vscode.commands.registerCommand(command, callback));
    }
    onViewReady() { }
    /** Adds ability to add additional script contents to the main webview html */
    additionalScriptContents() {
        return [];
    }
    async getHtmlForWebview() {
        try {
            let watcher;
            try {
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                watcher = require('@parcel/watcher');
            }
            catch (e) {
                // Doing nothing if watcher does not exist
            }
            if (watcher && !this.outDirWatcher) {
                // When in dev mode, spin up a watcher to auto-reload the webview whenever the files have changed.
                this.outDirWatcher = await watcher.subscribe(this.webviewBasePath, (err, events) => {
                    //only refresh when the index.html page is changed. Since vite rewrites the file on every build, this is enough to know to reload the page
                    if (events.find(x => { var _a, _b; return (x.type === 'create' || x.type === 'update') && ((_b = (_a = x.path) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.endsWith('index.html')); })) {
                        this.view.webview.html = '';
                        this.view.webview.html = this.getIndexHtml();
                    }
                });
            }
        }
        catch (e) {
            console.error(e);
        }
        return this.getIndexHtml();
    }
    /**
    * Get a webview-supported URI for the given path
    */
    asWebviewUri(...parts) {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.webview) === null || _b === void 0 ? void 0 : _b.asWebviewUri) === null || _c === void 0 ? void 0 : _c.call(_b, vscode.Uri.file(path.join(...parts)));
    }
    getIndexHtml() {
        let html;
        try {
            html = fsExtra.readFileSync(this.webviewBasePath + '/index.html').toString();
        }
        catch (e) {
            console.error(e);
            html = '<h1>Error loading webview</h1>';
        }
        //the data that will be replaced in the index.html
        const data = {
            viewName: this.id,
            baseHref: `${this.asWebviewUri(this.webviewBasePath)}/`,
            additionalScriptContents: this.additionalScriptContents().join('\n                        ')
        };
        /**
         * replace placeholders in the html, in one of these formats:
         * <!--{{thing1}}-->
         * //{{thing2}}
         * {{thing3}}
         */
        html = html.replace(/(\/\/{{(\w+)}})|({{(\w+)}})|(<!--{{(\w+)}})/gm, (...match) => {
            var _a, _b, _c;
            const [, , key1, , key2, , key3] = match;
            return (_c = (_b = (_a = data[key1]) !== null && _a !== void 0 ? _a : data[key2]) !== null && _b !== void 0 ? _b : data[key3]) !== null && _c !== void 0 ? _c : match[0];
        });
        // remove leading slash for css/js urls so we can make them relative to the baseHref
        html = html.replace(/((?:href|src)\s*=\s*["'])(\/.*")/g, (...match) => {
            var _a;
            return match[1] + ((_a = match[2]) === null || _a === void 0 ? void 0 : _a.replace(/^\/+/, ''));
        });
        return html;
    }
    async resolveWebviewView(view, _context, _token) {
        this.view = view;
        const webview = view.webview;
        this.setupViewMessageObserver(webview);
        webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(this.webviewBasePath)
            ]
        };
        webview.html = await this.getHtmlForWebview();
    }
    async createOrRevealWebviewPanel() {
        // See if we need to make the panel or not
        let createPanel = false;
        if (!this.panel) {
            createPanel = true;
        }
        else {
            try {
                if (!this.panel.active) {
                    // If we still exist and aren't active then reveal the panel
                    this.panel.reveal();
                }
            }
            catch (e) {
                createPanel = true;
            }
        }
        if (createPanel) {
            this.panel = vscode.window.createWebviewPanel(this.id, await this.getViewNameById(this.id), vscode.ViewColumn.Active, {
                // Enable javascript in the webview
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(this.webviewBasePath)
                ]
            });
            this.setupViewMessageObserver(this.panel.webview);
            const html = await this.getHtmlForWebview();
            this.panel.webview.html = html;
        }
    }
    async getViewNameById(viewId) {
        const packageJsonPath = path.join(this.extensionContext.extensionPath, 'package.json');
        const packageJson = JSON.parse(await fsExtra.readFile(packageJsonPath, 'utf8'));
        for (const view of [...packageJson.contributes.views.debug, ...packageJson.contributes.views['vscode-brightscript-language']]) {
            if (view.id === viewId) {
                return view.name;
            }
        }
        return null;
    }
}
exports.BaseWebviewViewProvider = BaseWebviewViewProvider;
//# sourceMappingURL=BaseWebviewViewProvider.js.map