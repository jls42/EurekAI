import { Mistral } from '@mistralai/mistralai';
import type { ModerationResult } from '../types.js';

export const MODERATION_CHUNK_SIZE = 20_000;

function isUnsafe(categories: Record<string, boolean>, blockedCategories?: string[]): boolean {
  return blockedCategories && blockedCategories.length > 0
    ? blockedCategories.some((cat) => categories[cat] === true)
    : Object.values(categories).includes(true);
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

export async function moderateContent(
  client: Mistral,
  text: string,
  blockedCategories?: string[],
): Promise<ModerationResult> {
  const chunks = chunkText(text);
  let categories: Record<string, boolean> = {};

  for (const chunk of chunks) {
    const response = await client.classifiers.moderate({
      model: 'mistral-moderation-latest',
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
}
