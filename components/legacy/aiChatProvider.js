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
exports.AIChatProvider = void 0;
const vscode = __importStar(require("vscode"));
class AIChatProvider {
    constructor(_extensionUri, aiOrchestrator) {
        this._extensionUri = _extensionUri;
        this.aiOrchestrator = aiOrchestrator;
        this.aiOrchestrator.onConversationUpdated(conversation => {
            if (conversation.id === this.currentConversation?.id) {
                this.currentConversation = conversation;
                this.updateWebview();
            }
        });
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case 'sendMessage':
                    await this.handleSendMessage(data.message, data.taskType, data.modelPreference);
                    break;
                case 'newConversation':
                    await this.createNewConversation(data.title);
                    break;
                case 'loadConversation':
                    await this.loadConversation(data.conversationId);
                    break;
                case 'useTemplate':
                    this.usePromptTemplate(data.templateId, data.variables);
                    break;
                case 'configureAPI':
                    await this.configureAPIKeys();
                    break;
                case 'showUsageStats':
                    this.showUsageStats();
                    break;
                case 'exportConversation':
                    await this.exportCurrentConversation();
                    break;
            }
        });
    }
    async handleSendMessage(message, taskType, modelPreference) {
        if (!this.currentConversation) {
            this.currentConversation = await this.aiOrchestrator.createConversation('New Chat');
        }
        // Add user message
        const userMessage = {
            id: this.generateId(),
            role: 'user',
            content: message,
            timestamp: new Date()
        };
        await this.aiOrchestrator.addMessageToConversation(this.currentConversation.id, userMessage);
        // Get code context if available
        const context = await this.getCodeContext();
        // Create AI request
        const request = {
            id: this.generateId(),
            taskType,
            prompt: message,
            context,
            modelPreference,
            timestamp: new Date()
        };
        try {
            // Show typing indicator
            this.showTypingIndicator();
            const response = await this.aiOrchestrator.sendRequest(request);
            // Add AI response
            const aiMessage = {
                id: this.generateId(),
                role: 'assistant',
                content: response.response,
                modelUsed: response.modelUsed,
                timestamp: new Date(),
                cost: response.cost,
                tokensUsed: response.tokensUsed
            };
            await this.aiOrchestrator.addMessageToConversation(this.currentConversation.id, aiMessage);
            this.hideTypingIndicator();
        }
        catch (error) {
            this.hideTypingIndicator();
            vscode.window.showErrorMessage(`AI request failed: ${error}`);
        }
    }
    async getCodeContext() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return {};
        }
        const document = editor.document;
        const selection = editor.selection;
        return {
            language: document.languageId,
            filePath: document.fileName,
            codeSnippet: selection.isEmpty ? undefined : document.getText(selection),
            projectType: await this.detectProjectType()
        };
    }
    async detectProjectType() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            return undefined;
        }
        // Simple project type detection
        const files = await vscode.workspace.findFiles('package.json', null, 1);
        if (files.length > 0) {
            return 'JavaScript/TypeScript';
        }
        const pythonFiles = await vscode.workspace.findFiles('requirements.txt', null, 1);
        if (pythonFiles.length > 0) {
            return 'Python';
        }
        const javaFiles = await vscode.workspace.findFiles('pom.xml', null, 1);
        if (javaFiles.length > 0) {
            return 'Java';
        }
        return undefined;
    }
    async createNewConversation(title) {
        this.currentConversation = await this.aiOrchestrator.createConversation(title || `Chat ${new Date().toLocaleTimeString()}`);
        this.updateWebview();
    }
    async loadConversation(conversationId) {
        const conversations = this.aiOrchestrator.getConversations();
        this.currentConversation = conversations.find(c => c.id === conversationId);
        this.updateWebview();
    }
    usePromptTemplate(templateId, variables) {
        const templates = this.aiOrchestrator.getPromptTemplates();
        const template = templates.find(t => t.id === templateId);
        if (!template) {
            return;
        }
        let prompt = template.template;
        template.variables.forEach(variable => {
            const value = variables[variable] || `{{${variable}}}`;
            prompt = prompt.replace(new RegExp(`{{${variable}}}`, 'g'), value);
        });
        this.sendTemplatePrompt(prompt, template.taskType);
    }
    sendTemplatePrompt(prompt, taskType) {
        if (this._view) {
            this._view.webview.postMessage({
                type: 'fillPrompt',
                prompt,
                taskType
            });
        }
    }
    async configureAPIKeys() {
        const providers = ['openai', 'anthropic', 'google'];
        for (const provider of providers) {
            const apiKey = await vscode.window.showInputBox({
                prompt: `Enter your ${provider.toUpperCase()} API key (optional)`,
                password: true,
                placeHolder: 'sk-...'
            });
            if (apiKey) {
                await this.aiOrchestrator.configureAPIKey(provider, apiKey);
            }
        }
        vscode.window.showInformationMessage('API keys configured successfully');
        this.updateWebview();
    }
    showUsageStats() {
        const stats = this.aiOrchestrator.getUsageStats();
        vscode.window.showInformationMessage(`Usage Stats: ${stats.totalRequests} requests, $${stats.totalCost.toFixed(4)} total cost, ${stats.mostUsedModel} most used`);
    }
    async exportCurrentConversation() {
        if (!this.currentConversation) {
            vscode.window.showWarningMessage('No conversation to export');
            return;
        }
        const exportData = await this.aiOrchestrator.exportConversation(this.currentConversation.id);
        const uri = await vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file(`conversation-${this.currentConversation.id}.json`),
            filters: { 'JSON': ['json'] }
        });
        if (uri) {
            await vscode.workspace.fs.writeFile(uri, Buffer.from(exportData));
            vscode.window.showInformationMessage('Conversation exported successfully');
        }
    }
    showTypingIndicator() {
        if (this._view) {
            this._view.webview.postMessage({ type: 'showTyping' });
        }
    }
    hideTypingIndicator() {
        if (this._view) {
            this._view.webview.postMessage({ type: 'hideTyping' });
        }
    }
    updateWebview() {
        if (this._view) {
            this._view.webview.html = this._getHtmlForWebview(this._view.webview);
        }
    }
    _getHtmlForWebview(webview) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'ai-chat.js'));
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'ai-chat.css'));
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleUri}" rel="stylesheet">
    <title>AI Assistant</title>
</head>
<body>
    <div class="ai-chat-container">
        ${this.renderChatHeader()}
        ${this.renderConversationList()}
        ${this.renderChatMessages()}
        ${this.renderModelSelector()}
        ${this.renderPromptTemplates()}
        ${this.renderChatInput()}
        ${this.renderUsageStats()}
    </div>
    <script src="${scriptUri}"></script>
</body>
</html>`;
    }
    renderChatHeader() {
        const availableModels = this.aiOrchestrator.getAvailableModels();
        const hasAPIKeys = availableModels.length > 0;
        return `
        <div class="chat-header">
            <h3>🤖 AI Assistant</h3>
            <div class="header-actions">
                <button onclick="newConversation()" class="btn-icon" title="New Chat">➕</button>
                <button onclick="showUsageStats()" class="btn-icon" title="Usage Stats">📊</button>
                <button onclick="configureAPI()" class="btn-icon" title="Configure API Keys">⚙️</button>
                ${this.currentConversation ? `<button onclick="exportConversation()" class="btn-icon" title="Export">📤</button>` : ''}
            </div>
            ${!hasAPIKeys ? `<div class="api-warning">⚠️ Configure API keys to use AI models</div>` : ''}
        </div>`;
    }
    renderConversationList() {
        const conversations = this.aiOrchestrator.getConversations().slice(0, 5);
        if (conversations.length === 0) {
            return '';
        }
        return `
        <div class="conversation-list">
            <h4>Recent Conversations</h4>
            ${conversations.map(conv => `
                <div class="conversation-item ${conv.id === this.currentConversation?.id ? 'active' : ''}" 
                     onclick="loadConversation('${conv.id}')">
                    <span class="conv-title">${conv.title}</span>
                    <span class="conv-cost">$${conv.totalCost.toFixed(4)}</span>
                </div>
            `).join('')}
        </div>`;
    }
    renderChatMessages() {
        if (!this.currentConversation || this.currentConversation.messages.length === 0) {
            return `
            <div class="chat-messages empty">
                <div class="welcome-message">
                    <h3>👋 Welcome to AI Assistant</h3>
                    <p>Choose a task type and start chatting with AI models!</p>
                    <div class="quick-actions">
                        <button onclick="quickStart('code_generation')" class="quick-btn">🔧 Generate Code</button>
                        <button onclick="quickStart('code_review')" class="quick-btn">👀 Review Code</button>
                        <button onclick="quickStart('debugging')" class="quick-btn">🐛 Debug Issue</button>
                        <button onclick="quickStart('explanation')" class="quick-btn">📖 Explain Code</button>
                    </div>
                </div>
            </div>`;
        }
        return `
        <div class="chat-messages">
            ${this.currentConversation.messages.map(msg => this.renderMessage(msg)).join('')}
            <div id="typing-indicator" class="typing-indicator" style="display: none;">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
                <span>AI is thinking...</span>
            </div>
        </div>`;
    }
    renderMessage(message) {
        const isUser = message.role === 'user';
        const timestamp = message.timestamp.toLocaleTimeString();
        return `
        <div class="message ${isUser ? 'user' : 'assistant'}">
            <div class="message-header">
                <span class="message-role">${isUser ? '👤 You' : '🤖 AI'}</span>
                ${message.modelUsed ? `<span class="model-badge">${message.modelUsed}</span>` : ''}
                <span class="message-time">${timestamp}</span>
                ${message.cost ? `<span class="message-cost">$${message.cost.toFixed(4)}</span>` : ''}
            </div>
            <div class="message-content">
                ${this.formatMessageContent(message.content)}
            </div>
            ${message.tokensUsed ? `
                <div class="message-meta">
                    📊 ${message.tokensUsed.input + message.tokensUsed.output} tokens
                </div>
            ` : ''}
        </div>`;
    }
    formatMessageContent(content) {
        // Basic markdown-like formatting
        return content
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
    renderModelSelector() {
        const availableModels = this.aiOrchestrator.getAvailableModels();
        if (availableModels.length === 0) {
            return '';
        }
        return `
        <div class="model-selector">
            <label for="model-select">AI Model:</label>
            <select id="model-select">
                <option value="">Auto-select (Recommended)</option>
                ${availableModels.map(model => `
                    <option value="${model.id}">
                        ${model.name} - ${model.provider} ($${(model.costPerToken.input * 1000).toFixed(4)}/1K tokens)
                    </option>
                `).join('')}
            </select>
        </div>`;
    }
    renderPromptTemplates() {
        const templates = this.aiOrchestrator.getPromptTemplates();
        return `
        <div class="prompt-templates">
            <details>
                <summary>📝 Prompt Templates (${templates.length})</summary>
                <div class="templates-grid">
                    ${templates.map(template => `
                        <div class="template-card" onclick="useTemplate('${template.id}')">
                            <div class="template-name">${template.name}</div>
                            <div class="template-desc">${template.description}</div>
                            <div class="template-tags">
                                ${template.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </details>
        </div>`;
    }
    renderChatInput() {
        return `
        <div class="chat-input-container">
            <div class="task-type-selector">
                <select id="task-type-select">
                    <option value="code_generation">🔧 Code Generation</option>
                    <option value="code_review">👀 Code Review</option>
                    <option value="debugging">🐛 Debugging</option>
                    <option value="documentation">📖 Documentation</option>
                    <option value="testing">🧪 Testing</option>
                    <option value="refactoring">♻️ Refactoring</option>
                    <option value="explanation">💡 Explanation</option>
                    <option value="optimization">⚡ Optimization</option>
                    <option value="security_analysis">🔒 Security Analysis</option>
                    <option value="translation">🌐 Translation</option>
                </select>
            </div>
            <div class="input-area">
                <textarea id="chat-input" placeholder="Ask AI anything about your code..." rows="3"></textarea>
                <button id="send-button" onclick="sendMessage()">Send</button>
            </div>
            <div class="input-actions">
                <button onclick="attachCode()" class="btn-secondary">📎 Attach Code</button>
                <button onclick="attachFile()" class="btn-secondary">📁 Attach File</button>
            </div>
        </div>`;
    }
    renderUsageStats() {
        const stats = this.aiOrchestrator.getUsageStats();
        return `
        <div class="usage-stats">
            <details>
                <summary>📊 Usage Stats</summary>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value">${stats.totalRequests}</span>
                        <span class="stat-label">Requests</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">$${stats.totalCost.toFixed(4)}</span>
                        <span class="stat-label">Total Cost</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${stats.averageResponseTime.toFixed(0)}ms</span>
                        <span class="stat-label">Avg Response</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${stats.mostUsedModel || 'None'}</span>
                        <span class="stat-label">Top Model</span>
                    </div>
                </div>
            </details>
        </div>`;
    }
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}
exports.AIChatProvider = AIChatProvider;
AIChatProvider.viewType = 'autoboot.aiChat';
//# sourceMappingURL=aiChatProvider.js.map