import type { Mistral } from '@mistralai/mistralai';
import type { ApiUsage } from './pricing.js';

type UsageCallback = (usage: ApiUsage) => void;

function extractChatUsage(response: any, request: any): ApiUsage {
  const u = response.usage || {};
  return {
    promptTokens: u.promptTokens || 0,
    completionTokens: u.completionTokens || 0,
    totalTokens: u.totalTokens || 0,
    model: response.model || request.model || '',
  };
}

/**
 * Wrap billable methods on the Mistral client to capture API usage.
 * Generators remain untouched — tracking is transparent.
 */
export function trackClient(client: Mistral, onUsage: UsageCallback): void {
  wrapChatComplete(client, onUsage);
  wrapStt(client, onUsage);
  wrapOcr(client, onUsage);
  wrapTts(client, onUsage);
}

function wrapChatComplete(client: Mistral, onUsage: UsageCallback): void {
  const orig = client.chat.complete.bind(client.chat);
  client.chat.complete = async (request: any, options?: any) => {
    const response = await orig(request, options);
    onUsage(extractChatUsage(response, request));
    return response;
  };
}

function wrapStt(client: Mistral, onUsage: UsageCallback): void {
  const orig = client.audio.transcriptions.complete.bind(client.audio.transcriptions);
  client.audio.transcriptions.complete = async (request: any, options?: any) => {
    const response = await orig(request, options);
    onUsage({
      promptTokens: response.usage?.promptTokens ?? 0,
      completionTokens: response.usage?.completionTokens ?? 0,
      totalTokens: response.usage?.totalTokens ?? 0,
      promptAudioSeconds: (response.usage as any)?.promptAudioSeconds,
      model: response.model ?? request.model ?? '',
    });
    return response;
  };
}

function wrapOcr(client: Mistral, onUsage: UsageCallback): void {
  const orig = client.ocr.process.bind(client.ocr);
  client.ocr.process = async (request: any, options?: any) => {
    const response = await orig(request, options);
    onUsage({
      pagesProcessed: response.usageInfo?.pagesProcessed ?? 0,
      model: response.model ?? request.model ?? '',
    });
    return response;
  };
}

function wrapTts(client: Mistral, onUsage: UsageCallback): void {
  const orig = client.audio.speech.complete.bind(client.audio.speech);
  (client.audio.speech as any).complete = async (request: any, options?: any) => {
    const response = await orig(request, options);
    onUsage({
      inputCharacters: typeof request.input === 'string' ? request.input.length : 0,
      model: request.model ?? '',
    });
    return response;
  };
}
