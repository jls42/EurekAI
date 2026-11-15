import { describe, expect, it } from 'vitest';
import {
  DEFAULT_CHAT_MODEL,
  MISTRAL_LARGE_4,
  MOVING_LARGE_ALIAS,
  pinChatModel,
  withReasoningDefault,
} from './chat-models.js';

const messages = [{ role: 'user' as const, content: 'ok' }];

describe('withReasoningDefault', () => {
  // Large 4 refuse `none` depuis sa GA (400 « supported values: high, low, medium ») : `low`.
  it('réduit la réflexion de Large 4 au minimum accepté (id épinglé et alias)', () => {
    for (const model of [MISTRAL_LARGE_4, 'mistral-large-4']) {
      expect(withReasoningDefault({ model, messages }).reasoningEffort).toBe('low');
    }
  });

  it('garde un choix explicite de l’appelant', () => {
    const request = { model: MISTRAL_LARGE_4, messages, reasoningEffort: 'high' as const };
    expect(withReasoningDefault(request)).toBe(request);
  });

  it('réduit aussi quand la valeur vaut null', () => {
    const request = { model: MISTRAL_LARGE_4, messages, reasoningEffort: null };
    expect(withReasoningDefault(request).reasoningEffort).toBe('low');
  });

  it('ne touche pas aux modèles qui ne raisonnent pas par défaut', () => {
    for (const model of [DEFAULT_CHAT_MODEL, 'mistral-medium-latest', 'mistral-small-latest']) {
      const request = { model, messages };
      expect(withReasoningDefault(request)).toBe(request);
    }
  });
});

describe('modèle de génération par défaut', () => {
  it('est Large 3 épinglé, jamais l’alias mouvant', () => {
    expect(DEFAULT_CHAT_MODEL).toBe('mistral-large-2512');
    expect(DEFAULT_CHAT_MODEL).not.toBe(MOVING_LARGE_ALIAS);
  });

  it('pinChatModel fige l’alias mouvant sur Large 3 et laisse les autres choix', () => {
    expect(pinChatModel('mistral-large-latest')).toBe(DEFAULT_CHAT_MODEL);
    for (const model of [MISTRAL_LARGE_4, 'mistral-medium-latest', 'mistral-small-latest']) {
      expect(pinChatModel(model)).toBe(model);
    }
  });
});
