"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigurationsByUri = exports.getConfigurationsForWorkspace = void 0;
const path = require("path");
const fs = require("fs-extra");
const jsonc_parser_1 = require("jsonc-parser");
const workspaceApis_1 = require("../../../../common/vscodeApis/workspaceApis");
const logging_1 = require("../../../../logging");
async function getConfigurationsForWorkspace(workspace) {
    const filename = path.join(workspace.uri.fsPath, '.vscode', 'launch.json');
    if (!(await fs.pathExists(filename))) {
        const codeWorkspaceConfig = (0, workspaceApis_1.getConfiguration)('launch');
        if (!codeWorkspaceConfig.configurations || !Array.isArray(codeWorkspaceConfig.configurations)) {
            return [];
        }
        (0, logging_1.traceLog)(`Using launch configuration in workspace folder.`);
        return codeWorkspaceConfig.configurations;
    }
    const text = await fs.readFile(filename, 'utf-8');
    const parsed = (0, jsonc_parser_1.parse)(text, [], { allowTrailingComma: true, disallowComments: false });
    if (!parsed.configurations || !Array.isArray(parsed.configurations)) {
        throw Error('Missing field in launch.json: configurations');
    }
    if (!parsed.version) {
        throw Error('Missing field in launch.json: version');
    }
    (0, logging_1.traceLog)(`Using launch configuration in launch.json file.`);
    return parsed.configurations;
}
exports.getConfigurationsForWorkspace = getConfigurationsForWorkspace;
async function getConfigurationsByUri(uri) {
    if (uri) {
        const workspace = (0, workspaceApis_1.getWorkspaceFolder)(uri);
        if (workspace) {
            return getConfigurationsForWorkspace(workspace);
        }
    }
    return [];
}
exports.getConfigurationsByUri = getConfigurationsByUri;
//# sourceMappingURL=launchJsonReader.js.map