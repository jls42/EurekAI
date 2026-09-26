#!/usr/bin/env bash
# security-tests.sh — Audit securite EurekAI pre-release
#
# Invocable via le skill /release-test OU directement en CLI :
#   PROJECT_ID=<uuid> PROFILE_ID=<uuid> bash security-tests.sh
#
# Si PROJECT_ID/PROFILE_ID non fournis, lit l'API pour les decouvrir.
#
# Rafale de PIN faux (section 7) desactivee par defaut : PIN_BURST=1 l'active, sur
# PIN_PROFILE_ID (sinon PROFILE_ID), qui doit avoir un PIN. Elle bloque les PIN de cette IP
# pendant 15 min (DELETE de nettoyage compris) : redemarrer le serveur de dev remet les
# compteurs des limiteurs a zero (stockage memoire).
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

# --- 2bis. /output ne sert que les medias ---
# profiles.json contient les hash des PIN parentaux (sha256 sans sel d'un code a 4 chiffres) :
# le servir contournerait tout le controle parental. Idem config.json et les project.json.
section "Static /output (medias seulement)"
for p in "profiles.json" "config.json" "projects.json" "projects/$PROJECT_ID/project.json" "projects/%2e%2e/profiles.json"; do
  CODE=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/output/$p")
  if [ "$CODE" = "404" ]; then
    check_pass "/output/$p -> 404"
  else
    check_fail "/output/$p -> HTTP $CODE (attendu 404 : fichier de donnees expose)"
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
  # Rejet par la garde SSRF : 422 {"error":"url_blocked","failures":[{label,code:"url_blocked"}]},
  # SANS source creee ni appel Mistral (ni scraping, ni repli par la recherche web).
  if [ "$HTTP" = "422" ] && echo "$BODY" | grep -q '"error":"url_blocked"' \
    && echo "$BODY" | grep -q '"code":"url_blocked"'; then
    check_pass "SSRF $url : 422 url_blocked"
  else
    check_fail "SSRF $url : HTTP $HTTP body=$BODY (attendu 422 url_blocked)"
  fi
  if echo "$BODY" | grep -qE '"sources":\[\{'; then
    check_fail "SSRF $url : source creee dans la reponse (LLM appele !) body=$BODY"
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

# Snapshot du cost AVANT les rafales rate-limit (qui throttlent ensuite les GET
# jusqu'a 60 s). Si la valeur n'est pas lisible (JSON vide / rate-limited / projet
# supprime), on saute le check cost en warn pour eviter un faux positif bloquant.
COST_AFTER_SAFE=$(echo "$SNAPSHOT" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("totalCost",0))' 2>/dev/null)

# --- 5. Pas de fuite secrets ---
# AVANT les rafales : apres elles, generalLimiter repond 429 a la place des routes testees.
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

# --- 6. Cost tracking inchange par les tests securite ---
# Note : on utilise COST_AFTER_SAFE capture juste apres SSRF (avant les rafales
# rate-limit qui throttlent les GET suivants et fausseraient la lecture).
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

# Refus d'un limiteur : 429, corps {"error":"rate_limited"} (code stable, jamais de texte
# libre), en-tete Retry-After et en-tete RateLimit du limiteur attendu (limit=N : 10 PIN,
# 60 IA, 300 general). Arguments : libelle, limite attendue, puis les arguments curl.
check_rate_limited() {
  local label="$1" limit="$2"
  shift 2
  local hdrs body http
  hdrs=$(mktemp)
  body=$(mktemp)
  http=$(curl -s -D "$hdrs" -o "$body" -w '%{http_code}' --max-time 5 "$@")
  if [ "$http" = "429" ] && grep -q '"error":"rate_limited"' "$body" \
    && grep -qiE '^retry-after: *[0-9]+' "$hdrs" \
    && grep -qiE "^ratelimit: *limit=$limit," "$hdrs"; then
    check_pass "$label : 429 rate_limited + Retry-After (limit=$limit)"
  else
    check_fail "$label : HTTP $http body=$(cat "$body") (attendu 429 rate_limited + Retry-After + RateLimit limit=$limit)"
  fi
  rm -f "$hdrs" "$body"
}

# --- 7. Rate-limit PIN (optionnel : PIN_BURST=1) ---
# pinLimiter : 10 PIN faux / 15 min par IP sur PUT/DELETE /api/profiles/:id, seuls les 403
# comptent. Le PUT ne porte que le PIN (aucun champ) : rien n'est modifie. Au-dela, TOUT PIN de
# cette IP (bon compris) recoit 429 pendant la fenetre : section desactivee par defaut, a lancer
# en dernier recours ou suivie d'un redemarrage du serveur de dev.
section "Rate-limit PIN (10 PIN faux / 15 min, optionnel)"
if [ "${PIN_BURST:-0}" != "1" ]; then
  echo "  (saute : PIN_BURST=1 pour l'activer — bloque les PIN de cette IP 15 min)"
else
  PIN_TARGET="${PIN_PROFILE_ID:-$PROFILE_ID}"
  HAS_PIN=$(curl -s "$BASE/api/profiles" | PIN_TARGET="$PIN_TARGET" python3 -c 'import json,os,sys; t=os.environ["PIN_TARGET"]; print(next((str(p.get("hasPin")).lower() for p in json.load(sys.stdin) if p.get("id")==t), "absent"))' 2>/dev/null)
  if [ "$HAS_PIN" != "true" ]; then
    check_warn "Rate-limit PIN saute : profil $PIN_TARGET sans PIN (fournir PIN_PROFILE_ID)"
  else
    put_pin() {
      curl -s -o /dev/null -w '%{http_code}' --max-time 5 -X PUT "$BASE/api/profiles/$PIN_TARGET" \
        -H 'content-type: application/json' -d "{\"pin\":\"$1\"}"
    }
    # PIN faux : 0000, sauf si c'est le bon PIN (200 : non compte) → 1111.
    WRONG_PIN="0000"
    probe=$(put_pin "$WRONG_PIN")
    if [ "$probe" = "200" ]; then
      WRONG_PIN="1111"
      probe=$(put_pin "$WRONG_PIN")
    fi
    codes="$probe"
    last="$probe"
    while [ "$last" = "403" ] && [ "$(echo "$codes" | wc -w)" -le 11 ]; do
      last=$(put_pin "$WRONG_PIN")
      codes="$codes $last"
    done
    n403=$(echo "$codes" | tr ' ' '\n' | grep -c '^403$' || true)
    if [ "$last" = "429" ] && [ "$n403" -le 10 ]; then
      check_pass "PIN faux : $n403 refus 403 puis 429 (<= 10 attendu)"
    else
      check_fail "PIN faux : codes=$codes (attendu au plus 10 x 403 puis 429)"
    fi
    check_rate_limited "PUT PIN faux au-dela de 10" 10 -X PUT "$BASE/api/profiles/$PIN_TARGET" \
      -H 'content-type: application/json' -d "{\"pin\":\"$WRONG_PIN\"}"
  fi
fi

# --- 8. Rate-limit AI ---
section "Rate-limit AI (60/min sur les routes IA)"
# AVANT la rafale generale : apres elle, generalLimiter (300/min) repond 429 a la place de
# aiLimiter. On burst /generate/summary avec un body invalide (lang non-string) : rejete en
# 400 invalid_input par validateGenRequestBody AVANT tout appel LLM (cf. section 3)
# ET avant addPendingEntry (pas de pending orphelin), tout en passant par le MEME
# aiLimiter (AI_PATH_RE, helpers/rate-limit.ts) → on observe les 429.
# IMPORTANT : NE PAS utiliser /generate/route ici. Cette route est lenient
# (`lang = req.body.lang || 'fr'`) et EXECUTE le routeur LLM (cout ~$0.0009/appel)
# au lieu de rejeter — un burst non throttle facturerait le run et fausserait le
# cost-tracking. /generate/summary ne coute jamais rien sur body invalide.
codes=""
for _ in $(seq 1 75); do
  c=$(curl -s -o /dev/null -w '%{http_code}\n' --max-time 2 -X POST \
    "$BASE/api/projects/$PROJECT_ID/generate/summary" \
    -H 'content-type: application/json' \
    -d '{"lang":12345}')
  codes="$codes$c\n"
done
n429=$(printf '%b' "$codes" | grep -c '^429$' || true)
if [ "$n429" -gt 0 ]; then
  check_pass "AI rate-limit declenche : $n429 / 75 throttled"
else
  check_fail "Aucun 429 sur burst 75 POST /generate/summary — verifier que aiPathLimiter est branche"
fi
check_rate_limited "POST /generate/summary au-dela de 60/min" 60 -X POST \
  "$BASE/api/projects/$PROJECT_ID/generate/summary" \
  -H 'content-type: application/json' -d '{"lang":12345}'

# --- 9. Rate-limit general ---
section "Rate-limit general (300/min sur /api)"
# Cible /api/projects (generalLimiter seul). JAMAIS /api/profiles : le PIN a son propre
# limiteur, et une rafale sur les profils y bloquerait le nettoyage du profil de test.
# Derniere rafale du script : generalLimiter reste sature jusqu'a 60 s ensuite.
codes=""
for _ in $(seq 1 350); do
  c=$(curl -s -o /dev/null -w '%{http_code}\n' --max-time 2 "$BASE/api/projects")
  codes="$codes$c\n"
done
n200=$(printf '%b' "$codes" | grep -c '^200$' || true)
n429=$(printf '%b' "$codes" | grep -c '^429$' || true)
if [ "$n429" -gt 0 ]; then
  check_pass "Rate-limit declenche : $n200 OK + $n429 throttled (>0 attendu)"
else
  check_fail "Aucun 429 sur burst 350 GET /api/projects — rate-limit /api inactif ?"
fi
check_rate_limited "GET /api/projects au-dela de 300/min" 300 "$BASE/api/projects"

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
