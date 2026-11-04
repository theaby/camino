import type { Grade } from './grade'

export const STORAGE_KEY = 'camino.progress.v1'
export const HEARTS_PER_LESSON = 5
export const DAILY_GOAL = 80
export const XP_CORRECT = 10
export const XP_LESSON_BONUS = 20
export const XP_REVIEW = 5

export type SrsCard = {
  vocabId: string
  interval: number
  due: string
  lapses: number
}

export type LessonStat = {
  correct: number
  total: number
  at: string
  clears: number
}

export type Progress = {
  xp: number
  streak: number
  lastPractice: string | null
  dailyXp: number
  dailyXpDate: string | null
  completedLessons: string[]
  lessonStats: Record<string, LessonStat>
  cards: Record<string, SrsCard>
  sound: boolean
  welcomed: boolean
}

export type SessionSummary = {
  outcome: 'complete' | 'hearts'
  correct: number
  graded: number
  grades: Grade[]
}

export function emptyProgress(): Progress {
  return {
    xp: 0,
    streak: 0,
    lastPractice: null,
    dailyXp: 0,
    dailyXpDate: null,
    completedLessons: [],
    lessonStats: {},
    cards: {},
    sound: true,
    welcomed: false,
  }
}

export function todayISO(now = new Date()): string {
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function addDays(iso: string, days: number): string {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(year!, (month ?? 1) - 1, day)
  date.setDate(date.getDate() + days)
  return todayISO(date)
}

export function nextInterval(current: number): number {
  if (current <= 0) return 1
  if (current === 1) return 3
  if (current < 7) return 7
  return Math.min(current * 2, 45)
}

export function dailyXpOn(progress: Progress, today: string): number {
  return progress.dailyXpDate === today ? progress.dailyXp : 0
}

function asNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0
}

function sanitizeCards(value: unknown): Record<string, SrsCard> {
  if (!value || typeof value !== 'object') return {}
  const cards: Record<string, SrsCard> = {}
  for (const [key, raw] of Object.entries(value)) {
    if (!raw || typeof raw !== 'object') continue
    const card = raw as Partial<SrsCard>
    if (typeof card.due !== 'string') continue
    cards[key] = {
      vocabId: typeof card.vocabId === 'string' ? card.vocabId : key,
      interval: asNumber(card.interval),
      due: card.due,
      lapses: asNumber(card.lapses),
    }
  }
  return cards
}

export function sanitizeProgress(value: unknown): Progress {
  const base = emptyProgress()
  if (!value || typeof value !== 'object') return base
  const raw = value as Partial<Progress>
  return {
    xp: asNumber(raw.xp),
    streak: asNumber(raw.streak),
    lastPractice: typeof raw.lastPractice === 'string' ? raw.lastPractice : null,
    dailyXp: asNumber(raw.dailyXp),
    dailyXpDate: typeof raw.dailyXpDate === 'string' ? raw.dailyXpDate : null,
    completedLessons: Array.isArray(raw.completedLessons)
      ? raw.completedLessons.filter((item): item is string => typeof item === 'string')
      : [],
    lessonStats:
      raw.lessonStats && typeof raw.lessonStats === 'object'
        ? (raw.lessonStats as Record<string, LessonStat>)
        : {},
    cards: sanitizeCards(raw.cards),
    sound: typeof raw.sound === 'boolean' ? raw.sound : true,
    welcomed: Boolean(raw.welcomed),
  }
}

export function loadProgress(): Progress {
  try {
    if (typeof localStorage === 'undefined') return emptyProgress()
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    return sanitizeProgress(JSON.parse(raw))
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(progress: Progress): void {
  try {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Private mode or a full disk should not crash a lesson.
  }
}

function addXp(state: Progress, amount: number, today: string): Progress {
  if (amount <= 0) {
    return state.dailyXpDate === today ? state : { ...state, dailyXp: 0, dailyXpDate: today }
  }
  const sameDay = state.dailyXpDate === today
  return {
    ...state,
    xp: state.xp + amount,
    dailyXp: (sameDay ? state.dailyXp : 0) + amount,
    dailyXpDate: today,
  }
}

export function bumpStreak(state: Progress, today: string): Progress {
  if (state.lastPractice === today) return state
  const continued = state.lastPractice === addDays(today, -1)
  return {
    ...state,
    streak: continued ? state.streak + 1 : 1,
    lastPractice: today,
  }
}

export function applyGrades(state: Progress, grades: readonly Grade[], today: string): Progress {
  let cards = state.cards
  for (const grade of grades) {
    const existing = cards[grade.vocabId]
    if (grade.correct) {
      if (!existing) continue
      const interval = nextInterval(existing.interval)
      cards = {
        ...cards,
        [grade.vocabId]: { ...existing, interval, due: addDays(today, interval) },
      }
      continue
    }
    cards = {
      ...cards,
      [grade.vocabId]: {
        vocabId: grade.vocabId,
        interval: 0,
        due: today,
        lapses: (existing?.lapses ?? 0) + 1,
      },
    }
  }
  return cards === state.cards ? state : { ...state, cards }
}

export function applyLessonResult(
  state: Progress,
  lessonId: string,
  summary: SessionSummary,
  today: string,
): { state: Progress; xpGained: number } {
  let next = applyGrades(state, summary.grades, today)
  const firstClear = summary.outcome === 'complete' && !state.completedLessons.includes(lessonId)
  const xpGained = summary.correct * XP_CORRECT + (firstClear ? XP_LESSON_BONUS : 0)
  next = addXp(next, xpGained, today)
  if (summary.graded > 0) next = bumpStreak(next, today)
  if (summary.outcome === 'complete' && !next.completedLessons.includes(lessonId)) {
    next = { ...next, completedLessons: [...next.completedLessons, lessonId] }
  }
  const previous = next.lessonStats[lessonId]
  next = {
    ...next,
    lessonStats: {
      ...next.lessonStats,
      [lessonId]: {
        correct: summary.correct,
        total: summary.graded,
        at: today,
        clears: (previous?.clears ?? 0) + (summary.outcome === 'complete' ? 1 : 0),
      },
    },
  }
  return { state: next, xpGained }
}

export function applyReviewResult(
  state: Progress,
  summary: SessionSummary,
  today: string,
): { state: Progress; xpGained: number } {
  let next = applyGrades(state, summary.grades, today)
  const xpGained = summary.correct * XP_REVIEW
  next = addXp(next, xpGained, today)
  if (summary.graded > 0) next = bumpStreak(next, today)
  return { state: next, xpGained }
}

export function resetProgress(previous: Progress): Progress {
  return { ...emptyProgress(), sound: previous.sound, welcomed: true }
}

export function dueVocabIds(progress: Progress, today: string): string[] {
  return Object.values(progress.cards)
    .filter((card) => card.due <= today)
    .sort((a, b) => b.lapses - a.lapses || a.due.localeCompare(b.due) || a.vocabId.localeCompare(b.vocabId))
    .map((card) => card.vocabId)
}

export function practiceVocabIds(progress: Progress, limit = 8): string[] {
  return Object.values(progress.cards)
    .sort((a, b) => a.due.localeCompare(b.due) || b.lapses - a.lapses)
    .slice(0, limit)
    .map((card) => card.vocabId)
}

export function missedVocabIds(grades: readonly Grade[]): string[] {
  const last = new Map<string, boolean>()
  for (const grade of grades) last.set(grade.vocabId, grade.correct)
  return [...last.entries()].filter(([, correct]) => !correct).map(([id]) => id)
}
