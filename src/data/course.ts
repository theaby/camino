import type {
  BankExercise,
  ChoiceExercise,
  Direction,
  Lesson,
  ListenExercise,
  MatchExercise,
  MatchPair,
  SpeakExercise,
  TypeExercise,
  Unit,
  Vocab,
} from './types'

/**
 * Beginner course for speaking and reading.
 *
 * To add a unit: add any new entries to `vocab`, then append a unit to `course`.
 * Each lesson should be about 10 exercises. Lesson ids are stored in localStorage,
 * so rename one only if you mean to reset that lesson's completion.
 */

export const vocab: Vocab[] = [
  { id: 'hola', es: 'Hola', en: 'Hello' },
  { id: 'adios', es: 'Adiós', en: 'Goodbye' },
  { id: 'buenos-dias', es: 'Buenos días', en: 'Good morning' },
  { id: 'buenas-tardes', es: 'Buenas tardes', en: 'Good afternoon' },
  { id: 'buenas-noches', es: 'Buenas noches', en: 'Good night' },
  { id: 'gracias', es: 'Gracias', en: 'Thank you' },
  { id: 'por-favor', es: 'Por favor', en: 'Please' },
  { id: 'de-nada', es: 'De nada', en: "You're welcome" },
  { id: 'si', es: 'Sí', en: 'Yes' },
  { id: 'como-estas', es: '¿Cómo estás?', en: 'How are you?' },
  { id: 'estoy-bien', es: 'Estoy bien', en: "I'm well" },
  { id: 'estoy-mal', es: 'Estoy mal', en: "I'm not well" },
  { id: 'mas-o-menos', es: 'Más o menos', en: 'So-so' },
  { id: 'mucho-gusto', es: 'Mucho gusto', en: 'Nice to meet you' },
  { id: 'me-llamo', es: 'Me llamo', en: 'My name is' },
  { id: 'como-te-llamas', es: '¿Cómo te llamas?', en: "What's your name?" },
  { id: 'hasta-luego', es: 'Hasta luego', en: 'See you later' },
  { id: 'uno', es: 'uno', en: '1' },
  { id: 'dos', es: 'dos', en: '2' },
  { id: 'tres', es: 'tres', en: '3' },
  { id: 'cuatro', es: 'cuatro', en: '4' },
  { id: 'cinco', es: 'cinco', en: '5' },
  { id: 'seis', es: 'seis', en: '6' },
  { id: 'siete', es: 'siete', en: '7' },
  { id: 'ocho', es: 'ocho', en: '8' },
  { id: 'nueve', es: 'nueve', en: '9' },
  { id: 'diez', es: 'diez', en: '10' },
  { id: 'cuantos', es: '¿Cuántos?', en: 'How many?' },
  { id: 'agua', es: 'agua', en: 'water' },
  { id: 'cafe', es: 'café', en: 'coffee' },
  { id: 'te', es: 'té', en: 'tea' },
  { id: 'leche', es: 'leche', en: 'milk' },
  { id: 'pan', es: 'pan', en: 'bread' },
  { id: 'manzana', es: 'manzana', en: 'apple' },
  { id: 'queso', es: 'queso', en: 'cheese' },
  { id: 'pollo', es: 'pollo', en: 'chicken' },
  { id: 'quiero', es: 'quiero', en: 'I want' },
  { id: 'la-cuenta', es: 'la cuenta', en: 'the check' },
  { id: 'cuanto-cuesta', es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
  { id: 'madre', es: 'madre', en: 'mother' },
  { id: 'padre', es: 'padre', en: 'father' },
  { id: 'hermano', es: 'hermano', en: 'brother' },
  { id: 'hermana', es: 'hermana', en: 'sister' },
  { id: 'hijo', es: 'hijo', en: 'son' },
  { id: 'hija', es: 'hija', en: 'daughter' },
  { id: 'familia', es: 'familia', en: 'family' },
  { id: 'tengo', es: 'tengo', en: 'I have' },
  { id: 'aeropuerto', es: 'aeropuerto', en: 'airport' },
  { id: 'estacion', es: 'estación', en: 'station' },
  { id: 'hotel', es: 'hotel', en: 'hotel' },
  { id: 'bano', es: 'baño', en: 'bathroom' },
  { id: 'boleto', es: 'boleto', en: 'ticket' },
  { id: 'taxi', es: 'taxi', en: 'taxi' },
  { id: 'tren', es: 'tren', en: 'train' },
  { id: 'izquierda', es: 'izquierda', en: 'left' },
  { id: 'derecha', es: 'derecha', en: 'right' },
  { id: 'donde-esta', es: '¿Dónde está?', en: 'Where is it?' },
  { id: 'soy', es: 'soy', en: 'I am' },
  { id: 'me-gusta', es: 'me gusta', en: 'I like' },
  { id: 'hoy', es: 'hoy', en: 'today' },
  { id: 'manana', es: 'mañana', en: 'tomorrow' },
  { id: 'hasta-manana', es: 'Hasta mañana', en: 'See you tomorrow' },
]

function choice(
  id: string,
  direction: Direction,
  prompt: string,
  answer: string,
  options: string[],
  vocabIds: string[],
  tip?: string,
): ChoiceExercise {
  return { id, type: 'choice', direction, prompt, answer, options, vocabIds, ...(tip ? { tip } : {}) }
}

function bank(
  id: string,
  prompt: string,
  answer: string[],
  extra: string[],
  vocabIds: string[],
  tip?: string,
): BankExercise {
  return {
    id,
    type: 'bank',
    prompt,
    answer,
    tiles: [...answer, ...extra],
    vocabIds,
    ...(tip ? { tip } : {}),
  }
}

function typeIn(
  id: string,
  direction: Direction,
  prompt: string,
  answer: string,
  vocabIds: string[],
  accept?: string[],
  tip?: string,
): TypeExercise {
  return {
    id,
    type: 'type',
    direction,
    prompt,
    answer,
    vocabIds,
    ...(accept ? { accept } : {}),
    ...(tip ? { tip } : {}),
  }
}

function match(id: string, pairs: MatchPair[], tip?: string): MatchExercise {
  return { id, type: 'match', prompt: 'Pair the Spanish with the English.', pairs, ...(tip ? { tip } : {}) }
}

function listen(
  id: string,
  phrase: string,
  answer: string,
  options: string[],
  vocabIds: string[],
  tip?: string,
): ListenExercise {
  return { id, type: 'listen', phrase, answer, options, vocabIds, ...(tip ? { tip } : {}) }
}

function say(id: string, phrase: string, translation: string, vocabIds: string[], tip?: string): SpeakExercise {
  return { id, type: 'speak', phrase, translation, vocabIds, ...(tip ? { tip } : {}) }
}

function lesson(id: string, title: string, summary: string, exercises: Lesson['exercises']): Lesson {
  return { id, title, summary, exercises }
}

export const course: Unit[] = [
  {
    id: 'greetings',
    title: 'Greetings',
    description: 'Hello, goodbye, and how you are.',
    accent: '#C4553A',
    lessons: [
      lesson('greetings-hello', 'Hello and goodbye', 'The first words you will actually say.', [
        choice('greetings-hello-1', 'en-es', 'Hello', 'Hola', ['Hola', 'Adiós', 'Gracias', 'Por favor'], ['hola']),
        choice('greetings-hello-2', 'es-en', 'Adiós', 'Goodbye', ['Goodbye', 'Hello', 'Please', 'Thank you'], ['adios'], 'The accent in adiós marks the stressed syllable.'),
        listen('greetings-hello-3', 'Buenos días', 'Good morning', ['Good morning', 'Good night', 'Good afternoon', 'Thank you'], ['buenos-dias']),
        choice('greetings-hello-4', 'en-es', 'Good night', 'Buenas noches', ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hola'], ['buenas-noches']),
        bank('greetings-hello-5', 'Good afternoon', ['Buenas', 'tardes'], ['noches', 'Hola'], ['buenas-tardes']),
        typeIn('greetings-hello-6', 'en-es', 'thank you', 'gracias', ['gracias']),
        match('greetings-hello-7', [
          { es: 'Hola', en: 'Hello', vocabId: 'hola' },
          { es: 'Adiós', en: 'Goodbye', vocabId: 'adios' },
          { es: 'Gracias', en: 'Thank you', vocabId: 'gracias' },
          { es: 'Por favor', en: 'Please', vocabId: 'por-favor' },
        ]),
        say('greetings-hello-8', 'Buenos días', 'Good morning', ['buenos-dias']),
        choice('greetings-hello-9', 'es-en', 'De nada', "You're welcome", ["You're welcome", 'Please', 'Hello', 'Good night'], ['de-nada']),
        typeIn('greetings-hello-10', 'en-es', 'yes', 'sí', ['si']),
      ]),
      lesson('greetings-how', 'How are you?', 'A short reply you can use every day.', [
        choice(
          'greetings-how-1',
          'en-es',
          'How are you?',
          '¿Cómo estás?',
          ['¿Cómo estás?', 'Estoy bien', 'Mucho gusto', 'Hasta luego'],
          ['como-estas'],
          '¿Cómo estás? is the informal question, for friends and family.',
        ),
        listen('greetings-how-2', '¿Cómo estás?', 'How are you?', ['How are you?', "What's your name?", 'Nice to meet you', 'See you later'], ['como-estas']),
        choice('greetings-how-3', 'es-en', 'Estoy bien', "I'm well", ["I'm well", "I'm not well", 'So-so', 'Thank you'], ['estoy-bien']),
        bank('greetings-how-4', "I'm well", ['Estoy', 'bien'], ['mal', 'Hola'], ['estoy-bien']),
        choice('greetings-how-5', 'es-en', 'Más o menos', 'So-so', ['So-so', "I'm well", 'Goodbye', 'Please'], ['mas-o-menos']),
        typeIn('greetings-how-6', 'en-es', "I'm not well", 'estoy mal', ['estoy-mal']),
        match('greetings-how-7', [
          { es: '¿Cómo estás?', en: 'How are you?', vocabId: 'como-estas' },
          { es: 'Mucho gusto', en: 'Nice to meet you', vocabId: 'mucho-gusto' },
          { es: 'Hasta luego', en: 'See you later', vocabId: 'hasta-luego' },
          { es: 'Me llamo', en: 'My name is', vocabId: 'me-llamo' },
        ]),
        say('greetings-how-8', 'Mucho gusto', 'Nice to meet you', ['mucho-gusto']),
        choice('greetings-how-9', 'en-es', "What's your name?", '¿Cómo te llamas?', ['¿Cómo te llamas?', '¿Cómo estás?', 'Me llamo', 'De nada'], ['como-te-llamas']),
        typeIn('greetings-how-10', 'en-es', 'See you later', 'hasta luego', ['hasta-luego']),
      ]),
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Count from one to ten.',
    accent: '#1F6F8A',
    lessons: [
      lesson('numbers-1', 'One to five', 'Small numbers, said aloud.', [
        choice('numbers-1-1', 'en-es', '1', 'uno', ['uno', 'dos', 'tres', 'cinco'], ['uno']),
        listen('numbers-1-2', 'tres', '3', ['3', '2', '4', '5'], ['tres']),
        choice('numbers-1-3', 'es-en', 'cinco', '5', ['5', '4', '2', '1'], ['cinco']),
        bank('numbers-1-4', '1, 2', ['uno', 'dos'], ['tres', 'cinco'], ['uno', 'dos'], 'Say the numbers in order, with a small pause between them.'),
        typeIn('numbers-1-5', 'en-es', '4', 'cuatro', ['cuatro']),
        match('numbers-1-6', [
          { es: 'uno', en: '1', vocabId: 'uno' },
          { es: 'dos', en: '2', vocabId: 'dos' },
          { es: 'tres', en: '3', vocabId: 'tres' },
          { es: 'cuatro', en: '4', vocabId: 'cuatro' },
        ]),
        say('numbers-1-7', 'cinco', '5', ['cinco']),
        choice('numbers-1-8', 'es-en', 'dos', '2', ['2', '5', '3', '1'], ['dos']),
        listen('numbers-1-9', 'uno', '1', ['1', '2', '3', '4'], ['uno']),
        typeIn('numbers-1-10', 'en-es', '3', 'tres', ['tres']),
      ]),
      lesson('numbers-2', 'Six to ten', 'Finish the count, then ask how many.', [
        choice('numbers-2-1', 'en-es', '6', 'seis', ['seis', 'siete', 'ocho', 'diez'], ['seis']),
        listen('numbers-2-2', 'ocho', '8', ['8', '6', '9', '10'], ['ocho']),
        choice('numbers-2-3', 'es-en', 'diez', '10', ['10', '6', '8', '9'], ['diez']),
        typeIn('numbers-2-4', 'en-es', '7', 'siete', ['siete']),
        match('numbers-2-5', [
          { es: 'seis', en: '6', vocabId: 'seis' },
          { es: 'siete', en: '7', vocabId: 'siete' },
          { es: 'nueve', en: '9', vocabId: 'nueve' },
          { es: 'diez', en: '10', vocabId: 'diez' },
        ]),
        bank('numbers-2-6', '1, 2, 3', ['uno', 'dos', 'tres'], ['ocho', 'diez'], ['uno', 'dos', 'tres']),
        say('numbers-2-7', 'diez', '10', ['diez']),
        choice('numbers-2-8', 'es-en', '¿Cuántos?', 'How many?', ['How many?', 'How are you?', 'How much?', 'Thank you'], ['cuantos'], '¿Cuántos? asks how many. ¿Cuánto? asks how much.'),
        listen('numbers-2-9', 'seis', '6', ['6', '7', '8', '10'], ['seis']),
        typeIn('numbers-2-10', 'en-es', '9', 'nueve', ['nueve']),
      ]),
    ],
  },
  {
    id: 'food',
    title: 'Food and drink',
    description: 'Order something simple and ask for the check.',
    accent: '#C4841D',
    lessons: [
      lesson('food-drinks', 'Something to drink', 'Water, coffee, tea, and milk.', [
        choice('food-drinks-1', 'en-es', 'water', 'agua', ['agua', 'leche', 'pan', 'café'], ['agua']),
        listen('food-drinks-2', 'café', 'coffee', ['coffee', 'tea', 'milk', 'water'], ['cafe']),
        choice('food-drinks-3', 'es-en', 'té', 'tea', ['tea', 'coffee', 'milk', 'bread'], ['te']),
        choice('food-drinks-4', 'en-es', 'milk', 'leche', ['leche', 'agua', 'té', 'queso'], ['leche']),
        bank('food-drinks-5', 'I want water', ['Quiero', 'agua'], ['leche', 'pan'], ['quiero', 'agua'], 'Quiero means I want. Quiero agua = I want water.'),
        typeIn('food-drinks-6', 'en-es', 'coffee', 'café', ['cafe']),
        match('food-drinks-7', [
          { es: 'agua', en: 'water', vocabId: 'agua' },
          { es: 'café', en: 'coffee', vocabId: 'cafe' },
          { es: 'té', en: 'tea', vocabId: 'te' },
          { es: 'leche', en: 'milk', vocabId: 'leche' },
        ]),
        say('food-drinks-8', 'Quiero café', 'I want coffee', ['quiero', 'cafe']),
        listen('food-drinks-9', 'leche', 'milk', ['milk', 'water', 'tea', 'coffee'], ['leche']),
        typeIn('food-drinks-10', 'en-es', 'I want tea', 'quiero té', ['quiero', 'te'], ['quiero te']),
      ]),
      lesson('food-table', 'At the table', 'A few foods, the price, and the check.', [
        choice('food-table-1', 'en-es', 'bread', 'pan', ['pan', 'pollo', 'manzana', 'queso'], ['pan']),
        listen('food-table-2', 'manzana', 'apple', ['apple', 'cheese', 'chicken', 'bread'], ['manzana']),
        choice('food-table-3', 'es-en', 'queso', 'cheese', ['cheese', 'bread', 'chicken', 'apple'], ['queso']),
        choice('food-table-4', 'en-es', 'chicken', 'pollo', ['pollo', 'pan', 'queso', 'agua'], ['pollo']),
        bank('food-table-5', 'I want bread', ['Quiero', 'pan'], ['pollo', 'agua'], ['quiero', 'pan']),
        typeIn('food-table-6', 'en-es', 'apple', 'manzana', ['manzana']),
        match('food-table-7', [
          { es: 'pan', en: 'bread', vocabId: 'pan' },
          { es: 'manzana', en: 'apple', vocabId: 'manzana' },
          { es: 'queso', en: 'cheese', vocabId: 'queso' },
          { es: 'pollo', en: 'chicken', vocabId: 'pollo' },
        ]),
        say('food-table-8', 'La cuenta, por favor', 'The check, please', ['la-cuenta', 'por-favor']),
        choice('food-table-9', 'es-en', '¿Cuánto cuesta?', 'How much does it cost?', ['How much does it cost?', 'How many?', 'The check', 'I want water'], ['cuanto-cuesta']),
        typeIn('food-table-10', 'en-es', 'the check', 'la cuenta', ['la-cuenta'], ['cuenta']),
      ]),
    ],
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Name the people close to you.',
    accent: '#A33B6A',
    lessons: [
      lesson('family-members', 'The family', 'Mother, father, sister, brother.', [
        choice('family-members-1', 'en-es', 'mother', 'madre', ['madre', 'padre', 'hermana', 'hija'], ['madre']),
        listen('family-members-2', 'padre', 'father', ['father', 'mother', 'brother', 'son'], ['padre']),
        choice('family-members-3', 'es-en', 'hermana', 'sister', ['sister', 'brother', 'daughter', 'mother'], ['hermana']),
        choice('family-members-4', 'en-es', 'brother', 'hermano', ['hermano', 'hermana', 'padre', 'hijo'], ['hermano']),
        bank('family-members-5', 'my mother', ['mi', 'madre'], ['padre', 'hermano'], ['madre'], 'Mi means my. Mi madre = my mother.'),
        typeIn('family-members-6', 'en-es', 'father', 'padre', ['padre']),
        match('family-members-7', [
          { es: 'madre', en: 'mother', vocabId: 'madre' },
          { es: 'padre', en: 'father', vocabId: 'padre' },
          { es: 'hermano', en: 'brother', vocabId: 'hermano' },
          { es: 'hermana', en: 'sister', vocabId: 'hermana' },
        ]),
        say('family-members-8', 'mi familia', 'my family', ['familia']),
        listen('family-members-9', 'hermano', 'brother', ['brother', 'sister', 'father', 'son'], ['hermano']),
        typeIn('family-members-10', 'en-es', 'sister', 'hermana', ['hermana']),
      ]),
      lesson('family-have', 'I have', 'Say who is in your family.', [
        choice('family-have-1', 'en-es', 'son', 'hijo', ['hijo', 'hija', 'padre', 'hermano'], ['hijo']),
        listen('family-have-2', 'hija', 'daughter', ['daughter', 'son', 'sister', 'mother'], ['hija']),
        choice('family-have-3', 'es-en', 'familia', 'family', ['family', 'father', 'daughter', 'brother'], ['familia']),
        bank(
          'family-have-4',
          'I have a sister',
          ['Tengo', 'una', 'hermana'],
          ['hermano', 'un'],
          ['tengo', 'hermana'],
          'Una is the feminine a. Hermana takes una. Hermano takes un.',
        ),
        typeIn('family-have-5', 'en-es', 'I have a brother', 'tengo un hermano', ['tengo', 'hermano'], ['tengo hermano']),
        match('family-have-6', [
          { es: 'hijo', en: 'son', vocabId: 'hijo' },
          { es: 'hija', en: 'daughter', vocabId: 'hija' },
          { es: 'familia', en: 'family', vocabId: 'familia' },
          { es: 'tengo', en: 'I have', vocabId: 'tengo' },
        ]),
        say('family-have-7', 'Tengo un hermano', 'I have a brother', ['tengo', 'hermano']),
        choice('family-have-8', 'es-en', 'mi padre', 'my father', ['my father', 'my mother', 'my brother', 'my sister'], ['padre']),
        listen('family-have-9', 'mi madre', 'my mother', ['my mother', 'my father', 'my sister', 'my family'], ['madre']),
        typeIn('family-have-10', 'en-es', 'my family', 'mi familia', ['familia'], ['familia']),
      ]),
    ],
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Places, tickets, and left or right.',
    accent: '#3D4F8A',
    lessons: [
      lesson('travel-places', 'Places', 'Airport, station, hotel, bathroom.', [
        choice('travel-places-1', 'en-es', 'airport', 'aeropuerto', ['aeropuerto', 'estación', 'hotel', 'baño'], ['aeropuerto']),
        listen('travel-places-2', 'estación', 'station', ['station', 'airport', 'hotel', 'bathroom'], ['estacion']),
        choice('travel-places-3', 'en-es', 'hotel', 'el hotel', ['el hotel', 'el baño', 'el tren', 'el taxi'], ['hotel'], 'El is the masculine the: el hotel, el baño, el tren.'),
        choice('travel-places-4', 'en-es', 'bathroom', 'el baño', ['el baño', 'el hotel', 'la estación', 'el aeropuerto'], ['bano']),
        bank('travel-places-5', 'the airport', ['el', 'aeropuerto'], ['estación', 'la'], ['aeropuerto']),
        typeIn('travel-places-6', 'en-es', 'station', 'estación', ['estacion'], ['la estacion', 'la estación']),
        match('travel-places-7', [
          { es: 'aeropuerto', en: 'airport', vocabId: 'aeropuerto' },
          { es: 'estación', en: 'station', vocabId: 'estacion' },
          { es: 'hotel', en: 'hotel', vocabId: 'hotel' },
          { es: 'baño', en: 'bathroom', vocabId: 'bano' },
        ]),
        say('travel-places-8', 'el baño', 'the bathroom', ['bano']),
        listen('travel-places-9', 'el hotel', 'hotel', ['hotel', 'station', 'airport', 'bathroom'], ['hotel']),
        typeIn('travel-places-10', 'en-es', 'bathroom', 'baño', ['bano'], ['el bano', 'el baño']),
      ]),
      lesson('travel-move', 'Getting around', 'A ticket, a train, and which way.', [
        choice('travel-move-1', 'en-es', 'ticket', 'el boleto', ['el boleto', 'el tren', 'el taxi', 'la estación'], ['boleto'], 'In Spain you will also hear el billete for ticket.'),
        listen('travel-move-2', 'taxi', 'taxi', ['taxi', 'train', 'ticket', 'station'], ['taxi']),
        choice('travel-move-3', 'es-en', 'tren', 'train', ['train', 'taxi', 'ticket', 'left'], ['tren']),
        choice('travel-move-4', 'en-es', 'left', 'izquierda', ['izquierda', 'derecha', 'estación', 'hotel'], ['izquierda']),
        bank('travel-move-5', 'to the right', ['a', 'la', 'derecha'], ['izquierda', 'el'], ['derecha'], 'A la derecha = to the right. A la izquierda = to the left.'),
        typeIn('travel-move-6', 'en-es', 'train', 'tren', ['tren'], ['el tren']),
        match('travel-move-7', [
          { es: 'boleto', en: 'ticket', vocabId: 'boleto' },
          { es: 'taxi', en: 'taxi', vocabId: 'taxi' },
          { es: 'izquierda', en: 'left', vocabId: 'izquierda' },
          { es: 'derecha', en: 'right', vocabId: 'derecha' },
        ]),
        say('travel-move-8', '¿Dónde está el baño?', 'Where is the bathroom?', ['donde-esta', 'bano']),
        choice('travel-move-9', 'es-en', '¿Dónde está?', 'Where is it?', ['Where is it?', 'How much is it?', 'How many?', 'See you later'], ['donde-esta']),
        typeIn('travel-move-10', 'en-es', 'I want a ticket', 'quiero un boleto', ['quiero', 'boleto'], ['quiero un billete', 'quiero boleto']),
      ]),
    ],
  },
  {
    id: 'daily',
    title: 'Everyday',
    description: 'Say who you are, what you like, and when.',
    accent: '#1F7A4D',
    lessons: [
      lesson('daily-me', 'About me', 'I am, and I like.', [
        choice('daily-me-1', 'en-es', 'I am', 'soy', ['soy', 'tengo', 'quiero', 'estoy'], ['soy']),
        listen('daily-me-2', 'Me gusta', 'I like', ['I like', 'I am', 'I want', 'I have'], ['me-gusta']),
        choice('daily-me-3', 'es-en', 'Me gusta el café', 'I like coffee', ['I like coffee', 'I want coffee', 'I am coffee', 'The coffee, please'], ['me-gusta', 'cafe']),
        bank('daily-me-4', 'I like bread', ['Me', 'gusta', 'el', 'pan'], ['la', 'agua'], ['me-gusta', 'pan'], 'Me gusta el pan = I like bread.'),
        typeIn('daily-me-5', 'en-es', 'I am Ana', 'soy Ana', ['soy'], ['yo soy ana']),
        match('daily-me-6', [
          { es: 'soy', en: 'I am', vocabId: 'soy' },
          { es: 'me gusta', en: 'I like', vocabId: 'me-gusta' },
          { es: 'pan', en: 'bread', vocabId: 'pan' },
          { es: 'café', en: 'coffee', vocabId: 'cafe' },
        ]),
        say('daily-me-7', 'Me gusta el café', 'I like coffee', ['me-gusta', 'cafe']),
        choice('daily-me-8', 'es-en', 'Soy de México', "I'm from Mexico", ["I'm from Mexico", 'I like Mexico', 'I am well', 'See you tomorrow'], ['soy']),
        listen('daily-me-9', 'Soy', 'I am', ['I am', 'I like', 'I have', 'I want'], ['soy']),
        typeIn('daily-me-10', 'en-es', 'I like water', 'me gusta el agua', ['me-gusta', 'agua'], ['me gusta agua'], 'Agua is feminine, but it takes el: el agua.'),
      ]),
      lesson('daily-time', 'Today and tomorrow', 'Two time words you can use right away.', [
        choice('daily-time-1', 'en-es', 'today', 'hoy', ['hoy', 'mañana', 'bien', 'gracias'], ['hoy']),
        listen('daily-time-2', 'mañana', 'tomorrow', ['tomorrow', 'today', 'morning', 'yesterday'], ['manana'], 'Mañana means tomorrow. In the morning is por la mañana.'),
        choice('daily-time-3', 'es-en', 'hoy', 'today', ['today', 'tomorrow', 'yesterday', 'now'], ['hoy']),
        bank('daily-time-4', 'today and tomorrow', ['hoy', 'y', 'mañana'], ['luego', 'bien'], ['hoy', 'manana']),
        typeIn('daily-time-5', 'en-es', 'today', 'hoy', ['hoy']),
        match('daily-time-6', [
          { es: 'hoy', en: 'today', vocabId: 'hoy' },
          { es: 'mañana', en: 'tomorrow', vocabId: 'manana' },
          { es: 'gracias', en: 'thank you', vocabId: 'gracias' },
          { es: 'hasta luego', en: 'see you later', vocabId: 'hasta-luego' },
        ]),
        say('daily-time-7', 'Hasta mañana', 'See you tomorrow', ['hasta-manana']),
        choice('daily-time-8', 'es-en', 'Hasta mañana', 'See you tomorrow', ['See you tomorrow', 'See you later', 'Good morning', 'How are you?'], ['hasta-manana']),
        listen('daily-time-9', 'Hoy', 'today', ['today', 'tomorrow', 'yesterday', 'now'], ['hoy']),
        typeIn('daily-time-10', 'en-es', 'See you tomorrow', 'hasta mañana', ['hasta-manana']),
      ]),
    ],
  },
]
