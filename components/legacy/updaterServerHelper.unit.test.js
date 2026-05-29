'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const sinon = require("sinon");
const ts_mockito_1 = require("ts-mockito");
const typemoq = require("typemoq");
const vscode_1 = require("vscode");
const debugConfigurationService_1 = require("../../../../../client/debugger/extension/configuration/debugConfigurationService");
const updaterServiceHelper_1 = require("../../../../../client/debugger/extension/configuration/launch.json/updaterServiceHelper");
const windowApis = require("../../../../../client/common/vscodeApis/windowApis");
const workspaceApis = require("../../../../../client/common/vscodeApis/workspaceApis");
const commandApis = require("../../../../../client/common/vscodeApis/commandApis");
suite('Debugging - launch.json Updater Service', () => {
    let helper;
    let getWorkspaceFolderStub;
    let getActiveTextEditorStub;
    let applyEditStub;
    let executeCommandStub;
    let debugConfigService;
    const sandbox = sinon.createSandbox();
    setup(() => {
        getWorkspaceFolderStub = sinon.stub(workspaceApis, 'getWorkspaceFolder');
        getActiveTextEditorStub = sinon.stub(windowApis, 'getActiveTextEditor');
        applyEditStub = sinon.stub(workspaceApis, 'applyEdit');
        executeCommandStub = sinon.stub(commandApis, 'executeCommand');
        debugConfigService = (0, ts_mockito_1.mock)(debugConfigurationService_1.PythonDebugConfigurationService);
        sandbox.stub(updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper, 'isCommaImmediatelyBeforeCursor').returns(false);
        helper = new updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper((0, ts_mockito_1.instance)(debugConfigService));
    });
    teardown(() => {
        sandbox.restore();
        sinon.restore();
    });
    test('Configuration Array is detected as being empty', async () => {
        const document = typemoq.Mock.ofType();
        const config = {
            version: '',
            configurations: [],
        };
        document.setup((doc) => doc.getText(typemoq.It.isAny())).returns(() => JSON.stringify(config));
        const isEmpty = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.isConfigurationArrayEmpty(document.object);
        assert.strictEqual(isEmpty, true);
    });
    test('Configuration Array is not empty', async () => {
        const document = typemoq.Mock.ofType();
        const config = {
            version: '',
            configurations: [
                {
                    name: '',
                    request: 'launch',
                    type: 'python',
                },
            ],
        };
        document.setup((doc) => doc.getText(typemoq.It.isAny())).returns(() => JSON.stringify(config));
        const isEmpty = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.isConfigurationArrayEmpty(document.object);
        assert.strictEqual(isEmpty, false);
    });
    test('Cursor is not positioned in the configurations array', async () => {
        const document = typemoq.Mock.ofType();
        const config = {
            version: '',
            configurations: [
                {
                    name: '',
                    request: 'launch',
                    type: 'python',
                },
            ],
        };
        document.setup((doc) => doc.getText(typemoq.It.isAny())).returns(() => JSON.stringify(config));
        document.setup((doc) => doc.offsetAt(typemoq.It.isAny())).returns(() => 10);
        const cursorPosition = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.getCursorPositionInConfigurationsArray(document.object, new vscode_1.Position(0, 0));
        assert.strictEqual(cursorPosition, undefined);
    });
    test('Cursor is positioned in the empty configurations array', async () => {
        const document = typemoq.Mock.ofType();
        const json = `{
        "version": "0.1.0",
        "configurations": [
            # Cursor Position
        ]
    }`;
        document.setup((doc) => doc.getText(typemoq.It.isAny())).returns(() => json);
        document.setup((doc) => doc.offsetAt(typemoq.It.isAny())).returns(() => json.indexOf('#'));
        const cursorPosition = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.getCursorPositionInConfigurationsArray(document.object, new vscode_1.Position(0, 0));
        assert.strictEqual(cursorPosition, 'InsideEmptyArray');
    });
    test('Cursor is positioned before an item in the configurations array', async () => {
        const document = typemoq.Mock.ofType();
        const json = `{
    "version": "0.1.0",
    "configurations": [
        {
            "name":"wow"
        }
    ]
}`;
        document.setup((doc) => doc.getText(typemoq.It.isAny())).returns(() => json);
        document.setup((doc) => doc.offsetAt(typemoq.It.isAny())).returns(() => json.lastIndexOf('{') - 1);
        const cursorPosition = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.getCursorPositionInConfigurationsArray(document.object, new vscode_1.Position(0, 0));
        assert.strictEqual(cursorPosition, 'BeforeItem');
    });
    test('Cursor is positioned before an item in the middle of the configurations array', async () => {
        const document = typemoq.Mock.ofType();
        const json = `{
    "version": "0.1.0",
    "configurations": [
        {
            "name":"wow"
        },{
            "name":"wow"
        }
    ]
}`;
        document.setup((doc) => doc.getText(typemoq.It.isAny())).returns(() => json);
        document.setup((doc) => doc.offsetAt(typemoq.It.isAny())).returns(() => json.indexOf(',{') + 1);
        const cursorPosition = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.getCursorPositionInConfigurationsArray(document.object, new vscode_1.Position(0, 0));
        assert.strictEqual(cursorPosition, 'BeforeItem');
    });
    test('Cursor is positioned after an item in the configurations array', async () => {
        const document = typemoq.Mock.ofType();
        const json = `{
    "version": "0.1.0",
    "configurations": [
        {
            "name":"wow"
        }]
}`;
        document.setup((doc) => doc.getText(typemoq.It.isAny())).returns(() => json);
        document.setup((doc) => doc.offsetAt(typemoq.It.isAny())).returns(() => json.lastIndexOf('}]') + 1);
        const cursorPosition = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.getCursorPositionInConfigurationsArray(document.object, new vscode_1.Position(0, 0));
        assert.strictEqual(cursorPosition, 'AfterItem');
    });
    test('Cursor is positioned after an item in the middle of the configurations array', async () => {
        const document = typemoq.Mock.ofType();
        const json = `{
    "version": "0.1.0",
    "configurations": [
        {
            "name":"wow"
        },{
            "name":"wow"
        }
    ]
}`;
        document.setup((doc) => doc.getText(typemoq.It.isAny())).returns(() => json);
        document.setup((doc) => doc.offsetAt(typemoq.It.isAny())).returns(() => json.indexOf('},') + 1);
        const cursorPosition = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.getCursorPositionInConfigurationsArray(document.object, new vscode_1.Position(0, 0));
        assert.strictEqual(cursorPosition, 'AfterItem');
    });
    test('Text to be inserted must be prefixed with a comma', async () => {
        const config = {};
        const expectedText = `,${JSON.stringify(config)}`;
        const textToInsert = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.getTextForInsertion(config, 'AfterItem');
        assert.strictEqual(textToInsert, expectedText);
    });
    test('Text to be inserted must not be prefixed with a comma (as a comma already exists)', async () => {
        const config = {};
        const expectedText = JSON.stringify(config);
        const textToInsert = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.getTextForInsertion(config, 'AfterItem', 'BeforeCursor');
        assert.strictEqual(textToInsert, expectedText);
    });
    test('Text to be inserted must be suffixed with a comma', async () => {
        const config = {};
        const expectedText = `${JSON.stringify(config)},`;
        const textToInsert = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.getTextForInsertion(config, 'BeforeItem');
        assert.strictEqual(textToInsert, expectedText);
    });
    test('Text to be inserted must not be prefixed nor suffixed with commas', async () => {
        const config = {};
        const expectedText = JSON.stringify(config);
        const textToInsert = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.getTextForInsertion(config, 'InsideEmptyArray');
        assert.strictEqual(textToInsert, expectedText);
    });
    test('When inserting the debug config into the json file format the document', async () => {
        const json = `{
            "version": "0.1.0",
            "configurations": [
                {
            "name":"wow"
        },{
            "name":"wow"
        }
    ]
}`;
        const config = {};
        const document = typemoq.Mock.ofType();
        document.setup((doc) => doc.getText(typemoq.It.isAny())).returns(() => json);
        document.setup((doc) => doc.offsetAt(typemoq.It.isAny())).returns(() => json.indexOf('},') + 1);
        applyEditStub.returns(undefined);
        executeCommandStub.withArgs('editor.action.formatDocument').resolves();
        await updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.insertDebugConfiguration(document.object, new vscode_1.Position(0, 0), config);
        sinon.assert.calledOnce(applyEditStub);
        sinon.assert.calledOnce(executeCommandStub.withArgs('editor.action.formatDocument'));
    });
    test('No changes to configuration if there is not active document', async () => {
        const document = typemoq.Mock.ofType();
        const position = new vscode_1.Position(0, 0);
        const { token } = new vscode_1.CancellationTokenSource();
        getActiveTextEditorStub.returns(undefined);
        let debugConfigInserted = false;
        updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.insertDebugConfiguration = async () => {
            debugConfigInserted = true;
        };
        await helper.selectAndInsertDebugConfig(document.object, position, token);
        sinon.assert.calledOnce(getActiveTextEditorStub);
        sinon.assert.notCalled(getWorkspaceFolderStub);
        assert.strictEqual(debugConfigInserted, false);
    });
    test('No changes to configuration if the active document is not same as the document passed in', async () => {
        const document = typemoq.Mock.ofType();
        const position = new vscode_1.Position(0, 0);
        const { token } = new vscode_1.CancellationTokenSource();
        const textEditor = typemoq.Mock.ofType();
        textEditor
            .setup((t) => t.document)
            .returns(() => 'x')
            .verifiable(typemoq.Times.atLeastOnce());
        getActiveTextEditorStub.returns(textEditor.object);
        let debugConfigInserted = false;
        updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.insertDebugConfiguration = async () => {
            debugConfigInserted = true;
        };
        await helper.selectAndInsertDebugConfig(document.object, position, token);
        sinon.assert.calledOnce(getActiveTextEditorStub);
        sinon.assert.notCalled(getWorkspaceFolderStub);
        textEditor.verifyAll();
        assert.strictEqual(debugConfigInserted, false);
    });
    test('No changes to configuration if cancellation token has been cancelled', async () => {
        const document = typemoq.Mock.ofType();
        const position = new vscode_1.Position(0, 0);
        const tokenSource = new vscode_1.CancellationTokenSource();
        tokenSource.cancel();
        const { token } = tokenSource;
        const textEditor = typemoq.Mock.ofType();
        const docUri = vscode_1.Uri.file(__filename);
        const folderUri = vscode_1.Uri.file('Folder Uri');
        const folder = { name: '', index: 0, uri: folderUri };
        document
            .setup((doc) => doc.uri)
            .returns(() => docUri)
            .verifiable(typemoq.Times.atLeastOnce());
        textEditor
            .setup((t) => t.document)
            .returns(() => document.object)
            .verifiable(typemoq.Times.atLeastOnce());
        getActiveTextEditorStub.returns(textEditor.object);
        getWorkspaceFolderStub.returns(folder);
        (0, ts_mockito_1.when)(debugConfigService.provideDebugConfigurations(folder, token)).thenResolve(['']);
        let debugConfigInserted = false;
        updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.insertDebugConfiguration = async () => {
            debugConfigInserted = true;
        };
        await helper.selectAndInsertDebugConfig(document.object, position, token);
        sinon.assert.calledOnce(getActiveTextEditorStub);
        sinon.assert.calledOnce(getWorkspaceFolderStub);
        textEditor.verifyAll();
        document.verifyAll();
        assert.strictEqual(debugConfigInserted, false);
    });
    test('No changes to configuration if no configuration items are returned', async () => {
        const document = typemoq.Mock.ofType();
        const position = new vscode_1.Position(0, 0);
        const tokenSource = new vscode_1.CancellationTokenSource();
        const { token } = tokenSource;
        const textEditor = typemoq.Mock.ofType();
        const docUri = vscode_1.Uri.file(__filename);
        const folderUri = vscode_1.Uri.file('Folder Uri');
        const folder = { name: '', index: 0, uri: folderUri };
        document
            .setup((doc) => doc.uri)
            .returns(() => docUri)
            .verifiable(typemoq.Times.atLeastOnce());
        textEditor
            .setup((t) => t.document)
            .returns(() => document.object)
            .verifiable(typemoq.Times.atLeastOnce());
        getActiveTextEditorStub.returns(textEditor.object);
        getWorkspaceFolderStub.returns(folder);
        (0, ts_mockito_1.when)(debugConfigService.provideDebugConfigurations(folder, token)).thenResolve([]);
        let debugConfigInserted = false;
        updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.insertDebugConfiguration = async () => {
            debugConfigInserted = true;
        };
        await helper.selectAndInsertDebugConfig(document.object, position, token);
        sinon.assert.calledOnce(getActiveTextEditorStub);
        sinon.assert.calledOnce(getWorkspaceFolderStub.withArgs(docUri));
        textEditor.verifyAll();
        document.verifyAll();
        assert.strictEqual(debugConfigInserted, false);
    });
    test('Changes are made to the configuration', async () => {
        const document = typemoq.Mock.ofType();
        const position = new vscode_1.Position(0, 0);
        const tokenSource = new vscode_1.CancellationTokenSource();
        const { token } = tokenSource;
        const textEditor = typemoq.Mock.ofType();
        const docUri = vscode_1.Uri.file(__filename);
        const folderUri = vscode_1.Uri.file('Folder Uri');
        const folder = { name: '', index: 0, uri: folderUri };
        document
            .setup((doc) => doc.uri)
            .returns(() => docUri)
            .verifiable(typemoq.Times.atLeastOnce());
        textEditor
            .setup((t) => t.document)
            .returns(() => document.object)
            .verifiable(typemoq.Times.atLeastOnce());
        getActiveTextEditorStub.returns(textEditor.object);
        getWorkspaceFolderStub.withArgs(docUri).returns(folder);
        (0, ts_mockito_1.when)(debugConfigService.provideDebugConfigurations(folder, token)).thenResolve([
            'config',
        ]);
        let debugConfigInserted = false;
        updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.insertDebugConfiguration = async () => {
            debugConfigInserted = true;
        };
        await helper.selectAndInsertDebugConfig(document.object, position, token);
        sinon.assert.called(getActiveTextEditorStub);
        sinon.assert.calledOnce(getWorkspaceFolderStub.withArgs(docUri));
        textEditor.verifyAll();
        document.verifyAll();
        assert.strictEqual(debugConfigInserted, true);
    });
    test('If cursor is at the begining of line 1 then there is no comma before cursor', async () => {
        sandbox.restore();
        const document = typemoq.Mock.ofType();
        const position = new vscode_1.Position(1, 0);
        document
            .setup((doc) => doc.lineAt(1))
            .returns(() => ({ range: new vscode_1.Range(1, 0, 1, 1) }))
            .verifiable(typemoq.Times.atLeastOnce());
        document
            .setup((doc) => doc.getText(typemoq.It.isAny()))
            .returns(() => '')
            .verifiable(typemoq.Times.atLeastOnce());
        const isBeforeCursor = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.isCommaImmediatelyBeforeCursor(document.object, position);
        assert.ok(!isBeforeCursor);
        document.verifyAll();
    });
    test('If cursor is positioned after some text (not a comma) then detect this', async () => {
        sandbox.restore();
        const document = typemoq.Mock.ofType();
        const position = new vscode_1.Position(2, 2);
        document
            .setup((doc) => doc.lineAt(2))
            .returns(() => ({ range: new vscode_1.Range(2, 0, 1, 5) }))
            .verifiable(typemoq.Times.atLeastOnce());
        document
            .setup((doc) => doc.getText(typemoq.It.isAny()))
            .returns(() => 'Hello')
            .verifiable(typemoq.Times.atLeastOnce());
        const isBeforeCursor = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.isCommaImmediatelyBeforeCursor(document.object, position);
        assert.ok(!isBeforeCursor);
        document.verifyAll();
    });
    test('If cursor is positioned after a comma then detect this', async () => {
        sandbox.restore();
        const document = typemoq.Mock.ofType();
        const position = new vscode_1.Position(2, 2);
        document
            .setup((doc) => doc.lineAt(2))
            .returns(() => ({ range: new vscode_1.Range(2, 0, 2, 3) }))
            .verifiable(typemoq.Times.atLeastOnce());
        document
            .setup((doc) => doc.getText(typemoq.It.isAny()))
            .returns(() => '}, ')
            .verifiable(typemoq.Times.atLeastOnce());
        const isBeforeCursor = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.isCommaImmediatelyBeforeCursor(document.object, position);
        assert.ok(isBeforeCursor);
        document.verifyAll();
    });
    test('If cursor is positioned in an empty line and previous line ends with comma, then detect this', async () => {
        sandbox.restore();
        const document = typemoq.Mock.ofType();
        const position = new vscode_1.Position(2, 2);
        document
            .setup((doc) => doc.lineAt(1))
            .returns(() => ({ range: new vscode_1.Range(1, 0, 1, 3), text: '}, ' }))
            .verifiable(typemoq.Times.atLeastOnce());
        document
            .setup((doc) => doc.lineAt(2))
            .returns(() => ({ range: new vscode_1.Range(2, 0, 2, 3), text: '   ' }))
            .verifiable(typemoq.Times.atLeastOnce());
        document
            .setup((doc) => doc.getText(typemoq.It.isAny()))
            .returns(() => '   ')
            .verifiable(typemoq.Times.atLeastOnce());
        const isBeforeCursor = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.isCommaImmediatelyBeforeCursor(document.object, position);
        assert.ok(isBeforeCursor);
        document.verifyAll();
    });
    test('If cursor is positioned in an empty line and previous line does not end with comma, then detect this', async () => {
        sandbox.restore();
        const document = typemoq.Mock.ofType();
        const position = new vscode_1.Position(2, 2);
        document
            .setup((doc) => doc.lineAt(1))
            .returns(() => ({ range: new vscode_1.Range(1, 0, 1, 3), text: '} ' }))
            .verifiable(typemoq.Times.atLeastOnce());
        document
            .setup((doc) => doc.lineAt(2))
            .returns(() => ({ range: new vscode_1.Range(2, 0, 2, 3), text: '   ' }))
            .verifiable(typemoq.Times.atLeastOnce());
        document
            .setup((doc) => doc.getText(typemoq.It.isAny()))
            .returns(() => '   ')
            .verifiable(typemoq.Times.atLeastOnce());
        const isBeforeCursor = updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper.isCommaImmediatelyBeforeCursor(document.object, position);
        assert.ok(!isBeforeCursor);
        document.verifyAll();
    });
});
//# sourceMappingURL=updaterServerHelper.unit.test.js.map