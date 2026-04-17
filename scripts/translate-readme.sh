#!/bin/bash
set -e
# Translate README.md (FR) to all supported languages using ai-powered-markdown-translator

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Cherche l'outil dans TRANSLATOR_DIR (override), puis dans les chemins standards.
# Permet aux setups qui rangent les projets sous ~/git/ai/ de fonctionner.
CANDIDATES=(
  "${TRANSLATOR_DIR:-}"
  "$HOME/git/ai-powered-markdown-translator"
  "$HOME/git/ai/ai-powered-markdown-translator"
)
TRANSLATOR_DIR=""
for candidate in "${CANDIDATES[@]}"; do
  if [ -n "$candidate" ] && [ -f "$candidate/translate.py" ]; then
    TRANSLATOR_DIR="$candidate"
    break
  fi
done

if [ -z "$TRANSLATOR_DIR" ]; then
  echo "ERROR: ai-powered-markdown-translator not found. Checked: ${CANDIDATES[*]}" >&2
  echo "Set TRANSLATOR_DIR env var to override." >&2
  exit 1
fi

PYTHON="$TRANSLATOR_DIR/venv/bin/python"
TRANSLATE="$TRANSLATOR_DIR/translate.py"
MAX_JOBS=10
LANGS="ar de en es hi it ja ko nl pl pt ro sv zh"

# Allow translating a single language: ./translate-readme.sh en
if [ -n "$1" ]; then
  LANGS="$1"
fi

echo "=== Translating README.md from FR to: $LANGS ==="

for lang in $LANGS; do
  echo "[README] -> $lang"
  "$PYTHON" "$TRANSLATE" \
    --file "$PROJECT_DIR/README.md" \
    --target_dir "$PROJECT_DIR" \
    --source_lang fr \
    --target_lang "$lang" \
    --eco \
    --add_translation_note \
    --force &

  # Limit parallel jobs
  while [ $(jobs -r | wc -l) -ge $MAX_JOBS ]; do
    sleep 1
  done
done

wait
echo "=== DONE ==="
ls -1 "$PROJECT_DIR"/README-*.md 2>/dev/null
