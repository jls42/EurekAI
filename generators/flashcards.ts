import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson, unwrapJsonArray } from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import { flashcardsSystem, flashcardsUser } from '../prompts.js';
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

  const raw = getContent(response);
  const data = unwrapJsonArray<Flashcard>(safeParseJson(raw));

  if (isValidFlashcards(data)) return data;

  console.warn('Flashcards validation failed, retrying. Got:', JSON.stringify(data).slice(0, 200));
  messages.push(
    { role: 'assistant', content: raw },
    {
      role: 'user',
      content: `Ta reponse etait vide ou incomplete. Regenere les ${effectiveCount} flashcards avec question et answer. Reponds en JSON valide.`,
    },
  );

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('flashcards'),
  });
  const retryRaw = getContent(retry);
  const retryData = unwrapJsonArray<Flashcard>(safeParseJson(retryRaw));

  if (!isValidFlashcards(retryData)) {
    throw new Error("Le modele n'a pas reussi a generer des flashcards valides apres 2 tentatives");
  }
  return retryData;
}
