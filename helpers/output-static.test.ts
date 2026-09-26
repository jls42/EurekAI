/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument -- Codacy ESLint ne résout pas les types vitest (faux positifs) ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi } from 'vitest';
import type { NextFunction, Request, Response } from 'express';
import { isServableOutputPath, outputStaticGuard } from './output-static.js';

const PID = 'c5bba82b-4ce6-4262-bdf2-d35f293889c3';

describe('isServableOutputPath', () => {
  it.each([
    `/projects/${PID}/podcast-1790410230426.mp3`,
    `/projects/${PID}/illustration-1790410248799.png`,
    `/projects/${PID}/uploads/0fb25222-PXL_20260913_171318343.jpg`,
    `/projects/${PID}/uploads/abc-Le%C3%A7on%203%20(histoire).JPEG`,
    `/projects/${PID}/uploads/abc-cours.pdf`,
    `/projects/${PID}/uploads/abc-notes.txt`,
    `/projects/${PID}/uploads/abc-notes.md`,
    '/projects/legacy_project-1/dictation-w0-1.mp3',
  ])('sert le média %s', (path) => {
    expect(isServableOutputPath(path)).toBe(true);
  });

  it.each([
    ['index des profils (hash des PIN)', '/profiles.json'],
    ['config', '/config.json'],
    ['index des projets', '/projects.json'],
    ['données du projet', `/projects/${PID}/project.json`],
    ['JSON dans uploads', `/projects/${PID}/uploads/x.json`],
    ['fichier caché', `/projects/${PID}/.env.mp3`],
    ['sans extension', `/projects/${PID}/podcast`],
    ['extension inconnue', `/projects/${PID}/uploads/x.html`],
    ['sous-dossier non prévu', `/projects/${PID}/uploads/sub/x.png`],
    ['traversée en clair', '/projects/../profiles.json'],
    ['traversée encodée', `/projects/${PID}/%2e%2e%2fprofiles.json`],
    ['traversée dans l’id', '/projects/%2e%2e/profiles.json'],
    ['antislash', `/projects/${PID}/..%5Cprofiles.json`],
    ['octet nul', `/projects/${PID}/x.mp3%00.json`],
    ['encodage invalide', `/projects/${PID}/%E0%A4%A.mp3`],
    ['id de projet invalide', '/projects/a.b/x.mp3'],
    ['racine', '/'],
  ])('refuse %s', (_label, path) => {
    expect(isServableOutputPath(path)).toBe(false);
  });
});

describe('outputStaticGuard', () => {
  const run = (path: string) => {
    const next = vi.fn() as unknown as NextFunction;
    const end = vi.fn();
    const status = vi.fn(() => ({ end }));
    outputStaticGuard({ path } as Request, { status } as unknown as Response, next);
    return { next, status, end };
  };

  it('laisse passer un média vers express.static', () => {
    const { next, status } = run(`/projects/${PID}/podcast-1.mp3`);
    expect(next).toHaveBeenCalledOnce();
    expect(status).not.toHaveBeenCalled();
  });

  it('répond 404 sans corps pour tout le reste', () => {
    const { next, status, end } = run('/profiles.json');
    expect(next).not.toHaveBeenCalled();
    expect(status).toHaveBeenCalledWith(404);
    expect(end).toHaveBeenCalledOnce();
  });
});
