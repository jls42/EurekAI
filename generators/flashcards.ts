import { Mistral } from '@mistralai/mistralai';
import {
  getContent,
  retryTurns,
  safeParseJson,
  tryParseJson,
  unwrapJsonArray,
} from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import { flashcardsSystem, flashcardsUser, flashcardsRetryUser } from '../prompts.js';
import type { Flashcard, AgeGroup } from '../types.js';

function isValidFlashcards(data: Flashcard[]): boolean {
  return (
    data.length > 0 &&
    data.every(
      (f) =>
        typeof f.question === 'string' &&
        f.question.length > 0 &&
        typeof f.answer === 'string' &&
        f.answer.length > 0,
    )
  );
}

export async function generateFlashcards(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count?: number,
  exclusions?: string,
): Promise<Flashcard[]> {
  const effectiveCount = count ?? 5;
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: flashcardsSystem(ageGroup, effectiveCount) },
    { role: 'user', content: flashcardsUser(markdown, effectiveCount, lang, exclusions) },
  ];

  const response = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('flashcards'),
  });

  // JSON invalide au 1er essai (réponse tronquée) → [] → retry, comme une validation ratée.
  // Annotation plutôt que `unwrapJsonArray<Flashcard>(…)` : Lizard coupait la fonction à cet appel.
  const raw = getContent(response);
  const data: Flashcard[] = unwrapJsonArray(tryParseJson(raw));

  if (isValidFlashcards(data)) return data;

  console.warn('Flashcards validation failed, retrying. Got:', JSON.stringify(data).slice(0, 200));
  messages.push(...retryTurns(raw, flashcardsRetryUser(effectiveCount, lang)));

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('flashcards'),
  });
  const retryData: Flashcard[] = unwrapJsonArray(safeParseJson(getContent(retry)));

  if (!isValidFlashcards(retryData)) {
    // SyntaxError → llm_invalid_json (extractErrorCode), pas internal_error.
    throw new SyntaxError(
      "Le modele n'a pas reussi a generer des flashcards valides apres 2 tentatives",
    );
  }
  return retryData;
}
