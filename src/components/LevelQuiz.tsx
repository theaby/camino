import { useState } from 'react'
import type { CheckItem } from '../data/placement'
import { hashSeed, shuffle } from '../lib/shuffle'

type Summary = { title: string; body: string }

type Props = {
  title: string
  intro: string
  items: CheckItem[]
  summarize: (answers: Record<string, string>) => Summary
  confirmLabel: string
  onConfirm: (answers: Record<string, string>) => void
  onCancel: () => void
}

export function LevelQuiz({ title, intro, items, summarize, confirmLabel, onConfirm, onCancel }: Props) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [finished, setFinished] = useState(false)

  if (items.length === 0) {
    return (
      <div className="panel">
        <h1>That check isn’t available.</h1>
        <button type="button" className="btn-primary" onClick={onCancel}>
          Back
        </button>
      </div>
    )
  }

  if (finished) {
    const summary = summarize(answers)
    return (
      <div className="panel">
        <p className="kicker">Result</p>
        <h1>{summary.title}</h1>
        <p className="lede">{summary.body}</p>
        <button type="button" className="btn-primary" onClick={() => onConfirm(answers)}>
          {confirmLabel}
        </button>
        <button type="button" className="btn-quiet" onClick={onCancel}>
          Back without saving
        </button>
      </div>
    )
  }

  const item = items[index]!
  const options = shuffle(item.options, hashSeed(item.id))
  const correct = picked === item.answer

  return (
    <div className="panel">
      <p className="kicker">
        {title} · {index + 1} of {items.length}
      </p>
      <h1>{intro}</h1>
      <p className="prompt" lang={item.promptLang ?? 'en'}>
        {item.prompt}
      </p>
      <div className="options" role="group" aria-label="Answers">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="option"
            aria-pressed={picked === option}
            data-correct={checked && option === item.answer ? 'true' : 'false'}
            data-wrong={checked && picked === option && option !== item.answer ? 'true' : 'false'}
            disabled={checked}
            onClick={() => setPicked(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {checked ? (
        <p className="form-notice" role="status">
          {correct ? 'Yes.' : `Answer: ${item.answer}`}
        </p>
      ) : null}
      <div className="summary-actions">
        {checked ? (
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              const nextAnswers = { ...answers, [item.id]: picked ?? '' }
              setAnswers(nextAnswers)
              if (index + 1 >= items.length) {
                setFinished(true)
                return
              }
              setIndex((value) => value + 1)
              setPicked(null)
              setChecked(false)
            }}
          >
            Continue
          </button>
        ) : (
          <button type="button" className="btn-primary" disabled={!picked} onClick={() => setChecked(true)}>
            Check
          </button>
        )}
        <button type="button" className="btn-quiet" onClick={onCancel}>
          Leave
        </button>
      </div>
    </div>
  )
}
