import { a1ExtraUnits, a1ExtraVocab } from './a1-extra'
import { a2Units, a2Vocab } from './a2'
import { b1Units, b1Vocab } from './b1'
import { b2Units, b2Vocab } from './b2'
import { c1Units, c1Vocab } from './c1'
import { course as starterUnits, vocab as starterVocab } from './course'
import type { Level, Vocab } from './types'

export const vocab: Vocab[] = [...starterVocab, ...a1ExtraVocab, ...a2Vocab, ...b1Vocab, ...b2Vocab, ...c1Vocab]

export const levels: Level[] = [
  {
    id: 'A1',
    title: 'A1 · Beginner',
    canDo: 'Greetings, the present, ser and estar, and everyday needs.',
    units: [...starterUnits, ...a1ExtraUnits],
  },
  {
    id: 'A2',
    title: 'A2 · Elementary',
    canDo: 'A finished past, routines, pronouns, and how things used to be.',
    units: a2Units,
  },
  {
    id: 'B1',
    title: 'B1 · Intermediate',
    canDo: 'Stories, the future, the conditional, and por versus para.',
    units: b1Units,
  },
  {
    id: 'B2',
    title: 'B2 · Upper intermediate',
    canDo: 'The subjunctive, earlier pasts, and longer listening.',
    units: b2Units,
  },
  {
    id: 'C1',
    title: 'C1 · Advanced',
    canDo: 'Nuance, register, and a longer argument.',
    units: c1Units,
  },
]
