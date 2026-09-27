import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
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
        expect(dictKeys).toHaveLength(refKeys.length);
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

// Tout code d'erreur stable renvoyé par le serveur (`{ error: 'code' }`) a sa traduction
// `errorCode.<code>` : sans elle, le toast affichait le code brut à l'enfant (`stale`,
// `project_not_found`…). Lit les sources du serveur (routes, helpers, server.ts) ; les autres
// langues suivent par le test de synchronisation ci-dessus.
describe('codes d’erreur du serveur', () => {
  const root = new URL('../../', import.meta.url);
  const serverFiles = (dir: string): string[] =>
    readdirSync(new URL(dir, root))
      .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
      .map((f) => dir + f);
  // Code écrit dans la réponse, dans une constante ERR_* ou dans une erreur de validation typée.
  const CODE_RE =
    /(?:error: |const ERR_[A-Z_]+ = |ValidationError\(\d{3}, )[\x27\x22]([a-z][a-z_]*)[\x27\x22]/g;

  it('chaque code stable envoyé a sa clé errorCode.* (fr)', () => {
    const files = [...serverFiles('routes/'), ...serverFiles('helpers/'), 'server.ts'];
    const codes = new Set<string>();
    for (const file of files) {
      const source = readFileSync(new URL(file, root), 'utf-8');
      for (const match of source.matchAll(CODE_RE)) codes.add(match[1]);
    }
    expect(codes.size).toBeGreaterThan(10);
    const missing = [...codes]
      .filter((code) => !Object.hasOwn(fr, `errorCode.${code}`))
      .sort((a, b) => a.localeCompare(b));
    expect(missing, `Codes sans clé errorCode.* : ${missing.join(', ')}`).toEqual([]);
  });

  // Un refus porte un code stable (ou une clé i18n pointée), jamais un texte : « Projet
  // introuvable », « Nom requis »… s'affichaient tels quels, en français, dans les 9 langues.
  it('aucun refus n’envoie un texte au lieu d’un code', () => {
    const files = [...serverFiles('routes/'), ...serverFiles('helpers/'), 'server.ts'];
    const PAYLOAD_RE =
      /(?:error: |const ERR_[A-Z_]+ = |ValidationError\(\d{3}, )[\x27\x22]([^\x27\x22]*)[\x27\x22]/g;
    const STABLE = /^[a-z][a-z_]*(?:\.[a-zA-Z_]+)*$/;
    const texts: string[] = [];
    for (const file of files) {
      const source = readFileSync(new URL(file, root), 'utf-8');
      for (const match of source.matchAll(PAYLOAD_RE)) {
        if (!STABLE.test(match[1])) texts.push(`${file}: ${match[1]}`);
      }
    }
    expect(texts).toEqual([]);
  });
});
