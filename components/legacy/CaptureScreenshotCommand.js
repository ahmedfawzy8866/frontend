"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureScreenshotCommand = exports.CaptureScreenshotCommand = exports.FILE_SCHEME = void 0;
const vscode = require("vscode");
const path = require("path");
const rokuDeploy = require("roku-deploy");
const util_1 = require("../util");
exports.FILE_SCHEME = 'bs-captureScreenshot';
class CaptureScreenshotCommand {
    register(context, brightScriptCommands) {
        this.context = context;
        this.brightScriptCommands = brightScriptCommands;
        context.subscriptions.push(vscode.commands.registerCommand('extension.brightscript.captureScreenshot', this.captureScreenshot.bind(this)));
    }
    async getHostAndPassword(hostParam) {
        let host;
        let password;
        //if a hostParam was not provided, then go the normal flow for getting info
        if (!hostParam) {
            host = await this.brightScriptCommands.getRemoteHost();
            password = await this.brightScriptCommands.getRemotePassword();
            //the host was provided, probably by clicking the "capture screenshot" link in the tree view. Do we have a password stored as well? If not, prompt for one
        }
        else {
            host = hostParam;
            let remoteHost = await this.context.workspaceState.get('remoteHost');
            if (host === remoteHost) {
                password = this.context.workspaceState.get('remotePassword');
            }
            else {
                password = await vscode.window.showInputBox({
                    placeHolder: `Please enter the developer password for host '${host}'`,
                    value: ''
                });
            }
        }
        return { host: host, password: password };
    }
    async getScreenshotDir() {
        var _a, _b, _c;
        let screenshotDir = vscode.workspace.getConfiguration('brightscript').get('screenshotDir');
        if (screenshotDir) {
            let workspacePath = (_b = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.uri.fsPath;
            if (((_c = vscode.workspace.workspaceFolders) === null || _c === void 0 ? void 0 : _c.length) > 1) {
                const workspaceFolder = await vscode.window.showWorkspaceFolderPick();
                if (workspaceFolder) {
                    workspacePath = workspaceFolder.uri.fsPath;
                }
            }
            screenshotDir = screenshotDir.replace('${workspaceFolder}', workspacePath);
            screenshotDir = path.resolve(workspacePath !== null && workspacePath !== void 0 ? workspacePath : process.cwd(), screenshotDir);
        }
        return screenshotDir;
    }
    async captureScreenshot(hostParam) {
        const { host, password } = await this.getHostAndPassword(hostParam);
        let start = Date.now();
        const MIN_PROGRESS_TIME = 850; // Minimum time (in ms) that vscode will ensure the withProgress notification is shown.
        let ensureSleepMin = async () => {
            let elapsed = Date.now() - start;
            if (elapsed < MIN_PROGRESS_TIME) {
                await util_1.util.sleep(MIN_PROGRESS_TIME - elapsed);
            }
        };
        try {
            const screenshotPath = await vscode.window.withProgress({
                title: `Capturing screenshot from '${host}'`,
                location: vscode.ProgressLocation.Notification
            }, async (options) => {
                const screenshotDir = await this.getScreenshotDir();
                let screenshotPath = await rokuDeploy.takeScreenshot({
                    host: host,
                    password: password,
                    ...(screenshotDir && { outDir: screenshotDir })
                });
                return screenshotPath;
            });
            if (screenshotPath) {
                await ensureSleepMin();
                await Promise.all([
                    vscode.commands.executeCommand('vscode.open', vscode.Uri.file(screenshotPath)),
                    vscode.window.showInformationMessage(`Screenshot saved at: ` + screenshotPath)
                ]);
            }
        }
        catch (e) {
            await ensureSleepMin();
            void vscode.window.showErrorMessage('Could not capture screenshot');
        }
    }
}
exports.CaptureScreenshotCommand = CaptureScreenshotCommand;
exports.captureScreenshotCommand = new CaptureScreenshotCommand();
//# sourceMappingURL=CaptureScreenshotCommand.js.map