import { describe, it, expect, vi } from 'vitest';

vi.mock('node:fs', async (importOriginal) => {
  const orig = await importOriginal<typeof import('node:fs')>();
  return { ...orig, readFileSync: vi.fn(() => Buffer.from('fake-file-content')) };
});

const { loggerWarn, loggerError } = vi.hoisted(() => ({
  loggerWarn: vi.fn(),
  loggerError: vi.fn(),
}));
vi.mock('../helpers/logger.js', () => ({
  logger: { info: vi.fn(), warn: loggerWarn, error: loggerError },
}));

import { ocrFile } from './ocr.js';

function createClient(pages = [{ markdown: '# Page 1' }]) {
  return {
    files: {
      upload: vi.fn().mockResolvedValue({ id: 'file-123' }),
      delete: vi.fn().mockResolvedValue(undefined),
    },
    ocr: {
      process: vi.fn().mockResolvedValue({ pages }),
    },
  } as any;
}

describe('ocrFile', () => {
  it('uploads file, processes OCR, and returns markdown', async () => {
    const client = createClient();
    const result = await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(client.files.upload).toHaveBeenCalledWith({
      file: { fileName: 'test.pdf', content: expect.any(Uint8Array) },
      purpose: 'ocr',
    });
    expect(client.ocr.process).toHaveBeenCalledWith({
      model: 'mistral-ocr-latest',
      document: { fileId: 'file-123', type: 'file' },
      confidenceScoresGranularity: 'page',
    });
    expect(result.markdown).toBe('# Page 1');
    expect(typeof result.elapsed).toBe('number');
    expect(result.confidence).toBeUndefined();
  });

  it('combines multiple pages into single markdown', async () => {
    const client = createClient([{ markdown: '# Page 1' }, { markdown: '## Page 2' }]);
    const result = await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(result.markdown).toBe('# Page 1\n\n## Page 2');
  });

  it('extracts average confidence score when available', async () => {
    const pages = [
      { markdown: '# P1', confidenceScores: { averagePageConfidenceScore: 0.95 } },
      { markdown: '# P2', confidenceScores: { averagePageConfidenceScore: 0.91 } },
    ];
    const client = createClient(pages);
    const result = await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(result.confidence!.average).toBeCloseTo(0.93, 5);
  });

  it('returns undefined confidence when scores are null', async () => {
    const pages = [{ markdown: '# P1', confidenceScores: null }];
    const client = createClient(pages);
    const result = await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(result.confidence).toBeUndefined();
  });

  it('ignores pages with non-finite confidence scores', async () => {
    const pages = [
      { markdown: '# P1', confidenceScores: { averagePageConfidenceScore: 0.95 } },
      { markdown: '# P2', confidenceScores: { averagePageConfidenceScore: undefined as any } },
      { markdown: '# P3', confidenceScores: { averagePageConfidenceScore: NaN } },
    ];
    const client = createClient(pages);
    const result = await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(result.confidence!.average).toBeCloseTo(0.95, 5);
  });

  it('returns undefined confidence when all scores are non-finite', async () => {
    const pages = [
      { markdown: '# P1', confidenceScores: { averagePageConfidenceScore: NaN } },
      { markdown: '# P2', confidenceScores: { averagePageConfidenceScore: Infinity } },
    ];
    const client = createClient(pages);
    const result = await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(result.confidence).toBeUndefined();
  });

  it('cleans up the uploaded file after OCR', async () => {
    const client = createClient();
    await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(client.files.delete).toHaveBeenCalledWith({ fileId: 'file-123' });
  });

  it('handles cleanup error gracefully without throwing', async () => {
    const client = createClient();
    client.files.delete.mockRejectedValue(new Error('delete failed'));

    const result = await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(result.markdown).toBe('# Page 1');
  });

  it('logs error when cleanup fails', async () => {
    loggerError.mockClear();
    const client = createClient();
    client.files.delete.mockRejectedValue(new Error('delete failed'));

    await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(loggerError).toHaveBeenCalledWith(
      'ocr',
      expect.stringContaining('file cleanup failed'),
      expect.any(Error),
    );
  });

  it('clamps confidence score to [0, 1] range', async () => {
    const pages = [{ markdown: '# P1', confidenceScores: { averagePageConfidenceScore: 1.5 } }];
    const client = createClient(pages);
    const result = await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(result.confidence!.average).toBe(1);
  });

  it('logs warning when confidence score is clamped', async () => {
    loggerWarn.mockClear();
    const pages = [{ markdown: '# P1', confidenceScores: { averagePageConfidenceScore: 1.5 } }];
    const client = createClient(pages);

    await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(loggerWarn).toHaveBeenCalledWith('ocr', expect.stringContaining('out of [0,1] range'));
  });

  it('logs warning when confidence scores are requested but not returned', async () => {
    loggerWarn.mockClear();
    const pages = [{ markdown: '# P1' }];
    const client = createClient(pages);

    await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(loggerWarn).toHaveBeenCalledWith(
      'ocr',
      expect.stringContaining('confidence scores requested but not returned'),
    );
  });
});
