/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { VIEW_CHANGE_EVENT, pauseMediaOnViewChange, watchViewMedia } from './view-media';

// Lecteur factice : `pause` le passe en pause sans toucher à sa position, comme un vrai <audio>.
const player = (paused: boolean) => {
  const media = { paused, currentTime: 42, pause: vi.fn() };
  media.pause.mockImplementation(() => {
    media.paused = true;
  });
  return media;
};

const rootWith = (...media: Array<ReturnType<typeof player>>) => ({
  querySelectorAll: vi.fn(() => media),
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('pauseMediaOnViewChange', () => {
  it('met en pause les seuls lecteurs qui jouent, position gardée, puis prévient les composants', () => {
    const playing = player(false);
    const stopped = player(true);
    const order: string[] = [];
    playing.pause.mockImplementation(() => {
      order.push('pause');
      playing.paused = true;
    });
    const events = {
      dispatchEvent: vi.fn((event: Event) => {
        order.push(event.type);
        return true;
      }),
    };

    pauseMediaOnViewChange(rootWith(playing, stopped) as any, events);

    expect(playing.pause).toHaveBeenCalledTimes(1);
    expect(stopped.pause).not.toHaveBeenCalled();
    expect(playing.currentTime).toBe(42);
    expect(order).toEqual(['pause', VIEW_CHANGE_EVENT]);
  });

  it('sans lecteur en cours : l’événement part quand même (relecture différée de la dictée)', () => {
    const events = { dispatchEvent: vi.fn(() => true) };

    pauseMediaOnViewChange(rootWith() as any, events);

    expect(events.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: VIEW_CHANGE_EVENT }),
    );
  });
});

describe('watchViewMedia', () => {
  it('observe activeView : chaque changement de vue coupe le son, rien avant', () => {
    const playing = player(false);
    const dispatchEvent = vi.fn(() => true);
    vi.stubGlobal('document', rootWith(playing));
    vi.stubGlobal('dispatchEvent', dispatchEvent);
    const watchers: Record<string, () => void> = {};

    watchViewMedia({
      $watch: (property, callback) => {
        watchers[property] = callback;
      },
    });

    expect(Object.keys(watchers)).toEqual(['activeView']);
    expect(playing.pause).not.toHaveBeenCalled();
    watchers.activeView();
    expect(playing.pause).toHaveBeenCalledTimes(1);
    expect(dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: VIEW_CHANGE_EVENT }),
    );
  });
});

describe('gabarits', () => {
  it('la dictée arrête son mot et annule sa relecture différée quand on quitte la vue', () => {
    const html = readFileSync(new URL('../partials/view-dictation.html', import.meta.url), 'utf-8');
    const component = html.indexOf('x-data="dictationComponent(gen)"');
    const listener = html.indexOf('@' + VIEW_CHANGE_EVENT + '.window="stopWord()"');

    expect(component).toBeGreaterThan(-1);
    // Sur l'élément du composant (balise ouvrante), pas sur un élément voisin.
    expect(listener).toBeGreaterThan(component);
    expect(html.slice(component, listener)).not.toContain('<');
  });
});
