/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (faux positifs) ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import { countPendingOfType, MAX_PARALLEL_PER_TYPE, pendingOfTypeExists } from './pending-utils.js';

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

describe('countPendingOfType', () => {
  it('compte les seuls pendings en cours du type', () => {
    const pendingById = {
      g1: { type: 'quiz', status: 'pending' },
      g2: { type: 'quiz', status: 'pending' },
      g3: { type: 'quiz', status: 'failed' },
      g4: { type: 'summary', status: 'pending' },
    };
    expect(countPendingOfType(pendingById, 'quiz')).toBe(2);
  });

  it('tolère une map absente', () => {
    expect(countPendingOfType(undefined, 'quiz')).toBe(0);
  });

  it('plafond anti-flood : 3 générations en cours par type', () => {
    expect(MAX_PARALLEL_PER_TYPE).toBe(3);
  });
});
