/** Fold case, accents, and Spanish punctuation so beginner answers still count. */
export function normalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[¿?¡!.,;:'"“”‘’«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Keep accents and ñ. Punctuation and case still do not matter. */
export function foldMarks(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[¿?¡!.,;:'"“”‘’«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export type MarkedAnswer = { match: boolean; missingMark: boolean }

/** Drop accents, keep ñ as its own letter. ano and año stay different. */
export function foldLoose(input: string): string {
  const marked = foldMarks(input).replace(/ñ/g, '\u0000')
  return marked
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\u0000/g, 'ñ')
}

/**
 * A missing accent still counts and is flagged. ñ is a separate letter, so n does not stand in for it.
 */
export function markAnswer(input: string, expected: string, accept: readonly string[] = []): MarkedAnswer {
  const loose = foldLoose(input)
  if (!loose) return { match: false, missingMark: false }
  const candidates = [expected, ...accept]
  const strictHit = candidates.some((candidate) => foldMarks(candidate) === foldMarks(input))
  if (strictHit) return { match: true, missingMark: false }
  const looseHit = candidates.some((candidate) => foldLoose(candidate) === loose)
  return { match: looseHit, missingMark: looseHit }
}

/** Strict conjugation check. Lesson scoring uses markAnswer so a missing accent is flagged, not failed. */
export function conjugateMatch(input: string, expected: string, accept: readonly string[] = []): boolean {
  const value = foldMarks(input)
  if (!value) return false
  return [expected, ...accept].some((candidate) => foldMarks(candidate) === value)
}

export function answersMatch(input: string, expected: string, accept: readonly string[] = []): boolean {
  const value = normalize(input)
  if (!value) return false
  return [expected, ...accept].some((candidate) => normalize(candidate) === value)
}

/**
 * Generous check for speech-to-text. Extra words are fine when the phrase itself is there.
 * Multi-word phrases need most of their words, in any order.
 */
export function speakMatch(heard: string, phrase: string): boolean {
  const spoken = normalize(heard)
  const target = normalize(phrase)
  if (!spoken || !target) return false
  if (spoken === target || spoken.includes(target)) return true
  const wanted = target.split(' ')
  const heardWords = new Set(spoken.split(' '))
  if (wanted.length === 1) return heardWords.has(target)
  const hits = wanted.filter((word) => heardWords.has(word)).length
  return hits / wanted.length >= 0.75
}
