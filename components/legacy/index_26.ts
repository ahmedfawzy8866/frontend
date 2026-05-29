import express from 'express';
import dotenv from 'dotenv';
import { WhatsAppClient } from './whatsapp-client';
import { TemplateManager } from './template-manager';
import {
  validateHMAC,
  rawBodyMiddleware,
  handleWebhookVerification,
  parseWebhookPayload,
  extractMessageContent,
} from './webhook-handler';
import { WhatsAppConfig, IncomingMessage, StatusUpdate } from './types';

dotenv.config();

// === Configuration ===

const config: WhatsAppConfig = {
  token: process.env.WHATSAPP_TOKEN!,
  phoneNumberId: process.env.PHONE_NUMBER_ID!,
  wabaId: process.env.WABA_ID!,
  appSecret: process.env.APP_SECRET!,
  verifyToken: process.env.VERIFY_TOKEN!,
};

const whatsapp = new WhatsAppClient(config);
const templates = new TemplateManager(config);

// === Express Setup ===

const app = express();
const PORT = process.env.PORT || 3005;

// Raw body capture MUST come before express.json()
app.use(express.json({ verify: rawBodyMiddleware }));

// === Webhook Routes ===

// GET - Webhook verification (Meta sends challenge)
app.get('/webhook', handleWebhookVerification(config.verifyToken));

// POST - Receive messages and status updates
app.post('/webhook', validateHMAC(config.appSecret), async (req, res) => {
  // Respond 200 immediately (WhatsApp requires response within 5 seconds)
  res.sendStatus(200);

  try {
    const { messages, statuses } = parseWebhookPayload(req.body);

    for (const message of messages) {
      await handleIncomingMessage(message);
    }

    for (const status of statuses) {
      handleStatusUpdate(status);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
  }
});

// === Message Handler ===

async function handleIncomingMessage(message: IncomingMessage): Promise<void> {
  const from = message.from;
  const content = extractMessageContent(message);

  console.log(`[Neural Link] Message from ${from}: [${content.type}] ${content.text || content.buttonId || ''}`);

  // Mark as read in the Meta ecosystem
  await whatsapp.markAsRead(message.id);

  // Codex v4.0 Response Logic
  switch (content.type) {
    case 'text':
      await whatsapp.sendText(from, `Thank you for contacting Sierra AI Realty. Our AI has captured your request: "${content.text}". a Strategic Advisor will reach out shortly.`);
      break;

    case 'button':
      await whatsapp.sendText(from, `Selection confirmed: ${content.text}. Loading investment profiles...`);
      break;

    case 'image':
      await whatsapp.sendText(from, `Visual asset received. Our system is analyzing the documents and adding them to the portfolio.`);
      break;

    default:
      await whatsapp.sendText(from, 'Sierra AI Operational Relay: We have received your inquiry. How may we assist your investment journey?');
      break;
  }
}

// === Status Handler ===

function handleStatusUpdate(status: StatusUpdate): void {
  console.log(`Status update: ${status.id} -> ${status.status}`);

  if (status.status === 'failed') {
    console.error(`Message delivery failed:`, status.errors);
  }
}

// === Health Check ===

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// === Start Server ===

app.listen(PORT, () => {
  console.log(`WhatsApp webhook server running on port ${PORT}`);
  console.log(`Webhook URL: http://localhost:${PORT}/webhook`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export { whatsapp, templates };
