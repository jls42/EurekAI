import { describe, it, expect } from 'vitest';
import {
  normalizeReadingComfort,
  isValidReadingComfortInput,
  READING_COMFORT_LIMITS,
} from './reading-comfort.js';

describe('normalizeReadingComfort', () => {
  it('retourne undefined pour null / non-objet / array', () => {
    expect(normalizeReadingComfort(null)).toBeUndefined();
    expect(normalizeReadingComfort(undefined)).toBeUndefined();
    expect(normalizeReadingComfort('luciole')).toBeUndefined();
    expect(normalizeReadingComfort(42)).toBeUndefined();
    expect(normalizeReadingComfort([0.1])).toBeUndefined();
  });

  it('retourne undefined quand tout est au défaut (profil sans préférence)', () => {
    expect(normalizeReadingComfort({})).toBeUndefined();
    expect(
      normalizeReadingComfort({
        font: 'default',
        letterSpacing: 0,
        wordSpacing: 0,
        lineHeight: 1.7,
      }),
    ).toBeUndefined();
  });

  it('garde uniquement les valeurs hors défaut', () => {
    expect(normalizeReadingComfort({ font: 'luciole', letterSpacing: 0.12 })).toEqual({
      font: 'luciole',
      letterSpacing: 0.12,
    });
  });

  it('clamp les nombres dans les plages sûres', () => {
    expect(normalizeReadingComfort({ letterSpacing: 99 })).toEqual({
      letterSpacing: READING_COMFORT_LIMITS.letterSpacing.max,
    });
    expect(normalizeReadingComfort({ lineHeight: 0.1 })).toEqual({
      lineHeight: READING_COMFORT_LIMITS.lineHeight.min,
    });
    // Un clamp qui retombe sur le défaut est droppé (letterSpacing min = défaut 0).
    expect(normalizeReadingComfort({ letterSpacing: -5 })).toBeUndefined();
  });

  it('ignore NaN/Infinity et les types non numériques', () => {
    expect(normalizeReadingComfort({ letterSpacing: Number.NaN })).toBeUndefined();
    expect(normalizeReadingComfort({ wordSpacing: Number.POSITIVE_INFINITY })).toBeUndefined();
    expect(normalizeReadingComfort({ lineHeight: '2' })).toBeUndefined();
  });

  it('ignore une police inconnue', () => {
    expect(normalizeReadingComfort({ font: 'comic-sans' })).toBeUndefined();
  });
});

describe('isValidReadingComfortInput', () => {
  it('accepte null (reset explicite) et les objets bien typés', () => {
    expect(isValidReadingComfortInput(null)).toBe(true);
    expect(isValidReadingComfortInput({})).toBe(true);
    expect(isValidReadingComfortInput({ font: 'luciole', letterSpacing: 0.1 })).toBe(true);
    expect(isValidReadingComfortInput({ font: 'default' })).toBe(true);
  });

  it('refuse primitives, arrays, police inconnue et nombres invalides', () => {
    expect(isValidReadingComfortInput('luciole')).toBe(false);
    expect(isValidReadingComfortInput(3)).toBe(false);
    expect(isValidReadingComfortInput([])).toBe(false);
    expect(isValidReadingComfortInput({ font: 'papyrus' })).toBe(false);
    expect(isValidReadingComfortInput({ letterSpacing: 'large' })).toBe(false);
    expect(isValidReadingComfortInput({ lineHeight: Number.NaN })).toBe(false);
  });
});
