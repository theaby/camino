import { useEffect, useMemo, useRef, useState } from 'react'
import type { Exercise } from '../data/types'
import type { Draft, Settlement } from '../lib/grade'
import { hashSeed, shuffle } from '../lib/shuffle'
import { canRecognizeSpeech, speakSpanish, startRecognition, stopSpeaking } from '../lib/speech'
import { MicIcon, SpeakerIcon } from './Icons'

type Props = {
  exercise: Exercise
  disabled: boolean
  revealed: Settlement | null
  onDraft: (draft: Draft | null) => void
  onSkip: () => void
  onRequestCheck: () => void
}

export function ExerciseBody({ exercise, disabled, revealed, onDraft, onSkip, onRequestCheck }: Props) {
  return (
    <div className="exercise" data-disabled={disabled ? 'true' : 'false'} data-exercise-type={exercise.type} data-exercise-id={exercise.id}>
      {exercise.type === 'choice' || exercise.type === 'listen' ? (
        <OptionsExercise
          exercise={exercise}
          revealed={revealed}
          disabled={disabled}
          onDraft={onDraft}
        />
      ) : null}
      {exercise.type === 'bank' ? <BankExercise exercise={exercise} onDraft={onDraft} /> : null}
      {exercise.type === 'type' ? (
        <TypeExercise exercise={exercise} disabled={disabled} onDraft={onDraft} onRequestCheck={onRequestCheck} />
      ) : null}
      {exercise.type === 'match' ? <MatchExercise exercise={exercise} onDraft={onDraft} /> : null}
      {exercise.type === 'speak' ? (
        <SpeakExercise exercise={exercise} disabled={disabled} onDraft={onDraft} onSkip={onSkip} />
      ) : null}
      {exercise.tip ? <p className="tip">{exercise.tip}</p> : null}
    </div>
  )
}

function OptionsExercise({
  exercise,
  revealed,
  disabled,
  onDraft,
}: {
  exercise: Extract<Exercise, { type: 'choice' | 'listen' }>
  revealed: Settlement | null
  disabled: boolean
  onDraft: (draft: Draft | null) => void
}) {
  const options = useMemo(
    () => shuffle(exercise.options, hashSeed(exercise.id)),
    [exercise.id, exercise.options],
  )
  const [selected, setSelected] = useState<string | null>(null)
  const [showPhrase, setShowPhrase] = useState(false)

  useEffect(() => {
    if (exercise.type !== 'listen') return
    const timer = window.setTimeout(() => speakSpanish(exercise.phrase), 280)
    return () => {
      window.clearTimeout(timer)
      stopSpeaking()
    }
  }, [exercise])

  const showResult = Boolean(revealed && !revealed.skipped)

  return (
    <>
      {exercise.type === 'listen' ? (
        <div className="listen-block">
          <button type="button" className="speaker" onClick={() => speakSpanish(exercise.phrase)}>
            <SpeakerIcon />
            <span>Play</span>
          </button>
          <p className="listen-caption">Spanish audio. You can replay it.</p>
          <button type="button" className="text-button" aria-pressed={showPhrase} onClick={() => setShowPhrase((value) => !value)}>
            {showPhrase ? 'Hide the phrase' : 'Show the phrase'}
          </button>
          {showPhrase ? (
            <p className="phrase shown-phrase" lang="es">
              {exercise.phrase}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="options" role="group" aria-label="Answers">
        {options.map((option) => {
          const isSelected = selected === option
          const isAnswer = showResult && option === exercise.answer
          const isWrong = showResult && isSelected && option !== exercise.answer
          return (
            <button
              key={option}
              type="button"
              className="option"
              lang={exercise.type === 'choice' && exercise.direction === 'en-es' ? 'es' : undefined}
              aria-pressed={isSelected}
              data-correct={isAnswer ? 'true' : 'false'}
              data-wrong={isWrong ? 'true' : 'false'}
              disabled={disabled}
              onClick={() => {
                setSelected(option)
                onDraft(exercise.type === 'listen' ? { kind: 'listen', value: option } : { kind: 'choice', value: option })
              }}
            >
              {option}
            </button>
          )
        })}
      </div>
    </>
  )
}

function BankExercise({
  exercise,
  onDraft,
}: {
  exercise: Extract<Exercise, { type: 'bank' }>
  onDraft: (draft: Draft | null) => void
}) {
  const tiles = useMemo(() => {
    return shuffle(exercise.tiles, hashSeed(exercise.id)).map((text, index) => ({ id: `${exercise.id}-${index}`, text }))
  }, [exercise.id, exercise.tiles])
  const [bank, setBank] = useState(tiles)
  const [picked, setPicked] = useState<typeof tiles>([])

  useEffect(() => {
    onDraft(picked.length ? { kind: 'bank', values: picked.map((tile) => tile.text) } : null)
  }, [picked, onDraft])

  return (
    <div className="bank">
      <div className="answer-tray" aria-label="Your sentence">
        {picked.length === 0 ? <span className="tray-placeholder">Tap words below</span> : null}
        {picked.map((tile) => (
          <button
            key={tile.id}
            type="button"
            className="tile"
            lang="es"
            onClick={() => {
              setPicked((current) => current.filter((item) => item.id !== tile.id))
              setBank((current) => [...current, tile])
            }}
          >
            {tile.text}
            <span className="sr-only">Remove</span>
          </button>
        ))}
      </div>
      <div className="tile-bank">
        {bank.map((tile) => (
          <button
            key={tile.id}
            type="button"
            className="tile"
            lang="es"
            onClick={() => {
              setBank((current) => current.filter((item) => item.id !== tile.id))
              setPicked((current) => [...current, tile])
            }}
          >
            {tile.text}
          </button>
        ))}
      </div>
    </div>
  )
}

function TypeExercise({
  exercise,
  disabled,
  onDraft,
  onRequestCheck,
}: {
  exercise: Extract<Exercise, { type: 'type' }>
  disabled: boolean
  onDraft: (draft: Draft | null) => void
  onRequestCheck: () => void
}) {
  const [value, setValue] = useState('')
  return (
    <input
      className="type-input"
      lang={exercise.direction === 'en-es' ? 'es' : 'en'}
      value={value}
      disabled={disabled}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      spellCheck={false}
      enterKeyHint="done"
      placeholder={exercise.direction === 'en-es' ? 'Type in Spanish' : 'Type in English'}
      aria-label={exercise.direction === 'en-es' ? 'Spanish answer' : 'English answer'}
      onChange={(event) => {
        setValue(event.target.value)
        onDraft(event.target.value.trim() ? { kind: 'type', value: event.target.value } : null)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          onRequestCheck()
        }
      }}
      onFocus={(event) => event.currentTarget.scrollIntoView({ block: 'center' })}
    />
  )
}

function MatchExercise({
  exercise,
  onDraft,
}: {
  exercise: Extract<Exercise, { type: 'match' }>
  onDraft: (draft: Draft | null) => void
}) {
  const columns = useMemo(() => {
    const entries = exercise.pairs.map((pair, index) => ({ index, es: pair.es, en: pair.en }))
    return {
      es: shuffle(entries, hashSeed(`${exercise.id}-es`)),
      en: shuffle(entries, hashSeed(`${exercise.id}-en`)),
    }
  }, [exercise])
  const [selected, setSelected] = useState<{ side: 'es' | 'en'; index: number } | null>(null)
  const [matched, setMatched] = useState<number[]>([])
  const [mistakes, setMistakes] = useState(0)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (matched.length === exercise.pairs.length) onDraft({ kind: 'match', mistakes })
    else onDraft(null)
  }, [matched, mistakes, exercise.pairs.length, onDraft])

  function tap(side: 'es' | 'en', index: number) {
    if (matched.includes(index)) return
    if (!selected) {
      setSelected({ side, index })
      return
    }
    if (selected.side === side) {
      setSelected({ side, index })
      return
    }
    if (selected.index === index) {
      setMatched((current) => [...current, index])
      setSelected(null)
      return
    }
    setMistakes((count) => count + 1)
    setShake(true)
    window.setTimeout(() => setShake(false), 380)
    setSelected(null)
  }

  return (
    <>
      <p className="sr-only" aria-live="polite">
        {shake ? 'Not a match' : ''}
      </p>
      <div className={shake ? 'pairs shake' : 'pairs'}>
        <div className="pair-col">
          {columns.es.map((item) => (
            <button
              key={`es-${item.index}`}
              type="button"
              className="pair"
              lang="es"
              disabled={matched.includes(item.index)}
              aria-pressed={selected?.side === 'es' && selected.index === item.index}
              onClick={() => tap('es', item.index)}
            >
              {item.es}
            </button>
          ))}
        </div>
        <div className="pair-col">
          {columns.en.map((item) => (
            <button
              key={`en-${item.index}`}
              type="button"
              className="pair"
              disabled={matched.includes(item.index)}
              aria-pressed={selected?.side === 'en' && selected.index === item.index}
              onClick={() => tap('en', item.index)}
            >
              {item.en}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

function SpeakExercise({
  exercise,
  disabled,
  onDraft,
  onSkip,
}: {
  exercise: Extract<Exercise, { type: 'speak' }>
  disabled: boolean
  onDraft: (draft: Draft | null) => void
  onSkip: () => void
}) {
  const supported = canRecognizeSpeech()
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [message, setMessage] = useState<string | null>(supported ? null : 'This browser has no speech recognition. Skipping is fine.')
  const handle = useRef<{ stop: () => void } | null>(null)

  useEffect(() => {
    onDraft(transcript.trim() ? { kind: 'speak', transcript } : null)
  }, [transcript, onDraft])

  useEffect(() => {
    return () => handle.current?.stop()
  }, [])

  function toggle() {
    if (listening) {
      handle.current?.stop()
      setListening(false)
      return
    }
    setMessage(null)
    const started = startRecognition({
      onTranscript: setTranscript,
      onError: (code) => {
        if (code === 'aborted') return
        if (code === 'not-allowed' || code === 'service-not-allowed') {
          setMessage('Microphone is blocked. You can skip this one.')
        } else if (code === 'no-speech') {
          setMessage("Didn't catch that. Try again, or skip.")
        } else {
          setMessage('Speech recognition stopped. Try again, or skip.')
        }
        setListening(false)
      },
      onEnd: () => setListening(false),
    })
    if (!started) {
      setMessage('Speech recognition is unavailable here. Skipping is fine.')
      return
    }
    handle.current = started
    setListening(true)
  }

  return (
    <div className="speak">
      <button type="button" className="text-button" onClick={() => speakSpanish(exercise.phrase)}>
        Hear it first
      </button>
      {supported ? (
        <button type="button" className={listening ? 'mic is-live' : 'mic'} disabled={disabled} onClick={toggle}>
          <MicIcon />
          <span>{listening ? 'Stop' : 'Tap to speak'}</span>
        </button>
      ) : null}
      <p className="heard" aria-live="polite">
        {transcript ? `Heard: ${transcript}` : listening ? 'Listening…' : 'Your words will show up here.'}
      </p>
      {message ? <p className="tip">{message}</p> : null}
      <button type="button" className="btn-quiet" disabled={disabled} onClick={onSkip}>
        Skip speaking
      </button>
    </div>
  )
}
