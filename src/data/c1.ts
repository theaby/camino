import type { Unit, Vocab } from './types'
import { bank, choice, conjugate, lesson, listen, match, read, say, typeIn } from './build'

export const c1Vocab: Vocab[] = [
  { id: 'aunque-llueva', es: 'aunque llueva', en: 'even if it rains' },
  { id: 'aunque-llueve', es: 'aunque llueve', en: 'even though it is raining' },
  { id: 'a-menos-que', es: 'a menos que', en: 'unless' },
  { id: 'para-que', es: 'para que', en: 'so that' },
  { id: 'si-tuviera', es: 'si tuviera', en: 'if I had' },
  { id: 'si-hubiera', es: 'si hubiera', en: 'if I had (past)' },
  { id: 'habria-llamado', es: 'habría llamado', en: 'I would have called' },
  { id: 'podria-usted', es: '¿Podría usted…?', en: 'Could you (formal)' },
  { id: 'me-mandas', es: '¿Me mandas…?', en: 'Will you send me (informal)' },
  { id: 'sin-embargo', es: 'sin embargo', en: 'however' },
  { id: 'por-lo-tanto', es: 'por lo tanto', en: 'therefore' },
  { id: 'no-obstante', es: 'no obstante', en: 'nevertheless' },
  { id: 'en-cambio', es: 'en cambio', en: 'on the other hand' },
  { id: 'conciliar', es: 'conciliar', en: 'to balance' },
]

const argument =
  'El trabajo a distancia no es, por sí solo, una mejora. Permite conciliar horarios y reduce algunos desplazamientos. Sin embargo, no garantiza ni la productividad ni el bienestar. A menos que la empresa delimite los horarios y ofrezca espacios de encuentro, mucha gente acaba trabajando más y aislándose. Por lo tanto, la pregunta útil no es si debemos adoptar el modelo, sino bajo qué condiciones resulta justo.'

const budget =
  'No niego que el proyecto tenga valor. Sin embargo, a menos que ajustemos el presupuesto, no podremos terminarlo este año. Por lo tanto, propongo revisar las prioridades antes de prometer una fecha.'

export const c1Units: Unit[] = [
  {
    id: 'c1-nuance',
    title: 'Conditions and concessions',
    description: 'Aunque, a menos que, and si clauses.',
    accent: '#1C2430',
    lessons: [
      lesson('c1-concession', 'Even if', 'Hypothetical aunque, and a menos que.', [
        choice('c1-concession-1', 'en-es', 'Even if it rains, I will go out', 'Aunque llueva, saldré', ['Aunque llueva, saldré', 'Aunque llueve, saldré', 'Aunque llovió, salía', 'Aunque llover, salgo'], ['aunque-llueva'], 'A hypothetical aunque takes the subjunctive. A fact takes the indicative.'),
        choice('c1-concession-2', 'en-es', 'Even though it is raining, I go out', 'Aunque llueve, salgo', ['Aunque llueve, salgo', 'Aunque llueva, saldré', 'A menos que llueve', 'Para que llueve'], ['aunque-llueve']),
        listen('c1-concession-3', 'A menos que termines, no saldremos', 'Unless you finish, we will not leave', ['Unless you finish, we will not leave', 'Because you finished, we left', 'Even though you finish, we stay', 'If you had finished, we would have left'], ['a-menos-que']),
        conjugate('c1-concession-4', 'Te lo digo para que lo ___. (saber)', 'sepas', ['para-que'], [], 'Para que is followed by the subjunctive: sepas.'),
        bank('c1-concession-5', 'unless you finish', ['a', 'menos', 'que', 'termines'], ['terminas', 'aunque'], ['a-menos-que']),
        typeIn('c1-concession-6', 'en-es', 'so that', 'para que', ['para-que']),
        say('c1-concession-7', 'Aunque llueva, saldré igual', 'Even if it rains, I will go out anyway', ['aunque-llueva']),
        typeIn('c1-concession-8', 'en-es', 'unless', 'a menos que', ['a-menos-que']),
      ]),
      lesson('c1-hypothetical', 'If I had', 'Three patterns of si.', [
        choice('c1-hypothetical-1', 'en-es', 'If I have time, I go', 'Si tengo tiempo, voy', ['Si tengo tiempo, voy', 'Si tuviera tiempo, voy', 'Si hubiera tenido, voy', 'Si tendré, iba'], ['si-tuviera'], 'A real possibility uses the present in both clauses.'),
        choice('c1-hypothetical-2', 'en-es', 'If I had time, I would travel', 'Si tuviera tiempo, viajaría', ['Si tuviera tiempo, viajaría', 'Si tengo tiempo, viajaría', 'Si tendría tiempo, viajo', 'Si hubiera, viajo'], ['si-tuviera'], 'An unreal present uses the past subjunctive and the conditional.'),
        listen('c1-hypothetical-3', 'Si lo hubiera sabido, habría llamado', 'If I had known, I would have called', ['If I had known, I would have called', 'If I know, I call', 'If I had time, I would call', 'I knew, so I called'], ['si-hubiera', 'habria-llamado']),
        conjugate('c1-hypothetical-4', 'Si yo ___ tiempo, viajaría. (tener)', 'tuviera', ['si-tuviera'], [], 'Past subjunctive of tener: tuviera.'),
        bank('c1-hypothetical-5', 'I would have called', ['Habría', 'llamado'], ['Había', 'llamé'], ['habria-llamado']),
        typeIn('c1-hypothetical-6', 'en-es', 'if I had known', 'si hubiera sabido', ['si-hubiera']),
        say('c1-hypothetical-7', 'Si lo hubiera sabido, habría llamado', 'If I had known, I would have called', ['si-hubiera', 'habria-llamado']),
        typeIn('c1-hypothetical-8', 'en-es', 'I would have called', 'habría llamado', ['habria-llamado']),
      ]),
    ],
  },
  {
    id: 'c1-voice',
    title: 'Register and argument',
    description: 'How formal to sound, and how to join ideas.',
    accent: '#C4553A',
    lessons: [
      lesson('c1-register', 'Who you are talking to', 'Tú with friends, usted in formal writing.', [
        choice('c1-register-1', 'en-es', 'A text to a friend: will you send me the report?', '¿Me mandas el informe?', ['¿Me mandas el informe?', 'Le agradecería que me enviara el informe', '¿Podría usted enviarme el informe?', 'Les ruego que me lo remitan'], ['me-mandas']),
        choice('c1-register-2', 'en-es', 'An email to a client', 'Le agradecería que me enviara el informe', ['Le agradecería que me enviara el informe', '¿Me mandas el informe?', 'Oye, pásame eso', 'Tú envías ya'], ['podria-usted'], 'Written requests to clients prefer usted and the past subjunctive.'),
        listen('c1-register-3', '¿Podría decirme la hora, por favor?', 'Could you tell me the time, please?', ['Could you tell me the time, please?', 'Send me the report, friend', 'What time do you get up?', 'I would have called'], ['podria-usted']),
        conjugate('c1-register-4', 'Le agradecería que me ___ el documento. (enviar)', 'enviara', ['podria-usted'], [], 'After agradecería que, use the past subjunctive: enviara.'),
        bank('c1-register-5', 'Could you tell me', ['¿Podría', 'decirme'], ['¿Me', 'mandas'], ['podria-usted']),
        typeIn('c1-register-6', 'en-es', 'Will you send me (informal)', 'me mandas', ['me-mandas']),
        say('c1-register-7', '¿Podría decirme la hora, por favor?', 'Could you tell me the time, please?', ['podria-usted']),
        typeIn('c1-register-8', 'en-es', 'you send me (informal)', 'me mandas', ['me-mandas']),
      ]),
      lesson('c1-connectors', 'However, therefore', 'Hold a contrast and a conclusion.', [
        choice('c1-connectors-1', 'es-en', 'sin embargo', 'however', ['however', 'therefore', 'unless', 'so that'], ['sin-embargo']),
        choice('c1-connectors-2', 'es-en', 'por lo tanto', 'therefore', ['therefore', 'on the other hand', 'nevertheless', 'even if'], ['por-lo-tanto']),
        listen('c1-connectors-3', 'El plan era sólido. Sin embargo, tuvimos que cambiarlo.', 'The plan was solid. However, we had to change it.', ['The plan was solid. However, we had to change it.', 'Therefore we kept the plan', 'Unless we change it, it stays', 'On the other hand she agreed at once'], ['sin-embargo']),
        choice('c1-connectors-4', 'es-en', 'no obstante', 'nevertheless', ['nevertheless', 'therefore', 'whose', 'half past'], ['no-obstante']),
        bank('c1-connectors-5', 'therefore we waited', ['Por', 'lo', 'tanto', 'esperamos'], ['Sin', 'embargo'], ['por-lo-tanto']),
        typeIn('c1-connectors-6', 'en-es', 'on the other hand', 'en cambio', ['en-cambio']),
        say('c1-connectors-7', 'La idea es útil. Sin embargo, no es la única solución.', 'The idea is useful. However, it is not the only solution.', ['sin-embargo']),
        match('c1-connectors-8', [
          { es: 'sin embargo', en: 'however', vocabId: 'sin-embargo' },
          { es: 'por lo tanto', en: 'therefore', vocabId: 'por-lo-tanto' },
          { es: 'no obstante', en: 'nevertheless', vocabId: 'no-obstante' },
          { es: 'en cambio', en: 'on the other hand', vocabId: 'en-cambio' },
        ]),
      ]),
    ],
  },
  {
    id: 'c1-extended',
    title: 'A longer argument',
    description: 'Read for the claim, then respond out loud.',
    accent: '#1F7A4D',
    lessons: [
      lesson('c1-argument', 'Remote work', 'Find the claim and the concession.', [
        read(
          'c1-argument-1',
          argument,
          '¿Cuál es la tesis del texto?',
          'El trabajo a distancia solo es justo bajo ciertas condiciones',
          [
            'El trabajo a distancia solo es justo bajo ciertas condiciones',
            'El trabajo a distancia siempre mejora la productividad',
            'Hay que prohibir el trabajo a distancia',
            'Los desplazamientos no importan',
          ],
          ['conciliar'],
          'es',
        ),
        read(
          'c1-argument-2',
          argument,
          '¿Qué concede la autora antes de objetar?',
          'Que permite conciliar horarios y reduce algunos desplazamientos',
          [
            'Que permite conciliar horarios y reduce algunos desplazamientos',
            'Que garantiza el bienestar',
            'Que las empresas no deben existir',
            'Que nadie trabaja de más',
          ],
          ['conciliar'],
          'es',
        ),
        choice('c1-argument-3', 'es-en', 'Por lo tanto', 'Therefore', ['Therefore', 'However', 'Unless', 'Whose'], ['por-lo-tanto']),
        listen('c1-argument-4', 'A menos que la empresa delimite los horarios, mucha gente acaba aislándose', 'Unless the company sets boundaries on hours, many people end up isolated', ['Unless the company sets boundaries on hours, many people end up isolated', 'Remote work always isolates people', 'Schedules no longer matter', 'Therefore everyone should return tomorrow'], ['a-menos-que']),
        conjugate('c1-argument-5', 'A menos que la empresa ___ los horarios. (delimitar)', 'delimite', ['a-menos-que'], [], 'A menos que takes the subjunctive: delimite.'),
        bank('c1-argument-6', 'so that it is fair', ['para', 'que', 'sea', 'justo'], ['es', 'sé'], ['para-que', 'sea']),
        say('c1-argument-7', 'Me parece útil, aunque no creo que sea la única solución', 'It seems useful to me, although I do not think it is the only solution', ['me-parece', 'sin-embargo']),
        typeIn('c1-argument-8', 'en-es', 'to balance', 'conciliar', ['conciliar']),
      ]),
      lesson('c1-budget', 'A condition on the project', 'Listen, then answer in a full phrase.', [
        listen(
          'c1-budget-1',
          budget,
          'The speaker will not promise a date until the budget is adjusted',
          [
            'The speaker will not promise a date until the budget is adjusted',
            'The speaker denies that the project has any value',
            'The project is already finished',
            'They should ignore the budget',
          ],
          ['a-menos-que', 'por-lo-tanto'],
        ),
        read(
          'c1-budget-2',
          budget,
          'What does the speaker concede?',
          'That the project has value',
          ['That the project has value', 'That the budget is already fine', 'That the date cannot change', 'That priorities do not matter'],
          ['no-obstante'],
        ),
        choice('c1-budget-3', 'en-es', 'I do not deny that it has value', 'No niego que tenga valor', ['No niego que tenga valor', 'No niego que tiene valor', 'Niego que tiene valor siempre', 'Sé que tenga valor'], ['tenga'], 'After no niego que, the subjunctive is usual because the clause is not asserted as the main claim.'),
        conjugate('c1-budget-4', 'A menos que nosotros ___ el presupuesto. (ajustar)', 'ajustemos', ['a-menos-que'], [], 'Nosotros subjunctive of ajustar: ajustemos.'),
        bank('c1-budget-5', 'therefore I propose to review', ['Por', 'lo', 'tanto', 'propongo', 'revisar'], ['Sin', 'embargo'], ['por-lo-tanto']),
        typeIn('c1-budget-6', 'en-es', 'however', 'sin embargo', ['sin-embargo']),
        say('c1-budget-7', 'No niego que tenga valor. Sin embargo, a menos que ajustemos el presupuesto, no podremos terminarlo.', 'I do not deny that it has value. However, unless we adjust the budget, we will not be able to finish it.', ['tenga', 'sin-embargo', 'a-menos-que']),
        typeIn('c1-budget-8', 'en-es', 'therefore', 'por lo tanto', ['por-lo-tanto']),
      ]),
    ],
  },
]
