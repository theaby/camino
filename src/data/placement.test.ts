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

  it('starts B1 after A1 and A2, and C2 after every earlier level', () => {
    expect(startingLevel(answersFor((level) => level === 'A1' || level === 'A2'))).toBe('B1')
    expect(startingLevel(answersFor((level) => level !== 'C1' && level !== 'C2'))).toBe('C1')
    expect(startingLevel(answersFor((level) => level !== 'C2'))).toBe('C2')
    expect(startingLevel(answersFor(() => true))).toBe('C2')
  })

  it('needs at least two thirds to test out of a level', () => {
    const items = itemsForLevel(testOutItems, 'B1')
    const right = Object.fromEntries(items.map((item) => [item.id, item.answer]))
    expect(quizCleared(items, right)).toBe(true)
    const wrong = (item: (typeof items)[number]) => item.options.find((option) => option !== item.answer) ?? ''
    // One miss still clears; miss enough that correct*3 < length*2 fails the gate.
    const missOne = { ...right, [items[0]!.id]: wrong(items[0]!) }
    expect(quizCleared(items, missOne)).toBe(true)
    const fail: Record<string, string> = { ...right }
    const needWrong = Math.floor(items.length / 3) + 1
    for (let i = 0; i < needWrong; i++) fail[items[i]!.id] = wrong(items[i]!)
    expect(quizCleared(items, fail)).toBe(false)
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

  it('includes deep-B1 advice and reported speech in placement and test-out banks', () => {
    const placeB1 = itemsForLevel(placementItems, 'B1')
    const outB1 = itemsForLevel(testOutItems, 'B1')
    expect(placeB1.map((item) => item.answer)).toEqual(
      expect.arrayContaining(['Deberías descansar', 'Dijo que llegaría tarde']),
    )
    expect(outB1.map((item) => item.answer)).toEqual(
      expect.arrayContaining(['te recomiendo', 'por eso', 'equipaje']),
    )
  })

  it('includes deep-B2 emotion/cuando and deep-C1 condition/register in placement and test-out banks', () => {
    const placeB2 = itemsForLevel(placementItems, 'B2')
    const outB2 = itemsForLevel(testOutItems, 'B2')
    const placeC1 = itemsForLevel(placementItems, 'C1')
    const outC1 = itemsForLevel(testOutItems, 'C1')
    expect(placeB2.map((item) => item.answer)).toEqual(
      expect.arrayContaining(['Me alegra que vengas', 'Cuando llegues, llámame']),
    )
    expect(outB2.map((item) => item.answer)).toEqual(
      expect.arrayContaining(['lo que', 'es decir', 'en cuanto']),
    )
    expect(placeC1.map((item) => item.answer)).toEqual(
      expect.arrayContaining(['con tal de que', 'como si fuera experto']),
    )
    expect(outC1.map((item) => item.answer)).toEqual(
      expect.arrayContaining(['por más que', 'por consiguiente', 'Quería que vinieras']),
    )
  })

  it('includes C2 cohesion, hedge, idiom, and genre items in placement and test-out banks', () => {
    const placeC2 = itemsForLevel(placementItems, 'C2')
    const outC2 = itemsForLevel(testOutItems, 'C2')
    expect(placeC2.map((item) => item.answer)).toEqual(
      expect.arrayContaining(['cabría decir', 'dar en el clavo', 'lo cual', 'matizar']),
    )
    expect(outC2.map((item) => item.answer)).toEqual(
      expect.arrayContaining(['cohesión', 'en cierta medida', 'resumen', 'habrá hecho']),
    )
  })
})

describe('course validation', () => {
  it('accepts the full path', () => {
    expect(validateCourse()).toEqual([])
  })
})
