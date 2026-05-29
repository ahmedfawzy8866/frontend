import crypto from 'node:crypto';
import { getWhatsAppConfig, isWhatsAppEnabled, validateWhatsAppConfig } from '../config/whatsapp.js';
import { postJson } from '../utils/http-client.js';

export function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

async function readRawBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
}

async function readJsonBody(request) {
  const rawBody = await readRawBody(request);
  const rawText = rawBody.toString('utf8').trim();

  if (!rawText) {
    return { rawBody, jsonBody: {} };
  }

  return {
    rawBody,
    jsonBody: JSON.parse(rawText)
  };
}

function getGraphApiUrl(pathname) {
  const config = getWhatsAppConfig();
  return `https://graph.facebook.com/${config.apiVersion}/${pathname}`;
}

function verifySignature(rawBody, signatureHeader) {
  const { appSecret } = getWhatsAppConfig();

  if (!appSecret) {
    return true;
  }

  if (!signatureHeader) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', appSecret)
    .update(rawBody)
    .digest('hex');

  const receivedSignature = signatureHeader.replace('sha256=', '');

  if (receivedSignature.length !== expectedSignature.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(receivedSignature, 'utf8'),
    Buffer.from(expectedSignature, 'utf8')
  );
}

function normalizeWebhookPayload(payload) {
  const normalized = {
    source: 'whatsapp',
    receivedAt: new Date().toISOString(),
    messages: [],
    statuses: [],
    metadata: []
  };

  for (const entry of payload.entry || []) {
    for (const change of entry.changes || []) {
      const value = change.value || {};
      const contacts = value.contacts || [];
      const metadata = value.metadata || {};

      normalized.metadata.push({
        displayPhoneNumber: metadata.display_phone_number || null,
        phoneNumberId: metadata.phone_number_id || null
      });

      for (const message of value.messages || []) {
        const contact = contacts.find(item => item.wa_id === message.from);

        normalized.messages.push({
          messageId: message.id,
          from: message.from,
          profileName: contact?.profile?.name || null,
          timestamp: message.timestamp || null,
          type: message.type || 'unknown',
          text: message.text?.body || null,
          raw: message
        });
      }

      for (const status of value.statuses || []) {
        normalized.statuses.push({
          messageId: status.id,
          recipientId: status.recipient_id,
          status: status.status,
          timestamp: status.timestamp || null,
          conversationId: status.conversation?.id || null,
          pricingCategory: status.pricing?.category || null,
          raw: status
        });
      }
    }
  }

  return normalized;
}

async function forwardWebhookToOpenClaw(eventPayload) {
  const config = getWhatsAppConfig();

  if (!config.inboundForwardUrl) {
    return null;
  }

  const headers = {};

  if (config.inboundForwardToken) {
    headers.Authorization = `Bearer ${config.inboundForwardToken}`;
  }

  return postJson(config.inboundForwardUrl, eventPayload, { headers, timeoutMs: 10000 });
}

export async function sendWhatsAppTextMessage(payload) {
  validateWhatsAppConfig({ required: true });

  const { accessToken, phoneNumberId } = getWhatsAppConfig();
  const { to, body, previewUrl = false, replyToMessageId } = payload;

  if (!to || !body) {
    throw new Error('Both "to" and "body" are required to send a WhatsApp message.');
  }

  const requestBody = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: {
      preview_url: Boolean(previewUrl),
      body
    }
  };

  if (replyToMessageId) {
    requestBody.context = {
      message_id: replyToMessageId
    };
  }

  const response = await postJson(
    getGraphApiUrl(`${phoneNumberId}/messages`),
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      timeoutMs: 15000
    }
  );

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(
      `WhatsApp send failed with status ${response.statusCode}: ${JSON.stringify(response.body)}`
    );
  }

  return response.body;
}

export function handleWhatsAppWebhookVerification(requestUrl, response) {
  if (!isWhatsAppEnabled()) {
    sendJson(response, 503, {
      error: 'WhatsApp integration is disabled. Set WHATSAPP_ENABLED=true to enable it.'
    });
    return;
  }

  const config = getWhatsAppConfig();
  const mode = requestUrl.searchParams.get('hub.mode');
  const token = requestUrl.searchParams.get('hub.verify_token');
  const challenge = requestUrl.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === config.webhookVerifyToken) {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(challenge || '');
    return;
  }

  sendJson(response, 403, { error: 'Webhook verification failed.' });
}

export async function handleWhatsAppWebhookEvent(request, response) {
  if (!isWhatsAppEnabled()) {
    sendJson(response, 503, {
      error: 'WhatsApp integration is disabled. Set WHATSAPP_ENABLED=true to enable it.'
    });
    return;
  }

  try {
    const { rawBody, jsonBody } = await readJsonBody(request);

    if (!verifySignature(rawBody, request.headers['x-hub-signature-256'])) {
      sendJson(response, 401, { error: 'Invalid webhook signature.' });
      return;
    }

    if (jsonBody.object !== 'whatsapp_business_account') {
      sendJson(response, 400, { error: 'Unsupported webhook payload.' });
      return;
    }

    const normalizedPayload = normalizeWebhookPayload(jsonBody);
    const forwardResponse = await forwardWebhookToOpenClaw(normalizedPayload);

    sendJson(response, 200, {
      received: true,
      forwarded: Boolean(forwardResponse),
      messageCount: normalizedPayload.messages.length,
      statusCount: normalizedPayload.statuses.length
    });
  } catch (error) {
    console.error('Failed to process WhatsApp webhook:', error);
    sendJson(response, 500, { error: error.message });
  }
}

export async function handleInternalSendMessageRequest(request, response) {
  if (!isWhatsAppEnabled()) {
    sendJson(response, 503, {
      error: 'WhatsApp integration is disabled. Set WHATSAPP_ENABLED=true to enable it.'
    });
    return;
  }

  try {
    const config = getWhatsAppConfig();
    const expectedToken = config.internalApiToken;
    const providedToken = request.headers.authorization?.replace(/^Bearer\s+/i, '');

    if (expectedToken && providedToken !== expectedToken) {
      sendJson(response, 401, { error: 'Unauthorized internal request.' });
      return;
    }

    const { jsonBody } = await readJsonBody(request);
    const result = await sendWhatsAppTextMessage(jsonBody);

    sendJson(response, 200, {
      sent: true,
      result
    });
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    sendJson(response, 500, { error: error.message });
  }
}
