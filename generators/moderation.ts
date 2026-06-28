import { Mistral } from '@mistralai/mistralai';
import type { ModerationResult } from '../types.js';

export const MODERATION_CHUNK_SIZE = 20_000;

function isUnsafe(categories: Record<string, boolean>, blockedCategories?: string[]): boolean {
  if (blockedCategories) {
    return blockedCategories.some((cat) => categories[cat] === true);
  }
  return Object.values(categories).includes(true);
}

function mergeCategories(
  acc: Record<string, boolean>,
  next: Record<string, boolean>,
): Record<string, boolean> {
  const merged = { ...acc };
  for (const [category, flagged] of Object.entries(next)) {
    if (flagged) merged[category] = true;
    else if (!(category in merged)) merged[category] = false;
  }
  return merged;
}

function chunkText(text: string): string[] {
  if (text.length <= MODERATION_CHUNK_SIZE) return [text];

  const chunks: string[] = [];
  for (let index = 0; index < text.length; index += MODERATION_CHUNK_SIZE) {
    chunks.push(text.slice(index, index + MODERATION_CHUNK_SIZE));
  }
  return chunks;
}

export const moderateContent = async (
  client: Mistral,
  text: string,
  blockedCategories?: string[],
): Promise<ModerationResult> => {
  const chunks = chunkText(text);
  let categories: Record<string, boolean> = {};

  for (const chunk of chunks) {
    const response = await client.classifiers.moderate({
      // Pinné explicitement (PAS `-latest`) : `mistral-moderation-latest` pointe encore sur
      // `mistral-moderation-2411`, déprécié/retiré ~2026-06-30 (docs Mistral overview), et Mistral
      // n'a PAS repointé l'alias. `mistral-moderation-2603` = "Mistral Moderation 2", remplaçant
      // courant (dep=None). Sécurité enfant : la modération ne doit pas casser silencieusement.
      model: 'mistral-moderation-2603',
      inputs: [chunk],
    });

    const result = response.results[0];
    const chunkCategories = result.categories as Record<string, boolean>;
    categories = mergeCategories(categories, chunkCategories);

    if (isUnsafe(chunkCategories, blockedCategories)) {
      return { status: 'unsafe', categories };
    }
  }

  return { status: 'safe', categories };
};
