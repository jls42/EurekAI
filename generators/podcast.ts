import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson, unwrapJsonArray } from '../helpers/index.js';
import { podcastSystem, podcastUser } from '../prompts.js';
import type { PodcastLine, AgeGroup } from '../types.js';

export interface PodcastResult {
  script: PodcastLine[];
  sourceRefs?: string[];
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

function parsePodcastResponse(raw: string): PodcastResult {
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
): Promise<PodcastResult> {
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: podcastSystem(ageGroup) },
    { role: 'user', content: podcastUser(markdown, lang) },
  ];

  const response = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
  });

  const raw = getContent(response);
  const result = parsePodcastResponse(raw);

  if (isValidPodcast(result.script)) return result;

  console.warn(
    'Podcast validation failed, retrying. Got:',
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
  });
  const retryResult = parsePodcastResponse(getContent(retry));

  if (!isValidPodcast(retryResult.script)) {
    throw new Error("Le modele n'a pas reussi a generer un podcast valide apres 2 tentatives");
  }
  return retryResult;
}
