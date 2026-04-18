import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';
import { logger } from '../helpers/logger.js';
import { routerSystem, defaultReasonFor } from '../prompts.js';
import type { AgeGroup } from '../types.js';
import { AUTO_AGENTS_SET, MAX_AUTO_PLAN_LENGTH } from './auto-agents.js';

export interface RoutePlan {
  plan: Array<{ agent: string; reason: string }>;
  context: string;
}

// Source unique : AUTO_AGENTS_SET garantit que VALID_AGENTS et AUTO_EXECUTABLE
// (côté routes/generate.ts) ne peuvent pas diverger silencieusement.
const VALID_AGENTS = AUTO_AGENTS_SET;

const AGE_LABELS: Record<AgeGroup, string> = {
  enfant: 'un enfant de 6-10 ans',
  ado: 'un adolescent de 11-15 ans',
  etudiant: 'un etudiant de 16-25 ans',
  adulte: 'un adulte',
};

const MAX_PLAN_LENGTH = MAX_AUTO_PLAN_LENGTH;
const SUBSTANTIAL_MATERIAL_CHARS = 350;

function stripNonSourcePreamble(markdown: string): string {
  const sourceStart = markdown.indexOf('# Source ');
  return sourceStart === -1 ? markdown : markdown.slice(sourceStart);
}

function studyMaterialLength(markdown: string): number {
  return stripNonSourcePreamble(markdown)
    .split('\n')
    .filter((line) => !line.startsWith('# Source ') && line.trim() !== '---')
    .join(' ')
    .replaceAll(/\s+/g, ' ')
    .trim().length;
}

function hasSubstantialStudyMaterial(markdown: string): boolean {
  const materialLength = studyMaterialLength(markdown);
  const sourceCount = markdown.split('\n').filter((line) => line.startsWith('# Source ')).length;
  return (
    materialLength >= SUBSTANTIAL_MATERIAL_CHARS || (sourceCount >= 2 && materialLength >= 220)
  );
}

function insertBeforeImageOrAppend(
  plan: Array<{ agent: string; reason: string }>,
  step: { agent: string; reason: string },
): void {
  const imageIndex = plan.findIndex((item) => item.agent === 'image');
  if (imageIndex === -1) {
    plan.push(step);
    return;
  }
  plan.splice(imageIndex, 0, step);
}

// Mute le tableau `plan` en place (via insertBeforeImageOrAppend).
// Signature void explicite : l'appelant normalizePlan ne doit pas lire la valeur retournée.
function enrichPlanForLearning(
  plan: Array<{ agent: string; reason: string }>,
  lang: string,
  markdown: string,
): void {
  if (!hasSubstantialStudyMaterial(markdown)) return;

  const seen = new Set(plan.map((step) => step.agent));
  if (seen.size === 0) return;

  // Budget post-truncation : n'injecte que ce qui rentre sans évincer un agent déjà choisi
  // par le LLM. Si le LLM a explicitement demandé `image` pour du contenu visuel
  // (carte, anatomie, schéma), on ne la sacrifie pas au profit d'un format audio opportuniste.
  const candidates = ['podcast', 'quiz-vocal'].filter((a) => !seen.has(a));
  const available = MAX_PLAN_LENGTH - plan.length;
  for (const agent of candidates.slice(0, Math.max(0, available))) {
    insertBeforeImageOrAppend(plan, {
      agent,
      reason: defaultReasonFor(agent, lang),
    });
  }
}

/**
 * Normalise un plan brut renvoyé par le LLM :
 * 1. Filtrage des noms invalides (pas dans VALID_AGENTS).
 * 2. Si liste vide après filtrage → fallback catastrophe [summary, flashcards, quiz] + log warn.
 * 3. Sinon : déduplication (1ère occurrence gardée, ordre du modèle préservé).
 * 4. Invariant summary : ajouté en tête s'il est absent ; jamais déplacé s'il est présent.
 * 5. Pour une vraie matière de révision, injecte opportunément les formats audio absents
 *    (podcast, quiz-vocal) SEULEMENT si le budget MAX_PLAN_LENGTH le permet — on ne tronque
 *    jamais un agent choisi par le LLM (notamment `image` pour du contenu visuel).
 * 6. Troncature finale aux MAX_PLAN_LENGTH premiers (filet de sécurité).
 *
 * Politique : le choix du modèle prime. Pas de complétion forcée à 3, pas d'enrichissement
 * sacrificiel. Si le LLM a choisi 6 agents dont image, on garde image ; si le LLM a choisi
 * 1-2 agents délibérément (source courte), on respecte ce jugement.
 */
export function normalizePlan(
  rawPlan: Array<{ agent: string; reason: string }>,
  lang: string,
  markdown = '',
): Array<{ agent: string; reason: string }> {
  // 1. Filter invalid agent names
  const filtered = rawPlan.filter((step) => VALID_AGENTS.has(step.agent));

  // 2. Catastrophe fallback: empty after filtering → return defaults immediately
  if (filtered.length === 0) {
    // Signale un LLM qui a halluciné des noms d'agents ou renvoyé un plan vide :
    // sans ce warn, une régression du routerSystem passerait en prod invisible.
    logger.warn(
      'router',
      `catastrophe fallback (lang=${lang}) — no valid agent in raw plan:`,
      rawPlan,
    );
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

  // 5. Re-add audio formats for substantial study material
  enrichPlanForLearning(deduped, lang, markdown);

  // 6. Truncate to max
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
  parsed.plan = normalizePlan(parsed.plan ?? [], lang, markdown);
  return parsed;
}
