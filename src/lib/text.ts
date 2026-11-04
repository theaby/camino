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

/** Conjugation keeps accents: hablé and hable are different forms. */
export function conjugateMatch(input: string, expected: string, accept: readonly string[] = []): boolean {
  const fold = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[¿?¡!.,;:'"“”‘’«»]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  const value = fold(input)
  if (!value) return false
  return [expected, ...accept].some((candidate) => fold(candidate) === value)
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
