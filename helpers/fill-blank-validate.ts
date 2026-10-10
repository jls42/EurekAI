import type { FillBlankItem } from '../types.js';

/*
 * Correcteur des textes à trous, source unique du navigateur (retour immédiat,
 * `src/components/fill-blank-validate.ts`) et du serveur (score, `routes/generations.ts`).
 *
 * Tolère la casse, les accents, l'article, la typographie des tablettes (apostrophe ’, guillemets,
 * ligature œ, exposant ᵉ) et une faute de frappe sur les MOTS. Un nombre, une date, un siècle ou un
 * chiffre romain doit être exact (« 1788 » n'est pas « 1789 », « XIVe » n'est pas « XVe » : la
 * tolérance de frappe les acceptait), mais toutes ses écritures se valent : « 9 » = « neuf »,
 * « XVe » = « 15e » = « quinzième », « -3000 » = « 3000 av. J.-C. » — sauf quand la phrase ou
 * l'indice impose une écriture (« en chiffres romains », « en lettres »). Chaque écriture d'une
 * réponse compte : `answer`, ses parenthèses (« XVe (quinzième) ») et `accepted`.
 */

/** Ce que lit le correcteur : un exercice d'avant `accepted` n'en a pas. */
export type FillBlankKey = Pick<FillBlankItem, 'answer'> &
  Partial<Pick<FillBlankItem, 'accepted' | 'sentence' | 'hint'>>;

type Verdict = { match: boolean; distance: number };
// Écriture d'un nombre : chiffres arabes, lettres, chiffres romains.
type Family = 'a' | 'w' | 'r';
type CanonOptions = { exact: boolean; romanAnyCase: boolean; family: Family | null };
// raw : casse d'origine (accents gardés en mode exact) ; bare : minuscules sans accents.
type Token = { raw: string; bare: string };
type NumberSegment = { value: number; ordinal: boolean; family: Family; end: number };

// Codes \u plutôt que les caractères : une apostrophe, un guillemet ou un accent grave littéral dans
// une regex fait perdre la suite du fichier à Lizard (cf. CLAUDE.md).
const APOSTROPHES = /[\u2018\u2019\u02bc\u00b4\u0060\u2032]/g;
const QUOTES = /[\u00ab\u00bb\u201c\u201d\u201e\u0022]/g;
const DASHES = /[\u2010-\u2015\u2212]/g;
const ARTICLE = /^(?:l\u0027|d\u0027|un |une |le |la |les |des |du |de la |de l\u0027|au |aux )/i;
const COMBINING_MARKS = /[\u0300-\u036f]/g;

const stripAccents = (text: string): string =>
  text.normalize('NFD').replaceAll(COMBINING_MARKS, '');

const collapse = (text: string): string => text.trim().replaceAll(/\s+/g, ' ');

// NFKC : exposants (« XVᵉ ») et espaces insécables redeviennent des caractères ordinaires.
const foldTypography = (text: string): string => {
  return text
    .normalize('NFKC')
    .replaceAll(APOSTROPHES, "'")
    .replaceAll(QUOTES, ' ')
    .replaceAll(DASHES, '-')
    .replaceAll('œ', 'oe')
    .replaceAll('Œ', 'Oe')
    .replaceAll('æ', 'ae')
    .replaceAll('Æ', 'Ae');
};

function stripArticles(text: string): string {
  return text.replace(ARTICLE, '').trim();
}

const TRIM_PUNCTUATION = new Set('.,;:!?\'"()-');

/** Retire la ponctuation en tête/fin sans regex (évite le faux positif sonarjs S8786 / slow-regex). */
function trimPunctuation(text: string): string {
  let start = 0;
  let end = text.length;
  while (start < end && TRIM_PUNCTUATION.has(text[start])) start++;
  while (end > start && TRIM_PUNCTUATION.has(text[end - 1])) end--;
  return text.slice(start, end);
}

export function normalizeAnswer(text: string): string {
  return stripArticles(trimPunctuation(collapse(stripAccents(foldTypography(text).toLowerCase()))));
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[m][n];
}

// ── Découpage ────────────────────────────────────────────────────────

// Milliers séparés (« 1 000 », « 1.000 ») recollés ; « -3000 » se lit « 3000 av. J.-C. ».
const DIGIT_GROUP = /(\d)[ .](?=\d{3}(?!\d))/g;
const NEGATIVE_YEAR = /(^|\s)-(\d+)/g;
const TOKEN_SEPARATORS = /[\s.\u0027-]+/;

const tokenize = (text: string, exact: boolean): Token[] => {
  const folded = foldTypography(text);
  // Avant trimPunctuation, qui retirerait le « - » de « -3000 ».
  const dated = collapse(exact ? folded : stripAccents(folded))
    .replaceAll(DIGIT_GROUP, '$1')
    .replaceAll(NEGATIVE_YEAR, '$1$2 av J C');
  return stripArticles(trimPunctuation(dated))
    .split(TOKEN_SEPARATORS)
    .map(trimPunctuation)
    .filter((raw) => raw !== '')
    .map((raw) => ({ raw, bare: stripAccents(raw.toLowerCase()) }));
};

const bareAt = (tokens: readonly Token[], i: number): string =>
  i >= 0 && i < tokens.length ? tokens[i].bare : '';

const wordToken = (raw: string): Token => ({ raw, bare: stripAccents(raw) });

// « J.-C. », « JC » → Jésus-Christ, et « av. » / « apr. » juste devant → « avant » / « après ».
const ERA_PREFIXES = new Map([
  ['av', 'avant'],
  ['apr', 'après'],
  ['ap', 'après'],
]);

const christWidth = (tokens: readonly Token[], i: number): number => {
  if (bareAt(tokens, i) === 'jc') return 1;
  return bareAt(tokens, i) === 'j' && bareAt(tokens, i + 1) === 'c' ? 2 : 0;
};

const expandEra = (tokens: readonly Token[]): Token[] => {
  const out: Token[] = [];
  let i = 0;
  while (i < tokens.length) {
    const width = christWidth(tokens, i);
    if (width === 0) {
      out.push(tokens[i]);
      i++;
      continue;
    }
    const prefix = ERA_PREFIXES.get(bareAt(out, out.length - 1));
    if (prefix) out.splice(-1, 1, wordToken(prefix));
    out.push(wordToken('jésus'), wordToken('christ'));
    i += width;
  }
  return out;
};

// ── Nombres ──────────────────────────────────────────────────────────

const CARDINALS = new Map<string, number>([
  ['zero', 0],
  ['un', 1],
  ['une', 1],
  ['deux', 2],
  ['trois', 3],
  ['quatre', 4],
  ['cinq', 5],
  ['six', 6],
  ['sept', 7],
  ['huit', 8],
  ['neuf', 9],
  ['dix', 10],
  ['onze', 11],
  ['douze', 12],
  ['treize', 13],
  ['quatorze', 14],
  ['quinze', 15],
  ['seize', 16],
  ['vingt', 20],
  ['vingts', 20],
  ['trente', 30],
  ['quarante', 40],
  ['cinquante', 50],
  ['soixante', 60],
  ['septante', 70],
  ['huitante', 80],
  ['octante', 80],
  ['nonante', 90],
  ['cent', 100],
  ['cents', 100],
  ['mil', 1000],
  ['mille', 1000],
  ['million', 1e6],
  ['millions', 1e6],
]);

// Ordinal d'un mot-nombre : « quinze » → « quinzième », « cinq » → « cinquième », « neuf » → « neuvième ».
const ordinalOf = (word: string): string => {
  if (word === 'cinq') return 'cinquieme';
  if (word === 'neuf') return 'neuvieme';
  return `${word.endsWith('e') ? word.slice(0, -1) : word}ieme`;
};

const NOT_ORDINAL = new Set(['zero', 'une', 'vingts', 'cents', 'mil', 'millions']);

const ORDINALS = new Map<string, number>([
  ['premier', 1],
  ['premiere', 1],
  ...[...CARDINALS]
    .filter(([word]) => !NOT_ORDINAL.has(word))
    .map(([word, value]): [string, number] => [ordinalOf(word), value]),
]);

const wordValue = (word: string): number | undefined => CARDINALS.get(word) ?? ORDINALS.get(word);

type Accumulator = { total: number; current: number };

// « deux mille trois cent quatre-vingt-dix » : mille et million ferment un groupe, cent le
// multiplie, et « vingt » juste après « quatre » fait 80 (le 4 déjà compté).
const addWordValue = (acc: Accumulator, value: number, afterQuatre: boolean): void => {
  if (value >= 1000) {
    acc.total += (acc.current || 1) * value;
    acc.current = 0;
  } else if (value === 100) {
    acc.current = (acc.current || 1) * 100;
  } else {
    acc.current += value === 20 && afterQuatre ? 76 : value;
  }
};

// « et » ne se lit dans un nombre qu'entre deux mots-nombres (« vingt et un »).
const isJoiningEt = (tokens: readonly Token[], i: number, start: number): boolean =>
  i > start && bareAt(tokens, i) === 'et' && wordValue(bareAt(tokens, i + 1)) !== undefined;

// « un » / « une » seuls dans un texte plus long sont des articles, pas des nombres.
const isLoneArticle = (tokens: readonly Token[], start: number, end: number): boolean => {
  if (end - start !== 1 || tokens.length === 1) return false;
  return bareAt(tokens, start) === 'un' || bareAt(tokens, start) === 'une';
};

const readWords = (tokens: readonly Token[], start: number): NumberSegment | null => {
  const acc: Accumulator = { total: 0, current: 0 };
  let end = start;
  let ordinal = false;
  while (!ordinal && end < tokens.length) {
    if (isJoiningEt(tokens, end, start)) end++;
    const word = bareAt(tokens, end);
    const value = wordValue(word);
    if (value === undefined) break;
    addWordValue(acc, value, bareAt(tokens, end - 1) === 'quatre');
    ordinal = ORDINALS.has(word);
    end++;
  }
  if (end === start || isLoneArticle(tokens, start, end)) return null;
  return { value: acc.total + acc.current, ordinal, family: 'w', end };
};

const DIGITS = /^(\d+)(er|re|ere|nd|nde|e|eme|ieme)?$/;

const readDigits = (tokens: readonly Token[], start: number): NumberSegment | null => {
  const match = DIGITS.exec(bareAt(tokens, start));
  if (!match) return null;
  return { value: Number(match[1]), ordinal: Boolean(match[2]), family: 'a', end: start + 1 };
};

const ROMAN = /^([mdclxvi]+)(er|re|ere|e|eme)?$/;
const STRICT_ROMAN = /^m{0,3}(?:cm|cd|d?c{0,3})(?:xc|xl|l?x{0,3})(?:ix|iv|v?i{0,3})$/;
const UPPER_ROMAN = /^[MDCLXVI]+$/;
const ROMAN_VALUES = new Map([
  ['i', 1],
  ['v', 5],
  ['x', 10],
  ['l', 50],
  ['c', 100],
  ['d', 500],
  ['m', 1000],
]);

const romanValue = (numeral: string): number => {
  const values = [...numeral].map((letter) => ROMAN_VALUES.get(letter) ?? 0);
  let total = 0;
  values.forEach((value, k) => {
    const next = values.at(k + 1) ?? 0;
    total += value < next ? -value : value;
  });
  return total;
};

// Chiffre romain en MAJUSCULES dans le texte d'origine (« XVe », « Ier ») : en minuscules, « vie »
// ou « mi » seraient des nombres. `anyCase` : saisie de l'élève face à une réponse qui contient un
// nombre (« xve » pour « XVe »).
const readRoman = (
  tokens: readonly Token[],
  start: number,
  anyCase: boolean,
): NumberSegment | null => {
  const match = ROMAN.exec(bareAt(tokens, start));
  if (!match || !STRICT_ROMAN.test(match[1])) return null;
  if (!anyCase && !UPPER_ROMAN.test(tokens[start].raw.slice(0, match[1].length))) return null;
  return { value: romanValue(match[1]), ordinal: Boolean(match[2]), family: 'r', end: start + 1 };
};

const readNumber = (
  tokens: readonly Token[],
  start: number,
  anyCase: boolean,
): NumberSegment | null => {
  return readDigits(tokens, start) ?? readWords(tokens, start) ?? readRoman(tokens, start, anyCase);
};

// ── Forme canonique ──────────────────────────────────────────────────

// Marqueur hors de tout texte saisi : un nombre devient « <valeur> », suivi de son écriture
// quand la phrase en impose une, et de « e » (ordinal) en mode exact.
const NUMBER_MARK = '\uE000';

const isNumberKey = (token: string): boolean => token.startsWith(NUMBER_MARK);

const numberKey = (segment: NumberSegment, options: CanonOptions): string => {
  const family = options.family ? segment.family : '';
  const kind = options.exact && segment.ordinal ? 'e' : '';
  return `${NUMBER_MARK}${segment.value}${family}${kind}`;
};

const tokenText = (token: Token, exact: boolean): string =>
  exact ? token.raw.toLowerCase() : token.bare;

const canonicalize = (text: string, options: CanonOptions): string[] => {
  const tokens = expandEra(tokenize(text, options.exact));
  const out: string[] = [];
  let i = 0;
  while (i < tokens.length) {
    const segment = readNumber(tokens, i, options.romanAnyCase);
    out.push(segment ? numberKey(segment, options) : tokenText(tokens[i], options.exact));
    i = segment ? segment.end : i + 1;
  }
  return out;
};

const ROMAN_NOTATION = /\bchiffres? romains?\b|\bnumeration romaine\b|\blettres? romaines?\b/;
const WORD_NOTATION = /\ben (?:toutes )?lettres\b/;
const DIGIT_NOTATION = /\ben chiffres?\b/;

// Écriture imposée par la phrase ou l'indice : « 15 » ne vaut plus « XV » quand on demande les
// chiffres romains. « Empire romain » n'impose rien.
const imposedFamily = (key: FillBlankKey): Family | null => {
  const context = normalizeAnswer(`${key.sentence ?? ''} ${key.hint ?? ''}`);
  if (ROMAN_NOTATION.test(context)) return 'r';
  if (WORD_NOTATION.test(context)) return 'w';
  return DIGIT_NOTATION.test(context) ? 'a' : null;
};

// ── Écritures d'une réponse ──────────────────────────────────────────

const PARENTHESES = /\(([^()]*)\)/g;

/** Écritures d'une réponse : « XVe (quinzième) » → « XVe », « quinzième » ; « neuf / 9 » → « neuf », « 9 ». */
export const splitAlternatives = (answer: string): string[] => {
  const inner = [...answer.matchAll(PARENTHESES)].map((match) => match[1]);
  return [answer.replaceAll(PARENTHESES, ' '), ...inner]
    .flatMap((part) => collapse(part).split(' / '))
    .map((part) => part.trim())
    .filter((part) => part !== '');
};

const isFilledString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim() !== '';

/** `accepted` relu sur disque : seulement des chaînes non vides (une donnée abîmée ne casse rien). */
export const acceptedForms = (accepted: unknown): string[] => {
  return Array.isArray(accepted) ? accepted.filter(isFilledString) : [];
};

const formsOf = (key: FillBlankKey): string[] => [
  key.answer,
  ...splitAlternatives(key.answer),
  ...acceptedForms(key.accepted),
];

// Notations des nombres d'une écriture (« r », « a », « w » ; vide sans nombre), lues quand la phrase
// en impose une (la clé d'un nombre finit alors par sa notation).
const notationsOf = (form: string, family: Family): string =>
  canonicalize(form, { exact: false, romanAnyCase: false, family })
    .filter(isNumberKey)
    .map((key) => key.slice(-1))
    .join('');

// Écriture imposée : une autre écriture ne compte que dans la notation de la réponse (« 15 » listé
// dans accepted pour « XV » quand la phrase demande les chiffres romains ne vaut rien ; mesuré le
// 2026-10-10 : le modèle l'y mettait).
const formsFor = (key: FillBlankKey, family: Family | null): string[] => {
  const forms = formsOf(key);
  if (!family) return forms;
  const [main = key.answer] = splitAlternatives(key.answer);
  const reference = notationsOf(main, family);
  return forms.filter((form) => {
    const notations = notationsOf(form, family);
    return notations === '' || notations === reference;
  });
};

const toKey = (key: FillBlankKey | string): FillBlankKey =>
  typeof key === 'string' ? { answer: key } : key;

// ── Comparaison ──────────────────────────────────────────────────────

const textOf = (tokens: readonly string[]): string =>
  tokens.map((token) => (isNumberKey(token) ? '#' : token)).join(' ');

const numbersOf = (tokens: readonly string[]): string => tokens.filter(isNumberKey).join('|');

// Fautes de frappe tolérées sur les mots : 1 jusqu'à 5 caractères, 2 jusqu'à 12, 3 au-delà ; une
// réponse faite d'un nombre seul doit être exacte.
const typoTolerance = (expectedText: string): number => {
  const length = expectedText.replaceAll('#', '').trim().length;
  if (length === 0) return 0;
  if (length <= 5) return 1;
  return length <= 12 ? 2 : 3;
};

const compareForm = (childAnswer: string, form: string, family: Family | null): Verdict => {
  const expected = canonicalize(form, { exact: false, romanAnyCase: false, family });
  const anyCase = expected.some(isNumberKey);
  const given = canonicalize(childAnswer, { exact: false, romanAnyCase: anyCase, family });
  const expectedText = textOf(expected);
  const distance = levenshtein(textOf(given), expectedText);
  const sameNumbers = numbersOf(given) === numbersOf(expected);
  return { match: sameNumbers && distance <= typoTolerance(expectedText), distance };
};

export function validateFillBlankAnswer(
  childAnswer: string,
  key: FillBlankKey | string,
): { match: boolean; distance: number } {
  const item = toKey(key);
  const family = imposedFamily(item);
  const verdicts = formsFor(item, family).map((form) => compareForm(childAnswer, form, family));
  const accepted = verdicts.find((verdict) => verdict.match);
  if (accepted) return accepted;
  return { match: false, distance: Math.min(...verdicts.map((verdict) => verdict.distance)) };
}

export function validateAnswer(childAnswer: string, key: FillBlankKey | string): boolean {
  return validateFillBlankAnswer(childAnswer, key).match;
}

// Vrai quand la saisie reprend une écriture de la réponse à l'identique (accents compris), en
// ignorant casse et article : sinon l'enfant, compté juste, voit l'orthographe attendue. « 15e »
// pour « XVe » est exact ; « XV » pour « XVe », juste mais signalé (le « e » manque).
export function isExactSpelling(childAnswer: string, key: FillBlankKey | string): boolean {
  const item = toKey(key);
  const family = imposedFamily(item);
  return formsFor(item, family).some((form) => {
    const expected = canonicalize(form, { exact: true, romanAnyCase: false, family });
    const anyCase = expected.some(isNumberKey);
    const given = canonicalize(childAnswer, { exact: true, romanAnyCase: anyCase, family });
    return given.join(' ') === expected.join(' ');
  });
}

// ── Réponse donnée par l'exercice lui-même ───────────────────────────

const BLANK = /_{2,}/g;

const containsRun = (haystack: readonly string[], needle: readonly string[]): boolean => {
  for (let i = 0; i + needle.length <= haystack.length; i++) {
    if (needle.every((token, k) => haystack[i + k] === token)) return true;
  }
  return false;
};

// Valeur d'une clé de nombre : les chiffres qui suivent le marqueur (notation et ordinal ignorés).
const valueOf = (key: string): number => Number.parseInt(key.slice(NUMBER_MARK.length), 10);

// Réponse encadrée (« entre le XIVe et le XVIe » pour XVe, « entre 8 et 10 » pour neuf) : la
// phrase ou l'indice la donne aussi (mesuré le 2026-10-10 dans un indice de siècle).
const bracketsAnswer = (needle: readonly string[], context: readonly string[]): boolean => {
  if (needle.length !== 1 || !isNumberKey(needle[0])) return false;
  const value = valueOf(needle[0]);
  const values = new Set(context.filter(isNumberKey).map(valueOf));
  return values.has(value - 1) && values.has(value + 1);
};

/** Vrai quand la phrase (hors trou) ou l'indice donne déjà la réponse : l'une de ses écritures, ou un encadrement. */
export function answerLeaks(key: FillBlankKey): boolean {
  const family = imposedFamily(key);
  const options: CanonOptions = { exact: false, romanAnyCase: false, family };
  const sentence = (key.sentence ?? '').replaceAll(BLANK, ' ');
  const contexts = [sentence, key.hint ?? ''].map((text) => canonicalize(text, options));
  return formsFor(key, family).some((form) => {
    const needle = canonicalize(form, options);
    if (needle.length === 0) return false;
    return contexts.some(
      (context) => containsRun(context, needle) || bracketsAnswer(needle, context),
    );
  });
}
