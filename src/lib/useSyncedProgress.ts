import { useCallback, useEffect, useRef, useState, type SetStateAction } from 'react'
import type { User } from 'firebase/auth'
import { doc, getDoc, getDocFromServer, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore'
import {
  guestContribution,
  loadAccountCache,
  loadLink,
  mergeAccount,
  progressKey,
  rememberUid,
  saveAccountCache,
  saveLink,
} from './account'
import { getFirebase } from './firebase'
import { emptyProgress, loadProgress, saveProgress, sanitizeProgress, type Progress } from './progress'

export type SyncState = 'guest' | 'loading' | 'synced' | 'cached'

function fromDoc(data: unknown): Progress {
  return sanitizeProgress(data)
}

async function loadRemote(uid: string): Promise<{ progress: Progress; fromServer: boolean }> {
  const fallback = loadAccountCache(uid) ?? emptyProgress()
  const firebase = getFirebase()
  if (!firebase) return { progress: fallback, fromServer: false }
  const ref = doc(firebase.db, 'users', uid)
  try {
    const snap = await Promise.race([
      getDocFromServer(ref),
      new Promise<never>((_, reject) => {
        window.setTimeout(() => reject(new Error('timeout')), 4000)
      }),
    ])
    return { progress: snap.exists() ? fromDoc(snap.data()) : fallback, fromServer: true }
  } catch {
    try {
      const snap = await getDoc(ref)
      if (snap.exists()) return { progress: fromDoc(snap.data()), fromServer: false }
    } catch {
      // Cache miss while offline.
    }
    return { progress: fallback, fromServer: false }
  }
}

export function useSyncedProgress(user: User | null, authReady: boolean, configured: boolean) {
  const [progress, setProgressState] = useState<Progress>(() => loadProgress())
  const [syncState, setSyncState] = useState<SyncState>('guest')
  const progressRef = useRef(progress)
  progressRef.current = progress
  const userRef = useRef(user)
  userRef.current = user
  const authReadyRef = useRef(authReady)
  authReadyRef.current = authReady
  const readyUid = useRef<string | null>(null)
  const skipWrite = useRef(false)
  const lastWritten = useRef('')
  const previousUid = useRef<string | null | undefined>(undefined)
  const savedGuest = useRef(false)

  const setProgress = useCallback((update: SetStateAction<Progress>) => {
    setProgressState((prev) => {
      const next = typeof update === 'function' ? update(prev) : update
      if (authReadyRef.current && !userRef.current) saveProgress(next)
      return next
    })
  }, [])

  useEffect(() => {
    if (!authReady || user || savedGuest.current) return
    savedGuest.current = true
    saveProgress(progressRef.current)
  }, [authReady, user])

  useEffect(() => {
    if (!authReady) return
    const uid = user?.uid ?? null
    if (previousUid.current && !uid) {
      readyUid.current = null
      skipWrite.current = true
      setSyncState('guest')
      setProgressState(loadProgress())
    }
    previousUid.current = uid
  }, [authReady, user])

  useEffect(() => {
    if (!configured || !user) {
      readyUid.current = null
      if (!user && authReady) setSyncState('guest')
      return
    }
    const firebase = getFirebase()
    if (!firebase) return
    const uid = user.uid
    let cancelled = false
    let unsub = () => {}
    setSyncState('loading')

    void (async () => {
      const loaded = await loadRemote(uid)
      const remote = loaded.progress
      if (cancelled) return
      const guestNow = progressRef.current
      const extra = guestContribution(loadLink(), guestNow)
      const merged = mergeAccount(remote, extra.progress, extra.isDelta)
      saveLink(guestNow)
      rememberUid(uid)
      saveAccountCache(uid, merged)
      lastWritten.current = progressKey(merged)
      skipWrite.current = true
      readyUid.current = uid
      setProgressState(merged)
      setSyncState(loaded.fromServer || navigator.onLine ? 'synced' : 'cached')
      const ref = doc(firebase.db, 'users', uid)
      const waitingForWrite = progressKey(merged) !== progressKey(remote)
      if (waitingForWrite) {
        void setDoc(ref, { ...merged, updatedAt: serverTimestamp() }).catch(() => setSyncState('cached'))
      }
      let sawWrite = !waitingForWrite
      unsub = onSnapshot(
        ref,
        (snap) => {
          if (cancelled || !snap.exists()) return
          const incoming = fromDoc(snap.data())
          const key = progressKey(incoming)
          if (!sawWrite && key !== lastWritten.current) return
          sawWrite = true
          setSyncState(navigator.onLine ? 'synced' : 'cached')
          if (key === lastWritten.current) return
          lastWritten.current = key
          skipWrite.current = true
          saveAccountCache(uid, incoming)
          setProgressState(incoming)
        },
        () => setSyncState('cached'),
      )
    })()

    return () => {
      cancelled = true
      unsub()
      readyUid.current = null
    }
  }, [authReady, configured, user])

  useEffect(() => {
    if (!user || readyUid.current !== user.uid) return
    if (skipWrite.current) {
      skipWrite.current = false
      return
    }
    const firebase = getFirebase()
    if (!firebase) return
    const key = progressKey(progress)
    if (key === lastWritten.current) return
    lastWritten.current = key
    saveAccountCache(user.uid, progress)
    void setDoc(doc(firebase.db, 'users', user.uid), { ...progress, updatedAt: serverTimestamp() }).catch(() => {
      lastWritten.current = ''
      setSyncState('cached')
    })
  }, [progress, user])

  useEffect(() => {
    if (!user) return
    const onOnline = () => {
      const firebase = getFirebase()
      if (!firebase || readyUid.current !== user.uid) return
      void setDoc(doc(firebase.db, 'users', user.uid), { ...progressRef.current, updatedAt: serverTimestamp() }).catch(
        () => setSyncState('cached'),
      )
    }
    window.addEventListener('online', onOnline)
    return () => window.removeEventListener('online', onOnline)
  }, [user])

  return { progress, setProgress, syncState }
}
