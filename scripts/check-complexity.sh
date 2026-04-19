#!/bin/bash
# Garde-fou cyclomatic complexity via Lizard. Prévient les régressions sur
# tout le repo après la campagne de dette qualité (Wave 6, 2026-04-19).
#
# Threshold : 8 (aligné sur Codacy, default Lizard est 15).
# Scope : TOUT le repo (plus d'allowlist — dette CCN éradiquée sur 3404
# fonctions TS). Lizard exclut automatiquement node_modules.
#
# CAVEAT IMPORTANT (appris le 2026-04-18) : Lizard en mode walk-dossier
# avec `-l javascript` ne parse PAS les .ts — il ne trouve donc aucune
# violation. Il faut `-l typescript` explicitement.
#
# Pièges connus à garder en tête quand on ajoute du code :
# - `??=` et `??` comptent 2 dans le CCN (nullish check + truly).
# - Plusieurs `function` top-level non exportées consécutives peuvent être
#   agglomérées par le parseur TS (faux positif de CCN). Workaround :
#   `export function` ou intercaler du code (const, classe).
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
  .
