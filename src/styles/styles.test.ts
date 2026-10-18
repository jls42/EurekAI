import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const read = (path: string): string => readFileSync(new URL(path, import.meta.url), 'utf-8');

const withoutComments = (css: string): string => {
  return css
    .split('/*')
    .map((part, i) => (i === 0 ? part : part.slice(part.indexOf('*/') + 2)))
    .join('');
};

const MOTION = /^\s*(animation|transition)(-[a-z-]+)?\s*:/;
const REDUCED_MOTION = /prefers-reduced-motion:\s*(no-preference|reduce)/;

// Déclarations d'animation ou de transition hors d'un bloc prefers-reduced-motion (pile des blocs ouverts).
const unguardedMotion = (css: string): string[] => {
  const open: string[] = [];
  const found: string[] = [];
  for (const line of css.split('\n')) {
    const guarded = open.some((header) => REDUCED_MOTION.test(header));
    if (MOTION.test(line) && !guarded) found.push(line.trim());
    if (line.includes('{')) open.push(line);
    if (line.includes('}')) open.pop();
  }
  return found;
};

const STYLES = withoutComments(read('./main.css') + read('./theme.css'));

describe('feuilles de style', () => {
  // SonarCloud css:S9423 (ajoutée au profil le 2026-10-18). Les utilitaires Tailwind 4 sont dans une
  // couche : une règle hors couche l'emporte sans !important.
  it("n'emploient jamais !important", () => {
    expect(STYLES).not.toContain('!important');
  });

  // Sans !important, le bloc reduce ne remplace plus une animation du site (même spécificité ou plus) :
  // chacune vit sous prefers-reduced-motion: no-preference.
  it('réservent chaque animation à prefers-reduced-motion', () => {
    expect(unguardedMotion(STYLES)).toEqual([]);
  });

  it('repèrent une animation hors de ce bloc (forme réelle de .btn-press avant le 2026-10-18)', () => {
    const before = '.btn-press {\n  transition: transform var(--transition-fast) ease;\n}';
    expect(unguardedMotion(before)).toEqual(['transition: transform var(--transition-fast) ease;']);
    const after =
      '.btn-press {\n  @media (prefers-reduced-motion: no-preference) {\n    transition: transform 1s;\n  }\n}';
    expect(unguardedMotion(after)).toEqual([]);
  });
});
