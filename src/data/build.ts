import type {
  BankExercise,
  ChoiceExercise,
  ConjugateExercise,
  Direction,
  Lesson,
  ListenExercise,
  MatchExercise,
  MatchPair,
  ReadExercise,
  SpeakExercise,
  TypeExercise,
} from './types'

export function choice(
  id: string,
  direction: Direction,
  prompt: string,
  answer: string,
  options: string[],
  vocabIds: string[],
  tip?: string,
): ChoiceExercise {
  return { id, type: 'choice', direction, prompt, answer, options, vocabIds, ...(tip ? { tip } : {}) }
}

export function bank(
  id: string,
  prompt: string,
  answer: string[],
  extra: string[],
  vocabIds: string[],
  tip?: string,
): BankExercise {
  return { id, type: 'bank', prompt, answer, tiles: [...answer, ...extra], vocabIds, ...(tip ? { tip } : {}) }
}

export function typeIn(
  id: string,
  direction: Direction,
  prompt: string,
  answer: string,
  vocabIds: string[],
  accept?: string[],
  tip?: string,
): TypeExercise {
  return { id, type: 'type', direction, prompt, answer, vocabIds, ...(accept ? { accept } : {}), ...(tip ? { tip } : {}) }
}

export function match(id: string, pairs: MatchPair[], tip?: string): MatchExercise {
  return { id, type: 'match', prompt: 'Pair the Spanish with the English.', pairs, ...(tip ? { tip } : {}) }
}

export function listen(
  id: string,
  phrase: string,
  answer: string,
  options: string[],
  vocabIds: string[],
  tip?: string,
): ListenExercise {
  return { id, type: 'listen', phrase, answer, options, vocabIds, ...(tip ? { tip } : {}) }
}

export function say(id: string, phrase: string, translation: string, vocabIds: string[], tip?: string): SpeakExercise {
  return { id, type: 'speak', phrase, translation, vocabIds, ...(tip ? { tip } : {}) }
}

export function read(
  id: string,
  passage: string,
  question: string,
  answer: string,
  options: string[],
  vocabIds: string[],
  questionLang?: 'en' | 'es',
  tip?: string,
): ReadExercise {
  return {
    id,
    type: 'read',
    passage,
    question,
    answer,
    options,
    vocabIds,
    ...(questionLang ? { questionLang } : {}),
    ...(tip ? { tip } : {}),
  }
}

export function conjugate(
  id: string,
  prompt: string,
  answer: string,
  vocabIds: string[],
  accept?: string[],
  tip?: string,
): ConjugateExercise {
  return { id, type: 'conjugate', prompt, answer, vocabIds, ...(accept ? { accept } : {}), ...(tip ? { tip } : {}) }
}

export function lesson(id: string, title: string, summary: string, exercises: Lesson['exercises']): Lesson {
  return { id, title, summary, exercises }
}
