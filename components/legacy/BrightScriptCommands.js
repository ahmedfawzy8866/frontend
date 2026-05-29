"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrightScriptCommands = void 0;
const request = require("postman-request");
const vscode = require("vscode");
const BrightScriptFileUtils_1 = require("./BrightScriptFileUtils");
const GlobalStateManager_1 = require("./GlobalStateManager");
const BrighterScriptPreviewCommand_1 = require("./commands/BrighterScriptPreviewCommand");
const CaptureScreenshotCommand_1 = require("./commands/CaptureScreenshotCommand");
const RekeyAndPackageCommand_1 = require("./commands/RekeyAndPackageCommand");
const LanguageServerInfoCommand_1 = require("./commands/LanguageServerInfoCommand");
const util_1 = require("./util");
const util_2 = require("roku-debug/dist/util");
const xml2js = require("xml2js");
const thenby_1 = require("thenby");
const ClearNpmPackageCacheCommand_1 = require("./commands/ClearNpmPackageCacheCommand");
const ProfilingCommands_1 = require("./commands/ProfilingCommands");
class BrightScriptCommands {
    constructor(remoteControlManager, whatsNewManager, context, deviceManager, userInputManager, localPackageManager) {
        this.remoteControlManager = remoteControlManager;
        this.whatsNewManager = whatsNewManager;
        this.context = context;
        this.deviceManager = deviceManager;
        this.userInputManager = userInputManager;
        this.localPackageManager = localPackageManager;
        this.keypressNotifiers = [];
        this.fileUtils = new BrightScriptFileUtils_1.default();
    }
    registerCommands() {
        BrighterScriptPreviewCommand_1.brighterScriptPreviewCommand.register(this.context);
        LanguageServerInfoCommand_1.languageServerInfoCommand.register(this.context, this.localPackageManager);
        CaptureScreenshotCommand_1.captureScreenshotCommand.register(this.context, this);
        RekeyAndPackageCommand_1.rekeyAndPackageCommand.register(this.context, this, this.userInputManager);
        ClearNpmPackageCacheCommand_1.clearNpmPackageCacheCommand.register(this.context, this.localPackageManager);
        ProfilingCommands_1.profilingCommands.register(this.context);
        this.registerGeneralCommands();
        this.registerCommand('sendRemoteCommand', async (key) => {
            await this.sendRemoteCommand(key);
        });
        //the "Refresh" button in the Devices list
        this.registerCommand('refreshDeviceList', (key) => {
            this.deviceManager.refresh(true);
        });
        this.registerCommand('rescanDevices', () => {
            this.deviceManager.refresh(true);
        });
        // Refresh a single device (inline button on hover in devices panel)
        this.registerCommand('refreshDevice', async (item) => {
            const device = this.deviceManager.getDevice(item.key);
            if (device) {
                await this.deviceManager.checkDeviceHealth(device, true);
            }
        });
        this.registerCommand('sendRemoteText', async () => {
            let items = [];
            for (const item of new GlobalStateManager_1.GlobalStateManager(this.context).sendRemoteTextHistory) {
                items.push({ label: item });
            }
            const stuffUserTyped = await util_1.util.showQuickPickInputBox({
                placeholder: 'Press enter to send all typed characters to the Roku',
                items: items
            });
            console.log('userInput', stuffUserTyped);
            if (stuffUserTyped) {
                new GlobalStateManager_1.GlobalStateManager(this.context).addTextHistory(stuffUserTyped);
                let fallbackToHttp = true;
                await this.getRemoteHost();
                //TODO fix SceneGraphDebugCommandController to not timeout so quickly
                // try {
                //     let commandController = new SceneGraphDebugCommandController(this.host);
                //     let response = await commandController.type(stuffUserTyped);
                //     if (!response.error) {
                //         fallbackToHttp = false;
                //     }
                // } catch (error) {
                //     console.error(error);
                //     // Let this fallback to the old HTTP based logic
                // }
                if (fallbackToHttp) {
                    for (let character of stuffUserTyped) {
                        await this.sendAsciiToDevice(character);
                    }
                }
            }
            await vscode.commands.executeCommand('workbench.action.focusPanel');
        });
        this.registerCommand('toggleRemoteControlMode', (initiator) => {
            return this.remoteControlManager.toggleRemoteControlMode(initiator);
        });
        this.registerCommand('enableRemoteControlMode', () => {
            return this.remoteControlManager.setRemoteControlMode(true, 'command');
        });
        this.registerCommand('disableRemoteControlMode', () => {
            return this.remoteControlManager.setRemoteControlMode(false, 'command');
        });
        this.registerCommand('pressBackButton', async () => {
            await this.sendRemoteCommand('Back');
        });
        this.registerCommand('pressBackspaceButton', async () => {
            await this.sendRemoteCommand('Backspace');
        });
        this.registerCommand('pressHomeButton', async () => {
            await this.sendRemoteCommand('Home');
        });
        this.registerCommand('pressUpButton', async () => {
            await this.sendRemoteCommand('Up');
        });
        this.registerCommand('pressDownButton', async () => {
            await this.sendRemoteCommand('Down');
        });
        this.registerCommand('pressRightButton', async () => {
            await this.sendRemoteCommand('Right');
        });
        this.registerCommand('pressLeftButton', async () => {
            await this.sendRemoteCommand('Left');
        });
        this.registerCommand('pressSelectButton', async () => {
            await this.sendRemoteCommand('Select');
        });
        this.registerCommand('pressPlayButton', async () => {
            await this.sendRemoteCommand('Play');
        });
        this.registerCommand('pressRevButton', async () => {
            await this.sendRemoteCommand('Rev');
        });
        this.registerCommand('pressFwdButton', async () => {
            await this.sendRemoteCommand('Fwd');
        });
        this.registerCommand('pressStarButton', async () => {
            await this.sendRemoteCommand('Info');
        });
        this.registerCommand('pressInstantReplayButton', async () => {
            await this.sendRemoteCommand('InstantReplay');
        });
        this.registerCommand('pressSearchButton', async () => {
            await this.sendRemoteCommand('Search');
        });
        this.registerCommand('pressEnterButton', async () => {
            await this.sendRemoteCommand('Enter');
        });
        this.registerCommand('pressFindRemote', async () => {
            await this.sendRemoteCommand('FindRemote');
        });
        this.registerCommand('pressVolumeDown', async () => {
            await this.sendRemoteCommand('VolumeDown');
        });
        this.registerCommand('pressVolumeMute', async () => {
            await this.sendRemoteCommand('VolumeMute');
        });
        this.registerCommand('pressVolumeUp', async () => {
            await this.sendRemoteCommand('VolumeUp');
        });
        this.registerCommand('setVolume', async () => {
            let result = await vscode.window.showInputBox({
                placeHolder: 'The target volume level (0-100)',
                value: '',
                validateInput: (text) => {
                    const num = Number(text);
                    if (isNaN(num)) {
                        return 'Value must be a number';
                    }
                    else if (num < 0 || num > 100) {
                        return 'Please enter a number between 0 and 100';
                    }
                    return null;
                }
            });
            const targetVolume = Number(result);
            if (!isNaN(targetVolume)) {
                await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: 'Setting volume'
                }, async (progress) => {
                    const totalCommands = 100 + targetVolume;
                    const incrementValue = 100 / totalCommands;
                    let executedCommands = 0;
                    for (let i = 0; i < 100; i++) {
                        await this.sendRemoteCommand('VolumeDown');
                        executedCommands++;
                        progress.report({ increment: incrementValue, message: `decreasing volume - ${Math.round((executedCommands / totalCommands) * 100)}%` });
                    }
                    for (let i = 0; i < targetVolume; i++) {
                        await this.sendRemoteCommand('VolumeUp');
                        executedCommands++;
                        progress.report({ increment: incrementValue, message: `increasing volume - ${Math.round((executedCommands / totalCommands) * 100)}%` });
                    }
                });
            }
        });
        this.registerCommand('pressPowerOff', async () => {
            await this.sendRemoteCommand('PowerOff');
        });
        this.registerCommand('pressPowerOn', async () => {
            await this.sendRemoteCommand('PowerOn');
        });
        this.registerCommand('pressChannelUp', async () => {
            await this.sendRemoteCommand('ChannelUp');
        });
        this.registerCommand('pressChannelDown', async () => {
            await this.sendRemoteCommand('ChannelDown');
        });
        this.registerCommand('pressBlue', async () => {
            await this.sendRemoteCommand('Blue');
        });
        this.registerCommand('pressGreen', async () => {
            await this.sendRemoteCommand('Green');
        });
        this.registerCommand('pressRed', async () => {
            await this.sendRemoteCommand('Red');
        });
        this.registerCommand('pressYellow', async () => {
            await this.sendRemoteCommand('Yellow');
        });
        this.registerCommand('pressExit', async () => {
            await this.sendRemoteCommand('Exit');
        });
        this.registerCommand('changeTvInput', async (host) => {
            const selectedInput = await vscode.window.showQuickPick([
                'InputHDMI1',
                'InputHDMI2',
                'InputHDMI3',
                'InputHDMI4',
                'InputAV1',
                'InputTuner'
            ]);
            if (selectedInput) {
                await this.sendRemoteCommand(selectedInput, host);
            }
        });
        this.registerKeyboardInputs();
    }
    /**
     * Registers all the commands for a-z, A-Z, 0-9, and all the primary character such as !, @, #, ', ", etc...
     */
    registerKeyboardInputs() {
        // Get all the keybindings from our package.json
        const extension = vscode.extensions.getExtension('RokuCommunity.brightscript');
        const keybindings = extension.packageJSON.contributes.keybindings;
        for (let keybinding of keybindings) {
            // Find every keybinding that is related to sending text characters to the device
            if (keybinding.command.includes('.sendAscii+')) {
                if (!keybinding.args) {
                    throw new Error(`Can not register command: ${keybinding.command}. Missing Arguments.`);
                }
                // Dynamically register the the command defined in the keybinding
                this.registerCommand(keybinding.command, async (character) => {
                    await this.sendAsciiToDevice(character);
                });
            }
        }
    }
    registerGeneralCommands() {
        //a command that does absolutely nothing. It's here to allow us to absorb unsupported keypresses when in **remote control mode**.
        this.registerCommand('doNothing', () => { });
        this.registerCommand('toggleXML', async () => {
            await this.onToggleXml();
        });
        this.registerCommand('goToParentComponent', async () => {
            await this.onGoToParentComponent();
        });
        this.registerCommand('clearGlobalState', async () => {
            new GlobalStateManager_1.GlobalStateManager(this.context).clear();
            await vscode.window.showInformationMessage('BrightScript Language extension global state cleared');
        });
        this.registerCommand('clearCurrentDeviceList', async () => {
            this.deviceManager.clearCurrentDeviceList();
            await util_1.util.showTimedNotification('Clearing device list');
        });
        this.registerCommand('clearDeviceCache', async () => {
            this.deviceManager.clearAllCache();
            await util_1.util.showTimedNotification('Clearing device cache');
        });
        this.registerCommand('clearLastSeenDevices', async () => {
            new GlobalStateManager_1.GlobalStateManager(this.context).clearLastSeenDevices();
            await vscode.window.showInformationMessage('Last seen devices cleared');
        });
        this.registerCommand('copyToClipboard', async (value) => {
            try {
                if (util_1.util.isNullish(value)) {
                    throw new Error('Cannot copy ${value} to clipboard');
                }
                await vscode.env.clipboard.writeText(value === null || value === void 0 ? void 0 : value.toString());
                await vscode.window.showInformationMessage(`Copied to clipboard: ${value}`);
            }
            catch (error) {
                await vscode.window.showErrorMessage(`Could not copy value to clipboard`);
            }
        });
        this.registerCommand('openUrl', async (url) => {
            try {
                await vscode.env.openExternal(vscode.Uri.parse(url));
            }
            catch (error) {
                await vscode.window.showErrorMessage(`Tried to open url but failed: ${url}`);
            }
        });
        this.registerCommand('openRegistryInBrowser', async (host) => {
            if (!host) {
                host = await this.userInputManager.promptForHost();
            }
            let responseText = await util_1.util.spinAsync('Fetching app list', async () => {
                return (await util_1.util.httpGet(`http://${host}:8060/query/apps`, { timeout: 4000 })).body;
            });
            const parsed = await xml2js.parseStringPromise(responseText);
            //convert the items to QuickPick items
            const items = parsed.apps.app.map((appData) => {
                return {
                    label: appData._,
                    detail: `ID: ${appData.$.id}`,
                    description: `${appData.$.version}`,
                    appId: `${appData.$.id}`
                };
                //sort the items alphabetically
            }).sort((0, thenby_1.firstBy)('label'));
            //move the dev app to the top (and add a label/section to differentiate it)
            const devApp = items.find(x => x.appId === 'dev');
            if (devApp) {
                items.splice(items.indexOf(devApp), 1);
                items.unshift({ kind: vscode.QuickPickItemKind.Separator, label: 'dev' }, devApp, { kind: vscode.QuickPickItemKind.Separator, label: ' ' });
            }
            const selectedApp = await vscode.window.showQuickPick(items, { placeHolder: 'Which app would you like to see the registry for?' });
            if (selectedApp) {
                const appId = selectedApp.appId;
                let url = `http://${host}:8060/query/registry/${appId}`;
                try {
                    await vscode.env.openExternal(vscode.Uri.parse(url));
                }
                catch (error) {
                    await vscode.window.showErrorMessage(`Tried to open url but failed: ${url}`);
                }
            }
        });
        this.registerCommand('setActiveDevice', async (deviceOrItem) => {
            var _a;
            let ip;
            if (typeof deviceOrItem === 'object' && (deviceOrItem === null || deviceOrItem === void 0 ? void 0 : deviceOrItem.key)) {
                const serialNumber = deviceOrItem.key;
                ip = (_a = this.deviceManager.getDevice(serialNumber)) === null || _a === void 0 ? void 0 : _a.ip;
            }
            else if (typeof deviceOrItem === 'string') {
                ip = deviceOrItem;
            }
            if (!ip) {
                ip = await this.userInputManager.promptForHost();
            }
            if (!ip) {
                throw new Error('Tried to set active device but failed.');
            }
            else {
                await this.context.workspaceState.update('remoteHost', ip);
                await vscode.window.showInformationMessage(`BrightScript Language extension active device set to: ${ip}`);
            }
        });
        this.registerCommand('setDevicePassword', async (deviceIp) => {
            if (!deviceIp) {
                throw new Error('Device IP is required to set password.');
            }
            const password = await vscode.window.showInputBox({
                placeHolder: 'Enter the developer account password for this device',
                password: true,
                prompt: `Set password for device: ${deviceIp}`
            });
            if (password !== undefined) {
                await this.setDevicePassword(deviceIp, password);
                if (password) {
                    await vscode.window.showInformationMessage(`Password set for device: ${deviceIp}`);
                }
                else {
                    await vscode.window.showInformationMessage(`Password cleared for device: ${deviceIp}`);
                }
            }
        });
        this.registerCommand('clearActiveDevice', async () => {
            await this.context.workspaceState.update('remoteHost', '');
            await vscode.window.showInformationMessage('BrightScript Language extension active device cleared');
        });
        this.registerCommand('showReleaseNotes', () => {
            this.whatsNewManager.showReleaseNotes();
        });
    }
    async openFile(filename, range = null, preview = false) {
        let uri = vscode.Uri.file(filename);
        try {
            let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
            await vscode.window.showTextDocument(doc, { preview: preview });
            if (range) {
                await this.gotoRange(range);
            }
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async gotoRange(range) {
        let editor = vscode.window.activeTextEditor;
        editor.selection = new vscode.Selection(range.start.line, range.start.character, range.start.line, range.start.character);
        await vscode.commands.executeCommand('revealLine', {
            lineNumber: range.start.line,
            at: 'center'
        });
    }
    async onToggleXml() {
        if (vscode.window.activeTextEditor) {
            const currentDocument = vscode.window.activeTextEditor.document;
            let alternateFileName = this.fileUtils.getAlternateFileName(currentDocument.fileName);
            if (alternateFileName) {
                if (!await this.openFile(alternateFileName) &&
                    alternateFileName.toLowerCase().endsWith('.brs')) {
                    await this.openFile(this.fileUtils.getBsFileName(alternateFileName));
                }
            }
        }
    }
    async onGoToParentComponent() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const currentDocument = editor.document;
        const fileName = currentDocument.fileName;
        const lowerFileName = fileName.toLowerCase();
        const isXml = lowerFileName.endsWith('.xml');
        const isBrs = lowerFileName.endsWith('.brs') || lowerFileName.endsWith('.bs');
        if (!isXml && !isBrs) {
            return;
        }
        // Get or open the XML document
        let xmlDoc;
        if (isXml) {
            xmlDoc = currentDocument;
        }
        else {
            const xmlFileName = this.fileUtils.getAlternateFileName(fileName);
            if (!xmlFileName) {
                return;
            }
            try {
                xmlDoc = await vscode.workspace.openTextDocument(vscode.Uri.file(xmlFileName));
            }
            catch (e) {
                return;
            }
        }
        const xmlContent = xmlDoc.getText();
        const parentName = this.fileUtils.getParentComponentName(xmlContent);
        if (!parentName) {
            await vscode.window.showInformationMessage('No parent component found');
            return;
        }
        const extendsPosition = this.getExtendsValuePosition(xmlContent, xmlDoc);
        if (!extendsPosition) {
            return;
        }
        // Delegate to the definition provider via the LSP
        const locations = await vscode.commands.executeCommand('vscode.executeDefinitionProvider', xmlDoc.uri, extendsPosition);
        if (!locations || locations.length === 0) {
            await vscode.window.showInformationMessage(`Could not find parent component: ${parentName}`);
            return;
        }
        const parentXmlPath = locations[0].uri.fsPath;
        if (isBrs) {
            const parentBrsPath = this.fileUtils.getAlternateFileName(parentXmlPath);
            if (parentBrsPath && !await this.openFile(parentBrsPath)) {
                await this.openFile(this.fileUtils.getBsFileName(parentBrsPath));
            }
        }
        else {
            await this.openFile(parentXmlPath);
        }
    }
    getExtendsValuePosition(xmlContent, xmlDoc) {
        // Match extends="VALUE" capturing the VALUE portion; [^>]+ spans across lines since [^>] matches \n
        const match = /<component[^>]+extends\s*=\s*["']([^"']+)/i.exec(xmlContent);
        if (!match) {
            return undefined;
        }
        // Offset to first character of the value (after the opening quote)
        const valueOffset = match.index + match[0].length - match[1].length;
        return xmlDoc.positionAt(valueOffset);
    }
    async sendRemoteCommand(key, host, literalCharacter = false) {
        for (const notifier of this.keypressNotifiers) {
            notifier(key, literalCharacter);
        }
        if (literalCharacter) {
            key = 'Lit_' + encodeURIComponent(key);
        }
        // do we have a temporary override?
        if (!host) {
            // Get the long lived host ip
            await this.getRemoteHost();
            host = this.host;
        }
        if (host) {
            let clickUrl = `http://${host}:8060/keypress/${key}`;
            console.log(`send ${clickUrl}`);
            return new Promise((resolve, reject) => {
                request.post(clickUrl, (err, response) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response);
                });
            });
        }
    }
    async getRemoteHost(showPrompt = true) {
        this.host = await this.context.workspaceState.get('remoteHost');
        if (!this.host) {
            let config = vscode.workspace.getConfiguration('brightscript.remoteControl', null);
            this.host = config.get('host');
            // eslint-disable-next-line no-template-curly-in-string
            if ((!this.host || this.host === '${promptForHost}') && showPrompt) {
                this.host = await vscode.window.showInputBox({
                    placeHolder: 'The IP address of your Roku device',
                    value: ''
                });
            }
        }
        if (!this.host) {
            throw new Error('Can\'t send command: host is required.');
        }
        else {
            await this.context.workspaceState.update('remoteHost', this.host);
        }
        if (this.host) {
            //try resolving the hostname. (sometimes it fails for no reason, so just ignore the crash if it does)
            try {
                this.host = await util_2.util.dnsLookup(this.host);
            }
            catch (e) {
                console.error('Error doing dns lookup for host ', this.host, e);
            }
        }
        return this.host;
    }
    async getRemotePassword(showPrompt = true) {
        this.password = await this.context.workspaceState.get('remotePassword');
        if (!this.password) {
            let config = vscode.workspace.getConfiguration('brightscript.remoteControl', null);
            this.password = config.get('password');
            // eslint-disable-next-line no-template-curly-in-string
            if ((!this.password || this.password === '${promptForPassword}') && showPrompt) {
                this.password = await vscode.window.showInputBox({
                    placeHolder: 'The developer account password for your Roku device',
                    value: ''
                });
            }
        }
        if (!this.password) {
            throw new Error(`Can't send command: password is required.`);
        }
        else {
            await this.context.workspaceState.update('remotePassword', this.password);
        }
        return this.password;
    }
    async getWorkspacePath() {
        var _a, _b;
        this.workspacePath = await this.context.workspaceState.get('workspacePath');
        //let folderUri: vscode.Uri;
        if (!this.workspacePath) {
            if (((_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a.length) === 1) {
                this.workspacePath = (_b = vscode.workspace.workspaceFolders) === null || _b === void 0 ? void 0 : _b[0].uri.fsPath;
            }
            else {
                //there are multiple workspaces, ask the user to specify which one they want to use
                let workspaceFolder = await vscode.window.showWorkspaceFolderPick();
                if (workspaceFolder) {
                    this.workspacePath = workspaceFolder.uri.fsPath;
                }
            }
        }
        return this.workspacePath;
    }
    /**
     * Store a password for a specific device
     * @param deviceIp The IP address of the device
     * @param password The password to store for this device
     */
    async setDevicePassword(deviceIp, password) {
        const devicePasswords = await this.getDevicePasswordsFromStorage();
        devicePasswords[deviceIp] = password;
        await this.context.workspaceState.update('devicePasswords', devicePasswords);
    }
    /**
     * Get the password for a specific device
     * @param deviceIp The IP address of the device
     * @returns The password for the device, or undefined if not set
     */
    async getDevicePassword(deviceIp) {
        const devicePasswords = await this.getDevicePasswordsFromStorage();
        return devicePasswords[deviceIp];
    }
    /**
     * Get the password for the currently active device
     * @returns The password for the active device, or falls back to global password
     */
    async getActiveHostPassword() {
        const activeHost = this.context.workspaceState.get('remoteHost');
        if (activeHost && typeof activeHost === 'string') {
            const devicePassword = await this.getDevicePassword(activeHost);
            if (devicePassword) {
                return devicePassword;
            }
        }
        // Fallback to global password
        return this.getRemotePassword(false);
    }
    /**
     * Get all device passwords from storage
     * @returns Object mapping device IPs to passwords
     */
    async getDevicePasswordsFromStorage() {
        return await this.context.workspaceState.get('devicePasswords') || {};
    }
    registerKeypressNotifier(notifier) {
        this.keypressNotifiers.push(notifier);
    }
    registerCommand(name, callback, thisArg) {
        const prefix = 'extension.brightscript.';
        const commandName = name.startsWith(prefix) ? name : prefix + name;
        this.context.subscriptions.push(vscode.commands.registerCommand(commandName, callback, thisArg));
    }
    async sendAsciiToDevice(character) {
        await this.sendRemoteCommand(character, undefined, true);
    }
}
exports.BrightScriptCommands = BrightScriptCommands;
//# sourceMappingURL=BrightScriptCommands.js.map