---
paths:
  - "routes/sources*.ts"
  - "generators/ocr*.ts"
  - "helpers/keyed-lock*.ts"
  - "src/app/source-dedup*.ts"
  - "src/app/sources*.ts"
  - "src/app/helpers*.ts"
  - "src/partials/ocr-badge-src.html"
  - "src/partials/view-sources.html"
  - "store*.ts"
  - "types.ts"
---

# Sources : OCR et doublons

Déplacé tel quel depuis CLAUDE.md (sections « OCR confidence scores » et « Dédup sources (ré-import d'un fichier déjà importé) »), le 2026-10-21.

## OCR confidence scores
- **Type** : `OcrConfidence = { average: number }` dans `types.ts` — stocké en `Source.ocrConfidence?` pour les sources PDF/image.
- **Extraction** : `generators/ocr.ts` passe `confidenceScoresGranularity: 'page'` et `includeBlocks: false` (épingle : le défaut vaut `true` côté API et dans le SDK ≥ 2.6.1, donc dans la 2.7.0 installée → sans elle, payload ~×3,6 inutilisé) à l'API Mistral OCR puis `extractConfidence()` (interne, non exporté) moyenne les `averagePageConfidenceScore` des pages, clampé dans `[0,1]`.
- **Fichier déposé chez Mistral** : `ocrFile` enchaîne upload → `ocr.process` → `files.delete`, la suppression dans un `finally` (sinon la copie du document reste stockée chez Mistral quand l'OCR échoue ; échec de suppression journalisé, jamais propagé). L'API Files renvoie le **même `fileId` pour un contenu identique** (mesuré) : deux OCR concurrents du même fichier (« Importer quand même » un doublon en cours d'OCR, deux onglets) partageaient le fichier distant et la suppression de l'un cassait l'autre → `ocrFile` est sérialisé par contenu via ``withKeyedLock(`ocr:${sha256}`, …)`` (`helpers/keyed-lock.ts` : file FIFO par clé, une erreur ne bloque pas la file, clé retirée de la table après son dernier appel). Contenus différents → en parallèle. **Course connue (mesurée le 2026-09-30, non corrigée)** : renvoyé moins d'une vingtaine de secondes après la suppression par l'appel précédent, un contenu identique reçoit le `fileId` en cours de suppression → OCR en 400 (« could not be found or may have expired », code 3310) ou 422 (« Could not get file », code 1901) ; `withKeyedLock` enchaîne justement ces appels. Rare dans l'app (réimport quasi immédiat du même contenu) ; parade envisagée : nouvelle tentative différée de `uploadAndProcess` sur ces deux codes.
- **Tiers UI** : `src/app/helpers.ts` expose la méthode AppContext `ocrConfidenceTier(src: Source)` → `'high' | 'medium' | 'low' | null` (seuils ≥0.9 / ≥0.7, sinon `'low'`, `null` si `src.ocrConfidence` absent ou non-finite). Badges colorés dans la vue sources + i18n via clé `ocr.confidence` (9 langues). NB : la méthode prend un `Source` complet (pas un `score: number`) — utiliser `src.ocrConfidence?.average` en amont si tu n'as qu'un nombre.
- **Règle** : quand un score est bas, ne PAS bloquer la génération — afficher le badge warning et laisser l'utilisateur décider (les scores bas viennent souvent de scans de mauvaise qualité, pas d'un vrai problème de contenu).

## Dédup sources (ré-import d'un fichier déjà importé)
- **Objectif** : éviter les doublons silencieux + la double facturation OCR. Chaque `Source` porte `contentHash` (sha256 du fichier brut, calculé dans `routes/sources.ts` `hashFileContent` AVANT l'OCR).
- **Double détection** : pré-check **client** (`src/app/source-dedup.ts` `hashFile` via Web Crypto — **feature-detect `crypto?.subtle`**, retourne `null` en contexte non sécurisé HTTP-LAN ; `findExistingDuplicate` par hash, fallback `filename` pour les sources d'avant la feature) **+ garde serveur** en filet (compare aux `contentHash` persistés + intra-batch, `unlink` du fichier multer orphelin). Le garde serveur est un read-then-act (**TOCTOU**, pas un verrou) et ne marque un hash « déjà importé » qu'**après persistance réussie**.
- **Contrat réponse `/sources/upload`** : **array nu** en full success (historique préservé) ; objet `{ sources, failures?, duplicates? }` dès qu'il y a un échec ou un doublon ; **200** (pas 500) quand le lot ne contient que des doublons. `req.body.allowDuplicates === 'true'` **strict** (jamais `Boolean("false")`).
- **UX** : décision **par fichier** dans la liste d'upload (statuts `'hashing'`/`'duplicate'` ; la méthode `isUploading()` — import du cours affiché en cours : bloc « Générer » masqué, « Ajouter » d'un texte désactivé — inclut `'hashing'` mais PAS `'duplicate'`) — `retryFile`/`dismissFailedFile` acceptent `'duplicate'` (« Importer quand même » = re-upload avec `allowDuplicates`, « Ignorer » = dismiss).
- **Import en arrière-plan (2026-10-21)** : un import de fichiers CONTINUE vers son cours quand l'utilisateur change de cours, comme une génération. Jusqu'en v1.7.11, `resetState` vidait `uploadSessions` et la boucle (un fichier à la fois) s'arrêtait en silence après le fichier en cours d'envoi (vécu : 2 fichiers sur plusieurs importés). Deux notions (`src/app/sources.ts`) : `_isSessionAlive` (session encore dans `uploadSessions`) décide de CONTINUER l'envoi ; `_isSessionActive` (vivante ET cours affiché) décide d'APPLIQUER à l'écran (sources sans doublon d'id, sélection, coût, toasts par fichier, modération, consigne). Les doublons sont repérés sur les sources AFFICHÉES : cours changé pendant le calcul → la garde serveur prend le relais. `resetState` garde les sessions ; `deleteProject` retire celles du cours supprimé (l'import s'arrête). Liste d'avancement : méthode `projectUploadSessions()` (cours affiché seulement). Fin pendant qu'un autre cours est affiché : toasts `toast.importDoneIn` / `toast.importErrorsIn` avec `session.projectName` (mémorisé au lancement : la liste `projects` change avec le profil). Langue et clé Mistral capturées aussi au lancement (`session.lang`, `session.aiKey` via `captureAiKey`, `_createUploadSession`) et utilisées par tous les envois de la session, réessais compris : après un changement de profil, les fichiers restants partaient avec la clé et la langue du profil affiché.
