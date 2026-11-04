import { describe, expect, it } from 'vitest'
import { course, vocab } from '../data/course'
import { allLessons, isLessonUnlocked, vocabById } from '../data/catalog'
import { draftReady, settleExercise } from './grade'
import {
  addDays,
  applyLessonResult,
  applyReviewResult,
  bumpStreak,
  dailyXpOn,
  dueVocabIds,
  emptyProgress,
  nextInterval,
  sanitizeProgress,
  XP_LESSON_BONUS,
} from './progress'
import { buildReviewExercises } from './review'
import { answersMatch, conjugateMatch, markAnswer, normalize, speakMatch } from './text'

describe('answers', () => {
  it('ignores accents, case, and Spanish punctuation', () => {
    expect(normalize('  ¿Cómo estás? ')).toBe('como estas')
    expect(answersMatch('adios', 'Adiós')).toBe(true)
    expect(answersMatch('la estacion', 'estación', ['la estación'])).toBe(true)
    expect(answersMatch('hola amigo', 'adiós')).toBe(false)
    expect(conjugateMatch('hablé', 'hablé')).toBe(true)
    expect(conjugateMatch('hable', 'hablé')).toBe(false)
  })

  it('accepts a missing accent and flags it, and keeps ñ distinct from n', () => {
    expect(markAnswer('hablé', 'hablé')).toEqual({ match: true, missingMark: false })
    expect(markAnswer('hable', 'hablé')).toEqual({ match: true, missingMark: true })
    expect(markAnswer('como', 'como')).toEqual({ match: true, missingMark: false })
    expect(markAnswer('Mexico', 'México')).toEqual({ match: true, missingMark: true })
    expect(markAnswer('comí', 'hablé').match).toBe(false)
    expect(markAnswer('niño', 'niño')).toEqual({ match: true, missingMark: false })
    expect(markAnswer('nino', 'niño')).toEqual({ match: false, missingMark: false })
    expect(markAnswer('ano', 'año')).toEqual({ match: false, missingMark: false })
    const flagged = settleExercise(
      { id: 't', type: 'conjugate', prompt: 'yo (hablar)', answer: 'hablé', vocabIds: ['hable'] },
      { kind: 'conjugate', value: 'hable' },
    )
    expect(flagged.correct).toBe(true)
    expect(flagged.heart).toBe(false)
    expect(flagged.note).toMatch(/accent/)
    const exact = settleExercise(
      { id: 't2', type: 'type', direction: 'en-es', prompt: 'station', answer: 'estación', vocabIds: ['estacion'] },
      { kind: 'type', value: 'estación' },
    )
    expect(exact.correct).toBe(true)
    expect(exact.note).toBeUndefined()
  })

  it('accepts a heard phrase with extra words', () => {
    expect(speakMatch('hola amigo', 'Hola')).toBe(true)
    expect(speakMatch('buenos dias', 'Buenos días')).toBe(true)
    expect(speakMatch('quiero', 'quiero un boleto')).toBe(false)
    expect(speakMatch('donde esta el bano', '¿Dónde está el baño?')).toBe(true)
  })
})

describe('streak and review scheduling', () => {
  it('starts, continues, and resets a streak', () => {
    const first = bumpStreak(emptyProgress(), '2026-11-04')
    expect(first.streak).toBe(1)
    expect(bumpStreak(first, '2026-11-04').streak).toBe(1)
    expect(bumpStreak(first, '2026-11-05').streak).toBe(2)
    expect(bumpStreak(first, '2026-11-07').streak).toBe(1)
  })

  it('grows intervals after a miss, and resets on another miss', () => {
    expect(nextInterval(0)).toBe(1)
    expect(nextInterval(1)).toBe(3)
    expect(nextInterval(3)).toBe(7)
    const missed = applyLessonResult(
      emptyProgress(),
      'greetings-hello',
      {
        outcome: 'hearts',
        correct: 1,
        graded: 2,
        grades: [
          { vocabId: 'hola', correct: true },
          { vocabId: 'adios', correct: false },
        ],
      },
      '2026-11-04',
    ).state
    expect(missed.completedLessons).toEqual([])
    expect(missed.cards.adios).toMatchObject({ due: '2026-11-04', interval: 0, lapses: 1 })
    expect(missed.cards.hola).toBeUndefined()
    expect(dueVocabIds(missed, '2026-11-04')).toEqual(['adios'])

    const reviewed = applyReviewResult(
      missed,
      { outcome: 'complete', correct: 1, graded: 1, grades: [{ vocabId: 'adios', correct: true }] },
      '2026-11-04',
    ).state
    expect(reviewed.cards.adios?.due).toBe(addDays('2026-11-04', 1))
    expect(dueVocabIds(reviewed, '2026-11-04')).toEqual([])

    const missedAgain = applyReviewResult(
      reviewed,
      { outcome: 'complete', correct: 0, graded: 1, grades: [{ vocabId: 'adios', correct: false }] },
      '2026-11-05',
    ).state
    expect(missedAgain.cards.adios).toMatchObject({ interval: 0, due: '2026-11-05', lapses: 2 })
  })

  it('awards the lesson bonus once and keeps daily XP on the practice day', () => {
    const first = applyLessonResult(
      emptyProgress(),
      'greetings-hello',
      { outcome: 'complete', correct: 2, graded: 2, grades: [] },
      '2026-11-04',
    )
    expect(first.xpGained).toBe(20 + XP_LESSON_BONUS)
    expect(first.state.completedLessons).toEqual(['greetings-hello'])
    expect(first.state.streak).toBe(1)
    expect(dailyXpOn(first.state, '2026-11-04')).toBe(first.xpGained)

    const replay = applyLessonResult(
      first.state,
      'greetings-hello',
      { outcome: 'complete', correct: 2, graded: 2, grades: [] },
      '2026-11-04',
    )
    expect(replay.xpGained).toBe(20)
    expect(replay.state.completedLessons).toEqual(['greetings-hello'])
    expect(isLessonUnlocked('greetings-how', replay.state.completedLessons)).toBe(true)
    expect(isLessonUnlocked('numbers-1', replay.state.completedLessons)).toBe(false)
  })

  it('drops broken saved progress instead of crashing', () => {
    expect(sanitizeProgress(null).xp).toBe(0)
    expect(sanitizeProgress({ xp: 12, completedLessons: ['a', 3], cards: { hola: { due: '2026-01-01' } } }).xp).toBe(12)
  })
})

describe('exercise settling', () => {
  it('grades a typed answer and a skipped speak prompt', () => {
    const lesson = allLessons()[0]!
    const typed = lesson.exercises.find((exercise) => exercise.type === 'type')!
    expect(settleExercise(typed, { kind: 'type', value: 'GRACIAS' }).correct).toBe(true)
    const spoken = lesson.exercises.find((exercise) => exercise.type === 'speak')!
    const skipped = settleExercise(spoken, { kind: 'speak-skip' })
    expect(skipped.skipped).toBe(true)
    expect(skipped.heart).toBe(false)
    expect(skipped.grades).toEqual([])
    expect(draftReady({ kind: 'bank', values: [] })).toBe(false)
  })
})

describe('course', () => {
  it('is a path of short mixed lessons with valid answers', () => {
    const lessons = allLessons()
    expect(course.length).toBeGreaterThanOrEqual(5)
    expect(lessons.length).toBeGreaterThanOrEqual(10)
    const ids = new Set<string>()
    const types = new Set<string>()
    const used = new Set<string>()
    for (const lesson of lessons) {
      expect(lesson.exercises.length).toBeGreaterThanOrEqual(8)
      expect(lesson.exercises.length).toBeLessThanOrEqual(12)
      expect(ids.has(lesson.id)).toBe(false)
      ids.add(lesson.id)
      for (const exercise of lesson.exercises) {
        expect(ids.has(exercise.id)).toBe(false)
        ids.add(exercise.id)
        types.add(exercise.type)
        const vocabIds = exercise.type === 'match' ? exercise.pairs.map((pair) => pair.vocabId) : exercise.vocabIds
        expect(vocabIds.length).toBeGreaterThan(0)
        for (const vocabId of vocabIds) {
          expect(vocabById.has(vocabId), vocabId).toBe(true)
          used.add(vocabId)
        }
        if (exercise.type === 'choice' || exercise.type === 'listen') {
          expect(exercise.options).toContain(exercise.answer)
          expect(new Set(exercise.options).size).toBe(exercise.options.length)
        }
        if (exercise.type === 'bank') {
          for (const tile of exercise.answer) expect(exercise.tiles).toContain(tile)
        }
        if (exercise.type === 'match') expect(exercise.pairs).toHaveLength(4)
      }
    }
    expect([...types].sort()).toEqual(['bank', 'choice', 'conjugate', 'listen', 'match', 'read', 'speak', 'type'])
    expect(lessons.slice(0, 12).map((lesson) => lesson.id)).toEqual([
      'greetings-hello',
      'greetings-how',
      'numbers-1',
      'numbers-2',
      'food-drinks',
      'food-table',
      'family-members',
      'family-have',
      'travel-places',
      'travel-move',
      'daily-me',
      'daily-time',
    ])
    for (const entry of vocab) expect(used.has(entry.id), entry.id).toBe(true)
    expect(isLessonUnlocked(lessons[0]!.id, [])).toBe(true)
    expect(isLessonUnlocked(lessons[1]!.id, [])).toBe(false)
  })

  it('builds review exercises that include the answer', () => {
    const items = vocab.slice(0, 4)
    const exercises = buildReviewExercises(items, vocab, 7)
    expect(exercises).toHaveLength(4)
    for (const exercise of exercises) {
      if (exercise.type === 'choice' || exercise.type === 'listen') {
        expect(exercise.options).toContain(exercise.answer)
      }
      if (exercise.type === 'type') expect(exercise.answer.length).toBeGreaterThan(0)
      if (exercise.type === 'speak') expect(exercise.phrase.length).toBeGreaterThan(0)
    }
  })
})
