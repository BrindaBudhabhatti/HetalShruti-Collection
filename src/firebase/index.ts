'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = isConfigured ? getApp() : initializeApp(firebaseConfig);

  return getSdks(firebaseApp, {isConfigured});
}

export function getSdks(firebaseApp: FirebaseApp, options?: {isConfigured: boolean}) {
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  if (process.env.NEXT_PUBLIC_EMULATOR_HOST && !options?.isConfigured) {
    const host = process.env.NEXT_PUBLIC_EMULATOR_HOST;
    // Important: the emulator port must be a number, not a string.
    // The value is provided by the NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT variable.
    const port = parseInt(process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT || '');
    if (!port) {
      console.warn(
        `Could not connect to Emulator. Did you set the NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT environment variable?`
      );
    } else {
      console.log(`Connecting to Firestore emulator at ${host}:${port}`);
      connectFirestoreEmulator(firestore, host, port);
    }
  }

  if (process.env.NEXT_PUBLIC_EMULATOR_HOST && !options?.isConfigured) {
    const host = `http://${process.env.NEXT_PUBLIC_EMULATOR_HOST}:9099`;
    console.log(`Connecting to Auth emulator at ${host}`);
    connectAuthEmulator(auth, host);
  }
  
  return {
    firebaseApp,
    auth,
    firestore,
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
