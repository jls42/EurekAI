#!/bin/bash
set -e
# Translate README.md (FR) to all supported languages using ai-powered-markdown-translator

TRANSLATOR_DIR="$HOME/git/ai-powered-markdown-translator"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ ! -f "$TRANSLATOR_DIR/translate.py" ]; then
  echo "ERROR: ai-powered-markdown-translator not found in $TRANSLATOR_DIR" >&2
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
