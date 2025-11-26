import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// This is a separate initialization for server-side usage.
// It does not include client-side features like auth state listeners.

interface FirebaseAdminServices {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
}

export function initializeFirebaseAdmin(): FirebaseAdminServices {
  const appName = 'firebase-admin-app';
  // Check if the app is already initialized to avoid re-initializing
  const app = getApps().find(a => a.name === appName) || initializeApp(firebaseConfig, appName);

  const firestore = getFirestore(app);

  return {
    firebaseApp: app,
    firestore,
  };
}
