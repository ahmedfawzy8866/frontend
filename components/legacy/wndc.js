require('dotenv').config();

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const WEBHOOK_URL       = process.env.SIERRA_API_URL || 'http://localhost:3000/api/webhooks/whatsapp';
const HEARTBEAT_URL     = WEBHOOK_URL.replace('/webhooks/whatsapp', '/whatsapp/heartbeat');
const HEARTBEAT_MS      = parseInt(process.env.HEARTBEAT_INTERVAL_MS || '60000', 10);
const MAX_RETRIES       = 3;
const RETRY_BASE_MS     = 1500;

console.log('🔷 Sierra AI Intelligence Bot — Initializing...');
console.log(`   Webhook  : ${WEBHOOK_URL}`);
console.log(`   Heartbeat: ${HEARTBEAT_URL} (every ${HEARTBEAT_MS / 1000}s)\n`);

// ── Retry helper ────────────────────────────────────────────────────────────
async function postWithRetry(url, payload, attempt = 1) {
    try {
        const res = await axios.post(url, payload, { timeout: 15000 });
        return res.data;
    } catch (err) {
        if (attempt >= MAX_RETRIES) throw err;
        const delay = RETRY_BASE_MS * Math.pow(2, attempt - 1);
        console.warn(`⚠️  Attempt ${attempt} failed — retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
        return postWithRetry(url, payload, attempt + 1);
    }
}

// ── Heartbeat loop ───────────────────────────────────────────────────────────
async function sendHeartbeat() {
    try {
        await axios.post(HEARTBEAT_URL, {}, { timeout: 5000 });
        console.log(`💓 Heartbeat sent [${new Date().toISOString()}]`);
    } catch (err) {
        console.error('⚠️  Heartbeat failed:', err.message);
    }
}

// ── WhatsApp Client ──────────────────────────────────────────────────────────
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
});

client.on('qr', (qr) => {
    console.log('\n┌─────────────────────────────────────┐');
    console.log('│  SCAN THIS QR CODE WITH WHATSAPP    │');
    console.log('└─────────────────────────────────────┘');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp client ready — Sierra AI is online.\n');
    // Start periodic heartbeat
    sendHeartbeat();
    setInterval(sendHeartbeat, HEARTBEAT_MS);
});

client.on('auth_failure', (msg) => {
    console.error('🔴 Authentication failure:', msg);
});

client.on('disconnected', (reason) => {
    console.warn('🔌 Client disconnected:', reason);
});

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const groupName = chat.isGroup ? chat.name : 'Direct Message';

    console.log(`\n📬 [${new Date().toISOString()}]`);
    console.log(`   From  : ${msg.from} (${groupName})`);
    console.log(`   Body  : ${msg.body?.slice(0, 80) || '(media only)'}`);

    // ── Bot commands ────────────────────────────────────────────────────────
    if (msg.body === '!status') {
        msg.reply('🤖 Sierra AI Intelligence Bot: Online & Syncing.');
        return;
    }
    if (msg.body === '!ping') {
        try {
            const res = await axios.get(WEBHOOK_URL, { timeout: 5000 });
            msg.reply(`🏓 Backend: ${res.data?.status || 'OK'}`);
        } catch {
            msg.reply('❌ Backend unreachable');
        }
        return;
    }

    // ── Prepare payload ─────────────────────────────────────────────────────
    const payload = {
        from:      msg.from,
        Body:      msg.body || '',
        groupName,
        timestamp: msg.timestamp,
    };

    // Attach image as base64 if present (Gemini vision support)
    if (msg.hasMedia) {
        try {
            const media = await msg.downloadMedia();
            if (media && media.mimetype?.startsWith('image/')) {
                payload.media = {
                    data:     media.data,      // base64 string
                    mimeType: media.mimetype,
                };
                console.log(`   Media : ${media.mimetype}`);
            }
        } catch (mediaErr) {
            console.warn('⚠️  Could not download media:', mediaErr.message);
        }
    }

    // Skip if there's nothing to process
    if (!payload.Body && !payload.media) {
        console.log('   ⏭  Skipped (no text or image)');
        return;
    }

    // ── Forward to Sierra AI Intelligence Engine ────────────────────────────
    try {
        const result = await postWithRetry(WEBHOOK_URL, payload);
        console.log(`   ✅ Ingested — ID: ${result?.id || 'N/A'} | isListing: ${result?.ai_confidence ?? result?.isListing ?? '?'}`);
    } catch (err) {
        console.error(`   ❌ Failed after ${MAX_RETRIES} attempts:`, err.message);
    }
});

client.initialize();
