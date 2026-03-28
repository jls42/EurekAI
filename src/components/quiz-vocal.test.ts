import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { quizVocalComponent } from './quiz-vocal';

// Mock document.documentElement.lang used in submitVocalAnswer
(globalThis as any).document = {
  documentElement: { lang: 'fr' },
};

globalThis.fetch = vi.fn();

function createVocalQuiz(questions: any[], audioUrls: string[] = []) {
  const gen = {
    id: 'gen-vocal-1',
    data: questions,
    audioUrls,
  };
  const comp = quizVocalComponent(gen) as any;
  comp.currentProjectId = 'proj-1';
  comp.showToast = vi.fn();
  comp.t = vi.fn((key: string) => key);
  comp.$nextTick = vi.fn((cb: () => void) => cb());
  comp.$refs = {
    questionAudio: {
      pause: vi.fn(),
      play: vi.fn(() => Promise.resolve()),
      load: vi.fn(),
      currentTime: 0,
    },
  };
  return comp;
}

const sampleQuestions = [
  { question: 'Couleur du ciel?', answer: 'Bleu' },
  { question: 'Capitale de la France?', answer: 'Paris' },
  { question: '2 + 2 = ?', answer: '4' },
];

const sampleUrls = ['/audio/q0.mp3', '/audio/q1.mp3', '/audio/q2.mp3'];

describe('quizVocalComponent', () => {
  beforeEach(() => {
    vi.mocked(globalThis.fetch).mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('inherits step-by-step properties', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
      expect(comp.audioPlaying).toBe(false);
      expect(comp.vocalRecording).toBe(false);
    });
  });

  describe('questions', () => {
    it('delegates to items()', () => {
      const comp = createVocalQuiz(sampleQuestions);
      expect(comp.questions()).toEqual(sampleQuestions);
    });
  });

  describe('currentAudioUrl', () => {
    it('returns correct URL from gen.audioUrls', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      expect(comp.currentAudioUrl()).toBe('/audio/q0.mp3');
    });

    it('returns correct URL for second question', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      comp.currentQ = 1;
      expect(comp.currentAudioUrl()).toBe('/audio/q1.mp3');
    });

    it('returns empty string when no audioUrls', () => {
      const comp = createVocalQuiz(sampleQuestions);
      expect(comp.currentAudioUrl()).toBe('');
    });
  });

  describe('stopQuestion', () => {
    it('pauses audio and resets', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      comp.audioPlaying = true;

      comp.stopQuestion();

      expect(comp.$refs.questionAudio.pause).toHaveBeenCalled();
      expect(comp.$refs.questionAudio.currentTime).toBe(0);
      expect(comp.audioPlaying).toBe(false);
    });

    it('handles missing audio element gracefully', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      comp.$refs = {};
      comp.audioPlaying = true;

      comp.stopQuestion();

      expect(comp.audioPlaying).toBe(false);
    });
  });

  describe('playQuestion', () => {
    it('loads and plays audio', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);

      comp.playQuestion();

      expect(comp.$refs.questionAudio.pause).toHaveBeenCalled();
      expect(comp.$refs.questionAudio.load).toHaveBeenCalled();
      expect(comp.$refs.questionAudio.play).toHaveBeenCalled();
      expect(comp.audioPlaying).toBe(true);
    });

    it('does nothing if no audio URL', () => {
      const comp = createVocalQuiz(sampleQuestions); // no URLs
      comp.playQuestion();
      expect(comp.$refs.questionAudio.play).not.toHaveBeenCalled();
    });

    it('does nothing if no audio element', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      comp.$refs = {};
      comp.playQuestion();
      expect(comp.audioPlaying).toBe(false);
    });
  });

  describe('nextQuestion', () => {
    it('stops audio, advances to next, plays next question', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      comp.feedback = { correct: true };

      comp.nextQuestion();

      // After stopQuestion + playQuestion via $nextTick, audioPlaying ends up true
      // because playQuestion sets it after stopQuestion clears it
      expect(comp.audioPlaying).toBe(true);
      expect(comp.feedback).toBeNull();
      expect(comp.currentQ).toBe(1);
      expect(comp.$refs.questionAudio.play).toHaveBeenCalled();
    });

    it('sets finished when all questions answered', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      comp.currentQ = 2; // last question

      comp.nextQuestion();

      expect(comp.finished).toBe(true);
    });
  });

  describe('resetVocalQuiz', () => {
    it('stops audio and resets, plays first question', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      comp.currentQ = 2;
      comp.score = 2;
      comp.finished = true;

      comp.resetVocalQuiz();

      // After resetAll + playQuestion, audioPlaying is true (playQuestion sets it)
      expect(comp.audioPlaying).toBe(true);
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
      expect(comp.$refs.questionAudio.play).toHaveBeenCalled();
    });
  });

  describe('submitVocalAnswer', () => {
    it('correct answer increments score', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ correct: true, feedback: 'Bravo!', transcription: 'Bleu' }),
      } as any);
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      const blob = new Blob(['audio'], { type: 'audio/webm' });

      await comp.submitVocalAnswer(blob);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/projects/proj-1/generations/gen-vocal-1/vocal-answer',
        { method: 'POST', body: expect.any(FormData) },
      );
      expect(comp.score).toBe(1);
      expect(comp.feedback).toMatchObject({ correct: true });
    });

    it('incorrect answer does not increment score', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ correct: false, feedback: 'Non', transcription: 'Rouge' }),
      } as any);
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      const blob = new Blob(['audio'], { type: 'audio/webm' });

      await comp.submitVocalAnswer(blob);

      expect(comp.score).toBe(0);
      expect(comp.feedback).toMatchObject({ correct: false });
    });

    it('sets error feedback on failed response', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: false, status: 500 } as any);
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      const blob = new Blob(['audio'], { type: 'audio/webm' });

      await comp.submitVocalAnswer(blob);

      expect(comp.score).toBe(0);
      expect(comp.feedback).toMatchObject({
        correct: false,
        feedback: 'quiz.verificationError',
      });
    });

    it('sets error feedback on exception', async () => {
      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network failure'));
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      const blob = new Blob(['audio'], { type: 'audio/webm' });

      await comp.submitVocalAnswer(blob);

      expect(comp.score).toBe(0);
      expect(comp.feedback).toMatchObject({
        correct: false,
        feedback: 'toast.error',
      });
    });
  });

  describe('startVocalRecording', () => {
    let mockStart: ReturnType<typeof vi.fn>;
    let mockStop: ReturnType<typeof vi.fn>;
    let onDataAvailable: ((e: any) => void) | null = null;
    let onStop: (() => void) | null = null;
    let mockTrackStop: ReturnType<typeof vi.fn>;
    let mockStream: { getTracks: () => { stop: ReturnType<typeof vi.fn> }[] };

    beforeEach(() => {
      onDataAvailable = null;
      onStop = null;
      mockStart = vi.fn();
      mockStop = vi.fn();

      class FakeMediaRecorder {
        start = mockStart;
        stop = mockStop;
        state = 'recording';
        set ondataavailable(fn: any) { onDataAvailable = fn; }
        set onstop(fn: any) { onStop = fn; }
      }

      mockTrackStop = vi.fn();
      mockStream = { getTracks: () => [{ stop: mockTrackStop }] };
      vi.stubGlobal('navigator', {
        mediaDevices: { getUserMedia: vi.fn().mockResolvedValue(mockStream) },
      });
      vi.stubGlobal('MediaRecorder', FakeMediaRecorder);
    });

    it('calls stopQuestion, creates MediaRecorder, sets vocalRecording=true', async () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      const stopSpy = vi.spyOn(comp, 'stopQuestion');

      await comp.startVocalRecording();

      expect(stopSpy).toHaveBeenCalled();
      expect(mockStart).toHaveBeenCalled();
      expect(comp.vocalRecorder).toBeDefined();
      expect(comp.vocalRecording).toBe(true);
    });

    it('on mic error, shows toast', async () => {
      vi.mocked(navigator.mediaDevices.getUserMedia).mockRejectedValueOnce(
        new Error('Permission denied'),
      );
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);

      await comp.startVocalRecording();

      expect(comp.showToast).toHaveBeenCalledWith('toast.micError', 'error');
      expect(comp.vocalRecording).toBe(false);
    });

    it('onstop calls submitVocalAnswer with blob', async () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      comp.submitVocalAnswer = vi.fn();

      await comp.startVocalRecording();

      // Simulate data chunks
      onDataAvailable!({ data: new Blob(['chunk1']) });
      onDataAvailable!({ data: new Blob(['chunk2']) });

      // Trigger onstop
      await onStop!();

      expect(mockTrackStop).toHaveBeenCalled();
      expect(comp.submitVocalAnswer).toHaveBeenCalledWith(expect.any(Blob));
    });
  });

  describe('stopVocalRecording', () => {
    it('stops recorder when recording', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      const mockRecorderStop = vi.fn();
      comp.vocalRecorder = { state: 'recording', stop: mockRecorderStop } as any;
      comp.vocalRecording = true;

      comp.stopVocalRecording();

      expect(mockRecorderStop).toHaveBeenCalled();
      expect(comp.vocalRecording).toBe(false);
    });

    it('sets vocalRecording=false even when recorder is null', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      comp.vocalRecorder = null;
      comp.vocalRecording = true;

      comp.stopVocalRecording();

      expect(comp.vocalRecording).toBe(false);
    });

    it('does not call stop when recorder state is not recording', () => {
      const comp = createVocalQuiz(sampleQuestions, sampleUrls);
      const mockRecorderStop = vi.fn();
      comp.vocalRecorder = { state: 'inactive', stop: mockRecorderStop } as any;
      comp.vocalRecording = true;

      comp.stopVocalRecording();

      expect(mockRecorderStop).not.toHaveBeenCalled();
      expect(comp.vocalRecording).toBe(false);
    });
  });
});
