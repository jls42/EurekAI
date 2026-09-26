---
name: release-test
description: Suite de tests E2E pre-release pour EurekAI. Lance le dev server si necessaire, joue le golden path via Chrome (tous les generateurs depuis des sources reelles), couvre les features recentes (N generations paralleles du meme type, dedup re-import sources, selection OCR + tarifs, garde-fou check-models, categories et statuts de moderation), audit securite (SSRF, rate-limit, validation, headers, JSON malformed), et compile un rapport de findings. A utiliser avant chaque release/merge sur main, ou quand l'user demande "lance les tests de release", "verifie avant release", "/release-test".
allowed-tools: Bash, Read, Grep, Glob
---

# Release Test Suite — EurekAI

Pre-release validation : golden path E2E + audit securite. Generique par construction (lit `categories[]` dynamique cote app, decouvre projet/profil via API, pas de coords HTML hardcodees) — robuste aux refactors UI et ajouts de generateurs.

> **Redaction de ce fichier** : ne jamais ecrire un `$` suivi d'un chiffre (prix, `dirname`…). Quand le skill est invoque avec des arguments, Claude Code remplace « dollar + chiffre » (dollar-zero, dollar-un…) par ces arguments et rend les attentes illisibles (vecu : un prix a 0.50 devenu « Validation.50 »). Ecrire les prix en `USD`.

## Pre-requis : mode par defaut, SANS demander

Le skill ne touche jamais aux donnees reelles de l'user et ne reset rien. Mode par defaut, a annoncer en une ligne puis a executer sans attendre de reponse :

1. **Sauvegarde** : `tar` de `output/` dans le scratchpad (`chmod 600`) + `sha256sum` de tous les fichiers (hors `.deps-checked.json`).
2. **Donnees de test via l'API** : `POST /api/profiles` (profil enfant FR, age 9, PIN de test), `POST /api/projects` rattache a ce profil, 1 lecon texte via `POST /api/projects/:pid/sources/text`. Dans Chrome, pointer `sf-profileId` et `sf-profile-last-project` sur ce profil/projet puis recharger.
3. **Nettoyage en fin de run** : `DELETE /api/profiles/:id` avec le PIN (cascade sur ses projets et fichiers), retirer les cles du profil de test du `localStorage` (`sf-profile-*`), remettre `sf-profileId` et `sf-lang` sur le profil d'origine, fermer l'onglet, puis verifier que les `sha256sum` de `output/` sont identiques a la sauvegarde.

Les modes « etat actuel » (donnees de l'user) ou « reset » ne s'utilisent que si l'user le demande explicitement.

### Pieges d'automatisation connus (mesures 2026-09-26)

- **`pinLimiter` = 10 PIN FAUX / 15 min par IP** sur `PUT` et `DELETE /api/profiles/:id` (seuls les refus 403 comptent : un bon PIN et une requete sans `pin` ne comptent pas). Au-dela, TOUT PIN de cette IP recoit 429 `rate_limited` jusqu'a la fin de la fenetre, bon PIN compris : le `DELETE` de nettoyage aussi. Ne jamais taper de PIN faux en dehors d'un test voulu. `authLimiter` (30 / 15 min) ne couvre plus que la creation (`POST /api/profiles`) ; la lecture et les enregistrements sans PIN n'ont que `generalLimiter`. Apres un 429 : lire `Retry-After` (`curl -i`) et attendre, ou redemarrer le serveur de dev, qui remet tous les compteurs a zero (stockage memoire) : c'est le moyen de nettoyer tout de suite apres une rafale de PIN.
- **Le script securite (phase 3) sature `aiLimiter` puis `generalLimiter`** (rafales de 75 puis 350 requetes, la generale en dernier) : lancer la phase 3 APRES les phases UI, et attendre environ 60 s avant de nouveaux appels. Sa rafale de PIN faux est desactivee par defaut (`PIN_BURST=1`, sur un profil qui a un PIN : `PIN_PROFILE_ID`) : elle bloque les PIN de l'IP 15 min, nettoyage compris (redemarrer le serveur de dev ensuite).
- **Onglet Chrome en arriere-plan** : les transitions Alpine n'avancent qu'a chaque capture, et une vue parait « estompee ». Enchainer 2 captures (la premiere en `scale` 0.2) avant de juger un rendu.
- **Changer la langue de l'UI** : le menu de langue ne bascule pas de facon fiable sous automatisation. Faire `PUT /api/profiles/:id` avec `{pin, _updatedAt, locale}`, mettre a jour `sf-profile-locales` et `sf-lang` (cle de langue lue par l'app, `src/i18n/index.ts`) dans le `localStorage`, puis recharger.
- **Champs PIN** : une extension de gestion de mots de passe peut bloquer `javascript_tool` quand le focus est sur le champ (erreur `chrome-extension://`) : utiliser clic + frappe, pas de JS sur ce champ.
- **Sondes audio** : ne pas attendre les metadonnees `<audio>` en JS (delai de 45 s depasse). Mesurer les MP3 avec `ffprobe` sur `output/projects/<pid>/`.

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

Les boutons de generation portent l'`aria-label` `"Générer : X"` **avec accent aigu** (i18n FR, cle `a11y.generateCategory` dans `src/i18n/fr.ts`), X etant le libelle visible du bouton (`gen.*` sur la vue Sources, `nav.*` sur le Tableau de bord : le nom accessible contient toujours le libelle visible, WCAG 2.5.3). Les autres locales ont la meme forme, sans article (`"Generate: X"` en EN). Pour rester robuste cross-langue, soit (a) forcer la langue FR via `localStorage.setItem('sf-lang', 'fr')` + reload avant le scan, soit (b) selectionner par autre voie (par exemple `button[aria-label*="ner"]` + verification du texte du bouton). Les boutons de navigation portent `"Voir : X"` (cle `a11y.viewCategory` ; pastilles de stats du Tableau de bord : `"Voir : N X"`, compteur visible compris).

**Note importante** : ces chips ne sont visibles que sur la vue **Sources** (rangee de boutons par-source) — pas sur le **Tableau de bord** (qui n'a que le CTA `Auto — Magie !`). Pour lancer une generation typee depuis le tableau de bord, soit naviguer vers la vue catégorie (`+ Nouvelle fiche` etc.), soit aller sur la vue Sources d'abord.

### Pour chaque generateur

Pour chaque bouton visible avec aria-label commencant par `"Générer"` :
1. Cliquer dessus (`computer.left_click` aux coords retournees par `find` ou la query JS).
2. Surveiller le reseau : un `POST /api/projects/<pid>/generate/<type>` doit partir en `pending`.
3. Attendre la complétion (poll `read_network_requests` jusqu'a status 200 ou >30s timeout).
4. Naviguer vers la vue dediee (`Voir : X`) et capturer un screenshot pour valider le rendu.
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
2. Pendant le pending (badge visible en haut), cliquer le ✕ du badge (`button[aria-label^="Annuler :"]` en FR, cle `a11y.cancelGeneration` : `"Annuler : X"`, X = type de la generation).
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
   - Les labels OCR montrent le **nom produit** (`OCR_MODEL_LABELS` : "OCR 4" / "OCR 3"), PAS l'ID brut ; OCR 4 affiche 4 USD, OCR 3 affiche 2 USD (signe dollar dans l'UI), les deux avec l'unite pages (`1000`).
   - L'**ID technique réel** est affiché sous le `<select>` en italique (`ocrRealId` = la valeur sélectionnée, ex. `mistral-ocr-4-0`).
   - L'option `DEFAULT_OCR_MODEL` (OCR 4) porte le suffixe recommande (texte i18n `settings.recommended`).
   - Labels modele principal : en USD par M tokens (entree / sortie) : `mistral-large` → 0.50 / 1.50, `mistral-medium` → 1.50 / 7.50, `mistral-small` → 0.15 / 0.60.
   - `tts` affiche 16 USD par M caracteres.
   - **AUCUN** label/span ne contient `tarif indisponible` / `price unavailable` (regression `modelPriceLabel` → `priceUnknown`, ex. unite `audio-seconds` non geree).
4. Screenshot du dialog (preuve visuelle des tarifs).

### B — Routage effectif des deux modèles OCR (cost-tracking, ~0.006 USD, 2 uploads)

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
grep -nE "canStartGenerate|ensureGenerationAllowed|loading\[" src/app/generate.ts src/app/moderation-gate.ts | head
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

### A — Rejet du doublon (API, cout nul, ne mute rien)

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

### B — Re-import force (API, +1 OCR ~0.004 USD, MUTE le projet → confirmer en mode "etat actuel")

```bash
curl -s -X POST "$BASE/api/projects/$PROJECT_ID/sources/upload" -F "files=@$FIX" -F "allowDuplicates=true" -w '\n__HTTP_%{http_code}'
```

Assertions : **200** + une nouvelle source creee, son `contentHash` **identique** a l'originale ; `totalCost` a augmente (OCR refait — choix explicite). Si l'user refuse la mutation : **SKIP B**, noter `⚪ LOW: re-import force non teste`.

### C — UX dialogue par fichier (Chrome, optionnel)

Glisser/uploader le meme fichier via l'UI → statut **`'duplicate'`** par fichier, avec actions **« Importer quand meme »** (re-upload `allowDuplicates`) et **« Ignorer »** (dismiss). Screenshot.

## Phase 2quinquies — check-models : surveillance modeles (Feature B, PR #42)

Couvre le garde-fou **non bloquant** qui croise l'API `/v1/models` (groupes alias ↔ versions, independants de l'ordre, + `deprecation`) et la table Legacy de l'overview (rendue Lightpanda → date de retrait + alternative) sur `WATCHED_MODELS` (5 alias `-latest` resolus par l'app, recopies dans `WATCHED_ALIASES`, + `OCR_MODELS` et `MODERATION_MODEL` importes des sources uniques). Alertes : modele surveille **absent** de `/v1/models`, **alias ambigu**, groupe **deprecie/retire**, **defaut epingle en retard** sur l'alias de sa generation (sauf retard assume `OCR_DEFAULT_ACCEPTED_LAG`). Informations : retard assume, nouvelle generation (`-latest`), modele non suivi dans la famille moderation. Script, pas d'UI.

1. **Path nominal** (avec cle) — rend l'overview via Lightpanda (1-2 s mesure, budget timeout 120s) :
   ```bash
   timeout 120 npx tsx --env-file=.env scripts/check-models.ts; echo "exit=$?"
   ```
   - Assert `exit=0` (**toujours** non bloquant).
   - Sortie = `N modèles surveillés OK (...)` + d'eventuelles lignes `  ℹ ...` (informations), ou `⚠ modèles à vérifier` + une ligne par alerte + le pied de message. Une alerte n'est **PAS** un FAIL du skill : c'est l'info attendue. Reference au 2026-09-26 : `8 modèles surveillés OK` + `ℹ épinglage volontaire : mistral-ocr-4-0 conservé face à mistral-ocr-4-1 ...`. Reporter le contenu verbatim ; toute nouvelle alerte (ex. `mistral-ocr-4-2`, `mistral-moderation-...`) est un finding a remonter a l'user. Une ligne `overview indisponible (...) — diagnostic API seul` suivie de `OK côté API ... retraits NON vérifiés` = controle PARTIEL (table Legacy non lue) : a remonter aussi, ce n'est pas un OK complet.
2. **Path skip** (sans cle) :
   ```bash
   env -u MISTRAL_API_KEY npx tsx scripts/check-models.ts; echo "exit=$?"
   ```
   - Assert `exit=0` + sortie contient `absent` / `skip`.
3. **Cablage non bloquant** dans `check-deps.sh` (cle exportee, appel borne) + pin moderation coherent :
   ```bash
   grep -n "check-models" scripts/check-deps.sh          # appel via run_bounded, suivi de `|| true`
   grep -n "export MISTRAL_API_KEY" scripts/check-deps.sh # sinon check-models skippe "absent"
   grep -n "MODERATION_MODEL =" helpers/moderation-model.ts   # 'mistral-moderation-2603', jamais -latest
   ```
4. (Unit deja couvert : `parseLegacyTable`, `resolveGroup` (ordre, ambiguite), `findMissing`, `findLaggingDefaults` (retard assume), `findUntrackedFamilyModels`, instantane reel, degradation gracieuse — ne pas redupliquer ici.)

## Phase 2sexies — Moderation 2 : categories, migration legacy, statuts (fix sept. 2026)

Couvre le correctif Moderation 2 (`mistral-moderation-2603` a scinde `dangerous_and_criminal_content` en `dangerous` + `criminal`) et les statuts distingues. Moderation **gratuite** (cout Mistral nul).

### Source unique a relire (ne jamais redupliquer la liste ici)
- `helpers/moderation-model.ts` (`MODERATION_MODEL`, `MODERATION_MODEL_CATEGORIES`, table legacy), `helpers/moderation-http.ts` (statut → HTTP, priorite), `helpers/chat-sources.ts` (sources du chat).

### A — Categories parentales (Chrome, cout nul)
Ouvrir les reglages parentaux d'un profil avec moderation active : autant de cases que `GET /api/moderation-categories` → `all` (11 au 2026-09-26), chaque libelle **traduit** (jamais une cle brute `moderation.cat.*`), en FR, EN et AR (RTL) ; en largeur mobile (~390 px), la grille reste lisible et le bouton « reinitialiser » atteignable. Screenshot.

### B — Conversion legacy (API, cout nul, MUTE un profil → profil de test uniquement)
`PUT /api/profiles/:id` (avec `pin` si le profil en a un) et `moderationCategories: ["sexual","dangerous_and_criminal_content"]` → la reponse (et `profiles.json`) contient `["sexual","dangerous","criminal"]` + warn `mapped legacy` dans les logs serveur.

### C — Blocage reel (API ; le 400 est gratuit, le 200 ajoute 1 source et declenche 1 detection de consigne mistral-large facturee, sur les seules sources sures → projet de test uniquement, supprimer la source ensuite)
Profil de test avec moderation active et `criminal` coche : `POST /api/projects/:pid/sources/text` avec un texte d'activite illegale → **400** `moderation.blocked` ; un texte scolaire neutre → 200. Assert : jamais de page HTML sur une erreur. Apres le 200 (quelques secondes) : `GET /api/projects/:pid` → `consigne.sourceIds` contient l'id de la source ajoutee et `costLog` une entree dont la route finit par `/detect-consigne` (cout de la detection suivi) ; apres `DELETE /api/projects/:pid/sources/:sid` → reponse `{ ok: true, consigne: null }` (consigne tiree de la source effacee).

(Unit deja couvert : fail-closed `error` sur contrat rompu, 400/503/409 + priorite, statut effectif (source persistee `safe` dont une categorie bloquee vaut `true` → refusee en generation et au chat, badge rouge), chat sans sources non verifiees, garde `/generate/route`, garde de la consigne `consigneUsable` (generation, outils du chat, dialogue) et detection sur les sources sures (`/detect-consigne` 400/503/409/`no_sources` sans appel LLM), reponse orale du quiz vocal moderee avant `verifyAnswer` (400 `quiz.answerBlocked`, 503, cout de la STT persiste meme sur refus), contenu d'une source non sure masque pour un profil modere (apercu de la carte, texte OCR, original et comparaison du dialogue rendus par `x-if` ; revelation par le PIN du profil courant, remasque a la fermeture du dialogue et au changement de projet ou de profil) — ne pas redupliquer ici.)

## Phase 3 — Audit securite

Lancer le script securite dedie :

```bash
PROJECT_ID=$PROJECT_ID PROFILE_ID=$PROFILE_ID bash "${CLAUDE_PLUGIN_ROOT:-.claude/skills/release-test}/scripts/security-tests.sh"
```

Note : si `CLAUDE_PLUGIN_ROOT` n'est pas defini (skill en project mode), fallback sur `.claude/skills/release-test/scripts/security-tests.sh` depuis la racine du repo.

Le script teste (cf. son entete) :
- **JSON malformed** : `POST` avec body invalide → doit retourner `{"error":"invalid_json"}` 400 (pas de stack trace, pas de path serveur dans la reponse)
- **Helmet headers** : `curl -I /api/projects` → doit contenir `X-Frame-Options`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Referrer-Policy`
- **Validation types** : `POST /generate/summary` avec `{lang:12345, ageGroup:[], profileId:null}` → doit retourner `{"error":"invalid_input"}` 400 sans creer de generation
- **SSRF** : `POST /sources/websearch` avec URL `127.0.0.1`, `169.254.169.254`, `[::ffff:7f00:0001]`, `198.18.0.1` → chacune **422** `{"error":"url_blocked","failures":[{"label":"URL scrape: …","code":"url_blocked"}]}`, SANS creer de source (nombre de sources inchange) ni appeler Mistral pour la collecte (ni scraping, ni repli ; verif cote `costLog`). Hors du script, pour memoire : aucune source creee pour une autre cause → **502** `all_sources_failed` (codes des echecs dans `failures[]`), au moins une source → 200 inchange
- **Pas de fuite secrets** : grep des reponses d'erreur pour `MISTRAL_API_KEY|sk-|api_key|password|/mnt/|/home/` → doit etre vide (lance AVANT les rafales : apres elles, `generalLimiter` repond a la place des routes testees)
- **Refus des limiteurs** (toutes les rafales) : 429 `{"error":"rate_limited"}` (code stable, plus aucun texte libre), en-tete `Retry-After` (secondes) et en-tete `RateLimit` du limiteur attendu (`limit=10` PIN, `limit=60` IA, `limit=300` general)
- **Rate-limit PIN (optionnel, `PIN_BURST=1`)** : PIN faux en `PUT /api/profiles/:id` (corps `{pin}` seul : rien n'est modifie) → au plus 10 refus 403 puis 429 `rate_limited`. Bloque les PIN de l'IP 15 min (redemarrer le serveur de dev pour nettoyer)
- **Rate-limit AI** : burst 75 POST `/generate/summary` avec body invalide (`{lang:12345}`) → 400 invalid_input (gratuit, rejete AVANT le LLM) ou 429 au-dela de 60/min, lance AVANT la rafale generale. **Jamais `/generate/route`** : cette route est lenient (`lang || 'fr'`) et EXECUTE le routeur LLM (cout) au lieu de rejeter — un burst non throttle facturerait le run.
- **Rate-limit general** : burst 350 GET `/api/projects` (jamais `/api/profiles`) → 429 au-dela de 300/min ; derniere rafale du script

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
| summary    | ✓/✗    | 0.X USD | ...   |
...

### OCR + tarifs modeles (PR #41)
- Selecteur OCR (OCR 3 / OCR 4 + tarifs) : ✓/✗
- Libelles tarifaires modele principal + TTS (aucun "tarif indisponible") : ✓/✗
- Routage live OCR 3 (cout/page ≈ 2 USD/1000) : ✓/✗/skip
- Routage live OCR 4 (cout/page ≈ 2x OCR 3) : ✓/✗/skip

### Features PR #42
- N generations paralleles (2 gids distincts, 2 gens, tracker vide) : ✓/✗
- Bouton reste cliquable pendant un pending (pas de spinner-disable) : ✓/✗
- Dedup rejet (200, duplicates[], 0 source, 0 cout OCR) : ✓/✗
- Dedup re-import force (allowDuplicates, contentHash identique) : ✓/✗/skip
- check-models nominal (exit 0, "modèles surveillés OK" + infos, ou alertes reportees) : ✓/✗
- check-models skip sans cle (exit 0, "absent") : ✓/✗
- Cablage check-deps.sh (cle exportee, run_bounded, `|| true`) + MODERATION_MODEL 2603 : ✓/✗

### Moderation 2 (fix sept. 2026)
- Categories parentales (11, libelles traduits FR/EN/AR, mobile) : ✓/✗
- Conversion legacy dangerous_and_criminal_content → dangerous + criminal : ✓/✗/skip
- Blocage reel (400 moderation.blocked, jamais de HTML) : ✓/✗/skip

### Securite (output script)
- JSON malformed : ✓/✗
- Helmet headers : ✓/✗
- Validation types : ✓/✗
- SSRF (4 vecteurs) : ✓/✗
- Rate-limit general : ✓/✗
- Rate-limit AI : ✓/✗
- Rate-limit PIN (optionnel) : ✓/✗/skip
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
4. **Tests securite : noms des cles d'erreur stables** (`invalid_json`, `invalid_input`, `upstream_unavailable`, `internal_error`, `rate_limited`, `url_blocked`, `all_sources_failed`) — cf. `types.ts:FailedStepCode` et `helpers/rate-limit.ts`. Si ces codes changent, mettre a jour ce skill ET `helpers/error-code-resolution.ts`.
5. **Budgets de timeout** : podcast/quiz-vocal peuvent prendre 60-90s. Ne pas timeout < 120s.
6. **Cost-conscious** : tester 1× chaque generateur par run (pas en boucle). Le script securite ne fait QUE des requetes qui doivent etre rejetees en amont (pas d'appel Mistral). Budget run complet ≈ 0.30-0.50 USD (mesure 2026-09-26 : 0.28 USD suivis + ~0.10 USD de frais d'outil par illustration, non suivis par le cost tracking).
7. **Pas de destructive** : ne JAMAIS faire `rm -rf output/`, `DELETE /api/projects/*`, ou modifier `config.json` sans confirmation explicite. Seul le mode "reset" requiert l'action de l'user (commande affichee, mais executee par lui).

## En cas d'evolution du projet

Quand l'app change et que le skill commence a echouer :

- **Nouveau generateur ajoute** : le skill le decouvrira automatiquement via `categories[]`. Verifier juste qu'il a un bouton avec `aria-label="Générer : ..."` (FR avec accent — voir cle i18n `a11y.generateCategory`).
- **Refactor des endpoints** : si `/generate/auto/route` devient `/generate/orchestrate` par exemple, mettre a jour la phase 3.
- **Nouveau code d'erreur** : ajouter dans `security-tests.sh` la regex d'assertion correspondante.
- **Nouveau champ secret a ne pas leak** : ajouter au grep "Pas de fuite secrets" dans `security-tests.sh`.
- **N generations paralleles (Phase 2ter)** ancree sur `src/app/pending-utils.ts` (`pendingOfTypeExists`) + `body.gid` (UUID v4). Si le contrat gid ou la liberation de `loading[type]` change, mettre a jour la phase.
- **Dedup sources (Phase 2quater)** ancree sur le contrat `/sources/upload` (array nu en full success, objet `{sources,duplicates?}` sinon, 200 sur lot 100% doublons, `allowDuplicates==='true'` strict) + `contentHash`. Si le contrat reponse evolue, mettre a jour la phase.
- **check-models (Phase 2quinquies)** ancree sur `scripts/check-models.ts` (exit 0 toujours, croisement API + overview Lightpanda, `WATCHED_MODELS` = alias recopies + OCR_MODELS/MODERATION_MODEL importes des sources uniques, `OCR_DEFAULT_ACCEPTED_LAG`) + son cablage dans `check-deps.sh` (cle exportee, `run_bounded`, `|| true`). Si le script devient bloquant, change de source, de liste surveillee ou de libelles de sortie, mettre a jour la phase.
- **Moderation (Phase 2sexies)** ancree sur `helpers/moderation-model.ts` (taxonomie du modele epingle). Si `MODERATION_MODEL` change, la taxonomie et la table legacy changent avec lui : mettre a jour les assertions A-C (nombre de categories, cles legacy).

Ouvrir une PR `chore(release-test): update for <changement>` quand cette maintenance est faite.
