# Prompts IA — Conventions

Toutes les fonctions de prompt vivent dans `prompts.ts`. Les generators (`generators/*.ts`) les importent et composent, ils ne redefinissent pas de prompt inline.

## lang + ageGroup (obligatoire)

- Chaque prompt system/user doit accepter `ageGroup: AgeGroup` et `lang: string` en param et les propager.
- Le prompt system applique `ageInstruction(ageGroup)` — sauf `verifyAnswer` qui utilise `feedbackAgeInstruction` (calibré pour feedback binaire court, pas pour génération longue).
- Le prompt user (ou system selon le cas) concatène `langInstruction(lang)` en fin de string.
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

## Retry prompt

Le retry dans `generators/summary.ts` (quand le premier JSON est invalide) doit respecter **la même discipline** que le prompt initial :
- Pas d'écho des formulations problématiques de l'ancienne version.
- Si le prompt initial dit "objet JSON unique", le retry le dit aussi — pas "UNE SEULE fiche COMPLETE".
- Un test dédié dans `generators/summary.test.ts` asserte le contenu du 2e mock call.

## Emphases MAJUSCULES

Garder les MAJUSCULES **uniquement** pour les contraintes dures non négociables :
- `PAS de tableau "fiches"` (garde-fou parser `extractSummary` dans `generators/summary.ts`)
- `AUCUNE parenthese`, `UNIQUE EXCEPTION`, `OBLIGATOIRES` (`quizVocalSystem` — critique pour TTS)
- `INTERDICTION ABSOLUE DE TEXTE`, `ZERO` (`imageSystem` — critique pour génération image)
- `FABRIQUE JAMAIS`, `LISTE-LES TOUTES` (`sourceRefsInstruction` — anti-hallucination sources)
- `JAMAIS "presque bon"` quand correct (`verifyAnswerSystem` — fidélité feedback)
- `IMPORTANT : génère TOUT` (`langInstruction` — convention cross-prompt)

Retirer les emphases **décoratives** (`MAIS`, `AUTONOME`, `CHAQUE replique`, `COMPLETEMENT DIFFERENTES`) qui érodent la sélectivité du modèle. Règle empirique : max 1-2 blocs MAJUSCULES par prompt.

## Few-shots EXEMPLE

- **Un seul exemple par prompt** (plusieurs exemples ne font pas mieux et accentuent les biais de forme).
- **Exemples diversifiés entre prompts** (flashcards = géographie, quiz = éducation civique, etc.) — évite les biais de domaine dans l'ensemble.
- **Pas de pattern recyclable** dans la forme (ex: `"Brasilia — explication..."` avec tiret cadratin → le LLM peut template-iser "X — Y" pour toutes ses flashcards). Privilégier phrase simple.
- **Technique pédagogique transférable** dans l'explication plutôt que contenu très spécifique (ex: pour un quiz, expliquer pourquoi un distracteur est tentant, pas juste restituer un fait chronologique).

## Contrat JSON

- `jsonInstruction()` fournit `"Reponds UNIQUEMENT en JSON valide."` → appeler en fin de system prompt.
- Le `Format EXACT` doit être littéralement donné dans le prompt (pas une description). Si on attend `{"items": [...]}`, le montrer.
- Invariants à protéger : `PAS de tableau "fiches"` dans summary (garde-fou contre `{"fiches":[...]}` qui casse `extractSummary`).
- `responseFormat: { type: 'json_object' }` côté client Mistral complète (ne remplace pas) l'instruction dans le prompt.

## Sources et citations

`sourceRefsInstruction(itemName)` factorise l'instruction anti-hallucination sur les sources pour les prompts qui produisent des références (`summary`, `flashcards`, `quiz`, `fill-blank`, `podcast`, `quiz-vocal`). À réutiliser pour tout nouveau generator qui cite des sources.

## Voir aussi

- `generators/auto-agents.ts` — source unique de vérité sur la liste des 7 agents (`AUTO_AGENTS_SET`, `MAX_AUTO_PLAN_LENGTH`). Ne pas dupliquer.
- `generators/router.ts` — `normalizePlan` documente la politique : choix du modèle prime, enrichment budget-aware, pas de troncature sacrificielle d'un agent LLM-choisi.
- `config.ts` `resolveVoices` (object-arg `lang`/`profileId`/`flow`) — TTS voix par langue + rotation déterministe par profil (cf. CLAUDE.md section TTS).
