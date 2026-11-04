import { levels, vocab } from './levels'
import type { CefrLevel, Lesson, Level, Unit, Vocab } from './types'

export const vocabById = new Map<string, Vocab>(vocab.map((entry) => [entry.id, entry]))

export function allLessons(): Lesson[] {
  return levels.flatMap((level) => level.units.flatMap((unit) => unit.lessons))
}

export function lessonById(id: string): Lesson | undefined {
  return allLessons().find((lesson) => lesson.id === id)
}

export function unitForLesson(id: string): Unit | undefined {
  return levels.flatMap((level) => level.units).find((unit) => unit.lessons.some((lesson) => lesson.id === id))
}

export function levelForLesson(id: string): Level | undefined {
  return levels.find((level) => level.units.some((unit) => unit.lessons.some((lesson) => lesson.id === id)))
}

export function lessonsInLevel(levelId: CefrLevel): Lesson[] {
  return levels.find((level) => level.id === levelId)?.units.flatMap((unit) => unit.lessons) ?? []
}

export function lessonIdsBefore(levelId: CefrLevel): string[] {
  const index = levels.findIndex((level) => level.id === levelId)
  if (index <= 0) return []
  return levels.slice(0, index).flatMap((level) => level.units.flatMap((unit) => unit.lessons.map((lesson) => lesson.id)))
}

export function lessonIndex(id: string): number {
  return allLessons().findIndex((lesson) => lesson.id === id)
}

export function isLessonUnlocked(lessonId: string, completed: readonly string[]): boolean {
  const index = lessonIndex(lessonId)
  if (index < 0) return false
  if (index === 0) return true
  const previous = allLessons()[index - 1]
  return previous ? completed.includes(previous.id) : false
}

export function nextIncomplete(completed: readonly string[]): Lesson | undefined {
  return allLessons().find((lesson) => !completed.includes(lesson.id) && isLessonUnlocked(lesson.id, completed))
}

export function vocabForIds(ids: readonly string[]): Vocab[] {
  return ids.flatMap((id) => {
    const entry = vocabById.get(id)
    return entry ? [entry] : []
  })
}

export { levels, vocab }
