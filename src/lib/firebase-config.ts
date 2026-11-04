import { firebaseConfigFrom, type FirebaseWebConfig } from './account'

/** Public web-client config for the camino-ce661 project. Safe to ship in the bundle. */
export const firebaseDefaults: FirebaseWebConfig = {
  apiKey: 'AIzaSyCVlCPwqyiS8TtbSwDqq_b-42fJ_Zo22XM',
  authDomain: 'camino-ce661.firebaseapp.com',
  projectId: 'camino-ce661',
  storageBucket: 'camino-ce661.firebasestorage.app',
  messagingSenderId: '991720747765',
  appId: '1:991720747765:web:c761228d95f28399d30bbc',
}

/**
 * A complete VITE_FIREBASE_* set wins. Otherwise a production build uses the
 * committed project, and dev/test stay unconfigured unless the emulator script
 * or a local env file supplies its own values.
 */
export function resolveFirebaseConfig(env: Record<string, string | undefined>, prod: boolean): FirebaseWebConfig | null {
  return firebaseConfigFrom(env) ?? (prod ? firebaseDefaults : null)
}

export function readFirebaseConfig(): FirebaseWebConfig | null {
  return resolveFirebaseConfig(import.meta.env as Record<string, string | undefined>, import.meta.env.PROD)
}

export function emulatorRequested(): boolean {
  return import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true'
}
