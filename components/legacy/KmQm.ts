import * as admin from 'firebase-admin';

// Proxy returned when Admin SDK is unavailable — throws a clear error instead of crashing at import
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeUnavailable = (name: string): any =>
  new Proxy(
    {},
    {
      get(_target, prop) {
        if (prop === 'then') return undefined; // prevent accidental Promise treatment
        throw new Error(
          `[firebase-admin] ${name} unavailable. ` +
            `Add FIREBASE_SERVICE_ACCOUNT_JSON to your environment variables. ` +
            `Get the key: Firebase Console → Project Settings → Service Accounts → Generate new private key`
        );
      },
    }
  );

let adminApp: admin.app.App = makeUnavailable('App');
let adminAuth: admin.auth.Auth = makeUnavailable('Auth');
let adminDb: admin.firestore.Firestore = makeUnavailable('Firestore');
let adminAppCheck: admin.appCheck.AppCheck = makeUnavailable('AppCheck');
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
    'Get the key from: Firebase Console → Project Settings → Service Accounts → Generate new private key'
  );
}

export { adminApp, adminAuth, adminDb, adminAppCheck, isAdminInitialized };
