import type { Unit, Vocab } from './types'
import { bank, choice, conjugate, lesson, listen, match, read, say, typeIn } from './build'

/**
 * Phase 6 polish extras — optional units: pronunciation drills, culture /
 * sociocultural notes, voseo awareness, and timed DELE-style mock papers.
 * None of these block required path or level completion.
 */

export const polishVocab: Vocab[] = [
  // Pronunciation / stress
  { id: 'pero-word', es: 'pero', en: 'but' },
  { id: 'perro-word', es: 'perro', en: 'dog' },
  { id: 'caro-word', es: 'caro', en: 'expensive' },
  { id: 'carro-word', es: 'carro', en: 'car (Americas)' },
  { id: 'casa-word', es: 'casa', en: 'house' },
  { id: 'caza-word', es: 'caza', en: 'hunt (noun)' },
  { id: 'pena-word', es: 'pena', en: 'sorrow / pity' },
  { id: 'peña-word', es: 'peña', en: 'rock / club' },
  { id: 'papa-accent', es: 'papá', en: 'dad' },
  { id: 'esta-plain', es: 'esta', en: 'this (feminine)' },
  { id: 'esta-verb', es: 'está', en: 'is (estar)' },
  { id: 'si-plain', es: 'si', en: 'if' },
  { id: 'si-yes', es: 'sí', en: 'yes' },
  { id: 'el-pronoun', es: 'él', en: 'he' },
  { id: 'tono-stress', es: 'acento', en: 'stress / accent mark' },
  { id: 'rr-sound', es: 'erre', en: 'rolled r (rr)' },
  { id: 'n-ene', es: 'ene', en: 'letter n' },
  { id: 'ene-nye', es: 'eñe', en: 'letter ñ' },
  // Culture / sociocultural
  { id: 'tapas', es: 'tapas', en: 'tapas (small plates)' },
  { id: 'siesta', es: 'siesta', en: 'afternoon rest' },
  { id: 'sobremesa', es: 'sobremesa', en: 'lingering after a meal' },
  { id: 'feria', es: 'feria', en: 'fair / festival' },
  { id: 'plaza', es: 'plaza', en: 'town square' },
  { id: 'mercado-cultura', es: 'mercado', en: 'market' },
  { id: 'dia-de-muertos', es: 'Día de Muertos', en: 'Day of the Dead' },
  { id: 'semana-santa', es: 'Semana Santa', en: 'Holy Week' },
  { id: 'quinceanera', es: 'quinceañera', en: 'fifteenth-birthday celebration' },
  { id: 'mate-drink', es: 'mate', en: 'mate (herbal drink)' },
  { id: 'tuteo', es: 'tuteo', en: 'using tú' },
  { id: 'ustedeo', es: 'usted', en: 'formal you' },
  { id: 'beso-saludo', es: 'beso', en: 'kiss (greeting)' },
  { id: 'apreton', es: 'apreton de manos', en: 'handshake' },
  { id: 'hora-punta', es: 'hora punta', en: 'rush hour' },
  { id: 'propina', es: 'propina', en: 'tip' },
  { id: 'turno-cita', es: 'turno', en: 'turn / appointment slot' },
  { id: 'cita-social', es: 'quedar', en: 'to arrange to meet' },
  { id: 'puntualidad', es: 'puntualidad', en: 'punctuality' },
  { id: 'trato', es: 'trato', en: 'how you address someone' },
  // Voseo
  { id: 'vos', es: 'vos', en: 'you (voseo singular)' },
  { id: 'vos-tenes', es: 'tenés', en: 'you have (vos)' },
  { id: 'vos-sos', es: 'sos', en: 'you are (vos, ser)' },
  { id: 'vos-queres', es: 'querés', en: 'you want (vos)' },
  { id: 'vos-podes', es: 'podés', en: 'you can (vos)' },
  { id: 'vos-veni', es: 'vení', en: 'come (vos imperative)' },
  { id: 'vos-mira', es: 'mirá', en: 'look (vos imperative)' },
  { id: 'voseo-term', es: 'voseo', en: 'use of vos instead of tú' },
  { id: 'rioplatense', es: 'rioplatense', en: 'River Plate Spanish' },
  { id: 'centroamerica', es: 'Centroamérica', en: 'Central America' },
  // Timed mock glue (reuse where possible; unique labels)
  { id: 'examen-dele', es: 'examen', en: 'exam' },
  { id: 'comprehension', es: 'comprensión', en: 'comprehension' },
  { id: 'tiempo-limite', es: 'tiempo límite', en: 'time limit' },
  { id: 'opcion-correcta', es: 'opción correcta', en: 'correct option' },
  { id: 'texto-escrito', es: 'texto', en: 'text / passage' },
  { id: 'audio-mock', es: 'audio', en: 'audio' },
  { id: 'afirmacion', es: 'afirmación', en: 'claim / statement' },
  { id: 'detalle-mock', es: 'detalle', en: 'detail' },
]

const mockB1Read = `Mañana saldré temprano para la entrevista. Tomaré el tren de las nueve. Por la tarde haré la presentación del informe. Si llueve, tal vez me quede en el café cerca del hotel. Además, pensaré en la beca del semestre.`

const mockB1Listen = `Os cuento mi plan: primero terminaré el currículum, luego tendré la entrevista. En resumen, este mes es importante. Quizá pida una cita médica porque tengo tos.`

const mockB2Read = `Me alegra que el barrio mejore, aunque dudo que todos estén de acuerdo. Es necesario que escuchemos a los vecinos. Cuando llegues el viernes, hablaremos del proyecto. Lo que más me preocupa es el ruido por la noche.`

const mockB2Listen = `Antes del viernes necesito que envíen las notas. Me molesta que haya tanto retraso. En cuanto terminen, avísenme. Por un lado quiero acelerar; por otro lado, hace falta revisar bien.`

const mockC1Read = `Aunque hubiera llovido, habríamos salido. Con tal de que preparéis el informe, firmamos. Por más que protesten, el plazo sigue. En efecto, conviene matizar la propuesta; ahora bien, no podemos esperar más.`

const mockC1Listen = `Le agradecería que enviara el acta. Quedo a la espera de su respuesta. Por consiguiente, aplazamos la reunión. Dicho esto, el proyecto sigue adelante siempre que haya presupuesto.`

const mockC2Read = `Cabría decir que el planteamiento es sólido; no obstante, parece ser que el sesgo metodológico no deja de ser un problema. En cierta medida, la cohesión del texto mejora tras la revisión. Lo cual, dicho sea de paso, confirma la hipótesis inicial.`

const mockC2Listen = `Digamos que la ironía del párrafo es deliberada. Supuestamente el hallazgo es definitivo; por así decirlo, es un paradigma nuevo. En resumen, habría que matizar la afirmación antes de la ponencia.`

export const a1PolishUnits: Unit[] = [
  {
    id: 'a1-pronunciation',
    title: 'Sounds and stress',
    description: 'Optional light drills: minimal pairs and written stress (PCIC inventory 3).',
    accent: '#6B5B95',
    optional: true,
    lessons: [
      lesson('a1-min-pairs-r', 'Pero and perro', 'Hear and choose single vs rolled r.', [
        choice('a1-min-pairs-r-1', 'en-es', 'but', 'pero', ['pero', 'perro', 'pena', 'peña'], ['pero-word'], 'One r in pero. Double rr in perro is a strong trill.'),
        listen('a1-min-pairs-r-2', 'perro', 'dog', ['dog', 'but', 'house', 'dad'], ['perro-word'], 'Listen for the strong rr.'),
        choice('a1-min-pairs-r-3', 'es-en', 'caro', 'expensive', ['expensive', 'car (Americas)', 'house', 'hunt'], ['caro-word']),
        listen('a1-min-pairs-r-4', 'carro', 'car (Americas)', ['car (Americas)', 'expensive', 'but', 'dog'], ['carro-word'], 'Carro is usual in much of the Americas; Spain often says coche.'),
        bank('a1-min-pairs-r-5', 'but / dog', ['pero', 'perro'], ['caro', 'casa'], ['pero-word', 'perro-word']),
        typeIn('a1-min-pairs-r-6', 'en-es', 'dog', 'perro', ['perro-word']),
        match('a1-min-pairs-r-7', [
          { es: 'pero', en: 'but', vocabId: 'pero-word' },
          { es: 'perro', en: 'dog', vocabId: 'perro-word' },
          { es: 'caro', en: 'expensive', vocabId: 'caro-word' },
          { es: 'carro', en: 'car (Americas)', vocabId: 'carro-word' },
        ]),
        say('a1-min-pairs-r-8', 'perro', 'dog', ['perro-word']),
        choice('a1-min-pairs-r-9', 'en-es', 'rolled r (rr)', 'erre', ['erre', 'ene', 'eñe', 'acento'], ['rr-sound']),
        typeIn('a1-min-pairs-r-10', 'en-es', 'but', 'pero', ['pero-word']),
      ]),
      lesson('a1-min-pairs-n', 'N and ñ, s and z', 'Minimal pairs with ñ and a soft contrast.', [
        choice('a1-min-pairs-n-1', 'en-es', 'house', 'casa', ['casa', 'caza', 'pena', 'peña'], ['casa-word']),
        listen('a1-min-pairs-n-2', 'caza', 'hunt (noun)', ['hunt (noun)', 'house', 'pity', 'rock'], ['caza-word'], 'In much of Latin America, caza and casa can sound close; the spelling still differs.'),
        choice('a1-min-pairs-n-3', 'es-en', 'pena', 'sorrow / pity', ['sorrow / pity', 'rock / club', 'house', 'dog'], ['pena-word']),
        listen('a1-min-pairs-n-4', 'peña', 'rock / club', ['rock / club', 'sorrow / pity', 'house', 'hunt'], ['peña-word'], 'ñ is a different letter from n.'),
        bank('a1-min-pairs-n-5', 'letter ñ', ['eñe'], ['ene', 'erre', 'sílaba'], ['ene-nye']),
        typeIn('a1-min-pairs-n-6', 'en-es', 'house', 'casa', ['casa-word']),
        match('a1-min-pairs-n-7', [
          { es: 'casa', en: 'house', vocabId: 'casa-word' },
          { es: 'caza', en: 'hunt', vocabId: 'caza-word' },
          { es: 'pena', en: 'pity', vocabId: 'pena-word' },
          { es: 'peña', en: 'rock / club', vocabId: 'peña-word' },
        ]),
        say('a1-min-pairs-n-8', 'peña', 'rock / club', ['peña-word']),
        choice('a1-min-pairs-n-9', 'en-es', 'letter n', 'ene', ['ene', 'eñe', 'erre', 'acento'], ['n-ene']),
        typeIn('a1-min-pairs-n-10', 'en-es', 'rock / club', 'peña', ['peña-word']),
      ]),
      lesson('a1-stress-marks', 'Stress that changes meaning', 'Papa vs papá, esta vs está, si vs sí.', [
        choice('a1-stress-marks-1', 'en-es', 'dad', 'papá', ['papá', 'papa', 'está', 'esta'], ['papa-accent'], 'The written accent marks the stressed syllable.'),
        listen('a1-stress-marks-2', 'papá', 'dad', ['dad', 'potato / pope (no accent)', 'yes', 'if'], ['papa-accent']),
        choice('a1-stress-marks-3', 'es-en', 'está', 'is (estar)', ['is (estar)', 'this (feminine)', 'yes', 'he'], ['esta-verb']),
        listen('a1-stress-marks-4', 'esta casa', 'this house', ['this house', 'the house is', 'dad’s house', 'yes, house'], ['esta-plain', 'casa-word']),
        bank('a1-stress-marks-5', 'yes / if', ['sí', 'si'], ['él', 'el'], ['si-yes', 'si-plain']),
        typeIn('a1-stress-marks-6', 'en-es', 'yes', 'sí', ['si-yes']),
        match('a1-stress-marks-7', [
          { es: 'papá', en: 'dad', vocabId: 'papa-accent' },
          { es: 'está', en: 'is (estar)', vocabId: 'esta-verb' },
          { es: 'sí', en: 'yes', vocabId: 'si-yes' },
          { es: 'él', en: 'he', vocabId: 'el-pronoun' },
        ]),
        say('a1-stress-marks-8', '¿Dónde está?', 'Where is it?', ['esta-verb']),
        conjugate('a1-stress-marks-9', 'él / ella (estar) — present', 'está', ['esta-verb'], ['esta']),
        typeIn('a1-stress-marks-10', 'en-es', 'stress / accent mark', 'acento', ['tono-stress'], ['el acento']),
      ]),
    ],
  },
]

export const a2PolishUnits: Unit[] = [
  {
    id: 'a2-culture',
    title: 'Culture notes',
    description: 'Optional cultural referents (PCIC inventory 10): meals, festivals, everyday places.',
    accent: '#C45C26',
    optional: true,
    lessons: [
      lesson('a2-culture-meals', 'Meals and the square', 'Tapas, sobremesa, and the plaza.', [
        choice('a2-culture-meals-1', 'en-es', 'tapas (small plates)', 'tapas', ['tapas', 'siesta', 'plaza', 'feria'], ['tapas']),
        listen('a2-culture-meals-2', 'Vamos a tomar tapas en la plaza', 'Let’s have tapas in the square', ['Let’s have tapas in the square', 'Let’s skip the market', 'We hate sobremesa', 'No festival today'], ['tapas', 'plaza']),
        choice('a2-culture-meals-3', 'es-en', 'sobremesa', 'lingering after a meal', ['lingering after a meal', 'rush hour', 'handshake', 'tip'], ['sobremesa']),
        bank('a2-culture-meals-4', 'afternoon rest', ['siesta'], ['tapas', 'feria', 'mate'], ['siesta']),
        typeIn('a2-culture-meals-5', 'en-es', 'town square', 'plaza', ['plaza']),
        match('a2-culture-meals-6', [
          { es: 'tapas', en: 'small plates', vocabId: 'tapas' },
          { es: 'sobremesa', en: 'after-meal chat', vocabId: 'sobremesa' },
          { es: 'siesta', en: 'afternoon rest', vocabId: 'siesta' },
          { es: 'plaza', en: 'town square', vocabId: 'plaza' },
        ]),
        say('a2-culture-meals-7', 'Después de comer hay sobremesa', 'After eating there is lingering talk', ['sobremesa']),
        choice('a2-culture-meals-8', 'en-es', 'market', 'mercado', ['mercado', 'feria', 'propina', 'turno'], ['mercado-cultura']),
        {
          ...read(
            'a2-culture-meals-9',
            'En muchas ciudades, la gente queda en la plaza y pide tapas. Después de comer, la sobremesa puede durar mucho. No es una regla, pero es un hábito social frecuente.',
            'What often follows a meal in the note?',
            'Lingering talk (sobremesa)',
            ['Lingering talk (sobremesa)', 'A formal exam only', 'Rush hour only', 'A handshake fee'],
            ['plaza', 'tapas', 'sobremesa', 'cita-social'],
          ),
          task: 'Lectura · Nota cultural',
        },
        typeIn('a2-culture-meals-10', 'en-es', 'lingering after a meal', 'sobremesa', ['sobremesa']),
      ]),
      lesson('a2-culture-festivals', 'Festivals and celebrations', 'Named celebrations across the Spanish-speaking world.', [
        choice('a2-culture-festivals-1', 'en-es', 'Day of the Dead', 'Día de Muertos', ['Día de Muertos', 'Semana Santa', 'quinceañera', 'feria'], ['dia-de-muertos']),
        listen('a2-culture-festivals-2', 'La Semana Santa es importante en muchas ciudades', 'Holy Week is important in many cities', ['Holy Week is important in many cities', 'Only mate is important', 'There is no festival', 'Tips replace festivals'], ['semana-santa']),
        choice('a2-culture-festivals-3', 'es-en', 'quinceañera', 'fifteenth-birthday celebration', ['fifteenth-birthday celebration', 'rush hour', 'handshake', 'tip'], ['quinceanera']),
        bank('a2-culture-festivals-4', 'fair / festival', ['feria'], ['siesta', 'propina', 'vos'], ['feria']),
        typeIn('a2-culture-festivals-5', 'en-es', 'mate (herbal drink)', 'mate', ['mate-drink']),
        match('a2-culture-festivals-6', [
          { es: 'Día de Muertos', en: 'Day of the Dead', vocabId: 'dia-de-muertos' },
          { es: 'Semana Santa', en: 'Holy Week', vocabId: 'semana-santa' },
          { es: 'quinceañera', en: '15th-birthday party', vocabId: 'quinceanera' },
          { es: 'mate', en: 'mate drink', vocabId: 'mate-drink' },
        ]),
        say('a2-culture-festivals-7', 'Hay feria en la plaza', 'There is a fair in the square', ['feria', 'plaza']),
        choice('a2-culture-festivals-8', 'en-es', 'Holy Week', 'Semana Santa', ['Semana Santa', 'Día de Muertos', 'siesta', 'tapas'], ['semana-santa']),
        {
          ...read(
            'a2-culture-festivals-9',
            'El Día de Muertos se celebra en México con ofrendas. En España y otras regiones, la Semana Santa llena las calles. En varios países de América, la quinceañera marca los quince años. El mate es común en el Cono Sur.',
            'What marks a fifteenth birthday in the text?',
            'The quinceañera',
            ['The quinceañera', 'Only Holy Week', 'Only tapas', 'A tip'],
            ['dia-de-muertos', 'semana-santa', 'quinceanera', 'mate-drink'],
          ),
          task: 'Lectura · Nota cultural',
        },
        typeIn('a2-culture-festivals-10', 'en-es', 'fair / festival', 'feria', ['feria']),
      ]),
    ],
  },
  {
    id: 'a2-voseo',
    title: 'Voseo awareness',
    description: 'Optional named unit: recognize vos forms. Not required for path progress.',
    accent: '#2E8B57',
    optional: true,
    lessons: [
      lesson('a2-voseo-forms', 'Vos, sos, tenés', 'Spot common present forms with vos.', [
        choice('a2-voseo-forms-1', 'en-es', 'use of vos instead of tú', 'voseo', ['voseo', 'tuteo', 'usted', 'siesta'], ['voseo-term'], 'Camino practices tú / ustedes. This unit only teaches recognition.'),
        listen('a2-voseo-forms-2', '¿Cómo estás vos?', 'How are you (vos)?', ['How are you (vos)?', 'How are they formal?', 'Where is the fair?', 'What is a tip?'], ['vos']),
        choice('a2-voseo-forms-3', 'es-en', 'sos', 'you are (vos, ser)', ['you are (vos, ser)', 'you have (vos)', 'you want (vos)', 'come (vos)'], ['vos-sos']),
        bank('a2-voseo-forms-4', 'you have (vos)', ['tenés'], ['tienes', 'sos', 'querés'], ['vos-tenes']),
        typeIn('a2-voseo-forms-5', 'en-es', 'you want (vos)', 'querés', ['vos-queres']),
        match('a2-voseo-forms-6', [
          { es: 'vos', en: 'you (voseo)', vocabId: 'vos' },
          { es: 'sos', en: 'you are (vos)', vocabId: 'vos-sos' },
          { es: 'tenés', en: 'you have (vos)', vocabId: 'vos-tenes' },
          { es: 'querés', en: 'you want (vos)', vocabId: 'vos-queres' },
        ]),
        say('a2-voseo-forms-7', '¿Vos tenés tiempo?', 'Do you (vos) have time?', ['vos', 'vos-tenes']),
        choice('a2-voseo-forms-8', 'en-es', 'you can (vos)', 'podés', ['podés', 'puedes', 'sos', 'vení'], ['vos-podes']),
        choice('a2-voseo-forms-9', 'es-en', 'voseo', 'use of vos instead of tú', ['use of vos instead of tú', 'only Spain Spanish', 'a festival', 'a tip'], ['voseo-term']),
        typeIn('a2-voseo-forms-10', 'en-es', 'you (voseo singular)', 'vos', ['vos']),
      ]),
      lesson('a2-voseo-where', 'Where you hear vos', 'Rioplatense and beyond; imperatives.', [
        choice('a2-voseo-where-1', 'en-es', 'River Plate Spanish', 'rioplatense', ['rioplatense', 'tuteo', 'propina', 'feria'], ['rioplatense'], 'Strong in Argentina and Uruguay; also used in parts of Central America and elsewhere.'),
        listen('a2-voseo-where-2', 'Vení acá y mirá esto', 'Come here and look at this (vos)', ['Come here and look at this (vos)', 'Only formal usted', 'Skip the market', 'Pay a tip now'], ['vos-veni', 'vos-mira']),
        choice('a2-voseo-where-3', 'es-en', 'vení', 'come (vos imperative)', ['come (vos imperative)', 'you are (vos)', 'you have (vos)', 'handshake'], ['vos-veni']),
        bank('a2-voseo-where-4', 'look (vos)', ['mirá'], ['mira', 'sos', 'tenés'], ['vos-mira']),
        typeIn('a2-voseo-where-5', 'en-es', 'Central America', 'Centroamérica', ['centroamerica']),
        match('a2-voseo-where-6', [
          { es: 'vení', en: 'come (vos)', vocabId: 'vos-veni' },
          { es: 'mirá', en: 'look (vos)', vocabId: 'vos-mira' },
          { es: 'podés', en: 'you can (vos)', vocabId: 'vos-podes' },
          { es: 'rioplatense', en: 'River Plate Spanish', vocabId: 'rioplatense' },
        ]),
        say('a2-voseo-where-7', '¿Podés venir?', 'Can you (vos) come?', ['vos-podes']),
        {
          ...read(
            'a2-voseo-where-8',
            'El voseo usa vos en lugar de tú en el singular. Es fuerte en el español rioplatense y también aparece en Centroamérica y otras zonas. Camino sigue con tú y ustedes; aquí solo reconoces las formas.',
            'What does Camino keep practicing after this note?',
            'tú and ustedes',
            ['tú and ustedes', 'Only vos forever', 'Only usted', 'No pronouns'],
            ['voseo-term', 'vos', 'rioplatense', 'centroamerica', 'tuteo', 'ustedeo'],
          ),
          task: 'Lectura · Nota',
        },
        choice('a2-voseo-where-9', 'en-es', 'using tú', 'tuteo', ['tuteo', 'voseo', 'usted', 'feria'], ['tuteo']),
        typeIn('a2-voseo-where-10', 'en-es', 'look (vos imperative)', 'mirá', ['vos-mira']),
      ]),
    ],
  },
]

export const b1PolishUnits: Unit[] = [
  {
    id: 'b1-sociocultural',
    title: 'Sociocultural habits',
    description: 'Optional sociocultural behavior (PCIC inventory 11): address, greetings, time, tips.',
    accent: '#8B4513',
    optional: true,
    lessons: [
      lesson('b1-socio-address', 'How you address people', 'Tú, usted, and greeting habits.', [
        choice('b1-socio-address-1', 'en-es', 'how you address someone', 'trato', ['trato', 'propina', 'turno', 'feria'], ['trato']),
        listen('b1-socio-address-2', 'Con el médico uso usted', 'With the doctor I use usted', ['With the doctor I use usted', 'I only use vos', 'I skip greetings', 'I tip the clock'], ['ustedeo', 'trato']),
        choice('b1-socio-address-3', 'es-en', 'tuteo', 'using tú', ['using tú', 'using vos only', 'a tip', 'rush hour'], ['tuteo']),
        bank('b1-socio-address-4', 'formal you', ['usted'], ['vos', 'tapas', 'mate'], ['ustedeo']),
        typeIn('b1-socio-address-5', 'en-es', 'handshake', 'apreton de manos', ['apreton'], ['apretón de manos']),
        match('b1-socio-address-6', [
          { es: 'trato', en: 'form of address', vocabId: 'trato' },
          { es: 'tuteo', en: 'using tú', vocabId: 'tuteo' },
          { es: 'usted', en: 'formal you', vocabId: 'ustedeo' },
          { es: 'beso', en: 'kiss greeting', vocabId: 'beso-saludo' },
        ]),
        say('b1-socio-address-7', 'En algunos países se saluda con un beso', 'In some countries people greet with a kiss', ['beso-saludo']),
        choice('b1-socio-address-8', 'en-es', 'kiss (greeting)', 'beso', ['beso', 'propina', 'turno', 'hora punta'], ['beso-saludo']),
        {
          ...read(
            'b1-socio-address-9',
            'El trato cambia según el país y la situación. Con amigos es frecuente el tuteo. En oficinas o con personas mayores, usted es más seguro. El saludo puede ser un apretón de manos o uno o dos besos, según la región.',
            'What is safer in offices, according to the text?',
            'usted',
            ['usted', 'Only vos', 'No greeting', 'Always two kisses'],
            ['trato', 'tuteo', 'ustedeo', 'apreton', 'beso-saludo'],
          ),
          task: 'Lectura · Nota sociocultural',
        },
        typeIn('b1-socio-address-10', 'en-es', 'formal you', 'usted', ['ustedeo']),
      ]),
      lesson('b1-socio-time', 'Time, turns, and tips', 'Punctuality, quedar, and propina norms.', [
        choice('b1-socio-time-1', 'en-es', 'to arrange to meet', 'quedar', ['quedar', 'propina', 'turno', 'siesta'], ['cita-social']),
        listen('b1-socio-time-2', 'Quedamos a las ocho en la plaza', 'We’re meeting at eight in the square', ['We’re meeting at eight in the square', 'We tip at eight', 'Rush hour only', 'No appointment'], ['cita-social', 'plaza']),
        choice('b1-socio-time-3', 'es-en', 'puntualidad', 'punctuality', ['punctuality', 'tip', 'handshake', 'festival'], ['puntualidad']),
        bank('b1-socio-time-4', 'rush hour', ['hora', 'punta'], ['turno', 'propina'], ['hora-punta']),
        typeIn('b1-socio-time-5', 'en-es', 'tip', 'propina', ['propina']),
        match('b1-socio-time-6', [
          { es: 'quedar', en: 'arrange to meet', vocabId: 'cita-social' },
          { es: 'puntualidad', en: 'punctuality', vocabId: 'puntualidad' },
          { es: 'propina', en: 'tip', vocabId: 'propina' },
          { es: 'turno', en: 'turn / slot', vocabId: 'turno-cita' },
        ]),
        say('b1-socio-time-7', 'Pedí turno en la clínica', 'I booked a slot at the clinic', ['turno-cita']),
        choice('b1-socio-time-8', 'en-es', 'turn / appointment slot', 'turno', ['turno', 'propina', 'beso', 'feria'], ['turno-cita']),
        {
          ...listen(
            'b1-socio-time-9',
            'La puntualidad no es igual en todas partes. A veces quedar significa llegar un poco más tarde. En restaurantes, la propina depende del país; pregunta o mira la cuenta.',
            'Tipping depends on the country',
            ['Tipping depends on the country', 'Tips are banned everywhere', 'Meetings never happen', 'Only rush hour matters'],
            ['puntualidad', 'cita-social', 'propina'],
          ),
          task: 'Audición · Nota',
          question: 'What does the speaker say about tips?',
        },
        typeIn('b1-socio-time-10', 'en-es', 'punctuality', 'puntualidad', ['puntualidad']),
      ]),
    ],
  },
  {
    id: 'b1-dele-mock',
    title: 'Timed DELE B1 mock',
    description: 'Optional timed full-paper style reading and listening sets. Not an official DELE.',
    accent: '#4A4A8A',
    optional: true,
    lessons: [
      lesson(
        'b1-mock-reading',
        'B1 reading paper',
        'Timed Lectura set: plans and one-fact questions.',
        [
          {
            ...read(
              'b1-mock-reading-1',
              mockB1Read,
              'Which train will the speaker take?',
              'The nine o’clock train',
              ['The nine o’clock train', 'The eight o’clock train', 'No train', 'A night bus only'],
              ['texto-escrito', 'detalle-mock'],
            ),
            task: 'Lectura · Plan',
          },
          {
            ...read(
              'b1-mock-reading-2',
              mockB1Read,
              'What will happen in the afternoon?',
              'The report presentation',
              ['The report presentation', 'A cancelled semester', 'Only a nap', 'Lost luggage'],
              ['texto-escrito', 'afirmacion'],
            ),
            task: 'Lectura · Plan',
          },
          {
            ...read(
              'b1-mock-reading-3',
              mockB1Read,
              'What might the speaker do if it rains?',
              'Stay in the café near the hotel',
              ['Stay in the café near the hotel', 'Cancel the scholarship forever', 'Skip the interview always', 'Take no train'],
              ['texto-escrito', 'opcion-correcta'],
            ),
            task: 'Lectura · Plan',
          },
          choice('b1-mock-reading-4', 'en-es', 'exam', 'examen', ['examen', 'propina', 'feria', 'vos'], ['examen-dele']),
          choice('b1-mock-reading-5', 'es-en', 'comprensión', 'comprehension', ['comprehension', 'tip', 'handshake', 'festival'], ['comprehension']),
          bank('b1-mock-reading-6', 'time limit', ['tiempo', 'límite'], ['turno', 'mate'], ['tiempo-limite']),
          typeIn('b1-mock-reading-7', 'en-es', 'correct option', 'opción correcta', ['opcion-correcta']),
          match('b1-mock-reading-8', [
            { es: 'examen', en: 'exam', vocabId: 'examen-dele' },
            { es: 'texto', en: 'passage', vocabId: 'texto-escrito' },
            { es: 'detalle', en: 'detail', vocabId: 'detalle-mock' },
            { es: 'afirmación', en: 'claim', vocabId: 'afirmacion' },
          ]),
          {
            ...read(
              'b1-mock-reading-9',
              'Creo que el plan es claro. Además, pensaré en la beca. Estoy de acuerdo con salir temprano. En resumen, este mes importa.',
              'What does the narrator agree with?',
              'Leaving early',
              ['Leaving early', 'Skipping the plan', 'Ignoring the month', 'Cancelling everything'],
              ['afirmacion', 'texto-escrito'],
            ),
            task: 'Lectura · Opinión',
          },
          typeIn('b1-mock-reading-10', 'en-es', 'comprehension', 'comprensión', ['comprehension']),
        ],
        720,
      ),
      lesson(
        'b1-mock-listening',
        'B1 listening paper',
        'Timed Audición set: monologue details under a clock.',
        [
          {
            ...listen(
              'b1-mock-listening-1',
              mockB1Listen,
              'Finish the résumé first',
              ['Finish the résumé first', 'Fly first', 'Skip the interview', 'Cancel the month'],
              ['audio-mock', 'detalle-mock'],
            ),
            task: 'Audición · Monólogo',
            question: 'What will the speaker finish first?',
          },
          {
            ...listen(
              'b1-mock-listening-2',
              mockB1Listen,
              'This month is important',
              ['This month is important', 'This month is cancelled', 'There is no interview', 'There is no cough'],
              ['audio-mock', 'afirmacion'],
            ),
            task: 'Audición · Monólogo',
            question: 'How does the speaker summarize?',
          },
          {
            ...listen(
              'b1-mock-listening-3',
              mockB1Listen,
              'Because of a cough',
              ['Because of a cough', 'Because of a festival', 'Because of a tip', 'Because of voseo'],
              ['audio-mock', 'opcion-correcta'],
            ),
            task: 'Audición · Monólogo',
            question: 'Why might the speaker book a medical appointment?',
          },
          choice('b1-mock-listening-4', 'en-es', 'audio', 'audio', ['audio', 'texto', 'feria', 'mate'], ['audio-mock']),
          choice('b1-mock-listening-5', 'es-en', 'tiempo límite', 'time limit', ['time limit', 'handshake', 'tip', 'fair'], ['tiempo-limite']),
          bank('b1-mock-listening-6', 'correct option', ['opción', 'correcta'], ['incorrecta', 'vos'], ['opcion-correcta']),
          typeIn('b1-mock-listening-7', 'en-es', 'detail', 'detalle', ['detalle-mock']),
          match('b1-mock-listening-8', [
            { es: 'audio', en: 'audio', vocabId: 'audio-mock' },
            { es: 'comprensión', en: 'comprehension', vocabId: 'comprehension' },
            { es: 'tiempo límite', en: 'time limit', vocabId: 'tiempo-limite' },
            { es: 'opción correcta', en: 'correct option', vocabId: 'opcion-correcta' },
          ]),
          say('b1-mock-listening-9', 'Escucho con atención', 'I listen carefully', ['audio-mock', 'comprehension']),
          typeIn('b1-mock-listening-10', 'en-es', 'exam', 'examen', ['examen-dele']),
        ],
        600,
      ),
    ],
  },
]

export const b2PolishUnits: Unit[] = [
  {
    id: 'b2-dele-mock',
    title: 'Timed DELE B2 mock',
    description: 'Optional timed papers with longer input. Practice stamina, not certification.',
    accent: '#3D5A80',
    optional: true,
    lessons: [
      lesson(
        'b2-mock-reading',
        'B2 reading paper',
        'Timed Lectura: emotion, time clauses, and relatives.',
        [
          {
            ...read(
              'b2-mock-reading-1',
              mockB2Read,
              'What does the narrator doubt?',
              'That everyone agrees',
              ['That everyone agrees', 'That the barrio exists', 'That Friday exists', 'That there is noise'],
              ['texto-escrito', 'afirmacion'],
            ),
            task: 'Lectura · Barrio',
          },
          {
            ...read(
              'b2-mock-reading-2',
              mockB2Read,
              'When will they talk about the project?',
              'When the listener arrives on Friday',
              ['When the listener arrives on Friday', 'Never', 'Only last year', 'Before any arrival'],
              ['texto-escrito', 'detalle-mock'],
            ),
            task: 'Lectura · Plan',
          },
          {
            ...read(
              'b2-mock-reading-3',
              mockB2Read,
              'What worries the narrator most?',
              'Nighttime noise',
              ['Nighttime noise', 'A missing festival', 'A tip', 'Voseo forms'],
              ['texto-escrito', 'opcion-correcta'],
            ),
            task: 'Lectura · Detalle',
          },
          choice('b2-mock-reading-4', 'en-es', 'claim / statement', 'afirmación', ['afirmación', 'propina', 'feria', 'vos'], ['afirmacion']),
          choice('b2-mock-reading-5', 'es-en', 'detalle', 'detail', ['detail', 'tip', 'handshake', 'fair'], ['detalle-mock']),
          bank('b2-mock-reading-6', 'comprehension', ['comprensión'], ['propina', 'mate'], ['comprehension']),
          typeIn('b2-mock-reading-7', 'en-es', 'passage / text', 'texto', ['texto-escrito']),
          match('b2-mock-reading-8', [
            { es: 'examen', en: 'exam', vocabId: 'examen-dele' },
            { es: 'afirmación', en: 'claim', vocabId: 'afirmacion' },
            { es: 'detalle', en: 'detail', vocabId: 'detalle-mock' },
            { es: 'comprensión', en: 'comprehension', vocabId: 'comprehension' },
          ]),
          {
            ...read(
              'b2-mock-reading-9',
              'Es necesario que enviemos las notas hoy. Me molesta que haya retraso. Lo que quiero es una respuesta clara antes del viernes.',
              'What is necessary today?',
              'Sending the notes',
              ['Sending the notes', 'Cancelling Friday forever', 'Ignoring the delay', 'Skipping clarity'],
              ['texto-escrito', 'opcion-correcta'],
            ),
            task: 'Lectura · Mensaje',
          },
          typeIn('b2-mock-reading-10', 'en-es', 'time limit', 'tiempo límite', ['tiempo-limite']),
        ],
        900,
      ),
      lesson(
        'b2-mock-listening',
        'B2 listening paper',
        'Timed Audición: requests and discourse markers.',
        [
          {
            ...listen(
              'b2-mock-listening-1',
              mockB2Listen,
              'Before Friday',
              ['Before Friday', 'After next year', 'Never', 'Only on Monday forever'],
              ['audio-mock', 'detalle-mock'],
            ),
            task: 'Audición · Mensaje',
            question: 'When are the notes needed?',
          },
          {
            ...listen(
              'b2-mock-listening-2',
              mockB2Listen,
              'There is so much delay',
              ['There is so much delay', 'There is no project', 'There is only a tip', 'There is no Friday'],
              ['audio-mock', 'afirmacion'],
            ),
            task: 'Audición · Monólogo',
            question: 'What bothers the speaker?',
          },
          {
            ...listen(
              'b2-mock-listening-3',
              mockB2Listen,
              'A careful review is still needed',
              ['A careful review is still needed', 'Speed is the only goal', 'Markers are banned', 'Listening stops'],
              ['audio-mock', 'opcion-correcta'],
            ),
            task: 'Audición · Monólogo',
            question: 'What is true on the other hand?',
          },
          choice('b2-mock-listening-4', 'en-es', 'audio', 'audio', ['audio', 'texto', 'feria', 'mate'], ['audio-mock']),
          choice('b2-mock-listening-5', 'es-en', 'opción correcta', 'correct option', ['correct option', 'wrong tip', 'festival', 'handshake'], ['opcion-correcta']),
          bank('b2-mock-listening-6', 'exam', ['examen'], ['feria', 'vos'], ['examen-dele']),
          typeIn('b2-mock-listening-7', 'en-es', 'claim / statement', 'afirmación', ['afirmacion']),
          match('b2-mock-listening-8', [
            { es: 'audio', en: 'audio', vocabId: 'audio-mock' },
            { es: 'tiempo límite', en: 'time limit', vocabId: 'tiempo-limite' },
            { es: 'texto', en: 'passage', vocabId: 'texto-escrito' },
            { es: 'detalle', en: 'detail', vocabId: 'detalle-mock' },
          ]),
          say('b2-mock-listening-9', 'Necesito más práctica con el tiempo', 'I need more practice with the clock', ['tiempo-limite', 'examen-dele']),
          typeIn('b2-mock-listening-10', 'en-es', 'correct option', 'opción correcta', ['opcion-correcta']),
        ],
        780,
      ),
    ],
  },
]

export const c1PolishUnits: Unit[] = [
  {
    id: 'c1-dele-mock',
    title: 'Timed DELE C1 mock',
    description: 'Optional timed papers with concession, condition, and register.',
    accent: '#5C4B7A',
    optional: true,
    lessons: [
      lesson(
        'c1-mock-reading',
        'C1 reading paper',
        'Timed Lectura: nuance and advanced connectors.',
        [
          {
            ...read(
              'c1-mock-reading-1',
              mockC1Read,
              'What condition lets them sign?',
              'Preparing the report',
              ['Preparing the report', 'Cancelling the project', 'Ignoring the deadline', 'Waiting forever'],
              ['texto-escrito', 'detalle-mock'],
            ),
            task: 'Lectura · Argumento',
          },
          {
            ...read(
              'c1-mock-reading-2',
              mockC1Read,
              'What remains true despite protests?',
              'The deadline still stands',
              ['The deadline still stands', 'There is no proposal', 'Connectors are banned', 'Rain cancels grammar'],
              ['texto-escrito', 'afirmacion'],
            ),
            task: 'Lectura · Argumento',
          },
          {
            ...read(
              'c1-mock-reading-3',
              mockC1Read,
              'What should happen to the proposal?',
              'It should be qualified / nuanced',
              ['It should be qualified / nuanced', 'It should be deleted forever', 'It should ignore budget', 'It should skip waiting'],
              ['texto-escrito', 'opcion-correcta'],
            ),
            task: 'Lectura · Argumento',
          },
          choice('c1-mock-reading-4', 'en-es', 'comprehension', 'comprensión', ['comprensión', 'propina', 'feria', 'vos'], ['comprehension']),
          choice('c1-mock-reading-5', 'es-en', 'examen', 'exam', ['exam', 'tip', 'fair', 'handshake'], ['examen-dele']),
          bank('c1-mock-reading-6', 'correct option', ['opción', 'correcta'], ['vos', 'mate'], ['opcion-correcta']),
          typeIn('c1-mock-reading-7', 'en-es', 'detail', 'detalle', ['detalle-mock']),
          match('c1-mock-reading-8', [
            { es: 'afirmación', en: 'claim', vocabId: 'afirmacion' },
            { es: 'comprensión', en: 'comprehension', vocabId: 'comprehension' },
            { es: 'tiempo límite', en: 'time limit', vocabId: 'tiempo-limite' },
            { es: 'texto', en: 'passage', vocabId: 'texto-escrito' },
          ]),
          {
            ...read(
              'c1-mock-reading-9',
              'Ahora bien, no podemos esperar más. En efecto, el plazo es real. Con todo, conviene matizar el tono del mensaje.',
              'What is still advisable?',
              'Qualifying the tone of the message',
              ['Qualifying the tone of the message', 'Waiting forever', 'Deleting the deadline', 'Ignoring tone'],
              ['texto-escrito', 'afirmacion'],
            ),
            task: 'Lectura · Conectores',
          },
          typeIn('c1-mock-reading-10', 'en-es', 'exam', 'examen', ['examen-dele']),
        ],
        1080,
      ),
      lesson(
        'c1-mock-listening',
        'C1 listening paper',
        'Timed Audición: formal register and conditions.',
        [
          {
            ...listen(
              'c1-mock-listening-1',
              mockC1Listen,
              'Send the minutes',
              ['Send the minutes', 'Cancel the budget forever', 'Skip the reply', 'Ignore the project'],
              ['audio-mock', 'detalle-mock'],
            ),
            task: 'Audición · Formal',
            question: 'What does the speaker politely ask for?',
          },
          {
            ...listen(
              'c1-mock-listening-2',
              mockC1Listen,
              'They postpone the meeting',
              ['They postpone the meeting', 'They ban the project', 'They tip the minutes', 'They use only vos'],
              ['audio-mock', 'afirmacion'],
            ),
            task: 'Audición · Formal',
            question: 'What is the consequence?',
          },
          {
            ...listen(
              'c1-mock-listening-3',
              mockC1Listen,
              'As long as there is a budget',
              ['As long as there is a budget', 'Only if it rains', 'Never again', 'Without any condition'],
              ['audio-mock', 'opcion-correcta'],
            ),
            task: 'Audición · Formal',
            question: 'When does the project continue?',
          },
          choice('c1-mock-listening-4', 'en-es', 'audio', 'audio', ['audio', 'texto', 'feria', 'mate'], ['audio-mock']),
          choice('c1-mock-listening-5', 'es-en', 'detalle', 'detail', ['detail', 'tip', 'fair', 'handshake'], ['detalle-mock']),
          bank('c1-mock-listening-6', 'time limit', ['tiempo', 'límite'], ['turno', 'vos'], ['tiempo-limite']),
          typeIn('c1-mock-listening-7', 'en-es', 'claim / statement', 'afirmación', ['afirmacion']),
          match('c1-mock-listening-8', [
            { es: 'audio', en: 'audio', vocabId: 'audio-mock' },
            { es: 'opción correcta', en: 'correct option', vocabId: 'opcion-correcta' },
            { es: 'examen', en: 'exam', vocabId: 'examen-dele' },
            { es: 'comprensión', en: 'comprehension', vocabId: 'comprehension' },
          ]),
          say('c1-mock-listening-9', 'Practico con el reloj', 'I practice with the clock', ['tiempo-limite']),
          typeIn('c1-mock-listening-10', 'en-es', 'comprehension', 'comprensión', ['comprehension']),
        ],
        960,
      ),
    ],
  },
]

export const c2PolishUnits: Unit[] = [
  {
    id: 'c2-dele-mock',
    title: 'Timed DELE C2 mock',
    description: 'Optional timed papers at mastery density. Stamina practice only.',
    accent: '#1B4332',
    optional: true,
    lessons: [
      lesson(
        'c2-mock-reading',
        'C2 reading paper',
        'Timed Lectura: cohesion, hedging, and abstract stance.',
        [
          {
            ...read(
              'c2-mock-reading-1',
              mockC2Read,
              'What remains a problem despite a solid framing?',
              'Methodological bias',
              ['Methodological bias', 'A missing tip', 'A festival date', 'Voseo spelling'],
              ['texto-escrito', 'afirmacion'],
            ),
            task: 'Lectura · Debate',
          },
          {
            ...read(
              'c2-mock-reading-2',
              mockC2Read,
              'What improves after revision?',
              'Textual cohesion',
              ['Textual cohesion', 'Only the tip jar', 'Only the fair', 'Nothing at all'],
              ['texto-escrito', 'detalle-mock'],
            ),
            task: 'Lectura · Estilo',
          },
          {
            ...read(
              'c2-mock-reading-3',
              mockC2Read,
              'What does that improvement confirm?',
              'The initial hypothesis',
              ['The initial hypothesis', 'That exams are unofficial forever', 'That tips are required', 'That vos is mandatory'],
              ['texto-escrito', 'opcion-correcta'],
            ),
            task: 'Lectura · Debate',
          },
          choice('c2-mock-reading-4', 'en-es', 'exam', 'examen', ['examen', 'propina', 'feria', 'vos'], ['examen-dele']),
          choice('c2-mock-reading-5', 'es-en', 'comprensión', 'comprehension', ['comprehension', 'tip', 'fair', 'handshake'], ['comprehension']),
          bank('c2-mock-reading-6', 'passage', ['texto'], ['mate', 'feria'], ['texto-escrito']),
          typeIn('c2-mock-reading-7', 'en-es', 'time limit', 'tiempo límite', ['tiempo-limite']),
          match('c2-mock-reading-8', [
            { es: 'afirmación', en: 'claim', vocabId: 'afirmacion' },
            { es: 'detalle', en: 'detail', vocabId: 'detalle-mock' },
            { es: 'opción correcta', en: 'correct option', vocabId: 'opcion-correcta' },
            { es: 'tiempo límite', en: 'time limit', vocabId: 'tiempo-limite' },
          ]),
          {
            ...read(
              'c2-mock-reading-9',
              'Por así decirlo, el párrafo es irónico. Digamos que la conclusión necesita matices antes de la ponencia.',
              'What does the conclusion need before the talk?',
              'Nuance / qualification',
              ['Nuance / qualification', 'A tip only', 'A festival ticket', 'Deletion of all hedges'],
              ['texto-escrito', 'afirmacion'],
            ),
            task: 'Lectura · Ironía',
          },
          typeIn('c2-mock-reading-10', 'en-es', 'correct option', 'opción correcta', ['opcion-correcta']),
        ],
        1200,
      ),
      lesson(
        'c2-mock-listening',
        'C2 listening paper',
        'Timed Audición: irony, hedges, and academic talk.',
        [
          {
            ...listen(
              'c2-mock-listening-1',
              mockC2Listen,
              'It is deliberate',
              ['It is deliberate', 'It is accidental only', 'It is a tip', 'It is a festival'],
              ['audio-mock', 'afirmacion'],
            ),
            task: 'Audición · Ironía',
            question: 'What does the speaker say about the irony?',
          },
          {
            ...listen(
              'c2-mock-listening-2',
              mockC2Listen,
              'Supposedly the finding is definitive',
              ['Supposedly the finding is definitive', 'Tips are definitive', 'Festivals are banned', 'Voseo is required'],
              ['audio-mock', 'detalle-mock'],
            ),
            task: 'Audición · Hedge',
            question: 'How is the finding framed?',
          },
          {
            ...listen(
              'c2-mock-listening-3',
              mockC2Listen,
              'Qualify the claim before the talk',
              ['Qualify the claim before the talk', 'Delete the talk', 'Ignore hedges', 'Skip comprehension'],
              ['audio-mock', 'opcion-correcta'],
            ),
            task: 'Audición · Argumento',
            question: 'What should happen in summary?',
          },
          choice('c2-mock-listening-4', 'en-es', 'audio', 'audio', ['audio', 'texto', 'feria', 'mate'], ['audio-mock']),
          choice('c2-mock-listening-5', 'es-en', 'examen', 'exam', ['exam', 'tip', 'fair', 'handshake'], ['examen-dele']),
          bank('c2-mock-listening-6', 'comprehension', ['comprensión'], ['propina', 'vos'], ['comprehension']),
          typeIn('c2-mock-listening-7', 'en-es', 'detail', 'detalle', ['detalle-mock']),
          match('c2-mock-listening-8', [
            { es: 'audio', en: 'audio', vocabId: 'audio-mock' },
            { es: 'texto', en: 'passage', vocabId: 'texto-escrito' },
            { es: 'examen', en: 'exam', vocabId: 'examen-dele' },
            { es: 'comprensión', en: 'comprehension', vocabId: 'comprehension' },
          ]),
          say('c2-mock-listening-9', 'El tiempo límite exige concentración', 'The time limit demands focus', ['tiempo-limite']),
          typeIn('c2-mock-listening-10', 'en-es', 'claim / statement', 'afirmación', ['afirmacion']),
        ],
        1080,
      ),
    ],
  },
]
