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
  'mistral-large': { inputPerMillion: 0.5, outputPerMillion: 1.5, unit: 'tokens' },
  'mistral-medium': { inputPerMillion: 1.5, outputPerMillion: 7.5, unit: 'tokens' },
  'mistral-small': { inputPerMillion: 0.15, outputPerMillion: 0.6, unit: 'tokens' },
  'voxtral-mini-tts': { inputPerMillion: 16, outputPerMillion: 0, unit: 'characters' },
  'voxtral-mini': { inputPerMillion: 50, outputPerMillion: 0, unit: 'audio-seconds' },
  // OCR 4.x ($4/1000 pages) : 'mistral-ocr-4' plus long que 'mistral-ocr' → gagne le greedy-prefix
  // pour mistral-ocr-4-0 (défaut) ET mistral-ocr-4-1 (même billing_model_name `mistral-ocr-4` sur
  // /v1/models).
  'mistral-ocr-4': { inputPerMillion: 4000, outputPerMillion: 0, unit: 'pages' },
  'mistral-ocr': { inputPerMillion: 2000, outputPerMillion: 0, unit: 'pages' },
  // Moderation 2 (mistral-moderation-2603) GRATUITE : « Free » sur docs.mistral.ai/inference/pricing,
  // sur sa fiche et sur mistral.ai/pricing/api (vérifié 2026-09-25/26), avec l'infobulle officielle
  // « Free for a limited amount of time. » → gratuité TEMPORAIRE. Facturée $0.1/M tokens en entrée
  // jusqu'en juillet 2026 : re-vérifier via `npx tsx scripts/update-pricing.ts mistral-moderation`.
  // Entrée gardée à 0 (modèle connu → resolvePricing non null). Non trackée à l'exécution :
  // classifiers.moderate n'est pas wrappé par tracked-client, et le SDK 2.3.0 retire le champ `usage`
  // pourtant présent dans le JSON HTTP — à instrumenter si elle redevient payante.
  'mistral-moderation': { inputPerMillion: 0, outputPerMillion: 0, unit: 'tokens' },
};

/**
 * Fiches Mistral rendues par `scripts/update-pricing.ts`. Forme CANONIQUE `/models/<slug>` : les
 * liens `/models/model-cards/…` répondent 308 vers elle. `mistral-ocr-4` pointe la fiche du modèle
 * réellement envoyé (OCR 4.0, défaut épinglé).
 */
export const PRICING_SOURCES: Record<string, string> = {
  'mistral-large': 'https://docs.mistral.ai/models/mistral-large-3-25-12',
  'mistral-medium': 'https://docs.mistral.ai/models/mistral-medium-3-5-26-04',
  'mistral-small': 'https://docs.mistral.ai/models/mistral-small-4-0-26-03',
  'voxtral-mini-tts': 'https://docs.mistral.ai/models/voxtral-tts-26-03',
  'voxtral-mini': 'https://docs.mistral.ai/models/voxtral-mini-transcribe-26-02',
  'mistral-ocr-4': 'https://docs.mistral.ai/models/ocr-4-0',
  'mistral-ocr': 'https://docs.mistral.ai/models/ocr-3-25-12',
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
