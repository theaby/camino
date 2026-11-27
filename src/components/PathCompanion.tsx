import { useEffect } from 'react'

type Mood = 'idle' | 'celebrate'

type Props = {
  mood: Mood
  className?: string
  onCelebrateEnd?: () => void
}

const MASCOT_SRC = `${import.meta.env.BASE_URL}brand/mascot.jpg`

export function PathCompanion({ mood, className = '', onCelebrateEnd }: Props) {
  useEffect(() => {
    if (mood !== 'celebrate' || !onCelebrateEnd) return
    const timer = window.setTimeout(onCelebrateEnd, 1500)
    return () => window.clearTimeout(timer)
  }, [mood, onCelebrateEnd])

  return (
    <div className={`path-companion ${className}`.trim()} data-mood={mood} aria-hidden="true">
      <img className="path-companion-img" src={MASCOT_SRC} alt="" width={384} height={384} decoding="async" />
    </div>
  )
}
