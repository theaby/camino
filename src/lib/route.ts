export type Route =
  | { name: 'path' }
  | { name: 'review' }
  | { name: 'profile' }
  | { name: 'lesson'; lessonId: string }

export function readRoute(): Route {
  const raw = window.location.hash.replace(/^#/, '')
  const path = raw.startsWith('/') ? raw : `/${raw}`
  if (path.startsWith('/lesson/')) {
    return { name: 'lesson', lessonId: decodeURIComponent(path.slice('/lesson/'.length)) }
  }
  if (path === '/review') return { name: 'review' }
  if (path === '/profile') return { name: 'profile' }
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
