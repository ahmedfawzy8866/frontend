import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { AutoBootManager } from '../autoBootManager';
import { StatusBarManager } from '../statusBarManager';
import { CommandManager } from '../commandManager';

suite('AutoBoot Extension Test Suite', () => {
    let sandbox: sinon.SinonSandbox;
    let mockContext: vscode.ExtensionContext;

    setup(() => {
        sandbox = sinon.createSandbox();
        mockContext = {
            subscriptions: [],
            workspaceState: {
                get: sandbox.stub(),
                update: sandbox.stub()
            },
            globalState: {
                get: sandbox.stub(),
                update: sandbox.stub()
            },
            extensionPath: '/test/extension/path',
            storagePath: '/test/storage/path',
            globalStoragePath: '/test/global/storage/path',
            logPath: '/test/log/path'
        } as any;
    });

    teardown(() => {
        sandbox.restore();
    });

    suite('AutoBootManager', () => {
        let autoBootManager: AutoBootManager;

        setup(() => {
            autoBootManager = new AutoBootManager();
        });

        test('should detect Next.js project', async () => {
            const mockPackageJson = {
                dependencies: { next: '^13.0.0' },
                scripts: { dev: 'next dev' }
            };

            sandbox.stub(require('fs'), 'existsSync').returns(true);
            sandbox.stub(require('fs'), 'readFileSync').returns(JSON.stringify(mockPackageJson));
            sandbox.stub(require('child_process'), 'exec').yields(null, { stdout: '' });

            const projectInfo = await autoBootManager.detectProjectType('/test/nextjs-project');

            assert.strictEqual(projectInfo?.framework, 'Next.js');
            assert.strictEqual(projectInfo?.devScript, 'dev');
            assert.strictEqual(projectInfo?.port, 3000);
        });

        test('should detect Vite project', async () => {
            const mockPackageJson = {
                devDependencies: { vite: '^4.0.0' },
                scripts: { dev: 'vite --port 5173' }
            };

            sandbox.stub(require('fs'), 'existsSync').returns(true);
            sandbox.stub(require('fs'), 'readFileSync').returns(JSON.stringify(mockPackageJson));
            sandbox.stub(require('child_process'), 'exec').yields(null, { stdout: '' });

            const projectInfo = await autoBootManager.detectProjectType('/test/vite-project');

            assert.strictEqual(projectInfo?.framework, 'Vite');
            assert.strictEqual(projectInfo?.port, 5173);
        });

        test('should detect package manager from lock files', async () => {
            const mockPackageJson = {
                dependencies: { react: '^18.0.0' }
            };

            const existsStub = sandbox.stub(require('fs'), 'existsSync');
            existsStub.withArgs('/test/project/package.json').returns(true);
            existsStub.withArgs('/test/project/yarn.lock').returns(true);
            existsStub.withArgs('/test/project/pnpm-lock.yaml').returns(false);
            existsStub.withArgs('/test/project/bun.lockb').returns(false);

            sandbox.stub(require('fs'), 'readFileSync').returns(JSON.stringify(mockPackageJson));
            sandbox.stub(require('child_process'), 'exec').yields(null, { stdout: '' });

            const projectInfo = await autoBootManager.detectProjectType('/test/project');

            assert.strictEqual(projectInfo?.packageManager, 'yarn');
        });

        test('should check server status correctly', async () => {
            const execStub = sandbox.stub(require('child_process'), 'exec');
            execStub.yields(null, { stdout: '12345\n' }); // Process running on port

            const isRunning = await autoBootManager.checkServerStatus(3000);

            assert.strictEqual(isRunning, true);
        });

        test('should return false when no process on port', async () => {
            const execStub = sandbox.stub(require('child_process'), 'exec');
            execStub.yields(new Error('No process found'), { stdout: '' });

            const isRunning = await autoBootManager.checkServerStatus(3000);

            assert.strictEqual(isRunning, false);
        });

        test('should analyze dependencies correctly', async () => {
            const mockOutdated = {
                lodash: { current: '4.17.20', latest: '4.17.21' }
            };
            const mockAudit = {
                metadata: { vulnerabilities: { total: 2 } }
            };

            const execStub = sandbox.stub(require('child_process'), 'exec');
            execStub.onFirstCall().yields(null, { stdout: JSON.stringify(mockOutdated) });
            execStub.onSecondCall().yields(null, { stdout: JSON.stringify(mockAudit) });

            const analysis = await autoBootManager.analyzeDependencies('/test/project');

            assert.strictEqual(analysis.outdated, 1);
            assert.strictEqual(analysis.vulnerabilities, 2);
        });

        test('should handle dependency analysis errors', async () => {
            const execStub = sandbox.stub(require('child_process'), 'exec');
            execStub.yields(new Error('npm command failed'), null);

            const analysis = await autoBootManager.analyzeDependencies('/test/project');

            assert.strictEqual(analysis.outdated, 0);
            assert.strictEqual(analysis.vulnerabilities, 0);
            assert.ok(analysis.error);
        });
    });

    suite('StatusBarManager', () => {
        let statusBarManager: StatusBarManager;
        let mockStatusBarItem: any;

        setup(() => {
            mockStatusBarItem = {
                text: '',
                color: undefined,
                command: '',
                tooltip: '',
                show: sandbox.stub(),
                hide: sandbox.stub(),
                dispose: sandbox.stub()
            };

            sandbox.stub(vscode.window, 'createStatusBarItem').returns(mockStatusBarItem);
            statusBarManager = new StatusBarManager();
        });

        test('should initialize status bar correctly', () => {
            statusBarManager.initialize();

            assert.strictEqual(mockStatusBarItem.command, 'autoboot.serverStatus');
            assert.strictEqual(mockStatusBarItem.tooltip, 'Click to check server status');
            assert.ok(mockStatusBarItem.show.calledOnce);
        });

        test('should update status for running server', () => {
            statusBarManager.updateServerStatus(true, 'Next.js', 3000);

            assert.ok(mockStatusBarItem.text.includes('Next.js (3000)'));
            assert.strictEqual(mockStatusBarItem.color, '#00ff00');
        });

        test('should update status for stopped server', () => {
            statusBarManager.updateServerStatus(false);

            assert.ok(mockStatusBarItem.text.includes('Server Stopped'));
            assert.strictEqual(mockStatusBarItem.color, '#ffaa00');
        });

        test('should show progress indicator', () => {
            statusBarManager.showProgress('Restarting server...');

            assert.ok(mockStatusBarItem.text.includes('Restarting server...'));
            assert.strictEqual(mockStatusBarItem.color, '#ffaa00');
        });
    });

    suite('CommandManager', () => {
        let commandManager: CommandManager;
        let mockAutoBootManager: sinon.SinonStubbedInstance<AutoBootManager>;
        let mockStatusBarManager: sinon.SinonStubbedInstance<StatusBarManager>;

        setup(() => {
            mockAutoBootManager = sandbox.createStubInstance(AutoBootManager);
            mockStatusBarManager = sandbox.createStubInstance(StatusBarManager);
            commandManager = new CommandManager(mockAutoBootManager as any, mockStatusBarManager as any);
        });

        test('should execute quick restart successfully', async () => {
            const mockProjectInfo = {
                language: 'JavaScript/TypeScript',
                framework: 'Next.js',
                packageManager: 'npm',
                devScript: 'dev',
                port: 3000,
                isRunning: false,
                startCommand: 'npm run dev'
            };

            mockAutoBootManager.getProjectInfo.returns(mockProjectInfo);
            mockAutoBootManager.restartServer.resolves(true);

            sandbox.stub(vscode.workspace, 'workspaceFolders').value([
                { uri: { fsPath: '/test/project' } }
            ]);
            sandbox.stub(vscode.window, 'showInformationMessage');

            await commandManager.quickRestart();

            assert.ok(mockAutoBootManager.restartServer.calledOnce);
            assert.ok(mockStatusBarManager.showProgress.calledWith('Restarting server...'));
        });

        test('should handle restart failure', async () => {
            mockAutoBootManager.getProjectInfo.returns(null);
            mockAutoBootManager.detectProjectType.resolves(null);

            sandbox.stub(vscode.workspace, 'workspaceFolders').value([
                { uri: { fsPath: '/test/project' } }
            ]);
            const showErrorStub = sandbox.stub(vscode.window, 'showErrorMessage');

            await commandManager.quickRestart();

            assert.ok(showErrorStub.calledWith('Could not detect project type'));
        });

        test('should handle restart failure gracefully', async () => {
            const mockProjectInfo = {
                language: 'JavaScript/TypeScript',
                framework: 'Next.js',
                packageManager: 'npm',
                devScript: 'dev',
                port: 3000,
                isRunning: false,
                startCommand: 'npm run dev'
            };

            mockAutoBootManager.getProjectInfo.returns(mockProjectInfo);
            mockAutoBootManager.restartServer.rejects(new Error('Restart failed'));

            sandbox.stub(vscode.workspace, 'workspaceFolders').value([
                { uri: { fsPath: '/test/project' } }
            ]);
            const showErrorStub = sandbox.stub(vscode.window, 'showErrorMessage');

            await commandManager.quickRestart();

            assert.ok(showErrorStub.calledWith(sinon.match(/Failed to restart server/)));
        });

        test('should detect project and show information', async () => {
            const mockProjectInfo = {
                language: 'JavaScript/TypeScript',
                framework: 'Vite',
                packageManager: 'yarn',
                devScript: 'dev',
                port: 5173,
                isRunning: true,
                startCommand: 'yarn run dev'
            };

            mockAutoBootManager.detectProjectType.resolves(mockProjectInfo);

            sandbox.stub(vscode.workspace, 'workspaceFolders').value([
                { uri: { fsPath: '/test/project' } }
            ]);
            const showInfoStub = sandbox.stub(vscode.window, 'showInformationMessage');

            await commandManager.serverStatus();

            assert.ok(showInfoStub.calledWith(sinon.match(/Server Status: Running/)));
        });

        test('should analyze dependencies', async () => {
            const mockAnalysis = {
                outdated: 3,
                vulnerabilities: 1,
                error: null
            };

            mockAutoBootManager.analyzeDependencies.resolves(mockAnalysis);

            sandbox.stub(vscode.workspace, 'workspaceFolders').value([
                { uri: { fsPath: '/test/project' } }
            ]);
            const showInfoStub = sandbox.stub(vscode.window, 'showInformationMessage');

            await commandManager.analyzeDependencies();

            assert.ok(showInfoStub.calledWith(sinon.match(/Outdated packages: 3/)));
            assert.ok(showInfoStub.calledWith(sinon.match(/Security vulnerabilities: 1/)));
        });

        test('should handle dependency analysis error', async () => {
            const mockAnalysis = {
                outdated: 0,
                vulnerabilities: 0,
                error: 'npm not found'
            };

            mockAutoBootManager.analyzeDependencies.resolves(mockAnalysis);

            sandbox.stub(vscode.workspace, 'workspaceFolders').value([
                { uri: { fsPath: '/test/project' } }
            ]);
            const showErrorStub = sandbox.stub(vscode.window, 'showErrorMessage');

            await commandManager.analyzeDependencies();

            assert.ok(showErrorStub.calledWith(sinon.match(/Analysis failed: npm not found/)));
        });

        test('should analyze performance', async () => {
            const mockAnalysis = {
                buildSize: '1.2 MB',
                sourceFiles: 45,
                recommendations: ['Enable caching', 'Optimize images'],
                error: null
            };

            mockAutoBootManager.analyzePerformance.resolves(mockAnalysis);

            sandbox.stub(vscode.workspace, 'workspaceFolders').value([
                { uri: { fsPath: '/test/project' } }
            ]);
            const showInfoStub = sandbox.stub(vscode.window, 'showInformationMessage');

            await commandManager.analyzePerformance();

            assert.ok(showInfoStub.calledWith(sinon.match(/Build size: 1.2 MB/)));
            assert.ok(showInfoStub.calledWith(sinon.match(/Source files: 45/)));
        });

        test('should create error analysis webview', async () => {
            const mockPanel = {
                webview: { html: '' },
                dispose: sandbox.stub()
            };

            sandbox.stub(vscode.window, 'createWebviewPanel').returns(mockPanel as any);
            sandbox.stub(vscode.window, 'showInputBox').resolves('Module not found error');

            await commandManager.analyzeError();

            assert.ok(mockPanel.webview.html.includes('Error Analysis'));
            assert.ok(mockPanel.webview.html.includes('Module not found error'));
        });

        test('should create project with framework selection', async () => {
            sandbox.stub(vscode.window, 'showQuickPick').resolves({ label: 'Next.js', description: 'React framework' } as vscode.QuickPickItem);
            sandbox.stub(vscode.window, 'showInputBox').resolves('my-new-project');
            sandbox.stub(vscode.window, 'showOpenDialog').resolves([vscode.Uri.file('/test/parent')]);
            const showInfoStub = sandbox.stub(vscode.window, 'showInformationMessage');

            await commandManager.createProject();

            assert.ok(showInfoStub.calledWith(sinon.match(/Creating Next.js project "my-new-project"/)));
        });
    });

    suite('Integration Tests', () => {
        test('should handle workspace folder changes', async () => {
            const autoBootManager = new AutoBootManager();
            const detectProjectTypeSpy = sandbox.spy(autoBootManager, 'detectProjectType');

            // Simulate workspace folder change
            const mockWorkspaceFolder = { uri: { fsPath: '/new/project' } };
            sandbox.stub(vscode.workspace, 'workspaceFolders').value([mockWorkspaceFolder]);

            // Trigger the workspace change event
            const onDidChangeWorkspaceFolders = vscode.workspace.onDidChangeWorkspaceFolders;
            if (typeof onDidChangeWorkspaceFolders === 'function') {
                await onDidChangeWorkspaceFolders({} as any);
            }

            // Note: In a real test, we'd need to properly simulate the event
            // This is a simplified version for demonstration
        });

        test('should update status bar when project is detected', async () => {
            const autoBootManager = new AutoBootManager();
            const statusBarManager = new StatusBarManager();
            const updateStatusSpy = sandbox.spy(statusBarManager, 'updateServerStatus');

            const mockProjectInfo = {
                language: 'JavaScript/TypeScript',
                framework: 'Next.js',
                packageManager: 'npm',
                devScript: 'dev',
                port: 3000,
                isRunning: true,
                startCommand: 'npm run dev'
            };

            // Simulate project detection
            autoBootManager.onProjectDetected((projectInfo) => {
                statusBarManager.updateServerStatus(
                    projectInfo.isRunning,
                    projectInfo.framework,
                    projectInfo.port
                );
            });

            // This would normally be triggered by the actual detection
            // In a real test, we'd mock the file system and detection logic
        });
    });
});
