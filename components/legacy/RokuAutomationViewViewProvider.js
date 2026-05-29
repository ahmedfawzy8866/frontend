"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RokuAutomationViewViewProvider = void 0;
const vscode = require("vscode");
const roku_test_automation_1 = require("roku-test-automation");
const VscodeContextManager_1 = require("../managers/VscodeContextManager");
const VscodeCommand_1 = require("../commands/VscodeCommand");
const BaseRdbViewProvider_1 = require("./BaseRdbViewProvider");
const ViewProviderId_1 = require("./ViewProviderId");
const ViewProviderCommand_1 = require("./ViewProviderCommand");
const ViewProviderEvent_1 = require("./ViewProviderEvent");
const WorkspaceStateKey_1 = require("./WorkspaceStateKey");
const fsExtra = require("fs-extra");
class RokuAutomationViewViewProvider extends BaseRdbViewProvider_1.BaseRdbViewProvider {
    constructor(context, dependencies) {
        super(context, dependencies);
        this.id = ViewProviderId_1.ViewProviderId.rokuAutomationView;
        this.isRecording = false;
        this.rokuAutomationAutorunOnDeploy = false;
        this.currentRunningStep = -1;
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.storeRokuAutomationConfigs, async (message) => {
            this.selectedConfig = message.context.selectedConfig;
            this.rokuAutomationConfigs = message.context.configs;
            // Make sure to use JSON.stringify or weird stuff happens
            await context.workspaceState.update(WorkspaceStateKey_1.WorkspaceStateKey.rokuAutomationConfigs, JSON.stringify(message.context));
            return true;
        });
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.runRokuAutomationConfig, async (message) => {
            const index = message.context.configIndex;
            try {
                await this.runRokuAutomationConfig(index);
            }
            catch (e) {
                this.updateCurrentRunningStep(-1);
                throw e;
            }
            return true;
        });
        const brightScriptCommands = dependencies.brightScriptCommands;
        brightScriptCommands.registerKeypressNotifier((key, literalCharacter) => {
            if (this.isRecording) {
                const message = this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onRokuAutomationKeyPressed, {
                    key: key,
                    literalCharacter: literalCharacter
                });
                this.postOrQueueMessage(message);
            }
        });
        this.registerCommand(VscodeCommand_1.VscodeCommand.rokuAutomationViewImportAllAutomations, async () => {
            if (this.isRecording) {
                // Only allow importing when we aren't currently recording
                void vscode.window.showInformationMessage('Cannot import automation scripts while recording. Please stop recording first.');
                return;
            }
            // macOS does not have a title bar on the open dialog so we need to show a warning message
            if (process.platform === 'darwin') {
                const confirm = await vscode.window.showWarningMessage('This will replace all automation scripts. Continue importing?', { modal: true }, 'Yes');
                if (confirm !== 'Yes') {
                    return;
                }
            }
            const filePath = await vscode.window.showOpenDialog({
                title: 'Import Automation Scripts (Warning: This will replace all currently loaded scripts)',
                filters: {
                    'JSON': ['json'],
                    'All Files': ['*']
                },
                defaultUri: vscode.Uri.file('automation.json'),
                canSelectMany: false
            });
            if (!filePath) {
                return;
            }
            try {
                const data = fsExtra.readFileSync(filePath[0].fsPath, 'utf8');
                const result = JSON.parse(data);
                this.selectedConfig = result.selectedConfig;
                this.rokuAutomationConfigs = result.configs;
                await this.extensionContext.workspaceState.update(WorkspaceStateKey_1.WorkspaceStateKey.rokuAutomationConfigs, JSON.stringify(result));
                const message = this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onRokuAutomationConfigsLoaded, {
                    selectedConfig: this.selectedConfig,
                    configs: this.rokuAutomationConfigs
                });
                this.postOrQueueMessage(message);
                this.updateCurrentRunningStep();
                this.onImportAllAutomations();
                void vscode.window.showInformationMessage('Automation scripts imported successfully from ' + filePath[0].fsPath);
            }
            catch (err) {
                void vscode.window.showErrorMessage('Failed to import automations: ' + err.message);
            }
        });
        this.registerCommand(VscodeCommand_1.VscodeCommand.rokuAutomationViewExportAllAutomations, async () => {
            void vscode.window.showInformationMessage('Exporting automation data...');
            if (this.isRecording) {
                // Only allow exporting when we aren't currently recording
                void vscode.window.showInformationMessage('Cannot export automation scripts while recording. Please stop recording first.');
                return;
            }
            // Set the default save location to be the current workspace folder
            let defaultUri = vscode.Uri.file('automation.json');
            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                // Use the first workspace folder
                defaultUri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, 'automation.json');
            }
            const filePath = await vscode.window.showSaveDialog({
                title: 'Export Automation scripts',
                filters: {
                    'JSON': ['json'],
                    'All Files': ['*']
                },
                defaultUri: defaultUri
            });
            if (!filePath) {
                return;
            }
            try {
                const obj = {
                    selectedConfig: this.selectedConfig,
                    configs: this.rokuAutomationConfigs
                };
                const json = JSON.stringify(obj, null, 4);
                fsExtra.outputFileSync(filePath.fsPath, json);
                void vscode.window.showInformationMessage('Automation exported successfully to ' + filePath.fsPath);
            }
            catch (err) {
                void vscode.window.showErrorMessage('Failed to export automation scripts: ' + err.message);
            }
        });
        this.registerCommand(VscodeCommand_1.VscodeCommand.rokuAutomationViewStartRecording, async () => {
            if (this.currentRunningStep === -1) {
                // Only allow recording when we aren't currently running
                await this.setIsRecording(true);
                await vscode.commands.executeCommand(VscodeCommand_1.VscodeCommand.enableRemoteControlMode);
                // We reset the current step to update the timestamp of the first sleep
                this.updateCurrentRunningStep(-1);
            }
        });
        this.registerCommand(VscodeCommand_1.VscodeCommand.rokuAutomationViewStopRecording, async () => {
            if (this.isRecording) {
                await this.setIsRecording(false);
                await vscode.commands.executeCommand(VscodeCommand_1.VscodeCommand.disableRemoteControlMode);
            }
        });
        this.registerCommand(VscodeCommand_1.VscodeCommand.rokuAutomationViewEnableAutorunOnDeploy, async () => {
            await this.setAutorunOnDeploy(true);
        });
        this.registerCommand(VscodeCommand_1.VscodeCommand.rokuAutomationViewDisableAutorunOnDeploy, async () => {
            await this.setAutorunOnDeploy(false);
        });
        let autorunOnDeploy = this.extensionContext.workspaceState.get(WorkspaceStateKey_1.WorkspaceStateKey.rokuAutomationAutorunOnDeploy);
        // Default to true if not set
        if (autorunOnDeploy !== false) {
            autorunOnDeploy = true;
        }
        void this.setAutorunOnDeploy(autorunOnDeploy);
    }
    async setIsRecording(isRecording) {
        this.isRecording = isRecording;
        await VscodeContextManager_1.vscodeContextManager.set('brightscript.rokuAutomationView.isRecording', isRecording);
    }
    async setAutorunOnDeploy(autorunOnDeploy) {
        this.rokuAutomationAutorunOnDeploy = autorunOnDeploy;
        await VscodeContextManager_1.vscodeContextManager.set('brightscript.rokuAutomationView.autorunOnDeploy', autorunOnDeploy);
        await this.extensionContext.workspaceState.update(WorkspaceStateKey_1.WorkspaceStateKey.rokuAutomationAutorunOnDeploy, autorunOnDeploy);
    }
    async runRokuAutomationConfig(index) {
        var _a;
        let stopRunning = false;
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.stopRokuAutomationConfig, (message) => {
            stopRunning = true;
            return Promise.resolve(true);
        });
        const config = (_a = this.rokuAutomationConfigs) === null || _a === void 0 ? void 0 : _a[index];
        if (config) {
            for (const [index, step] of config.steps.entries()) {
                if (stopRunning) {
                    break;
                }
                this.updateCurrentRunningStep(index);
                switch (step.type) {
                    case 'sleep':
                        await roku_test_automation_1.utils.sleep(+step.value * 1000);
                        break;
                    case 'sendText':
                        await roku_test_automation_1.ecp.sendText(step.value);
                        break;
                    case 'sendKeyPress':
                        await roku_test_automation_1.ecp.sendKeypress(step.value);
                        break;
                }
            }
        }
        // Let the view know we're done running
        this.updateCurrentRunningStep(-1);
    }
    onChannelPublishedEvent(e) {
        if (this.rokuAutomationAutorunOnDeploy) {
            return this.runRokuAutomationConfig(0);
        }
    }
    updateCurrentRunningStep(step = this.currentRunningStep) {
        const message = this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onRokuAutomationConfigStepChange, {
            step: step
        });
        this.postOrQueueMessage(message);
    }
    onViewReady() {
        // Always post back the device status so we make sure the client doesn't miss it if it got refreshed
        this.updateDeviceAvailability();
        const json = this.extensionContext.workspaceState.get(WorkspaceStateKey_1.WorkspaceStateKey.rokuAutomationConfigs);
        if (typeof json === 'string') {
            const result = JSON.parse(json);
            this.selectedConfig = result.selectedConfig;
            this.rokuAutomationConfigs = result.configs;
        }
        const message = this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onRokuAutomationConfigsLoaded, {
            selectedConfig: this.selectedConfig,
            configs: this.rokuAutomationConfigs
        });
        this.postOrQueueMessage(message);
        this.updateCurrentRunningStep();
    }
    onImportAllAutomations() {
        const message = this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onRokuAutomationImportAllAutomations, {
            selectedConfig: this.selectedConfig,
            configs: this.rokuAutomationConfigs
        });
        this.postOrQueueMessage(message);
    }
    onExportAllAutomations() {
        const message = this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onRokuAutomationExportAllAutomations, {
            selectedConfig: this.selectedConfig,
            configs: this.rokuAutomationConfigs
        });
        this.postOrQueueMessage(message);
    }
}
exports.RokuAutomationViewViewProvider = RokuAutomationViewViewProvider;
//# sourceMappingURL=RokuAutomationViewViewProvider.js.map