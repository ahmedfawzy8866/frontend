// Environment variable loader with validation
import {
  hasAnyFirebaseAdminConfig,
  hasAnyFirebaseConfig,
  hasFirebaseAdminConfig,
  hasFirebaseConfig,
  validateFirebaseAdminConfig,
  validateFirebaseConfig
} from '../config/firebase.js';
import { hasTelegramConfig, isTelegramEnabled, validateTelegramConfig } from '../config/telegram.js';
import { hasWhatsAppConfig, isWhatsAppEnabled, validateWhatsAppConfig } from '../config/whatsapp.js';

export function loadEnvironmentVariables() {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    console.warn('Environment variables should be loaded on the server side');
  }
 
  // Validate Firebase configuration only if values are present.
  if (hasAnyFirebaseConfig()) {
    try {
      validateFirebaseConfig();
      console.log('✅ Firebase configuration validated successfully');
    } catch (error) {
      console.error('❌ Firebase configuration error:', error.message);
      throw error;
    }
  } else {
    console.warn('⚠️ Firebase configuration not provided; Firebase will be skipped');
  }

  if (hasAnyFirebaseAdminConfig()) {
    try {
      validateFirebaseAdminConfig();
      console.log('✅ Firebase Admin configuration validated successfully');
    } catch (error) {
      console.error('❌ Firebase Admin configuration error:', error.message);
      throw error;
    }
  }

  // Validate WhatsApp configuration only if the integration is enabled.
  if (isWhatsAppEnabled()) {
    try {
      validateWhatsAppConfig({ required: true });
      console.log('✅ WhatsApp configuration validated successfully');
    } catch (error) {
      console.error('❌ WhatsApp configuration error:', error.message);
      throw error;
    }
  }

  if (isTelegramEnabled()) {
    try {
      validateTelegramConfig({ required: true });
      console.log('✅ Telegram configuration validated successfully');
    } catch (error) {
      console.error('❌ Telegram configuration error:', error.message);
      throw error;
    }
  }
}

export function getEnvironmentInfo() {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    hasFirebaseConfig: hasFirebaseConfig(),
    hasPartialFirebaseConfig: hasAnyFirebaseConfig() && !hasFirebaseConfig(),
    hasFirebaseAdminConfig: hasFirebaseAdminConfig(),
    hasPartialFirebaseAdminConfig: hasAnyFirebaseAdminConfig() && !hasFirebaseAdminConfig(),
    telegramEnabled: isTelegramEnabled(),
    hasTelegramConfig: hasTelegramConfig(),
    whatsappEnabled: isWhatsAppEnabled(),
    hasWhatsAppConfig: hasWhatsAppConfig(),
    isProduction: process.env.NODE_ENV === 'production'
  };
}
