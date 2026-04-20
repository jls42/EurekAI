import type { AppContext } from './app-context';

export function createNavigation() {
  return {
    goToView(this: AppContext, view: string) {
      if (view === 'chat' && !this.currentProfile?.chatEnabled) return;
      const prefersReducedMotion = globalThis.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (document.startViewTransition && !prefersReducedMotion) {
        document.startViewTransition(() => {
          this.activeView = view;
          this.$nextTick(() => this.refreshIcons());
        });
      } else {
        this.activeView = view;
        this.$nextTick(() => this.refreshIcons());
      }
      window.scrollTo(0, 0);
    },

    checkMobile(this: AppContext) {
      this.isMobile = window.innerWidth < 1024;
    },

    toggleTheme(this: AppContext) {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = this.theme;
      localStorage.setItem('sf-theme', this.theme);
      this.$nextTick(() => this.refreshIcons());
    },
  };
}
