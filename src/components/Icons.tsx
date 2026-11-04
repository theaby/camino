type IconProps = { className?: string }

export function MarkIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#1F7A4D" />
      <circle cx="16" cy="13" r="5" fill="#F0B429" />
      <rect x="8" y="21" width="16" height="3.5" rx="1.75" fill="#F6F1E8" />
    </svg>
  )
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#E15A3A"
        d="M12 2s2.2 3.2 2.2 5.2c0 1.2-.6 2-1.2 2.4.9.2 2.5 1.1 2.5 3.2 0 2.6-2 4.7-5.5 4.7S4.5 15.4 4.5 12.8c0-2.4 1.6-4.1 2.8-5.4C8.6 6 9.4 4.4 9.4 4.4S10.2 6.2 12 8c.4-2 .0-6 0-6Z"
      />
    </svg>
  )
}

export function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-9.1C5 8 6.8 6.2 9 6.2c1.3 0 2.4.6 3 1.6.6-1 1.7-1.6 3-1.6 2.2 0 4 1.8 4 4.7C19 15.6 12 20 12 20Z"
        fill={filled ? '#E15A3A' : 'none'}
        stroke={filled ? '#E15A3A' : '#C9BDB0'}
        strokeWidth="1.7"
      />
    </svg>
  )
}

export function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M4 9h3.2L12 5.2v13.6L7.2 15H4V9Z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M15.2 9.2a3.2 3.2 0 0 1 0 5.6M17.6 7a6 6 0 0 1 0 10"
      />
    </svg>
  )
}

export function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M6.5 11a5.5 5.5 0 0 0 11 0M12 16.5V20" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="M5 12.5 9.2 17 19 7" />
    </svg>
  )
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="10" width="12" height="9" rx="2" fill="currentColor" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" d="M8.5 10V8a3.5 3.5 0 0 1 7 0v2" />
    </svg>
  )
}

export function LearnIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M4 7.5 12 4l8 3.5L12 11 4 7.5Z" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M7 9.2V15c1.6 1.4 3.3 2 5 2s3.4-.6 5-2V9.2" />
    </svg>
  )
}

export function ReviewIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M12 6.5A6.5 6.5 0 1 1 6.2 16"
      />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M6 11.5 4.8 16l4.4-.6" />
    </svg>
  )
}

export function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M6 19c1.2-2.4 3-3.5 6-3.5s4.8 1.1 6 3.5" />
    </svg>
  )
}
