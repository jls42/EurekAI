import { describe, it, expect } from 'vitest';
import { fr } from './fr';
import { en } from './en';
import { es } from './es';
import { pt } from './pt';
import { it as itLocale } from './it';
import { nl } from './nl';
import { de } from './de';
import { hi } from './hi';
import { ar } from './ar';

const locales: Record<string, Record<string, string>> = {
  fr,
  en,
  es,
  pt,
  it: itLocale,
  nl,
  de,
  hi,
  ar,
};

const reference = fr;
const refKeys = Object.keys(reference).sort((a, b) => a.localeCompare(b));
const placeholderRegex = /\{(\w+)\}/g;

describe('i18n dictionaries sync', () => {
  for (const [name, dict] of Object.entries(locales)) {
    describe(`${name}.ts`, () => {
      const dictKeys = Object.keys(dict).sort((a, b) => a.localeCompare(b));

      it('should have all keys from fr.ts', () => {
        const missing = refKeys.filter((k) => !(k in dict));
        expect(missing, `Missing keys in ${name}.ts: ${missing.join(', ')}`).toEqual([]);
      });

      it('should not have extra keys beyond fr.ts', () => {
        const extra = dictKeys.filter((k) => !(k in reference));
        expect(extra, `Extra keys in ${name}.ts: ${extra.join(', ')}`).toEqual([]);
      });

      it('should have the same number of keys as fr.ts', () => {
        expect(dictKeys.length).toBe(refKeys.length);
      });

      it('should have no empty values', () => {
        const empty = dictKeys.filter((k) => dict[k].trim() === '');
        expect(empty, `Empty values in ${name}.ts: ${empty.join(', ')}`).toEqual([]);
      });

      it('should match interpolation placeholders with fr.ts', () => {
        const mismatches: string[] = [];
        for (const key of refKeys) {
          if (!(key in dict)) continue;
          const frPlaceholders = [...reference[key].matchAll(placeholderRegex)]
            .map((m) => m[1])
            .sort((a, b) => a.localeCompare(b));
          const localePlaceholders = [...dict[key].matchAll(placeholderRegex)]
            .map((m) => m[1])
            .sort((a, b) => a.localeCompare(b));
          if (JSON.stringify(frPlaceholders) !== JSON.stringify(localePlaceholders)) {
            mismatches.push(
              `${key}: fr={${frPlaceholders.join(',')}} ${name}={${localePlaceholders.join(',')}}`,
            );
          }
        }
        expect(mismatches, `Placeholder mismatches:\n${mismatches.join('\n')}`).toEqual([]);
      });
    });
  }
});
