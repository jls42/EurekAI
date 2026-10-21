/**
 * Source de vérité unique pour les modèles de transcription (STT) Mistral sélectionnables :
 * entrée vocale (`routes/sources.ts`) et réponses orales du quiz vocal (`routes/generations.ts`).
 * Importable backend (`../helpers/stt-models.js`) ET frontend (`@helpers/stt-models`).
 */

/** Modèles proposés. Ordre = ordre d'affichage du sélecteur ; le défaut en tête. */
export const STT_MODELS = [
  'voxtral-mini-2602',
  'voxtral-mini-transcribe-3-0',
  'voxtral-small-transcribe-3-0',
] as const;

export type SttModel = (typeof STT_MODELS)[number];

/**
 * Noms produit affichés à l'UI (table « Audio » de docs.mistral.ai/models). La valeur stockée en
 * config et envoyée à l'API reste l'id technique (clé de cet objet) — ne jamais persister le label.
 */
export const STT_MODEL_LABELS: Record<SttModel, string> = {
  'voxtral-mini-2602': 'Voxtral Mini Transcribe 2',
  'voxtral-mini-transcribe-3-0': 'Voxtral Mini Transcribe 3',
  'voxtral-small-transcribe-3-0': 'Voxtral Small Transcribe 3',
};

/**
 * Modèles en « Public Preview » chez Mistral (fiches du 2026-10-20) : proposés en option, signalés
 * « préversion » dans le sélecteur, jamais par défaut tant qu'ils ne sont pas GA.
 */
export const STT_PREVIEW_MODELS: ReadonlySet<SttModel> = new Set<SttModel>([
  'voxtral-mini-transcribe-3-0',
  'voxtral-small-transcribe-3-0',
]);

/**
 * Défaut **Voxtral Mini Transcribe 2** (`voxtral-mini-2602`, 0,003 $/min), le modèle que servait
 * l'alias `voxtral-mini-latest`, codé en dur jusqu'en v1.7.11 (résolution mesurée sur `/v1/models` le
 * 2026-10-21). Épinglé : le guide de migration de Mistral fait correspondre 2602 à
 * `voxtral-mini-transcribe-3-0`, et un alias repointé changerait le modèle (donc le texte transcrit)
 * sans évaluation, en gardant en silence le tarif de Transcribe 2 (préfixe `voxtral-mini`, cf.
 * `helpers/pricing.ts`).
 *
 * Voxtral Mini Transcribe 3 (0,0035 $/min) et Small Transcribe 3 (0,004 $/min, meilleur taux
 * d'erreur annoncé) sont en Public Preview : options seulement. Mesure du 2026-10-21 (critères écrits
 * avant, `output/voxtral3-corpus/2026-10-21/`, voix de synthèse) : 0 erreur d'API, 0 transcription
 * vide, mêmes éléments critiques que Transcribe 2 dans les 9 langues de l'interface, WER fr/en nul
 * pour les trois ; latence médiane 288 ms (2602), 272 ms (Mini 3), 402 ms (Small 3). Aucun gain
 * mesurable sur une parole de synthèse propre : passer l'un d'eux par défaut exige le statut GA et
 * une mesure sur de vraies voix d'enfant.
 *
 * Ne JAMAIS renommer un id persisté (`voxtral-mini-transcribe-3-0` → `voxtral-mini-transcribe-3`,
 * synonyme listé par `/v1/models`) sans table de correspondance : `normalizeSttModel` rabattrait les
 * configs existantes sur le défaut (leçon OCR 3).
 */
export const DEFAULT_STT_MODEL: SttModel = 'voxtral-mini-2602';

/**
 * Normalise une valeur de modèle STT (config disque, payload client) vers un `SttModel` valide.
 * L'alias `voxtral-mini-latest` comme toute valeur inconnue ou absente retombent sur le défaut épinglé.
 * Signature `unknown` + guard `typeof` : sous `strict: true`, passer `string | undefined` à
 * `Array.includes` ne typecheck pas.
 */
export function normalizeSttModel(v: unknown): SttModel {
  return typeof v === 'string' && (STT_MODELS as readonly string[]).includes(v)
    ? (v as SttModel)
    : DEFAULT_STT_MODEL;
}
