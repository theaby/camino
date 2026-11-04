import { useEffect, useState } from 'react'
import { allLessons } from '../data/catalog'
import type { SyncState } from '../lib/useSyncedProgress'
import { dailyXpOn, DAILY_GOAL, dueVocabIds, type Progress } from '../lib/progress'
import { navigate } from '../lib/route'

type InstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Props = {
  progress: Progress
  today: string
  configured: boolean
  email: string | null
  syncState: SyncState
  onToggleSound: () => void
  onReset: () => void
  onSignOut: () => void
}

export function ProfileScreen({ progress, today, configured, email, syncState, onToggleSound, onReset, onSignOut }: Props) {
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
      <h1>{email ? 'Your account' : 'On this device'}</h1>
      <p className="lede">{profileLede(configured, email)}</p>
      <AccountCard configured={configured} email={email} syncState={syncState} onSignOut={onSignOut} />
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
        <p>
          {email
            ? 'Clears XP, the streak, finished lessons, and review words on your account.'
            : 'Clears XP, the streak, finished lessons, and review words on this device.'}
        </p>
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

function profileLede(configured: boolean, email: string | null): string {
  if (email) return 'This progress is saved to your account and follows you onto your other devices.'
  if (configured) return 'You’re practicing as a guest. Progress stays in this browser until you sign in.'
  return 'Camino doesn’t have an account. Your streak, XP, and review words stay in this browser.'
}

function syncCopy(syncState: SyncState): string {
  if (syncState === 'synced') return 'Synced to your account.'
  if (syncState === 'loading') return 'Signing you in…'
  return 'Saved on this device. Changes sync when you’re back online.'
}

function AccountCard({
  configured,
  email,
  syncState,
  onSignOut,
}: {
  configured: boolean
  email: string | null
  syncState: SyncState
  onSignOut: () => void
}) {
  if (!configured) return null
  if (!email) {
    return (
      <section className="panel-card">
        <h2>Save an account</h2>
        <p>Sign in to keep the same lessons, streak, and review words on your phone and your computer.</p>
        <button type="button" className="btn-primary" onClick={() => navigate('/account')}>
          Sign in
        </button>
      </section>
    )
  }
  return (
    <section className="panel-card" data-sync={syncState}>
      <h2>Signed in</h2>
      <p className="account-email">{email}</p>
      <p>{syncCopy(syncState)}</p>
      <button type="button" className="btn-quiet" onClick={onSignOut}>
        Sign out
      </button>
    </section>
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
