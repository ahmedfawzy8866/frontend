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
exports.QualityReportProvider = void 0;
const vscode = __importStar(require("vscode"));
class QualityReportProvider {
    constructor(_extensionUri, qualityScore = null, issues = [], debtMetrics = null) {
        this._extensionUri = _extensionUri;
        this.qualityScore = qualityScore;
        this.issues = issues;
        this.debtMetrics = debtMetrics;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'fixIssue':
                    this.fixIssue(data.issueId);
                    break;
                case 'ignoreIssue':
                    this.ignoreIssue(data.issueId);
                    break;
                case 'showIssueDetails':
                    this.showIssueDetails(data.issueId);
                    break;
                case 'exportReport':
                    this.exportReport();
                    break;
            }
        });
    }
    updateQualityData(score, issues, debtMetrics) {
        this.qualityScore = score;
        this.issues = issues;
        this.debtMetrics = debtMetrics;
        if (this._view) {
            this._view.webview.html = this._getHtmlForWebview(this._view.webview);
        }
    }
    _getHtmlForWebview(webview) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'quality-report.js'));
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'quality-report.css'));
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleUri}" rel="stylesheet">
    <title>AI Code Quality Report</title>
</head>
<body>
    <div class="quality-dashboard">
        ${this.renderQualityScore()}
        ${this.renderTechnicalDebt()}
        ${this.renderIssuesSummary()}
        ${this.renderIssuesList()}
        ${this.renderActionButtons()}
    </div>
    <script src="${scriptUri}"></script>
</body>
</html>`;
    }
    renderQualityScore() {
        if (!this.qualityScore) {
            return `<div class="quality-score-placeholder">
                <h3>🔍 AI Code Quality Inspector</h3>
                <p>Run analysis to see your code quality score</p>
                <button onclick="runAnalysis()" class="btn-primary">Analyze Code Quality</button>
            </div>`;
        }
        const score = this.qualityScore;
        const overallColor = score.overall >= 80 ? '#4CAF50' : score.overall >= 60 ? '#FF9800' : '#F44336';
        return `
        <div class="quality-score-container">
            <div class="overall-score">
                <div class="score-circle" style="border-color: ${overallColor}">
                    <span class="score-number" style="color: ${overallColor}">${Math.round(score.overall)}</span>
                    <span class="score-label">Overall</span>
                </div>
            </div>
            
            <div class="category-scores">
                <div class="score-category">
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${score.security}%; background-color: #E91E63"></div>
                    </div>
                    <span class="category-label">🔒 Security (${Math.round(score.security)})</span>
                </div>
                
                <div class="score-category">
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${score.performance}%; background-color: #2196F3"></div>
                    </div>
                    <span class="category-label">⚡ Performance (${Math.round(score.performance)})</span>
                </div>
                
                <div class="score-category">
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${score.maintainability}%; background-color: #4CAF50"></div>
                    </div>
                    <span class="category-label">🔧 Maintainability (${Math.round(score.maintainability)})</span>
                </div>
                
                <div class="score-category">
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${score.reliability}%; background-color: #FF9800"></div>
                    </div>
                    <span class="category-label">🛡️ Reliability (${Math.round(score.reliability)})</span>
                </div>
                
                <div class="score-category">
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${score.testability}%; background-color: #9C27B0"></div>
                    </div>
                    <span class="category-label">🧪 Testability (${Math.round(score.testability)})</span>
                </div>
            </div>
        </div>`;
    }
    renderTechnicalDebt() {
        if (!this.debtMetrics) {
            return '';
        }
        const debt = this.debtMetrics;
        const riskColor = {
            low: '#4CAF50',
            medium: '#FF9800',
            high: '#FF5722',
            critical: '#F44336'
        }[debt.riskLevel];
        return `
        <div class="technical-debt-container">
            <h3>📊 Technical Debt Analysis</h3>
            <div class="debt-metrics">
                <div class="debt-metric">
                    <span class="metric-value">${debt.estimatedHours}h</span>
                    <span class="metric-label">Estimated Fix Time</span>
                </div>
                <div class="debt-metric">
                    <span class="metric-value" style="color: ${riskColor}">${debt.riskLevel.toUpperCase()}</span>
                    <span class="metric-label">Risk Level</span>
                </div>
                <div class="debt-metric">
                    <span class="metric-value">${Math.round(debt.debtRatio)}%</span>
                    <span class="metric-label">Debt Ratio</span>
                </div>
            </div>
            
            ${debt.hotspots.length > 0 ? `
            <div class="hotspots">
                <h4>🔥 Code Hotspots</h4>
                <ul class="hotspot-list">
                    ${debt.hotspots.map(file => `<li class="hotspot-item">${file}</li>`).join('')}
                </ul>
            </div>` : ''}
        </div>`;
    }
    renderIssuesSummary() {
        if (this.issues.length === 0) {
            return `<div class="no-issues">
                <h3>✅ No Issues Found</h3>
                <p>Your code looks great! Keep up the good work.</p>
            </div>`;
        }
        const critical = this.issues.filter(i => i.severity === 'critical').length;
        const high = this.issues.filter(i => i.severity === 'high').length;
        const medium = this.issues.filter(i => i.severity === 'medium').length;
        const low = this.issues.filter(i => i.severity === 'low').length;
        return `
        <div class="issues-summary">
            <h3>🚨 Issues Summary</h3>
            <div class="issue-counts">
                ${critical > 0 ? `<span class="issue-count critical">${critical} Critical</span>` : ''}
                ${high > 0 ? `<span class="issue-count high">${high} High</span>` : ''}
                ${medium > 0 ? `<span class="issue-count medium">${medium} Medium</span>` : ''}
                ${low > 0 ? `<span class="issue-count low">${low} Low</span>` : ''}
            </div>
        </div>`;
    }
    renderIssuesList() {
        if (this.issues.length === 0) {
            return '';
        }
        const sortedIssues = this.issues.sort((a, b) => {
            const severityOrder = { critical: 4, high: 3, medium: 2, low: 1, info: 0 };
            return severityOrder[b.severity] - severityOrder[a.severity];
        });
        return `
        <div class="issues-list">
            <h3>📋 Detailed Issues</h3>
            ${sortedIssues.slice(0, 20).map(issue => this.renderIssueItem(issue)).join('')}
            ${sortedIssues.length > 20 ? `<p class="more-issues">... and ${sortedIssues.length - 20} more issues</p>` : ''}
        </div>`;
    }
    renderIssueItem(issue) {
        const severityIcon = {
            critical: '🔴',
            high: '🟠',
            medium: '🟡',
            low: '🔵',
            info: 'ℹ️'
        }[issue.severity];
        const categoryIcon = {
            security: '🔒',
            performance: '⚡',
            maintainability: '🔧',
            reliability: '🛡️',
            style: '🎨'
        }[issue.category];
        return `
        <div class="issue-item ${issue.severity}" data-issue-id="${issue.id}">
            <div class="issue-header">
                <span class="issue-severity">${severityIcon}</span>
                <span class="issue-category">${categoryIcon}</span>
                <span class="issue-title">${issue.title}</span>
                <span class="issue-confidence">Confidence: ${Math.round(issue.confidence * 100)}%</span>
            </div>
            
            <div class="issue-description">${issue.description}</div>
            
            <div class="issue-location">
                📁 ${issue.file.split('/').pop()} : ${issue.line}:${issue.column}
            </div>
            
            <div class="ai-explanation">
                <strong>🤖 AI Explanation:</strong>
                <p>${issue.aiExplanation}</p>
            </div>
            
            <div class="issue-suggestion">
                <strong>💡 Suggestion:</strong>
                <p>${issue.suggestion}</p>
            </div>
            
            ${issue.beforeCode && issue.afterCode ? `
            <div class="code-comparison">
                <div class="code-before">
                    <strong>Before:</strong>
                    <code>${issue.beforeCode}</code>
                </div>
                <div class="code-after">
                    <strong>After:</strong>
                    <code>${issue.afterCode}</code>
                </div>
            </div>` : ''}
            
            <div class="issue-actions">
                <button onclick="fixIssue('${issue.id}')" class="btn-fix">🔧 Auto Fix</button>
                <button onclick="showIssueDetails('${issue.id}')" class="btn-details">📖 Details</button>
                <button onclick="ignoreIssue('${issue.id}')" class="btn-ignore">🙈 Ignore</button>
            </div>
        </div>`;
    }
    renderActionButtons() {
        return `
        <div class="action-buttons">
            <button onclick="runAnalysis()" class="btn-primary">🔄 Re-analyze</button>
            <button onclick="exportReport()" class="btn-secondary">📊 Export Report</button>
            <button onclick="showSettings()" class="btn-secondary">⚙️ Settings</button>
        </div>`;
    }
    async fixIssue(issueId) {
        const issue = this.issues.find(i => i.id === issueId);
        if (!issue || !issue.afterCode) {
            vscode.window.showWarningMessage('Auto-fix not available for this issue');
            return;
        }
        try {
            const document = await vscode.workspace.openTextDocument(issue.file);
            const edit = new vscode.WorkspaceEdit();
            const range = new vscode.Range(issue.line - 1, 0, issue.line - 1, document.lineAt(issue.line - 1).text.length);
            edit.replace(document.uri, range, issue.afterCode);
            await vscode.workspace.applyEdit(edit);
            vscode.window.showInformationMessage(`Fixed: ${issue.title}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to apply fix: ${error}`);
        }
    }
    ignoreIssue(issueId) {
        // Add to ignore list (would persist in workspace settings)
        vscode.window.showInformationMessage('Issue ignored');
    }
    showIssueDetails(issueId) {
        const issue = this.issues.find(i => i.id === issueId);
        if (!issue) {
            return;
        }
        vscode.window.showInformationMessage(`${issue.title}\n\n${issue.aiExplanation}\n\nSuggestion: ${issue.suggestion}`, 'Go to Issue').then(selection => {
            if (selection === 'Go to Issue') {
                vscode.workspace.openTextDocument(issue.file).then(doc => {
                    vscode.window.showTextDocument(doc).then(editor => {
                        const position = new vscode.Position(issue.line - 1, issue.column - 1);
                        editor.selection = new vscode.Selection(position, position);
                        editor.revealRange(new vscode.Range(position, position));
                    });
                });
            }
        });
    }
    async exportReport() {
        const report = {
            timestamp: new Date().toISOString(),
            qualityScore: this.qualityScore,
            technicalDebt: this.debtMetrics,
            issues: this.issues.map(issue => ({
                ...issue,
                file: issue.file.split('/').pop() // Only filename for privacy
            }))
        };
        const reportJson = JSON.stringify(report, null, 2);
        const uri = await vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file('code-quality-report.json'),
            filters: {
                'JSON': ['json'],
                'All Files': ['*']
            }
        });
        if (uri) {
            await vscode.workspace.fs.writeFile(uri, Buffer.from(reportJson));
            vscode.window.showInformationMessage('Quality report exported successfully');
        }
    }
}
exports.QualityReportProvider = QualityReportProvider;
QualityReportProvider.viewType = 'autoboot.qualityReport';
//# sourceMappingURL=qualityReportProvider.js.map