export type Direction = 'en-es' | 'es-en'

export type Vocab = {
  id: string
  es: string
  en: string
}

export type ChoiceExercise = {
  id: string
  type: 'choice'
  direction: Direction
  prompt: string
  options: string[]
  answer: string
  vocabIds: string[]
  tip?: string
}

export type BankExercise = {
  id: string
  type: 'bank'
  prompt: string
  tiles: string[]
  answer: string[]
  vocabIds: string[]
  tip?: string
}

export type TypeExercise = {
  id: string
  type: 'type'
  direction: Direction
  prompt: string
  answer: string
  accept?: string[]
  vocabIds: string[]
  tip?: string
}

export type MatchPair = {
  es: string
  en: string
  vocabId: string
}

export type MatchExercise = {
  id: string
  type: 'match'
  prompt: string
  pairs: MatchPair[]
  tip?: string
}

export type ListenExercise = {
  id: string
  type: 'listen'
  phrase: string
  options: string[]
  answer: string
  vocabIds: string[]
  tip?: string
}

export type SpeakExercise = {
  id: string
  type: 'speak'
  phrase: string
  translation: string
  vocabIds: string[]
  tip?: string
}

export type Exercise =
  | ChoiceExercise
  | BankExercise
  | TypeExercise
  | MatchExercise
  | ListenExercise
  | SpeakExercise

export type Lesson = {
  id: string
  title: string
  summary: string
  exercises: Exercise[]
}

export type Unit = {
  id: string
  title: string
  description: string
  accent: string
  lessons: Lesson[]
}
