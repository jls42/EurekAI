#!/usr/bin/env bash
# Checks rapides exécutés AVANT lint-staged et npm test.
# Doit rester < 1s pour ne pas pénaliser la boucle commit.
# Toute règle qui prend > 100ms doit aller dans pretest, pas ici.
set -euo pipefail

fail=0

# 1. Marqueurs de merge conflict + whitespace errors dans le staged.
# `git diff --check --cached` couvre les deux cas en un appel.
if ! git diff --check --cached >/dev/null 2>&1; then
  echo "✗ Merge conflict markers ou whitespace errors dans les fichiers staged :"
  git diff --check --cached || true
  echo "  Fix : résoudre les conflits ou nettoyer les espaces avant de committer."
  fail=1
fi

# 2. Fichiers staged > 500 ko (binaires accidentels : audio TTS, dumps, images IA).
# Le projet génère beaucoup de gros fichiers en runtime — un `git add` distrait
# peut les capturer. Plus tard ils sont durs à retirer de l'historique.
# Exception : docs/screenshots/ = médias curés du README (GIFs de démo), gros par
# nature et ajoutés volontairement — le garde anti-accident ne s'y applique pas.
MAX_KB=500
large_files=$(git diff --cached --name-only --diff-filter=A | while IFS= read -r f; do
  case "$f" in docs/screenshots/*) continue ;; esac
  [ -f "$f" ] || continue
  size_kb=$(($(wc -c < "$f") / 1024))
  if [ "$size_kb" -gt "$MAX_KB" ]; then
    echo "  $f ($size_kb KB)"
  fi
done)
if [ -n "$large_files" ]; then
  echo "✗ Fichiers staged > ${MAX_KB} KB (probable binaire accidentel) :"
  echo "$large_files"
  echo "  Fix : ajouter au .gitignore + git restore --staged <file>"
  echo "  Forcer malgré tout : git commit --no-verify (à éviter)"
  fail=1
fi

# 3. shellcheck sur les scripts shell staged (si dispo).
# Volontairement optionnel : pas de devDep npm, install via apt/brew au besoin.
if command -v shellcheck >/dev/null 2>&1; then
  staged_sh=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(sh|bash)$' || true)
  if [ -n "$staged_sh" ]; then
    if ! echo "$staged_sh" | xargs shellcheck -x; then
      echo "✗ shellcheck a trouvé des problèmes (cf. ci-dessus)."
      echo "  Fix : corriger les warnings shellcheck dans les scripts staged."
      fail=1
    fi
  fi
else
  # Warn une seule fois si scripts shell touchés sans shellcheck installé.
  if git diff --cached --name-only --diff-filter=ACMR | grep -qE '\.(sh|bash)$'; then
    echo "⚠ shellcheck non installé — scripts shell staged non vérifiés."
    echo "  Install : sudo apt install shellcheck  (ou brew install shellcheck)"
  fi
fi

exit $fail
