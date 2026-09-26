/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi } from 'vitest';
import type { Mistral } from '@mistralai/mistralai';

vi.mock('../generators/moderation.js', () => ({
  moderateContent: vi.fn(async () => ({ status: 'safe', categories: {} })),
}));

import { moderateContent } from '../generators/moderation.js';
import { screenUserText } from './input-moderation.js';

const client = {} as Mistral;

describe('screenUserText', () => {
  it('catégories null (modération inactive) : accepté sans appel', async () => {
    expect(await screenUserText(client, 'texte', null)).toEqual({ ok: true });
    expect(moderateContent).not.toHaveBeenCalled();
  });

  it('safe : accepté avec le résultat, texte nettoyé, copie des catégories', async () => {
    const categories = ['sexual'];

    const screening = await screenUserText(client, '  bonjour  ', categories);

    expect(screening).toEqual({ ok: true, moderation: { status: 'safe', categories: {} } });
    expect(moderateContent).toHaveBeenCalledWith(client, 'bonjour', ['sexual']);
    expect(vi.mocked(moderateContent).mock.calls[0][2]).not.toBe(categories);
  });

  it('unsafe : refus 400 avec la clé demandée (moderation.blocked par défaut)', async () => {
    const flagged = { status: 'unsafe' as const, categories: { sexual: true } };
    vi.mocked(moderateContent).mockResolvedValueOnce(flagged).mockResolvedValueOnce(flagged);

    expect(await screenUserText(client, 'x', ['sexual'])).toEqual({
      ok: false,
      rejection: { status: 400, error: 'moderation.blocked' },
    });
    expect(await screenUserText(client, 'x', ['sexual'], 'quiz.answerBlocked')).toEqual({
      ok: false,
      rejection: { status: 400, error: 'quiz.answerBlocked' },
    });
  });

  it('error (contrat rompu) : refus 503 moderation.error', async () => {
    vi.mocked(moderateContent).mockResolvedValueOnce({ status: 'error', categories: {} });

    expect(await screenUserText(client, 'x', [])).toEqual({
      ok: false,
      rejection: { status: 503, error: 'moderation.error' },
    });
  });

  it("exception de l'API : propagée (l'appelant répond 500 au code stable)", async () => {
    vi.mocked(moderateContent).mockRejectedValueOnce(new Error('upstream down'));

    await expect(screenUserText(client, 'x', ['sexual'])).rejects.toThrow('upstream down');
  });
});
