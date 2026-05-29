"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vscodeContextManager = void 0;
const vscode = require("vscode");
/**
 * Wrapper around VS Code's `setContext`.
 * The API call can take up to several seconds to complete,
 * so let's cache the values and only call the API when necessary.
 */
class VSCodeContextManager {
    constructor() {
        this.cache = new Map();
    }
    async set(key, value) {
        const prev = this.get(key);
        if (prev !== value) {
            //   Logger.get('vscode-context').debug(`Setting key='${key}' to value='${value}'`);
            this.cache.set(key, value);
            await vscode.commands.executeCommand('setContext', key, value);
        }
    }
    get(key, defaultValue) {
        var _a;
        return (_a = this.cache.get(key)) !== null && _a !== void 0 ? _a : defaultValue;
    }
}
exports.vscodeContextManager = new VSCodeContextManager();
//# sourceMappingURL=VscodeContextManager.js.map