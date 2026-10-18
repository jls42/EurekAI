import { Mistral } from '@mistralai/mistralai';
import {
  getContent,
  retryTurns,
  safeParseJson,
  tryParseJson,
  unwrapJsonArray,
} from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import { acceptedForms, answerLeaks, splitAlternatives } from '../helpers/fill-blank-validate.js';
import { logger } from '../helpers/logger.js';
import { fillBlankSystem, fillBlankUser, fillBlankRetryUser } from '../prompts.js';
import type { FillBlankItem, AgeGroup } from '../types.js';

function isValidFillBlank(data: FillBlankItem[]): boolean {
  return (
    data.length > 0 &&
    data.every(
      (item) =>
        typeof item.sentence === 'string' &&
        item.sentence.includes('___') &&
        typeof item.answer === 'string' &&
        item.answer.length > 0 &&
        typeof item.hint === 'string',
    )
  );
}

const FILL_BLANK = 'fill-blank';

// Une seule écriture dans answer, les autres dans accepted : « XVe (quinzième) » devient « XVe » +
// « quinzième » (la vue affiche answer comme la bonne réponse).
const withSingleAnswer = (item: FillBlankItem): FillBlankItem => {
  const [answer = item.answer.trim(), ...alternatives] = splitAlternatives(item.answer);
  const forms = [...alternatives, ...acceptedForms(item.accepted)].map((form) => form.trim());
  const accepted = [...new Set(forms)].filter((form) => form !== answer);
  return { ...item, answer, accepted };
};

// Exercice qui donne sa réponse dans la phrase ou l'indice : il ne vérifie plus rien (8 sur 60 avec
// Large 4, mesure du 2026-10-09) → écarté.
const usableExercises = (data: FillBlankItem[]): FillBlankItem[] => {
  const items = data.map(withSingleAnswer);
  const kept = items.filter((item) => !answerLeaks(item));
  if (kept.length < items.length) {
    logger.warn(
      FILL_BLANK,
      `${items.length - kept.length} exercise(s) dropped: answer in sentence or hint`,
    );
  }
  return kept;
};

// Nombre d'exercices quand l'appelant n'en demande pas (repris par la route pour en ajouter).
export const FILL_BLANK_DEFAULT_COUNT = 10;

export async function generateFillBlank(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count = FILL_BLANK_DEFAULT_COUNT,
  exclusions?: string,
): Promise<FillBlankItem[]> {
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: fillBlankSystem(ageGroup) },
    { role: 'user', content: fillBlankUser(markdown, count, lang, exclusions) },
  ];

  const response = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams(FILL_BLANK),
  });

  // JSON invalide au 1er essai (réponse tronquée) → [] → retry, comme une validation ratée.
  const raw = getContent(response);
  const data: FillBlankItem[] = unwrapJsonArray(tryParseJson(raw));
  const usable = isValidFillBlank(data) ? usableExercises(data) : [];

  if (usable.length > 0) return usable;

  console.warn('Fill-blank validation failed, retrying. Got:', JSON.stringify(data).slice(0, 200));
  messages.push(...retryTurns(raw, fillBlankRetryUser(count, lang)));

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams(FILL_BLANK),
  });
  const retryData: FillBlankItem[] = unwrapJsonArray(safeParseJson(getContent(retry)));
  const retryUsable = isValidFillBlank(retryData) ? usableExercises(retryData) : [];

  if (retryUsable.length === 0) {
    // SyntaxError → llm_invalid_json (extractErrorCode), pas internal_error.
    throw new SyntaxError(
      "Le modele n'a pas reussi a generer des exercices a trous valides apres 2 tentatives",
    );
  }
  return retryUsable;
}
