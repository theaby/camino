import { useCallback, useEffect, useRef, useState } from 'react'
import { vocabById } from '../data/catalog'
import type { Exercise } from '../data/types'
import { exerciseKicker, praise, settleExercise, type Draft, type Settlement } from '../lib/grade'
import {
  HEARTS_PER_LESSON,
  missedVocabIds,
  type SessionSummary,
} from '../lib/progress'
import { stopSpeaking } from '../lib/speech'
import { playCue } from '../lib/sound'
import { ExerciseBody } from './ExerciseBody'
import { HeartIcon } from './Icons'

export type Reward = { xpGained: number; streak: number }

type Props = {
  title: string
  exercises: Exercise[]
  heartsEnabled: boolean
  sound: boolean
  preview: (summary: SessionSummary) => Reward
  onResult: (summary: SessionSummary) => void
  onExit: () => void
  onRetry?: () => void
}

type Phase = 'answer' | 'feedback' | 'summary'

export function Session({ title, exercises, heartsEnabled, sound, preview, onResult, onExit, onRetry }: Props) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('answer')
  const [hearts, setHearts] = useState(HEARTS_PER_LESSON)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [result, setResult] = useState<Settlement | null>(null)
  const [correct, setCorrect] = useState(0)
  const [graded, setGraded] = useState(0)
  const [grades, setGrades] = useState<SessionSummary['grades']>([])
  const [reward, setReward] = useState<Reward | null>(null)
  const [outcome, setOutcome] = useState<SessionSummary['outcome']>('complete')
  const [leaveOpen, setLeaveOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const lock = useRef(false)
  const committed = useRef(false)
  const draftRef = useRef<Draft | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const leaveButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const exercise = exercises[index]

  const onDraft = useCallback((next: Draft | null) => {
    draftRef.current = next
    setDraft(next)
  }, [])

  useEffect(() => {
    lock.current = false
    draftRef.current = null
    setDraft(null)
    setResult(null)
    setPhase('answer')
    bodyRef.current?.scrollTo(0, 0)
  }, [index])

  useEffect(() => () => stopSpeaking(), [])

  useEffect(() => {
    if (!leaveOpen) return
    const dialog = dialogRef.current
    const actions = dialog ? [...dialog.querySelectorAll<HTMLButtonElement>('button:not([disabled])')] : []
    actions[0]?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setLeaveOpen(false)
        return
      }
      if (event.key !== 'Tab' || actions.length === 0) return
      event.preventDefault()
      const current = actions.indexOf(document.activeElement as HTMLButtonElement)
      const delta = event.shiftKey ? -1 : 1
      const next = current === -1 ? 0 : (current + delta + actions.length) % actions.length
      actions[next]?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      leaveButtonRef.current?.focus()
    }
  }, [leaveOpen])

  const commit = useCallback(
    (summary: SessionSummary) => {
      if (committed.current) return
      committed.current = true
      setSaved(true)
      setOutcome(summary.outcome)
      setReward(preview(summary))
      onResult(summary)
    },
    [onResult, preview],
  )

  const submit = useCallback(
    (nextDraft: Draft) => {
      if (!exercise || lock.current || phase !== 'answer') return
      lock.current = true
      const settlement = settleExercise(exercise, nextDraft)
      const nextCorrect = correct + (settlement.correct ? 1 : 0)
      const nextGraded = graded + (settlement.skipped ? 0 : 1)
      const nextGrades = [...grades, ...settlement.grades]
      const nextHearts = settlement.heart && heartsEnabled ? hearts - 1 : hearts
      setResult(settlement)
      setCorrect(nextCorrect)
      setGraded(nextGraded)
      setGrades(nextGrades)
      setHearts(nextHearts)
      setPhase('feedback')
      if (sound && !settlement.skipped) playCue(settlement.correct ? 'ok' : 'no')
      const failed = heartsEnabled && nextHearts <= 0
      if (failed || index + 1 >= exercises.length) {
        commit({
          outcome: failed ? 'hearts' : 'complete',
          correct: nextCorrect,
          graded: nextGraded,
          grades: nextGrades,
        })
      }
    },
    [commit, correct, exercise, exercises.length, graded, grades, hearts, heartsEnabled, index, phase, sound],
  )

  useEffect(() => {
    if (phase !== 'answer' || draft?.kind !== 'match') return
    submit(draft)
  }, [draft, phase, submit])

  function check() {
    const current = draftRef.current
    if (!current || current.kind === 'match') return
    submit(current)
  }

  function continueOn() {
    if (!result) return
    const failed = heartsEnabled && hearts <= 0
    if (failed || index + 1 >= exercises.length) {
      commit({
        outcome: failed ? 'hearts' : 'complete',
        correct,
        graded,
        grades,
      })
      if (sound && !failed) playCue('done')
      setPhase('summary')
      return
    }
    lock.current = false
    draftRef.current = null
    setDraft(null)
    setResult(null)
    setPhase('answer')
    setIndex((value) => value + 1)
  }

  if (!exercise) {
    return (
      <section className="session">
        <div className="session-body">
          <h1>Nothing to practice</h1>
          <button type="button" className="btn-primary" onClick={onExit}>
            Back
          </button>
        </div>
      </section>
    )
  }

  const prompt = promptFor(exercise)
  const progress = ((phase === 'answer' ? index : index + 1) / exercises.length) * 100
  const missed = missedVocabIds(grades)
    .map((id) => vocabById.get(id))
    .filter((entry) => entry !== undefined)
    .slice(0, 6)

  return (
    <section className="session">
      <div className="session-surface" inert={leaveOpen}>
      <header className="session-bar">
        <div className="session-bar-inner">
          {phase === 'summary' ? (
            <span className="session-spacer" />
          ) : (
            <button
              type="button"
              className="icon-button"
              ref={leaveButtonRef}
              onClick={() => setLeaveOpen(true)}
              aria-label="Leave lesson"
            >
              ×
            </button>
          )}
          <div
            className="bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={exercises.length}
            aria-valuenow={Math.min(exercises.length, phase === 'answer' ? index : index + 1)}
            aria-label={`${title}, exercise ${index + 1} of ${exercises.length}`}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          {heartsEnabled ? (
            <div className="hearts" aria-label={`${hearts} hearts left`}>
              {Array.from({ length: HEARTS_PER_LESSON }, (_, heart) => (
                <HeartIcon key={heart} filled={heart < hearts} />
              ))}
            </div>
          ) : (
            <span className="review-pill">Review</span>
          )}
        </div>
      </header>

      {phase === 'summary' && reward ? (
        <div className="session-body">
          <div className="session-body-inner summary">
            <p className="kicker">{outcome === 'complete' ? title : 'Round over'}</p>
            <h1>{outcome === 'complete' ? 'Lesson complete' : 'Out of hearts'}</h1>
            <p className="summary-xp">+{reward.xpGained} XP</p>
            <p>
              {graded === 0 ? 'No answers graded.' : `${correct} of ${graded} correct.`}{' '}
              {reward.streak > 0 ? `${reward.streak} day streak.` : ''}
            </p>
            {outcome === 'hearts' ? <p>Missed words are saved for Review. This lesson stays open.</p> : null}
            {missed.length > 0 ? (
              <ul className="missed">
                {missed.map((entry) => (
                  <li key={entry.id}>
                    <span lang="es">{entry.es}</span>
                    <span>{entry.en}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="fine">Saved on this device.</p>
            <div className="summary-actions">
              {outcome === 'hearts' && onRetry ? (
                <button type="button" className="btn-primary" onClick={onRetry}>
                  Try again
                </button>
              ) : null}
              <button type="button" className={outcome === 'hearts' ? 'btn-quiet' : 'btn-primary'} onClick={onExit}>
                {outcome === 'complete' ? 'Continue' : 'Back to the path'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="session-body" ref={bodyRef}>
            <div className="session-body-inner">
              <p className="kicker">{exerciseKicker(exercise)}</p>
              {exercise.type === 'speak' ? (
                <>
                  <h1 className="prompt" lang="es">
                    {exercise.phrase}
                  </h1>
                  <p className="translation">{exercise.translation}</p>
                </>
              ) : prompt ? (
                <h1 className="prompt" lang={prompt.lang}>
                  {prompt.text}
                </h1>
              ) : null}
              <ExerciseBody
                key={exercise.id}
                exercise={exercise}
                disabled={phase !== 'answer'}
                revealed={phase === 'feedback' ? result : null}
                onDraft={onDraft}
                onSkip={() => submit({ kind: 'speak-skip' })}
                onRequestCheck={check}
              />
            </div>
          </div>
          <footer className="session-footer" data-result={phase === 'feedback' ? feedbackKind(result) : 'idle'}>
            <div className="session-footer-inner">
              {phase === 'feedback' && result ? (
                <div className="feedback" aria-live="polite">
                  <p className="feedback-title">
                    {result.skipped ? 'Skipped' : result.correct ? praise(index) : 'Correct answer'}
                  </p>
                  <p className="feedback-line" lang="es">
                    {result.line}
                  </p>
                  {result.note ? <p className="feedback-note">{result.note}</p> : null}
                  {result.heart && heartsEnabled ? <p className="feedback-heart">−1 heart</p> : null}
                </div>
              ) : (
                <p className="footer-hint">{footerHint(exercise)}</p>
              )}
              {phase === 'answer' ? (
                <button type="button" className="btn-primary" disabled={!canCheck(draft)} onClick={check}>
                  Check
                </button>
              ) : (
                <button type="button" className="btn-primary" onClick={continueOn}>
                  Continue
                </button>
              )}
            </div>
          </footer>
        </>
      )}
      </div>

      {leaveOpen ? (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="leave-title" ref={dialogRef}>
          <div className="modal-card">
            <h2 id="leave-title">Leave this round?</h2>
            <p>{saved ? 'This round is already saved on this device.' : 'Answers in this round won’t be saved.'}</p>
            <div className="modal-actions">
              <button type="button" className="btn-primary" onClick={() => setLeaveOpen(false)}>
                Keep going
              </button>
              <button type="button" className="btn-quiet" onClick={onExit}>
                Leave
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function promptFor(exercise: Exercise): { text: string; lang?: string } | null {
  switch (exercise.type) {
    case 'choice':
    case 'type':
      return { text: exercise.prompt, lang: exercise.direction === 'es-en' ? 'es' : 'en' }
    case 'bank':
      return { text: exercise.prompt, lang: 'en' }
    case 'match':
      return { text: exercise.prompt, lang: 'en' }
    case 'listen':
      return exercise.question
        ? { text: exercise.question, lang: exercise.questionLang ?? 'en' }
        : { text: 'What does this mean?', lang: 'en' }
    case 'speak':
      return null
    case 'read':
      return { text: exercise.question, lang: exercise.questionLang ?? 'en' }
    case 'conjugate':
      return { text: exercise.prompt, lang: 'es' }
  }
}

function footerHint(exercise: Exercise): string {
  switch (exercise.type) {
    case 'match':
      return 'Tap one Spanish word and its English pair.'
    case 'speak':
      return 'Speak, then check. Or skip if the mic is unavailable.'
    case 'bank':
      return 'Tap words to build the sentence.'
    case 'read':
      return 'Read the passage, then answer.'
    case 'type':
      return exercise.direction === 'en-es'
        ? 'Type the Spanish. A missing accent still counts, and we will flag it. ñ has to be ñ.'
        : 'Type the English, then check.'
    case 'conjugate':
      return 'Type the form. A missing accent still counts, and we will flag it. ñ has to be ñ.'
    default:
      return 'Choose an answer, then check.'
  }
}

function canCheck(draft: Draft | null): boolean {
  if (!draft || draft.kind === 'match' || draft.kind === 'speak-skip') return false
  if (draft.kind === 'bank') return draft.values.length > 0
  if (draft.kind === 'type' || draft.kind === 'conjugate') return draft.value.trim().length > 0
  if (draft.kind === 'read') return draft.value.length > 0
  if (draft.kind === 'speak') return draft.transcript.trim().length > 0
  return draft.value.length > 0
}

function feedbackKind(result: Settlement | null): 'correct' | 'wrong' | 'idle' {
  if (!result || result.skipped) return 'idle'
  return result.correct ? 'correct' : 'wrong'
}
