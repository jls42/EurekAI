import { describe, it, expect, vi } from 'vitest';

vi.mock('./tts-provider.js', () => ({
  textToSpeech: vi.fn().mockResolvedValue(Buffer.from('question-audio')),
}));

import { ttsQuestion, transcribeAudio, verifyAnswer } from './quiz-vocal.js';
import { textToSpeech } from './tts-provider.js';
import type { TtsOptions } from './tts-provider.js';
import type { QuizQuestion } from '../types.js';

const ttsOptions: TtsOptions = {
  provider: 'mistral',
  model: 'voxtral-mini-tts-2603',
  mistralClient: {} as any,
};

describe('quiz-vocal', () => {
  describe('ttsQuestion', () => {
    it('builds text from question and choices, then calls textToSpeech', async () => {
      const question: QuizQuestion = {
        question: 'Quelle est la capitale de la France ?',
        choices: ['Paris', 'Lyon', 'Marseille', 'Toulouse'],
        correct: 0,
        explanation: 'Paris est la capitale.',
      };

      const result = await ttsQuestion(question, 'voice-1', ttsOptions);

      expect(textToSpeech).toHaveBeenCalledWith(
        'Quelle est la capitale de la France ? Paris. Lyon. Marseille. Toulouse',
        'voice-1',
        ttsOptions,
      );
      expect(result).toBeInstanceOf(Buffer);
      expect(result.toString()).toBe('question-audio');
    });
  });

  describe('transcribeAudio', () => {
    it('calls client.audio.transcriptions.complete and returns text', async () => {
      const client = {
        audio: {
          transcriptions: {
            complete: vi.fn().mockResolvedValue({ text: 'reponse A' }),
          },
        },
      } as any;

      const result = await transcribeAudio(client, Buffer.from('audio'), 'answer.mp3');

      expect(client.audio.transcriptions.complete).toHaveBeenCalledWith({
        model: 'voxtral-mini-latest',
        file: { fileName: 'answer.mp3', content: expect.any(Uint8Array) },
        language: 'fr',
      });
      expect(result).toBe('reponse A');
    });
  });

  describe('verifyAnswer', () => {
    function createChatClient(correct: boolean, feedback: string) {
      return {
        chat: {
          complete: vi.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: JSON.stringify({ correct, feedback }),
                },
              },
            ],
          }),
        },
      } as any;
    }

    it('calls client.chat.complete and returns parsed result', async () => {
      const client = createChatClient(true, 'Bravo !');
      const result = await verifyAnswer(
        client,
        'Capitale de la France ?',
        ['Paris', 'Lyon', 'Marseille', 'Toulouse'],
        0,
        'Paris',
      );

      expect(client.chat.complete).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ correct: true, feedback: 'Bravo !' });
    });

    it('handles correct answer', async () => {
      const client = createChatClient(true, 'Excellent !');
      const result = await verifyAnswer(
        client,
        'Question test',
        ['A) Bonne', 'B) Mauvaise'],
        0,
        'A',
      );

      expect(result.correct).toBe(true);
      expect(result.feedback).toBe('Excellent !');
    });

    it('handles incorrect answer', async () => {
      const client = createChatClient(false, 'La bonne reponse etait A) Bonne');
      const result = await verifyAnswer(
        client,
        'Question test',
        ['A) Bonne', 'B) Mauvaise'],
        0,
        'B',
      );

      expect(result.correct).toBe(false);
      expect(result.feedback).toContain('bonne reponse');
    });

    it('passes lang parameter to the system prompt', async () => {
      const client = createChatClient(true, 'Well done!');
      await verifyAnswer(client, 'Capital of France?', ['Paris', 'London'], 0, 'Paris', {
        model: 'mistral-large-latest',
        lang: 'en',
      });

      const call = client.chat.complete.mock.calls[0][0];
      expect(call.messages[0].content).toContain('English');
    });
  });
});
