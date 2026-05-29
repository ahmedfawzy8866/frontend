import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface QualityScore {
    overall: number;
    maintainability: number;
    security: number;
    performance: number;
    reliability: number;
    testability: number;
}

export interface QualityIssue {
    id: string;
    severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
    category: 'security' | 'performance' | 'maintainability' | 'reliability' | 'style';
    title: string;
    description: string;
    aiExplanation: string;
    suggestion: string;
    line: number;
    column: number;
    file: string;
    beforeCode?: string;
    afterCode?: string;
    confidence: number;
}

export interface TechnicalDebtMetrics {
    debtRatio: number;
    estimatedHours: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    trends: {
        increasing: boolean;
        velocity: number;
    };
    hotspots: string[];
}

export class AICodeQualityInspector {
    private diagnosticCollection: vscode.DiagnosticCollection;
    private statusBarItem: vscode.StatusBarItem;
    private currentScore: QualityScore | null = null;
    private issues: QualityIssue[] = [];
    private onQualityUpdatedEmitter = new vscode.EventEmitter<QualityScore>();
    
    public readonly onQualityUpdated = this.onQualityUpdatedEmitter.event;

    constructor() {
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('autoboot-ai-quality');
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        this.statusBarItem.command = 'autoboot.showQualityReport';
        this.setupFileWatchers();
    }

    private setupFileWatchers() {
        // Watch for file changes to trigger real-time analysis
        const watcher = vscode.workspace.createFileSystemWatcher('**/*.{ts,js,py,java,clj}');
        
        watcher.onDidChange(uri => this.analyzeFile(uri));
        watcher.onDidCreate(uri => this.analyzeFile(uri));
        watcher.onDidDelete(uri => this.clearFileIssues(uri));
    }

    async analyzeWorkspace(): Promise<QualityScore> {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            throw new Error('No workspace folder found');
        }

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'AI Code Quality Analysis',
            cancellable: true
        }, async (progress, token) => {
            progress.report({ increment: 0, message: 'Scanning files...' });
            
            const files = await this.getSourceFiles(workspaceFolder.uri.fsPath);
            const totalFiles = files.length;
            
            this.issues = [];
            let processedFiles = 0;

            for (const file of files) {
                if (token.isCancellationRequested) {
                    break;
                }

                progress.report({ 
                    increment: (100 / totalFiles), 
                    message: `Analyzing ${path.basename(file)}...` 
                });

                await this.analyzeFile(vscode.Uri.file(file));
                processedFiles++;
            }

            progress.report({ increment: 100, message: 'Calculating quality score...' });
            this.currentScore = this.calculateOverallScore();
            this.updateStatusBar();
            this.onQualityUpdatedEmitter.fire(this.currentScore);
        });

        return this.currentScore!;
    }

    private async analyzeFile(uri: vscode.Uri): Promise<void> {
        try {
            const document = await vscode.workspace.openTextDocument(uri);
            const content = document.getText();
            const language = this.detectLanguage(uri.fsPath);
            
            // Clear existing issues for this file
            this.clearFileIssues(uri);
            
            // Run multiple AI analysis passes
            const issues = await Promise.all([
                this.analyzeSecurityVulnerabilities(content, language, uri.fsPath),
                this.analyzePerformanceIssues(content, language, uri.fsPath),
                this.analyzeMaintainabilityIssues(content, language, uri.fsPath),
                this.analyzeReliabilityIssues(content, language, uri.fsPath)
            ]);

            const fileIssues = issues.flat();
            this.issues.push(...fileIssues);
            
            // Convert to VS Code diagnostics
            const diagnostics = this.convertToDiagnostics(fileIssues);
            this.diagnosticCollection.set(uri, diagnostics);
            
        } catch (error) {
            console.error('Error analyzing file:', error);
        }
    }

    private async analyzeSecurityVulnerabilities(content: string, language: string, filePath: string): Promise<QualityIssue[]> {
        const issues: QualityIssue[] = [];
        const lines = content.split('\n');

        // Security pattern detection with AI explanations
        const securityPatterns = this.getSecurityPatterns(language);
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            for (const pattern of securityPatterns) {
                if (pattern.regex.test(line)) {
                    issues.push({
                        id: `security-${Date.now()}-${i}`,
                        severity: pattern.severity,
                        category: 'security',
                        title: pattern.title,
                        description: pattern.description,
                        aiExplanation: pattern.aiExplanation,
                        suggestion: pattern.suggestion,
                        line: i + 1,
                        column: line.search(pattern.regex) + 1,
                        file: filePath,
                        beforeCode: line.trim(),
                        afterCode: pattern.fixExample,
                        confidence: pattern.confidence
                    });
                }
            }
        }

        return issues;
    }

    private async analyzePerformanceIssues(content: string, language: string, filePath: string): Promise<QualityIssue[]> {
        const issues: QualityIssue[] = [];
        const lines = content.split('\n');

        const performancePatterns = this.getPerformancePatterns(language);
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            for (const pattern of performancePatterns) {
                if (pattern.regex.test(line)) {
                    issues.push({
                        id: `performance-${Date.now()}-${i}`,
                        severity: pattern.severity,
                        category: 'performance',
                        title: pattern.title,
                        description: pattern.description,
                        aiExplanation: pattern.aiExplanation,
                        suggestion: pattern.suggestion,
                        line: i + 1,
                        column: line.search(pattern.regex) + 1,
                        file: filePath,
                        beforeCode: line.trim(),
                        afterCode: pattern.fixExample,
                        confidence: pattern.confidence
                    });
                }
            }
        }

        return issues;
    }

    private async analyzeMaintainabilityIssues(content: string, language: string, filePath: string): Promise<QualityIssue[]> {
        const issues: QualityIssue[] = [];
        const lines = content.split('\n');

        // Analyze code complexity, naming conventions, etc.
        const complexity = this.calculateCyclomaticComplexity(content, language);
        const functionLength = this.analyzeFunctionLength(content, language);
        const namingIssues = this.analyzeNamingConventions(content, language);

        if (complexity.score > 10) {
            issues.push({
                id: `complexity-${Date.now()}`,
                severity: complexity.score > 20 ? 'critical' : 'high',
                category: 'maintainability',
                title: 'High Cyclomatic Complexity',
                description: `Function has complexity score of ${complexity.score}`,
                aiExplanation: 'High cyclomatic complexity makes code harder to understand, test, and maintain. Consider breaking down complex functions into smaller, more focused functions.',
                suggestion: 'Refactor into smaller functions with single responsibilities',
                line: complexity.line,
                column: 1,
                file: filePath,
                confidence: 0.9
            });
        }

        issues.push(...namingIssues);
        issues.push(...functionLength);

        return issues;
    }

    private async analyzeReliabilityIssues(content: string, language: string, filePath: string): Promise<QualityIssue[]> {
        const issues: QualityIssue[] = [];
        
        // Analyze error handling, null checks, etc.
        const errorHandling = this.analyzeErrorHandling(content, language);
        const nullChecks = this.analyzeNullSafety(content, language);
        
        issues.push(...errorHandling);
        issues.push(...nullChecks);

        return issues;
    }

    private getSecurityPatterns(language: string) {
        const patterns = {
            javascript: [
                {
                    regex: /eval\s*\(/,
                    severity: 'critical' as const,
                    title: 'Dangerous eval() usage',
                    description: 'Using eval() can lead to code injection vulnerabilities',
                    aiExplanation: 'The eval() function executes arbitrary JavaScript code, making it extremely dangerous when used with user input. Attackers can inject malicious code that will be executed in your application context.',
                    suggestion: 'Use JSON.parse() for JSON data or create a whitelist of allowed operations',
                    fixExample: 'JSON.parse(data) // instead of eval(data)',
                    confidence: 0.95
                },
                {
                    regex: /innerHTML\s*=.*\+/,
                    severity: 'high' as const,
                    title: 'Potential XSS vulnerability',
                    description: 'Dynamic innerHTML assignment can lead to XSS attacks',
                    aiExplanation: 'Setting innerHTML with concatenated strings can allow attackers to inject malicious HTML and JavaScript. This is a common vector for Cross-Site Scripting (XSS) attacks.',
                    suggestion: 'Use textContent or createElement() with proper sanitization',
                    fixExample: 'element.textContent = userInput; // Safe text insertion',
                    confidence: 0.85
                }
            ],
            python: [
                {
                    regex: /exec\s*\(/,
                    severity: 'critical' as const,
                    title: 'Dangerous exec() usage',
                    description: 'Using exec() can lead to code injection vulnerabilities',
                    aiExplanation: 'The exec() function executes arbitrary Python code, which is extremely dangerous when used with untrusted input. This can lead to remote code execution vulnerabilities.',
                    suggestion: 'Use ast.literal_eval() for safe evaluation or implement a proper parser',
                    fixExample: 'ast.literal_eval(data) # Safe for literals only',
                    confidence: 0.95
                }
            ],
            java: [
                {
                    regex: /Runtime\.getRuntime\(\)\.exec/,
                    severity: 'critical' as const,
                    title: 'Command injection risk',
                    description: 'Runtime.exec() with user input can lead to command injection',
                    aiExplanation: 'Using Runtime.exec() with user-controlled input allows attackers to execute arbitrary system commands, potentially compromising the entire system.',
                    suggestion: 'Use ProcessBuilder with input validation and sanitization',
                    fixExample: 'ProcessBuilder pb = new ProcessBuilder("command", sanitizedArg);',
                    confidence: 0.9
                }
            ]
        };

        return patterns[language as keyof typeof patterns] || [];
    }

    private getPerformancePatterns(language: string) {
        const patterns = {
            javascript: [
                {
                    regex: /for\s*\(.*\.length.*\)/,
                    severity: 'medium' as const,
                    title: 'Inefficient loop condition',
                    description: 'Accessing .length in loop condition causes repeated property access',
                    aiExplanation: 'Accessing the length property in every loop iteration is inefficient. The JavaScript engine has to look up the property each time, which can be costly for large arrays.',
                    suggestion: 'Cache the length value before the loop',
                    fixExample: 'for (let i = 0, len = arr.length; i < len; i++)',
                    confidence: 0.8
                }
            ],
            python: [
                {
                    regex: /\+\s*=.*str/,
                    severity: 'medium' as const,
                    title: 'Inefficient string concatenation',
                    description: 'Using += for string concatenation in loops is inefficient',
                    aiExplanation: 'String concatenation with += creates new string objects each time, leading to O(n²) complexity. This becomes very slow with large strings or many concatenations.',
                    suggestion: 'Use join() method or f-strings for better performance',
                    fixExample: 'result = "".join(string_list) # Much faster',
                    confidence: 0.85
                }
            ]
        };

        return patterns[language as keyof typeof patterns] || [];
    }

    private calculateCyclomaticComplexity(content: string, language: string): { score: number; line: number } {
        // Simplified complexity calculation
        const complexityKeywords = {
            javascript: ['if', 'else', 'while', 'for', 'switch', 'case', 'catch', '&&', '||', '?'],
            python: ['if', 'elif', 'else', 'while', 'for', 'except', 'and', 'or'],
            java: ['if', 'else', 'while', 'for', 'switch', 'case', 'catch', '&&', '||', '?']
        };

        const keywords = complexityKeywords[language as keyof typeof complexityKeywords] || [];
        let complexity = 1; // Base complexity
        let line = 1;

        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];
            for (const keyword of keywords) {
                if (currentLine.includes(keyword)) {
                    complexity++;
                    if (complexity > 10 && line === 1) {
                        line = i + 1; // First line where complexity becomes high
                    }
                }
            }
        }

        return { score: complexity, line };
    }

    private analyzeFunctionLength(content: string, language: string): QualityIssue[] {
        // Simplified function length analysis
        const issues: QualityIssue[] = [];
        const lines = content.split('\n');
        
        // This is a simplified implementation - in practice, you'd use proper AST parsing
        let functionStart = -1;
        let braceCount = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.includes('function') || line.includes('def ') || line.includes('public ') || line.includes('private ')) {
                functionStart = i;
                braceCount = 0;
            }
            
            braceCount += (line.match(/\{/g) || []).length;
            braceCount -= (line.match(/\}/g) || []).length;
            
            if (functionStart !== -1 && braceCount === 0 && line.includes('}')) {
                const functionLength = i - functionStart + 1;
                if (functionLength > 50) {
                    issues.push({
                        id: `function-length-${functionStart}`,
                        severity: functionLength > 100 ? 'high' : 'medium',
                        category: 'maintainability',
                        title: 'Long function detected',
                        description: `Function is ${functionLength} lines long`,
                        aiExplanation: 'Long functions are harder to understand, test, and maintain. They often violate the Single Responsibility Principle and should be broken down into smaller, more focused functions.',
                        suggestion: 'Consider breaking this function into smaller, more focused functions',
                        line: functionStart + 1,
                        column: 1,
                        file: '',
                        confidence: 0.8
                    });
                }
                functionStart = -1;
            }
        }
        
        return issues;
    }

    private analyzeNamingConventions(content: string, language: string): QualityIssue[] {
        // Simplified naming convention analysis
        return [];
    }

    private analyzeErrorHandling(content: string, language: string): QualityIssue[] {
        // Simplified error handling analysis
        return [];
    }

    private analyzeNullSafety(content: string, language: string): QualityIssue[] {
        // Simplified null safety analysis
        return [];
    }

    private calculateOverallScore(): QualityScore {
        const totalIssues = this.issues.length;
        const criticalIssues = this.issues.filter(i => i.severity === 'critical').length;
        const highIssues = this.issues.filter(i => i.severity === 'high').length;
        const mediumIssues = this.issues.filter(i => i.severity === 'medium').length;

        // Weighted scoring system
        const penalty = (criticalIssues * 20) + (highIssues * 10) + (mediumIssues * 5);
        const baseScore = Math.max(0, 100 - penalty);

        return {
            overall: baseScore,
            maintainability: this.calculateCategoryScore('maintainability'),
            security: this.calculateCategoryScore('security'),
            performance: this.calculateCategoryScore('performance'),
            reliability: this.calculateCategoryScore('reliability'),
            testability: 75 // Placeholder - would analyze test coverage
        };
    }

    private calculateCategoryScore(category: string): number {
        const categoryIssues = this.issues.filter(i => i.category === category);
        const criticalCount = categoryIssues.filter(i => i.severity === 'critical').length;
        const highCount = categoryIssues.filter(i => i.severity === 'high').length;
        const mediumCount = categoryIssues.filter(i => i.severity === 'medium').length;

        const penalty = (criticalCount * 25) + (highCount * 15) + (mediumCount * 8);
        return Math.max(0, 100 - penalty);
    }

    private convertToDiagnostics(issues: QualityIssue[]): vscode.Diagnostic[] {
        return issues.map(issue => {
            const range = new vscode.Range(
                issue.line - 1, 
                issue.column - 1, 
                issue.line - 1, 
                issue.column + 10
            );

            const diagnostic = new vscode.Diagnostic(
                range,
                `${issue.title}: ${issue.description}`,
                this.severityToDiagnosticSeverity(issue.severity)
            );

            diagnostic.source = 'AutoBoot AI';
            diagnostic.code = issue.id;
            
            return diagnostic;
        });
    }

    private severityToDiagnosticSeverity(severity: string): vscode.DiagnosticSeverity {
        switch (severity) {
            case 'critical':
            case 'high':
                return vscode.DiagnosticSeverity.Error;
            case 'medium':
                return vscode.DiagnosticSeverity.Warning;
            case 'low':
                return vscode.DiagnosticSeverity.Information;
            default:
                return vscode.DiagnosticSeverity.Hint;
        }
    }

    private detectLanguage(filePath: string): string {
        const ext = path.extname(filePath).toLowerCase();
        const languageMap: { [key: string]: string } = {
            '.js': 'javascript',
            '.ts': 'javascript',
            '.jsx': 'javascript',
            '.tsx': 'javascript',
            '.py': 'python',
            '.java': 'java',
            '.clj': 'clojure',
            '.cljs': 'clojure'
        };
        return languageMap[ext] || 'unknown';
    }

    private async getSourceFiles(workspacePath: string): Promise<string[]> {
        const files: string[] = [];
        const extensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.clj', '.cljs'];
        
        const walkDir = (dir: string) => {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    walkDir(fullPath);
                } else if (stat.isFile() && extensions.includes(path.extname(item))) {
                    files.push(fullPath);
                }
            }
        };

        walkDir(workspacePath);
        return files;
    }

    private clearFileIssues(uri: vscode.Uri) {
        this.issues = this.issues.filter(issue => issue.file !== uri.fsPath);
        this.diagnosticCollection.delete(uri);
    }

    private updateStatusBar() {
        if (this.currentScore) {
            const score = Math.round(this.currentScore.overall);
            const icon = score >= 80 ? '$(check)' : score >= 60 ? '$(warning)' : '$(error)';
            this.statusBarItem.text = `${icon} Quality: ${score}/100`;
            this.statusBarItem.tooltip = `Code Quality Score: ${score}/100
Security: ${this.currentScore.security}/100
Performance: ${this.currentScore.performance}/100
Maintainability: ${this.currentScore.maintainability}/100`;
            this.statusBarItem.show();
        }
    }

    async getTechnicalDebtMetrics(): Promise<TechnicalDebtMetrics> {
        const criticalIssues = this.issues.filter(i => i.severity === 'critical').length;
        const highIssues = this.issues.filter(i => i.severity === 'high').length;
        const mediumIssues = this.issues.filter(i => i.severity === 'medium').length;

        const estimatedHours = (criticalIssues * 4) + (highIssues * 2) + (mediumIssues * 1);
        const debtRatio = (estimatedHours / 100) * 100; // Simplified calculation

        let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
        if (criticalIssues > 5) {riskLevel = 'critical';}
        else if (criticalIssues > 2 || highIssues > 10) {riskLevel = 'high';}
        else if (highIssues > 5 || mediumIssues > 20) {riskLevel = 'medium';}

        // Find files with most issues (hotspots)
        const fileIssueCount = new Map<string, number>();
        this.issues.forEach(issue => {
            const count = fileIssueCount.get(issue.file) || 0;
            fileIssueCount.set(issue.file, count + 1);
        });

        const hotspots = Array.from(fileIssueCount.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([file]) => path.basename(file));

        return {
            debtRatio,
            estimatedHours,
            riskLevel,
            trends: {
                increasing: true, // Would track over time
                velocity: 0.1
            },
            hotspots
        };
    }

    getQualityScore(): QualityScore | null {
        return this.currentScore;
    }

    getIssues(): QualityIssue[] {
        return this.issues;
    }

    dispose() {
        this.diagnosticCollection.dispose();
        this.statusBarItem.dispose();
        this.onQualityUpdatedEmitter.dispose();
    }
}
