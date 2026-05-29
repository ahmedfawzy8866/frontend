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
exports.SmartContextSwitcher = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
class SmartContextSwitcher {
    constructor(extensionContext, aiOrchestrator) {
        this.extensionContext = extensionContext;
        this.contexts = new Map();
        this.currentContext = null;
        this.onContextSwitchedEmitter = new vscode.EventEmitter();
        this.onActivityTrackedEmitter = new vscode.EventEmitter();
        this.onContextSwitched = this.onContextSwitchedEmitter.event;
        this.onActivityTracked = this.onActivityTrackedEmitter.event;
        this.aiOrchestrator = aiOrchestrator;
        this.activityTracker = new ActivityTracker(this);
        this.bookmarkManager = new SmartBookmarkManager(this, aiOrchestrator);
        this.referencesFinder = new CrossProjectReferencesFinder(this, aiOrchestrator);
        this.meetingNotesManager = new MeetingNotesManager(this, aiOrchestrator);
        this.aiMemoryManager = new AIMemoryManager(this, aiOrchestrator);
        this.initializeContextSwitcher();
        this.setupEventListeners();
    }
    initializeContextSwitcher() {
        // Load saved contexts
        this.loadContexts();
        // Detect current workspace
        if (vscode.workspace.workspaceFolders) {
            const workspaceFolder = vscode.workspace.workspaceFolders[0];
            this.switchToProject(workspaceFolder.uri.fsPath);
        }
    }
    setupEventListeners() {
        // File events
        vscode.workspace.onDidOpenTextDocument(doc => {
            this.trackFileOpen(doc);
        });
        vscode.workspace.onDidCloseTextDocument(doc => {
            this.trackFileClose(doc);
        });
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                this.trackFileSwitch(editor.document);
            }
        });
        // Terminal events
        vscode.window.onDidOpenTerminal(terminal => {
            this.trackTerminalOpen(terminal);
        });
        vscode.window.onDidCloseTerminal(terminal => {
            this.trackTerminalClose(terminal);
        });
        // Workspace events
        vscode.workspace.onDidChangeWorkspaceFolders(event => {
            this.handleWorkspaceChange(event);
        });
        // Save context periodically
        setInterval(() => {
            this.saveCurrentContext();
        }, 30000); // Every 30 seconds
    }
    async switchToProject(workspacePath) {
        // Save current context
        if (this.currentContext) {
            await this.saveContext(this.currentContext);
        }
        // Load or create new context
        const contextId = this.generateContextId(workspacePath);
        let context = this.contexts.get(contextId);
        if (!context) {
            context = await this.createNewContext(workspacePath);
            this.contexts.set(contextId, context);
        }
        // Update last accessed
        context.lastAccessed = new Date();
        this.currentContext = context;
        // Restore project state
        await this.restoreProjectState(context);
        // Update AI memory
        await this.aiMemoryManager.updateWorkingContext(context);
        this.onContextSwitchedEmitter.fire(context);
    }
    async createNewContext(workspacePath) {
        const workspaceName = path.basename(workspacePath);
        const gitBranch = await this.getCurrentGitBranch(workspacePath);
        const gitStatus = await this.getGitStatus(workspacePath);
        return {
            id: this.generateContextId(workspacePath),
            name: workspaceName,
            workspacePath,
            lastAccessed: new Date(),
            openFiles: [],
            terminalSessions: [],
            gitBranch,
            gitStatus,
            bookmarks: [],
            timeSpent: 0,
            activities: [],
            aiMemory: {
                workingOn: '',
                nextSteps: [],
                blockers: [],
                learnings: [],
                codePatterns: [],
                relatedProjects: [],
                meetingNotes: [],
                insights: '',
                lastUpdated: new Date(),
                sessionDuration: 0,
                productivityScore: 0
            }
        };
    }
    async restoreProjectState(context) {
        // Restore open files
        for (const fileContext of context.openFiles) {
            try {
                const document = await vscode.workspace.openTextDocument(fileContext.filePath);
                const editor = await vscode.window.showTextDocument(document, fileContext.viewColumn, false);
                // Restore cursor position and selection
                editor.selection = fileContext.selection ||
                    new vscode.Selection(fileContext.cursorPosition, fileContext.cursorPosition);
                // Restore scroll position
                editor.revealRange(new vscode.Range(fileContext.cursorPosition, fileContext.cursorPosition), vscode.TextEditorRevealType.InCenter);
            }
            catch (error) {
                console.warn(`Failed to restore file: ${fileContext.filePath}`, error);
            }
        }
        // Restore terminal sessions
        for (const terminalContext of context.terminalSessions) {
            if (terminalContext.isActive) {
                const terminal = vscode.window.createTerminal({
                    name: terminalContext.name,
                    cwd: terminalContext.cwd
                });
                // Restore command history (if possible)
                if (terminalContext.lastCommand) {
                    terminal.sendText(terminalContext.lastCommand, false);
                }
            }
        }
        // Switch to correct git branch
        if (context.gitBranch) {
            await this.switchGitBranch(context.gitBranch);
        }
    }
    async captureCurrentState() {
        if (!this.currentContext) {
            return;
        }
        // Capture open files
        this.currentContext.openFiles = [];
        for (const editor of vscode.window.visibleTextEditors) {
            const fileContext = {
                filePath: editor.document.uri.fsPath,
                cursorPosition: editor.selection.active,
                selection: editor.selection.isEmpty ? null : editor.selection,
                scrollPosition: editor.visibleRanges[0]?.start.line || 0,
                isDirty: editor.document.isDirty,
                lastModified: new Date(),
                viewColumn: editor.viewColumn || vscode.ViewColumn.One
            };
            this.currentContext.openFiles.push(fileContext);
        }
        // Capture terminal sessions
        this.currentContext.terminalSessions = [];
        for (const terminal of vscode.window.terminals) {
            const terminalContext = {
                id: terminal.name,
                name: terminal.name,
                cwd: await this.getTerminalCwd(terminal),
                lastCommand: '',
                commandHistory: [],
                isActive: terminal === vscode.window.activeTerminal,
                processId: await terminal.processId
            };
            this.currentContext.terminalSessions.push(terminalContext);
        }
        // Update git status
        this.currentContext.gitBranch = await this.getCurrentGitBranch(this.currentContext.workspacePath);
        this.currentContext.gitStatus = await this.getGitStatus(this.currentContext.workspacePath);
        // Update AI memory
        await this.aiMemoryManager.updateMemoryFromCurrentState(this.currentContext);
    }
    async createSmartBookmark(filePath, position, title, description) {
        const document = await vscode.workspace.openTextDocument(filePath);
        const codeContext = this.getCodeContext(document, position);
        const aiReason = await this.aiMemoryManager.generateBookmarkReason(filePath, position, codeContext, title);
        const bookmark = {
            id: this.generateId(),
            filePath,
            line: position.line,
            column: position.character,
            title,
            description: description || '',
            aiReason,
            tags: await this.aiMemoryManager.generateBookmarkTags(filePath, codeContext),
            createdAt: new Date(),
            lastAccessed: new Date(),
            accessCount: 1,
            relatedFiles: [],
            codeContext,
            files: [{ path: filePath, position }]
        };
        if (this.currentContext) {
            this.currentContext.bookmarks.push(bookmark);
            await this.saveContext(this.currentContext);
        }
        return bookmark;
    }
    async createBookmark(title, description, filePath, position) {
        return this.createSmartBookmark(filePath, position, title, description);
    }
    async getBookmarks() {
        if (!this.currentContext) {
            return [];
        }
        return this.currentContext.bookmarks;
    }
    async findCrossProjectReferences(query) {
        return this.referencesFinder.findReferences(query);
    }
    async addMeetingNotes(title, content, participants) {
        const meetingNote = await this.meetingNotesManager.createMeetingNote(title, content, participants);
        if (this.currentContext) {
            this.currentContext.aiMemory.meetingNotes.push(meetingNote);
            await this.saveContext(this.currentContext);
        }
        return meetingNote;
    }
    getCurrentContext() {
        return this.currentContext;
    }
    getAllContexts() {
        return Array.from(this.contexts.values());
    }
    getRecentContexts(limit = 5) {
        return Array.from(this.contexts.values())
            .sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime())
            .slice(0, limit);
    }
    async exportContext(contextId) {
        const context = this.contexts.get(contextId);
        if (!context) {
            throw new Error(`Context not found: ${contextId}`);
        }
        return JSON.stringify({
            ...context,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        }, null, 2);
    }
    async importContext(contextData) {
        const context = JSON.parse(contextData);
        // Validate and sanitize imported context
        context.lastAccessed = new Date();
        context.id = this.generateContextId(context.workspacePath);
        this.contexts.set(context.id, context);
        await this.saveContext(context);
    }
    // Private helper methods
    generateContextId(workspacePath) {
        return Buffer.from(workspacePath).toString('base64').replace(/[/+=]/g, '');
    }
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    async getCurrentGitBranch(workspacePath) {
        try {
            const { execSync } = require('child_process');
            const result = execSync('git branch --show-current', {
                cwd: workspacePath,
                encoding: 'utf8'
            });
            return result.trim();
        }
        catch {
            return 'main';
        }
    }
    async getGitStatus(workspacePath) {
        try {
            const { execSync } = require('child_process');
            // Get basic status
            const statusResult = execSync('git status --porcelain', {
                cwd: workspacePath,
                encoding: 'utf8'
            });
            // Parse status
            const staged = [];
            const unstaged = [];
            const untracked = [];
            statusResult.split('\n').forEach((line) => {
                if (line.length < 3) {
                    return;
                }
                const status = line.substring(0, 2);
                const file = line.substring(3);
                if (status[0] !== ' ') {
                    staged.push(file);
                }
                if (status[1] !== ' ') {
                    unstaged.push(file);
                }
                if (status === '??') {
                    untracked.push(file);
                }
            });
            // Get last commit
            const commitResult = execSync('git log -1 --format="%H|%s|%an|%ai"', {
                cwd: workspacePath,
                encoding: 'utf8'
            });
            const [hash, message, author, dateStr] = commitResult.trim().split('|');
            return {
                branch: await this.getCurrentGitBranch(workspacePath),
                ahead: 0,
                behind: 0,
                staged,
                unstaged,
                untracked,
                lastCommit: {
                    hash,
                    message,
                    author,
                    date: new Date(dateStr)
                }
            };
        }
        catch {
            return {
                branch: 'main',
                ahead: 0,
                behind: 0,
                staged: [],
                unstaged: [],
                untracked: [],
                lastCommit: {
                    hash: '',
                    message: '',
                    author: '',
                    date: new Date()
                }
            };
        }
    }
    async switchGitBranch(branch) {
        if (!this.currentContext) {
            return;
        }
        try {
            const { execSync } = require('child_process');
            execSync(`git checkout ${branch}`, {
                cwd: this.currentContext.workspacePath,
                stdio: 'ignore'
            });
        }
        catch (error) {
            console.warn(`Failed to switch to branch ${branch}:`, error);
        }
    }
    getCodeContext(document, position) {
        const startLine = Math.max(0, position.line - 5);
        const endLine = Math.min(document.lineCount - 1, position.line + 5);
        let context = '';
        for (let i = startLine; i <= endLine; i++) {
            context += document.lineAt(i).text + '\n';
        }
        return context;
    }
    async findRelatedFiles(filePath) {
        // Simple implementation - could be enhanced with AI
        const dir = path.dirname(filePath);
        const basename = path.basename(filePath, path.extname(filePath));
        try {
            const files = await vscode.workspace.findFiles(new vscode.RelativePattern(dir, `*${basename}*`), null, 10);
            return files
                .map(uri => uri.fsPath)
                .filter(f => f !== filePath);
        }
        catch {
            return [];
        }
    }
    async getTerminalCwd(terminal) {
        // This would require terminal API extensions
        return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
    }
    trackFileOpen(document) {
        this.activityTracker.trackFileActivity('open', document.uri.fsPath);
    }
    trackFileClose(document) {
        this.activityTracker.trackFileActivity('close', document.uri.fsPath);
    }
    trackFileSwitch(document) {
        this.activityTracker.trackFileActivity('switch', document.uri.fsPath);
    }
    trackTerminalOpen(terminal) {
        this.activityTracker.trackTerminalActivity('open', terminal.name);
    }
    trackTerminalClose(terminal) {
        this.activityTracker.trackTerminalActivity('close', terminal.name);
    }
    handleWorkspaceChange(event) {
        if (event.added.length > 0) {
            this.switchToProject(event.added[0].uri.fsPath);
        }
    }
    async saveCurrentContext() {
        if (this.currentContext) {
            await this.captureCurrentState();
            await this.saveContext(this.currentContext);
        }
    }
    loadContexts() {
        try {
            const contextsData = this.extensionContext.globalState.get('smartContexts');
            if (contextsData) {
                const contexts = JSON.parse(contextsData);
                contexts.forEach(context => {
                    // Convert date strings back to Date objects
                    context.lastAccessed = new Date(context.lastAccessed);
                    context.activities.forEach(activity => {
                        activity.startTime = new Date(activity.startTime);
                        if (activity.endTime) {
                            activity.endTime = new Date(activity.endTime);
                        }
                    });
                    this.contexts.set(context.id, context);
                });
            }
        }
        catch (error) {
            console.error('Failed to load contexts:', error);
        }
    }
    async saveContext(context) {
        try {
            this.contexts.set(context.id, context);
            const contextsArray = Array.from(this.contexts.values());
            await this.extensionContext.globalState.update('smartContexts', JSON.stringify(contextsArray));
        }
        catch (error) {
            console.error('Failed to save context:', error);
        }
    }
    dispose() {
        this.onContextSwitchedEmitter.dispose();
        this.onActivityTrackedEmitter.dispose();
        this.activityTracker.dispose();
        this.bookmarkManager.dispose();
        this.referencesFinder.dispose();
        this.meetingNotesManager.dispose();
        this.aiMemoryManager.dispose();
    }
}
exports.SmartContextSwitcher = SmartContextSwitcher;
// Supporting classes would be implemented in separate files
class ActivityTracker {
    constructor(contextSwitcher) {
        this.contextSwitcher = contextSwitcher;
    }
    trackFileActivity(type, filePath) {
        // Implementation for tracking file activities
    }
    trackTerminalActivity(type, terminalName) {
        // Implementation for tracking terminal activities
    }
    dispose() { }
}
class SmartBookmarkManager {
    constructor(contextSwitcher, aiOrchestrator) {
        this.contextSwitcher = contextSwitcher;
        this.aiOrchestrator = aiOrchestrator;
    }
    dispose() { }
}
class CrossProjectReferencesFinder {
    constructor(contextSwitcher, aiOrchestrator) {
        this.contextSwitcher = contextSwitcher;
        this.aiOrchestrator = aiOrchestrator;
    }
    async findReferences(query) {
        if (!this.aiOrchestrator) {
            return [];
        }
        try {
            // Get all workspace contexts
            const contexts = this.contextSwitcher.getAllContexts();
            const searchResults = [];
            // Use AI to analyze and find relevant references across projects
            const prompt = `Find code references and patterns related to: "${query}"
            
Available projects: ${contexts.map(c => c.name).join(', ')}

Search for:
1. Similar function/class names
2. Related patterns or concepts
3. Dependencies or imports
4. Configuration files
5. Documentation references

Return results in JSON format with: file, line, context, relevance_score, project`;
            const response = await this.aiOrchestrator.sendRequest({
                id: `ref_search_${Date.now()}`,
                prompt: prompt,
                taskType: 'explanation',
                context: {},
                modelPreference: 'gpt-3.5-turbo',
                maxTokens: 500,
                temperature: 0.2,
                timestamp: new Date()
            });
            // Parse AI response and create references
            // This is a simplified implementation
            for (const context of contexts) {
                if (context.name.toLowerCase().includes(query.toLowerCase())) {
                    searchResults.push({
                        sourceProject: 'current',
                        targetProject: context.name,
                        sourceFile: 'search_query',
                        targetFile: `${context.workspacePath}/README.md`,
                        referenceType: 'similar_code',
                        similarity: 0.8,
                        description: `Project: ${context.name}`,
                        lastUpdated: new Date()
                    });
                }
            }
            return searchResults;
        }
        catch (error) {
            console.error('Error finding cross-project references:', error);
            return [];
        }
    }
    dispose() { }
}
class MeetingNotesManager {
    constructor(contextSwitcher, aiOrchestrator) {
        this.contextSwitcher = contextSwitcher;
        this.aiOrchestrator = aiOrchestrator;
    }
    async createMeetingNote(title, content, participants) {
        const actionItems = await this.extractActionItems(content);
        return {
            id: Date.now().toString(),
            title,
            date: new Date(),
            participants,
            summary: content,
            actionItems,
            decisions: [],
            relatedCode: []
        };
    }
    async extractActionItems(content) {
        if (!this.aiOrchestrator) {
            return [];
        }
        try {
            const prompt = `Extract action items from the following meeting notes:

${content}

Please identify:
1. Tasks that need to be completed
2. Who is responsible (if mentioned)
3. Due dates (if mentioned)
4. Priority level (high/medium/low)

Return as JSON array with format:
{
  "description": "task description",
  "assignee": "person name or 'unassigned'",
  "priority": "high|medium|low",
  "estimatedTime": minutes_estimate
}`;
            const response = await this.aiOrchestrator.sendRequest({
                id: `action_items_${Date.now()}`,
                prompt: prompt,
                taskType: 'documentation',
                context: {},
                temperature: 0.1,
                timestamp: new Date()
            });
            // Parse AI response and create action items
            try {
                const aiItems = JSON.parse(response.response);
                return aiItems.map((item, index) => ({
                    id: `action_${Date.now()}_${index}`,
                    description: item.description || 'Untitled action item',
                    assignee: item.assignee || 'unassigned',
                    priority: item.priority || 'medium',
                    status: 'todo',
                    relatedFiles: [],
                    estimatedTime: item.estimatedTime || 30
                }));
            }
            catch (parseError) {
                // Fallback: simple text parsing
                return this.extractActionItemsFallback(content);
            }
        }
        catch (error) {
            console.error('Error extracting action items:', error);
            return this.extractActionItemsFallback(content);
        }
    }
    extractActionItemsFallback(content) {
        const actionItems = [];
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].toLowerCase();
            if (line.includes('todo') || line.includes('action') || line.includes('task') ||
                line.includes('follow up') || line.includes('next step')) {
                actionItems.push({
                    id: `action_${Date.now()}_${i}`,
                    description: lines[i].trim(),
                    assignee: 'unassigned',
                    priority: 'medium',
                    status: 'todo',
                    relatedFiles: [],
                    estimatedTime: 30
                });
            }
        }
        return actionItems;
    }
    dispose() { }
}
class AIMemoryManager {
    constructor(contextSwitcher, aiOrchestrator) {
        this.contextSwitcher = contextSwitcher;
        this.aiOrchestrator = aiOrchestrator;
    }
    async updateWorkingContext(context) {
        if (!this.aiOrchestrator) {
            return;
        }
        try {
            // Analyze current context and update AI memory
            const openFiles = context.openFiles.map(f => f.filePath).join(', ');
            const recentActivities = context.activities.slice(0, 3).map(a => a.description).join('; ');
            const prompt = `Analyze the current development context and provide insights:

Project: ${context.name}
Open Files: ${openFiles}
Recent Activities: ${recentActivities}
Git Branch: ${context.gitBranch}

Provide a brief summary of:
1. What the developer is likely working on
2. Potential blockers or challenges
3. Recommended next steps
4. Related patterns or code areas to consider

Keep response concise (2-3 sentences).`;
            const response = await this.aiOrchestrator.sendRequest({
                id: `context_analysis_${Date.now()}`,
                prompt: prompt,
                taskType: 'explanation',
                context: {
                    projectType: 'development',
                    language: this.inferPrimaryLanguage(context.openFiles)
                },
                temperature: 0.3,
                timestamp: new Date()
            });
            // Update AI memory with insights
            context.aiMemory.workingOn = this.extractWorkingOn(response.response);
            context.aiMemory.blockers = this.extractBlockers(response.response);
            context.aiMemory.insights = response.response;
            context.aiMemory.lastUpdated = new Date();
        }
        catch (error) {
            console.error('Error updating working context:', error);
        }
    }
    async updateMemoryFromCurrentState(context) {
        if (!context) {
            return;
        }
        // Update memory with current VS Code state
        context.aiMemory.lastUpdated = new Date();
        context.aiMemory.sessionDuration = Date.now() - context.lastAccessed.getTime();
        // Track productivity patterns
        const recentActivities = context.activities.filter(a => Date.now() - a.startTime.getTime() < 3600000 // Last hour
        );
        if (recentActivities.length > 0) {
            const productiveTime = recentActivities
                .filter(a => a.aiCategory === 'coding' || a.aiCategory === 'debugging')
                .reduce((sum, a) => sum + a.duration, 0);
            context.aiMemory.productivityScore = Math.min(1.0, productiveTime / 3600000);
        }
    }
    async generateBookmarkReason(filePath, position, codeContext, title) {
        if (!this.aiOrchestrator) {
            return `Bookmarked for: ${title}`;
        }
        try {
            const prompt = `Analyze this code bookmark and explain why it's important:

File: ${filePath}
Title: ${title}
Code Context: ${codeContext.substring(0, 500)}

Provide a brief 1-2 sentence explanation of why this bookmark is likely important for development work.`;
            const response = await this.aiOrchestrator.sendRequest({
                id: `bookmark_reason_${Date.now()}`,
                prompt: prompt,
                taskType: 'explanation',
                context: {
                    filePath: filePath,
                    language: this.getFileLanguage(filePath)
                },
                temperature: 0.2,
                timestamp: new Date()
            });
            return response.response || `Bookmarked for: ${title}`;
        }
        catch (error) {
            console.error('Error generating bookmark reason:', error);
            return `Bookmarked for: ${title}`;
        }
    }
    async generateBookmarkTags(filePath, codeContext) {
        if (!this.aiOrchestrator) {
            return ['code', 'important'];
        }
        try {
            const language = this.getFileLanguage(filePath);
            const tags = [language];
            // Add context-based tags
            if (codeContext.toLowerCase().includes('function') || codeContext.toLowerCase().includes('method')) {
                tags.push('function');
            }
            if (codeContext.toLowerCase().includes('class')) {
                tags.push('class');
            }
            if (codeContext.toLowerCase().includes('bug') || codeContext.toLowerCase().includes('fix')) {
                tags.push('bug-fix');
            }
            if (codeContext.toLowerCase().includes('todo') || codeContext.toLowerCase().includes('fixme')) {
                tags.push('todo');
            }
            if (codeContext.toLowerCase().includes('test')) {
                tags.push('testing');
            }
            return [...new Set(tags)];
        }
        catch (error) {
            console.error('Error generating bookmark tags:', error);
            return ['code', 'important'];
        }
    }
    inferPrimaryLanguage(openFiles) {
        const extensions = openFiles.map(f => f.filePath.split('.').pop()).filter(Boolean);
        const extensionCounts = extensions.reduce((acc, ext) => {
            acc[ext] = (acc[ext] || 0) + 1;
            return acc;
        }, {});
        const mostCommon = Object.entries(extensionCounts)
            .sort(([, a], [, b]) => b - a)[0];
        return mostCommon ? this.extensionToLanguage(mostCommon[0]) : 'unknown';
    }
    extensionToLanguage(extension) {
        const mapping = {
            'ts': 'typescript',
            'js': 'javascript',
            'py': 'python',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'go': 'go',
            'rs': 'rust',
            'php': 'php',
            'rb': 'ruby',
            'cs': 'csharp',
            'swift': 'swift',
            'kt': 'kotlin'
        };
        return mapping[extension] || extension;
    }
    getFileLanguage(filePath) {
        const extension = filePath.split('.').pop();
        return extension ? this.extensionToLanguage(extension) : 'text';
    }
    extractWorkingOn(aiResponse) {
        const lines = aiResponse.split('\n');
        for (const line of lines) {
            if (line.toLowerCase().includes('working on') || line.toLowerCase().includes('developing')) {
                return line.trim();
            }
        }
        return aiResponse.split('.')[0] || 'Development work';
    }
    extractBlockers(aiResponse) {
        const blockers = [];
        const lines = aiResponse.split('\n');
        for (const line of lines) {
            if (line.toLowerCase().includes('blocker') ||
                line.toLowerCase().includes('challenge') ||
                line.toLowerCase().includes('issue') ||
                line.toLowerCase().includes('problem')) {
                blockers.push(line.trim());
            }
        }
        return blockers;
    }
    dispose() { }
}
//# sourceMappingURL=contextSwitcher.js.map