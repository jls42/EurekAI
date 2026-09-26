/* eslint-disable
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-assignment
   --
   Codacy lance ESLint sans les types Vitest; lint:ci local reste type-aware. */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { sourceContentMasked } from './effective-moderation';
import type { ModerationStatus, Profile, Source } from '../../types';

const profile = (overrides: Partial<Profile> = {}): Profile => ({
  id: 'p1',
  name: 'Zoé',
  age: 9,
  ageGroup: 'enfant',
  avatar: '0',
  locale: 'fr',
  useModeration: true,
  moderationCategories: ['criminal'],
  useConsigne: true,
  chatEnabled: false,
  createdAt: '2026-09-01T00:00:00.000Z',
  ...overrides,
});

const source = (id: string, moderation?: Source['moderation']): Source => ({
  id,
  filename: `${id}.png`,
  markdown: 'Texte de la leçon',
  uploadedAt: '2026-09-26T10:00:00.000Z',
  ...(moderation ? { moderation } : {}),
});

const withStatus = (status: string, categories: Record<string, boolean> = {}): Source =>
  source('s1', { status: status as ModerationStatus, categories });

const state = (currentProfile: Profile | null, revealedSourceIds: string[] = []) => ({
  currentProfile,
  moderationDefaults: { enfant: ['sexual'] },
  revealedSourceIds,
});

describe('sourceContentMasked', () => {
  const moderated = state(profile());

  it.each([
    ['signalée (unsafe)', withStatus('unsafe')],
    ['modération en erreur', withStatus('error')],
    ['vérification en cours (pending)', withStatus('pending')],
    ['jamais vérifiée (sans objet moderation)', source('s1')],
    ['statut inattendu (donnée corrompue)', withStatus('blocked')],
    ['safe promue unsafe (catégorie bloquée signalée)', withStatus('safe', { criminal: true })],
  ])('profil modéré, source %s → masquée', (_label, src) => {
    expect(sourceContentMasked(moderated, src)).toBe(true);
  });

  it('profil modéré, source sûre → affichée', () => {
    expect(sourceContentMasked(moderated, withStatus('safe', { criminal: false }))).toBe(false);
    // Catégorie signalée mais non bloquée par le profil : statut affiché safe.
    expect(sourceContentMasked(moderated, withStatus('safe', { health: true }))).toBe(false);
  });

  it.each([
    ['modération inactive', profile({ useModeration: false })],
    ['aucun profil', null],
  ])('%s : jamais masquée, même signalée ou jamais vérifiée', (_label, current) => {
    const s = state(current);
    expect(sourceContentMasked(s, withStatus('unsafe'))).toBe(false);
    expect(sourceContentMasked(s, withStatus('pending'))).toBe(false);
    expect(sourceContentMasked(s, source('s1'))).toBe(false);
  });

  it('source révélée par un parent : affichée, les autres restent masquées', () => {
    const revealed = state(profile(), ['s1']);
    expect(sourceContentMasked(revealed, withStatus('unsafe'))).toBe(false);
    expect(sourceContentMasked(revealed, source('s2', { status: 'unsafe', categories: {} }))).toBe(
      true,
    );
  });

  it('sans liste de révélation (état partiel) : masquée', () => {
    const partial = { currentProfile: profile(), moderationDefaults: {} };
    expect(sourceContentMasked(partial, withStatus('unsafe'))).toBe(true);
  });

  it('aucune source : rien à masquer', () => {
    expect(sourceContentMasked(moderated, null)).toBe(false);
    expect(sourceContentMasked(moderated, undefined)).toBe(false);
  });
});

// Gabarits : l'aperçu de la carte, le texte OCR, l'original et la comparaison ne sont RENDUS que
// hors masquage (x-if, pas x-show) — sinon le texte resterait dans le DOM et l'image ou le PDF
// seraient demandés au serveur.
describe('gabarits : contenu conditionné par le masquage', () => {
  const partial = (name: string) =>
    readFileSync(new URL(`../partials/${name}.html`, import.meta.url), 'utf-8');

  // Plages [début, fin] des blocs `<template x-if="<condition>">`, fermeture appariée (profondeur
  // des <template> imbriqués comptée).
  const templateBlocks = (html: string, condition: string): Array<[number, number]> => {
    const opening = `<template x-if="${condition}">`;
    const blocks: Array<[number, number]> = [];
    let start = html.indexOf(opening);
    while (start !== -1) {
      const tags = /<template\b|<\/template>/g;
      tags.lastIndex = start + opening.length;
      let depth = 1;
      let match: RegExpExecArray | null = null;
      while (depth > 0 && (match = tags.exec(html)) !== null) {
        depth += match[0] === '</template>' ? -1 : 1;
      }
      blocks.push([start, match ? match.index : html.length]);
      start = html.indexOf(opening, start + opening.length);
    }
    return blocks;
  };

  const occurrences = (html: string, needle: string): number[] => {
    const found: number[] = [];
    for (let i = html.indexOf(needle); i !== -1; i = html.indexOf(needle, i + needle.length)) {
      found.push(i);
    }
    return found;
  };

  const expectAllInside = (html: string, needle: string, condition: string, count: number) => {
    const blocks = templateBlocks(html, condition);
    const found = occurrences(html, needle);
    expect(found, `${needle} : occurrences`).toHaveLength(count);
    for (const index of found) {
      expect(
        blocks.some(([from, to]) => index > from && index < to),
        `${needle} hors de <template x-if="${condition}">`,
      ).toBe(true);
    }
  };

  it("carte source : l'aperçu du texte n'est rendu que hors masquage", () => {
    const html = partial('view-sources');
    expectAllInside(html, 'src.markdown', '!sourceContentMasked(src)', 1);
    expect(html).toContain('<template x-if="sourceContentMasked(src)">');
    expect(html).toContain('x-text="sourceMaskMessage(src)"');
  });

  it('dialogue source : texte OCR, original (image, PDF) et comparaison conditionnés', () => {
    const html = partial('dialog-source');
    const unmasked = '!sourceContentMasked(viewSource)';
    // Texte OCR + colonne texte de la comparaison.
    expectAllInside(html, 'viewSource.markdown', unmasked, 2);
    // <img> et <iframe> du mode original ET de la comparaison : l'URL n'est jamais demandée.
    expectAllInside(html, ':src="getOriginalFileUrl(viewSource)"', unmasked, 4);
    expect(templateBlocks(html, unmasked)).toHaveLength(1);
  });

  it('dialogue source : encart avec révélation parentale, remasqué à toute fermeture', () => {
    const html = partial('dialog-source');
    const masked = templateBlocks(html, 'sourceContentMasked(viewSource)');
    expect(masked).toHaveLength(1);
    const [from, to] = masked[0];
    const encart = html.slice(from, to);
    expect(encart).toContain('x-text="sourceMaskMessage(viewSource)"');
    expect(encart).toMatch(/<button\s+type="button"\s+@click="revealSourceContent\(viewSource\)"/);
    expect(encart).not.toContain('viewSource.markdown');
    expect(encart).not.toContain('getOriginalFileUrl');
    // Échap ferme le <dialog> sans passer par le bouton : l'événement close remet le masque.
    expect(html).toMatch(/<dialog\s+x-ref="sourceDialog"\s+@close="closeSourceDialog\(\)"/);
  });
});
