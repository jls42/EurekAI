/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return -- Codacy lance ESLint sans resolution des types vitest (faux positifs) ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { analyzeModels, fetchModels, main } from './check-models.js';

describe('analyzeModels', () => {
  it('flags a watched alias pointing to a deprecated dated version', () => {
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

  it('is silent when watched aliases point to current (non-deprecated) versions', () => {
    const warnings = analyzeModels([
      { id: 'mistral-large-2512', aliases: ['mistral-large-latest'], deprecation: null },
      { id: 'mistral-ocr-4-0', aliases: ['mistral-ocr-latest'], deprecation: null },
    ]);
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
    expect(log).toHaveBeenCalledWith(expect.stringContaining('déprécié'));
  });

  it('never throws when the API call fails (exit 0 spirit)', async () => {
    process.env.MISTRAL_API_KEY = 'test-key';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await expect(main()).resolves.toBeUndefined();
    expect(log).toHaveBeenCalledWith(expect.stringContaining('impossible'));
  });
});
