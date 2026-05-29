"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const path = require("path");
const semver_1 = require("semver");
const TypeMoq = require("typemoq");
const vscode_1 = require("vscode");
const pythonEnvironment_1 = require("../../../client/common/process/pythonEnvironment");
const pythonProcess_1 = require("../../../client/common/process/pythonProcess");
const misc_1 = require("../../../client/common/utils/misc");
const conda_1 = require("../../../client/pythonEnvironments/common/environmentManagers/conda");
const djangoShellCodeExecution_1 = require("../../../client/terminals/codeExecution/djangoShellCodeExecution");
const repl_1 = require("../../../client/terminals/codeExecution/repl");
const terminalCodeExecution_1 = require("../../../client/terminals/codeExecution/terminalCodeExecution");
const common_1 = require("../../common");
const sinon = require("sinon");
const chai_2 = require("chai");
suite('Terminal - Code Execution', () => {
    ['Terminal Execution', 'Repl Execution', 'Django Execution'].forEach((testSuiteName) => {
        let terminalSettings;
        let terminalService;
        let workspace;
        let platform;
        let workspaceFolder;
        let settings;
        let disposables = [];
        let executor;
        let expectedTerminalTitle;
        let terminalFactory;
        let documentManager;
        let commandManager;
        let fileSystem;
        let pythonExecutionFactory;
        let interpreterService;
        let isDjangoRepl;
        teardown(() => {
            disposables.forEach((disposable) => {
                if (disposable) {
                    disposable.dispose();
                }
            });
            sinon.restore();
            disposables = [];
        });
        setup(() => {
            terminalFactory = TypeMoq.Mock.ofType();
            terminalSettings = TypeMoq.Mock.ofType();
            terminalService = TypeMoq.Mock.ofType();
            const configService = TypeMoq.Mock.ofType();
            workspace = TypeMoq.Mock.ofType();
            platform = TypeMoq.Mock.ofType();
            workspaceFolder = TypeMoq.Mock.ofType();
            documentManager = TypeMoq.Mock.ofType();
            commandManager = TypeMoq.Mock.ofType();
            fileSystem = TypeMoq.Mock.ofType();
            pythonExecutionFactory = TypeMoq.Mock.ofType();
            interpreterService = TypeMoq.Mock.ofType();
            settings = TypeMoq.Mock.ofType();
            settings.setup((s) => s.terminal).returns(() => terminalSettings.object);
            configService.setup((c) => c.getSettings(TypeMoq.It.isAny())).returns(() => settings.object);
            switch (testSuiteName) {
                case 'Terminal Execution': {
                    executor = new terminalCodeExecution_1.TerminalCodeExecutionProvider(terminalFactory.object, configService.object, workspace.object, disposables, platform.object, interpreterService.object, commandManager.object);
                    break;
                }
                case 'Repl Execution': {
                    executor = new repl_1.ReplProvider(terminalFactory.object, configService.object, workspace.object, disposables, platform.object, interpreterService.object, commandManager.object);
                    expectedTerminalTitle = 'REPL';
                    break;
                }
                case 'Django Execution': {
                    isDjangoRepl = true;
                    workspace
                        .setup((w) => w.onDidChangeWorkspaceFolders(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny()))
                        .returns(() => {
                        return { dispose: misc_1.noop };
                    });
                    executor = new djangoShellCodeExecution_1.DjangoShellCodeExecutionProvider(terminalFactory.object, configService.object, workspace.object, documentManager.object, platform.object, commandManager.object, fileSystem.object, disposables, interpreterService.object);
                    expectedTerminalTitle = 'Django Shell';
                    break;
                }
                default: {
                    break;
                }
            }
        });
        suite(`${testSuiteName} (validation of title)`, () => {
            setup(() => {
                terminalFactory
                    .setup((f) => f.getTerminalService(TypeMoq.It.is((a) => a.title === expectedTerminalTitle)))
                    .returns(() => terminalService.object);
            });
            async function ensureTerminalIsCreatedUponInvokingInitializeRepl(isWindows, isOsx, isLinux) {
                platform.setup((p) => p.isWindows).returns(() => isWindows);
                platform.setup((p) => p.isMac).returns(() => isOsx);
                platform.setup((p) => p.isLinux).returns(() => isLinux);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: common_1.PYTHON_PATH }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => []);
                await executor.initializeRepl();
            }
            test('Ensure terminal is created upon invoking initializeRepl (windows)', async () => {
                await ensureTerminalIsCreatedUponInvokingInitializeRepl(true, false, false);
            });
            test('Ensure terminal is created upon invoking initializeRepl (osx)', async () => {
                await ensureTerminalIsCreatedUponInvokingInitializeRepl(false, true, false);
            });
            test('Ensure terminal is created upon invoking initializeRepl (linux)', async () => {
                await ensureTerminalIsCreatedUponInvokingInitializeRepl(false, false, true);
            });
        });
        suite(testSuiteName, async function () {
            this.timeout(5000);
            setup(() => {
                terminalFactory
                    .setup((f) => f.getTerminalService(TypeMoq.It.isAny()))
                    .returns(() => terminalService.object);
            });
            async function ensureWeSetCurrentDriveBeforeChangingDirectory(_isWindows) {
                const file = vscode_1.Uri.file(path.join('d:', 'path', 'to', 'file', 'one.py'));
                terminalSettings.setup((t) => t.executeInFileDir).returns(() => true);
                workspace.setup((w) => w.rootPath).returns(() => path.join('c:', 'path', 'to'));
                workspaceFolder.setup((w) => w.uri).returns(() => vscode_1.Uri.file(path.join('c:', 'path', 'to')));
                platform.setup((p) => p.isWindows).returns(() => true);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: common_1.PYTHON_PATH }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => []);
                await executor.executeFile(file);
                terminalService.verify(async (t) => t.sendText(TypeMoq.It.isValue('d:')), TypeMoq.Times.once());
            }
            test('Ensure we set current drive before changing directory on windows', async () => {
                await ensureWeSetCurrentDriveBeforeChangingDirectory(true);
            });
            test('Ensure once set current drive before, we always send command to change the drive letter for subsequent executions', async () => {
                await ensureWeSetCurrentDriveBeforeChangingDirectory(true);
                const file = vscode_1.Uri.file(path.join('c:', 'path', 'to', 'file', 'one.py'));
                await executor.executeFile(file);
                terminalService.verify(async (t) => t.sendText(TypeMoq.It.isValue('c:')), TypeMoq.Times.once());
            });
            async function ensureWeDoNotChangeDriveIfDriveLetterSameAsFileDriveLetter(_isWindows) {
                const file = vscode_1.Uri.file(path.join('c:', 'path', 'to', 'file', 'one.py'));
                terminalSettings.setup((t) => t.executeInFileDir).returns(() => true);
                workspace.setup((w) => w.rootPath).returns(() => path.join('c:', 'path', 'to'));
                workspaceFolder.setup((w) => w.uri).returns(() => vscode_1.Uri.file(path.join('c:', 'path', 'to')));
                platform.setup((p) => p.isWindows).returns(() => true);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: common_1.PYTHON_PATH }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => []);
                await executor.executeFile(file);
                terminalService.verify(async (t) => t.sendText(TypeMoq.It.isValue('c:')), TypeMoq.Times.never());
            }
            test('Ensure we do not change drive if current drive letter is same as the file drive letter on windows', async () => {
                await ensureWeDoNotChangeDriveIfDriveLetterSameAsFileDriveLetter(true);
            });
            async function ensureWeSetCurrentDirectoryBeforeExecutingAFile(_isWindows) {
                const file = vscode_1.Uri.file(path.join('c', 'path', 'to', 'file', 'one.py'));
                terminalSettings.setup((t) => t.executeInFileDir).returns(() => true);
                workspace.setup((w) => w.getWorkspaceFolder(TypeMoq.It.isAny())).returns(() => workspaceFolder.object);
                workspaceFolder.setup((w) => w.uri).returns(() => vscode_1.Uri.file(path.join('c', 'path', 'to')));
                platform.setup((p) => p.isWindows).returns(() => false);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: common_1.PYTHON_PATH }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => []);
                await executor.executeFile(file);
                terminalService.verify(async (t) => t.sendText(TypeMoq.It.isValue(`cd ${path.dirname(file.fsPath).fileToCommandArgumentForPythonExt()}`)), TypeMoq.Times.once());
            }
            test('Ensure we set current directory before executing file (non windows)', async () => {
                await ensureWeSetCurrentDirectoryBeforeExecutingAFile(false);
            });
            test('Ensure we set current directory before executing file (windows)', async () => {
                await ensureWeSetCurrentDirectoryBeforeExecutingAFile(true);
            });
            async function ensureWeWetCurrentDirectoryAndQuoteBeforeExecutingFile(isWindows) {
                const file = vscode_1.Uri.file(path.join('c', 'path', 'to', 'file with spaces in path', 'one.py'));
                terminalSettings.setup((t) => t.executeInFileDir).returns(() => true);
                workspace.setup((w) => w.getWorkspaceFolder(TypeMoq.It.isAny())).returns(() => workspaceFolder.object);
                workspaceFolder.setup((w) => w.uri).returns(() => vscode_1.Uri.file(path.join('c', 'path', 'to')));
                platform.setup((p) => p.isWindows).returns(() => isWindows);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: common_1.PYTHON_PATH }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => []);
                await executor.executeFile(file);
                const dir = path.dirname(file.fsPath).fileToCommandArgumentForPythonExt();
                terminalService.verify(async (t) => t.sendText(TypeMoq.It.isValue(`cd ${dir}`)), TypeMoq.Times.once());
            }
            test('Ensure we set current directory (and quote it when containing spaces) before executing file (non windows)', async () => {
                await ensureWeWetCurrentDirectoryAndQuoteBeforeExecutingFile(false);
            });
            test('Ensure we set current directory (and quote it when containing spaces) before executing file (windows)', async () => {
                await ensureWeWetCurrentDirectoryAndQuoteBeforeExecutingFile(true);
            });
            async function ensureWeSetCurrentDirectoryBeforeExecutingFileInWorkspaceDirectory(isWindows) {
                const file = vscode_1.Uri.file(path.join('c', 'path', 'to', 'file with spaces in path', 'one.py'));
                terminalSettings.setup((t) => t.executeInFileDir).returns(() => true);
                workspace.setup((w) => w.getWorkspaceFolder(TypeMoq.It.isAny())).returns(() => workspaceFolder.object);
                workspaceFolder
                    .setup((w) => w.uri)
                    .returns(() => vscode_1.Uri.file(path.join('c', 'path', 'to', 'file with spaces in path')));
                platform.setup((p) => p.isWindows).returns(() => isWindows);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: common_1.PYTHON_PATH }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => []);
                await executor.executeFile(file);
                terminalService.verify(async (t) => t.sendText(TypeMoq.It.isAny()), TypeMoq.Times.once());
            }
            test('Ensure we set current directory before executing file if in the same directory as the current workspace (non windows)', async () => {
                await ensureWeSetCurrentDirectoryBeforeExecutingFileInWorkspaceDirectory(false);
            });
            test('Ensure we set current directory before executing file if in the same directory as the current workspace (windows)', async () => {
                await ensureWeSetCurrentDirectoryBeforeExecutingFileInWorkspaceDirectory(true);
            });
            async function ensureWeSetCurrentDirectoryBeforeExecutingFileNotInSameDirectory(isWindows) {
                const file = vscode_1.Uri.file(path.join('c', 'path', 'to', 'file with spaces in path', 'one.py'));
                terminalSettings.setup((t) => t.executeInFileDir).returns(() => true);
                workspace.setup((w) => w.getWorkspaceFolder(TypeMoq.It.isAny())).returns(() => undefined);
                platform.setup((p) => p.isWindows).returns(() => isWindows);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: common_1.PYTHON_PATH }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => []);
                await executor.executeFile(file);
                terminalService.verify(async (t) => t.sendText(TypeMoq.It.isAny()), TypeMoq.Times.once());
            }
            test('Ensure we set current directory before executing file if file is not in a workspace (non windows)', async () => {
                await ensureWeSetCurrentDirectoryBeforeExecutingFileNotInSameDirectory(false);
            });
            test('Ensure we set current directory before executing file if file is not in a workspace (windows)', async () => {
                await ensureWeSetCurrentDirectoryBeforeExecutingFileNotInSameDirectory(true);
            });
            async function testFileExecution(isWindows, pythonPath, terminalArgs, file) {
                platform.setup((p) => p.isWindows).returns(() => isWindows);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: pythonPath }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => terminalArgs);
                terminalSettings.setup((t) => t.executeInFileDir).returns(() => false);
                workspace.setup((w) => w.getWorkspaceFolder(TypeMoq.It.isAny())).returns(() => undefined);
                pythonExecutionFactory
                    .setup((p) => p.createCondaExecutionService(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve(undefined));
                await executor.executeFile(file);
                const expectedPythonPath = isWindows ? pythonPath.replace(/\\/g, '/') : pythonPath;
                const expectedArgs = terminalArgs.concat(file.fsPath.fileToCommandArgumentForPythonExt());
                terminalService.verify(async (t) => t.sendCommand(TypeMoq.It.isValue(expectedPythonPath), TypeMoq.It.isValue(expectedArgs)), TypeMoq.Times.once());
            }
            test('Ensure python file execution script is sent to terminal on windows', async () => {
                const file = vscode_1.Uri.file(path.join('c', 'path', 'to', 'file with spaces in path', 'one.py'));
                await testFileExecution(true, common_1.PYTHON_PATH, [], file);
            });
            test('Ensure python file execution script is sent to terminal on windows with fully qualified python path', async () => {
                const file = vscode_1.Uri.file(path.join('c', 'path', 'to', 'file with spaces in path', 'one.py'));
                await testFileExecution(true, 'c:\\program files\\python', [], file);
            });
            test('Ensure python file execution script is not quoted when no spaces in file path', async () => {
                const file = vscode_1.Uri.file(path.join('c', 'path', 'to', 'file', 'one.py'));
                await testFileExecution(true, common_1.PYTHON_PATH, [], file);
            });
            test('Ensure python file execution script supports custom python arguments', async () => {
                const file = vscode_1.Uri.file(path.join('c', 'path', 'to', 'file', 'one.py'));
                await testFileExecution(false, common_1.PYTHON_PATH, ['-a', '-b', '-c'], file);
            });
            async function testCondaFileExecution(pythonPath, terminalArgs, file, condaEnv) {
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: pythonPath }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => terminalArgs);
                terminalSettings.setup((t) => t.executeInFileDir).returns(() => false);
                workspace.setup((w) => w.getWorkspaceFolder(TypeMoq.It.isAny())).returns(() => undefined);
                const condaFile = 'conda';
                const procService = TypeMoq.Mock.ofType();
                sinon.stub(conda_1.Conda, 'getConda').resolves(new conda_1.Conda(condaFile));
                sinon.stub(conda_1.Conda.prototype, 'getCondaVersion').resolves(new semver_1.SemVer(conda_1.CONDA_RUN_VERSION));
                sinon.stub(conda_1.Conda.prototype, 'getInterpreterPathForEnvironment').resolves(pythonPath);
                const env = await (0, pythonEnvironment_1.createCondaEnv)(condaEnv, procService.object, fileSystem.object);
                if (!env) {
                    (0, chai_2.assert)(false, 'Should not be undefined for conda version 4.9.0');
                    return;
                }
                const procs = (0, pythonProcess_1.createPythonProcessService)(procService.object, env);
                const condaExecutionService = {
                    getInterpreterInformation: env.getInterpreterInformation,
                    getExecutablePath: env.getExecutablePath,
                    isModuleInstalled: env.isModuleInstalled,
                    getModuleVersion: env.getModuleVersion,
                    getExecutionInfo: env.getExecutionInfo,
                    execObservable: procs.execObservable,
                    execModuleObservable: procs.execModuleObservable,
                    exec: procs.exec,
                    execModule: procs.execModule,
                    execForLinter: procs.execForLinter,
                };
                pythonExecutionFactory
                    .setup((p) => p.createCondaExecutionService(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve(condaExecutionService));
                await executor.executeFile(file);
                const expectedArgs = [...terminalArgs, file.fsPath.fileToCommandArgumentForPythonExt()];
                terminalService.verify(async (t) => t.sendCommand(TypeMoq.It.isValue(pythonPath), TypeMoq.It.isValue(expectedArgs)), TypeMoq.Times.once());
            }
            test('Ensure conda args with conda env name are sent to terminal if there is a conda environment with a name', async () => {
                const file = vscode_1.Uri.file(path.join('c', 'path', 'to', 'file', 'one.py'));
                await testCondaFileExecution(common_1.PYTHON_PATH, ['-a', '-b', '-c'], file, {
                    name: 'foo-env',
                    path: 'path/to/foo-env',
                });
            });
            test('Ensure conda args with conda env path are sent to terminal if there is a conda environment without a name', async () => {
                const file = vscode_1.Uri.file(path.join('c', 'path', 'to', 'file', 'one.py'));
                await testCondaFileExecution(common_1.PYTHON_PATH, ['-a', '-b', '-c'], file, {
                    name: '',
                    path: 'path/to/foo-env',
                });
            });
            async function testReplCommandArguments(isWindows, pythonPath, expectedPythonPath, terminalArgs) {
                pythonExecutionFactory
                    .setup((p) => p.createCondaExecutionService(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve(undefined));
                platform.setup((p) => p.isWindows).returns(() => isWindows);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: pythonPath }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => terminalArgs);
                const expectedTerminalArgs = isDjangoRepl ? terminalArgs.concat(['manage.py', 'shell']) : terminalArgs;
                const replCommandArgs = await executor.getExecutableInfo();
                (0, chai_1.expect)(replCommandArgs).not.to.be.an('undefined', 'Command args is undefined');
                (0, chai_1.expect)(replCommandArgs.command).to.be.equal(expectedPythonPath, 'Incorrect python path');
                (0, chai_1.expect)(replCommandArgs.args).to.be.deep.equal(expectedTerminalArgs, 'Incorrect arguments');
            }
            test('Ensure fully qualified python path is escaped when building repl args on Windows', async () => {
                const pythonPath = 'c:\\program files\\python\\python.exe';
                const terminalArgs = ['-a', 'b', 'c'];
                await testReplCommandArguments(true, pythonPath, 'c:/program files/python/python.exe', terminalArgs);
            });
            test('Ensure fully qualified python path is returned as is, when building repl args on Windows', async () => {
                const pythonPath = 'c:/program files/python/python.exe';
                const terminalArgs = ['-a', 'b', 'c'];
                await testReplCommandArguments(true, pythonPath, pythonPath, terminalArgs);
            });
            test('Ensure python path is returned as is, when building repl args on Windows', async () => {
                const pythonPath = common_1.PYTHON_PATH;
                const terminalArgs = ['-a', 'b', 'c'];
                await testReplCommandArguments(true, pythonPath, pythonPath, terminalArgs);
            });
            test('Ensure fully qualified python path is returned as is, on non Windows', async () => {
                const pythonPath = 'usr/bin/python';
                const terminalArgs = ['-a', 'b', 'c'];
                await testReplCommandArguments(false, pythonPath, pythonPath, terminalArgs);
            });
            test('Ensure python path is returned as is, on non Windows', async () => {
                const pythonPath = common_1.PYTHON_PATH;
                const terminalArgs = ['-a', 'b', 'c'];
                await testReplCommandArguments(false, pythonPath, pythonPath, terminalArgs);
            });
            async function testReplCondaCommandArguments(pythonPath, terminalArgs, condaEnv) {
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: pythonPath }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => terminalArgs);
                const condaFile = 'conda';
                const procService = TypeMoq.Mock.ofType();
                sinon.stub(conda_1.Conda, 'getConda').resolves(new conda_1.Conda(condaFile));
                sinon.stub(conda_1.Conda.prototype, 'getCondaVersion').resolves(new semver_1.SemVer(conda_1.CONDA_RUN_VERSION));
                sinon.stub(conda_1.Conda.prototype, 'getInterpreterPathForEnvironment').resolves(pythonPath);
                const env = await (0, pythonEnvironment_1.createCondaEnv)(condaEnv, procService.object, fileSystem.object);
                if (!env) {
                    (0, chai_2.assert)(false, 'Should not be undefined for conda version 4.9.0');
                    return;
                }
                const procs = (0, pythonProcess_1.createPythonProcessService)(procService.object, env);
                const condaExecutionService = {
                    getInterpreterInformation: env.getInterpreterInformation,
                    getExecutablePath: env.getExecutablePath,
                    isModuleInstalled: env.isModuleInstalled,
                    getModuleVersion: env.getModuleVersion,
                    getExecutionInfo: env.getExecutionInfo,
                    execObservable: procs.execObservable,
                    execModuleObservable: procs.execModuleObservable,
                    exec: procs.exec,
                    execModule: procs.execModule,
                    execForLinter: procs.execForLinter,
                };
                pythonExecutionFactory
                    .setup((p) => p.createCondaExecutionService(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve(condaExecutionService));
                const djangoArgs = isDjangoRepl ? ['manage.py', 'shell'] : [];
                const expectedTerminalArgs = [...terminalArgs, ...djangoArgs];
                const replCommandArgs = await executor.getExecutableInfo();
                (0, chai_1.expect)(replCommandArgs).not.to.be.an('undefined', 'Conda command args are undefined');
                (0, chai_1.expect)(replCommandArgs.command).to.be.equal(pythonPath, 'Repl needs to use python, not conda');
                (0, chai_1.expect)(replCommandArgs.args).to.be.deep.equal(expectedTerminalArgs, 'Incorrect terminal arguments');
            }
            test('Ensure conda args with env name are returned when building repl args with a conda env with a name', async () => {
                await testReplCondaCommandArguments(common_1.PYTHON_PATH, ['-a', 'b', 'c'], {
                    name: 'foo-env',
                    path: 'path/to/foo-env',
                });
            });
            test('Ensure conda args with env path are returned when building repl args with a conda env without a name', async () => {
                await testReplCondaCommandArguments(common_1.PYTHON_PATH, ['-a', 'b', 'c'], {
                    name: '',
                    path: 'path/to/foo-env',
                });
            });
            test('Ensure nothing happens when blank text is sent to the terminal', async () => {
                await executor.execute('');
                await executor.execute('   ');
                await executor.execute(undefined);
                terminalService.verify(async (t) => t.sendCommand(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.never());
                terminalService.verify(async (t) => t.sendText(TypeMoq.It.isAny()), TypeMoq.Times.never());
            });
            test('Ensure repl is initialized once before sending text to the repl', async () => {
                const pythonPath = 'usr/bin/python1234';
                const terminalArgs = ['-a', 'b', 'c'];
                platform.setup((p) => p.isWindows).returns(() => false);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: pythonPath }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => terminalArgs);
                await executor.execute('cmd1');
                await executor.execute('cmd2');
                await executor.execute('cmd3');
                const expectedTerminalArgs = isDjangoRepl ? terminalArgs.concat(['manage.py', 'shell']) : terminalArgs;
                terminalService.verify(async (t) => t.sendCommand(TypeMoq.It.isValue(pythonPath), TypeMoq.It.isValue(expectedTerminalArgs)), TypeMoq.Times.once());
            });
            test('Ensure repl is re-initialized when terminal is closed', async () => {
                const pythonPath = 'usr/bin/python1234';
                const terminalArgs = ['-a', 'b', 'c'];
                platform.setup((p) => p.isWindows).returns(() => false);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: pythonPath }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => terminalArgs);
                let closeTerminalCallback;
                terminalService
                    .setup((t) => t.onDidCloseTerminal(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny()))
                    .returns((callback) => {
                    closeTerminalCallback = callback;
                    return {
                        dispose: misc_1.noop,
                    };
                });
                await executor.execute('cmd1');
                await executor.execute('cmd2');
                await executor.execute('cmd3');
                const expectedTerminalArgs = isDjangoRepl ? terminalArgs.concat(['manage.py', 'shell']) : terminalArgs;
                (0, chai_1.expect)(closeTerminalCallback).not.to.be.an('undefined', 'Callback not initialized');
                terminalService.verify(async (t) => t.sendCommand(TypeMoq.It.isValue(pythonPath), TypeMoq.It.isValue(expectedTerminalArgs)), TypeMoq.Times.once());
                closeTerminalCallback.call(terminalService.object);
                await executor.execute('cmd4');
                terminalService.verify(async (t) => t.sendCommand(TypeMoq.It.isValue(pythonPath), TypeMoq.It.isValue(expectedTerminalArgs)), TypeMoq.Times.exactly(2));
                closeTerminalCallback.call(terminalService.object);
                await executor.execute('cmd5');
                terminalService.verify(async (t) => t.sendCommand(TypeMoq.It.isValue(pythonPath), TypeMoq.It.isValue(expectedTerminalArgs)), TypeMoq.Times.exactly(3));
            });
            test('Ensure code is sent to terminal', async () => {
                const pythonPath = 'usr/bin/python1234';
                const terminalArgs = ['-a', 'b', 'c'];
                platform.setup((p) => p.isWindows).returns(() => false);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: pythonPath }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => terminalArgs);
                await executor.execute('cmd1');
                terminalService.verify(async (t) => t.sendText('cmd1'), TypeMoq.Times.once());
                await executor.execute('cmd2');
                terminalService.verify(async (t) => t.sendText('cmd2'), TypeMoq.Times.once());
            });
            test('Ensure code is sent to the same terminal for a particular resource', async () => {
                const resource = vscode_1.Uri.file('a');
                terminalFactory.reset();
                terminalFactory
                    .setup((f) => f.getTerminalService(TypeMoq.It.isAny()))
                    .callback((options) => {
                    chai_2.assert.deepEqual(options.resource, resource);
                })
                    .returns(() => terminalService.object);
                const pythonPath = 'usr/bin/python1234';
                const terminalArgs = ['-a', 'b', 'c'];
                platform.setup((p) => p.isWindows).returns(() => false);
                interpreterService
                    .setup((s) => s.getActiveInterpreter(TypeMoq.It.isAny()))
                    .returns(() => Promise.resolve({ path: pythonPath }));
                terminalSettings.setup((t) => t.launchArgs).returns(() => terminalArgs);
                await executor.execute('cmd1', resource);
                terminalService.verify(async (t) => t.sendText('cmd1'), TypeMoq.Times.once());
                await executor.execute('cmd2', resource);
                terminalService.verify(async (t) => t.sendText('cmd2'), TypeMoq.Times.once());
            });
        });
    });
});
//# sourceMappingURL=terminalCodeExec.unit.test.js.map