# Prompts IA — Conventions

Toutes les fonctions de prompt vivent dans `prompts.ts`. Les generators (`generators/*.ts`) les importent et composent, ils ne redefinissent pas de prompt inline.

## lang + ageGroup (obligatoire)

- Chaque prompt system/user doit accepter `ageGroup: AgeGroup` et `lang: string` en param et les propager.
- Le prompt system applique `ageInstruction(ageGroup)` — sauf `verifyAnswer` qui utilise `feedbackAgeInstruction` (calibré pour feedback binaire court, pas pour génération longue).
- Exception documentée : `consigneSystem(lang)` ne prend pas d'`ageGroup` — détection de consignes, pas génération de contenu destiné à l'élève (l'âge est hors-sujet).
- Le prompt user (ou system selon le cas) concatène `langInstruction(lang)` en fin de string.
- Inventaire des prompts où `langInstruction` ferme le SYSTEM (pas de user prompt dédié porteur de langue) : `consigneSystem` et `routerSystem` (leurs user prompts ne portent pas la langue), `chatSystem` et `websearchInstructions` (conversation/agent, pas de user prompt unique), `verifyAnswerSystem` (le user est un couple question/réponse court). Partout ailleurs, `langInstruction` ferme le USER.
- Exception documentée : `imageSystem` ne concatène PAS `langInstruction` — son énumération « génère TOUT le contenu (textes, titres…) » contredirait l'interdiction de texte dans l'image, en dernière position (biais de récence, sur le mode d'échec exact que le prompt combat). Ligne de langue dédiée à la place (« Le contenu source est en X… L'image reste purement visuelle. »), verrouillée par un test d'absence dans `prompts.test.ts`.
- `quizVocalSystem` injecte aussi `vocalRewriteRules(lang)` (règles de réécriture TTS par langue).

## Anti-leak lexical (leçon d'une régression prod)

**Symptôme observé** : le titre des fiches de révision contenait `"— Fiche de révision COMPLÈTE"`. Cause : le mot `COMPLETE` en majuscules, répété 3× dans le prompt `summarySystem` à proximité du champ `title`, était recopié littéralement par le LLM dans sa sortie. Combiné avec le few-shot `EXEMPLE` ajouté dans la PR `feat/prompts-improvements`, le pattern est devenu systématique.

**Règle** : ne JAMAIS mettre de tokens méta (qualificatifs du document : "fiche", "synthèse", "complete", "exhaustive", "révision") au voisinage d'un champ JSON que le LLM produit sous forme de texte libre (surtout `title`, `word`, `question`). Les LLM recyclent les mots emphasés du prompt, surtout en majuscules ou répétés.

**Corollaire** : éviter la **blacklist explicite** (`"pas de Fiche, Synthese, Complete"`) qui est un anti-pattern — elle réinjecte les mots qu'on veut éviter. Préférer une **règle positive** (`title = sujet du cours uniquement`) + 2-3 **exemples positifs** de bons titres.

**Verrous automatiques** : `prompts.test.ts` contient des assertions d'absence sur les formes combinées exactes (`'cree une seule fiche de revision complete'`, `'la fiche finale'`, `'avec cette fiche'`, `'resume complet du cours'`) — à maintenir si on refactore summarySystem.

## Politique titrage summary

- `data.title` produit par le LLM = **sujet du cours uniquement**, court et descriptif (ex: `"Les volcans"`, `"La photosynthese"`).
- Préfixe `"Fiche — "` (FR) / `"Note — "` (EN) ajouté automatiquement par `helpers/auto-title.ts` (export `autoTitle(type, data, lang)`, formatter `summary`) côté backend pour l'affichage en **carte liste générations** uniquement.
- **Vue détail fiche** (`src/partials/view-summary.html`, bloc `x-text="summaryData(gen).title"`) affiche `data.title` **brut sans préfixe** → le title LLM doit être auto-suffisant et lisible seul.
- Ne JAMAIS mentionner `"Fiche —"` dans le prompt : ça réinjecte le token "Fiche" à côté du champ title (anti-pattern).

## Retry prompts

Tous les messages de retry (2e appel après réponse invalide) sont **factorisés dans `prompts.ts`** — `summaryRetryUser(lang)`, `quizRetryUser({ kind, count?, lang? })`, `flashcardsRetryUser(count, lang)`, `fillBlankRetryUser(count, lang)`, `dictationRetryUser(count, lang)`, `podcastRetryUser(lang)`. Jamais de string inline dans un generator. Même discipline que le prompt initial :
- Pas d'écho des formulations problématiques (pas de « UNE SEULE fiche COMPLETE »).
- **Contrat aligné sur le system prompt** : le retry summary demande « autant que necessaire pour tout couvrir » + le champ `citations` — jamais un rabot de couverture type « 5-7 » quand le system dit « 10-25 typiquement » (bug historique corrigé). Le retry dictée reprend l'échappatoire « moins uniquement si le contenu ne contient pas assez de mots interessants » de `dictationUser` (pas de « N objets » ferme qui recréerait la tension plafond/plancher).
- **lang + count au 2e tour** : chaque retry se termine par `langInstruction(lang)` (l'invariant « langInstruction en dernier message user » vaut aussi au retry) et rappelle le count quand le contrat initial en a un. `quizRetryUser` est en object-arg (pattern `resolveVoices`, cf. CLAUDE.md) ; pas de `count` pour `quiz-review` (plage 5-10 portée par le system). `generateQuiz`/`generateQuizVocal` calculent `effectiveCount = count ?? 15` (précédent `flashcards.ts` : `count ?? 5`) passé au user prompt ET au retry.
- Chaque generator asserte le contenu de son 2e mock call contre la fonction factorisée (`generators/*.test.ts`), + verrous de contenu dans `prompts.test.ts` (describe `RETRY PROMPTS`).

## Emphases MAJUSCULES

**Principe directeur (robustesse multi-modèles).** L'emphase (`IMPORTANT`, MAJUSCULES) **balise les contraintes dures** — elle n'est pas décorative. La cible n'est pas seulement un modèle fort : les prompts doivent rester fiables sur des modèles faibles ou non-anglophones (Mistral aujourd'hui, modèles chinois demain). Un modèle fort suit une contrainte sans balisage ; un modèle faible en a besoin. Recommandation officielle Mistral alignée : « écris pour quelqu'un sans contexte — il doit exécuter la tâche à la seule lecture du prompt ». **Dans le doute, GARDER l'emphase sur une contrainte porteuse.** Ne jamais « nettoyer » une emphase au motif esthétique ou d'un quota — c'est une régression de robustesse (leçon vécue : une passe « hygiène » qui a retiré des `IMPORTANT`/MAJUSCULES load-bearing, annulée).

Emphases **load-bearing** à conserver (liste non exhaustive) :
- `PAS de tableau "fiches"`, `IMPORTANT : … UN SEUL objet` (`summarySystem` — garde-fou parser `extractSummary`)
- `AUCUNE parenthese`, `UNIQUE EXCEPTION`, `OBLIGATOIRES` (`quizVocalSystem` — critique pour TTS)
- `INTERDICTION ABSOLUE DE TEXTE`, `ZERO` (`imageSystem` — critique pour génération image)
- `FABRIQUE JAMAIS`, `LISTE-LES TOUTES` (`sourceRefsInstruction` — anti-hallucination sources)
- `Ne mets PAS la source… liste-les toutes` (`quizUser`/`quizReviewUser` — réattribution + renfort volontaire, même si `sourceRefsInstruction` le dit déjà : la répétition aide un modèle faible)
- `NOUVELLES`, `MEMES`, `FACILES`, `AUTRE ANGLE`, `PEDAGOGIQUES` (`quizReviewSystem` — stratégie de remédiation)
- `Base TOUJOURS`, `n'est PAS couvert` (`chatSystem` — ancrage anti-hallucination)
- `UN MOT/EXPRESSION CLE`, `terme CLE`, `IMPORTANT` article, `DANS`/`JAMAIS`, `INCLUS` (`fillBlankSystem` — règle de l'article, piège fréquent)
- `UNIQUEMENT`, `CHAQUE` (`summaryRemediationSystem` — portée + complétude)
- `IMPORTANT — … LUES A HAUTE VOIX` (`VOCAL_REWRITE_COMMON` — contexte TTS)
- `STRUCTURE OBLIGATOIRE`, `DOIT`, `AUCUN mot d'attenuation` (`verifyAnswerSystem` — fidélité du feedback binaire)
- `ne mentionne JAMAIS les sources` (`podcastSystem` — le dialogue parlé ne cite pas sa documentation)
- `IMPORTANT : génère TOUT` (`langInstruction` — convention cross-prompt)

Ce qui reste légitimement retirable = l'emphase **réellement décorative** sur du texte qui n'est PAS une contrainte (ex. adjectifs de style, interjections). En cas de doute sur « décoratif vs porteur », trancher **porteur** (garder). Il n'y a pas de quota « max 1-2 blocs » : le critère est la nature de ce qui est emphasé, pas le compte.

## Few-shots EXEMPLE

- **Un seul exemple par prompt** (plusieurs exemples ne font pas mieux et accentuent les biais de forme).
- **Exemples diversifiés entre prompts** (flashcards = géographie, quiz = éducation civique, etc.) — évite les biais de domaine dans l'ensemble.
- **Pas de pattern recyclable** dans la forme (ex: `"Brasilia — explication..."` avec tiret cadratin → le LLM peut template-iser "X — Y" pour toutes ses flashcards). Privilégier phrase simple.
- **Technique pédagogique transférable** dans l'explication plutôt que contenu très spécifique (ex: pour un quiz, expliquer pourquoi un distracteur est tentant, pas juste restituer un fait chronologique).

## Bloc d'exclusions (diversité inter-générations)

- Les headers du bloc « déjà généré » vivent dans `prompts.ts` (`exclusionHeader(type)`) — `helpers/diversity.ts#buildExclusionContext` ne porte que la mécanique (filtrage par type, extracteurs, cap 2000 chars).
- **Règle positive, scoped au CHOIX du contenu** (« Tu as déjà généré… propose-en d'autres ») — jamais d'impératif générique type « NE PAS RÉPÉTER » : le LLM peut l'appliquer au texte qu'il rédige. Bug observé en conditions réelles : mots masqués par `______` dans leurs propres phrases de dictée.
- La consigne de diversité vit UNIQUEMENT dans ce bloc (présent seulement quand un historique existe) — pas de phrase « tu DOIS proposer… complètement différentes » dupliquée dans les system prompts.
- Ordre des blocs user : markdown → exclusions → registre éventuel → `langInstruction` **toujours en dernier** (verrouillé par le describe `ORDRE DES BLOCS USER` de `prompts.test.ts`).
- **Même régime pour le header consigne** : `consigneMarkdownHeader(topicsList)` vit dans `prompts.ts` (consommé par `routes/generate.ts#applyConsigne`). Instruction **explicite et emphasée** (« Concentre-toi PRIORITAIREMENT… Le contenu hors-programme peut etre utilise en complement ») : un modèle faible doit prioriser les points de la consigne **sans ignorer le reste** — ne pas raccourcir au point de perdre le sens (leçon : une version « minimale » qui retirait la consigne de priorité était une régression). Le marqueur « CONSIGNE DE REVISION DETECTEE » est référencé par `summarySystem`/`summaryUser` : ne pas le renommer.

## Contrat JSON

- `jsonInstruction()` fournit `"Reponds UNIQUEMENT en JSON valide."` **+ interdiction explicite de tout texte d'emballage et des balises de code** (`pas de ```) → appeler en fin de system prompt. Durci pour la robustesse multi-modèles : les modèles faibles / non-anglophones emballent souvent le JSON (préambule « Voici le JSON », fences markdown) → parse cassé. La phrase exacte `"Reponds UNIQUEMENT en JSON valide."` reste un substring stable (verrouillé par les tests) ; ne pas la modifier, seulement compléter.
- Le `Format EXACT` doit être littéralement donné dans le prompt (pas une description). Si on attend `{"items": [...]}`, le montrer.
- Invariants à protéger : `PAS de tableau "fiches"` dans summary (garde-fou contre `{"fiches":[...]}` qui casse `extractSummary`).
- `responseFormat: { type: 'json_object' }` côté client Mistral complète (ne remplace pas) l'instruction dans le prompt.

## Sources et citations

`sourceRefsInstruction(itemName)` factorise l'instruction anti-hallucination sur les sources pour les prompts qui produisent des références (`summary`, `flashcards`, `quiz`, `fill-blank`, `podcast`, `quiz-vocal`). À réutiliser pour tout nouveau generator qui cite des sources.

## Voir aussi

- `generators/auto-agents.ts` — source unique de vérité sur la liste des 8 agents auto (`AUTO_AGENTS_SET`, `MAX_AUTO_PLAN_LENGTH`), dictée incluse depuis feat/dictee-auto. Ne pas dupliquer.
- `generators/router.ts` — `normalizePlan` documente la politique : choix du modèle prime, enrichment budget-aware, pas de troncature sacrificielle d'un agent LLM-choisi.
- `config.ts` `resolveVoices` (object-arg `lang`/`profileId`/`flow`) — TTS voix par langue + rotation déterministe par profil (cf. CLAUDE.md section TTS).
- `helpers/diversity.ts` — la dictée a sa clé `PARAMS` (temp 0.9, `presencePenalty` 0 **volontaire** : la phrase doit re-contenir le mot pour l'affichage à trou, ne pas copier le 0.3 des voisins) et son extracteur d'exclusions (mots déjà travaillés, câblé dans les deux builders de `routes/generate.ts`). L'ordre des mots est mélangé côté serveur (`shuffleItems` dans `generators/dictation.ts`, mécanisme de présentation uniquement) puis coupé à `min(count, DICTATION_MAX_WORDS)` — jamais de consigne d'ordre déterministe dans le prompt (elle figeait le premier mot). À l'inverse, `fillBlankSystem` garde volontairement « Ordonne du plus simple au plus difficile » : fill-blank n'a aucun shuffle serveur, l'ordre pédagogique produit par le LLM est rendu tel quel.
