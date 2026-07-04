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
    const line = `\n- ${item}`;
    if (result.length + line.length > maxChars) break;
    result += line;
  }
  return result;
}
