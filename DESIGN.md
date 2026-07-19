---
name: EurekAI
description: L'Étincelle — le système visuel ludique et magique de l'app de révision propulsée par Mistral AI
colors:
  bleu-ciel-electrique: "#1cb0f6"
  bleu-profond: "#0a8ad0"
  bleu-pale: "#d6f0ff"
  violet-magique: "#8549ba"
  violet-profond: "#6b3a96"
  violet-pale: "#e8d5f5"
  jaune-etincelle: "#ffc800"
  jaune-profond: "#e5b400"
  vert-bravo: "#58cc02"
  vert-profond: "#3ea300"
  rouge-tendre: "#ff4b4b"
  rouge-profond: "#cc3333"
  encre-douce: "#3c3c3c"
  gris-recit: "#777777"
  canvas-nuage: "#f6f9ff"
  surface-blanche: "#ffffff"
  nuit-encre: "#0f1a2e"
  surface-nuit: "#182540"
  texte-lune: "#e8edf5"
  gen-summary: "#0077b6"
  gen-flashcards: "#f3722c"
  gen-quiz: "#8549ba"
  gen-podcast: "#2a9d8f"
  gen-quizvocal: "#e76f51"
  gen-image: "#e91e63"
  gen-fillblank: "#43a047"
  gen-dictation: "#0284c7"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Sora, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.026em"
  title:
    fontFamily: "Sora, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.018em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.6
  accessibility:
    fontFamily: "Luciole, Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  button: "1.25rem"
  card: "1.75rem"
  dialog: "1.75rem"
  badge: "999px"
spacing:
  touch: "44px"
components:
  button-primary:
    backgroundColor: "{colors.bleu-ciel-electrique}"
    textColor: "{colors.surface-blanche}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.bleu-profond}"
    textColor: "{colors.surface-blanche}"
    rounded: "{rounded.button}"
  gen-card:
    backgroundColor: "{colors.surface-blanche}"
    textColor: "{colors.encre-douce}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
  category-chip:
    backgroundColor: "{colors.surface-blanche}"
    textColor: "{colors.gris-recit}"
    rounded: "{rounded.badge}"
    padding: "0.5rem 1rem"
  input-modern:
    backgroundColor: "{colors.surface-blanche}"
    textColor: "{colors.encre-douce}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1rem"
---

# Design System: EurekAI

## 1. Overview

**Creative North Star: "L'Étincelle"**

Tout le système visuel d'EurekAI met en scène un seul instant : le déclic de compréhension, l'ampoule qui s'allume. L'interface est un ciel clair et calme (canvas bleuté, dégradés radiaux discrets bleu/violet) sur lequel les moments d'apprentissage brillent : chaque type de génération a sa couleur vive, chaque réussite déclenche une célébration courte, et la magie de l'IA porte le dégradé signature bleu → violet hérité du logo ampoule-éclair. Le fond reste serein pour que l'étincelle se voie ; la couleur vive est une récompense, jamais un bruit de fond.

Le système est **produit avant tout** : il sert un enfant de 9 ans en pleine tâche de révision, souvent sur tablette. La densité est faible, les corps de texte généreux (18px/1.7), les cibles tactiles larges (44px min), et les composants répondent physiquement — compression au clic, soulèvement au survol — avec l'élasticité d'un jouet bien fabriqué. Ce que ce système rejette explicitement (cf. PRODUCT.md) : le **scolaire austère** (LMS gris, formulaires ternes), la **gamification agressive** (streaks culpabilisants, compteurs anxiogènes), le **SaaS froid corporate** (navy/indigo B2B, jargon, metrics) et l'**enfantin brouillon** (surcharge décorative, mascotte criarde).

La trajectoire d'identité est actée dans PRODUCT.md : la palette actuelle décalque Duolingo (#1cb0f6/#58cc02/#ffc800/#ff4b4b) ; toute évolution tire vers l'univers propre du logo (bleu électrique #006FFD → violet #5633FF, étincelle jaune-or #FFC500) sans casser la familiarité ludique.

**Key Characteristics:**

- Ciel clair et calme, couleur vive réservée aux moments qui comptent (catégories, feedback, célébration)
- Dégradé signature bleu → violet pour la magie (wordmark, titres de vues, CTA « Auto »)
- Formes très arrondies (1.25–1.75rem), composants rebondis (press 0.95, lift -2px)
- Deux thèmes complets (ciel diurne / nuit encre) pilotés par `data-theme`, jamais un seul
- Typo à deux voix : Sora (titres, tracking négatif) + Manrope (corps généreux 18px/1.7)
- Accessible par défaut : WCAG AA, confort de lecture Luciole, reduced-motion, RTL

## 2. Colors: la palette « Ciel & Étincelle »

Une palette de ciel d'été — bleu électrique, violet magique, étincelles jaunes — posée sur un nuage (#f6f9ff) le jour et une nuit d'encre (#0f1a2e) le soir. Chaque couleur vit en triade `light / base / dark` dans `src/styles/theme.css` ; **les tokens CSS (`--color-*`) sont la seule source de vérité** — jamais de palette Tailwind brute dans les templates.

### Primary
- **Bleu Ciel Électrique** (#1cb0f6, dark mode #3db8f5) : la couleur d'EurekAI — actions primaires, sélection courante, liens, moitié gauche du dégradé signature. Sa variante **Bleu Profond** (#0a8ad0) porte le texte blanc quand un aplat doit rester lisible (cf. Règle de l'Aplat Vif).
- **Bleu Pâle** (#d6f0ff) : fonds teintés d'état sélectionné et de badge informatif.

### Secondary
- **Violet Magique** (#8549ba, dark mode #a770d8) : la couleur de l'IA et de la magie — moitié droite du dégradé signature, catégorie quiz, accents « intelligents ». Variantes **Violet Profond** (#6b3a96) et **Violet Pâle** (#e8d5f5).

### Tertiary
- **Jaune Étincelle** (#ffc800) : avertissements bienveillants et éclats de célébration — l'écho des rayons du logo.
- **Vert Bravo** (#58cc02) : la réussite — feedback « bonne réponse », scores, validation.
- **Rouge Tendre** (#ff4b4b) : l'erreur sans la honte — feedback doux, suppression. Jamais utilisé pour la pression.
- **La famille des générateurs** (8 couleurs, une par type de contenu) : fiche #0077b6, flashcards #f3722c, quiz #8549ba, podcast #2a9d8f, quiz vocal #e76f51, illustration #e91e63, texte à trous #43a047, dictée #0284c7 — utilisées en chips teintées (`rgba(gen, 0.14)` fond / `0.28` bordure), boutons de catégorie et icônes. C'est le code couleur que l'enfant apprend pour se repérer.

### Neutral
- **Encre Douce** (#3c3c3c) : texte principal light mode — un noir adouci, jamais du #000.
- **Gris Récit** (#777777) : texte secondaire light mode. ⚠ À 4,48:1 sur blanc il frôle l'échec AA — sur fonds teintés ou glass, monter vers Encre Douce.
- **Canvas Nuage** (#f6f9ff) : fond de page light — un blanc bleuté de ciel voilé, réchauffé par deux dégradés radiaux fixes bleu/violet.
- **Surface Blanche** (#ffffff) : cartes et surfaces de contenu.
- **Nuit Encre** (#0f1a2e) / **Surface Nuit** (#182540) / **Texte Lune** (#e8edf5) : le thème sombre complet — une nuit bleutée, pas un gris neutre.

### Named Rules
**La Règle du Dégradé Signature.** Le dégradé 135° Bleu Ciel Électrique → Violet Magique (`.title-gradient`) est réservé à trois usages : le wordmark EurekAI, les titres h1/h2 de vues, et le CTA magique « Auto ». Interdit partout ailleurs — sur un corps de texte, un label ou un bouton ordinaire, c'est de la décoration, pas de la magie.

**La Règle de l'Aplat Vif.** Jamais de texte blanc en petit corps sur Bleu Ciel Électrique, Vert Bravo ou Jaune Étincelle (contrastes ≈ 2,4:1, échec AA) : sur un aplat vif, le texte passe sur la variante `-dark` du même hue (ex. `.chat-msg-user` sur Bleu Profond) ou l'aplat s'éclaircit en version pâle avec texte foncé.

**La Règle de l'Émancipation.** Toute *nouvelle* décision de couleur rapproche l'app de l'univers du logo (bleu électrique → violet, étincelle jaune-or) et l'éloigne du décalque Duolingo. On ne casse pas l'existant, on tire la trajectoire.

**La Règle des Deux Ciels.** Chaque couleur existe dans les deux thèmes (`:root` + `[data-theme='dark']`). Un composant qui n'utilise que des tokens est automatiquement thémable ; un composant qui hardcode une classe Tailwind de couleur casse le mode nuit (c'est exactement la dette des ~35 overrides `!important` en fin de `main.css`).

## 3. Typography

**Display Font:** Sora (sans-serif, poids 600–800, auto-hébergée via @fontsource)
**Body Font:** Manrope (sans-serif, poids 400–800, auto-hébergée via @fontsource)
**Accessibility Font:** Luciole (woff2 local, CC BY 4.0) — remplace Manrope quand le profil active le confort de lecture

**Character:** Deux voix géométriques et rondes qui se répondent : Sora, compacte et résolue (tracking négatif jusqu'à -0.03em), donne l'énergie des titres ; Manrope, ouverte et généreuse (18px/1.7), rend la lecture confortable pour un lecteur débutant de 9 ans. Zéro requête réseau : tout est auto-hébergé.

### Hierarchy
- **Display** (Sora 800, ~1.875rem, lh 1.2, ls -0.03em) : titres de vues, souvent en dégradé signature. Échelle rem fixe — pas de clamp fluide, on est en UI produit.
- **Headline** (Sora 700, ~1.5rem, lh 1.25, ls -0.026em) : titres de sections et de dialogs.
- **Title** (Sora 600, ~1.125rem, lh 1.35, ls -0.018em) : titres de cartes de génération, en-têtes d'accordéon.
- **Body** (Manrope 400–500, 18px, lh 1.7) : tout le contenu pédagogique. Prose plafonnée à 65–75ch.
- **Label** (Manrope 600–700, 16px, lh 1.6) : boutons, chips, badges, navigation.

### Named Rules
**La Règle des Deux Voix.** Sora ne descend jamais dans un corps de texte, un label ou une donnée ; Manrope ne monte jamais en titre de vue. La hiérarchie tient parce que chaque famille garde son étage.

**La Règle du Lecteur Débutant.** Le corps ne descend jamais sous 16px, l'interligne jamais sous 1.6. Quand le profil active le confort de lecture, `--reading-font` (Luciole) et les espacements élargis s'appliquent sans casser la mise en page — tout composant de contenu doit les respecter.

## 4. Elevation

Le système pratique le **flottement doux** : la profondeur est une ambiance, pas une hiérarchie. Les cartes flottent légèrement au-dessus du ciel dégradé grâce à des ombres larges, diffuses et très légères (opacités 0.04–0.15 teintées bleu nuit `rgba(15,24,38,…)`) ; l'interaction rapproche l'élément (hover : ombre `elevated` + lift -2px), les surfaces critiques (dialogs, menus) flottent franchement. Le glassmorphism (`backdrop-filter: blur(20-24px) saturate(160-180%)`) est réservé au **chrome** — header sticky, sidebar, toasts — jamais au contenu pédagogique. En mode nuit, les ombres foncent et un halo bleu discret (`--shadow-glow`) apparaît sur les éléments clés : l'étincelle se voit mieux la nuit.

### Shadow Vocabulary
- **card** (`0 2px 8px rgba(15,24,38,0.06), 0 1px 2px rgba(15,24,38,0.04)`) : état de repos de toute carte de contenu.
- **elevated** (`0 10px 30px rgba(15,24,38,0.1), 0 2px 8px rgba(15,24,38,0.06)`) : hover des cartes interactives, popovers.
- **float** (`0 20px 48px rgba(15,24,38,0.15), 0 6px 18px rgba(15,24,38,0.1)`) : dialogs, éléments détachés du flux.
- **glow** (`none` en light ; `0 0 20px rgba(61,184,245,0.15)` en dark) : halo signature du mode nuit.

### Named Rules
**La Règle du Chrome de Verre.** Le glass est un matériau de chrome (header, sidebar, toasts). Une carte de contenu, un quiz, une fiche ne sont jamais en verre : l'enfant lit à travers rien.

**La Règle des Trois Ombres.** Trois niveaux (card / elevated / float), pas d'ombre ad hoc. Un nouvel élément choisit son niveau, il n'invente pas sa valeur.

## 5. Components

Le caractère commun : **rebondi et joueur**. Les composants répondent physiquement — compression au clic (`scale(0.95)`), soulèvement au survol (`translateY(-2px)`), flip 3D des flashcards, shake doux des erreurs — en 150–250ms, jamais plus. `prefers-reduced-motion` coupe tout.

### Buttons
- **Shape:** très arrondis (`--radius-button` 1.25rem), padding généreux, cible ≥ 44px.
- **Primary:** Bleu Ciel Électrique, texte blanc (grands corps uniquement — cf. Règle de l'Aplat Vif), hover Bleu Profond.
- **Hover / Focus:** lift -2px + ombre elevated ; focus visible en double anneau (`.focus-ring` : anneau blanc + anneau primary) sur TOUS les éléments interactifs.
- **Press:** compression `.btn-press` scale(0.95), transition 150ms.
- **Category buttons:** teintés par la couleur du générateur (fond `rgba(gen, 0.14)`, bordure `0.28`, icône pleine couleur).
- **CTA magique « Auto »:** seul bouton au dégradé signature bleu → violet.

### Chips
- **Style:** pilule (`--radius-badge` 999px), fond translucide (`--color-chip-bg`), label Manrope 600.
- **State:** inactif gris sur translucide ; actif = fond blanc plein + texte de la couleur de catégorie ; hover intermédiaire. Toujours via tokens (chip-bg / chip-bg-hover / chip-bg-active).

### Cards / Containers
- **Corner Style:** `--radius-card` 1.75rem — la signature formelle de l'app.
- **Background:** Surface Blanche (light) / Surface Nuit (dark), jamais de glass.
- **Shadow Strategy:** card au repos → elevated au hover (+ lift) pour les cartes cliquables.
- **Border:** fine et translucide (`--color-border-light/default`), optionnelle.
- **Internal Padding:** ~1.25rem ; les gen-cards s'ouvrent en accordéon (header factorié `gen-card-header` : titre éditable, badge coût, badge score, chevron).

### Inputs / Fields
- **Style:** `.input-modern` — fond quasi-blanc translucide (`--color-input-bg`), bordure douce (`--color-input-border`), radius 1.25rem, texte 18px.
- **Focus:** double anneau focus-ring, bordure primary.
- **Error / Disabled:** bordure Rouge Tendre + message sous le champ ; disabled à 50% d'opacité avec tooltip explicatif traduit.

### Navigation
- **Desktop:** sidebar en verre (`.sidebar-glass`, radius 2rem) listant les cours, collapsible ; header sticky glass avec wordmark en dégradé signature.
- **Mobile:** nav-bottom 3 onglets (Cours / Magie / Scores), icônes Lucide, safe-area iOS (`pb-safe`).
- **Category-nav:** rangée de chips par vue, boutons générés dynamiquement depuis `categories` (state.ts) — jamais hardcodés.

### Feedback pédagogique (composant signature)
Le cœur émotionnel de l'app : bonne réponse = fond Vert Bravo pâle + `correct-pulse` + explication ; mauvaise réponse = fond Rouge Tendre pâle + `wrong-shake` doux + la bonne réponse mise en avant + accès remédiation (« M'entraîner sur mes erreurs »). Les barres de progression (`step-progress-nav`) et l'écran de score final célèbrent sans comparer ni culpabiliser. Le feedback s'adresse à l'enfant : tutoiement, encouragement, jamais de jargon.

## 6. Do's and Don'ts

### Do:
- **Do** utiliser exclusivement les tokens `--color-*` de `theme.css` pour toute couleur — c'est ce qui rend les Deux Ciels (light/dark) automatiques.
- **Do** passer le texte sur la variante `-dark` du hue quand il repose sur un aplat vif (Règle de l'Aplat Vif) ; viser WCAG AA (4,5:1) partout, y compris les placeholders.
- **Do** garder l'élasticité : press 0.95, lift -2px, 150–250ms, et une alternative `prefers-reduced-motion` pour chaque animation.
- **Do** donner à chaque élément interactif le double anneau `.focus-ring` et une cible ≥ 44px.
- **Do** réserver le dégradé signature au wordmark, aux titres de vues et au CTA « Auto » — sa rareté fait sa magie.
- **Do** écrire toute copy UI via `t('cle')` dans les 9 langues, au tutoiement encourageant, lisible seul par un enfant de 9 ans.
- **Do** tirer les nouvelles décisions couleur vers l'univers du logo (bleu électrique → violet, étincelle jaune-or) — Règle de l'Émancipation.

### Don't:
- **Don't** utiliser de classes Tailwind brutes de couleur (`bg-gray-100`, `text-blue-700`, `bg-teal-50`…) dans les templates : elles court-circuitent les tokens et cassent le mode nuit (la dette des 35 `!important` ne doit plus grandir).
- **Don't** ressembler au **scolaire austère** : pas de formulaires ternes, de tableaux administratifs, de gris institutionnel (anti-référence PRODUCT.md).
- **Don't** installer de **gamification agressive** : pas de streaks culpabilisants, de compteurs anxiogènes, de notifications pushy (anti-référence PRODUCT.md).
- **Don't** laisser le **SaaS froid corporate** contaminer l'app : pas de navy/indigo B2B, pas de jargon technique (`MISTRAL_API_KEY`, `.env`, « console ») dans un texte que l'enfant peut lire (anti-référence PRODUCT.md).
- **Don't** verser dans l'**enfantin brouillon** : pas de surcharge décorative, de mascotte criarde, de polices fantaisie (anti-référence PRODUCT.md).
- **Don't** mettre de texte blanc petit corps sur Bleu Ciel Électrique, Vert Bravo ou Jaune Étincelle (échec AA ≈ 2,4:1).
- **Don't** étendre le dégradé clip-text au-delà de ses trois usages réservés, ni poser de glass sur du contenu pédagogique.
- **Don't** inventer de radius ou d'ombre hors échelle (`1.25rem` / `1.75rem` / `999px` ; card / elevated / float) — pas de valeur ad hoc.
- **Don't** imbriquer un `<button>` dans un `<button>` : conteneur cliquable = `role="button"` + `tabindex="0"` + `@keydown.enter` (règle CLAUDE.md).
