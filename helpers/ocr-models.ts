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
 * Défaut **OCR 4.0** (`mistral-ocr-4-0`, $4/1000 pages), épinglé VOLONTAIREMENT. Les alias
 * `mistral-ocr-latest` et `mistral-ocr-4` (alias de génération) pointent désormais sur
 * `mistral-ocr-4-1` (OCR 4.1 : publié 2026-07-16, GA 2026-08-31, même prix $4/1000). 4.0 est gardé
 * après une évaluation mesurée le 2026-09-26 (11 photos de leçons réelles, 1 passage par photo jugé
 * contre l'image, contre-expertise aveugle sur les 4 litigieuses, stabilité vérifiée sur 3 passages
 * pour les 5 décisives) : 4.1 perd de façon stable du texte proche des figures (consigne
 * d'exercice, légende de carte à 9 entrées, annotation manuscrite) que 4.0 conserve — détail dans
 * la description de la PR du passage à Moderation 2. OCR 4.0 n'est pas déprécié au 2026-09-26.
 * Ce retard est déclaré dans OCR_DEFAULT_ACCEPTED_LAG ci-dessous.
 *
 * Toujours épingler l'id major-minor, JAMAIS `mistral-ocr-4` ni `mistral-ocr-latest` : un alias
 * mouvant changerait le modèle (donc le texte extrait) sans évaluation.
 *
 * OCR 3 (`mistral-ocr-2512`, $2/1000) reste sélectionnable en opt-in (moins cher) — **également
 * courant** : la doc Mistral (docs.mistral.ai/models/overview) le liste en section « Premier »
 * (« OCR 3 remains available for existing integrations and production workloads »), PAS en
 * Legacy/Deprecated (seuls `mistral-ocr-2505`/`2503` y figurent), et l'API `/v1/models` renvoie
 * `deprecation: null`. Aucune date de retrait connue pour `mistral-ocr-2512`. Ne JAMAIS le renommer
 * `mistral-ocr-3-0` (synonyme listé par `/v1/models`) : l'id est persisté dans config.json, et
 * `normalizeOcrModel` rabattrait alors les configs existantes sur le défaut OCR 4, deux fois plus cher.
 */
export const DEFAULT_OCR_MODEL: OcrModel = 'mistral-ocr-4-0';

/**
 * Retard ASSUMÉ du défaut sur sa génération, lié à UN candidat précis. Lu par
 * scripts/check-models.ts : tant que la dernière mineure d'OCR 4 est exactement `candidate`, il
 * affiche une information (« épinglage volontaire ») ; toute AUTRE mineure (ex. `mistral-ocr-4-2`)
 * redevient une alerte à évaluer. À retirer quand DEFAULT_OCR_MODEL change.
 */
export const OCR_DEFAULT_ACCEPTED_LAG = {
  candidate: 'mistral-ocr-4-1',
  since: '2026-09-26',
  reason:
    'OCR 4.1 évalué sur 11 leçons réelles : perd des légendes et consignes proches des figures',
} as const;

/**
 * Normalise une valeur de modèle OCR (config disque, payload client, alias legacy) vers un
 * `OcrModel` valide. L'alias legacy `mistral-ocr-latest` ET toute valeur inconnue / absente
 * retombent sur le défaut (OCR 4.0) — épingle le défaut explicitement plutôt que de laisser
 * un alias mouvant suivre silencieusement une nouvelle version (il sert déjà OCR 4.1 ; cf. piège
 * modération 2026-06).
 *
 * Signature `unknown` + guard `typeof` : sous `strict: true`, passer `string | undefined`
 * à `Array.includes` ne typecheck pas.
 */
export function normalizeOcrModel(v: unknown): OcrModel {
  return typeof v === 'string' && (OCR_MODELS as readonly string[]).includes(v)
    ? (v as OcrModel)
    : DEFAULT_OCR_MODEL;
}
