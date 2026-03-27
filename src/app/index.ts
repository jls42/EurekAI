import { createState } from './state';
import { createI18n } from './i18n';
import { createHelpers } from './helpers';
import { createNavigation } from './navigation';
import { createToast } from './toast';
import { createConfirm } from './confirm';
import { createProfiles } from './profiles';
import { createProjects } from './projects';
import { createConfig } from './config';
import { createSources } from './sources';
import { createRecorder } from './recorder';
import { createWebsearch } from './websearch';
import { createConsigne } from './consigne';
import { createGenerate } from './generate';
import { createGenerations } from './generations';
import { createChat } from './chat';
import { createRender } from './render';

export function app() {
  return {
    ...createState(),
    ...createI18n(),
    ...createHelpers(),
    ...createNavigation(),
    ...createToast(),
    ...createConfirm(),
    ...createProfiles(),
    ...createProjects(),
    ...createConfig(),
    ...createSources(),
    ...createRecorder(),
    ...createWebsearch(),
    ...createConsigne(),
    ...createGenerate(),
    ...createGenerations(),
    ...createChat(),
    ...createRender(),

    async init(this: any) {
      document.documentElement.dataset.theme = this.theme;

      this.checkMobile();
      let resizeTimeout: ReturnType<typeof setTimeout>;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => this.checkMobile(), 150);
      });

      document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const badge = target.closest('[data-source-id]');
        if (!badge) return;
        const id = (badge as HTMLElement).dataset.sourceId;
        if (!id) return;
        const src = this.sources.find((source: any) => source.id === id);
        if (src) this.openSourceDialog(src);
      });

      await this.loadProfiles();
      await this.loadConfig();

      this.$nextTick(() => this.refreshIcons());
    },
  };
}
