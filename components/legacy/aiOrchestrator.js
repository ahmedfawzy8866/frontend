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
exports.AIOrchestrator = void 0;
const vscode = __importStar(require("vscode"));
class AIOrchestrator {
    constructor(context) {
        this.context = context;
        this.models = new Map();
        this.conversations = new Map();
        this.promptTemplates = new Map();
        this.apiKeys = new Map();
        this.onConversationUpdatedEmitter = new vscode.EventEmitter();
        this.onUsageUpdatedEmitter = new vscode.EventEmitter();
        this.onConversationUpdated = this.onConversationUpdatedEmitter.event;
        this.onUsageUpdated = this.onUsageUpdatedEmitter.event;
        this.initializeModels();
        this.loadConfiguration();
        this.usageStats = this.initializeUsageStats();
        this.loadPromptTemplates();
    }
    initializeModels() {
        // OpenAI Models
        this.models.set('gpt-4-turbo', {
            id: 'gpt-4-turbo',
            name: 'GPT-4 Turbo',
            provider: 'openai',
            capabilities: ['text', 'code', 'analysis', 'reasoning'],
            costPerToken: { input: 0.00001, output: 0.00003 },
            maxTokens: 128000,
            specialties: ['code_generation', 'debugging', 'explanation', 'refactoring'],
            apiEndpoint: 'https://api.openai.com/v1/chat/completions'
        });
        this.models.set('gpt-3.5-turbo', {
            id: 'gpt-3.5-turbo',
            name: 'GPT-3.5 Turbo',
            provider: 'openai',
            capabilities: ['text', 'code', 'fast_response'],
            costPerToken: { input: 0.0000005, output: 0.0000015 },
            maxTokens: 16385,
            specialties: ['code_generation', 'documentation', 'testing'],
            apiEndpoint: 'https://api.openai.com/v1/chat/completions'
        });
        // Anthropic Models
        this.models.set('claude-3-opus', {
            id: 'claude-3-opus',
            name: 'Claude 3 Opus',
            provider: 'anthropic',
            capabilities: ['text', 'code', 'analysis', 'reasoning', 'safety'],
            costPerToken: { input: 0.000015, output: 0.000075 },
            maxTokens: 200000,
            specialties: ['code_review', 'security_analysis', 'explanation', 'refactoring'],
            apiEndpoint: 'https://api.anthropic.com/v1/messages'
        });
        this.models.set('claude-3-sonnet', {
            id: 'claude-3-sonnet',
            name: 'Claude 3 Sonnet',
            provider: 'anthropic',
            capabilities: ['text', 'code', 'analysis', 'balanced'],
            costPerToken: { input: 0.000003, output: 0.000015 },
            maxTokens: 200000,
            specialties: ['code_generation', 'debugging', 'documentation', 'optimization'],
            apiEndpoint: 'https://api.anthropic.com/v1/messages'
        });
        // Google Models
        this.models.set('gemini-pro', {
            id: 'gemini-pro',
            name: 'Gemini Pro',
            provider: 'google',
            capabilities: ['text', 'code', 'multimodal'],
            costPerToken: { input: 0.000001, output: 0.000002 },
            maxTokens: 32768,
            specialties: ['code_generation', 'translation', 'explanation'],
            apiEndpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent'
        });
        // Specialized Coding Models
        this.models.set('codellama-34b', {
            id: 'codellama-34b',
            name: 'CodeLlama 34B',
            provider: 'local',
            capabilities: ['code', 'fast_inference'],
            costPerToken: { input: 0, output: 0 },
            maxTokens: 16384,
            specialties: ['code_generation', 'debugging', 'refactoring']
        });
    }
    loadConfiguration() {
        const config = vscode.workspace.getConfiguration('autoboot.ai');
        // Load API keys from secure storage
        this.context.secrets.get('openai-api-key').then(key => {
            if (key) {
                this.apiKeys.set('openai', key);
            }
        });
        this.context.secrets.get('anthropic-api-key').then(key => {
            if (key) {
                this.apiKeys.set('anthropic', key);
            }
        });
        this.context.secrets.get('google-api-key').then(key => {
            if (key) {
                this.apiKeys.set('google', key);
            }
        });
    }
    initializeUsageStats() {
        return {
            totalRequests: 0,
            totalCost: 0,
            costByModel: {},
            requestsByTaskType: {},
            averageResponseTime: 0,
            mostUsedModel: '',
            dailyUsage: {},
            budgetUsed: 0
        };
    }
    loadPromptTemplates() {
        // Load built-in prompt templates
        const builtInTemplates = [
            {
                id: 'code-review',
                name: 'Code Review',
                description: 'Comprehensive code review with suggestions',
                template: `Please review the following {{language}} code and provide feedback on:
1. Code quality and best practices
2. Potential bugs or issues
3. Performance optimizations
4. Security considerations
5. Maintainability improvements

Code:
\`\`\`{{language}}
{{code}}
\`\`\`

Context: {{context}}`,
                variables: ['language', 'code', 'context'],
                taskType: 'code_review',
                tags: ['review', 'quality', 'best-practices'],
                isPublic: true,
                createdBy: 'system',
                usageCount: 0,
                rating: 5.0
            },
            {
                id: 'bug-fix',
                name: 'Bug Fix Assistant',
                description: 'Help identify and fix bugs in code',
                template: `I'm encountering an issue with my {{language}} code. Here's the problematic code:

\`\`\`{{language}}
{{code}}
\`\`\`

Error message: {{error}}

Expected behavior: {{expected}}
Actual behavior: {{actual}}

Please help me identify the bug and provide a corrected version with explanation.`,
                variables: ['language', 'code', 'error', 'expected', 'actual'],
                taskType: 'debugging',
                tags: ['debugging', 'fix', 'troubleshooting'],
                isPublic: true,
                createdBy: 'system',
                usageCount: 0,
                rating: 4.8
            },
            {
                id: 'code-generation',
                name: 'Code Generation',
                description: 'Generate code based on requirements',
                template: `Please generate {{language}} code that {{requirements}}.

Requirements:
- {{requirement1}}
- {{requirement2}}
- {{requirement3}}

Please include:
1. Well-commented code
2. Error handling
3. Best practices for {{framework}}
4. Unit tests if applicable

Context: {{context}}`,
                variables: ['language', 'requirements', 'requirement1', 'requirement2', 'requirement3', 'framework', 'context'],
                taskType: 'code_generation',
                tags: ['generation', 'requirements', 'implementation'],
                isPublic: true,
                createdBy: 'system',
                usageCount: 0,
                rating: 4.9
            }
        ];
        builtInTemplates.forEach(template => {
            this.promptTemplates.set(template.id, template);
        });
    }
    async selectOptimalModel(request) {
        // Context-aware model selection based on task type and requirements
        const taskSpecialists = Array.from(this.models.values())
            .filter(model => model.specialties.includes(request.taskType))
            .sort((a, b) => {
            // Sort by specialty match and cost efficiency
            const aScore = this.calculateModelScore(a, request);
            const bScore = this.calculateModelScore(b, request);
            return bScore - aScore;
        });
        if (taskSpecialists.length > 0) {
            return taskSpecialists[0].id;
        }
        // Fallback to general-purpose model
        return 'gpt-4-turbo';
    }
    calculateModelScore(model, request) {
        let score = 0;
        // Specialty match bonus
        if (model.specialties.includes(request.taskType)) {
            score += 50;
        }
        // Cost efficiency (lower cost = higher score)
        const avgCost = (model.costPerToken.input + model.costPerToken.output) / 2;
        score += Math.max(0, 100 - (avgCost * 100000));
        // Context size consideration
        const estimatedTokens = request.prompt.length / 4; // Rough estimate
        if (model.maxTokens >= estimatedTokens * 2) {
            score += 20;
        }
        // Provider availability
        if (this.apiKeys.has(model.provider)) {
            score += 30;
        }
        return score;
    }
    async sendRequest(request) {
        const startTime = Date.now();
        // Select optimal model if not specified
        const modelId = request.modelPreference || await this.selectOptimalModel(request);
        const model = this.models.get(modelId);
        if (!model) {
            throw new Error(`Model ${modelId} not found`);
        }
        // Check API key availability
        if (!this.apiKeys.has(model.provider)) {
            throw new Error(`API key not configured for ${model.provider}`);
        }
        try {
            const response = await this.callAIModel(model, request);
            const processingTime = Date.now() - startTime;
            // Update usage statistics
            this.updateUsageStats(model, response, processingTime);
            return {
                id: this.generateId(),
                requestId: request.id,
                modelUsed: modelId,
                response: response.content,
                tokensUsed: response.tokensUsed,
                cost: this.calculateCost(model, response.tokensUsed),
                confidence: response.confidence || 0.9,
                timestamp: new Date(),
                processingTime
            };
        }
        catch (error) {
            console.error('AI request failed:', error);
            throw error;
        }
    }
    async callAIModel(model, request) {
        const apiKey = this.apiKeys.get(model.provider);
        switch (model.provider) {
            case 'openai':
                return this.callOpenAI(model, request, apiKey);
            case 'anthropic':
                return this.callAnthropic(model, request, apiKey);
            case 'google':
                return this.callGoogle(model, request, apiKey);
            case 'local':
                return this.callLocalModel(model, request);
            default:
                throw new Error(`Unsupported provider: ${model.provider}`);
        }
    }
    async callOpenAI(model, request, apiKey) {
        // Simulated OpenAI API call - in real implementation, use actual API
        const messages = [
            { role: 'system', content: this.buildSystemPrompt(request) },
            { role: 'user', content: request.prompt }
        ];
        // Mock response for demonstration
        return {
            content: `[${model.name} Response]\n\nThis is a simulated response for task: ${request.taskType}\n\nPrompt: ${request.prompt.substring(0, 100)}...\n\nThe actual implementation would call the OpenAI API with the configured model and return the real response.`,
            tokensUsed: {
                input: Math.ceil(request.prompt.length / 4),
                output: Math.ceil(200 / 4) // Estimated output tokens
            }
        };
    }
    async callAnthropic(model, request, apiKey) {
        // Mock Anthropic API call
        return {
            content: `[${model.name} Response]\n\nThis is a simulated Anthropic response for task: ${request.taskType}\n\nThe actual implementation would use the Anthropic SDK to make the API call.`,
            tokensUsed: {
                input: Math.ceil(request.prompt.length / 4),
                output: Math.ceil(180 / 4)
            }
        };
    }
    async callGoogle(model, request, apiKey) {
        // Mock Google API call
        return {
            content: `[${model.name} Response]\n\nThis is a simulated Google Gemini response for task: ${request.taskType}\n\nThe actual implementation would use the Google AI SDK.`,
            tokensUsed: {
                input: Math.ceil(request.prompt.length / 4),
                output: Math.ceil(160 / 4)
            }
        };
    }
    async callLocalModel(model, request) {
        // Mock local model call
        return {
            content: `[${model.name} Local Response]\n\nThis is a simulated local model response for task: ${request.taskType}\n\nThe actual implementation would interface with a local model server.`,
            tokensUsed: {
                input: Math.ceil(request.prompt.length / 4),
                output: Math.ceil(140 / 4)
            }
        };
    }
    buildSystemPrompt(request) {
        let systemPrompt = `You are an expert AI assistant specialized in ${request.taskType}.`;
        if (request.context.language) {
            systemPrompt += ` You are working with ${request.context.language} code.`;
        }
        if (request.context.framework) {
            systemPrompt += ` The project uses ${request.context.framework} framework.`;
        }
        systemPrompt += ' Please provide accurate, helpful, and well-structured responses.';
        return systemPrompt;
    }
    calculateCost(model, tokensUsed) {
        return (tokensUsed.input * model.costPerToken.input) +
            (tokensUsed.output * model.costPerToken.output);
    }
    updateUsageStats(model, response, processingTime) {
        this.usageStats.totalRequests++;
        const cost = this.calculateCost(model, response.tokensUsed);
        this.usageStats.totalCost += cost;
        this.usageStats.budgetUsed += cost;
        // Update cost by model
        if (!this.usageStats.costByModel[model.id]) {
            this.usageStats.costByModel[model.id] = 0;
        }
        this.usageStats.costByModel[model.id] += cost;
        // Update average response time
        this.usageStats.averageResponseTime =
            (this.usageStats.averageResponseTime * (this.usageStats.totalRequests - 1) + processingTime) /
                this.usageStats.totalRequests;
        // Update most used model
        const mostUsedModel = Object.entries(this.usageStats.costByModel)
            .sort(([, a], [, b]) => b - a)[0];
        if (mostUsedModel) {
            this.usageStats.mostUsedModel = mostUsedModel[0];
        }
        // Update daily usage
        const today = new Date().toISOString().split('T')[0];
        if (!this.usageStats.dailyUsage[today]) {
            this.usageStats.dailyUsage[today] = { requests: 0, cost: 0 };
        }
        this.usageStats.dailyUsage[today].requests++;
        this.usageStats.dailyUsage[today].cost += cost;
        this.onUsageUpdatedEmitter.fire(this.usageStats);
    }
    async createConversation(title, teamId) {
        const conversation = {
            id: this.generateId(),
            title,
            messages: [],
            participants: [],
            teamId,
            tags: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isShared: !!teamId,
            modelUsed: [],
            totalCost: 0
        };
        this.conversations.set(conversation.id, conversation);
        return conversation;
    }
    async addMessageToConversation(conversationId, message) {
        const conversation = this.conversations.get(conversationId);
        if (!conversation) {
            throw new Error(`Conversation ${conversationId} not found`);
        }
        conversation.messages.push(message);
        conversation.updatedAt = new Date();
        if (message.cost) {
            conversation.totalCost += message.cost;
        }
        if (message.modelUsed && !conversation.modelUsed.includes(message.modelUsed)) {
            conversation.modelUsed.push(message.modelUsed);
        }
        this.onConversationUpdatedEmitter.fire(conversation);
    }
    async savePromptTemplate(template) {
        this.promptTemplates.set(template.id, template);
        // Save to workspace settings
        const templates = Array.from(this.promptTemplates.values())
            .filter(t => t.createdBy !== 'system');
        const config = vscode.workspace.getConfiguration('autoboot.ai');
        await config.update('customPromptTemplates', templates, vscode.ConfigurationTarget.Workspace);
    }
    async configureAPIKey(provider, apiKey) {
        await this.context.secrets.store(`${provider}-api-key`, apiKey);
        this.apiKeys.set(provider, apiKey);
    }
    getAvailableModels() {
        return Array.from(this.models.values())
            .filter(model => this.apiKeys.has(model.provider) || model.provider === 'local');
    }
    getPromptTemplates(taskType) {
        const templates = Array.from(this.promptTemplates.values());
        return taskType ? templates.filter(t => t.taskType === taskType) : templates;
    }
    getConversations(teamId) {
        const conversations = Array.from(this.conversations.values());
        return teamId ? conversations.filter(c => c.teamId === teamId) : conversations;
    }
    getUsageStats() {
        return { ...this.usageStats };
    }
    async exportConversation(conversationId) {
        const conversation = this.conversations.get(conversationId);
        if (!conversation) {
            throw new Error(`Conversation ${conversationId} not found`);
        }
        return JSON.stringify({
            ...conversation,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        }, null, 2);
    }
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    dispose() {
        this.onConversationUpdatedEmitter.dispose();
        this.onUsageUpdatedEmitter.dispose();
    }
}
exports.AIOrchestrator = AIOrchestrator;
//# sourceMappingURL=aiOrchestrator.js.map