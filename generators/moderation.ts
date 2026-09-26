import { Mistral } from '@mistralai/mistralai';
import type { ModerationResult } from '../types.js';
import { logger } from '../helpers/logger.js';
import {
  MODERATION_MODEL,
  expandLegacyModerationCategories,
  isModerationCategory,
} from '../helpers/moderation-model.js';

export const MODERATION_CHUNK_SIZE = 20_000;

type ModerationResponse = Awaited<ReturnType<Mistral['classifiers']['moderate']>>;

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

// Donnée profil (disque) : un non-tableau (chaîne, objet…) échoue fermé, sans appel API.
const isInvalidBlockedList = (blocked: unknown): boolean =>
  blocked !== undefined && !Array.isArray(blocked);

// Liste exigée des réponses = liste bloquée du profil après expansion legacy (2411 → 2603). Les
// clés hors taxonomie sont IGNORÉES (+ warn) : une coquille locale ne doit pas mettre le profil
// en erreur permanente, et le modèle ne la renverrait jamais (elle ne bloquait déjà rien).
const resolveRequiredCategories = (blocked: readonly string[]): string[] => {
  const expanded = expandLegacyModerationCategories(blocked);
  const unknown = expanded.filter((c) => !isModerationCategory(c));
  if (unknown.length > 0) {
    logger.warn(
      'moderation',
      `ignoring blocked categories unknown to ${MODERATION_MODEL}: ${unknown.join(', ')}`,
    );
  }
  return expanded.filter(isModerationCategory);
};

const isCategoriesObject = (value: unknown): value is Record<string, boolean> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

// Catégories d'un chunk si la réponse respecte le contrat, sinon null (+ logger.error). Contrat :
// objet `categories` présent et CHAQUE clé de la liste bloquée présente (Object.hasOwn) — une clé
// absente vaudrait sinon « non signalé » en silence (clé 2411 jamais renvoyée par 2603). Seules
// les clés bloquées sont exigées : une réponse sans `pii`/`law` reste valide pour un profil enfant.
const readChunkCategories = (
  response: ModerationResponse,
  required: readonly string[] | undefined,
): Record<string, boolean> | null => {
  const chunkCategories = response.results[0]?.categories;
  if (!isCategoriesObject(chunkCategories)) {
    logger.error(
      'moderation',
      `contract broken: ${response.model} returned no categories object, failing closed`,
    );
    return null;
  }
  const missing = (required ?? []).filter((c) => !Object.hasOwn(chunkCategories, c));
  if (missing.length > 0) {
    logger.error(
      'moderation',
      `contract broken: ${response.model} response lacks blocked categories ${missing.join(', ')}, failing closed`,
    );
    return null;
  }
  return chunkCategories;
};

// Fail-closed en statut 'error' (JAMAIS 'unsafe' : une anomalie de contrat n'est pas un contenu
// signalé). Les exceptions de l'API (réseau, 401, 429…) se propagent : les routes les traduisent
// en codes actionnables.
export async function moderateContent(
  client: Mistral,
  text: string,
  blockedCategories?: string[],
): Promise<ModerationResult> {
  if (isInvalidBlockedList(blockedCategories)) {
    logger.error(
      'moderation',
      `invalid blocked categories (type=${typeof blockedCategories}), failing closed without API call`,
    );
    return { status: 'error', categories: {} };
  }
  // undefined = pas de filtre (endpoint /moderate) : toute catégorie signalée → unsafe.
  const required = blockedCategories && resolveRequiredCategories(blockedCategories);
  const chunks = chunkText(text);
  let categories: Record<string, boolean> = {};

  for (const chunk of chunks) {
    const response = await client.classifiers.moderate({
      // Id daté épinglé, jamais `-latest` : rationale et faits mesurés dans helpers/moderation-model.ts.
      model: MODERATION_MODEL,
      inputs: [chunk],
    });

    const chunkCategories = readChunkCategories(response, required);
    if (!chunkCategories) return { status: 'error', categories };
    categories = mergeCategories(categories, chunkCategories);

    if (isUnsafe(chunkCategories, required)) {
      return { status: 'unsafe', categories };
    }
  }

  return { status: 'safe', categories };
}
