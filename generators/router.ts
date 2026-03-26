import { Mistral } from '@mistralai/mistralai';
import { safeParseJson } from '../helpers/index.js';

export interface RoutePlan {
  plan: Array<{ agent: string; reason: string }>;
  context: string;
}

const VALID_AGENTS = ['summary', 'flashcards', 'quiz', 'fill-blank', 'podcast'];

export async function routeRequest(
  client: Mistral,
  markdown: string,
  model = 'mistral-small-latest',
): Promise<RoutePlan> {
  const response = await client.chat.complete({
    model,
    messages: [
      {
        role: 'system',
        content: `Tu es un orchestrateur educatif intelligent. Analyse le contenu et decide quels types de materiel generer.

Agents disponibles:
- "summary": cree des fiches de revision
- "flashcards": cree des flashcards question/reponse
- "quiz": cree un quiz QCM
- "fill-blank": cree des exercices a trous (phrases avec mots manquants a completer)
- "podcast": cree un script de podcast educatif

Decide quels agents sont les plus pertinents pour ce contenu. N'appelle QUE ceux qui sont utiles.
Reponds en JSON strict:
{"plan": [{"agent": "...", "reason": "..."}], "context": "resume du contenu en 2-3 phrases"}`,
      },
      {
        role: 'user',
        content: `Analyse ce contenu et decide quel materiel educatif generer pour un enfant de 9 ans:\n\n${markdown.slice(0, 3000)}`,
      },
    ],
    responseFormat: { type: 'json_object' },
    temperature: 0.3,
  });

  const raw = response.choices![0].message.content as string;
  const parsed = safeParseJson<RoutePlan>(raw);
  parsed.plan = (parsed.plan ?? []).filter((step) => VALID_AGENTS.includes(step.agent));
  return parsed;
}
