import type { CSSProperties } from 'react'
import { isLessonUnlocked, levels, nextIncomplete, requiredLessons } from '../data/catalog'
import { DAILY_GOAL, dailyXpOn, dueVocabIds, type Progress } from '../lib/progress'
import { navigate } from '../lib/route'
import { CheckIcon, LockIcon } from './Icons'
import { PathCompanion } from './PathCompanion'

type Props = {
  progress: Progress
  today: string
  companionMood: 'idle' | 'celebrate'
  onCompanionIdle: () => void
  onDismissWelcome: () => void
}

export function PathScreen({ progress, today, companionMood, onCompanionIdle, onDismissWelcome }: Props) {
  const required = requiredLessons()
  const next = nextIncomplete(progress.completedLessons)
  const done = required.filter((lesson) => progress.completedLessons.includes(lesson.id)).length
  const earnedToday = dailyXpOn(progress, today)
  const goalPct = Math.min(100, Math.round((earnedToday / DAILY_GOAL) * 100))
  const due = dueVocabIds(progress, today).length
  const hello = greeting()

  return (
    <div className="path-screen">
      <div className="path-layout">
        <div className="path-main">
          <section className="hero">
            <p className="hero-en">{hello.en}</p>
            <h1 lang="es">{hello.es}</h1>
            <p className="hero-copy">
              {next
                ? `${done} of ${required.length} required lessons. Optional units do not block the path.`
                : 'You finished the required path. Optional units and review stay open.'}
            </p>
            {progress.streak > 0 ? <p className="hero-streak">{progress.streak} day streak</p> : <p className="hero-streak">Practice today to start a streak.</p>}
            {next ? (
              <button type="button" className="btn-primary hero-btn" onClick={() => navigate(`/lesson/${next.id}`)}>
                {done === 0 ? 'Start' : 'Continue'} · {next.title}
              </button>
            ) : (
              <button type="button" className="btn-primary hero-btn" onClick={() => navigate('/review')}>
                Review words
              </button>
            )}
            <button type="button" className="btn-quiet" onClick={() => navigate('/placement')}>
              Find your level
            </button>
            <div className="goal" aria-label={`${earnedToday} of ${DAILY_GOAL} XP today`}>
              <div className="goal-row">
                <span>Daily goal</span>
                <span>
                  {earnedToday}/{DAILY_GOAL} XP
                </span>
              </div>
              <div className="goal-track">
                <span style={{ width: `${goalPct}%` }} />
              </div>
            </div>
          </section>

          <PathCompanion className="path-companion-mobile" mood={companionMood} onCelebrateEnd={onCompanionIdle} />

          {progress.welcomed ? null : (
            <section className="welcome">
              <h2>A little Spanish, out loud</h2>
              <p>Lessons are about ten exercises: listen, speak, match, and type. Missed words come back in Review. Progress stays on this device.</p>
              <button type="button" className="btn-quiet" onClick={onDismissWelcome}>
                Got it
              </button>
            </section>
          )}

          {due > 0 ? (
            <button type="button" className="due-banner" onClick={() => navigate('/review')}>
              {due} {due === 1 ? 'word' : 'words'} ready to review
            </button>
          ) : null}

          {levels.map((level) => {
            const levelRequired = level.units.filter((unit) => !unit.optional).flatMap((unit) => unit.lessons)
            const levelCleared = levelRequired.filter((lesson) => progress.completedLessons.includes(lesson.id)).length
            const levelDone = levelRequired.length > 0 && levelCleared === levelRequired.length
            let requiredUnitIndex = 0
            return (
              <section key={level.id} className="level-block" data-level={level.id}>
                <header className="level-head">
                  <div>
                    <h2>{level.title}</h2>
                    <p>{level.canDo}</p>
                    <p className="unit-count">
                      {levelCleared}/{levelRequired.length} required lessons
                    </p>
                  </div>
                  {levelDone ? null : (
                    <button type="button" className="btn-quiet" onClick={() => navigate(`/test-out/${level.id}`)}>
                      Test out
                    </button>
                  )}
                </header>
                {level.units.map((unit) => {
                  const cleared = unit.lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length
                  const indexLabel = unit.optional ? 'Opt' : String(++requiredUnitIndex)
                  return (
                    <section
                      key={unit.id}
                      className={unit.optional ? 'unit unit-optional' : 'unit'}
                      style={{ '--accent': unit.accent } as CSSProperties}
                    >
                      <header className="unit-head">
                        <span className="unit-index">{indexLabel}</span>
                        <div>
                          <h2>
                            {unit.title}
                            {unit.optional ? <span className="optional-tag">Optional</span> : null}
                          </h2>
                          <p>{unit.description}</p>
                          <p className="unit-count">
                            {cleared}/{unit.lessons.length} lessons
                            {unit.optional ? ' · not required' : ''}
                          </p>
                        </div>
                      </header>
                      <div className="lesson-list">
                        {unit.lessons.map((lesson) => {
                          const unlocked = isLessonUnlocked(lesson.id, progress.completedLessons)
                          const complete = progress.completedLessons.includes(lesson.id)
                          const current = next?.id === lesson.id
                          const state = !unlocked ? 'locked' : complete ? 'done' : current ? 'current' : 'open'
                          const action = complete ? 'Practice' : 'Start'
                          const timed =
                            typeof lesson.timedSeconds === 'number' && lesson.timedSeconds > 0
                              ? ` · ${Math.round(lesson.timedSeconds / 60)} min`
                              : ''
                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              className="lesson"
                              disabled={!unlocked}
                              aria-label={unlocked ? `${lesson.title}. ${action}` : `${lesson.title}, locked`}
                              onClick={() => navigate(`/lesson/${lesson.id}`)}
                            >
                              <span className="node" data-state={state}>
                                {state === 'locked' ? <LockIcon /> : state === 'done' ? <CheckIcon /> : unit.lessons.indexOf(lesson) + 1}
                              </span>
                              <span className="lesson-copy">
                                <span className="lesson-title">{lesson.title}</span>
                                <span className="lesson-meta">
                                  {lesson.exercises.length} exercises{timed} · {lesson.summary}
                                </span>
                              </span>
                              <span className="lesson-action">{unlocked ? action : ''}</span>
                            </button>
                          )
                        })}
                      </div>
                    </section>
                  )
                })}
              </section>
            )
          })}
        </div>

        <aside className="path-aside">
          <PathCompanion className="path-companion-aside" mood={companionMood} />
          <h2>On this path</h2>
          <ul>
            <li>Listen, then read the phrase.</li>
            <li>Say it when your browser can hear you.</li>
            <li>Misses return in Review, spaced out.</li>
            <li>Optional units never block Continue.</li>
          </ul>
          <p className="aside-phrase" lang="es">
            Por favor
          </p>
          <p className="aside-en">Please</p>
          {due > 0 ? (
            <button type="button" className="btn-primary" onClick={() => navigate('/review')}>
              Review {due}
            </button>
          ) : (
            <p className="fine">Hearts reset every lesson. Five misses ends the round.</p>
          )}
        </aside>
      </div>
    </div>
  )
}

function greeting(now = new Date()): { es: string; en: string } {
  const hour = now.getHours()
  if (hour < 12) return { es: 'Buenos días', en: 'Good morning' }
  if (hour < 19) return { es: 'Buenas tardes', en: 'Good afternoon' }
  return { es: 'Buenas noches', en: 'Good night' }
}
