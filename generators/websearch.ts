import { Mistral } from '@mistralai/mistralai';
import { timer, extractAllText } from '../helpers/index.js';
import { logger } from '../helpers/logger.js';
import { websearchInstructions, websearchInput } from '../prompts.js';

export async function webSearchEnrich(
  client: Mistral,
  query: string,
  lang = 'fr',
  ageGroup: import('../types.js').AgeGroup = 'enfant',
): Promise<{ text: string; elapsed: number }> {
  const stop = timer();

  const agent = await client.beta.agents.create({
    model: 'mistral-large-latest',
    name: 'EurekAI Web Researcher',
    description: 'Agent de recherche web educative',
    instructions: websearchInstructions(lang, ageGroup),
    tools: [{ type: 'web_search' }],
  });

  try {
    const response = await client.beta.conversations.start({
      agentId: agent.id,
      inputs: websearchInput(query, lang),
    });

    const text = extractAllText(response.outputs as unknown[]);
    const elapsed = stop();

    const noResult = lang === 'en' ? 'No results found.' : 'Aucun resultat trouve.';
    return { text: text || noResult, elapsed };
  } finally {
    try {
      await client.beta.agents.delete({ agentId: agent.id });
    } catch (e) {
      logger.warn('websearch', 'agent delete failed', e);
    }
  }
}
