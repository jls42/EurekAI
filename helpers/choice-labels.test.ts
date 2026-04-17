import { describe, it, expect } from 'vitest';
import {
  parseChoiceLabel,
  spokenChoiceLabel,
  toSpokenChoice,
  stripChoiceLabel,
} from './choice-labels.js';

describe('parseChoiceLabel', () => {
  it('matches standard labels A) B) C) D)', () => {
    expect(parseChoiceLabel('A) Paris')).toEqual({ label: 'A', text: 'Paris' });
    expect(parseChoiceLabel('B) Lyon')).toEqual({ label: 'B', text: 'Lyon' });
    expect(parseChoiceLabel('C) Marseille')).toEqual({ label: 'C', text: 'Marseille' });
    expect(parseChoiceLabel('D) Toulouse')).toEqual({ label: 'D', text: 'Toulouse' });
  });

  it('tolerates typographic variants (different punctuation, extra spaces)', () => {
    // Different punctuation
    expect(parseChoiceLabel('A. Paris')).toEqual({ label: 'A', text: 'Paris' });
    expect(parseChoiceLabel('A: Paris')).toEqual({ label: 'A', text: 'Paris' });
    // Extra spaces
    expect(parseChoiceLabel('A  )  Paris')).toEqual({ label: 'A', text: 'Paris' });
    expect(parseChoiceLabel('  A) Paris  ')).toEqual({ label: 'A', text: 'Paris  ' });
    expect(parseChoiceLabel('A )Paris')).toEqual({ label: 'A', text: 'Paris' });
  });

  it('NEVER matches words that begin with A/B/C/D but have no real separator', () => {
    // CRITICAL: these would cause catastrophic false-matches like "choix A : lice"
    expect(parseChoiceLabel('Alice')).toBeNull();
    expect(parseChoiceLabel('Dunkerque')).toBeNull();
    expect(parseChoiceLabel('Berlin')).toBeNull();
    expect(parseChoiceLabel('Cardinal')).toBeNull();
  });

  it('NEVER matches phrases starting with letter + space (no punctuation)', () => {
    // "A propos" → would otherwise become "choix A : propos de la Révolution"
    expect(parseChoiceLabel('A propos de la Révolution')).toBeNull();
    expect(parseChoiceLabel('A Paris')).toBeNull();
  });

  it('NEVER matches letter + dash (volontarily excluded for "A-t-on" safety)', () => {
    expect(parseChoiceLabel('A-t-on le droit de questionner ?')).toBeNull();
    expect(parseChoiceLabel('A-Paris')).toBeNull();
  });

  it('does not match accented A (not in [A-D])', () => {
    expect(parseChoiceLabel('À Paris')).toBeNull();
  });

  it('does not match letters outside A-D', () => {
    expect(parseChoiceLabel('E) Other')).toBeNull();
    expect(parseChoiceLabel('a) lowercase')).toBeNull();
  });

  it('rejects multi-line inputs to avoid reading an adjacent line as choice content', () => {
    // Si un choix déborde sur 2 lignes, on refuse plutôt que de lire "A parenthèse Paris Lyon" en TTS.
    expect(parseChoiceLabel('A) Paris\nLyon')).toBeNull();
    expect(parseChoiceLabel('A) Paris\r\nLyon')).toBeNull();
    expect(parseChoiceLabel('A) Paris\u2028Lyon')).toBeNull();
    expect(parseChoiceLabel('A) Paris\u2029Lyon')).toBeNull();
  });
});

describe('spokenChoiceLabel', () => {
  it('returns localized label for the 9 UI languages (= 9 Voxtral-TTS)', () => {
    expect(spokenChoiceLabel('fr')).toBe('choix');
    expect(spokenChoiceLabel('en')).toBe('choice');
    expect(spokenChoiceLabel('es')).toBe('opción');
    expect(spokenChoiceLabel('de')).toBe('Auswahl');
    expect(spokenChoiceLabel('it')).toBe('scelta');
    expect(spokenChoiceLabel('pt')).toBe('opção');
    expect(spokenChoiceLabel('nl')).toBe('keuze');
    expect(spokenChoiceLabel('hi')).toBe('विकल्प');
    expect(spokenChoiceLabel('ar')).toBe('خيار');
  });

  it('falls back to French for languages outside the 9 UI locales', () => {
    expect(spokenChoiceLabel('ja')).toBe('choix');
    expect(spokenChoiceLabel('zh')).toBe('choix');
    expect(spokenChoiceLabel('xx')).toBe('choix');
  });
});

describe('toSpokenChoice', () => {
  it('transforms "A) Paris" into "choix A : Paris" in French', () => {
    expect(toSpokenChoice('A) Paris', 'fr')).toBe('choix A : Paris');
    expect(toSpokenChoice('B) Lyon', 'fr')).toBe('choix B : Lyon');
  });

  it('transforms with localized label in English', () => {
    expect(toSpokenChoice('A) Paris', 'en')).toBe('choice A : Paris');
  });

  it('transforms typographic variants correctly', () => {
    expect(toSpokenChoice('A. Paris', 'fr')).toBe('choix A : Paris');
    expect(toSpokenChoice('A: Paris', 'fr')).toBe('choix A : Paris');
    expect(toSpokenChoice('A  )  Paris', 'fr')).toBe('choix A : Paris');
  });

  it('returns text UNCHANGED when no label match (catastrophe prevention)', () => {
    // CRITICAL negative cases — would cause "choix A : lice" / "choix D : unkerque"
    expect(toSpokenChoice('Alice', 'fr')).toBe('Alice');
    expect(toSpokenChoice('Dunkerque', 'fr')).toBe('Dunkerque');
    expect(toSpokenChoice('A propos de la Révolution', 'fr')).toBe('A propos de la Révolution');
    expect(toSpokenChoice('A-t-on le droit ?', 'fr')).toBe('A-t-on le droit ?');
    expect(toSpokenChoice('A Paris', 'fr')).toBe('A Paris'); // dégradation acceptée
  });
});

describe('stripChoiceLabel', () => {
  it('strips standard labels', () => {
    expect(stripChoiceLabel('A) Paris')).toBe('Paris');
    expect(stripChoiceLabel('B) Lyon')).toBe('Lyon');
  });

  it('strips typographic variants (aligned with the label parser — Phase 2.5 alignment)', () => {
    expect(stripChoiceLabel('A. Paris')).toBe('Paris');
    expect(stripChoiceLabel('A: Paris')).toBe('Paris');
    expect(stripChoiceLabel('A  )  Paris')).toBe('Paris');
  });

  it('returns text unchanged when no label match', () => {
    expect(stripChoiceLabel('Alice')).toBe('Alice');
    expect(stripChoiceLabel('Paris sans label')).toBe('Paris sans label');
  });
});
