import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  _resetLongRequestSlots,
  longRequestSlots,
  MAX_LONG_REQUESTS,
  withLongRequestSlot,
} from './request-slots';

// Requête longue tenue jusqu'à ce que le test la termine : `started` dit si elle est partie,
// `sent()` rend la promesse de la requête envoyée.
const heldRequest = () => {
  let settle!: (outcome: 'ok' | 'error') => void;
  let sent!: Promise<string>;
  const started = vi.fn();
  const request = () => {
    started();
    sent = new Promise<string>((resolve, reject) => {
      settle = (outcome) => {
        if (outcome === 'ok') resolve('done');
        else reject(new Error('panne'));
      };
    });
    return sent;
  };
  return {
    request,
    started,
    sent: () => sent,
    finish: () => settle('ok'),
    fail: () => settle('error'),
  };
};

// Laisse passer les microtâches en attente (place transmise, requête lancée).
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

afterEach(() => {
  // Aucune place ne fuit d'un test à l'autre ; file neuve pour le suivant.
  const left = longRequestSlots();
  _resetLongRequestSlots();
  expect(left).toEqual({ inFlight: 0, waiting: 0 });
});

describe('withLongRequestSlot — au plus 3 requêtes longues pour tout l’onglet', () => {
  it('3 partent tout de suite ; les suivantes attendent et partent dans l’ordre de leur demande, une par place libérée', async () => {
    expect(MAX_LONG_REQUESTS).toBe(3);
    const requests = Array.from({ length: 5 }, heldRequest);
    const done = requests.map((r) => withLongRequestSlot(r.request));
    await flush();
    expect(requests.map((r) => r.started.mock.calls.length)).toEqual([1, 1, 1, 0, 0]);
    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 2 });

    requests[1].finish();
    await flush();
    expect(requests.map((r) => r.started.mock.calls.length)).toEqual([1, 1, 1, 1, 0]);
    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 1 });

    requests[0].finish();
    await flush();
    expect(requests[4].started).toHaveBeenCalledTimes(1);
    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 0 });

    for (const r of requests.slice(2)) r.finish();
    await expect(Promise.all(done)).resolves.toEqual(['done', 'done', 'done', 'done', 'done']);
  });

  // Place transmise de la main à la main : une demande qui arrive au moment où une place se libère
  // passe après la file. Une place d'abord libérée, puis reprise par la requête en file, laisserait
  // cette demande prendre une 4e place.
  it('demande arrivée au moment où une place se libère : derrière la file, jamais une 4e place', async () => {
    const first = heldRequest();
    const others = [heldRequest(), heldRequest(), heldRequest()];
    const late = heldRequest();
    const done = [first, ...others].map((r) => withLongRequestSlot(r.request));
    await flush();
    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 1 });
    let lateDone: Promise<string> | undefined;
    // Réaction inscrite sur la requête de `first` après celle de withLongRequestSlot : elle
    // s'exécute juste après la place rendue par `first`, avant que la requête en file reprenne.
    void first.sent().then(() => {
      lateDone = withLongRequestSlot(late.request);
    });
    first.finish();
    await flush();

    expect(others[2].started).toHaveBeenCalledTimes(1);
    expect(late.started).not.toHaveBeenCalled();
    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 1 });

    for (const r of others) r.finish();
    await flush();
    expect(late.started).toHaveBeenCalledTimes(1);
    late.finish();
    await Promise.all([...done, lateDone]);
  });

  it('attente annulée par son signal : rejet AbortError, jamais envoyée, sortie de la file ; la suivante passe à sa place', async () => {
    const running = [heldRequest(), heldRequest(), heldRequest()];
    const cancelled = heldRequest();
    const next = heldRequest();
    const controller = new AbortController();
    const done = running.map((r) => withLongRequestSlot(r.request));
    const cancelledDone = withLongRequestSlot(cancelled.request, controller.signal);
    const nextDone = withLongRequestSlot(next.request);
    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 2 });

    controller.abort();
    await expect(cancelledDone).rejects.toHaveProperty('name', 'AbortError');
    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 1 });

    running[0].finish();
    await flush();
    expect(next.started).toHaveBeenCalledTimes(1);
    expect(cancelled.started).not.toHaveBeenCalled();
    for (const r of [running[1], running[2], next]) r.finish();
    await Promise.all([...done, nextDone]);
  });

  it('signal déjà annulé : rejet immédiat, même avec des places libres, rien en file', async () => {
    const controller = new AbortController();
    controller.abort();
    const request = heldRequest();

    const done = withLongRequestSlot(request.request, controller.signal);

    await expect(done).rejects.toHaveProperty('name', 'AbortError');
    expect(request.started).not.toHaveBeenCalled();
    expect(longRequestSlots()).toEqual({ inFlight: 0, waiting: 0 });
  });

  it('requête en échec (rejet, ou exception levée tout de suite) : erreur transmise, place rendue, la suivante passe', async () => {
    const failing = heldRequest();
    const running = [heldRequest(), heldRequest()];
    const throwing = vi.fn((): Promise<string> => {
      throw new TypeError('Failed to fetch');
    });
    const next = heldRequest();
    const failingDone = withLongRequestSlot(failing.request);
    const done = running.map((r) => withLongRequestSlot(r.request));
    const throwingDone = withLongRequestSlot(throwing);
    const nextDone = withLongRequestSlot(next.request);
    await flush();
    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 2 });

    failing.fail();
    await expect(failingDone).rejects.toThrow('panne');
    await expect(throwingDone).rejects.toThrow('Failed to fetch');
    await flush();

    expect(throwing).toHaveBeenCalledTimes(1);
    expect(next.started).toHaveBeenCalledTimes(1);
    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 0 });
    for (const r of [...running, next]) r.finish();
    await Promise.all([...done, nextDone]);
  });

  it('signal annulé une fois la place obtenue : la requête décide (son fetch reçoit le signal), sa place est rendue à sa fin', async () => {
    const controller = new AbortController();
    const request = heldRequest();
    const done = withLongRequestSlot(request.request, controller.signal);
    await flush();
    expect(request.started).toHaveBeenCalledTimes(1);

    controller.abort();
    await flush();
    expect(longRequestSlots()).toEqual({ inFlight: 1, waiting: 0 });

    request.finish();
    await expect(done).resolves.toBe('done');
  });
});
