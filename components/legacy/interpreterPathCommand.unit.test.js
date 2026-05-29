'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const ts_mockito_1 = require("ts-mockito");
const TypeMoq = require("typemoq");
const vscode_1 = require("vscode");
const commandApis = require("../../../../../client/common/vscodeApis/commandApis");
const interpreterPathCommand_1 = require("../../../../../client/debugger/extension/configuration/launch.json/interpreterPathCommand");
suite('Interpreter Path Command', () => {
    let interpreterService;
    let interpreterPathCommand;
    let registerCommandStub;
    setup(() => {
        interpreterService = (0, ts_mockito_1.mock)();
        registerCommandStub = sinon.stub(commandApis, 'registerCommand');
        interpreterPathCommand = new interpreterPathCommand_1.InterpreterPathCommand((0, ts_mockito_1.instance)(interpreterService), []);
    });
    teardown(() => {
        sinon.restore();
    });
    test('Ensure command is registered with the correct callback handler', async () => {
        let getInterpreterPathHandler = (_param) => undefined;
        registerCommandStub.callsFake((_, cb) => {
            getInterpreterPathHandler = cb;
            return TypeMoq.Mock.ofType().object;
        });
        await interpreterPathCommand.activate();
        sinon.assert.calledOnce(registerCommandStub);
        const getSelectedInterpreterPath = sinon.stub(interpreterPathCommand_1.InterpreterPathCommand.prototype, '_getSelectedInterpreterPath');
        getInterpreterPathHandler([]);
        (0, chai_1.assert)(getSelectedInterpreterPath.calledOnceWith([]));
    });
    test('If `workspaceFolder` property exists in `args`, it is used to retrieve setting from config', async () => {
        const args = { workspaceFolder: 'folderPath' };
        (0, ts_mockito_1.when)(interpreterService.getActiveInterpreter((0, ts_mockito_1.anything)())).thenCall((arg) => {
            chai_1.assert.deepEqual(arg, vscode_1.Uri.file('folderPath'));
            return Promise.resolve({ path: 'settingValue' });
        });
        const setting = await interpreterPathCommand._getSelectedInterpreterPath(args);
        (0, chai_1.expect)(setting).to.equal('settingValue');
    });
    test('If `args[1]` is defined, it is used to retrieve setting from config', async () => {
        const args = ['command', 'folderPath'];
        (0, ts_mockito_1.when)(interpreterService.getActiveInterpreter((0, ts_mockito_1.anything)())).thenCall((arg) => {
            chai_1.assert.deepEqual(arg, vscode_1.Uri.file('folderPath'));
            return Promise.resolve({ path: 'settingValue' });
        });
        const setting = await interpreterPathCommand._getSelectedInterpreterPath(args);
        (0, chai_1.expect)(setting).to.equal('settingValue');
    });
    test('If neither of these exists, value of workspace folder is `undefined`', async () => {
        const args = ['command'];
        (0, ts_mockito_1.when)(interpreterService.getActiveInterpreter(undefined)).thenReturn(Promise.resolve({ path: 'settingValue' }));
        const setting = await interpreterPathCommand._getSelectedInterpreterPath(args);
        (0, chai_1.expect)(setting).to.equal('settingValue');
    });
});
//# sourceMappingURL=interpreterPathCommand.unit.test.js.map