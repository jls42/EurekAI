---
paths:
  - "store*.ts"
  - "types.ts"
  - "helpers/auto-run-state*.ts"
  - "helpers/event-bus*.ts"
  - "routes/projects*.ts"
  - "routes/generate*.ts"
---

# Lots Auto côté serveur

Créé le 2026-10-28 (plan « l'Auto continue côté serveur et survit au rechargement », décisions du propriétaire du 2026-10-25). Le modèle de données est en place ; l'orchestrateur, les routes et le navigateur suivent.

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

## Décisions du propriétaire (2026-10-25), pour la suite

- Clé API gardée en mémoire le temps du lot, 30 min au plus, jamais sur disque ni dans les journaux.
- Au plus 3 étapes en vol par clé, 10 lots actifs au plus (429 `rate_limited` au-delà).
- Refus pendant une étape : les autres étapes continuent ; l'étape refusée échoue avec un code précis.
- Un toast par étape et un toast final ; lot annulé depuis un autre onglet : un seul message.
- `POST /generate/auto` supprimée ; bouton « Reprendre » sur un lot `interrupted` (étapes manquantes, sans refaire l'analyse).

Verrous : `store.autoruns.test.ts`, `helpers/auto-run-state.test.ts`, `routes/projects.test.ts` (« écrit un event auto »).
