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
exports.Extensions = void 0;
const inversify_1 = require("inversify");
const vscode_1 = require("vscode");
const stacktrace = require("stack-trace");
const path = require("path");
const types_1 = require("../platform/types");
const constants_1 = require("../constants");
let Extensions = class Extensions {
    constructor(fs) {
        this.fs = fs;
    }
    get all() {
        return vscode_1.extensions.all;
    }
    get onDidChange() {
        return vscode_1.extensions.onDidChange;
    }
    getExtension(extensionId) {
        return vscode_1.extensions.getExtension(extensionId);
    }
    get cachedExtensions() {
        if (!this._cachedExtensions) {
            this._cachedExtensions = vscode_1.extensions.all;
            vscode_1.extensions.onDidChange(() => {
                this._cachedExtensions = vscode_1.extensions.all;
            });
        }
        return this._cachedExtensions;
    }
    async determineExtensionFromCallStack() {
        const { stack } = new Error();
        if (stack) {
            const pythonExtRoot = path.join(constants_1.EXTENSION_ROOT_DIR.toLowerCase(), path.sep);
            const frames = stack
                .split('\n')
                .map((f) => {
                const result = /\((.*)\)/.exec(f);
                if (result) {
                    return result[1];
                }
                return undefined;
            })
                .filter((item) => item && !item.toLowerCase().startsWith(pythonExtRoot))
                .filter((item) => this.cachedExtensions.some((ext) => item.includes(ext.extensionUri.path) || item.includes(ext.extensionUri.fsPath)));
            stacktrace.parse(new Error('Ex')).forEach((item) => {
                const fileName = item.getFileName();
                if (fileName && !fileName.toLowerCase().startsWith(pythonExtRoot)) {
                    frames.push(fileName);
                }
            });
            for (const frame of frames) {
                let dirName = path.dirname(frame);
                let last = frame;
                while (dirName && dirName.length < last.length) {
                    const possiblePackageJson = path.join(dirName, 'package.json');
                    if (await this.fs.pathExists(possiblePackageJson)) {
                        const text = await this.fs.readFile(possiblePackageJson);
                        try {
                            const json = JSON.parse(text);
                            return { extensionId: `${json.publisher}.${json.name}`, displayName: json.displayName };
                        }
                        catch (_a) {
                        }
                    }
                    last = dirName;
                    dirName = path.dirname(dirName);
                }
            }
        }
        return { extensionId: 'unknown', displayName: 'unknown' };
    }
};
Extensions = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.IFileSystem))
], Extensions);
exports.Extensions = Extensions;
//# sourceMappingURL=extensions.js.map