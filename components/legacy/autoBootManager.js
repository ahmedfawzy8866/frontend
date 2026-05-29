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
exports.AutoBootManager = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const licenseManager_1 = require("./licenseManager");
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class AutoBootManager {
    constructor() {
        this.projectInfo = null;
        this.onProjectDetectedEmitter = new vscode.EventEmitter();
        this.onServerStatusChangedEmitter = new vscode.EventEmitter();
        this.onProjectDetected = this.onProjectDetectedEmitter.event;
        this.onServerStatusChanged = this.onServerStatusChangedEmitter.event;
    }
    async detectProjectType(projectPath) {
        try {
            // Check license first
            const licenseManager = licenseManager_1.LicenseManager.getInstance();
            const licenseInfo = await licenseManager.checkLicense();
            // Show license status on first run
            if (licenseInfo.accessLevel === 'free') {
                vscode.window.showInformationMessage('AutoBoot: Using free tier (3 languages). Upgrade for full access to 9 languages!', 'Upgrade Now').then(selection => {
                    if (selection === 'Upgrade Now') {
                        vscode.env.openExternal(vscode.Uri.parse('https://autoboot.dev/register'));
                    }
                });
            }
            // Feature gating based on license
            const hasAllLanguages = licenseManager.hasFeature('all_languages');
            const allowedLanguages = hasAllLanguages ?
                ['JavaScript', 'TypeScript', 'Java', 'Python', 'Clojure', 'Go', 'C#', 'Rust', 'Ruby', 'PHP'] :
                ['JavaScript', 'TypeScript', 'Java', 'Python']; // Free tier: 4 languages
            // Try different project types in priority order
            // Check for specific language indicators first to avoid false positives
            // Java projects (highest priority for build files)
            let projectInfo = await this.detectJavaProject(projectPath);
            if (projectInfo) {
                return this.setProjectInfo(projectInfo);
            }
            // Python projects
            projectInfo = await this.detectPythonProject(projectPath);
            if (projectInfo) {
                return this.setProjectInfo(projectInfo);
            }
            // Clojure projects
            projectInfo = await this.detectClojureProject(projectPath);
            if (projectInfo) {
                return this.setProjectInfo(projectInfo);
            }
            // Go projects
            projectInfo = await this.detectGoProject(projectPath);
            if (projectInfo) {
                return this.setProjectInfo(projectInfo);
            }
            // C# projects
            projectInfo = await this.detectCSharpProject(projectPath);
            if (projectInfo) {
                return this.setProjectInfo(projectInfo);
            }
            // Rust projects
            projectInfo = await this.detectRustProject(projectPath);
            if (projectInfo) {
                return this.setProjectInfo(projectInfo);
            }
            // Ruby projects
            projectInfo = await this.detectRubyProject(projectPath);
            if (projectInfo) {
                return this.setProjectInfo(projectInfo);
            }
            // PHP projects
            projectInfo = await this.detectPHPProject(projectPath);
            if (projectInfo) {
                return this.setProjectInfo(projectInfo);
            }
            // JavaScript/TypeScript projects (last to avoid false positives)
            projectInfo = await this.detectJavaScriptProject(projectPath);
            if (projectInfo) {
                return this.setProjectInfo(projectInfo);
            }
            return null;
        }
        catch (error) {
            console.error('Project detection failed:', error);
            return null;
        }
    }
    async setProjectInfo(projectInfo) {
        const isRunning = await this.checkServerStatus(projectInfo.port);
        projectInfo.isRunning = isRunning;
        this.projectInfo = projectInfo;
        // Set context for when clauses
        vscode.commands.executeCommand('setContext', 'autoboot.hasProject', true);
        this.onProjectDetectedEmitter.fire(projectInfo);
        return this.projectInfo;
    }
    async detectJavaScriptProject(projectPath) {
        const packageJsonPath = path.join(projectPath, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            return null;
        }
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const framework = this.detectFramework(packageJson);
        const packageManager = await this.detectPackageManager(projectPath);
        const devScript = this.findDevScript(packageJson);
        const port = this.detectPort(packageJson, framework);
        return {
            language: 'JavaScript/TypeScript',
            framework,
            packageManager,
            devScript,
            port,
            startCommand: `${packageManager} run ${devScript}`
        };
    }
    async detectJavaProject(projectPath) {
        // Check license for Java support
        const licenseManager = licenseManager_1.LicenseManager.getInstance();
        if (!licenseManager.hasFeature('all_languages') && licenseManager.getAccessLevel() === 'free') {
            // Java is allowed in free tier
        }
        // Check for Maven project
        if (fs.existsSync(path.join(projectPath, 'pom.xml'))) {
            const framework = this.detectJavaFramework(projectPath);
            const mainClasses = await this.findMainClass(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartJavaCommands(framework, 'maven', projectPath, mainClasses, readmeInstructions, hasDockerfile);
            return {
                language: 'Java',
                framework,
                packageManager: 'maven',
                devScript,
                port,
                startCommand,
                mainClasses,
                hasDockerfile,
                readmeInstructions
            };
        }
        // Check for Gradle project
        if (fs.existsSync(path.join(projectPath, 'build.gradle')) || fs.existsSync(path.join(projectPath, 'build.gradle.kts'))) {
            const framework = this.detectJavaFramework(projectPath);
            const mainClasses = await this.findMainClass(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartJavaCommands(framework, 'gradle', projectPath, mainClasses, readmeInstructions, hasDockerfile);
            return {
                language: 'Java',
                framework,
                packageManager: 'gradle',
                devScript,
                port,
                startCommand,
                mainClasses,
                hasDockerfile,
                readmeInstructions
            };
        }
        return null;
    }
    async detectPythonProject(projectPath) {
        // Check for Python project indicators
        const pythonFiles = ['requirements.txt', 'pyproject.toml', 'setup.py', 'Pipfile', 'poetry.lock'];
        const hasPythonProject = pythonFiles.some(file => fs.existsSync(path.join(projectPath, file)));
        if (!hasPythonProject) {
            return null;
        }
        const framework = this.detectPythonFramework(projectPath);
        const packageManager = this.detectPythonPackageManager(projectPath);
        return {
            language: 'Python',
            framework,
            packageManager,
            devScript: 'runserver',
            port: framework === 'Django' ? 8000 : 5000,
            startCommand: this.getPythonStartCommand(framework, packageManager)
        };
    }
    async detectClojureProject(projectPath) {
        // Check for Leiningen project
        if (fs.existsSync(path.join(projectPath, 'project.clj'))) {
            return {
                language: 'Clojure',
                framework: 'Leiningen',
                packageManager: 'lein',
                devScript: 'run',
                port: 3000,
                startCommand: 'lein run'
            };
        }
        // Check for deps.edn (tools.deps)
        if (fs.existsSync(path.join(projectPath, 'deps.edn'))) {
            return {
                language: 'Clojure',
                framework: 'tools.deps',
                packageManager: 'clj',
                devScript: 'run',
                port: 3000,
                startCommand: 'clj -M:run'
            };
        }
        return null;
    }
    async detectGoProject(projectPath) {
        // Check license for Go support (premium feature)
        const licenseManager = licenseManager_1.LicenseManager.getInstance();
        if (!licenseManager.hasFeature('all_languages')) {
            const shouldContinue = await licenseManager.promptUpgrade('Go Language Support');
            if (!shouldContinue) {
                return null;
            }
        }
        // Check for Go module (go.mod)
        if (fs.existsSync(path.join(projectPath, 'go.mod'))) {
            const framework = await this.detectGoFramework(projectPath);
            const mainFiles = await this.findGoMainFiles(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartGoCommands(framework, projectPath, mainFiles, readmeInstructions, hasDockerfile);
            return {
                language: 'Go',
                framework,
                packageManager: 'go',
                devScript,
                port,
                startCommand,
                mainFiles,
                hasDockerfile,
                readmeInstructions
            };
        }
        // Check for Go files without go.mod (legacy GOPATH style)
        const goFiles = fs.readdirSync(projectPath).filter(file => file.endsWith('.go'));
        if (goFiles.length > 0) {
            const mainFiles = await this.findGoMainFiles(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartGoCommands('Go', projectPath, mainFiles, readmeInstructions, hasDockerfile);
            return {
                language: 'Go',
                framework: 'Go',
                packageManager: 'go',
                devScript,
                port,
                startCommand,
                mainFiles,
                hasDockerfile,
                readmeInstructions
            };
        }
        return null;
    }
    async detectCSharpProject(projectPath) {
        // Check for .NET project files
        const projectFiles = [
            '*.csproj', '*.vbproj', '*.fsproj',
            '*.sln',
            'global.json',
            'Directory.Build.props' // MSBuild directory configuration
        ];
        let hasProjectFile = false;
        let projectType = '';
        // Check for project files
        for (const pattern of projectFiles) {
            const files = fs.readdirSync(projectPath).filter(file => {
                if (pattern.startsWith('*')) {
                    return file.endsWith(pattern.substring(1));
                }
                return file === pattern;
            });
            if (files.length > 0) {
                hasProjectFile = true;
                if (files[0].endsWith('.csproj')) {
                    projectType = 'C#';
                }
                else if (files[0].endsWith('.vbproj')) {
                    projectType = 'VB.NET';
                }
                else if (files[0].endsWith('.fsproj')) {
                    projectType = 'F#';
                }
                else if (files[0].endsWith('.sln')) {
                    projectType = 'C# Solution';
                }
                break;
            }
        }
        if (hasProjectFile) {
            const framework = await this.detectDotNetFramework(projectPath);
            const mainFiles = await this.findCSharpMainFiles(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartDotNetCommands(framework, projectPath, mainFiles, readmeInstructions, hasDockerfile);
            return {
                language: projectType || 'C#',
                framework,
                packageManager: 'dotnet',
                devScript,
                port,
                startCommand,
                mainFiles,
                hasDockerfile,
                readmeInstructions
            };
        }
        // Check for .NET files without project files (rare but possible)
        const csharpFiles = fs.readdirSync(projectPath).filter(file => file.endsWith('.cs') || file.endsWith('.vb') || file.endsWith('.fs'));
        if (csharpFiles.length > 0) {
            const mainFiles = await this.findCSharpMainFiles(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartDotNetCommands('.NET', projectPath, mainFiles, readmeInstructions, hasDockerfile);
            return {
                language: 'C#',
                framework: '.NET',
                packageManager: 'dotnet',
                devScript,
                port,
                startCommand,
                mainFiles,
                hasDockerfile,
                readmeInstructions
            };
        }
        return null;
    }
    async detectRustProject(projectPath) {
        // Check for Cargo.toml (Rust's package manager)
        if (fs.existsSync(path.join(projectPath, 'Cargo.toml'))) {
            const framework = await this.detectRustFramework(projectPath);
            const mainFiles = await this.findRustMainFiles(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartRustCommands(framework, projectPath, mainFiles, readmeInstructions, hasDockerfile);
            return {
                language: 'Rust',
                framework,
                packageManager: 'cargo',
                devScript,
                port,
                startCommand,
                mainFiles,
                hasDockerfile,
                readmeInstructions
            };
        }
        // Check for Rust files without Cargo.toml (rare but possible)
        const rustFiles = fs.readdirSync(projectPath).filter(file => file.endsWith('.rs'));
        if (rustFiles.length > 0) {
            const mainFiles = await this.findRustMainFiles(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartRustCommands('Rust', projectPath, mainFiles, readmeInstructions, hasDockerfile);
            return {
                language: 'Rust',
                framework: 'Rust',
                packageManager: 'cargo',
                devScript,
                port,
                startCommand,
                mainFiles,
                hasDockerfile,
                readmeInstructions
            };
        }
        return null;
    }
    async detectRubyProject(projectPath) {
        // Check for Ruby project indicators
        const rubyIndicators = [
            'Gemfile',
            'Rakefile',
            'config.ru',
            'app.rb',
            '.ruby-version',
            '.rvmrc',
            'Gemfile.lock' // Bundler lock file
        ];
        let hasRubyProject = false;
        let packageManager = 'gem';
        // Check for Ruby project files
        for (const indicator of rubyIndicators) {
            if (fs.existsSync(path.join(projectPath, indicator))) {
                hasRubyProject = true;
                if (indicator === 'Gemfile' || indicator === 'Gemfile.lock') {
                    packageManager = 'bundle';
                }
                break;
            }
        }
        // Check for Rails project structure
        if (fs.existsSync(path.join(projectPath, 'config', 'application.rb')) ||
            fs.existsSync(path.join(projectPath, 'app', 'controllers'))) {
            hasRubyProject = true;
            packageManager = 'bundle';
        }
        if (hasRubyProject) {
            const framework = await this.detectRubyFramework(projectPath);
            const mainFiles = await this.findRubyMainFiles(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartRubyCommands(framework, projectPath, mainFiles, readmeInstructions, hasDockerfile);
            return {
                language: 'Ruby',
                framework,
                packageManager,
                devScript,
                port,
                startCommand,
                mainFiles,
                hasDockerfile,
                readmeInstructions
            };
        }
        // Check for Ruby files without project structure
        const rubyFiles = fs.readdirSync(projectPath).filter(file => file.endsWith('.rb'));
        if (rubyFiles.length > 0) {
            const mainFiles = await this.findRubyMainFiles(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartRubyCommands('Ruby', projectPath, mainFiles, readmeInstructions, hasDockerfile);
            return {
                language: 'Ruby',
                framework: 'Ruby',
                packageManager: 'gem',
                devScript,
                port,
                startCommand,
                mainFiles,
                hasDockerfile,
                readmeInstructions
            };
        }
        return null;
    }
    async detectPHPProject(projectPath) {
        // Check for PHP project indicators
        const phpIndicators = [
            'composer.json',
            'composer.lock',
            'artisan',
            'index.php',
            'app.php',
            '.env',
            'phpunit.xml',
            'phpunit.xml.dist',
            'web.config',
            '.htaccess' // Apache configuration for PHP
        ];
        let hasPHPProject = false;
        let packageManager = 'composer';
        // Check for PHP project files
        for (const indicator of phpIndicators) {
            if (fs.existsSync(path.join(projectPath, indicator))) {
                hasPHPProject = true;
                break;
            }
        }
        // Check for common PHP framework directories
        const phpDirectories = [
            'app',
            'config',
            'vendor',
            'public',
            'resources',
            'storage',
            'bootstrap',
            'routes',
            'src',
            'lib',
            'includes',
            'wp-content',
            'wp-admin',
            'wp-includes' // WordPress
        ];
        if (!hasPHPProject) {
            for (const dir of phpDirectories) {
                if (fs.existsSync(path.join(projectPath, dir))) {
                    // Check if directory contains PHP files
                    try {
                        const files = fs.readdirSync(path.join(projectPath, dir));
                        if (files.some(file => file.endsWith('.php'))) {
                            hasPHPProject = true;
                            break;
                        }
                    }
                    catch (error) {
                        // Skip if can't read directory
                    }
                }
            }
        }
        if (hasPHPProject) {
            const framework = await this.detectPHPFramework(projectPath);
            const mainFiles = await this.findPHPMainFiles(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartPHPCommands(framework, projectPath, mainFiles, readmeInstructions, hasDockerfile);
            return {
                language: 'PHP',
                framework,
                packageManager,
                devScript,
                port,
                startCommand,
                mainFiles,
                hasDockerfile,
                readmeInstructions
            };
        }
        // Check for PHP files without project structure
        const phpFiles = fs.readdirSync(projectPath).filter(file => file.endsWith('.php'));
        if (phpFiles.length > 0) {
            const mainFiles = await this.findPHPMainFiles(projectPath);
            const readmeInstructions = await this.scanReadmeForInstructions(projectPath);
            const hasDockerfile = this.hasDockerfile(projectPath);
            const { devScript, startCommand, port } = await this.getSmartPHPCommands('PHP', projectPath, mainFiles, readmeInstructions, hasDockerfile);
            return {
                language: 'PHP',
                framework: 'PHP',
                packageManager: 'composer',
                devScript,
                port,
                startCommand,
                mainFiles,
                hasDockerfile,
                readmeInstructions
            };
        }
        return null;
    }
    detectJavaFramework(projectPath) {
        try {
            // Check pom.xml for frameworks
            const pomPath = path.join(projectPath, 'pom.xml');
            if (fs.existsSync(pomPath)) {
                const pomContent = fs.readFileSync(pomPath, 'utf8');
                if (pomContent.includes('spring-boot-starter')) {
                    return 'Spring Boot';
                }
                if (pomContent.includes('helidon-')) {
                    return 'Helidon';
                }
                if (pomContent.includes('io.helidon')) {
                    return 'Helidon';
                }
                if (pomContent.includes('quarkus')) {
                    return 'Quarkus';
                }
                if (pomContent.includes('micronaut')) {
                    return 'Micronaut';
                }
                if (pomContent.includes('jakarta.ws.rs')) {
                    return 'JAX-RS';
                }
                if (pomContent.includes('javax.ws.rs')) {
                    return 'JAX-RS';
                }
            }
            // Check build.gradle for frameworks
            const gradlePath = path.join(projectPath, 'build.gradle');
            if (fs.existsSync(gradlePath)) {
                const gradleContent = fs.readFileSync(gradlePath, 'utf8');
                if (gradleContent.includes('spring-boot')) {
                    return 'Spring Boot';
                }
                if (gradleContent.includes('helidon')) {
                    return 'Helidon';
                }
                if (gradleContent.includes('io.helidon')) {
                    return 'Helidon';
                }
                if (gradleContent.includes('quarkus')) {
                    return 'Quarkus';
                }
                if (gradleContent.includes('micronaut')) {
                    return 'Micronaut';
                }
                if (gradleContent.includes('jakarta.ws.rs')) {
                    return 'JAX-RS';
                }
                if (gradleContent.includes('javax.ws.rs')) {
                    return 'JAX-RS';
                }
            }
        }
        catch (error) {
            console.error('Error detecting Java framework:', error);
        }
        return 'Java';
    }
    getJavaCommands(framework, packageManager) {
        switch (framework) {
            case 'Spring Boot':
                return {
                    devScript: packageManager === 'maven' ? 'spring-boot:run' : 'bootRun',
                    startCommand: packageManager === 'maven' ? 'mvn spring-boot:run' : './gradlew bootRun',
                    port: 8080
                };
            case 'Helidon':
                return {
                    devScript: packageManager === 'maven' ? 'exec:java' : 'run',
                    startCommand: packageManager === 'maven' ? 'mvn exec:java' : './gradlew run',
                    port: 8080
                };
            case 'Quarkus':
                return {
                    devScript: packageManager === 'maven' ? 'quarkus:dev' : 'quarkusDev',
                    startCommand: packageManager === 'maven' ? 'mvn quarkus:dev' : './gradlew quarkusDev',
                    port: 8080
                };
            case 'Micronaut':
                return {
                    devScript: packageManager === 'maven' ? 'mn:run' : 'run',
                    startCommand: packageManager === 'maven' ? 'mvn mn:run' : './gradlew run',
                    port: 8080
                };
            default:
                return {
                    devScript: packageManager === 'maven' ? 'exec:java' : 'run',
                    startCommand: packageManager === 'maven' ? 'mvn exec:java' : './gradlew run',
                    port: 8080
                };
        }
    }
    detectPythonFramework(projectPath) {
        try {
            // Check for Django
            if (fs.existsSync(path.join(projectPath, 'manage.py'))) {
                return 'Django';
            }
            // Check requirements.txt for frameworks
            const reqPath = path.join(projectPath, 'requirements.txt');
            if (fs.existsSync(reqPath)) {
                const requirements = fs.readFileSync(reqPath, 'utf8');
                if (requirements.includes('flask')) {
                    return 'Flask';
                }
                if (requirements.includes('fastapi')) {
                    return 'FastAPI';
                }
                if (requirements.includes('django')) {
                    return 'Django';
                }
                if (requirements.includes('tornado')) {
                    return 'Tornado';
                }
            }
            // Check pyproject.toml
            const pyprojectPath = path.join(projectPath, 'pyproject.toml');
            if (fs.existsSync(pyprojectPath)) {
                const pyproject = fs.readFileSync(pyprojectPath, 'utf8');
                if (pyproject.includes('flask')) {
                    return 'Flask';
                }
                if (pyproject.includes('fastapi')) {
                    return 'FastAPI';
                }
                if (pyproject.includes('django')) {
                    return 'Django';
                }
            }
        }
        catch (error) {
            console.error('Error detecting Python framework:', error);
        }
        return 'Python';
    }
    detectPythonPackageManager(projectPath) {
        if (fs.existsSync(path.join(projectPath, 'poetry.lock'))) {
            return 'poetry';
        }
        if (fs.existsSync(path.join(projectPath, 'Pipfile'))) {
            return 'pipenv';
        }
        if (fs.existsSync(path.join(projectPath, 'pyproject.toml'))) {
            return 'pip';
        }
        if (fs.existsSync(path.join(projectPath, 'requirements.txt'))) {
            return 'pip';
        }
        return 'pip';
    }
    getPythonStartCommand(framework, packageManager) {
        switch (framework) {
            case 'Django':
                return packageManager === 'poetry' ? 'poetry run python manage.py runserver' : 'python manage.py runserver';
            case 'Flask':
                return packageManager === 'poetry' ? 'poetry run flask run --host 0.0.0.0' : 'flask run --host 0.0.0.0';
            case 'FastAPI':
                return packageManager === 'poetry' ? 'poetry run uvicorn main:app --reload' : 'uvicorn main:app --reload';
            default:
                return packageManager === 'poetry' ? 'poetry run python main.py' : 'python main.py';
        }
    }
    detectFramework(packageJson) {
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        if (deps.next) {
            return 'Next.js';
        }
        if (deps.vite) {
            return 'Vite';
        }
        if (deps['@angular/core']) {
            return 'Angular';
        }
        if (deps.vue) {
            return 'Vue.js';
        }
        if (deps.svelte) {
            return 'Svelte';
        }
        if (deps['react-scripts']) {
            return 'Create React App';
        }
        if (deps.express) {
            return 'Express';
        }
        if (deps.nuxt) {
            return 'Nuxt.js';
        }
        if (deps.gatsby) {
            return 'Gatsby';
        }
        return 'Unknown';
    }
    async detectPackageManager(projectPath) {
        if (fs.existsSync(path.join(projectPath, 'bun.lockb'))) {
            return 'bun';
        }
        if (fs.existsSync(path.join(projectPath, 'pnpm-lock.yaml'))) {
            return 'pnpm';
        }
        if (fs.existsSync(path.join(projectPath, 'yarn.lock'))) {
            return 'yarn';
        }
        if (fs.existsSync(path.join(projectPath, 'package-lock.json'))) {
            return 'npm';
        }
        return 'npm';
    }
    findDevScript(packageJson) {
        const scripts = packageJson.scripts || {};
        if (scripts.dev) {
            return 'dev';
        }
        if (scripts.start) {
            return 'start';
        }
        if (scripts.serve) {
            return 'serve';
        }
        if (scripts['start:dev']) {
            return 'start:dev';
        }
        return 'dev';
    }
    detectPort(packageJson, framework) {
        // Check package.json scripts for port
        const scripts = packageJson.scripts || {};
        const devScript = scripts.dev || scripts.start || '';
        const portMatch = devScript.match(/--port[=\s]+(\d+)/);
        if (portMatch) {
            return parseInt(portMatch[1]);
        }
        // Framework defaults
        const frameworkPorts = {
            'Next.js': 3000,
            'Vite': 5173,
            'Angular': 4200,
            'Vue.js': 8080,
            'Svelte': 5000,
            'Create React App': 3000,
            'Express': 3000,
            'Nuxt.js': 3000,
            'Gatsby': 8000
        };
        return frameworkPorts[framework] || 3000;
    }
    async checkServerStatus(port) {
        try {
            const { stdout } = await execAsync(`lsof -ti:${port}`);
            return stdout.trim().length > 0;
        }
        catch {
            return false;
        }
    }
    async restartServer() {
        if (!this.projectInfo) {
            throw new Error('No project detected');
        }
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            throw new Error('No workspace folder');
        }
        try {
            // Stop existing server
            if (this.projectInfo.isRunning) {
                await this.stopServer();
            }
            // Start server using the appropriate start command
            const command = this.projectInfo.startCommand;
            const terminal = vscode.window.createTerminal({
                name: 'AutoBoot Dev Server',
                cwd: workspaceFolder.uri.fsPath
            });
            terminal.sendText(command);
            terminal.show();
            // Wait a bit and check status
            setTimeout(async () => {
                const isRunning = await this.checkServerStatus(this.projectInfo.port);
                this.projectInfo.isRunning = isRunning;
                this.onServerStatusChangedEmitter.fire(isRunning);
            }, 3000);
            return true;
        }
        catch (error) {
            console.error('Server restart failed:', error);
            throw error;
        }
    }
    async stopServer() {
        if (!this.projectInfo?.isRunning) {
            return true;
        }
        try {
            await execAsync(`lsof -ti:${this.projectInfo.port} | xargs kill -9`);
            this.projectInfo.isRunning = false;
            this.onServerStatusChangedEmitter.fire(false);
            return true;
        }
        catch (error) {
            console.error('Failed to stop server:', error);
            return false;
        }
    }
    async analyzeDependencies(projectPath) {
        try {
            // Detect project type first
            if (!this.projectInfo) {
                await this.detectProjectType(projectPath);
            }
            if (!this.projectInfo) {
                return { error: 'Could not detect project type' };
            }
            switch (this.projectInfo.language) {
                case 'Java':
                    return await this.analyzeJavaDependencies(projectPath);
                case 'Python':
                    return await this.analyzePythonDependencies(projectPath);
                case 'Clojure':
                    return await this.analyzeClojureDependencies(projectPath);
                case 'Go':
                    return await this.analyzeGoDependencies(projectPath);
                case 'C#':
                case 'VB.NET':
                case 'F#':
                case 'C# Solution':
                    return await this.analyzeDotNetDependencies(projectPath);
                case 'Rust':
                    return await this.analyzeRustDependencies(projectPath);
                case 'Ruby':
                    return await this.analyzeRubyDependencies(projectPath);
                case 'PHP':
                    return await this.analyzePHPDependencies(projectPath);
                default:
                    return await this.analyzeJavaScriptDependencies(projectPath);
            }
        }
        catch (error) {
            console.error('Dependency analysis failed:', error);
            return { error: error instanceof Error ? error.message : String(error) };
        }
    }
    async analyzeJavaDependencies(projectPath) {
        try {
            const results = {
                language: 'Java',
                packageManager: this.projectInfo?.packageManager,
                dependencies: [],
                vulnerabilities: 0,
                outdated: 0
            };
            if (this.projectInfo?.packageManager === 'maven') {
                // Maven dependency analysis
                try {
                    const { stdout } = await execAsync('mvn dependency:tree', { cwd: projectPath });
                    results.dependencyTree = stdout;
                    // Count dependencies from tree output
                    const depLines = stdout.split('\n').filter(line => line.includes('├─') || line.includes('└─'));
                    results.dependencies = depLines.map(line => {
                        const match = line.match(/[├└]─\s*(.+)/);
                        return match ? match[1].trim() : line.trim();
                    });
                }
                catch (mvnError) {
                    results.error = 'Maven dependency analysis failed. Make sure Maven is installed.';
                }
                // Check for security vulnerabilities using OWASP dependency check if available
                try {
                    const { stdout: securityOutput } = await execAsync('mvn org.owasp:dependency-check-maven:check', {
                        cwd: projectPath,
                        timeout: 30000 // 30 second timeout
                    });
                    if (securityOutput.includes('vulnerabilities')) {
                        const vulnMatch = securityOutput.match(/(\d+)\s+vulnerabilities/);
                        results.vulnerabilities = vulnMatch ? parseInt(vulnMatch[1]) : 0;
                    }
                }
                catch (secError) {
                    // OWASP dependency check not available, skip security analysis
                    results.securityNote = 'Install OWASP dependency-check-maven plugin for security analysis';
                }
            }
            else if (this.projectInfo?.packageManager === 'gradle') {
                // Gradle dependency analysis
                try {
                    const { stdout } = await execAsync('./gradlew dependencies', { cwd: projectPath });
                    results.dependencyTree = stdout;
                    // Extract dependencies from gradle output
                    const depLines = stdout.split('\n').filter(line => line.includes('├─') || line.includes('└─') || line.match(/\+---|\\\---/));
                    results.dependencies = depLines.map(line => line.trim());
                }
                catch (gradleError) {
                    results.error = 'Gradle dependency analysis failed. Make sure Gradle wrapper is available.';
                }
            }
            results.totalDependencies = results.dependencies.length;
            return results;
        }
        catch (error) {
            return {
                language: 'Java',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    async analyzePythonDependencies(projectPath) {
        try {
            const results = {
                language: 'Python',
                dependencies: [],
                vulnerabilities: 0,
                outdated: 0
            };
            // Check for requirements.txt
            if (fs.existsSync(path.join(projectPath, 'requirements.txt'))) {
                const reqContent = fs.readFileSync(path.join(projectPath, 'requirements.txt'), 'utf8');
                results.dependencies = reqContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
                // Use pip-audit if available for security analysis
                try {
                    const { stdout } = await execAsync('pip-audit --format=json', { cwd: projectPath });
                    const auditData = JSON.parse(stdout);
                    results.vulnerabilities = auditData.vulnerabilities?.length || 0;
                }
                catch (auditError) {
                    results.securityNote = 'Install pip-audit for security analysis: pip install pip-audit';
                }
            }
            // Check for pyproject.toml
            if (fs.existsSync(path.join(projectPath, 'pyproject.toml'))) {
                results.hasModernConfig = true;
                results.configNote = 'Using modern pyproject.toml configuration';
            }
            results.totalDependencies = results.dependencies.length;
            return results;
        }
        catch (error) {
            return {
                language: 'Python',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    async analyzeClojureDependencies(projectPath) {
        try {
            const results = {
                language: 'Clojure',
                dependencies: [],
                vulnerabilities: 0,
                outdated: 0
            };
            // Check for project.clj (Leiningen)
            if (fs.existsSync(path.join(projectPath, 'project.clj'))) {
                const projectContent = fs.readFileSync(path.join(projectPath, 'project.clj'), 'utf8');
                const depMatch = projectContent.match(/:dependencies\s*\[([\s\S]*?)\]/);
                if (depMatch) {
                    const depsStr = depMatch[1];
                    results.dependencies = depsStr.split('\n')
                        .map(line => line.trim())
                        .filter(line => line && !line.startsWith(';'));
                }
            }
            // Check for deps.edn (tools.deps)
            if (fs.existsSync(path.join(projectPath, 'deps.edn'))) {
                results.hasModernConfig = true;
                results.configNote = 'Using modern deps.edn configuration';
            }
            results.totalDependencies = results.dependencies.length;
            return results;
        }
        catch (error) {
            return {
                language: 'Clojure',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    async analyzeGoDependencies(projectPath) {
        try {
            const results = {
                language: 'Go',
                dependencies: [],
                vulnerabilities: 0,
                outdated: 0
            };
            // Check for go.mod
            if (fs.existsSync(path.join(projectPath, 'go.mod'))) {
                const goModContent = fs.readFileSync(path.join(projectPath, 'go.mod'), 'utf8');
                // Parse dependencies from go.mod
                const requireSection = goModContent.match(/require\s*\(([\s\S]*?)\)/);
                if (requireSection) {
                    const deps = requireSection[1]
                        .split('\n')
                        .map(line => line.trim())
                        .filter(line => line && !line.startsWith('//'))
                        .map(line => line.split(' ')[0]);
                    results.dependencies = deps;
                }
                // Use go list to get more detailed dependency info
                try {
                    const { stdout } = await execAsync('go list -m all', { cwd: projectPath });
                    const allDeps = stdout.split('\n').filter(line => line.trim());
                    results.allDependencies = allDeps;
                    results.totalDependencies = allDeps.length;
                }
                catch (goListError) {
                    results.note = 'Run "go mod download" to ensure all dependencies are available';
                    results.totalDependencies = results.dependencies.length;
                }
                // Check for security vulnerabilities using govulncheck if available
                try {
                    const { stdout: vulnOutput } = await execAsync('govulncheck ./...', {
                        cwd: projectPath,
                        timeout: 30000 // 30 second timeout
                    });
                    if (vulnOutput.includes('No vulnerabilities found')) {
                        results.vulnerabilities = 0;
                        results.securityStatus = 'Clean';
                    }
                    else {
                        const vulnMatches = vulnOutput.match(/(\d+)\s+vulnerabilit/);
                        results.vulnerabilities = vulnMatches ? parseInt(vulnMatches[1]) : 0;
                    }
                }
                catch (vulnError) {
                    results.securityNote = 'Install govulncheck for security analysis: go install golang.org/x/vuln/cmd/govulncheck@latest';
                }
                // Check for outdated dependencies
                try {
                    const { stdout: outdatedOutput } = await execAsync('go list -u -m all', { cwd: projectPath });
                    const outdatedLines = outdatedOutput.split('\n').filter(line => line.includes('[') && line.includes(']'));
                    results.outdated = outdatedLines.length;
                    results.outdatedDependencies = outdatedLines;
                }
                catch (outdatedError) {
                    results.outdatedNote = 'Could not check for outdated dependencies';
                }
            }
            else {
                results.error = 'No go.mod file found. Run "go mod init <module-name>" to initialize Go modules.';
            }
            return results;
        }
        catch (error) {
            return {
                language: 'Go',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    async analyzeJavaScriptDependencies(projectPath) {
        try {
            const { stdout } = await execAsync('npm outdated --json', { cwd: projectPath });
            const outdated = stdout ? JSON.parse(stdout) : {};
            const { stdout: auditOutput } = await execAsync('npm audit --json', {
                cwd: projectPath,
                // Don't throw on non-zero exit codes for audit
            });
            const audit = auditOutput ? JSON.parse(auditOutput) : {};
            return {
                language: 'JavaScript/TypeScript',
                outdated: Object.keys(outdated).length,
                vulnerabilities: audit.metadata?.vulnerabilities?.total || 0,
                details: { outdated, audit }
            };
        }
        catch (error) {
            return {
                language: 'JavaScript/TypeScript',
                outdated: 0,
                vulnerabilities: 0,
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    async analyzePerformance(projectPath) {
        try {
            // Check build output size
            const buildDirs = ['dist', 'build', '.next', 'out'];
            let buildSize = 0;
            for (const dir of buildDirs) {
                const buildPath = path.join(projectPath, dir);
                if (fs.existsSync(buildPath)) {
                    buildSize = await this.getFolderSize(buildPath);
                    break;
                }
            }
            // Count source files
            const srcPath = path.join(projectPath, 'src');
            const fileCount = fs.existsSync(srcPath) ? await this.countFiles(srcPath) : 0;
            return {
                buildSize: this.formatBytes(buildSize),
                sourceFiles: fileCount,
                recommendations: this.generatePerformanceRecommendations(buildSize, fileCount)
            };
        }
        catch (error) {
            console.error('Performance analysis failed:', error);
            return { error: error instanceof Error ? error.message : String(error) };
        }
    }
    async getFolderSize(folderPath) {
        let size = 0;
        const files = fs.readdirSync(folderPath);
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                size += await this.getFolderSize(filePath);
            }
            else {
                size += stats.size;
            }
        }
        return size;
    }
    async countFiles(dirPath) {
        let count = 0;
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                count += await this.countFiles(filePath);
            }
            else {
                count++;
            }
        }
        return count;
    }
    formatBytes(bytes) {
        if (bytes === 0) {
            return '0 B';
        }
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    }
    generatePerformanceRecommendations(buildSize, fileCount) {
        const recommendations = [];
        if (buildSize > 1024 * 1024) { // > 1MB
            recommendations.push('Consider code splitting to reduce bundle size');
        }
        if (fileCount > 100) {
            recommendations.push('Large codebase - consider modularization');
        }
        recommendations.push('Enable build caching for faster builds');
        recommendations.push('Optimize images and static assets');
        return recommendations;
    }
    getProjectInfo() {
        return this.projectInfo;
    }
    // Smart Java project analysis methods
    async findMainClass(projectPath) {
        try {
            const allMainClasses = [];
            // First, check standard Maven/Gradle structure
            const standardSrcDirs = [
                path.join(projectPath, 'src', 'main', 'java'),
                path.join(projectPath, 'src'),
                projectPath
            ];
            for (const srcDir of standardSrcDirs) {
                if (fs.existsSync(srcDir)) {
                    const mainClasses = await this.searchForAllMainClasses(srcDir);
                    allMainClasses.push(...mainClasses);
                }
            }
            // Then, check for Maven modules
            const mavenModules = await this.findMavenModules(projectPath);
            for (const modulePath of mavenModules) {
                const moduleSrcDirs = [
                    path.join(modulePath, 'src', 'main', 'java'),
                    path.join(modulePath, 'src')
                ];
                for (const srcDir of moduleSrcDirs) {
                    if (fs.existsSync(srcDir)) {
                        const mainClasses = await this.searchForAllMainClasses(srcDir);
                        allMainClasses.push(...mainClasses);
                    }
                }
            }
            // Remove duplicates and return
            return [...new Set(allMainClasses)];
        }
        catch (error) {
            console.error('Error finding main classes:', error);
            return [];
        }
    }
    async findMavenModules(projectPath) {
        try {
            const modules = [];
            // Check if this is a multi-module Maven project
            const parentPomPath = path.join(projectPath, 'pom.xml');
            if (fs.existsSync(parentPomPath)) {
                const pomContent = fs.readFileSync(parentPomPath, 'utf8');
                // Look for <modules> section in parent pom
                const modulesMatch = pomContent.match(/<modules>([\s\S]*?)<\/modules>/);
                if (modulesMatch) {
                    const moduleMatches = modulesMatch[1].match(/<module>([^<]+)<\/module>/g);
                    if (moduleMatches) {
                        for (const moduleMatch of moduleMatches) {
                            const moduleName = moduleMatch.replace(/<\/?module>/g, '').trim();
                            const modulePath = path.join(projectPath, moduleName);
                            if (fs.existsSync(modulePath) && fs.existsSync(path.join(modulePath, 'pom.xml'))) {
                                modules.push(modulePath);
                            }
                        }
                    }
                }
            }
            // Also scan for any subdirectories that have pom.xml (in case modules aren't declared)
            const files = fs.readdirSync(projectPath);
            for (const file of files) {
                const filePath = path.join(projectPath, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory() && !file.startsWith('.') &&
                    file !== 'target' && file !== 'node_modules') {
                    const modulePomPath = path.join(filePath, 'pom.xml');
                    if (fs.existsSync(modulePomPath) && !modules.includes(filePath)) {
                        modules.push(filePath);
                    }
                }
            }
            return modules;
        }
        catch (error) {
            console.error('Error finding Maven modules:', error);
            return [];
        }
    }
    async searchForAllMainClasses(dir, packagePrefix = '') {
        try {
            const files = fs.readdirSync(dir);
            const mainClasses = [];
            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    const subPackage = packagePrefix ? `${packagePrefix}.${file}` : file;
                    const subResults = await this.searchForAllMainClasses(filePath, subPackage);
                    mainClasses.push(...subResults);
                }
                else if (file.endsWith('.java')) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    if (this.hasMainMethod(content)) {
                        const className = file.replace('.java', '');
                        const fullClassName = packagePrefix ? `${packagePrefix}.${className}` : className;
                        mainClasses.push(fullClassName);
                    }
                }
            }
            return mainClasses;
        }
        catch (error) {
            return [];
        }
    }
    async searchForMainClass(dir, packagePrefix = '') {
        try {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    const subPackage = packagePrefix ? `${packagePrefix}.${file}` : file;
                    const result = await this.searchForMainClass(filePath, subPackage);
                    if (result) {
                        return result;
                    }
                }
                else if (file.endsWith('.java')) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    if (this.hasMainMethod(content)) {
                        const className = file.replace('.java', '');
                        return packagePrefix ? `${packagePrefix}.${className}` : className;
                    }
                }
            }
            return null;
        }
        catch (error) {
            return null;
        }
    }
    hasMainMethod(javaContent) {
        // Remove comments first, then check for main method
        const cleanContent = this.removeJavaComments(javaContent);
        // Ultra-comprehensive patterns for Java main method variations
        const mainMethodPatterns = [
            // Basic patterns - case insensitive for flexibility
            /public\s+static\s+void\s+main\s*\(/i,
            /static\s+public\s+void\s+main\s*\(/i,
            // Standard patterns with final parameter modifier
            /public\s+static\s+void\s+main\s*\(\s*final\s+String\s*\[\s*\]\s*\w*\s*\)/i,
            /public\s+static\s+void\s+main\s*\(\s*final\s+String\s*\[\s*\]\s*\w*\s*\)\s*throws/i,
            // More specific patterns with String parameter
            /public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*\w*\s*\)/i,
            /static\s+public\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*\w*\s*\)/i,
            // With final modifier on method
            /public\s+static\s+final\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)/i,
            /public\s+final\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)/i,
            /final\s+public\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)/i,
            // Varargs style: public static void main(String... args)
            /public\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\.\.\.\s*\w*\s*\)/i,
            /static\s+public\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\.\.\.\s*\w*\s*\)/i,
            // With synchronized
            /public\s+static\s+synchronized\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)/i,
            /public\s+synchronized\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)/i,
            /synchronized\s+public\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)/i,
            // Without parameter name
            /public\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\)/i,
            /static\s+public\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\)/i,
            // With throws clause - comprehensive patterns
            /public\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)\s*throws/i,
            /static\s+public\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)\s*throws/i,
            /public\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\.\.\.\s*\w*\s*\)\s*throws/i,
            // Alternative String array syntax: String args[]
            /public\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s+\w+\s*\[\s*\]\s*\)/i,
            /static\s+public\s+void\s+main\s*\(\s*(?:final\s+)?String\s+\w+\s*\[\s*\]\s*\)/i,
            /public\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s+\w+\s*\[\s*\]\s*\)\s*throws/i,
            // With strictfp modifier
            /public\s+static\s+strictfp\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)/i,
            /strictfp\s+public\s+static\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)/i,
            // Multiple modifiers with final parameter
            /public\s+static\s+final\s+synchronized\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)/i,
            /public\s+final\s+static\s+synchronized\s+void\s+main\s*\(\s*(?:final\s+)?String\s*\[\s*\]\s*\w*\s*\)/i,
            // The specific pattern from your example: public static void main(final String[] args) throws IOException
            /public\s+static\s+void\s+main\s*\(\s*final\s+String\s*\[\s*\]\s+\w+\s*\)\s*throws\s+\w+/i,
            // Very flexible pattern - matches any reasonable main method with optional final parameter
            /(?:public|static|final|synchronized|strictfp)\s+(?:public|static|final|synchronized|strictfp|\s)*\s*void\s+main\s*\(\s*(?:final\s+)?String\s*(?:\[\s*\]|\.\.\.)?\s*\w*\s*\)(?:\s*throws\s+[\w\s,]+)?/i
        ];
        const hasMain = mainMethodPatterns.some(pattern => pattern.test(cleanContent));
        // Debug logging - remove in production
        if (!hasMain && cleanContent.toLowerCase().includes('main')) {
            console.log('AutoBoot: Potential main method not detected in:', cleanContent.substring(0, 200));
        }
        return hasMain;
    }
    removeJavaComments(javaContent) {
        let cleanContent = javaContent;
        // Remove multi-line comments (/* */) first - including nested ones
        cleanContent = cleanContent.replace(/\/\*[\s\S]*?\*\//g, '');
        // Remove single-line comments (//) - but not in strings
        cleanContent = cleanContent.replace(/\/\/.*$/gm, '');
        // Remove Javadoc comments (/** */)
        cleanContent = cleanContent.replace(/\/\*\*[\s\S]*?\*\//g, '');
        // Clean up extra whitespace
        cleanContent = cleanContent.replace(/\s+/g, ' ').trim();
        return cleanContent;
    }
    async scanReadmeForInstructions(projectPath) {
        const readmeFiles = ['README.md', 'README.txt', 'readme.md', 'readme.txt', 'README'];
        const instructions = [];
        for (const readmeFile of readmeFiles) {
            const readmePath = path.join(projectPath, readmeFile);
            if (fs.existsSync(readmePath)) {
                try {
                    const content = fs.readFileSync(readmePath, 'utf8');
                    const extractedInstructions = this.extractRunInstructions(content);
                    instructions.push(...extractedInstructions);
                }
                catch (error) {
                    console.error(`Error reading ${readmeFile}:`, error);
                }
            }
        }
        return instructions;
    }
    extractRunInstructions(readmeContent) {
        const instructions = [];
        const lines = readmeContent.split('\n');
        // Look for common run instruction patterns
        const runPatterns = [
            /^\s*```?\s*(mvn|maven|gradle|java|docker)\s+(.+)$/i,
            /^\s*\$?\s*(mvn|gradle|java|docker)\s+(.+)$/i,
            /^\s*>\s*(mvn|gradle|java|docker)\s+(.+)$/i,
            /^\s*#\s*(mvn|gradle|java|docker)\s+(.+)$/i
        ];
        for (const line of lines) {
            for (const pattern of runPatterns) {
                const match = line.match(pattern);
                if (match) {
                    instructions.push(`${match[1]} ${match[2]}`.trim());
                }
            }
        }
        return instructions;
    }
    hasDockerfile(projectPath) {
        const dockerFiles = ['Dockerfile', 'dockerfile', 'Dockerfile.dev', 'docker-compose.yml', 'docker-compose.yaml'];
        return dockerFiles.some(file => fs.existsSync(path.join(projectPath, file)));
    }
    async getSmartJavaCommands(framework, packageManager, projectPath, mainClasses, readmeInstructions, hasDockerfile) {
        // Check README instructions first
        const readmeCommand = this.findBestReadmeCommand(readmeInstructions, packageManager);
        if (readmeCommand) {
            return {
                devScript: readmeCommand.split(' ').slice(1).join(' '),
                startCommand: readmeCommand,
                port: this.extractPortFromCommand(readmeCommand) || 8080
            };
        }
        // If Docker is available, offer Docker option
        if (hasDockerfile) {
            const dockerCommand = this.getDockerCommand(projectPath);
            const regularCommand = this.getJavaCommands(framework, packageManager);
            // Show user choice dialog (this would be implemented in the extension)
            // For now, prefer Docker if available
            if (dockerCommand) {
                return {
                    devScript: 'docker-run',
                    startCommand: dockerCommand,
                    port: 8080
                };
            }
        }
        // Use main class if found (prefer the first one, or let user choose later)
        if (mainClasses && mainClasses.length > 0) {
            const primaryMainClass = mainClasses[0]; // Use first main class as default
            if (packageManager === 'maven') {
                return {
                    devScript: 'exec:java',
                    startCommand: `mvn exec:java -Dexec.mainClass="${primaryMainClass}"`,
                    port: 8080
                };
            }
            else {
                return {
                    devScript: 'run',
                    startCommand: `./gradlew run -PmainClass=${primaryMainClass}`,
                    port: 8080
                };
            }
        }
        // Fall back to framework-specific commands
        return this.getJavaCommands(framework, packageManager);
    }
    findBestReadmeCommand(instructions, packageManager) {
        // Prefer commands that match the detected package manager
        const preferredCommands = instructions.filter(cmd => cmd.toLowerCase().includes(packageManager));
        if (preferredCommands.length > 0) {
            return preferredCommands[0];
        }
        // Fall back to any Java-related command
        const javaCommands = instructions.filter(cmd => cmd.toLowerCase().includes('java') ||
            cmd.toLowerCase().includes('mvn') ||
            cmd.toLowerCase().includes('gradle'));
        return javaCommands.length > 0 ? javaCommands[0] : null;
    }
    extractPortFromCommand(command) {
        const portPattern = /-Dserver\.port=(\d+)|-p\s+(\d+)|--port[=\s]+(\d+)|:(\d+)/;
        const match = command.match(portPattern);
        if (match) {
            const port = match[1] || match[2] || match[3] || match[4];
            return parseInt(port, 10);
        }
        return null;
    }
    getDockerCommand(projectPath) {
        if (fs.existsSync(path.join(projectPath, 'docker-compose.yml')) ||
            fs.existsSync(path.join(projectPath, 'docker-compose.yaml'))) {
            return 'docker-compose up';
        }
        else if (fs.existsSync(path.join(projectPath, 'Dockerfile'))) {
            return 'docker build -t app . && docker run -p 8080:8080 app';
        }
        return null;
    }
    // Go project analysis methods
    async detectGoFramework(projectPath) {
        try {
            // Check go.mod for framework dependencies
            const goModPath = path.join(projectPath, 'go.mod');
            if (fs.existsSync(goModPath)) {
                const goModContent = fs.readFileSync(goModPath, 'utf8');
                // Popular Go frameworks
                if (goModContent.includes('github.com/gin-gonic/gin')) {
                    return 'Gin';
                }
                if (goModContent.includes('github.com/gorilla/mux')) {
                    return 'Gorilla Mux';
                }
                if (goModContent.includes('github.com/labstack/echo')) {
                    return 'Echo';
                }
                if (goModContent.includes('github.com/gofiber/fiber')) {
                    return 'Fiber';
                }
                if (goModContent.includes('github.com/beego/beego')) {
                    return 'Beego';
                }
                if (goModContent.includes('github.com/revel/revel')) {
                    return 'Revel';
                }
                if (goModContent.includes('github.com/kataras/iris')) {
                    return 'Iris';
                }
                if (goModContent.includes('github.com/go-chi/chi')) {
                    return 'Chi';
                }
                if (goModContent.includes('google.golang.org/grpc')) {
                    return 'gRPC';
                }
                if (goModContent.includes('github.com/grpc-ecosystem/grpc-gateway')) {
                    return 'gRPC Gateway';
                }
            }
            // Check for main.go patterns
            const mainGoPath = path.join(projectPath, 'main.go');
            if (fs.existsSync(mainGoPath)) {
                const mainContent = fs.readFileSync(mainGoPath, 'utf8');
                if (mainContent.includes('gin.Default()') || mainContent.includes('gin.New()')) {
                    return 'Gin';
                }
                if (mainContent.includes('mux.NewRouter()')) {
                    return 'Gorilla Mux';
                }
                if (mainContent.includes('echo.New()')) {
                    return 'Echo';
                }
                if (mainContent.includes('fiber.New()')) {
                    return 'Fiber';
                }
                if (mainContent.includes('http.ListenAndServe')) {
                    return 'HTTP Server';
                }
                if (mainContent.includes('grpc.NewServer()')) {
                    return 'gRPC';
                }
            }
            return 'Go';
        }
        catch (error) {
            console.error('Error detecting Go framework:', error);
            return 'Go';
        }
    }
    async findGoMainFiles(projectPath) {
        try {
            const mainFiles = [];
            // Search for main.go files recursively
            const searchForMainGo = (dir, relativePath = '') => {
                try {
                    const files = fs.readdirSync(dir);
                    for (const file of files) {
                        const filePath = path.join(dir, file);
                        const stat = fs.statSync(filePath);
                        if (stat.isDirectory() && !file.startsWith('.') && file !== 'vendor') {
                            const newRelativePath = relativePath ? `${relativePath}/${file}` : file;
                            searchForMainGo(filePath, newRelativePath);
                        }
                        else if (file.endsWith('.go')) {
                            const content = fs.readFileSync(filePath, 'utf8');
                            if (this.hasGoMainFunction(content)) {
                                const fullPath = relativePath ? `${relativePath}/${file}` : file;
                                mainFiles.push(fullPath);
                            }
                        }
                    }
                }
                catch (error) {
                    // Skip directories we can't read
                }
            };
            searchForMainGo(projectPath);
            return mainFiles;
        }
        catch (error) {
            console.error('Error finding Go main files:', error);
            return [];
        }
    }
    hasGoMainFunction(goContent) {
        // Remove comments first
        const cleanContent = this.removeGoComments(goContent);
        // Look for main function pattern
        const mainFunctionPattern = /func\s+main\s*\(\s*\)\s*{/;
        return mainFunctionPattern.test(cleanContent);
    }
    removeGoComments(goContent) {
        // Remove single-line comments (//)
        let cleanContent = goContent.replace(/\/\/.*$/gm, '');
        // Remove multi-line comments (/* */)
        cleanContent = cleanContent.replace(/\/\*[\s\S]*?\*\//g, '');
        return cleanContent;
    }
    async getSmartGoCommands(framework, projectPath, mainFiles, readmeInstructions, hasDockerfile) {
        // Check README instructions first
        const readmeCommand = this.findBestReadmeCommand(readmeInstructions, 'go');
        if (readmeCommand) {
            return {
                devScript: readmeCommand.split(' ').slice(1).join(' '),
                startCommand: readmeCommand,
                port: this.extractPortFromCommand(readmeCommand) || this.getDefaultGoPort(framework)
            };
        }
        // If Docker is available, offer Docker option
        if (hasDockerfile) {
            const dockerCommand = this.getDockerCommand(projectPath);
            if (dockerCommand) {
                return {
                    devScript: 'docker-run',
                    startCommand: dockerCommand,
                    port: this.getDefaultGoPort(framework)
                };
            }
        }
        // Use main file if found
        if (mainFiles && mainFiles.length > 0) {
            const primaryMainFile = mainFiles[0];
            // Check if it's in a subdirectory (like cmd/server/main.go)
            if (primaryMainFile.includes('/')) {
                const dir = path.dirname(primaryMainFile);
                return {
                    devScript: 'run',
                    startCommand: `go run ./${dir}`,
                    port: this.getDefaultGoPort(framework)
                };
            }
            else {
                return {
                    devScript: 'run',
                    startCommand: `go run ${primaryMainFile}`,
                    port: this.getDefaultGoPort(framework)
                };
            }
        }
        // Fall back to standard go run
        return {
            devScript: 'run',
            startCommand: 'go run .',
            port: this.getDefaultGoPort(framework)
        };
    }
    getDefaultGoPort(framework) {
        switch (framework) {
            case 'Gin':
            case 'Echo':
            case 'Fiber':
            case 'HTTP Server':
                return 8080;
            case 'gRPC':
                return 50051;
            case 'Beego':
                return 8080;
            case 'Revel':
                return 9000;
            default:
                return 8080;
        }
    }
    // C# / .NET project analysis methods
    async detectDotNetFramework(projectPath) {
        try {
            // Check project files for framework information
            const projectFiles = fs.readdirSync(projectPath).filter(file => file.endsWith('.csproj') || file.endsWith('.vbproj') || file.endsWith('.fsproj'));
            for (const projectFile of projectFiles) {
                const projectPath_full = path.join(projectPath, projectFile);
                const projectContent = fs.readFileSync(projectPath_full, 'utf8');
                // ASP.NET Core detection
                if (projectContent.includes('Microsoft.AspNetCore') ||
                    projectContent.includes('Microsoft.AspNetCore.App')) {
                    if (projectContent.includes('Microsoft.AspNetCore.Blazor')) {
                        return 'Blazor Server';
                    }
                    if (projectContent.includes('Microsoft.AspNetCore.Components.WebAssembly')) {
                        return 'Blazor WebAssembly';
                    }
                    if (projectContent.includes('Microsoft.AspNetCore.Mvc')) {
                        return 'ASP.NET Core MVC';
                    }
                    if (projectContent.includes('Microsoft.AspNetCore.ApiExplorer')) {
                        return 'ASP.NET Core Web API';
                    }
                    return 'ASP.NET Core';
                }
                // Other frameworks
                if (projectContent.includes('Microsoft.EntityFrameworkCore')) {
                    return 'Entity Framework Core';
                }
                if (projectContent.includes('Microsoft.Extensions.Hosting')) {
                    return '.NET Generic Host';
                }
                if (projectContent.includes('Microsoft.AspNetCore.SignalR')) {
                    return 'SignalR';
                }
                if (projectContent.includes('Microsoft.Extensions.DependencyInjection')) {
                    return '.NET Core';
                }
                if (projectContent.includes('Xamarin')) {
                    return 'Xamarin';
                }
                if (projectContent.includes('Microsoft.WindowsDesktop.App')) {
                    return 'WPF/WinForms';
                }
                if (projectContent.includes('Microsoft.AspNetCore.Grpc')) {
                    return 'gRPC';
                }
                if (projectContent.includes('Microsoft.Azure.Functions')) {
                    return 'Azure Functions';
                }
                // Target framework detection
                if (projectContent.includes('<TargetFramework>net8.0</TargetFramework>')) {
                    return '.NET 8';
                }
                if (projectContent.includes('<TargetFramework>net7.0</TargetFramework>')) {
                    return '.NET 7';
                }
                if (projectContent.includes('<TargetFramework>net6.0</TargetFramework>')) {
                    return '.NET 6';
                }
                if (projectContent.includes('<TargetFramework>net5.0</TargetFramework>')) {
                    return '.NET 5';
                }
                if (projectContent.includes('<TargetFramework>netcoreapp')) {
                    return '.NET Core';
                }
                if (projectContent.includes('<TargetFramework>netstandard')) {
                    return '.NET Standard';
                }
                if (projectContent.includes('<TargetFramework>net4')) {
                    return '.NET Framework';
                }
            }
            // Check for global.json
            const globalJsonPath = path.join(projectPath, 'global.json');
            if (fs.existsSync(globalJsonPath)) {
                const globalJson = JSON.parse(fs.readFileSync(globalJsonPath, 'utf8'));
                if (globalJson.sdk?.version) {
                    return `.NET ${globalJson.sdk.version.split('.')[0]}`;
                }
            }
            return '.NET';
        }
        catch (error) {
            console.error('Error detecting .NET framework:', error);
            return '.NET';
        }
    }
    async findCSharpMainFiles(projectPath) {
        try {
            const mainFiles = [];
            // Search for Program.cs and Main methods recursively
            const searchForMainFiles = (dir, relativePath = '') => {
                try {
                    const files = fs.readdirSync(dir);
                    for (const file of files) {
                        const filePath = path.join(dir, file);
                        const stat = fs.statSync(filePath);
                        if (stat.isDirectory() && !file.startsWith('.') &&
                            file !== 'bin' && file !== 'obj' && file !== 'packages') {
                            const newRelativePath = relativePath ? `${relativePath}/${file}` : file;
                            searchForMainFiles(filePath, newRelativePath);
                        }
                        else if (file.endsWith('.cs') || file.endsWith('.vb') || file.endsWith('.fs')) {
                            const content = fs.readFileSync(filePath, 'utf8');
                            if (this.hasCSharpMainMethod(content) || file.toLowerCase() === 'program.cs') {
                                const fullPath = relativePath ? `${relativePath}/${file}` : file;
                                mainFiles.push(fullPath);
                            }
                        }
                    }
                }
                catch (error) {
                    // Skip directories we can't read
                }
            };
            searchForMainFiles(projectPath);
            return mainFiles;
        }
        catch (error) {
            console.error('Error finding C# main files:', error);
            return [];
        }
    }
    hasCSharpMainMethod(csharpContent) {
        // Remove comments first
        const cleanContent = this.removeCSharpComments(csharpContent);
        // Look for Main method patterns
        const mainMethodPatterns = [
            /static\s+void\s+Main\s*\(/,
            /static\s+int\s+Main\s*\(/,
            /static\s+async\s+Task\s+Main\s*\(/,
            /static\s+async\s+Task<int>\s+Main\s*\(/,
            /public\s+static\s+void\s+Main\s*\(/,
            /public\s+static\s+int\s+Main\s*\(/,
            /public\s+static\s+async\s+Task\s+Main\s*\(/,
            /public\s+static\s+async\s+Task<int>\s+Main\s*\(/
        ];
        return mainMethodPatterns.some(pattern => pattern.test(cleanContent));
    }
    removeCSharpComments(csharpContent) {
        // Remove single-line comments (//)
        let cleanContent = csharpContent.replace(/\/\/.*$/gm, '');
        // Remove multi-line comments (/* */)
        cleanContent = cleanContent.replace(/\/\*[\s\S]*?\*\//g, '');
        return cleanContent;
    }
    async getSmartDotNetCommands(framework, projectPath, mainFiles, readmeInstructions, hasDockerfile) {
        // Check README instructions first
        const readmeCommand = this.findBestReadmeCommand(readmeInstructions, 'dotnet');
        if (readmeCommand) {
            return {
                devScript: readmeCommand.split(' ').slice(1).join(' '),
                startCommand: readmeCommand,
                port: this.extractPortFromCommand(readmeCommand) || this.getDefaultDotNetPort(framework)
            };
        }
        // If Docker is available, offer Docker option
        if (hasDockerfile) {
            const dockerCommand = this.getDockerCommand(projectPath);
            if (dockerCommand) {
                return {
                    devScript: 'docker-run',
                    startCommand: dockerCommand,
                    port: this.getDefaultDotNetPort(framework)
                };
            }
        }
        // Check for specific project file
        const projectFiles = fs.readdirSync(projectPath).filter(file => file.endsWith('.csproj') || file.endsWith('.vbproj') || file.endsWith('.fsproj'));
        if (projectFiles.length > 0) {
            const projectFile = projectFiles[0];
            return {
                devScript: 'run',
                startCommand: `dotnet run --project ${projectFile}`,
                port: this.getDefaultDotNetPort(framework)
            };
        }
        // Fall back to standard dotnet run
        return {
            devScript: 'run',
            startCommand: 'dotnet run',
            port: this.getDefaultDotNetPort(framework)
        };
    }
    getDefaultDotNetPort(framework) {
        switch (framework) {
            case 'ASP.NET Core':
            case 'ASP.NET Core MVC':
            case 'ASP.NET Core Web API':
                return 5000; // Default Kestrel port
            case 'Blazor Server':
                return 5000;
            case 'Blazor WebAssembly':
                return 5000;
            case 'SignalR':
                return 5000;
            case 'gRPC':
                return 5001; // Default HTTPS port for gRPC
            case 'Azure Functions':
                return 7071; // Azure Functions local development port
            default:
                return 5000;
        }
    }
    async analyzeDotNetDependencies(projectPath) {
        try {
            const results = {
                language: 'C#/.NET',
                dependencies: [],
                vulnerabilities: 0,
                outdated: 0
            };
            // Check for project files
            const projectFiles = fs.readdirSync(projectPath).filter(file => file.endsWith('.csproj') || file.endsWith('.vbproj') || file.endsWith('.fsproj'));
            if (projectFiles.length > 0) {
                // Use dotnet list package to get dependencies
                try {
                    const { stdout } = await execAsync('dotnet list package', { cwd: projectPath });
                    const packageLines = stdout.split('\n').filter(line => line.includes('>') && !line.includes('Project') && !line.includes('---'));
                    results.dependencies = packageLines.map(line => line.trim());
                    results.totalDependencies = packageLines.length;
                }
                catch (listError) {
                    results.note = 'Run "dotnet restore" to ensure all packages are restored';
                }
                // Check for outdated packages
                try {
                    const { stdout: outdatedOutput } = await execAsync('dotnet list package --outdated', {
                        cwd: projectPath,
                        timeout: 30000
                    });
                    const outdatedLines = outdatedOutput.split('\n').filter(line => line.includes('>') && !line.includes('Project') && !line.includes('---'));
                    results.outdated = outdatedLines.length;
                    results.outdatedPackages = outdatedLines;
                }
                catch (outdatedError) {
                    results.outdatedNote = 'Could not check for outdated packages';
                }
                // Check for vulnerable packages
                try {
                    const { stdout: vulnOutput } = await execAsync('dotnet list package --vulnerable', {
                        cwd: projectPath,
                        timeout: 30000
                    });
                    const vulnLines = vulnOutput.split('\n').filter(line => line.includes('Vulnerable') || line.includes('Critical') || line.includes('High'));
                    results.vulnerabilities = vulnLines.length;
                    results.vulnerablePackages = vulnLines;
                }
                catch (vulnError) {
                    results.securityNote = 'Could not check for vulnerable packages';
                }
                // Parse project file for more details
                const projectFile = projectFiles[0];
                const projectContent = fs.readFileSync(path.join(projectPath, projectFile), 'utf8');
                // Extract target framework
                const targetFrameworkMatch = projectContent.match(/<TargetFramework>(.*?)<\/TargetFramework>/);
                if (targetFrameworkMatch) {
                    results.targetFramework = targetFrameworkMatch[1];
                }
                // Extract package references
                const packageRefs = projectContent.match(/<PackageReference[^>]*>/g);
                if (packageRefs) {
                    results.directDependencies = packageRefs.length;
                }
            }
            else {
                results.error = 'No .NET project files found (.csproj, .vbproj, .fsproj)';
            }
            return results;
        }
        catch (error) {
            return {
                language: 'C#/.NET',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    // Rust project analysis methods
    async detectRustFramework(projectPath) {
        try {
            // Check Cargo.toml for framework dependencies
            const cargoTomlPath = path.join(projectPath, 'Cargo.toml');
            if (fs.existsSync(cargoTomlPath)) {
                const cargoContent = fs.readFileSync(cargoTomlPath, 'utf8');
                // Popular Rust web frameworks
                if (cargoContent.includes('axum =')) {
                    return 'Axum';
                }
                if (cargoContent.includes('actix-web =')) {
                    return 'Actix Web';
                }
                if (cargoContent.includes('warp =')) {
                    return 'Warp';
                }
                if (cargoContent.includes('rocket =')) {
                    return 'Rocket';
                }
                if (cargoContent.includes('tide =')) {
                    return 'Tide';
                }
                if (cargoContent.includes('hyper =')) {
                    return 'Hyper';
                }
                if (cargoContent.includes('tokio-tungstenite =')) {
                    return 'WebSocket (Tokio)';
                }
                if (cargoContent.includes('tonic =')) {
                    return 'gRPC (Tonic)';
                }
                // Async runtimes
                if (cargoContent.includes('tokio =')) {
                    return 'Tokio';
                }
                if (cargoContent.includes('async-std =')) {
                    return 'Async-std';
                }
                // CLI frameworks
                if (cargoContent.includes('clap =')) {
                    return 'CLI (Clap)';
                }
                if (cargoContent.includes('structopt =')) {
                    return 'CLI (StructOpt)';
                }
                // Game engines
                if (cargoContent.includes('bevy =')) {
                    return 'Bevy Game Engine';
                }
                if (cargoContent.includes('ggez =')) {
                    return 'GGEZ Game Framework';
                }
                // Desktop GUI
                if (cargoContent.includes('tauri =')) {
                    return 'Tauri';
                }
                if (cargoContent.includes('egui =')) {
                    return 'egui';
                }
                if (cargoContent.includes('iced =')) {
                    return 'Iced';
                }
                // Check for binary vs library
                if (cargoContent.includes('[[bin]]') || cargoContent.includes('name = "main"')) {
                    return 'Rust Binary';
                }
                if (cargoContent.includes('[lib]')) {
                    return 'Rust Library';
                }
            }
            // Check for main.rs patterns
            const mainRsPath = path.join(projectPath, 'src', 'main.rs');
            if (fs.existsSync(mainRsPath)) {
                const mainContent = fs.readFileSync(mainRsPath, 'utf8');
                if (mainContent.includes('axum::')) {
                    return 'Axum';
                }
                if (mainContent.includes('actix_web::')) {
                    return 'Actix Web';
                }
                if (mainContent.includes('warp::')) {
                    return 'Warp';
                }
                if (mainContent.includes('rocket::')) {
                    return 'Rocket';
                }
                if (mainContent.includes('tide::')) {
                    return 'Tide';
                }
                if (mainContent.includes('hyper::')) {
                    return 'Hyper';
                }
                if (mainContent.includes('tokio::main')) {
                    return 'Tokio';
                }
                if (mainContent.includes('async_std::main')) {
                    return 'Async-std';
                }
                return 'Rust Binary';
            }
            // Check for lib.rs
            const libRsPath = path.join(projectPath, 'src', 'lib.rs');
            if (fs.existsSync(libRsPath)) {
                return 'Rust Library';
            }
            return 'Rust';
        }
        catch (error) {
            console.error('Error detecting Rust framework:', error);
            return 'Rust';
        }
    }
    async findRustMainFiles(projectPath) {
        try {
            const mainFiles = [];
            // Search for main.rs and lib.rs files
            const searchForRustFiles = (dir, relativePath = '') => {
                try {
                    const files = fs.readdirSync(dir);
                    for (const file of files) {
                        const filePath = path.join(dir, file);
                        const stat = fs.statSync(filePath);
                        if (stat.isDirectory() && !file.startsWith('.') && file !== 'target') {
                            const newRelativePath = relativePath ? `${relativePath}/${file}` : file;
                            searchForRustFiles(filePath, newRelativePath);
                        }
                        else if (file.endsWith('.rs')) {
                            const content = fs.readFileSync(filePath, 'utf8');
                            if (this.hasRustMainFunction(content) ||
                                file === 'main.rs' ||
                                file === 'lib.rs') {
                                const fullPath = relativePath ? `${relativePath}/${file}` : file;
                                mainFiles.push(fullPath);
                            }
                        }
                    }
                }
                catch (error) {
                    // Skip directories we can't read
                }
            };
            searchForRustFiles(projectPath);
            return mainFiles;
        }
        catch (error) {
            console.error('Error finding Rust main files:', error);
            return [];
        }
    }
    hasRustMainFunction(rustContent) {
        // Remove comments first
        const cleanContent = this.removeRustComments(rustContent);
        // Look for main function patterns
        const mainFunctionPatterns = [
            /fn\s+main\s*\(\s*\)\s*{/,
            /#\[tokio::main\]/,
            /#\[async_std::main\]/,
            /#\[actix_web::main\]/
        ];
        return mainFunctionPatterns.some(pattern => pattern.test(cleanContent));
    }
    removeRustComments(rustContent) {
        // Remove single-line comments (//)
        let cleanContent = rustContent.replace(/\/\/.*$/gm, '');
        // Remove multi-line comments (/* */)
        cleanContent = cleanContent.replace(/\/\*[\s\S]*?\*\//g, '');
        return cleanContent;
    }
    async getSmartRustCommands(framework, projectPath, mainFiles, readmeInstructions, hasDockerfile) {
        // Check README instructions first
        const readmeCommand = this.findBestReadmeCommand(readmeInstructions, 'cargo');
        if (readmeCommand) {
            return {
                devScript: readmeCommand.split(' ').slice(1).join(' '),
                startCommand: readmeCommand,
                port: this.extractPortFromCommand(readmeCommand) || this.getDefaultRustPort(framework)
            };
        }
        // If Docker is available, offer Docker option
        if (hasDockerfile) {
            const dockerCommand = this.getDockerCommand(projectPath);
            if (dockerCommand) {
                return {
                    devScript: 'docker-run',
                    startCommand: dockerCommand,
                    port: this.getDefaultRustPort(framework)
                };
            }
        }
        // Check Cargo.toml for specific run configurations
        const cargoTomlPath = path.join(projectPath, 'Cargo.toml');
        if (fs.existsSync(cargoTomlPath)) {
            const cargoContent = fs.readFileSync(cargoTomlPath, 'utf8');
            // Check for multiple binaries
            const binMatches = cargoContent.match(/\[\[bin\]\]/g);
            if (binMatches && binMatches.length > 1) {
                // Multiple binaries, use the first main file or default
                if (mainFiles && mainFiles.length > 0) {
                    const binaryName = path.basename(mainFiles[0], '.rs');
                    return {
                        devScript: 'run',
                        startCommand: `cargo run --bin ${binaryName}`,
                        port: this.getDefaultRustPort(framework)
                    };
                }
            }
        }
        // Determine run command based on framework
        if (framework.includes('Library')) {
            return {
                devScript: 'test',
                startCommand: 'cargo test',
                port: this.getDefaultRustPort(framework)
            };
        }
        else {
            return {
                devScript: 'run',
                startCommand: 'cargo run',
                port: this.getDefaultRustPort(framework)
            };
        }
    }
    getDefaultRustPort(framework) {
        switch (framework) {
            case 'Axum':
            case 'Actix Web':
            case 'Warp':
            case 'Hyper':
                return 3000;
            case 'Rocket':
                return 8000;
            case 'Tide':
                return 8080;
            case 'gRPC (Tonic)':
                return 50051;
            case 'Tauri':
                return 1420; // Tauri dev server
            default:
                return 3000;
        }
    }
    async analyzeRustDependencies(projectPath) {
        try {
            const results = {
                language: 'Rust',
                dependencies: [],
                vulnerabilities: 0,
                outdated: 0
            };
            // Check for Cargo.toml
            if (fs.existsSync(path.join(projectPath, 'Cargo.toml'))) {
                const cargoContent = fs.readFileSync(path.join(projectPath, 'Cargo.toml'), 'utf8');
                // Parse dependencies from Cargo.toml
                const depsSection = cargoContent.match(/\[dependencies\]([\s\S]*?)(?=\[|$)/);
                if (depsSection) {
                    const deps = depsSection[1]
                        .split('\n')
                        .map(line => line.trim())
                        .filter(line => line && !line.startsWith('#') && line.includes('='))
                        .map(line => line.split('=')[0].trim());
                    results.dependencies = deps;
                }
                // Use cargo tree to get dependency tree
                try {
                    const { stdout } = await execAsync('cargo tree', { cwd: projectPath });
                    results.dependencyTree = stdout;
                    const treeLines = stdout.split('\n').filter(line => line.trim());
                    results.totalDependencies = treeLines.length;
                }
                catch (treeError) {
                    results.note = 'Run "cargo build" to ensure all dependencies are available';
                    results.totalDependencies = results.dependencies.length;
                }
                // Check for security vulnerabilities using cargo-audit
                try {
                    const { stdout: auditOutput } = await execAsync('cargo audit', {
                        cwd: projectPath,
                        timeout: 30000
                    });
                    if (auditOutput.includes('No vulnerabilities found')) {
                        results.vulnerabilities = 0;
                        results.securityStatus = 'Clean';
                    }
                    else {
                        const vulnMatches = auditOutput.match(/(\d+)\s+vulnerabilit/);
                        results.vulnerabilities = vulnMatches ? parseInt(vulnMatches[1]) : 0;
                    }
                }
                catch (auditError) {
                    results.securityNote = 'Install cargo-audit for security analysis: cargo install cargo-audit';
                }
                // Check for outdated dependencies using cargo-outdated
                try {
                    const { stdout: outdatedOutput } = await execAsync('cargo outdated', { cwd: projectPath });
                    const outdatedLines = outdatedOutput.split('\n').filter(line => line.includes('->') && !line.includes('Name'));
                    results.outdated = outdatedLines.length;
                    results.outdatedDependencies = outdatedLines;
                }
                catch (outdatedError) {
                    results.outdatedNote = 'Install cargo-outdated for update checking: cargo install cargo-outdated';
                }
                // Parse Cargo.toml for more details
                const editionMatch = cargoContent.match(/edition\s*=\s*"(\d+)"/);
                if (editionMatch) {
                    results.rustEdition = editionMatch[1];
                }
                const versionMatch = cargoContent.match(/version\s*=\s*"([^"]+)"/);
                if (versionMatch) {
                    results.packageVersion = versionMatch[1];
                }
            }
            else {
                results.error = 'No Cargo.toml file found. Run "cargo init" to initialize a Rust project.';
            }
            return results;
        }
        catch (error) {
            return {
                language: 'Rust',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    // Ruby project analysis methods
    async detectRubyFramework(projectPath) {
        try {
            // Check for Rails
            if (fs.existsSync(path.join(projectPath, 'config', 'application.rb'))) {
                const appRbContent = fs.readFileSync(path.join(projectPath, 'config', 'application.rb'), 'utf8');
                if (appRbContent.includes('Rails::Application')) {
                    // Detect Rails version from Gemfile
                    const gemfilePath = path.join(projectPath, 'Gemfile');
                    if (fs.existsSync(gemfilePath)) {
                        const gemfileContent = fs.readFileSync(gemfilePath, 'utf8');
                        const railsMatch = gemfileContent.match(/gem\s+['"]rails['"],?\s*['"]([^'"]+)['"]/);
                        if (railsMatch) {
                            return `Rails ${railsMatch[1]}`;
                        }
                    }
                    return 'Ruby on Rails';
                }
            }
            // Check Gemfile for frameworks
            const gemfilePath = path.join(projectPath, 'Gemfile');
            if (fs.existsSync(gemfilePath)) {
                const gemfileContent = fs.readFileSync(gemfilePath, 'utf8');
                // Web frameworks
                if (gemfileContent.includes('gem "sinatra"') || gemfileContent.includes("gem 'sinatra'")) {
                    return 'Sinatra';
                }
                if (gemfileContent.includes('gem "hanami"') || gemfileContent.includes("gem 'hanami'")) {
                    return 'Hanami';
                }
                if (gemfileContent.includes('gem "roda"') || gemfileContent.includes("gem 'roda'")) {
                    return 'Roda';
                }
                if (gemfileContent.includes('gem "grape"') || gemfileContent.includes("gem 'grape'")) {
                    return 'Grape API';
                }
                if (gemfileContent.includes('gem "cuba"') || gemfileContent.includes("gem 'cuba'")) {
                    return 'Cuba';
                }
                if (gemfileContent.includes('gem "padrino"') || gemfileContent.includes("gem 'padrino'")) {
                    return 'Padrino';
                }
                // Testing frameworks
                if (gemfileContent.includes('gem "rspec"') || gemfileContent.includes("gem 'rspec'")) {
                    return 'RSpec';
                }
                if (gemfileContent.includes('gem "minitest"') || gemfileContent.includes("gem 'minitest'")) {
                    return 'Minitest';
                }
                // Background job frameworks
                if (gemfileContent.includes('gem "sidekiq"') || gemfileContent.includes("gem 'sidekiq'")) {
                    return 'Sidekiq';
                }
                if (gemfileContent.includes('gem "resque"') || gemfileContent.includes("gem 'resque'")) {
                    return 'Resque';
                }
                // CLI frameworks
                if (gemfileContent.includes('gem "thor"') || gemfileContent.includes("gem 'thor'")) {
                    return 'Thor CLI';
                }
                if (gemfileContent.includes('gem "gli"') || gemfileContent.includes("gem 'gli'")) {
                    return 'GLI CLI';
                }
                // Game frameworks
                if (gemfileContent.includes('gem "gosu"') || gemfileContent.includes("gem 'gosu'")) {
                    return 'Gosu Game';
                }
            }
            // Check for config.ru (Rack application)
            if (fs.existsSync(path.join(projectPath, 'config.ru'))) {
                const configRuContent = fs.readFileSync(path.join(projectPath, 'config.ru'), 'utf8');
                if (configRuContent.includes('Sinatra')) {
                    return 'Sinatra';
                }
                if (configRuContent.includes('Hanami')) {
                    return 'Hanami';
                }
                if (configRuContent.includes('Roda')) {
                    return 'Roda';
                }
                return 'Rack Application';
            }
            // Check for specific file patterns
            if (fs.existsSync(path.join(projectPath, 'app.rb'))) {
                return 'Sinatra';
            }
            if (fs.existsSync(path.join(projectPath, 'Rakefile'))) {
                return 'Rake';
            }
            return 'Ruby';
        }
        catch (error) {
            console.error('Error detecting Ruby framework:', error);
            return 'Ruby';
        }
    }
    async findRubyMainFiles(projectPath) {
        try {
            const mainFiles = [];
            // Search for Ruby entry points
            const searchForRubyFiles = (dir, relativePath = '') => {
                try {
                    const files = fs.readdirSync(dir);
                    for (const file of files) {
                        const filePath = path.join(dir, file);
                        const stat = fs.statSync(filePath);
                        if (stat.isDirectory() && !file.startsWith('.') &&
                            file !== 'vendor' && file !== 'tmp' && file !== 'log') {
                            const newRelativePath = relativePath ? `${relativePath}/${file}` : file;
                            searchForRubyFiles(filePath, newRelativePath);
                        }
                        else if (file.endsWith('.rb')) {
                            // Check for common entry point files
                            if (file === 'app.rb' ||
                                file === 'main.rb' ||
                                file === 'server.rb' ||
                                file === 'application.rb' ||
                                this.hasRubyMainCode(fs.readFileSync(filePath, 'utf8'))) {
                                const fullPath = relativePath ? `${relativePath}/${file}` : file;
                                mainFiles.push(fullPath);
                            }
                        }
                    }
                }
                catch (error) {
                    // Skip directories we can't read
                }
            };
            searchForRubyFiles(projectPath);
            // Add Rails-specific entry points
            if (fs.existsSync(path.join(projectPath, 'config', 'application.rb'))) {
                mainFiles.push('config/application.rb');
            }
            if (fs.existsSync(path.join(projectPath, 'config.ru'))) {
                mainFiles.push('config.ru');
            }
            return [...new Set(mainFiles)]; // Remove duplicates
        }
        catch (error) {
            console.error('Error finding Ruby main files:', error);
            return [];
        }
    }
    hasRubyMainCode(rubyContent) {
        // Remove comments first
        const cleanContent = this.removeRubyComments(rubyContent);
        // Look for main execution patterns
        const mainPatterns = [
            /if\s+__FILE__\s*==\s*\$0/,
            /if\s+\$0\s*==\s*__FILE__/,
            /if\s+\$PROGRAM_NAME\s*==\s*__FILE__/,
            /Sinatra::Base/,
            /class.*< Sinatra::Base/,
            /get\s+['"][^'"]*['"].*do/,
            /post\s+['"][^'"]*['"].*do/,
            /put\s+['"][^'"]*['"].*do/,
            /delete\s+['"][^'"]*['"].*do/,
            /run\s+\w+/ // Rack run command
        ];
        return mainPatterns.some(pattern => pattern.test(cleanContent));
    }
    removeRubyComments(rubyContent) {
        // Remove single-line comments (#)
        let cleanContent = rubyContent.replace(/#.*$/gm, '');
        // Remove multi-line comments (=begin...=end)
        cleanContent = cleanContent.replace(/^=begin[\s\S]*?^=end/gm, '');
        return cleanContent;
    }
    async getSmartRubyCommands(framework, projectPath, mainFiles, readmeInstructions, hasDockerfile) {
        // Check README instructions first
        const readmeCommand = this.findBestReadmeCommand(readmeInstructions, 'ruby');
        if (readmeCommand) {
            return {
                devScript: readmeCommand.split(' ').slice(1).join(' '),
                startCommand: readmeCommand,
                port: this.extractPortFromCommand(readmeCommand) || this.getDefaultRubyPort(framework)
            };
        }
        // If Docker is available, offer Docker option
        if (hasDockerfile) {
            const dockerCommand = this.getDockerCommand(projectPath);
            if (dockerCommand) {
                return {
                    devScript: 'docker-run',
                    startCommand: dockerCommand,
                    port: this.getDefaultRubyPort(framework)
                };
            }
        }
        // Framework-specific commands
        switch (framework) {
            case 'Ruby on Rails':
            case 'Rails':
                return {
                    devScript: 'server',
                    startCommand: 'rails server',
                    port: 3000
                };
            case 'Sinatra':
                if (mainFiles.length > 0) {
                    const mainFile = mainFiles.find(f => f.includes('app.rb')) || mainFiles[0];
                    return {
                        devScript: 'run',
                        startCommand: `ruby ${mainFile}`,
                        port: 4567
                    };
                }
                return {
                    devScript: 'run',
                    startCommand: 'ruby app.rb',
                    port: 4567
                };
            case 'Hanami':
                return {
                    devScript: 'server',
                    startCommand: 'hanami server',
                    port: 2300
                };
            case 'Roda':
            case 'Grape API':
            case 'Cuba':
                if (fs.existsSync(path.join(projectPath, 'config.ru'))) {
                    return {
                        devScript: 'run',
                        startCommand: 'rackup config.ru',
                        port: 9292
                    };
                }
                break;
            case 'Padrino':
                return {
                    devScript: 'start',
                    startCommand: 'padrino start',
                    port: 3000
                };
            case 'RSpec':
                return {
                    devScript: 'test',
                    startCommand: 'rspec',
                    port: 3000
                };
            case 'Minitest':
                return {
                    devScript: 'test',
                    startCommand: 'ruby -Itest test/test_*.rb',
                    port: 3000
                };
        }
        // Check for Bundler
        if (fs.existsSync(path.join(projectPath, 'Gemfile'))) {
            if (fs.existsSync(path.join(projectPath, 'config.ru'))) {
                return {
                    devScript: 'run',
                    startCommand: 'bundle exec rackup',
                    port: 9292
                };
            }
            if (mainFiles.length > 0) {
                return {
                    devScript: 'run',
                    startCommand: `bundle exec ruby ${mainFiles[0]}`,
                    port: this.getDefaultRubyPort(framework)
                };
            }
        }
        // Fallback to basic Ruby execution
        if (mainFiles.length > 0) {
            return {
                devScript: 'run',
                startCommand: `ruby ${mainFiles[0]}`,
                port: this.getDefaultRubyPort(framework)
            };
        }
        return {
            devScript: 'run',
            startCommand: 'ruby app.rb',
            port: this.getDefaultRubyPort(framework)
        };
    }
    getDefaultRubyPort(framework) {
        switch (framework) {
            case 'Ruby on Rails':
            case 'Rails':
            case 'Padrino':
                return 3000;
            case 'Sinatra':
                return 4567;
            case 'Hanami':
                return 2300;
            case 'Roda':
            case 'Grape API':
            case 'Cuba':
            case 'Rack Application':
                return 9292;
            default:
                return 3000;
        }
    }
    async analyzeRubyDependencies(projectPath) {
        try {
            const results = {
                language: 'Ruby',
                dependencies: [],
                vulnerabilities: 0,
                outdated: 0
            };
            // Check for Gemfile
            if (fs.existsSync(path.join(projectPath, 'Gemfile'))) {
                const gemfileContent = fs.readFileSync(path.join(projectPath, 'Gemfile'), 'utf8');
                // Parse gems from Gemfile
                const gemMatches = gemfileContent.match(/gem\s+['"][^'"]+['"]/g);
                if (gemMatches) {
                    results.dependencies = gemMatches.map(match => {
                        const gemName = match.match(/gem\s+['"]([^'"]+)['"]/);
                        return gemName ? gemName[1] : match;
                    });
                }
                // Use bundle list to get installed gems
                try {
                    const { stdout } = await execAsync('bundle list', { cwd: projectPath });
                    const bundleLines = stdout.split('\n').filter(line => line.includes('*') && !line.includes('gems included'));
                    results.installedGems = bundleLines.map(line => line.trim());
                    results.totalDependencies = bundleLines.length;
                }
                catch (bundleError) {
                    results.note = 'Run "bundle install" to install gems';
                    results.totalDependencies = results.dependencies.length;
                }
                // Check for outdated gems
                try {
                    const { stdout: outdatedOutput } = await execAsync('bundle outdated', {
                        cwd: projectPath,
                        timeout: 30000
                    });
                    const outdatedLines = outdatedOutput.split('\n').filter(line => line.includes('*') && line.includes('(newest'));
                    results.outdated = outdatedLines.length;
                    results.outdatedGems = outdatedLines;
                }
                catch (outdatedError) {
                    results.outdatedNote = 'Could not check for outdated gems';
                }
                // Check for security vulnerabilities using bundle-audit
                try {
                    const { stdout: auditOutput } = await execAsync('bundle-audit check', {
                        cwd: projectPath,
                        timeout: 30000
                    });
                    if (auditOutput.includes('No vulnerabilities found')) {
                        results.vulnerabilities = 0;
                        results.securityStatus = 'Clean';
                    }
                    else {
                        const vulnMatches = auditOutput.match(/(\d+)\s+vulnerabilit/);
                        results.vulnerabilities = vulnMatches ? parseInt(vulnMatches[1]) : 0;
                    }
                }
                catch (auditError) {
                    results.securityNote = 'Install bundle-audit for security analysis: gem install bundle-audit';
                }
                // Parse Ruby version from Gemfile
                const rubyVersionMatch = gemfileContent.match(/ruby\s+['"]([^'"]+)['"]/);
                if (rubyVersionMatch) {
                    results.rubyVersion = rubyVersionMatch[1];
                }
                // Check for .ruby-version file
                const rubyVersionPath = path.join(projectPath, '.ruby-version');
                if (fs.existsSync(rubyVersionPath)) {
                    const versionContent = fs.readFileSync(rubyVersionPath, 'utf8').trim();
                    results.rubyVersionFile = versionContent;
                }
            }
            else {
                results.error = 'No Gemfile found. Run "bundle init" to initialize a Ruby project with Bundler.';
            }
            return results;
        }
        catch (error) {
            return {
                language: 'Ruby',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    // PHP project analysis methods
    async detectPHPFramework(projectPath) {
        try {
            // Check for Laravel
            if (fs.existsSync(path.join(projectPath, 'artisan'))) {
                const composerPath = path.join(projectPath, 'composer.json');
                if (fs.existsSync(composerPath)) {
                    const composerContent = fs.readFileSync(composerPath, 'utf8');
                    const composerData = JSON.parse(composerContent);
                    if (composerData.require && composerData.require['laravel/framework']) {
                        const version = composerData.require['laravel/framework'];
                        return `Laravel ${version}`;
                    }
                }
                return 'Laravel';
            }
            // Check for Symfony
            if (fs.existsSync(path.join(projectPath, 'bin', 'console')) ||
                fs.existsSync(path.join(projectPath, 'symfony.lock'))) {
                return 'Symfony';
            }
            // Check composer.json for frameworks
            const composerPath = path.join(projectPath, 'composer.json');
            if (fs.existsSync(composerPath)) {
                const composerContent = fs.readFileSync(composerPath, 'utf8');
                const composerData = JSON.parse(composerContent);
                if (composerData.require) {
                    const deps = composerData.require;
                    // Web frameworks
                    if (deps['laravel/framework']) {
                        return 'Laravel';
                    }
                    if (deps['symfony/symfony'] || deps['symfony/framework-bundle']) {
                        return 'Symfony';
                    }
                    if (deps['codeigniter4/framework'] || deps['codeigniter/framework']) {
                        return 'CodeIgniter';
                    }
                    if (deps['cakephp/cakephp']) {
                        return 'CakePHP';
                    }
                    if (deps['zendframework/zendframework'] || deps['laminas/laminas-mvc']) {
                        return 'Laminas/Zend';
                    }
                    if (deps['yiisoft/yii2'] || deps['yiisoft/yii']) {
                        return 'Yii';
                    }
                    if (deps['phalcon/phalcon']) {
                        return 'Phalcon';
                    }
                    if (deps['slim/slim']) {
                        return 'Slim Framework';
                    }
                    if (deps['lumen/lumen'] || deps['laravel/lumen-framework']) {
                        return 'Lumen';
                    }
                    // Micro frameworks
                    if (deps['silex/silex']) {
                        return 'Silex';
                    }
                    if (deps['flight/flight']) {
                        return 'Flight';
                    }
                    if (deps['klein/klein']) {
                        return 'Klein';
                    }
                    // CMS
                    if (deps['wordpress/wordpress'] || deps['johnpbloch/wordpress']) {
                        return 'WordPress';
                    }
                    if (deps['drupal/core'] || deps['drupal/drupal']) {
                        return 'Drupal';
                    }
                    if (deps['joomla/joomla-cms']) {
                        return 'Joomla';
                    }
                    // Testing frameworks
                    if (deps['phpunit/phpunit']) {
                        return 'PHPUnit';
                    }
                    if (deps['codeception/codeception']) {
                        return 'Codeception';
                    }
                    if (deps['behat/behat']) {
                        return 'Behat';
                    }
                }
            }
            // Check for WordPress
            if (fs.existsSync(path.join(projectPath, 'wp-config.php')) ||
                fs.existsSync(path.join(projectPath, 'wp-content'))) {
                return 'WordPress';
            }
            // Check for Drupal
            if (fs.existsSync(path.join(projectPath, 'core', 'drupal.php')) ||
                fs.existsSync(path.join(projectPath, 'sites', 'default'))) {
                return 'Drupal';
            }
            // Check for Joomla
            if (fs.existsSync(path.join(projectPath, 'configuration.php')) ||
                fs.existsSync(path.join(projectPath, 'administrator', 'index.php'))) {
                return 'Joomla';
            }
            // Check for common PHP patterns
            if (fs.existsSync(path.join(projectPath, 'index.php'))) {
                const indexContent = fs.readFileSync(path.join(projectPath, 'index.php'), 'utf8');
                if (indexContent.includes('Laravel')) {
                    return 'Laravel';
                }
                if (indexContent.includes('Symfony')) {
                    return 'Symfony';
                }
                if (indexContent.includes('CodeIgniter')) {
                    return 'CodeIgniter';
                }
                if (indexContent.includes('CakePHP')) {
                    return 'CakePHP';
                }
            }
            return 'PHP';
        }
        catch (error) {
            console.error('Error detecting PHP framework:', error);
            return 'PHP';
        }
    }
    async findPHPMainFiles(projectPath) {
        try {
            const mainFiles = [];
            // Search for PHP entry points
            const searchForPHPFiles = (dir, relativePath = '') => {
                try {
                    const files = fs.readdirSync(dir);
                    for (const file of files) {
                        const filePath = path.join(dir, file);
                        const stat = fs.statSync(filePath);
                        if (stat.isDirectory() && !file.startsWith('.') &&
                            file !== 'vendor' && file !== 'node_modules' && file !== 'storage' && file !== 'cache') {
                            const newRelativePath = relativePath ? `${relativePath}/${file}` : file;
                            searchForPHPFiles(filePath, newRelativePath);
                        }
                        else if (file.endsWith('.php')) {
                            // Check for common entry point files
                            if (file === 'index.php' ||
                                file === 'app.php' ||
                                file === 'bootstrap.php' ||
                                file === 'server.php' ||
                                file === 'public.php' ||
                                this.hasPHPMainCode(fs.readFileSync(filePath, 'utf8'))) {
                                const fullPath = relativePath ? `${relativePath}/${file}` : file;
                                mainFiles.push(fullPath);
                            }
                        }
                    }
                }
                catch (error) {
                    // Skip directories we can't read
                }
            };
            searchForPHPFiles(projectPath);
            // Add framework-specific entry points
            if (fs.existsSync(path.join(projectPath, 'public', 'index.php'))) {
                mainFiles.push('public/index.php');
            }
            if (fs.existsSync(path.join(projectPath, 'web', 'index.php'))) {
                mainFiles.push('web/index.php');
            }
            if (fs.existsSync(path.join(projectPath, 'artisan'))) {
                mainFiles.push('artisan');
            }
            if (fs.existsSync(path.join(projectPath, 'bin', 'console'))) {
                mainFiles.push('bin/console');
            }
            return [...new Set(mainFiles)]; // Remove duplicates
        }
        catch (error) {
            console.error('Error finding PHP main files:', error);
            return [];
        }
    }
    hasPHPMainCode(phpContent) {
        // Remove comments first
        const cleanContent = this.removePHPComments(phpContent);
        // Look for main execution patterns
        const mainPatterns = [
            /<\?php/,
            /require_once.*bootstrap/,
            /require_once.*autoload/,
            /include.*config/,
            /new\s+Application/,
            /\$app\s*=\s*new/,
            /Router::/,
            /Route::/,
            /\$_GET\[/,
            /\$_POST\[/,
            /header\s*\(/,
            /session_start\s*\(/,
            /mysqli_connect/,
            /PDO::/ // PDO database
        ];
        return mainPatterns.some(pattern => pattern.test(cleanContent));
    }
    removePHPComments(phpContent) {
        // Remove single-line comments (//)
        let cleanContent = phpContent.replace(/\/\/.*$/gm, '');
        // Remove hash comments (#)
        cleanContent = cleanContent.replace(/#.*$/gm, '');
        // Remove multi-line comments (/* */)
        cleanContent = cleanContent.replace(/\/\*[\s\S]*?\*\//g, '');
        return cleanContent;
    }
    async getSmartPHPCommands(framework, projectPath, mainFiles, readmeInstructions, hasDockerfile) {
        // Check README instructions first
        const readmeCommand = this.findBestReadmeCommand(readmeInstructions, 'php');
        if (readmeCommand) {
            return {
                devScript: readmeCommand.split(' ').slice(1).join(' '),
                startCommand: readmeCommand,
                port: this.extractPortFromCommand(readmeCommand) || this.getDefaultPHPPort(framework)
            };
        }
        // If Docker is available, offer Docker option
        if (hasDockerfile) {
            const dockerCommand = this.getDockerCommand(projectPath);
            if (dockerCommand) {
                return {
                    devScript: 'docker-run',
                    startCommand: dockerCommand,
                    port: this.getDefaultPHPPort(framework)
                };
            }
        }
        // Framework-specific commands
        switch (framework) {
            case 'Laravel':
                return {
                    devScript: 'serve',
                    startCommand: 'php artisan serve',
                    port: 8000
                };
            case 'Symfony':
                if (fs.existsSync(path.join(projectPath, 'bin', 'console'))) {
                    return {
                        devScript: 'server:run',
                        startCommand: 'php bin/console server:run',
                        port: 8000
                    };
                }
                break;
            case 'CodeIgniter':
                return {
                    devScript: 'serve',
                    startCommand: 'php spark serve',
                    port: 8080
                };
            case 'CakePHP':
                if (fs.existsSync(path.join(projectPath, 'bin', 'cake'))) {
                    return {
                        devScript: 'server',
                        startCommand: 'bin/cake server',
                        port: 8765
                    };
                }
                break;
            case 'Slim Framework':
            case 'Lumen':
                if (fs.existsSync(path.join(projectPath, 'public', 'index.php'))) {
                    return {
                        devScript: 'serve',
                        startCommand: 'php -S localhost:8000 -t public',
                        port: 8000
                    };
                }
                break;
            case 'WordPress':
                return {
                    devScript: 'serve',
                    startCommand: 'php -S localhost:8080',
                    port: 8080
                };
            case 'Drupal':
                if (fs.existsSync(path.join(projectPath, 'web'))) {
                    return {
                        devScript: 'serve',
                        startCommand: 'php -S localhost:8888 -t web',
                        port: 8888
                    };
                }
                break;
        }
        // Check for Composer scripts
        const composerPath = path.join(projectPath, 'composer.json');
        if (fs.existsSync(composerPath)) {
            const composerContent = fs.readFileSync(composerPath, 'utf8');
            const composerData = JSON.parse(composerContent);
            if (composerData.scripts) {
                if (composerData.scripts.serve || composerData.scripts.start) {
                    const script = composerData.scripts.serve || composerData.scripts.start;
                    return {
                        devScript: 'serve',
                        startCommand: `composer run-script ${composerData.scripts.serve ? 'serve' : 'start'}`,
                        port: this.getDefaultPHPPort(framework)
                    };
                }
            }
        }
        // Fallback to built-in PHP server
        if (mainFiles.length > 0) {
            const mainFile = mainFiles.find(f => f.includes('index.php')) || mainFiles[0];
            const dir = path.dirname(mainFile);
            if (dir && dir !== '.') {
                return {
                    devScript: 'serve',
                    startCommand: `php -S localhost:8000 -t ${dir}`,
                    port: 8000
                };
            }
            else {
                return {
                    devScript: 'serve',
                    startCommand: `php -S localhost:8000`,
                    port: 8000
                };
            }
        }
        return {
            devScript: 'serve',
            startCommand: 'php -S localhost:8000',
            port: 8000
        };
    }
    getDefaultPHPPort(framework) {
        switch (framework) {
            case 'Laravel':
            case 'Lumen':
            case 'Symfony':
            case 'Slim Framework':
                return 8000;
            case 'CodeIgniter':
            case 'WordPress':
                return 8080;
            case 'CakePHP':
                return 8765;
            case 'Drupal':
                return 8888;
            default:
                return 8000;
        }
    }
    async analyzePHPDependencies(projectPath) {
        try {
            const results = {
                language: 'PHP',
                dependencies: [],
                vulnerabilities: 0,
                outdated: 0
            };
            // Check for composer.json
            if (fs.existsSync(path.join(projectPath, 'composer.json'))) {
                const composerContent = fs.readFileSync(path.join(projectPath, 'composer.json'), 'utf8');
                const composerData = JSON.parse(composerContent);
                // Parse dependencies from composer.json
                if (composerData.require) {
                    results.dependencies = Object.keys(composerData.require);
                }
                if (composerData['require-dev']) {
                    results.devDependencies = Object.keys(composerData['require-dev']);
                }
                // Use composer show to get installed packages
                try {
                    const { stdout } = await execAsync('composer show', { cwd: projectPath });
                    const packageLines = stdout.split('\n').filter(line => line.trim() && !line.startsWith('Warning'));
                    results.installedPackages = packageLines.map(line => line.split(' ')[0]);
                    results.totalDependencies = packageLines.length;
                }
                catch (composerError) {
                    results.note = 'Run "composer install" to install packages';
                    results.totalDependencies = results.dependencies.length;
                }
                // Check for outdated packages
                try {
                    const { stdout: outdatedOutput } = await execAsync('composer outdated --format=json', {
                        cwd: projectPath,
                        timeout: 30000
                    });
                    const outdatedData = JSON.parse(outdatedOutput);
                    if (outdatedData.installed) {
                        results.outdated = outdatedData.installed.length;
                        results.outdatedPackages = outdatedData.installed;
                    }
                }
                catch (outdatedError) {
                    results.outdatedNote = 'Could not check for outdated packages';
                }
                // Check for security vulnerabilities using composer audit
                try {
                    const { stdout: auditOutput } = await execAsync('composer audit --format=json', {
                        cwd: projectPath,
                        timeout: 30000
                    });
                    const auditData = JSON.parse(auditOutput);
                    if (auditData.advisories) {
                        results.vulnerabilities = Object.keys(auditData.advisories).length;
                        results.securityAdvisories = auditData.advisories;
                    }
                }
                catch (auditError) {
                    results.securityNote = 'Could not check for security vulnerabilities';
                }
                // Parse PHP version requirement
                if (composerData.require && composerData.require.php) {
                    results.phpVersion = composerData.require.php;
                }
                // Get project info
                if (composerData.name) {
                    results.projectName = composerData.name;
                }
                if (composerData.version) {
                    results.projectVersion = composerData.version;
                }
            }
            else {
                results.error = 'No composer.json found. Run "composer init" to initialize a PHP project with Composer.';
            }
            return results;
        }
        catch (error) {
            return {
                language: 'PHP',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    dispose() {
        this.onProjectDetectedEmitter.dispose();
        this.onServerStatusChangedEmitter.dispose();
    }
}
exports.AutoBootManager = AutoBootManager;
//# sourceMappingURL=autoBootManager.js.map