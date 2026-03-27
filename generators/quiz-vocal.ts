import { Mistral } from '@mistralai/mistralai';
import { safeParseJson } from '../helpers/index.js';
import { textToSpeech, type TtsOptions } from './tts-provider.js';
import { langInstruction } from '../prompts.js';
import type { QuizQuestion } from '../types.js';

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
): Promise<string> {
  const result = await client.audio.transcriptions.complete({
    model: 'voxtral-mini-latest',
    file: { fileName: filename, content: new Uint8Array(buffer) },
    language: 'fr',
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
): Promise<{ correct: boolean; feedback: string }> {
  const correctAnswer = choices[correctIndex]?.replace(/^[A-D]\)\s*/, '') ?? '';
  const choicesList = choices
    .map((c, i) => `${String.fromCodePoint(65 + i)}) ${c.replace(/^[A-D]\)\s*/, '')}`)
    .join('\n');

  const response = await client.chat.complete({
    model,
    messages: [
      {
        role: 'system',
        content: `Tu es un correcteur de quiz pour enfants (9 ans). Compare la reponse de l'eleve avec la bonne reponse.

Les choix disponibles sont :
${choicesList}

La bonne reponse est : ${String.fromCodePoint(65 + correctIndex)}) ${correctAnswer}

Regles strictes :
- L'eleve peut repondre par la lettre (A, B, C, D), par le numero (1, 2, 3, 4 ou "reponse 2"), par "reponse B", ou par le texte de la reponse. Toutes ces formes sont valides. Correspondance : 1=A, 2=B, 3=C, 4=D.
- Si la reponse correspond a la bonne reponse (meme avec des fautes d'orthographe mineures ou une formulation legerement differente), reponds correct=true avec un feedback enthousiaste comme "Bravo !" ou "Excellent !".
- Si la reponse est fausse ou ne correspond pas, reponds correct=false avec un feedback encourageant qui explique la bonne reponse.
- Ne dis JAMAIS "presque bon" ou "presque correct" quand la reponse EST correcte. Soit c'est bon, soit c'est faux.
- Les variantes orthographiques d'un meme mot (ex: Wisigoths/Visigoths) ne sont PAS des erreurs.

Reponds en JSON strict: {"correct": true/false, "feedback": "..."}${langInstruction(lang)}`,
      },
      {
        role: 'user',
        content: `Question: ${question}\nReponse de l'eleve: ${studentAnswer}\n\nLa reponse est-elle correcte ou fausse ?`,
      },
    ],
    responseFormat: { type: 'json_object' },
  });

  const raw = String(response.choices![0].message.content ?? '');
  return safeParseJson<{ correct: boolean; feedback: string }>(raw);
}
