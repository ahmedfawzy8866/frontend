"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebviewViewProviderManager = void 0;
const vscode = require("vscode");
const RokuCommandsViewProvider_1 = require("../viewProviders/RokuCommandsViewProvider");
const RokuDeviceViewViewProvider_1 = require("../viewProviders/RokuDeviceViewViewProvider");
const RokuFileSystemViewViewProvider_1 = require("../viewProviders/RokuFileSystemViewViewProvider");
const RokuAppOverlaysViewViewProvider_1 = require("../viewProviders/RokuAppOverlaysViewViewProvider");
const RokuRegistryViewProvider_1 = require("../viewProviders/RokuRegistryViewProvider");
const SceneGraphInspectorViewProvider_1 = require("../viewProviders/SceneGraphInspectorViewProvider");
const RokuAutomationViewViewProvider_1 = require("../viewProviders/RokuAutomationViewViewProvider");
const RokuReplViewProvider_1 = require("../viewProviders/RokuReplViewProvider");
class WebviewViewProviderManager {
    constructor(context, rtaManager, brightScriptCommands) {
        this.rtaManager = rtaManager;
        this.webviewViews = [{
                constructor: RokuAutomationViewViewProvider_1.RokuAutomationViewViewProvider,
                provider: undefined
            }, {
                constructor: RokuCommandsViewProvider_1.RokuCommandsViewProvider,
                provider: undefined
            }, {
                constructor: RokuDeviceViewViewProvider_1.RokuDeviceViewViewProvider,
                provider: undefined
            }, {
                constructor: RokuFileSystemViewViewProvider_1.RokuFileSystemViewViewProvider,
                provider: undefined
            }, {
                constructor: RokuRegistryViewProvider_1.RokuRegistryViewProvider,
                provider: undefined
            }, {
                constructor: RokuAppOverlaysViewViewProvider_1.RokuAppOverlaysViewViewProvider,
                provider: undefined
            }, {
                constructor: SceneGraphInspectorViewProvider_1.SceneGraphInspectorViewProvider,
                provider: undefined
            }, {
                constructor: RokuReplViewProvider_1.RokuReplViewProvider,
                provider: undefined
            }];
        for (const webview of this.webviewViews) {
            if (!webview.provider) {
                webview.provider = new webview.constructor(context, {
                    rtaManager: rtaManager,
                    brightScriptCommands: brightScriptCommands
                });
                vscode.window.registerWebviewViewProvider(webview.provider.id, webview.provider);
                webview.provider.setWebviewViewProviderManager(this);
            }
        }
    }
    getWebviewViewProviders() {
        const providers = [];
        for (const webview of this.webviewViews) {
            providers.push(webview.provider);
        }
        return providers;
    }
    onDidStartDebugSession(e) {
        for (const webview of this.webviewViews) {
            webview.provider.onDidStartDebugSession(e);
        }
    }
    onDidTerminateDebugSession(e) {
        for (const webview of this.webviewViews) {
            webview.provider.onDidTerminateDebugSession(e);
        }
    }
    // Notification from extension
    onChannelPublishedEvent(e) {
        const config = e.body.launchConfiguration;
        this.rtaManager.setupRtaWithConfig(config);
        for (const webview of this.webviewViews) {
            void webview.provider.onChannelPublishedEvent(e);
        }
    }
    // Mainly for communicating between webviews
    sendMessageToWebviews(viewIds, message) {
        // console.log(`WebviewViewProviderManager: sendMessageToWebviews: ${viewIds} ${JSON.stringify(message)}`);
        if (typeof viewIds === 'string') {
            viewIds = [viewIds];
        }
        for (const webviewView of this.webviewViews) {
            if (viewIds.includes(webviewView.provider.id)) {
                webviewView.provider.postOrQueueMessage(message);
            }
        }
    }
}
exports.WebviewViewProviderManager = WebviewViewProviderManager;
//# sourceMappingURL=WebviewViewProviderManager.js.map