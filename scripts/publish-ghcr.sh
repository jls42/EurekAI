#!/usr/bin/env bash
# Build and push EurekAI container image to GitHub Container Registry (ghcr.io)
# Usage: ./scripts/publish-ghcr.sh [version]
#   version defaults to the version in package.json
#
# Requires: GHCR_TOKEN env var (GitHub PAT with write:packages scope)
#   Can be set in .env or exported before running this script

set -euo pipefail

REGISTRY="ghcr.io"
OWNER="jls42"
IMAGE="eurekai"
FULL_IMAGE="${REGISTRY}/${OWNER}/${IMAGE}"

# Read version from argument or package.json
VERSION="${1:-$(node -p "require('./package.json').version")}"

echo "=== EurekAI Container Publisher ==="
echo "  Image:   ${FULL_IMAGE}"
echo "  Version: ${VERSION}"
echo ""

# Load .env if present (for GHCR_TOKEN)
if [[ -f .env ]]; then
  # shellcheck disable=SC1091
  set -a && source .env && set +a
fi

if [[ -z "${GHCR_TOKEN:-}" ]]; then
  echo "ERROR: GHCR_TOKEN non défini. Créer un PAT GitHub avec scope write:packages"
  echo "  export GHCR_TOKEN=ghp_..."
  exit 1
fi

# 1. Authenticate
echo ">> Login ghcr.io..."
echo "${GHCR_TOKEN}" | podman login "${REGISTRY}" -u "${OWNER}" --password-stdin

# 2. Build
echo ""
echo ">> Build image..."
podman build -t "${IMAGE}:latest" -f Containerfile .

# 3. Tag
echo ""
echo ">> Tag ${FULL_IMAGE}:{latest,${VERSION}}..."
podman tag "${IMAGE}:latest" "${FULL_IMAGE}:latest"
podman tag "${IMAGE}:latest" "${FULL_IMAGE}:${VERSION}"

# 4. Push
echo ""
echo ">> Push ${VERSION}..."
podman push "${FULL_IMAGE}:${VERSION}"

echo ">> Push latest..."
podman push "${FULL_IMAGE}:latest"

echo ""
echo "=== Done ==="
echo "  ${FULL_IMAGE}:${VERSION}"
echo "  ${FULL_IMAGE}:latest"
echo ""
echo "Si le package n'est pas visible, le rendre public sur :"
echo "  https://github.com/${OWNER}/EurekAI/pkgs/container/${IMAGE}/settings"
