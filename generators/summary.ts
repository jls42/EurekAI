import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
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
    console.log('Summary: merged', (data.fiches as any[])?.length || '?', 'sub-fiches into one');
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
    console.warn('Summary validation failed, retrying. Got:', JSON.stringify(data).slice(0, 200));
  } catch (e) {
    console.warn('Summary JSON parse failed, retrying:', (e as Error).message);
  }

  messages.push(
    { role: 'assistant', content: raw },
    {
      role: 'user',
      content:
        "Ta reponse JSON etait vide ou incomplete. Regenere UNE SEULE fiche COMPLETE (pas de tableau 'fiches') avec title, summary, key_points (5-7), fun_fact et vocabulary au premier niveau du JSON. Reponds uniquement en JSON valide.",
    },
  );

  const retry = await client.chat.complete({
    model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams('summary'),
  });

  const retryRaw = getContent(retry);
  const retryData = extractSummary(retryRaw);

  if (!isValidSummary(retryData)) {
    console.error('Summary retry also failed. Got:', JSON.stringify(retryData).slice(0, 200));
    throw new Error("Le modele n'a pas reussi a generer une fiche valide apres 2 tentatives");
  }

  return retryData;
}
