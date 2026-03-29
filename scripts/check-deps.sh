#!/bin/bash
# Check for outdated dependencies and API model availability
set -euo pipefail

echo "=== Outdated npm packages ==="
npm outdated 2>/dev/null || true

echo ""
echo "=== Critical SDK versions ==="
for pkg in @mistralai/mistralai @elevenlabs/elevenlabs-js; do
  current=$(node -e "try{const v=require('$pkg/package.json').version; console.log(v.replace(/^v/,''))}catch{console.log('N/A')}" 2>/dev/null)
  latest=$(npm view "$pkg" version 2>/dev/null | sed 's/^v//' || echo "N/A")
  if [ "$current" = "$latest" ]; then
    echo "  ✓ $pkg: $current"
  else
    echo "  ⬆ $pkg: $current -> $latest (UPDATE AVAILABLE)"
  fi
done

# Load env if needed
if [ -z "${MISTRAL_API_KEY:-}" ]; then
  # shellcheck disable=SC1091
  source .env 2>/dev/null || true
fi

echo ""
echo "=== Mistral API model check ==="
if [ -z "${MISTRAL_API_KEY:-}" ]; then
  echo "  MISTRAL_API_KEY not set, skipping"
else
  # Chat models — tested via /v1/chat/completions
  chat_models=("mistral-large-latest" "mistral-small-latest")
  # Non-chat models — tested via /v1/models listing
  other_models=("mistral-ocr-latest" "voxtral-mini-latest" "voxtral-mini-tts-latest" "mistral-moderation-latest")
  all_ok=true

  for model in "${chat_models[@]}"; do
    status=$(curl -s -w "\n%{http_code}" -X POST https://api.mistral.ai/v1/chat/completions \
      -H "Authorization: Bearer $MISTRAL_API_KEY" \
      -H "Content-Type: application/json" \
      -d "{\"model\":\"$model\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"max_tokens\":1}" 2>/dev/null | tail -1)
    if [ "$status" = "200" ]; then
      echo "  ✓ $model (chat)"
    else
      echo "  ✗ $model (HTTP $status)"
      all_ok=false
    fi
  done

  # For non-chat models, check if they appear in the models list
  models_list=$(curl -s https://api.mistral.ai/v1/models \
    -H "Authorization: Bearer $MISTRAL_API_KEY" 2>/dev/null)
  for model in "${other_models[@]}"; do
    if echo "$models_list" | grep -q "\"$model\""; then
      echo "  ✓ $model"
    else
      echo "  ✗ $model (not found in /v1/models)"
      all_ok=false
    fi
  done
  if [ "$all_ok" = false ]; then
    echo "  ⚠ Some models are unavailable — check Mistral docs for renames/deprecations"
  fi
fi

echo ""
echo "=== ElevenLabs API check ==="
if [ -z "${ELEVENLABS_API_KEY:-}" ]; then
  echo "  ELEVENLABS_API_KEY not set, skipping"
else
  status=$(curl -s -o /dev/null -w "%{http_code}" https://api.elevenlabs.io/v1/models \
    -H "xi-api-key: $ELEVENLABS_API_KEY" 2>/dev/null || echo "ERR")
  if [ "$status" = "200" ]; then
    echo "  ✓ API key valid"
    # Check if eleven_v3 model exists
    has_v3=$(curl -s https://api.elevenlabs.io/v1/models \
      -H "xi-api-key: $ELEVENLABS_API_KEY" 2>/dev/null | node -e "
        let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{
          try{const m=JSON.parse(d);console.log(m.some(x=>x.model_id==='eleven_v3')?'yes':'no')}
          catch{console.log('unknown')}
        })" 2>/dev/null || echo "unknown")
    if [ "$has_v3" = "yes" ]; then
      echo "  ✓ eleven_v3 model available"
    elif [ "$has_v3" = "no" ]; then
      echo "  ✗ eleven_v3 model NOT found — check ElevenLabs docs"
    else
      echo "  ? eleven_v3 model status unknown"
    fi
  else
    echo "  ✗ API key invalid or service down (HTTP $status)"
  fi
fi

echo ""
echo "Done. Run 'npm update' to apply minor/patch updates within semver ranges."
