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

/** Get the billable quantity for a given unit type. */
function getQuantity(usage: ApiUsage, unit: BillingUnit): number {
  switch (unit) {
    case 'tokens': return (usage.promptTokens || 0) + (usage.completionTokens || 0);
    case 'characters': return usage.inputCharacters || 0;
    case 'pages': return usage.pagesProcessed || 0;
    case 'audio-seconds': return usage.promptAudioSeconds || 0;
    default: return 0;
  }
}

/** Calculate cost in USD for a single API call. */
export function calculateCost(usage: ApiUsage): number {
  const pricing = resolvePricing(usage.model);
  if (!pricing) return 0;
  if (pricing.unit === 'tokens') {
    return ((usage.promptTokens || 0) * pricing.inputPerMillion +
            (usage.completionTokens || 0) * pricing.outputPerMillion) / 1_000_000;
  }
  return (getQuantity(usage, pricing.unit) * pricing.inputPerMillion) / 1_000_000;
}

function addOptional(acc: number | undefined, val: number | undefined): number | undefined {
  return val != null ? (acc || 0) + val : acc;
}

/** Aggregate multiple API call usages into a single GenerationUsage. */
export function aggregateUsage(entries: ApiUsage[]): GenerationUsage {
  let promptTokens = 0, completionTokens = 0, totalTokens = 0;
  let promptAudioSeconds: number | undefined;
  let pagesProcessed: number | undefined;
  let inputCharacters: number | undefined;

  for (const e of entries) {
    promptTokens += e.promptTokens || 0;
    completionTokens += e.completionTokens || 0;
    totalTokens += e.totalTokens || 0;
    promptAudioSeconds = addOptional(promptAudioSeconds, e.promptAudioSeconds);
    pagesProcessed = addOptional(pagesProcessed, e.pagesProcessed);
    inputCharacters = addOptional(inputCharacters, e.inputCharacters);
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
function costLine(qty: string, rate: string, cost: number): string { return `${qty} × ${rate} = ${fmt(cost)}`; }

function breakdownEntry(usage: ApiUsage, pricing: ModelPricing): string[] {
  const lines: string[] = [];
  switch (pricing.unit) {
    case 'tokens':
      if (usage.promptTokens) lines.push(costLine(`${usage.promptTokens} tokens in`, `$${pricing.inputPerMillion}/M`, (usage.promptTokens * pricing.inputPerMillion) / 1_000_000));
      if (usage.completionTokens) lines.push(costLine(`${usage.completionTokens} tokens out`, `$${pricing.outputPerMillion}/M`, (usage.completionTokens * pricing.outputPerMillion) / 1_000_000));
      break;
    case 'characters':
      if (usage.inputCharacters) lines.push(costLine(`${usage.inputCharacters} chars`, `$${pricing.inputPerMillion}/M`, (usage.inputCharacters * pricing.inputPerMillion) / 1_000_000));
      break;
    case 'pages':
      if (usage.pagesProcessed) lines.push(costLine(`${usage.pagesProcessed} page(s)`, `$${pricing.inputPerMillion / 1000}/page`, (usage.pagesProcessed * pricing.inputPerMillion) / 1_000_000));
      break;
    case 'audio-seconds':
      if (usage.promptAudioSeconds) lines.push(costLine(`${usage.promptAudioSeconds.toFixed(1)}s audio`, `$${(pricing.inputPerMillion / 1_000_000 * 60).toFixed(4)}/min`, (usage.promptAudioSeconds * pricing.inputPerMillion) / 1_000_000));
      break;
  }
  return lines;
}

/** Build a human-readable cost breakdown showing the calculation per API call. */
export function buildCostBreakdown(entries: ApiUsage[]): string[] {
  const lines: string[] = [];
  for (const e of entries) {
    const pricing = resolvePricing(e.model);
    if (pricing) lines.push(...breakdownEntry(e, pricing));
  }
  return lines;
}
