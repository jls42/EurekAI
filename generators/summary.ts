import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import { logger } from '../helpers/logger.js';
import { summarySystem, summaryUser } from '../prompts.js';
import type { StudyFiche, AgeGroup } from '../types.js';

function isValidSummary(data: unknown): data is StudyFiche {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.title === 'string' &&
    d.title.length > 0 &&
    typeof d.summary === 'string' &&
    d.summary.length > 0 &&
    Array.isArray(d.key_points) &&
    d.key_points.length > 0
  );
}

/** When the model wraps multiple fiches in {"fiches": [...]}, merge them into one. */
function unwrapAndMerge(data: Record<string, unknown>): StudyFiche | null {
  const fiches = data.fiches || data.fiche || data.results || data.summary_fiches;
  if (!Array.isArray(fiches) || fiches.length === 0) return null;

  if (fiches.length === 1) return fiches[0] as StudyFiche;

  const merged: StudyFiche = {
    title: fiches
      .map((f: any) => f.title)
      .filter(Boolean)
      .join(' / '),
    summary: fiches
      .map((f: any) => f.summary)
      .filter(Boolean)
      .join(' '),
    key_points: fiches.flatMap((f: any) => f.key_points || []),
    fun_fact: fiches.map((f: any) => f.fun_fact).find(Boolean) || '',
    vocabulary: fiches.flatMap((f: any) => f.vocabulary || []),
    citations: fiches.flatMap((f: any) => f.citations || []),
  };

  // Deduplicate key_points
  merged.key_points = [...new Set(merged.key_points)];
  // Deduplicate vocabulary by word
  const seen = new Set<string>();
  merged.vocabulary = merged.vocabulary.filter((v) => {
    if (seen.has(v.word)) return false;
    seen.add(v.word);
    return true;
  });

  return merged;
}

function extractSummary(raw: string): StudyFiche {
  const data = safeParseJson<Record<string, unknown>>(raw);

  if (isValidSummary(data)) return data as unknown as StudyFiche;

  const merged = unwrapAndMerge(data);
  if (merged && isValidSummary(merged)) {
    logger.info('summary', `merged ${(data.fiches as any[])?.length || '?'} sub-fiches into one`);
    return merged;
  }

  return data as unknown as StudyFiche;
}

export async function generateSummary(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  hasConsigne = false,
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  exclusions?: string,
): Promise<StudyFiche> {
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: summarySystem(ageGroup) },
    { role: 'user', content: summaryUser(markdown, hasConsigne, lang, exclusions) },
  ];

  const response = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('summary'),
  });

  const raw = getContent(response);

  try {
    const data = extractSummary(raw);
    if (isValidSummary(data)) return data;
    logger.warn(
      'summary',
      `validation failed, retrying. Got: ${JSON.stringify(data).slice(0, 200)}`,
    );
  } catch (e) {
    logger.warn('summary', `JSON parse failed, retrying: ${(e as Error).message}`);
  }

  messages.push(
    { role: 'assistant', content: raw },
    {
      role: 'user',
      content:
        "Ta reponse precedente etait invalide. Regenere un objet JSON unique au premier niveau avec les champs title, summary, key_points (5-7), fun_fact, vocabulary. Rappel : title = sujet du cours uniquement (ex: 'Les volcans'), pas de tableau 'fiches'. Reponds uniquement en JSON valide.",
    },
  );

  let retryRaw: string;
  try {
    const retry = await client.chat.complete({
      model,
      messages,
      responseFormat: { type: 'json_object' },
      ...diversityParams('summary'),
    });
    retryRaw = getContent(retry);
  } catch (e) {
    // Le retry peut échouer indépendamment (429, context_length inflaté par l'historique).
    // Préserver le message originel pour que extractErrorCode mappe vers quota_exceeded /
    // context_length_exceeded côté route, au lieu de retomber sur internal_error.
    logger.error('summary', `retry API call failed: ${(e as Error).message}`);
    throw e;
  }

  const retryData = extractSummary(retryRaw);

  if (!isValidSummary(retryData)) {
    logger.error('summary', `retry also failed. Got: ${JSON.stringify(retryData).slice(0, 200)}`);
    // SyntaxError (et non Error) pour que extractErrorCode mappe vers llm_invalid_json.
    // Tradeoff observabilité assumé : le code agrège deux causes racines (JSON non parsable
    // ET JSON parsable mais schéma invalide — ex. title manquant, key_points vide). La
    // distinction n'apporte rien côté UX (dans les deux cas le LLM a raté), mais pour
    // debug on s'appuie sur le logger.error juste au-dessus qui sérialise retryData.
    throw new SyntaxError("Le modele n'a pas reussi a generer une fiche valide apres 2 tentatives");
  }

  return retryData;
}
