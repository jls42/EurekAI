import type { ApiUsage, BillingUnit, ModelPricing, GenerationUsage, ToolCalls } from './pricing.js';
import { resolvePricing, resolveToolPricing } from './pricing.js';

const QUANTITY_BY_UNIT = {
  tokens: (usage: ApiUsage) => (usage.promptTokens ?? 0) + (usage.completionTokens ?? 0),
  characters: (usage: ApiUsage) => usage.inputCharacters ?? 0,
  pages: (usage: ApiUsage) => usage.pagesProcessed ?? 0,
  'audio-seconds': (usage: ApiUsage) => usage.promptAudioSeconds ?? 0,
} satisfies Record<BillingUnit, (usage: ApiUsage) => number>;

// cf. CLAUDE.md "Pièges Lizard"
const getQuantity = (usage: ApiUsage, unit: BillingUnit): number => QUANTITY_BY_UNIT[unit](usage);

// Coût du modèle. `connectorTokens` (tokens produits par les outils d'un agent, hors
// `promptTokens`) est compté au tarif d'entrée du modèle de l'agent : estimation prudente.
const modelCost = (usage: ApiUsage): number => {
  const pricing = resolvePricing(usage.model);
  if (!pricing) return 0;
  if (pricing.unit === 'tokens') {
    const inputTokens = (usage.promptTokens || 0) + (usage.connectorTokens || 0);
    return (
      (inputTokens * pricing.inputPerMillion +
        (usage.completionTokens || 0) * pricing.outputPerMillion) /
      1_000_000
    );
  }
  return (getQuantity(usage, pricing.unit) * pricing.inputPerMillion) / 1_000_000;
};

// Frais fixes des outils d'un agent : Σ tarif par appel × nombre d'appels (outil inconnu → 0).
const toolCallsCost = (toolCalls: ToolCalls | undefined): number => {
  let cost = 0;
  for (const [tool, count] of Object.entries(toolCalls || {})) {
    cost += (resolveToolPricing(tool)?.perCall || 0) * count;
  }
  return cost;
};

/** Calculate cost in USD for a single API call: model cost + agent tool fees. */
export function calculateCost(usage: ApiUsage): number {
  return modelCost(usage) + toolCallsCost(usage.toolCalls);
}

const addOptional = (acc: number | undefined, val: number | undefined): number | undefined => {
  if (val == null) return acc;
  return (acc || 0) + val;
};

// Somme des appels d'outils par outil sur plusieurs appels API ; undefined si aucun.
const mergeToolCalls = (entries: ApiUsage[]): ToolCalls | undefined => {
  const merged = new Map<string, number>();
  for (const e of entries) {
    for (const [tool, count] of Object.entries(e.toolCalls || {})) {
      merged.set(tool, (merged.get(tool) || 0) + count);
    }
  }
  return merged.size > 0 ? Object.fromEntries(merged) : undefined;
};

/** Aggregate multiple API call usages into a single GenerationUsage. */
export function aggregateUsage(entries: ApiUsage[]): GenerationUsage {
  let promptTokens = 0,
    completionTokens = 0,
    totalTokens = 0;
  let promptAudioSeconds: number | undefined;
  let pagesProcessed: number | undefined;
  let inputCharacters: number | undefined;
  let connectorTokens: number | undefined;

  for (const e of entries) {
    promptTokens += e.promptTokens || 0;
    completionTokens += e.completionTokens || 0;
    totalTokens += e.totalTokens || 0;
    promptAudioSeconds = addOptional(promptAudioSeconds, e.promptAudioSeconds);
    pagesProcessed = addOptional(pagesProcessed, e.pagesProcessed);
    inputCharacters = addOptional(inputCharacters, e.inputCharacters);
    connectorTokens = addOptional(connectorTokens, e.connectorTokens);
  }

  return {
    promptTokens,
    completionTokens,
    totalTokens,
    promptAudioSeconds,
    pagesProcessed,
    inputCharacters,
    toolCalls: mergeToolCalls(entries),
    connectorTokens,
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

// Ligne « N <libellé> × $X/M = $Y » ; aucune si la quantité est nulle ou absente.
const perMillionLine = (label: string, quantity: number | undefined, rate: number): string[] => {
  if (!quantity) return [];
  return [costLine(`${quantity} ${label}`, `$${rate}/M`, (quantity * rate) / 1_000_000)];
};

const tokensBreakdown = (usage: ApiUsage, pricing: ModelPricing): string[] => {
  return [
    ...perMillionLine('tokens in', usage.promptTokens, pricing.inputPerMillion),
    // Tokens d'outils d'un agent : tarif d'entrée, comme dans modelCost.
    ...perMillionLine('tool tokens in', usage.connectorTokens, pricing.inputPerMillion),
    ...perMillionLine('tokens out', usage.completionTokens, pricing.outputPerMillion),
  ];
};

const charactersBreakdown = (usage: ApiUsage, pricing: ModelPricing): string[] => {
  return perMillionLine('chars', usage.inputCharacters, pricing.inputPerMillion);
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

// Une ligne par outil d'agent tarifé, ex. `1 × image_generation × $0.10/call = $0.1000`.
const toolCallsBreakdown = (toolCalls: ToolCalls | undefined): string[] => {
  const lines: string[] = [];
  for (const [tool, count] of Object.entries(toolCalls || {})) {
    const pricing = resolveToolPricing(tool);
    if (pricing && count > 0) {
      const rate = `$${pricing.perCall.toFixed(2)}/call`;
      lines.push(costLine(`${count} × ${tool}`, rate, count * pricing.perCall));
    }
  }
  return lines;
};

/** Build a human-readable cost breakdown showing the calculation per API call. */
export function buildCostBreakdown(entries: ApiUsage[]): string[] {
  const lines: string[] = [];
  for (const e of entries) {
    const pricing = resolvePricing(e.model);
    if (pricing) lines.push(...breakdownEntry(e, pricing));
    // Frais d'outils hors du `if (pricing)` : dus même sans tarif connu pour le modèle.
    lines.push(...toolCallsBreakdown(e.toolCalls));
  }
  return lines;
}
