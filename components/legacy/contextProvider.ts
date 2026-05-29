import * as vscode from 'vscode';
import * as path from 'path';
import { SmartContextSwitcher, ProjectContext, SmartBookmark, ActivityEntry, MeetingNote } from './contextSwitcher';

export class ContextSwitcherProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'autoboot.contextSwitcher';
    private _view?: vscode.WebviewView;

    constructor(
        private readonly _extensionUri: vscode.Uri,
        private contextSwitcher: SmartContextSwitcher
    ) {
        this.contextSwitcher.onContextSwitched(context => {
            this.updateWebview();
        });

        this.contextSwitcher.onActivityTracked(activity => {
            this.updateWebview();
        });
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(async data => {
            switch (data.type) {
                case 'switchContext':
                    await this.contextSwitcher.switchToProject(data.workspacePath);
                    break;
                case 'createBookmark':
                    await this.createBookmark(data.title, data.description);
                    break;
                case 'navigateToBookmark':
                    await this.navigateToBookmark(data.bookmarkId);
                    break;
                case 'addMeetingNotes':
                    await this.addMeetingNotes(data.title, data.content, data.participants);
                    break;
                case 'exportContext':
                    await this.exportContext(data.contextId);
                    break;
                case 'importContext':
                    await this.importContext();
                    break;
                case 'captureState':
                    await this.contextSwitcher.captureCurrentState();
                    break;
                case 'findReferences':
                    await this.findReferences(data.query);
                    break;
                case 'showTimeTracking':
                    await this.showTimeTrackingReport();
                    break;
                case 'requestContextUpdate':
                case 'refreshContext':
                    this.updateWebview();
                    break;
            }
        });
    }

    private async createBookmark(title: string, description: string) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor to bookmark');
            return;
        }

        await this.contextSwitcher.createBookmark(
            title,
            description,
            editor.document.uri.fsPath,
            editor.selection.start
        );

        this._view?.webview.postMessage({
            type: 'bookmarkCreated',
            bookmark: { title }
        });
    }

    private async navigateToBookmark(bookmarkId: string) {
        const context = this.contextSwitcher.getCurrentContext();
        if (!context) {return;}

        const bookmark = context.bookmarks.find(b => b.id === bookmarkId);
        if (!bookmark) {return;}

        // Navigate to the first file in the bookmark
        if (bookmark.files.length > 0) {
            const file = bookmark.files[0];
            const document = await vscode.workspace.openTextDocument(file.path);
            const editor = await vscode.window.showTextDocument(document);
            
            if (file.position) {
                editor.selection = new vscode.Selection(file.position, file.position);
                editor.revealRange(new vscode.Range(file.position, file.position));
            }
        }
    }

    private async addMeetingNotes(title: string, content: string, participants: string[]) {
        await this.contextSwitcher.addMeetingNotes(title, content, participants);
        this.updateWebview();
    }

    private async exportContext(contextId: string) {
        try {
            const contextData = await this.contextSwitcher.exportContext(contextId);
            const uri = await vscode.window.showSaveDialog({
                defaultUri: vscode.Uri.file(`context-${contextId}.json`),
                filters: {
                    'JSON Files': ['json']
                }
            });

            if (uri) {
                await vscode.workspace.fs.writeFile(uri, Buffer.from(contextData, 'utf8'));
                vscode.window.showInformationMessage('Context exported successfully');
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to export context: ${error}`);
        }
    }

    private async importContext() {
        try {
            const uri = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    'JSON Files': ['json']
                }
            });

            if (uri && uri[0]) {
                const data = await vscode.workspace.fs.readFile(uri[0]);
                const contextData = Buffer.from(data).toString('utf8');
                await this.contextSwitcher.importContext(contextData);
                vscode.window.showInformationMessage('Context imported successfully');
                this.updateWebview();
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to import context: ${error}`);
        }
    }

    private async findReferences(query: string) {
        // This would integrate with the cross-project references finder
        vscode.window.showInformationMessage(`Searching for references: ${query}`);
        this.updateWebview();
    }

    private async showTimeTrackingReport() {
        const context = this.contextSwitcher.getCurrentContext();
        if (!context) {
            vscode.window.showWarningMessage('No active context for time tracking');
            return;
        }

        const activities = context.activities.slice(0, 10);
        const totalTime = activities.reduce((sum, a) => sum + a.duration, 0);
        
        const report = `
Time Tracking Report for ${context.name}

Total Time: ${Math.floor(totalTime / 60)}h ${totalTime % 60}m

Activities:
${activities.map(a => `- ${a.type}: ${a.duration}m (${a.description})`).join('\n')}
        `.trim();

        vscode.window.showInformationMessage(report, { modal: true });
    }

    private updateWebview() {
        if (this._view) {
            this._view.webview.html = this.getHtmlForWebview(this._view.webview);
        }
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'context-switcher.css'));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'context-switcher.js'));

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleUri}" rel="stylesheet">
    <title>Smart Context Switcher</title>
</head>
<body>
    <div class="context-switcher-container">
        ${this.renderHeader()}
        ${this.renderCurrentContext()}
        ${this.renderRecentContexts()}
        ${this.renderBookmarks()}
        ${this.renderActivities()}
        ${this.renderMeetingNotes()}
        ${this.renderActions()}
    </div>
    <script src="${scriptUri}"></script>
</body>
</html>`;
    }

    private renderHeader(): string {
        return `
        <div class="header">
            <h3>🧠 Smart Context Switcher</h3>
            <div class="header-actions">
                <button onclick="captureState()" class="btn-icon" title="Capture Current State">📸</button>
                <button onclick="showTimeTracking()" class="btn-icon" title="Time Tracking">⏱️</button>
                <button onclick="exportContext()" class="btn-icon" title="Export Context">📤</button>
                <button onclick="importContext()" class="btn-icon" title="Import Context">📥</button>
            </div>
        </div>`;
    }

    private renderCurrentContext(): string {
        const context = this.contextSwitcher.getCurrentContext();
        
        if (!context) {
            return `
            <div class="current-context empty">
                <p>No active context. Open a workspace to get started.</p>
            </div>`;
        }

        const openFiles = context.openFiles.slice(0, 3);
        const recentActivities = context.activities.slice(0, 3);

        return `
        <div class="current-context">
            <h4>Current Context</h4>
            <div class="context-info">
                <div class="context-name" data-context-id="${context.id}">${context.name}</div>
                <div class="context-details">
                    <span class="detail-item">📁 ${openFiles.length} files</span>
                    <span class="detail-item">🌿 ${context.gitBranch}</span>
                    <span class="detail-item">⏱️ ${Math.floor(context.timeSpent / 60)}h ${context.timeSpent % 60}m</span>
                </div>
                <div class="ai-memory">
                    <div class="memory-item">
                        <strong>Working on:</strong> ${context.aiMemory.workingOn || 'Getting started...'}
                    </div>
                    ${context.aiMemory.blockers.length > 0 ? `
                    <div class="memory-item blockers">
                        <strong>Blockers:</strong>
                        <ul>
                            ${context.aiMemory.blockers.map(b => `<li>${b}</li>`).join('')}
                        </ul>
                    </div>` : ''}
                    ${context.aiMemory.nextSteps.length > 0 ? `
                    <div class="memory-item">
                        <strong>Next steps:</strong>
                        <ul>
                            ${context.aiMemory.nextSteps.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>` : ''}
                </div>
            </div>
        </div>`;
    }

    private renderRecentContexts(): string {
        const recentContexts = this.contextSwitcher.getRecentContexts(5);
        const currentContext = this.contextSwitcher.getCurrentContext();
        
        const otherContexts = recentContexts.filter(c => c.id !== currentContext?.id);

        if (otherContexts.length === 0) {
            return `
            <div class="recent-contexts">
                <h4>Recent Contexts</h4>
                <div class="empty-state">
                    <p>No other contexts available</p>
                </div>
            </div>`;
        }

        return `
        <div class="recent-contexts">
            <h4>Recent Contexts</h4>
            <div class="contexts-list">
                ${otherContexts.map(context => `
                <div class="context-item" onclick="switchContext('${context.workspacePath}')">
                    <div class="context-name">${context.name}</div>
                    <div class="context-meta">
                        <span>📁 ${context.openFiles.length} files</span>
                        <span>🌿 ${context.gitBranch}</span>
                        <span>📊 ${context.activities.length} activities</span>
                    </div>
                    <div class="context-time">${this.formatRelativeTime(context.lastAccessed)}</div>
                </div>
                `).join('')}
            </div>
        </div>`;
    }

    private renderBookmarks(): string {
        const context = this.contextSwitcher.getCurrentContext();
        
        if (!context || context.bookmarks.length === 0) {
            return `
            <div class="bookmarks-section">
                <h4>Smart Bookmarks</h4>
                <div class="empty-state">
                    <p>No bookmarks yet</p>
                    <button onclick="createBookmark()" class="btn-secondary">Create Bookmark</button>
                </div>
            </div>`;
        }

        const bookmarks = context.bookmarks
            .sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime())
            .slice(0, 5);

        return `
        <div class="bookmarks-section">
            <h4>Smart Bookmarks</h4>
            <div class="bookmarks-list">
                ${bookmarks.map(bookmark => `
                <div class="bookmark-item" onclick="navigateToBookmark('${bookmark.id}')">
                    <div class="bookmark-header">
                        <span class="bookmark-title">${bookmark.title}</span>
                        <span class="bookmark-count">${bookmark.accessCount}</span>
                    </div>
                    <div class="bookmark-description">${bookmark.description}</div>
                    <div class="bookmark-ai-reason">${bookmark.aiReason}</div>
                    <div class="bookmark-tags">
                        ${bookmark.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="bookmark-meta">
                        <span>${bookmark.files.length} files</span>
                        <span>${this.formatRelativeTime(bookmark.lastAccessed)}</span>
                    </div>
                </div>
                `).join('')}
            </div>
            <button onclick="createBookmark()" class="btn-secondary">Add Bookmark</button>
        </div>`;
    }

    private renderActivities(): string {
        const context = this.contextSwitcher.getCurrentContext();
        
        if (!context || context.activities.length === 0) {
            return `
            <div class="activities-section">
                <h4>Recent Activities</h4>
                <div class="empty-state">
                    <p>No activities tracked yet</p>
                </div>
            </div>`;
        }

        const activities = context.activities
            .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
            .slice(0, 5);

        return `
        <div class="activities-section">
            <h4>Recent Activities</h4>
            <div class="activities-list">
                ${activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-header">
                        <span class="activity-type">${this.getActivityIcon(activity.type)} ${activity.type}</span>
                        <span class="activity-duration">${activity.duration}m</span>
                    </div>
                    <div class="activity-description">${activity.description}</div>
                    <div class="activity-meta">
                        <span class="activity-category">${activity.aiCategory}</span>
                        <span class="activity-productivity">📊 ${activity.productivity}/10</span>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>`;
    }

    private renderMeetingNotes(): string {
        const context = this.contextSwitcher.getCurrentContext();
        
        if (!context || context.aiMemory.meetingNotes.length === 0) {
            return `
            <div class="meeting-notes-section">
                <h4>Meeting Notes</h4>
                <div class="empty-state">
                    <p>No meeting notes yet</p>
                    <button onclick="addMeetingNotes()" class="btn-secondary">Add Notes</button>
                </div>
            </div>`;
        }

        const notes = context.aiMemory.meetingNotes
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 3);

        return `
        <div class="meeting-notes-section">
            <h4>Meeting Notes</h4>
            <div class="meeting-notes-list">
                ${notes.map(note => `
                <div class="meeting-note-item">
                    <div class="note-header">
                        <span class="note-title">${note.title}</span>
                        <span class="note-date">${this.formatRelativeTime(note.date)}</span>
                    </div>
                    <div class="note-participants">
                        ${note.participants.map(p => `<span class="participant">${p}</span>`).join('')}
                    </div>
                    <div class="note-summary">${note.summary.substring(0, 100)}...</div>
                    ${note.actionItems.length > 0 ? `
                    <div class="action-items">
                        <strong>Action Items:</strong>
                        <ul>
                            ${note.actionItems.map(item => `
                            <li class="action-item ${item.status}">${item.description}</li>
                            `).join('')}
                        </ul>
                    </div>` : ''}
                </div>
                `).join('')}
            </div>
            <button onclick="addMeetingNotes()" class="btn-secondary">Add Notes</button>
        </div>`;
    }

    private renderActions(): string {
        return `
        <div class="actions-section">
            <h4>Quick Actions</h4>
            <div class="actions-grid">
                <button onclick="createBookmark()" class="action-btn">📌 Bookmark</button>
                <button onclick="findReferences()" class="action-btn">🔍 Find Refs</button>
                <button onclick="addMeetingNotes()" class="action-btn">📝 Meeting</button>
                <button onclick="captureState()" class="action-btn">📸 Capture</button>
            </div>
        </div>`;
    }

    private formatRelativeTime(date: Date): string {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 1) {return 'Just now';}
        if (diffMins < 60) {return `${diffMins}m ago`;}
        if (diffHours < 24) {return `${diffHours}h ago`;}
        if (diffDays < 7) {return `${diffDays}d ago`;}
        return date.toLocaleDateString();
    }

    private getActivityIcon(type: string): string {
        const icons: Record<string, string> = {
            'file_open': '📂',
            'file_edit': '✏️',
            'file_save': '💾',
            'terminal': '💻',
            'debug': '🐛',
            'git': '🌿',
            'search': '🔍',
            'build': '🔨'
        };
        return icons[type] || '📄';
    }
}
