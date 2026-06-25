/**
 * Source de vérité unique pour les modèles OCR Mistral sélectionnables.
 * Importable backend (`../helpers/ocr-models.js`) ET frontend (`@helpers/ocr-models`).
 */

/** Modèles OCR proposés. Ordre = ordre d'affichage du dropdown ; OCR 4 = recommandé/défaut. */
export const OCR_MODELS = ['mistral-ocr-4-0', 'mistral-ocr-2512'] as const;

export type OcrModel = (typeof OCR_MODELS)[number];

/**
 * Noms produit lisibles affichés à l'UI ("OCR 4" / "OCR 3"). La valeur stockée en config et
 * envoyée à l'API reste l'ID technique (clé de cet objet) — ne jamais persister le label.
 */
export const OCR_MODEL_LABELS: Record<OcrModel, string> = {
  'mistral-ocr-4-0': 'OCR 4',
  'mistral-ocr-2512': 'OCR 3',
};

/**
 * Défaut **OCR 4** (`mistral-ocr-4-0`, $4/1000 pages) = modèle OCR courant Mistral (ce vers quoi
 * l'alias `mistral-ocr-latest` résout). OCR 3 (`mistral-ocr-2512`, $2/1000) reste sélectionnable
 * en opt-in (moins cher).
 *
 * ⚠ RETRAITS DATÉS (source autoritaire : https://docs.mistral.ai/models/overview) :
 * OCR 3 `mistral-ocr-2512` est **déprécié le 2026-06-30** et **retiré le 2026-09-30**
 * (alternative = OCR 4). Le défaut est volontairement OCR 4 pour ne PAS utiliser un modèle en
 * retrait par défaut. Si OCR 3 est un jour re-choisi comme défaut pour le coût, le faire en
 * connaissance de la retraite 2026-09-30 (après quoi les appels OCR 3 cesseront de fonctionner).
 */
export const DEFAULT_OCR_MODEL: OcrModel = 'mistral-ocr-4-0';

/**
 * Normalise une valeur de modèle OCR (config disque, payload client, alias legacy) vers un
 * `OcrModel` valide. L'alias legacy `mistral-ocr-latest` ET toute valeur inconnue / absente
 * retombent sur le défaut (OCR 4) — pin le modèle courant explicitement plutôt que de laisser
 * un alias mouvant suivre silencieusement une future version (cf. piège modération 2026-06).
 *
 * Signature `unknown` + guard `typeof` : sous `strict: true`, passer `string | undefined`
 * à `Array.includes` ne typecheck pas.
 */
export function normalizeOcrModel(v: unknown): OcrModel {
  return typeof v === 'string' && (OCR_MODELS as readonly string[]).includes(v)
    ? (v as OcrModel)
    : DEFAULT_OCR_MODEL;
}
