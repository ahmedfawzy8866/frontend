import crypto from 'node:crypto';
import {
  getLeadStorageMode,
  getStoredLead,
  listStoredLeads,
  saveStoredLead
} from './lead-repository.js';

function createEmptyLead(chatId, defaults = {}) {
  return {
    chatId,
    channel: defaults.channel || 'telegram',
    source: defaults.source || defaults.channel || 'telegram',
    stage: 'collect_name',
    preferredLanguage: defaults.preferredLanguage || 'ar',
    name: defaults.name || null,
    username: defaults.username || null,
    firstName: defaults.firstName || null,
    status: 'active',
    priority: 'standard',
    assignedAdvisor: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    profile: {
      purpose: null,
      propertyType: null,
      location: null,
      budget: null,
      bedrooms: null,
      timeline: null,
      phone: null
    },
    notes: [],
    lastMessageText: null
  };
}

function normalizeNotes(notes) {
  if (!Array.isArray(notes)) {
    return [];
  }

  return notes.map(note => {
    if (typeof note === 'string') {
      return {
        id: crypto.randomUUID(),
        text: note,
        author: 'system',
        createdAt: new Date().toISOString()
      };
    }

    return {
      id: note.id || crypto.randomUUID(),
      text: note.text || '',
      author: note.author || 'system',
      createdAt: note.createdAt || new Date().toISOString()
    };
  });
}

function normalizeLead(rawLead, defaults = {}) {
  const chatId = rawLead?.chatId ?? defaults.chatId;
  const baseLead = createEmptyLead(chatId, defaults);

  return {
    ...baseLead,
    ...(rawLead || {}),
    chatId,
    channel: rawLead?.channel || rawLead?.source || defaults.channel || baseLead.channel,
    source: rawLead?.source || rawLead?.channel || defaults.source || baseLead.source,
    preferredLanguage: rawLead?.preferredLanguage || defaults.preferredLanguage || baseLead.preferredLanguage,
    profile: {
      ...baseLead.profile,
      ...(rawLead?.profile || {})
    },
    notes: normalizeNotes(rawLead?.notes),
    createdAt: rawLead?.createdAt || baseLead.createdAt,
    updatedAt: rawLead?.updatedAt || rawLead?.createdAt || baseLead.updatedAt
  };
}

export async function getLead(chatId, defaults = {}) {
  const storedLead = await getStoredLead(chatId);

  if (!storedLead) {
    const freshLead = createEmptyLead(chatId, defaults);
    await saveStoredLead(freshLead);
    return freshLead;
  }

  return normalizeLead(storedLead, {
    ...defaults,
    chatId
  });
}

export async function saveLead(lead) {
  const normalizedLead = normalizeLead(lead, {
    chatId: lead.chatId
  });
  const nextLead = {
    ...normalizedLead,
    updatedAt: new Date().toISOString()
  };

  await saveStoredLead(nextLead);
  return nextLead;
}

export async function resetLead(chatId, defaults = {}) {
  const freshLead = createEmptyLead(chatId, defaults);
  await saveStoredLead(freshLead);
  return freshLead;
}

export async function listLeads() {
  const leads = await listStoredLeads();

  return leads
    .map(lead => normalizeLead(lead, { chatId: lead.chatId }))
    .sort((leftLead, rightLead) => {
      return new Date(rightLead.updatedAt).getTime() - new Date(leftLead.updatedAt).getTime();
    });
}

export async function updateLead(chatId, updates = {}) {
  const currentLead = await getLead(chatId, { chatId });
  const nextLead = {
    ...currentLead,
    ...updates,
    profile: {
      ...currentLead.profile,
      ...(updates.profile || {})
    }
  };

  if (updates.notes) {
    nextLead.notes = normalizeNotes(updates.notes);
  }

  return saveLead(nextLead);
}

export async function addLeadNote(chatId, note) {
  const currentLead = await getLead(chatId, { chatId });
  const nextNote = {
    id: crypto.randomUUID(),
    text: String(note.text || '').trim(),
    author: note.author || 'dashboard',
    createdAt: new Date().toISOString()
  };

  if (!nextNote.text) {
    throw new Error('A note message is required.');
  }

  return saveLead({
    ...currentLead,
    notes: [...normalizeNotes(currentLead.notes), nextNote]
  });
}

export { createEmptyLead, getLeadStorageMode };
