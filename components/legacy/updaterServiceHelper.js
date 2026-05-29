'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchJsonUpdaterServiceHelper = void 0;
const jsonc_parser_1 = require("jsonc-parser");
const vscode_1 = require("vscode");
const misc_1 = require("../../../../common/utils/misc");
const commandApis_1 = require("../../../../common/vscodeApis/commandApis");
const windowApis_1 = require("../../../../common/vscodeApis/windowApis");
const workspaceApis_1 = require("../../../../common/vscodeApis/workspaceApis");
const telemetry_1 = require("../../../../telemetry");
const constants_1 = require("../../../../telemetry/constants");
class LaunchJsonUpdaterServiceHelper {
    constructor(configurationProvider) {
        this.configurationProvider = configurationProvider;
    }
    async selectAndInsertDebugConfig(document, position, token) {
        const activeTextEditor = (0, windowApis_1.getActiveTextEditor)();
        if (activeTextEditor && activeTextEditor.document === document) {
            const folder = (0, workspaceApis_1.getWorkspaceFolder)(document.uri);
            const configs = await this.configurationProvider.provideDebugConfigurations(folder, token);
            if (!token.isCancellationRequested && Array.isArray(configs) && configs.length > 0) {
                await LaunchJsonUpdaterServiceHelper.insertDebugConfiguration(document, position, configs[0]);
            }
        }
    }
    static async insertDebugConfiguration(document, position, config) {
        const cursorPosition = LaunchJsonUpdaterServiceHelper.getCursorPositionInConfigurationsArray(document, position);
        if (!cursorPosition) {
            return;
        }
        const commaPosition = LaunchJsonUpdaterServiceHelper.isCommaImmediatelyBeforeCursor(document, position)
            ? 'BeforeCursor'
            : undefined;
        const formattedJson = LaunchJsonUpdaterServiceHelper.getTextForInsertion(config, cursorPosition, commaPosition);
        const workspaceEdit = new vscode_1.WorkspaceEdit();
        workspaceEdit.insert(document.uri, position, formattedJson);
        await (0, workspaceApis_1.applyEdit)(workspaceEdit);
        (0, commandApis_1.executeCommand)('editor.action.formatDocument').then(misc_1.noop, misc_1.noop);
    }
    static getTextForInsertion(config, cursorPosition, commaPosition) {
        const json = JSON.stringify(config);
        if (cursorPosition === 'AfterItem') {
            return commaPosition === 'BeforeCursor' ? json : `,${json}`;
        }
        if (cursorPosition === 'BeforeItem') {
            return `${json},`;
        }
        return json;
    }
    static getCursorPositionInConfigurationsArray(document, position) {
        if (LaunchJsonUpdaterServiceHelper.isConfigurationArrayEmpty(document)) {
            return 'InsideEmptyArray';
        }
        const scanner = (0, jsonc_parser_1.createScanner)(document.getText(), true);
        scanner.setPosition(document.offsetAt(position));
        const nextToken = scanner.scan();
        if (nextToken === 5 || nextToken === 4) {
            return 'AfterItem';
        }
        if (nextToken === 1) {
            return 'BeforeItem';
        }
        return undefined;
    }
    static isConfigurationArrayEmpty(document) {
        const configuration = (0, jsonc_parser_1.parse)(document.getText(), [], { allowTrailingComma: true, disallowComments: false });
        return (!configuration || !Array.isArray(configuration.configurations) || configuration.configurations.length === 0);
    }
    static isCommaImmediatelyBeforeCursor(document, position) {
        const line = document.lineAt(position.line);
        const currentLine = document.getText(new vscode_1.Range(line.range.start, position));
        if (currentLine.trim().endsWith(',')) {
            return true;
        }
        if (currentLine.trim().length !== 0) {
            return false;
        }
        let startLineNumber = position.line - 1;
        while (startLineNumber > 0) {
            const lineText = document.lineAt(startLineNumber).text;
            if (lineText.trim().endsWith(',')) {
                return true;
            }
            if (lineText.trim().length !== 0) {
                return false;
            }
            startLineNumber -= 1;
        }
        return false;
    }
}
__decorate([
    (0, telemetry_1.captureTelemetry)(constants_1.EventName.DEBUGGER_CONFIGURATION_PROMPTS_IN_LAUNCH_JSON)
], LaunchJsonUpdaterServiceHelper.prototype, "selectAndInsertDebugConfig", null);
exports.LaunchJsonUpdaterServiceHelper = LaunchJsonUpdaterServiceHelper;
//# sourceMappingURL=updaterServiceHelper.js.map