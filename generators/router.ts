import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';
import { routerSystem } from '../prompts.js';
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
  parsed.plan = (parsed.plan ?? []).filter((step) => VALID_AGENTS.has(step.agent));
  return parsed;
}
