import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock localStorage and matchMedia for state.ts
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
vi.stubGlobal('matchMedia', (query: string) => ({
  matches: false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

// Mock modules that access browser APIs or heavy dependencies at import time
vi.mock('../i18n/index', () => ({
  t: vi.fn((k: string) => k),
  setLocale: vi.fn(),
  getLocale: vi.fn(() => 'fr'),
}));

vi.mock('./profile-locale', () => ({
  setProfileLocale: vi.fn(),
  getProfileLocale: vi.fn(() => 'fr'),
  clearProfileLocale: vi.fn(),
}));

vi.mock('./render-utils', () => ({
  escapeHtmlAttribute: vi.fn((s: string) => s),
  escapeMarkdownHtml: vi.fn((s: string) => s),
  sanitizeRenderedHtml: vi.fn((s: string) => s),
}));

vi.mock('marked', () => ({
  marked: { parse: vi.fn((s: string) => s) },
}));

vi.mock('lucide', () => ({
  createIcons: vi.fn(),
  icons: {},
}));

import { app } from './index.js';

describe('app', () => {
  beforeEach(() => {
    for (const key of Object.keys(mockStorage)) delete mockStorage[key];
  });

  it('returns an object', () => {
    const a = app();
    expect(typeof a).toBe('object');
    expect(a).not.toBeNull();
  });

  it('has the init method', () => {
    const a = app();
    expect(typeof a.init).toBe('function');
  });

  it('includes state properties from createState', () => {
    const a = app();
    expect(a.profiles).toEqual([]);
    expect(a.currentProfile).toBeNull();
    expect(a.projects).toEqual([]);
    expect(a.sources).toEqual([]);
    expect(a.activeView).toBe('dashboard');
    expect(Array.isArray(a.categories)).toBe(true);
  });

  it('includes i18n methods from createI18n', () => {
    const a = app();
    expect(typeof a.t).toBe('function');
    expect(typeof a.setLocale).toBe('function');
  });

  it('includes helper methods from createHelpers', () => {
    const a = app();
    expect(typeof a.genIcon).toBe('function');
    expect(typeof a.genColor).toBe('function');
    expect(typeof a.apiBase).toBe('function');
    expect(typeof a.initGenProps).toBe('function');
    expect(typeof a.refreshIcons).toBe('function');
    expect(typeof a.resolveError).toBe('function');
  });

  it('includes navigation methods from createNavigation', () => {
    const a = app();
    expect(typeof a.goToView).toBe('function');
    expect(typeof a.checkMobile).toBe('function');
    expect(typeof a.toggleTheme).toBe('function');
  });

  it('includes toast methods from createToast', () => {
    const a = app();
    expect(typeof a.showToast).toBe('function');
    expect(typeof a.dismissToast).toBe('function');
  });

  it('includes confirm methods from createConfirm', () => {
    const a = app();
    expect(typeof a.confirmDelete).toBe('function');
  });

  it('includes profile methods from createProfiles', () => {
    const a = app();
    expect(typeof a.loadProfiles).toBe('function');
    expect(typeof a.selectProfile).toBe('function');
    expect(typeof a.createProfile).toBe('function');
    expect(typeof a.deleteProfile).toBe('function');
    expect(typeof a.updateProfile).toBe('function');
    expect(typeof a.startEditProfile).toBe('function');
    expect(typeof a.saveEditProfile).toBe('function');
    expect(typeof a.openProfilePicker).toBe('function');
    expect(typeof a.requirePin).toBe('function');
    expect(typeof a.submitPinVerify).toBe('function');
    expect(typeof a.closePinDialog).toBe('function');
  });

  it('includes project methods from createProjects', () => {
    const a = app();
    expect(typeof a.loadProjects).toBe('function');
    expect(typeof a.createProject).toBe('function');
    expect(typeof a.selectProject).toBe('function');
    expect(typeof a.deleteProject).toBe('function');
    expect(typeof a.resetState).toBe('function');
  });

  it('includes config methods from createConfig', () => {
    const a = app();
    expect(typeof a.loadConfig).toBe('function');
    expect(typeof a.saveSettings).toBe('function');
    expect(typeof a.resetSettings).toBe('function');
  });

  it('includes source methods from createSources', () => {
    const a = app();
    expect(typeof a.handleDrop).toBe('function');
    expect(typeof a.handleFiles).toBe('function');
    expect(typeof a.addText).toBe('function');
    expect(typeof a.deleteSource).toBe('function');
  });

  it('includes recorder methods from createRecorder', () => {
    const a = app();
    expect(typeof a.toggleRecording).toBe('function');
  });

  it('includes websearch methods from createWebsearch', () => {
    const a = app();
    expect(typeof a.searchWeb).toBe('function');
  });

  it('includes consigne methods from createConsigne', () => {
    const a = app();
    expect(typeof a.refreshConsigne).toBe('function');
  });

  it('includes generate methods from createGenerate', () => {
    const a = app();
    expect(typeof a.generate).toBe('function');
    expect(typeof a.generateAll).toBe('function');
    expect(typeof a.generateAuto).toBe('function');
    expect(typeof a.generateVoice).toBe('function');
  });

  it('includes generation CRUD methods from createGenerations', () => {
    const a = app();
    expect(typeof a.startEditTitle).toBe('function');
    expect(typeof a.saveTitle).toBe('function');
  });

  it('includes chat methods from createChat', () => {
    const a = app();
    expect(typeof a.sendChatMessage).toBe('function');
    expect(typeof a.clearChat).toBe('function');
    expect(typeof a.loadChatHistory).toBe('function');
  });

  it('includes render methods from createRender', () => {
    const a = app();
    expect(typeof a.renderMarkdown).toBe('function');
  });

  it('includes moderation and toggle methods from createProfiles', () => {
    const a = app();
    expect(typeof a.toggleModeration).toBe('function');
    expect(typeof a.toggleChat).toBe('function');
  });
});
