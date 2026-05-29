'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpreterPathCommand = void 0;
const inversify_1 = require("inversify");
const vscode_1 = require("vscode");
const constants_1 = require("../../../../common/constants");
const types_1 = require("../../../../common/types");
const commandApis_1 = require("../../../../common/vscodeApis/commandApis");
const contracts_1 = require("../../../../interpreter/contracts");
let InterpreterPathCommand = class InterpreterPathCommand {
    constructor(interpreterService, disposables) {
        this.interpreterService = interpreterService;
        this.disposables = disposables;
        this.supportedWorkspaceTypes = { untrustedWorkspace: false, virtualWorkspace: false };
    }
    async activate() {
        this.disposables.push((0, commandApis_1.registerCommand)(constants_1.Commands.GetSelectedInterpreterPath, (args) => this._getSelectedInterpreterPath(args)));
    }
    async _getSelectedInterpreterPath(args) {
        var _a, _b;
        let workspaceFolder;
        if ('workspaceFolder' in args) {
            workspaceFolder = args.workspaceFolder;
        }
        else if (args[1]) {
            const [, second] = args;
            workspaceFolder = second;
        }
        else {
            workspaceFolder = undefined;
        }
        let workspaceFolderUri;
        try {
            workspaceFolderUri = workspaceFolder ? vscode_1.Uri.file(workspaceFolder) : undefined;
        }
        catch (ex) {
            workspaceFolderUri = undefined;
        }
        return (_b = (_a = (await this.interpreterService.getActiveInterpreter(workspaceFolderUri))) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : 'python';
    }
};
InterpreterPathCommand = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(contracts_1.IInterpreterService)),
    __param(1, (0, inversify_1.inject)(types_1.IDisposableRegistry))
], InterpreterPathCommand);
exports.InterpreterPathCommand = InterpreterPathCommand;
//# sourceMappingURL=interpreterPathCommand.js.map