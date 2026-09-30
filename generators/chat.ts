import { Mistral } from '@mistralai/mistralai';
import type { AssistantMessage } from '@mistralai/mistralai/models/components';
import { chatSystem, chatDocsLabel } from '../prompts.js';
import { getContent } from '../helpers/index.js';
import type { AgeGroup } from '../types.js';

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

// Plafonds d'un message : 3 générations (plafond historique) et 3 tours d'outils, soit 4 appels LLM
// au plus. Le modèle enchaîne parfois ses appels, un outil par tour (« d'abord un quiz, puis des
// flashcards », mesuré) : ignorer l'appel du 2e tour laissait une réponse vide, que l'API refuse
// ensuite dans l'historique, ou annonçait une génération jamais lancée.
const MAX_TOOL_CALLS = 3;
const MAX_TOOL_ROUNDS = 3;

type ChatMessages = Parameters<Mistral['chat']['complete']>[0]['messages'];
type ChatResponse = Awaited<ReturnType<Mistral['chat']['complete']>>;
type ToolChoiceMode = 'auto' | 'none';

interface ChatTurnArgs {
  client: Mistral;
  model: string;
  apiMessages: ChatMessages;
}

interface ToolLoop {
  apiMessages: ChatMessages;
  triggered: string[];
}

const completeTurn = (args: ChatTurnArgs, toolChoice: ToolChoiceMode): Promise<ChatResponse> => {
  return args.client.chat.complete({
    model: args.model,
    messages: args.apiMessages,
    tools: TOOLS,
    toolChoice,
  });
};

const firstMessage = (response: ChatResponse): AssistantMessage => {
  return response.choices[0].message!; // NOSONAR(S4325) — message always present on a non-streaming choice
};

// Répond à chaque appel gardé (l'API exige autant de réponses que d'appels : 400 « Not the same
// number of function calls and responses », mesuré) et ne renvoie dans le tour assistant que ces
// appels. Un outil lancé à un tour précédent reçoit sa réponse sans être relancé (le modèle rappelle
// parfois l'outil qu'il vient de lancer, mesuré) ; dans un même tour, un doublon reste une demande
// explicite (« deux quiz »).
// Un nom inconnu (mesuré : « ### 3. **Quiz… » en guise de nom d'outil) reçoit sa réponse mais
// n'est ni compté ni lancé : il ne prend pas une place du plafond.
const TOOL_NAMES: ReadonlySet<string> = new Set(TOOLS.map((t) => t.function.name));

const toolResult = (fnName: string): string => {
  if (!TOOL_NAMES.has(fnName)) return JSON.stringify({ status: 'unknown_tool' });
  return JSON.stringify({ status: 'triggered', type: fnName.replace('generate_', '') });
};

const answerToolCalls = (message: AssistantMessage, loop: ToolLoop): void => {
  const calls = (message.toolCalls ?? []).slice(0, MAX_TOOL_CALLS - loop.triggered.length);
  const earlier = new Set(loop.triggered);
  loop.apiMessages.push({ ...message, role: 'assistant', toolCalls: calls });
  for (const tc of calls) {
    const fnName = tc.function.name;
    if (TOOL_NAMES.has(fnName) && !earlier.has(fnName)) loop.triggered.push(fnName);
    loop.apiMessages.push({
      role: 'tool',
      toolCallId: tc.id,
      name: fnName,
      content: toolResult(fnName),
    });
  }
};

// Le dernier appel possible force une réponse texte : sans lui, le tour final pouvait encore appeler
// un outil, et son texte vide finissait dans l'historique.
const nextToolChoice = (round: number, triggeredCount: number): ToolChoiceMode => {
  return round < MAX_TOOL_ROUNDS && triggeredCount < MAX_TOOL_CALLS ? 'auto' : 'none';
};

// Dernier texte non vide : un tour final vide n'efface pas l'annonce d'un tour précédent.
const latestText = (response: ChatResponse, previous: string): string => {
  const text = getContent(response);
  return text.trim() === '' ? previous : text;
};

export async function chatWithSources(
  client: Mistral,
  messages: Array<{ role: string; content: string }>,
  sourceContext: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
): Promise<ChatResult> {
  const docsLabel = chatDocsLabel(lang);
  const systemContent = `${chatSystem(lang, ageGroup)}\n\n--- ${docsLabel} ---\n${sourceContext.slice(0, 200000)}`;
  const apiMessages: ChatMessages = [
    { role: 'system', content: systemContent },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ] as ChatMessages;
  const turn: ChatTurnArgs = { client, model, apiMessages };
  const loop: ToolLoop = { apiMessages, triggered: [] };

  let response = await completeTurn(turn, 'auto');
  let reply = getContent(response);
  // Tours d'outils séquentiels par nature : chaque tour lit les appels de la réponse précédente.
  for (let round = 1; round <= MAX_TOOL_ROUNDS; round++) {
    const message = firstMessage(response);
    if (!message.toolCalls?.length || loop.triggered.length >= MAX_TOOL_CALLS) break;
    answerToolCalls(message, loop);
    // eslint-disable-next-line no-await-in-loop -- le tour suivant dépend de cette réponse
    response = await completeTurn(turn, nextToolChoice(round, loop.triggered.length)); // NOSONAR(S9382) — tour suivant dépendant
    reply = latestText(response, reply);
  }
  return { reply, toolCalls: loop.triggered };
}
