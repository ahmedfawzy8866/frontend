"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageServerInfoCommand = exports.LanguageServerInfoCommand = void 0;
const vscode = require("vscode");
const LanguageServerManager_1 = require("../LanguageServerManager");
const path = require("path");
const resolve = require("resolve");
const fsExtra = require("fs-extra");
const thenby_1 = require("thenby");
const VscodeCommand_1 = require("./VscodeCommand");
const vscode_uri_1 = require("vscode-uri");
const relativeTime = require("dayjs/plugin/relativeTime");
const util_1 = require("../util");
const semver = require("semver");
const brighterscript_1 = require("brighterscript");
const dayjs = require("dayjs");
dayjs.extend(relativeTime);
class LanguageServerInfoCommand {
    register(context, localPackageManager) {
        this.localPackageManager = localPackageManager;
        context.subscriptions.push(vscode.commands.registerCommand(LanguageServerInfoCommand.commandName, async () => {
            const commands = [{
                    label: `Change Selected BrighterScript Version`,
                    description: `(current v${LanguageServerManager_1.languageServerManager.selectedBscInfo.version})`,
                    command: this.selectBrighterScriptVersion.bind(this)
                }, {
                    label: `Restart BrighterScript Language Server`,
                    description: ``,
                    command: this.restartLanguageServer.bind(this)
                }, {
                    label: `View language server logs`,
                    description: ``,
                    command: this.focusLanguageServerOutputChannel.bind(this)
                }, {
                    label: `View BrighterScript version cache folder`,
                    description: ``,
                    command: async () => {
                        await vscode.commands.executeCommand('revealFileInOS', vscode_uri_1.default.file((0, brighterscript_1.standardizePath) `${localPackageManager.storageLocation}/brighterscript`));
                    }
                }, {
                    label: `Remove cached brighterscript versions`,
                    description: ``,
                    command: async () => {
                        await util_1.util.runWithProgress({
                            title: 'Removing cached brighterscript versions'
                        }, async () => {
                            await vscode.commands.executeCommand(VscodeCommand_1.VscodeCommand.clearNpmPackageCache);
                        });
                        void vscode.window.showInformationMessage('All cached brighterscript versions have been removed');
                        //restart the language server since we might have just removed the one we're using
                        await this.restartLanguageServer();
                    }
                }];
            let selection = await vscode.window.showQuickPick(commands, { placeHolder: `BrighterScript Project Info` });
            await (selection === null || selection === void 0 ? void 0 : selection.command());
        }));
    }
    async focusLanguageServerOutputChannel() {
        const commands = await vscode.commands.getCommands();
        const command = commands.find(x => x.endsWith(LanguageServerManager_1.LANGUAGE_SERVER_NAME));
        if (command) {
            void vscode.commands.executeCommand(command);
        }
    }
    async restartLanguageServer() {
        await vscode.commands.executeCommand('extension.brightscript.languageServer.restart');
    }
    discoverBrighterScriptVersions(workspaceFolders) {
        const versions = [{
                label: `Use VSCode's version`,
                description: LanguageServerManager_1.languageServerManager.embeddedBscInfo.version,
                value: 'embedded'
            }];
        //look for brighterscript in node_modules from all workspace folders
        for (const workspaceFolder of workspaceFolders) {
            let bscPath;
            try {
                bscPath = resolve.sync('brighterscript', {
                    basedir: workspaceFolder
                });
            }
            catch (e) {
                //could not resolve the path, so just move on
            }
            //resolve returns a bsc script path, so remove that to get the root of brighterscript folder
            if (bscPath) {
                bscPath = bscPath.replace(/[\\\/]dist[\\\/]index.js/i, '');
                // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
                const version = fsExtra.readJsonSync(`${bscPath}/package.json`).version;
                //make the path relative to the workspace folder
                bscPath = path.relative(workspaceFolder, bscPath);
                versions.push({
                    label: 'Use Workspace Version',
                    description: version,
                    detail: bscPath.replace(/\\+/g, '/'),
                    value: bscPath.replace(/\\+/g, '/')
                });
            }
        }
        return versions;
    }
    async getBscVersionsFromNpm() {
        const json = await util_1.util.exec(`npm view brighterscript time --json`);
        const versions = JSON.parse(json);
        //delete a few keys that aren't actual versions
        delete versions.created;
        delete versions.modified;
        return Object.entries(versions)
            .map(x => {
            return {
                version: x[0],
                date: x[1]
            };
        })
            .sort((0, thenby_1.firstBy)(x => x.date, -1));
    }
    /**
     * If this changes the user/folder/workspace settings, that will trigger a reload of the language server so there's no need to
     * call the reload manually
     */
    async selectBrighterScriptVersion() {
        var _a, _b, _c, _d, _e;
        const quickPickItems = this.discoverBrighterScriptVersions((_b = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a.map(x => this.getWorkspaceOrFolderPath(x.uri.fsPath))) !== null && _b !== void 0 ? _b : []);
        //start the request right now, we will leverage it later
        const versionsFromNpmPromise = this.getBscVersionsFromNpm();
        //get the full list of versions from npm
        quickPickItems.push({
            label: '$(package) Install from npm',
            description: '',
            detail: '',
            command: async () => {
                let versionsFromNpm = (await versionsFromNpmPromise).filter(x => !semver.prerelease(x.version)).map(x => {
                    return {
                        label: x.version,
                        value: x.version,
                        description: `${dayjs(x.date).fromNow(true)} ago`
                    };
                });
                return await vscode.window.showQuickPick(versionsFromNpm, { placeHolder: `Select the BrighterScript version used for BrightScript and BrighterScript language features` });
            }
        });
        //get the full list of versions from npm
        quickPickItems.push({
            label: '$(package) Install from npm (insider builds)',
            description: '',
            detail: '',
            command: async () => {
                let versionsFromNpm = (await versionsFromNpmPromise).filter(x => semver.prerelease(x.version)).map(x => {
                    return {
                        label: x.version,
                        value: x.version,
                        description: `${dayjs(x.date).fromNow(true)} ago`
                    };
                });
                return await vscode.window.showQuickPick(versionsFromNpm, { placeHolder: `Select the BrighterScript version used for BrightScript and BrighterScript language features` });
            }
        });
        let selection = await vscode.window.showQuickPick(quickPickItems, { placeHolder: `Select the BrighterScript version used for BrightScript and BrighterScript language features` });
        //if the selection has a command, run it before continuing;
        selection = (_d = await ((_c = selection === null || selection === void 0 ? void 0 : selection.command) === null || _c === void 0 ? void 0 : _c.call(selection))) !== null && _d !== void 0 ? _d : selection;
        if (selection) {
            const config = util_1.util.getConfiguration('brightscript');
            const currentValue = (_e = config.get('bsdk')) !== null && _e !== void 0 ? _e : 'embedded';
            //if the user chose the same value that's already there, just restart the language server
            if (selection.value === currentValue) {
                await this.restartLanguageServer();
                //set the new value
            }
            else {
                //save this to workspace/folder settings (vscode automatically decides if it goes into the code-workspace settings or the folder settings)
                await config.update('bsdk', selection.value);
            }
            return selection.value;
        }
    }
    getWorkspaceOrFolderPath(workspaceFolder) {
        const workspaceFile = vscode.workspace.workspaceFile;
        if (workspaceFile) {
            return path.dirname(workspaceFile.fsPath);
        }
        else {
            return workspaceFolder;
        }
    }
}
exports.LanguageServerInfoCommand = LanguageServerInfoCommand;
LanguageServerInfoCommand.commandName = 'extension.brightscript.languageServer.info';
exports.languageServerInfoCommand = new LanguageServerInfoCommand();
//# sourceMappingURL=LanguageServerInfoCommand.js.map