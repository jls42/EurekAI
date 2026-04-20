import type { ApiUsage, BillingUnit, ModelPricing, GenerationUsage } from './pricing.js';
import { resolvePricing } from './pricing.js';

const QUANTITY_BY_UNIT = {
  tokens: (usage: ApiUsage) => (usage.promptTokens ?? 0) + (usage.completionTokens ?? 0),
  characters: (usage: ApiUsage) => usage.inputCharacters ?? 0,
  pages: (usage: ApiUsage) => usage.pagesProcessed ?? 0,
  'audio-seconds': (usage: ApiUsage) => usage.promptAudioSeconds ?? 0,
} satisfies Record<BillingUnit, (usage: ApiUsage) => number>;

// cf. CLAUDE.md "Pièges Lizard"
const getQuantity = (usage: ApiUsage, unit: BillingUnit): number => QUANTITY_BY_UNIT[unit](usage);

/** Calculate cost in USD for a single API call. */
export function calculateCost(usage: ApiUsage): number {
  const pricing = resolvePricing(usage.model);
  if (!pricing) return 0;
  if (pricing.unit === 'tokens') {
    return (
      ((usage.promptTokens || 0) * pricing.inputPerMillion +
        (usage.completionTokens || 0) * pricing.outputPerMillion) /
      1_000_000
    );
  }
  return (getQuantity(usage, pricing.unit) * pricing.inputPerMillion) / 1_000_000;
}

const addOptional = (acc: number | undefined, val: number | undefined): number | undefined => {
  if (val == null) return acc;
  return (acc || 0) + val;
};

/** Aggregate multiple API call usages into a single GenerationUsage. */
export function aggregateUsage(entries: ApiUsage[]): GenerationUsage {
  let promptTokens = 0,
    completionTokens = 0,
    totalTokens = 0;
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

  return {
    promptTokens,
    completionTokens,
    totalTokens,
    promptAudioSeconds,
    pagesProcessed,
    inputCharacters,
    callCount: entries.length,
  };
}

/** Calculate total cost in USD across multiple API calls. */
export function calculateTotalCost(entries: ApiUsage[]): number {
  let total = 0;
  for (const e of entries) total += calculateCost(e);
  return Math.round(total * 1_000_000) / 1_000_000;
}

const fmt = (n: number): string => (n < 0.0001 ? '$0' : `$${n.toFixed(4)}`);

const costLine = (qty: string, rate: string, cost: number): string =>
  `${qty} × ${rate} = ${fmt(cost)}`;

const tokensBreakdown = (usage: ApiUsage, pricing: ModelPricing): string[] => {
  const lines: string[] = [];
  if (usage.promptTokens) {
    lines.push(
      costLine(
        `${usage.promptTokens} tokens in`,
        `$${pricing.inputPerMillion}/M`,
        (usage.promptTokens * pricing.inputPerMillion) / 1_000_000,
      ),
    );
  }
  if (usage.completionTokens) {
    lines.push(
      costLine(
        `${usage.completionTokens} tokens out`,
        `$${pricing.outputPerMillion}/M`,
        (usage.completionTokens * pricing.outputPerMillion) / 1_000_000,
      ),
    );
  }
  return lines;
};

const charactersBreakdown = (usage: ApiUsage, pricing: ModelPricing): string[] => {
  if (!usage.inputCharacters) return [];
  return [
    costLine(
      `${usage.inputCharacters} chars`,
      `$${pricing.inputPerMillion}/M`,
      (usage.inputCharacters * pricing.inputPerMillion) / 1_000_000,
    ),
  ];
};

const pagesBreakdown = (usage: ApiUsage, pricing: ModelPricing): string[] => {
  if (!usage.pagesProcessed) return [];
  return [
    costLine(
      `${usage.pagesProcessed} page(s)`,
      `$${pricing.inputPerMillion / 1000}/1K pages`,
      (usage.pagesProcessed * pricing.inputPerMillion) / 1_000_000,
    ),
  ];
};

const audioBreakdown = (usage: ApiUsage, pricing: ModelPricing): string[] => {
  if (!usage.promptAudioSeconds) return [];
  return [
    costLine(
      `${usage.promptAudioSeconds.toFixed(1)}s audio`,
      `$${((pricing.inputPerMillion / 1_000_000) * 60).toFixed(4)}/min`,
      (usage.promptAudioSeconds * pricing.inputPerMillion) / 1_000_000,
    ),
  ];
};

const BREAKDOWN_BY_UNIT = {
  tokens: tokensBreakdown,
  characters: charactersBreakdown,
  pages: pagesBreakdown,
  'audio-seconds': audioBreakdown,
} satisfies Record<BillingUnit, (usage: ApiUsage, pricing: ModelPricing) => string[]>;

const breakdownEntry = (usage: ApiUsage, pricing: ModelPricing): string[] =>
  BREAKDOWN_BY_UNIT[pricing.unit](usage, pricing);

/** Build a human-readable cost breakdown showing the calculation per API call. */
export function buildCostBreakdown(entries: ApiUsage[]): string[] {
  const lines: string[] = [];
  for (const e of entries) {
    const pricing = resolvePricing(e.model);
    if (pricing) lines.push(...breakdownEntry(e, pricing));
  }
  return lines;
}
