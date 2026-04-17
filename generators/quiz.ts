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
} from '../prompts.js';
import type { QuizQuestion, AgeGroup } from '../types.js';

function isValidQuiz(data: QuizQuestion[]): boolean {
  return (
    data.length > 0 &&
    data.every(
      (q) =>
        typeof q.question === 'string' &&
        q.question.length > 0 &&
        Array.isArray(q.choices) &&
        q.choices.length > 1 &&
        typeof q.correct === 'number',
    )
  );
}

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

  if (isValidQuiz(data)) return data;

  console.warn('Quiz validation failed, retrying. Got:', JSON.stringify(data).slice(0, 200));
  messages.push({ role: 'assistant', content: raw }, { role: 'user', content: retryMsg });

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams(type),
  });
  const retryData = unwrapJsonArray<QuizQuestion>(safeParseJson(getContent(retry)));

  if (!isValidQuiz(retryData)) {
    throw new Error(errorMsg);
  }
  return retryData;
}

export async function generateQuiz(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count?: number,
  exclusions?: string,
): Promise<QuizQuestion[]> {
  return generateQuizWithRetry(
    client,
    quizSystem(ageGroup),
    quizUser(markdown, count, lang, exclusions),
    'Ta reponse etait vide ou incomplete. Regenere les questions QCM avec question, choices (4), correct, explanation. JSON valide uniquement.',
    "Le modele n'a pas reussi a generer un quiz valide apres 2 tentatives",
    model,
  );
}

export async function generateQuizVocal(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count?: number,
  exclusions?: string,
): Promise<QuizQuestion[]> {
  return generateQuizWithRetry(
    client,
    quizVocalSystem(ageGroup, lang),
    quizVocalUser(markdown, count, lang, exclusions),
    'Ta reponse etait vide ou incomplete. Regenere les questions QCM orales. JSON valide uniquement. Rappel: langage oral, pas de chiffres romains ni abreviations.',
    "Le modele n'a pas reussi a generer un quiz vocal valide apres 2 tentatives",
    model,
    'quiz-vocal',
  );
}

export async function generateQuizReview(
  client: Mistral,
  markdown: string,
  weakQuestions: QuizQuestion[],
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
): Promise<QuizQuestion[]> {
  const weakConcepts = weakQuestions.map((q) => q.question).join('\n- ');
  return generateQuizWithRetry(
    client,
    quizReviewSystem(ageGroup),
    quizReviewUser(weakConcepts, markdown, lang),
    'Ta reponse etait vide ou incomplete. Regenere les NOUVELLES questions QCM. JSON valide uniquement.',
    "Le modele n'a pas reussi a generer la revision quiz apres 2 tentatives",
    model,
  );
}
