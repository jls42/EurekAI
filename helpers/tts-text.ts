import { SOURCE_MARKER_RE } from './source-markers.js';

// Crochets d'un texte lu à voix haute, mesurés le 2026-10-21 (`output/voxtral3-corpus/2026-10-21/`) :
// Voxtral TTS (2603) PRONONCE les marqueurs de sources (« Source 2, Source 3 », +2,3 s pour une
// section de fiche lue) et déforme un mot entre crochets ; Voxtral TTS 3 lit `[…]` comme une balise
// d'instruction (`[emotion=sad]`, `[pace=slow]`, valeur inconnue acceptée sans erreur) et AVALE le
// mot (« Le mot [chat] est un nom commun. » → « Le mot est un nom commun. »). L'app n'envoie jamais
// de balise volontaire : aucun crochet ne part au TTS.
const BRACKET_RE = /[[\]]/g;
const SPACES_RE = / {2,}/g;

const ENDS_SENTENCE_RE = /[.!?…]$/;

/**
 * Phrases lues d'affilée, comme le `join('. ')` d'origine, sauf qu'un point ne s'ajoute entre deux
 * phrases que si la première ne se termine pas déjà : il envoyait « …la Terre.. Quand… » quand les
 * points clés finissaient par un point (relevé le 2026-10-21). Parties vides écartées.
 */
export const joinSentences = (parts: readonly string[]): string => {
  const kept = parts.map((p) => p.trim()).filter((p) => p !== '');
  const last = kept.length - 1;
  return kept.map((p, i) => (i === last || ENDS_SENTENCE_RE.test(p) ? p : `${p}.`)).join(' ');
};

/**
 * Texte réellement envoyé au TTS : marqueurs `[Source N]` retirés, autres crochets ôtés (le mot
 * entre crochets reste lu), espaces laissées par le retrait recollées. Ne touche pas aux espaces
 * devant `: ; ! ?` (typographie française). Les caractères facturés baissent d'autant.
 */
export const speakableText = (text: string): string => {
  // Espaces d'abord réduites à une seule : le recollage devant `.` et `,` se fait ensuite sans
  // regex (une regex ` +([.,])` est super-linéaire, sonarjs/super-linear-regex).
  return text
    .replaceAll(SOURCE_MARKER_RE, '')
    .replaceAll(BRACKET_RE, '')
    .replaceAll(SPACES_RE, ' ')
    .replaceAll(' .', '.')
    .replaceAll(' ,', ',')
    .trim();
};
