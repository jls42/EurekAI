import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { createToast } from './toast.js';

function makeContext() {
  return {
    toasts: [] as any[],
    toastCounter: 0,
    $nextTick: vi.fn((cb: () => void) => cb()),
    refreshIcons: vi.fn(),
    dismissToast: null as any,
    currentProfile: null as { id: string } | null,
    currentProjectId: null as string | null,
    notificationsVersion: 0,
    shownToastEventKeys: new Set<string>(),
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
    ctx.dismissToast = toast.dismissToast.bind(ctx as any);
    showToast = toast.showToast.bind(ctx as any);
    dismissToast = toast.dismissToast.bind(ctx as any);
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

  // Vécu (2026-10-03) : 18 échecs d'une rafale de quiz empilaient 18 toasts « Réessayer »
  // identiques, jamais fermés automatiquement, sur tout l'écran d'un téléphone.
  describe('regroupement des toasts identiques', () => {
    const QUIZ_ERROR = 'Quiz : Erreur interne du serveur';

    it('rafale de 18 échecs identiques : un seul toast, compteur 18', () => {
      for (let i = 0; i < 18; i++) showToast(QUIZ_ERROR, 'error', vi.fn());

      expect(ctx.toasts).toHaveLength(1);
      expect(ctx.toasts[0].count).toBe(18);
    });

    it('ne regroupe ni deux messages ni deux types différents', () => {
      showToast(QUIZ_ERROR, 'error');
      showToast('Flashcards : Erreur interne du serveur', 'error');
      showToast(QUIZ_ERROR, 'warning');

      expect(ctx.toasts).toHaveLength(3);
      expect(ctx.toasts.map((t: any) => t.count)).toEqual([1, 1, 1]);
    });

    it('garde le dernier réessai : « Réessayer » relance une seule fois', () => {
      const first = vi.fn();
      const last = vi.fn();
      showToast(QUIZ_ERROR, 'error', first);
      showToast(QUIZ_ERROR, 'error', last);

      expect(ctx.toasts[0].retryFn).toBe(last);
    });

    it('une occurrence sans réessai ne retire pas celui du groupe (toujours persistant)', () => {
      const retry = vi.fn();
      showToast(QUIZ_ERROR, 'error', retry);
      showToast(QUIZ_ERROR, 'error');
      vi.advanceTimersByTime(10000);

      expect(ctx.toasts).toHaveLength(1);
      expect(ctx.toasts[0].retryFn).toBe(retry);
    });

    it('une erreur qui reçoit un réessai devient persistante', () => {
      showToast(QUIZ_ERROR, 'error');
      showToast(QUIZ_ERROR, 'error', vi.fn());
      vi.advanceTimersByTime(10000);

      expect(ctx.toasts).toHaveLength(1);
    });

    it('repousse l échéance tant que l événement se répète', () => {
      showToast('Patiente un peu', 'info');
      vi.advanceTimersByTime(4000);
      showToast('Patiente un peu', 'info');
      vi.advanceTimersByTime(4000);
      expect(ctx.toasts).toHaveLength(1);

      vi.advanceTimersByTime(1000);
      expect(ctx.toasts).toHaveLength(0);
    });

    it('ne rafraîchit pas les icônes pour une occurrence regroupée', () => {
      showToast('Même', 'info');
      showToast('Même', 'info');

      expect(ctx.$nextTick).toHaveBeenCalledOnce();
    });

    it('regroupe les toasts d événements distincts au même message', () => {
      showToast('Échec de Quiz', 'error', null, null, 'generation:g1:failed');
      showToast('Échec de Quiz', 'error', null, null, 'generation:g2:failed');

      expect(ctx.toasts).toHaveLength(1);
      expect(ctx.toasts[0].count).toBe(2);
      expect(ctx.shownToastEventKeys.has('generation:g2:failed')).toBe(true);
    });

    // resetSession remet toastCounter à 0 : le minuteur d'un toast d'avant ne doit pas fermer le
    // nouveau toast qui reprend son id.
    it('un vieux minuteur ne ferme pas un nouveau toast au même id', () => {
      showToast('Avant', 'info');
      vi.advanceTimersByTime(3000);
      ctx.toasts = [];
      ctx.toastCounter = 0;
      showToast('Après', 'info');
      vi.advanceTimersByTime(2000);
      expect(ctx.toasts.map((t: any) => t.message)).toEqual(['Après']);

      vi.advanceTimersByTime(3000);
      expect(ctx.toasts).toHaveLength(0);
    });
  });

  describe('eventKey idempotence (PR notifs)', () => {
    let storage: Record<string, string>;

    beforeEach(() => {
      storage = {};
      (globalThis as any).localStorage = {
        getItem: (k: string) => storage[k] ?? null,
        setItem: (k: string, v: string) => {
          storage[k] = v;
        },
      };
      ctx.currentProfile = { id: 'profile-1' };
      ctx.currentProjectId = 'project-1';
    });

    it('appendNotification fires when eventKey is provided and persists notif', () => {
      showToast('Hello', 'success', null, null, 'generation:gid-1:completed');

      const persisted = JSON.parse(storage['sf-profile-notifications']);
      expect(persisted['profile-1']).toHaveLength(1);
      expect(persisted['profile-1'][0].eventKey).toBe('generation:gid-1:completed');
      expect(ctx.notificationsVersion).toBe(1);
      expect(ctx.shownToastEventKeys.has('generation:gid-1:completed')).toBe(true);
      expect(ctx.toasts).toHaveLength(1);
    });

    it('skips toast UI if eventKey already shown in this tab', () => {
      ctx.shownToastEventKeys.add('generation:gid-1:completed');

      showToast('Hello', 'success', null, null, 'generation:gid-1:completed');

      expect(ctx.toasts).toHaveLength(0);
    });

    it('does not push to ledger when currentProfile is null', () => {
      ctx.currentProfile = null;
      showToast('Hello', 'success', null, null, 'generation:gid-1:completed');

      expect(storage['sf-profile-notifications']).toBeUndefined();
      expect(ctx.notificationsVersion).toBe(0);
      // Toast UI still shows even without profile
      expect(ctx.toasts).toHaveLength(1);
    });

    it('does not bump notificationsVersion if appendNotification was idempotent', () => {
      // Pre-seed seenEvents ledger so appendNotification returns false
      storage['sf-profile-seen-events'] = JSON.stringify({
        'profile-1': ['generation:gid-1:completed'],
      });
      showToast('Hello', 'success', null, null, 'generation:gid-1:completed');

      expect(ctx.notificationsVersion).toBe(0);
      // Toast UI still shows (per-tab dedup is independent from ledger)
      expect(ctx.toasts).toHaveLength(1);
    });

    it('persists messageKey + paramKeys when notifSpec is provided (i18n-aware)', () => {
      showToast('Legacy ignoré', 'success', null, null, 'generation:gid-3:completed', {
        messageKey: 'notif.generationDone',
        paramKeys: { type: 'gen.summary' },
      });

      const persisted = JSON.parse(storage['sf-profile-notifications']);
      expect(persisted['profile-1'][0]).toMatchObject({
        eventKey: 'generation:gid-3:completed',
        messageKey: 'notif.generationDone',
        paramKeys: { type: 'gen.summary' },
      });
      expect(persisted['profile-1'][0].message).toBeUndefined();
    });

    it('passes projectId through to appendNotification', () => {
      ctx.currentProjectId = 'proj-xyz';
      showToast('Done', 'success', null, null, 'generation:gid-2:completed');

      const persisted = JSON.parse(storage['sf-profile-notifications']);
      expect(persisted['profile-1'][0].projectId).toBe('proj-xyz');
    });
  });
});

// Alpine appelle toute fonction que renvoie l'expression d'une directive évaluée hors événement
// (x-show, x-if, x-text, :attr…) : `x-show="toast.retryFn"` relançait l'action dès l'affichage
// du toast d'erreur (vécu : image régénérée 29 ms après son échec), puis à chaque nouvel échec.
describe('gabarits : aucune fonction évaluée par une directive Alpine', () => {
  const partials = new URL('../partials/', import.meta.url);
  const templates = [
    ...readdirSync(partials)
      .filter((name) => name.endsWith('.html'))
      .map((name) => new URL(name, partials)),
    new URL('../index.html', import.meta.url),
  ];
  // \x22 = guillemet : un guillemet dans une regex littérale fausse la mesure de Lizard.
  const BINDING = /\s(x-show|x-if|x-text|x-html|:[\w.-]+|x-bind:[\w.-]+)=\x22([^\x22]*)\x22/g;
  const PROPERTY_PATH = /^[\w$]+(?:\??\.[\w$]+)*$/;
  const FUNCTION_NAME = /(?:^fn|Fn|Callback|Handler)$/;

  it('ne lie jamais une directive à une référence de fonction brute', () => {
    const offenders = templates.flatMap((file) => {
      const html = readFileSync(file, 'utf-8');
      return [...html.matchAll(BINDING)]
        .filter(([, , expr]) => PROPERTY_PATH.test(expr.trim()))
        .filter(([, , expr]) => FUNCTION_NAME.test(expr.trim().split(/\??\./).pop() ?? ''))
        .map(([, directive, expr]) => `${file.pathname.split('/').pop()}: ${directive}="${expr}"`);
    });
    expect(offenders).toEqual([]);
  });

  it('le bouton « Réessayer » teste la présence du réessai et ne l’appelle qu’au clic', () => {
    const html = readFileSync(new URL('../partials/toasts.html', import.meta.url), 'utf-8');
    expect(html).toContain('x-show="!!toast.retryFn"');
    expect(html).toContain('@click="toast.retryFn(); dismissToast(toast.id)"');
  });

  it('affiche le compteur d’un toast regroupé, lisible par un lecteur d’écran', () => {
    const html = readFileSync(new URL('../partials/toasts.html', import.meta.url), 'utf-8');
    // \x22 = guillemet (même raison que BINDING ci-dessus).
    expect(html.match(/x-show=\x22toast\.count > 1\x22/g)).toHaveLength(2);
    expect(html).toContain("t('toast.repeatBadge', { count: toast.count })");
    expect(html).toContain("t('a11y.toastRepeated', { count: toast.count })");
  });
});
