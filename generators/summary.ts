import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import { logger } from '../helpers/logger.js';
import {
  summarySystem,
  summaryUser,
  summaryRemediationSystem,
  summaryRemediationUser,
} from '../prompts.js';
import type { StudyFiche, AgeGroup, QuizQuestion, SummaryRegister } from '../types.js';

// `const = function` plutôt que `function` pour empêcher Lizard d'agglomérer le CCN
// avec unwrapAndMerge / extractSummary qui suivent (cf. CLAUDE.md piège connu).
const isValidSummary = function (data: unknown): data is StudyFiche {
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
};

type FicheFragment = Partial<StudyFiche>;

/** When the model wraps multiple fiches in {"fiches": [...]}, merge them into one. */
const unwrapAndMerge = function (data: Record<string, unknown>): StudyFiche | null {
  const fiches = data.fiches || data.fiche || data.results || data.summary_fiches;
  if (!Array.isArray(fiches) || fiches.length === 0) return null;
  const typed = fiches as FicheFragment[];

  if (typed.length === 1) return typed[0] as StudyFiche;

  const merged: StudyFiche = {
    title: typed
      .map((f) => f.title)
      .filter(Boolean)
      .join(' / '),
    summary: typed
      .map((f) => f.summary)
      .filter(Boolean)
      .join(' '),
    key_points: typed.flatMap((f) => f.key_points ?? []),
    fun_fact: typed.map((f) => f.fun_fact).find(Boolean) || '',
    vocabulary: typed.flatMap((f) => f.vocabulary ?? []),
    citations: typed.flatMap((f) => f.citations ?? []),
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
};

function extractSummary(raw: string): StudyFiche {
  const data = safeParseJson<Record<string, unknown>>(raw);

  if (isValidSummary(data)) return data;

  const merged = unwrapAndMerge(data);
  if (merged && isValidSummary(merged)) {
    logger.info(
      'summary',
      `merged ${(data.fiches as unknown[] | undefined)?.length ?? '?'} sub-fiches into one`,
    );
    return merged;
  }

  return data as unknown as StudyFiche;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Normalise key_points : le LLM le renvoie parfois en texte (puces sur plusieurs
// lignes) au lieu d'un tableau. On découpe alors par lignes en retirant les
// puces/numéros de tête. `const = function` (anti-agglomération Lizard, cf. CLAUDE.md).
const coerceKeyPoints = function (v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.filter((x): x is string => typeof x === 'string' && x.trim() !== '');
  }
  if (typeof v === 'string' && v.trim() !== '') {
    return v
      .split(/\r?\n+/)
      .map((line) => line.replace(/^[\s•*\-\d.)]+/, '').trim())
      .filter((line) => line !== '');
  }
  return [];
};

const isNonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim() !== '';
const asArrayOr = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

// Récupération de dernier recours : une fiche avec title+summary valides reste
// utilisable même si key_points est vide/malformé (cas observé en remédiation sur
// des summary très structurés « **1.** … **2.** … »). On normalise les champs
// secondaires plutôt que de renvoyer une erreur totale. null si le cœur manque.
const salvageFiche = function (data: unknown): StudyFiche | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (!isNonEmptyString(d.title) || !isNonEmptyString(d.summary)) return null;
  return {
    title: d.title,
    summary: d.summary,
    key_points: coerceKeyPoints(d.key_points),
    fun_fact: typeof d.fun_fact === 'string' ? d.fun_fact : '',
    vocabulary: asArrayOr<StudyFiche['vocabulary'][number]>(d.vocabulary),
    citations: asArrayOr<NonNullable<StudyFiche['citations']>[number]>(d.citations),
  };
};

// Cœur partagé generateSummary / generateRemediationSummary : appel Mistral,
// extraction/validation StudyFiche, retry unique avec la même discipline anti-leak
// que le prompt initial (cf. .claude/rules/prompts.md §Retry).
const completeStudyFiche = async (
  client: Mistral,
  model: string,
  messages: ChatMessage[],
): Promise<StudyFiche> => {
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
        "Ta reponse precedente etait invalide. Regenere un objet JSON unique au premier niveau avec les champs title, summary, key_points (5-7, jamais vide), fun_fact, vocabulary. Rappel : title = sujet du cours uniquement (ex: 'Les volcans'), pas de tableau 'fiches'. Reponds uniquement en JSON valide.",
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

  if (isValidSummary(retryData)) return retryData;

  // Récupération avant échec total : une fiche title+summary valides est utilisable
  // (key_points parfois vide/en texte sur des summary très structurés, ex. remédiation).
  // Mieux vaut une fiche normalisée qu'un 500 (bug « Échec de Fiche » sur fiche de rappel).
  const salvaged = salvageFiche(retryData);
  if (salvaged) {
    logger.warn(
      'summary',
      `retry incomplet, fiche récupérée (key_points normalisé: ${salvaged.key_points.length})`,
    );
    return salvaged;
  }

  logger.error('summary', `retry also failed. Got: ${JSON.stringify(retryData).slice(0, 200)}`);
  // SyntaxError (et non Error) pour que extractErrorCode mappe vers llm_invalid_json.
  // On n'atteint ce throw que si title OU summary manque (fiche vraiment inutilisable).
  throw new SyntaxError("Le modele n'a pas reussi a generer une fiche valide apres 2 tentatives");
};

export async function generateSummary(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  hasConsigne = false,
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  exclusions?: string,
  register?: SummaryRegister,
): Promise<StudyFiche> {
  const messages: ChatMessage[] = [
    { role: 'system', content: summarySystem(ageGroup) },
    { role: 'user', content: summaryUser(markdown, hasConsigne, lang, exclusions, register) },
  ];
  return completeStudyFiche(client, model, messages);
}

// Fiche de remédiation post-quiz : ré-explique uniquement les notions des
// questions ratées (weakQuestions envoyées par le client, cf. routes/generate.ts
// validateQuizReviewInputs). Même format weakConcepts que generateQuizReview.
export async function generateRemediationSummary(
  client: Mistral,
  markdown: string,
  weakQuestions: QuizQuestion[],
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
): Promise<StudyFiche> {
  const weakConcepts = weakQuestions.map((q) => q.question).join('\n- ');
  const messages: ChatMessage[] = [
    { role: 'system', content: summaryRemediationSystem(ageGroup) },
    { role: 'user', content: summaryRemediationUser(weakConcepts, markdown, lang) },
  ];
  return completeStudyFiche(client, model, messages);
}
