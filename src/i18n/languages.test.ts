import { describe, it, expect } from 'vitest';
import { UI_LANGUAGES } from './languages';

describe('UI_LANGUAGES', () => {
  it('contains 9 languages', () => {
    expect(UI_LANGUAGES).toHaveLength(9);
  });

  it('each entry has code, flag, and label', () => {
    for (const lang of UI_LANGUAGES) {
      expect(lang.code).toBeTruthy();
      expect(lang.flag).toBeTruthy();
      expect(lang.label).toBeTruthy();
    }
  });

  it('includes fr as first language', () => {
    expect(UI_LANGUAGES[0].code).toBe('fr');
  });

  it('includes ar for RTL support', () => {
    expect(UI_LANGUAGES.some((l) => l.code === 'ar')).toBe(true);
  });
});
