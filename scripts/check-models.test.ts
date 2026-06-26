import { describe, it, expect } from 'vitest';
import { analyzeModels } from './check-models.js';

describe('analyzeModels', () => {
  it('flags a watched alias pointing to a deprecated dated version', () => {
    const warnings = analyzeModels([
      {
        id: 'mistral-moderation-2411',
        aliases: ['mistral-moderation-latest'],
        deprecation: '2026-06-30T12:00:00Z',
      },
    ]);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('mistral-moderation-latest');
    expect(warnings[0]).toContain('mistral-moderation-2411');
  });

  it('is silent when watched aliases point to current (non-deprecated) versions', () => {
    const warnings = analyzeModels([
      { id: 'mistral-large-2512', aliases: ['mistral-large-latest'], deprecation: null },
      { id: 'mistral-ocr-4-0', aliases: ['mistral-ocr-latest'], deprecation: null },
    ]);
    expect(warnings).toHaveLength(0);
  });

  it('tolerates a missing aliases/deprecation shape (no false diagnostic)', () => {
    expect(analyzeModels([{ id: 'x' }])).toHaveLength(0);
    expect(analyzeModels([])).toHaveLength(0);
  });

  it('ignores deprecated models that are NOT a watched alias target', () => {
    const warnings = analyzeModels([
      { id: 'some-old-model-2402', aliases: ['some-old-latest'], deprecation: '2025-01-01' },
    ]);
    expect(warnings).toHaveLength(0);
  });
});
