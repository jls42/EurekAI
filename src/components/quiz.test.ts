import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { quizComponent } from './quiz';
import { createGenerate, registerGeneration } from '../app/generate';

vi.mock('../i18n/index', () => ({ getLocale: vi.fn(() => 'fr') }));
vi.mock('../app/helpers', () => ({ normalizeSummaryData: vi.fn() }));
// Pré-contrôle réel (canStartGenerate et statut effectif) ; seul l'enregistrement est simulé.
vi.mock('../app/generate', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../app/generate')>()),
  registerGeneration: vi.fn(),
}));

const { blockedModerationSource, blockedModerationStatus, moderationBlockedMessage } =
  createGenerate();

function createQuiz(questions: any[], genOverrides: Record<string, unknown> = {}) {
  const gen = {
    id: 'gen-quiz-1',
    data: questions,
    ...genOverrides,
  };
  const comp = quizComponent(gen as any) as any;
  comp.currentProjectId = 'proj-1';
  comp.currentProfile = null;
  comp.sources = [];
  comp.selectedIds = [];
  comp.showToast = vi.fn();
  comp.t = vi.fn((key: string) => key);
  comp.generations = [];
  comp.openGens = {};
  comp.blockedModerationSource = blockedModerationSource;
  comp.blockedModerationStatus = blockedModerationStatus;
  comp.moderationBlockedMessage = moderationBlockedMessage;
  comp.flaggedCategoryLabels = vi.fn(() => '');
  return comp;
}

const sampleQuestions = [
  { question: 'Couleur du ciel?', choices: ['Rouge', 'Bleu', 'Vert'], correct: 1 },
  { question: 'Capitale de la France?', choices: ['Lyon', 'Marseille', 'Paris'], correct: 2 },
  { question: '2 + 2 = ?', choices: ['3', '4', '5'], correct: 1 },
];

describe('quizComponent', () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchSpy = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ stats: { attempts: 1 } }) }),
    );
    global.fetch = fetchSpy as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('etat initial', () => {
    it('selectedChoice commence a null', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.selectedChoice).toBeNull();
    });

    it('answers commence vide', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.answers).toEqual({});
    });

    it('reviewing commence a false', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.reviewing).toBe(false);
    });

    it('herite des proprietes du mixin stepByStep', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
      expect(comp.feedback).toBeNull();
      expect(comp.queue).toBeNull();
    });
  });

  describe('currentQuestion()', () => {
    it('retourne la premiere question au debut', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.currentQuestion()).toEqual(sampleQuestions[0]);
    });

    it('retourne la question courante apres navigation', () => {
      const comp = createQuiz(sampleQuestions);
      comp.currentQ = 2;
      expect(comp.currentQuestion()).toEqual(sampleQuestions[2]);
    });

    it('retourne la question correcte avec une queue', () => {
      const comp = createQuiz(sampleQuestions);
      comp.queue = [2, 0];
      expect(comp.currentQuestion()).toEqual(sampleQuestions[2]);
    });
  });

  describe('selectChoice()', () => {
    it('bonne reponse incremente le score', () => {
      const comp = createQuiz(sampleQuestions);
      comp.selectChoice(1); // correct pour question 0
      expect(comp.score).toBe(1);
      expect(comp.selectedChoice).toBe(1);
      expect(comp.answers[0]).toBe(1);
      expect(comp.feedback).toEqual({ correct: true });
    });

    it('mauvaise reponse ne incremente pas le score', () => {
      const comp = createQuiz(sampleQuestions);
      comp.selectChoice(0); // incorrect pour question 0
      expect(comp.score).toBe(0);
      expect(comp.selectedChoice).toBe(0);
      expect(comp.answers[0]).toBe(0);
      expect(comp.feedback).toEqual({ correct: false });
    });

    it('ne fait rien si feedback existe deja', () => {
      const comp = createQuiz(sampleQuestions);
      comp.selectChoice(1);
      expect(comp.score).toBe(1);
      // Tenter de re-selectionner
      comp.selectChoice(0);
      expect(comp.score).toBe(1);
      expect(comp.selectedChoice).toBe(1);
    });

    it('enregistre au bon index avec queue', () => {
      const comp = createQuiz(sampleQuestions);
      comp.queue = [2, 1];
      comp.selectChoice(1); // correct pour question index 2
      expect(comp.answers[2]).toBe(1);
      expect(comp.score).toBe(1);
    });
  });

  describe('onNextReady()', () => {
    it('reset selectedChoice a null', () => {
      const comp = createQuiz(sampleQuestions);
      comp.selectedChoice = 2;
      comp.onNextReady();
      expect(comp.selectedChoice).toBeNull();
    });
  });

  describe('retryWrongQuestions()', () => {
    it('filtre les questions incorrectes et relance', () => {
      const comp = createQuiz(sampleQuestions);
      // Simuler des reponses: q0 correct (ci=1), q1 incorrect (ci=0), q2 incorrect (ci=0)
      comp.answers = { 0: 1, 1: 0, 2: 0 };
      comp.retryWrongQuestions();
      expect(comp.queue).toEqual([1, 2]);
      expect(comp.answers).toEqual({});
      expect(comp.selectedChoice).toBeNull();
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
    });

    it('ne fait rien si tout est correct', () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 1, 1: 2, 2: 1 };
      comp.finished = true;
      comp.retryWrongQuestions();
      // retryWrong([]) is a no-op
      expect(comp.queue).toBeNull();
    });
  });

  describe('resetQuiz()', () => {
    it('remet tout a zero', () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 1, 1: 2 };
      comp.selectedChoice = 1;
      comp.currentQ = 2;
      comp.score = 2;
      comp.finished = true;
      comp.queue = [0, 1];
      comp.feedback = { correct: true };
      comp.resetQuiz();
      expect(comp.answers).toEqual({});
      expect(comp.selectedChoice).toBeNull();
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
      expect(comp.queue).toBeNull();
      expect(comp.feedback).toBeNull();
    });
  });

  describe('submitAttempt()', () => {
    it('appelle fetch avec les bons parametres', async () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 1, 1: 2 };
      await comp.submitAttempt();
      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/projects/proj-1/generations/gen-quiz-1/quiz-attempt',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: { 0: 1, 1: 2 } }),
        },
      );
    });

    it('met a jour gen.stats sur succes', async () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 1 };
      await comp.submitAttempt();
      expect(comp.gen.stats).toEqual({ attempts: 1 });
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreSaved', 'success');
    });

    it('affiche erreur si fetch echoue (res.ok=false)', async () => {
      global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 })) as any;
      const comp = createQuiz(sampleQuestions);
      await comp.submitAttempt();
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreError', 'error');
    });

    it('affiche erreur si fetch leve une exception', async () => {
      global.fetch = vi.fn(() => Promise.reject(new Error('network'))) as any;
      const comp = createQuiz(sampleQuestions);
      await comp.submitAttempt();
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreError', 'error');
    });
  });

  describe('remediate()', () => {
    const summaryGen = { id: 'gen-remed-1', type: 'summary', data: {} };
    const quizGen = { id: 'gen-review-1', type: 'quiz', data: [] };

    // Mock fetch qui répond selon la cible (fiche de rappel vs quiz-review).
    function mockRemediationFetch(
      summaryRes: { ok: boolean; gen?: any } | 'reject',
      quizRes: { ok: boolean; gen?: any } | 'reject',
    ) {
      global.fetch = vi.fn((url: string) => {
        const target = url.includes('remediation-summary') ? summaryRes : quizRes;
        if (target === 'reject') return Promise.reject(new Error('network'));
        return Promise.resolve({
          ok: target.ok,
          status: target.ok ? 200 : 500,
          json: () => Promise.resolve(target.gen),
        });
      }) as any;
    }

    beforeEach(() => {
      vi.mocked(registerGeneration).mockClear();
    });

    it('appelle les deux routes en parallele avec les questions faibles, lang et ageGroup', async () => {
      mockRemediationFetch({ ok: true, gen: summaryGen }, { ok: true, gen: quizGen });
      const comp = createQuiz(sampleQuestions);
      comp.currentProfile = { id: 'p1', ageGroup: 'ado', useModeration: false };
      // q0 correct (ci=1), q1 incorrect (ci=0)
      comp.answers = { 0: 1, 1: 0 };
      await comp.remediate();

      // lang (langue de l'interface) et ageGroup (profil courant) : obligatoires sur tout appel IA.
      const expectedInit = expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          generationId: 'gen-quiz-1',
          weakQuestions: [sampleQuestions[1]],
          lang: 'fr',
          ageGroup: 'ado',
        }),
      });
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/projects/proj-1/generate/remediation-summary',
        expectedInit,
      );
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/projects/proj-1/generate/quiz-review',
        expectedInit,
      );
    });

    it('enregistre les deux generations via registerGeneration + toast succes', async () => {
      mockRemediationFetch({ ok: true, gen: summaryGen }, { ok: true, gen: quizGen });
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 };
      await comp.remediate();

      expect(registerGeneration).toHaveBeenCalledWith(comp, summaryGen);
      expect(registerGeneration).toHaveBeenCalledWith(comp, quizGen);
      expect(comp.showToast).toHaveBeenCalledWith('toast.remediationGenerated', 'success');
    });

    it('succes partiel : fiche en echec → quiz quand meme enregistre', async () => {
      mockRemediationFetch({ ok: false }, { ok: true, gen: quizGen });
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 };
      await comp.remediate();

      expect(registerGeneration).toHaveBeenCalledTimes(1);
      expect(registerGeneration).toHaveBeenCalledWith(comp, quizGen);
      expect(comp.showToast).toHaveBeenCalledWith(
        'toast.remediationSummaryError',
        'error',
        expect.any(Function),
      );
      expect(comp.showToast).not.toHaveBeenCalledWith('toast.remediationGenerated', 'success');
      expect(comp.reviewing).toBe(false);
    });

    it('succes partiel : rejet reseau du quiz → fiche quand meme enregistree', async () => {
      mockRemediationFetch({ ok: true, gen: summaryGen }, 'reject');
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 };
      await comp.remediate();

      expect(registerGeneration).toHaveBeenCalledTimes(1);
      expect(registerGeneration).toHaveBeenCalledWith(comp, summaryGen);
      expect(comp.showToast).toHaveBeenCalledWith(
        'toast.remediationQuizError',
        'error',
        expect.any(Function),
      );
      expect(comp.reviewing).toBe(false);
    });

    it('double echec : deux toasts erreur, aucun enregistrement', async () => {
      mockRemediationFetch('reject', { ok: false });
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 };
      await comp.remediate();

      expect(registerGeneration).not.toHaveBeenCalled();
      expect(comp.showToast).toHaveBeenCalledWith(
        'toast.remediationSummaryError',
        'error',
        expect.any(Function),
      );
      expect(comp.showToast).toHaveBeenCalledWith(
        'toast.remediationQuizError',
        'error',
        expect.any(Function),
      );
      expect(comp.reviewing).toBe(false);
    });

    it('réessai ciblé (toast fiche) : régénère UNIQUEMENT la fiche, pas le quiz', async () => {
      mockRemediationFetch({ ok: false }, { ok: true, gen: quizGen });
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 };
      await comp.remediate();

      const retryFn = (comp.showToast as any).mock.calls.find(
        (c: any[]) => c[0] === 'toast.remediationSummaryError',
      )?.[2] as () => void;
      expect(typeof retryFn).toBe('function');

      vi.mocked(registerGeneration).mockClear();
      mockRemediationFetch({ ok: true, gen: summaryGen }, { ok: false });
      retryFn();
      await vi.waitFor(() => expect(registerGeneration).toHaveBeenCalledWith(comp, summaryGen));

      const urls: string[] = (global.fetch as any).mock.calls.map((c: any[]) => c[0] as string);
      expect(urls.some((u) => u.includes('remediation-summary'))).toBe(true);
      expect(urls.some((u) => u.includes('quiz-review'))).toBe(false);
    });

    it('réessai qui échoue re-propose un réessai (chaîne), sans enregistrement', async () => {
      mockRemediationFetch({ ok: true, gen: summaryGen }, 'reject');
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 };
      await comp.remediate();

      const retryFn = (comp.showToast as any).mock.calls.find(
        (c: any[]) => c[0] === 'toast.remediationQuizError',
      )?.[2] as () => void;
      vi.mocked(registerGeneration).mockClear();
      (comp.showToast as any).mockClear();
      mockRemediationFetch({ ok: false }, 'reject');
      retryFn();
      await vi.waitFor(() =>
        expect(comp.showToast).toHaveBeenCalledWith(
          'toast.remediationQuizError',
          'error',
          expect.any(Function),
        ),
      );
      expect(registerGeneration).not.toHaveBeenCalled();
    });

    // Pré-contrôle sur les sources du quiz d'origine (celles que le serveur garde), profil modéré.
    describe('pré-contrôle de modération (sources du quiz)', () => {
      const moderated = { id: 'p1', ageGroup: 'enfant', useModeration: true };

      it('source signalée du quiz : toast moderation.blocked, aucun appel', async () => {
        mockRemediationFetch({ ok: true, gen: summaryGen }, { ok: true, gen: quizGen });
        const comp = createQuiz(sampleQuestions, { sourceIds: ['s-quiz'] });
        comp.currentProfile = moderated;
        comp.sources = [
          { id: 's-quiz', moderation: { status: 'unsafe' } },
          { id: 's-other', moderation: { status: 'safe' } },
        ];
        comp.answers = { 0: 0 };

        await comp.remediate();

        expect(comp.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
        expect(global.fetch).not.toHaveBeenCalled();
        expect(comp.reviewing).toBe(false);
      });

      it('source signalée hors du quiz : les deux appels partent', async () => {
        mockRemediationFetch({ ok: true, gen: summaryGen }, { ok: true, gen: quizGen });
        const comp = createQuiz(sampleQuestions, { sourceIds: ['s-quiz'] });
        comp.currentProfile = moderated;
        comp.sources = [
          { id: 's-quiz', moderation: { status: 'safe' } },
          { id: 's-other', moderation: { status: 'unsafe' } },
        ];
        comp.selectedIds = ['s-other'];
        comp.answers = { 0: 0 };

        await comp.remediate();

        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(comp.showToast).toHaveBeenCalledWith('toast.remediationGenerated', 'success');
      });

      it('quiz ancien sans sourceIds : toutes les sources, comme le serveur', async () => {
        mockRemediationFetch({ ok: true, gen: summaryGen }, { ok: true, gen: quizGen });
        const comp = createQuiz(sampleQuestions);
        comp.currentProfile = moderated;
        comp.sources = [{ id: 's-any', moderation: { status: 'pending' } }];
        comp.answers = { 0: 0 };

        await comp.remediate();

        expect(comp.showToast).toHaveBeenCalledWith('moderation.pending', 'error');
        expect(global.fetch).not.toHaveBeenCalled();
      });

      it('profil non modéré : pas de pré-contrôle, le serveur tranche', async () => {
        mockRemediationFetch({ ok: true, gen: summaryGen }, { ok: true, gen: quizGen });
        const comp = createQuiz(sampleQuestions, { sourceIds: ['s-quiz'] });
        comp.currentProfile = { ...moderated, useModeration: false };
        comp.sources = [{ id: 's-quiz', moderation: { status: 'unsafe' } }];
        comp.answers = { 0: 0 };

        await comp.remediate();

        expect(global.fetch).toHaveBeenCalledTimes(2);
      });
    });

    // Refus du serveur (état local périmé) : réessayer donnerait le même refus.
    describe('refus moderation.blocked du serveur', () => {
      function mockBlockedFetch() {
        global.fetch = vi.fn(() =>
          Promise.resolve({
            ok: false,
            status: 400,
            json: () => Promise.resolve({ error: 'moderation.blocked' }),
          }),
        ) as any;
      }

      it('un seul toast moderation.blocked, sans bouton Réessayer', async () => {
        mockBlockedFetch();
        const comp = createQuiz(sampleQuestions);
        comp.answers = { 0: 0 };

        await comp.remediate();

        const toasts = (comp.showToast as any).mock.calls;
        expect(toasts).toEqual([['moderation.blocked', 'error']]);
        expect(registerGeneration).not.toHaveBeenCalled();
        expect(comp.reviewing).toBe(false);
      });

      it('fiche refusée, quiz en panne : refus sans réessai, quiz avec réessai', async () => {
        global.fetch = vi.fn((url: string) =>
          Promise.resolve(
            url.includes('remediation-summary')
              ? {
                  ok: false,
                  status: 400,
                  json: () => Promise.resolve({ error: 'moderation.blocked' }),
                }
              : {
                  ok: false,
                  status: 503,
                  json: () => Promise.resolve({ error: 'upstream_unavailable' }),
                },
          ),
        ) as any;
        const comp = createQuiz(sampleQuestions);
        comp.answers = { 0: 0 };

        await comp.remediate();

        expect(comp.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
        expect(comp.showToast).not.toHaveBeenCalledWith(
          'toast.remediationSummaryError',
          'error',
          expect.any(Function),
        );
        expect(comp.showToast).toHaveBeenCalledWith(
          'toast.remediationQuizError',
          'error',
          expect.any(Function),
        );
      });

      it('réessai ciblé refusé par la modération : toast sans nouveau réessai', async () => {
        mockRemediationFetch({ ok: false }, { ok: true, gen: quizGen });
        const comp = createQuiz(sampleQuestions);
        comp.answers = { 0: 0 };
        await comp.remediate();
        const retryFn = (comp.showToast as any).mock.calls.find(
          (c: any[]) => c[0] === 'toast.remediationSummaryError',
        )?.[2] as () => void;
        (comp.showToast as any).mockClear();

        mockBlockedFetch();
        retryFn();
        await vi.waitFor(() =>
          expect(comp.showToast).toHaveBeenCalledWith('moderation.blocked', 'error'),
        );
        expect((comp.showToast as any).mock.calls).toEqual([['moderation.blocked', 'error']]);
      });
    });

    it('ne fait rien si tout est correct', async () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 1, 1: 2, 2: 1 }; // all correct
      await comp.remediate();
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('reviewing passe a true puis false', async () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 };

      const resolvers: Array<(v: any) => void> = [];
      global.fetch = vi.fn(
        () =>
          new Promise((resolve) => {
            resolvers.push(resolve);
          }),
      ) as any;

      const promise = comp.remediate();
      expect(comp.reviewing).toBe(true);

      for (const resolve of resolvers) {
        resolve({ ok: true, json: () => Promise.resolve({ id: 'r1' }) });
      }
      await promise;
      expect(comp.reviewing).toBe(false);
    });
  });

  describe('onFinish()', () => {
    it('appelle submitAttempt', () => {
      const comp = createQuiz(sampleQuestions);
      comp.submitAttempt = vi.fn();
      comp.onFinish();
      expect(comp.submitAttempt).toHaveBeenCalledOnce();
    });
  });

  describe('isCurrentAnswered()', () => {
    it('returns false when unanswered', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.isCurrentAnswered()).toBe(false);
    });

    it('returns true when answered', () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers[0] = 1;
      expect(comp.isCurrentAnswered()).toBe(true);
    });
  });

  describe('selectChoice() reviewing guard', () => {
    it('does not select when reviewing', () => {
      const comp = createQuiz(sampleQuestions);
      comp.highWaterMark = 1;
      comp.currentQ = 0;
      comp.selectChoice(2);
      expect(comp.selectedChoice).toBeNull();
    });
  });

  describe('restoreState()', () => {
    it('restores answered question state', () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers[0] = 1;
      comp.restoreState();
      expect(comp.selectedChoice).toBe(1);
      expect(comp.feedback).toEqual({ correct: true });
    });

    it('resets to unanswered state', () => {
      const comp = createQuiz(sampleQuestions);
      comp.selectedChoice = 2;
      comp.feedback = { correct: false };
      comp.restoreState();
      expect(comp.selectedChoice).toBeNull();
      expect(comp.feedback).toBeNull();
    });
  });

  describe('onPrevReady()', () => {
    it('restores state for answered question', () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers[0] = 0;
      comp.onPrevReady();
      expect(comp.selectedChoice).toBe(0);
      expect(comp.feedback).toEqual({ correct: false });
    });
  });
});
