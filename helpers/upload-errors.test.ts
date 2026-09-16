/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { Readable } from 'node:stream';
import type { Request, RequestHandler, Response } from 'express';
import multer from 'multer';
import { describe, it, expect, vi } from 'vitest';
import { MULTIPART_FIELD_LIMITS } from './multipart-limits.js';
import { withUploadErrors } from './upload-errors.js';

vi.mock('./logger.js', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));

const BOUNDARY = 'eurekai-upload-boundary';
const CLOSING = `--${BOUNDARY}--\r\n`;

const part = (disposition: string, content: string): string =>
  `--${BOUNDARY}\r\nContent-Disposition: form-data; ${disposition}\r\n\r\n${content}\r\n`;

const AUDIO_PART = part('name="audio"; filename="voice.webm"', 'x'.repeat(64));

const multipartRequest = (body: string): Request => {
  const buffer = Buffer.from(body);
  const headers = {
    'content-type': `multipart/form-data; boundary=${BOUNDARY}`,
    'content-length': String(buffer.length),
  };
  return Object.assign(Readable.from([buffer]), { headers }) as unknown as Request;
};

type Outcome = { next: true } | { next: false; status: number; body: unknown };

// Passe la requête dans withUploadErrors(<vrai middleware multer>) : capture next() ou la réponse.
const runUpload = (upload: RequestHandler, body: string): Promise<Outcome> =>
  new Promise((resolve) => {
    const res = {
      status: (status: number) => ({
        json: (payload: unknown) => resolve({ next: false, status, body: payload }),
      }),
    } as unknown as Response;
    withUploadErrors(upload)(multipartRequest(body), res, () => resolve({ next: true }));
  });

const memoryUpload = (fileSize: number): RequestHandler =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize, files: 1, ...MULTIPART_FIELD_LIMITS },
  }).single('audio');

describe('withUploadErrors', () => {
  it('laisse passer un upload valide vers le handler suivant', async () => {
    const outcome = await runUpload(memoryUpload(1024), AUDIO_PART + CLOSING);

    expect(outcome).toEqual({ next: true });
  });

  it('répond 413 file_too_large quand le fichier dépasse la limite', async () => {
    const outcome = await runUpload(memoryUpload(16), AUDIO_PART + CLOSING);

    expect(outcome).toEqual({ next: false, status: 413, body: { error: 'file_too_large' } });
  });

  it('répond 400 upload_failed pour un champ rejeté par les garde-fous multipart', async () => {
    const outcome = await runUpload(memoryUpload(1024), part('name="items[1000]"', 'x') + CLOSING);

    expect(outcome).toEqual({ next: false, status: 400, body: { error: 'upload_failed' } });
  });

  it('répond 400 upload_failed pour un corps multipart tronqué', async () => {
    const outcome = await runUpload(memoryUpload(1024), AUDIO_PART);

    expect(outcome).toEqual({ next: false, status: 400, body: { error: 'upload_failed' } });
  });

  it('répond 500 internal_error quand le stockage échoue (erreur système)', async () => {
    const failingStorage: multer.StorageEngine = {
      _handleFile: (_req, _file, cb) =>
        cb(Object.assign(new Error('disk full'), { code: 'ENOSPC' })),
      _removeFile: (_req, _file, cb) => cb(null),
    };
    const upload = multer({
      storage: failingStorage,
      limits: { fileSize: 1024, ...MULTIPART_FIELD_LIMITS },
    }).single('audio');

    const outcome = await runUpload(upload, AUDIO_PART + CLOSING);

    expect(outcome).toEqual({ next: false, status: 500, body: { error: 'internal_error' } });
  });
});
