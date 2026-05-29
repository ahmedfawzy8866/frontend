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
var LaunchJsonCompletionProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchJsonCompletionProvider = void 0;
const inversify_1 = require("inversify");
const jsonc_parser_1 = require("jsonc-parser");
const path = require("path");
const vscode_1 = require("vscode");
const types_1 = require("../../../../common/application/types");
const types_2 = require("../../../../common/types");
const localize_1 = require("../../../../common/utils/localize");
const configurationNodeName = 'configurations';
var JsonLanguages;
(function (JsonLanguages) {
    JsonLanguages["json"] = "json";
    JsonLanguages["jsonWithComments"] = "jsonc";
})(JsonLanguages || (JsonLanguages = {}));
let LaunchJsonCompletionProvider = LaunchJsonCompletionProvider_1 = class LaunchJsonCompletionProvider {
    constructor(languageService, disposableRegistry) {
        this.languageService = languageService;
        this.disposableRegistry = disposableRegistry;
        this.supportedWorkspaceTypes = { untrustedWorkspace: false, virtualWorkspace: false };
    }
    async activate() {
        this.disposableRegistry.push(this.languageService.registerCompletionItemProvider({ language: JsonLanguages.json }, this));
        this.disposableRegistry.push(this.languageService.registerCompletionItemProvider({ language: JsonLanguages.jsonWithComments }, this));
    }
    async provideCompletionItems(document, position, token) {
        if (!LaunchJsonCompletionProvider_1.canProvideCompletions(document, position)) {
            return [];
        }
        return [
            {
                command: {
                    command: 'python.SelectAndInsertDebugConfiguration',
                    title: localize_1.DebugConfigStrings.launchJsonCompletions.description,
                    arguments: [document, position, token],
                },
                documentation: localize_1.DebugConfigStrings.launchJsonCompletions.description,
                sortText: 'AAAA',
                preselect: true,
                kind: vscode_1.CompletionItemKind.Enum,
                label: localize_1.DebugConfigStrings.launchJsonCompletions.label,
                insertText: new vscode_1.SnippetString(),
            },
        ];
    }
    static canProvideCompletions(document, position) {
        if (path.basename(document.uri.fsPath) !== 'launch.json') {
            return false;
        }
        const location = (0, jsonc_parser_1.getLocation)(document.getText(), document.offsetAt(position));
        return location.path[0] === configurationNodeName && location.path.length === 2;
    }
};
LaunchJsonCompletionProvider = LaunchJsonCompletionProvider_1 = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.ILanguageService)),
    __param(1, (0, inversify_1.inject)(types_2.IDisposableRegistry))
], LaunchJsonCompletionProvider);
exports.LaunchJsonCompletionProvider = LaunchJsonCompletionProvider;
//# sourceMappingURL=completionProvider.js.map