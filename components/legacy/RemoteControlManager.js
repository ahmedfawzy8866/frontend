"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteControlManager = void 0;
const vscode = require("vscode");
const VscodeContextManager_1 = require("./VscodeContextManager");
const VscodeCommand_1 = require("../commands/VscodeCommand");
class RemoteControlManager {
    constructor(telemetryManager) {
        this.telemetryManager = telemetryManager;
        this.isEnabled = false;
        this.colors = {
            default: {
                color: undefined,
                backgroundColor: undefined
            },
            primary: {
                color: new vscode.ThemeColor('statusBarItem.errorForeground'),
                backgroundColor: new vscode.ThemeColor('statusBarItem.errorBackground')
            },
            secondary: {
                color: new vscode.ThemeColor('statusBarItem.warningForeground'),
                backgroundColor: new vscode.ThemeColor('statusBarItem.warningBackground')
            }
        };
        this.remoteControlStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
        void this.setRemoteControlMode(this.isEnabled, undefined);
        //keep the user's button flashing preference in sync
        vscode.workspace.onDidChangeConfiguration(() => {
            this.loadIsFlasherAllowedByUser();
        });
        this.loadIsFlasherAllowedByUser();
    }
    loadIsFlasherAllowedByUser() {
        var _a, _b;
        this.isFlasherAllowedByUser = (_b = (_a = vscode.workspace.getConfiguration('brightscript')) === null || _a === void 0 ? void 0 : _a.get('remoteControlMode.enableActiveAnimation')) !== null && _b !== void 0 ? _b : true;
    }
    async toggleRemoteControlMode(initiator) {
        var _a;
        const currentMode = VscodeContextManager_1.vscodeContextManager.get('brightscript.isRemoteControlMode', false);
        await this.setRemoteControlMode(!currentMode, initiator);
        //remove focus from statusbar item after clicking
        if (initiator === 'statusbar') {
            //focus the active text editor (if there is one)
            if ((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document) {
                await vscode.window.showTextDocument(vscode.window.activeTextEditor.document);
                //there's no active text editor. Move focus away from the statusbar item (somehow)
            }
            else {
                //focus the next editor group, then the previous editor group.
                //This is safe to call when there are no editor groups, so it's a good way to remove focus from the statusbar item
                await vscode.commands.executeCommand('workbench.action.focusNextGroup');
                await vscode.commands.executeCommand('workbench.action.focusPreviousGroup');
            }
        }
    }
    async setRemoteControlMode(isEnabled, initiator) {
        var _a;
        if (this.isEnabled && !isEnabled) {
            // Want to also stop Roku automation recording if it was running
            await vscode.commands.executeCommand(VscodeCommand_1.VscodeCommand.rokuAutomationViewStopRecording);
        }
        //only send a telemetry event if we know who initiated the mode. `undefined` usually means our internal system set the value...so don't track that
        if (initiator) {
            this.telemetryManager.sendSetRemoteControlModeEvent(isEnabled, initiator);
        }
        await VscodeContextManager_1.vscodeContextManager.set('brightscript.isRemoteControlMode', isEnabled);
        const currentState = isEnabled ? 'enabled' : 'disabled';
        this.remoteControlStatusBarItem.text = `$(radio-tower) Remote: ${currentState} `;
        //set the initial statusbar colors
        Object.assign(this.remoteControlStatusBarItem, this.colors.default);
        this.remoteControlStatusBarItem.command = {
            title: 'Toggle Remote Control Mode',
            command: 'extension.brightscript.toggleRemoteControlMode',
            arguments: ['statusbar']
        };
        this.remoteControlStatusBarItem.tooltip = `Roku remote control mode is: ${currentState}`;
        this.remoteControlStatusBarItem.show();
        this.isEnabled = isEnabled;
        if (this.isEnabled) {
            this.enableFlasher();
        }
        else {
            (_a = this.disableFlasher) === null || _a === void 0 ? void 0 : _a.call(this);
        }
    }
    enableFlasher() {
        if (!this.disableFlasher) {
            let colorKey = 'primary';
            const toggleStatusbarColors = () => {
                colorKey = colorKey === 'primary' ? 'secondary' : 'primary';
                Object.assign(this.remoteControlStatusBarItem, this.colors[colorKey]);
            };
            toggleStatusbarColors();
            const handle = setInterval(() => {
                if (this.isFlasherAllowedByUser) {
                    toggleStatusbarColors();
                }
            }, 500);
            this.disableFlasher = () => {
                clearInterval(handle);
                Object.assign(this.remoteControlStatusBarItem, this.colors.default);
                // this.remoteControlStatusBarItem.hide();
                delete this.disableFlasher;
            };
        }
    }
}
exports.RemoteControlManager = RemoteControlManager;
//# sourceMappingURL=RemoteControlManager.js.map