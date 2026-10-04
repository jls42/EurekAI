import type { AppContext } from './app-context';

export function createNavigation() {
  return {
    goToView(this: AppContext, view: string) {
      if (view === 'chat' && !this.currentProfile?.chatEnabled) return;
      const prefersReducedMotion = globalThis.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (document.startViewTransition && !prefersReducedMotion) {
        const transition = document.startViewTransition(() => {
          this.activeView = view;
          void this.$nextTick(() => this.refreshIcons());
        });
        // Transition sautée (onglet masqué, autre transition en cours) : `ready` est rejetée alors
        // que la vue a déjà changé. Non gérée, l'erreur remontait en « Unhandled rejection ».
        transition.ready.catch(() => {
          // Rien à faire : la mise à jour de la vue a eu lieu, seule l'animation est perdue.
        });
      } else {
        this.activeView = view;
        void this.$nextTick(() => this.refreshIcons());
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
      void this.$nextTick(() => this.refreshIcons());
    },
  };
}
