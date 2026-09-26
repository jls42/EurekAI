import { Mistral } from '@mistralai/mistralai';
import {
  getContent,
  retryTurns,
  safeParseJson,
  tryParseJson,
  unwrapJsonArray,
} from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import { logger } from '../helpers/logger.js';
import { podcastSystem, podcastUser, pickPodcastNames, podcastRetryUser } from '../prompts.js';
import type { PodcastLine, AgeGroup, PodcastGeneration, PodcastSpeakers } from '../types.js';

interface ParsedPodcastResponse {
  script: PodcastLine[];
  sourceRefs?: string[];
}

export interface PodcastResult extends ParsedPodcastResponse {
  names: PodcastSpeakers;
}

function isValidPodcast(data: PodcastLine[]): boolean {
  return (
    data.length > 0 &&
    data.every(
      (l) =>
        (l.speaker === 'host' || l.speaker === 'guest') &&
        typeof l.text === 'string' &&
        l.text.length > 0,
    )
  );
}

// Reçoit le JSON déjà parsé : tryParseJson au 1er essai (null si tronqué → script vide → retry),
// safeParseJson au retry (SyntaxError → llm_invalid_json). Fléchée : délimitée par Lizard.
const parsePodcastResponse = (json: unknown): ParsedPodcastResponse => {
  const parsed = json as Record<string, unknown> | null;
  // Extract sourceRefs before unwrapping the array
  const sourceRefs = Array.isArray(parsed?.sourceRefs)
    ? (parsed.sourceRefs as string[])
    : undefined;
  // Clé explicite du contrat d'abord : unwrapJsonArray retourne le PREMIER tableau
  // trouvé — sur {"sourceRefs":[...],"script":[...]} (ordre légal en JSON), il
  // prendrait sourceRefs pour le script → retry Mistral inutile. Fallback conservé
  // pour les shapes dégradés (tableau nu, clé alternative).
  const script: PodcastLine[] = Array.isArray(parsed?.script)
    ? (parsed.script as PodcastLine[])
    : unwrapJsonArray(parsed);
  return { script, sourceRefs };
};

export async function generatePodcastScript(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  exclusions?: string,
): Promise<PodcastResult> {
  const names = pickPodcastNames();
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: podcastSystem(ageGroup, names) },
    { role: 'user', content: podcastUser(markdown, lang, exclusions) },
  ];

  const response = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('podcast'),
  });

  const raw = getContent(response);
  const result = parsePodcastResponse(tryParseJson(raw));

  if (isValidPodcast(result.script)) return { ...result, names };

  logger.warn(
    'podcast',
    'validation failed, retrying:',
    JSON.stringify(result.script).slice(0, 200),
  );
  messages.push(...retryTurns(raw, podcastRetryUser(lang)));

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('podcast'),
  });
  const retryResult = parsePodcastResponse(safeParseJson(getContent(retry)));

  if (!isValidPodcast(retryResult.script)) {
    // SyntaxError → llm_invalid_json (extractErrorCode), pas internal_error.
    throw new SyntaxError(
      "Le modele n'a pas reussi a generer un podcast valide apres 2 tentatives",
    );
  }
  return { ...retryResult, names };
}

// Force `data.speakers` non-undefined à la création (le `?` du type vit pour la
// rétrocompat de lecture des anciennes générations DB sans speakers — pas pour
// permettre une création sans). Symétrique de la contrainte `lang: string`.
type PodcastGenerationCreateFields = Omit<PodcastGeneration, 'lang' | 'data'> & {
  lang: string;
  data: PodcastGeneration['data'] & { speakers: PodcastSpeakers };
};

export function createPodcastGeneration(fields: PodcastGenerationCreateFields): PodcastGeneration {
  return fields;
}
