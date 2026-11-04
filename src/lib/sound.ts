let context: AudioContext | null = null

function audioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!context) context = new Ctor()
  if (context.state === 'suspended') void context.resume()
  return context
}

export function playCue(kind: 'ok' | 'no' | 'done'): void {
  const ctx = audioContext()
  if (!ctx) return
  const notes = kind === 'ok' ? [523.25, 659.25] : kind === 'done' ? [523.25, 659.25, 783.99] : [220, 174]
  const now = ctx.currentTime
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    osc.connect(gain)
    gain.connect(ctx.destination)
    const start = now + index * 0.09
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.07, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16)
    osc.start(start)
    osc.stop(start + 0.18)
  })
}
