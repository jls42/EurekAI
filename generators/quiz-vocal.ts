import { Mistral } from '@mistralai/mistralai';
import { getContent, safeParseJson } from '../helpers/index.js';
import { textToSpeech, type TtsOptions } from './tts-provider.js';
import { verifyAnswerSystem } from '../prompts.js';
import type { AgeGroup, QuizQuestion } from '../types.js';

export async function ttsQuestion(
  question: QuizQuestion,
  voiceId: string,
  ttsOptions: TtsOptions,
): Promise<Buffer> {
  const text = `${question.question} ${question.choices.join('. ')}`;
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

export async function verifyAnswer(
  client: Mistral,
  question: string,
  choices: string[],
  correctIndex: number,
  studentAnswer: string,
  model = 'mistral-large-latest',
  lang = 'fr',
  ageGroup: AgeGroup = 'enfant',
): Promise<{ correct: boolean; feedback: string }> {
  const correctAnswer = choices[correctIndex]?.replace(/^[A-D]\)\s*/, '') ?? '';
  const choicesList = choices
    .map((c, i) => `${String.fromCodePoint(65 + i)}) ${c.replace(/^[A-D]\)\s*/, '')}`)
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
