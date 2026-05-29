import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import {
  firebaseAdminConfig,
  hasFirebaseAdminConfig,
  validateFirebaseAdminConfig
} from '../config/firebase.js';

const runtimeDirectory = path.resolve(process.cwd(), 'data', 'runtime');
const leadsFilePath = path.join(runtimeDirectory, 'leads.json');

async function ensureRuntimeStore() {
  await mkdir(runtimeDirectory, { recursive: true });

  try {
    await readFile(leadsFilePath, 'utf8');
  } catch {
    await writeFile(leadsFilePath, JSON.stringify({ leads: {} }, null, 2), 'utf8');
  }
}

async function readFileStore() {
  await ensureRuntimeStore();
  const content = await readFile(leadsFilePath, 'utf8');
  return JSON.parse(content);
}

async function writeFileStore(store) {
  await ensureRuntimeStore();
  await writeFile(leadsFilePath, JSON.stringify(store, null, 2), 'utf8');
}

function getLeadCollection() {
  validateFirebaseAdminConfig({ required: true });

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: firebaseAdminConfig.projectId,
        clientEmail: firebaseAdminConfig.clientEmail,
        privateKey: firebaseAdminConfig.privateKey
      })
    });
  }

  return getFirestore().collection(firebaseAdminConfig.leadsCollection);
}

async function runWithFallback(firestoreOperation, fileOperation) {
  if (!hasFirebaseAdminConfig()) {
    return fileOperation();
  }

  try {
    return await firestoreOperation();
  } catch (error) {
    console.error('Firestore lead storage unavailable, falling back to file storage:', error.message);
    return fileOperation();
  }
}

export function getLeadStorageMode() {
  return hasFirebaseAdminConfig() ? 'firestore' : 'file';
}

export async function getStoredLead(chatId) {
  return runWithFallback(
    async () => {
      const document = await getLeadCollection().doc(String(chatId)).get();
      return document.exists ? document.data() : null;
    },
    async () => {
      const store = await readFileStore();
      return store.leads[String(chatId)] || null;
    }
  );
}

export async function saveStoredLead(lead) {
  return runWithFallback(
    async () => {
      await getLeadCollection().doc(String(lead.chatId)).set(lead, { merge: true });
      return lead;
    },
    async () => {
      const store = await readFileStore();
      store.leads[String(lead.chatId)] = lead;
      await writeFileStore(store);
      return lead;
    }
  );
}

export async function listStoredLeads() {
  return runWithFallback(
    async () => {
      const snapshot = await getLeadCollection().get();
      return snapshot.docs.map(document => document.data());
    },
    async () => {
      const store = await readFileStore();
      return Object.values(store.leads);
    }
  );
}
