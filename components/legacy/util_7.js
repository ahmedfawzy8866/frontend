"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = void 0;
const fs = require("fs");
const fsExtra = require("fs-extra");
const net = require("net");
const url = require("url");
const debounce_1 = require("debounce");
const vscode = require("vscode");
const Cache_1 = require("brighterscript/dist/Cache");
const undent_1 = require("undent");
const constants_1 = require("./constants");
const request = require("postman-request");
const childProcess = require("child_process");
class Util {
    constructor() {
        this.debounceByKey = {};
        this.concealCache = new Cache_1.Cache();
    }
    async readDir(dirPath) {
        return new Promise((resolve, reject) => {
            fs.readdir(dirPath, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    /**
     * If the path does not have a trailing slash, one is appended to it
     * @param dirPath
     */
    ensureTrailingSlash(dirPath) {
        return dirPath.substr(dirPath.length - 1) !== '/' ? dirPath + '/' : dirPath;
    }
    async stat(filePath) {
        return new Promise((resolve, reject) => {
            fs.stat(filePath, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    /**
     * Determine if a file exists
     * @param filePath
     */
    fileExists(filePath) {
        return new Promise((resolve) => {
            fsExtra.exists(filePath, resolve);
        });
    }
    /**
     * Removes any leading scheme in the file path
     * @param filePath
     */
    removeFileScheme(filePath) {
        let scheme = this.getFileScheme(filePath);
        if (scheme) {
            return filePath.substring(scheme.length);
        }
        else {
            return filePath;
        }
    }
    /**
     * Normalizes the file path to only have one forward slash
     * @param filePath
     */
    normalizeFileScheme(filePath) {
        return filePath.replace(/^file:[\/\\]*/, 'file:/');
    }
    /**
     * Gets any leading scheme in the file path
     * @param filePath
     */
    getFileScheme(filePath) {
        return url.parse(filePath).protocol;
    }
    /**
     * Creates a delay in execution
     * @param ms time to delay in milliseconds
     */
    delay(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    /**
     * Remove a single trailing newline from a string (\n or \r\n)
     */
    removeTrailingNewline(value) {
        return value.replace(/(.*?)\r?\n$/, '$1');
    }
    /**
     * Reads the the manifest file and converts to a javascript object skipping empty lines and comments
     * @param path location of the manifest file
     */
    async convertManifestToObject(path) {
        if (await this.fileExists(path) === false) {
            return undefined;
        }
        else {
            let fileContents = (await fsExtra.readFile(path)).toString();
            let manifestLines = fileContents.split('\n');
            let manifestValues = {};
            for (const line of manifestLines) {
                let match;
                // eslint-disable-next-line no-cond-assign
                if (match = /(\w+)=(.+)/.exec(line)) {
                    manifestValues[match[1]] = match[2];
                }
            }
            return manifestValues;
        }
    }
    /**
     * Checks to see if the port is already in use
     * @param port target port to check
     */
    async isPortInUse(port) {
        return new Promise((resolve, reject) => {
            const tester = net.createServer()
                .once('error', (err) => (err.code === 'EADDRINUSE' ? resolve(true) : reject(err)))
                .once('listening', () => tester.once('close', () => resolve(false)).close())
                .listen(port);
        });
    }
    /**
     * With return the differences in two objects
     * @param obj1 base target
     * @param obj2 comparison target
     * @param exclude fields to exclude in the comparison
     */
    objectDiff(obj1, obj2, exclude) {
        let r = {};
        if (!exclude) {
            exclude = [];
        }
        for (let prop in obj1) {
            if (obj1.hasOwnProperty(prop) && prop !== '__proto__') {
                if (!exclude.includes(obj1[prop])) {
                    // check if obj2 has prop
                    if (!obj2.hasOwnProperty(prop)) {
                        r[prop] = obj1[prop];
                    }
                    else if (obj1[prop] === Object(obj1[prop])) {
                        let difference = this.objectDiff(obj1[prop], obj2[prop]);
                        if (Object.keys(difference).length > 0) {
                            r[prop] = difference;
                        }
                    }
                    else if (obj1[prop] !== obj2[prop]) {
                        if (obj1[prop] === undefined) {
                            r[prop] = 'undefined';
                        }
                        if (obj1[prop] === null) {
                            r[prop] = null;
                        }
                        else if (typeof obj1[prop] === 'function') {
                            r[prop] = 'function';
                        }
                        else if (typeof obj1[prop] === 'object') {
                            r[prop] = 'object';
                        }
                        else {
                            r[prop] = obj1[prop];
                        }
                    }
                }
            }
        }
        return r;
    }
    /**
     * Get a debounce function that runs a separate debounce for every unique key provided
     */
    keyedDebounce(key, fn, waitMilliseconds) {
        if (!this.debounceByKey[key]) {
            this.debounceByKey[key] = (0, debounce_1.debounce)(fn, waitMilliseconds);
        }
        this.debounceByKey[key]();
    }
    /**
     * Wraps a function and calls a callback before calling the original function
     */
    wrap(subject, name, callback) {
        const fn = subject[name];
        subject[name] = (...args) => {
            callback(...args);
            fn.call(subject, ...args);
        };
    }
    /**
     * Creates an output channel but wraps the `append` and `appendLine`
     * functions so a function can be called with their values
     */
    createOutputChannel(name, interceptor) {
        const channel = vscode.window.createOutputChannel(name);
        this.wrap(channel, 'append', interceptor);
        this.wrap(channel, 'appendLine', (line) => {
            if (line) {
                interceptor(line + '\n');
            }
        });
        return channel;
    }
    /**
     * Shows ether a QuickPick or InputBox to the user and allows them to enter
     * items not in the QuickPick list of items
     */
    async showQuickPickInputBox(configuration = {}) {
        var _a, _b;
        if ((_a = configuration === null || configuration === void 0 ? void 0 : configuration.items) === null || _a === void 0 ? void 0 : _a.length) {
            // We have items so use QuickPick
            const quickPick = vscode.window.createQuickPick();
            Object.assign(quickPick, { ...configuration });
            const deffer = new Promise(resolve => {
                quickPick.onDidChangeValue(() => {
                    // Clear the active item as the user started typing and we want
                    // to handle this as a new option not in the supplied list.
                    // VsCode does not have a strict match items to typed value option
                    // so this is a workaround to that limitation.
                    quickPick.activeItems = [];
                });
                quickPick.onDidAccept(() => {
                    var _a, _b, _c;
                    quickPick.hide();
                    // Since we clear the active item when the user types (onDidChangeValue)
                    // there will only be an active item if the user clicked on an item with
                    // the mouse or used the arrows keys and then hit enter with one selected.
                    resolve((_c = (_b = (_a = quickPick.activeItems) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.label) !== null && _c !== void 0 ? _c : quickPick.value);
                });
                quickPick.onDidHide(() => {
                    // Make sure to dispose this view
                    quickPick.dispose();
                    resolve(null);
                });
            });
            quickPick.show();
            return deffer;
        }
        else {
            // There are no items to suggest to the user. Just use a normal InputBox
            return vscode.window.showInputBox({
                placeHolder: (_b = configuration.placeholder) !== null && _b !== void 0 ? _b : '',
                value: ''
            });
        }
    }
    /**
     * Get a promise that resolves after the given number of milliseconds.
     */
    sleep(milliseconds) {
        let handle;
        const promise = new Promise((resolve) => {
            handle = setTimeout(resolve, milliseconds);
        });
        promise.cancel = () => {
            clearTimeout(handle);
        };
        return promise;
    }
    /**
     * Convert an arbitrary range-like object into a proper vscode.Range instance
     */
    toRange(range) {
        return new vscode.Range(new vscode.Position(range.start.line, range.start.character), new vscode.Position(range.end.line, range.end.character));
    }
    /**
     * Is the value null or undefined
     */
    isNullish(value) {
        return value === undefined || value === null;
    }
    /**
      * Conceals (scrambles/obfuscates) any of the specified keys across all string properties in the object
      */
    concealObject(object, secretKeys) {
        var _a;
        const result = new Map();
        const secretValues = Object.entries(object)
            //only keep the non-blank string keys
            .filter(([key, value]) => secretKeys.includes(key) && typeof value === 'string' && (value === null || value === void 0 ? void 0 : value.toString()) !== '')
            .map(([, value]) => value);
        //build the initial result
        for (const [key, value] of Object.entries(object)) {
            result.set(key, {
                value: value,
                originalValue: value
            });
        }
        //do value transforms
        for (let [, entry] of result) {
            let { value } = entry;
            for (const secretValue of secretValues) {
                if (typeof value === 'string') {
                    const regexp = new RegExp(
                    //escape the regex, or use an unmatchable regex if unable to escape it
                    (_a = util.escapeRegex(secretValue)) !== null && _a !== void 0 ? _a : /(?!)/, 'g');
                    entry.value = entry.value.replace(regexp, this.concealString(secretValue));
                }
            }
        }
        return result;
    }
    /**
     * Given a string, replace the alphanumeric characters with random values.
     * This is useful for things like scrambling a uuid
     */
    concealString(text) {
        return this.concealCache.getOrAdd(text, () => {
            if (this.isNullish(text)) {
                return text;
            }
            else {
                return text.replace(/[a-z0-9]/ig, (match) => {
                    // is a number
                    if (parseInt(match)) {
                        return this.getRandomChar('0123456789');
                        //is an uppercase letter
                    }
                    else if (match.toUpperCase() === match) {
                        return this.getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
                        //is a lower case number
                    }
                    else {
                        return this.getRandomChar('abcdefghijklmnopqrstuvwxyz');
                    }
                });
            }
        });
    }
    getRandomChar(dictionary) {
        return dictionary.charAt(Math.floor(Math.random() * dictionary.length));
    }
    /**
     * Escapes a string so that it can be used as a regex pattern
     */
    escapeRegex(text) {
        return text === null || text === void 0 ? void 0 : text.toString().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    /**
     * Do an http GET request
     */
    httpGet(url, options) {
        return new Promise((resolve, reject) => {
            request.get(url, options, (err, response) => {
                return err ? reject(err) : resolve(response);
            });
        });
    }
    async openIssueReporter(options) {
        var _a;
        if (!options.body) {
            options.body = (0, undent_1.default) `
                Please describe the issue you are experiencing:

                Steps to reproduce:

                Additional feedback:
            `;
        }
        options.body += `\n\nroku-debug version: ${constants_1.ROKU_DEBUG_VERSION}`;
        if (options.deviceInfo) {
            options.body += '\n' + (0, undent_1.default) `
                Device firmware: ${options.deviceInfo.softwareVersion}.${options.deviceInfo.softwareBuild}
                Debug protocol version: ${options.deviceInfo.brightscriptDebuggerVersion}
                Device model: ${options.deviceInfo.modelNumber}
            `;
        }
        await vscode.commands.executeCommand('vscode.openIssueReporter', {
            extensionId: constants_1.EXTENSION_ID,
            issueTitle: (_a = options.title) !== null && _a !== void 0 ? _a : 'Problem with Debug Protocol',
            issueBody: options.body
        });
    }
    createStatusbarSpinner(message) {
        const statusbarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 9999999);
        statusbarItem.text = `$(sync~spin) ${message}`;
        statusbarItem.show();
        return statusbarItem;
    }
    /**
     * Show a notification with a progress bar that auto-dismisses after the specified duration.
     * @param message the message to display in the notification
     * @param durationMs how long (in milliseconds) to show the notification before it dismisses
     */
    async showTimedNotification(message, durationMs = 2000) {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: message
        }, async (progress) => {
            const intervalMs = 100;
            const steps = durationMs / intervalMs;
            const increment = 100 / steps;
            for (let i = 0; i < steps; i++) {
                await new Promise(resolve => {
                    setTimeout(resolve, intervalMs);
                });
                progress.report({ increment: increment });
            }
        });
    }
    /**
     * Show a statusbar spinner that is hidden once the callback resolves
     * @param message the message that should be shown in the statusbar spinner
     * @param callback the function to run, that when completed will hide the spinner
     * @returns
     */
    async spinAsync(message, callback) {
        const spinner = this.createStatusbarSpinner(message);
        try {
            const result = await callback();
            return result;
        }
        finally {
            spinner.dispose();
        }
    }
    /**
     * Execute a command and get a promise for when it finishes.
     * @param command the command to execute
     * @param options the options to pass to exec
     * @returns the stdout if successful, or an error if failed
     */
    async exec(command, options) {
        return new Promise((resolve, reject) => {
            childProcess.exec(command, options, (error, stdout) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    }
    /**
     * Determine if the current OS is running a version of windows
     */
    isWindowsPlatform() {
        return process.platform.startsWith('win');
    }
    /**
     * Spawn an npm command and return a promise.
     * This is necessary because spawn requires the file extension (.cmd) on windows.
     * @param args - the list of args to pass to npm. Any undefined args will be removed from the list, so feel free to use ternary outside to simplify things
     */
    spawnNpmAsync(args, options) {
        //filter out undefined args
        args = args.filter(arg => arg !== undefined);
        if (this.isWindowsPlatform()) {
            return this.spawnAsync('npm.cmd', args, {
                ...options,
                shell: true,
                detached: false,
                windowsHide: true
            });
        }
        else {
            return this.spawnAsync('npm', args, options);
        }
    }
    /**
     * Executes an exec command and returns a promise that completes when it's finished
     */
    spawnAsync(command, args, options) {
        return new Promise((resolve, reject) => {
            const child = childProcess.spawn(command, args !== null && args !== void 0 ? args : [], {
                ...(options !== null && options !== void 0 ? options : {}),
                stdio: 'inherit'
            });
            child.addListener('error', reject);
            child.addListener('exit', resolve);
        });
    }
    /**
     * Run an action with option for a progress spinner. If `showProgress` is `false` then no progress is shown and instead the action is run directly
     */
    async runWithProgress(options, action) {
        //show a progress spinner if configured to do so
        if ((options === null || options === void 0 ? void 0 : options.showProgress) !== false) {
            return vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                cancellable: false,
                ...options
            }, action);
        }
        else {
            return action();
        }
    }
    /**
     * Is the value a non-empty string?
     */
    isNonEmptyString(value) {
        return typeof value === 'string' && value.trim() !== '';
    }
    getConfigurationValueIfDefined(key, defaultValue = undefined) {
        var _a;
        const [, configurationKey, settingKey] = (_a = /(.+?)\.([^\.]+)$/.exec(key)) !== null && _a !== void 0 ? _a : [];
        let settings = vscode.workspace.getConfiguration(configurationKey);
        const inspection = settings.inspect(settingKey);
        if (inspection.defaultLanguageValue !== undefined ||
            inspection.globalLanguageValue !== undefined ||
            inspection.globalValue !== undefined ||
            inspection.workspaceFolderLanguageValue !== undefined ||
            inspection.workspaceFolderValue !== undefined ||
            inspection.workspaceLanguageValue !== undefined ||
            inspection.workspaceValue !== undefined) {
            return settings.get(settingKey, defaultValue);
        }
        return defaultValue;
    }
}
const util = new Util();
exports.util = util;
//# sourceMappingURL=util.js.map