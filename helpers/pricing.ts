export type BillingUnit = 'tokens' | 'characters' | 'pages' | 'audio-seconds';

export interface ModelPricing {
  inputPerMillion: number;
  outputPerMillion: number;
  unit: BillingUnit;
}

/** Nombre d'appels par outil serveur d'un agent (`web_search`, `image_generation`…). */
export type ToolCalls = Record<string, number>;

export interface ApiUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  promptAudioSeconds?: number;
  pagesProcessed?: number;
  inputCharacters?: number;
  /** Agents : appels d'outils serveur par nom d'outil (ex. `{ image_generation: 1 }`). */
  toolCalls?: ToolCalls;
  /** Agents : tokens produits par les outils (`usage.connector_tokens`), HORS `promptTokens`. */
  connectorTokens?: number;
  model: string;
}

export interface GenerationUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  promptAudioSeconds?: number;
  pagesProcessed?: number;
  inputCharacters?: number;
  toolCalls?: ToolCalls;
  connectorTokens?: number;
  callCount: number;
}

export interface ToolPricing {
  /** Frais fixes par appel de l'outil, en USD. */
  perCall: number;
}

/** Prix STT annoncé par minute (fiches Mistral) → tarif par million de secondes d'audio. */
const perMinute = (usd: number): ModelPricing => ({
  inputPerMillion: (usd * 1_000_000) / 60,
  outputPerMillion: 0,
  unit: 'audio-seconds',
});

/** Prix par minute d'un tarif `audio-seconds` (affichage : Réglages, détail du coût). */
export const usdPerMinute = (pricing: ModelPricing): number =>
  (pricing.inputPerMillion / 1_000_000) * 60;

/** Model pricing keyed by prefix — `mistral-large-2512` matches `mistral-large`. */
export const MODEL_PRICING: Record<string, ModelPricing> = {
  'mistral-large': { inputPerMillion: 0.5, outputPerMillion: 1.5, unit: 'tokens' },
  // Large 4 (mistral-large-4-0, option des Réglages) : plus long que 'mistral-large' → gagne le
  // greedy-prefix. Tarif PUBLIC de sa fiche (vérifié le 2026-10-08) : lancé le 2026-10-06 à -50 %
  // « pendant 2 semaines » (changelog, sans date de fin), promo NON reportée → le coût affiché est
  // surestimé jusqu'à sa fin. Entrée en cache (0,14 $/M) comptée au tarif d'entrée, comme partout.
  'mistral-large-4': { inputPerMillion: 1.36, outputPerMillion: 4.18, unit: 'tokens' },
  'mistral-medium': { inputPerMillion: 1.5, outputPerMillion: 7.5, unit: 'tokens' },
  'mistral-small': { inputPerMillion: 0.15, outputPerMillion: 0.6, unit: 'tokens' },
  // Voxtral 3 (2026-10-20, Public Preview, options des Réglages ; fiches vérifiées le 2026-10-21) :
  // clés plus longues que 'voxtral-mini-tts' / 'voxtral-mini' → gagnent le greedy-prefix pour l'id
  // épinglé `-3-0` comme pour son alias `-3`. Sans elles, TTS 3 était compté 16 $ au lieu de 13 $
  // et Mini Transcribe 3 0,003 $/min au lieu de 0,0035 ; Small Transcribe 3 n'avait aucun tarif.
  // `voxtral-mini-transcribe-realtime-3-0` (temps réel, 0,008 $/min) tomberait sur 'voxtral-mini' :
  // l'app ne l'envoie pas (pas de transcription en flux).
  'voxtral-mini-tts-3': { inputPerMillion: 13, outputPerMillion: 0, unit: 'characters' },
  'voxtral-mini-transcribe-3': perMinute(0.0035),
  'voxtral-small-transcribe-3': perMinute(0.004),
  'voxtral-mini-tts': { inputPerMillion: 16, outputPerMillion: 0, unit: 'characters' },
  'voxtral-mini': perMinute(0.003),
  // OCR 4.x ($4/1000 pages) : 'mistral-ocr-4' plus long que 'mistral-ocr' → gagne le greedy-prefix
  // pour mistral-ocr-4-1 (défaut depuis la v1.7.6) comme pour l'ancien mistral-ocr-4-0, retiré le
  // 2026-09-30 (même billing_model_name `mistral-ocr-4` sur /v1/models).
  'mistral-ocr-4': { inputPerMillion: 4000, outputPerMillion: 0, unit: 'pages' },
  'mistral-ocr': { inputPerMillion: 2000, outputPerMillion: 0, unit: 'pages' },
  // Moderation 2 (mistral-moderation-2603) GRATUITE : « Free » sur docs.mistral.ai/inference/pricing,
  // sur sa fiche et sur mistral.ai/pricing/api (vérifié 2026-09-25/26), avec l'infobulle officielle
  // « Free for a limited amount of time. » → gratuité TEMPORAIRE. Facturée $0.1/M tokens en entrée
  // jusqu'en juillet 2026 : re-vérifier via `npx tsx scripts/update-pricing.ts mistral-moderation`.
  // Entrée gardée à 0 (modèle connu → resolvePricing non null). Non trackée à l'exécution :
  // classifiers.moderate n'est pas wrappé par tracked-client, et le SDK (de la 2.3.0 à la 3.2.0) retire le
  // champ `usage` pourtant présent dans le JSON HTTP — à instrumenter si elle redevient payante.
  'mistral-moderation': { inputPerMillion: 0, outputPerMillion: 0, unit: 'tokens' },
};

/**
 * Fiches Mistral rendues par `scripts/update-pricing.ts`. Forme CANONIQUE `/models/<slug>` : les
 * liens `/models/model-cards/…` répondent 308 vers elle. `mistral-ocr-4` pointe la fiche du modèle
 * réellement envoyé (OCR 4.0, défaut épinglé).
 */
export const PRICING_SOURCES: Record<string, string> = {
  'mistral-large': 'https://docs.mistral.ai/models/mistral-large-3-25-12',
  'mistral-large-4': 'https://docs.mistral.ai/models/mistral-large-4-0',
  'mistral-medium': 'https://docs.mistral.ai/models/mistral-medium-3-5-26-04',
  'mistral-small': 'https://docs.mistral.ai/models/mistral-small-4-0-26-03',
  'voxtral-mini-tts-3': 'https://docs.mistral.ai/models/voxtral-mini-tts-3-0',
  'voxtral-mini-transcribe-3': 'https://docs.mistral.ai/models/voxtral-mini-transcribe-3-0',
  'voxtral-small-transcribe-3': 'https://docs.mistral.ai/models/voxtral-small-transcribe-3-0',
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

/**
 * Frais par appel des outils serveur des agents (`beta.conversations.start`), facturés EN PLUS des
 * tokens du modèle de l'agent (« Model cost per M token + tool call »). Tarifs de
 * https://mistral.ai/pricing/api vérifiés le 2026-09-26 : `web_search` 30 $/1000 appels,
 * `image_generation` 100 $/1000 images. Clés = noms exacts renvoyés par l'API (`usage.connectors`,
 * sorties `tool.execution`). Hors `MODEL_PRICING` (unité « appel », pas un préfixe de modèle) et
 * NON surveillés par `scripts/update-pricing.ts` (fiches modèles seulement) : re-vérifier à la main.
 */
export const TOOL_PRICING: Record<string, ToolPricing> = {
  web_search: { perCall: 0.03 },
  image_generation: { perCall: 0.1 },
};

// Map : un nom d'outil venu de l'API (`constructor`, `__proto__`…) ne résout jamais un membre
// hérité d'Object.prototype.
const TOOL_PRICING_BY_NAME = new Map(Object.entries(TOOL_PRICING));

/** Tarif d'un outil d'agent par son nom exact, ou null s'il est inconnu. */
export function resolveToolPricing(tool: string): ToolPricing | null {
  return TOOL_PRICING_BY_NAME.get(tool) ?? null;
}
