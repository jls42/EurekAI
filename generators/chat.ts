import { Mistral } from '@mistralai/mistralai';
import { chatSystem } from '../prompts.js';

const TOOLS = [
  {
    type: 'function' as const,
    function: {
      name: 'generate_summary',
      description: 'Genere une fiche de revision a partir des sources du cours',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'generate_flashcards',
      description: 'Genere des flashcards (cartes question/reponse) a partir des sources du cours',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'generate_quiz',
      description: 'Genere un quiz QCM a partir des sources du cours',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'generate_fill-blank',
      description: 'Genere des exercices a trous (phrases avec mots manquants a completer)',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
];

export interface ChatResult {
  reply: string;
  toolCalls: string[];
}

export async function chatWithSources(
  client: Mistral,
  messages: Array<{ role: string; content: string }>,
  sourceContext: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: import('../types.js').AgeGroup = 'enfant',
): Promise<ChatResult> {
  const docsLabel = lang === 'en' ? 'COURSE DOCUMENTS' : 'DOCUMENTS DE COURS';
  const systemContent = `${chatSystem(lang, ageGroup)}\n\n--- ${docsLabel} ---\n${sourceContext.slice(0, 200000)}`;

  const apiMessages: any[] = [
    { role: 'system', content: systemContent },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const response = await client.chat.complete({
    model,
    messages: apiMessages,
    tools: TOOLS,
    toolChoice: 'auto' as any,
  });

  const choice = response.choices![0]; // NOSONAR(S4325) — choices always present in non-streaming response
  const toolCalls: string[] = [];

  // Handle tool calls (max 3)
  if (choice.message.toolCalls && choice.message.toolCalls.length > 0) {
    apiMessages.push(choice.message);

    const calls = choice.message.toolCalls.slice(0, 3);
    for (const tc of calls) {
      const fnName = tc.function.name;
      toolCalls.push(fnName);
      apiMessages.push({
        role: 'tool',
        toolCallId: tc.id,
        name: fnName,
        content: JSON.stringify({ status: 'triggered', type: fnName.replace('generate_', '') }),
      });
    }

    // Get the final response after tool results
    const finalResponse = await client.chat.complete({
      model,
      messages: apiMessages,
      tools: TOOLS,
    });

    const finalContent = finalResponse.choices![0].message.content; // NOSONAR(S4325) — choices always present in non-streaming response
    return {
      reply: typeof finalContent === 'string' ? finalContent : '',
      toolCalls,
    };
  }

  const content = choice.message.content;
  return {
    reply: typeof content === 'string' ? content : '',
    toolCalls,
  };
}
