import { a1DeepUnits, a1DeepVocab } from './a1-deep'
import { a1ExtraUnits, a1ExtraVocab } from './a1-extra'
import { a2DeepUnits, a2DeepVocab } from './a2-deep'
import { a2Units, a2Vocab } from './a2'
import { b1DeepUnits, b1DeepVocab } from './b1-deep'
import { b1Units, b1Vocab } from './b1'
import { b2DeepUnits, b2DeepVocab } from './b2-deep'
import { b2Units, b2Vocab } from './b2'
import { c1DeepUnits, c1DeepVocab } from './c1-deep'
import { c1Units, c1Vocab } from './c1'
import { c2Units, c2Vocab } from './c2'
import { course as starterUnits, vocab as starterVocab } from './course'
import {
  a1PolishUnits,
  a2PolishUnits,
  b1PolishUnits,
  b2PolishUnits,
  c1PolishUnits,
  c2PolishUnits,
  polishVocab,
} from './polish'
import type { Level, Vocab } from './types'

export const vocab: Vocab[] = [
  ...starterVocab,
  ...a1ExtraVocab,
  ...a1DeepVocab,
  ...a2Vocab,
  ...a2DeepVocab,
  ...b1Vocab,
  ...b1DeepVocab,
  ...b2Vocab,
  ...b2DeepVocab,
  ...c1Vocab,
  ...c1DeepVocab,
  ...c2Vocab,
  ...polishVocab,
]

export const levels: Level[] = [
  {
    id: 'A1',
    title: 'A1 · Beginner',
    canDo:
      'Greetings, the present, ser and estar, house and health basics, clothes, shopping, numbers to 100, phone and address, and weather.',
    units: [...starterUnits, ...a1ExtraUnits, ...a1DeepUnits, ...a1PolishUnits],
  },
  {
    id: 'A2',
    title: 'A2 · Elementary',
    canDo:
      'Past tenses, routines, comparisons, commands, indirect-object pronouns, leisure and sports, school and work days, and shopping dialogues.',
    units: [...a2Units, ...a2DeepUnits, ...a2PolishUnits],
  },
  {
    id: 'B1',
    title: 'B1 · Intermediate',
    canDo:
      'Travel narratives, work and study plans, advice, expanded por/para, reported speech lite, health and services, media and hobbies, and DELE-style plans.',
    units: [...b1Units, ...b1DeepUnits, ...b1PolishUnits],
  },
  {
    id: 'B2',
    title: 'B2 · Upper intermediate',
    canDo:
      'Emotion and impersonal subjunctive, cuando-future clauses, relatives (cuyo, lo que), discourse markers, and longer barrio/news/argument texts.',
    units: [...b2Units, ...b2DeepUnits, ...b2PolishUnits],
  },
  {
    id: 'C1',
    title: 'C1 · Advanced',
    canDo:
      'Concession and condition beyond aunque/si, imperfect subjunctive triggers, register pairs, advanced connectors, and denser arguments.',
    units: [...c1Units, ...c1DeepUnits, ...c1PolishUnits],
  },
  {
    id: 'C2',
    title: 'C2 · Mastery',
    canDo:
      'Textual cohesion and style, idioms, abstract debate, professional and academic genres, irony and hedging, upper-band grammar and functions, and precision editing.',
    units: [...c2Units, ...c2PolishUnits],
  },
]
