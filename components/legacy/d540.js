require('dotenv').config();

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { google } = require('googleapis');

// ── Decoupled Architecture ───────────────────────────────────────────────────
// The scraper NEVER calls the Sierra AI website directly.
// All messages go into Google Sheets (buffer/queue).
// The main system polls the sheet every 5 minutes via cron.
// This way: if the scraper crashes → website is unaffected.
//           if the website is down  → scraper keeps collecting.

const SPREADSHEET_ID = process.env.SHEETS_SPREADSHEET_ID;
const SHEET_TAB      = 'raw_messages';
const HEARTBEAT_MS   = parseInt(process.env.HEARTBEAT_INTERVAL_MS || '60000', 10);

if (!SPREADSHEET_ID) {
    console.error('❌ SHEETS_SPREADSHEET_ID is not set in .env — messages cannot be queued.');
    process.exit(1);
}

console.log('🔷 Sierra AI Intelligence Bot — Initializing (Sheets-buffered mode)...');
console.log(`   Queue    : Google Sheets → ${SPREADSHEET_ID}`);
console.log(`   Tab      : ${SHEET_TAB}`);
console.log(`   Heartbeat: every ${HEARTBEAT_MS / 1000}s\n`);

// ── Google Sheets auth ───────────────────────────────────────────────────────
function getSheetsClient() {
    const keyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!keyRaw) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY not set in .env');
    const credentials = JSON.parse(keyRaw);
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return google.sheets({ version: 'v4', auth });
}

// ── Append message row to Sheets ─────────────────────────────────────────────
// Columns: A=timestamp | B=from | C=groupName | D=body | E=hasMedia | F=status
async function appendToSheet(payload) {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_TAB}!A:F`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[
                new Date().toISOString(),
                payload.from       || '',
                payload.groupName  || '',
                payload.Body       || '',
                payload.media ? 'true' : 'false',
                'PENDING',
            ]],
        },
    });
}

// ── Heartbeat — logs locally only (no website call) ─────────────────────────
async function sendHeartbeat() {
    console.log(`💓 Heartbeat [${new Date().toISOString()}] — bot alive, writing to Sheets`);
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
        msg.reply('🤖 Sierra AI Intelligence Bot: Online — buffering to Google Sheets.');
        return;
    }

    // ── Prepare payload ─────────────────────────────────────────────────────
    const payload = {
        from:      msg.from,
        Body:      msg.body || '',
        groupName,
        timestamp: msg.timestamp,
    };

    // Flag if message has media (base64 not stored in Sheets — too large)
    if (msg.hasMedia) {
        payload.media = true;
        console.log(`   Media : detected (flagged in sheet, not stored)`);
    }

    // Skip if there's nothing to process
    if (!payload.Body && !payload.media) {
        console.log('   ⏭  Skipped (no text or image)');
        return;
    }

    // ── Write to Google Sheets buffer ────────────────────────────────────────
    // The main Sierra AI system polls this sheet every 5 minutes via cron.
    // The scraper has ZERO direct connection to the website.
    try {
        await appendToSheet(payload);
        console.log(`   ✅ Queued in Sheets — will be processed by next cron run`);
    } catch (err) {
        console.error(`   ❌ Failed to write to Sheets:`, err.message);
    }
});

client.initialize();
