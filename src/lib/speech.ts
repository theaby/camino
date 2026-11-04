type RecognitionResult = { 0: { transcript: string }; isFinal: boolean }

type RecognitionEvent = {
  resultIndex: number
  results: ArrayLike<RecognitionResult>
}

type Recognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: ((event: RecognitionEvent) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}

type RecognitionCtor = new () => Recognition

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const host = window as Window & {
    SpeechRecognition?: RecognitionCtor
    webkitSpeechRecognition?: RecognitionCtor
  }
  return host.SpeechRecognition ?? host.webkitSpeechRecognition ?? null
}

export function canRecognizeSpeech(): boolean {
  return recognitionCtor() !== null
}

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function spanishVoice(): SpeechSynthesisVoice | undefined {
  if (!canSpeak()) return undefined
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find((voice) => voice.lang.toLowerCase().startsWith('es-es')) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith('es'))
  )
}

export function speakSpanish(text: string): void {
  if (!canSpeak()) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'es-ES'
  utterance.rate = 0.92
  const voice = spanishVoice()
  if (voice) utterance.voice = voice
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking(): void {
  if (!canSpeak()) return
  window.speechSynthesis.cancel()
}

export function startRecognition(handlers: {
  onTranscript: (text: string) => void
  onError: (code: string) => void
  onEnd: () => void
}): { stop: () => void } | null {
  const Ctor = recognitionCtor()
  if (!Ctor) return null
  const recognition = new Ctor()
  recognition.lang = 'es-ES'
  recognition.interimResults = true
  recognition.continuous = false
  recognition.onresult = (event) => {
    let text = ''
    for (let i = 0; i < event.results.length; i++) {
      text += event.results[i]?.[0]?.transcript ?? ''
    }
    handlers.onTranscript(text.trim())
  }
  recognition.onerror = (event) => handlers.onError(event.error)
  recognition.onend = () => handlers.onEnd()
  try {
    recognition.start()
  } catch {
    handlers.onError('start-failed')
    return null
  }
  return {
    stop() {
      try {
        recognition.stop()
      } catch {
        // Already stopped.
      }
    },
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    window.speechSynthesis.getVoices()
  })
}
