// Helpers pour gérer les labels A)/B)/C)/D) des choix de quiz vocal.
// Cf. décision produit #6 : les labels restent dans les données persistées,
// mais sont transformés en repères oraux localisés au moment du TTS.

/**
 * Regex tolérante aux dérives typographiques du modèle, MAIS qui exige
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
 * Note ReDoS : SonarCloud (S5852) flag les `\s*` comme potentiellement vulnérables
 * au catastrophic backtracking. Faux positif ici : les 3 quantifiers `\s*` sont
 * suivis de classes DISJOINTES ([A-D], [).:], end-of-string), donc le moteur ne
 * peut pas backtracker ambigument. De plus, l'input est borné (un texte de choix,
 * < 200 chars) — le risque DoS réel est nul.
 */
// NOSONAR(S5852) — voir note ReDoS ci-dessus : classes disjointes, input borné, sûr.
export const LABEL_RE = /^\s*([A-D])\s*[).:]\s*(.*)$/;

const SPOKEN_LABEL_BY_LANG: Record<string, string> = {
  fr: 'choix',
  en: 'choice',
  es: 'opción',
  de: 'Auswahl',
  it: 'scelta',
  pt: 'opção',
  nl: 'keuze',
};

/**
 * Retourne le mot localisé pour préfixer un repère oral A/B/C/D.
 * Périmètre borné aux 7 langues TTS d'EurekAI (cf. décision produit #10).
 * Fallback FR documenté pour les 8 autres langues supportées.
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
  // NOSONAR(S6594) — String.match() est strictement équivalent à RegExp.exec() ici
  // (pas de flag /g). Préférence stylistique de SonarCloud, pas un vrai défaut.
  const m = raw.match(LABEL_RE);
  if (!m) return raw;
  return `${spokenChoiceLabel(lang)} ${m[1]} : ${m[2]}`;
}

/**
 * Strippe le label A)/B)/C)/D) d'un choix pour comparaison avec une réponse
 * d'élève (utilisé par verifyAnswer). Aligné sur LABEL_RE pour absorber les
 * mêmes dérives typographiques que toSpokenChoice.
 */
export function stripChoiceLabel(raw: string): string {
  // NOSONAR(S6594) — voir note dans toSpokenChoice ci-dessus.
  const m = raw.match(LABEL_RE);
  return m ? m[2] : raw;
}
