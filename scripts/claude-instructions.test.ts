/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return -- Codacy lance ESLint sans resolution des types vitest (faux positifs) ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import { existsSync, globSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Verrou du découpage de CLAUDE.md en divulgation progressive (2026-10-21). Au démarrage, Claude
// Code charge CLAUDE.md et toute règle `.claude/rules/**/*.md` SANS frontmatter `paths` ; une règle
// avec `paths` ne se charge que lorsque Claude lit, écrit ou modifie un fichier correspondant. Un
// frontmatter illisible fait charger la règle au démarrage, en silence : d'où la forme stricte.

const ROOT = resolve(import.meta.dirname, '..');
const CLAUDE_MD = 'CLAUDE.md';
const PROJECT_CLAUDE_MD = '.claude/CLAUDE.md';
const RULES_GLOB = '.claude/rules/**/*.md';

// Cible de la documentation Claude Code pour un CLAUDE.md.
const MAX_CLAUDE_MD_LINES = 200;
// Caractères chargés au démarrage : CLAUDE.md, `.claude/CLAUDE.md` et règles sans `paths`. Claude
// Code avertit au-delà de 150 k caractères d'instructions combinées sur un modèle à 1M de contexte
// (120 k sur 200k), dont ~8 k pour le fichier utilisateur du propriétaire ; seuil par fichier :
// 40 k caractères sur 200k.
const STARTUP_CHAR_BUDGET = 25_000;
const MAX_RULE_CHARS = 30_000;

// Forme acceptée, à l'octet près : `---`, `paths:`, une ligne `  - "motif"` par motif, `---`.
// Pas de barre oblique inverse (\x5c) dans un motif : entre guillemets doubles, YAML la lit comme
// un échappement, et un échappement invalide rend le frontmatter illisible.
// \x22 = guillemet droit, \x60 = accent grave : jamais en clair dans une regex (pièges Lizard) ;
// \x2f = barre oblique dans une classe de caractères (no-useless-escape refuse `\/`).
const FRONTMATTER = /^---\npaths:\n((?: {2}- \x22[^\x22\x5c\n]+\x22\n)+)---\n/;
const GLOB_ITEM = /^ {2}- \x22([^\x22\x5c\n]+)\x22$/gm;
const IGNORED_DIR = /^(node_modules|dist|output|coverage|\.git)(\/|$)/;
const FENCE = '\x60\x60\x60';
const CODE_SPAN = /\x60[^\x60\n]*\x60/g;
const AT_IMPORT = /(^|\s)@[\w.\x2f~-]/;

const read = (path: string): string => readFileSync(resolve(ROOT, path), 'utf-8');
const chars = (text: string): number => [...text].length;
const isIgnored = (path: string): boolean => IGNORED_DIR.test(path);
const matchingFiles = (glob: string): string[] => {
  return globSync(glob, { cwd: ROOT, exclude: isIgnored });
};

// Motifs `paths` d'une règle, ou null si son frontmatter n'a pas la forme stricte.
const rulePaths = (text: string): string[] | null => {
  const frontmatter = FRONTMATTER.exec(text);
  if (!frontmatter) return null;
  return [...frontmatter[1].matchAll(GLOB_ITEM)].map((item) => item[1]);
};

// Lignes hors blocs de code, spans de code retirés : un @chemin qui y reste serait un import.
const outsideCode = (markdown: string): string[] => {
  let inFence = false;
  const lines: string[] = [];
  for (const line of markdown.split('\n')) {
    if (line.trimStart().startsWith(FENCE)) inFence = !inFence;
    else if (!inFence) lines.push(line.replaceAll(CODE_SPAN, ''));
  }
  return lines;
};

const RULES = globSync(RULES_GLOB, { cwd: ROOT }).sort((a, b) => a.localeCompare(b));
const claude = read(CLAUDE_MD);

describe('CLAUDE.md : divulgation progressive', () => {
  it('tient en 200 lignes au plus', () => {
    const lines = claude.replace(/\n$/, '').split('\n');
    expect(lines.length).toBeLessThanOrEqual(MAX_CLAUDE_MD_LINES);
  });

  it('charge au plus 25 000 caractères au démarrage', () => {
    const projectFile = existsSync(resolve(ROOT, PROJECT_CLAUDE_MD)) ? read(PROJECT_CLAUDE_MD) : '';
    const unscoped = RULES.map((rule) => read(rule)).filter((text) => rulePaths(text) === null);
    const total = [claude, projectFile, ...unscoped].reduce((sum, text) => sum + chars(text), 0);
    expect(total).toBeLessThanOrEqual(STARTUP_CHAR_BUDGET);
  });

  it("n'importe aucun fichier par @chemin hors code", () => {
    expect(outsideCode(claude).filter((line) => AT_IMPORT.test(line))).toEqual([]);
  });

  it('trouve les fichiers de règles', () => {
    expect(RULES).toContain('.claude/rules/prompts.md');
  });
});

describe.each(RULES)('%s', (rule) => {
  const text = read(rule);
  const paths = rulePaths(text) ?? [];

  it('a un frontmatter paths strict et non vide', () => {
    expect(rulePaths(text)).not.toBeNull();
    expect(paths.length).toBeGreaterThan(0);
  });

  it('chaque motif de paths correspond à au moins un fichier', () => {
    expect(paths.filter((glob) => matchingFiles(glob).length === 0)).toEqual([]);
  });

  it('reste sous 30 000 caractères', () => {
    expect(chars(text)).toBeLessThan(MAX_RULE_CHARS);
  });

  it('est cité dans CLAUDE.md', () => {
    expect(claude).toContain(rule);
  });
});
