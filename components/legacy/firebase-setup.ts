// ==============================================================================
// FIREBASE SETUP - Complete Configuration
// ==============================================================================
// File: lib/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// ==============================================================================
// FIREBASE CONFIG - Add your credentials here
// ==============================================================================

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export default app;

// ==============================================================================
// FIRESTORE COLLECTIONS SCHEMA
// ==============================================================================

/*
DATABASE STRUCTURE (Firestore):

1. users/
   ├── {userId}
   │   ├── email: string
   │   ├── displayName: string
   │   ├── role: 'admin' | 'employee' | 'viewer'
   │   ├── createdAt: timestamp
   │   └── updatedAt: timestamp

2. properties/
   ├── {propertyId}
   │   ├── title: string
   │   ├── price: number
   │   ├── currency: 'EGP' | 'USD'
   │   ├── pricePerM2: number
   │   ├── bedrooms: number
   │   ├── bathrooms: number
   │   ├── area: number (sqm)
   │   ├── furnishing: 'furnished' | 'unfurnished' | 'semi'
   │   ├── type: 'villa' | 'apartment' | 'penthouse' | 'townhouse'
   │   ├── location: { lat: number, lng: number, address: string }
   │   ├── compound: string (reference to compound)
   │   ├── images: string[] (URLs)
   │   ├── status: 'available' | 'reserved' | 'sold'
   │   ├── agentId: string (reference to employees/{employeeId})
   │   ├── featured: boolean
   │   ├── createdAt: timestamp
   │   ├── updatedAt: timestamp
   │   └── freshnessDate: timestamp

3. leads/
   ├── {leadId}
   │   ├── clientName: string
   │   ├── email: string
   │   ├── phone: string
   │   ├── preferredContact: 'email' | 'phone' | 'whatsapp'
   │   ├── budget: { min: number, max: number, currency: string }
   │   ├── preferredAreas: string[]
   │   ├── preferredBedrooms: { min: number, max: number }
   │   ├── investmentGoal: 'buy' | 'rent' | 'invest'
   │   ├── status: 'new' | 'contacted' | 'qualified' | 'viewing' | 'negotiating' | 'closed'
   │   ├── assignedEmployeeId: string
   │   ├── matchedProperties: { propertyId, score, matchedAt }[]
   │   ├── notes: string
   │   ├── createdAt: timestamp
   │   ├── updatedAt: timestamp
   │   └── lastContactedAt: timestamp

4. employees/
   ├── {employeeId}
   │   ├── name: string
   │   ├── email: string
   │   ├── phone: string
   │   ├── role: 'manager' | 'agent' | 'admin'
   │   ├── assignedLeads: string[] (leadIds)
   │   ├── assignedProperties: string[] (propertyIds)
   │   ├── totalSales: number
   │   ├── totalRevenue: number
   │   ├── commission: number
   │   ├── active: boolean
   │   ├── createdAt: timestamp
   │   └── updatedAt: timestamp

5. sales/
   ├── {saleId}
   │   ├── propertyId: string
   │   ├── leadId: string
   │   ├── agentId: string
   │   ├── salePrice: number
   │   ├── commission: number
   │   ├── saleDate: timestamp
   │   ├── status: 'negotiation' | 'contract' | 'closed'
   │   ├── createdAt: timestamp
   │   └── updatedAt: timestamp

6. compounds/
   ├── {compoundId}
   │   ├── name: string
   │   ├── location: { lat: number, lng: number }
   │   ├── area: string ('New Cairo', 'Golden Square', etc)
   │   ├── description: string
   │   ├── developer: string
   │   ├── averagePrice: number
   │   ├── createdAt: timestamp
   │   └── updatedAt: timestamp

7. notifications/
   ├── {notificationId}
   │   ├── userId: string
   │   ├── type: 'new_lead' | 'property_updated' | 'sale_closed' | 'assignment'
   │   ├── title: string
   │   ├── message: string
   │   ├── link: string (optional)
   │   ├── read: boolean
   │   ├── createdAt: timestamp
   │   └── expiresAt: timestamp

*/

// ==============================================================================
// FIRESTORE SECURITY RULES
// ==============================================================================

/*
COPY THIS TO: Firebase Console > Firestore > Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    function isEmployee() {
      let userRole = get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
      return isAuthenticated() && (userRole == 'admin' || userRole == 'employee');
    }

    function isViewer() {
      return isAuthenticated();
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow write: if isAdmin();
      allow create: if isAuthenticated();
    }

    // Properties collection - Public read, Employee write
    match /properties/{propertyId} {
      allow read: if true; // Public can read
      allow create: if isEmployee();
      allow update: if isEmployee();
      allow delete: if isAdmin();
    }

    // Leads collection - Employee only
    match /leads/{leadId} {
      allow read: if isEmployee() || request.auth.uid == resource.data.clientId;
      allow create: if isAuthenticated();
      allow update: if isEmployee();
      allow delete: if isAdmin();
    }

    // Employees collection
    match /employees/{employeeId} {
      allow read: if isAuthenticated() && (request.auth.uid == employeeId || isAdmin());
      allow write: if isAdmin();
    }

    // Sales collection
    match /sales/{saleId} {
      allow read: if isEmployee();
      allow create: if isEmployee();
      allow update: if isEmployee();
      allow delete: if isAdmin();
    }

    // Compounds collection - Public read, Admin write
    match /compounds/{compoundId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Notifications collection
    match /notifications/{notificationId} {
      allow read: if isAuthenticated() && request.auth.uid == resource.data.userId;
      allow create: if isAuthenticated();
      allow delete: if request.auth.uid == resource.data.userId || isAdmin();
    }
  }
}

*/

// ==============================================================================
// FIREBASE STORAGE RULES
// ==============================================================================

/*
COPY THIS TO: Firebase Console > Storage > Rules

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Property images - Public read, authenticated write
    match /properties/{propertyId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
      allow delete: if request.auth != null;
    }

    // User uploads - Personal storage
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
      allow delete: if request.auth.uid == userId;
    }

    // Temporary uploads
    match /temp/{allPaths=**} {
      allow read, write: if request.auth != null;
    }

    // Deny everything else
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}

*/

// ==============================================================================
// FIRESTORE INDEXES
// ==============================================================================

/*
CREATE THESE COMPOSITE INDEXES in Firebase Console > Firestore > Indexes

1. properties collection
   - status (Ascending)
   - createdAt (Descending)

2. properties collection
   - featured (Descending)
   - createdAt (Descending)

3. leads collection
   - assignedEmployeeId (Ascending)
   - status (Ascending)

4. leads collection
   - status (Ascending)
   - createdAt (Descending)

5. sales collection
   - agentId (Ascending)
   - saleDate (Descending)

*/

// ==============================================================================
// TYPE DEFINITIONS (TypeScript)
// ==============================================================================

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'employee' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  currency: 'EGP' | 'USD';
  pricePerM2: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnishing: 'furnished' | 'unfurnished' | 'semi';
  type: 'villa' | 'apartment' | 'penthouse' | 'townhouse';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  compound: string;
  images: string[];
  status: 'available' | 'reserved' | 'sold';
  agentId: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  freshnessDate: Date;
}

export interface Lead {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  preferredAreas: string[];
  preferredBedrooms: {
    min: number;
    max: number;
  };
  investmentGoal: 'buy' | 'rent' | 'invest';
  status: 'new' | 'contacted' | 'qualified' | 'viewing' | 'negotiating' | 'closed';
  assignedEmployeeId: string;
  matchedProperties: Array<{
    propertyId: string;
    score: number;
    matchedAt: Date;
  }>;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt?: Date;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'manager' | 'agent' | 'admin';
  assignedLeads: string[];
  assignedProperties: string[];
  totalSales: number;
  totalRevenue: number;
  commission: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sale {
  id: string;
  propertyId: string;
  leadId: string;
  agentId: string;
  salePrice: number;
  commission: number;
  saleDate: Date;
  status: 'negotiation' | 'contract' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Compound {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  area: string;
  description: string;
  developer: string;
  averagePrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_lead' | 'property_updated' | 'sale_closed' | 'assignment';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: Date;
  expiresAt: Date;
}

// ==============================================================================
// HELPER FUNCTIONS
// ==============================================================================

export const createUser = async (
  auth: Auth,
  db: Firestore,
  email: string,
  password: string,
  displayName: string,
  role: 'admin' | 'employee' | 'viewer'
) => {
  // This should be done via Firebase Cloud Function for security
  // Frontend calls /api/auth/register with email, password, displayName
};

export const getPropertyById = async (db: Firestore, propertyId: string) => {
  // Fetch single property
};

export const searchProperties = async (
  db: Firestore,
  filters: {
    status?: string;
    compound?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
  }
) => {
  // Search properties with filters
};

// ==============================================================================
// ENVIRONMENT VARIABLES (.env.local)
// ==============================================================================

/*
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

*/
