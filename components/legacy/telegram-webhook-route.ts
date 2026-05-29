/**
 * SIERRA — TELEGRAM BOT WEBHOOK
 * ─────────────────────────────────────────────────────────────────────
 * الملف ده يروح في:
 * H:\Sierra AIe SaaS Program Locally V2\my-app\app\api\telegram\webhook\route.ts
 * ─────────────────────────────────────────────────────────────────────
 *
 * شخصيتان في نفس البوت على نفس التوكن:
 *   - وضع العميل  → "سييرا" — بتتكلم بالعربي، بتسأل بـ dropdown، بتجيب وحدات
 *   - وضع الأدمن  → "سييرا أدمن" — لأحمد فوزي، بتبعتله ملخصات وتقارير
 *
 * التوكن الجديد: 8719045454:AAHSafZe5U_JzPGb9AAxeNJPwYSPkkwwddQ
 * ─────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection, query, where, getDocs, limit,
  doc, setDoc, updateDoc, serverTimestamp, orderBy,
} from 'firebase/firestore';
import { COLLECTIONS } from '@/lib/models/schema';

// ─── إعدادات ثابتة ───────────────────────────────────────────────────

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const ADMIN_ID  = Number(process.env.TELEGRAM_CHAT_ID || '7175892124');

// مراحل الـ dropdown بالعربي — العميل بيختار من دول
const REQUEST_STEPS = [
  {
    key: 'type',
    question: 'أهلاً! أنا سييرا 👋\nمساعدك الذكي في سييرا بلو\n\nحضرتك عايز/ة إيه؟',
    options: ['شراء وحدة', 'إيجار وحدة', 'استثمار عقاري', 'إعادة بيع'],
  },
  {
    key: 'compound',
    question: 'ممتاز! ايه المنطقة المفضلة؟',
    options: ['ميفيدا', 'ديستريكت 5', 'بالم هيلز', 'فيليت', 'IL Bosco', 'هايد بارك', 'أي مكان في القاهرة الجديدة'],
  },
  {
    key: 'bedrooms',
    question: 'كم غرفة نوم تفضل/ي؟',
    options: ['استوديو', '1 غرفة', '2 غرف', '3 غرف', '4 غرف', '5 غرف أو أكتر'],
  },
  {
    key: 'budget',
    question: 'ما هو النطاق السعري المناسب؟ (بالجنيه المصري)',
    options: [
      'أقل من 3 مليون',
      '3 — 7 مليون',
      '7 — 15 مليون',
      '15 — 30 مليون',
      'أكتر من 30 مليون',
    ],
  },
  {
    key: 'timeline',
    question: 'متى تريد/ين الانتقال؟',
    options: ['فوري (خلال شهر)', '1 — 3 أشهر', '3 — 6 أشهر', 'أكتر من 6 أشهر'],
  },
  {
    key: 'phone',
    question: 'ممتاز! أخيراً، ما هو رقم التواصل معك؟\n(اكتب الرقم وهنتواصل معك في أقرب وقت)',
    options: [], // مش dropdown — العميل بيكتب يدوي
  },
];

// ─── Telegram API helpers ─────────────────────────────────────────────

async function sendMessage(chatId: number, text: string, keyboard?: object) {
  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
  };
  if (keyboard) body.reply_markup = keyboard;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function sendTyping(chatId: number) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendChatAction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
  });
}

// بيبني inline keyboard من قائمة خيارات
function buildKeyboard(options: string[]) {
  if (!options.length) return undefined;
  // صفّ واحد لكل خيار عشان يبان واضح على الموبايل
  return {
    inline_keyboard: options.map((opt) => [{ text: opt, callback_data: opt }]),
  };
}

// ─── Session helpers (Firestore) ─────────────────────────────────────

async function getSession(chatId: number) {
  const q = query(
    collection(db, 'telegram_sessions'),
    where('chatId', '==', chatId),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as any;
}

async function saveSession(chatId: number, data: Record<string, any>) {
  const ref = doc(collection(db, 'telegram_sessions'), String(chatId));
  await setDoc(ref, { chatId, ...data, updatedAt: serverTimestamp() }, { merge: true });
}

async function clearSession(chatId: number) {
  const ref = doc(collection(db, 'telegram_sessions'), String(chatId));
  await setDoc(ref, { chatId, step: 0, answers: {}, updatedAt: serverTimestamp() });
}

// ─── جيب وحدات مناسبة من Firestore ──────────────────────────────────

async function findMatchingUnits(answers: Record<string, string>) {
  try {
    // استعلام بسيط — في المرحلة دي بنجيب ٣ وحدات مناسبة للكمباوند والغرف
    const compound = answers.compound === 'أي مكان في القاهرة الجديدة' ? null : answers.compound;

    let q = query(
      collection(db, COLLECTIONS.units),
      where('status', '==', 'available'),
      limit(3)
    );

    if (compound) {
      q = query(
        collection(db, COLLECTIONS.units),
        where('status', '==', 'available'),
        where('compound', '==', compound),
        limit(3)
      );
    }

    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as any));
  } catch {
    return [];
  }
}

// ─── بناء رسالة الملخص اللي بتروح لأحمد فوزي ───────────────────────

function buildAdminSummary(session: any, units: any[]) {
  const a = session.answers || {};
  const unitLines = units.length
    ? units.map((u) => `  • ${u.title || 'وحدة'} — ${u.compound} — EGP ${Number(u.price || 0).toLocaleString()}`).join('\n')
    : '  • لم يتم إيجاد وحدات مطابقة حالياً';

  return `
<b>🔔 طلب جديد من سييرا بوت</b>

<b>نوع الطلب:</b> ${a.type || '—'}
<b>المنطقة:</b> ${a.compound || '—'}
<b>الغرف:</b> ${a.bedrooms || '—'}
<b>الميزانية:</b> ${a.budget || '—'}
<b>الوقت:</b> ${a.timeline || '—'}
<b>الهاتف:</b> <code>${a.phone || '—'}</code>

<b>الوحدات المقترحة:</b>
${unitLines}

<b>🕐 الوقت:</b> ${new Date().toLocaleString('ar-EG')}
`.trim();
}

// ─── وضع الأدمن — أوامر أحمد فوزي ───────────────────────────────────

async function handleAdminMode(chatId: number, text: string) {
  await sendTyping(chatId);

  if (text === '/start') {
    await sendMessage(chatId, `
<b>سييرا — لوحة التحكم</b>

الأوامر المتاحة:
/stats — إحصائيات المحفظة
/leads — آخر ٥ عملاء
/listings — آخر ٥ وحدات
/pending — الطلبات المنتظرة
    `);
    return;
  }

  if (text === '/stats') {
    const listingsSnap = await getDocs(collection(db, COLLECTIONS.units));
    const leadsSnap    = await getDocs(collection(db, COLLECTIONS.stakeholders));
    await sendMessage(chatId, `
<b>📊 إحصائيات سييرا بلو</b>
<b>الوحدات:</b> ${listingsSnap.size}
<b>العملاء:</b> ${leadsSnap.size}
<b>الحالة:</b> ✅ كل الأنظمة تعمل
    `);
    return;
  }

  if (text === '/leads') {
    const q = query(
      collection(db, COLLECTIONS.stakeholders),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const snap = await getDocs(q);
    if (snap.empty) { await sendMessage(chatId, 'لا يوجد عملاء حتى الآن.'); return; }
    let msg = '<b>آخر ٥ عملاء:</b>\n\n';
    snap.forEach((d) => {
      const data = d.data();
      msg += `👤 ${data.name || 'غير معروف'} — ${data.phone || '—'}\n📍 ${data.intelligence?.profile?.location || '—'}\n💰 ${data.intelligence?.profile?.budget || '—'}\n—\n`;
    });
    await sendMessage(chatId, msg);
    return;
  }

  if (text === '/listings') {
    const q = query(
      collection(db, COLLECTIONS.units),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const snap = await getDocs(q);
    if (snap.empty) { await sendMessage(chatId, 'لا توجد وحدات حتى الآن.'); return; }
    let msg = '<b>آخر ٥ وحدات:</b>\n\n';
    snap.forEach((d) => {
      const data = d.data();
      msg += `🏢 ${data.title || 'وحدة'}\n📍 ${data.compound || '—'} — EGP ${Number(data.price || 0).toLocaleString()}\n—\n`;
    });
    await sendMessage(chatId, msg);
    return;
  }

  if (text === '/pending') {
    const q = query(
      collection(db, 'telegram_sessions'),
      where('completed', '==', false),
      orderBy('updatedAt', 'desc'),
      limit(10)
    );
    const snap = await getDocs(q);
    if (snap.empty) { await sendMessage(chatId, 'لا توجد طلبات منتظرة.'); return; }
    let msg = '<b>الطلبات المنتظرة:</b>\n\n';
    snap.forEach((d) => {
      const data = d.data();
      const a = data.answers || {};
      msg += `• ${a.type || '—'} | ${a.compound || '—'} | ${a.phone || 'بدون رقم'}\n`;
    });
    await sendMessage(chatId, msg);
    return;
  }

  // أمر عام — سييرا تجاوب بالذكاء الاصطناعي عبر OpenClaw
  try {
    const res = await fetch(`${process.env.OPENCLAW_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENCLAW_TOKEN}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `أنت سييرا، المساعدة الذكية لسييرا بلو العقارية. تجاوب باحترافية وإيجاز.`,
          },
          { role: 'user', content: text },
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || 'سييرا غير متاحة حالياً.';
    await sendMessage(chatId, reply);
  } catch {
    await sendMessage(chatId, '⚠️ سييرا غير متاحة حالياً. حاول مرة أخرى.');
  }
}

// ─── وضع العميل — dropdown flow ──────────────────────────────────────

async function handleClientMode(chatId: number, text: string) {
  let session = await getSession(chatId);

  // بداية جديدة
  if (!session || text === '/start') {
    await clearSession(chatId);
    const step = REQUEST_STEPS[0];
    await sendMessage(chatId, step.question, buildKeyboard(step.options));
    await saveSession(chatId, { step: 0, answers: {}, completed: false });
    return;
  }

  const currentStep = session.step ?? 0;
  const stepDef     = REQUEST_STEPS[currentStep];
  const answers     = session.answers || {};

  // حفظ الإجابة الحالية
  answers[stepDef.key] = text;
  await saveSession(chatId, { answers });

  const nextStep = currentStep + 1;

  // لو خلصنا كل الأسئلة
  if (nextStep >= REQUEST_STEPS.length) {
    await sendTyping(chatId);

    // جيب وحدات مناسبة
    const units = await findMatchingUnits(answers);

    // رسالة للعميل
    let clientMsg = `✅ <b>شكراً يا ${answers.phone ? 'حضرتك' : 'صديقي'}!</b>\n\nاستلمنا طلبك وهيتواصل معك مستشارنا في أقرب وقت.\n\n`;
    if (units.length) {
      clientMsg += '<b>بعض الوحدات المقترحة:</b>\n';
      units.forEach((u) => {
        clientMsg += `• ${u.title || 'وحدة'} — ${u.compound} — EGP ${Number(u.price || 0).toLocaleString()}\n`;
      });
    }
    clientMsg += '\n<i>سييرا — سييرا بلو العقارية 🏡</i>';
    await sendMessage(chatId, clientMsg);

    // بعت الملخص لأحمد فوزي
    const adminSummary = buildAdminSummary({ answers }, units);
    await sendMessage(ADMIN_ID, adminSummary);

    // احفظ في Firestore كـ lead جديد
    try {
      const leadRef = doc(collection(db, COLLECTIONS.stakeholders));
      await setDoc(leadRef, {
        name: `تيليجرام-${chatId}`,
        phone: answers.phone || `TG:${chatId}`,
        stage: 'lead',
        source: 'whatsapp',
        intelligence: { profile: answers },
        automation: { botInitiated: true, telegramId: chatId },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch { /* غير حرج */ }

    // mark session as done
    await saveSession(chatId, { step: nextStep, completed: true });
    return;
  }

  // الخطوة الجاية
  const nextDef = REQUEST_STEPS[nextStep];
  await saveSession(chatId, { step: nextStep });
  await sendMessage(chatId, nextDef.question, buildKeyboard(nextDef.options));
}

// ─── نقطة الدخول الرئيسية ────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // رسالة نصية عادية
    if (body.message) {
      const { chat, text } = body.message;
      if (!text) return NextResponse.json({ ok: true });

      if (chat.id === ADMIN_ID) {
        await handleAdminMode(chat.id, text);
      } else {
        await handleClientMode(chat.id, text);
      }
    }

    // callback من inline keyboard (لما العميل يضغط على خيار)
    if (body.callback_query) {
      const { from, data, id } = body.callback_query;

      // acknowledge the callback
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: id }),
      });

      if (from.id === ADMIN_ID) {
        await handleAdminMode(from.id, data);
      } else {
        await handleClientMode(from.id, data);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Sierra Bot] Error:', err);
    return NextResponse.json({ ok: true }); // دايماً 200 لتيليجرام
  }
}
