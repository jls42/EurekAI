export type BillingUnit = 'tokens' | 'characters' | 'pages' | 'audio-seconds';

export interface ModelPricing {
  inputPerMillion: number;
  outputPerMillion: number;
  unit: BillingUnit;
}

export interface ApiUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  promptAudioSeconds?: number;
  pagesProcessed?: number;
  inputCharacters?: number;
  model: string;
}

export interface GenerationUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  promptAudioSeconds?: number;
  pagesProcessed?: number;
  inputCharacters?: number;
  callCount: number;
}

/** Model pricing keyed by prefix — `mistral-large-2512` matches `mistral-large`. */
export const MODEL_PRICING: Record<string, ModelPricing> = {
  'mistral-large':      { inputPerMillion: 0.5,  outputPerMillion: 1.5, unit: 'tokens' },
  'mistral-small':      { inputPerMillion: 0.1,  outputPerMillion: 0.3, unit: 'tokens' },
  'voxtral-mini-tts':   { inputPerMillion: 16,   outputPerMillion: 0,   unit: 'characters' },
  'voxtral-mini':       { inputPerMillion: 50,   outputPerMillion: 0,   unit: 'audio-seconds' },
  'mistral-ocr':        { inputPerMillion: 2000, outputPerMillion: 0,   unit: 'pages' },
  'mistral-moderation': { inputPerMillion: 0,    outputPerMillion: 0,   unit: 'tokens' },
};

/** URLs for scraping up-to-date pricing from Mistral docs. */
export const PRICING_SOURCES: Record<string, string> = {
  'mistral-large':      'https://docs.mistral.ai/models/mistral-large-3-25-12',
  'mistral-small':      'https://docs.mistral.ai/models/mistral-small-4-0-26-03',
  'voxtral-mini-tts':   'https://docs.mistral.ai/models/voxtral-tts-26-03',
  'voxtral-mini':       'https://docs.mistral.ai/models/voxtral-mini-transcribe-26-02',
  'mistral-ocr':        'https://docs.mistral.ai/models/ocr-3-25-12',
  'mistral-moderation': 'https://docs.mistral.ai/models/mistral-moderation-26-03',
};

/** Resolve pricing by longest prefix match on model ID. */
export function resolvePricing(modelId: string): ModelPricing | null {
  const prefixes = Object.keys(MODEL_PRICING).sort((a, b) => b.length - a.length);
  for (const prefix of prefixes) {
    if (modelId.startsWith(prefix)) return MODEL_PRICING[prefix];
  }
  return null;
}

/** Calculate cost in USD for a single API call. */
export function calculateCost(usage: ApiUsage): number {
  const pricing = resolvePricing(usage.model);
  if (!pricing) return 0;

  switch (pricing.unit) {
    case 'tokens':
      return ((usage.promptTokens ?? 0) * pricing.inputPerMillion +
              (usage.completionTokens ?? 0) * pricing.outputPerMillion) / 1_000_000;
    case 'characters':
      return ((usage.inputCharacters ?? 0) * pricing.inputPerMillion) / 1_000_000;
    case 'pages':
      return ((usage.pagesProcessed ?? 0) * pricing.inputPerMillion) / 1_000_000;
    case 'audio-seconds':
      return ((usage.promptAudioSeconds ?? 0) * pricing.inputPerMillion) / 1_000_000;
    default:
      return 0;
  }
}

/** Aggregate multiple API call usages into a single GenerationUsage. */
export function aggregateUsage(entries: ApiUsage[]): GenerationUsage {
  let promptTokens = 0, completionTokens = 0, totalTokens = 0;
  let promptAudioSeconds: number | undefined;
  let pagesProcessed: number | undefined;
  let inputCharacters: number | undefined;

  for (const e of entries) {
    promptTokens += e.promptTokens ?? 0;
    completionTokens += e.completionTokens ?? 0;
    totalTokens += e.totalTokens ?? 0;
    if (e.promptAudioSeconds != null) promptAudioSeconds = (promptAudioSeconds ?? 0) + e.promptAudioSeconds;
    if (e.pagesProcessed != null) pagesProcessed = (pagesProcessed ?? 0) + e.pagesProcessed;
    if (e.inputCharacters != null) inputCharacters = (inputCharacters ?? 0) + e.inputCharacters;
  }

  return { promptTokens, completionTokens, totalTokens, promptAudioSeconds, pagesProcessed, inputCharacters, callCount: entries.length };
}

/** Calculate total cost in USD across multiple API calls. */
export function calculateTotalCost(entries: ApiUsage[]): number {
  let total = 0;
  for (const e of entries) total += calculateCost(e);
  return Math.round(total * 1_000_000) / 1_000_000;
}

function fmt(n: number): string { return n < 0.0001 ? '$0' : `$${n.toFixed(4)}`; }

/** Build a human-readable cost breakdown showing the calculation per API call. */
export function buildCostBreakdown(entries: ApiUsage[]): string[] {
  const lines: string[] = [];
  for (const e of entries) {
    const pricing = resolvePricing(e.model);
    if (!pricing) continue;
    switch (pricing.unit) {
      case 'tokens':
        if (e.promptTokens) lines.push(`${e.promptTokens} tokens in × $${pricing.inputPerMillion}/M = ${fmt((e.promptTokens * pricing.inputPerMillion) / 1_000_000)}`);
        if (e.completionTokens) lines.push(`${e.completionTokens} tokens out × $${pricing.outputPerMillion}/M = ${fmt((e.completionTokens * pricing.outputPerMillion) / 1_000_000)}`);
        break;
      case 'characters':
        if (e.inputCharacters) lines.push(`${e.inputCharacters} chars × $${pricing.inputPerMillion}/M = ${fmt((e.inputCharacters * pricing.inputPerMillion) / 1_000_000)}`);
        break;
      case 'pages':
        if (e.pagesProcessed) lines.push(`${e.pagesProcessed} page(s) × $${pricing.inputPerMillion / 1000}/page = ${fmt((e.pagesProcessed * pricing.inputPerMillion) / 1_000_000)}`);
        break;
      case 'audio-seconds':
        if (e.promptAudioSeconds) lines.push(`${e.promptAudioSeconds.toFixed(1)}s audio × $${(pricing.inputPerMillion / 1_000_000 * 60).toFixed(4)}/min = ${fmt((e.promptAudioSeconds * pricing.inputPerMillion) / 1_000_000)}`);
        break;
    }
  }
  return lines;
}
