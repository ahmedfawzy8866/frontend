const truthyValues = new Set(['1', 'true', 'yes', 'on']);

function readBooleanEnvironmentValue(value) {
  return truthyValues.has(String(value || '').trim().toLowerCase());
}

export function getTelegramConfig() {
  return {
    enabled: readBooleanEnvironmentValue(process.env.TELEGRAM_ENABLED),
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    webhookPath: process.env.TELEGRAM_WEBHOOK_PATH || '/webhooks/telegram',
    pollingEnabled: readBooleanEnvironmentValue(process.env.TELEGRAM_POLLING_ENABLED),
    pollingTimeoutSeconds: Number(process.env.TELEGRAM_POLLING_TIMEOUT_SECONDS || 25),
    autoReplyEnabled: readBooleanEnvironmentValue(process.env.TELEGRAM_AUTO_REPLY_ENABLED),
    autoReplyText:
      process.env.TELEGRAM_AUTO_REPLY_TEXT ||
      'Hello from Sierra AI Realty. I received your message and the bot is now connected.',
    internalApiToken: process.env.TELEGRAM_INTERNAL_API_TOKEN || process.env.OPENCLAW_INTERNAL_API_TOKEN,
    inboundForwardUrl: process.env.OPENCLAW_TELEGRAM_WEBHOOK_URL,
    inboundForwardToken: process.env.OPENCLAW_TELEGRAM_WEBHOOK_TOKEN
  };
}

export function isTelegramEnabled() {
  return getTelegramConfig().enabled;
}

export function hasTelegramConfig() {
  return Boolean(getTelegramConfig().botToken);
}

export function validateTelegramConfig(options = {}) {
  const { required = false } = options;
  const config = getTelegramConfig();

  if (!required && !config.enabled) {
    return false;
  }

  if (!config.botToken) {
    throw new Error('Missing Telegram configuration: TELEGRAM_BOT_TOKEN. Please check your .env file.');
  }

  return true;
}
