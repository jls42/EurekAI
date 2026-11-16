import { Mistral } from '@mistralai/mistralai';
import {
  getContent,
  retryTurns,
  safeParseJson,
  tryParseJson,
  unwrapJsonArray,
} from '../helpers/index.js';
import { diversityParams } from '../helpers/diversity.js';
import {
  quizSystem,
  quizUser,
  quizReviewSystem,
  quizReviewUser,
  quizVocalSystem,
  quizVocalUser,
  quizRetryUser,
} from '../prompts.js';
import type { QuizQuestion, AgeGroup } from '../types.js';
import { DEFAULT_CHAT_MODEL } from '../helpers/chat-models.js';

// Type guard : le JSON du LLM peut contenir null ou des objets incomplets (champ
// manquant, mauvais type) — safeParseJson ne répare rien, il parse ou lève.
const isValidQuizItem = (q: unknown): q is QuizQuestion => {
  if (typeof q !== 'object' || q === null) return false;
  const it = q as Partial<QuizQuestion>;
  return (
    typeof it.question === 'string' &&
    it.question.length > 0 &&
    Array.isArray(it.choices) &&
    it.choices.length > 1 &&
    typeof it.correct === 'number'
  );
};

// Filtre par item (miroir generators/dictation.ts) : un item de queue malformé ne
// doit pas invalider tout un batch de questions correctes.
const filterValidQuestions = (data: QuizQuestion[]): QuizQuestion[] => {
  const valid = data.filter(isValidQuizItem);
  const discarded = data.length - valid.length;
  if (discarded > 0) {
    console.warn(`Quiz: ${discarded} item(s) invalide(s) ecarte(s) sur ${data.length}`);
  }
  return valid;
};

// Le modèle répète parfois la clé du tableau, une question par clé : `{"quiz":[q1], "quiz":[q2], …}`
// (mesuré le 2026-11-16 : une vingtaine de questions écrites, une seule gardée). JSON.parse ne garde
// que la dernière valeur d'une clé répétée : chaque occurrence est renommée avant le parse, puis les
// tableaux sont mis bout à bout. Hors d'une chaîne, `"quiz":` ne peut être qu'une clé (un guillemet
// dans un texte JSON est échappé) ; les trois prompts de quiz demandent ce format.
const QUIZ_KEY = /"quiz"\s*:/g;
const NUMBERED_QUIZ_KEY = /^quiz#\d+$/;

type JsonParse = (text: string) => unknown;

const mergedQuizArrays = (parsed: unknown): QuizQuestion[] => {
  if (typeof parsed !== 'object' || parsed === null) return [];
  return Object.entries(parsed)
    .filter(([key, value]) => NUMBERED_QUIZ_KEY.test(key) && Array.isArray(value))
    .flatMap(([, value]) => value as QuizQuestion[]);
};

const parseQuizItems = (raw: string, parse: JsonParse): QuizQuestion[] => {
  let occurrences = 0;
  const renamed = raw.replace(QUIZ_KEY, () => `"quiz#${occurrences++}":`);
  if (occurrences < 2) return unwrapJsonArray(parse(raw));
  console.warn(`Quiz: cle "quiz" repetee ${occurrences} fois, tableaux fusionnes`);
  return mergedQuizArrays(parse(renamed));
};

type QuizMessage = { role: 'system' | 'user' | 'assistant'; content: string };

interface QuizCall {
  systemPrompt: string;
  userPrompt: string;
  retryMsg: string;
  errorMsg: string;
  model: string;
  type: string;
  // Plancher : moins de questions valides = réponse incomplète, redemandée une fois.
  minValid: number;
}

// Réponse incomplète = moins de la moitié des questions demandées au modèle. Mesuré le 2026-11-16
// (leçon courte avec consigne, quiz déjà présents, donc 20 questions demandées) : le modèle rend
// une vingtaine de questions, ou parfois une seule (346 tokens en 4 s), sans rien d'invalide.
const incompleteBelow = (requested: number): number => Math.ceil(requested / 2);

const askQuiz = async (
  client: Mistral,
  call: QuizCall,
  messages: QuizMessage[],
): Promise<string> => {
  const response = await client.chat.complete({
    model: call.model,
    messages,
    responseFormat: { type: 'json_object' },
    ...diversityParams(call.type),
  });
  return getContent(response);
};

// Aucune question au 1er essai : l'échec final lève.
const retryFromNothing = async (
  client: Mistral,
  call: QuizCall,
  messages: QuizMessage[],
): Promise<QuizQuestion[]> => {
  const raw = await askQuiz(client, call, messages);
  const retryData = parseQuizItems(raw, safeParseJson);
  const retryValid = filterValidQuestions(retryData);
  if (retryValid.length === 0) {
    // SyntaxError → llm_invalid_json (extractErrorCode), pas internal_error.
    throw new SyntaxError(call.errorMsg);
  }
  return retryValid;
};

// 1er essai incomplet mais utilisable : jamais pire que lui. Le réessai ne le remplace que s'il
// rend plus de questions ; JSON invalide ou erreur de l'API au réessai → le 1er essai.
const retryKeepingFuller = async (
  client: Mistral,
  call: QuizCall,
  messages: QuizMessage[],
  first: QuizQuestion[],
): Promise<QuizQuestion[]> => {
  try {
    const raw = await askQuiz(client, call, messages);
    const retryData = parseQuizItems(raw, tryParseJson);
    const retryValid = filterValidQuestions(retryData);
    return retryValid.length > first.length ? retryValid : first;
  } catch (e) {
    console.warn('Quiz: nouvel essai en echec, 1er essai garde :', errorText(e));
    return first;
  }
};

const errorText = (e: unknown): string => (e instanceof Error ? e.message : String(e));

const generateQuizWithRetry = async (client: Mistral, call: QuizCall): Promise<QuizQuestion[]> => {
  const messages: QuizMessage[] = [
    { role: 'system', content: call.systemPrompt },
    { role: 'user', content: call.userPrompt },
  ];

  // JSON invalide au 1er essai (réponse tronquée) → [] → retry, comme une validation ratée.
  const raw = await askQuiz(client, call, messages);
  const data = parseQuizItems(raw, tryParseJson);
  const valid = filterValidQuestions(data);
  if (valid.length >= call.minValid) return valid;

  console.warn(
    `Quiz: ${valid.length} question(s) valide(s), ${call.minValid} au moins attendue(s), retrying. Got:`,
    JSON.stringify(data).slice(0, 200),
  );
  messages.push(...retryTurns(raw, call.retryMsg));
  if (valid.length === 0) return retryFromNothing(client, call, messages);
  return retryKeepingFuller(client, call, messages, valid);
};

// Nombre de questions quand l'appelant n'en demande pas (repris par la route pour en ajouter).
export const QUIZ_DEFAULT_COUNT = 15;

export async function generateQuiz(
  client: Mistral,
  markdown: string,
  model = DEFAULT_CHAT_MODEL,
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count?: number,
  exclusions?: string,
): Promise<QuizQuestion[]> {
  const effectiveCount = count ?? QUIZ_DEFAULT_COUNT;
  return generateQuizWithRetry(client, {
    systemPrompt: quizSystem(ageGroup),
    userPrompt: quizUser(markdown, effectiveCount, lang, exclusions),
    retryMsg: quizRetryUser({ kind: 'quiz', count: effectiveCount, lang }),
    errorMsg: "Le modele n'a pas reussi a generer un quiz valide apres 2 tentatives",
    model,
    type: 'quiz',
    minValid: incompleteBelow(effectiveCount),
  });
}

export async function generateQuizVocal(
  client: Mistral,
  markdown: string,
  model = DEFAULT_CHAT_MODEL,
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
  count?: number,
  exclusions?: string,
): Promise<QuizQuestion[]> {
  const effectiveCount = count ?? 15;
  return generateQuizWithRetry(client, {
    systemPrompt: quizVocalSystem(ageGroup, lang),
    userPrompt: quizVocalUser(markdown, effectiveCount, lang, exclusions),
    retryMsg: quizRetryUser({ kind: 'quiz-vocal', count: effectiveCount, lang }),
    errorMsg: "Le modele n'a pas reussi a generer un quiz vocal valide apres 2 tentatives",
    model,
    type: 'quiz-vocal',
    minValid: incompleteBelow(effectiveCount),
  });
}

export async function generateQuizReview(
  client: Mistral,
  markdown: string,
  weakQuestions: QuizQuestion[],
  model = DEFAULT_CHAT_MODEL,
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
): Promise<QuizQuestion[]> {
  const weakConcepts = weakQuestions.map((q) => q.question).join('\n- ');
  // Sans nombre demandé (5 à 10, portés par le prompt système) : réessai seulement sans question.
  return generateQuizWithRetry(client, {
    systemPrompt: quizReviewSystem(ageGroup),
    userPrompt: quizReviewUser(weakConcepts, markdown, lang),
    retryMsg: quizRetryUser({ kind: 'quiz-review', lang }),
    errorMsg: "Le modele n'a pas reussi a generer la revision quiz apres 2 tentatives",
    model,
    type: 'quiz',
    minValid: 1,
  });
}
