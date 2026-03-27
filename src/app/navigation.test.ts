import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createNavigation } from './navigation';

// Mock globalThis.matchMedia
const mockMatchMedia = vi.fn(() => ({ matches: false }));
(globalThis as any).matchMedia = mockMatchMedia;

// Mock document
const mockDataset: Record<string, string> = {};
(globalThis as any).document = {
  documentElement: { dataset: mockDataset },
  startViewTransition: undefined as any,
};

// Mock window
(globalThis as any).window = {
  innerWidth: 1280,
  scrollTo: vi.fn(),
};

// Mock localStorage
(globalThis as any).localStorage = {
  setItem: vi.fn(),
  getItem: vi.fn(),
};

function makeContext(overrides: any = {}) {
  return {
    activeView: 'sources',
    isMobile: false,
    theme: 'dark',
    currentProfile: { id: 'p1', chatEnabled: true, ageGroup: 'enfant' },
    refreshIcons: vi.fn(),
    $nextTick: vi.fn((cb: () => void) => cb()),
    ...overrides,
  };
}

describe('createNavigation', () => {
  let nav: ReturnType<typeof createNavigation>;
  let ctx: ReturnType<typeof makeContext>;

  beforeEach(() => {
    nav = createNavigation();
    ctx = makeContext();
    mockMatchMedia.mockReturnValue({ matches: false });
    (globalThis as any).document.startViewTransition = undefined;
    vi.mocked((globalThis as any).window.scrollTo).mockClear();
    vi.mocked((globalThis as any).localStorage.setItem).mockClear();
  });

  describe('goToView', () => {
    it('sets activeView to the given view', () => {
      nav.goToView.call(ctx, 'generations');
      expect(ctx.activeView).toBe('generations');
    });

    it('blocks chat if not enabled', () => {
      ctx.currentProfile.chatEnabled = false;
      nav.goToView.call(ctx, 'chat');
      expect(ctx.activeView).toBe('sources'); // unchanged
    });

    it('allows chat if enabled', () => {
      ctx.currentProfile.chatEnabled = true;
      nav.goToView.call(ctx, 'chat');
      expect(ctx.activeView).toBe('chat');
    });

    it('calls refreshIcons after view change', () => {
      nav.goToView.call(ctx, 'generations');
      expect(ctx.refreshIcons).toHaveBeenCalled();
    });

    it('uses startViewTransition if available and no reduced motion', () => {
      const transition = vi.fn((cb: () => void) => cb());
      (globalThis as any).document.startViewTransition = transition;
      mockMatchMedia.mockReturnValue({ matches: false });

      nav.goToView.call(ctx, 'generations');

      expect(transition).toHaveBeenCalled();
      expect(ctx.activeView).toBe('generations');
    });

    it('skips startViewTransition when prefers reduced motion', () => {
      const transition = vi.fn((cb: () => void) => cb());
      (globalThis as any).document.startViewTransition = transition;
      mockMatchMedia.mockReturnValue({ matches: true });

      nav.goToView.call(ctx, 'generations');

      expect(transition).not.toHaveBeenCalled();
      expect(ctx.activeView).toBe('generations');
    });

    it('scrolls to top', () => {
      nav.goToView.call(ctx, 'generations');
      expect((globalThis as any).window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('checkMobile', () => {
    it('sets isMobile to true when width < 1024', () => {
      (globalThis as any).window.innerWidth = 768;
      nav.checkMobile.call(ctx);
      expect(ctx.isMobile).toBe(true);
    });

    it('sets isMobile to false when width >= 1024', () => {
      (globalThis as any).window.innerWidth = 1280;
      nav.checkMobile.call(ctx);
      expect(ctx.isMobile).toBe(false);
    });
  });

  describe('toggleTheme', () => {
    it('toggles from dark to light', () => {
      ctx.theme = 'dark';
      nav.toggleTheme.call(ctx);
      expect(ctx.theme).toBe('light');
      expect(mockDataset.theme).toBe('light');
      expect((globalThis as any).localStorage.setItem).toHaveBeenCalledWith('sf-theme', 'light');
    });

    it('toggles from light to dark', () => {
      ctx.theme = 'light';
      nav.toggleTheme.call(ctx);
      expect(ctx.theme).toBe('dark');
      expect(mockDataset.theme).toBe('dark');
      expect((globalThis as any).localStorage.setItem).toHaveBeenCalledWith('sf-theme', 'dark');
    });

    it('calls refreshIcons after toggle', () => {
      nav.toggleTheme.call(ctx);
      expect(ctx.refreshIcons).toHaveBeenCalled();
    });
  });
});
