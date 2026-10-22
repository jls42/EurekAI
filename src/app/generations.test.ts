import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { createGenerations } from './generations';
import type { FlashcardsGeneration } from '../../types';

// Mock document for querySelector used in startEditTitle
(globalThis as any).document = {
  querySelector: vi.fn(() => ({ focus: vi.fn() })),
};

globalThis.fetch = vi.fn();

function makeContext(overrides: any = {}) {
  return {
    editingTitle: null as string | null,
    editTitleValue: '',
    generations: [] as any[],
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    $nextTick: vi.fn((cb: () => void) => cb()),
    apiBase: vi.fn(() => '/api/projects/pid-1'),
    ...overrides,
  };
}

describe('createGenerations', () => {
  let gens: ReturnType<typeof createGenerations>;
  let ctx: ReturnType<typeof makeContext>;

  beforeEach(() => {
    gens = createGenerations();
    ctx = makeContext();
    vi.mocked(globalThis.fetch).mockClear();
  });

  // Lecture à voix haute des flashcards : enregistrée dans la génération (`audioUrl`) et rejouée
  // sans appel ; celle que cet onglet vient de produire (`_audioUrl_all`) passe devant.
  describe('flashcardsAudioUrl', () => {
    const FLASHCARDS: FlashcardsGeneration = {
      id: 'fc-1',
      title: 'Flashcards',
      createdAt: '2026-10-21T00:00:00.000Z',
      sourceIds: [],
      type: 'flashcards',
      data: [{ question: 'Q', answer: 'R' }],
    };
    const SAVED = '/output/projects/pid-1/read-aloud-fc-1-all-1-aaaaaaaa.mp3';
    const FRESH = '/output/projects/pid-1/read-aloud-fc-1-all-2-bbbbbbbb.mp3';

    it('génération relue avec le projet : son audio enregistré, sans aucun appel', () => {
      expect(gens.flashcardsAudioUrl({ ...FLASHCARDS, audioUrl: SAVED })).toBe(SAVED);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('lecture produite dans cet onglet (applyVoiceResult) : passe devant l’enregistrée', () => {
      const regenerated = { ...FLASHCARDS, audioUrl: SAVED, _audioUrl_all: FRESH };
      expect(gens.flashcardsAudioUrl(regenerated)).toBe(FRESH);
    });

    it('aucune lecture : rien à jouer (bouton « Générer l’audio », lecteur caché)', () => {
      const emptyFresh = { ...FLASHCARDS, _audioUrl_all: '' };
      expect(gens.flashcardsAudioUrl(FLASHCARDS)).toBeUndefined();
      expect(gens.flashcardsAudioUrl(emptyFresh)).toBeUndefined();
    });

    it('gabarit : libellés du bouton et lecteur lisent flashcardsAudioUrl(gen)', () => {
      const html = readFileSync(
        new URL('../partials/view-flashcards.html', import.meta.url),
        'utf-8',
      );
      expect(html).toContain('x-show="!gen._generatingVoice_all && !flashcardsAudioUrl(gen)"');
      expect(html).toContain('x-show="!gen._generatingVoice_all && flashcardsAudioUrl(gen)"');
      expect(html).toContain('x-show="flashcardsAudioUrl(gen)"');
      expect(html).toContain(':src="flashcardsAudioUrl(gen)"');
      // L'URL de l'onglet seule : l'audio enregistré disparaissait au rechargement.
      expect(html).not.toContain('_audioUrl_all');
    });
  });

  describe('startEditTitle', () => {
    it('sets editingTitle and editTitleValue', () => {
      const gen = { id: 'g1', title: 'My Quiz' };

      gens.startEditTitle.call(ctx, gen);

      expect(ctx.editingTitle).toBe('g1');
      expect(ctx.editTitleValue).toBe('My Quiz');
    });
  });

  describe('saveTitle', () => {
    it('makes PUT fetch and updates gen title', async () => {
      const gen = { id: 'g1', title: 'Old Title' };
      ctx.editTitleValue = 'New Title';
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true } as any);

      await gens.saveTitle.call(ctx, gen);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/generations/g1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Title' }),
      });
      expect(gen.title).toBe('New Title');
      expect(ctx.editingTitle).toBeNull();
    });

    it('skips fetch when title is the same', async () => {
      const gen = { id: 'g1', title: 'Same Title' };
      ctx.editTitleValue = 'Same Title';

      await gens.saveTitle.call(ctx, gen);

      expect(globalThis.fetch).not.toHaveBeenCalled();
      expect(ctx.editingTitle).toBeNull();
    });

    it('skips fetch when title is empty after trim', async () => {
      const gen = { id: 'g1', title: 'Original' };
      ctx.editTitleValue = '   ';

      await gens.saveTitle.call(ctx, gen);

      expect(globalThis.fetch).not.toHaveBeenCalled();
      expect(ctx.editingTitle).toBeNull();
    });
  });

  describe('deleteGen', () => {
    it('makes DELETE fetch, removes from array, shows toast', async () => {
      const g1 = { id: 'g1', title: 'Quiz 1' };
      const g2 = { id: 'g2', title: 'Quiz 2' };
      ctx.generations = [g1, g2];
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true } as any);

      await gens.deleteGen.call(ctx, g1);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/generations/g1', {
        method: 'DELETE',
      });
      expect(ctx.generations).toEqual([g2]);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.genDeleted', 'info');
    });
  });
});
