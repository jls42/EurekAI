#!/bin/bash
# Garde-fou cyclomatic complexity via Lizard. Prévient les régressions sur
# les fichiers que Codacy a historiquement flaggés (faux positifs de parsing
# ou vraie complexité excessive).
#
# Threshold : 8 (aligné sur Codacy, default Lizard est 15).
# Scope : ALLOWLIST de fichiers déjà propres (0 fonction > CCN 8).
# Tout ajout à l'allowlist requiert un scan `-l typescript` vert.
#
# CAVEAT IMPORTANT (appris le 2026-04-18) : Lizard en mode walk-dossier
# avec `-l javascript` ne parse PAS les .ts — il ne trouve donc aucune
# violation. Il faut `-l typescript` explicitement. La liste complète
# des 23 fonctions > CCN 8 ailleurs dans le repo est documentée dans
# `.claude/todo-tooling.md` section "Refactor progressif Lizard CCN".
#
# Requiert : pipx (https://pipx.pypa.io).
set -euo pipefail

if ! command -v pipx >/dev/null 2>&1; then
  echo "error: pipx non trouvé — installer depuis https://pipx.pypa.io" >&2
  exit 1
fi

pipx run lizard \
  --CCN 8 \
  --warnings_only \
  -i 0 \
  -l typescript \
  helpers/error-code-resolution.ts \
  helpers/error-matchers.ts \
  helpers/error-code-rules.ts \
  helpers/error-codes.ts \
  helpers/choice-labels.ts \
  helpers/cost-calc.ts \
  helpers/index.ts \
  helpers/tracked-client.ts \
  helpers/voice-selection.ts \
  src/app/helpers.ts \
  config.ts \
  scripts/update-pricing.ts \
  scripts/generate-image.ts \
  routes/chat.ts \
  routes/generate.ts \
  routes/generations.ts \
  routes/profiles.ts \
  routes/sources.ts
