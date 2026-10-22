/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import {
  resolvePricing,
  resolveToolPricing,
  usdPerMinute,
  MODEL_PRICING,
  PRICING_SOURCES,
  TOOL_PRICING,
} from './pricing.js';
import {
  calculateCost,
  aggregateUsage,
  calculateTotalCost,
  buildCostBreakdown,
} from './cost-calc.js';
import type { ApiUsage } from './pricing.js';
import { STT_MODELS } from './stt-models.js';
import { TTS_MODELS } from './tts-models.js';

describe('resolvePricing', () => {
  it('resolves mistral-large-2512 to mistral-large pricing', () => {
    const p = resolvePricing('mistral-large-2512');
    expect(p).toEqual(MODEL_PRICING['mistral-large']);
  });

  it('resolves mistral-large-latest to mistral-large pricing', () => {
    expect(resolvePricing('mistral-large-latest')).toEqual(MODEL_PRICING['mistral-large']);
  });

  it('resolves Large 4 (pinned id and alias) to its own pricing (longer prefix wins)', () => {
    expect(resolvePricing('mistral-large-4-0')).toEqual(MODEL_PRICING['mistral-large-4']);
    expect(resolvePricing('mistral-large-4')).toEqual(MODEL_PRICING['mistral-large-4']);
    expect(MODEL_PRICING['mistral-large-4']).toEqual({
      inputPerMillion: 1.36,
      outputPerMillion: 4.18,
      unit: 'tokens',
    });
  });

  it('resolves voxtral-mini-tts-2603 to TTS pricing (longer prefix wins)', () => {
    const p = resolvePricing('voxtral-mini-tts-2603');
    expect(p).toEqual(MODEL_PRICING['voxtral-mini-tts']);
  });

  it('resolves voxtral-mini-latest to STT pricing', () => {
    const p = resolvePricing('voxtral-mini-latest');
    expect(p).toEqual(MODEL_PRICING['voxtral-mini']);
  });

  it('resolves the pinned Transcribe 2 (voxtral-mini-2602) to voxtral-mini pricing', () => {
    expect(resolvePricing('voxtral-mini-2602')).toEqual(MODEL_PRICING['voxtral-mini']);
  });

  // Voxtral 3 : clés plus longues que voxtral-mini / voxtral-mini-tts, pour l'id épinglé `-3-0`
  // comme pour son alias `-3`. Sans elles, TTS 3 était compté 16 $ et Mini Transcribe 3 au tarif
  // de Transcribe 2 ; Small Transcribe 3 n'avait aucun tarif.
  it.each([
    ['voxtral-mini-transcribe-3-0', 'voxtral-mini-transcribe-3'],
    ['voxtral-mini-transcribe-3', 'voxtral-mini-transcribe-3'],
    ['voxtral-small-transcribe-3-0', 'voxtral-small-transcribe-3'],
    ['voxtral-mini-tts-3-0', 'voxtral-mini-tts-3'],
  ])('resolves Voxtral 3 %s to its own pricing (%s, longer prefix wins)', (model, key) => {
    expect(resolvePricing(model)).toEqual(MODEL_PRICING[key]);
  });

  it('TTS 3 tariff: $13/M chars (Voxtral TTS stays at $16)', () => {
    expect(MODEL_PRICING['voxtral-mini-tts-3']).toEqual({
      inputPerMillion: 13,
      outputPerMillion: 0,
      unit: 'characters',
    });
    expect(MODEL_PRICING['voxtral-mini-tts'].inputPerMillion).toBe(16);
  });

  // Chaque modèle proposé dans les Réglages a un tarif de la bonne unité : sans lui, son coût
  // serait compté 0 $ (et un warn « model without pricing » à chaque appel).
  it.each(STT_MODELS)('STT model %s is priced per audio second', (model) => {
    const p = resolvePricing(model);
    expect(p?.unit).toBe('audio-seconds');
    expect(p?.inputPerMillion).toBeGreaterThan(0);
  });

  it.each(TTS_MODELS)('TTS model %s is priced per character', (model) => {
    const p = resolvePricing(model);
    expect(p?.unit).toBe('characters');
    expect(p?.inputPerMillion).toBeGreaterThan(0);
  });

  it('resolves mistral-ocr-4-0 to OCR 4 pricing (longer prefix wins over mistral-ocr)', () => {
    expect(resolvePricing('mistral-ocr-4-0')).toEqual(MODEL_PRICING['mistral-ocr-4']);
  });

  it('resolves mistral-ocr-4-1 to OCR 4 pricing (same billing model as 4-0)', () => {
    expect(resolvePricing('mistral-ocr-4-1')).toEqual(MODEL_PRICING['mistral-ocr-4']);
  });

  it('resolves mistral-ocr-2512 to OCR 3 pricing', () => {
    expect(resolvePricing('mistral-ocr-2512')).toEqual(MODEL_PRICING['mistral-ocr']);
  });

  it('resolves mistral-medium-latest to mistral-medium pricing', () => {
    expect(resolvePricing('mistral-medium-latest')).toEqual(MODEL_PRICING['mistral-medium']);
  });

  it('returns null for unknown model', () => {
    expect(resolvePricing('gpt-4o')).toBeNull();
  });
});

describe('calculateCost', () => {
  it('calculates token-based cost for mistral-large', () => {
    const usage: ApiUsage = {
      promptTokens: 1000,
      completionTokens: 500,
      model: 'mistral-large-2512',
    };
    // (1000 * 0.5 + 500 * 1.5) / 1M = (500 + 750) / 1M = 0.00125
    expect(calculateCost(usage)).toBeCloseTo(0.00125, 6);
  });

  it('calculates character-based cost for TTS', () => {
    const usage: ApiUsage = { inputCharacters: 5000, model: 'voxtral-mini-tts-2603' };
    // 5000 * 16 / 1M = 0.08
    expect(calculateCost(usage)).toBeCloseTo(0.08, 6);
  });

  it('calculates page-based cost for OCR', () => {
    const usage: ApiUsage = { pagesProcessed: 3, model: 'mistral-ocr-2512' };
    // 3 * 2000 / 1M = 0.006
    expect(calculateCost(usage)).toBeCloseTo(0.006, 6);
  });

  it('calculates page-based cost for OCR 4 (2x OCR 3)', () => {
    const usage: ApiUsage = { pagesProcessed: 3, model: 'mistral-ocr-4-0' };
    // 3 * 4000 / 1M = 0.012
    expect(calculateCost(usage)).toBeCloseTo(0.012, 6);
  });

  it('calculates token-based cost for mistral-medium', () => {
    const usage: ApiUsage = {
      promptTokens: 1000,
      completionTokens: 500,
      model: 'mistral-medium-latest',
    };
    // (1000 * 1.5 + 500 * 7.5) / 1M = (1500 + 3750) / 1M = 0.00525
    expect(calculateCost(usage)).toBeCloseTo(0.00525, 6);
  });

  it('calculates audio-second cost for STT', () => {
    const usage: ApiUsage = { promptAudioSeconds: 60, model: 'voxtral-mini-latest' };
    // 60 * 50 / 1M = 0.003
    expect(calculateCost(usage)).toBeCloseTo(0.003, 6);
  });

  it.each([
    ['voxtral-mini-2602', 0.003],
    ['voxtral-mini-transcribe-3-0', 0.0035],
    ['voxtral-small-transcribe-3-0', 0.004],
  ])('one minute of audio with %s costs its per-minute price', (model, perMinute) => {
    expect(calculateCost({ promptAudioSeconds: 60, model })).toBeCloseTo(perMinute, 12);
  });

  it('calculates character-based cost for TTS 3 at its own price', () => {
    // 5000 * 13 / 1M = 0.065 (0.08 au tarif de Voxtral TTS)
    expect(calculateCost({ inputCharacters: 5000, model: 'voxtral-mini-tts-3-0' })).toBeCloseTo(
      0.065,
      12,
    );
  });

  it('costs $0 for moderation (Moderation 2 « Free », gratuité annoncée temporaire)', () => {
    const usage: ApiUsage = {
      promptTokens: 1000,
      completionTokens: 100,
      model: 'mistral-moderation-2603',
    };
    // Tarif CONNU (resolvePricing non null) mais gratuit, en entrée comme en sortie.
    expect(resolvePricing('mistral-moderation-2603')).toEqual({
      inputPerMillion: 0,
      outputPerMillion: 0,
      unit: 'tokens',
    });
    expect(calculateCost(usage)).toBe(0);
  });

  it('returns 0 for unknown model', () => {
    const usage: ApiUsage = { promptTokens: 1000, model: 'unknown-model' };
    expect(calculateCost(usage)).toBe(0);
  });

  it('calculates 0 when promptTokens and completionTokens are undefined', () => {
    const usage: ApiUsage = { model: 'mistral-large-2512' };
    expect(calculateCost(usage)).toBe(0);
  });
});

describe('aggregateUsage', () => {
  it('sums tokens across multiple entries', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 100, completionTokens: 50, totalTokens: 150, model: 'mistral-large-latest' },
      { promptTokens: 200, completionTokens: 100, totalTokens: 300, model: 'mistral-large-latest' },
    ];
    const agg = aggregateUsage(entries);
    expect(agg.promptTokens).toBe(300);
    expect(agg.completionTokens).toBe(150);
    expect(agg.totalTokens).toBe(450);
    expect(agg.callCount).toBe(2);
  });

  it('aggregates mixed usage types', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 100, completionTokens: 50, totalTokens: 150, model: 'mistral-large-latest' },
      { inputCharacters: 3000, model: 'voxtral-mini-tts-2603' },
    ];
    const agg = aggregateUsage(entries);
    expect(agg.promptTokens).toBe(100);
    expect(agg.inputCharacters).toBe(3000);
    expect(agg.callCount).toBe(2);
  });

  it('leaves optional fields undefined when not present', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 100, completionTokens: 50, totalTokens: 150, model: 'mistral-large-latest' },
    ];
    const agg = aggregateUsage(entries);
    expect(agg.promptAudioSeconds).toBeUndefined();
    expect(agg.pagesProcessed).toBeUndefined();
    expect(agg.inputCharacters).toBeUndefined();
    expect(agg.toolCalls).toBeUndefined();
    expect(agg.connectorTokens).toBeUndefined();
  });
});

describe('calculateTotalCost', () => {
  it('sums costs across entries', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 1000, completionTokens: 500, model: 'mistral-large-2512' },
      { inputCharacters: 5000, model: 'voxtral-mini-tts-2603' },
    ];
    const total = calculateTotalCost(entries);
    // 0.00125 + 0.08 = 0.08125
    expect(total).toBeCloseTo(0.08125, 6);
  });
});

describe('buildCostBreakdown', () => {
  it('builds token breakdown lines', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 1000, completionTokens: 500, model: 'mistral-large-2512' },
    ];
    const lines = buildCostBreakdown(entries);
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain('1000 tokens in');
    expect(lines[0]).toContain('$0.5/M');
    expect(lines[1]).toContain('500 tokens out');
    expect(lines[1]).toContain('$1.5/M');
  });

  it('builds character breakdown for TTS', () => {
    const entries: ApiUsage[] = [{ inputCharacters: 5000, model: 'voxtral-mini-tts-2603' }];
    const lines = buildCostBreakdown(entries);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('5000 chars');
  });

  it('builds page breakdown for OCR', () => {
    const entries: ApiUsage[] = [{ pagesProcessed: 3, model: 'mistral-ocr-2512' }];
    const lines = buildCostBreakdown(entries);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('3 page(s)');
  });

  it('builds audio breakdown for STT', () => {
    const entries: ApiUsage[] = [{ promptAudioSeconds: 60, model: 'voxtral-mini-latest' }];
    const lines = buildCostBreakdown(entries);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('60.0s audio');
  });

  // Prix par minute affiché comme sur les fiches Mistral (4 décimales), chaque modèle au sien.
  it.each([
    ['voxtral-mini-2602', '60.0s audio × $0.0030/min = $0.0030'],
    ['voxtral-mini-transcribe-3-0', '60.0s audio × $0.0035/min = $0.0035'],
    ['voxtral-small-transcribe-3-0', '60.0s audio × $0.0040/min = $0.0040'],
  ])('STT breakdown line for %s shows its per-minute price', (model, line) => {
    expect(buildCostBreakdown([{ promptAudioSeconds: 60, model }])).toEqual([line]);
  });

  it('TTS 3 breakdown line shows $13/M', () => {
    expect(buildCostBreakdown([{ inputCharacters: 5000, model: 'voxtral-mini-tts-3-0' }])).toEqual([
      '5000 chars × $13/M = $0.0650',
    ]);
  });

  it('skips unknown models', () => {
    const entries: ApiUsage[] = [{ promptTokens: 100, model: 'unknown-model' }];
    expect(buildCostBreakdown(entries)).toHaveLength(0);
  });

  it('skips zero-quantity entries', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 0, completionTokens: 0, model: 'mistral-large-latest' },
    ];
    expect(buildCostBreakdown(entries)).toHaveLength(0);
  });
});

// Prix STT annoncé par minute → tarif par million de secondes, et retour (Réglages, détail du coût).
describe('usdPerMinute', () => {
  it('rend le prix par minute de chaque tarif audio', () => {
    expect(usdPerMinute(MODEL_PRICING['voxtral-mini'])).toBeCloseTo(0.003, 12);
    expect(usdPerMinute(MODEL_PRICING['voxtral-mini-transcribe-3'])).toBeCloseTo(0.0035, 12);
    expect(usdPerMinute(MODEL_PRICING['voxtral-small-transcribe-3'])).toBeCloseTo(0.004, 12);
  });

  it('Transcribe 2 garde exactement son tarif historique (50 $ par million de secondes)', () => {
    expect(MODEL_PRICING['voxtral-mini']).toEqual({
      inputPerMillion: 50,
      outputPerMillion: 0,
      unit: 'audio-seconds',
    });
  });

  it('inverse la conversion par minute : 60 s × tarif = prix par minute', () => {
    expect(usdPerMinute({ inputPerMillion: 50, outputPerMillion: 0, unit: 'audio-seconds' })).toBe(
      0.003,
    );
  });
});

describe('PRICING_SOURCES', () => {
  it('has a source URL for every pricing entry', () => {
    for (const key of Object.keys(MODEL_PRICING)) {
      expect(PRICING_SOURCES[key], `Missing source URL for ${key}`).toBeDefined();
      expect(PRICING_SOURCES[key]).toContain('https://docs.mistral.ai/');
    }
  });

  it('uses canonical model-card URLs (no /model-cards/ redirect)', () => {
    for (const url of Object.values(PRICING_SOURCES)) {
      expect(url).toMatch(/^https:\/\/docs\.mistral\.ai\/models\/[a-z0-9-]+$/);
    }
  });

  it('points OCR 4 at the card of the model actually sent (OCR 4.0)', () => {
    expect(PRICING_SOURCES['mistral-ocr-4']).toBe('https://docs.mistral.ai/models/ocr-4-0');
  });
});

describe('TOOL_PRICING / resolveToolPricing', () => {
  it('tarifs par appel de mistral.ai/pricing/api (2026-09-26)', () => {
    expect(TOOL_PRICING).toEqual({
      web_search: { perCall: 0.03 },
      image_generation: { perCall: 0.1 },
    });
  });

  it("résout un outil par son nom exact d'API", () => {
    expect(resolveToolPricing('web_search')).toEqual({ perCall: 0.03 });
    expect(resolveToolPricing('image_generation')).toEqual({ perCall: 0.1 });
  });

  it("null pour un outil inconnu, y compris un nom hérité d'Object.prototype", () => {
    for (const tool of ['code_interpreter', 'web_search_premium', 'constructor', '__proto__']) {
      expect(resolveToolPricing(tool)).toBeNull();
    }
  });
});

describe("frais d'outils des agents (cost-calc)", () => {
  // Usages réels des agents capturés le 2026-09-26 (modèle de l'agent : mistral-large-latest).
  const IMAGE: ApiUsage = {
    promptTokens: 187,
    completionTokens: 464,
    totalTokens: 943,
    connectorTokens: 292,
    toolCalls: { image_generation: 1 },
    model: 'mistral-large-latest',
  };
  const WEB_SEARCH: ApiUsage = {
    promptTokens: 789,
    completionTokens: 94,
    totalTokens: 8100,
    connectorTokens: 7217,
    toolCalls: { web_search: 1 },
    model: 'mistral-large-latest',
  };

  it('image : +0,10 $ par rapport au seul coût du modèle', () => {
    const modelOnly: ApiUsage = { ...IMAGE, toolCalls: undefined };
    expect(calculateCost(IMAGE) - calculateCost(modelOnly)).toBeCloseTo(0.1, 10);
    // (187 + 292) × 0,5/M + 464 × 1,5/M + 0,10
    expect(calculateCost(IMAGE)).toBeCloseTo(0.1009355, 10);
  });

  it('deux recherches web : +0,06 $', () => {
    const usage: ApiUsage = {
      promptTokens: 1000,
      completionTokens: 100,
      toolCalls: { web_search: 2 },
      model: 'mistral-large-latest',
    };
    // (1000 × 0,5 + 100 × 1,5)/M = 0,00065, + 2 × 0,03
    expect(calculateCost(usage)).toBeCloseTo(0.06065, 10);
  });

  it('outil inconnu : 0 $, seul le modèle est facturé', () => {
    const usage: ApiUsage = {
      promptTokens: 1000,
      completionTokens: 100,
      toolCalls: { code_interpreter: 3 },
      model: 'mistral-large-latest',
    };
    expect(calculateCost(usage)).toBeCloseTo(0.00065, 10);
  });

  it("connectorTokens facturés au tarif d'entrée du modèle de l'agent", () => {
    // 7217 × 0,5/M (large) ; 7217 × 1,5/M (medium)
    expect(calculateCost({ connectorTokens: 7217, model: 'mistral-large-latest' })).toBeCloseTo(
      0.0036085,
      10,
    );
    expect(calculateCost({ connectorTokens: 7217, model: 'mistral-medium-latest' })).toBeCloseTo(
      0.0108255,
      10,
    );
  });

  it("frais d'outil dus même sans tarif connu pour le modèle de l'agent", () => {
    const usage: ApiUsage = { toolCalls: { image_generation: 1 }, model: 'unknown-agent-model' };
    expect(calculateCost(usage)).toBeCloseTo(0.1, 10);
  });

  it('calculateTotalCost additionne modèle et outils de plusieurs appels', () => {
    // image 0,1009355 + recherche web ((789 + 7217) × 0,5 + 94 × 1,5)/M + 0,03 = 0,034144
    expect(calculateTotalCost([IMAGE, WEB_SEARCH])).toBeCloseTo(0.1350795, 5);
  });

  it('aggregateUsage fusionne toolCalls (par outil) et connectorTokens', () => {
    const chat: ApiUsage = {
      promptTokens: 10,
      completionTokens: 5,
      totalTokens: 15,
      model: 'mistral-small-latest',
    };
    const agg = aggregateUsage([IMAGE, WEB_SEARCH, { ...WEB_SEARCH, connectorTokens: 100 }, chat]);
    expect(agg.toolCalls).toEqual({ image_generation: 1, web_search: 2 });
    expect(agg.connectorTokens).toBe(292 + 7217 + 100);
    expect(agg.totalTokens).toBe(943 + 8100 + 8100 + 15);
    expect(agg.callCount).toBe(4);
  });

  it("buildCostBreakdown : tokens, tokens d'outil et une ligne par outil", () => {
    expect(buildCostBreakdown([IMAGE])).toEqual([
      '187 tokens in × $0.5/M = $0',
      '292 tool tokens in × $0.5/M = $0.0001',
      '464 tokens out × $1.5/M = $0.0007',
      '1 × image_generation × $0.10/call = $0.1000',
    ]);
    const twoSearches: ApiUsage = { toolCalls: { web_search: 2 }, model: 'mistral-large-latest' };
    expect(buildCostBreakdown([twoSearches])).toEqual(['2 × web_search × $0.03/call = $0.0600']);
  });

  it("buildCostBreakdown : ligne d'outil même sans tarif modèle, aucune pour un outil inconnu ou à 0 appel", () => {
    expect(
      buildCostBreakdown([{ toolCalls: { web_search: 1 }, model: 'unknown-agent-model' }]),
    ).toEqual(['1 × web_search × $0.03/call = $0.0300']);
    expect(
      buildCostBreakdown([
        { toolCalls: { code_interpreter: 1, image_generation: 0 }, model: 'mistral-large-latest' },
      ]),
    ).toEqual([]);
  });
});
