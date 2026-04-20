import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';
import { textToSpeech, type TtsOptions } from './tts-provider.js';
import { verifyAnswerSystem } from '../prompts.js';
import { toSpokenChoice, stripChoiceLabel } from '../helpers/choice-labels.js';
import type { AgeGroup, QuizQuestion, QuizVocalGeneration } from '../types.js';

export async function ttsQuestion(
  question: QuizQuestion,
  voiceId: string,
  ttsOptions: TtsOptions,
  lang = 'fr',
): Promise<Buffer> {
  // Phase 2.5 — Transformer "A) Paris" en "choix A : Paris" (localisé) avant TTS,
  // pour éviter que le moteur ne prononce "A parenthèse fermée Paris".
  const spokenChoices = question.choices.map((c) => toSpokenChoice(c, lang));
  const text = `${question.question} ${spokenChoices.join('. ')}`;
  return textToSpeech(text, voiceId, ttsOptions);
}

export async function transcribeAudio(
  client: Mistral,
  buffer: Buffer,
  filename: string,
  lang = 'fr',
): Promise<string> {
  const result = await client.audio.transcriptions.complete({
    model: 'voxtral-mini-latest',
    file: { fileName: filename, content: new Uint8Array(buffer) },
    language: lang,
  });
  return result.text;
}

export interface VerifyAnswerOptions {
  model?: string;
  lang?: string;
  ageGroup?: AgeGroup;
}

export async function verifyAnswer(
  client: Mistral,
  question: string,
  choices: string[],
  correctIndex: number,
  studentAnswer: string,
  options: VerifyAnswerOptions = {},
): Promise<{ correct: boolean; feedback: string }> {
  const { model = 'mistral-large-latest', lang = 'fr', ageGroup = 'enfant' } = options;
  // Phase 2.5 — Aligner le strip sur le parseur de label (via stripChoiceLabel) pour absorber
  // les mêmes dérives typographiques que toSpokenChoice. Avant : strip strict /^[A-D]\)\s*/
  // ne reconnaissait que "A)" mais pas "A." ou "A:" — incohérent si le modèle dérive.
  const correctAnswer = choices[correctIndex] ? stripChoiceLabel(choices[correctIndex]) : '';
  const choicesList = choices
    .map((c, i) => `${String.fromCodePoint(65 + i)}) ${stripChoiceLabel(c)}`)
    .join('\n');

  const correctAnswerLine = `${String.fromCodePoint(65 + correctIndex)}) ${correctAnswer}`;

  const response = await client.chat.complete({
    model,
    messages: [
      {
        role: 'system',
        content: verifyAnswerSystem(choicesList, correctAnswerLine, ageGroup, lang),
      },
      {
        role: 'user',
        content: `Question: ${question}\nReponse de l'eleve: ${studentAnswer}\n\nLa reponse est-elle correcte ou fausse ?`,
      },
    ],
    responseFormat: { type: 'json_object' },
  });

  const raw = getContent(response);
  return safeParseJson<{ correct: boolean; feedback: string }>(raw);
}

export function createQuizVocalGeneration(
  fields: Omit<QuizVocalGeneration, 'lang' | 'ageGroup'> & {
    lang: string;
    ageGroup: AgeGroup;
  },
): QuizVocalGeneration {
  return fields;
}
