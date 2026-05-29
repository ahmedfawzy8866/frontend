"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RokuFileSystemViewViewProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
const path = require("path");
const VscodeCommand_1 = require("../commands/VscodeCommand");
const BaseRdbViewProvider_1 = require("./BaseRdbViewProvider");
const ViewProviderId_1 = require("./ViewProviderId");
const ViewProviderCommand_1 = require("./ViewProviderCommand");
class RokuFileSystemViewViewProvider extends BaseRdbViewProvider_1.BaseRdbViewProvider {
    constructor(context, dependencies) {
        super(context, dependencies);
        this.id = ViewProviderId_1.ViewProviderId.rokuFileSystemView;
        this.registerCommandWithWebViewNotifier(VscodeCommand_1.VscodeCommand.rokuFileSystemViewRefresh);
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.openRokuFile, async (message) => {
            const pathContentsInfo = message.context;
            const result = await this.dependencies.rtaManager.onDeviceComponent.readFile({
                path: pathContentsInfo.path
            });
            const filePath = path.join(os.tmpdir(), path.basename(pathContentsInfo.path));
            // Write some content to the new file
            fs.writeFileSync(filePath, result.binaryPayload);
            await vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath));
            await vscode.commands.executeCommand('workbench.action.files.setActiveEditorReadonlyInSession');
            return true;
        });
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.deleteRokuFile, async (message) => {
            const pathContentsInfo = message.context;
            await this.dependencies.rtaManager.onDeviceComponent.deleteFile({
                path: pathContentsInfo.path
            });
            await vscode.commands.executeCommand(VscodeCommand_1.VscodeCommand.rokuFileSystemViewRefresh);
            return true;
        });
    }
}
exports.RokuFileSystemViewViewProvider = RokuFileSystemViewViewProvider;
//# sourceMappingURL=RokuFileSystemViewViewProvider.js.map