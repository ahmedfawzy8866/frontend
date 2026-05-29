"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rekeyAndPackageCommand = exports.RekeyAndPackageCommand = exports.FILE_SCHEME = void 0;
const vscode = require("vscode");
const rokuDeploy = require("roku-deploy");
const path = require("path");
const fs_extra_1 = require("fs-extra");
const util_1 = require("../util");
const brighterscript_1 = require("brighterscript");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const open = require("open");
exports.FILE_SCHEME = 'bs-captureScreenshot';
class RekeyAndPackageCommand {
    register(context, BrightScriptCommandsInstance, userInputManager) {
        this.brightScriptCommands = BrightScriptCommandsInstance;
        this.userInputManager = userInputManager;
        context.subscriptions.push(vscode.commands.registerCommand('extension.brightscript.rekeyDevice', async (hostParam) => {
            await this.rekeyDevice();
        }));
        context.subscriptions.push(vscode.commands.registerCommand('extension.brightscript.createPackage', async (hostParam) => {
            await this.createPackage({});
        }));
        context.subscriptions.push(vscode.commands.registerCommand('extension.brightscript.rekeyAndPackage', async (hostParam) => {
            await this.createPackage({}, true);
        }));
    }
    async rekeyDevice() {
        const PICK_FROM_JSON = 'Pick from Json file';
        const MANUAL_ENTRY = 'Enter manually';
        let rekeyConfig = {
            signingPassword: '',
            rekeySignedPackage: '',
            host: '',
            password: ''
        };
        let rekeyOptionList = [PICK_FROM_JSON, MANUAL_ENTRY];
        let rekeyOption = await vscode.window.showQuickPick(rekeyOptionList, { placeHolder: 'How would you like to select your configuration', canPickMany: false });
        if (rekeyOption) {
            switch (rekeyOption) {
                case PICK_FROM_JSON:
                    rekeyConfig = await this.getRekeyConfigFromJson(rekeyConfig);
                    break;
                case MANUAL_ENTRY:
                    rekeyConfig = await this.getRekeyManualEntries(rekeyConfig, {});
                    break;
            }
        }
        await rokuDeploy.rekeyDevice(rekeyConfig);
        void vscode.window.showInformationMessage(`Device successfully rekeyed!`);
    }
    async getRekeyConfigFromJson(rekeyConfig) {
        var _a;
        const options = {
            canSelectMany: false,
            openLabel: 'Select',
            canSelectFiles: true,
            canSelectFolders: false,
            filters: {
                'Json files': ['json']
            }
        };
        let fileUri = await vscode.window.showOpenDialog(options);
        if (fileUri === null || fileUri === void 0 ? void 0 : fileUri[0]) {
            let content = JSON.parse((0, fs_extra_1.readFileSync)(fileUri[0].fsPath).toString());
            if (content.signingPassword) {
                rekeyConfig.signingPassword = content.signingPassword;
            }
            if ((_a = content.rekeySignedPackage) === null || _a === void 0 ? void 0 : _a.includes('./')) {
                await this.brightScriptCommands.getWorkspacePath();
                let workspacePath = this.brightScriptCommands.workspacePath;
                rekeyConfig.rekeySignedPackage = workspacePath + content.rekeySignedPackage.replace('./', '/');
            }
            if (content.host) {
                rekeyConfig.host = content.host;
            }
            if (content.password) {
                rekeyConfig.password = content.password;
            }
        }
        return this.getRekeyManualEntries(rekeyConfig, rekeyConfig);
    }
    async getRekeyManualEntries(rekeyConfig, defaultValues) {
        var _a, _b, _c;
        rekeyConfig.host = await this.userInputManager.promptForHost({ defaultValue: (_a = rekeyConfig === null || rekeyConfig === void 0 ? void 0 : rekeyConfig.host) !== null && _a !== void 0 ? _a : defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.host });
        rekeyConfig.password = await vscode.window.showInputBox({
            title: 'Enter password for the Roku device you want to rekey',
            value: (_b = defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.password) !== null && _b !== void 0 ? _b : ''
        });
        if (!rekeyConfig.password) {
            throw new Error('Cancelled');
        }
        rekeyConfig.signingPassword = await vscode.window.showInputBox({
            title: 'Enter signingPassword to be used to rekey the Roku',
            value: (_c = defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.signingPassword) !== null && _c !== void 0 ? _c : ''
        });
        if (!rekeyConfig.signingPassword) {
            throw new Error('Cancelled');
        }
        rekeyConfig.rekeySignedPackage = await this.getSignedPackage(rekeyConfig.rekeySignedPackage);
        const selection = await vscode.window.showInformationMessage('Rekey info:', {
            modal: true,
            detail: [
                `host: ${rekeyConfig.host}`,
                `password: ${rekeyConfig.password}`,
                `signing password: ${rekeyConfig.signingPassword}`,
                `package: ${rekeyConfig.rekeySignedPackage}`
            ].join('\n')
        }, 'Rekey', 'I want to change something');
        if (selection === 'Rekey') {
            return rekeyConfig;
        }
        else if (selection === 'I want to change something') {
            return this.getRekeyManualEntries(rekeyConfig, rekeyConfig);
        }
    }
    async getSignedPackage(rekeySignedPackage) {
        let response = '';
        rekeySignedPackage = (0, brighterscript_1.standardizePath)(rekeySignedPackage);
        if ((rekeySignedPackage === null || rekeySignedPackage === void 0 ? void 0 : rekeySignedPackage.length) > 0) {
            response = await vscode.window.showInformationMessage('Please choose a signed package (a .pkg file) to rekey your device', {
                modal: true,
                detail: `Current file: ${rekeySignedPackage}`
            }, 'Use the current file', 'Pick a different file');
        }
        else {
            response = await vscode.window.showInformationMessage('Please choose a signed package (a .pkg file) to rekey your device', { modal: true }, 'Open file picker');
        }
        if ((response === 'Open file picker') || (response === 'Pick a different file')) {
            const options = {
                canSelectMany: false,
                openLabel: 'Select signed package file',
                canSelectFiles: true,
                canSelectFolders: false,
                filters: {
                    'Pkg files': ['pkg']
                }
            };
            let fileUri = await vscode.window.showOpenDialog(options);
            if (fileUri === null || fileUri === void 0 ? void 0 : fileUri[0]) {
                return fileUri[0].fsPath;
            }
        }
        else if (response === 'Use the current file') {
            return rekeySignedPackage;
        }
        else {
            throw new Error('Cancelled');
        }
    }
    async promptUserForAFolder(dialogTitle) {
        let response = '';
        response = await vscode.window.showInformationMessage(dialogTitle, { modal: true }, 'Open file picker');
        if (response === 'Open file picker') {
            const options = {
                canSelectMany: false,
                openLabel: 'Select',
                canSelectFiles: false,
                canSelectFolders: true
            };
            let folderUri = await vscode.window.showOpenDialog(options);
            if (folderUri === null || folderUri === void 0 ? void 0 : folderUri[0]) {
                return folderUri[0].fsPath;
            }
        }
        else {
            throw new Error('Cancelled');
        }
    }
    async createPackage(defaultValues, rekeyFlag = false) {
        var _a, _b, _c, _d, _e, _f;
        const workspaceFolder = await this.brightScriptCommands.getWorkspacePath();
        let rokuDeployOptions = defaultValues;
        let PACKAGE_FOLDER = 'Pick a folder';
        let PACKAGE_FROM_LAUNCH_JSON = 'Pick from a launch.json';
        let PACKAGE_FROM_ROKU_DEPLOY = 'Pick a rokudeploy.json';
        let packageOptionList = [];
        if (rokuDeployOptions.packageConfig) {
            packageOptionList.push({
                label: `Previous Selection:`,
                detail: `${rokuDeployOptions.packageConfig}`
            });
        }
        packageOptionList.push(PACKAGE_FOLDER, PACKAGE_FROM_LAUNCH_JSON, PACKAGE_FROM_ROKU_DEPLOY);
        let packageOption = await vscode.window.showQuickPick(packageOptionList, { placeHolder: 'What would you like to package', canPickMany: false });
        if (packageOption) {
            switch (packageOption) {
                case PACKAGE_FOLDER:
                    rokuDeployOptions = await this.packageFromFolder(rokuDeployOptions);
                    break;
                case PACKAGE_FROM_LAUNCH_JSON:
                    rokuDeployOptions = await this.packageFromLaunchConfig(rokuDeployOptions);
                    break;
                case PACKAGE_FROM_ROKU_DEPLOY:
                    rokuDeployOptions = await this.packageFromRokuDeploy(rokuDeployOptions);
                    break;
            }
            rokuDeployOptions.host = await this.userInputManager.promptForHost({ defaultValue: (_a = rokuDeployOptions === null || rokuDeployOptions === void 0 ? void 0 : rokuDeployOptions.host) !== null && _a !== void 0 ? _a : '' });
            rokuDeployOptions.password = await vscode.window.showInputBox({
                title: 'Enter password for the Roku device',
                value: (_b = rokuDeployOptions.password) !== null && _b !== void 0 ? _b : ''
            });
            if (!rokuDeployOptions.password) {
                throw new Error('Cancelled');
            }
            rokuDeployOptions.signingPassword = await vscode.window.showInputBox({
                title: 'Enter signingPassword for the Roku',
                value: (_c = rokuDeployOptions.signingPassword) !== null && _c !== void 0 ? _c : ''
            });
            if (!rokuDeployOptions.rootDir) {
                rokuDeployOptions.rootDir = await this.promptUserForAFolder('Select rootDir to create package');
            }
            if (!rokuDeployOptions.rootDir) {
                throw new Error('Cancelled');
            }
            //normalize a few options
            (_d = rokuDeployOptions.outFile) !== null && _d !== void 0 ? _d : (rokuDeployOptions.outFile = rokuDeploy.getOptions(rokuDeployOptions).outFile);
            rokuDeployOptions.outDir = (0, brighterscript_1.standardizePath)((_e = rokuDeployOptions.outDir) !== null && _e !== void 0 ? _e : `${workspaceFolder}/out`);
            rokuDeployOptions.rootDir = (0, brighterscript_1.standardizePath)(rokuDeployOptions.rootDir);
            rokuDeployOptions.retainStagingDir = true;
            if (((_f = rokuDeployOptions.rekeySignedPackage) === null || _f === void 0 ? void 0 : _f.length) > 0) {
                rokuDeployOptions.rekeySignedPackage = (0, brighterscript_1.standardizePath)(rokuDeployOptions.rekeySignedPackage);
            }
            let details = [
                `host: ${rokuDeployOptions.host}`,
                `password: ${rokuDeployOptions.password}`,
                `signing password: ${rokuDeployOptions.signingPassword}`,
                `outDir: ${rokuDeployOptions.outDir}`,
                `outFile: ${rokuDeployOptions.outFile}.pkg`,
                `rootDir: ${rokuDeployOptions.rootDir}`
            ];
            if (rekeyFlag) {
                rokuDeployOptions.rekeySignedPackage = await this.getSignedPackage(rokuDeployOptions.rekeySignedPackage);
                details.push(`rekeySignedPackage: ${rokuDeployOptions.rekeySignedPackage}`);
            }
            let confirmText = 'Create Package';
            let changeText = 'I want to change something';
            let response = await vscode.window.showInformationMessage('Create Package info:', {
                modal: true,
                detail: details.join('\n')
            }, confirmText, changeText);
            if (response === confirmText) {
                if (rekeyFlag) {
                    //rekey device
                    await rokuDeploy.rekeyDevice(rokuDeployOptions);
                }
                //create a zip and pkg file of the app based on the selected launch config
                await rokuDeploy.createPackage(rokuDeployOptions);
                let remotePkgPath = await rokuDeploy.signExistingPackage(rokuDeployOptions);
                await rokuDeploy.retrieveSignedPackage(remotePkgPath, rokuDeployOptions);
                const outPath = (0, brighterscript_1.standardizePath)(`${rokuDeployOptions.outDir}/${rokuDeployOptions.outFile}`);
                let successfulMessage = `Package successfully created at ${outPath}`;
                void vscode.window.showInformationMessage(successfulMessage, 'View in folder').then(() => {
                    return open(rokuDeployOptions.outDir);
                });
            }
            else if (response === changeText) {
                return this.createPackage(rokuDeployOptions, rekeyFlag);
            }
        }
    }
    async packageFromFolder(rokuDeployOptions) {
        const options = {
            canSelectMany: false,
            openLabel: 'Select Folder to package',
            canSelectFiles: false,
            canSelectFolders: true
        };
        let fileUri = await vscode.window.showOpenDialog(options);
        if (fileUri === null || fileUri === void 0 ? void 0 : fileUri[0]) {
            let rootDir = fileUri === null || fileUri === void 0 ? void 0 : fileUri[0].fsPath;
            rokuDeployOptions.rootDir = rootDir;
            rokuDeployOptions.outFile = path.basename(rootDir);
            rokuDeployOptions.packageConfig = 'folder: ' + rootDir;
            return rokuDeployOptions;
        }
    }
    async packageFromRokuDeploy(rokuDeployOptions) {
        const options = {
            canSelectMany: false,
            openLabel: 'Select',
            canSelectFiles: true,
            canSelectFolders: false,
            filters: {
                'Json files': ['json']
            }
        };
        let fileUri = await vscode.window.showOpenDialog(options);
        if (fileUri === null || fileUri === void 0 ? void 0 : fileUri[0]) {
            return this.parseRokuDeployJson(fileUri[0].fsPath, rokuDeployOptions);
        }
        return rokuDeployOptions;
    }
    async packageFromLaunchConfig(rokuDeployOptions) {
        var _a;
        let config = util_1.util.getConfiguration('launch');
        const configurations = config.get('configurations');
        let configNames = [];
        for (let config of configurations) {
            configNames.push(config.name);
        }
        //show user a list of available launch configs to choose from
        let selectedConfig = configurations[0];
        let selectedConfigName = await vscode.window.showQuickPick(configNames, { placeHolder: 'Please select a config', canPickMany: false });
        if (selectedConfigName) {
            let selectedIndex = configNames.indexOf(selectedConfigName);
            selectedConfig = configurations[selectedIndex];
        }
        if ((_a = selectedConfig.rootDir) === null || _a === void 0 ? void 0 : _a.includes('${workspaceFolder}')) {
            let workspacePath = await this.brightScriptCommands.getWorkspacePath();
            selectedConfig.rootDir = path.normalize(selectedConfig.rootDir.replace('${workspaceFolder}', workspacePath));
        }
        rokuDeployOptions.packageConfig = 'launch.json: ' + selectedConfig.rootDir;
        if (!selectedConfig.host.includes('${')) {
            rokuDeployOptions.host = selectedConfig.host;
        }
        if (!selectedConfig.password.includes('${')) {
            rokuDeployOptions.password = selectedConfig.password;
        }
        rokuDeployOptions.rootDir = selectedConfig.rootDir;
        rokuDeployOptions.files = selectedConfig.files;
        rokuDeployOptions.outFile = 'roku-' + selectedConfig.name.replace(/ /g, '-');
        return rokuDeployOptions;
    }
    async parseRokuDeployJson(filePath, rokuDeployOptions) {
        var _a, _b, _c;
        rokuDeployOptions.packageConfig = 'rokudeploy.json: ' + filePath;
        let content = JSON.parse((0, fs_extra_1.readFileSync)(filePath).toString());
        await this.brightScriptCommands.getWorkspacePath();
        let workspacePath = this.brightScriptCommands.workspacePath;
        if (content.signingPassword) {
            rokuDeployOptions.signingPassword = content.signingPassword;
        }
        if ((_a = content.rekeySignedPackage) === null || _a === void 0 ? void 0 : _a.includes('./')) {
            rokuDeployOptions.rekeySignedPackage = workspacePath + content.rekeySignedPackage.replace('./', '/');
        }
        if (content.host) {
            rokuDeployOptions.host = content.host;
        }
        if (content.password) {
            rokuDeployOptions.password = content.password;
        }
        if ((_b = content.rootDir) === null || _b === void 0 ? void 0 : _b.includes('./')) {
            rokuDeployOptions.rootDir = workspacePath + content.rootDir.replace('./', '/');
        }
        if ((_c = content.outDir) === null || _c === void 0 ? void 0 : _c.includes('./')) {
            rokuDeployOptions.outDir = workspacePath + content.outDir.replace('./', '/');
        }
        if (content.outFile) {
            rokuDeployOptions.outFile = content.outFile;
        }
        if (content.retainStagingDir) {
            rokuDeployOptions.retainStagingDir = content.retainStagingDir;
        }
        return rokuDeployOptions;
    }
}
exports.RekeyAndPackageCommand = RekeyAndPackageCommand;
exports.rekeyAndPackageCommand = new RekeyAndPackageCommand();
//# sourceMappingURL=RekeyAndPackageCommand.js.map