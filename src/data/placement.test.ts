import { describe, expect, it } from 'vitest'
import { lessonIdsBefore, lessonsInLevel } from './catalog'
import { grantLessons } from '../lib/progress'
import { emptyProgress } from '../lib/progress'
import { placementItems, quizCleared, startingLevel, testOutItems, itemsForLevel } from './placement'
import { validateCourse } from './validateCourse'

function answersFor(pattern: (level: string) => boolean): Record<string, string> {
  const answers: Record<string, string> = {}
  for (const item of placementItems) {
    answers[item.id] = pattern(item.level) ? item.answer : item.options.find((option) => option !== item.answer) ?? ''
  }
  return answers
}

describe('placement', () => {
  it('keeps a learner at A1 when the basics are missed', () => {
    expect(startingLevel(answersFor(() => false))).toBe('A1')
    expect(lessonIdsBefore('A1')).toEqual([])
  })

  it('skips A1 when only A1 items are right', () => {
    expect(startingLevel(answersFor((level) => level === 'A1'))).toBe('A2')
    const progress = grantLessons(emptyProgress(), lessonIdsBefore('A2'))
    expect(progress.xp).toBe(0)
    expect(progress.completedLessons).toEqual(lessonsInLevel('A1').map((lesson) => lesson.id))
    expect(progress.completedLessons).toContain('greetings-hello')
    expect(progress.completedLessons).not.toContain('a2-pret-ar')
  })

  it('does not skip a missed foundation just because a later level was right', () => {
    expect(startingLevel(answersFor((level) => level === 'C1'))).toBe('A1')
  })

  it('starts B1 after A1 and A2, and C1 after every earlier level', () => {
    expect(startingLevel(answersFor((level) => level === 'A1' || level === 'A2'))).toBe('B1')
    expect(startingLevel(answersFor((level) => level !== 'C1'))).toBe('C1')
    expect(startingLevel(answersFor(() => true))).toBe('C1')
  })

  it('needs at least two thirds to test out of a level', () => {
    const items = itemsForLevel(testOutItems, 'B1')
    const right = Object.fromEntries(items.map((item) => [item.id, item.answer]))
    expect(quizCleared(items, right)).toBe(true)
    const two = { ...right, [items[0]!.id]: items[0]!.options.find((option) => option !== items[0]!.answer) ?? '' }
    const one = { ...two, [items[1]!.id]: items[1]!.options.find((option) => option !== items[1]!.answer) ?? '' }
    expect(quizCleared(items, two)).toBe(true)
    expect(quizCleared(items, one)).toBe(false)
  })

  it('includes deep-A1 notions in placement and test-out banks', () => {
    const placeA1 = itemsForLevel(placementItems, 'A1')
    const outA1 = itemsForLevel(testOutItems, 'A1')
    expect(placeA1.some((item) => item.answer.includes('duele') || item.answer.includes('hay'))).toBe(true)
    expect(outA1.map((item) => item.answer)).toEqual(
      expect.arrayContaining(['cocina', 'Llevo una camisa', 'quince', 'Mi dirección es…']),
    )
  })

  it('includes deep-A2 commands and pronouns in placement and test-out banks', () => {
    const placeA2 = itemsForLevel(placementItems, 'A2')
    const outA2 = itemsForLevel(testOutItems, 'A2')
    expect(placeA2.map((item) => item.answer)).toEqual(expect.arrayContaining(['¡No vayas!', 'Se lo doy']))
    expect(outA2.map((item) => item.answer)).toEqual(expect.arrayContaining(['Ven', 'Me das', 'fútbol']))
  })
})

describe('course validation', () => {
  it('accepts the full path', () => {
    expect(validateCourse()).toEqual([])
  })
})
