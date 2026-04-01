import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock localStorage and matchMedia before importing state
const mockStorage: Record<string, string> = {};
vi.stubGlobal(
  'localStorage',
  Object.assign(Object.create(null), {
    getItem: (key: string) => mockStorage[key] ?? null,
    setItem: (key: string, value: string) => {
      mockStorage[key] = value;
    },
    removeItem: (key: string) => {
      delete mockStorage[key];
    },
  }),
);

let prefersDark = false;
vi.stubGlobal('matchMedia', (query: string) => ({
  matches: query.includes('dark') ? prefersDark : false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

import { createState } from './state.js';

describe('createState', () => {
  beforeEach(() => {
    for (const key of Object.keys(mockStorage)) delete mockStorage[key];
    prefersDark = false;
  });

  it('returns an object with all expected top-level properties', () => {
    const state = createState();
    // Profile state
    expect(state.profiles).toEqual([]);
    expect(state.currentProfile).toBeNull();
    expect(state.showProfilePicker).toBe(false);
    expect(state.showProfileForm).toBe(false);
    expect(state.editingProfile).toBeNull();
    expect(state.newProfileName).toBe('');
    expect(state.newProfileAge).toBe('');
    expect(state.newProfileAvatar).toBe('0');
    expect(state.newProfileLocale).toBe('fr');

    // Project state
    expect(state.projects).toEqual([]);
    expect(state.currentProjectId).toBeNull();
    expect(state.currentProject).toBeNull();
    expect(state.newProjectName).toBe('');
    expect(state.showNewProject).toBe(false);

    // Source state
    expect(state.sources).toEqual([]);
    expect(state.selectedIds).toEqual([]);
    expect(state.uploading).toBe(false);
    expect(state.dragging).toBe(false);
    expect(state.viewSource).toBeNull();
    expect(state.textInput).toBe('');
    expect(state.webQuery).toBe('');
    expect(state.showTextInput).toBe(false);
    expect(state.showWebInput).toBe(false);

    // Voice recording
    expect(state.recording).toBe(false);
    expect(state.recorder).toBeNull();
    expect(state.recordingDuration).toBe(0);
    expect(state.recordingTimer).toBeNull();

    // Consigne
    expect(state.consigne).toBeNull();
    expect(state.consigneLoading).toBe(false);
    expect(state.useConsigne).toBe(true);

    // Generation state
    expect(state.generateCount).toBe(10);
    expect(state.countOptions).toEqual([10, 20, 30, 42, 50]);
    expect(state.generations).toEqual([]);
    expect(state.openGens).toEqual({});
    expect(state.editingTitle).toBeNull();
    expect(state.editTitleValue).toBe('');

    // Navigation & layout
    expect(state.sidebarOpen).toBe(false);
    expect(state.sidebarCollapsed).toBe(false);
    expect(state.mobileTab).toBe('magic');
    expect(state.isMobile).toBe(false);
    expect(state.activeView).toBe('dashboard');

    // Chat
    expect(state.chatMessages).toEqual([]);
    expect(state.chatInput).toBe('');
    expect(state.chatLoading).toBe(false);

    // Settings
    expect(state.showSettings).toBe(false);
    expect(state.apiStatus).toEqual({ mistral: false, elevenlabs: false, ttsAvailable: false, modelLimits: {} });
    expect(state.mistralVoicesList).toEqual([]);

    // Lightbox
    expect(state.lightboxUrl).toBe('');

    // Toasts
    expect(state.toasts).toEqual([]);
    expect(state.toastCounter).toBe(0);

    // Confirm dialog
    expect(state.confirmCallback).toBeNull();
    expect(state.confirmTarget).toBe('');
    expect(state.confirmTrigger).toBeNull();

    // PIN dialog
    expect(state.newProfilePin).toBe('');
    expect(state.newProfilePinConfirm).toBe('');
    expect(state.pinVerifyInput).toBe('');
    expect(state.pinVerifyCallback).toBeNull();
    expect(state.showPinDialog).toBe(false);
  });

  it('loading flags are all false', () => {
    const state = createState();
    for (const [key, val] of Object.entries(state.loading)) {
      expect(val, `loading.${key} should be false`).toBe(false);
    }
  });

  it('loading has all expected keys', () => {
    const state = createState();
    const expectedKeys = [
      'summary',
      'flashcards',
      'quiz',
      'podcast',
      'quiz-vocal',
      'image',
      'fill-blank',
      'auto',
      'all',
      'voice',
      'websearch',
    ];
    for (const key of expectedKeys) {
      expect(state.loading).toHaveProperty(key);
    }
  });

  it('categories includes all expected generation types', () => {
    const state = createState();
    const keys = state.categories.map((c: any) => c.key);
    expect(keys).toContain('dashboard');
    expect(keys).toContain('sources');
    expect(keys).toContain('chat');
    expect(keys).toContain('summary');
    expect(keys).toContain('flashcards');
    expect(keys).toContain('quiz');
    expect(keys).toContain('quiz-vocal');
    expect(keys).toContain('podcast');
    expect(keys).toContain('fill-blank');
    expect(keys).toContain('image');
  });

  it('categories has 10 items', () => {
    const state = createState();
    expect(state.categories).toHaveLength(10);
  });

  it('each category has key, labelKey, icon, and color', () => {
    const state = createState();
    for (const cat of state.categories) {
      expect(cat).toHaveProperty('key');
      expect(cat).toHaveProperty('labelKey');
      expect(cat).toHaveProperty('icon');
      expect(cat).toHaveProperty('color');
      expect(typeof cat.key).toBe('string');
      expect(typeof cat.labelKey).toBe('string');
      expect(typeof cat.icon).toBe('string');
      expect(typeof cat.color).toBe('string');
    }
  });

  it('profileAvatars has 20 items (0 through 19)', () => {
    const state = createState();
    expect(state.profileAvatars).toHaveLength(20);
    expect(state.profileAvatars[0]).toBe('0');
    expect(state.profileAvatars[19]).toBe('19');
  });

  it('theme defaults to light when localStorage is empty and prefers-color-scheme is light', () => {
    prefersDark = false;
    const state = createState();
    expect(state.theme).toBe('light');
  });

  it('theme defaults to dark when localStorage is empty and prefers-color-scheme is dark', () => {
    prefersDark = true;
    const state = createState();
    expect(state.theme).toBe('dark');
  });

  it('theme reads from localStorage when set', () => {
    mockStorage['sf-theme'] = 'dark';
    const state = createState();
    expect(state.theme).toBe('dark');
  });

  it('theme reads light from localStorage even when system prefers dark', () => {
    prefersDark = true;
    mockStorage['sf-theme'] = 'light';
    const state = createState();
    expect(state.theme).toBe('light');
  });

  it('uploadProgress has correct default shape', () => {
    const state = createState();
    expect(state.uploadProgress).toEqual({ current: 0, total: 0, filename: '' });
  });

  it('viewSourceZoom defaults to 1 and viewSourceRotation to 0', () => {
    const state = createState();
    expect(state.viewSourceZoom).toBe(1);
    expect(state.viewSourceRotation).toBe(0);
  });

  it('configDraft has correct default structure', () => {
    const state = createState();
    expect(state.configDraft.ttsProvider).toBe('mistral');
    expect(state.configDraft.models).toEqual({
      summary: '',
      flashcards: '',
      quiz: '',
      podcast: '',
      translate: '',
      ocr: '',
    });
    expect(state.configDraft.voices).toEqual({
      host: { id: '', name: '' },
      guest: { id: '', name: '' },
    });
    expect(state.configDraft.mistralVoices).toEqual({ host: 'Oliver', guest: 'Marie' });
  });

  it('abortControllers defaults to empty object', () => {
    const state = createState();
    expect(state.abortControllers).toEqual({});
  });

  it('each call returns a fresh independent object', () => {
    const s1 = createState();
    const s2 = createState();
    s1.profiles.push({ id: 'test' });
    expect(s2.profiles).toEqual([]);
    s1.loading.summary = true;
    expect(s2.loading.summary).toBe(false);
  });
});
