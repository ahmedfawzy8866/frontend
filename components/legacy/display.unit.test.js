"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const path = require("path");
const semver_1 = require("semver");
const sinon = require("sinon");
const TypeMoq = require("typemoq");
const vscode_1 = require("vscode");
const types_1 = require("../../client/common/application/types");
const constants_1 = require("../../client/common/constants");
const types_2 = require("../../client/common/platform/types");
const types_3 = require("../../client/common/types");
const localize_1 = require("../../client/common/utils/localize");
const platform_1 = require("../../client/common/utils/platform");
const contracts_1 = require("../../client/interpreter/contracts");
const display_1 = require("../../client/interpreter/display");
const logging = require("../../client/logging");
const info_1 = require("../../client/pythonEnvironments/info");
const vsc_1 = require("../mocks/vsc");
const info = {
    architecture: platform_1.Architecture.Unknown,
    companyDisplayName: '',
    detailedDisplayName: '',
    envName: '',
    path: '',
    envType: info_1.EnvironmentType.Unknown,
    version: new semver_1.SemVer('0.0.0-alpha'),
    sysPrefix: '',
    sysVersion: '',
};
suite('Interpreters Display', () => {
    let applicationShell;
    let workspaceService;
    let serviceContainer;
    let interpreterService;
    let fileSystem;
    let disposableRegistry;
    let statusBar;
    let interpreterDisplay;
    let interpreterHelper;
    let pathUtils;
    let languageStatusItem;
    let traceLogStub;
    async function createInterpreterDisplay(filters = []) {
        interpreterDisplay = new display_1.InterpreterDisplay(serviceContainer.object);
        try {
            await interpreterDisplay.activate();
        }
        catch (_a) { }
        filters.forEach((f) => interpreterDisplay.registerVisibilityFilter(f));
    }
    async function setupMocks(useLanguageStatus) {
        serviceContainer = TypeMoq.Mock.ofType();
        workspaceService = TypeMoq.Mock.ofType();
        applicationShell = TypeMoq.Mock.ofType();
        interpreterService = TypeMoq.Mock.ofType();
        fileSystem = TypeMoq.Mock.ofType();
        interpreterHelper = TypeMoq.Mock.ofType();
        disposableRegistry = [];
        statusBar = TypeMoq.Mock.ofType();
        statusBar.setup((s) => s.name).returns(() => '');
        languageStatusItem = TypeMoq.Mock.ofType();
        pathUtils = TypeMoq.Mock.ofType();
        traceLogStub = sinon.stub(logging, 'traceLog');
        serviceContainer
            .setup((c) => c.get(TypeMoq.It.isValue(types_1.IWorkspaceService)))
            .returns(() => workspaceService.object);
        serviceContainer
            .setup((c) => c.get(TypeMoq.It.isValue(types_1.IApplicationShell)))
            .returns(() => applicationShell.object);
        serviceContainer
            .setup((c) => c.get(TypeMoq.It.isValue(contracts_1.IInterpreterService)))
            .returns(() => interpreterService.object);
        serviceContainer.setup((c) => c.get(TypeMoq.It.isValue(types_2.IFileSystem))).returns(() => fileSystem.object);
        serviceContainer.setup((c) => c.get(TypeMoq.It.isValue(types_3.IDisposableRegistry))).returns(() => disposableRegistry);
        serviceContainer
            .setup((c) => c.get(TypeMoq.It.isValue(contracts_1.IInterpreterHelper)))
            .returns(() => interpreterHelper.object);
        serviceContainer.setup((c) => c.get(TypeMoq.It.isValue(types_3.IPathUtils))).returns(() => pathUtils.object);
        if (!useLanguageStatus) {
            applicationShell
                .setup((a) => a.createStatusBarItem(TypeMoq.It.isValue(vscode_1.StatusBarAlignment.Right), TypeMoq.It.isAny(), TypeMoq.It.isAny()))
                .returns(() => statusBar.object);
        }
        else {
            applicationShell
                .setup((a) => a.createLanguageStatusItem(TypeMoq.It.isAny(), TypeMoq.It.isValue({ language: constants_1.PYTHON_LANGUAGE })))
                .returns(() => languageStatusItem.object);
        }
        pathUtils.setup((p) => p.getDisplayName(TypeMoq.It.isAny(), TypeMoq.It.isAny())).returns((p) => p);
        await createInterpreterDisplay();
    }
    function setupWorkspaceFolder(resource, workspaceFolder) {
        if (workspaceFolder) {
            const mockFolder = TypeMoq.Mock.ofType();
            mockFolder.setup((w) => w.uri).returns(() => workspaceFolder);
            workspaceService
                .setup((w) => w.getWorkspaceFolder(TypeMoq.It.isValue(resource)))
                .returns(() => mockFolder.object);
        }
        else {
            workspaceService.setup((w) => w.getWorkspaceFolder(TypeMoq.It.isValue(resource))).returns(() => undefined);
        }
    }
    [false].forEach((useLanguageStatus) => {
        suite(`When ${useLanguageStatus ? `using language status` : 'using status bar'}`, () => {
            setup(async () => {
                setupMocks(useLanguageStatus);
            });
            teardown(() => {
                sinon.restore();
            });
            test('Statusbar must be created and have command name initialized', () => {
                if (useLanguageStatus) {
                    languageStatusItem.verify((s) => (s.severity = TypeMoq.It.isValue(vscode_1.LanguageStatusSeverity.Information)), TypeMoq.Times.once());
                    languageStatusItem.verify((s) => (s.command = TypeMoq.It.isValue({
                        title: localize_1.InterpreterQuickPickList.browsePath.openButtonLabel,
                        command: constants_1.Commands.Set_Interpreter,
                    })), TypeMoq.Times.once());
                    (0, chai_1.expect)(disposableRegistry).contain(languageStatusItem.object);
                }
                else {
                    statusBar.verify((s) => (s.command = TypeMoq.It.isAny()), TypeMoq.Times.once());
                    (0, chai_1.expect)(disposableRegistry).contain(statusBar.object);
                }
                (0, chai_1.expect)(disposableRegistry).to.be.lengthOf.above(0);
            });
            test('Display name and tooltip must come from interpreter info', async () => {
                const resource = vscode_1.Uri.file('x');
                const workspaceFolder = vscode_1.Uri.file('workspace');
                const activeInterpreter = {
                    ...info,
                    detailedDisplayName: 'Dummy_Display_Name',
                    envType: info_1.EnvironmentType.Unknown,
                    path: path.join('user', 'development', 'env', 'bin', 'python'),
                };
                setupWorkspaceFolder(resource, workspaceFolder);
                interpreterService
                    .setup((i) => i.getInterpreters(TypeMoq.It.isValue(workspaceFolder)))
                    .returns(() => []);
                interpreterService
                    .setup((i) => i.getActiveInterpreter(TypeMoq.It.isValue(workspaceFolder)))
                    .returns(() => Promise.resolve(activeInterpreter));
                await interpreterDisplay.refresh(resource);
                if (useLanguageStatus) {
                    languageStatusItem.verify((s) => (s.text = TypeMoq.It.isValue(activeInterpreter.detailedDisplayName)), TypeMoq.Times.once());
                    languageStatusItem.verify((s) => (s.detail = TypeMoq.It.isValue(activeInterpreter.path)), TypeMoq.Times.atLeastOnce());
                }
                else {
                    statusBar.verify((s) => (s.text = TypeMoq.It.isValue(activeInterpreter.detailedDisplayName)), TypeMoq.Times.once());
                    statusBar.verify((s) => (s.tooltip = TypeMoq.It.isValue(activeInterpreter.path)), TypeMoq.Times.atLeastOnce());
                }
            });
            test('Log the output channel if displayed needs to be updated with a new interpreter', async () => {
                const resource = vscode_1.Uri.file('x');
                const workspaceFolder = vscode_1.Uri.file('workspace');
                const activeInterpreter = {
                    ...info,
                    detailedDisplayName: 'Dummy_Display_Name',
                    envType: info_1.EnvironmentType.Unknown,
                    path: path.join('user', 'development', 'env', 'bin', 'python'),
                };
                pathUtils
                    .setup((p) => p.getDisplayName(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
                    .returns(() => activeInterpreter.path);
                setupWorkspaceFolder(resource, workspaceFolder);
                interpreterService
                    .setup((i) => i.getInterpreters(TypeMoq.It.isValue(workspaceFolder)))
                    .returns(() => []);
                interpreterService
                    .setup((i) => i.getActiveInterpreter(TypeMoq.It.isValue(workspaceFolder)))
                    .returns(() => Promise.resolve(activeInterpreter));
                await interpreterDisplay.refresh(resource);
                traceLogStub.calledOnceWithExactly(`Python interpreter path: ${activeInterpreter.path}`, activeInterpreter.path);
            });
            test('If interpreter is not identified then tooltip should point to python Path', async () => {
                const resource = vscode_1.Uri.file('x');
                const pythonPath = path.join('user', 'development', 'env', 'bin', 'python');
                const workspaceFolder = vscode_1.Uri.file('workspace');
                const displayName = 'Python 3.10.1';
                const expectedDisplayName = '3.10.1';
                setupWorkspaceFolder(resource, workspaceFolder);
                const pythonInterpreter = {
                    detailedDisplayName: displayName,
                    path: pythonPath,
                };
                interpreterService
                    .setup((i) => i.getActiveInterpreter(TypeMoq.It.isValue(workspaceFolder)))
                    .returns(() => Promise.resolve(pythonInterpreter));
                await interpreterDisplay.refresh(resource);
                if (useLanguageStatus) {
                    languageStatusItem.verify((s) => (s.detail = TypeMoq.It.isValue(pythonPath)), TypeMoq.Times.atLeastOnce());
                    languageStatusItem.verify((s) => (s.text = TypeMoq.It.isValue(expectedDisplayName)), TypeMoq.Times.once());
                }
                else {
                    statusBar.verify((s) => (s.tooltip = TypeMoq.It.isValue(pythonPath)), TypeMoq.Times.atLeastOnce());
                    statusBar.verify((s) => (s.text = TypeMoq.It.isValue(expectedDisplayName)), TypeMoq.Times.once());
                }
            });
            test('If interpreter file does not exist then update status bar accordingly', async () => {
                const resource = vscode_1.Uri.file('x');
                const pythonPath = path.join('user', 'development', 'env', 'bin', 'python');
                const workspaceFolder = vscode_1.Uri.file('workspace');
                setupWorkspaceFolder(resource, workspaceFolder);
                interpreterService
                    .setup((i) => i.getInterpreters(TypeMoq.It.isValue(workspaceFolder)))
                    .returns(() => [{}]);
                interpreterService
                    .setup((i) => i.getActiveInterpreter(TypeMoq.It.isValue(workspaceFolder)))
                    .returns(() => Promise.resolve(undefined));
                fileSystem
                    .setup((f) => f.fileExists(TypeMoq.It.isValue(pythonPath)))
                    .returns(() => Promise.resolve(false));
                interpreterHelper
                    .setup((v) => v.getInterpreterInformation(TypeMoq.It.isValue(pythonPath)))
                    .returns(() => Promise.resolve(undefined));
                await interpreterDisplay.refresh(resource);
                if (useLanguageStatus) {
                    languageStatusItem.verify((s) => (s.text = TypeMoq.It.isValue('$(alert) No Interpreter Selected')), TypeMoq.Times.once());
                }
                else {
                    statusBar.verify((s) => (s.backgroundColor = TypeMoq.It.isValue(new vsc_1.ThemeColor('statusBarItem.warningBackground'))), TypeMoq.Times.once());
                    statusBar.verify((s) => (s.color = TypeMoq.It.isValue('')), TypeMoq.Times.once());
                    statusBar.verify((s) => (s.text = TypeMoq.It.isValue(`$(alert) ${localize_1.InterpreterQuickPickList.browsePath.openButtonLabel}`)), TypeMoq.Times.once());
                }
            });
            test('Ensure we try to identify the active workspace when a resource is not provided ', async () => {
                const workspaceFolder = vscode_1.Uri.file('x');
                const resource = workspaceFolder;
                const pythonPath = path.join('user', 'development', 'env', 'bin', 'python');
                const activeInterpreter = {
                    ...info,
                    detailedDisplayName: 'Dummy_Display_Name',
                    envType: info_1.EnvironmentType.Unknown,
                    companyDisplayName: 'Company Name',
                    path: pythonPath,
                };
                fileSystem.setup((fs) => fs.fileExists(TypeMoq.It.isAny())).returns(() => Promise.resolve(true));
                interpreterService
                    .setup((i) => i.getActiveInterpreter(TypeMoq.It.isValue(resource)))
                    .returns(() => Promise.resolve(activeInterpreter))
                    .verifiable(TypeMoq.Times.once());
                interpreterHelper
                    .setup((i) => i.getActiveWorkspaceUri(undefined))
                    .returns(() => {
                    return { folderUri: workspaceFolder, configTarget: vscode_1.ConfigurationTarget.Workspace };
                })
                    .verifiable(TypeMoq.Times.once());
                await interpreterDisplay.refresh();
                interpreterHelper.verifyAll();
                interpreterService.verifyAll();
                if (useLanguageStatus) {
                    languageStatusItem.verify((s) => (s.text = TypeMoq.It.isValue(activeInterpreter.detailedDisplayName)), TypeMoq.Times.once());
                    languageStatusItem.verify((s) => (s.detail = TypeMoq.It.isValue(pythonPath)), TypeMoq.Times.atLeastOnce());
                }
                else {
                    statusBar.verify((s) => (s.text = TypeMoq.It.isValue(activeInterpreter.detailedDisplayName)), TypeMoq.Times.once());
                    statusBar.verify((s) => (s.tooltip = TypeMoq.It.isValue(pythonPath)), TypeMoq.Times.atLeastOnce());
                }
            });
            suite('Visibility', () => {
                const resource = vscode_1.Uri.file('x');
                suiteSetup(function () {
                    if (useLanguageStatus) {
                        return this.skip();
                    }
                });
                setup(() => {
                    const workspaceFolder = vscode_1.Uri.file('workspace');
                    const activeInterpreter = {
                        ...info,
                        detailedDisplayName: 'Dummy_Display_Name',
                        envType: info_1.EnvironmentType.Unknown,
                        path: path.join('user', 'development', 'env', 'bin', 'python'),
                    };
                    setupWorkspaceFolder(resource, workspaceFolder);
                    interpreterService
                        .setup((i) => i.getInterpreters(TypeMoq.It.isValue(workspaceFolder)))
                        .returns(() => []);
                    interpreterService
                        .setup((i) => i.getActiveInterpreter(TypeMoq.It.isValue(workspaceFolder)))
                        .returns(() => Promise.resolve(activeInterpreter));
                });
                test('Status bar must be displayed', async () => {
                    await interpreterDisplay.refresh(resource);
                    statusBar.verify((s) => s.show(), TypeMoq.Times.once());
                    statusBar.verify((s) => s.hide(), TypeMoq.Times.never());
                });
                test('Status bar must not be displayed if a filter is registered that needs it to be hidden', async () => {
                    const filter1 = { hidden: true };
                    const filter2 = { hidden: false };
                    createInterpreterDisplay([filter1, filter2]);
                    await interpreterDisplay.refresh(resource);
                    statusBar.verify((s) => s.show(), TypeMoq.Times.never());
                    statusBar.verify((s) => s.hide(), TypeMoq.Times.once());
                });
                test('Status bar must not be displayed if both filters need it to be hidden', async () => {
                    const filter1 = { hidden: true };
                    const filter2 = { hidden: true };
                    createInterpreterDisplay([filter1, filter2]);
                    await interpreterDisplay.refresh(resource);
                    statusBar.verify((s) => s.show(), TypeMoq.Times.never());
                    statusBar.verify((s) => s.hide(), TypeMoq.Times.once());
                });
                test('Status bar must be displayed if both filter needs it to be displayed', async () => {
                    const filter1 = { hidden: false };
                    const filter2 = { hidden: false };
                    createInterpreterDisplay([filter1, filter2]);
                    await interpreterDisplay.refresh(resource);
                    statusBar.verify((s) => s.show(), TypeMoq.Times.once());
                    statusBar.verify((s) => s.hide(), TypeMoq.Times.never());
                });
                test('Status bar must hidden if a filter triggers need for status bar to be hidden', async () => {
                    const event1 = new vscode_1.EventEmitter();
                    const filter1 = {
                        hidden: false,
                        changed: event1.event,
                    };
                    const event2 = new vscode_1.EventEmitter();
                    const filter2 = {
                        hidden: false,
                        changed: event2.event,
                    };
                    createInterpreterDisplay([filter1, filter2]);
                    await interpreterDisplay.refresh(resource);
                    statusBar.verify((s) => s.show(), TypeMoq.Times.once());
                    statusBar.verify((s) => s.hide(), TypeMoq.Times.never());
                    statusBar.reset();
                    filter1.hidden = true;
                    event1.fire();
                    statusBar.verify((s) => s.show(), TypeMoq.Times.never());
                    statusBar.verify((s) => s.hide(), TypeMoq.Times.once());
                    statusBar.reset();
                    event2.fire();
                    statusBar.verify((s) => s.show(), TypeMoq.Times.never());
                    statusBar.verify((s) => s.hide(), TypeMoq.Times.once());
                    filter1.hidden = false;
                    statusBar.reset();
                    event2.fire();
                    statusBar.verify((s) => s.show(), TypeMoq.Times.once());
                    statusBar.verify((s) => s.hide(), TypeMoq.Times.never());
                });
            });
        });
    });
});
//# sourceMappingURL=display.unit.test.js.map