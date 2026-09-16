/**
 * Garde-fous multer communs à TOUS les uploads multipart (`routes/sources.ts`,
 * `routes/generations.ts`), à étaler dans chaque `limits` à côté des limites propres à la route :
 * `limits: { fileSize: …, files: …, ...MULTIPART_FIELD_LIMITS }`.
 *
 * `fieldArrayIndexLimit` — GHSA-535w-7cp7-47q4 : sans plafond, un champ texte `items[4294967294]`
 * suivi de `items[k]` fait itérer à append-field un tableau creux de ~4,3 milliards d'entrées, soit
 * ~2 min de CPU synchrone pour UNE requête (mesuré : 0,5 s pour un index de 20 millions). L'option
 * est opt-in : monter en multer 2.3.0 ne suffit PAS. 0 = aucun index > 0 accepté — les champs texte
 * multipart de l'app (`lang`, `allowDuplicates`, `questionIndex`) n'utilisent pas la notation
 * tableau. Option absente de `@types/multer` : l'étalement évite l'erreur de propriété excédentaire.
 */
export const MULTIPART_FIELD_LIMITS = { fieldArrayIndexLimit: 0 } as const;
