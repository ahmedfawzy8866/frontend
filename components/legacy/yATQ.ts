import * as admin from 'firebase-admin';

let adminApp: admin.app.App | null = null;
let adminAuth: admin.auth.Auth | null = null;
let adminDb: admin.firestore.Firestore | null = null;
let adminAppCheck: admin.appCheck.AppCheck | null = null;
let isAdminInitialized = false;

try {
  if (!admin.apps.length) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

    if (serviceAccount) {
      // Option A: Full service account JSON stored as env variable (Vercel production)
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccount)),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } else {
      // Option B: Use application default credentials (Google Cloud / local Firebase CLI)
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'sierra-blu',
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }
  }

  adminApp = admin.app();
  adminAuth = admin.auth();
  adminDb = admin.firestore();
  adminAppCheck = admin.appCheck();
  isAdminInitialized = true;
} catch (error) {
  console.warn(
    '[firebase-admin] Initialization failed — API routes requiring admin will return 503.\n' +
    'To fix: add FIREBASE_SERVICE_ACCOUNT_JSON to your environment variables.\n' +
    'Get the key from: Firebase Console → Project Settings → Service Accounts → Generate new private key',
    error
  );
}

export { adminApp, adminAuth, adminDb, adminAppCheck, isAdminInitialized };
