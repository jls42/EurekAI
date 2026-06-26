/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return -- Codacy lance ESLint sans resolution des types vitest (faux positifs) ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi, afterEach } from 'vitest';

// Mock Lightpanda : `main()` rend l'overview via le navigateur headless (~40 s/page). Le neutraliser
// garde les tests rapides et hors réseau ; markdown vide → table Legacy `{}` → diagnostic API-seul.
vi.mock('@lightpanda/browser', () => ({
  lightpanda: { fetch: () => Promise.resolve('') },
}));

import { analyzeModels, fetchModels, main, parseLegacyTable } from './check-models.js';

const LEGACY_MD = [
  '| Model | Version | API | DeprecationRetirement | Alternative |',
  '| --- | --- | --- | --- | --- |',
  '| [OCR 2 ↗](https://x) | 25.05 | mistral\\-ocr\\-2505 | 2/27/20265/31/2026 | [OCR 4](https://y) |',
  '| [Mod ↗](https://x) | 24.11 | mistral\\-moderation\\-2411 | 1/15/20266/30/2026 | [Moderation 2](https://y) |',
].join('\n');

describe('parseLegacyTable', () => {
  it('parses the api id, both glued dates (deprecation+retirement) and the alternative', () => {
    const t = parseLegacyTable(LEGACY_MD);
    expect(t.get('mistral-ocr-2505')).toEqual({
      apiId: 'mistral-ocr-2505',
      deprecation: '2/27/2026',
      retirement: '5/31/2026',
      alternative: 'OCR 4',
    });
  });

  it('ignores the header and separator rows (only model-id rows kept)', () => {
    expect([...parseLegacyTable(LEGACY_MD).keys()]).toEqual([
      'mistral-ocr-2505',
      'mistral-moderation-2411',
    ]);
  });

  it('returns an empty map on markdown without a legacy table', () => {
    expect(parseLegacyTable('# Overview\nno table here\njust prose').size).toBe(0);
  });

  it('drops a non-link / dash alternative cell (no "remplacer par -")', () => {
    const md =
      '| M | V | API | DeprecationRetirement | Alternative |\n| [X](u) | 1 | foo\\-bar\\-2401 | 1/1/20262/2/2026 | - |';
    expect(parseLegacyTable(md).get('foo-bar-2401')?.alternative).toBeUndefined();
  });
});

describe('analyzeModels', () => {
  it('flags a watched alias pointing to a deprecated dated version (API only)', () => {
    const warnings = analyzeModels([
      {
        id: 'mistral-moderation-2411',
        aliases: ['mistral-moderation-latest'],
        deprecation: '2026-06-30T12:00:00Z',
      },
    ]);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('mistral-moderation-latest');
    expect(warnings[0]).toContain('mistral-moderation-2411');
  });

  it('enriches a deprecated alias with the retirement date + alternative from the legacy table', () => {
    const warnings = analyzeModels(
      [{ id: 'mistral-ocr-2505', aliases: ['mistral-ocr-latest'], deprecation: '2026-02-27' }],
      parseLegacyTable(LEGACY_MD),
    );
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('retiré 5/31/2026');
    expect(warnings[0]).toContain('OCR 4');
  });

  it('catches an alias the API marks current (deprecation:null) but the legacy table lists', () => {
    const warnings = analyzeModels(
      [{ id: 'mistral-ocr-2505', aliases: ['mistral-ocr-latest'], deprecation: null }],
      parseLegacyTable(LEGACY_MD),
    );
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('retiré');
  });

  it('is silent when watched aliases point to current versions absent from the legacy table', () => {
    const warnings = analyzeModels(
      [
        { id: 'mistral-large-2512', aliases: ['mistral-large-latest'], deprecation: null },
        { id: 'mistral-ocr-2512', aliases: ['mistral-ocr-latest'], deprecation: null },
      ],
      parseLegacyTable(LEGACY_MD),
    );
    expect(warnings).toHaveLength(0);
  });

  it('tolerates a missing aliases/deprecation shape (no false diagnostic)', () => {
    expect(analyzeModels([{ id: 'x' }])).toHaveLength(0);
    expect(analyzeModels([])).toHaveLength(0);
  });

  it('ignores deprecated models that are NOT a watched alias target', () => {
    const warnings = analyzeModels([
      { id: 'some-old-model-2402', aliases: ['some-old-latest'], deprecation: '2025-01-01' },
    ]);
    expect(warnings).toHaveLength(0);
  });
});

const okFetch = (data: unknown) =>
  vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(data) });

describe('fetchModels', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns the .data array on a 200 response', async () => {
    vi.stubGlobal('fetch', okFetch({ data: [{ id: 'm' }] }));
    expect(await fetchModels('k')).toEqual([{ id: 'm' }]);
  });

  it('returns [] when .data is absent', async () => {
    vi.stubGlobal('fetch', okFetch({}));
    expect(await fetchModels('k')).toEqual([]);
  });

  it('throws on a non-ok HTTP status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(fetchModels('k')).rejects.toThrow('HTTP 503');
  });
});

describe('main (orchestration, non bloquant)', () => {
  const origKey = process.env.MISTRAL_API_KEY;
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    if (origKey === undefined) delete process.env.MISTRAL_API_KEY;
    else process.env.MISTRAL_API_KEY = origKey;
  });

  it('skips (logs) when MISTRAL_API_KEY is absent', async () => {
    delete process.env.MISTRAL_API_KEY;
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await main();
    expect(log).toHaveBeenCalledWith(expect.stringContaining('absent'));
  });

  it('reports OK when no watched alias is deprecated', async () => {
    process.env.MISTRAL_API_KEY = 'test-key';
    vi.stubGlobal(
      'fetch',
      okFetch({
        data: [{ id: 'mistral-large-2512', aliases: ['mistral-large-latest'], deprecation: null }],
      }),
    );
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await main();
    expect(log).toHaveBeenCalledWith(expect.stringContaining('alias OK'));
  });

  it('warns when a watched alias points to a deprecated version', async () => {
    process.env.MISTRAL_API_KEY = 'test-key';
    vi.stubGlobal(
      'fetch',
      okFetch({
        data: [
          {
            id: 'mistral-moderation-2411',
            aliases: ['mistral-moderation-latest'],
            deprecation: '2026-06-30',
          },
        ],
      }),
    );
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await main();
    expect(log).toHaveBeenCalledWith(expect.stringContaining('déprécié ou retiré'));
  });

  it('never throws when the API call fails (exit 0 spirit)', async () => {
    process.env.MISTRAL_API_KEY = 'test-key';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await expect(main()).resolves.toBeUndefined();
    expect(log).toHaveBeenCalledWith(expect.stringContaining('impossible'));
  });
});
