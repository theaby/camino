import type { Unit, Vocab } from './types'
import { bank, choice, conjugate, lesson, listen, read, say, typeIn } from './build'

export const b1Vocab: Vocab[] = [
  { id: 'viajare', es: 'viajaré', en: 'I will travel' },
  { id: 'voy-a', es: 'voy a', en: 'I am going to' },
  { id: 'tendre', es: 'tendré', en: 'I will have' },
  { id: 'hare', es: 'haré', en: 'I will do' },
  { id: 'gustaria', es: 'me gustaría', en: 'I would like' },
  { id: 'podria', es: 'podría', en: 'I could / could you' },
  { id: 'he-comido', es: 'he comido', en: 'I have eaten' },
  { id: 'ha-dicho', es: 'ha dicho', en: 'he/she has said' },
  { id: 'hemos-ido', es: 'hemos ido', en: 'we have gone' },
  { id: 'para-ti', es: 'para ti', en: 'for you' },
  { id: 'por-el-parque', es: 'por el parque', en: 'through the park' },
  { id: 'por-tres-horas', es: 'por tres horas', en: 'for three hours' },
  { id: 'creo-que', es: 'creo que', en: 'I think that' },
  { id: 'estoy-de-acuerdo', es: 'estoy de acuerdo', en: 'I agree' },
  { id: 'me-parece', es: 'me parece', en: 'it seems to me' },
  { id: 'chocolate', es: 'chocolate', en: 'chocolate' },
  { id: 'monte-alban', es: 'Monte Albán', en: 'Monte Albán' },
  { id: 'tomare', es: 'tomaré', en: 'I will take' },
]

const oaxaca =
  'El año pasado viajé a Oaxaca. El primer día visité el mercado y compré chocolate. Mientras caminaba por el centro, conocí a una familia que me invitó a comer. Al día siguiente fui a Monte Albán. Hacía sol y el lugar era impresionante. Por la noche estaba cansado, pero feliz.'

const plans =
  'Mañana voy a salir temprano. Tomaré el tren de las ocho y llegaré a las diez. Me gustaría visitar el centro por la tarde.'

export const b1Units: Unit[] = [
  {
    id: 'b1-narrative',
    title: 'Telling a story',
    description: 'Finished events against the background of how things were.',
    accent: '#3D4F8A',
    lessons: [
      lesson('b1-story', 'One day in the past', 'Pretérito for events, imperfect for the scene.', [
        read(
          'b1-story-1',
          'Ayer llovía cuando salí de casa. Llevaba un abrigo porque hacía frío. En la esquina encontré a Lucía y tomamos un café.',
          'What was the weather like when the narrator left?',
          'It was raining',
          ['It was raining', 'It was sunny', 'It had already stopped', 'It was night'],
          ['era'],
          'en',
          'Llovía sets the scene. Salí and encontré are the events.',
        ),
        choice('b1-story-2', 'en-es', 'The background weather', 'Llovía', ['Llovía', 'Llovió una vez', 'Va a llover', 'Ha llovido'], ['vivia']),
        listen('b1-story-3', 'En la esquina encontré a Lucía', 'I met Lucía on the corner', ['I met Lucía on the corner', 'I used to meet Lucía', 'Lucía was on every corner', 'I will meet Lucía'], ['visite']),
        conjugate('b1-story-4', 'Ayer yo ___ de casa a las ocho. (salir)', 'salí', ['fui'], [], 'Salir: salí, saliste, salió.'),
        bank('b1-story-5', 'It was cold', ['Hacía', 'frío'], ['Hizo', 'ayer'], ['tenia']),
        typeIn('b1-story-6', 'en-es', 'I met', 'conocí', ['visite'], ['conoci']),
        say('b1-story-7', 'Ayer llovía cuando salí', 'It was raining when I left yesterday', ['era']),
        typeIn('b1-story-8', 'en-es', 'I left', 'salí', ['fui']),
      ]),
      lesson('b1-read-trip', 'A trip to Oaxaca', 'Read a short account and answer.', [
        read('b1-read-trip-1', oaxaca, 'What did the narrator buy?', 'Chocolate', ['Chocolate', 'A train ticket', 'A dog', 'Nothing'], ['chocolate']),
        read('b1-read-trip-2', oaxaca, 'How did the narrator feel at night?', 'Tired but happy', ['Tired but happy', 'Angry and lost', 'Still at the market', 'Afraid of the sun'], ['monte-alban']),
        choice('b1-read-trip-3', 'en-es', 'the next day', 'al día siguiente', ['al día siguiente', 'todos los días', 'cuando era niño', 'por la mañana siempre'], ['visite']),
        listen('b1-read-trip-4', 'Hacía sol y el lugar era impresionante', 'It was sunny and the place was impressive', ['It was sunny and the place was impressive', 'It rained all day', 'The market was closed', 'They left at night'], ['monte-alban']),
        bank('b1-read-trip-5', 'I was tired', ['Estaba', 'cansado'], ['Era', 'soy'], ['cansado']),
        typeIn('b1-read-trip-6', 'en-es', 'I bought', 'compré', ['chocolate']),
        say('b1-read-trip-7', 'El primer día visité el mercado', 'The first day I visited the market', ['visite']),
        typeIn('b1-read-trip-8', 'es-en', 'conocí', 'I met', ['visite']),
      ]),
    ],
  },
  {
    id: 'b1-ahead',
    title: 'Looking ahead',
    description: 'Future, conditional, and what you would like.',
    accent: '#1F6F8A',
    lessons: [
      lesson('b1-future', 'I will', 'Viajaré, and voy a viajar.', [
        choice('b1-future-1', 'en-es', 'I will travel', 'Viajaré', ['Viajaré', 'Viajé', 'Viajaba', 'Viajo'], ['viajare'], 'Simple future: infinitive plus -é, -ás, -á, -emos, -án.'),
        listen('b1-future-2', 'Voy a salir temprano', 'I am going to leave early', ['I am going to leave early', 'I left early', 'I used to leave early', 'I would like to leave'], ['voy-a']),
        conjugate('b1-future-3', 'Mañana yo ___ tiempo. (tener)', 'tendré', ['tendre'], [], 'Tener in the future is tendré, not teneré.'),
        choice('b1-future-4', 'es-en', 'Haré', 'I will do', ['I will do', 'I did', 'I was doing', 'I have done'], ['hare']),
        bank('b1-future-5', 'I am going to travel', ['Voy', 'a', 'viajar'], ['Viajaré', 'ayer'], ['voy-a']),
        typeIn('b1-future-6', 'en-es', 'I will have', 'tendré', ['tendre']),
        say('b1-future-7', 'Mañana viajaré a Oaxaca', 'Tomorrow I will travel to Oaxaca', ['viajare']),
        typeIn('b1-future-8', 'en-es', 'I will do', 'haré', ['hare']),
      ]),
      lesson('b1-conditional', 'I would', 'Polite requests and wishes.', [
        choice('b1-conditional-1', 'en-es', 'I would like a coffee', 'Me gustaría un café', ['Me gustaría un café', 'Me gusta un café', 'Me gustó un café', 'Me gustarán un café'], ['gustaria']),
        listen('b1-conditional-2', '¿Podría ayudarme?', 'Could you help me?', ['Could you help me?', 'Can you help me tomorrow?', 'Did you help me?', 'You used to help me'], ['podria'], 'Podría is softer than puedes.'),
        conjugate('b1-conditional-3', 'Yo ___ más tiempo. (tener)', 'tendría', ['tendre'], [], 'Conditional of tener: tendría.'),
        bank('b1-conditional-4', 'I would like water', ['Me', 'gustaría', 'agua'], ['gusta', 'gustó'], ['gustaria']),
        typeIn('b1-conditional-5', 'en-es', 'I could', 'podría', ['podria']),
        choice('b1-conditional-6', 'es-en', 'Te gustaría', 'You would like', ['You would like', 'You like', 'You liked', 'You will like'], ['gustaria']),
        say('b1-conditional-7', 'Me gustaría un café, por favor', 'I would like a coffee, please', ['gustaria']),
        typeIn('b1-conditional-8', 'en-es', 'Could you', 'podría', ['podria']),
      ]),
    ],
  },
  {
    id: 'b1-links',
    title: 'Have done, por and para',
    description: 'The present perfect, and two ways to say for.',
    accent: '#C4553A',
    lessons: [
      lesson('b1-perfect', 'I have done it', 'He comido, has vivido, ha dicho.', [
        choice('b1-perfect-1', 'en-es', 'I have eaten', 'He comido', ['He comido', 'He comí', 'Había comido', 'Comía'], ['he-comido'], 'Haber plus the participle: he, has, ha, hemos, han.'),
        listen('b1-perfect-2', 'Hoy ya he desayunado', 'I have already had breakfast today', ['I have already had breakfast today', 'I used to have breakfast', 'I will have breakfast', 'She has already left'], ['he-comido']),
        conjugate('b1-perfect-3', 'Nosotros ___ al museo. (haber + ir)', 'hemos ido', ['hemos-ido'], [], 'Ir uses ido: he ido, hemos ido.'),
        choice('b1-perfect-4', 'es-en', 'Ha dicho', 'She has said', ['She has said', 'She said yesterday once', 'She used to say', 'She would say'], ['ha-dicho']),
        bank('b1-perfect-5', 'I have eaten bread', ['He', 'comido', 'pan'], ['He', 'comí', 'comía'], ['he-comido']),
        typeIn('b1-perfect-6', 'en-es', 'We have gone', 'hemos ido', ['hemos-ido']),
        say('b1-perfect-7', 'Hoy ya he comido', 'I have already eaten today', ['he-comido']),
        typeIn('b1-perfect-8', 'en-es', 'She has said', 'ha dicho', ['ha-dicho']),
      ]),
      lesson('b1-por-para', 'Por and para', 'Cause, duration, purpose, and recipient.', [
        choice('b1-por-para-1', 'en-es', 'This gift is for you', 'Este regalo es para ti', ['Este regalo es para ti', 'Este regalo es por ti', 'Este regalo está para ti', 'Este regalo es por tres horas'], ['para-ti'], 'Para marks the recipient or the purpose.'),
        listen('b1-por-para-2', 'Caminamos por el parque', 'We walked through the park', ['We walked through the park', 'We walked in order to find the park', 'The park is for us', 'We will walk tomorrow'], ['por-el-parque'], 'Por can mean through or along.'),
        choice('b1-por-para-3', 'en-es', 'for three hours', 'por tres horas', ['por tres horas', 'para tres horas', 'por el viernes', 'para ti tres'], ['por-tres-horas'], 'Duration uses por.'),
        bank('b1-por-para-4', 'The homework is for Monday', ['La', 'tarea', 'es', 'para', 'el', 'lunes'], ['por', 'tres'], ['para-ti']),
        typeIn('b1-por-para-5', 'en-es', 'for you', 'para ti', ['para-ti']),
        choice('b1-por-para-6', 'es-en', 'Gracias por tu ayuda', 'Thanks for your help', ['Thanks for your help', 'Thanks in order to help you', 'Thanks for Monday', 'Thanks through the park'], ['por-tres-horas']),
        say('b1-por-para-7', 'Este libro es para ti', 'This book is for you', ['para-ti']),
        typeIn('b1-por-para-8', 'en-es', 'through the park', 'por el parque', ['por-el-parque']),
      ]),
    ],
  },
  {
    id: 'b1-views',
    title: 'Opinions and plans',
    description: 'Say what you think, and listen to a plan.',
    accent: '#1F7A4D',
    lessons: [
      lesson('b1-opinions', 'I think that', 'Creo que, me parece, estoy de acuerdo.', [
        choice('b1-opinions-1', 'en-es', 'I think that it is important', 'Creo que es importante', ['Creo que es importante', 'Creo que sea importante', 'Dudo que es importante', 'Quiero que es importante'], ['creo-que'], 'After creo que, a sure opinion stays in the indicative: es.'),
        listen('b1-opinions-2', 'Pienso que tienes razón', 'I think you are right', ['I think you are right', 'I doubt you are right', 'I want you to be right', 'You were right yesterday'], ['creo-que']),
        choice('b1-opinions-3', 'es-en', 'Estoy de acuerdo', 'I agree', ['I agree', 'I doubt it', 'I used to agree', 'I will agree someday'], ['estoy-de-acuerdo']),
        bank('b1-opinions-4', 'It seems fine to me', ['Me', 'parece', 'bien'], ['dudo', 'que'], ['me-parece']),
        typeIn('b1-opinions-5', 'en-es', 'I agree', 'estoy de acuerdo', ['estoy-de-acuerdo']),
        choice('b1-opinions-6', 'en-es', "I don't agree", 'No estoy de acuerdo', ['No estoy de acuerdo', 'No soy de acuerdo', 'No creo de acuerdo', 'No dudo de acuerdo'], ['estoy-de-acuerdo']),
        say('b1-opinions-7', 'Creo que es una buena idea', 'I think it is a good idea', ['creo-que']),
        typeIn('b1-opinions-8', 'en-es', 'it seems to me', 'me parece', ['me-parece']),
      ]),
      lesson('b1-plans', 'Tomorrow’s plan', 'Listen to a longer plan.', [
        listen('b1-plans-1', plans, 'She will take the eight o’clock train', ['She will take the eight o’clock train', 'She already took the train', 'She used to take the train', 'She might skip the trip'], ['tomare'], 'Listen for the whole plan, not just one word.'),
        read(
          'b1-plans-2',
          plans,
          'What would she like to do in the afternoon?',
          'Visit the center',
          ['Visit the center', 'Stay home', 'Buy chocolate', 'Return at eight'],
          ['gustaria'],
        ),
        choice('b1-plans-3', 'en-es', 'I will take', 'tomaré', ['tomaré', 'tomé', 'tomaba', 'tomo'], ['tomare']),
        conjugate('b1-plans-4', 'Yo ___ a las diez. (llegar)', 'llegaré', ['viajare'], [], 'Future of llegar: llegaré.'),
        bank('b1-plans-5', 'I am going to leave early', ['Voy', 'a', 'salir', 'temprano'], ['Salí', 'ayer'], ['voy-a']),
        typeIn('b1-plans-6', 'en-es', 'I would like', 'me gustaría', ['gustaria']),
        say('b1-plans-7', 'Mañana voy a salir temprano y tomaré el tren', 'Tomorrow I am going to leave early and I will take the train', ['voy-a', 'tomare']),
        typeIn('b1-plans-8', 'en-es', 'I will arrive', 'llegaré', ['tomare']),
      ]),
    ],
  },
]
