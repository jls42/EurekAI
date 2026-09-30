/**
 * Source de vérité unique pour les modèles OCR Mistral sélectionnables.
 * Importable backend (`../helpers/ocr-models.js`) ET frontend (`@helpers/ocr-models`).
 */

/** Modèles OCR proposés. Ordre = ordre d'affichage du dropdown ; OCR 4 = recommandé/défaut. */
export const OCR_MODELS = ['mistral-ocr-4-1', 'mistral-ocr-2512'] as const;

export type OcrModel = (typeof OCR_MODELS)[number];

/**
 * Noms produit lisibles affichés à l'UI ("OCR 4" / "OCR 3"). La valeur stockée en config et
 * envoyée à l'API reste l'ID technique (clé de cet objet) — ne jamais persister le label.
 */
export const OCR_MODEL_LABELS: Record<OcrModel, string> = {
  'mistral-ocr-4-1': 'OCR 4',
  'mistral-ocr-2512': 'OCR 3',
};

/**
 * Défaut **OCR 4.1** (`mistral-ocr-4-1`, $4/1000 pages). OCR 4.0 (`mistral-ocr-4-0`), défaut
 * jusqu'en v1.7.5, a été déprécié le 2026-09-29 et retiré le 2026-09-30 (changelog Mistral, fiche du
 * modèle, table Legacy de docs.mistral.ai/models/overview ; `/v1/models` ne l'indiquait pas encore).
 * Un `mistral-ocr-4-0` persisté dans config.json n'est plus dans OCR_MODELS : `normalizeOcrModel` le
 * ramène sur ce défaut au démarrage (migration persistée) comme à `saveConfig`.
 *
 * Choix mesuré le 2026-09-30 (critères écrits avant la mesure, `output/ocr-corpus/2026-09-30/`) :
 * 16 photos de leçons réelles, vrai chemin `ocrFile`, 3 passages par modèle, jury à l'aveugle qui
 * inventorie la photo avant de lire les transcriptions, contre-expertise des photos où les modèles
 * diffèrent. OCR 4.1 omet moins d'éléments importants qu'OCR 3 ; OCR 3 fait moins d'erreurs de sens
 * (écriture manuscrite surtout) et il est déterministe, alors que 4.1 varie d'un passage à l'autre.
 * La règle fixée d'avance (OCR 3 seulement s'il omet strictement moins, sans plus d'erreurs) désigne
 * 4.1. Les deux modèles perdent le texte des cartes (légendes, libellés).
 *
 * Toujours épingler l'id major-minor, JAMAIS `mistral-ocr-4` ni `mistral-ocr-latest` : un alias
 * mouvant changerait le modèle (donc le texte extrait) sans évaluation.
 *
 * OCR 3 (`mistral-ocr-2512`, $2/1000) reste sélectionnable en opt-in (moins cher) — **également
 * courant** : la doc Mistral (docs.mistral.ai/models/overview) le liste en section « Premier »
 * (« OCR 3 remains available for existing integrations and production workloads »), PAS en
 * Legacy/Deprecated, et l'API `/v1/models` renvoie `deprecation: null`. Aucune date de retrait
 * connue pour `mistral-ocr-2512`. Ne JAMAIS le renommer `mistral-ocr-3-0` (synonyme listé par
 * `/v1/models`) : l'id est persisté dans config.json, et `normalizeOcrModel` rabattrait alors les
 * configs existantes sur le défaut OCR 4, deux fois plus cher.
 */
export const DEFAULT_OCR_MODEL: OcrModel = 'mistral-ocr-4-1';

/**
 * Normalise une valeur de modèle OCR (config disque, payload client, alias legacy) vers un
 * `OcrModel` valide. L'alias legacy `mistral-ocr-latest`, un modèle retiré (`mistral-ocr-4-0`) ET
 * toute valeur inconnue / absente retombent sur le défaut (OCR 4.1) — épingle le défaut
 * explicitement plutôt que de laisser un alias mouvant suivre silencieusement une nouvelle version
 * (cf. piège modération 2026-06).
 *
 * Signature `unknown` + guard `typeof` : sous `strict: true`, passer `string | undefined`
 * à `Array.includes` ne typecheck pas.
 */
export function normalizeOcrModel(v: unknown): OcrModel {
  return typeof v === 'string' && (OCR_MODELS as readonly string[]).includes(v)
    ? (v as OcrModel)
    : DEFAULT_OCR_MODEL;
}
