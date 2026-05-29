// Firebase configuration with environment variables
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  leadsCollection: process.env.FIREBASE_LEADS_COLLECTION || 'leads'
};

const requiredFields = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId'
];

export function hasAnyFirebaseConfig() {
  return requiredFields.some(field => !!firebaseConfig[field]);
}

export function hasFirebaseConfig() {
  return requiredFields.every(field => !!firebaseConfig[field]);
}

export function hasAnyFirebaseAdminConfig() {
  return Boolean(
    firebaseAdminConfig.projectId ||
    firebaseAdminConfig.clientEmail ||
    firebaseAdminConfig.privateKey
  );
}

export function hasFirebaseAdminConfig() {
  return Boolean(
    firebaseAdminConfig.projectId &&
    firebaseAdminConfig.clientEmail &&
    firebaseAdminConfig.privateKey
  );
}

// Validate required environment variables
export function validateFirebaseConfig(options = {}) {
  const { required = false } = options;
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

  if (!required && !hasAnyFirebaseConfig()) {
    return false;
  }

  if (missingFields.length > 0) {
    throw new Error(`Missing Firebase configuration: ${missingFields.join(', ')}. Please check your .env file.`);
  }

  return true;
}

export function validateFirebaseAdminConfig(options = {}) {
  const { required = false } = options;
  const missingFields = [
    ['FIREBASE_ADMIN_PROJECT_ID', firebaseAdminConfig.projectId],
    ['FIREBASE_ADMIN_CLIENT_EMAIL', firebaseAdminConfig.clientEmail],
    ['FIREBASE_ADMIN_PRIVATE_KEY', firebaseAdminConfig.privateKey]
  ]
    .filter(([, value]) => !value)
    .map(([field]) => field);

  if (!required && !hasAnyFirebaseAdminConfig()) {
    return false;
  }

  if (missingFields.length > 0) {
    throw new Error(
      `Missing Firebase Admin configuration: ${missingFields.join(', ')}. Please check your .env file.`
    );
  }

  return true;
}

export default firebaseConfig;
