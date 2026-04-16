import { describe, it, expect } from 'vitest';
import { LABEL_RE, spokenChoiceLabel, toSpokenChoice, stripChoiceLabel } from './choice-labels.js';

describe('LABEL_RE', () => {
  it('matches standard labels A) B) C) D)', () => {
    expect('A) Paris'.match(LABEL_RE)).not.toBeNull();
    expect('B) Lyon'.match(LABEL_RE)).not.toBeNull();
    expect('C) Marseille'.match(LABEL_RE)).not.toBeNull();
    expect('D) Toulouse'.match(LABEL_RE)).not.toBeNull();
  });

  it('tolerates typographic variants (different punctuation, extra spaces)', () => {
    // Different punctuation
    expect('A. Paris'.match(LABEL_RE)).not.toBeNull();
    expect('A: Paris'.match(LABEL_RE)).not.toBeNull();
    // Extra spaces
    expect('A  )  Paris'.match(LABEL_RE)).not.toBeNull();
    expect('  A) Paris  '.match(LABEL_RE)).not.toBeNull();
    expect('A )Paris'.match(LABEL_RE)).not.toBeNull();
  });

  it('NEVER matches words that begin with A/B/C/D but have no real separator', () => {
    // CRITICAL: these would cause catastrophic false-matches like "choix A : lice"
    expect('Alice'.match(LABEL_RE)).toBeNull();
    expect('Dunkerque'.match(LABEL_RE)).toBeNull();
    expect('Berlin'.match(LABEL_RE)).toBeNull();
    expect('Cardinal'.match(LABEL_RE)).toBeNull();
  });

  it('NEVER matches phrases starting with letter + space (no punctuation)', () => {
    // "A propos" → would otherwise become "choix A : propos de la Révolution"
    expect('A propos de la Révolution'.match(LABEL_RE)).toBeNull();
    expect('A Paris'.match(LABEL_RE)).toBeNull();
  });

  it('NEVER matches letter + dash (volontarily excluded for "A-t-on" safety)', () => {
    expect('A-t-on le droit de questionner ?'.match(LABEL_RE)).toBeNull();
    expect('A-Paris'.match(LABEL_RE)).toBeNull();
  });

  it('does not match accented A (not in [A-D])', () => {
    expect('À Paris'.match(LABEL_RE)).toBeNull();
  });

  it('does not match letters outside A-D', () => {
    expect('E) Other'.match(LABEL_RE)).toBeNull();
    expect('a) lowercase'.match(LABEL_RE)).toBeNull();
  });
});

describe('spokenChoiceLabel', () => {
  it('returns localized label for the 7 supported TTS languages', () => {
    expect(spokenChoiceLabel('fr')).toBe('choix');
    expect(spokenChoiceLabel('en')).toBe('choice');
    expect(spokenChoiceLabel('es')).toBe('opción');
    expect(spokenChoiceLabel('de')).toBe('Auswahl');
    expect(spokenChoiceLabel('it')).toBe('scelta');
    expect(spokenChoiceLabel('pt')).toBe('opção');
    expect(spokenChoiceLabel('nl')).toBe('keuze');
  });

  it('falls back to French for unsupported languages (cf. décision produit #10)', () => {
    expect(spokenChoiceLabel('ja')).toBe('choix');
    expect(spokenChoiceLabel('ar')).toBe('choix');
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

  it('strips typographic variants (aligned with LABEL_RE — Phase 2.5 alignment)', () => {
    expect(stripChoiceLabel('A. Paris')).toBe('Paris');
    expect(stripChoiceLabel('A: Paris')).toBe('Paris');
    expect(stripChoiceLabel('A  )  Paris')).toBe('Paris');
  });

  it('returns text unchanged when no label match', () => {
    expect(stripChoiceLabel('Alice')).toBe('Alice');
    expect(stripChoiceLabel('Paris sans label')).toBe('Paris sans label');
  });
});
