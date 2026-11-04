import { useEffect, useState, type FormEvent } from 'react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  type Auth,
} from 'firebase/auth'
import { authErrorMessage } from '../lib/auth-errors'
import { navigate } from '../lib/route'

export type AccountMode = 'sign-in' | 'sign-up' | 'reset'

type Props = {
  mode: AccountMode
  configured: boolean
  auth: Auth | null
  onSignedIn: () => void
}

export function AccountScreen({ mode, configured, auth, onSignedIn }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setError(null)
    setNotice(null)
    setPassword('')
  }, [mode])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!auth) return
    setError(null)
    setNotice(null)
    const trimmed = email.trim()
    if (!trimmed.includes('@')) {
      setError('Enter the email for your account.')
      return
    }
    if (mode !== 'reset' && password.length < 6) {
      setError('Use at least 6 characters.')
      return
    }
    setBusy(true)
    try {
      if (mode === 'sign-up') {
        await createUserWithEmailAndPassword(auth, trimmed, password)
        onSignedIn()
      } else if (mode === 'sign-in') {
        await signInWithEmailAndPassword(auth, trimmed, password)
        onSignedIn()
      } else {
        await sendPasswordResetEmail(auth, trimmed)
        setNotice('If that email has an account, a reset link is on its way.')
      }
    } catch (caught) {
      if (mode === 'reset') {
        setNotice('If that email has an account, a reset link is on its way.')
      } else {
        setError(authErrorMessage(caught))
      }
    } finally {
      setBusy(false)
    }
  }

  async function google() {
    if (!auth) return
    setError(null)
    setBusy(true)
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      onSignedIn()
    } catch (caught) {
      const code = typeof caught === 'object' && caught && 'code' in caught ? String((caught as { code: unknown }).code) : ''
      if (code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, provider)
          return
        } catch (redirectError) {
          setError(authErrorMessage(redirectError))
        }
      } else if (code !== 'auth/popup-closed-by-user') {
        setError(authErrorMessage(caught))
      }
    } finally {
      setBusy(false)
    }
  }

  const title = mode === 'sign-up' ? 'Create account' : mode === 'reset' ? 'Reset password' : 'Sign in'
  const submitLabel = busy
    ? 'Please wait…'
    : mode === 'sign-up'
      ? 'Create account'
      : mode === 'reset'
        ? 'Send reset link'
        : 'Sign in'

  return (
    <div className="panel">
      <p className="kicker">Account</p>
      <h1>{title}</h1>
      {configured && auth ? (
        <>
          <p className="lede">
            {mode === 'reset'
              ? 'We’ll email you a link to choose a new password.'
              : 'Lessons, XP, your streak, and review words follow this account.'}
          </p>
          {mode !== 'reset' ? (
            <>
              <button type="button" className="btn-google" disabled={busy} onClick={() => void google()}>
                Continue with Google
              </button>
              <p className="divider">or email</p>
            </>
          ) : null}
          <form className="form" onSubmit={(event) => void onSubmit(event)}>
            <label className="field">
              Email
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            {mode === 'reset' ? null : (
              <label className="field">
                Password
                <input
                  type="password"
                  autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={6}
                  required
                />
              </label>
            )}
            {error ? (
              <p className="form-error" role="alert">
                {error}
              </p>
            ) : null}
            {notice ? (
              <p className="form-notice" role="status">
                {notice}
              </p>
            ) : null}
            <button type="submit" className="btn-primary" disabled={busy}>
              {submitLabel}
            </button>
          </form>
          <div className="form-links">
            {mode === 'sign-in' ? (
              <>
                <button type="button" className="text-button" onClick={() => navigate('/account/sign-up')}>
                  Create an account
                </button>
                <button type="button" className="text-button" onClick={() => navigate('/account/reset')}>
                  Forgot password
                </button>
              </>
            ) : (
              <button type="button" className="text-button" onClick={() => navigate('/account')}>
                Back to sign in
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="lede">Accounts aren’t turned on for this copy of Camino. You can keep practicing as a guest.</p>
          <button type="button" className="btn-primary" onClick={() => navigate('/')}>
            Back to the path
          </button>
        </>
      )}
    </div>
  )
}
