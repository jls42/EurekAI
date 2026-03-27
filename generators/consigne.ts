import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';
import { langInstruction } from '../prompts.js';

export interface ConsigneResult {
  found: boolean;
  text: string;
  keyTopics: string[];
}

const CONSIGNE_SYSTEM = `Tu es un assistant pedagogique expert. Analyse les documents fournis et determine s'ils contiennent des consignes de revision, un programme de controle, des objectifs d'apprentissage, ou des indications du type "Je sais ma lecon si je sais...".

Reponds en JSON strict :
{"found": true/false, "text": "resume des consignes detectees", "keyTopics": ["point 1", "point 2", ...]}

Si aucune consigne n'est detectee, reponds : {"found": false, "text": "", "keyTopics": []}
Reponds UNIQUEMENT en JSON valide.`;

export async function detectConsigne(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  lang = 'fr',
): Promise<ConsigneResult> {
  const response = await client.chat.complete({
    model,
    messages: [
      { role: 'system', content: CONSIGNE_SYSTEM + langInstruction(lang) },
      {
        role: 'user',
        content: `Analyse ces documents et detecte les consignes de revision, programmes de controle ou objectifs d'apprentissage :\n\n${markdown}`,
      },
    ],
    responseFormat: { type: 'json_object' },
  });

  const raw = getContent(response);
  const result = safeParseJson<ConsigneResult>(raw);
  return {
    found: result.found ?? false,
    text: result.text ?? '',
    keyTopics: Array.isArray(result.keyTopics) ? result.keyTopics : [],
  };
}
