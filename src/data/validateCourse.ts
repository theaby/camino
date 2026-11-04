import { allLessons, vocabById } from './catalog'
import { vocab } from './levels'
import type { Exercise } from './types'

export type CourseIssue = { id: string; message: string }

function vocabIdsOf(exercise: Exercise): string[] {
  if (exercise.type === 'match') return exercise.pairs.map((pair) => pair.vocabId)
  return exercise.vocabIds
}

/** Every lesson id, answer, and word-bank tile has to line up before the course can ship. */
export function validateCourse(): CourseIssue[] {
  const issues: CourseIssue[] = []
  const ids = new Set<string>()
  const used = new Set<string>()
  const lessons = allLessons()

  if (new Set(vocab.map((entry) => entry.id)).size !== vocab.length) {
    issues.push({ id: 'vocab', message: 'Duplicate vocabulary ids' })
  }

  for (const lesson of lessons) {
    if (ids.has(lesson.id)) issues.push({ id: lesson.id, message: 'Duplicate lesson id' })
    ids.add(lesson.id)
    if (lesson.exercises.length < 8 || lesson.exercises.length > 12) {
      issues.push({ id: lesson.id, message: `Lesson length ${lesson.exercises.length}` })
    }
    for (const exercise of lesson.exercises) {
      if (ids.has(exercise.id)) issues.push({ id: exercise.id, message: 'Duplicate exercise id' })
      ids.add(exercise.id)
      const vocabIds = vocabIdsOf(exercise)
      if (vocabIds.length === 0) issues.push({ id: exercise.id, message: 'Missing vocab ids' })
      for (const vocabId of vocabIds) {
        if (!vocabById.has(vocabId)) issues.push({ id: exercise.id, message: `Unknown vocab ${vocabId}` })
        else used.add(vocabId)
      }
      if (exercise.type === 'choice' || exercise.type === 'listen' || exercise.type === 'read') {
        if (!exercise.options.includes(exercise.answer)) issues.push({ id: exercise.id, message: 'Answer not in options' })
        if (new Set(exercise.options).size !== exercise.options.length) issues.push({ id: exercise.id, message: 'Duplicate options' })
      }
      if (exercise.type === 'bank') {
        for (const tile of exercise.answer) {
          if (!exercise.tiles.includes(tile)) issues.push({ id: exercise.id, message: `Tile missing: ${tile}` })
        }
      }
      if (exercise.type === 'match' && exercise.pairs.length !== 4) {
        issues.push({ id: exercise.id, message: 'Match needs 4 pairs' })
      }
      if ((exercise.type === 'type' || exercise.type === 'conjugate') && exercise.answer.trim().length === 0) {
        issues.push({ id: exercise.id, message: 'Empty answer' })
      }
      if (exercise.type === 'read' && exercise.passage.trim().length < 40) {
        issues.push({ id: exercise.id, message: 'Reading passage is too short' })
      }
    }
  }

  for (const entry of vocab) {
    if (!used.has(entry.id)) issues.push({ id: entry.id, message: 'Vocabulary never used' })
  }

  return issues
}
