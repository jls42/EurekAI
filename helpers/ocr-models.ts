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
 *
 * ⚠ DÉCISION DATÉE (source autoritaire) : OCR 3 est annoncé déprécié au **2026-06-30** dans
 * les docs Mistral (remplacé par OCR 4, sorti le 2026-06-23). Défaut OCR 3 conservé
 * **volontairement** pour le coût bas tant qu'il fonctionne — choix temporaire assumé, PAS un
 * oubli. Déprécié ≠ retiré : aucune date de retraite n'est publiée, le modèle continue de
 * tourner après le 30/06. Revoir ce défaut après le 2026-06-30, ou au premier signal API/docs
 * de retirement / erreur OCR. Pas de tripwire automatique sur la date : `/v1/models` renvoie
 * `deprecation: None` (lag docs) et `scripts/check-deps.sh` ne fait qu'un smoke-test
 * d'existence — un rappel daté release-time y est encodé en dur (table `known_deprecations`).
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
