require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const AntigravityCore = require('./antigravity');

// ─── Config ──────────────────────────────────────────────────────────────────
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3001/api/webhooks/whatsapp';
const RECONNECT_DELAY_MS = 8000;

// ─── Boot ─────────────────────────────────────────────────────────────────────
console.log('');
console.log('🌌 ============================================');
console.log('   ANTIGRAVITY BOT — Sierra AI Intelligence  ');
console.log('🌌 ============================================');
console.log('');

const antigravity = new AntigravityCore();

// ─── WhatsApp Client ──────────────────────────────────────────────────────────
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

let isReady = false;

client.on('qr', (qr) => {
    console.log('\n🔐 ─── SCAN QR CODE WITH WHATSAPP ───────────');
    qrcode.generate(qr, { small: true });
    console.log('────────────────────────────────────────────\n');
});

client.on('loading_screen', (percent) => {
    process.stdout.write(`\r⏳ Loading WhatsApp... ${percent}%   `);
});

client.on('authenticated', () => {
    console.log('\n🔑 Authenticated successfully.');
});

client.on('auth_failure', (msg) => {
    console.error('\n❌ Authentication failed:', msg);
    console.error('   Delete the .wwebjs_auth folder and restart to re-scan QR.');
});

client.on('ready', () => {
    isReady = true;
    console.log('\n✅ Antigravity Bot: Online & Ready');
    console.log('🤖 Loaded agents:', antigravity.getAgentNames().join(' | '));
    console.log('📡 Webhook:', WEBHOOK_URL);
    console.log('');
});

client.on('disconnected', (reason) => {
    isReady = false;
    console.warn(`\n⚠️  Disconnected (${reason}). Reconnecting in ${RECONNECT_DELAY_MS / 1000}s...`);
    setTimeout(async () => {
        try {
            await client.initialize();
        } catch (e) {
            console.error('Reconnect failed:', e.message);
        }
    }, RECONNECT_DELAY_MS);
});

// ─── Message Handler ──────────────────────────────────────────────────────────
client.on('message', async (msg) => {
    // Skip status broadcasts and empty messages
    if (msg.isStatus || !msg.body) return;

    const chat = await msg.getChat();
    const isGroup = chat.isGroup;
    const groupName = isGroup ? chat.name : 'Direct Message';
    const senderId = msg.author || msg.from;

    log(`[${groupName}] ${senderId}: ${msg.body.slice(0, 80)}`);

    // Non-blocking webhook forward
    forwardToWebhook(msg, groupName, isGroup);

    const body = msg.body.trim();

    if (body.startsWith('!')) {
        await handleCommand(msg, chat, isGroup, body);
    } else if (!isGroup) {
        // In DMs — always respond with AI
        await handleAIMessage(msg, 'general');
    }
    // In groups, only respond to explicit commands (reduces noise)
});

// ─── Command Router ───────────────────────────────────────────────────────────
async function handleCommand(msg, chat, isGroup, body) {
    const spaceIdx = body.indexOf(' ');
    const cmd = (spaceIdx === -1 ? body : body.slice(0, spaceIdx)).toLowerCase();
    const input = spaceIdx === -1 ? '' : body.slice(spaceIdx + 1).trim();

    try {
        switch (cmd) {
            case '!status':
                await msg.reply(
                    `🌌 *Antigravity Bot — Status*\n\n` +
                    `• Bot: ✅ Online\n` +
                    `• AI Engine: ${antigravity.isReady() ? '✅ Ready' : '⚠️ No API key set'}\n` +
                    `• Webhook: ${WEBHOOK_URL}\n` +
                    `• Uptime: ${getUptime()}`
                );
                break;

            case '!help':
                await msg.reply(getHelpText());
                break;

            case '!agents':
                await msg.reply(
                    `🤖 *Active Agents:*\n\n${antigravity.getAgentList()}`
                );
                break;

            case '!ask':
                if (!input) return msg.reply('Usage: `!ask <your question>`');
                await msg.reply('🤔 Thinking...');
                await handleAIMessage(msg, 'general', input);
                break;

            case '!code':
                if (!input) return msg.reply('Usage: `!code <your coding question or paste code>`');
                await msg.reply('💻 Code agent analyzing...');
                await handleAIMessage(msg, 'code', input);
                break;

            case '!fix':
                if (!input) return msg.reply('Usage: `!fix <describe the error or paste it>`');
                await msg.reply('🔧 Issue agent diagnosing...');
                await handleAIMessage(msg, 'issue', input);
                break;

            case '!workflow':
                if (!input) return msg.reply('Usage: `!workflow <describe your task or process>`');
                await msg.reply('⚙️ Workflow agent planning...');
                await handleAIMessage(msg, 'workflow', input);
                break;

            case '!clear':
                antigravity.clearContext(msg.from);
                await msg.reply('🗑️ Conversation context cleared.');
                break;

            default:
                await msg.reply(`❓ Unknown command \`${cmd}\`.\nType *!help* for the full command list.`);
        }
    } catch (err) {
        console.error(`Command ${cmd} error:`, err.message);
        await msg.reply('❌ An internal error occurred. Please try again.');
    }
}

// ─── AI Message Handler ───────────────────────────────────────────────────────
async function handleAIMessage(msg, agentType = 'general', overrideText = null) {
    const userText = overrideText || msg.body;
    try {
        const reply = await antigravity.runAgent(agentType, userText, msg.from);
        await msg.reply(reply);
    } catch (err) {
        console.error('AI handler error:', err.message);
        await msg.reply('❌ AI error. Please try again or check your API key.');
    }
}

// ─── Webhook Forward ──────────────────────────────────────────────────────────
async function forwardToWebhook(msg, groupName, isGroup) {
    try {
        await axios.post(WEBHOOK_URL, {
            from: msg.from,
            Body: msg.body,
            groupName,
            isGroup,
            timestamp: msg.timestamp
        }, { timeout: 6000 });
        log('📡 Forwarded to webhook');
    } catch (err) {
        log(`⚠️  Webhook failed: ${err.message}`);
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const startTime = Date.now();

function getUptime() {
    const s = Math.floor((Date.now() - startTime) / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
}

function log(msg) {
    console.log(`[${new Date().toISOString()}] ${msg}`);
}

function getHelpText() {
    return (
        `🌌 *Antigravity Bot — Command Guide*\n\n` +
        `*🤖 AI Agents:*\n` +
        `• !ask <question> — General AI assistant\n` +
        `• !code <question> — Code helper & explainer\n` +
        `• !fix <error/issue> — Debug & fix issues\n` +
        `• !workflow <task> — Plan workflows & automations\n\n` +
        `*⚙️ System:*\n` +
        `• !status — Show bot health & uptime\n` +
        `• !agents — List loaded agents\n` +
        `• !clear — Clear your conversation memory\n` +
        `• !help — Show this menu\n\n` +
        `_In DMs, just chat freely — no commands needed._\n` +
        `_Powered by Antigravity Core + Groq AI (Free)_`
    );
}

// ─── Launch ───────────────────────────────────────────────────────────────────
client.initialize();
