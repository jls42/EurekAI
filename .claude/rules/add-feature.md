---
paths:
  - "generators/**/*.ts"
  - "routes/generate*.ts"
  - "routes/sources*.ts"
  - "types.ts"
  - "src/app/state*.ts"
  - "src/main.ts"
  - "src/index.html"
  - "src/partials/view-*.html"
---

# Ajouter un générateur, une source ou un agent auto

Section « Agents auto-generables » déplacée telle quelle depuis CLAUDE.md, le 2026-10-21 ; le reste du fichier est inchangé.

## Ajouter un generateur

1. Creer `generators/mon_generateur.ts` avec signature `(client, markdown, model?, lang?, ageGroup?, count?) -> data`
2. Ajouter le type dans `types.ts` (union Generation)
3. Ajouter la route dans `routes/generate.ts` (+ autoTitle)
4. Ajouter la categorie dans `src/app/state.ts` → `categories[]` (boutons dynamiques)
5. Ajouter le loading key dans `src/app/state.ts` → `loading{}`
6. Creer le composant dans `src/components/` (utiliser le mixin `step-by-step.ts` si interactif)
7. Enregistrer le composant dans `src/main.ts` via `Alpine.data()`
8. Creer la vue dans `src/partials/view-mon_generateur.html`
9. Inclure le partial dans `src/index.html`
10. Ajouter les cles i18n dans les **9 fichiers** : `src/i18n/{fr,en,es,pt,it,nl,de,hi,ar}.ts`
11. Ajouter icon + color dans `src/app/helpers.ts` (genIcon, genColor)
12. Ajouter le CSS icon-chip dans `src/styles/main.css` + variables dans `src/styles/theme.css`
13. Ajouter dans `generators/router.ts` VALID_AGENTS si eligible pour le routeur auto
14. Ajouter dans `generators/chat.ts` TOOLS + `routes/chat.ts` si le chat doit pouvoir le generer
15. Si le generateur appelle le TTS : l'ajouter a `TTS_DEPENDENT_AGENTS` (`generators/auto-agents.ts`) — bouton grise sans TTS, plan auto filtre, echec TTS classe `tts_upstream_error` (`TTS_AGENTS` en derive) — et a `AUDIO_ENRICHMENT_ORDER` (`generators/router.ts`), sinon le verrou de `router.test.ts` echoue

## Ajouter une source

1. Creer le generateur dans `generators/` si besoin
2. Ajouter la route dans `routes/sources.ts`
3. Ajouter l'UI dans `src/partials/view-sources.html` + `src/app/sources.ts`

## Agents auto-generables
- **Source unique de vérité** : `generators/auto-agents.ts` exporte `AUTO_AGENTS_SET` et `MAX_AUTO_PLAN_LENGTH` — utilisés par `router.ts` (`VALID_AGENTS`) ET `routes/generate.ts` (`AUTO_EXECUTABLE`) — ainsi que `TTS_DEPENDENT_AGENTS` (types qui exigent le TTS, cf. section TTS). Ne jamais dupliquer la liste. L'ordre d'enrichissement audio du routeur (`AUDIO_ENRICHMENT_ORDER`, `generators/router.ts`) a les mêmes éléments que `TTS_DEPENDENT_AGENTS` (verrou : `router.test.ts`).
- **Politique `normalizePlan`** : choix du modèle prime, enrichment audio (podcast/quiz-vocal) budget-aware — on ne tronque jamais un agent explicitement choisi par le LLM (`image` pour contenu visuel p.ex.)
