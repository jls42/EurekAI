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
  # Paquet `aipmt` (src/, depuis la 1.11) ou ancien script translate.py à la racine (≤ 1.10).
  if [ -n "$candidate" ] && { [ -f "$candidate/src/aipmt/__main__.py" ] || [ -f "$candidate/translate.py" ]; }; then
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
if [ -f "$TRANSLATOR_DIR/src/aipmt/__main__.py" ]; then
  # Lancé depuis les sources : ne dépend pas d'un `pip install` du paquet dans le venv.
  TRANSLATE_CMD=(env PYTHONPATH="$TRANSLATOR_DIR/src" "$PYTHON" -m aipmt)
else
  TRANSLATE_CMD=("$PYTHON" "$TRANSLATOR_DIR/translate.py")
fi
# Fournisseur : Codex sur l'abonnement ChatGPT (aucune facturation à l'usage), comme le
# regen_translations.sh du traducteur — l'outil n'auto-détecte plus de clé d'API payante.
# TRANSLATE_FLAGS REMPLACE ce défaut : "--use_antigravity" (abonnement Google AI Pro ou Ultra par
# le CLI agy, aipmt ≥ 1.15 : aucune clé d'API transmise à agy, et toute réponse qui ne prouve pas
# la voie abonnement est refusée) ou "--use_grok_cli --eco" si le quota Codex est épuisé.
# Sans --use_codex, --use_antigravity ni --use_grok_cli, aipmt retombe sur l'API OpenAI FACTURÉE ;
# --use_gemini est l'API Gemini facturée au token ; --use_opencode passe par le fournisseur
# configuré dans OpenCode (local, gratuit, abonnement ou CLÉ facturée, selon --model) : refusés
# sauf dérogation explicite TRANSLATE_ALLOW_PAID_API=1.
read -r -a PROVIDER_FLAGS <<< "${TRANSLATE_FLAGS:---use_codex}"
case " ${PROVIDER_FLAGS[*]} " in
  *" --use_codex "* | *" --use_antigravity "* | *" --use_grok_cli "*) ;;
  *)
    if [ "${TRANSLATE_ALLOW_PAID_API:-}" != "1" ]; then
      echo "ERROR: TRANSLATE_FLAGS='${TRANSLATE_FLAGS:-}' ne choisit aucun fournisseur sur abonnement" >&2
      echo "(--use_codex, --use_antigravity, --use_grok_cli) : API potentiellement facturée à l'usage refusée" >&2
      echo "(OpenCode compris : son fournisseur peut être une clé facturée)." >&2
      echo "Dérogation explicite : TRANSLATE_ALLOW_PAID_API=1." >&2
      exit 2
    fi
    ;;
esac
MAX_JOBS="${TRANSLATE_MAX_JOBS:-4}"
# 0 ferait boucler indéfiniment l'attente des jobs ; une valeur non numérique ferait échouer le
# test de l'attente, donc lancerait toutes les langues d'un coup (limite ignorée).
case "$MAX_JOBS" in
  '' | *[!0-9]* | 0*)
    echo "ERROR: TRANSLATE_MAX_JOBS : entier ≥ 1 attendu (reçu « $MAX_JOBS »)" >&2
    exit 2
    ;;
esac
LANGS="ar de en es hi it ja ko nl pl pt ro sv zh"

# Allow translating a single language: ./translate-readme.sh en
if [ -n "$1" ]; then
  LANGS="$1"
fi

echo "=== Translating README.md from FR to: $LANGS ==="

pids=()
# Ctrl-C / TERM : un script non interactif lance ses jobs d'arrière-plan en ignorant SIGINT. Sans
# relais, les traductions continueraient après l'arrêt (quota consommé, README-xx.md écrits avec
# --force) : TERM à chaque job, attente, puis ré-émission du signal pour arrêter le script. Un
# appel CLI déjà en vol (codex, grok…) peut finir seul, sans rien écrire.
stop_jobs() {
  if [ "${#pids[@]}" -gt 0 ]; then
    kill -TERM "${pids[@]}" 2>/dev/null || true
  fi
  wait || true
}
trap 'stop_jobs; trap - INT; kill -INT $$' INT
trap 'stop_jobs; trap - TERM; kill -TERM $$' TERM

for lang in $LANGS; do
  echo "[README] -> $lang"
  "${TRANSLATE_CMD[@]}" \
    --file "$PROJECT_DIR/README.md" \
    --target_dir "$PROJECT_DIR" \
    --source_lang fr \
    --target_lang "$lang" \
    "${PROVIDER_FLAGS[@]}" \
    --add_translation_note \
    --force &
  pids+=("$!")

  # Limit parallel jobs
  while [ "$(jobs -r | wc -l)" -ge "$MAX_JOBS" ]; do
    sleep 1
  done
done

# `wait` sans argument renvoie toujours 0 : attendre chaque job pour qu'une langue en échec
# fasse échouer le script au lieu de laisser une traduction périmée en silence.
failed=0
for pid in "${pids[@]}"; do
  wait "$pid" || failed=$((failed + 1))
done
echo "=== DONE ==="
ls -1 "$PROJECT_DIR"/README-*.md 2>/dev/null
if [ "$failed" -gt 0 ]; then
  echo "ERROR: $failed traduction(s) en échec" >&2
  exit 1
fi
