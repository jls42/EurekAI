import { describe, it, expect, vi, beforeAll } from 'vitest';

// Mock Alpine.js
const mockAlpine = {
  data: vi.fn(),
  start: vi.fn(),
};
vi.mock('alpinejs', () => ({ default: mockAlpine }));

// Mock lucide
const mockCreateIcons = vi.fn();
vi.mock('lucide', () => ({
  createIcons: mockCreateIcons,
  icons: { fakeIcon: {} },
}));

// Mock CSS imports
vi.mock('./styles/main.css', () => ({}));

// Mock i18n
const mockRegisterLocale = vi.fn();
vi.mock('./i18n/index', () => ({
  registerLocale: mockRegisterLocale,
}));
vi.mock('./i18n/fr', () => ({ fr: { hello: 'Bonjour' } }));
vi.mock('./i18n/en', () => ({ en: { hello: 'Hello' } }));

// Mock app and components
const mockApp = vi.fn(() => ({}));
const mockQuiz = vi.fn(() => ({}));
const mockQuizVocal = vi.fn(() => ({}));
const mockFillBlank = vi.fn(() => ({}));
const mockFlashcards = vi.fn(() => ({}));
vi.mock('./app/index', () => ({ app: mockApp }));
vi.mock('./components/quiz', () => ({ quizComponent: mockQuiz }));
vi.mock('./components/quiz-vocal', () => ({ quizVocalComponent: mockQuizVocal }));
vi.mock('./components/fill-blank', () => ({ fillBlankComponent: mockFillBlank }));
vi.mock('./components/flashcards', () => ({ flashcardsComponent: mockFlashcards }));

// Mock document event listeners
const listeners: Record<string, Function[]> = {};
const mockDocument = {
  addEventListener: vi.fn((event: string, handler: any) => {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(handler);
  }),
};
vi.stubGlobal('document', mockDocument);

describe('main.ts', () => {
  beforeAll(async () => {
    await import('./main');
  });

  it('registers i18n locales before Alpine starts', () => {
    expect(mockRegisterLocale).toHaveBeenCalledTimes(2);
    expect(mockRegisterLocale).toHaveBeenCalledWith('fr', { hello: 'Bonjour' });
    expect(mockRegisterLocale).toHaveBeenCalledWith('en', { hello: 'Hello' });
  });

  it('registers all Alpine components', () => {
    expect(mockAlpine.data).toHaveBeenCalledWith('app', mockApp);
    expect(mockAlpine.data).toHaveBeenCalledWith('quizComponent', mockQuiz);
    expect(mockAlpine.data).toHaveBeenCalledWith('quizVocalComponent', mockQuizVocal);
    expect(mockAlpine.data).toHaveBeenCalledWith('fillBlankComponent', mockFillBlank);
    expect(mockAlpine.data).toHaveBeenCalledWith('flashcardsComponent', mockFlashcards);
  });

  it('starts Alpine', () => {
    expect(mockAlpine.start).toHaveBeenCalledOnce();
  });

  it('registers alpine:initialized listener that calls createIcons', () => {
    expect(listeners['alpine:initialized']).toBeDefined();
    expect(listeners['alpine:initialized'].length).toBeGreaterThanOrEqual(1);
    listeners['alpine:initialized'][0]();
    expect(mockCreateIcons).toHaveBeenCalledWith({ icons: { fakeIcon: {} } });
  });

  it('registers DOMContentLoaded listener that calls createIcons after timeout', () => {
    vi.useFakeTimers();
    expect(listeners['DOMContentLoaded']).toBeDefined();
    expect(listeners['DOMContentLoaded'].length).toBeGreaterThanOrEqual(1);

    mockCreateIcons.mockClear();
    listeners['DOMContentLoaded'][0]();

    // createIcons should not have been called yet
    expect(mockCreateIcons).not.toHaveBeenCalled();

    // Advance timers by 100ms
    vi.advanceTimersByTime(100);
    expect(mockCreateIcons).toHaveBeenCalledWith({ icons: { fakeIcon: {} } });

    vi.useRealTimers();
  });
});
