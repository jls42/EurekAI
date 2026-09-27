#!/usr/bin/env bash
# release.sh — Release EurekAI : tag git + GitHub Release, en un coup.
#
# IMPORTANT : la version dans package.json doit DÉJÀ être bumpée et mergée sur main
#   (via une PR `chore(release): X.Y.Z` — convention du repo, on ne committe JAMAIS
#   directement sur main). Ce script fait UNIQUEMENT la release, pas le bump.
#
# Étapes (à lancer sur main à jour) :
#   1. Préflight : branche main, working tree propre, local == origin/main,
#      tag vX.Y.Z inexistant, outils présents.
#   2. Crée + pousse le tag vX.Y.Z (version lue dans package.json).
#   3. Crée la GitHub Release (notes auto-générées depuis les PR mergées).
#
# L'image ghcr (:X.Y.Z + :latest) n'est PAS publiée ici : le push du tag déclenche le workflow
# .github/workflows/publish-image.yml, qui la construit et la pousse avec le GITHUB_TOKEN du
# dépôt (aucun PAT local). Suivi : gh run list --workflow publish-image.yml. Secours manuel
# (workflow indisponible) : ./scripts/publish-ghcr.sh X.Y.Z, avec un GHCR_TOKEN valide
# (PAT write:packages) ; le relancer ici doublait la publication et échouait dès que le PAT
# local expirait, alors que l'image était déjà publiée par le workflow.
#
# Usage : ./scripts/release.sh [--yes]
#   --yes : saute la confirmation interactive (CI/non-interactif).
#
# Pré-requis : git, gh (authentifié), node.
set -euo pipefail

cd "$(dirname "$0")/.."

YES=false
[[ "${1:-}" == "--yes" ]] && YES=true

# --- Outils requis ---
for tool in git gh node; do
  command -v "$tool" >/dev/null 2>&1 || { echo "ERREUR : '$tool' introuvable."; exit 1; }
done

VERSION="$(node -p "require('./package.json').version")"
TAG="v${VERSION}"

echo "=== EurekAI Release ${TAG} ==="

# --- 1. Préflight ---
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
[[ "$BRANCH" == "main" ]] || { echo "ERREUR : pas sur main (sur '$BRANCH'). Lance: git checkout main"; exit 1; }

[[ -z "$(git status --porcelain --untracked-files=no)" ]] || {
  echo "ERREUR : working tree non propre (commits/modifs en cours)."; exit 1; }

git fetch origin main --quiet
[[ "$(git rev-parse HEAD)" == "$(git rev-parse origin/main)" ]] || {
  echo "ERREUR : main local != origin/main. Lance: git pull origin main"; exit 1; }

if git rev-parse "$TAG" >/dev/null 2>&1 || git ls-remote --tags origin "$TAG" 2>/dev/null | grep -q "refs/tags/${TAG}$"; then
  echo "ERREUR : le tag $TAG existe déjà."
  echo "  → Bump la version d'abord via une PR 'chore(release): X.Y.Z', merge, puis relance."
  exit 1
fi

echo "  Version : ${VERSION}"
echo "  Commit  : $(git rev-parse --short HEAD)"
echo ""

# --- 2. Confirmation ---
if [[ "$YES" != "true" ]]; then
  read -r -p "Créer le tag ${TAG} + GitHub Release ? [y/N] " ans
  [[ "$ans" =~ ^[yY]$ ]] || { echo "Annulé."; exit 0; }
fi

# --- 3. Tag git ---
echo ">> Tag ${TAG}..."
git tag "$TAG"
git push origin "$TAG"

# --- 4. GitHub Release (notes auto depuis les PR mergées) ---
echo ">> GitHub Release ${TAG}..."
gh release create "$TAG" --title "$TAG" --generate-notes

echo ""
echo "=== Release ${TAG} terminé ==="
echo "  Release : https://github.com/jls42/EurekAI/releases/tag/${TAG}"
echo "  Image   : publiée par le workflow « Publish image » (tag ${TAG}) :"
echo "            ghcr.io/jls42/eurekai:${VERSION} et :latest"
echo "            suivi : gh run list --workflow publish-image.yml --limit 1"
