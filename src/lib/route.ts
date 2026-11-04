export type AccountMode = 'sign-in' | 'sign-up' | 'reset'

export type Route =
  | { name: 'path' }
  | { name: 'review' }
  | { name: 'profile' }
  | { name: 'account'; mode: AccountMode }
  | { name: 'lesson'; lessonId: string }

export function readRoute(): Route {
  const raw = window.location.hash.replace(/^#/, '')
  const path = raw.startsWith('/') ? raw : `/${raw}`
  if (path.startsWith('/lesson/')) {
    return { name: 'lesson', lessonId: decodeURIComponent(path.slice('/lesson/'.length)) }
  }
  if (path === '/review') return { name: 'review' }
  if (path === '/profile') return { name: 'profile' }
  if (path === '/account' || path === '/account/sign-in') return { name: 'account', mode: 'sign-in' }
  if (path === '/account/sign-up') return { name: 'account', mode: 'sign-up' }
  if (path === '/account/reset') return { name: 'account', mode: 'reset' }
  return { name: 'path' }
}

export function navigate(path: string): void {
  const hash = `#${path.startsWith('/') ? path : `/${path}`}`
  if (window.location.hash === hash) {
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    return
  }
  window.location.hash = hash
}
