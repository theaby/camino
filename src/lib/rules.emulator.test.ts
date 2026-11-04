import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const projectId = process.env.GCLOUD_PROJECT || 'demo-camino'
const host = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080'

function token(uid: string | null): string {
  if (!uid) return ''
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode({
    aud: projectId,
    iat: now,
    exp: now + 3600,
    iss: `https://securetoken.google.com/${projectId}`,
    sub: uid,
    user_id: uid,
    auth_time: now,
    firebase: { sign_in_provider: 'password', identities: {} },
  })}.`
}

function documentUrl(path: string): string {
  return `http://${host}/v1/projects/${projectId}/databases/(default)/documents/${path}`
}

async function call(path: string, uid: string | null, method: 'GET' | 'PATCH', body?: unknown): Promise<{ status: number; text: string }> {
  const headers: Record<string, string> = {}
  const bearer = token(uid)
  if (bearer) headers.authorization = `Bearer ${bearer}`
  if (body) headers['content-type'] = 'application/json'
  const response = await fetch(documentUrl(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  return { status: response.status, text: await response.text() }
}

const xp = { fields: { xp: { integerValue: '10' }, streak: { integerValue: '1' } } }

describe('firestore rules', () => {
  beforeAll(async () => {
    const health = await fetch(`http://${host}/`)
    if (!health.ok && health.status !== 404) {
      throw new Error(`Firestore emulator is not reachable at ${host}`)
    }
  })

  afterAll(async () => {
    await fetch(`http://${host}/emulator/v1/projects/${projectId}/databases/(default)/documents`, { method: 'DELETE' })
  })

  it('lets a signed-in person read and write only their own progress', async () => {
    expect((await call('users/alice', 'alice', 'PATCH', xp)).status).toBe(200)
    expect((await call('users/alice', 'alice', 'GET')).status).toBe(200)
  })

  it('stores placement lesson ids on the user document', async () => {
    const placed = {
      fields: {
        xp: { integerValue: '0' },
        completedLessons: {
          arrayValue: { values: [{ stringValue: 'greetings-hello' }, { stringValue: 'a1-ask' }, { stringValue: 'a2-pret-ar' }] },
        },
      },
    }
    expect((await call('users/alice', 'alice', 'PATCH', placed)).status).toBe(200)
    const read = await call('users/alice', 'alice', 'GET')
    expect(read.status).toBe(200)
    expect(read.text).toContain('a1-ask')
    expect(read.text).toContain('a2-pret-ar')
  })

  it('rejects a signed-out read or write', async () => {
    expect((await call('users/alice', null, 'GET')).status).toBe(403)
    expect((await call('users/alice', null, 'PATCH', xp)).status).toBe(403)
  })

  it('rejects reading or writing someone else’s progress', async () => {
    expect((await call('users/alice', 'alice', 'PATCH', xp)).status).toBe(200)
    expect((await call('users/alice', 'bob', 'GET')).status).toBe(403)
    expect((await call('users/alice', 'bob', 'PATCH', xp)).status).toBe(403)
    expect((await call('users/bob', 'alice', 'PATCH', xp)).status).toBe(403)
  })

  it('rejects documents outside the user progress path', async () => {
    expect((await call('courses/spanish', 'alice', 'PATCH', xp)).status).toBe(403)
    expect((await call('courses/spanish', 'alice', 'GET')).status).toBe(403)
  })
})
