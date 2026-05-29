'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chaiAsPromised = require("chai-as-promised");
const child_process_1 = require("child_process");
const fs = require("fs-extra");
const path = require("path");
const vscode_1 = require("vscode");
const types_1 = require("../../../client/common/process/types");
const types_2 = require("../../../client/common/types");
const cacheUtils_1 = require("../../../client/common/utils/cacheUtils");
const externalDependencies_1 = require("../../../client/pythonEnvironments/common/externalDependencies");
const common_1 = require("../../common");
const extensionSettings_1 = require("../../extensionSettings");
const initialize_1 = require("../../initialize");
(0, chai_1.use)(chaiAsPromised);
const multirootPath = path.join(__dirname, '..', '..', '..', '..', 'src', 'testMultiRootWkspc');
const workspace4Path = vscode_1.Uri.file(path.join(multirootPath, 'workspace4'));
const workspace4PyFile = vscode_1.Uri.file(path.join(workspace4Path.fsPath, 'one.py'));
suite('PythonExecutableService', () => {
    let serviceContainer;
    let configService;
    let pythonExecFactory;
    suiteSetup(async function () {
        if (!initialize_1.IS_MULTI_ROOT_TEST) {
            this.skip();
        }
        await (0, common_1.clearPythonPathInWorkspaceFolder)(workspace4Path);
        serviceContainer = (await (0, initialize_1.initialize)()).serviceContainer;
    });
    setup(async () => {
        (0, externalDependencies_1.initializeExternalDependencies)(serviceContainer);
        configService = serviceContainer.get(types_2.IConfigurationService);
        pythonExecFactory = serviceContainer.get(types_1.IPythonExecutionFactory);
        await configService.updateSetting('envFile', undefined, workspace4PyFile, vscode_1.ConfigurationTarget.WorkspaceFolder);
        (0, cacheUtils_1.clearCache)();
        return (0, initialize_1.initializeTest)();
    });
    suiteTeardown(initialize_1.closeActiveWindows);
    teardown(async () => {
        await (0, initialize_1.closeActiveWindows)();
        await (0, common_1.clearPythonPathInWorkspaceFolder)(workspace4Path);
        await configService.updateSetting('envFile', undefined, workspace4PyFile, vscode_1.ConfigurationTarget.WorkspaceFolder);
        await (0, initialize_1.initializeTest)();
        (0, cacheUtils_1.clearCache)();
    });
    test('Importing without a valid PYTHONPATH should fail', async () => {
        await configService.updateSetting('envFile', 'someInvalidFile.env', workspace4PyFile, vscode_1.ConfigurationTarget.WorkspaceFolder);
        pythonExecFactory = serviceContainer.get(types_1.IPythonExecutionFactory);
        const pythonExecService = await pythonExecFactory.create({ resource: workspace4PyFile });
        const promise = pythonExecService.exec([workspace4PyFile.fsPath], {
            cwd: path.dirname(workspace4PyFile.fsPath),
            throwOnStdErr: true,
        });
        await (0, chai_1.expect)(promise).to.eventually.be.rejectedWith(types_1.StdErrError);
    }).timeout(initialize_1.TEST_TIMEOUT * 3);
    test('Importing with a valid PYTHONPATH from .env file should succeed', async () => {
        await configService.updateSetting('envFile', undefined, workspace4PyFile, vscode_1.ConfigurationTarget.WorkspaceFolder);
        const pythonExecService = await pythonExecFactory.create({ resource: workspace4PyFile });
        const result = await pythonExecService.exec([workspace4PyFile.fsPath], {
            cwd: path.dirname(workspace4PyFile.fsPath),
            throwOnStdErr: true,
        });
        (0, chai_1.expect)(result.stdout.startsWith('Hello')).to.be.equals(true);
    }).timeout(initialize_1.TEST_TIMEOUT * 3);
    test("Known modules such as 'os' and 'sys' should be deemed 'installed'", async () => {
        const pythonExecService = await pythonExecFactory.create({ resource: workspace4PyFile });
        const osModuleIsInstalled = pythonExecService.isModuleInstalled('os');
        const sysModuleIsInstalled = pythonExecService.isModuleInstalled('sys');
        await (0, chai_1.expect)(osModuleIsInstalled).to.eventually.equal(true, 'os module is not installed');
        await (0, chai_1.expect)(sysModuleIsInstalled).to.eventually.equal(true, 'sys module is not installed');
    }).timeout(initialize_1.TEST_TIMEOUT * 3);
    test("Unknown modules such as 'xyzabc123' be deemed 'not installed'", async () => {
        const pythonExecService = await pythonExecFactory.create({ resource: workspace4PyFile });
        const randomModuleName = `xyz123${new Date().getSeconds()}`;
        const randomModuleIsInstalled = pythonExecService.isModuleInstalled(randomModuleName);
        await (0, chai_1.expect)(randomModuleIsInstalled).to.eventually.equal(false, `Random module '${randomModuleName}' is installed`);
    }).timeout(initialize_1.TEST_TIMEOUT * 3);
    test('Ensure correct path to executable is returned', async () => {
        const { pythonPath } = (0, extensionSettings_1.getExtensionSettings)(workspace4Path);
        let expectedExecutablePath;
        if (await fs.pathExists(pythonPath)) {
            expectedExecutablePath = pythonPath;
        }
        else {
            expectedExecutablePath = await new Promise((resolve) => {
                (0, child_process_1.execFile)(pythonPath, ['-c', 'import sys;print(sys.executable)'], (_error, stdout, _stdErr) => {
                    resolve(stdout.trim());
                });
            });
        }
        const pythonExecService = await pythonExecFactory.create({ resource: workspace4PyFile });
        const executablePath = await pythonExecService.getExecutablePath();
        (0, chai_1.expect)(executablePath).to.equal(expectedExecutablePath, 'Executable paths are not the same');
    }).timeout(initialize_1.TEST_TIMEOUT * 3);
});
//# sourceMappingURL=pythonProc.simple.multiroot.test.js.map