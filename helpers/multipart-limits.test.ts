/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { Readable } from 'node:stream';
import type { Request, Response } from 'express';
import multer from 'multer';
import { describe, it, expect } from 'vitest';
import { MULTIPART_FIELD_LIMITS } from './multipart-limits.js';

const BOUNDARY = 'eurekai-test-boundary';
const ROUTE_LIMITS = { fileSize: 1024, files: 1 };
// Index modeste VOLONTAIRE : le garde rejette tout index > 0, et l'index d'attaque réel
// (4294967294) figerait l'event loop ~2 min si le garde régressait, au lieu d'échouer vite.
const ARRAY_FIELDS: [string, string][] = [
  ['items[1000]', 'x'],
  ['items[k]', 'y'],
];

// Requête multipart ne portant que des champs texte : seul chemin où append-field interprète `[N]`.
const multipartRequest = (fields: [string, string][]): Request => {
  const parts = fields.map(
    ([name, value]) =>
      `--${BOUNDARY}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`,
  );
  const body = Buffer.from(`${parts.join('')}--${BOUNDARY}--\r\n`);
  const headers = {
    'content-type': `multipart/form-data; boundary=${BOUNDARY}`,
    'content-length': String(body.length),
  };
  return Object.assign(Readable.from([body]), { headers }) as unknown as Request;
};

// Passe la requête dans un vrai middleware multer ; résout avec ce qui est transmis à next().
const parseFields = (limits: multer.Options['limits'], req: Request): Promise<unknown> =>
  new Promise((resolve) => {
    multer({ storage: multer.memoryStorage(), limits }).none()(req, {} as Response, resolve);
  });

describe('MULTIPART_FIELD_LIMITS (GHSA-535w-7cp7-47q4)', () => {
  it("rejette tout index de tableau avant qu'append-field ne le matérialise", async () => {
    const req = multipartRequest(ARRAY_FIELDS);

    const err = await parseFields({ ...ROUTE_LIMITS, ...MULTIPART_FIELD_LIMITS }, req);

    expect(err).toBeInstanceOf(multer.MulterError);
    expect((err as multer.MulterError).code).toBe('LIMIT_FIELD_ARRAY_INDEX');
  });

  it("laisse passer les champs texte multipart envoyés par l'app", async () => {
    const req = multipartRequest([
      ['lang', 'fr'],
      ['allowDuplicates', 'true'],
      ['questionIndex', '3'],
    ]);

    const err = await parseFields({ ...ROUTE_LIMITS, ...MULTIPART_FIELD_LIMITS }, req);

    expect(err).toBeUndefined();
    expect(req.body).toEqual({ lang: 'fr', allowDuplicates: 'true', questionIndex: '3' });
  });

  it('est porteur : sans lui, multer accepte la notation tableau', async () => {
    const req = multipartRequest(ARRAY_FIELDS);

    const err = await parseFields(ROUTE_LIMITS, req);

    expect(err).toBeUndefined();
  });
});
