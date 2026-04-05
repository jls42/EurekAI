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
  'mistral-small':      { inputPerMillion: 0.15, outputPerMillion: 0.6, unit: 'tokens' },
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

// Pre-computed lookup: sorted prefixes (longest first) for greedy matching
const SORTED_PREFIXES = Object.keys(MODEL_PRICING).sort((a, b) => b.length - a.length);

function findMatchingPrefix(modelId: string): string | undefined {
  return SORTED_PREFIXES.find((p) => modelId.startsWith(p));
}

/** Resolve pricing by longest prefix match on model ID. */
export function resolvePricing(modelId: string): ModelPricing | null {
  const match = findMatchingPrefix(modelId);
  return match ? MODEL_PRICING[match] : null;
}
