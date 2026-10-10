import { randomInt } from 'node:crypto';
import { exclusionHeader } from '../prompts.js';
import type { Generation } from '../types.js';

const PARAMS: Record<string, { temperature: number; presencePenalty: number }> = {
  quiz: { temperature: 0.9, presencePenalty: 0.3 },
  'quiz-vocal': { temperature: 0.9, presencePenalty: 0.3 },
  flashcards: { temperature: 0.9, presencePenalty: 0.3 },
  'fill-blank': { temperature: 0.9, presencePenalty: 0.3 },
  podcast: { temperature: 1, presencePenalty: 0.2 },
  summary: { temperature: 0.4, presencePenalty: 0 },
  // dictation : presencePenalty 0 volontaire — `sentence` doit re-contenir `word`
  // EXACTEMENT (affichage à trou) ; une penalty décourage cette ré-émission.
  dictation: { temperature: 0.9, presencePenalty: 0 },
};

export function diversityParams(type: string) {
  const p = PARAMS[type] || { temperature: 0.7, presencePenalty: 0 };
  return {
    temperature: p.temperature,
    presencePenalty: p.presencePenalty,
    randomSeed: randomInt(0, 1_000_000),
  };
}

// Shapes minimales lues par les extracteurs. `g.data` est typé par la Generation
// discriminée, mais accepte aussi des formats legacy ({quiz: [...]} / {flashcards:[...]})
// — ces shapes minimales les couvrent sans `any`.
interface QuestionItem {
  question?: unknown;
}
interface AnswerItem {
  answer?: unknown;
}
interface WordItem {
  word?: unknown;
}
interface PodcastLine {
  speaker?: unknown;
  text?: unknown;
}
interface LegacyQuizShape {
  quiz?: QuestionItem[];
}
interface LegacyFlashShape {
  flashcards?: QuestionItem[];
}
interface PodcastShape {
  script?: PodcastLine[];
}
interface SummaryShape {
  key_points?: string[];
}

function extractQuizQuestions(gens: Generation[]): string[] {
  return gens.flatMap((g) => {
    const legacy = (g.data as LegacyQuizShape).quiz;
    const items: QuestionItem[] =
      legacy ?? (Array.isArray(g.data) ? (g.data as QuestionItem[]) : []);
    return items.map((q) => q.question).filter((q): q is string => Boolean(q));
  });
}

function extractFlashcardQuestions(gens: Generation[]): string[] {
  return gens.flatMap((g) => {
    const legacy = (g.data as LegacyFlashShape).flashcards;
    const cards: QuestionItem[] =
      legacy ?? (Array.isArray(g.data) ? (g.data as QuestionItem[]) : []);
    return cards.map((f) => f.question).filter((q): q is string => Boolean(q));
  });
}

function extractFillBlankAnswers(gens: Generation[]): string[] {
  return gens.flatMap((g) => {
    const items: AnswerItem[] = Array.isArray(g.data) ? (g.data as AnswerItem[]) : [];
    return items.map((item) => item.answer).filter((a): a is string => Boolean(a));
  });
}

function extractDictationWords(gens: Generation[]): string[] {
  return gens.flatMap((g) => {
    const items: WordItem[] = Array.isArray(g.data) ? (g.data as WordItem[]) : [];
    return items.map((item) => item.word).filter((w): w is string => Boolean(w));
  });
}

function extractPodcastTopics(gens: Generation[]): string[] {
  return gens
    .map((g) => {
      const script = (g.data as PodcastShape).script;
      if (!Array.isArray(script)) return '';
      const firstHost = script.find((l) => l.speaker === 'host');
      const text = firstHost?.text;
      return typeof text === 'string' ? text.slice(0, 100) : '';
    })
    .filter(Boolean);
}

function extractSummaryKeyPoints(gens: Generation[]): string[] {
  return gens.flatMap((g) => {
    const data = g.data as SummaryShape;
    return (data.key_points ?? []).slice(0, 5);
  });
}

const EXTRACTORS: Record<string, (gens: Generation[]) => string[]> = {
  quiz: extractQuizQuestions,
  'quiz-vocal': extractQuizQuestions,
  flashcards: extractFlashcardQuestions,
  'fill-blank': extractFillBlankAnswers,
  dictation: extractDictationWords,
  podcast: extractPodcastTopics,
  summary: extractSummaryKeyPoints,
};

const EXCLUSION_ITEM_PREFIX = '- ';

export function buildExclusionContext(
  generations: Generation[],
  type: string,
  maxChars = 2000,
): string {
  const matching = generations.filter((g) => g.type === type);
  if (matching.length === 0) return '';

  const extractor = EXTRACTORS[type];
  if (!extractor) return '';

  const items = extractor(matching);
  if (items.length === 0) return '';

  // Texte centralisé dans prompts.ts (règle positive scoped au choix du contenu).
  const header = exclusionHeader(type);
  let result = header;
  for (const item of items) {
    const line = `\n${EXCLUSION_ITEM_PREFIX}${item}`;
    if (result.length + line.length > maxChars) break;
    result += line;
  }
  return result;
}

// Inverse de buildExclusionContext : ses items, sans l'en-tête (le podcast y lit les premières
// répliques déjà générées pour tirer une accroche qui ouvre autrement, cf. pickPodcastHook).
export function exclusionItems(context: string): string[] {
  return context
    .split('\n')
    .filter((line) => line.startsWith(EXCLUSION_ITEM_PREFIX))
    .map((line) => line.slice(EXCLUSION_ITEM_PREFIX.length));
}

// Types dont le prompt reçoit un bloc d'exclusions. Deux générations simultanées d'un de ces types
// sur un même projet ne s'y voyaient pas : elles passent l'une après l'autre (withSameTypeQueue,
// routes/generate.ts). `Object.hasOwn` : un type hostile comme `constructor` n'est pas un extracteur.
export const hasExclusionContext = (type: string): boolean => Object.hasOwn(EXTRACTORS, type);

// Éléments déjà générés pour ce type (questions, réponses, mots…), ceux que reprend le bloc.
export function previousItems(generations: Generation[], type: string): string[] {
  if (!hasExclusionContext(type)) return [];
  return EXTRACTORS[type](generations.filter((g) => g.type === type));
}

// Article de tête d'une réponse de texte à trous (le prompt l'inclut dans la réponse). \x27 et
// \x60 plutôt que l'apostrophe et l'accent grave dans les regex : Lizard ne voyait plus answerKey.
const LEADING_ARTICLE = /^(?:(?:de )?[dl]\x27\s*|(?:les|le|la|une|un|des|du|de la)\s+)/;

// Clé de comparaison d'une réponse : sans casse, accents, apostrophe typographique ni article de
// tête (« l’Histoire », « l'histoire » et « histoire » ; « un volcan » et « volcan »).
export const answerKey = (answer: string): string => {
  const plain = answer
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[’\x60]/g, "'")
    .replace(/[^a-z0-9\x27 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.replace(LEADING_ARTICLE, '');
};

// Textes à trous dont la réponse n'a pas encore servi d'abord, les autres ensuite : chaque groupe
// garde l'ordre du modèle (du plus simple au plus difficile).
export const preferUnusedAnswers = <T extends { answer?: unknown }>(
  items: T[],
  usedKeys: ReadonlySet<string>,
): T[] => {
  const isUsed = (item: T): boolean =>
    typeof item.answer === 'string' && usedKeys.has(answerKey(item.answer));
  return [...items.filter((item) => !isUsed(item)), ...items.filter(isUsed)];
};

// Mots d'une question (3 lettres et plus, sans casse ni accents), pour la comparer aux précédentes.
const questionWords = (text: string): Set<string> => {
  const plain = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  return new Set(plain.split(' ').filter((word) => word.length > 2));
};

// Même question : au moins 60 % de mots en commun (indice de Jaccard), seuil de la mesure.
const SAME_QUESTION_JACCARD = 0.6;

const jaccard = (a: ReadonlySet<string>, b: ReadonlySet<string>): number => {
  const common = [...a].filter((word) => b.has(word)).length;
  return common / Math.max(1, a.size + b.size - common);
};

// Questions de quiz encore jamais posées d'abord, les autres ensuite (ordre du modèle conservé).
export const preferUnseenQuestions = <T extends { question?: unknown }>(
  items: T[],
  previous: readonly string[],
): T[] => {
  const previousWords = previous.map(questionWords);
  const isSeen = (item: T): boolean => {
    if (typeof item.question !== 'string') return false;
    const words = questionWords(item.question);
    return previousWords.some((p) => jaccard(words, p) >= SAME_QUESTION_JACCARD);
  };
  return [...items.filter((item) => !isSeen(item)), ...items.filter(isSeen)];
};
