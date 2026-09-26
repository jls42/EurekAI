/**
 * Source de vérité unique du modèle de modération Mistral ET de sa taxonomie : les deux sont
 * couplés, la liste des catégories dépend de la version du modèle. Consommé par
 * generators/moderation.ts (appel + contrat de réponse) et profiles.ts (catégories proposées aux
 * parents, migration des profils persistés).
 */

/**
 * Id daté épinglé, JAMAIS `mistral-moderation-latest`. Faits mesurés en live le 2026-09-25/26 :
 * - l'alias n'est plus listé par GET /v1/models, et GET /v1/models/mistral-moderation-latest
 *   répond 404 « is deprecated » ;
 * - POST /v1/moderations accepte pourtant encore l'alias (et même l'id retiré
 *   `mistral-moderation-2411`) et sert silencieusement 2603 (`response.model` =
 *   `mistral-moderation-2603`) — tolérance NON garantie par la politique Mistral (un modèle
 *   retiré doit répondre 404) ;
 * - la réponse HTTP brute porte aussi un champ `usage`, retiré par le SDK 2.3.0 (absent de
 *   `ModerationResponse`).
 * Seul un id daté garantit une taxonomie, un tarif et une disponibilité déterministes.
 *
 * Procédure de bump (dans le même commit que le changement de cette constante) :
 * 1. recapturer une réponse réelle du nouveau modèle (`Object.keys(results[0].categories)`) et
 *    remplacer la fixture de generators/moderation.test.ts ;
 * 2. aligner MODERATION_MODEL_CATEGORIES sur ces clés ;
 * 3. étendre LEGACY_MODERATION_CATEGORY_SUCCESSORS pour toute clé disparue (renommée, scindée) ;
 * 4. ajouter les clés i18n `moderation.cat.*` dans les 9 langues ;
 * 5. faire repasser le test de contrat de generators/moderation.test.ts (modèle + clés).
 */
export const MODERATION_MODEL = 'mistral-moderation-2603';

/**
 * Taxonomie de MODERATION_MODEL : clés de `results[0].categories` renvoyées par Moderation 2
 * (2603), dans l'ordre de la réponse capturée le 2026-09-25. 2411 → 2603 a scindé
 * `dangerous_and_criminal_content` en `dangerous` + `criminal`.
 */
export const MODERATION_MODEL_CATEGORIES = [
  'sexual',
  'hate_and_discrimination',
  'violence_and_threats',
  'dangerous',
  'criminal',
  'selfharm',
  'health',
  'financial',
  'law',
  'pii',
  'jailbreaking',
] as const;

export type ModerationCategory = (typeof MODERATION_MODEL_CATEGORIES)[number];

// Clé d'une version retirée → successeurs dans la taxonomie courante. Une clé legacy ne peut venir
// QUE d'un choix parental explicite (les défauts ne l'ont jamais contenue) : on l'étend vers TOUS
// ses successeurs (même périmètre effectif qu'avant, fail-closed), jamais de drop.
// Map plutôt qu'objet littéral : get('__proto__' | 'constructor') → undefined sur une entrée
// client ; le générique explicite vérifie les successeurs à la compilation.
const LEGACY_MODERATION_CATEGORY_SUCCESSORS = new Map<string, readonly ModerationCategory[]>([
  ['dangerous_and_criminal_content', ['dangerous', 'criminal']],
]);

/** Clés legacy présentes dans `cats`, dédoublonnées (constantes connues : sûres à journaliser). */
export const legacyModerationCategoriesIn = (cats: readonly string[]): string[] => [
  ...new Set(cats.filter((c) => LEGACY_MODERATION_CATEGORY_SUCCESSORS.has(c))),
];

/**
 * Remplace EN PLACE chaque clé legacy par ses successeurs puis dédoublonne (1re occurrence gagne,
 * ordre conservé). Les clés inconnues sont gardées : le filtrage reste à l'appelant. Pur, sans
 * log : chaque appelant journalise selon son contexte.
 */
export const expandLegacyModerationCategories = (cats: readonly string[]): string[] => [
  ...new Set(cats.flatMap<string>((c) => LEGACY_MODERATION_CATEGORY_SUCCESSORS.get(c) ?? [c])),
];

/** Vrai si `c` appartient à la taxonomie de MODERATION_MODEL. */
export const isModerationCategory = (c: string): c is ModerationCategory =>
  (MODERATION_MODEL_CATEGORIES as readonly string[]).includes(c);
