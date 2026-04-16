import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';
import { routerSystem, defaultReasonFor } from '../prompts.js';
import type { AgeGroup } from '../types.js';

export interface RoutePlan {
  plan: Array<{ agent: string; reason: string }>;
  context: string;
}

const VALID_AGENTS = new Set([
  'summary',
  'flashcards',
  'quiz',
  'fill-blank',
  'podcast',
  'quiz-vocal',
  'image',
]);

const AGE_LABELS: Record<AgeGroup, string> = {
  enfant: 'un enfant de 6-10 ans',
  ado: 'un adolescent de 11-15 ans',
  etudiant: 'un etudiant de 16-25 ans',
  adulte: 'un adulte',
};

const MAX_PLAN_LENGTH = 6;

/**
 * Normalise un plan brut renvoyé par le LLM (Phase 2.4 — cf. décision produit #5) :
 * 1. Filtrage des noms invalides (pas dans VALID_AGENTS).
 * 2. Si liste vide après filtrage → fallback catastrophe [summary, flashcards, quiz].
 * 3. Sinon : déduplication (1ère occurrence gardée, ordre du modèle préservé).
 * 4. Invariant summary : ajouté en tête s'il est absent ; jamais déplacé s'il est présent.
 * 5. Troncature aux MAX_PLAN_LENGTH premiers (6).
 *
 * Pas de complétion forcée à 3 — si le modèle renvoie 1-2 agents délibérément (source
 * courte), on respecte ce jugement.
 */
export function normalizePlan(
  rawPlan: Array<{ agent: string; reason: string }>,
  lang: string,
): Array<{ agent: string; reason: string }> {
  // 1. Filter invalid agent names
  const filtered = rawPlan.filter((step) => VALID_AGENTS.has(step.agent));

  // 2. Catastrophe fallback: empty after filtering → return defaults immediately
  if (filtered.length === 0) {
    return [
      { agent: 'summary', reason: defaultReasonFor('summary', lang) },
      { agent: 'flashcards', reason: defaultReasonFor('flashcards', lang) },
      { agent: 'quiz', reason: defaultReasonFor('quiz', lang) },
    ];
  }

  // 3. Deduplicate while preserving model's order
  const seen = new Set<string>();
  const deduped = filtered.filter((step) => {
    if (seen.has(step.agent)) return false;
    seen.add(step.agent);
    return true;
  });

  // 4. Summary invariant: prepend if absent, never relocate if present
  if (!seen.has('summary')) {
    deduped.unshift({ agent: 'summary', reason: defaultReasonFor('summary', lang) });
  }

  // 5. Truncate to max
  return deduped.slice(0, MAX_PLAN_LENGTH);
}

export async function routeRequest(
  client: Mistral,
  markdown: string,
  model = 'mistral-small-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
): Promise<RoutePlan> {
  const response = await client.chat.complete({
    model,
    messages: [
      {
        role: 'system',
        content: routerSystem(ageGroup, lang),
      },
      {
        role: 'user',
        content: `Analyse ce contenu et decide quel materiel educatif generer pour ${AGE_LABELS[ageGroup]}:\n\n${markdown}`,
      },
    ],
    responseFormat: { type: 'json_object' },
    temperature: 0.3,
  });

  const raw = getContent(response);
  const parsed = safeParseJson<RoutePlan>(raw);
  parsed.plan = normalizePlan(parsed.plan ?? [], lang);
  return parsed;
}
