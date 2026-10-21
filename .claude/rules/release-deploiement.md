---
paths:
  - "scripts/release.sh"
  - "scripts/publish-ghcr.sh"
  - ".github/workflows/publish-image.yml"
  - "Containerfile"
  - ".containerignore"
  - ".dockerignore"
---

# Release et déploiement local

Déplacé tel quel depuis CLAUDE.md (section « Workflow », puces « Release », « Conteneur local (podman rootless) après une release » et « Déploiement local de PR pas encore fusionnées »), le 2026-10-21.

- **Release** : PR `chore(release): vX.Y.Z` (bump par `npm version X.Y.Z --no-git-tag-version` : `package.json` + `package-lock.json`), merge par le propriétaire (ou sur son go) une fois la quality gate SonarCloud de `main` verte (cf. SonarQube), puis `./scripts/release.sh` sur `main` à jour (tag + GitHub Release) ; notes rédigées ensuite avec `gh release edit`, sur le modèle des précédentes. **L'image ghcr est publiée par le workflow `.github/workflows/publish-image.yml` au push du tag** (`GITHUB_TOKEN` du dépôt, aucun PAT local ; suivi : `gh run list --workflow publish-image.yml`). `./scripts/publish-ghcr.sh` n'est qu'un secours manuel (PAT `write:packages` valide) : le relancer après le tag doublait la publication et échouait dès que le `GHCR_TOKEN` local expirait (403 au login, vécu en v1.7.4).
- **Conteneur local (podman rootless) après une release** : le recréer avec SA commande d'origine, relue par `podman inspect <conteneur> --format '{{range .Config.CreateCommand}}{{.}} {{end}}'` (clé masquée à l'affichage), en ne changeant que le tag de l'image. `--userns=keep-id --user 1000:1000 -e HOME=/tmp` sont indispensables : sans eux, le processus ne lit pas `certs/key.pem` (mode 600, propriétaire de l'hôte) et le conteneur redémarre en boucle sur EACCES (vécu le 2026-10-18). Seule `MISTRAL_API_KEY` passe au conteneur, en `-e MISTRAL_API_KEY` sans valeur depuis une variable du shell (jamais affichée). Sauvegarder `output/` avant ; garder l'ancien conteneur arrêté quelques jours pour revenir en arrière. `--restart=always` + `podman-restart.service` (unité utilisateur) le relancent à l'ouverture de session ; au démarrage sans session, il faut en plus `loginctl enable-linger`.
- **Déploiement local de PR pas encore fusionnées** : branche locale `local/deploiement-<date>` (une PR + merge des autres), **jamais poussée** ; `npm run test` dessus, puis `/release-test` combiné sur la version servie. Après les squash merges : `git diff local/deploiement-<date> origin/main` vide, mettre `main` à jour SANS changer de branche (`git fetch origin main:main`), puis `git switch main` : aucun fichier n'est réécrit et `tsx watch` ne redémarre pas. Basculer sur un `main` en retard réécrit les fichiers deux fois (ancienne version, puis nouvelle au `pull`) et relance le serveur (vécu le 2026-10-04) : une génération en cours serait annulée.
