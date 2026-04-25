import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson, unwrapJsonArray } from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import { logger } from '../helpers/logger.js';
import { podcastSystem, podcastUser, pickPodcastNames } from '../prompts.js';
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

function parsePodcastResponse(raw: string): ParsedPodcastResponse {
  const parsed = safeParseJson(raw) as Record<string, unknown>;
  // Extract sourceRefs before unwrapping the array
  const sourceRefs = Array.isArray(parsed?.sourceRefs)
    ? (parsed.sourceRefs as string[])
    : undefined;
  const script = unwrapJsonArray<PodcastLine>(parsed);
  return { script, sourceRefs };
}

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
  const result = parsePodcastResponse(raw);

  if (isValidPodcast(result.script)) return { ...result, names };

  logger.warn(
    'podcast',
    'validation failed, retrying:',
    JSON.stringify(result.script).slice(0, 200),
  );
  messages.push(
    { role: 'assistant', content: raw },
    {
      role: 'user',
      content:
        'Ta reponse etait vide ou incomplete. Regenere le script podcast complet avec speaker (host/guest) et text. JSON valide uniquement.',
    },
  );

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('podcast'),
  });
  const retryResult = parsePodcastResponse(getContent(retry));

  if (!isValidPodcast(retryResult.script)) {
    throw new Error("Le modele n'a pas reussi a generer un podcast valide apres 2 tentatives");
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
