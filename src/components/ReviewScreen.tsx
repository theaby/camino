import { dueVocabIds, practiceVocabIds, type Progress } from '../lib/progress'

type Props = {
  progress: Progress
  today: string
  onStart: (vocabIds: string[]) => void
}

export function ReviewScreen({ progress, today, onStart }: Props) {
  const due = dueVocabIds(progress, today)
  const saved = Object.keys(progress.cards).length
  const practice = practiceVocabIds(progress)

  return (
    <div className="panel">
      <p className="kicker">Review</p>
      <h1>Words you missed</h1>
      <p className="lede">
        A miss in a lesson saves the word here. Correct reviews wait longer before they return. Wrong ones come back right away.
      </p>
      {due.length > 0 ? (
        <section className="panel-card">
          <h2>
            {due.length} {due.length === 1 ? 'word' : 'words'} ready
          </h2>
          <p>About a minute. Listen, type, or say them.</p>
          <button type="button" className="btn-primary" onClick={() => onStart(due.slice(0, 10))}>
            Start review
          </button>
        </section>
      ) : saved > 0 ? (
        <section className="panel-card">
          <h2>You’re caught up</h2>
          <p>Nothing is due right now. You can still practice {practice.length} saved {practice.length === 1 ? 'word' : 'words'}.</p>
          <button type="button" className="btn-primary" onClick={() => onStart(practice)}>
            Practice saved words
          </button>
        </section>
      ) : (
        <section className="panel-card">
          <h2>No words yet</h2>
          <p>Finish a lesson. Anything you miss will wait here.</p>
        </section>
      )}
    </div>
  )
}
