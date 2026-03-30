import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson, unwrapJsonArray } from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import { fillBlankSystem, fillBlankUser } from '../prompts.js';
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

export async function generateFillBlank(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count = 10,
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
    ...diversityParams('fill-blank'),
  });

  const raw = getContent(response);
  const data = unwrapJsonArray<FillBlankItem>(safeParseJson(raw));

  if (isValidFillBlank(data)) return data;

  console.warn('Fill-blank validation failed, retrying. Got:', JSON.stringify(data).slice(0, 200));
  messages.push(
    { role: 'assistant', content: raw },
    {
      role: 'user',
      content:
        'Ta reponse etait vide ou incomplete. Regenere les exercices a trous. Chaque exercice doit avoir sentence (avec ___), answer, hint et category. JSON valide uniquement.',
    },
  );

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('fill-blank'),
  });
  const retryData = unwrapJsonArray<FillBlankItem>(
    safeParseJson(getContent(retry)),
  );

  if (!isValidFillBlank(retryData)) {
    throw new Error(
      "Le modele n'a pas reussi a generer des exercices a trous valides apres 2 tentatives",
    );
  }
  return retryData;
}
