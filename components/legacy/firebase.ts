/**
 * Sierra AI — FIREBASE CLIENT SINGLETON
 * Central Firebase initialization for the frontend.
 * Admin SDK (service-account.json) is for server/scripts only.
 */
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'sierra-blu',
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app: FirebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

/**
 * Returns Analytics instance only in browser environments where it's supported.
 * Returns null during SSR or in environments without analytics support.
 */
export async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  const supported = await isSupported();
  if (!supported) return null;
  return getAnalytics(app);
}

export default app;
