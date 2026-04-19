import type { Mistral } from '@mistralai/mistralai';
import type { ApiUsage } from './pricing.js';

type UsageCallback = (usage: ApiUsage) => void;

interface UsageExtractableResponse {
  model?: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    promptAudioSeconds?: number;
  };
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

// Arrow const pour eviter l'agglomeration du parseur TS de Lizard entre
// helpers non-exportes consecutifs (piege connu CLAUDE.md). Unifie chat
// + STT + agent : promptAudioSeconds est optionnel sur ApiUsage, donc
// sa presence en chat/agent (tjs undefined dans ce cas) est inerte.
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- `||` volontaire :
// garde CCN ≤ 8 (chaque `??` compte 2 dans Lizard, piège CLAUDE.md). Les champs
// sont numériques (0 falsy acceptable) ou string ('' falsy acceptable) ici.
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
    const response = await orig(request, options);
    onUsage(extractUsage(response as UsageExtractableResponse, request as RequestWithModel));
    return response;
  };
}

function wrapStt(client: Mistral, onUsage: UsageCallback): void {
  const orig = client.audio.transcriptions.complete.bind(client.audio.transcriptions);
  client.audio.transcriptions.complete = async (request, options) => {
    const response = await orig(request, options);
    onUsage(extractUsage(response as UsageExtractableResponse, request as RequestWithModel));
    return response;
  };
}

function wrapOcr(client: Mistral, onUsage: UsageCallback): void {
  const orig = client.ocr.process.bind(client.ocr);
  client.ocr.process = async (request, options) => {
    const response = (await orig(request, options)) as OcrResponseShape;
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
    const response = await orig(request as Parameters<typeof orig>[0], options);
    onUsage({
      inputCharacters: typeof request.input === 'string' ? request.input.length : 0,
      model: request.model ?? '',
    });
    return response;
  };
  speech.complete = wrapped as typeof speech.complete;
}

function wrapAgent(client: Mistral, onUsage: UsageCallback): void {
  const conversations = client.beta.conversations;
  const orig = conversations.start.bind(conversations);
  conversations.start = async (request, options) => {
    const response = await orig(request, options);
    const usageResp = response as UsageExtractableResponse;
    if (usageResp.usage) {
      onUsage(extractUsage(usageResp, { model: 'mistral-large-latest' }));
    }
    return response;
  };
}
