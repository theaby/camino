import { useEffect, useState, type ReactNode } from 'react'
import { getRedirectResult, onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { isLessonUnlocked, lessonById, lessonIdsBefore, lessonsInLevel, vocab, vocabForIds } from './data/catalog'
import { AccountScreen } from './components/AccountScreen'
import { LevelQuiz } from './components/LevelQuiz'
import { PathScreen } from './components/PathScreen'
import { ProfileScreen } from './components/ProfileScreen'
import { ReviewScreen } from './components/ReviewScreen'
import { Session } from './components/Session'
import { FlameIcon, LearnIcon, MarkIcon, PersonIcon, ReviewIcon } from './components/Icons'
import { buildReviewExercises } from './lib/review'
import { hashSeed } from './lib/shuffle'
import { getFirebase } from './lib/firebase'
import { userInitials } from './lib/initials'
import { useSyncedProgress } from './lib/useSyncedProgress'
import {
  applyLessonResult,
  applyReviewResult,
  dailyXpOn,
  DAILY_GOAL,
  dueVocabIds,
  grantLessons,
  resetProgress,
  todayISO,
  type Progress,
  type SessionSummary,
} from './lib/progress'
import { navigate, readRoute, type Route } from './lib/route'
import { placementItems, quizCleared, startingLevel, testOutItems } from './data/placement'
import { CEFR_LEVELS, type CefrLevel } from './data/types'

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

  const tab: 'path' | 'review' | 'profile' =
    route.name === 'review' ? 'review' : route.name === 'profile' || route.name === 'account' ? 'profile' : 'path'
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
              : route.name === 'placement'
                ? 'Placement'
                : route.name === 'test-out'
                  ? 'Test out'
                  : 'Learn'
    document.title = `Camino — ${label}`
  }, [route])

  return (
    <div className="app">
      {focused ? null : (
        <div className="frame">
          <nav className="nav" aria-label="Primary">
            <HomeMark className="nav-brand" />
            <NavButton name="path" current={tab} icon={<LearnIcon />} label="Learn" />
            <NavButton name="review" current={tab} icon={<ReviewIcon />} label="Review" badge={due} />
            <NavButton name="profile" current={tab} icon={<PersonIcon />} label="You" />
          </nav>
          <div className="content">
            <header className="topbar">
              <div className="topbar-inner">
                <HomeMark className="brand" />
                <div className="topbar-tools">
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
                  {user ? <UserAvatar user={user} /> : null}
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
              {route.name === 'placement' ? (
                <LevelQuiz
                  title="Placement"
                  intro="Answer without looking things up. This only decides where you start."
                  items={placementItems}
                  summarize={(answers) => {
                    const level = startingLevel(answers)
                    if (level === 'A1') {
                      return { title: 'Start at A1', body: 'The basics are still the right place. Nothing is skipped, and your XP stays put.' }
                    }
                    return {
                      title: `Start at ${level}`,
                      body: `Lessons before ${level} will be marked done. Your XP and review words stay as they are.`,
                    }
                  }}
                  confirmLabel="Save and continue"
                  onConfirm={(answers) => {
                    const level = startingLevel(answers)
                    setProgress((current) => grantLessons(current, lessonIdsBefore(level)))
                    navigate('/')
                  }}
                  onCancel={() => navigate('/')}
                />
              ) : null}
              {route.name === 'test-out' ? (
                <TestOut
                  level={route.level}
                  onPass={(ids) => {
                    setProgress((current) => grantLessons(current, ids))
                    navigate('/')
                  }}
                  onCancel={() => navigate('/')}
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

function TestOut({ level, onPass, onCancel }: { level: string; onPass: (ids: string[]) => void; onCancel: () => void }) {
  const known = CEFR_LEVELS.find((entry) => entry === level)
  if (!known) {
    return (
      <div className="panel">
        <h1>That level isn’t on the path.</h1>
        <button type="button" className="btn-primary" onClick={onCancel}>
          Back
        </button>
      </div>
    )
  }
  const items = testOutItems.filter((item) => item.level === known)
  return (
    <LevelQuiz
      title={`Test out of ${known}`}
      intro="Three of four clears this level."
      items={items}
      summarize={(answers) => {
        const passed = quizCleared(items, answers)
        return passed
          ? { title: `${known} is done`, body: 'Those lessons are marked done. Your XP does not change.' }
          : { title: 'Not yet', body: `Stay with ${known} for now. Nothing is marked done.` }
      }}
      confirmLabel="Back to the path"
      onConfirm={(answers) => {
        if (quizCleared(items, answers)) onPass(lessonsInLevel(known as CefrLevel).map((lesson) => lesson.id))
        else onCancel()
      }}
      onCancel={onCancel}
    />
  )
}

function HomeMark({ className }: { className: string }) {
  return (
    <button type="button" className={className} aria-label="Camino, learning path" onClick={() => navigate('/')}>
      <MarkIcon className="mark" />
      <span>Camino</span>
    </button>
  )
}

function UserAvatar({ user }: { user: User }) {
  const photo = user.photoURL?.trim() ?? ''
  const [failed, setFailed] = useState<string | null>(null)
  const showPhoto = photo.length > 0 && failed !== photo
  const who = user.displayName?.trim() || user.email || 'signed in'
  return (
    <button type="button" className="avatar" aria-label={`Account for ${who}`} onClick={() => navigate('/profile')}>
      {showPhoto ? (
        <img src={photo} alt="" referrerPolicy="no-referrer" onError={() => setFailed(photo)} />
      ) : (
        <span aria-hidden="true">{userInitials(user)}</span>
      )}
    </button>
  )
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
