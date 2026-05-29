"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RokuAppOverlaysViewViewProvider = void 0;
const vscode = require("vscode");
const path = require("path");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const VscodeCommand_1 = require("../commands/VscodeCommand");
const BaseRdbViewProvider_1 = require("./BaseRdbViewProvider");
const ViewProviderId_1 = require("./ViewProviderId");
const ViewProviderEvent_1 = require("./ViewProviderEvent");
const ViewProviderCommand_1 = require("./ViewProviderCommand");
class RokuAppOverlaysViewViewProvider extends BaseRdbViewProvider_1.BaseRdbViewProvider {
    constructor(context, dependencies) {
        super(context, dependencies);
        this.id = ViewProviderId_1.ViewProviderId.rokuAppOverlaysView;
        const subscriptions = context.subscriptions;
        this.registerCommandWithWebViewNotifier(VscodeCommand_1.VscodeCommand.rokuAppOverlaysViewRemoveAllOverlays);
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.openRokuFile, async (message) => {
            const filePath = message.context.filePath;
            await vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath));
            await vscode.commands.executeCommand('workbench.action.files.setActiveEditorReadonlyInSession');
            return true;
        });
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.loadRokuAppOverlaysThumbnails, async (message) => {
            return new Promise((resolve, reject) => {
                const overlays = message.context.overlays;
                const index = message.context.index;
                this.getDataUriFromFile(overlays[index].sourcePath).then((imageData) => {
                    overlays[index].imageData = imageData;
                    const response = this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onRokuAppOverlayThumbnailsLoaded, {
                        overlays: overlays
                    });
                    this.postOrQueueMessage(response);
                    resolve(true);
                }).catch((e) => {
                    console.error(`Error loading overlay thumbnails: ${e.message}`);
                    reject(e);
                });
            });
        });
        subscriptions.push(vscode.commands.registerCommand(VscodeCommand_1.VscodeCommand.rokuAppOverlaysViewAddNewOverlay, async () => {
            var _a;
            const options = {
                canSelectMany: false,
                openLabel: 'Add Overlay',
                canSelectFiles: true,
                canSelectFolders: false,
                filters: {
                    Images: ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif']
                }
            };
            const filePath = (_a = (await vscode.window.showOpenDialog(options))[0]) === null || _a === void 0 ? void 0 : _a.fsPath;
            const extension = path.extname(filePath);
            const name = path.basename(filePath, extension);
            const destinationFileName = path.basename(filePath, extension) + '_' + Date.now() + extension;
            const message = this.createEventMessage(ViewProviderEvent_1.ViewProviderEvent.onRokuAppOverlayAdded, {
                id: (0, uuid_1.v4)(),
                name: name,
                sourcePath: filePath,
                destinationFileName: destinationFileName
            });
            this.postOrQueueMessage(message);
        }));
    }
    async getDataUriFromFile(filePath) {
        try {
            const contents = await fs_1.promises.readFile(filePath, { encoding: 'base64' });
            const base64String = `data:image/png;base64, ${contents}`;
            return base64String;
        }
        catch (error) {
            console.error(`Error reading or encoding file: ${error.message}`);
            return null;
        }
    }
}
exports.RokuAppOverlaysViewViewProvider = RokuAppOverlaysViewViewProvider;
//# sourceMappingURL=RokuAppOverlaysViewViewProvider.js.map