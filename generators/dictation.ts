/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- Codacy lance ESLint sans résoudre les types du SDK Mistral ni des helpers cross-module ; lint:ci local reste type-aware. */
import { Mistral } from '@mistralai/mistralai';
import { randomInt } from 'node:crypto';
import { getContent, safeParseJson, unwrapJsonArray } from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import { maskWordInSentence } from '../helpers/dictation-diff.js';
import { dictationSystem, dictationUser, dictationRetryUser } from '../prompts.js';
import type { DictationItem, AgeGroup } from '../types.js';

// Cap serveur DUR : chaque item coûte un appel TTS (borne coût + latence,
// la boucle audio est séquentielle comme quiz-vocal). Défaut volontairement bas.
// Le cap effectif d'une génération est min(count demandé, DICTATION_MAX_WORDS).
export const DICTATION_MAX_WORDS = 20;
export const DICTATION_DEFAULT_WORDS = 10;

// Type guard : le JSON du LLM peut contenir null/nombres/objets incomplets.
// Invariant métier : l'affichage à trou doit fonctionner — même helper (donc même
// sémantique sous-chaîne normalisée) que le masquage frontend, pas un check lexical.
const isValidDictationItem = (item: unknown): item is DictationItem => {
  if (typeof item !== 'object' || item === null) return false;
  const it = item as Partial<DictationItem>;
  return (
    typeof it.word === 'string' &&
    it.word.length > 0 &&
    typeof it.sentence === 'string' &&
    typeof it.rule === 'string' &&
    maskWordInSentence(it.sentence, it.word) !== null
  );
};

const filterValidItems = (data: DictationItem[]): DictationItem[] => {
  const valid = data.filter(isValidDictationItem);
  const discarded = data.length - valid.length;
  if (discarded > 0) {
    console.warn(`Dictation: ${discarded} item(s) invalide(s) ecarte(s) sur ${data.length}`);
  }
  return valid;
};

// Mélange uniforme (tirage sans remise) — mécanisme de PRESENTATION uniquement :
// l'ordre ne porte aucune sémantique (correction par item). splice/push plutôt
// qu'échange indexé arr[i] (FP « object injection » du plugin security Codacy).
export const shuffleItems = <T>(
  input: readonly T[],
  rng: (max: number) => number = randomInt,
): T[] => {
  const pool = [...input];
  const out: T[] = [];
  while (pool.length > 0) out.push(...pool.splice(rng(pool.length), 1));
  return out;
};

export async function generateDictation(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count = DICTATION_DEFAULT_WORDS,
  exclusions = '',
): Promise<DictationItem[]> {
  const capped = Math.min(count, DICTATION_MAX_WORDS);
  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: dictationSystem(ageGroup) },
    { role: 'user', content: dictationUser(markdown, lang, capped, exclusions) },
  ];

  const response = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('dictation'),
  });

  const raw = getContent(response);
  const data = unwrapJsonArray<DictationItem>(safeParseJson(raw));
  const valid = filterValidItems(data);

  // Mélange puis slice(capped) : sous-échantillon aléatoire si le LLM déborde le
  // "au maximum N" du prompt (variété du set en prime, coût TTS borné au demandé).
  if (valid.length > 0) return shuffleItems(valid).slice(0, capped);

  console.warn('Dictation validation failed, retrying. Got:', JSON.stringify(data).slice(0, 200));
  messages.push(
    { role: 'assistant', content: raw },
    { role: 'user', content: dictationRetryUser() },
  );

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('dictation'),
  });
  const retryValid = filterValidItems(
    unwrapJsonArray<DictationItem>(safeParseJson(getContent(retry))),
  );

  if (retryValid.length === 0) {
    throw new Error("Le modele n'a pas reussi a generer un entrainement valide apres 2 tentatives");
  }
  return shuffleItems(retryValid).slice(0, capped);
}
