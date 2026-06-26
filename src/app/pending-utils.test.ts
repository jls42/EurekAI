import { describe, it, expect } from 'vitest';
import { pendingOfTypeExists } from './pending-utils.js';

describe('pendingOfTypeExists', () => {
  it('returns true when a pending of the type exists', () => {
    expect(pendingOfTypeExists({ g1: { type: 'quiz', status: 'pending' } }, 'quiz')).toBe(true);
  });

  it('returns false for a different type or a non-pending status', () => {
    expect(pendingOfTypeExists({ g1: { type: 'quiz', status: 'completed' } }, 'quiz')).toBe(false);
    expect(pendingOfTypeExists({ g1: { type: 'summary', status: 'pending' } }, 'quiz')).toBe(false);
  });

  it('tolerates an undefined map (partial state of test mocks)', () => {
    expect(pendingOfTypeExists(undefined, 'quiz')).toBe(false);
  });
});
