/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any -- Codacy lance ESLint sans resolution des types vitest : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { dictationComponent } from './dictation';

const sampleItems = [
  { word: 'toujours', sentence: 'Mon chat dort toujours ici.', rule: 'S muet final.' },
  { word: 'climat', sentence: 'Le climat change, le climat compte.', rule: 'Un seul m.' },
  { word: 'école', sentence: "Je vais à l'école.", rule: 'Accent aigu.' },
];

function makeAudio() {
  return {
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    currentTime: 0,
  };
}

function createDictation(items = sampleItems) {
  const gen = {
    id: 'gen-dict-1',
    type: 'dictation',
    data: items,
    audioUrls: items.map((_, i) => `/audio/w${i}.mp3`),
  };
  const comp = dictationComponent(gen as any) as any;
  comp.currentProjectId = 'proj-1';
  comp.showToast = vi.fn();
  comp.t = vi.fn((key: string) => key);
  comp.$refs = { wordAudio: makeAudio(), dictationInput: { focus: vi.fn() } };
  comp.$nextTick = (cb: () => void) => {
    cb();
  };
  return comp;
}

describe('dictationComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ stats: { attempts: [1] } }) }),
    ) as any;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('maskedSentence / audioUrl', () => {
    it('masque TOUTES les occurrences du mot courant', () => {
      const comp = createDictation();
      comp.currentQ = 1; // 'climat' apparaît 2×
      expect(comp.maskedSentence()).toBe('Le ___ change, le ___ compte.');
    });

    it('audioUrl retourne le MP3 du mot courant', () => {
      const comp = createDictation();
      expect(comp.audioUrl()).toBe('/audio/w0.mp3');
      comp.currentQ = 2;
      expect(comp.audioUrl()).toBe('/audio/w2.mp3');
    });
  });

  describe('audio : play / replay / stop', () => {
    it('playWord relance depuis le début', () => {
      const comp = createDictation();
      comp.$refs.wordAudio.currentTime = 3;
      comp.playWord();
      expect(comp.$refs.wordAudio.currentTime).toBe(0);
      expect(comp.$refs.wordAudio.play).toHaveBeenCalledOnce();
    });

    it('onAudioEnded programme UNE seule relecture après la pause', () => {
      const comp = createDictation();
      comp.onAudioEnded();
      expect(comp._replayTimer).not.toBeNull();
      vi.advanceTimersByTime(3000);
      expect(comp.$refs.wordAudio.play).toHaveBeenCalledTimes(1);
      // Une 2e fin de lecture ne replanifie PAS (garde _replayedOnce)
      comp.onAudioEnded();
      expect(comp._replayTimer).toBeNull();
    });

    it('pas de relecture après validation', () => {
      const comp = createDictation();
      comp.feedback = { correct: true, chars: [], expected: 'toujours' };
      comp.onAudioEnded();
      expect(comp._replayTimer).toBeNull();
    });

    it('stopWord nettoie le timer de relecture (anti replay après navigation)', () => {
      const comp = createDictation();
      comp.onAudioEnded();
      expect(comp._replayTimer).not.toBeNull();
      comp.stopWord();
      expect(comp._replayTimer).toBeNull();
      expect(comp.$refs.wordAudio.pause).toHaveBeenCalled();
      vi.advanceTimersByTime(5000);
      expect(comp.$refs.wordAudio.play).not.toHaveBeenCalled();
    });
  });

  describe('checkAnswer (comparaison stricte)', () => {
    it('bonne réponse : score + feedback correct + stop audio', () => {
      const comp = createDictation();
      comp.typed = 'Toujours'; // casse ignorée
      comp.checkAnswer();
      expect(comp.score).toBe(1);
      expect(comp.results[0]).toBe(true);
      expect(comp.feedback?.correct).toBe(true);
      expect(comp.$refs.wordAudio.pause).toHaveBeenCalled();
    });

    it('accent manquant = faux, diff exposé', () => {
      const comp = createDictation();
      comp.currentQ = 2; // 'école'
      comp.typed = 'ecole';
      comp.checkAnswer();
      expect(comp.score).toBe(0);
      expect(comp.results[2]).toBe(false);
      expect(comp.feedback?.correct).toBe(false);
      expect(comp.feedback?.expected).toBe('école');
    });

    it('saisie vide : no-op', () => {
      const comp = createDictation();
      comp.typed = '   ';
      comp.checkAnswer();
      expect(comp.feedback).toBeNull();
    });
  });

  describe('navigation / restoreState', () => {
    it('onNextReady stoppe l’audio et restaure l’état vierge (focus input)', () => {
      const comp = createDictation();
      comp.typed = 'toujours';
      comp.checkAnswer();
      comp.currentQ = 1;
      comp.onNextReady();
      expect(comp.typed).toBe('');
      expect(comp.feedback).toBeNull();
      expect(comp.$refs.dictationInput.focus).toHaveBeenCalled();
    });

    it('restaure la réponse et le feedback d’un mot déjà répondu', () => {
      const comp = createDictation();
      comp.typed = 'toujour'; // faux
      comp.checkAnswer();
      comp.currentQ = 1;
      comp.onNextReady();
      comp.currentQ = 0;
      comp.onPrevReady();
      expect(comp.typed).toBe('toujour');
      expect(comp.feedback?.correct).toBe(false);
    });
  });

  describe('handleKey', () => {
    it('Enter valide quand pas de feedback, passe au suivant sinon', () => {
      const comp = createDictation();
      comp.nextQuestion = vi.fn();
      comp.typed = 'toujours';
      comp.handleKey({ key: 'Enter' } as KeyboardEvent);
      expect(comp.feedback?.correct).toBe(true);
      comp.handleKey({ key: 'Enter' } as KeyboardEvent);
      expect(comp.nextQuestion).toHaveBeenCalledOnce();
    });

    it('ignore les autres touches', () => {
      const comp = createDictation();
      comp.typed = 'toujours';
      comp.handleKey({ key: 'a' } as KeyboardEvent);
      expect(comp.feedback).toBeNull();
    });
  });

  describe('submitFullAttempt', () => {
    it('poste les réponses et met à jour les stats', async () => {
      const comp = createDictation();
      comp.answers = { 0: 'toujours', 1: 'climat', 2: 'ecole' };
      await comp.submitFullAttempt();
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/projects/proj-1/generations/gen-dict-1/dictation-attempt',
        expect.objectContaining({ method: 'POST' }),
      );
      expect(comp.gen.stats).toEqual({ attempts: [1] });
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreSaved', 'success');
    });

    it('toast erreur si le POST échoue', async () => {
      globalThis.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 })) as any;
      const comp = createDictation();
      await comp.submitFullAttempt();
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreError', 'error');
    });
  });

  describe('retryWrongWords / resetDictation', () => {
    it('rejoue uniquement les mots ratés', () => {
      const comp = createDictation();
      comp.results = { 0: true, 1: false, 2: false };
      comp.retryWrongWords();
      expect(comp.queue).toEqual([1, 2]);
      expect(comp.answers).toEqual({});
      expect(comp.typed).toBe('');
    });

    it('resetDictation remet tout à zéro et stoppe l’audio', () => {
      const comp = createDictation();
      comp.typed = 'toujours';
      comp.checkAnswer();
      comp.resetDictation();
      expect(comp.score).toBe(0);
      expect(comp.answers).toEqual({});
      expect(comp.results).toEqual({});
      expect(comp.$refs.wordAudio.pause).toHaveBeenCalled();
    });
  });

  describe('onFinish', () => {
    it('stoppe l’audio et soumet', () => {
      const comp = createDictation();
      comp.submitFullAttempt = vi.fn();
      comp.onFinish();
      expect(comp.submitFullAttempt).toHaveBeenCalledOnce();
      expect(comp.$refs.wordAudio.pause).toHaveBeenCalled();
    });
  });
});
