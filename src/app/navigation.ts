export function createNavigation() {
  return {
    goToView(this: any, view: string) {
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

    checkMobile(this: any) {
      this.isMobile = window.innerWidth < 1024;
    },

    toggleTheme(this: any) {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = this.theme;
      localStorage.setItem('sf-theme', this.theme);
      this.$nextTick(() => this.refreshIcons());
    },
  };
}
