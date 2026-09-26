import type { Request, Response } from 'express';
import type { AgeGroup } from '../types.js';
import { isAgeGroup } from '../profiles.js';

// Contrôles d'entrée de `lang` et `ageGroup` sur les routes IA. Ces deux champs du corps finissent
// dans les prompts (langInstruction, ageInstruction), dans la sélection de voix et dans les logs :
// absents → défaut de la route ; présents mais invalides → 400 invalid_input, jamais une valeur
// libre transmise au modèle (la modération ne lit que le message ou la source, pas ces champs).

// Même code que validateGenRequestBody (routes/generate.ts) : `errorCode.invalid_input` côté UI.
export const INVALID_INPUT = 'invalid_input';

const DEFAULT_LANG = 'fr';
const DEFAULT_AGE_GROUP: AgeGroup = 'enfant';

// Code de langue BCP-47 simplifié : 2-3 lettres, puis au plus 2 sous-étiquettes alphanumériques
// (écriture, région : `pt-BR`, `zh-Hant-TW`). Couvre les 9 locales de l'UI (src/i18n/languages.ts)
// et les 15 de LANG_NAMES (prompts.ts). Ancré, sans drapeau `m` : ni saut de ligne, ni espace, ni
// phrase. `langName` renvoie un code inconnu tel quel dans le prompt : ce motif est la barrière.
const LANG_CODE_RE = /^[a-z]{2,3}(?:-[a-z0-9]{2,8}){0,2}$/i;

export const isLangCode = (v: unknown): v is string =>
  typeof v === 'string' && LANG_CODE_RE.test(v);

// Variantes optionnelles : `undefined` accepté (l'appelant applique son défaut) ; `null`, chaîne
// vide et tout autre type refusés.
export const isOptionalLangCode = (v: unknown): boolean => v === undefined || isLangCode(v);
export const isOptionalAgeGroup = (v: unknown): boolean => v === undefined || isAgeGroup(v);

// Valeur validée, défaut si absente, null si présente mais invalide.
const langOrDefault = (v: unknown): string | null => {
  if (v === undefined) return DEFAULT_LANG;
  return isLangCode(v) ? v : null;
};

const ageGroupOrDefault = (v: unknown): AgeGroup | null => {
  if (v === undefined) return DEFAULT_AGE_GROUP;
  return isAgeGroup(v) ? v : null;
};

export type LocaleFields = { lang: string; ageGroup: AgeGroup };

// `lang` ET `ageGroup` d'un corps (chat, recherche web) : défauts `fr` / `enfant`, null si l'un
// des deux est présent mais invalide (l'appelant répond 400 invalid_input).
export const readLocaleFields = (lang: unknown, ageGroup: unknown): LocaleFields | null => {
  const validLang = langOrDefault(lang);
  const validAgeGroup = ageGroupOrDefault(ageGroup);
  if (validLang === null || validAgeGroup === null) return null;
  return { lang: validLang, ageGroup: validAgeGroup };
};

// Express 5 laisse `req.body` à undefined quand aucun parseur n'a tourné. Vaut aussi pour les
// champs multipart, lus après multer.
const bodyLang = (req: Request): unknown => (req.body as { lang?: unknown } | undefined)?.lang;

// `lang` validé du corps, `fr` s'il est absent ; null = 400 invalid_input déjà envoyé.
export const readBodyLang = (req: Request, res: Response): string | null => {
  const lang = langOrDefault(bodyLang(req));
  if (lang === null) res.status(400).json({ error: INVALID_INPUT });
  return lang;
};

// Pour les routes dont le défaut n'est pas `fr` (langue figée sur la génération, locale du
// profil) : true = `lang` présent mais invalide, 400 invalid_input déjà envoyé.
export const rejectInvalidLang = (req: Request, res: Response): boolean =>
  readBodyLang(req, res) === null;
