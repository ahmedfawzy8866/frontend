"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtaManager = void 0;
const fs = require("fs");
const path = require("path");
const rta = require("roku-test-automation");
const vscode = require("vscode");
const ViewProviderEvent_1 = require("../viewProviders/ViewProviderEvent");
const ViewProviderId_1 = require("../viewProviders/ViewProviderId");
const VscodeContextManager_1 = require("./VscodeContextManager");
const VscodeCommand_1 = require("../commands/VscodeCommand");
class RtaManager {
    constructor(context) {
        context.subscriptions.push(vscode.commands.registerCommand(VscodeCommand_1.VscodeCommand.disconnectFromDevice, () => {
            var _a;
            void ((_a = this.onDeviceComponent) === null || _a === void 0 ? void 0 : _a.shutdown());
            this.onDeviceComponent = undefined;
            void VscodeContextManager_1.vscodeContextManager.set('brightscript.isOnDeviceComponentAvailable', false);
            this.updateDeviceAvailabilityOnWebViewProviders();
        }));
    }
    setupRtaWithConfig(config) {
        var _a, _b;
        const enableDebugging = ['info', 'debug', 'trace'].includes(config.logLevel);
        const rtaConfig = {
            RokuDevice: {
                devices: [{
                        host: config.host,
                        password: config.password
                    }]
            },
            OnDeviceComponent: {
                logLevel: enableDebugging ? 'verbose' : undefined,
                clientDebugLogging: enableDebugging,
                disableTelnet: true,
                disableCallOriginationLine: true
            }
        };
        rta.odc.setConfig(rtaConfig);
        rta.ecp.setConfig(rtaConfig);
        this.device = rta.device;
        if (config.injectRdbOnDeviceComponent) {
            this.onDeviceComponent = rta.odc;
        }
        else {
            void ((_a = this.onDeviceComponent) === null || _a === void 0 ? void 0 : _a.shutdown());
            this.onDeviceComponent = undefined;
        }
        void VscodeContextManager_1.vscodeContextManager.set('brightscript.isOnDeviceComponentAvailable', !!this.onDeviceComponent);
        this.updateDeviceAvailabilityOnWebViewProviders();
        if (config.disableScreenSaver !== false) {
            void ((_b = this.onDeviceComponent) === null || _b === void 0 ? void 0 : _b.disableScreenSaver({ disableScreensaver: true }));
        }
    }
    async sendOdcRequest(requestorId, command, context) {
        const { args, options } = context;
        if (command === rta.RequestType.writeFile) {
            // We can't access files from the webview so we just store the path and access it in node instead
            const directoryPath = path.dirname(args.destinationPath);
            // We always try to make the directory. Doesn't fail if it already exists
            await rta.odc.createDirectory({
                path: directoryPath
            });
            return rta.odc.writeFile({
                binaryPayload: fs.readFileSync(args.sourcePath),
                path: args.destinationPath
            }, options);
        }
        else {
            const result = await this.onDeviceComponent[command](args, options);
            return result;
        }
    }
    async getAppUI(requestorId) {
        await this.sendOdcRequest(requestorId, 'assignElementIdOnAllNodes', { args: {}, options: {} });
        this.lastAppUIResponse = await rta.ecp.getAppUI();
        const viewIds = [];
        if (requestorId === ViewProviderId_1.ViewProviderId.rokuDeviceView) {
            viewIds.push(ViewProviderId_1.ViewProviderId.sceneGraphInspectorView);
        }
        else if (requestorId === ViewProviderId_1.ViewProviderId.sceneGraphInspectorView) {
            viewIds.push(ViewProviderId_1.ViewProviderId.rokuDeviceView);
        }
        // We want to notify the other view providers that the app UI has been updated. Not sending actual payload to avoid overhead if they aren't interested in it
        this.webviewViewProviderManager.sendMessageToWebviews(viewIds, {
            event: ViewProviderEvent_1.ViewProviderEvent.onStoredAppUIUpdated
        });
        return this.lastAppUIResponse;
    }
    getStoredAppUI() {
        return this.lastAppUIResponse;
    }
    setWebviewViewProviderManager(manager) {
        this.webviewViewProviderManager = manager;
    }
    updateDeviceAvailabilityOnWebViewProviders() {
        for (const webviewProvider of this.webviewViewProviderManager.getWebviewViewProviders()) {
            if (typeof webviewProvider.updateDeviceAvailability === 'function') {
                webviewProvider.updateDeviceAvailability();
            }
        }
    }
}
exports.RtaManager = RtaManager;
//# sourceMappingURL=RtaManager.js.map