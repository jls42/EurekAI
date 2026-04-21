import { describe, it, expect, vi } from 'vitest';

vi.mock('./tts-provider.js', () => ({
  textToSpeech: vi.fn().mockResolvedValue(Buffer.from('question-audio')),
}));

import { ttsQuestion, transcribeAudio, verifyAnswer } from './quiz-vocal.js';
import { textToSpeech } from './tts-provider.js';
import type { TtsOptions } from './tts-provider.js';
import type { QuizQuestion } from '../types.js';

const ttsOptions: TtsOptions = {
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

    it('localises A)/B) labels per lang before TTS (FR)', async () => {
      vi.mocked(textToSpeech).mockClear();
      const question: QuizQuestion = {
        question: 'Capitale ?',
        choices: ['A) Paris', 'B) Lyon'],
        correct: 0,
        explanation: '',
      };
      await ttsQuestion(question, 'v', ttsOptions, 'fr');
      expect(textToSpeech).toHaveBeenCalledWith(
        'Capitale ? choix A : Paris. choix B : Lyon',
        'v',
        ttsOptions,
      );
    });

    it('localises A)/B) labels per lang before TTS (EN)', async () => {
      vi.mocked(textToSpeech).mockClear();
      const question: QuizQuestion = {
        question: 'Capital?',
        choices: ['A) Paris', 'B) London'],
        correct: 0,
        explanation: '',
      };
      await ttsQuestion(question, 'v', ttsOptions, 'en');
      expect(textToSpeech).toHaveBeenCalledWith(
        'Capital? choice A : Paris. choice B : London',
        'v',
        ttsOptions,
      );
    });

    it('localises A)/B) labels per lang before TTS (ES)', async () => {
      vi.mocked(textToSpeech).mockClear();
      const question: QuizQuestion = {
        question: '¿Capital?',
        choices: ['A) Madrid', 'B) Barcelona'],
        correct: 0,
        explanation: '',
      };
      await ttsQuestion(question, 'v', ttsOptions, 'es');
      expect(textToSpeech).toHaveBeenCalledWith(
        '¿Capital? opción A : Madrid. opción B : Barcelona',
        'v',
        ttsOptions,
      );
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

    it('strips choice labels before composing correctAnswerLine (ex: A. → texte pur)', async () => {
      const client = createChatClient(true, 'ok');
      await verifyAnswer(
        client,
        'Quel fleuve ?',
        ['A. Seine', 'B: Loire', 'C) Rhône', 'Alice'],
        0,
        'Seine',
      );
      const systemPrompt = client.chat.complete.mock.calls[0][0].messages[0].content;
      // correctAnswerLine est reconstruit avec le label A) et le texte stripped "Seine"
      expect(systemPrompt).toContain('A) Seine');
      // Les choix legacy mal formatés sont préservés ou traités sans casser l'API
      expect(systemPrompt).toContain('Seine');
    });
  });
});
