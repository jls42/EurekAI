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

## Ajouter une source

1. Creer le generateur dans `generators/` si besoin
2. Ajouter la route dans `routes/sources.ts`
3. Ajouter l'UI dans `src/partials/view-sources.html` + `src/app/sources.ts`
