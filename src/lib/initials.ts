/** Two letters from a name, or from the part of an email before @. */
export function userInitials(person: { displayName?: string | null; email?: string | null }): string {
  const name = person.displayName?.trim()
  const local = person.email?.split('@')[0]?.trim() ?? ''
  const source = name || local
  const parts = source
    .split(name ? /\s+/ : /[._-]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
  if (parts.length === 0) return ''
  const first = parts[0]!.charAt(0)
  const second = parts.length > 1 ? parts[parts.length - 1]!.charAt(0) : ''
  return (first + second).toLocaleUpperCase('en-US')
}
