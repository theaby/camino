import { useEffect, useState, type ReactNode } from 'react'
import { getRedirectResult, onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { lessonById, vocabForIds } from './data/catalog'
import { vocab } from './data/course'
import { AccountScreen } from './components/AccountScreen'
import { PathScreen } from './components/PathScreen'
import { ProfileScreen } from './components/ProfileScreen'
import { ReviewScreen } from './components/ReviewScreen'
import { Session } from './components/Session'
import { FlameIcon, LearnIcon, MarkIcon, PersonIcon, ReviewIcon } from './components/Icons'
import { buildReviewExercises } from './lib/review'
import { hashSeed } from './lib/shuffle'
import { getFirebase } from './lib/firebase'
import { useSyncedProgress } from './lib/useSyncedProgress'
import {
  applyLessonResult,
  applyReviewResult,
  dailyXpOn,
  DAILY_GOAL,
  dueVocabIds,
  resetProgress,
  todayISO,
  type Progress,
  type SessionSummary,
} from './lib/progress'
import { isLessonUnlocked } from './data/catalog'
import { navigate, readRoute, type Route } from './lib/route'

export function App() {
  const firebase = getFirebase()
  const configured = firebase !== null
  const { user, authReady } = useAuth(configured)
  const { progress, setProgress, syncState } = useSyncedProgress(user, authReady, configured)
  const [route, setRoute] = useState<Route>(() => readRoute())
  const [attempt, setAttempt] = useState(0)
  const [reviewRun, setReviewRun] = useState<ReturnType<typeof buildReviewExercises> | null>(null)

  useEffect(() => {
    const sync = () => setRoute(readRoute())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    if (route.name !== 'review') setReviewRun(null)
  }, [route])

  const today = todayISO()
  const due = dueVocabIds(progress, today).length
  const inLesson = route.name === 'lesson'
  const inReviewRun = route.name === 'review' && reviewRun !== null
  const focused = inLesson || inReviewRun

  useEffect(() => {
    const label =
      route.name === 'lesson'
        ? 'Lesson'
        : route.name === 'review'
          ? 'Review'
          : route.name === 'profile'
            ? 'You'
            : route.name === 'account'
              ? 'Account'
              : 'Learn'
    document.title = `Camino — ${label}`
  }, [route])

  return (
    <div className="app">
      {focused ? null : (
        <div className="frame">
          <nav className="nav" aria-label="Primary">
            <div className="nav-brand">
              <MarkIcon className="mark" />
              <span>Camino</span>
            </div>
            <NavButton name="path" current={route.name === 'account' ? 'profile' : route.name} icon={<LearnIcon />} label="Learn" />
            <NavButton name="review" current={route.name === 'account' ? 'profile' : route.name} icon={<ReviewIcon />} label="Review" badge={due} />
            <NavButton name="profile" current={route.name === 'account' ? 'profile' : route.name} icon={<PersonIcon />} label="You" />
          </nav>
          <div className="content">
            <header className="topbar">
              <div className="topbar-inner">
                <div className="brand">
                  <MarkIcon className="mark" />
                  <span>Camino</span>
                </div>
                <div className="pills">
                  {progress.streak > 0 ? (
                    <span className="pill">
                      <FlameIcon className="flame" />
                      {progress.streak} day streak
                    </span>
                  ) : null}
                  <span className="pill">{dailyXpOn(progress, today)}/{DAILY_GOAL} XP</span>
                  {configured && authReady && !user ? (
                    <button type="button" className="pill pill-button" onClick={() => navigate('/account')}>
                      Sign in
                    </button>
                  ) : null}
                </div>
              </div>
            </header>
            <main>
              {route.name === 'path' ? (
                <PathScreen
                  progress={progress}
                  today={today}
                  onDismissWelcome={() => setProgress((current) => ({ ...current, welcomed: true }))}
                />
              ) : null}
              {route.name === 'review' ? (
                <ReviewScreen
                  progress={progress}
                  today={today}
                  onStart={(ids) => {
                    const items = vocabForIds(ids)
                    setReviewRun(buildReviewExercises(items, vocab, hashSeed(`${today}:${ids.join(',')}`)))
                  }}
                />
              ) : null}
              {route.name === 'profile' ? (
                <ProfileScreen
                  progress={progress}
                  today={today}
                  configured={configured}
                  email={user?.email ?? null}
                  syncState={syncState}
                  onToggleSound={() => setProgress((current) => ({ ...current, sound: !current.sound }))}
                  onReset={() => setProgress((current) => resetProgress(current))}
                  onSignOut={() => {
                    if (firebase) void signOut(firebase.auth)
                  }}
                />
              ) : null}
              {route.name === 'account' ? (
                <AccountScreen
                  mode={route.mode}
                  configured={configured}
                  auth={firebase?.auth ?? null}
                  onSignedIn={() => navigate('/')}
                />
              ) : null}
            </main>
          </div>
        </div>
      )}

      {inLesson ? (
        <LessonRoute
          lessonId={route.lessonId}
          attempt={attempt}
          progress={progress}
          onRetry={() => setAttempt((value) => value + 1)}
          onResult={(lessonId, summary) => {
            setProgress((current) => applyLessonResult(current, lessonId, summary, todayISO()).state)
          }}
        />
      ) : null}

      {inReviewRun && reviewRun ? (
        <Session
          key={`review-${attempt}`}
          title="Review"
          exercises={reviewRun}
          heartsEnabled={false}
          sound={progress.sound}
          preview={(summary) => {
            const next = applyReviewResult(progress, summary, todayISO())
            return { xpGained: next.xpGained, streak: next.state.streak }
          }}
          onResult={(summary) => {
            setProgress((current) => applyReviewResult(current, summary, todayISO()).state)
          }}
          onExit={() => setReviewRun(null)}
        />
      ) : null}
    </div>
  )
}

function LessonRoute({
  lessonId,
  attempt,
  progress,
  onResult,
  onRetry,
}: {
  lessonId: string
  attempt: number
  progress: Progress
  onResult: (lessonId: string, summary: SessionSummary) => void
  onRetry: () => void
}) {
  const lesson = lessonById(lessonId)
  if (!lesson) {
    return (
      <section className="panel narrow">
        <h1>That lesson isn’t on the path.</h1>
        <button type="button" className="btn-primary" onClick={() => navigate('/')}>
          Back
        </button>
      </section>
    )
  }
  if (!isLessonUnlocked(lesson.id, progress.completedLessons)) {
    return (
      <section className="panel narrow">
        <h1>Finish the previous lesson first.</h1>
        <p>{lesson.title} is still locked.</p>
        <button type="button" className="btn-primary" onClick={() => navigate('/')}>
          Back to the path
        </button>
      </section>
    )
  }
  return (
    <Session
      key={`${lesson.id}-${attempt}`}
      title={lesson.title}
      exercises={lesson.exercises}
      heartsEnabled
      sound={progress.sound}
      preview={(summary) => {
        const next = applyLessonResult(progress, lesson.id, summary, todayISO())
        return { xpGained: next.xpGained, streak: next.state.streak }
      }}
      onResult={(summary) => onResult(lesson.id, summary)}
      onExit={() => navigate('/')}
      onRetry={onRetry}
    />
  )
}

function useAuth(configured: boolean): { user: User | null; authReady: boolean } {
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(!configured)

  useEffect(() => {
    const firebase = getFirebase()
    if (!firebase) {
      setAuthReady(true)
      return
    }
    void getRedirectResult(firebase.auth).catch(() => undefined)
    return onAuthStateChanged(firebase.auth, (next) => {
      setUser(next)
      setAuthReady(true)
    })
  }, [configured])

  return { user, authReady }
}

function NavButton({
  name,
  current,
  icon,
  label,
  badge = 0,
}: {
  name: 'path' | 'review' | 'profile'
  current: Route['name']
  icon: ReactNode
  label: string
  badge?: number
}) {
  const path = name === 'path' ? '/' : `/${name}`
  const active = current === name
  return (
    <button type="button" className="nav-button" aria-current={active ? 'page' : undefined} onClick={() => navigate(path)}>
      {icon}
      <span>{label}</span>
      {badge > 0 ? <span className="badge">{badge > 9 ? '9+' : badge}</span> : null}
    </button>
  )
}
