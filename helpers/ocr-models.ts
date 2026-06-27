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
 * l'alias `mistral-ocr-latest` résout). OCR 3 (`mistral-ocr-2512`, $2/1000) reste sélectionnable en
 * opt-in (moins cher) — **également courant** : la doc Mistral (docs.mistral.ai/models/overview) le
 * liste en section « Premier » (« OCR 3 remains available for existing integrations and production
 * workloads »), PAS en Legacy/Deprecated (seuls `mistral-ocr-2505`/`2503` y figurent), et l'API
 * `/v1/models` renvoie `deprecation: null`. Aucune date de retrait connue pour `mistral-ocr-2512`.
 * Le défaut reste OCR 4 (meilleure qualité) ; OCR 3 = choix valide pour réduire le coût.
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
