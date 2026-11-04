import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from 'firebase/firestore'
import { emulatorRequested, readFirebaseConfig } from './firebase-config'

export type FirebaseServices = {
  app: FirebaseApp
  auth: Auth
  db: Firestore
}

let services: FirebaseServices | null | undefined

function openFirestore(app: FirebaseApp): Firestore {
  const attempts = [
    () =>
      initializeFirestore(app, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
      }),
    () => initializeFirestore(app, { localCache: persistentLocalCache() }),
    () => getFirestore(app),
  ]
  let last: unknown
  for (const attempt of attempts) {
    try {
      return attempt()
    } catch (error) {
      last = error
    }
  }
  throw last
}

/** Returns null when the public web config was not provided at build time. */
export function getFirebase(): FirebaseServices | null {
  if (services !== undefined) return services
  const config = readFirebaseConfig()
  if (!config) {
    services = null
    return null
  }
  try {
    const app = initializeApp(config)
    const auth = getAuth(app)
    const db = openFirestore(app)
    if (emulatorRequested()) {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
      connectFirestoreEmulator(db, '127.0.0.1', 8080)
    }
    services = { app, auth, db }
  } catch {
    services = null
  }
  return services
}
