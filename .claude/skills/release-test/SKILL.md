---
name: release-test
description: Suite de tests E2E pre-release pour EurekAI. Lance le dev server si necessaire, joue le golden path via Chrome (tous les generateurs depuis des sources reelles), couvre les features recentes (N generations paralleles du meme type, dedup re-import sources, selection OCR + tarifs, garde-fou check-models), audit securite (SSRF, rate-limit, validation, headers, JSON malformed), et compile un rapport de findings. A utiliser avant chaque release/merge sur main, ou quand l'user demande "lance les tests de release", "verifie avant release", "/release-test".
allowed-tools: Bash, Read, Grep, Glob
---

# Release Test Suite — EurekAI

Pre-release validation : golden path E2E + audit securite. Generique par construction (lit `categories[]` dynamique cote app, decouvre projet/profil via API, pas de coords HTML hardcodees) — robuste aux refactors UI et ajouts de generateurs.

## Pre-requis utilisateur (a annoncer au debut)

Le skill **ne reset pas les donnees** automatiquement (preservation des sources de l'user). Demander une fois au debut :

> "Je vais lancer les tests E2E + securite. Tu veux que je :
>   (a) **tester sur l'etat actuel** (sources existantes, profil actuel) — le plus rapide, mais skip les checks d'import
>   (b) attendre que tu **resets** (`sudo rm -rf output/*`) et importes des sources fraiches — couverture complete
>
> Je peux aussi reproduire automatiquement les conditions de test : profil enfant FR + au moins 1 source. Dis-moi."

## Phase 0 — Boot

1. Verifier si `npm run dev` tourne :
   ```bash
   curl -s --max-time 2 http://localhost:3000/api/config/status >/dev/null && echo "up" || echo "down"
   ```
2. Si down : `npm run dev` en background via `Bash` avec `run_in_background: true`. Attendre que le boot log contienne `API Mistral: OK`.
3. Verifier que le frontend Vite repond sur `http://localhost:5173/`.
4. Charger les outils Chrome via `ToolSearch` :
   ```
   select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__browser_batch,mcp__claude-in-chrome__find,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__read_network_requests,mcp__claude-in-chrome__read_console_messages
   ```

## Phase 1 — Decouverte de l'etat

Decouvrir projet et profil **dynamiquement** (jamais hardcoder un UUID) :

```bash
PROJECT_ID=$(curl -s http://localhost:3000/api/projects | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d[0]["id"] if d else "")')
PROFILE_ID=$(curl -s http://localhost:3000/api/profiles | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d[0]["id"] if d else "")')
SOURCES_COUNT=$(curl -s http://localhost:3000/api/projects/$PROJECT_ID 2>/dev/null | python3 -c 'import json,sys; d=json.load(sys.stdin); print(len(d.get("sources",[])))')
```

Si `PROJECT_ID` vide ou `SOURCES_COUNT < 1` : **stopper et demander a l'user** de creer un projet + importer au moins 1 source via l'UI Chrome (ou lui proposer de le faire via Chrome). Ne JAMAIS appeler les generateurs sans source : ils echoueront en `no_sources` et fausseront le rapport.

## Phase 2 — Golden path E2E (Chrome)

L'objectif est de couvrir **tous les generateurs declares dynamiquement** dans `state.ts:categories[]` (source unique de verite). Ne jamais hardcoder la liste.

### Lire la liste reelle des generateurs

```javascript
// Via mcp__claude-in-chrome__javascript_tool sur l'onglet ouvert :
Array.from(document.querySelectorAll('button[aria-label^="Générer"]'))
  .filter(b => b.offsetParent !== null && b.getBoundingClientRect().width > 0)
  .map(b => ({
    label: b.getAttribute('aria-label'),
    disabled: b.disabled,
    x: Math.round(b.getBoundingClientRect().x),
    y: Math.round(b.getBoundingClientRect().y),
  }))
```

Les boutons de generation portent l'`aria-label` `"Générer des X"` **avec accent aigu** (i18n FR — verifie dans `src/i18n/fr.ts` cle `actions.generate`). Les locales autres mettent autre chose (`"Generate X"` en EN). Pour rester robuste cross-langue, soit (a) forcer la langue FR via `localStorage.setItem('sf-locale', 'fr')` + reload avant le scan, soit (b) selectionner par autre voie (par exemple `button[aria-label*="ner"]` + verification du texte du bouton). Les boutons de navigation portent `"Voir les X"`.

**Note importante** : ces chips ne sont visibles que sur la vue **Sources** (rangee de boutons par-source) — pas sur le **Tableau de bord** (qui n'a que le CTA `Auto — Magie !`). Pour lancer une generation typee depuis le tableau de bord, soit naviguer vers la vue catégorie (`+ Nouvelle fiche` etc.), soit aller sur la vue Sources d'abord.

### Pour chaque generateur

Pour chaque bouton visible avec aria-label commencant par `"Générer"` :
1. Cliquer dessus (`computer.left_click` aux coords retournees par `find` ou la query JS).
2. Surveiller le reseau : un `POST /api/projects/<pid>/generate/<type>` doit partir en `pending`.
3. Attendre la complétion (poll `read_network_requests` jusqu'a status 200 ou >30s timeout).
4. Naviguer vers la vue dediee (`Voir les X`) et capturer un screenshot pour valider le rendu.
5. Pour les generateurs audio (podcast, quiz-vocal) : verifier la presence d'un element `<audio>` avec `duration > 0`.
6. Pour `image` : verifier qu'une `<img>` charge un blob (pas d'erreur 404).
7. Pour les exercices (quiz, fill-blank, flashcards) : cliquer une reponse / retourner une carte et verifier que le feedback s'affiche (Score change, message "Correct"/"Incorrect" visible).

### Test du router auto

Cliquer le bouton **"Auto"** (gradient bleu/violet, texte contient "magique" ou equivalent — chercher par texte: `find` "bouton genere tous les contenus / Auto / magique"). Attendre la complétion :
- `POST /generate/route` retourne 200 (router LLM)
- N appels `/generate/<agent>` parallels (typiquement tous les agents AUTO_AGENTS_SET)
- Verifier via API serveur que `pendingTracker.length === 0` et que `generations.length` a augmente du nombre d'agents lances.

### Test cancel

1. Cliquer un generateur lent (podcast ou quiz-vocal).
2. Pendant le pending (badge visible en haut), cliquer le ✕ du badge.
3. Verifier :
   - `POST /generations/<gid>/cancel` retourne 200
   - Un toast de confirmation apparait (texte i18n "annule(e)" / "cancelled")
   - Cote API : entry dans `pendingTracker` avec `status: 'cancelled', failureCode: 'cancelled'`
   - **Aucune** nouvelle generation creee dans `generations[]` apres le cancel (verif post-30s pour laisser Mistral repondre dans le vide)

### Test SSE cross-tab (optionnel, si chrome supporte plusieurs onglets)

1. Ouvrir un 2e onglet sur `http://localhost:5173/` (`tabs_create_mcp` + `navigate`).
2. Lancer une generation rapide depuis l'onglet 1 (ex: flashcards count=5).
3. Verifier dans l'onglet 2 :
   - Le compteur cloche notifications s'incremente
   - La nouvelle generation apparait dans le dashboard sans refresh manuel
4. Inspecter le ledger via JS :
   ```javascript
   const notifs = JSON.parse(localStorage.getItem('sf-profile-notifications') || '{}');
   const seen = JSON.parse(localStorage.getItem('sf-profile-seen-events') || '{}');
   Object.entries(notifs).map(([pid, list]) => ({
     pid: pid.slice(0,8),
     notifsCount: list.length,
     seenKeysCount: (seen[pid] || []).length,
     ratio: list.length / Math.max(1, (seen[pid] || []).length)
   }))
   ```
   `notifsCount` doit etre `<=` `seenKeysCount` (egal ideal). Un ratio > 1 = bug dedup.

### Cas a verifier sur les ages restraints

Le bouton "Chat" est desactive pour les profils enfant (`Chat desactive pour ce profil` tooltip). Verifier que :
- Le bouton est `disabled` (attribut HTML)
- Le clic ne declenche pas de POST `/chat`
- Le tooltip s'affiche au hover

## Phase 2bis — Sélection modèle OCR + tarifs modèles (Réglages)

Couvre la feature PR #41 (sélecteur OCR 3/OCR 4 + libellés tarifaires `modelOptionLabel`/`modelPriceLabel`, et routage effectif du modèle OCR choisi). Le reste du skill ne touche **jamais** les Réglages → sans cette phase, la feature n'est pas testée E2E.

### Source unique à relire (ne jamais rededuire la liste / les tarifs ici)

```bash
grep -E "OCR_MODELS =|DEFAULT_OCR_MODEL" helpers/ocr-models.ts
grep -E "mistral-(large|medium|small|ocr)|voxtral-mini" helpers/pricing.ts
```

### A — Libellés tarifaires dans les Réglages (Chrome, coût API nul)

1. Ouvrir le dialog Réglages : `find` "bouton parametres / reglages / engrenage" puis clic. (Le dialog est `<dialog x-ref="settingsDialog">` ; les selecteurs ont des ids stables `#cfg-main-model`, `#cfg-ocr-model`.)
2. Lire les options des deux selecteurs + le libellé TTS + la ligne ID réel OCR via `javascript_tool` :
   ```javascript
   const opts = (sel) => Array.from(document.querySelectorAll(sel + ' option'))
     .map((o) => ({ value: o.value, label: o.textContent.trim() }));
   const tts = document.querySelector('[x-text*="voxtral-mini-tts"]')?.textContent.trim();
   const ocrRealId = document.querySelector('[x-text="configDraft._ocrModel"]')?.textContent.trim();
   ({ main: opts('#cfg-main-model'), ocr: opts('#cfg-ocr-model'), tts, ocrRealId });
   ```
3. Assertions (croiser avec les `grep` ci-dessus, ne rien hardcoder) :
   - `ocr` (les `option.value`) = exactement les valeurs de `OCR_MODELS` (ordre actuel : OCR 4 puis OCR 3).
   - Les labels OCR montrent le **nom produit** (`OCR_MODEL_LABELS` : "OCR 4" / "OCR 3"), PAS l'ID brut ; OCR 4 contient `$4`, OCR 3 contient `$2`, les deux l'unite pages (`1000`).
   - L'**ID technique réel** est affiché sous le `<select>` en italique (`ocrRealId` = la valeur sélectionnée, ex. `mistral-ocr-4-0`).
   - L'option `DEFAULT_OCR_MODEL` (OCR 4) porte le suffixe recommande (texte i18n `settings.recommended`).
   - Labels modele principal : `mistral-large` → `$0.50 / $1.50`, `mistral-medium` → `$1.50 / $7.50`, `mistral-small` → `$0.15 / $0.60`.
   - `tts` contient `$16`.
   - **AUCUN** label/span ne contient `tarif indisponible` / `price unavailable` (regression `modelPriceLabel` → `priceUnknown`, ex. unite `audio-seconds` non geree).
4. Screenshot du dialog (preuve visuelle des tarifs).

### B — Routage effectif des deux modèles OCR (cost-tracking, ~$0.005, 2 uploads)

**⚠ Mute la config** (`PUT /api/config`, restauree en fin de phase) **et ajoute 2 sources de test** au projet. A confirmer avec l'user si mode "etat actuel". But : prouver end-to-end que le modele OCR choisi est bien envoye ET tarife correctement (OCR 4 = 2x OCR 3).

Fixture (generer si absente, sinon demander un fichier a l'user, sinon SKIP en le notant) :

```bash
if command -v convert >/dev/null; then
  convert -size 700x200 xc:white -gravity center -pointsize 26 \
    -annotate 0 "EurekAI OCR test - facture 2026 - total 42 EUR" /tmp/ocr-test.png && echo "/tmp/ocr-test.png"
else echo "NO_FIXTURE"; fi
```

Pour chaque `model` dans `OCR_MODELS` :

1. `PUT /api/config` `{"models":{"ocr":"<model>"}}` puis `GET /api/config` → assert `models.ocr === <model>` (`normalizeOcrModel` ne doit PAS reecrire une valeur valide).
2. `POST /api/projects/$PROJECT_ID/sources/upload` (multipart, champ `files`) avec la fixture.
3. Attendre la reponse (source enrichie : `markdown` non vide + `estimatedCost` + `costBreakdown` d'unite pages).
4. Assert : `markdown` non vide (OCR a tourne) ; cout **par page** coherent — OCR 4 ≈ 2x OCR 3 pour le meme fichier (comparer cout/page, pas cout brut, au cas ou le nb de pages differe).
5. En fin de phase : restaurer `PUT /api/config` `{"models":{"ocr":"<DEFAULT_OCR_MODEL>"}}`.

Si `NO_FIXTURE` et pas de fichier fourni : **SKIP B**, noter `⚪ LOW: OCR live dual-model non teste (pas de fixture)`. Ne jamais inventer un resultat.

## Phase 2ter — N generations paralleles du meme type (Feature C, PR #42)

Couvre l'invariant PR #42 : re-cliquer un bouton de generation lance une generation **de plus** (pas de verrou sur `loading[type]`), les boutons restent **cliquables** (label+icone, pas de spinner-disable), N pendings visibles via chips (1/gid), et `loading[type]` n'est libere que quand **aucun** pending du type ne reste (`pendingOfTypeExists`).

### Source unique a relire (ne pas rededuire la logique)

```bash
grep -n "pendingOfTypeExists" src/app/pending-utils.ts src/app/helpers.ts
grep -nE "canStartGenerate|loading\[" src/app/generate.ts | head
```

### A — Lancement parallele (API, deterministe, ~2x cout d'un generateur rapide)

Le `gid` est genere cote client et passe via `body.gid` (UUID v4 STRICT cote backend). Deux gids distincts prouvent deux pendings independants.

```bash
GID1=$(python3 -c 'import uuid; print(uuid.uuid4())'); GID2=$(python3 -c 'import uuid; print(uuid.uuid4())')
GENS_BEFORE=$(curl -s "$BASE/api/projects/$PROJECT_ID" | python3 -c 'import json,sys; print(len(json.load(sys.stdin).get("results",{}).get("generations",[])))')
# Lancer 2 flashcards (rapide, count=5) en parallele avec 2 gids distincts :
for G in "$GID1" "$GID2"; do
  curl -s -X POST "$BASE/api/projects/$PROJECT_ID/generate/flashcards" \
    -H 'content-type: application/json' \
    -d "{\"gid\":\"$G\",\"lang\":\"fr\",\"ageGroup\":\"enfant\",\"profileId\":\"$PROFILE_ID\",\"count\":5}" -o /dev/null -w "%{http_code}\n" &
done; wait
```

Assertions :
- Les **deux** POST retournent **200** (aucun n'est rejete/verrouille par l'autre).
- `GET /api/projects` apres completion : `generations.length === GENS_BEFORE + 2` et `pendingTracker` ne contient **aucun** `status:'pending'` du type (libere car plus aucun pending — `pendingOfTypeExists`).

### B — Invariant UI : le bouton reste cliquable pendant un pending (Chrome)

1. Sur la vue Sources, lancer un generateur **lent** (podcast/quiz-vocal) via clic.
2. **Pendant** le pending (badge/chip visible), relire le meme bouton via query JS :
   ```javascript
   const b = [...document.querySelectorAll('button[aria-label^="Générer"]')]
     .find((x) => /podcast|vocal/i.test(x.getAttribute('aria-label')));
   ({ disabled: b?.disabled, label: b?.getAttribute('aria-label'), hasIcon: !!b?.querySelector('svg, .icon-chip') });
   ```
   Assert `disabled === false` (le bouton n'est PAS verrouille) et `label`/`hasIcon` toujours presents (pas de bascule "loading"). Regression si le bouton se grise/passe en spinner.
3. Re-cliquer ce bouton pendant le pending → **2e** `POST /generate/<type>` part (chip supplementaire). Compter les chips de pending du type : doit etre `>= 2`.

## Phase 2quater — Dedup re-import sources (Feature A, PR #42)

Couvre : re-importer un fichier deja importe → detecte comme doublon (sha256 `contentHash`, garde serveur), **200** (pas 500) quand le lot ne contient QUE des doublons, **pas de double facturation OCR**, et `allowDuplicates` force le re-import. **Chainer apres Phase 2bis B** (reutilise la fixture deja uploadee → 0 OCR pour le check de rejet).

### Source unique a relire

```bash
grep -nE "contentHash|hashFileContent|allowDuplicates" routes/sources.ts | head
grep -nE "findExistingDuplicate|hashFile" src/app/source-dedup.ts | head
```

### A — Rejet du doublon (API, cout $0, ne mute rien)

Pre-req : au moins 1 source avec `contentHash` (la fixture de 2bis B, sinon l'uploader 1×). `FIX=/tmp/ocr-test.png`.

```bash
COST_BEFORE=$(curl -s "$BASE/api/projects/$PROJECT_ID" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("totalCost",0))')
SRC_BEFORE=$(curl -s "$BASE/api/projects/$PROJECT_ID" | python3 -c 'import json,sys; print(len(json.load(sys.stdin).get("sources",[])))')
# Re-upload SANS allowDuplicates :
curl -s -X POST "$BASE/api/projects/$PROJECT_ID/sources/upload" -F "files=@$FIX" -w '\n__HTTP_%{http_code}'
```

Assertions :
- **HTTP 200** (pas 500 — regression du contrat "lot 100% doublons").
- Reponse = objet `{ ..., duplicates: [...] }` avec `duplicates.length >= 1` (pas un array nu, et la fixture n'est PAS dans `sources`).
- `GET /api/projects` : `sources.length === SRC_BEFORE` (aucune source creee) **ET** `totalCost === COST_BEFORE` (aucun OCR refacture). ← invariant anti-double-facturation, le plus important.

### B — Re-import force (API, +1 OCR ~ $0.004, MUTE le projet → confirmer en mode "etat actuel")

```bash
curl -s -X POST "$BASE/api/projects/$PROJECT_ID/sources/upload" -F "files=@$FIX" -F "allowDuplicates=true" -w '\n__HTTP_%{http_code}'
```

Assertions : **200** + une nouvelle source creee, son `contentHash` **identique** a l'originale ; `totalCost` a augmente (OCR refait — choix explicite). Si l'user refuse la mutation : **SKIP B**, noter `⚪ LOW: re-import force non teste`.

### C — UX dialogue par fichier (Chrome, optionnel)

Glisser/uploader le meme fichier via l'UI → statut **`'duplicate'`** par fichier, avec actions **« Importer quand meme »** (re-upload `allowDuplicates`) et **« Ignorer »** (dismiss). Screenshot.

## Phase 2quinquies — check-models : surveillance modeles (Feature B, PR #42)

Couvre le garde-fou **non bloquant** qui croise l'API `/v1/models` (resolution alias `-latest` + `deprecation`) et la table Legacy de l'overview (rendue Lightpanda → date de retrait + alternative) pour alerter sur un alias pointant vers une version depreciee/retiree. Script, pas d'UI.

1. **Path nominal** (avec cle) — rend l'overview via Lightpanda (~40s, budget timeout 120s) :
   ```bash
   set -a; . ./.env; set +a
   timeout 120 npx tsx scripts/check-models.ts; echo "exit=$?"
   ```
   - Assert `exit=0` (**toujours** non bloquant).
   - Sortie = soit `alias OK`, soit des alertes `⚠ ... deprecie ou retire`. Une alerte n'est **PAS** un FAIL du skill : c'est l'info attendue (ex. `mistral-moderation-latest → mistral-moderation-2411 ... retire ...`). Reporter le contenu verbatim.
2. **Path skip** (sans cle) :
   ```bash
   env -u MISTRAL_API_KEY npx tsx scripts/check-models.ts; echo "exit=$?"
   ```
   - Assert `exit=0` + sortie contient `absent` / `skip`.
3. **Cablage non bloquant** dans `check-deps.sh` + pin moderation coherent :
   ```bash
   grep -n "check-models" scripts/check-deps.sh   # doit etre suivi de `|| true`
   grep -n "mistral-moderation" generators/moderation.ts   # doit etre pinne 2603, pas -latest
   ```
4. (Unit deja couvert : `parseLegacyTable`, cross-reference, degradation gracieuse — ne pas redupliquer ici.)

## Phase 3 — Audit securite

Lancer le script securite dedie :

```bash
PROJECT_ID=$PROJECT_ID PROFILE_ID=$PROFILE_ID bash ${CLAUDE_PLUGIN_ROOT:-$(dirname $0)/..}/scripts/security-tests.sh
```

Note : si `CLAUDE_PLUGIN_ROOT` n'est pas defini (skill en project mode), fallback sur `.claude/skills/release-test/scripts/security-tests.sh` depuis la racine du repo.

Le script teste (cf. son entete) :
- **JSON malformed** : `POST` avec body invalide → doit retourner `{"error":"invalid_json"}` 400 (pas de stack trace, pas de path serveur dans la reponse)
- **Helmet headers** : `curl -I /api/projects` → doit contenir `X-Frame-Options`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Referrer-Policy`
- **Validation types** : `POST /generate/summary` avec `{lang:12345, ageGroup:[], profileId:null}` → doit retourner `{"error":"invalid_input"}` 400 sans creer de generation
- **SSRF** : `POST /sources/websearch` avec URL `127.0.0.1`, `169.254.169.254`, `[::ffff:7f00:0001]`, `198.18.0.1` → doit retourner `failures[]` SANS creer de source ni appeler Mistral (verif cote `costLog`)
- **Rate-limit general** : burst 350 GET `/api/projects` → doit voir des 429 apparaitre au-dela de 300/min
- **Rate-limit AI** : burst 70 POST `/generate/route` → doit voir des 429 apparaitre au-dela de 60/min
- **Pas de fuite secrets** : grep des reponses d'erreur pour `MISTRAL_API_KEY|sk-|api_key|password|/mnt/|/home/` → doit etre vide

Lire la sortie du script. Tout `[FAIL]` est un finding bloquant. Tout `[WARN]` est a discuter.

## Phase 4 — Verification cost tracking

Le tracking de cout est une exigence stricte (cf. CLAUDE.md). Apres les generations de la phase 2, verifier :

```bash
curl -s http://localhost:3000/api/projects/$PROJECT_ID | python3 -c '
import json,sys
d = json.load(sys.stdin)
gens = d.get("results", {}).get("generations", [])
total = d.get("totalCost", 0)
missing = [g.get("type") for g in gens if isinstance(g, dict) and not g.get("estimatedCost")]
breakdowns_missing = [g.get("type") for g in gens if isinstance(g, dict) and not g.get("costBreakdown")]
print(f"totalCost={total:.4f}, gens={len(gens)}, missing_cost={missing}, missing_breakdown={breakdowns_missing}")
'
```

Tout `missing_cost` ou `missing_breakdown` non vide = bug du wrapping `tracked-client` (un appel Mistral a echappe au tracking).

## Phase 5 — Rapport final

Compiler dans la reponse a l'user :

```
## Release Test Report — <timestamp>

### Golden path E2E
| Generateur | Status | Cout | Notes |
|------------|--------|------|-------|
| summary    | ✓/✗    | $0.X | ...   |
...

### OCR + tarifs modeles (PR #41)
- Selecteur OCR (OCR 3 / OCR 4 + tarifs) : ✓/✗
- Libelles tarifaires modele principal + TTS (aucun "tarif indisponible") : ✓/✗
- Routage live OCR 3 (cout/page ≈ $2/1000) : ✓/✗/skip
- Routage live OCR 4 (cout/page ≈ 2x OCR 3) : ✓/✗/skip

### Features PR #42
- N generations paralleles (2 gids distincts, 2 gens, tracker vide) : ✓/✗
- Bouton reste cliquable pendant un pending (pas de spinner-disable) : ✓/✗
- Dedup rejet (200, duplicates[], 0 source, 0 cout OCR) : ✓/✗
- Dedup re-import force (allowDuplicates, contentHash identique) : ✓/✗/skip
- check-models nominal (exit 0, alias OK ou alertes reportees) : ✓/✗
- check-models skip sans cle (exit 0, "absent") : ✓/✗
- Cablage check-deps.sh `|| true` + pin moderation 2603 : ✓/✗

### Securite (output script)
- JSON malformed : ✓/✗
- Helmet headers : ✓/✗
- Validation types : ✓/✗
- SSRF (4 vecteurs) : ✓/✗
- Rate-limit general : ✓/✗
- Rate-limit AI : ✓/✗
- Fuite secrets : ✓/✗

### Cost tracking
- totalCost session : $X.XXXX
- Generations sans estimatedCost : N
- Generations sans costBreakdown : N

### Findings (par severite)
- 🔴 HIGH : ...
- 🟡 MEDIUM : ...
- ⚪ LOW : ...

### Cout total Mistral consomme : $X.XX
```

Si aucun finding HIGH/MEDIUM : **GO release**. Sinon : lister les fix recommandes (sans les appliquer — laisser l'user decider).

## Conventions de robustesse

Pour que ce skill reste valable dans le temps :

1. **Jamais de UUID hardcode** — toujours decouvrir via `/api/projects` et `/api/profiles`.
2. **Jamais de coordonnees Chrome hardcodees** — utiliser `find` natural language, ou query JS sur les `aria-label` (qui sont stables car i18n-aware).
3. **Lire les listes dynamiques** (`categories[]`, `AUTO_AGENTS_SET`) depuis le code/DOM, jamais redupliquer ici. Ce skill **ne doit pas connaitre la liste exhaustive des generateurs** — il l'observe.
4. **Tests securite : noms des cles d'erreur stables** (`invalid_json`, `invalid_input`, `upstream_unavailable`, `internal_error`) — cf. `types.ts:FailedStepCode`. Si ces codes changent, mettre a jour ce skill ET `helpers/error-code-resolution.ts`.
5. **Budgets de timeout** : podcast/quiz-vocal peuvent prendre 60-90s. Ne pas timeout < 120s.
6. **Cost-conscious** : tester 1× chaque generateur par run (pas en boucle). Le script securite ne fait QUE des requetes qui doivent etre rejetees en amont (pas d'appel Mistral). Budget run complet ≈ $0.15-0.25.
7. **Pas de destructive** : ne JAMAIS faire `rm -rf output/`, `DELETE /api/projects/*`, ou modifier `config.json` sans confirmation explicite. Seul le mode "reset" requiert l'action de l'user (commande affichee, mais executee par lui).

## En cas d'evolution du projet

Quand l'app change et que le skill commence a echouer :

- **Nouveau generateur ajoute** : le skill le decouvrira automatiquement via `categories[]`. Verifier juste qu'il a un bouton avec `aria-label="Générer ..."` (FR avec accent — voir cle i18n `actions.generate`).
- **Refactor des endpoints** : si `/generate/auto/route` devient `/generate/orchestrate` par exemple, mettre a jour la phase 3.
- **Nouveau code d'erreur** : ajouter dans `security-tests.sh` la regex d'assertion correspondante.
- **Nouveau champ secret a ne pas leak** : ajouter au grep "Pas de fuite secrets" dans `security-tests.sh`.
- **N generations paralleles (Phase 2ter)** ancree sur `src/app/pending-utils.ts` (`pendingOfTypeExists`) + `body.gid` (UUID v4). Si le contrat gid ou la liberation de `loading[type]` change, mettre a jour la phase.
- **Dedup sources (Phase 2quater)** ancree sur le contrat `/sources/upload` (array nu en full success, objet `{sources,duplicates?}` sinon, 200 sur lot 100% doublons, `allowDuplicates==='true'` strict) + `contentHash`. Si le contrat reponse evolue, mettre a jour la phase.
- **check-models (Phase 2quinquies)** ancree sur `scripts/check-models.ts` (exit 0 toujours, croisement API + overview Lightpanda) + son cablage `|| true` dans `check-deps.sh`. Si le script devient bloquant ou change de source, mettre a jour la phase.

Ouvrir une PR `chore(release-test): update for <changement>` quand cette maintenance est faite.
