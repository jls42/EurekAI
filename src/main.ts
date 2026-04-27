import Alpine from 'alpinejs';
import { createIcons, icons } from 'lucide';
import './styles/main.css';
import { registerLocale } from './i18n/index';
import { fr } from './i18n/fr';
import { en } from './i18n/en';
import { es } from './i18n/es';
import { pt } from './i18n/pt';
import { it } from './i18n/it';
import { nl } from './i18n/nl';
import { de } from './i18n/de';
import { hi } from './i18n/hi';
import { ar } from './i18n/ar';
import { app } from './app/index';
import { quizComponent } from './components/quiz';
import { quizVocalComponent } from './components/quiz-vocal';
import { fillBlankComponent } from './components/fill-blank';
import { flashcardsComponent } from './components/flashcards';

// Register i18n locales before Alpine starts
registerLocale('fr', fr);
registerLocale('en', en);
registerLocale('es', es);
registerLocale('pt', pt);
registerLocale('it', it);
registerLocale('nl', nl);
registerLocale('de', de);
registerLocale('hi', hi);
registerLocale('ar', ar);

// Register Alpine.js components
Alpine.data('app', app);
Alpine.data('quizComponent', quizComponent);
Alpine.data('quizVocalComponent', quizVocalComponent);
Alpine.data('fillBlankComponent', fillBlankComponent);
Alpine.data('flashcardsComponent', flashcardsComponent);

Alpine.start();

// Lucide icons auto-refresh after Alpine init
document.addEventListener('alpine:initialized', () => createIcons({ icons }));
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => createIcons({ icons }), 100);
});

// Cross-tab synchronization de la cloche notifications.
// Le 'storage' event ne fire QUE dans les autres tabs (pas dans celui qui a
// écrit), donc combiné avec le bump local sur appendNotification, cela couvre
// les deux cas. Un 5+ tabs ouverts → 4+ events par écriture, charge négligeable.
//
// Guard `typeof globalThis.window` pour ne pas péter en environnement Vitest (Node).
if (typeof globalThis.window !== 'undefined') {
  // _x_dataStack est une API privée Alpine.js — un upgrade peut casser ce
  // chemin silencieusement. Warn une fois par session si la structure
  // attendue est absente, pour surfacer le drift avant le bug "cloche ne
  // bumpe plus en cross-tab".
  let alpineDriftWarned = false;
  globalThis.addEventListener('storage', (e) => {
    if (e.key !== 'sf-profile-notifications') return;
    const root = document.querySelector('[x-data="app()"]') as
      | (HTMLElement & {
          _x_dataStack?: Array<{ notificationsVersion?: number }>;
        })
      | null;
    const stack = root?._x_dataStack?.[0];
    if (stack && typeof stack.notificationsVersion === 'number') {
      stack.notificationsVersion++;
      return;
    }
    if (!alpineDriftWarned) {
      console.warn('[notifications] cross-tab sync unavailable', {
        root: !!root,
        stack: !!stack,
        hasField: typeof stack?.notificationsVersion === 'number',
      });
      alpineDriftWarned = true;
    }
  });
}
