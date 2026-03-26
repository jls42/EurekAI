import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createToast } from './toast.js';

function makeContext() {
  return {
    toasts: [] as any[],
    toastCounter: 0,
    $nextTick: vi.fn((cb: () => void) => cb()),
    refreshIcons: vi.fn(),
    dismissToast: null as any,
  };
}

describe('createToast', () => {
  let ctx: ReturnType<typeof makeContext>;
  let showToast: (...args: any[]) => void;
  let dismissToast: (id: number) => void;

  beforeEach(() => {
    vi.useFakeTimers();
    const toast = createToast();
    ctx = makeContext();
    ctx.dismissToast = toast.dismissToast.bind(ctx);
    showToast = toast.showToast.bind(ctx);
    dismissToast = toast.dismissToast.bind(ctx);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('ajoute un toast avec les proprietes correctes', () => {
    showToast('Hello', 'success');

    expect(ctx.toasts).toHaveLength(1);
    expect(ctx.toasts[0]).toMatchObject({
      id: 1,
      message: 'Hello',
      type: 'success',
      retryFn: null,
      action: null,
    });
  });

  it('utilise le type info par defaut', () => {
    showToast('Default type');

    expect(ctx.toasts[0].type).toBe('info');
  });

  it('incremente le compteur d identifiants', () => {
    showToast('First');
    showToast('Second');
    showToast('Third');

    expect(ctx.toasts[0].id).toBe(1);
    expect(ctx.toasts[1].id).toBe(2);
    expect(ctx.toasts[2].id).toBe(3);
  });

  it('appelle $nextTick puis refreshIcons', () => {
    showToast('Test');

    expect(ctx.$nextTick).toHaveBeenCalledOnce();
    expect(ctx.refreshIcons).toHaveBeenCalledOnce();
  });

  it('ajoute un toast avec une fonction retry', () => {
    const retryFn = vi.fn();
    showToast('Erreur reseau', 'error', retryFn);

    expect(ctx.toasts[0].retryFn).toBe(retryFn);
  });

  it('ajoute un toast avec une action', () => {
    const action = { label: 'Annuler', fn: vi.fn() };
    showToast('Supprime', 'info', null, action);

    expect(ctx.toasts[0].action).toBe(action);
  });

  it('auto-dismiss apres 5000ms pour un toast standard', () => {
    showToast('Ephemere');

    expect(ctx.toasts).toHaveLength(1);
    vi.advanceTimersByTime(4999);
    expect(ctx.toasts).toHaveLength(1);
    vi.advanceTimersByTime(1);
    expect(ctx.toasts).toHaveLength(0);
  });

  it('auto-dismiss apres 8000ms pour un toast avec action', () => {
    const action = { label: 'Voir', fn: vi.fn() };
    showToast('Avec action', 'info', null, action);

    expect(ctx.toasts).toHaveLength(1);
    vi.advanceTimersByTime(7999);
    expect(ctx.toasts).toHaveLength(1);
    vi.advanceTimersByTime(1);
    expect(ctx.toasts).toHaveLength(0);
  });

  it('ne programme pas d auto-dismiss pour une erreur avec retry', () => {
    const retryFn = vi.fn();
    showToast('Erreur persistante', 'error', retryFn);

    expect(ctx.toasts).toHaveLength(1);
    vi.advanceTimersByTime(10000);
    expect(ctx.toasts).toHaveLength(1);
  });

  it('auto-dismiss une erreur sans retry normalement', () => {
    showToast('Erreur simple', 'error');

    expect(ctx.toasts).toHaveLength(1);
    vi.advanceTimersByTime(5000);
    expect(ctx.toasts).toHaveLength(0);
  });

  it('auto-dismiss un toast non-erreur meme avec retry', () => {
    const retryFn = vi.fn();
    showToast('Info avec retry', 'info', retryFn);

    expect(ctx.toasts).toHaveLength(1);
    vi.advanceTimersByTime(5000);
    expect(ctx.toasts).toHaveLength(0);
  });

  it('dismissToast retire le toast correspondant', () => {
    showToast('Premier');
    showToast('Deuxieme');
    showToast('Troisieme');

    expect(ctx.toasts).toHaveLength(3);
    dismissToast(2);
    expect(ctx.toasts).toHaveLength(2);
    expect(ctx.toasts.map((t: any) => t.id)).toEqual([1, 3]);
  });

  it('dismissToast ne fait rien si l id n existe pas', () => {
    showToast('Seul');

    expect(ctx.toasts).toHaveLength(1);
    dismissToast(999);
    expect(ctx.toasts).toHaveLength(1);
  });

  it('gere plusieurs toasts simultanement', () => {
    showToast('A', 'info');
    showToast('B', 'success');
    showToast('C', 'error');

    expect(ctx.toasts).toHaveLength(3);
    expect(ctx.toasts[0].message).toBe('A');
    expect(ctx.toasts[1].message).toBe('B');
    expect(ctx.toasts[2].message).toBe('C');
  });

  it('auto-dismiss individuel ne retire que le bon toast', () => {
    showToast('Fast', 'info');
    vi.advanceTimersByTime(2000);
    showToast('Slow', 'info');

    expect(ctx.toasts).toHaveLength(2);
    vi.advanceTimersByTime(3000);
    expect(ctx.toasts).toHaveLength(1);
    expect(ctx.toasts[0].message).toBe('Slow');
    vi.advanceTimersByTime(2000);
    expect(ctx.toasts).toHaveLength(0);
  });
});
