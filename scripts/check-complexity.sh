#!/bin/bash
# Garde-fou cyclomatic complexity via Lizard. Prévient les régressions sur
# les fichiers que Codacy a historiquement flaggés (faux positifs de parsing
# ou vraie complexité excessive).
#
# Threshold : 8 (aligné sur Codacy, default Lizard est 15).
# Scope actuel : helpers/error-*.ts. À élargir quand le legacy sera refactoré.
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
  helpers/error-code-resolution.ts \
  helpers/error-matchers.ts \
  helpers/error-code-rules.ts \
  helpers/error-codes.ts
