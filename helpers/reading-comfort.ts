// Confort de lecture par profil (police Luciole, espacements, interligne).
// Module PARTAGÉ serveur/client : la normalisation (clamp + drop des valeurs par
// défaut) doit être identique des deux côtés — l'aperçu live du panneau profil
// (src/app/profiles.ts) et la persistance (profiles.ts) passent par les mêmes
// fonctions, sinon l'UI pourrait afficher une valeur qu'un POST refuserait.

export interface ReadingComfort {
  font?: 'luciole' | 'default';
  /** Espacement des lettres, en em (0 = normal). */
  letterSpacing?: number;
  /** Espacement des mots, en em (0 = normal). */
  wordSpacing?: number;
  /** Interligne sans unité (1.7 = défaut visuel de l'app, cf. main.css body). */
  lineHeight?: number;
}

// Plages sûres — anti valeurs absurdes d'un client buggé (ces nombres finissent
// en CSS via setProperty). 0.12em ≈ le sur-espacement des lettres validé chez des
// enfants dyslexiques (Zorzi et al., PNAS 2012) ; le max laisse de la marge sans
// permettre de rendre l'UI illisible.
export const READING_COMFORT_LIMITS = {
  letterSpacing: { min: 0, max: 0.3, default: 0 },
  wordSpacing: { min: 0, max: 0.6, default: 0 },
  lineHeight: { min: 1.2, max: 2.5, default: 1.7 },
} as const;

type NumericField = keyof typeof READING_COMFORT_LIMITS;

const clampField = (raw: unknown, field: NumericField): number | undefined => {
  if (typeof raw !== 'number' || !Number.isFinite(raw)) return undefined;
  const { min, max, default: def } = READING_COMFORT_LIMITS[field];
  const clamped = Math.min(max, Math.max(min, raw));
  return clamped === def ? undefined : clamped;
};

/**
 * Normalise un input arbitraire en ReadingComfort sûr : clamp des nombres dans
 * les plages, drop des valeurs égales au défaut et de la police standard.
 * Retourne undefined si tout est au défaut (profil « sans préférence »).
 */
export const normalizeReadingComfort = (raw: unknown): ReadingComfort | undefined => {
  if (!isPlainObject(raw)) return undefined;
  const r = raw;
  const out: ReadingComfort = {};
  if (r.font === 'luciole') out.font = 'luciole';
  for (const field of Object.keys(READING_COMFORT_LIMITS) as NumericField[]) {
    const value = clampField(r[field], field);
    if (value !== undefined) out[field] = value;
  }
  return Object.keys(out).length > 0 ? out : undefined;
};

const isValidNumericInput = (v: unknown): boolean =>
  v === undefined || (typeof v === 'number' && Number.isFinite(v));

const isValidFontInput = (v: unknown): boolean =>
  v === undefined || v === 'luciole' || v === 'default';

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);

/**
 * Validation frontière HTTP (routes/profiles.ts) : null = reset explicite, sinon
 * objet avec des types corrects. Fail-closed sur les types (→ 400) ; le clamp des
 * plages est laissé à normalizeReadingComfort côté store.
 */
export const isValidReadingComfortInput = (v: unknown): boolean => {
  if (v === null) return true;
  if (!isPlainObject(v)) return false;
  return (
    isValidFontInput(v.font) &&
    isValidNumericInput(v.letterSpacing) &&
    isValidNumericInput(v.wordSpacing) &&
    isValidNumericInput(v.lineHeight)
  );
};
