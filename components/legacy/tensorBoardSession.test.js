"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const chai_1 = require("chai");
const sinon = require("sinon");
const semver_1 = require("semver");
const vscode_1 = require("vscode");
const types_1 = require("../../client/common/types");
const localize_1 = require("../../client/common/utils/localize");
const types_2 = require("../../client/common/application/types");
const constants_1 = require("../../client/tensorBoard/constants");
const initialize_1 = require("../initialize");
const contracts_1 = require("../../client/interpreter/contracts");
const platform_1 = require("../../client/common/utils/platform");
const info_1 = require("../../client/pythonEnvironments/info");
const common_1 = require("../common");
const importTracker_1 = require("../../client/telemetry/importTracker");
const multiStepInput_1 = require("../../client/common/utils/multiStepInput");
const types_3 = require("../../client/common/installer/types");
const info = {
    architecture: platform_1.Architecture.Unknown,
    companyDisplayName: '',
    displayName: '',
    envName: '',
    path: '',
    envType: info_1.EnvironmentType.Unknown,
    version: new semver_1.SemVer('0.0.0-alpha'),
    sysPrefix: '',
    sysVersion: '',
};
const interpreter = {
    ...info,
    envType: info_1.EnvironmentType.Unknown,
    path: common_1.PYTHON_PATH,
};
suite('TensorBoard session creation', async () => {
    let serviceManager;
    let errorMessageStub;
    let sandbox;
    let applicationShell;
    let commandManager;
    let experimentService;
    let installer;
    let initialValue;
    let workspaceConfiguration;
    suiteSetup(function () {
        if (process.env.CI_PYTHON_VERSION === '2.7') {
            this.skip();
        }
        this.skip();
    });
    setup(async () => {
        sandbox = sinon.createSandbox();
        ({ serviceManager } = await (0, initialize_1.initialize)());
        experimentService = serviceManager.get(types_1.IExperimentService);
        const interpreterService = serviceManager.get(contracts_1.IInterpreterService);
        sandbox.stub(interpreterService, 'getActiveInterpreter').resolves(interpreter);
        applicationShell = serviceManager.get(types_2.IApplicationShell);
        commandManager = serviceManager.get(types_2.ICommandManager);
        installer = serviceManager.get(types_1.IInstaller);
        workspaceConfiguration = vscode_1.workspace.getConfiguration('python.tensorBoard');
        initialValue = workspaceConfiguration.get('logDirectory');
        await workspaceConfiguration.update('logDirectory', undefined, true);
    });
    teardown(async () => {
        await workspaceConfiguration.update('logDirectory', initialValue, true);
        await (0, initialize_1.closeActiveWindows)();
        sandbox.restore();
    });
    function configureStubs(hasTorchImports, tensorBoardInstallStatus, torchProfilerPackageInstallStatus, installPromptSelection) {
        sandbox.stub(importTracker_1.ImportTracker, 'hasModuleImport').withArgs('torch').returns(hasTorchImports);
        const isProductVersionCompatible = sandbox.stub(installer, 'isProductVersionCompatible');
        isProductVersionCompatible
            .withArgs(types_1.Product.tensorboard, '>= 2.4.1', interpreter)
            .resolves(tensorBoardInstallStatus);
        isProductVersionCompatible
            .withArgs(types_1.Product.torchProfilerImportName, '>= 0.2.0', interpreter)
            .resolves(torchProfilerPackageInstallStatus);
        errorMessageStub = sandbox.stub(applicationShell, 'showErrorMessage');
        errorMessageStub.resolves(installPromptSelection);
    }
    async function createSession() {
        var _a, _b;
        errorMessageStub = sandbox.stub(applicationShell, 'showErrorMessage');
        sandbox.stub(applicationShell, 'showQuickPick').resolves({ label: localize_1.TensorBoard.useCurrentWorkingDirectory });
        const session = (await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette));
        chai_1.assert.ok(((_a = session.panel) === null || _a === void 0 ? void 0 : _a.viewColumn) === vscode_1.ViewColumn.One, 'Panel opened in wrong group');
        chai_1.assert.ok((_b = session.panel) === null || _b === void 0 ? void 0 : _b.visible, 'Webview panel not shown on session creation golden path');
        chai_1.assert.ok(errorMessageStub.notCalled, 'Error message shown on session creation golden path');
        return session;
    }
    suite('Core functionality', async () => {
        test('Golden path: TensorBoard session starts successfully and webview is shown', async () => {
            await createSession();
        });
        test('When webview is closed, session is killed', async () => {
            const session = await createSession();
            const { daemon, panel } = session;
            chai_1.assert.ok(panel === null || panel === void 0 ? void 0 : panel.visible, 'Webview panel not shown');
            panel === null || panel === void 0 ? void 0 : panel.dispose();
            chai_1.assert.ok(session.panel === undefined, 'Webview still visible');
            chai_1.assert.ok(daemon === null || daemon === void 0 ? void 0 : daemon.killed, 'TensorBoard session process not killed after webview closed');
        });
        test('When user selects file picker, display file picker', async () => {
            sandbox.stub(applicationShell, 'showQuickPick').resolves({ label: localize_1.TensorBoard.selectAnotherFolder });
            const filePickerStub = sandbox.stub(applicationShell, 'showOpenDialog');
            await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette);
            chai_1.assert.ok(filePickerStub.called, 'User requests to select another folder and file picker was not shown');
        });
        test('When user selects remote URL, display input box', async () => {
            sandbox.stub(applicationShell, 'showQuickPick').resolves({ label: localize_1.TensorBoard.enterRemoteUrl });
            const inputBoxStub = sandbox.stub(applicationShell, 'showInputBox');
            await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette);
            chai_1.assert.ok(inputBoxStub.called, 'User requested to enter remote URL and input box to enter URL was not shown');
        });
    });
    suite('Installation prompt message', async () => {
        async function createSessionAndVerifyMessage(message) {
            sandbox.stub(applicationShell, 'showQuickPick').resolves({ label: localize_1.TensorBoard.useCurrentWorkingDirectory });
            await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette);
            chai_1.assert.ok(errorMessageStub.calledOnceWith(message, localize_1.Common.bannerLabelYes, localize_1.Common.bannerLabelNo), 'Wrong error message shown');
        }
        suite('Install profiler package + upgrade tensorboard', async () => {
            async function runTest(expectTensorBoardUpgrade) {
                const installStub = sandbox.stub(installer, 'install').resolves(types_1.InstallerResponse.Installed);
                await createSessionAndVerifyMessage(localize_1.TensorBoard.installTensorBoardAndProfilerPluginPrompt);
                chai_1.assert.ok(installStub.calledTwice, `Expected 2 installs but got ${installStub.callCount} calls`);
                chai_1.assert.ok(installStub.calledWith(types_1.Product.torchProfilerInstallName));
                chai_1.assert.ok(installStub.calledWith(types_1.Product.tensorboard, sinon.match.any, sinon.match.any, expectTensorBoardUpgrade ? types_3.ModuleInstallFlags.upgrade : undefined));
            }
            test('Has torch imports: true, is profiler package installed: false, TensorBoard needs upgrade', async () => {
                configureStubs(true, types_1.ProductInstallStatus.NeedsUpgrade, types_1.ProductInstallStatus.NotInstalled, 'Yes');
                await runTest(true);
            });
            test('Has torch imports: true, is profiler package installed: false, TensorBoard not installed', async () => {
                configureStubs(true, types_1.ProductInstallStatus.NotInstalled, types_1.ProductInstallStatus.NotInstalled, 'Yes');
                await runTest(false);
            });
        });
        suite('Install profiler only', async () => {
            test('Has torch imports: true, is profiler package installed: false, TensorBoard installed', async () => {
                var _a;
                configureStubs(true, types_1.ProductInstallStatus.Installed, types_1.ProductInstallStatus.NotInstalled, 'Yes');
                sandbox
                    .stub(applicationShell, 'showQuickPick')
                    .resolves({ label: localize_1.TensorBoard.useCurrentWorkingDirectory });
                sandbox
                    .stub(installer, 'install')
                    .withArgs(types_1.Product.torchProfilerInstallName, sinon.match.any, sinon.match.any)
                    .resolves(types_1.InstallerResponse.Ignore);
                const session = (await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette));
                chai_1.assert.ok((_a = session.panel) === null || _a === void 0 ? void 0 : _a.visible, 'Webview panel not shown, expected successful session creation');
                chai_1.assert.ok(errorMessageStub.calledOnceWith(localize_1.TensorBoard.installProfilerPluginPrompt, localize_1.Common.bannerLabelYes, localize_1.Common.bannerLabelNo), 'Wrong error message shown');
            });
        });
        suite('Install tensorboard only', async () => {
            [false, true].forEach(async (hasTorchImports) => {
                [
                    types_1.ProductInstallStatus.Installed,
                    types_1.ProductInstallStatus.NotInstalled,
                    types_1.ProductInstallStatus.NeedsUpgrade,
                ].forEach(async (torchProfilerInstallStatus) => {
                    const isTorchProfilerPackageInstalled = torchProfilerInstallStatus === types_1.ProductInstallStatus.Installed;
                    if (!(hasTorchImports && !isTorchProfilerPackageInstalled)) {
                        test(`Has torch imports: ${hasTorchImports}, is profiler package installed: ${isTorchProfilerPackageInstalled}, TensorBoard not installed`, async () => {
                            configureStubs(hasTorchImports, types_1.ProductInstallStatus.NotInstalled, torchProfilerInstallStatus, 'No');
                            await createSessionAndVerifyMessage(localize_1.TensorBoard.installPrompt);
                        });
                    }
                });
            });
        });
        suite('Upgrade tensorboard only', async () => {
            async function runTest() {
                const installStub = sandbox.stub(installer, 'install').resolves(types_1.InstallerResponse.Installed);
                await createSessionAndVerifyMessage(localize_1.TensorBoard.upgradePrompt);
                chai_1.assert.ok(installStub.calledOnce, `Expected 1 install but got ${installStub.callCount} installs`);
                chai_1.assert.ok(installStub.args[0][0] === types_1.Product.tensorboard, 'Did not install tensorboard');
                chai_1.assert.ok(installStub.args.filter((argsList) => argsList[0] === types_1.Product.torchProfilerInstallName).length ===
                    0, 'Unexpected attempt to install profiler package');
            }
            [false, true].forEach(async (hasTorchImports) => {
                [
                    types_1.ProductInstallStatus.Installed,
                    types_1.ProductInstallStatus.NotInstalled,
                    types_1.ProductInstallStatus.NeedsUpgrade,
                ].forEach(async (torchProfilerInstallStatus) => {
                    const isTorchProfilerPackageInstalled = torchProfilerInstallStatus === types_1.ProductInstallStatus.Installed;
                    if (!(hasTorchImports && !isTorchProfilerPackageInstalled)) {
                        test(`Has torch imports: ${hasTorchImports}, is profiler package installed: ${isTorchProfilerPackageInstalled}, TensorBoard needs upgrade`, async () => {
                            configureStubs(hasTorchImports, types_1.ProductInstallStatus.NeedsUpgrade, torchProfilerInstallStatus, 'Yes');
                            await runTest();
                        });
                    }
                });
            });
        });
        suite('No prompt', async () => {
            async function runTest() {
                sandbox
                    .stub(applicationShell, 'showQuickPick')
                    .resolves({ label: localize_1.TensorBoard.useCurrentWorkingDirectory });
                await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette);
                chai_1.assert.ok(errorMessageStub.notCalled, 'Prompt was unexpectedly shown');
            }
            [false, true].forEach(async (hasTorchImports) => {
                [
                    types_1.ProductInstallStatus.Installed,
                    types_1.ProductInstallStatus.NotInstalled,
                    types_1.ProductInstallStatus.NeedsUpgrade,
                ].forEach(async (torchProfilerInstallStatus) => {
                    const isTorchProfilerPackageInstalled = torchProfilerInstallStatus === types_1.ProductInstallStatus.Installed;
                    if (!(hasTorchImports && !isTorchProfilerPackageInstalled)) {
                        test(`Has torch imports: ${hasTorchImports}, is profiler package installed: ${isTorchProfilerPackageInstalled}, TensorBoard installed`, async () => {
                            configureStubs(hasTorchImports, types_1.ProductInstallStatus.Installed, torchProfilerInstallStatus, 'Yes');
                            await runTest();
                        });
                    }
                });
            });
        });
    });
    suite('Error messages', async () => {
        test('If user cancels starting TensorBoard session, do not show error', async () => {
            sandbox.stub(applicationShell, 'showQuickPick').resolves({ label: localize_1.TensorBoard.useCurrentWorkingDirectory });
            sandbox.stub(applicationShell, 'withProgress').resolves('canceled');
            errorMessageStub = sandbox.stub(applicationShell, 'showErrorMessage');
            await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette);
            chai_1.assert.ok(errorMessageStub.notCalled, 'User canceled session start and error was shown');
        });
        test('If existing install of TensorBoard is outdated and user cancels installation, do not show error', async () => {
            sandbox.stub(experimentService, 'inExperiment').resolves(true);
            errorMessageStub = sandbox.stub(applicationShell, 'showErrorMessage');
            sandbox.stub(installer, 'isProductVersionCompatible').resolves(types_1.ProductInstallStatus.NeedsUpgrade);
            sandbox.stub(installer, 'install').resolves(types_1.InstallerResponse.Ignore);
            const quickPickStub = sandbox.stub(applicationShell, 'showQuickPick');
            await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette);
            chai_1.assert.ok(quickPickStub.notCalled, 'User opted not to upgrade and we proceeded to create session');
        });
        test('If TensorBoard is not installed and user chooses not to install, do not show error', async () => {
            configureStubs(true, types_1.ProductInstallStatus.NotInstalled, types_1.ProductInstallStatus.NotInstalled, 'Yes');
            sandbox.stub(installer, 'install').resolves(types_1.InstallerResponse.Ignore);
            await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette);
            chai_1.assert.ok(errorMessageStub.calledOnceWith(localize_1.TensorBoard.installTensorBoardAndProfilerPluginPrompt, localize_1.Common.bannerLabelYes, localize_1.Common.bannerLabelNo), 'User opted not to install and error was shown');
        });
        test('If user does not select a logdir, do not show error', async () => {
            sandbox.stub(experimentService, 'inExperiment').resolves(true);
            errorMessageStub = sandbox.stub(applicationShell, 'showErrorMessage');
            sandbox.stub(applicationShell, 'showQuickPick').resolves({ label: localize_1.TensorBoard.selectAFolder });
            sandbox.stub(applicationShell, 'showOpenDialog').resolves(undefined);
            await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette);
            chai_1.assert.ok(errorMessageStub.notCalled, 'User opted not to select a logdir and error was shown');
        });
        test('If starting TensorBoard times out, show error', async () => {
            sandbox.stub(applicationShell, 'showQuickPick').resolves({ label: localize_1.TensorBoard.useCurrentWorkingDirectory });
            sandbox.stub(applicationShell, 'withProgress').resolves(60000);
            errorMessageStub = sandbox.stub(applicationShell, 'showErrorMessage');
            await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette);
            chai_1.assert.ok(errorMessageStub.called, 'TensorBoard timed out but no error was shown');
        });
        test('If installing the profiler package fails, do not show error, continue to create session', async () => {
            var _a;
            configureStubs(true, types_1.ProductInstallStatus.Installed, types_1.ProductInstallStatus.NotInstalled, 'Yes');
            sandbox.stub(applicationShell, 'showQuickPick').resolves({ label: localize_1.TensorBoard.useCurrentWorkingDirectory });
            sandbox
                .stub(installer, 'install')
                .withArgs(types_1.Product.torchProfilerInstallName, sinon.match.any, sinon.match.any)
                .resolves(types_1.InstallerResponse.Ignore);
            const session = (await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette));
            chai_1.assert.ok((_a = session.panel) === null || _a === void 0 ? void 0 : _a.visible, 'Webview panel not shown, expected successful session creation');
        });
        test('If user opts not to install profiler package and tensorboard is already installed, continue to create session', async () => {
            var _a;
            configureStubs(true, types_1.ProductInstallStatus.Installed, types_1.ProductInstallStatus.NotInstalled, 'No');
            sandbox.stub(applicationShell, 'showQuickPick').resolves({ label: localize_1.TensorBoard.useCurrentWorkingDirectory });
            const session = (await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette));
            chai_1.assert.ok((_a = session.panel) === null || _a === void 0 ? void 0 : _a.visible, 'Webview panel not shown, expected successful session creation');
        });
    });
    test('If python.tensorBoard.logDirectory is provided, do not prompt user to pick a log directory', async () => {
        var _a;
        const selectDirectoryStub = sandbox
            .stub(applicationShell, 'showQuickPick')
            .resolves({ label: localize_1.TensorBoard.useCurrentWorkingDirectory });
        errorMessageStub = sandbox.stub(applicationShell, 'showErrorMessage');
        await workspaceConfiguration.update('logDirectory', 'logs/fit', true);
        const session = (await commandManager.executeCommand('python.launchTensorBoard', constants_1.TensorBoardEntrypoint.palette, constants_1.TensorBoardEntrypointTrigger.palette));
        chai_1.assert.ok((_a = session.panel) === null || _a === void 0 ? void 0 : _a.visible, 'Expected successful session creation but webpanel not shown');
        chai_1.assert.ok(errorMessageStub.notCalled, 'Expected successful session creation but error message was shown');
        chai_1.assert.ok(selectDirectoryStub.notCalled, 'Prompted user to select log directory although setting was specified');
    });
    suite('Jump to source', async () => {
        const fsPath = path.join(initialize_1.EXTENSION_ROOT_DIR_FOR_TESTS, 'src', 'test', 'pythonFiles', 'tensorBoard', 'sourcefile.py');
        teardown(() => {
            sandbox.restore();
        });
        function setupStubsForMultiStepInput() {
            const multiStepFactory = serviceManager.get(multiStepInput_1.IMultiStepInputFactory);
            const inputInstance = multiStepFactory.create();
            const showQuickPickStub = sandbox.stub(inputInstance, 'showQuickPick').resolves({
                label: localize_1.TensorBoard.selectMissingSourceFile,
                description: localize_1.TensorBoard.selectMissingSourceFileDescription,
            });
            const createInputStub = sandbox
                .stub(multiStepFactory, 'create')
                .returns(inputInstance);
            const filePickerStub = sandbox.stub(applicationShell, 'showOpenDialog').resolves([vscode_1.Uri.file(fsPath)]);
            return [showQuickPickStub, createInputStub, filePickerStub];
        }
        test('Resolves filepaths without displaying prompt', async () => {
            var _a;
            const session = (await createSession());
            const stubs = setupStubsForMultiStepInput();
            await session.jumpToSource(fsPath, 0);
            chai_1.assert.ok(vscode_1.window.activeTextEditor !== undefined, 'Source file not resolved');
            chai_1.assert.ok(((_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri.fsPath) === fsPath, 'Wrong source file opened');
            chai_1.assert.ok(stubs.reduce((prev, current) => current.notCalled && prev, true), 'Stubs were called when file is present');
        });
        test('Display quickpick to user if filepath is not on disk', async () => {
            var _a;
            const session = (await createSession());
            const stubs = setupStubsForMultiStepInput();
            await session.jumpToSource('/nonexistent/file/path.py', 0);
            chai_1.assert.ok(vscode_1.window.activeTextEditor !== undefined, 'Source file not resolved');
            chai_1.assert.ok(((_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri.fsPath) === fsPath, 'Wrong source file opened');
            chai_1.assert.ok(stubs.reduce((prev, current) => current.calledOnce && prev, true), 'Stubs called an unexpected number of times');
        });
    });
});
//# sourceMappingURL=tensorBoardSession.test.js.map