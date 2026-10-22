/**
 * Son et changement de vue. Les vues sont en `x-show`, jamais retirées du DOM : un `<audio>` qui
 * joue continue dans une vue cachée, sans contrôle visible pour l'arrêter (vécu au release-test du
 * 2026-10-22 : la lecture à voix haute d'une fiche continuait sur la vue Flashcards ; défaut présent
 * depuis l'origine). À chaque changement de `activeView`, quel que soit son auteur (goToView,
 * selectProject, deleteProject), tout son qui joue est mis en pause, position gardée : au retour, le
 * lecteur reprend là où il s'était arrêté. VIEW_CHANGE_EVENT part ensuite sur `globalThis` : un
 * composant qui programme une relecture différée l'écoute et l'annule (dictée : `stopWord`).
 * Module sans dépendance, testable sans DOM.
 */

/** Émis après la mise en pause ; nom en minuscules, comme l'exige un attribut HTML `@….window`. */
export const VIEW_CHANGE_EVENT = 'eurekai-view-change';

type MediaRoot = Pick<Document, 'querySelectorAll'>;
type ViewEvents = Pick<EventTarget, 'dispatchEvent'>;
type ViewWatcher = { $watch: (property: string, callback: () => void) => void };

export const pauseMediaOnViewChange = (
  root: MediaRoot = document,
  events: ViewEvents = globalThis,
): void => {
  for (const media of Array.from(root.querySelectorAll<HTMLMediaElement>('audio, video'))) {
    if (!media.paused) media.pause();
  }
  events.dispatchEvent(new CustomEvent(VIEW_CHANGE_EVENT));
};

/** Posé une fois dans `init()` : observe `activeView`, donc tous ses écrivains. */
export const watchViewMedia = (ctx: ViewWatcher): void => {
  ctx.$watch('activeView', () => pauseMediaOnViewChange());
};
