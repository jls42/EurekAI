---
paths:
  - "store*.ts"
  - "types.ts"
  - "helpers/auto-run-state*.ts"
  - "helpers/event-bus*.ts"
  - "routes/projects*.ts"
  - "routes/generate*.ts"
  - "routes/auto-runs*.ts"
  - "helpers/keyed-slots*.ts"
---

# Lots Auto côté serveur

Créé le 2026-10-28 (plan « l'Auto continue côté serveur et survit au rechargement », décisions du propriétaire du 2026-10-25). Modèle, orchestrateur et routes en place côté serveur ; le navigateur pilote encore l'Auto lui-même (`/generate/route` puis une requête par étape) jusqu'à son passage sur le lot serveur.

## Modèle (`results.autoRuns`, `types.ts` : `AutoRun`)

- **Un lot = une analyse puis des étapes.** Statuts : `analysing` → `running` → `completed` ; ou `failed` (analyse en échec, `failureCode`, aucune étape partie), `cancelled` (lot annulé en entier), `interrupted` (serveur redémarré pendant l'analyse ou les étapes). Actifs : `analysing` et `running`. `completedAt` présent dès qu'il est terminé.
- **Un lot actif au plus par cours** : `createAutoRun` rend `busy` tant qu'un autre analyse ou tourne, `duplicate` si le runId existe déjà (lancement renvoyé après une coupure réseau), `missing` sans cours.
- **`request`** : corps capturé au lancement (`lang`, `ageGroup`, `sourceIds` retenus au lancement, `useConsigne`). Chaque étape refait ses gardes avec lui ; une source ajoutée pendant le lot n'y entre pas.
- **Étapes** (`steps`, ordre du plan) : `{ agent, gid, status, failureCode? }`, `gid` = celui de l'entrée du tracker puis de la génération produite. Statuts : `pending`, `completed`, `failed` (`failureCode`), `cancelled`, `interrupted`. `skipped` : agents du plan non exécutés.
- **Lots gardés** : actifs toujours ; terminés, les 20 plus récents ET de moins de 7 jours (`pruneAutoRuns`, au lancement d'un lot), comme le tracker.

## Le tracker reste la source des transitions

- Chaque étape a son entrée du tracker, qui porte le **`runId`** du lot (`PendingTrackerEntryBase.runId`, recopié dans les événements `generation`). **Le store tient l'étape à jour dans la MÊME écriture que chaque transition de son entrée** : `promoteToGeneration` → `completed`, `markPendingFailed` → `failed` + code, `markPendingCancelled` (puce ✕ d'une étape : le lot continue) → `cancelled`. Plus aucune étape en cours sur un lot `running` → lot `completed`. Une génération simple (sans `runId`) ne touche aucun lot.
- **Écritures uniques** : `startAutoRunSteps` pose toutes les entrées (`pending`, `runId`, sources du lancement), le plan et `running` en une écriture (`null` si le lot n'est plus en analyse : rien ne part) ; `cancelAutoRun` annule le lot, ses étapes en cours et leurs entrées en une écriture (une étape en vol chez Mistral ne sera pas promue ; lot déjà terminé : rendu tel quel, sans écriture) ; `failAutoRun` pour une analyse en échec.
- **Entrée terminale = base + arm** (`trackerBase`, `store.ts`) : la base commune est reprise par décomposition, jamais champ par champ (le `runId` était perdu au passage en terminal, défaut relevé au plan du 2026-10-24).
- **Démarrage du serveur** (`cancelAllPendingsAtBoot`) : les entrées en cours passent `cancelled` comme avant ; tout lot actif passe `interrupted` avec ses étapes en cours (`interruptActiveAutoRuns`), écrit même sans entrée (lot en analyse). Jamais de reprise implicite.
- Transitions pures dans `helpers/auto-run-state.ts` (aucune entrée/sortie) ; le store lit, applique, écrit une fois, puis émet.

## Diffusion

- **SSE** : même flux `GET /api/projects/:pid/events`, ligne `event: auto`, `data` = `AutoRunEvent` `{ pid, run }`, l'état COMPLET du lot (copie à l'émission) à chaque changement : lancement, plan, étape, fin. Le client le remplace en bloc. Bus : `emitAutoRunEvent` / `subscribeAutoRun` (`helpers/event-bus.ts`, même enveloppe anti-exception que `subscribeGeneration`).
- Le snapshot `GET /api/projects/:pid` porte `results.autoRuns` : un onglet rechargé retrouve le lot.

## Orchestrateur et routes (`routes/auto-runs.ts`)

- **`POST /:pid/generate/auto/start`** `{ runId, lang?, ageGroup?, sourceIds?, useConsigne?, count? }` → **202 `{ run }`** tout de suite, analyse et étapes en arrière-plan (`runAutoBatch`). Ordre des gardes, avant tout appel facturé et toute écriture : clé (auth-first, `resolveClient`), `runId` UUID v4 (`isUuidV4`, `helpers/request-validation.ts` ; sinon 400 `invalid_input`), projet (404 `project_not_found`), même `runId` déjà lancé (202 avec ce lot : renvoi après une coupure réseau), autre lot actif sur le cours (409 `auto_busy` avec ce lot), 10 lots en cours dans le process au plus (`MAX_ACTIVE_AUTO_RUNS`, 429 `rate_limited`, `Retry-After: 30`), puis les gardes de l'analyse de route (`prepareAutoLaunch` : reprise des modérations jusqu'à 8 s, corps, modération, sources, consigne, contexte). `createAutoRun` re-vérifie le lot actif et le `runId` au moment d'écrire (deux lancements simultanés : un seul lot). Sous `aiLimiter` (`AI_PATH_RE` couvre `generate/`).
- **`GET /:pid/auto-runs/:runId`** → `{ run }` ; **`POST /:pid/auto-runs/:runId/cancel`** → `{ run }` (lot entier, `cancelAutoRun` ; déjà terminé : rendu tel quel) ; lot inconnu : 404 `auto_run_not_found`. Hors `aiLimiter` (jamais de limiteur IA sur une annulation). Une étape seule s'annule par `POST /generations/:gid/cancel` : le lot continue.
- **Analyse** : `planAutoRun` (routage, coût persisté sous `…/generate/auto/route`), agents non exécutables dans `skipped` ; échec → `failAutoRun` avec `extractErrorCode(e, 'route')` (coût capté persisté sous `…/route/failed`). Puis toutes les étapes posées en une écriture (`startAutoRunSteps`, gid serveur par étape) ; `null` (lot annulé pendant le routage, délai, cours supprimé) → aucune étape ne part. L'analyse d'un lot annulé reste facturée.
- **Étapes** : chacune par le cœur des générations simples (`runTrackedGeneration`, mode `preTracked` : l'entrée existe déjà), avec le corps du lancement (`request` : sources retenues au lancement, `count`) — gardes refaites, file par type (`withSameTypeQueue`), coût sous `…/generate/<type>`, promotion. **Au plus 3 en vol par clé, tous lots confondus** (`withKeyedSlots`, `helpers/keyed-slots.ts`, empreinte de la clé ; file FIFO dans l'ordre du plan, place passée de main en main, toujours rendue). À son tour, une étape annulée (puce, lot) ou un lot arrêté ne part pas (`pendingStatus`). Une génération simple ne prend pas de place.
- **Refus pendant une étape** (décision du propriétaire : les autres continuent) : l'entrée passe `failed` avec le code **`refused`** et le code exact du refus dans **`refusal`** (`moderation.blocked`, `moderation.error`, `moderation.pending`, `no_sources`, `context_too_large:<pct>`, `project_not_found`…), recopiés sur l'étape. `refused` n'est jamais produit par `extractErrorCode`. Échec d'une étape (exception) : code de `extractErrorCode`, les autres continuent.
- **Clé** : le client du lancement ne vit que dans le registre `activeRuns` du process (clé `pid:runId` : le `runId` vient du navigateur, deux cours lancés avec le même partageaient une entrée et contournaient le plafond ; entrée retirée seulement si c'est encore la sienne), jamais dans `AutoRun`, un événement ou un journal.
- **Délai maximal de 30 min** (`AUTO_RUN_MAX_MS`, minuteur `unref()`, retiré en `finally`) : étapes encore en cours en échec **`upstream_unavailable`** (code d'un délai dépassé), donc lot `completed` ; analyse encore en cours → `failed` ; clé oubliée tout de suite. Un appel déjà en vol chez Mistral finit sans être promu.
- **Erreur inattendue** de l'orchestrateur : même arrêt avec `internal_error`. `runAutoBatch` ne rejette jamais (`.catch` journalisé au lancement).
- Cours ou profil supprimé pendant le lot : les étapes trouvent le projet absent (refus 404, rien n'est écrit), le lot s'arrête.

## Décisions du propriétaire (2026-10-25) qui restent à faire

- Navigateur : plus aucune étape d'Auto dans la file des 3 requêtes longues de l'onglet ; un toast par étape et un toast final ; lot annulé depuis un autre onglet : un seul message.
- Bouton « Reprendre » sur un lot `interrupted` (étapes manquantes, sans refaire l'analyse), avec la clé de la requête.
- `POST /generate/auto` : supprimée le 2026-10-28 (décision du 2026-10-25), avec ses 8 constructeurs dupliqués et ses tests ; les comportements utiles sont repris par `routes/auto-runs.test.ts`.

Verrous : `store.autoruns.test.ts`, `helpers/auto-run-state.test.ts`, `routes/projects.test.ts` (« écrit un event auto »), `routes/auto-runs.test.ts`, `helpers/keyed-slots.test.ts`.
