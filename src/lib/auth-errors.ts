export function authErrorMessage(error: unknown): string {
  const code = typeof error === 'object' && error && 'code' in error ? String((error as { code: unknown }).code) : ''
  switch (code) {
    case 'auth/invalid-email':
      return 'That email doesn’t look right.'
    case 'auth/missing-password':
    case 'auth/missing-email':
      return 'Enter your email and a password.'
    case 'auth/weak-password':
      return 'Use at least 6 characters.'
    case 'auth/email-already-in-use':
      return 'That email already has an account. Sign in instead.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-login-credentials':
      return 'That email and password don’t match.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Wait a moment and try again.'
    case 'auth/network-request-failed':
      return 'You appear to be offline. Try again when you have a connection.'
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'The sign-in window was closed.'
    case 'auth/popup-blocked':
      return 'The browser blocked the sign-in window. Allow popups, or try email.'
    case 'auth/operation-not-allowed':
      return 'That sign-in method isn’t enabled in the Firebase project yet.'
    default:
      return 'Something went wrong. Try again.'
  }
}
