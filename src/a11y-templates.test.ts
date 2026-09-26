/* eslint-disable
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-assignment
   --
   Codacy lance ESLint sans les types Vitest; lint:ci local reste type-aware. */
// Verrous statiques d'accessibilité des gabarits (lecture du HTML, sans navigateur) : état des
// interrupteurs lu par les lecteurs d'écran, curseur miroir en RTL, nom accessible qui contient
// le libellé visible (WCAG 2.5.3), boutons d'annulation nommés.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fr } from './i18n/fr';
import { en } from './i18n/en';
import { es } from './i18n/es';
import { pt } from './i18n/pt';
import { it as itLocale } from './i18n/it';
import { nl } from './i18n/nl';
import { de } from './i18n/de';
import { hi } from './i18n/hi';
import { ar } from './i18n/ar';

const read = (path: string): string => readFileSync(new URL(path, import.meta.url), 'utf-8');

// Bloc `<button …>…</button>` qui contient `marker`.
const buttonAround = (html: string, marker: string): string => {
  const at = html.indexOf(marker);
  expect(at, marker).toBeGreaterThan(-1);
  return html.slice(html.lastIndexOf('<button', at), html.indexOf('</button>', at));
};

describe('Espace parent : interrupteurs accessibles (profile-picker.html)', () => {
  const html = read('./partials/profile-picker.html');

  it.each([
    ['useModeration', 'profile.moderationToggle'],
    ['chatEnabled', 'profile.chatToggle'],
  ])('%s : role switch, état et nom accessibles, curseur miroir en RTL', (field, labelKey) => {
    const toggle = buttonAround(html, `editingProfile.${field} = !editingProfile.${field}`);
    expect(toggle).toContain('type="button"');
    expect(toggle).toContain('role="switch"');
    expect(toggle).toContain(`:aria-checked="String(!!editingProfile?.${field})"`);
    expect(toggle).toContain(`:aria-label="t('${labelKey}')"`);
    // translate est physique : sans rtl:, le curseur part du mauvais côté en arabe.
    expect(toggle).toContain(
      `'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'`,
    );
    // Piste « désactivé » sur un token (deux thèmes), plus de gris Tailwind brut.
    expect(toggle).toContain("'bg-text-secondary'");
    expect(toggle).not.toContain('bg-gray-300');
  });
});

// Chaque expression affichée (x-text) d'un bouton de catégorie figure dans son aria-label :
// « Générer : Fiches » pour un bouton qui affiche « Fiches », jamais « Générer : Fiche ».
describe('boutons de catégorie : le nom accessible contient le libellé visible', () => {
  // Guillemets en \x22 / \x27 : dans une regex littérale, Lizard les prend pour des chaînes et ne
  // délimite plus les fonctions suivantes (cf. CLAUDE.md, pièges Lizard).
  const LABEL_RE =
    /:aria-label=\x22t\(\x27a11y\.(?:generate|view)Category\x27, \{ category: (.+?) \}\)\x22/g;
  const files = [
    './partials/view-dashboard.html',
    './partials/view-sources.html',
    './index.html',
  ].map((path) => ({ path, html: read(path) }));

  const labelled = files.flatMap(({ path, html }) =>
    [...html.matchAll(LABEL_RE)].map((match) => ({
      path,
      category: match[1],
      button: buttonAround(html, match[0]),
    })),
  );

  it('4 boutons couverts (stats et génération du tableau de bord, sources, navigation)', () => {
    expect(labelled.map((b) => b.path)).toEqual([
      './partials/view-dashboard.html',
      './partials/view-dashboard.html',
      './partials/view-sources.html',
      './index.html',
    ]);
  });

  it.each(labelled.map((b) => [b.path, b.category, b.button]))(
    '%s : %s',
    (_path, category, button) => {
      const shown = [...button.matchAll(/x-text=\x22([^\x22]+)\x22/g)].map((m) => m[1]);
      expect(shown.length).toBeGreaterThan(0);
      for (const expression of shown) expect(category).toContain(expression);
    },
  );
});

describe('chips des générations en cours (index.html)', () => {
  const html = read('./index.html');
  const banner = html.slice(
    html.indexOf('<!-- Active generations banner -->'),
    html.indexOf('{{> view-dashboard}}'),
  );

  it("annulation d'une génération : bouton nommé par son type, icône décorative", () => {
    const cancel = buttonAround(banner, 'cancelOne(gen.key)');
    expect(cancel).toContain('type="button"');
    expect(cancel).toContain(`:aria-label="t('a11y.cancelGeneration', { type: gen.label })"`);
    expect(cancel).toContain('aria-hidden="true"');
  });

  it('« Tout annuler » : même traitement', () => {
    const cancelAll = buttonAround(banner, 'cancelGeneration()');
    expect(cancelAll).toContain('type="button"');
    expect(cancelAll).toContain('aria-hidden="true"');
    expect(cancelAll).toContain('ms-auto');
  });

  it('marges logiques uniquement (RTL) : ms-*, jamais ml-*/mr-*', () => {
    expect(banner).toContain('ms-1');
    expect(banner).not.toMatch(/\b(?:ml|mr)-/);
  });
});

describe('i18n : libellés accessibles sans article, dans les 9 langues', () => {
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

  it('FR : « Générer : X », « Voir : X », « Annuler : X »', () => {
    expect(fr['a11y.generateCategory']).toBe('Générer : {category}');
    expect(fr['a11y.viewCategory']).toBe('Voir : {category}');
    expect(fr['a11y.cancelGeneration']).toBe('Annuler : {type}');
  });

  it.each(Object.entries(locales))('%s : verbe puis « : » puis la catégorie', (_lang, dict) => {
    expect(dict['a11y.generateCategory']).toMatch(/^\S.*: \{category\}$/);
    expect(dict['a11y.viewCategory']).toMatch(/^\S.*: \{category\}$/);
    expect(dict['a11y.cancelGeneration']).toMatch(/^\S.*: \{type\}$/);
  });
});
