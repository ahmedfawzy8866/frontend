"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RokuRegistryViewProvider = void 0;
const vscode = require("vscode");
const VscodeCommand_1 = require("../commands/VscodeCommand");
const BaseRdbViewProvider_1 = require("./BaseRdbViewProvider");
const ViewProviderEvent_1 = require("./ViewProviderEvent");
const ViewProviderId_1 = require("./ViewProviderId");
class RokuRegistryViewProvider extends BaseRdbViewProvider_1.BaseRdbViewProvider {
    constructor(context, dependencies) {
        super(context, dependencies);
        this.id = ViewProviderId_1.ViewProviderId.rokuRegistryView;
        const subscriptions = context.subscriptions;
        subscriptions.push(vscode.commands.registerCommand(VscodeCommand_1.VscodeCommand.rokuRegistryExportRegistry, async () => {
            await vscode.window.showSaveDialog({ saveLabel: 'Save' }).then(async (uri) => {
                var _a;
                const result = await ((_a = this.dependencies.rtaManager.onDeviceComponent) === null || _a === void 0 ? void 0 : _a.readRegistry());
                await vscode.workspace.fs.writeFile(uri, Buffer.from(JSON.stringify(result === null || result === void 0 ? void 0 : result.values), 'utf8'));
            });
        }));
        subscriptions.push(vscode.commands.registerCommand(VscodeCommand_1.VscodeCommand.rokuRegistryImportRegistry, async () => {
            const options = {
                canSelectMany: false,
                openLabel: 'Select',
                canSelectFiles: true,
                canSelectFolders: false
            };
            await vscode.window.showOpenDialog(options).then(this.importContentsToRegistry.bind(this));
        }));
        subscriptions.push(vscode.commands.registerCommand(VscodeCommand_1.VscodeCommand.rokuRegistryClearRegistry, async () => {
            await this.dependencies.rtaManager.onDeviceComponent.deleteEntireRegistry();
            this.sendRegistryUpdated();
        }));
        subscriptions.push(vscode.commands.registerCommand(VscodeCommand_1.VscodeCommand.rokuRegistryRefreshRegistry, () => {
            this.sendRegistryUpdated();
        }));
    }
    async importContentsToRegistry(uri) {
        var _a;
        if (uri === null || uri === void 0 ? void 0 : uri[0]) {
            const input = await vscode.workspace.fs.readFile(uri[0]);
            const data = JSON.parse(Buffer.from(input).toString('utf8'));
            await ((_a = this.dependencies.rtaManager.onDeviceComponent) === null || _a === void 0 ? void 0 : _a.writeRegistry({
                values: data
            }));
            this.sendRegistryUpdated();
        }
    }
    sendRegistryUpdated() {
        this.postOrQueueMessage(this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onRegistryUpdated));
    }
}
exports.RokuRegistryViewProvider = RokuRegistryViewProvider;
//# sourceMappingURL=RokuRegistryViewProvider.js.map