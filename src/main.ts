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
import { installCrossTabSync } from './app/cross-tab-sync';

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

// Cross-tab synchronization de la cloche notifications. Logique extraite
// dans cross-tab-sync.ts pour permettre les tests unitaires (handler appelé
// avec un Document mocké). Guard pour ne pas péter en environnement Node.
if (globalThis.window !== undefined) {
  installCrossTabSync(globalThis, document);
}
