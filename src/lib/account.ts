import {
  emptyProgress,
  sanitizeProgress,
  XP_LESSON_BONUS,
  type LessonStat,
  type Progress,
  type SrsCard,
} from './progress'

export const LINK_KEY = 'camino.accountLink.v1'
export const LAST_UID_KEY = 'camino.lastUid'
const CACHE_PREFIX = 'camino.accountCache.v1.'

export type GuestExtra = {
  progress: Progress
  /** True when this is only the change since a previous merge, not the whole guest file. */
  isDelta: boolean
}

export type FirebaseWebConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  appId: string
  storageBucket?: string
  messagingSenderId?: string
}

export function firebaseConfigFrom(env: Record<string, string | undefined>): FirebaseWebConfig | null {
  const apiKey = env.VITE_FIREBASE_API_KEY?.trim()
  const authDomain = env.VITE_FIREBASE_AUTH_DOMAIN?.trim()
  const projectId = env.VITE_FIREBASE_PROJECT_ID?.trim()
  const appId = env.VITE_FIREBASE_APP_ID?.trim()
  if (!apiKey || !authDomain || !projectId || !appId) return null
  const storageBucket = env.VITE_FIREBASE_STORAGE_BUCKET?.trim()
  const messagingSenderId = env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim()
  return {
    apiKey,
    authDomain,
    projectId,
    appId,
    ...(storageBucket ? { storageBucket } : {}),
    ...(messagingSenderId ? { messagingSenderId } : {}),
  }
}

export function normalizeProgress(progress: Progress): Progress {
  const cards = Object.fromEntries(Object.entries(progress.cards).sort(([a], [b]) => a.localeCompare(b)))
  const lessonStats = Object.fromEntries(
    Object.entries(progress.lessonStats).sort(([a], [b]) => a.localeCompare(b)),
  )
  return {
    ...progress,
    completedLessons: [...new Set(progress.completedLessons)].sort(),
    cards,
    lessonStats,
  }
}

export function progressKey(progress: Progress): string {
  return JSON.stringify(normalizeProgress(progress))
}

/** What the guest file has gained since the last time it was merged into an account. */
export function guestContribution(baseline: Progress | null, current: Progress): GuestExtra {
  if (!baseline) return { progress: normalizeProgress(current), isDelta: false }
  const known = new Set(baseline.completedLessons)
  const cards: Record<string, SrsCard> = {}
  for (const [id, card] of Object.entries(current.cards)) {
    const previous = baseline.cards[id]
    if (!previous || card.due !== previous.due || card.lapses !== previous.lapses || card.interval !== previous.interval) {
      cards[id] = card
    }
  }
  const lessonStats: Record<string, LessonStat> = {}
  for (const [id, stat] of Object.entries(current.lessonStats)) {
    const previous = baseline.lessonStats[id]
    if (!previous || stat.clears !== previous.clears || stat.correct !== previous.correct || stat.at !== previous.at) {
      lessonStats[id] = stat
    }
  }
  const practicedLater = (current.lastPractice ?? '') > (baseline.lastPractice ?? '')
  const sameDaily = current.dailyXpDate !== null && current.dailyXpDate === baseline.dailyXpDate
  return {
    isDelta: true,
    progress: normalizeProgress({
      xp: Math.max(0, current.xp - baseline.xp),
      streak: practicedLater ? current.streak : 0,
      lastPractice: practicedLater ? current.lastPractice : null,
      dailyXp: sameDaily ? Math.max(0, current.dailyXp - baseline.dailyXp) : current.dailyXp,
      dailyXpDate:
        current.dailyXpDate && current.dailyXpDate >= (baseline.dailyXpDate ?? '') ? current.dailyXpDate : null,
      completedLessons: current.completedLessons.filter((id) => !known.has(id)),
      lessonStats,
      cards,
      sound: current.sound,
      welcomed: current.welcomed,
    }),
  }
}

function preferCard(current: SrsCard | undefined, incoming: SrsCard): SrsCard {
  if (!current) return incoming
  if (incoming.lapses !== current.lapses) return incoming.lapses > current.lapses ? incoming : current
  if (incoming.due !== current.due) return incoming.due < current.due ? incoming : current
  return incoming.interval < current.interval ? incoming : current
}

function preferStat(current: LessonStat | undefined, incoming: LessonStat): LessonStat {
  if (!current) return incoming
  if (incoming.clears !== current.clears) return incoming.clears > current.clears ? incoming : current
  if (incoming.at !== current.at) return incoming.at > current.at ? incoming : current
  return incoming.correct >= current.correct ? incoming : current
}

function combinedXp(remote: Progress, extra: Progress, isDelta: boolean): number {
  if (isDelta) return remote.xp + extra.xp
  const high = remote.xp >= extra.xp ? remote : extra
  const low = high === remote ? extra : remote
  // A played lesson has a stat. Placement and test-out only add the id, so they must not invent XP.
  const onlyLow = low.completedLessons.filter((id) => !high.completedLessons.includes(id) && low.lessonStats[id])
  return high.xp + onlyLow.length * XP_LESSON_BONUS
}

function combinedDaily(remote: Progress, extra: Progress, isDelta: boolean): Pick<Progress, 'dailyXp' | 'dailyXpDate'> {
  if (!extra.dailyXpDate) return { dailyXp: remote.dailyXp, dailyXpDate: remote.dailyXpDate }
  if (!remote.dailyXpDate || extra.dailyXpDate > remote.dailyXpDate) {
    return { dailyXp: extra.dailyXp, dailyXpDate: extra.dailyXpDate }
  }
  if (extra.dailyXpDate < remote.dailyXpDate) {
    return { dailyXp: remote.dailyXp, dailyXpDate: remote.dailyXpDate }
  }
  return {
    dailyXp: isDelta ? remote.dailyXp + extra.dailyXp : Math.max(remote.dailyXp, extra.dailyXp),
    dailyXpDate: remote.dailyXpDate,
  }
}

function combinedStreak(remote: Progress, extra: Progress): Pick<Progress, 'streak' | 'lastPractice'> {
  if (!extra.lastPractice) return { streak: remote.streak, lastPractice: remote.lastPractice }
  if (!remote.lastPractice || extra.lastPractice > remote.lastPractice) {
    return { streak: extra.streak > 0 ? extra.streak : 1, lastPractice: extra.lastPractice }
  }
  if (extra.lastPractice < remote.lastPractice) {
    return { streak: remote.streak, lastPractice: remote.lastPractice }
  }
  return { streak: Math.max(remote.streak, extra.streak), lastPractice: remote.lastPractice }
}

/** Fold guest progress into the account document without dropping lessons or review cards. */
export function mergeAccount(remote: Progress, extra: Progress, isDelta: boolean): Progress {
  const cards = { ...remote.cards }
  for (const [id, card] of Object.entries(extra.cards)) cards[id] = preferCard(cards[id], card)
  const lessonStats = { ...remote.lessonStats }
  for (const [id, stat] of Object.entries(extra.lessonStats)) lessonStats[id] = preferStat(lessonStats[id], stat)
  const daily = combinedDaily(remote, extra, isDelta)
  return normalizeProgress({
    xp: combinedXp(remote, extra, isDelta),
    ...combinedStreak(remote, extra),
    ...daily,
    completedLessons: [...new Set([...remote.completedLessons, ...extra.completedLessons])],
    lessonStats,
    cards,
    sound: extra.sound,
    welcomed: remote.welcomed || extra.welcomed,
  })
}

export function emptyAccount(): Progress {
  return emptyProgress()
}

function storage(): Storage | null {
  try {
    if (typeof localStorage === 'undefined') return null
    return localStorage
  } catch {
    return null
  }
}

export function loadLink(): Progress | null {
  const store = storage()
  if (!store) return null
  try {
    const raw = store.getItem(LINK_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { guest?: unknown }
    if (!parsed.guest || typeof parsed.guest !== 'object') return null
    return normalizeProgress(sanitizeProgress(parsed.guest))
  } catch {
    return null
  }
}

export function saveLink(guest: Progress): void {
  storage()?.setItem(LINK_KEY, JSON.stringify({ guest: normalizeProgress(guest) }))
}

export function accountCacheKey(uid: string): string {
  return `${CACHE_PREFIX}${uid}`
}

export function loadAccountCache(uid: string): Progress | null {
  const store = storage()
  if (!store) return null
  try {
    const raw = store.getItem(accountCacheKey(uid))
    if (!raw) return null
    return normalizeProgress(sanitizeProgress(JSON.parse(raw)))
  } catch {
    return null
  }
}

export function saveAccountCache(uid: string, progress: Progress): void {
  try {
    storage()?.setItem(accountCacheKey(uid), JSON.stringify(normalizeProgress(progress)))
  } catch {
    // A full disk should not block a lesson.
  }
}

export function rememberUid(uid: string | null): void {
  const store = storage()
  if (!store) return
  if (uid) store.setItem(LAST_UID_KEY, uid)
  else store.removeItem(LAST_UID_KEY)
}
