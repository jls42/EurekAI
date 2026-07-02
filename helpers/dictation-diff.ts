// Comparaison STRICTE pour la dictée : l'orthographe et les accents SONT le test
// (ne PAS réutiliser helpers/fill-blank-validate.ts, volontairement tolérante —
// Levenshtein + accents retirés). Zéro coût IA : tout se calcule en local.
//
// Normalisation spécifiée (cf. plan vague 1) : Unicode NFC, trim, espaces internes
// multiples réduits à un seul, apostrophe typographique ' (U+2019) ≡ ' (U+0027),
// casse ignorée. Les accents restent significatifs.

export interface DictationDiffChar {
  ch: string;
  ok: boolean;
}

export interface DictationDiff {
  correct: boolean;
  /** Diff caractère par caractère de la saisie normalisée (ok=false → surligner). */
  chars: DictationDiffChar[];
  /** Forme attendue normalisée (affichée en correction). */
  expected: string;
}

export const normalizeDictationInput = (raw: string): string =>
  raw.normalize('NFC').replaceAll('’', "'").replace(/\s+/g, ' ').trim();

export const diffDictation = (typed: string, expected: string): DictationDiff => {
  const t = normalizeDictationInput(typed);
  const e = normalizeDictationInput(expected);
  const eChars = [...e.toLowerCase()];
  // .at(i) plutôt que eChars[i] : le plugin security de Codacy flagge l'indexation
  // dynamique en « Object Injection Sink » (faux positif sur un index de map).
  const chars = [...t].map((ch, i) => ({ ch, ok: ch.toLowerCase() === eChars.at(i) }));
  const correct = t.toLowerCase() === e.toLowerCase();
  return { correct, chars, expected: e };
};

// Masque TOUTES les occurrences du mot dans la phrase-exemple AVANT validation
// (sinon l'enfant recopie — le mot peut apparaître plusieurs fois : « il existe
// plusieurs climats comme le climat océanique »). Même normalisation que le diff ;
// insensible à la casse. Retourne null si le mot n'est pas retrouvé (le composant
// n'affiche alors la phrase qu'après validation).
export const maskWordInSentence = (sentence: string, word: string): string | null => {
  const s = normalizeDictationInput(sentence);
  const w = normalizeDictationInput(word).toLowerCase();
  if (!w) return null;
  const lower = s.toLowerCase();
  let result = '';
  let cursor = 0;
  let idx = lower.indexOf(w);
  if (idx === -1) return null;
  while (idx !== -1) {
    result += s.slice(cursor, idx) + '___';
    cursor = idx + w.length;
    idx = lower.indexOf(w, cursor);
  }
  return result + s.slice(cursor);
};
