import { a1DeepUnits, a1DeepVocab } from './a1-deep'
import { a1ExtraUnits, a1ExtraVocab } from './a1-extra'
import { a2DeepUnits, a2DeepVocab } from './a2-deep'
import { a2Units, a2Vocab } from './a2'
import { b1Units, b1Vocab } from './b1'
import { b2Units, b2Vocab } from './b2'
import { c1Units, c1Vocab } from './c1'
import { course as starterUnits, vocab as starterVocab } from './course'
import type { Level, Vocab } from './types'

export const vocab: Vocab[] = [
  ...starterVocab,
  ...a1ExtraVocab,
  ...a1DeepVocab,
  ...a2Vocab,
  ...a2DeepVocab,
  ...b1Vocab,
  ...b2Vocab,
  ...c1Vocab,
]

export const levels: Level[] = [
  {
    id: 'A1',
    title: 'A1 · Beginner',
    canDo:
      'Greetings, the present, ser and estar, house and health basics, clothes, shopping, numbers to 100, phone and address, and weather.',
    units: [...starterUnits, ...a1ExtraUnits, ...a1DeepUnits],
  },
  {
    id: 'A2',
    title: 'A2 · Elementary',
    canDo:
      'Past tenses, routines, comparisons, commands, indirect-object pronouns, leisure and sports, school and work days, and shopping dialogues.',
    units: [...a2Units, ...a2DeepUnits],
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
