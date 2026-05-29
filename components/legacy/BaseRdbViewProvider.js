"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRdbViewProvider = void 0;
const rta = require("roku-test-automation");
const fsExtra = require("fs-extra");
const path = require("path");
const BaseWebviewViewProvider_1 = require("./BaseWebviewViewProvider");
const ViewProviderEvent_1 = require("./ViewProviderEvent");
const ViewProviderCommand_1 = require("./ViewProviderCommand");
class BaseRdbViewProvider extends BaseWebviewViewProvider_1.BaseWebviewViewProvider {
    constructor(context, dependencies) {
        super(context, dependencies);
        const requestTypesPath = path.join(rta.utils.getClientFilesPath(), 'requestTypes.schema.json');
        const json = JSON.parse(fsExtra.readFileSync(requestTypesPath, 'utf8'));
        this.odcCommands = Object.values(json.enum);
        this.setupCommandObservers();
    }
    updateDeviceAvailability() {
        const message = this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onDeviceAvailabilityChange, {
            odcAvailable: !!this.dependencies.rtaManager.onDeviceComponent,
            deviceAvailable: !!this.dependencies.rtaManager.device
        });
        this.postOrQueueMessage(message);
    }
    setupCommandObservers() {
        for (const command of this.odcCommands) {
            this.addMessageCommandCallback(command, async (message) => {
                const { command, context } = message;
                const response = await this.dependencies.rtaManager.sendOdcRequest(this.id, command, context);
                this.postOrQueueMessage(this.createResponseMessage(message, response));
                return true;
            });
        }
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.setManualIpAddress, (message) => {
            this.dependencies.rtaManager.setupRtaWithConfig({
                ...message.context,
                injectRdbOnDeviceComponent: true
            });
            return Promise.resolve(true);
        });
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.getStoredAppUI, (message) => {
            const response = this.dependencies.rtaManager.getStoredAppUI();
            this.postOrQueueMessage(this.createResponseMessage(message, response));
            return Promise.resolve(true);
        });
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.getAppUI, async (message) => {
            try {
                const appUIResponse = await this.dependencies.rtaManager.getAppUI(this.id);
                this.postOrQueueMessage(this.createResponseMessage(message, {
                    success: true,
                    response: appUIResponse
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
    onViewReady() {
        // Always post back the device status so we make sure the client doesn't miss it if it got refreshed
        this.updateDeviceAvailability();
    }
}
exports.BaseRdbViewProvider = BaseRdbViewProvider;
//# sourceMappingURL=BaseRdbViewProvider.js.map