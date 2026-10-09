import { describe, expect, it } from 'vitest';
import { MISTRAL_LARGE_4, withReasoningDefault } from './chat-models.js';

const messages = [{ role: 'user' as const, content: 'ok' }];

describe('withReasoningDefault', () => {
  it('coupe la réflexion de Large 4 (id épinglé et alias)', () => {
    for (const model of [MISTRAL_LARGE_4, 'mistral-large-4']) {
      expect(withReasoningDefault({ model, messages }).reasoningEffort).toBe('none');
    }
  });

  it('garde un choix explicite de l’appelant', () => {
    const request = { model: MISTRAL_LARGE_4, messages, reasoningEffort: 'high' as const };
    expect(withReasoningDefault(request)).toBe(request);
  });

  it('coupe aussi quand la valeur vaut null', () => {
    const request = { model: MISTRAL_LARGE_4, messages, reasoningEffort: null };
    expect(withReasoningDefault(request).reasoningEffort).toBe('none');
  });

  it('ne touche pas aux modèles qui ne raisonnent pas par défaut', () => {
    for (const model of ['mistral-large-latest', 'mistral-medium-latest', 'mistral-small-latest']) {
      const request = { model, messages };
      expect(withReasoningDefault(request)).toBe(request);
    }
  });
});
