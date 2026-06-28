import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';
import { consigneSystem } from '../prompts.js';

export interface ConsigneResult {
  found: boolean;
  text: string;
  keyTopics: string[];
}

export async function detectConsigne(
  client: Mistral,
  markdown: string,
  model = 'mistral-large-latest',
  lang = 'fr',
): Promise<ConsigneResult> {
  const response = await client.chat.complete({
    model,
    messages: [
      { role: 'system', content: consigneSystem(lang) },
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
