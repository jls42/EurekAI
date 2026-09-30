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
import { readFileSync } from 'node:fs';
import { lockedKeyCount } from '../helpers/keyed-lock.js';

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
      model: 'mistral-ocr-4-1',
      document: { fileId: 'file-123', type: 'file' },
      confidenceScoresGranularity: 'page',
      includeBlocks: false,
    });
    expect(result.markdown).toBe('# Page 1');
    expect(typeof result.elapsed).toBe('number');
    expect(result.confidence).toBeUndefined();
  });

  it('defaults to OCR 4 when no model is provided', async () => {
    const client = createClient();
    await ocrFile(client, '/tmp/test.pdf', 'test.pdf');

    expect(client.ocr.process).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'mistral-ocr-4-1' }),
    );
  });

  it('forwards the requested OCR model (e.g. OCR 3 opt-in) to client.ocr.process', async () => {
    const client = createClient();
    await ocrFile(client, '/tmp/test.pdf', 'test.pdf', 'mistral-ocr-2512');

    expect(client.ocr.process).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'mistral-ocr-2512' }),
    );
  });

  it('pins includeBlocks: false for every model (API and SDK >= 2.6.1 default to true)', async () => {
    const client = createClient();
    await ocrFile(client, '/tmp/test.pdf', 'test.pdf', 'mistral-ocr-2512');

    expect(client.ocr.process).toHaveBeenCalledWith({
      model: 'mistral-ocr-2512',
      document: { fileId: 'file-123', type: 'file' },
      confidenceScoresGranularity: 'page',
      includeBlocks: false,
    });
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

describe('ocrFile — fichier Mistral et OCR concurrents', () => {
  // OCR bloqué jusqu'à `release()` : le test agit pendant que Mistral « travaille ».
  const blockedProcess = (client: any) => {
    let release: () => void = () => {};
    client.ocr.process.mockImplementationOnce(
      () => new Promise((r) => (release = () => r({ pages: [{ markdown: '# A' }] }))),
    );
    return () => release();
  };

  it('ocr.process lève : fichier Mistral supprimé quand même (finally), erreur propagée', async () => {
    const client = createClient();
    client.ocr.process.mockRejectedValue(new Error('OCR down'));

    await expect(ocrFile(client, '/tmp/test.pdf', 'test.pdf')).rejects.toThrow('OCR down');
    expect(client.files.delete).toHaveBeenCalledWith({ fileId: 'file-123' });
  });

  it('upload en échec : rien à supprimer, erreur propagée, verrou libéré', async () => {
    // Contenu propre à ce test : sa clé de verrou ne peut pas venir d'un test précédent.
    const content = Buffer.from('contenu du test upload en échec');
    vi.mocked(readFileSync)
      .mockReturnValueOnce(content as any)
      .mockReturnValueOnce(content as any);
    const before = lockedKeyCount();
    const client = createClient();
    client.files.upload.mockRejectedValueOnce(new Error('upload failed'));

    await expect(ocrFile(client, '/tmp/test.pdf', 'test.pdf')).rejects.toThrow('upload failed');
    expect(client.files.delete).not.toHaveBeenCalled();
    expect(lockedKeyCount()).toBe(before);
    await expect(ocrFile(client, '/tmp/test.pdf', 'test.pdf')).resolves.toMatchObject({
      markdown: '# Page 1',
    });
  });

  // Mesuré : l'API Files renvoie le même fileId pour un contenu identique. Sans verrou, la
  // suppression du 1er OCR retirait le fichier encore utilisé par le 2e.
  it('même contenu en parallèle : le 2e upload attend la suppression du 1er', async () => {
    const client = createClient();
    const releaseFirst = blockedProcess(client);

    const first = ocrFile(client, '/tmp/a.jpg', 'a.jpg');
    const second = ocrFile(client, '/tmp/doublon.jpg', 'doublon.jpg');
    await vi.waitFor(() => expect(client.ocr.process).toHaveBeenCalledTimes(1));
    expect(client.files.upload).toHaveBeenCalledTimes(1);

    releaseFirst();
    await Promise.all([first, second]);

    expect(client.files.upload).toHaveBeenCalledTimes(2);
    expect(client.files.delete).toHaveBeenCalledTimes(2);
    expect(client.files.upload.mock.invocationCallOrder[1]).toBeGreaterThan(
      client.files.delete.mock.invocationCallOrder[0],
    );
  });

  it('contenus différents : OCR en parallèle', async () => {
    vi.mocked(readFileSync)
      .mockReturnValueOnce(Buffer.from('contenu A') as any)
      .mockReturnValueOnce(Buffer.from('contenu B') as any);
    const client = createClient();
    const releaseFirst = blockedProcess(client);

    const first = ocrFile(client, '/tmp/a.jpg', 'a.jpg');
    await ocrFile(client, '/tmp/b.jpg', 'b.jpg');

    // Le 2e a fini (upload, OCR, suppression) pendant que le 1er attend toujours Mistral.
    expect(client.files.upload).toHaveBeenCalledTimes(2);
    expect(client.files.delete).toHaveBeenCalledTimes(1);
    releaseFirst();
    await first;
    expect(client.files.delete).toHaveBeenCalledTimes(2);
  });
});
