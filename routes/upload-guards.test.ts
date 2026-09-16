/* eslint-disable
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-return
   --
   Codacy lance ESLint sans les types Vitest/Express (pile de routes non typée); lint:ci local reste type-aware. */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { Readable } from 'node:stream';
import { ProjectStore } from '../store.js';
import { ProfileStore } from '../profiles.js';
import { sourceRoutes } from './sources.js';
import { generationCrudRoutes } from './generations.js';

vi.mock('../helpers/logger.js', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// Chaque route d'upload doit monter multer avec MULTIPART_FIELD_LIMITS ET withUploadErrors :
// une requête piégée ressort en 400 JSON sans atteindre le handler.
const UPLOAD_ROUTES = [
  ['sources', '/:pid/sources/upload'],
  ['sources', '/:pid/sources/voice'],
  ['generations', '/:pid/generations/:gid/vocal-answer'],
] as const;

let tempDir: string;
let routers: Record<(typeof UPLOAD_ROUTES)[number][0], any>;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-upload-guards-'));
  const store = new ProjectStore(tempDir);
  const profileStore = new ProfileStore(tempDir);
  routers = {
    sources: sourceRoutes(store, profileStore),
    generations: generationCrudRoutes(store, profileStore),
  };
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

// Middleware juste avant le handler final : le multer enveloppé par withUploadErrors.
const getUploadMiddleware = (router: any, path: string) => {
  const layer = router.stack.find((l: any) => l.route?.path === path && l.route.methods.post);
  if (!layer) throw new Error(`No upload route POST ${path}`);
  return layer.route.stack[layer.route.stack.length - 2].handle;
};

// Champ texte avec index de tableau : rejeté par MULTIPART_FIELD_LIMITS (GHSA-535w-7cp7-47q4).
const arrayIndexRequest = () => {
  const boundary = 'eurekai-route-boundary';
  const body = Buffer.from(
    `--${boundary}\r\nContent-Disposition: form-data; name="items[1000]"\r\n\r\nx\r\n--${boundary}--\r\n`,
  );
  const headers = {
    'content-type': `multipart/form-data; boundary=${boundary}`,
    'content-length': String(body.length),
  };
  return Object.assign(Readable.from([body]), { headers, params: {} });
};

// Exécute le middleware ; résout dès la réponse JSON ou dès l'appel à next().
const runUploadMiddleware = (router: any, path: string) =>
  new Promise<{ res: any; nextCalled: boolean }>((resolve) => {
    const res: any = {};
    res.status = vi.fn(() => res);
    res.json = vi.fn(() => {
      resolve({ res, nextCalled: false });
      return res;
    });
    getUploadMiddleware(router, path)(arrayIndexRequest(), res, () =>
      resolve({ res, nextCalled: true }),
    );
  });

describe('routes d’upload : garde-fous multipart branchés', () => {
  it.each(UPLOAD_ROUTES)('%s %s répond 400 upload_failed en JSON', async (name, path) => {
    const { res, nextCalled } = await runUploadMiddleware(routers[name], path);

    expect(nextCalled).toBe(false);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'upload_failed' });
  });
});
