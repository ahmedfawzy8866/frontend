"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const vscode = __importStar(require("vscode"));
class CommandManager {
    constructor(autoBootManager, statusBarManager) {
        this.autoBootManager = autoBootManager;
        this.statusBarManager = statusBarManager;
    }
    async quickRestart() {
        try {
            this.statusBarManager.showProgress('Restarting server...');
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder found');
                return;
            }
            // Detect project if not already detected
            let projectInfo = this.autoBootManager.getProjectInfo();
            if (!projectInfo) {
                await this.autoBootManager.detectProjectType(workspaceFolder.uri.fsPath);
                projectInfo = this.autoBootManager.getProjectInfo();
            }
            if (!projectInfo) {
                vscode.window.showErrorMessage('Could not detect project type');
                return;
            }
            await this.autoBootManager.restartServer();
            vscode.window.showInformationMessage(`${projectInfo.framework} server restarted successfully!`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Restart failed: ${error}`);
            this.statusBarManager.updateStatus('error', 'Restart Failed');
        }
    }
    async detectProject() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }
        const projectInfo = await this.autoBootManager.detectProjectType(workspaceFolder.uri.fsPath);
        if (projectInfo) {
            vscode.window.showInformationMessage(`Detected ${projectInfo.framework} project using ${projectInfo.packageManager}`);
        }
        else {
            vscode.window.showWarningMessage('Could not detect project type');
        }
    }
    async serverStatus() {
        const projectInfo = this.autoBootManager.getProjectInfo();
        if (!projectInfo) {
            vscode.window.showWarningMessage('No project detected. Run "Detect Project Type" first.');
            return;
        }
        const status = projectInfo.isRunning ? 'Running' : 'Stopped';
        const message = `Server Status: ${status}
Framework: ${projectInfo.framework}
Port: ${projectInfo.port}`;
        vscode.window.showInformationMessage(message);
    }
    async analyzeDependencies() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }
        try {
            this.statusBarManager.showProgress('Analyzing dependencies...');
            const analysis = await this.autoBootManager.analyzeDependencies(workspaceFolder.uri.fsPath);
            if (analysis.error) {
                vscode.window.showErrorMessage(`Analysis failed: ${analysis.error}`);
                return;
            }
            const message = `Dependencies Analysis:
• Outdated packages: ${analysis.outdated}
• Security vulnerabilities: ${analysis.vulnerabilities}`;
            vscode.window.showInformationMessage(message);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Dependency analysis failed: ${error}`);
        }
        finally {
            // Restore status
            const projectInfo = this.autoBootManager.getProjectInfo();
            if (projectInfo) {
                this.statusBarManager.updateServerStatus(projectInfo.isRunning, projectInfo.framework, projectInfo.port);
            }
        }
    }
    async analyzePerformance() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }
        try {
            this.statusBarManager.showProgress('Analyzing performance...');
            const analysis = await this.autoBootManager.analyzePerformance(workspaceFolder.uri.fsPath);
            if (analysis.error) {
                vscode.window.showErrorMessage(`Analysis failed: ${analysis.error}`);
                return;
            }
            const message = `Performance Analysis:
• Build size: ${analysis.buildSize}
• Source files: ${analysis.sourceFiles}
• Recommendations: ${analysis.recommendations.length}`;
            vscode.window.showInformationMessage(message);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Performance analysis failed: ${error}`);
        }
        finally {
            // Restore status
            const projectInfo = this.autoBootManager.getProjectInfo();
            if (projectInfo) {
                this.statusBarManager.updateServerStatus(projectInfo.isRunning, projectInfo.framework, projectInfo.port);
            }
        }
    }
    async analyzeError() {
        const editor = vscode.window.activeTextEditor;
        let errorText = '';
        if (editor && editor.selection && !editor.selection.isEmpty) {
            errorText = editor.document.getText(editor.selection);
        }
        if (!errorText) {
            errorText = await vscode.window.showInputBox({
                prompt: 'Enter the error message to analyze',
                placeHolder: 'Paste your error message here...'
            }) || '';
        }
        if (!errorText) {
            return;
        }
        // Simple error analysis
        const suggestions = this.getErrorSuggestions(errorText);
        const panel = vscode.window.createWebviewPanel('autoboot.errorAnalysis', 'AutoBoot Error Analysis', vscode.ViewColumn.Two, { enableScripts: true });
        panel.webview.html = this.getErrorAnalysisHtml(errorText, suggestions);
    }
    getErrorSuggestions(errorText) {
        const suggestions = [];
        if (errorText.includes('Module not found')) {
            suggestions.push('Check if the module is installed: npm list <module-name>');
            suggestions.push('Install missing dependency: npm install <module-name>');
            suggestions.push('Verify import path and file extension');
        }
        if (errorText.includes('SyntaxError')) {
            suggestions.push('Check for missing brackets, semicolons, or quotes');
            suggestions.push('Verify proper indentation and syntax');
            suggestions.push('Use ESLint to catch syntax errors');
        }
        if (errorText.includes('TypeError')) {
            suggestions.push('Check variable declarations and types');
            suggestions.push('Verify function calls and method names');
            suggestions.push('Add proper null checks');
        }
        if (errorText.includes('Port') && errorText.includes('in use')) {
            suggestions.push('Kill the process using the port: lsof -ti:<port> | xargs kill');
            suggestions.push('Use a different port in your configuration');
            suggestions.push('Check for other running development servers');
        }
        if (suggestions.length === 0) {
            suggestions.push('Review the full error stack trace');
            suggestions.push('Check recent code changes');
            suggestions.push('Search for similar issues online');
        }
        return suggestions;
    }
    getErrorAnalysisHtml(errorText, suggestions) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; }
                .error-box { background: #2d1b1b; border-left: 4px solid #f14c4c; padding: 15px; margin: 10px 0; }
                .suggestions { background: #1e2124; padding: 15px; border-radius: 5px; margin: 10px 0; }
                .suggestion { margin: 8px 0; padding: 8px; background: #36393f; border-radius: 3px; }
                h2 { color: #f14c4c; }
                h3 { color: #7289da; }
            </style>
        </head>
        <body>
            <h2>🐛 Error Analysis</h2>
            
            <h3>Error Message:</h3>
            <div class="error-box">
                <pre>${errorText}</pre>
            </div>
            
            <h3>💡 Suggested Solutions:</h3>
            <div class="suggestions">
                ${suggestions.map(s => `<div class="suggestion">• ${s}</div>`).join('')}
            </div>
            
            <h3>🔧 Quick Actions:</h3>
            <div class="suggestions">
                <div class="suggestion">• Run dependency analysis to check for missing packages</div>
                <div class="suggestion">• Use performance analysis to identify potential issues</div>
                <div class="suggestion">• Check server status and restart if needed</div>
            </div>
        </body>
        </html>`;
    }
    async createProject() {
        const frameworks = [
            'Next.js',
            'Vite (React)',
            'Vite (Vue)',
            'Angular',
            'Express',
            'Svelte',
            'Nuxt.js'
        ];
        const framework = await vscode.window.showQuickPick(frameworks, {
            placeHolder: 'Select a framework for your new project'
        });
        if (!framework) {
            return;
        }
        const projectName = await vscode.window.showInputBox({
            prompt: 'Enter project name',
            placeHolder: 'my-awesome-project'
        });
        if (!projectName) {
            return;
        }
        const folderUri = await vscode.window.showOpenDialog({
            canSelectFolders: true,
            canSelectFiles: false,
            canSelectMany: false,
            openLabel: 'Select Parent Folder'
        });
        if (!folderUri || folderUri.length === 0) {
            return;
        }
        // This would integrate with our scaffolding tool
        vscode.window.showInformationMessage(`Creating ${framework} project "${projectName}" - this would use our scaffolding system!`);
    }
    async openDashboard() {
        const panel = vscode.window.createWebviewPanel('autoboot.dashboard', 'AutoBoot Dashboard', vscode.ViewColumn.One, { enableScripts: true });
        const projectInfo = this.autoBootManager.getProjectInfo();
        panel.webview.html = this.getDashboardHtml(projectInfo);
    }
    getDashboardHtml(projectInfo) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #1e1e1e; color: #cccccc; }
                .card { background: #2d2d30; padding: 20px; margin: 15px 0; border-radius: 8px; border: 1px solid #3e3e42; }
                .status-running { color: #4ec9b0; }
                .status-stopped { color: #f48771; }
                .metric { display: inline-block; margin: 10px 20px 10px 0; }
                .metric-value { font-size: 24px; font-weight: bold; display: block; }
                .metric-label { font-size: 12px; color: #969696; }
                h1 { color: #569cd6; }
                h2 { color: #dcdcaa; }
                .quick-action { background: #0e639c; color: white; padding: 10px 15px; margin: 5px; border: none; border-radius: 4px; cursor: pointer; }
            </style>
        </head>
        <body>
            <h1>🚀 AutoBoot Dashboard</h1>
            
            ${projectInfo ? `
            <div class="card">
                <h2>Project Status</h2>
                <p><strong>Framework:</strong> ${projectInfo.framework}</p>
                <p><strong>Package Manager:</strong> ${projectInfo.packageManager}</p>
                <p><strong>Dev Script:</strong> ${projectInfo.devScript}</p>
                <p><strong>Port:</strong> ${projectInfo.port}</p>
                <p><strong>Status:</strong> <span class="${projectInfo.isRunning ? 'status-running' : 'status-stopped'}">${projectInfo.isRunning ? 'Running' : 'Stopped'}</span></p>
            </div>
            ` : `
            <div class="card">
                <h2>No Project Detected</h2>
                <p>Open a project folder to get started with AutoBoot.</p>
            </div>
            `}
            
            <div class="card">
                <h2>Quick Actions</h2>
                <button class="quick-action" onclick="vscode.postMessage({command: 'quickRestart'})">🔄 Quick Restart</button>
                <button class="quick-action" onclick="vscode.postMessage({command: 'analyzeDeps'})">📦 Analyze Dependencies</button>
                <button class="quick-action" onclick="vscode.postMessage({command: 'analyzePerf'})">⚡ Analyze Performance</button>
                <button class="quick-action" onclick="vscode.postMessage({command: 'createProject'})">🏗️ Create Project</button>
            </div>
            
            <div class="card">
                <h2>Features</h2>
                <ul>
                    <li>🔍 Smart project detection for 10+ frameworks</li>
                    <li>🔄 One-click server restart</li>
                    <li>📦 Dependency analysis and optimization</li>
                    <li>⚡ Performance insights and recommendations</li>
                    <li>🐛 AI-powered error analysis</li>
                    <li>🏗️ Project scaffolding with best practices</li>
                </ul>
            </div>
            
            <script>
                const vscode = acquireVsCodeApi();
                
                window.addEventListener('message', event => {
                    const message = event.data;
                    switch (message.command) {
                        case 'quickRestart':
                            vscode.postMessage({command: 'autoboot.quickRestart'});
                            break;
                        case 'analyzeDeps':
                            vscode.postMessage({command: 'autoboot.analyzeDependencies'});
                            break;
                        case 'analyzePerf':
                            vscode.postMessage({command: 'autoboot.analyzePerformance'});
                            break;
                        case 'createProject':
                            vscode.postMessage({command: 'autoboot.createProject'});
                            break;
                    }
                });
            </script>
        </body>
        </html>`;
    }
    async chooseRunOption() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }
        // Detect project if not already detected
        let projectInfo = this.autoBootManager.getProjectInfo();
        if (!projectInfo) {
            await this.autoBootManager.detectProjectType(workspaceFolder.uri.fsPath);
            projectInfo = this.autoBootManager.getProjectInfo();
        }
        if (!projectInfo) {
            vscode.window.showErrorMessage('No project detected. Please open a supported project.');
            return;
        }
        const options = [];
        const language = projectInfo.language;
        const framework = projectInfo.framework;
        // Add regular run option
        const runEmoji = this.getLanguageEmoji(language);
        options.push({
            label: `🚀 Regular Run`,
            description: projectInfo.startCommand,
            detail: `Run using ${projectInfo.packageManager} (${framework})`
        });
        // Add Docker option if available
        if (projectInfo.hasDockerfile) {
            const dockerCommand = this.getDockerCommand(workspaceFolder.uri.fsPath);
            options.push({
                label: '🐳 Docker Run',
                description: dockerCommand || 'docker-compose up',
                detail: 'Run using Docker container'
            });
        }
        // Add language-specific main file/class options
        if (language === 'Java' && projectInfo.mainClasses && projectInfo.mainClasses.length > 0) {
            projectInfo.mainClasses.forEach((mainClass, index) => {
                const mainClassCommand = projectInfo.packageManager === 'maven'
                    ? `mvn exec:java -Dexec.mainClass="${mainClass}"`
                    : `./gradlew run -PmainClass=${mainClass}`;
                options.push({
                    label: `☕ Main Class ${index + 1}`,
                    description: mainClassCommand,
                    detail: `Run main class: ${mainClass}`
                });
            });
        }
        // Add main file options for other languages
        if (projectInfo.mainFiles && projectInfo.mainFiles.length > 0) {
            projectInfo.mainFiles.forEach((mainFile, index) => {
                const mainFileCommand = this.getMainFileCommand(language, projectInfo.packageManager, mainFile);
                if (mainFileCommand) {
                    options.push({
                        label: `${runEmoji} Main File ${index + 1}`,
                        description: mainFileCommand,
                        detail: `Run main file: ${mainFile}`
                    });
                }
            });
        }
        // Add framework-specific options
        const frameworkOptions = this.getFrameworkSpecificOptions(language, framework, projectInfo);
        options.push(...frameworkOptions);
        // Add README instructions if available
        if (projectInfo.readmeInstructions && projectInfo.readmeInstructions.length > 0) {
            projectInfo.readmeInstructions.forEach((instruction, index) => {
                options.push({
                    label: `📖 README Option ${index + 1}`,
                    description: instruction,
                    detail: 'Command found in README'
                });
            });
        }
        const selected = await vscode.window.showQuickPick(options, {
            placeHolder: `Choose how to run your ${language} project`,
            title: `AutoBoot: Run Options (${framework})`
        });
        if (selected) {
            // Execute the selected command
            const terminal = vscode.window.createTerminal('AutoBoot Run');
            terminal.sendText(selected.description);
            terminal.show();
            vscode.window.showInformationMessage(`Running: ${selected.description}`);
        }
    }
    getDockerCommand(projectPath) {
        const fs = require('fs');
        const path = require('path');
        if (fs.existsSync(path.join(projectPath, 'docker-compose.yml')) ||
            fs.existsSync(path.join(projectPath, 'docker-compose.yaml'))) {
            return 'docker-compose up';
        }
        else if (fs.existsSync(path.join(projectPath, 'Dockerfile'))) {
            return 'docker build -t app . && docker run -p 8080:8080 app';
        }
        return null;
    }
    getLanguageEmoji(language) {
        const emojiMap = {
            'JavaScript': '🟨',
            'TypeScript': '🔷',
            'Java': '☕',
            'Python': '🐍',
            'Clojure': '🔵',
            'Go': '🐹',
            'C#': '🔷',
            'VB.NET': '🔷',
            'F#': '🔷',
            'Rust': '🦀',
            'Ruby': '💎',
            'PHP': '🐘'
        };
        return emojiMap[language] || '📁';
    }
    getMainFileCommand(language, packageManager, mainFile) {
        switch (language) {
            case 'Go':
                if (mainFile.endsWith('.go')) {
                    return `go run ${mainFile}`;
                }
                break;
            case 'Python':
                if (mainFile.endsWith('.py')) {
                    return packageManager === 'poetry' ? `poetry run python ${mainFile}` : `python ${mainFile}`;
                }
                break;
            case 'Ruby':
                if (mainFile.endsWith('.rb')) {
                    return packageManager === 'bundle' ? `bundle exec ruby ${mainFile}` : `ruby ${mainFile}`;
                }
                break;
            case 'PHP':
                if (mainFile.endsWith('.php')) {
                    return `php ${mainFile}`;
                }
                break;
            case 'Rust':
                if (mainFile.includes('main.rs')) {
                    return 'cargo run';
                }
                break;
            case 'C#':
            case 'VB.NET':
            case 'F#':
                if (mainFile.endsWith('.cs') || mainFile.endsWith('.vb') || mainFile.endsWith('.fs')) {
                    return 'dotnet run';
                }
                break;
            case 'JavaScript':
            case 'TypeScript':
                if (mainFile.endsWith('.js') || mainFile.endsWith('.ts')) {
                    return `node ${mainFile}`;
                }
                break;
        }
        return null;
    }
    getFrameworkSpecificOptions(language, framework, projectInfo) {
        const options = [];
        switch (language) {
            case 'Python':
                if (framework === 'Django') {
                    options.push({
                        label: '🐍 Django Shell',
                        description: 'python manage.py shell',
                        detail: 'Open Django interactive shell'
                    });
                    options.push({
                        label: '🐍 Django Migrate',
                        description: 'python manage.py migrate',
                        detail: 'Run database migrations'
                    });
                }
                break;
            case 'Ruby':
                if (framework.includes('Rails')) {
                    options.push({
                        label: '💎 Rails Console',
                        description: 'rails console',
                        detail: 'Open Rails interactive console'
                    });
                    options.push({
                        label: '💎 Rails Migrate',
                        description: 'rails db:migrate',
                        detail: 'Run database migrations'
                    });
                }
                break;
            case 'PHP':
                if (framework === 'Laravel') {
                    options.push({
                        label: '🐘 Laravel Tinker',
                        description: 'php artisan tinker',
                        detail: 'Open Laravel interactive shell'
                    });
                    options.push({
                        label: '🐘 Laravel Migrate',
                        description: 'php artisan migrate',
                        detail: 'Run database migrations'
                    });
                }
                break;
            case 'Rust':
                options.push({
                    label: '🦀 Cargo Test',
                    description: 'cargo test',
                    detail: 'Run Rust tests'
                });
                options.push({
                    label: '🦀 Cargo Check',
                    description: 'cargo check',
                    detail: 'Check Rust code without building'
                });
                break;
            case 'Go':
                options.push({
                    label: '🐹 Go Test',
                    description: 'go test ./...',
                    detail: 'Run Go tests'
                });
                options.push({
                    label: '🐹 Go Build',
                    description: 'go build',
                    detail: 'Build Go binary'
                });
                break;
            case 'C#':
            case 'VB.NET':
            case 'F#':
                options.push({
                    label: '🔷 .NET Test',
                    description: 'dotnet test',
                    detail: 'Run .NET tests'
                });
                options.push({
                    label: '🔷 .NET Build',
                    description: 'dotnet build',
                    detail: 'Build .NET project'
                });
                break;
        }
        return options;
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=commandManager.js.map