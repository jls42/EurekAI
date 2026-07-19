# Product

## Register

product

## Platform

web

## Users

EurekAI a été construit à l'origine pour Zoé, 9 ans, la fille de l'auteur, puis ouvert au monde pour que tout le monde puisse en profiter. Les usages couvrent un spectre large : l'enfant qui révise en autonomie (il photographie sa leçon et enchaîne fiche → quiz seul), le parent qui importe les sources et configure les profils, l'ado autonome, et jusqu'à l'adulte qui apprend pour lui-même. L'app formalise ce spectre en 4 groupes d'âge (enfant ≤10, ado 11-15, étudiant 16-25, adulte 26+) avec profils multiples, contrôle parental (PIN, modération) et adaptation du contenu généré à l'âge. Contexte d'usage typique : à la maison, souvent sur tablette, en préparation d'un contrôle. L'UI existe en 9 langues (dont l'arabe en RTL) — le public n'est pas seulement francophone.

## Product Purpose

Transformer n'importe quel support de cours — photo de leçon, texte libre, note vocale, page web — en expérience de révision interactive complète : fiche de révision, flashcards, quiz, textes à trous, dictée, podcast à 2 voix, quiz vocal, illustration, plus un tuteur IA conversationnel. Propulsé exclusivement par Mistral AI (OCR, chat, STT, TTS Voxtral), avec transparence des coûts et clé API maîtrisée par l'utilisateur. Le succès se mesure sur quatre axes confirmés : réviser devient un plaisir (l'enfant demande l'app au lieu de la subir), l'enfant gagne en autonomie (cycle photo → fiche → quiz sans adulte), la rétention s'améliore réellement (remédiation, quiz adaptatifs), et la charge parentale diminue (l'app fait réciter à la place du parent).

## Positioning

Transforme une simple photo de leçon en kit de révision complet — fiche, flashcards, quiz, dictée, podcast. L'entrée multi-format (photo, texte, voix, web) vers la sortie multi-format est LE différenciateur que chaque écran doit renforcer : peu d'étapes entre « j'ai une leçon » et « je révise en jouant ».

## Brand Personality

Ludique, magique, encourageant. Le ton tutoie, célèbre les réussites (« Parfait ! Zéro faute ! ») et présente l'IA comme une baguette magique (« Auto — C'est magique ! ») — jamais comme de la technologie. Zéro culpabilisation : l'erreur est une étape de la révision, pas une faute. Direction d'identité confirmée : émancipation progressive de la palette actuelle empruntée à Duolingo vers une identité propriétaire dérivée du logo EurekAI (ampoule-éclair : bleu électrique → violet, étincelle jaune-or), en gardant l'esprit vif et joyeux.

## Anti-references

- **Scolaire austère** : le manuel numérique ou LMS gris type Pronote/Moodle — formulaires ternes, tableaux administratifs, ton institutionnel.
- **Gamification agressive** : streaks culpabilisants, compteurs anxiogènes, notifications pushy, paywalls — la face sombre de Duolingo. On garde le jeu, on refuse la pression.
- **SaaS froid corporate** : dashboard B2B navy/indigo, jargon technique, densité de metrics — l'univers du social-preview actuel ne doit pas contaminer l'app.
- **Enfantin brouillon** : surcharge décorative, mascotte criarde, Comic Sans — le « site pour enfants » qui infantilise et vieillit mal.

## Design Principles

1. **L'enfant d'abord, le parent en arrière-plan.** Chaque écran doit d'abord parler à l'enfant ; les concepts d'adulte (coûts €, confiance OCR, clé API, choix de modèles) restent accessibles mais ne dominent jamais la hiérarchie visuelle.
2. **La magie sans le jargon.** La complexité technique (OCR, TTS, variables d'environnement, noms de modèles) disparaît derrière un langage simple ; un message que l'enfant peut lire ne mentionne jamais `MISTRAL_API_KEY` ni « la console ».
3. **Encourager, jamais culpabiliser.** Le feedback célèbre le progrès et transforme l'erreur en prochain pas (remédiation) ; aucun pattern de pression ou de honte.
4. **Une identité à soi.** Les évolutions visuelles rapprochent l'app de l'univers du logo (bleu électrique → violet, étincelle) et l'éloignent du décalque Duolingo — sans casser la familiarité ludique.
5. **Accessible par défaut.** Le confort de lecture, les 9 langues, le RTL et les cibles tactiles sont des contraintes de conception dès le premier jet, pas des options ajoutées après coup.

## Accessibility & Inclusion

Cible formelle : **WCAG 2.1 AA** sur toute l'app. Acquis réels à préserver : police Luciole (malvoyants) et mode « confort de lecture » par profil, `prefers-reduced-motion` respecté, skip-link, cibles tactiles 44px, anti-flash de thème, RTL arabe. Chantiers connus vers AA : contrastes limites (`#777777` sur blanc ≈ 4,48:1, blanc sur `#1cb0f6`/`#58cc02` en échec sur aplats), tooltips hover-only inaccessibles au clavier et au tactile (popover de coût), activation clavier incomplète sur certaines cartes. Public lecteur débutant : phrases courtes, vocabulaire simple, feedback lisible seul dès 9 ans.
