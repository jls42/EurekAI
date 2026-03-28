import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGenerations } from './generations';

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
