"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearNpmPackageCacheCommand = exports.ClearNpmPackageCacheCommand = void 0;
const vscode = require("vscode");
const VscodeCommand_1 = require("./VscodeCommand");
class ClearNpmPackageCacheCommand {
    register(context, localPackageManager) {
        context.subscriptions.push(vscode.commands.registerCommand(VscodeCommand_1.VscodeCommand.clearNpmPackageCache, async () => {
            await localPackageManager.removeAll();
        }));
    }
}
exports.ClearNpmPackageCacheCommand = ClearNpmPackageCacheCommand;
exports.clearNpmPackageCacheCommand = new ClearNpmPackageCacheCommand();
//# sourceMappingURL=ClearNpmPackageCacheCommand.js.map