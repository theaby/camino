/** @vitest-environment happy-dom */
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import type { Exercise } from '../data/types'
import { Session } from './Session'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const please: Exercise = {
  id: 'fixture-please',
  type: 'choice',
  direction: 'en-es',
  prompt: 'please',
  options: ['Por favor', 'Hola', 'Adiós', 'Gracias'],
  answer: 'Por favor',
  vocabIds: ['por-favor'],
}

function key(name: string, shiftKey = false) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: name, shiftKey, bubbles: true, cancelable: true }))
}

describe('leave dialog keyboard', () => {
  let root: Root | undefined
  let host: HTMLDivElement | undefined

  afterEach(() => {
    act(() => root?.unmount())
    host?.remove()
    root = undefined
    host = undefined
  })

  it.each([
    ['lesson', true],
    ['review', false],
  ] as const)('traps focus for a %s exit and restores the opener', async (label, heartsEnabled) => {
    const exits: string[] = []
    host = document.createElement('div')
    document.body.appendChild(host)
    root = createRoot(host)
    await act(async () => {
      root?.render(
        <Session
          title={label}
          exercises={[please]}
          heartsEnabled={heartsEnabled}
          sound={false}
          preview={() => ({ xpGained: 0, streak: 0 })}
          onResult={() => {
            throw new Error('this fixture must not record progress')
          }}
          onExit={() => exits.push('leave')}
        />,
      )
    })

    const opener = host.querySelector<HTMLButtonElement>('[aria-label="Leave lesson"]')
    const answer = [...host.querySelectorAll('button')].find((button) => button.textContent === 'Por favor')
    expect(opener).toBeTruthy()
    expect(answer).toBeTruthy()
    opener?.focus()

    await act(async () => {
      opener?.click()
    })

    const surface = host.querySelector<HTMLElement>('.session-surface')
    const dialog = host.querySelector('[role="dialog"]')
    const keep = [...host.querySelectorAll('button')].find((button) => button.textContent === 'Keep going')
    const leave = [...host.querySelectorAll('button')].find((button) => button.textContent === 'Leave')
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
    expect(surface?.inert).toBe(true)
    expect(surface?.contains(answer ?? null)).toBe(true)
    expect(document.activeElement).toBe(keep)

    key('Tab')
    expect(document.activeElement).toBe(leave)
    key('Tab')
    expect(document.activeElement).toBe(keep)
    key('Tab', true)
    expect(document.activeElement).toBe(leave)
    key('Tab', true)
    expect(document.activeElement).toBe(keep)

    await act(async () => {
      key('Escape')
    })
    expect(host.querySelector('[role="dialog"]')).toBeNull()
    expect(document.activeElement).toBe(opener)
    expect(surface?.inert).toBe(false)

    await act(async () => {
      opener?.click()
    })
    const keepAgain = [...host.querySelectorAll('button')].find((button) => button.textContent === 'Keep going')
    expect(document.activeElement).toBe(keepAgain)
    await act(async () => {
      keepAgain?.click()
    })
    expect(host.querySelector('[role="dialog"]')).toBeNull()
    expect(document.activeElement).toBe(opener)

    await act(async () => {
      opener?.click()
    })
    const leaveAgain = [...host.querySelectorAll('button')].find((button) => button.textContent === 'Leave')
    await act(async () => {
      leaveAgain?.click()
    })
    expect(exits).toEqual(['leave'])
  })
})
