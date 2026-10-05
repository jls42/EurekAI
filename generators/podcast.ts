import { Mistral } from '@mistralai/mistralai';
import type { ResponseFormat } from '@mistralai/mistralai/models/components';
import {
  getContent,
  retryTurns,
  safeParseJson,
  tryParseJson,
  unwrapJsonArray,
} from '../helpers/index.js';
import { diversityParams, exclusionItems } from '../helpers/diversity.js';
import { logger } from '../helpers/logger.js';
import {
  podcastSystem,
  podcastUser,
  pickPodcastHook,
  pickPodcastNames,
  podcastRetryUser,
} from '../prompts.js';
import type { PodcastLine, AgeGroup, PodcastGeneration, PodcastSpeakers } from '../types.js';

interface ParsedPodcastResponse {
  script: PodcastLine[];
  sourceRefs?: string[];
}

export interface PodcastResult extends ParsedPodcastResponse {
  names: PodcastSpeakers;
}

// Sortie structurée stricte plutôt que `json_object` (mesuré le 2026-10-04 sur
// mistral-large-latest, rapport dans output/podcast-corpus/2026-10-04/, hors git) : en
// `json_object`, 10 premiers appels sur 20 étaient inexploitables (2 sur 10 sans bloc
// d'exclusions) — script vide `{"script": [ },` (9 tokens) ou réplique dont la clé "speaker"
// sort en " " — et la reprise n'en rattrapait pas toujours ; en schéma strict, 0 sur 310. Le
// schéma impose la forme au décodage : speaker host/guest, texte non vide, 6 à 8 répliques
// (la consigne du prompt).
// Le SDK envoie `schemaDefinition` sous `json_schema.schema` (verrou : test de contrat du SDK).
export const PODCAST_RESPONSE_FORMAT: ResponseFormat = {
  type: 'json_schema',
  jsonSchema: {
    name: 'podcast',
    strict: true,
    schemaDefinition: {
      type: 'object',
      properties: {
        script: {
          type: 'array',
          minItems: 6,
          maxItems: 8,
          items: {
            type: 'object',
            properties: {
              speaker: { type: 'string', enum: ['host', 'guest'] },
              text: { type: 'string', minLength: 1 },
            },
            required: ['speaker', 'text'],
            additionalProperties: false,
          },
        },
        sourceRefs: { type: 'array', items: { type: 'string' } },
      },
      required: ['script', 'sourceRefs'],
      additionalProperties: false,
    },
  },
};

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

// Forme d'une réplique refusée, SANS son texte (contenu tiré de la leçon de l'élève) : clés,
// speaker valide, longueur du texte. Assez pour diagnostiquer un refus (clé "speaker" sortie
// en " ", texte vide) sans journaliser le contenu.
const describeLine = (line: unknown): unknown => {
  if (line === null) return 'null';
  if (typeof line !== 'object') return typeof line;
  const { speaker, text } = line as Record<string, unknown>;
  return {
    keys: Object.keys(line).map((key) => key.slice(0, 20)),
    speakerOk: speaker === 'host' || speaker === 'guest',
    textLength: typeof text === 'string' ? text.length : null,
  };
};

const describeScript = (script: unknown[]): string => {
  return JSON.stringify(script.map(describeLine)).slice(0, 300);
};

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
  const hook = pickPodcastHook(exclusionItems(exclusions ?? ''));
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: podcastSystem(ageGroup, names, hook) },
    { role: 'user', content: podcastUser(markdown, lang, exclusions) },
  ];

  const response = await client.chat.complete({
    model,
    messages,
    responseFormat: PODCAST_RESPONSE_FORMAT,
    ...diversityParams('podcast'),
  });

  const raw = getContent(response);
  const result = parsePodcastResponse(tryParseJson(raw));

  if (isValidPodcast(result.script)) return { ...result, names };

  logger.warn('podcast', 'validation failed, retrying:', describeScript(result.script));
  messages.push(...retryTurns(raw, podcastRetryUser(lang)));

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: PODCAST_RESPONSE_FORMAT,
    ...diversityParams('podcast'),
  });
  const retryResult = parsePodcastResponse(safeParseJson(getContent(retry)));

  if (!isValidPodcast(retryResult.script)) {
    // Le motif du refus se lit dans le journal : sans lui, l'échec du 2026-10-04 (reprise de
    // 704 tokens refusée) restait inexpliqué.
    logger.warn('podcast', 'retry invalid:', describeScript(retryResult.script));
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
