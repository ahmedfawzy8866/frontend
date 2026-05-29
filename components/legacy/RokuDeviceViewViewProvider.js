"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RokuDeviceViewViewProvider = void 0;
const VscodeCommand_1 = require("../commands/VscodeCommand");
const BaseRdbViewProvider_1 = require("./BaseRdbViewProvider");
const ViewProviderId_1 = require("./ViewProviderId");
const ViewProviderCommand_1 = require("./ViewProviderCommand");
class RokuDeviceViewViewProvider extends BaseRdbViewProvider_1.BaseRdbViewProvider {
    constructor(context, dependencies) {
        super(context, dependencies);
        this.id = ViewProviderId_1.ViewProviderId.rokuDeviceView;
        this.temporarilyDisableScreenshotCapture = false;
        this.registerCommandWithWebViewNotifier(VscodeCommand_1.VscodeCommand.rokuDeviceViewEnableNodeInspector);
        this.registerCommandWithWebViewNotifier(VscodeCommand_1.VscodeCommand.rokuDeviceViewDisableNodeInspector);
        this.registerCommandWithWebViewNotifier(VscodeCommand_1.VscodeCommand.rokuDeviceViewRefreshScreenshot);
        this.registerCommandWithWebViewNotifier(VscodeCommand_1.VscodeCommand.rokuDeviceViewPauseScreenshotCapture);
        this.registerCommandWithWebViewNotifier(VscodeCommand_1.VscodeCommand.rokuDeviceViewResumeScreenshotCapture);
        this.registerCommandWithWebViewNotifier(VscodeCommand_1.VscodeCommand.rokuDeviceViewCopyScreenshot, () => {
            // In order for copy to be successful the webview has to have focus
            this.view.show(false);
        });
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.getScreenshot, async (message) => {
            try {
                if (this.temporarilyDisableScreenshotCapture) {
                    // Sometimes we need to temporarily stop screenshot capture as it can prevent successful package deployment to the device
                    // Originally was just returning true here but now we just pause until we resume capturing
                    await new Promise((resolve) => {
                        this.resumeScreenshotCapture = resolve;
                    });
                }
                const result = await this.dependencies.rtaManager.device.getScreenshot();
                this.postOrQueueMessage(this.createResponseMessage(message, {
                    success: true,
                    arrayBuffer: result.buffer.buffer
                }));
            }
            catch (e) {
                this.postOrQueueMessage(this.createResponseMessage(message, {
                    success: false
                }));
            }
            return true;
        });
    }
    onDidStartDebugSession(e) {
        this.temporarilyDisableScreenshotCapture = true;
    }
    onDidTerminateDebugSession(e) {
        var _a;
        // In case we failed to start debugging we want to allow screenshots again
        this.temporarilyDisableScreenshotCapture = false;
        (_a = this.resumeScreenshotCapture) === null || _a === void 0 ? void 0 : _a.call(this);
        delete this.resumeScreenshotCapture;
    }
    onChannelPublishedEvent(e) {
        var _a;
        this.temporarilyDisableScreenshotCapture = false;
        (_a = this.resumeScreenshotCapture) === null || _a === void 0 ? void 0 : _a.call(this);
        delete this.resumeScreenshotCapture;
    }
}
exports.RokuDeviceViewViewProvider = RokuDeviceViewViewProvider;
//# sourceMappingURL=RokuDeviceViewViewProvider.js.map