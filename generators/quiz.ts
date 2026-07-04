import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson, unwrapJsonArray } from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import {
  quizSystem,
  quizUser,
  quizReviewSystem,
  quizReviewUser,
  quizVocalSystem,
  quizVocalUser,
  quizRetryUser,
} from '../prompts.js';
import type { QuizQuestion, AgeGroup } from '../types.js';

const MISTRAL_LARGE_LATEST = 'mistral-large-latest';

// Type guard : le JSON du LLM peut contenir null/objets incomplets (notamment un
// item de queue cassé récupéré par le salvage de safeParseJson).
const isValidQuizItem = (q: unknown): q is QuizQuestion => {
  if (typeof q !== 'object' || q === null) return false;
  const it = q as Partial<QuizQuestion>;
  return (
    typeof it.question === 'string' &&
    it.question.length > 0 &&
    Array.isArray(it.choices) &&
    it.choices.length > 1 &&
    typeof it.correct === 'number'
  );
};

// Filtre par item (miroir generators/dictation.ts) : un item de queue malformé ne
// doit pas invalider tout un batch de questions correctes. Retry si zéro valide.
const filterValidQuestions = (data: QuizQuestion[]): QuizQuestion[] => {
  const valid = data.filter(isValidQuizItem);
  const discarded = data.length - valid.length;
  if (discarded > 0) {
    console.warn(`Quiz: ${discarded} item(s) invalide(s) ecarte(s) sur ${data.length}`);
  }
  return valid;
};

async function generateQuizWithRetry(
  client: Mistral,
  systemPrompt: string,
  userPrompt: string,
  retryMsg: string,
  errorMsg: string,
  model: string,
  type = 'quiz',
): Promise<QuizQuestion[]> {
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];

  const response = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams(type),
  });

  const raw = getContent(response);
  const data = unwrapJsonArray<QuizQuestion>(safeParseJson(raw));
  const valid = filterValidQuestions(data);

  if (valid.length > 0) return valid;

  console.warn('Quiz validation failed, retrying. Got:', JSON.stringify(data).slice(0, 200));
  messages.push({ role: 'assistant', content: raw }, { role: 'user', content: retryMsg });

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams(type),
  });
  const retryValid = filterValidQuestions(
    unwrapJsonArray<QuizQuestion>(safeParseJson(getContent(retry))),
  );

  if (retryValid.length === 0) {
    throw new Error(errorMsg);
  }
  return retryValid;
}

export async function generateQuiz(
  client: Mistral,
  markdown: string,
  model = MISTRAL_LARGE_LATEST,
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count?: number,
  exclusions?: string,
): Promise<QuizQuestion[]> {
  const effectiveCount = count ?? 15;
  return generateQuizWithRetry(
    client,
    quizSystem(ageGroup),
    quizUser(markdown, effectiveCount, lang, exclusions),
    quizRetryUser({ kind: 'quiz', count: effectiveCount, lang }),
    "Le modele n'a pas reussi a generer un quiz valide apres 2 tentatives",
    model,
  );
}

export async function generateQuizVocal(
  client: Mistral,
  markdown: string,
  model = MISTRAL_LARGE_LATEST,
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count?: number,
  exclusions?: string,
): Promise<QuizQuestion[]> {
  const effectiveCount = count ?? 15;
  return generateQuizWithRetry(
    client,
    quizVocalSystem(ageGroup, lang),
    quizVocalUser(markdown, effectiveCount, lang, exclusions),
    quizRetryUser({ kind: 'quiz-vocal', count: effectiveCount, lang }),
    "Le modele n'a pas reussi a generer un quiz vocal valide apres 2 tentatives",
    model,
    'quiz-vocal',
  );
}

export async function generateQuizReview(
  client: Mistral,
  markdown: string,
  weakQuestions: QuizQuestion[],
  model = MISTRAL_LARGE_LATEST,
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
): Promise<QuizQuestion[]> {
  const weakConcepts = weakQuestions.map((q) => q.question).join('\n- ');
  return generateQuizWithRetry(
    client,
    quizReviewSystem(ageGroup),
    quizReviewUser(weakConcepts, markdown, lang),
    quizRetryUser({ kind: 'quiz-review', lang }),
    "Le modele n'a pas reussi a generer la revision quiz apres 2 tentatives",
    model,
  );
}
