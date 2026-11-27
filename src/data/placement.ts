import { CEFR_LEVELS, type CefrLevel } from './types'

export type CheckItem = {
  id: string
  level: CefrLevel
  prompt: string
  promptLang?: 'en' | 'es'
  options: string[]
  answer: string
}

export const placementItems: CheckItem[] = [
  { id: 'place-a1-1', level: 'A1', prompt: 'Hello', options: ['Hola', 'Adiós', 'Gracias', 'Ayer'], answer: 'Hola' },
  { id: 'place-a1-2', level: 'A1', prompt: 'I am well', options: ['Estoy bien', 'Soy bien', 'Fui bien', 'Estaba bien'], answer: 'Estoy bien' },
  { id: 'place-a1-3', level: 'A1', prompt: "I'm from Mexico", options: ['Soy de México', 'Estoy de México', 'Fui de México', 'Era México'], answer: 'Soy de México' },
  { id: 'place-a1-4', level: 'A1', prompt: 'My head hurts', options: ['Me duele la cabeza', 'Duele me la cabeza', 'Tengo cabeza ayer', 'Soy dolor'], answer: 'Me duele la cabeza' },
  { id: 'place-a1-5', level: 'A1', prompt: 'There is no bread', options: ['No hay pan', 'No es pan', 'No estoy pan', 'Había pan ayer'], answer: 'No hay pan' },
  { id: 'place-a2-1', level: 'A2', prompt: 'Yesterday I spoke', options: ['Ayer hablé', 'Ayer hablo', 'Ayer hablaba siempre', 'Mañana hablé'], answer: 'Ayer hablé' },
  { id: 'place-a2-2', level: 'A2', prompt: 'When I was a child, I lived here', options: ['Cuando era niño, vivía aquí', 'Ayer era niño y viví aquí una vez', 'Cuando soy niño, viví', 'Mañana era niño'], answer: 'Cuando era niño, vivía aquí' },
  { id: 'place-a2-3', level: 'A2', prompt: 'I like the books', options: ['Me gustan los libros', 'Me gusta los libros', 'Gusto los libros', 'Me gustó los libros'], answer: 'Me gustan los libros' },
  { id: 'place-a2-4', level: 'A2', prompt: "Don't go!", options: ['¡No vayas!', '¡No vas!', '¡No ve!', '¡No ir!'], answer: '¡No vayas!' },
  { id: 'place-a2-5', level: 'A2', prompt: 'I give it to her', options: ['Se lo doy', 'Le lo doy', 'Lo le doy', 'Se le doy'], answer: 'Se lo doy' },
  { id: 'place-b1-1', level: 'B1', prompt: 'Tomorrow I will travel', options: ['Mañana viajaré', 'Ayer viajaré', 'Mañana viajé', 'Mañana viajaba'], answer: 'Mañana viajaré' },
  { id: 'place-b1-2', level: 'B1', prompt: 'I would like a coffee', options: ['Me gustaría un café', 'Me gusta un café ayer', 'Me gusté un café', 'Me gustarán un café'], answer: 'Me gustaría un café' },
  { id: 'place-b1-3', level: 'B1', prompt: 'This gift is for you', options: ['Este regalo es para ti', 'Este regalo es por tres horas', 'Este regalo está por ti', 'Este regalo fue para ayer una vez'], answer: 'Este regalo es para ti' },
  { id: 'place-b1-4', level: 'B1', prompt: 'You should rest', options: ['Deberías descansar', 'Debiste perdí', 'Descansa ayer solo', 'Deberé tos'], answer: 'Deberías descansar' },
  { id: 'place-b1-5', level: 'B1', prompt: 'She said that she would arrive late', options: ['Dijo que llegaría tarde', 'Dice que sea tarde', 'Dudo que llegó', 'Quiero que tarde'], answer: 'Dijo que llegaría tarde' },
  { id: 'place-b2-1', level: 'B2', prompt: 'I want you to come', options: ['Quiero que vengas', 'Quiero que vienes', 'Sé que vengas', 'Quiero venir que tú'], answer: 'Quiero que vengas' },
  { id: 'place-b2-2', level: 'B2', prompt: 'I doubt that it is true', options: ['Dudo que sea verdad', 'Dudo que es verdad', 'Sé que sea verdad', 'Creo que sea siempre verdad'], answer: 'Dudo que sea verdad' },
  { id: 'place-b2-3', level: 'B2', prompt: 'the book that I read', options: ['el libro que leí', 'el libro quien leí', 'el libro cuyo leí', 'el libro lo que leí'], answer: 'el libro que leí' },
  { id: 'place-b2-4', level: 'B2', prompt: 'It makes me glad that you come', options: ['Me alegra que vengas', 'Me alegra que vienes', 'Sé que vengas', 'Dudo que vienes'], answer: 'Me alegra que vengas' },
  { id: 'place-b2-5', level: 'B2', prompt: 'When you arrive, call me', options: ['Cuando llegues, llámame', 'Cuando llegas mañana una vez, llámame', 'Cuando llegaste, llámame', 'Cuando llegar, llama'], answer: 'Cuando llegues, llámame' },
  { id: 'place-c1-1', level: 'C1', prompt: 'Even if it rains, I will go out', options: ['Aunque llueva, saldré', 'Aunque llueve, salí', 'A menos que llueve, salgo', 'Si llover, saldría'], answer: 'Aunque llueva, saldré' },
  { id: 'place-c1-2', level: 'C1', prompt: 'If I had known, I would have called', options: ['Si lo hubiera sabido, habría llamado', 'Si lo sabré, llamé', 'Si lo sé, habría llamado', 'Si lo hubiera, llamo ayer'], answer: 'Si lo hubiera sabido, habría llamado' },
  { id: 'place-c1-3', level: 'C1', prompt: 'however', promptLang: 'en', options: ['sin embargo', 'por lo tanto', 'a menos que', 'cuyo'], answer: 'sin embargo' },
  { id: 'place-c1-4', level: 'C1', prompt: 'provided that', promptLang: 'en', options: ['con tal de que', 'por más que', 'es decir', 'cuyo'], answer: 'con tal de que' },
  { id: 'place-c1-5', level: 'C1', prompt: 'as if he were an expert', options: ['como si fuera experto', 'como si es experto', 'como si será experto', 'como si fue experto ayer solo'], answer: 'como si fuera experto' },
  { id: 'place-c2-1', level: 'C2', prompt: 'one might say', promptLang: 'en', options: ['cabría decir', 'sin lugar a dudas', 'meter la pata', 'de golpe'], answer: 'cabría decir' },
  { id: 'place-c2-2', level: 'C2', prompt: 'to hit the nail on the head', options: ['dar en el clavo', 'meter la pata', 'tomar el pelo', 'no pegar ojo'], answer: 'dar en el clavo' },
  { id: 'place-c2-3', level: 'C2', prompt: 'which (referring to a whole clause)', promptLang: 'en', options: ['lo cual', 'cuyo', 'quien', 'donde'], answer: 'lo cual' },
  { id: 'place-c2-4', level: 'C2', prompt: 'It seems that the plan works', options: ['Parece ser que el plan funciona', 'Parece ser que el plan funcionó ayer solo', 'Sin lugar a dudas el plan nunca', 'Meter la pata el plan'], answer: 'Parece ser que el plan funciona' },
  { id: 'place-c2-5', level: 'C2', prompt: 'to qualify / nuance a claim', options: ['matizar', 'meter la pata', 'tomar el pelo', 'echar de menos'], answer: 'matizar' },
]

export const testOutItems: CheckItem[] = [
  { id: 'out-a1-1', level: 'A1', prompt: 'Monday', options: ['lunes', 'martes', 'domingo', 'viernes'], answer: 'lunes' },
  { id: 'out-a1-2', level: 'A1', prompt: 'I live', options: ['vivo', 'vive', 'viví', 'vivía'], answer: 'vivo' },
  { id: 'out-a1-3', level: 'A1', prompt: 'The hotel is here', options: ['El hotel está aquí', 'El hotel es aquí', 'El hotel fue aquí', 'El hotel sería aquí'], answer: 'El hotel está aquí' },
  { id: 'out-a1-4', level: 'A1', prompt: "It's one o'clock", options: ['Es la una', 'Son las una', 'Es las una', 'Fue la una'], answer: 'Es la una' },
  { id: 'out-a1-5', level: 'A1', prompt: 'kitchen', options: ['cocina', 'salón', 'jardín', 'abrigo'], answer: 'cocina' },
  { id: 'out-a1-6', level: 'A1', prompt: 'I am wearing a shirt', options: ['Llevo una camisa', 'Soy una camisa', 'Compré una camisa ayer', 'Llevaré una camisa'], answer: 'Llevo una camisa' },
  { id: 'out-a1-7', level: 'A1', prompt: '15', options: ['quince', 'once', 'treinta', 'cien'], answer: 'quince' },
  { id: 'out-a1-8', level: 'A1', prompt: 'My address is…', options: ['Mi dirección es…', 'Mi teléfono fue…', 'Había dirección…', 'Sería dirección…'], answer: 'Mi dirección es…' },
  { id: 'out-a2-1', level: 'A2', prompt: 'I went', options: ['Fui', 'Voy', 'Iba', 'Iré'], answer: 'Fui' },
  { id: 'out-a2-2', level: 'A2', prompt: 'I get up', options: ['Me levanto', 'Me levanté ayer solo', 'Levanto me', 'Me levantaba una vez'], answer: 'Me levanto' },
  { id: 'out-a2-3', level: 'A2', prompt: 'more than', options: ['más que', 'menos que', 'tan como', 'para que'], answer: 'más que' },
  { id: 'out-a2-4', level: 'A2', prompt: 'I used to have', options: ['tenía', 'tuve ayer', 'tengo mañana', 'tendré'], answer: 'tenía' },
  { id: 'out-a2-5', level: 'A2', prompt: 'Come! (tú)', options: ['Ven', 'Vienes', 'Vaya', 'Viene'], answer: 'Ven' },
  { id: 'out-a2-6', level: 'A2', prompt: 'You give me', options: ['Me das', 'Te doy', 'Le das', 'Das me'], answer: 'Me das' },
  { id: 'out-a2-7', level: 'A2', prompt: 'soccer / football', options: ['fútbol', 'tarea', 'oficina', 'recibo'], answer: 'fútbol' },
  { id: 'out-b1-1', level: 'B1', prompt: 'I have eaten', options: ['He comido', 'Comí siempre', 'Comía', 'Comeré ayer'], answer: 'He comido' },
  { id: 'out-b1-2', level: 'B1', prompt: 'for three hours', options: ['por tres horas', 'para tres horas', 'por ti', 'para el lunes una persona'], answer: 'por tres horas' },
  { id: 'out-b1-3', level: 'B1', prompt: 'I will have', options: ['tendré', 'tuve', 'tenía', 'tenga'], answer: 'tendré' },
  { id: 'out-b1-4', level: 'B1', prompt: 'I agree', options: ['Estoy de acuerdo', 'Soy de acuerdo', 'Dudo que acuerdo', 'Había acuerdo'], answer: 'Estoy de acuerdo' },
  { id: 'out-b1-5', level: 'B1', prompt: 'I recommend (to you)', options: ['te recomiendo', 'te perdí', 'te retraso', 'te tos'], answer: 'te recomiendo' },
  { id: 'out-b1-6', level: 'B1', prompt: 'that’s why', options: ['por eso', 'para eso siempre', 'por culpa ti', 'para el viernes una vez'], answer: 'por eso' },
  { id: 'out-b1-7', level: 'B1', prompt: 'luggage / baggage', options: ['equipaje', 'tos', 'beca', 'crítica'], answer: 'equipaje' },
  { id: 'out-b2-1', level: 'B2', prompt: 'I hope you are well', options: ['Espero que estés bien', 'Espero que estás bien', 'Sé que estés bien', 'Quiero que estás'], answer: 'Espero que estés bien' },
  { id: 'out-b2-2', level: 'B2', prompt: 'I had already left', options: ['Ya había salido', 'Ya he salido ahora mismo', 'Ya saldré', 'Ya salía cada día'], answer: 'Ya había salido' },
  { id: 'out-b2-3', level: 'B2', prompt: 'whose', options: ['cuyo', 'que', 'quien', 'sin embargo'], answer: 'cuyo' },
  { id: 'out-b2-4', level: 'B2', prompt: 'I know that it is true', options: ['Sé que es verdad', 'Sé que sea verdad', 'Dudo que es verdad', 'No creo que es verdad'], answer: 'Sé que es verdad' },
  { id: 'out-b2-5', level: 'B2', prompt: 'what / that which', options: ['lo que', 'cuyo', 'quien', 'hasta que'], answer: 'lo que' },
  { id: 'out-b2-6', level: 'B2', prompt: 'in other words', options: ['es decir', 'hasta que', 'cuyo', 'ojalá'], answer: 'es decir' },
  { id: 'out-b2-7', level: 'B2', prompt: 'as soon as', options: ['en cuanto', 'cuyo', 'sin embargo', 'aunque'], answer: 'en cuanto' },
  { id: 'out-c1-1', level: 'C1', prompt: 'unless', options: ['a menos que', 'sin embargo', 'por lo tanto', 'cuyo'], answer: 'a menos que' },
  { id: 'out-c1-2', level: 'C1', prompt: 'If I had time, I would travel', options: ['Si tuviera tiempo, viajaría', 'Si tengo tiempo, viajaría', 'Si habría tiempo, viajo', 'Si tuve, viajé'], answer: 'Si tuviera tiempo, viajaría' },
  { id: 'out-c1-3', level: 'C1', prompt: 'therefore', options: ['por lo tanto', 'sin embargo', 'aunque', 'a menos que'], answer: 'por lo tanto' },
  { id: 'out-c1-4', level: 'C1', prompt: 'A text to a friend: send me the file', options: ['¿Me mandas el archivo?', 'Le agradecería que me remitiera el archivo', '¿Podría usted enviármelo?', 'Les ruego me lo hagan llegar'], answer: '¿Me mandas el archivo?' },
  { id: 'out-c1-5', level: 'C1', prompt: 'no matter how much', options: ['por más que', 'por lo tanto', 'es decir', 'cuyo'], answer: 'por más que' },
  { id: 'out-c1-6', level: 'C1', prompt: 'consequently', options: ['por consiguiente', 'por más que', 'cuyo', 'ojalá'], answer: 'por consiguiente' },
  { id: 'out-c1-7', level: 'C1', prompt: 'I wanted you to come', options: ['Quería que vinieras', 'Quería que vienes', 'Quiero que vinieras ayer solo', 'Sé que vinieras'], answer: 'Quería que vinieras' },
  { id: 'out-c2-1', level: 'C2', prompt: 'cohesion', options: ['cohesión', 'errata', 'falacia', 'acta'], answer: 'cohesión' },
  { id: 'out-c2-2', level: 'C2', prompt: 'to a certain extent', options: ['en cierta medida', 'sin lugar a dudas', 'de golpe', 'en absoluto'], answer: 'en cierta medida' },
  { id: 'out-c2-3', level: 'C2', prompt: 'abstract / summary (academic)', options: ['resumen', 'errata', 'falacia', 'nubes'], answer: 'resumen' },
  { id: 'out-c2-4', level: 'C2', prompt: 'passive voice', options: ['voz pasiva', 'tomar el pelo', 'de golpe', 'meter la pata'], answer: 'voz pasiva' },
  { id: 'out-c2-5', level: 'C2', prompt: 'without a doubt', options: ['sin lugar a dudas', 'en absoluto', 'a regañadientes', 'de golpe'], answer: 'sin lugar a dudas' },
  { id: 'out-c2-6', level: 'C2', prompt: 'bias', options: ['sesgo', 'errata', 'acta', 'anexo'], answer: 'sesgo' },
  { id: 'out-c2-7', level: 'C2', prompt: 'will have done (fut. perfecto)', options: ['habrá hecho', 'hizo ayer solo', 'hace siempre', 'haga nunca'], answer: 'habrá hecho' },
]

export function correctCount(items: readonly CheckItem[], answers: Record<string, string>): number {
  return items.filter((item) => answers[item.id] === item.answer).length
}

/** At least two thirds right. Three items need two; four items need three. */
export function quizCleared(items: readonly CheckItem[], answers: Record<string, string>): boolean {
  if (items.length === 0) return false
  return correctCount(items, answers) * 3 >= items.length * 2
}

export function itemsForLevel(items: readonly CheckItem[], level: CefrLevel): CheckItem[] {
  return items.filter((item) => item.level === level)
}

export function levelCleared(level: CefrLevel, answers: Record<string, string>, items: readonly CheckItem[] = placementItems): boolean {
  return quizCleared(itemsForLevel(items, level), answers)
}

/** First level the learner has not cleared. Passing C2 still starts at C2. */
export function startingLevel(answers: Record<string, string>, items: readonly CheckItem[] = placementItems): CefrLevel {
  for (const level of CEFR_LEVELS) {
    if (!levelCleared(level, answers, items)) return level
  }
  return 'C2'
}

export function levelsBefore(level: CefrLevel): CefrLevel[] {
  const index = CEFR_LEVELS.indexOf(level)
  return CEFR_LEVELS.slice(0, Math.max(0, index))
}
