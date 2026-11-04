import type { Exercise } from '../data/types'
import { answersMatch, markAnswer, speakMatch } from './text'

export type Grade = { vocabId: string; correct: boolean }

export type Draft =
  | { kind: 'choice'; value: string }
  | { kind: 'listen'; value: string }
  | { kind: 'type'; value: string }
  | { kind: 'bank'; values: string[] }
  | { kind: 'speak'; transcript: string }
  | { kind: 'speak-skip' }
  | { kind: 'match'; mistakes: number }
  | { kind: 'read'; value: string }
  | { kind: 'conjugate'; value: string }

export type Settlement = {
  correct: boolean
  skipped: boolean
  heart: boolean
  grades: Grade[]
  line: string
  note?: string
}

export function vocabIdsOf(exercise: Exercise): string[] {
  if (exercise.type === 'match') return exercise.pairs.map((pair) => pair.vocabId)
  return exercise.vocabIds
}

export function draftReady(draft: Draft | null): boolean {
  if (!draft) return false
  switch (draft.kind) {
    case 'choice':
    case 'listen':
      return draft.value.length > 0
    case 'type':
    case 'conjugate':
      return draft.value.trim().length > 0
    case 'read':
      return draft.value.length > 0
    case 'bank':
      return draft.values.length > 0
    case 'speak':
      return draft.transcript.trim().length > 0
    case 'speak-skip':
    case 'match':
      return true
    default:
      return false
  }
}

function gradesFor(ids: readonly string[], correct: boolean): Grade[] {
  return ids.map((vocabId) => ({ vocabId, correct }))
}

function typedSettlement(ids: string[], input: string, expected: string, accept: readonly string[] = []): Settlement {
  const marked = markAnswer(input, expected, accept)
  return {
    correct: marked.match,
    skipped: false,
    heart: !marked.match,
    grades: gradesFor(ids, marked.match),
    line: expected,
    ...(marked.missingMark ? { note: 'That counts. The spelling uses an accent.' } : {}),
  }
}

export function settleExercise(exercise: Exercise, draft: Draft): Settlement {
  const ids = vocabIdsOf(exercise)
  if (draft.kind === 'speak-skip') {
    return {
      correct: false,
      skipped: true,
      heart: false,
      grades: [],
      line: 'No heart lost. Speaking is optional when the mic is unavailable.',
    }
  }

  if (exercise.type === 'choice' && draft.kind === 'choice') {
    const correct = answersMatch(draft.value, exercise.answer)
    return {
      correct,
      skipped: false,
      heart: !correct,
      grades: gradesFor(ids, correct),
      line: exercise.answer,
    }
  }

  if (exercise.type === 'listen' && draft.kind === 'listen') {
    const correct = answersMatch(draft.value, exercise.answer)
    return {
      correct,
      skipped: false,
      heart: !correct,
      grades: gradesFor(ids, correct),
      line: `${exercise.phrase} — ${exercise.answer}`,
    }
  }

  if (exercise.type === 'type' && draft.kind === 'type') {
    return typedSettlement(ids, draft.value, exercise.answer, exercise.accept ?? [])
  }

  if (exercise.type === 'bank' && draft.kind === 'bank') {
    const expected = exercise.answer.map((tile) => tile)
    const correct =
      draft.values.length === expected.length &&
      draft.values.every((tile, index) => answersMatch(tile, expected[index] ?? ''))
    return {
      correct,
      skipped: false,
      heart: !correct,
      grades: gradesFor(ids, correct),
      line: exercise.answer.join(' '),
    }
  }

  if (exercise.type === 'speak' && draft.kind === 'speak') {
    const correct = speakMatch(draft.transcript, exercise.phrase)
    return {
      correct,
      skipped: false,
      heart: !correct,
      grades: gradesFor(ids, correct),
      line: correct ? exercise.phrase : `We need “${exercise.phrase}”. Heard “${draft.transcript.trim()}”.`,
    }
  }

  if (exercise.type === 'read' && draft.kind === 'read') {
    const correct = answersMatch(draft.value, exercise.answer)
    return {
      correct,
      skipped: false,
      heart: !correct,
      grades: gradesFor(ids, correct),
      line: exercise.answer,
    }
  }

  if (exercise.type === 'conjugate' && draft.kind === 'conjugate') {
    return typedSettlement(ids, draft.value, exercise.answer, exercise.accept ?? [])
  }

  if (exercise.type === 'match' && draft.kind === 'match') {
    const correct = draft.mistakes === 0
    return {
      correct,
      skipped: false,
      heart: !correct,
      grades: gradesFor(ids, correct),
      line: correct
        ? 'All pairs matched.'
        : exercise.pairs.map((pair) => `${pair.es} = ${pair.en}`).join(' · '),
    }
  }

  return {
    correct: false,
    skipped: false,
    heart: true,
    grades: gradesFor(ids, false),
    line: 'Try the next one.',
  }
}

export function exerciseKicker(exercise: Exercise): string {
  switch (exercise.type) {
    case 'choice':
      return exercise.direction === 'en-es' ? 'Translate into Spanish' : 'Choose the meaning'
    case 'bank':
      return 'Build the Spanish'
    case 'type':
      return exercise.direction === 'en-es' ? 'Type the Spanish' : 'Type the English'
    case 'match':
      return 'Match the pairs'
    case 'listen':
      return exercise.task ?? 'Listen'
    case 'speak':
      return 'Say it in Spanish'
    case 'read':
      return exercise.task ?? 'Read'
    case 'conjugate':
      return 'Conjugate'
  }
}

export function praise(index: number): string {
  return ['Nice.', "That's it.", 'Well done.', 'Yes.'][index % 4] ?? 'Nice.'
}
