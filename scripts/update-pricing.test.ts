/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (faux positifs) ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import { extractPriceSnippets, formatCurrent, PAGE_FALLBACK } from './update-pricing.js';

// Extrait RÉEL de https://mistral.ai/pricing/api/ (rendu Lightpanda du 2026-09-25, lignes vides
// retirées) : Classifier 8B (description « like moderation », prix `$…`), puis Mistral Moderation 2
// (« Free », sans unité), puis Codestral Embed (dont l'icône suit immédiatement le « Free »).
const PRICING_API_MD = [
  '![](https://mistral.ai/cms-media/api/media/file/Icon-Model-Classifier.svg)',
  'Classifier API model \\(8B\\)',
  'Fine\\-tune Ministral 8B for classification tasks, like moderation, sentiment analysis, fraud detection, and more.',
  'Classifier APIs',
  'Training cost \\(/M tokens\\)  ',
  '$1',
  'Storage cost \\(per month per model\\)  ',
  '$2',
  'Input \\(/M tokens\\) ',
  '$0.04',
  'Output \\(/M tokens\\) ',
  '$0.04',
  '![](https://mistral.ai/cms-media/api/media/file/Icon-Model-Moderation.svg)',
  'Mistral Moderation 2',
  'A classifier service for text content moderation.',
  'Classifier APIs',
  'Free ',
  '![](https://mistral.ai/cms-media/api/media/file/Icon-Model-Codestral%20Embed.svg)',
  'Codestral Embed',
  'Premier',
  'State\\-of\\-the\\-art embeddings for code and natural language queries.',
  'Embedding',
  'Coding',
  'Input \\(/M tokens\\) ',
  '$0.15',
].join('\n');

// Extrait RÉEL de la fiche docs.mistral.ai/models/mistral-moderation-26-03 (rendu du 2026-09-25) :
// le widget prix affiche « Free » deux fois (infobulle `i`, puis tableau), sans unité.
const MODERATION_CARD_MD = [
  'mistral\\-moderation\\-2603',
  'Speed',
  'Performance',
  'Modalities',
  'Context',
  'i',
  '128k',
  'Price',
  'i',
  'Free',
  'Speed',
  'Performance',
  'Modalities',
  'Context',
  '128k',
  'Price',
  'Free',
  'FEATURES',
].join('\n');

describe('extractPriceSnippets', () => {
  it('captures a $price with its adjacent context (pages — value before unit)', () => {
    const md = 'Price\n$2\n/1000 Pages\n$3\n/1000 Annotated Pages';
    const snippets = extractPriceSnippets(md);
    expect(snippets).toContain('Price $2 /1000 Pages');
    expect(snippets.some((s) => s.includes('$3') && s.includes('Annotated'))).toBe(true);
  });

  it('captures token prices (unit before value)', () => {
    const md = 'Input (/M tokens)\n$0.5\nOutput (/M tokens)\n$1.5';
    const snippets = extractPriceSnippets(md);
    expect(snippets.some((s) => s.includes('$0.5') && s.includes('tokens'))).toBe(true);
    expect(snippets.some((s) => s.includes('$1.5'))).toBe(true);
  });

  it('returns [] when there is no $price', () => {
    expect(extractPriceSnippets('no price here\njust text')).toEqual([]);
  });

  it('reads promotional prices, list price struck first (real Large 4 card, 2026-10-08)', () => {
    const md = [
      'Price',
      'i',
      'USDEUR',
      'Sale price',
      '~~Original price: $1.36~~Sale price: $0.68',
      '',
      'Input/M Tokens',
      '~~Original price: $0.14~~Sale price: $0.07',
      '',
      'Cached input/M Tokens',
      '~~Original price: $4.18~~Sale price: $2.09',
      '',
      'Output/M Tokens',
      'Speed',
    ].join('\n');
    expect(extractPriceSnippets(md)).toEqual([
      'Sale price ~~Original price: $1.36~~Sale price: $0.68 Input/M Tokens',
      'Input/M Tokens ~~Original price: $0.14~~Sale price: $0.07 Cached input/M Tokens',
      'Cached input/M Tokens ~~Original price: $4.18~~Sale price: $2.09 Output/M Tokens',
    ]);
  });

  it('dedupes identical snippets', () => {
    const md = 'Price\n$2\n/1000 Pages\nPrice\n$2\n/1000 Pages';
    expect(extractPriceSnippets(md)).toEqual(['Price $2 /1000 Pages']);
  });

  it('ignores $values without a pricing unit (e.g. $0 in Speed/Features sections)', () => {
    expect(extractPriceSnippets('Speed\n$0\nFeatures\n$0\nFEATURESWEIGHTS')).toEqual([]);
  });

  it('reads « Free » alone on its line as $0, without unit (real moderation card)', () => {
    expect(extractPriceSnippets(MODERATION_CARD_MD)).toEqual([
      'i Free (= $0) Speed',
      'Price Free (= $0) FEATURES',
    ]);
  });

  it('reads the French « Gratuit » the same way', () => {
    expect(extractPriceSnippets('Prix\nGratuit\nFONCTIONNALITÉS')).toEqual([
      'Prix Gratuit (= $0) FONCTIONNALITÉS',
    ]);
  });

  it('does not take the « Free for a limited amount of time. » tooltip for a price', () => {
    expect(extractPriceSnippets('Price\nFree for a limited amount of time.\nSpeed')).toEqual([]);
  });

  it('keeps only the price whose BLOCK names the model (real /pricing/api page fallback)', () => {
    // Le « Free » de Moderation 2 : son bloc (depuis le prix précédent) contient « Mistral
    // Moderation 2 », alors que ses voisins ±1 (`Classifier APIs`, icône Codestral Embed) non ; le
    // `$1` du Classifier 8B (« like moderation ») n'est pas retenu.
    expect(extractPriceSnippets(PRICING_API_MD, PAGE_FALLBACK['mistral-moderation'])).toEqual([
      'Classifier APIs Free (= $0) ![](https://mistral.ai/cms-media/api/media/file/Icon-Model-Codestral%20Embed.svg)',
    ]);
  });

  it('anchors moderation on the model NAME, never on the bare word', () => {
    const anchor = PAGE_FALLBACK['mistral-moderation'];
    expect(anchor.test('Mistral Moderation 2')).toBe(true);
    expect(anchor.test('mistral\\-moderation\\-2603')).toBe(true);
    expect(anchor.test('Fine\\-tune Ministral 8B for classification tasks, like moderation')).toBe(
      false,
    );
    expect(
      anchor.test('![](https://mistral.ai/cms-media/api/media/file/Icon-Model-Moderation.svg)'),
    ).toBe(false);
  });
});

describe('formatCurrent', () => {
  it('formats a configured model prefix', () => {
    expect(formatCurrent('mistral-large')).toContain('in=$0.5/M');
  });

  it('shows moderation at $0 (Moderation 2 « Free »)', () => {
    expect(formatCurrent('mistral-moderation')).toBe('tokens: in=$0/M, out=$0/M');
  });

  it('returns NOT CONFIGURED for an unknown prefix', () => {
    expect(formatCurrent('nope')).toBe('NOT CONFIGURED');
  });
});
