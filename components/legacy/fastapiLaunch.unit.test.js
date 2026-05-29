'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const path = require("path");
const fs = require("fs-extra");
const sinon = require("sinon");
const ts_mockito_1 = require("ts-mockito");
const vscode_1 = require("vscode");
const localize_1 = require("../../../../../client/common/utils/localize");
const multiStepInput_1 = require("../../../../../client/common/utils/multiStepInput");
const constants_1 = require("../../../../../client/debugger/constants");
const fastApiLaunch = require("../../../../../client/debugger/extension/configuration/providers/fastapiLaunch");
suite('Debugging - Configuration Provider FastAPI', () => {
    let input;
    let pathExistsStub;
    setup(() => {
        input = (0, ts_mockito_1.mock)(multiStepInput_1.MultiStepInput);
        pathExistsStub = sinon.stub(fs, 'pathExists');
    });
    teardown(() => {
        sinon.restore();
    });
    test("getApplicationPath should return undefined if file doesn't exist", async () => {
        const folder = { uri: vscode_1.Uri.parse(path.join('one', 'two')), name: '1', index: 0 };
        const appPyPath = path.join(folder.uri.fsPath, 'main.py');
        pathExistsStub.withArgs(appPyPath).resolves(false);
        const file = await fastApiLaunch.getApplicationPath(folder);
        (0, chai_1.expect)(file).to.be.equal(undefined, 'Should return undefined');
    });
    test('getApplicationPath should find path', async () => {
        const folder = { uri: vscode_1.Uri.parse(path.join('one', 'two')), name: '1', index: 0 };
        const appPyPath = path.join(folder.uri.fsPath, 'main.py');
        pathExistsStub.withArgs(appPyPath).resolves(true);
        const file = await fastApiLaunch.getApplicationPath(folder);
        (0, chai_1.expect)(file).to.be.equal('main.py');
    });
    test('Launch JSON with valid python path', async () => {
        const folder = { uri: vscode_1.Uri.parse(path.join('one', 'two')), name: '1', index: 0 };
        const state = { config: {}, folder };
        await fastApiLaunch.buildFastAPILaunchDebugConfiguration((0, ts_mockito_1.instance)(input), state);
        const config = {
            name: localize_1.DebugConfigStrings.fastapi.snippet.name,
            type: constants_1.DebuggerTypeName,
            request: 'launch',
            module: 'uvicorn',
            args: ['main:app', '--reload'],
            jinja: true,
            justMyCode: true,
        };
        (0, chai_1.expect)(state.config).to.be.deep.equal(config);
    });
    test('Launch JSON with selected app path', async () => {
        const folder = { uri: vscode_1.Uri.parse(path.join('one', 'two')), name: '1', index: 0 };
        const state = { config: {}, folder };
        (0, ts_mockito_1.when)(input.showInputBox((0, ts_mockito_1.anything)())).thenResolve('main');
        await fastApiLaunch.buildFastAPILaunchDebugConfiguration((0, ts_mockito_1.instance)(input), state);
        const config = {
            name: localize_1.DebugConfigStrings.fastapi.snippet.name,
            type: constants_1.DebuggerTypeName,
            request: 'launch',
            module: 'uvicorn',
            args: ['main:app', '--reload'],
            jinja: true,
            justMyCode: true,
        };
        (0, chai_1.expect)(state.config).to.be.deep.equal(config);
    });
});
//# sourceMappingURL=fastapiLaunch.unit.test.js.map