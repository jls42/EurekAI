import type { Generation } from '../types.js';

const PARAMS: Record<string, { temperature: number; presencePenalty: number }> = {
  quiz: { temperature: 0.9, presencePenalty: 0.3 },
  'quiz-vocal': { temperature: 0.9, presencePenalty: 0.3 },
  flashcards: { temperature: 0.9, presencePenalty: 0.3 },
  'fill-blank': { temperature: 0.9, presencePenalty: 0.3 },
  podcast: { temperature: 1, presencePenalty: 0.2 },
  summary: { temperature: 0.4, presencePenalty: 0 },
};

export function diversityParams(type: string) {
  const p = PARAMS[type] || { temperature: 0.7, presencePenalty: 0 };
  return { temperature: p.temperature, presencePenalty: p.presencePenalty, randomSeed: Math.floor(Math.random() * 1_000_000) }; // NOSONAR(S2245) — seed for AI prompt diversity, not security
}

function extractQuizQuestions(gens: Generation[]): string[] {
  return gens.flatMap((g) => {
    const questions = (g.data as any)?.quiz || (Array.isArray(g.data) ? g.data : []);
    return questions.map((q: any) => q.question).filter(Boolean);
  });
}

function extractFlashcardQuestions(gens: Generation[]): string[] {
  return gens.flatMap((g) => {
    const cards = (g.data as any)?.flashcards || (Array.isArray(g.data) ? g.data : []);
    return cards.map((f: any) => f.question).filter(Boolean);
  });
}

function extractFillBlankAnswers(gens: Generation[]): string[] {
  return gens.flatMap((g) => {
    const items = Array.isArray(g.data) ? g.data : [];
    return items.map((item: any) => item.answer).filter(Boolean);
  });
}

function extractPodcastTopics(gens: Generation[]): string[] {
  return gens.map((g) => {
    const script = (g.data as any)?.script;
    if (!Array.isArray(script)) return '';
    const firstHost = script.find((l: any) => l.speaker === 'host');
    return firstHost?.text?.slice(0, 100) || '';
  }).filter(Boolean);
}

function extractSummaryKeyPoints(gens: Generation[]): string[] {
  return gens.flatMap((g) => {
    const data = g.data as any;
    return (data?.key_points || []).slice(0, 5);
  });
}

const EXTRACTORS: Record<string, (gens: Generation[]) => string[]> = {
  quiz: extractQuizQuestions,
  'quiz-vocal': extractQuizQuestions,
  flashcards: extractFlashcardQuestions,
  'fill-blank': extractFillBlankAnswers,
  podcast: extractPodcastTopics,
  summary: extractSummaryKeyPoints,
};

const HEADERS: Record<string, string> = {
  quiz: 'QUESTIONS DEJA GENEREES (NE PAS REPETER) :',
  'quiz-vocal': 'QUESTIONS DEJA GENEREES (NE PAS REPETER) :',
  flashcards: 'FLASHCARDS DEJA GENEREES (NE PAS REPETER) :',
  'fill-blank': 'MOTS/CONCEPTS DEJA UTILISES (NE PAS REPETER) :',
  podcast: 'PODCASTS DEJA GENERES (CHOISIS UN ANGLE DIFFERENT) :',
  summary: 'POINTS DEJA COUVERTS (UTILISE DES EXEMPLES ET FORMULATIONS DIFFERENTS) :',
};

export function buildExclusionContext(generations: Generation[], type: string, maxChars = 2000): string {
  const matching = generations.filter((g) => g.type === type);
  if (matching.length === 0) return '';

  const extractor = EXTRACTORS[type];
  if (!extractor) return '';

  const items = extractor(matching);
  if (items.length === 0) return '';

  const header = HEADERS[type] || 'CONTENU DEJA GENERE (NE PAS REPETER) :';
  let result = header;
  for (const item of items) {
    const line = `\n- ${item}`;
    if (result.length + line.length > maxChars) break;
    result += line;
  }
  return result;
}
