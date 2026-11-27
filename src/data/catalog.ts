import { levels, vocab } from './levels'
import type { CefrLevel, Lesson, Level, Unit, Vocab } from './types'

export const vocabById = new Map<string, Vocab>(vocab.map((entry) => [entry.id, entry]))

export function allUnits(): Unit[] {
  return levels.flatMap((level) => level.units)
}

export function allLessons(): Lesson[] {
  return allUnits().flatMap((unit) => unit.lessons)
}

/** Lessons that count for path progress, unlocks, and level completion. */
export function requiredLessons(): Lesson[] {
  return allUnits()
    .filter((unit) => !unit.optional)
    .flatMap((unit) => unit.lessons)
}

export function lessonById(id: string): Lesson | undefined {
  return allLessons().find((lesson) => lesson.id === id)
}

export function unitForLesson(id: string): Unit | undefined {
  return allUnits().find((unit) => unit.lessons.some((lesson) => lesson.id === id))
}

export function levelForLesson(id: string): Level | undefined {
  return levels.find((level) => level.units.some((unit) => unit.lessons.some((lesson) => lesson.id === id)))
}

export function lessonsInLevel(levelId: CefrLevel): Lesson[] {
  return levels.find((level) => level.id === levelId)?.units.flatMap((unit) => unit.lessons) ?? []
}

export function requiredLessonsInLevel(levelId: CefrLevel): Lesson[] {
  return (
    levels
      .find((level) => level.id === levelId)
      ?.units.filter((unit) => !unit.optional)
      .flatMap((unit) => unit.lessons) ?? []
  )
}

export function lessonIdsBefore(levelId: CefrLevel): string[] {
  const index = levels.findIndex((level) => level.id === levelId)
  if (index <= 0) return []
  return levels
    .slice(0, index)
    .flatMap((level) => level.units.filter((unit) => !unit.optional).flatMap((unit) => unit.lessons.map((lesson) => lesson.id)))
}

export function lessonIndex(id: string): number {
  return allLessons().findIndex((lesson) => lesson.id === id)
}

function previousRequiredBeforeUnit(unit: Unit): Lesson | undefined {
  let previous: Lesson | undefined
  for (const entry of allUnits()) {
    if (entry.id === unit.id) return previous
    if (!entry.optional) {
      const last = entry.lessons[entry.lessons.length - 1]
      if (last) previous = last
    }
  }
  return previous
}

export function isLessonUnlocked(lessonId: string, completed: readonly string[]): boolean {
  const unit = unitForLesson(lessonId)
  if (!unit) return false

  if (unit.optional) {
    const index = unit.lessons.findIndex((lesson) => lesson.id === lessonId)
    if (index < 0) return false
    if (index === 0) {
      const gate = previousRequiredBeforeUnit(unit)
      return gate ? completed.includes(gate.id) : true
    }
    const previous = unit.lessons[index - 1]
    return previous ? completed.includes(previous.id) : false
  }

  const required = requiredLessons()
  const index = required.findIndex((lesson) => lesson.id === lessonId)
  if (index < 0) return false
  if (index === 0) return true
  const previous = required[index - 1]
  return previous ? completed.includes(previous.id) : false
}

export function nextIncomplete(completed: readonly string[]): Lesson | undefined {
  return requiredLessons().find((lesson) => !completed.includes(lesson.id) && isLessonUnlocked(lesson.id, completed))
}

export function vocabForIds(ids: readonly string[]): Vocab[] {
  return ids.flatMap((id) => {
    const entry = vocabById.get(id)
    return entry ? [entry] : []
  })
}

export { levels, vocab }
