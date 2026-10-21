import type { AppContext } from './app-context';
import type { Generation } from '../../types';

export function createGenerations() {
  return {
    // Lecture à voix haute des flashcards à jouer : celle que cet onglet vient de produire
    // (`_audioUrl_all`, posée par applyVoiceResult), sinon celle enregistrée dans la génération
    // (`audioUrl`, relue avec le projet) — jouée telle quelle, sans nouvel appel facturé. Lue à
    // chaque rendu, jamais recopiée à l'affichage : une génération remplacée par sa version du
    // serveur (réconciliation) garde son audio.
    flashcardsAudioUrl(gen: Generation): string | undefined {
      const fresh = (gen as { _audioUrl_all?: unknown })._audioUrl_all;
      if (typeof fresh === 'string' && fresh) return fresh;
      return gen.type === 'flashcards' ? gen.audioUrl : undefined;
    },

    startEditTitle(this: AppContext, gen: Generation) {
      this.editingTitle = gen.id;
      this.editTitleValue = gen.title;
      void this.$nextTick(() => {
        const input = document.querySelector('input[x-ref="titleInput"]') as HTMLInputElement;
        if (input) input.focus();
      });
    },

    async saveTitle(this: AppContext, gen: Generation) {
      const title = this.editTitleValue.trim();
      this.editingTitle = null;
      if (!title || title === gen.title) return;
      gen.title = title;
      await fetch(this.apiBase() + '/generations/' + gen.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
    },

    async deleteGen(this: AppContext, gen: Generation) {
      await fetch(this.apiBase() + '/generations/' + gen.id, { method: 'DELETE' });
      this.generations = this.generations.filter((g) => g.id !== gen.id);
      this.showToast(this.t('toast.genDeleted'), 'info');
    },
  };
}
