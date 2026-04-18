// Helpers pour gérer les labels A)/B)/C)/D) des choix de quiz vocal.
// Cf. décision produit #6 : les labels restent dans les données persistées,
// mais sont transformés en repères oraux localisés au moment du TTS.

/**
 * Parseur tolérant aux dérives typographiques du modèle, MAIS qui exige
 * une PONCTUATION OBLIGATOIRE après la lettre (avec espaces tolérés
 * avant/après). Ponctuation acceptée : `)`, `.`, `:`.
 *
 * Matche : "A) Paris", "A. Paris", "A: Paris", "A  )  Paris"
 * Ne matche PAS :
 *   - "Alice", "Dunkerque", "Berlin" (pas de ponctuation après la lettre)
 *   - "A Paris", "A propos de la Révolution" (espace seul, sans ponctuation)
 *   - "A-t-on le droit..." (le tiret est volontairement EXCLU)
 *
 * Arbitrages (cf. plan Phase 2.5) :
 * - Tiret `-` exclu : "A-t-on" matcherait à tort A + - + t-on → "choix A : t-on...".
 * - Espace seul rejeté : "A propos" ne doit pas devenir "choix A : propos".
 * - Si dérive vers "A Paris" sans ponctuation : pas strippé, TTS lit "A Paris" tel
 *   quel — dégradé mais pas cassé.
 *
 * Implémentation volontairement déterministe, sans regex multi-quantifiée,
 * pour éviter le hotspot Sonar S5852.
 */
const WHITESPACE_RE = /\s/u;
const LINE_TERMINATOR_RE = /[\n\r\u2028\u2029]/u;

function isWhitespace(char: string | undefined): boolean {
  return char !== undefined && WHITESPACE_RE.test(char);
}

function skipWhitespace(raw: string, start: number): number {
  let index = start;
  while (index < raw.length && isWhitespace(raw[index])) index += 1;
  return index;
}

export function parseChoiceLabel(raw: string): { label: string; text: string } | null {
  let index = skipWhitespace(raw, 0);

  const label = raw[index];
  if (label !== 'A' && label !== 'B' && label !== 'C' && label !== 'D') return null;

  index = skipWhitespace(raw, index + 1);

  const punctuation = raw[index];
  if (punctuation !== ')' && punctuation !== '.' && punctuation !== ':') return null;

  index = skipWhitespace(raw, index + 1);

  const text = raw.slice(index);
  if (LINE_TERMINATOR_RE.test(text)) return null;

  return { label, text };
}

const SPOKEN_LABEL_BY_LANG: Record<string, string> = {
  fr: 'choix',
  en: 'choice',
  es: 'opción',
  de: 'Auswahl',
  it: 'scelta',
  pt: 'opção',
  nl: 'keuze',
  hi: 'विकल्प',
  ar: 'خيار',
};

/**
 * Retourne le mot localisé pour préfixer un repère oral A/B/C/D.
 * Périmètre borné aux 9 langues UI d'EurekAI = 9 langues Voxtral-TTS.
 * Fallback FR documenté pour les 6 langues texte hors UI (ja, zh, ko, pl, ro, sv).
 */
export function spokenChoiceLabel(lang: string): string {
  return SPOKEN_LABEL_BY_LANG[lang] ?? SPOKEN_LABEL_BY_LANG.fr;
}

/**
 * Transforme un choix avec label ("A) Paris") en repère oral localisé
 * ("choix A : Paris" en FR, "choice A : Paris" en EN, etc.) pour le TTS.
 * Si le pattern ne matche pas (label absent ou typographie hors regex),
 * retourne le texte inchangé — dégradation acceptée plutôt que faux-match.
 */
export function toSpokenChoice(raw: string, lang: string): string {
  const parsed = parseChoiceLabel(raw);
  if (!parsed) return raw;
  return `${spokenChoiceLabel(lang)} ${parsed.label} : ${parsed.text}`;
}

/**
 * Strippe le label A)/B)/C)/D) d'un choix pour comparaison avec une réponse
 * d'élève (utilisé par verifyAnswer). Aligné sur le parseur de label pour
 * absorber les mêmes dérives typographiques que toSpokenChoice.
 */
export function stripChoiceLabel(raw: string): string {
  const parsed = parseChoiceLabel(raw);
  return parsed ? parsed.text : raw;
}
