import { getTelegramConfig } from './config/telegram.js';
import { startTelegramPolling } from './services/telegram-service.js';
import { createServer, getEnvironmentInfo, validateTelegramRuntime } from './server.js';

const PORT = Number(process.env.PORT || 3000);
const telegramConfig = getTelegramConfig();
const envInfo = getEnvironmentInfo();
const server = createServer();

console.log('📊 Environment Info:', envInfo);

server.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`🔗 Health check available at http://localhost:${PORT}/health`);
  console.log(`🤖 Telegram webhook path: ${telegramConfig.webhookPath}`);
  console.log(`📩 WhatsApp webhook path: ${process.env.WHATSAPP_WEBHOOK_PATH || '/webhooks/whatsapp'}`);

  void validateTelegramRuntime();
  startTelegramPolling();
});

export { envInfo, server };
