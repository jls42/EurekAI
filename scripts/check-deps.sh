#!/bin/bash
# Check for outdated dependencies, API model availability, and collect changelogs.
# Output is structured for human reading and LLM analysis (used by /check-sdk-updates skill).
set -euo pipefail

echo "=== Outdated npm packages ==="
npm outdated 2>/dev/null || true

echo ""
echo "=== Critical SDK versions ==="
pkg="@mistralai/mistralai"
current=$(node -e "try{const v=JSON.parse(require('fs').readFileSync(require('path').resolve('node_modules','$pkg','package.json'),'utf8')).version; console.log(v.replace(/^v/,''))}catch{console.log('N/A')}" 2>/dev/null)
latest=$(npm view "$pkg" version 2>/dev/null | sed 's/^v//' || echo "N/A")
if [ "$current" = "$latest" ]; then
  echo "  ✓ $pkg: $current"
else
  echo "  ⬆ $pkg: $current -> $latest (UPDATE AVAILABLE)"
fi

echo ""
echo "=== Security audit (transitive vulnerabilities) ==="
# npm audit exit non-zero quand des vulns sont trouvees -> ne pas propager au script.
# Couvre les deps transitives (npm outdated ne les voit pas : bug historique protobufjs
# via @google/genai, detecte seulement par Dependabot, rate par ce script avant fix).
audit_json=$(npm audit --json 2>/dev/null || true)
if [ -n "$audit_json" ]; then
  echo "$audit_json" | node -e "
    const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{
      try{
        const a=JSON.parse(d.join(''));
        const v=a.metadata&&a.metadata.vulnerabilities||{};
        const total=Object.values(v).reduce((s,n)=>s+n,0);
        if(total===0){console.log('  ✓ No known vulnerabilities');return;}
        const parts=['critical','high','moderate','low','info']
          .filter(k=>v[k]>0).map(k=>k+': '+v[k]);
        console.log('  ⚠ '+total+' vuln(s) — '+parts.join(', '));
        const advs=a.vulnerabilities||{};
        for(const name of Object.keys(advs).slice(0,10)){
          const info=advs[name];
          const sev=info.severity||'?';
          const via=(info.via||[]).map(x=>typeof x==='string'?x:x.title||x.source).slice(0,2).join('; ');
          console.log('    - '+name+' ('+sev+') '+via);
        }
        console.log('  Run: npm audit fix  (or merge pending Dependabot PR)');
      }catch(e){console.log('  (audit parse failed: '+e.message+')');}
    })
  "
else
  echo "  (npm audit returned no output)"
fi

# Load env if needed
if [ -z "${MISTRAL_API_KEY:-}" ]; then
  # shellcheck disable=SC1091
  source .env 2>/dev/null || true
fi

echo ""
echo "=== Mistral API model check ==="
if [ -z "${MISTRAL_API_KEY:-}" ]; then
  echo "  MISTRAL_API_KEY not set, skipping"
else
  # Chat models — tested via /v1/chat/completions
  chat_models=("mistral-large-latest" "mistral-small-latest")
  # Non-chat models — tested via /v1/models listing
  other_models=("mistral-ocr-latest" "voxtral-mini-latest" "voxtral-mini-tts-latest" "mistral-moderation-latest")
  all_ok=true

  for model in "${chat_models[@]}"; do
    status=$(curl -s -w "\n%{http_code}" -X POST https://api.mistral.ai/v1/chat/completions \
      -H "Authorization: Bearer $MISTRAL_API_KEY" \
      -H "Content-Type: application/json" \
      -d "{\"model\":\"$model\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"max_tokens\":1}" 2>/dev/null | tail -1)
    if [ "$status" = "200" ]; then
      echo "  ✓ $model (chat)"
    else
      echo "  ✗ $model (HTTP $status)"
      all_ok=false
    fi
  done

  # For non-chat models, check if they appear in the models list
  models_list=$(curl -s https://api.mistral.ai/v1/models \
    -H "Authorization: Bearer $MISTRAL_API_KEY" 2>/dev/null)
  for model in "${other_models[@]}"; do
    if echo "$models_list" | grep -q "\"$model\""; then
      echo "  ✓ $model"
    else
      echo "  ✗ $model (not found in /v1/models)"
      all_ok=false
    fi
  done
  if [ "$all_ok" = false ]; then
    echo "  ⚠ Some models are unavailable — check Mistral docs for renames/deprecations"
  fi
fi

# ── Changelogs with persistent state (disable strict mode for robustness) ──
set +eo pipefail
echo ""
echo "=== Changelogs (all watched packages) ==="

STATE_FILE="output/.deps-checked.json"
DEFAULT_SINCE="2025-05-01T00:00:00Z"
MAX_PER_PKG=5

# Packages to watch: "npm-name|github-owner/repo"
WATCHED_PKGS=(
  "@mistralai/mistralai|mistralai/client-ts"
  "@google/genai|googleapis/js-genai"
  "alpinejs|alpinejs/alpine"
  "lucide|lucide-icons/lucide"
  "marked|markedjs/marked"
)

# Load state file
if [ -f "$STATE_FILE" ]; then
  state_json=$(cat "$STATE_FILE")
else
  state_json="{}"
fi

now=$(date -u +%Y-%m-%dT%H:%M:%SZ)

for entry in "${WATCHED_PKGS[@]}"; do
  IFS='|' read -r pkg repo <<< "$entry"

  # Installed version
  cur=$(node -e "try{console.log(JSON.parse(require('fs').readFileSync(require('path').resolve('node_modules','$pkg','package.json'),'utf8')).version)}catch{console.log('?')}" 2>/dev/null)

  # Since date from state (or default)
  since=$(echo "$state_json" | node -e "
    const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{
      try{const s=JSON.parse(d.join(''));console.log(s[process.argv[1]]?.checkedAt||'$DEFAULT_SINCE')}
      catch{console.log('$DEFAULT_SINCE')}
    })
  " "$pkg" 2>/dev/null)

  echo ""
  echo "--- $pkg (installed: $cur, since: ${since:0:10}) ---"

  # Fetch all releases with pagination (GitHub max: 100/page)
  tmp_releases=$(mktemp)
  echo "[]" > "$tmp_releases"
  page=1
  fetch_failed=false
  while true; do
    if ! page_json=$(curl -sf "https://api.github.com/repos/$repo/releases?per_page=100&page=$page" 2>/dev/null); then
      fetch_failed=true
      break
    fi
    page_count=$(echo "$page_json" | node -e "
      const fs=require('fs');
      const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{
        try{
          const page=JSON.parse(d.join(''));
          const prev=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));
          fs.writeFileSync(process.argv[1],JSON.stringify([...prev,...page]));
          console.log(page.length);
        }catch{console.log('0');}
      })
    " "$tmp_releases" 2>/dev/null)
    if [ "${page_count:-0}" -lt 100 ]; then break; fi
    page=$((page + 1))
  done

  if [ "$fetch_failed" = "true" ]; then
    echo "  (fetch failed — keeping previous cursor)"
    rm -f "$tmp_releases"
    continue
  fi

  releases=$(cat "$tmp_releases")
  rm -f "$tmp_releases"

  # Filter by date, batch, display, and write new checkedAt to temp file
  tmp_checked=$(mktemp)
  echo "$releases" | node -e "
    const fs=require('fs');
    const since=process.argv[1], max=parseInt(process.argv[2]), tmpFile=process.argv[3];
    const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{
      try{
        const all=JSON.parse(d.join(''));
        const newer=all.filter(r=>r.published_at&&new Date(r.published_at)>new Date(since));
        if(!newer.length){fs.writeFileSync(tmpFile,'$now');console.log('  (no new releases since '+since.slice(0,10)+')');return;}
        newer.sort((a,b)=>new Date(a.published_at)-new Date(b.published_at));
        const batch=newer.slice(0,max);
        const remaining=newer.length-batch.length;
        for(const r of batch){
          console.log('  ## '+r.tag_name+' ('+(r.published_at||'').slice(0,10)+')');
          const body=(r.body||'(no notes)').slice(0,1000).split('\n').map(l=>'  '+l).join('\n');
          console.log(body);
        }
        if(remaining>0) console.log('  (+'+remaining+' newer releases not shown — rerun to see more)');
        fs.writeFileSync(tmpFile,remaining>0?batch[batch.length-1].published_at:'$now');
      }catch(e){console.log('  (error: '+e.message+')');fs.writeFileSync(tmpFile,'$since');}
    })
  " "$since" "$MAX_PER_PKG" "$tmp_checked" 2>/dev/null
  new_checked_at=$(cat "$tmp_checked" 2>/dev/null || echo "$now")
  rm -f "$tmp_checked"

  # Update state in memory
  state_json=$(echo "$state_json" | node -e "
    const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{
      try{
        const s=JSON.parse(d.join(''));
        s[process.argv[1]]={checkedAt:process.argv[2]};
        console.log(JSON.stringify(s));
      }catch(e){console.error('WARN: state update failed for '+process.argv[1]+': '+e.message);console.log(d.join(''));}
    })
  " "$pkg" "${new_checked_at:-$now}")
done

# Save state file
echo "$state_json" | node -e "
  const fs=require('fs');
  const d=[];process.stdin.on('data',c=>d.push(c));process.stdin.on('end',()=>{
    try{fs.writeFileSync('$STATE_FILE',JSON.stringify(JSON.parse(d.join('')),null,2));}catch(e){console.error('WARN: failed to save state: '+e.message);}
  })
"
echo ""
echo "  (state saved to $STATE_FILE)"

set -eo pipefail

# ── Codebase usage snapshot ──
echo ""
echo "=== Codebase usage snapshot ==="

echo "--- Lucide icons in use ---"
grep -roh 'data-lucide="[^"]*"' src/ 2>/dev/null | sort -u | sed 's/data-lucide="//;s/"//' || echo "(none)"

echo ""
echo "--- Alpine.js directives ---"
grep -roh 'x-[a-z]*' src/ 2>/dev/null | sort | uniq -c | sort -rn | head -15 || echo "(none)"

echo ""
echo "--- SDK imports ---"
grep -rn "from '@mistralai" generators/ helpers/ routes/ 2>/dev/null | head -15 || true
grep -rn "from '@google/genai" generators/ helpers/ routes/ 2>/dev/null | head -10 || true

echo ""
echo "Done. Run 'npm update' to apply minor/patch within semver ranges."
