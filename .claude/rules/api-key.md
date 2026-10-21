---
paths:
  - "helpers/mistral-client-factory*.ts"
  - "helpers/redact*.ts"
  - "helpers/logger*.ts"
  - "src/app/api-key*.ts"
  - "src/app/ai-fetch*.ts"
  - "src/partials/dialog-api-key.html"
  - "routes/**/*.ts"
  - "server*.ts"
  - "scripts/gen-cert.sh"
  - ".env.example"
---

# Clé API Mistral

Déplacé tel quel depuis CLAUDE.md (section « Clé API Mistral (multi-source, navigateur) »), le 2026-10-21.

## Clé API Mistral (multi-source, navigateur)
- **Objectif** : `.env` peut être **vide** ; l'utilisateur saisit sa clé dans l'UI, **stockée dans son navigateur** (jamais sur le disque serveur), envoyée **par requête**. Clé **globale navigateur + override par profil**. Env = fallback déploiement (ECS/k8s).
- **Source UNIQUE de construction** : `helpers/mistral-client-factory.ts` — `buildTrackedClient(apiKey)` (track-once : `trackClient` appelé 1×/instance), `resolveApiKey(req)`, `resolveClient(req)`, `requireKeyMiddleware` (pré-multer), `keyFingerprint`. **Plus aucun `new Mistral(...)` / `trackClient(...)` hors de ce fichier** (le singleton `server.ts` a disparu). Le client header n'est **PAS caché** (la clé utilisateur ne reste pas en mémoire) ; seul l'`envClient` est singleton (warmups + fallback).
- **Précédence** : navigateur résout **profil > globale navigateur** (cf. `src/app/api-key.ts` `resolveRecord`) et envoie le header ; serveur résout **header > env** (`resolveClient`). Soit **profil > globale navigateur > env**.
- **Anti-facturation silencieuse de l'hôte** : un header présent mais **malformé** ⇒ `400 invalid_api_key`, **jamais** de fallback env. Le fallback env n'est utilisé que si le header est **strictement absent**. Validation `validateKeyFormat` : printable ASCII sans espace/contrôle (anti-CRLF, le header finit en `Authorization: Bearer` vers Mistral).
- **`EUREKAI_REQUIRE_USER_KEY=true`** : désactive le fallback env pour les requêtes IA (déploiement exposé) ; `getApiStatus()` met alors `mistral`/`ttsAvailable` à false ET expose `requireUserKey` → le frontend **force le gate** (sinon il sauterait l'onboarding puis se prendrait des 401).
- **Auth-first** : chaque handler IA résout la clé **AVANT** toute validation/IO (donc avant `addPendingEntry` → pas de pending tracker orphelin). Pour `/generate/*` la résolution est dans le gate (`buildGenContext`/`handleGeneration`) ; pour `quiz-review`, AVANT `validateQuizReviewInputs`. **Pré-multer** (`requireKeyMiddleware`) sur les 3 uploads (`sources/upload`, `sources/voice`, `generations/:gid/vocal-answer`) → aucun fichier temporaire écrit sans clé.
- **`/generate/auto`** : le split audio se base sur le **client effectif résolu** (la même clé fait chat ET TTS Voxtral), plus sur `getApiStatus().ttsAvailable` (env-only, faux avec une clé navigateur + `.env` vide).
- **Coalescing consigne** keyé `pid+keyFingerprint` (`routes/sources.ts`) : deux profils/clés sur le même projet ne partagent pas le scan (sinon le replay facturerait la mauvaise clé).
- **Rate-limit** : couverture `aiLimiter` élargie à `detect-consigne`, `moderate` (sous `/:pid/`, hors `/sources/`), `vocal-answer` et `read-aloud` (sous `generations/:gid/`), `/api/providers/*` (validate) et `/api/config/voices` — toutes appellent Mistral. `POST /:pid/sources/moderate` est sous `/sources/` : déjà couvert. Détail des limiteurs : section « Codes d'erreur API ».
- **Tâches de fond hors requête** (reprise des modérations au démarrage) : `getBackgroundClient()` = client env seulement si `envFallbackAllowed` (clé d'env présente, pas `EUREKAI_REQUIRE_USER_KEY=true`), sinon `null` — **jamais une clé utilisateur**, qui n'existe que le temps de sa requête.
- **`POST /api/providers/mistral/validate`** : **toujours 200** `{ status }` (`ok|invalid|quota|network|missing`), `allowEnv:false` (une clé vide ne valide pas l'env). `/api/config/voices` : `[]` si aucun client résolu (jamais `setVoiceCache([])`), 400 si header malformé.
- **Header front** : `withAiHeaders(init)` (`src/app/ai-fetch.ts`) décore **tous les call sites IA** — `fetch(url, withAiHeaders(init))` **préserve le shape `fetch(url, …)`** attendu par l'analyse SSRF (cf. Sécurité), **jamais de `Content-Type`** (uploads FormData), **omet les 2 headers** si clé vide/malformée (→ fallback env). Tout nouveau call site IA DOIT l'utiliser. **Action qui attend ou continue après un changement de profil** (Auto, import, enregistrement vocal, génération dont le pré-contrôle attend la modération, remédiation) : clé capturée au lancement par `captureAiKey()` et passée en `withAiHeaders(init, { keyOverride })`, jamais relue à l'envoi (ce serait celle du profil affiché, chargée par `selectProfile` → `refreshKeyState`). Piège du `??` : un `keyOverride` `null`/absent retombe sur la clé ACTIVE ; `captureAiKey()` rend `''` sans clé, ce qui omet les en-têtes (clé d'env), jamais la clé d'un autre profil.
- **Redaction logs** : `helpers/redact.ts` (appelée dans `helpers/logger.ts`) masque les **champs sensibles connus** (`authorization`, `x-eurekai-ai-key`, …) + la **valeur de la clé env** ; honnête : ne tente PAS de scrubber une clé inconnue d'un texte libre. Défense primaire = ne jamais logger la clé/headers à la source.
- **Stockage navigateur** (`src/app/api-key.ts`) : AES-GCM avec **master key non-extractable auto-générée dans IndexedDB** (secure context) ; `KeyRecord` chiffré (`{encrypted:true,iv,ct}`) ou clair (`{encrypted:false,value}`) en `localStorage` (slots `sf-api-keys-global`, `sf-profile-api-keys`). Hors secure context / IndexedDB bloqué (incognito) → **fallback clair derrière consentement explicite** (UI), **re-chiffré** au retour en secure context. Master key perdue → `purgeKeyring` + gate. Clé purgée à la suppression du profil. `selectProfile` est **async** (charge la clé avant les fetchs IA).
- **HTTPS local** (`scripts/gen-cert.sh` : mkcert sinon openssl) : si `HTTPS_KEY`/`HTTPS_CERT` définis, Express **et** Vite servent en HTTPS → secure context sur tablette/LAN (le chiffrement IndexedDB marche partout) + clé chiffrée en transit. `localhost` est déjà un secure context (rien à faire). Reverse-proxy : **ne pas logger** `X-EurekAI-AI-Key`.
- **Modèle de menace (honnête)** : protège la **fuite disque serveur** + le **transit** (HTTPS) + un dump simple du stockage navigateur en secure context (réduit l'exposition, **pas un coffre-fort**). NE protège **pas** d'un **XSS** (CSP `unsafe-inline+eval`) ni d'un serveur compromis au runtime. `/api/*` n'a **pas d'auth** → avec fallback env, l'instance est un proxy IA ouvert (atténué par `EUREKAI_REQUIRE_USER_KEY`).
