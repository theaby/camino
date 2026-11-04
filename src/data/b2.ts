import type { Unit, Vocab } from './types'
import { bank, choice, conjugate, lesson, listen, match, read, say, typeIn } from './build'

export const b2Vocab: Vocab[] = [
  { id: 'vengas', es: 'vengas', en: 'you come (subjunctive)' },
  { id: 'estudies', es: 'estudies', en: 'you study (subjunctive)' },
  { id: 'sea', es: 'sea', en: 'he/she is (subjunctive)' },
  { id: 'tenga', es: 'tenga', en: 'he/she has (subjunctive)' },
  { id: 'se-que', es: 'sé que', en: 'I know that' },
  { id: 'dudo-que', es: 'dudo que', en: 'I doubt that' },
  { id: 'habia-salido', es: 'había salido', en: 'I had left' },
  { id: 'habria-ido', es: 'habría ido', en: 'I would have gone' },
  { id: 'el-libro-que', es: 'el libro que leí', en: 'the book that I read' },
  { id: 'con-quien', es: 'con quien', en: 'with whom' },
  { id: 'cuyo', es: 'cuyo', en: 'whose' },
  { id: 'barrio', es: 'barrio', en: 'neighborhood' },
]

const city =
  'Este barrio era tranquilo, pero en diez años ha cambiado. Abrieron cafés y subieron los alquileres. Quienes vivían aquí desde niños ya no pueden quedarse. El cambio trajo vida nueva, aunque también empujó a muchas familias fuera.'

const talk =
  'Quiero que revisemos el plan antes del viernes. No creo que tengamos tiempo si esperamos hasta el lunes. Es importante que cada persona envíe sus notas hoy.'

export const b2Units: Unit[] = [
  {
    id: 'b2-subjunctive',
    title: 'The present subjunctive',
    description: 'Wishes, hopes, and doubt.',
    accent: '#A33B6A',
    lessons: [
      lesson('b2-wish', 'I want you to', 'Quiero que, espero que, es importante que.', [
        choice('b2-wish-1', 'en-es', 'I want you to come', 'Quiero que vengas', ['Quiero que vengas', 'Quiero que vienes', 'Quiero venir tú', 'Sé que vienes'], ['vengas'], 'After quiero que, the next verb is subjunctive.'),
        listen('b2-wish-2', 'Espero que estés bien', 'I hope you are well', ['I hope you are well', 'I know you are well', 'You were well', 'I want to be well'], ['estudies']),
        conjugate('b2-wish-3', 'Es importante que tú ___. (estudiar)', 'estudies', ['estudies'], [], 'Estudiar in the subjunctive: estudie, estudies, estudie.'),
        bank('b2-wish-4', 'I want you to speak', ['Quiero', 'que', 'hables'], ['hablas', 'sé'], ['vengas']),
        choice('b2-wish-5', 'es-en', 'Espero que venga', 'I hope he comes', ['I hope he comes', 'I know he comes', 'He came', 'He will have come'], ['vengas']),
        typeIn('b2-wish-6', 'en-es', 'you come (after que)', 'vengas', ['vengas']),
        say('b2-wish-7', 'Quiero que vengas mañana', 'I want you to come tomorrow', ['vengas']),
        typeIn('b2-wish-8', 'en-es', 'you study (after que)', 'estudies', ['estudies']),
      ]),
      lesson('b2-doubt', 'Doubt and certainty', 'Dudo que sea, but sé que es.', [
        choice('b2-doubt-1', 'en-es', 'I doubt that it is true', 'Dudo que sea verdad', ['Dudo que sea verdad', 'Dudo que es verdad', 'Sé que sea verdad', 'Creo que sea verdad'], ['dudo-que', 'sea'], 'Doubt takes the subjunctive. Sé que takes the indicative.'),
        listen('b2-doubt-2', 'No creo que tenga tiempo', 'I don’t think she has time', ['I don’t think she has time', 'I know she has time', 'She had time yesterday', 'She will have time'], ['tenga']),
        choice('b2-doubt-3', 'en-es', 'I know that it is true', 'Sé que es verdad', ['Sé que es verdad', 'Sé que sea verdad', 'Dudo que es verdad', 'No creo que es verdad'], ['se-que']),
        conjugate('b2-doubt-4', 'Dudo que ella ___ razón. (tener)', 'tenga', ['tenga'], [], 'Tener subjunctive: tenga, tengas, tenga.'),
        bank('b2-doubt-5', 'I know that you are right', ['Sé', 'que', 'tienes', 'razón'], ['tengas', 'dudo'], ['se-que']),
        typeIn('b2-doubt-6', 'en-es', 'I doubt that', 'dudo que', ['dudo-que']),
        say('b2-doubt-7', 'Dudo que sea verdad, pero sé que es posible', 'I doubt it is true, but I know it is possible', ['dudo-que', 'se-que']),
        match('b2-doubt-8', [
          { es: 'dudo que', en: 'I doubt that', vocabId: 'dudo-que' },
          { es: 'sé que', en: 'I know that', vocabId: 'se-que' },
          { es: 'sea', en: 'is (subjunctive)', vocabId: 'sea' },
          { es: 'tenga', en: 'has (subjunctive)', vocabId: 'tenga' },
        ]),
      ]),
    ],
  },
  {
    id: 'b2-distance',
    title: 'Further past and which one',
    description: 'Had done, would have done, and relative clauses.',
    accent: '#3D4F8A',
    lessons: [
      lesson('b2-perfects', 'Had done, would have', 'Había salido. Habría ido.', [
        choice('b2-perfects-1', 'en-es', 'I had already left', 'Ya había salido', ['Ya había salido', 'Ya he salido', 'Ya salí', 'Ya saldría'], ['habia-salido'], 'Había plus the participle is earlier than another past event.'),
        listen('b2-perfects-2', 'Cuando llegué, ya había comido', 'When I arrived, she had already eaten', ['When I arrived, she had already eaten', 'When I arrive, she eats', 'She would have eaten tomorrow', 'She has just started eating'], ['habia-salido']),
        conjugate('b2-perfects-3', 'Yo ___ ido, pero estaba enfermo. (haber, conditional)', 'habría', ['habria-ido'], [], 'Conditional of haber: habría. Habría ido.'),
        choice('b2-perfects-4', 'es-en', 'Habría llamado', 'I would have called', ['I would have called', 'I had called', 'I have called', 'I will call'], ['habria-ido']),
        bank('b2-perfects-5', 'I would have gone', ['Habría', 'ido'], ['Había', 'he'], ['habria-ido']),
        typeIn('b2-perfects-6', 'en-es', 'I had left', 'había salido', ['habia-salido']),
        say('b2-perfects-7', 'Cuando llegué, ya había salido', 'When I arrived, she had already left', ['habia-salido']),
        typeIn('b2-perfects-8', 'en-es', 'I would have gone', 'habría ido', ['habria-ido']),
      ]),
      lesson('b2-relative', 'Which and whose', 'Que, quien, cuyo.', [
        choice('b2-relative-1', 'en-es', 'the book that I read', 'el libro que leí', ['el libro que leí', 'el libro quien leí', 'el libro cuyo leí', 'el libro lo que leí'], ['el-libro-que']),
        listen('b2-relative-2', 'La persona con quien hablé es mi jefa', 'The person I spoke with is my boss', ['The person I spoke with is my boss', 'The book that I read is long', 'Whose son studies here', 'I would have spoken'], ['con-quien']),
        choice('b2-relative-3', 'es-en', 'cuyo', 'whose', ['whose', 'that', 'with whom', 'which one'], ['cuyo'], 'Cuyo agrees with the thing owned: cuyo hijo, cuya hija.'),
        bank('b2-relative-4', 'the woman whose son studies here', ['la', 'mujer', 'cuyo', 'hijo', 'estudia', 'aquí'], ['que', 'quien'], ['cuyo']),
        typeIn('b2-relative-5', 'en-es', 'with whom', 'con quien', ['con-quien']),
        conjugate('b2-relative-6', 'El libro que yo ___ es largo. (leer, preterite)', 'leí', ['el-libro-que'], [], 'Leer preterite: leí, leíste, leyó.'),
        say('b2-relative-7', 'El libro que leí es largo', 'The book that I read is long', ['el-libro-que']),
        typeIn('b2-relative-8', 'en-es', 'whose', 'cuyo', ['cuyo']),
      ]),
    ],
  },
  {
    id: 'b2-longer',
    title: 'Longer listening and reading',
    description: 'Hold a paragraph and a short spoken request.',
    accent: '#C4553A',
    lessons: [
      lesson('b2-city', 'A changing neighborhood', 'Read for what changed and who left.', [
        {
          ...read('b2-city-1', city, 'What rose along with the new cafés?', 'The rents', ['The rents', 'The number of children', 'The train times', 'The river'], ['barrio']),
          task: 'Lectura · Texto',
        },
        read('b2-city-2', city, 'Who can no longer stay?', 'People who had lived there since childhood', ['People who had lived there since childhood', 'The new café owners', 'Tourists', 'Nobody'], ['barrio'], 'en', 'Aunque introduces a cost next to the benefit.'),
        choice('b2-city-3', 'es-en', 'alquileres', 'rents', ['rents', 'cafés', 'children', 'trains'], ['barrio']),
        listen('b2-city-4', 'El cambio trajo vida nueva, aunque también empujó a muchas familias fuera', 'The change brought new life, though it also pushed many families out', ['The change brought new life, though it also pushed many families out', 'Nothing changed', 'Families opened the cafés', 'Rents went down'], ['barrio']),
        bank('b2-city-5', 'The neighborhood was quiet', ['El', 'barrio', 'era', 'tranquilo'], ['fue', 'ayer'], ['barrio']),
        typeIn('b2-city-6', 'en-es', 'neighborhood', 'barrio', ['barrio']),
        say('b2-city-7', 'El barrio ha cambiado, aunque muchas familias se fueron', 'The neighborhood has changed, although many families left', ['barrio']),
        typeIn('b2-city-8', 'es-en', 'ha cambiado', 'it has changed', ['barrio']),
      ]),
      lesson('b2-listen', 'Before Friday', 'A longer spoken request.', [
        {
          ...listen('b2-listen-1', talk, 'She does not think they have time if they wait until Monday', ['She does not think they have time if they wait until Monday', 'She knows Monday is perfect', 'She wants to cancel the plan', 'She already sent the notes'], ['dudo-que'], 'The main point is the deadline, not a single verb.'),
          task: 'Audición · Mensaje',
          question: 'What is the problem if they wait until Monday?',
        },
        read('b2-listen-2', talk, 'What does she want the group to do before Friday?', 'Review the plan', ['Review the plan', 'Wait until Monday', 'Skip the notes', 'Leave the project'], ['vengas']),
        conjugate('b2-listen-3', 'Quiero que nosotros ___ el plan. (revisar)', 'revisemos', ['estudies'], [], 'Nosotros subjunctive ends in -emos for -ar: revisemos.'),
        choice('b2-listen-4', 'en-es', 'I don’t think that we have', 'No creo que tengamos', ['No creo que tengamos', 'No creo que tenemos', 'Sé que tengamos', 'Creo que tengamos tiempo siempre'], ['tenga']),
        bank('b2-listen-5', 'It is important that you send', ['Es', 'importante', 'que', 'envíes'], ['envías', 'sé'], ['estudies']),
        typeIn('b2-listen-6', 'en-es', 'we have (after no creo que)', 'tengamos', ['tenga']),
        say('b2-listen-7', 'Quiero que revisemos el plan antes del viernes', 'I want us to review the plan before Friday', ['vengas']),
        typeIn('b2-listen-8', 'en-es', 'you send (after que)', 'envíes', ['estudies']),
      ]),
    ],
  },
]
