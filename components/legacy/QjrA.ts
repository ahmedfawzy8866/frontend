import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/server/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { COLLECTIONS } from '@/lib/models/schema';
import { processAgentCommand } from '@/lib/services/antigravity-agent';
import { handleTelegramCommand, sendTelegramMessage } from '@/lib/services/telegram-controller';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

async function sendTyping(chatId: number) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendChatAction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, action: 'typing' })
  }).catch(() => {});
}

async function replyHTML(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
  });
}

// ─── Main Webhook ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message || body?.edited_message;

    // Ignore non-text updates (stickers, polls, voice notes etc.)
    if (!message?.text) return NextResponse.json({ ok: true });

    const chatId: number = message.chat.id;
    const text: string = message.text.trim();
    const chatIdStr = String(chatId);

    // Parse slash command vs free text
    const isCommand = text.startsWith('/');
    const parts = isCommand ? text.slice(1).split(/\s+/) : [];
    const command = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1);

    // ── Slash Commands ─────────────────────────────────────────────────────────
    if (isCommand) {
      switch (command) {

        case 'start': {
          await replyHTML(chatId, [
            '<b>🌌 Sierra AI Intelligence Platform</b>',
            '',
            `Your Chat ID: <code>${chatId}</code>`,
            '',
            '<b>📊 Data Commands:</b>',
            '/stats — Portfolio performance overview',
            '/leads — Latest 5 stakeholder leads',
            '/listings — Latest 5 property listings',
            '/score [id] — Score &amp; analyze a listing',
            '/matches [id] — Find stakeholders matched to a property',
            '/approve [id] — Approve &amp; resume a stakeholder pipeline',
            '/maintenance — Run portfolio hygiene audit',
            '',
            '<b>🤖 AI Commands:</b>',
            '/ag [order] — Give a natural language order to Antigravity AI',
            '/help — Show this menu',
            '',
            '<i>Or just send me any message — I\'ll respond as your AI concierge.</i>'
          ].join('\n'));
          break;
        }

        case 'help': {
          await replyHTML(chatId, [
            '<b>📖 Full Command Reference</b>',
            '',
            '/stats — Live portfolio stats',
            '/leads — Last 5 leads (name, phone, budget, stage)',
            '/listings — Last 5 active listings',
            '/score [unitId] — Legal + ROI analysis',
            '/matches [unitId] — Leads matched to that unit',
            '/approve [leadId] — Approve pipeline &amp; deploy gallery',
            '/maintenance — Flag stale listings',
            '/ag [text] — Natural language AI (Antigravity)',
            '/start /help — Show menus'
          ].join('\n'));
          break;
        }

        case 'stats': {
          const [unitsSnap, leadsSnap, salesSnap] = await Promise.all([
            adminDb.collection(COLLECTIONS.units).count().get(),
            adminDb.collection(COLLECTIONS.leads).count().get(),
            adminDb.collection(COLLECTIONS.sales).count().get()
          ]);
          await replyHTML(chatId, [
            '<b>📊 Sierra AI — Live Portfolio Stats</b>',
            '',
            `🏢 <b>Inventory:</b> ${unitsSnap.data().count} units`,
            `👤 <b>Stakeholders:</b> ${leadsSnap.data().count} profiles`,
            `✅ <b>Closed Sales:</b> ${salesSnap.data().count} transactions`,
            '⚡ <b>System Status:</b> OPERATIONAL',
            '',
            `<i>Last updated: ${new Date().toLocaleString('en-GB')}</i>`
          ].join('\n'));
          break;
        }

        case 'leads': {
          const snap = await adminDb.collection(COLLECTIONS.leads)
            .orderBy('createdAt', 'desc').limit(5).get();
          if (snap.empty) { await replyHTML(chatId, '📭 No leads found yet.'); break; }
          const lines = ['<b>👥 Latest 5 Stakeholders:</b>', ''];
          snap.forEach(d => {
            const l = d.data();
            const date = l.createdAt?.toDate?.()?.toLocaleDateString('en-GB') || 'N/A';
            lines.push(
              `👤 <b>${l.name || 'Unknown'}</b>`,
              `📱 ${l.phone || 'N/A'} | 📅 ${date}`,
              `💰 Budget: ${l.budget || 'N/A'} | 🔄 Stage: ${l.orchestrationState?.stage || 'S1'}`,
              ''
            );
          });
          await replyHTML(chatId, lines.join('\n').trim());
          break;
        }

        case 'listings': {
          const snap = await adminDb.collection(COLLECTIONS.units)
            .orderBy('createdAt', 'desc').limit(5).get();
          if (snap.empty) { await replyHTML(chatId, '📭 No listings found yet.'); break; }
          const lines = ['<b>🏢 Latest 5 Listings:</b>', ''];
          snap.forEach(d => {
            const u = d.data();
            lines.push(
              `🏠 <b>${u.title || u.code || 'Untitled'}</b>`,
              `💰 EGP ${u.price?.toLocaleString() || 'N/A'} | 📍 ${u.location || 'N/A'}`,
              `🔄 ${u.status?.toUpperCase() || 'ACTIVE'}`,
              ''
            );
          });
          await replyHTML(chatId, lines.join('\n').trim());
          break;
        }

        // Delegate to telegram-controller for complex commands
        case 'score':
        case 'matches':
        case 'approve':
        case 'maintenance': {
          await sendTyping(chatId);
          await handleTelegramCommand(command, args, chatIdStr);
          break;
        }

        // Natural language AI order via Antigravity
        case 'ag': {
          const order = args.join(' ').trim();
          await sendTyping(chatId);
          const result = await processAgentCommand(
            chatId,
            order || 'Hello — what can you help me with today?'
          );
          await replyHTML(chatId, result.message);
          break;
        }

        default: {
          await replyHTML(chatId, `❓ Unknown command <code>/${command}</code>.\nSend /help to see all available commands.`);
        }
      }

    } else {
      // ── Free-text: route to Antigravity Agent (admin OR Leila concierge) ────
      await sendTyping(chatId);
      const result = await processAgentCommand(chatId, text);
      await replyHTML(chatId, result.message);
    }

    // Non-blocking audit log
    adminDb.collection('telegram_logs').add({
      chatId,
      text,
      isCommand,
      ts: FieldValue.serverTimestamp()
    }).catch(() => {});

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    // Always return 200 to Telegram — prevents Telegram retry storm
    console.error('[Telegram Webhook] Fatal error:', error?.message || error);
    return NextResponse.json({ ok: true });
  }
}

