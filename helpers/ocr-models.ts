/**
 * Source de vérité unique pour les modèles OCR Mistral sélectionnables.
 * Importable backend (`../helpers/ocr-models.js`) ET frontend (`@helpers/ocr-models`).
 */

/** Modèles OCR proposés. Ordre = ordre d'affichage du dropdown ; OCR 3 = recommandé/défaut. */
export const OCR_MODELS = ['mistral-ocr-2512', 'mistral-ocr-4-0'] as const;

export type OcrModel = (typeof OCR_MODELS)[number];

/**
 * Défaut OCR 3 (`mistral-ocr-2512`, $2/1000 pages). OCR 4 ($4/1000) reste opt-in :
 * 2× plus cher, réservé aux scans difficiles.
 */
export const DEFAULT_OCR_MODEL: OcrModel = 'mistral-ocr-2512';

/**
 * Normalise une valeur de modèle OCR (config disque, payload client, alias legacy)
 * vers un `OcrModel` valide. L'alias legacy `mistral-ocr-latest` (ancien défaut forcé,
 * jamais choisi délibérément car l'UI était lecture-seule) ET toute valeur inconnue /
 * absente retombent sur OCR 3 — évite qu'un `config.json` legacy parte silencieusement
 * sur OCR 4 (le plus cher) après le changement de défaut.
 *
 * Signature `unknown` + guard `typeof` : sous `strict: true`, passer `string | undefined`
 * à `Array.includes` ne typecheck pas.
 */
export function normalizeOcrModel(v: unknown): OcrModel {
  return typeof v === 'string' && (OCR_MODELS as readonly string[]).includes(v)
    ? (v as OcrModel)
    : DEFAULT_OCR_MODEL;
}
