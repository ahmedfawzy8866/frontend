const truthyValues = new Set(['1', 'true', 'yes', 'on']);

function readBooleanEnvironmentValue(value) {
  return truthyValues.has(String(value || '').trim().toLowerCase());
}

export function getWhatsAppConfig() {
  return {
    enabled: readBooleanEnvironmentValue(process.env.WHATSAPP_ENABLED),
    apiVersion: process.env.WHATSAPP_API_VERSION,
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
    appSecret: process.env.WHATSAPP_APP_SECRET,
    webhookPath: process.env.WHATSAPP_WEBHOOK_PATH || '/webhooks/whatsapp',
    internalApiToken: process.env.OPENCLAW_INTERNAL_API_TOKEN,
    inboundForwardUrl: process.env.OPENCLAW_WHATSAPP_WEBHOOK_URL,
    inboundForwardToken: process.env.OPENCLAW_WHATSAPP_WEBHOOK_TOKEN
  };
}

export function isWhatsAppEnabled() {
  return getWhatsAppConfig().enabled;
}

export function hasWhatsAppConfig() {
  const config = getWhatsAppConfig();

  return Boolean(
    config.apiVersion &&
    config.accessToken &&
    config.phoneNumberId &&
    config.webhookVerifyToken
  );
}

export function validateWhatsAppConfig(options = {}) {
  const { required = false } = options;
  const config = getWhatsAppConfig();

  if (!required && !config.enabled) {
    return false;
  }

  const requiredFields = [
    ['WHATSAPP_API_VERSION', config.apiVersion],
    ['WHATSAPP_ACCESS_TOKEN', config.accessToken],
    ['WHATSAPP_PHONE_NUMBER_ID', config.phoneNumberId],
    ['WHATSAPP_WEBHOOK_VERIFY_TOKEN', config.webhookVerifyToken]
  ];

  const missingFields = requiredFields
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missingFields.length > 0) {
    throw new Error(
      `Missing WhatsApp configuration: ${missingFields.join(', ')}. Please check your .env file.`
    );
  }

  return true;
}
