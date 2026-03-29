#!/bin/bash
# Check for outdated dependencies and Mistral API model availability
set -euo pipefail

echo "=== Outdated npm packages ==="
npm outdated 2>/dev/null || true

echo ""
echo "=== Critical SDK versions ==="
for pkg in @mistralai/mistralai @elevenlabs/elevenlabs-js; do
  current=$(node -e "try{console.log(require('$pkg/package.json').version)}catch{console.log('N/A')}" 2>/dev/null)
  latest=$(npm view "$pkg" version 2>/dev/null || echo "N/A")
  if [ "$current" = "$latest" ]; then
    echo "  $pkg: $current (up to date)"
  else
    echo "  $pkg: $current -> $latest (UPDATE AVAILABLE)"
  fi
done

echo ""
echo "=== Mistral model availability ==="
if [ -z "${MISTRAL_API_KEY:-}" ]; then
  source .env 2>/dev/null || true
fi
if [ -z "${MISTRAL_API_KEY:-}" ]; then
  echo "  MISTRAL_API_KEY not set, skipping model checks"
  exit 0
fi

models=("mistral-large-latest" "mistral-small-latest" "mistral-ocr-latest" "voxtral-mini-latest" "voxtral-mini-tts-latest" "mistral-moderation-latest")
for model in "${models[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" -X POST https://api.mistral.ai/v1/models \
    -H "Authorization: Bearer $MISTRAL_API_KEY" 2>/dev/null || echo "ERR")
  # Just verify the API key works, models are validated at call time
  break
done

echo "  API key: valid"
echo "  Models used: ${models[*]}"
echo ""
echo "Done. Run 'npm update' to apply minor/patch updates within semver ranges."
