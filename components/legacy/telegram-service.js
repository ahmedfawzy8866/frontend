import { getTelegramConfig, isTelegramEnabled, validateTelegramConfig } from '../config/telegram.js';
import { postJson, requestJson } from '../utils/http-client.js';
import { buildTelegramLeadReply, getLeadSnapshots } from './real-estate-bot.js';
import { sendJson } from './whatsapp-service.js';

const pollingState = {
  isRunning: false,
  offset: 0
};
const recentUpdates = [];

function getTelegramApiUrl(methodName) {
  const { botToken } = getTelegramConfig();
  return `https://api.telegram.org/bot${botToken}/${methodName}`;
}

function normalizeTelegramUpdate(update) {
  const message = update.message || update.edited_message || update.channel_post || null;
  const callbackQuery = update.callback_query || null;
  const effectiveMessage = message || callbackQuery?.message || null;
  const effectiveFrom = message?.from || callbackQuery?.from || null;
  const effectiveChat = effectiveMessage?.chat || null;

  return {
    source: 'telegram',
    receivedAt: new Date().toISOString(),
    updateId: update.update_id,
    chatId: effectiveChat?.id || null,
    chatType: effectiveChat?.type || null,
    messageId: effectiveMessage?.message_id || null,
    fromId: effectiveFrom?.id || null,
    username: effectiveFrom?.username || null,
    firstName: effectiveFrom?.first_name || null,
    text: message?.text || callbackQuery?.data || null,
    raw: update
  };
}

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawText = Buffer.concat(chunks).toString('utf8').trim();

  if (!rawText) {
    return {};
  }

  return JSON.parse(rawText);
}

async function forwardTelegramEvent(eventPayload) {
  const config = getTelegramConfig();

  if (!config.inboundForwardUrl) {
    return null;
  }

  const headers = {};

  if (config.inboundForwardToken) {
    headers.Authorization = `Bearer ${config.inboundForwardToken}`;
  }

  return postJson(config.inboundForwardUrl, eventPayload, { headers, timeoutMs: 10000 });
}

async function processTelegramUpdate(update) {
  const normalizedUpdate = normalizeTelegramUpdate(update);
  recentUpdates.unshift(normalizedUpdate);
  recentUpdates.splice(20);
  await forwardTelegramEvent(normalizedUpdate);
  await maybeAutoReplyToTelegramUpdate(normalizedUpdate);
  return normalizedUpdate;
}

function wait(delayMs) {
  return new Promise(resolve => {
    setTimeout(resolve, delayMs);
  });
}

export async function fetchTelegramBotProfile() {
  validateTelegramConfig({ required: true });

  const response = await requestJson('GET', getTelegramApiUrl('getMe'), null, { timeoutMs: 10000 });

  if (response.statusCode < 200 || response.statusCode >= 300 || !response.body?.ok) {
    throw new Error(`Telegram getMe failed: ${JSON.stringify(response.body)}`);
  }

  return response.body.result;
}

export async function sendTelegramMessage(payload) {
  validateTelegramConfig({ required: true });

  const { chatId, text, parseMode, disableWebPagePreview = true } = payload;

  if (!chatId || !text) {
    throw new Error('Both "chatId" and "text" are required to send a Telegram message.');
  }

  const response = await postJson(
    getTelegramApiUrl('sendMessage'),
    {
      chat_id: chatId,
      text,
      parse_mode: parseMode,
      disable_web_page_preview: Boolean(disableWebPagePreview)
    },
    { timeoutMs: 15000 }
  );

  if (response.statusCode < 200 || response.statusCode >= 300 || !response.body?.ok) {
    throw new Error(`Telegram sendMessage failed: ${JSON.stringify(response.body)}`);
  }

  return response.body.result;
}

async function maybeAutoReplyToTelegramUpdate(update) {
  const config = getTelegramConfig();

  if (!config.autoReplyEnabled || !update.chatId || update.fromId == null) {
    return null;
  }

  // Only auto-reply to human messages in private chats for now.
  if (update.chatType !== 'private') {
    return null;
  }

  const replyText = await buildTelegramLeadReply(update);

  return sendTelegramMessage({
    chatId: update.chatId,
    text: replyText || config.autoReplyText
  });
}

export async function handleTelegramWebhookEvent(request, response) {
  if (!isTelegramEnabled()) {
    sendJson(response, 503, {
      error: 'Telegram integration is disabled. Set TELEGRAM_ENABLED=true to enable it.'
    });
    return;
  }

  try {
    const jsonBody = await readJsonBody(request);
    const normalizedUpdate = await processTelegramUpdate(jsonBody);

    sendJson(response, 200, {
      received: true,
      source: normalizedUpdate.source,
      chatId: normalizedUpdate.chatId,
      updateId: normalizedUpdate.updateId
    });
  } catch (error) {
    console.error('Failed to process Telegram webhook:', error);
    sendJson(response, 500, { error: error.message });
  }
}

export async function handleInternalTelegramSendRequest(request, response) {
  if (!isTelegramEnabled()) {
    sendJson(response, 503, {
      error: 'Telegram integration is disabled. Set TELEGRAM_ENABLED=true to enable it.'
    });
    return;
  }

  try {
    const config = getTelegramConfig();
    const expectedToken = config.internalApiToken;
    const providedToken = request.headers.authorization?.replace(/^Bearer\s+/i, '');

    if (expectedToken && providedToken !== expectedToken) {
      sendJson(response, 401, { error: 'Unauthorized internal request.' });
      return;
    }

    const jsonBody = await readJsonBody(request);
    const result = await sendTelegramMessage(jsonBody);

    sendJson(response, 200, {
      sent: true,
      result
    });
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    sendJson(response, 500, { error: error.message });
  }
}

export function getRecentTelegramUpdates() {
  return [...recentUpdates];
}

export async function getTelegramLeadSnapshots() {
  return getLeadSnapshots();
}

export function startTelegramPolling() {
  if (!isTelegramEnabled() || !getTelegramConfig().pollingEnabled || pollingState.isRunning) {
    return;
  }

  pollingState.isRunning = true;

  const poll = async () => {
    while (pollingState.isRunning) {
      try {
        const { pollingTimeoutSeconds } = getTelegramConfig();
        const response = await postJson(
          getTelegramApiUrl('getUpdates'),
          {
            offset: pollingState.offset,
            timeout: pollingTimeoutSeconds,
            allowed_updates: ['message', 'edited_message', 'callback_query']
          },
          { timeoutMs: (pollingTimeoutSeconds + 10) * 1000 }
        );

        if (!response.body?.ok) {
          throw new Error(`Telegram getUpdates failed: ${JSON.stringify(response.body)}`);
        }

        for (const update of response.body.result || []) {
          pollingState.offset = update.update_id + 1;
          await processTelegramUpdate(update);
        }
      } catch (error) {
        console.error('Telegram polling error:', error.message);
        await wait(3000);
      }
    }
  };

  void poll();
}
