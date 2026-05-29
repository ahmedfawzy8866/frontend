'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = require("sinon");
const fs = require("fs-extra");
const path = require("path");
const vscode_1 = require("vscode");
const chai_1 = require("chai");
const launchJsonReader_1 = require("../../../../../client/debugger/extension/configuration/launch.json/launchJsonReader");
const vscodeApis = require("../../../../../client/common/vscodeApis/workspaceApis");
suite('Launch Json Reader', () => {
    let pathExistsStub;
    let readFileStub;
    let getConfigurationStub;
    const workspacePath = 'path/to/workspace';
    const workspaceFolder = {
        name: 'workspace',
        uri: vscode_1.Uri.file(workspacePath),
        index: 0,
    };
    setup(() => {
        pathExistsStub = sinon.stub(fs, 'pathExists');
        readFileStub = sinon.stub(fs, 'readFile');
        getConfigurationStub = sinon.stub(vscodeApis, 'getConfiguration');
    });
    teardown(() => {
        sinon.restore();
    });
    test('Return the config in the launch.json file', async () => {
        const launchPath = path.join(workspaceFolder.uri.fsPath, '.vscode', 'launch.json');
        pathExistsStub.withArgs(launchPath).resolves(true);
        const launchJson = `{
            "version": "0.1.0",
            "configurations": [
                {
                    "name": "Python: Launch.json",
                    "type": "python",
                    "request": "launch",
                    "purpose": ["debug-test"],
                },
            ]
        }`;
        readFileStub.withArgs(launchPath, 'utf-8').returns(launchJson);
        const config = await (0, launchJsonReader_1.getConfigurationsForWorkspace)(workspaceFolder);
        chai_1.assert.deepStrictEqual(config, [
            {
                name: 'Python: Launch.json',
                type: 'python',
                request: 'launch',
                purpose: ['debug-test'],
            },
        ]);
    });
    test('If there is no launch.json return the config in the workspace file', async () => {
        getConfigurationStub.withArgs('launch').returns({
            configurations: [
                {
                    name: 'Python: Workspace File',
                    type: 'python',
                    request: 'launch',
                    purpose: ['debug-test'],
                },
            ],
        });
        const config = await (0, launchJsonReader_1.getConfigurationsForWorkspace)(workspaceFolder);
        chai_1.assert.deepStrictEqual(config, [
            {
                name: 'Python: Workspace File',
                type: 'python',
                request: 'launch',
                purpose: ['debug-test'],
            },
        ]);
    });
});
//# sourceMappingURL=launchJsonReader.unit.test.js.map