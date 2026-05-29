import 'dotenv/config';
import http from 'node:http';
import path from 'node:path';
import { access, readFile, stat } from 'node:fs/promises';
import { constants as fileConstants } from 'node:fs';
import { initializeApp } from 'firebase/app';
import firebaseConfig, { hasFirebaseConfig } from './config/firebase.js';
import { getTelegramConfig } from './config/telegram.js';
import { getWhatsAppConfig } from './config/whatsapp.js';
import {
  fetchTelegramBotProfile,
  getRecentTelegramUpdates,
  getTelegramLeadSnapshots,
  handleInternalTelegramSendRequest,
  handleTelegramWebhookEvent
} from './services/telegram-service.js';
import { addLeadNote, getLeadStorageMode, listLeads, updateLead } from './services/lead-memory.js';
import { loadEnvironmentVariables, getEnvironmentInfo } from './utils/env-loader.js';
import {
  handleInternalSendMessageRequest,
  handleWhatsAppWebhookEvent,
  handleWhatsAppWebhookVerification,
  sendJson
} from './services/whatsapp-service.js';

try {
  loadEnvironmentVariables();
} catch (error) {
  console.error('Failed to load environment variables:', error.message);
  throw error;
}

let app = null;

if (hasFirebaseConfig()) {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');
} else {
  console.warn('⚠️ Firebase configuration not detected; skipping Firebase initialization');
}

const telegramConfig = getTelegramConfig();
const whatsappConfig = getWhatsAppConfig();
const publicDirectory = path.resolve(process.cwd(), 'public');
const assetMimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

function getDynamicEnvironmentInfo() {
  return {
    ...getEnvironmentInfo(),
    leadStorage: getLeadStorageMode()
  };
}

function getLeadStats(leads) {
  const statuses = {};
  const priorities = {};
  const channels = {};
  let completedLeads = 0;
  let handoffRequested = 0;

  for (const lead of leads) {
    statuses[lead.status] = (statuses[lead.status] || 0) + 1;
    priorities[lead.priority] = (priorities[lead.priority] || 0) + 1;
    channels[lead.channel || lead.source || 'unknown'] = (channels[lead.channel || lead.source || 'unknown'] || 0) + 1;

    if (lead.stage === 'completed') {
      completedLeads += 1;
    }

    if (lead.status === 'handoff_requested') {
      handoffRequested += 1;
    }
  }

  return {
    total: leads.length,
    completed: completedLeads,
    handoffRequested,
    statuses,
    priorities,
    channels
  };
}

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString('utf8').trim();

  if (!rawBody) {
    return {};
  }

  return JSON.parse(rawBody);
}

function sanitizeLeadUpdate(payload) {
  const updates = {};

  if (typeof payload.name === 'string') {
    updates.name = payload.name.trim() || null;
  }

  if (typeof payload.status === 'string') {
    updates.status = payload.status.trim() || 'active';
  }

  if (typeof payload.priority === 'string') {
    updates.priority = payload.priority.trim() || 'standard';
  }

  if (typeof payload.assignedAdvisor === 'string') {
    updates.assignedAdvisor = payload.assignedAdvisor.trim() || null;
  }

  if (typeof payload.preferredLanguage === 'string') {
    updates.preferredLanguage = payload.preferredLanguage.trim() || 'ar';
  }

  if (payload.profile && typeof payload.profile === 'object') {
    updates.profile = payload.profile;
  }

  return updates;
}

function getLeadPathMatch(pathname) {
  return pathname.match(/^\/api\/leads\/([^/]+)$/);
}

function getLeadNotesPathMatch(pathname) {
  return pathname.match(/^\/api\/leads\/([^/]+)\/notes$/);
}

function getMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return assetMimeTypes[extension] || 'application/octet-stream';
}

async function tryServeUiAsset(pathname, response) {
  const normalizedPath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const resolvedPath = path.resolve(publicDirectory, normalizedPath);
  const indexPath = path.resolve(publicDirectory, 'index.html');

  if (!resolvedPath.startsWith(publicDirectory)) {
    return false;
  }

  try {
    const fileInfo = await stat(resolvedPath);

    if (fileInfo.isFile()) {
      const fileContents = await readFile(resolvedPath);
      response.writeHead(200, { 'Content-Type': getMimeType(resolvedPath) });
      response.end(fileContents);
      return true;
    }
  } catch {
    // Fall through to SPA handling.
  }

  try {
    await access(indexPath, fileConstants.F_OK);
    const html = await readFile(indexPath);
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(html);
    return true;
  } catch {
    return false;
  }
}

async function handleDashboardRequest(response) {
  const [leads, recentUpdates] = await Promise.all([
    listLeads(),
    Promise.resolve(getRecentTelegramUpdates())
  ]);

  sendJson(response, 200, {
    generatedAt: new Date().toISOString(),
    env: getDynamicEnvironmentInfo(),
    stats: getLeadStats(leads),
    leads,
    recentUpdates: recentUpdates.slice(0, 12)
  });
}

async function handleLeadUpdateRequest(request, response, chatId) {
  const payload = await readJsonBody(request);
  const lead = await updateLead(chatId, sanitizeLeadUpdate(payload));

  sendJson(response, 200, {
    updated: true,
    lead
  });
}

async function handleLeadNoteRequest(request, response, chatId) {
  const payload = await readJsonBody(request);
  const lead = await addLeadNote(chatId, {
    text: payload.text,
    author: payload.author || 'dashboard'
  });

  sendJson(response, 200, {
    updated: true,
    lead
  });
}

export async function handleRequest(request, response) {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const environmentInfo = getDynamicEnvironmentInfo();
  const leadPathMatch = getLeadPathMatch(requestUrl.pathname);
  const leadNotesPathMatch = getLeadNotesPathMatch(requestUrl.pathname);

  if (request.method === 'GET' && requestUrl.pathname === '/health') {
    sendJson(response, 200, {
      ok: true,
      env: environmentInfo,
      routes: {
        dashboard: '/',
        health: '/health',
        dashboardApi: '/api/dashboard',
        leadsApi: '/api/leads',
        telegramWebhook: telegramConfig.webhookPath,
        telegramSend: '/api/telegram/messages',
        whatsappWebhook: whatsappConfig.webhookPath,
        whatsappSend: '/api/whatsapp/messages'
      }
    });
    return;
  }

  if (request.method === 'GET' && requestUrl.pathname === '/api/dashboard') {
    await handleDashboardRequest(response);
    return;
  }

  if (request.method === 'GET' && requestUrl.pathname === '/api/leads') {
    sendJson(response, 200, {
      leads: await listLeads()
    });
    return;
  }

  if (request.method === 'PATCH' && leadPathMatch) {
    await handleLeadUpdateRequest(request, response, decodeURIComponent(leadPathMatch[1]));
    return;
  }

  if (request.method === 'POST' && leadNotesPathMatch) {
    await handleLeadNoteRequest(request, response, decodeURIComponent(leadNotesPathMatch[1]));
    return;
  }

  if (request.method === 'POST' && requestUrl.pathname === telegramConfig.webhookPath) {
    await handleTelegramWebhookEvent(request, response);
    return;
  }

  if (request.method === 'GET' && requestUrl.pathname === '/api/telegram/updates') {
    sendJson(response, 200, {
      updates: getRecentTelegramUpdates()
    });
    return;
  }

  if (request.method === 'GET' && requestUrl.pathname === '/api/telegram/leads') {
    sendJson(response, 200, {
      leads: await getTelegramLeadSnapshots()
    });
    return;
  }

  if (request.method === 'POST' && requestUrl.pathname === '/api/telegram/messages') {
    await handleInternalTelegramSendRequest(request, response);
    return;
  }

  if (request.method === 'GET' && requestUrl.pathname === whatsappConfig.webhookPath) {
    handleWhatsAppWebhookVerification(requestUrl, response);
    return;
  }

  if (request.method === 'POST' && requestUrl.pathname === whatsappConfig.webhookPath) {
    await handleWhatsAppWebhookEvent(request, response);
    return;
  }

  if (request.method === 'POST' && requestUrl.pathname === '/api/whatsapp/messages') {
    await handleInternalSendMessageRequest(request, response);
    return;
  }

  if (request.method === 'GET' && (await tryServeUiAsset(requestUrl.pathname, response))) {
    return;
  }

  sendJson(response, 404, { error: 'Route not found.' });
}

export function createServer() {
  return http.createServer((request, response) => {
    void handleRequest(request, response).catch(error => {
      console.error('Unhandled request error:', error);
      sendJson(response, 500, { error: error.message });
    });
  });
}

export async function validateTelegramRuntime() {
  if (!telegramConfig.enabled) {
    return;
  }

  try {
    const profile = await fetchTelegramBotProfile();
    console.log(`✅ Telegram bot ready: @${profile.username}`);
  } catch (error) {
    console.error('❌ Failed to validate Telegram bot token:', error.message);
  }
}

export { app, getDynamicEnvironmentInfo as getEnvironmentInfo };
