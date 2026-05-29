/**
 * Antigravity Core — Multi-Agent AI Orchestration Engine
 * Sierra AI Intelligence System
 *
 * Free AI powered by Groq (https://console.groq.com — free tier)
 * Models available: llama3-8b-8192, llama3-70b-8192, mixtral-8x7b-32768
 */

const Groq = require('groq-sdk');

// ─── Agent Definitions ────────────────────────────────────────────────────────
const AGENTS = {
    general: {
        name: 'AntigravityAI',
        emoji: '🌌',
        model: 'llama3-8b-8192',
        systemPrompt: `You are AntigravityAI, a powerful assistant integrated into WhatsApp for Sierra AI Intelligence.
You are helpful, smart, and concise. You can answer any question, assist with any task.
Format responses for WhatsApp — use *bold*, _italic_, line breaks, and bullet points.
Keep answers focused and clear. If asked about capabilities, mention the commands: !code, !fix, !workflow.`
    },

    code: {
        name: 'CodeAgent',
        emoji: '💻',
        model: 'llama3-70b-8192',
        systemPrompt: `You are CodeAgent, an elite programming assistant inside Sierra AI's Antigravity system.
Your expertise covers:
- Writing code in any language (JS, Python, TypeScript, Rust, Go, SQL, bash, etc.)
- Explaining code clearly and teaching concepts
- Code reviews, refactoring, and best practices
- Architecture decisions and design patterns
- Performance and security optimization
- API integrations and automation scripts

Always provide working, production-ready code examples.
Format code with triple backticks and the language name.
Be precise — if something is unclear, ask one targeted clarifying question.`
    },

    issue: {
        name: 'IssueAgent',
        emoji: '🔧',
        model: 'llama3-70b-8192',
        systemPrompt: `You are IssueAgent, an expert debugger and problem-solver inside Sierra AI's Antigravity system.
Your expertise covers:
- Diagnosing bugs, errors, and crashes from error messages or code
- Step-by-step fix instructions
- Root cause analysis
- Security vulnerabilities (OWASP, common exploits)
- Dependency and version conflicts
- Performance bottlenecks
- Environment and configuration issues

Be systematic: state the likely cause first, then provide the fix.
For code errors, always show the corrected version.
Ask for error logs or code snippets if needed.`
    },

    workflow: {
        name: 'WorkflowAgent',
        emoji: '⚙️',
        model: 'llama3-8b-8192',
        systemPrompt: `You are WorkflowAgent, an expert in productivity, automation, and systems design inside Sierra AI's Antigravity system.
Your expertise covers:
- Breaking complex projects into actionable steps
- Automation scripts and task pipelines
- Free API integrations (Groq, HuggingFace, OpenRouter, Make.com, n8n, Zapier)
- Workflow tools: GitHub Actions, cron jobs, webhooks
- Project planning, sprint breakdowns, and prioritization
- Shell scripts, batch automation, and CI/CD pipelines

Always provide numbered action plans.
Recommend free tools first before paid ones.
Give concrete examples and commands — not vague advice.`
    }
};

// ─── AntigravityCore Class ────────────────────────────────────────────────────
class AntigravityCore {
    constructor() {
        this.apiKey = process.env.GROQ_API_KEY || '';
        this.contexts = new Map(); // userId -> message history
        this.MAX_CONTEXT_MESSAGES = 20; // ~10 exchanges per user

        if (!this.apiKey) {
            console.warn('');
            console.warn('⚠️  ──────────────────────────────────────────────');
            console.warn('   GROQ_API_KEY is not set in your .env file.');
            console.warn('   AI agents will alert users but won\'t respond.');
            console.warn('   Get your FREE key at: https://console.groq.com');
            console.warn('⚠️  ──────────────────────────────────────────────');
            console.warn('');
            this.groq = null;
        } else {
            this.groq = new Groq({ apiKey: this.apiKey });
            console.log('🌌 Antigravity Core initialized — Groq AI Ready');
        }
    }

    // ── Public: run an agent ──────────────────────────────────────────────────
    async runAgent(agentType, userMessage, userId) {
        const agent = AGENTS[agentType] || AGENTS.general;

        if (!this.groq) {
            return (
                `${agent.emoji} *${agent.name}* is not configured yet.\n\n` +
                `To activate AI agents:\n` +
                `1. Get a *free* Groq API key at https://console.groq.com\n` +
                `2. Create a \`.env\` file in the bot folder\n` +
                `3. Add: \`GROQ_API_KEY=your_key_here\`\n` +
                `4. Restart the bot\n\n` +
                `_Groq is 100% free for the rate limits most bots need._`
            );
        }

        // Build conversation
        this._addMessage(userId, 'user', userMessage);

        try {
            const completion = await this.groq.chat.completions.create({
                model: agent.model,
                messages: [
                    { role: 'system', content: agent.systemPrompt },
                    ...this._getContext(userId)
                ],
                max_tokens: 1500,
                temperature: 0.65,
                top_p: 0.9
            });

            const reply = completion.choices[0]?.message?.content;

            if (!reply) throw new Error('Empty response from AI model');

            this._addMessage(userId, 'assistant', reply);

            return `${agent.emoji} *${agent.name}:*\n\n${reply}`;

        } catch (err) {
            // Remove the failed user message from context
            this._popLastMessage(userId);

            console.error(`[${agent.name}] API error:`, err.message);

            if (err.status === 401) {
                return `❌ Invalid Groq API key. Double-check your \`.env\` file and restart.`;
            }
            if (err.status === 429) {
                return `⏳ *Rate limit reached.* Please wait 30 seconds and try again.\n_Groq free tier: 30 req/min, 14,400 req/day._`;
            }
            if (err.status === 503 || err.code === 'ECONNREFUSED') {
                return `🔴 Groq service is temporarily unreachable. Retry in a moment.`;
            }

            return `❌ ${agent.emoji} *${agent.name}* encountered an error:\n\`${err.message}\``;
        }
    }

    // ── Public: clear a user's conversation context ───────────────────────────
    clearContext(userId) {
        this.contexts.delete(userId);
    }

    // ── Public: check if AI is configured ────────────────────────────────────
    isReady() {
        return this.groq !== null;
    }

    // ── Public: list agent names ──────────────────────────────────────────────
    getAgentNames() {
        return Object.values(AGENTS).map(a => a.name);
    }

    // ── Public: formatted agent list ─────────────────────────────────────────
    getAgentList() {
        return Object.values(AGENTS)
            .map(a => `${a.emoji} *${a.name}* — ${this._agentDescription(a.name)}`)
            .join('\n');
    }

    // ── Private helpers ───────────────────────────────────────────────────────
    _getContext(userId) {
        return this.contexts.get(userId) || [];
    }

    _addMessage(userId, role, content) {
        if (!this.contexts.has(userId)) {
            this.contexts.set(userId, []);
        }
        const ctx = this.contexts.get(userId);
        ctx.push({ role, content });

        // Trim oldest pairs when over limit
        while (ctx.length > this.MAX_CONTEXT_MESSAGES) {
            ctx.splice(0, 2);
        }
    }

    _popLastMessage(userId) {
        const ctx = this.contexts.get(userId);
        if (ctx && ctx.length > 0) ctx.pop();
    }

    _agentDescription(name) {
        const map = {
            AntigravityAI: 'General assistant',
            CodeAgent: 'Coding & scripts',
            IssueAgent: 'Debug & fix errors',
            WorkflowAgent: 'Automation & planning'
        };
        return map[name] || 'AI agent';
    }
}

module.exports = AntigravityCore;
