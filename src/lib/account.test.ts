import { describe, expect, it } from 'vitest'
import { lessonIdsBefore, lessonsInLevel } from '../data/catalog'
import { emptyProgress, grantLessons, type Progress } from './progress'
import { firebaseConfigFrom, guestContribution, mergeAccount } from './account'

function progress(partial: Partial<Progress>): Progress {
  return { ...emptyProgress(), ...partial }
}

describe('firebase config', () => {
  it('stays guest-only until the public web config is complete', () => {
    expect(firebaseConfigFrom({})).toBeNull()
    expect(firebaseConfigFrom({ VITE_FIREBASE_API_KEY: 'k', VITE_FIREBASE_PROJECT_ID: 'p' })).toBeNull()
    expect(
      firebaseConfigFrom({
        VITE_FIREBASE_API_KEY: 'k',
        VITE_FIREBASE_AUTH_DOMAIN: 'app.firebaseapp.com',
        VITE_FIREBASE_PROJECT_ID: 'p',
        VITE_FIREBASE_APP_ID: '1:web',
      })?.projectId,
    ).toBe('p')
  })
})

describe('account merge', () => {
  it('keeps guest lessons and review cards on the first sign-in', () => {
    const remote = progress({
      xp: 40,
      completedLessons: ['greetings-hello'],
      cards: { hola: { vocabId: 'hola', interval: 1, due: '2026-11-10', lapses: 1 } },
      streak: 2,
      lastPractice: '2026-11-03',
    })
    const guest = progress({
      xp: 30,
      completedLessons: ['numbers-1'],
      lessonStats: { 'numbers-1': { correct: 8, total: 10, at: '2026-11-04', clears: 1 } },
      cards: { adios: { vocabId: 'adios', interval: 0, due: '2026-11-04', lapses: 2 } },
      streak: 1,
      lastPractice: '2026-11-04',
      sound: false,
    })
    const merged = mergeAccount(remote, guest, false)
    expect(merged.completedLessons).toEqual(['greetings-hello', 'numbers-1'])
    expect(merged.cards.hola?.due).toBe('2026-11-10')
    expect(merged.cards.adios?.lapses).toBe(2)
    expect(merged.xp).toBe(40 + 20)
    expect(merged.lastPractice).toBe('2026-11-04')
    expect(merged.sound).toBe(false)
  })

  it('does not add the same guest xp again after it has been linked', () => {
    const guest = progress({ xp: 80, completedLessons: ['greetings-hello'], streak: 1, lastPractice: '2026-11-04' })
    const first = guestContribution(null, guest)
    expect(first.isDelta).toBe(false)
    const account = mergeAccount(emptyProgress(), first.progress, first.isDelta)
    const again = guestContribution(guest, guest)
    expect(again.progress.xp).toBe(0)
    expect(again.progress.completedLessons).toEqual([])
    const second = mergeAccount(account, again.progress, again.isDelta)
    expect(second.xp).toBe(account.xp)
    expect(second.completedLessons).toEqual(['greetings-hello'])
  })

  it('adds only the guest work done after sign-out', () => {
    const baseline = progress({ xp: 80, completedLessons: ['greetings-hello'], dailyXp: 80, dailyXpDate: '2026-11-04' })
    const later = progress({
      xp: 110,
      completedLessons: ['greetings-hello', 'greetings-how'],
      dailyXp: 30,
      dailyXpDate: '2026-11-05',
      cards: { gracias: { vocabId: 'gracias', interval: 0, due: '2026-11-05', lapses: 1 } },
      streak: 2,
      lastPractice: '2026-11-05',
    })
    const extra = guestContribution(baseline, later)
    const remote = progress({
      xp: 80,
      completedLessons: ['greetings-hello'],
      dailyXp: 80,
      dailyXpDate: '2026-11-04',
      streak: 1,
      lastPractice: '2026-11-04',
    })
    const merged = mergeAccount(remote, extra.progress, extra.isDelta)
    expect(merged.xp).toBe(110)
    expect(merged.completedLessons).toEqual(['greetings-hello', 'greetings-how'])
    expect(merged.cards.gracias?.lapses).toBe(1)
    expect(merged.dailyXp).toBe(30)
    expect(merged.dailyXpDate).toBe('2026-11-05')
    expect(merged.streak).toBe(2)
  })

  it('keeps the more urgent copy of a shared review card', () => {
    const remote = progress({
      cards: { hola: { vocabId: 'hola', interval: 7, due: '2026-12-01', lapses: 1 } },
    })
    const extra = progress({
      cards: { hola: { vocabId: 'hola', interval: 0, due: '2026-11-04', lapses: 3 } },
    })
    expect(mergeAccount(remote, extra, true).cards.hola).toMatchObject({ lapses: 3, due: '2026-11-04' })
  })

  it('carries placement and test-out lesson ids without inventing XP', () => {
    const placed = grantLessons(emptyProgress(), lessonIdsBefore('A2'))
    expect(placed.xp).toBe(0)
    expect(placed.completedLessons).toContain('a1-ask')
    expect(placed.completedLessons).not.toContain('a2-pret-ar')

    const first = guestContribution(null, placed)
    const remote = progress({ xp: 20, completedLessons: ['greetings-hello'] })
    const account = mergeAccount(remote, first.progress, first.isDelta)
    expect(account.xp).toBe(20)
    expect(account.completedLessons).toEqual([...new Set(placed.completedLessons)].sort())

    const tested = grantLessons(placed, lessonsInLevel('B1').map((lesson) => lesson.id))
    const delta = guestContribution(placed, tested)
    expect(delta.isDelta).toBe(true)
    expect(delta.progress.xp).toBe(0)
    expect(delta.progress.completedLessons).toEqual(lessonsInLevel('B1').map((lesson) => lesson.id).sort())
    const synced = mergeAccount(account, delta.progress, delta.isDelta)
    expect(synced.xp).toBe(20)
    expect(synced.completedLessons).toContain('b1-story')
    expect(synced.completedLessons).toContain('a1-ask')
  })
})
