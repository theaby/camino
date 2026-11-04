import { course, vocab } from './course'
import type { Lesson, Unit, Vocab } from './types'

export const vocabById = new Map<string, Vocab>(vocab.map((entry) => [entry.id, entry]))

export function allLessons(): Lesson[] {
  return course.flatMap((unit) => unit.lessons)
}

export function lessonById(id: string): Lesson | undefined {
  return allLessons().find((lesson) => lesson.id === id)
}

export function unitForLesson(id: string): Unit | undefined {
  return course.find((unit) => unit.lessons.some((lesson) => lesson.id === id))
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
