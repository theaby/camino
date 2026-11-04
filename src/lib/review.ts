import type { Exercise, Vocab } from '../data/types'
import { mulberry32, shuffle } from './shuffle'

function takeOthers(item: Vocab, pool: readonly Vocab[], count: number, rng: () => number): Vocab[] {
  const others = pool.filter((entry) => entry.id !== item.id && entry.en !== item.en && entry.es !== item.es)
  const order = shuffle(others, Math.floor(rng() * 1_000_000_000))
  const picked: Vocab[] = []
  const seen = new Set<string>()
  for (const entry of order) {
    const key = entry.en.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    picked.push(entry)
    if (picked.length === count) break
  }
  return picked
}

export function buildReviewExercises(
  items: readonly Vocab[],
  pool: readonly Vocab[],
  seed: number,
): Exercise[] {
  const rng = mulberry32(seed || 1)
  return items.map((item, index) => {
    const kind = index % 4
    const distractors = takeOthers(item, pool, 3, rng)
    if (kind === 0) {
      const options = shuffle(
        [item.en, ...distractors.map((entry) => entry.en)],
        Math.floor(rng() * 1_000_000_000),
      )
      return {
        id: `review-${item.id}-listen`,
        type: 'listen' as const,
        phrase: item.es,
        options,
        answer: item.en,
        vocabIds: [item.id],
      }
    }
    if (kind === 1) {
      const options = shuffle(
        [item.es, ...distractors.map((entry) => entry.es)],
        Math.floor(rng() * 1_000_000_000),
      )
      return {
        id: `review-${item.id}-choice`,
        type: 'choice' as const,
        direction: 'en-es' as const,
        prompt: item.en,
        options,
        answer: item.es,
        vocabIds: [item.id],
      }
    }
    if (kind === 2) {
      return {
        id: `review-${item.id}-type`,
        type: 'type' as const,
        direction: 'en-es' as const,
        prompt: item.en,
        answer: item.es,
        vocabIds: [item.id],
      }
    }
    return {
      id: `review-${item.id}-speak`,
      type: 'speak' as const,
      phrase: item.es,
      translation: item.en,
      vocabIds: [item.id],
    }
  })
}
