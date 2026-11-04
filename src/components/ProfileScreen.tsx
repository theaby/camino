import { useEffect, useState } from 'react'
import { allLessons } from '../data/catalog'
import { dailyXpOn, DAILY_GOAL, dueVocabIds, type Progress } from '../lib/progress'

type InstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Props = {
  progress: Progress
  today: string
  onToggleSound: () => void
  onReset: () => void
}

export function ProfileScreen({ progress, today, onToggleSound, onReset }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [install, setInstall] = useState<InstallPrompt | null>(null)
  const lessons = allLessons().length
  const due = dueVocabIds(progress, today).length

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault()
      setInstall(event as InstallPrompt)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  return (
    <div className="panel">
      <p className="kicker">You</p>
      <h1>On this device</h1>
      <p className="lede">Camino doesn’t have an account. Your streak, XP, and review words stay in this browser.</p>
      <div className="stats">
        <Stat label="Streak" value={progress.streak === 1 ? '1 day' : `${progress.streak} days`} />
        <Stat label="XP" value={String(progress.xp)} />
        <Stat label="Lessons" value={`${progress.completedLessons.length}/${lessons}`} />
        <Stat label="Due" value={String(due)} />
      </div>
      <section className="panel-card">
        <h2>Daily goal</h2>
        <p>
          {dailyXpOn(progress, today)}/{DAILY_GOAL} XP today. One lesson is about 80 XP.
        </p>
      </section>
      <section className="panel-card">
        <h2>Sound</h2>
        <p>Short tones for right and wrong answers. Spanish audio uses your browser’s voice.</p>
        <button type="button" className="btn-quiet" aria-pressed={progress.sound} onClick={onToggleSound}>
          {progress.sound ? 'Sound on' : 'Sound off'}
        </button>
      </section>
      <section className="panel-card">
        <h2>Install</h2>
        <p>Add Camino to your home screen for a full-screen app that opens offline after the first visit.</p>
        {install ? (
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              void install.prompt()
              setInstall(null)
            }}
          >
            Install app
          </button>
        ) : (
          <p className="fine">In the browser menu, choose Add to Home Screen or Install.</p>
        )}
      </section>
      <section className="panel-card">
        <h2>Reset</h2>
        <p>Clears XP, the streak, finished lessons, and review words on this device.</p>
        {confirming ? (
          <div className="row-actions">
            <button type="button" className="btn-danger" onClick={onReset}>
              Confirm reset
            </button>
            <button type="button" className="btn-quiet" onClick={() => setConfirming(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" className="btn-quiet" onClick={() => setConfirming(true)}>
            Reset progress
          </button>
        )}
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
