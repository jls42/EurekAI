import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';

export interface RoutePlan {
  plan: Array<{ agent: string; reason: string }>;
  context: string;
}

const VALID_AGENTS = new Set([
  'summary', 'flashcards', 'quiz', 'fill-blank', 'podcast', 'quiz-vocal', 'image',
]);

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
        content: `Tu es un orchestrateur educatif intelligent. Analyse le contenu et decide quels types de materiel generer pour maximiser l'apprentissage.

Agents disponibles:
- "summary": cree des fiches de revision structurees
- "flashcards": cree des flashcards question/reponse pour memoriser
- "quiz": cree un quiz QCM ecrit
- "fill-blank": cree des exercices a trous (phrases avec mots manquants)
- "podcast": cree un podcast educatif a ecouter (dialogue entre 2 personnes)
- "quiz-vocal": cree un quiz oral interactif (l'eleve repond a voix haute)
- "image": genere une illustration pedagogique du sujet

Pour un apprentissage complet, choisis au minimum 4-5 agents. Combine les approches ecrites (summary, flashcards, quiz, fill-blank) et orales/visuelles (podcast, quiz-vocal, image).
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

  const raw = getContent(response);
  const parsed = safeParseJson<RoutePlan>(raw);
  parsed.plan = (parsed.plan ?? []).filter((step) => VALID_AGENTS.has(step.agent));
  return parsed;
}
