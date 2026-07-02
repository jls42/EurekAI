/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- Codacy lance ESLint sans résoudre les types du SDK Mistral ni des helpers cross-module ; lint:ci local reste type-aware. */
import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson, unwrapJsonArray } from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import { dictationSystem, dictationUser } from '../prompts.js';
import type { DictationItem, AgeGroup } from '../types.js';

// Cap serveur DUR : chaque item coûte un appel TTS (borne coût + latence,
// la boucle audio est séquentielle comme quiz-vocal). Défaut volontairement bas.
export const DICTATION_MAX_WORDS = 20;
export const DICTATION_DEFAULT_WORDS = 10;

const isValidDictation = (data: DictationItem[]): boolean =>
  data.length > 0 &&
  data.every(
    (item) =>
      typeof item.word === 'string' &&
      item.word.length > 0 &&
      typeof item.sentence === 'string' &&
      typeof item.rule === 'string',
  );

export async function generateDictation(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count = DICTATION_DEFAULT_WORDS,
): Promise<DictationItem[]> {
  const capped = Math.min(count, DICTATION_MAX_WORDS);
  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: dictationSystem(ageGroup) },
    { role: 'user', content: dictationUser(markdown, lang, capped) },
  ];

  const response = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('dictation'),
  });

  const raw = getContent(response);
  const data = unwrapJsonArray<DictationItem>(safeParseJson(raw));

  // slice défensif : le LLM peut déborder le "au maximum N" du prompt.
  if (isValidDictation(data)) return data.slice(0, DICTATION_MAX_WORDS);

  console.warn('Dictation validation failed, retrying. Got:', JSON.stringify(data).slice(0, 200));
  messages.push(
    { role: 'assistant', content: raw },
    {
      role: 'user',
      content:
        'Ta reponse etait vide ou incomplete. Regenere les items. Chaque item doit avoir word, sentence (contenant le mot) et rule. JSON valide uniquement.',
    },
  );

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('dictation'),
  });
  const retryData = unwrapJsonArray<DictationItem>(safeParseJson(getContent(retry)));

  if (!isValidDictation(retryData)) {
    throw new Error("Le modele n'a pas reussi a generer un entrainement valide apres 2 tentatives");
  }
  return retryData.slice(0, DICTATION_MAX_WORDS);
}
