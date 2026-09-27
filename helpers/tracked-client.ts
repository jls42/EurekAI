import type { Mistral } from '@mistralai/mistralai';
import type { ApiUsage, ToolCalls } from './pricing.js';
import { resolveToolPricing } from './pricing.js';
import { callWithRetry } from './mistral-retry.js';
import { logger } from './logger.js';

type UsageCallback = (usage: ApiUsage) => void;

interface TokenUsageShape {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  promptAudioSeconds?: number;
}

interface UsageExtractableResponse {
  model?: string;
  usage?: TokenUsageShape;
}

// Réponse de `conversations.start` (mesurée le 2026-09-26) : `connectors` compte les appels par
// outil ; `connectorTokens` = tokens produits par les outils, HORS `promptTokens`
// (total = prompt + completion + connector).
interface AgentResponseShape {
  usage?: TokenUsageShape & { connectorTokens?: unknown; connectors?: unknown };
  outputs?: unknown;
}

interface RequestWithModel {
  model?: string;
}

interface OcrResponseShape {
  model?: string;
  usageInfo?: { pagesProcessed?: number };
}

interface TtsRequestShape {
  model?: string;
  input?: unknown;
}

// cf. CLAUDE.md "Pièges Lizard" (arrow const + CCN ≤ 8).
// Unifie chat + STT + agent : promptAudioSeconds est optionnel sur ApiUsage,
// sa présence en chat/agent (tjs undefined dans ce cas) est inerte.
// `||` volontaire (pas `??`) : chaque `??` compte 2 dans Lizard. Les champs sont
// numériques (0 falsy acceptable = fallback identique) ou string ('' falsy acceptable).
const extractUsage = (response: UsageExtractableResponse, request: RequestWithModel): ApiUsage => {
  const u = response.usage || {};
  return {
    promptTokens: u.promptTokens || 0,
    completionTokens: u.completionTokens || 0,
    totalTokens: u.totalTokens || 0,
    promptAudioSeconds: u.promptAudioSeconds,
    model: response.model || request.model || '',
  };
};

// Modèle des agents créés par les generators (image, recherche web) : la réponse n'a pas de
// champ `model` de premier niveau.
const AGENT_MODEL = 'mistral-large-latest';

// Compteur valide : entier fini ≥ 0 (Number.isInteger exclut NaN et ±Infinity).
const isCount = (n: unknown): n is number => Number.isInteger(n) && (n as number) >= 0;

// `usage.connectors` réduit à ses compteurs valides ; undefined s'il n'en reste aucun.
const toolCallsFromConnectors = (connectors: unknown): ToolCalls | undefined => {
  if (!connectors || typeof connectors !== 'object') return undefined;
  const valid = Object.entries(connectors).filter((e): e is [string, number] => isCount(e[1]));
  return valid.length > 0 ? Object.fromEntries(valid) : undefined;
};

// Nom de l'outil d'une sortie `tool.execution` ; undefined pour toute autre sortie.
const toolExecutionName = (output: unknown): string | undefined => {
  const o = (output || {}) as { type?: unknown; name?: unknown };
  return o.type === 'tool.execution' && typeof o.name === 'string' ? o.name : undefined;
};

// Repli sans `usage.connectors` exploitable : un appel par sortie `tool.execution`, par outil.
const toolCallsFromOutputs = (outputs: unknown): ToolCalls | undefined => {
  const counts = new Map<string, number>();
  for (const output of Array.isArray(outputs) ? outputs : []) {
    const name = toolExecutionName(output);
    if (name !== undefined) counts.set(name, (counts.get(name) || 0) + 1);
  }
  return counts.size > 0 ? Object.fromEntries(counts) : undefined;
};

// Outil sans tarif : compté 0 $ par cost-calc (qui reste pur) — signalé ici pour qu'un nouvel
// outil facturé ne passe pas inaperçu.
const warnUnpricedTools = (toolCalls: ToolCalls): void => {
  for (const tool of Object.keys(toolCalls)) {
    if (!resolveToolPricing(tool)) logger.warn('cost', `agent tool without pricing: ${tool} ($0)`);
  }
};

// Usage d'un agent : tokens du modèle + frais d'outils. `usage.connectors` prime ; à défaut, les
// sorties `tool.execution` sont décomptées — jamais les deux (pas de double comptage).
const extractAgentUsage = (response: AgentResponseShape): ApiUsage => {
  const usage = extractUsage(response, { model: AGENT_MODEL });
  const toolCalls =
    toolCallsFromConnectors(response.usage?.connectors) || toolCallsFromOutputs(response.outputs);
  if (toolCalls) {
    warnUnpricedTools(toolCalls);
    usage.toolCalls = toolCalls;
  }
  const connectorTokens = response.usage?.connectorTokens;
  if (isCount(connectorTokens)) usage.connectorTokens = connectorTokens;
  return usage;
};

/**
 * Wrap billable methods on the Mistral client to capture API usage.
 * Generators remain untouched — tracking is transparent.
 */
export function trackClient(client: Mistral, onUsage: UsageCallback): void {
  wrapChatComplete(client, onUsage);
  wrapStt(client, onUsage);
  wrapOcr(client, onUsage);
  wrapAgent(client, onUsage);
  wrapTts(client, onUsage);
}

function wrapChatComplete(client: Mistral, onUsage: UsageCallback): void {
  const orig = client.chat.complete.bind(client.chat);
  client.chat.complete = async (request, options) => {
    const response = await callWithRetry('chat', () => orig(request, options));
    // cast requis : SDK usage.promptAudioSeconds est number|null, tsc refuse l'assignation directe au type local number (faux positif S4325, moteur TS Sonar plus permissif que tsc)
    onUsage(extractUsage(response as UsageExtractableResponse, request as RequestWithModel)); // NOSONAR(S4325)
    return response;
  };
}

function wrapStt(client: Mistral, onUsage: UsageCallback): void {
  const orig = client.audio.transcriptions.complete.bind(client.audio.transcriptions);
  client.audio.transcriptions.complete = async (request, options) => {
    const response = await callWithRetry('stt', () => orig(request, options));
    // cast requis : SDK usage.promptAudioSeconds est number|null, tsc refuse l'assignation directe au type local number (faux positif S4325, moteur TS Sonar plus permissif que tsc)
    onUsage(extractUsage(response as UsageExtractableResponse, request as RequestWithModel)); // NOSONAR(S4325)
    return response;
  };
}

function wrapOcr(client: Mistral, onUsage: UsageCallback): void {
  const orig = client.ocr.process.bind(client.ocr);
  client.ocr.process = async (request, options) => {
    const response = (await callWithRetry('ocr', () => orig(request, options))) as OcrResponseShape;
    onUsage({
      pagesProcessed: response.usageInfo?.pagesProcessed ?? 0,
      model: response.model ?? (request as RequestWithModel).model ?? '',
    });
    return response as Awaited<ReturnType<typeof orig>>;
  };
}

function wrapTts(client: Mistral, onUsage: UsageCallback): void {
  const speech = client.audio.speech;
  const orig = speech.complete.bind(speech);
  const wrapped = async (request: TtsRequestShape, options?: Parameters<typeof orig>[1]) => {
    const response = await callWithRetry('tts', () =>
      orig(request as Parameters<typeof orig>[0], options),
    );
    onUsage({
      inputCharacters: typeof request.input === 'string' ? request.input.length : 0,
      model: request.model ?? '',
    });
    return response;
  };
  speech.complete = wrapped as typeof speech.complete;
}

// Limite connue : `conversations.start` est rejoué par le backoff du SDK (429, 500, 502, 503, 504),
// puis par callWithRetry sur les transitoires que le SDK ignore (408, autres 5xx dont 52x).
// Seule la réponse finale porte un `usage` : les frais d'outils d'une tentative échouée (ex. une
// image générée, 0,10 $, avant un 5xx) ne sont pas captés, et une image peut être facturée deux fois.
function wrapAgent(client: Mistral, onUsage: UsageCallback): void {
  const conversations = client.beta.conversations;
  const orig = conversations.start.bind(conversations);
  conversations.start = async (request, options) => {
    const response = await callWithRetry('agent', () => orig(request, options));
    const agentResponse = response as AgentResponseShape;
    if (agentResponse.usage) {
      onUsage(extractAgentUsage(agentResponse));
    }
    return response;
  };
}
