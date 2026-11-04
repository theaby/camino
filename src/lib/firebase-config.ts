import { firebaseConfigFrom, type FirebaseWebConfig } from './account'

export function readFirebaseConfig(): FirebaseWebConfig | null {
  return firebaseConfigFrom(import.meta.env as Record<string, string | undefined>)
}

export function emulatorRequested(): boolean {
  return import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true'
}
