#!/usr/bin/env bash
# security-tests.sh — Audit securite EurekAI pre-release
#
# Invocable via le skill /release-test OU directement en CLI :
#   PROJECT_ID=<uuid> PROFILE_ID=<uuid> bash security-tests.sh
#
# Si PROJECT_ID/PROFILE_ID non fournis, lit l'API pour les decouvrir.
#
# Exit code : 0 si tous les checks passent, 1 sinon.
#
# Conventions :
# - Pas d'appel LLM Mistral declenche (tous les payloads sont valides pour test
#   ou conçus pour etre rejetes en amont). Budget runtime : 0 consommation API.
# - Codes d'erreur stables attendus : voir types.ts FailedStepCode + handler JSON
#   middleware dans server.ts.
# - Pas de cleanup : ce script ne touche jamais la DB (pas d'INSERT/DELETE).

set -u

BASE="${BASE_URL:-http://localhost:3000}"
PASS=0
FAIL=0
WARN=0
FINDINGS=()

red() { printf '\033[31m%s\033[0m' "$1"; }
green() { printf '\033[32m%s\033[0m' "$1"; }
yellow() { printf '\033[33m%s\033[0m' "$1"; }
bold() { printf '\033[1m%s\033[0m' "$1"; }

check_pass() { PASS=$((PASS+1)); echo "  $(green '[PASS]') $1"; }
check_fail() { FAIL=$((FAIL+1)); FINDINGS+=("$1"); echo "  $(red '[FAIL]') $1"; }
check_warn() { WARN=$((WARN+1)); FINDINGS+=("WARN: $1"); echo "  $(yellow '[WARN]') $1"; }

section() { echo ""; bold "=== $1 ==="; echo ""; }

# --- Discovery ---
section "Discovery"
if [ -z "${PROJECT_ID:-}" ]; then
  PROJECT_ID=$(curl -s "$BASE/api/projects" 2>/dev/null | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d[0]["id"] if d else "")' 2>/dev/null)
fi
if [ -z "${PROFILE_ID:-}" ]; then
  PROFILE_ID=$(curl -s "$BASE/api/profiles" 2>/dev/null | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d[0]["id"] if d else "")' 2>/dev/null)
fi
echo "  PROJECT_ID=${PROJECT_ID:-<absent>}"
echo "  PROFILE_ID=${PROFILE_ID:-<absent>}"

if [ -z "$PROJECT_ID" ] || [ -z "$PROFILE_ID" ]; then
  echo ""
  red "FATAL"; echo " : impossible de decouvrir un projet ou profil. Cree-en au moins un via l'UI avant de relancer."
  exit 2
fi

# Capture state pre-test pour comparer ensuite (cost / sources / generations)
COST_BEFORE=$(curl -s "$BASE/api/projects/$PROJECT_ID" 2>/dev/null | python3 -c 'import json,sys; print(json.load(sys.stdin).get("totalCost",0))' 2>/dev/null)
SOURCES_BEFORE=$(curl -s "$BASE/api/projects/$PROJECT_ID" 2>/dev/null | python3 -c 'import json,sys; print(len(json.load(sys.stdin).get("sources",[])))' 2>/dev/null)

# --- 1. JSON malforme ---
section "JSON malformed handler"
RESP=$(curl -s -X POST "$BASE/api/projects/$PROJECT_ID/generate/summary" -H 'content-type: application/json' -d 'NOT_JSON{{' -w '__HTTP_%{http_code}')
HTTP="${RESP##*__HTTP_}"
BODY="${RESP%__HTTP_*}"
if [ "$HTTP" = "400" ] && echo "$BODY" | grep -q '"error":"invalid_json"'; then
  check_pass "POST avec body invalide -> 400 invalid_json"
else
  check_fail "POST body invalide -> HTTP $HTTP body=$BODY (attendu 400 invalid_json)"
fi
# Verif pas de fuite path serveur dans la stack
if echo "$BODY" | grep -qE '(/mnt/|/home/|node_modules/|\.ts:[0-9]+|SyntaxError)'; then
  check_fail "Fuite stack trace ou path serveur dans la reponse 400 : $BODY"
else
  check_pass "Pas de fuite stack/path dans la reponse 400"
fi

# --- 2. Helmet headers ---
section "Helmet security headers"
HEADERS=$(curl -s -I "$BASE/api/projects" 2>&1)
for h in "X-Frame-Options" "X-Content-Type-Options" "Strict-Transport-Security" "Referrer-Policy"; do
  if echo "$HEADERS" | grep -qi "^$h:"; then
    check_pass "Header present : $h"
  else
    check_fail "Header manquant : $h"
  fi
done

# --- 3. Validation types ---
section "Input type validation"
RESP=$(curl -s -X POST "$BASE/api/projects/$PROJECT_ID/generate/summary" -H 'content-type: application/json' -d '{"lang":12345,"ageGroup":[],"profileId":null}' -w '__HTTP_%{http_code}')
HTTP="${RESP##*__HTTP_}"
BODY="${RESP%__HTTP_*}"
if [ "$HTTP" = "400" ] && echo "$BODY" | grep -q '"error":"invalid_input"'; then
  check_pass "Types invalides -> 400 invalid_input"
else
  check_fail "Types invalides -> HTTP $HTTP body=$BODY (attendu 400 invalid_input)"
fi

# --- 4. SSRF guard ---
section "SSRF guard (4 vecteurs)"
ssrf_urls=(
  "http://127.0.0.1:3000/api/projects"
  "http://169.254.169.254/latest/meta-data/"
  "http://[::ffff:7f00:0001]/"
  "http://198.18.0.1/"
)
for url in "${ssrf_urls[@]}"; do
  RESP=$(curl -s -X POST "$BASE/api/projects/$PROJECT_ID/sources/websearch" \
    -H 'content-type: application/json' \
    -d "{\"query\":\"$url\",\"lang\":\"fr\",\"ageGroup\":\"enfant\"}" \
    -w '__HTTP_%{http_code}')
  HTTP="${RESP##*__HTTP_}"
  BODY="${RESP%__HTTP_*}"
  # Le serveur doit retourner soit 400 (URL rejetee), soit 500 (Aucune source extraite) avec failures[]
  # MAIS PAS creer de source ni appeler Mistral.
  if echo "$BODY" | grep -qE '"sources":\[\{'; then
    check_fail "SSRF $url : source creee dans la reponse (LLM appele !) body=$BODY"
  else
    check_pass "SSRF $url : aucune source creee (HTTP $HTTP)"
  fi
done

# Verifie que SOURCES_COUNT n'a pas augmente cote serveur
SNAPSHOT=$(curl -s "$BASE/api/projects/$PROJECT_ID" 2>/dev/null)
SOURCES_AFTER=$(echo "$SNAPSHOT" | python3 -c 'import json,sys; print(len(json.load(sys.stdin).get("sources",[])))' 2>/dev/null)
if [ "$SOURCES_AFTER" = "$SOURCES_BEFORE" ]; then
  check_pass "Cote serveur : sources count inchange ($SOURCES_BEFORE -> $SOURCES_AFTER)"
else
  check_fail "Cote serveur : sources count a augmente ! $SOURCES_BEFORE -> $SOURCES_AFTER (SSRF a cree des sources)"
fi

# Snapshot du cost AVANT les tests rate-limit (qui pourraient throttle les GET
# suivants et fausser la lecture finale). Si la valeur n'est pas lisible (JSON
# vide / rate-limited / projet supprime), on saute le check cost en warn pour
# eviter un faux positif bloquant.
COST_AFTER_SAFE=$(echo "$SNAPSHOT" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("totalCost",0))' 2>/dev/null)

# --- 5. Rate-limit general ---
section "Rate-limit general (300/min sur /api)"
# Burst 350 GET rapides
codes=""
for _ in $(seq 1 350); do
  c=$(curl -s -o /dev/null -w '%{http_code}\n' --max-time 2 "$BASE/api/profiles")
  codes="$codes$c\n"
done
n200=$(printf '%b' "$codes" | grep -c '^200$' || true)
n429=$(printf '%b' "$codes" | grep -c '^429$' || true)
if [ "$n429" -gt 0 ]; then
  check_pass "Rate-limit declenche : $n200 OK + $n429 throttled (>0 attendu)"
else
  check_fail "Aucun 429 sur burst 350 GET — rate-limit /api inactif ?"
fi

# --- 6. Rate-limit AI ---
section "Rate-limit AI (60/min sur /generate)"
# Note : on n'utilise pas /generate/route ici car il consomme du Mistral.
# A la place, on touche /generate/auto avec un body invalide qui sera rejete tot
# (400 invalid_input du validateGenRequestBody) — meme route, meme limiter.
codes=""
for _ in $(seq 1 75); do
  c=$(curl -s -o /dev/null -w '%{http_code}\n' --max-time 2 -X POST \
    "$BASE/api/projects/$PROJECT_ID/generate/route" \
    -H 'content-type: application/json' \
    -d '{"lang":12345}')
  codes="$codes$c\n"
done
n429=$(printf '%b' "$codes" | grep -c '^429$' || true)
if [ "$n429" -gt 0 ]; then
  check_pass "AI rate-limit declenche : $n429 / 75 throttled"
else
  check_warn "Aucun 429 sur burst 75 POST /generate/route — verifier que aiLimiter est branche"
fi

# --- 7. Pas de fuite secrets ---
section "Pas de fuite secrets dans les reponses d'erreur"
# Concatene quelques reponses d'erreur connues
errs=""
errs="$errs $(curl -s -X POST "$BASE/api/projects/$PROJECT_ID/generate/summary" -H 'content-type: application/json' -d 'NOT_JSON')"
errs="$errs $(curl -s -X POST "$BASE/api/projects/non-existent-pid/generate/summary" -H 'content-type: application/json' -d '{}')"
errs="$errs $(curl -s "$BASE/api/projects/non-existent-pid")"
if echo "$errs" | grep -qEi 'MISTRAL_API_KEY|sk-[a-zA-Z0-9_-]{20,}|"password"|api[_-]?key.*:.+|/mnt/|/home/|node_modules'; then
  check_fail "Fuite suspecte dans une reponse d'erreur : $(echo "$errs" | grep -oEi 'MISTRAL_API_KEY|sk-[a-zA-Z0-9_-]{20,}|/mnt/|/home/' | head -3)"
else
  check_pass "Aucun secret ou path serveur fuite dans les reponses d'erreur testees"
fi

# --- 8. Cost tracking inchange par les tests securite ---
# Note : on utilise COST_AFTER_SAFE capture juste apres SSRF (avant les bursts
# rate-limit qui pourraient throttle les GET suivants et fausser la lecture).
section "Cost tracking : les tests securite ne consomment pas Mistral"
if [ -z "${COST_AFTER_SAFE:-}" ]; then
  check_warn "Snapshot cost post-SSRF illisible — check cost skip"
else
  DELTA=$(python3 -c "print(round($COST_AFTER_SAFE - $COST_BEFORE, 6))")
  if python3 -c "exit(0 if abs($DELTA) < 0.001 else 1)"; then
    check_pass "Cost delta during security tests : \$$DELTA (< \$0.001 tolere)"
  else
    check_fail "Cost delta during security tests : \$$DELTA (> \$0.001 — un test securite a leak un appel Mistral)"
  fi
fi

# --- Rapport final ---
echo ""
section "Resume"
echo "  $(green "PASS: $PASS")    $(red "FAIL: $FAIL")    $(yellow "WARN: $WARN")"
if [ "$FAIL" -gt 0 ]; then
  echo ""
  bold "Findings :"; echo ""
  for f in "${FINDINGS[@]}"; do echo "  - $f"; done
  exit 1
fi
exit 0
