#!/bin/bash
# Garde-fou SAST via Opengrep (fork open-source de Semgrep CE).
# Couvre SSRF, XSS, injection, secrets hardcodes, timing attacks, etc.
#
# Scope : code prod uniquement (*.test.ts et fixtures exclus).
# Severity : ERROR uniquement (WARNING/NOTE notes dans todo-tooling.md).
# Configs : security-audit + default + nodejsscan (couverture Node/JS/TS pertinente).
# Requiert : opengrep installe dans ~/.local/bin/ (voir scripts/install-opengrep.sh).
set -euo pipefail

# Rend le binaire visible meme si ~/.local/bin n'est pas dans PATH.
export PATH="$HOME/.local/bin:$PATH"

if ! command -v opengrep >/dev/null 2>&1; then
  echo "error: opengrep non trouve — lancer scripts/install-opengrep.sh" >&2
  exit 1
fi

# Exclusions de regles (faux positifs documentes) :
# - detected-sonarqube-docs-api-key : match sur SHA256 d'un commit GitHub Actions
#   pinne (ex: SonarSource/sonarqube-scan-action@fd88b7d...), pas une vraie API key.
EXCLUDED_RULES=(
  "generic.secrets.security.detected-sonarqube-docs-api-key.detected-sonarqube-docs-api-key"
)

exclude_args=()
for rule in "${EXCLUDED_RULES[@]}"; do
  exclude_args+=(--exclude-rule="$rule")
done

exec opengrep scan \
  --config=p/security-audit \
  --config=p/default \
  --config=p/nodejsscan \
  --severity=ERROR \
  --error \
  --exclude=node_modules \
  --exclude=dist \
  --exclude=output \
  --exclude=coverage \
  --exclude=.scannerwork \
  --exclude=public \
  --exclude='*.test.ts' \
  "${exclude_args[@]}" \
  .
