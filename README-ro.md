<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformă orice conținut într-o experiență de învățare interactivă — propulsată de <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Engleză</a> · <a href="README-es.md">🇪🇸 Spaniolă</a> · <a href="README-pt.md">🇧🇷 Portugheză</a> · <a href="README-de.md">🇩🇪 Germană</a> · <a href="README-it.md">🇮🇹 Italiană</a> · <a href="README-nl.md">🇳🇱 Olandeză</a> · <a href="README-ar.md">🇸🇦 Arabă</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chineză</a> · <a href="README-ja.md">🇯🇵 Japoneză</a> · <a href="README-ko.md">🇰🇷 Coreeană</a> · <a href="README-pl.md">🇵🇱 Poloneză</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Suedeză</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demonstrație YouTube"></a>
</p>

<h4 align="center">📊 Calitatea codului</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Poartă de calitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Scor de securitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Scor de fiabilitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Scor de mentenanță"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Acoperire"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilități"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Mirosuri de cod"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Linii de cod"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Insignă Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Povestea — De ce EurekAI ?

**EurekAI** s-a născut în timpul [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site-ul oficial](https://worldwide-hackathon.mistral.ai/)) (în martie 2026). Aveam nevoie de o temă — iar ideea a venit din ceva foarte concret: pregătesc în mod regulat testele cu fiica mea și mi-am spus că ar trebui să fie posibil să fac asta mai distractiv și mai interactiv cu ajutorul IA.

Obiectivul: să iau **orice intrare** — o fotografie a lecției, un text copiat și lipit, o înregistrare vocală, o căutare web — și să o transform în **fișe de recapitulare, flashcards, quiz-uri, podcasturi, texte cu spații libere, ilustrații și multe altele**. Totul este propulsat de modelele franceze Mistral AI, ceea ce o face o soluție natural adaptată elevilor francofoni.

[Prototipul inițial](https://github.com/jls42/worldwide-hackathon.mistral.ai) a fost conceput în 48h în timpul hackathonului ca proof of concept în jurul serviciilor Mistral — deja funcțional, dar limitat. De atunci, EurekAI a devenit un proiect adevărat: texte cu spații libere, navigare în exerciții, scraping web, moderare parentală configurabilă, revizie aprofundată a codului și multe altele. Întregul cod este generat de IA — în principal de [Claude Code](https://code.claude.com/), cu câteva contribuții prin [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Funcționalități

| | Funcționalitate | Descriere |
|---|---|---|
| 📷 | **Import de fișiere** | Importați lecțiile — fotografie, PDF (prin Mistral OCR cu scor de încredere mediat, nivel `high`/`medium`/`low`) sau fișier text (TXT, MD). Sesiuni de upload cu retry per fișier și progres individual |
| 📝 | **Introducere text** | Tastați sau lipiți orice text direct |
| 🎤 | **Intrare vocală** | Înregistrați-vă — Voxtral STT vă transcrie vocea |
| 🌐 | **Web / URL** | Lipiți un URL (scraping direct prin Readability + Lightpanda) sau tastați o căutare (Agent Mistral web_search) |
| 📄 | **Fișe de recapitulare** | Note structurate cu puncte cheie, vocabular, citate, anecdote |
| 🃏 | **Flashcards** | Carduri Q/R interactive, redare audio dialogată |
| ❓ | **Quiz QCM** | Întrebări cu alegere multiplă, cu revizuirea adaptivă a greșelilor (număr configurabil) |
| ✏️ | **Texte cu spații libere** | Exerciții de completat cu indicii și validare tolerantă |
| 🔤 | **Dictare** | Cuvinte dictate audio (Voxtral TTS) dintr-o listă importată, introducere de la tastatură, corectare strictă literă cu literă cu regulă de ortografie explicată |
| 🎙️ | **Podcast** | Mini-podcast cu 2 voci în audio — voce Mistral implicită sau voci personalizate (ale părinților!) |
| 🖼️ | **Ilustrații** | Imagini educative generate de un Agent Mistral |
| 🗣️ | **Quiz vocal** | Întrebări citite cu voce tare (voce personalizată posibilă), răspuns oral, verificare IA |
| 💬 | **Tutor IA** | Chat contextual cu documentele voastre de curs, cu apel de instrumente |
| 🧠 | **Rutare automată** | Un router bazat pe `mistral-small-latest` analizează conținutul și propune o combinație de generatoare dintre cele 8 tipuri disponibile |
| 🔒 | **Control parental** | Moderare configurabilă per profil (categorii personalizabile), PIN parental, restricții ale chatului |
| 🌍 | **Multilingv** | Interfața este disponibilă în 9 limbi; generarea IA poate fi controlată în 15 limbi prin prompturi |
| 🔊 | **Redare cu voce tare** | Ascultați fișele și flashcards-urile (dialog între întrebare/răspuns) prin Mistral Voxtral TTS |
| 💶 | **Urmărirea costurilor API** | Estimare transparentă a costului € pentru fiecare generare și sursă (tokens / caractere / pagini / secunde audio). Insignă pe fiecare card + total pe proiect, vizibil în dashboard |
| 🎨 | **Temă per profil** | Fiecare profil își alege tema `dark` sau `light` — persistă la schimbarea profilului |

---

## Privire de ansamblu asupra arhitecturii

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Privire de ansamblu asupra arhitecturii" width="800" />
</p>

---

## Hartă de utilizare a modelelor

<p align="center">
  <img src="public/assets/model-map.webp" alt="Maparea modelelor IA la sarcini" width="800" />
</p>

---

## Parcursul utilizatorului

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Parcursul de învățare al elevului" width="800" />
</p>

---

## Analiză în profunzime — Funcționalități

### Intrare multimodală

EurekAI acceptă 4 tipuri de surse, moderate în funcție de profil (activat implicit pentru copil și adolescent) :

- **Import de fișiere** — Fișiere JPG, PNG sau PDF procesate prin OCR Mistral — **OCR 4 (`mistral-ocr-4-0`) implicit** (calitate mai bună), **OCR 3 (`mistral-ocr-2512`) opțional** în Setări (mai ieftin, ~½ din cost) — pentru text tipărit, tabele și scris de mână; sau fișiere text (TXT, MD) importate direct. Upload-urile cu mai multe fișiere folosesc un sistem de **sesiuni de upload**: progres individual pentru fiecare fișier, retry pentru fișierul eșuat fără a retrimite celelalte, dismiss al sesiunii când este terminată. OCR-ul expune un **scor de încredere** mediat (`average`, limitat în `[0,1]`, calculat pe baza `averagePageConfidenceScore` returnate de Mistral), afișat în UI sub formă de insignă nivel `high` / `medium` / `low` (praguri ~0.9 / ~0.7) — avertizează fără să blocheze dacă scanarea este de slabă calitate.
- **Text liber** — Tastați sau lipiți orice conținut. Moderat înainte de stocare dacă moderarea este activă.
- **Intrare vocală** — Înregistrați audio în browser. Transcris de `voxtral-mini-latest`. Parametrul `language="fr"` optimizează recunoașterea.
- **Web / URL** — Lipiți unul sau mai multe URL-uri pentru a scrapa conținutul direct (Readability + Lightpanda pentru paginile JS), sau tastați cuvinte-cheie pentru o căutare web prin Agent Mistral. Câmpul unic le acceptă pe ambele — URL-urile și cuvintele-cheie sunt separate automat, iar fiecare rezultat creează o sursă independentă.

### Generare de conținut IA

Opt tipuri de materiale de învățare generate:

| Generator | Model | Rezultat |
|---|---|---|
| **Fișă de recapitulare** | `mistral-large-latest` | Titlu, rezumat, puncte cheie, vocabular, citate, anecdotă |
| **Flashcards** | `mistral-large-latest` | Carduri Q/R cu referințe la surse (număr configurabil) |
| **Quiz QCM** | `mistral-large-latest` | Întrebări cu alegere multiplă, explicații, revizuire adaptivă (număr configurabil) |
| **Texte cu spații libere** | `mistral-large-latest` | Fraze de completat cu indicii, validare tolerantă (Levenshtein) |
| **Dictare** | `mistral-large-latest` + Voxtral TTS | Cuvinte cheie dictate audio (1 MP3/cuvânt) → introducere de la tastatură → corectare strictă (accente) cu regulă explicată |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script cu 2 voci → audio MP3 |
| **Ilustrație** | Agent `mistral-large-latest` | Imagine educativă prin instrumentul `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Întrebări TTS → răspuns STT → verificare IA |

### Tutor IA prin chat

Un tutor conversațional cu acces complet la documentele de curs:

- Folosește `mistral-large-latest`
- **Apel de instrumente**: poate genera fișe, flashcards, quiz-uri sau texte cu spații libere în timpul conversației
- Istoric de 50 de mesaje per curs
- Moderarea conținutului dacă este activată pentru profil

### Rutare automată

Routerul folosește `mistral-small-latest` pentru a analiza conținutul surselor și a propune cei mai relevanți generatori dintre cele 8 disponibile. Interfața afișează progresul în timp real: mai întâi o fază de analiză, apoi generările individuale cu posibilitate de anulare.

### Învățare adaptivă

- **Statistici de quiz**: urmărirea încercărilor și a preciziei pe fiecare întrebare
- **Revizuire de quiz**: generează 5-10 întrebări noi care vizează conceptele slabe
- **Detectarea instrucțiunii**: detectează instrucțiunile de recapitulare („Știu lecția mea dacă știu...”) și le prioritizează în generatorii textuali compatibili (fișă, flashcards, quiz, texte cu spații libere)

### Securitate și control parental

- **4 grupe de vârstă**: copil (≤10 ani), adolescent (11-15), student (16-25), adult (26+)
- **Moderarea conținutului**: `mistral-moderation-2603` (Mistral Moderation 2) cu 10 categorii disponibile, 5 blocate implicit pentru copil/adolescent (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorii personalizabile per profil în setări. Aliasul `-latest` este evitat în mod deliberat (încă indică o versiune depreciată).
- **PIN parental**: hash SHA-256, necesar pentru profilurile sub 15 ani. Pentru o implementare în producție, prevedeți un hash lent cu sare (Argon2id, bcrypt).
- **Restricții ale chatului**: chatul IA dezactivat implicit pentru cei sub 16 ani, activabil de către părinți

### Sistem cu mai multe profiluri

- Profiluri multiple cu nume, vârstă, avatar, preferințe de limbă
- **Voci per profil** (`Profile.mistralVoices?: { host, guest }`) — fiecare copil poate avea propria pereche de voci pentru podcast/quiz vocal
- **Temă per profil** (`Profile.theme: 'dark' | 'light'`) — comutare automată la schimbarea profilului, persistată în backend
- Proiecte legate de profiluri prin `profileId`
- Ștergere în cascadă: ștergerea unui profil șterge toate proiectele sale

### Urmărirea costurilor API

Fiecare apel Mistral (chat, OCR, STT, TTS, moderare, agenți) este instrumentat pentru a furniza utilizatorului o estimare € **transparentă** — fără surprize la facturare.

- **Sursă de adevăr**: `helpers/pricing.ts` — `MODEL_PRICING` după prefixul modelului (de ex: `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` cu URL-uri către documentația Mistral pentru rescraping periodic
- **Unități acceptate**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie gestionată de `helpers/cost-calc.ts`
- **Lanț de instrumentare**: `helpers/tracked-client.ts` (wrap client Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectare în răspunsul HTTP)
- **UI**: insignă de cost per generare (`src/partials/cost-badge-gen.html`), per sursă (`cost-badge-src.html`), total cumulat în dashboard (`Project.totalCost`)
- **Endpoint-uri**: răspunsurile `/generate/*` și `/sources/*` îmbogățesc obiectul returnat (Generation / Source) cu `estimatedCost`, `usage` și `costBreakdown`. `POST /generate/route` adaugă un câmp `costDelta: number` pentru costul exclusiv al rutării. `GET /projects/:pid` returnează proiectul îmbogățit cu `totalCost` (sumă calculată din `costLog[]`) + istoricul complet

### TTS (Mistral Voxtral) și voci personalizate

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, sinteză vocală 100% Mistral, nu este necesară nicio cheie suplimentară
- **Voci personalizate**: părinții își pot crea propriile voci prin API-ul Mistral Voices (pe baza unui eșantion audio) și le pot atribui rolurilor gazdă/invitat — podcasturile și quiz-urile vocale sunt apoi citite cu vocea unui părinte, făcând experiența și mai imersivă pentru copil
- Două roluri vocale configurabile: **gazdă** (narator principal) și **invitat** (a doua voce a podcastului)
- Catalogul complet al vocilor Mistral este disponibil în setări, filtrabil după limbă

### Internaționalizare

- Interfață disponibilă în 9 limbi: fr, en, es, pt, it, nl, de, hi, ar
- Prompturile IA suportă 15 limbi (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Limba configurabilă per profil

---

## Stack tehnic

| Strat | Tehnologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server și siguranță de tipuri |
| **Backend** | Express 5.x | API REST |
| **Server de dezvoltare** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfață reactivă, TypeScript compilat de Vite |
| **Templating** | vite-plugin-handlebars | Compoziție HTML prin partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderare |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, sinteză vocală integrată |
| **Iconițe** | Lucide 1.x | Bibliotecă de iconițe SVG |
| **Scraping web** | Readability + linkedom | Extragerea conținutului principal al paginilor web (tehnologia Firefox Reader View) |
| **Browser headless** | Lightpanda | Browser headless ultra-ușor (Zig + V8) pentru paginile JS/SPA — scraping de rezervă |
| **Markdown** | Marked | Redare markdown în chat |
| **Upload fișiere** | Multer 2.x | Gestionarea formularelor multipart |
| **Audio** | ffmpeg-static | Concatenarea segmentelor audio |
| **Teste** | Vitest | Teste unitare — acoperirea măsurată de SonarCloud |
| **Persistență** | Fișiere JSON | Stocare fără dependențe |

---

## Referința modelelor

| Model | Utilizare | De ce |
|---|---|---|
| `mistral-large-latest` | Fișă, Flashcards, Podcast, Quiz, Texte cu spații libere, Chat, Verificare quiz vocal, Agent Imagine, Agent Web Search, Detectarea instrucțiunii | Cel mai bun pentru multilingvism + urmărirea instrucțiunilor |
| `mistral-ocr-4-0` (OCR 4, implicit) | OCR de documente — calitate superioară | Text tipărit, tabele, scris de mână ($4 / 1000 pagini) |
| `mistral-ocr-2512` (OCR 3, opțiune) | OCR de documente | Selectabil în Setări, mai ieftin ($2 / 1000 pagini) |
| `voxtral-mini-latest` | Recunoaștere vocală (STT) | STT multilingv, optimizat cu `language="fr"` |
| `voxtral-mini-tts-latest` | Sinteză vocală (TTS) | Podcasturi, quiz vocal, redare cu voce tare |
| `mistral-moderation-2603` | Moderare de conținut | 5 categorii blocate pentru copil/adolescent (inclusiv `jailbreaking`) |
| `mistral-small-latest` | Rutare automată | Analiză rapidă a conținutului pentru decizii de rutare |

---
## Pornire rapidă

```bash
# Cloner le dépôt
git clone https://github.com/jls42/EurekAI.git
cd EurekAI

# Installer les dépendances
npm install

# Configurer les clés API
cp .env.example .env
# Éditez .env (toutes optionnelles) :
#   MISTRAL_API_KEY=<your_api_key>           (optionnel — sinon chaque utilisateur saisit sa clé dans l'app)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Notă** : Mistral Voxtral TTS este singurul furnizor TTS — nu este necesară nicio cheie suplimentară dincolo de `MISTRAL_API_KEY`.

> **Cheie API introdusă de utilizator** : `MISTRAL_API_KEY` este acum **opțională**. Dacă lipsește, aplicația pornește oricum și invită fiecare utilizator să își introducă **propria cheie Mistral** în interfață. Cheia este **stocată în browser** (criptată prin Web Crypto + IndexedDB în context securizat) și trimisă prin request — **niciodată persistată pe server**. Precedență: cheia profilului > cheia globală din browser > `MISTRAL_API_KEY` (env). Setarea `EUREKAI_REQUIRE_USER_KEY=true` forțează fiecare utilizator să își furnizeze cheia (cheia din env mai servește doar la preîncărcări).

> **HTTPS local (tabletă/LAN)** : `localhost` este deja un context securizat. Pentru acces LAN (tabletă), generează un certificat local și activează HTTPS pentru a debloca criptarea din browser + a cripta cheia în tranzit :
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variabile de mediu

| Variabilă | Necesar | Implicit | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | opțional | — | Cheie API Mistral (chat, OCR, STT, TTS Voxtral, agenți, moderare). Dacă lipsește, utilizatorul își introduce cheia în aplicație (stocată în browser, niciodată pe server) |
| `EUREKAI_REQUIRE_USER_KEY` | opțional | `false` | `true` → dezactivează fallback-ul pe `MISTRAL_API_KEY` pentru cererile AI (fiecare utilizator TREBUIE să își furnizeze cheia). Util pe o instanță expusă |
| `HTTPS_KEY` / `HTTPS_CERT` | opțional | — | Căi cheie/cert TLS (cf. `scripts/gen-cert.sh`) → Express și Vite servesc în HTTPS (secure context LAN/tabletă) |
| `PORT` | opțional | `3000` | Portul HTTP al backend-ului Express |
| `NODE_ENV` | opțional | `development` | Dacă `production` → Express servește frontendul din `dist/` (altfel `public/`) |
| `SONAR_TOKEN` | opțional CI | — | Folosit doar de workflow-ul GitHub Actions SonarCloud |

### Teste, calitate a codului și contribuție

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooks Git (Husky)** : `pre-commit` lansează `npm test`, `pre-push` lansează `npm run security`. Ambele blochează commit/push-ul în caz de eșec.

**Instrumente externe necesare (opționale, dar folosite de `pretest` / `npm run security`)** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Fără aceste instrumente, `npm test` eșuează la `pretest` (lizard absent) și `npm run security` eșuează (opengrep absent). Hooks-urile husky blochează atunci commit/push-ul.

---

## Implementare cu container

Imaginea este publicată pe **GitHub Container Registry** :

```bash
# Télécharger l'image
podman pull ghcr.io/jls42/eurekai:latest

# Lancer EurekAI
mkdir -p ./data
podman run -d --name eurekai \
  -e MISTRAL_API_KEY=<your_api_key> \
  -v ./data:/app/output:U \
  -p 3000:3000 \
  ghcr.io/jls42/eurekai:latest
# → http://localhost:3000
```

> **`:U`** este un flag Podman rootless care ajustează automat permisiunile volumului.

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## Structura proiectului

```
server.ts                 — Point d'entrée Express, monte les routes + config
config.ts                 — Config runtime (modèles, voix, modèle TTS), persistée dans output/config.json
store.ts                  — ProjectStore : CRUD projets/sources/générations, persistance JSON
profiles.ts               — ProfileStore : gestion des profils, hachage PIN
types.ts                  — Types TypeScript : Source, Generation (8 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, 15 langues)

generators/
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (8 agents) + MAX_AUTO_PLAN_LENGTH
  generation-types.ts     — Types générables individuellement (SINGLE_GENERATE_TYPES, coïncide avec les 8 agents auto)
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF) avec extraction interne des scores de confiance moyens par page
  summary.ts              — Génération de fiche de révision (JSON structuré)
  flashcards.ts           — Flashcards Q/R (nombre configurable)
  quiz.ts                 — Quiz QCM (nombre configurable) + révision adaptative
  fill-blank.ts           — Exercices à trous avec validation tolérante
  dictation.ts            — Dictée : mots + phrases-exemples + règles, 1 audio TTS par mot (8e agent auto)
  podcast.ts              — Script podcast 2 voix
  quiz-vocal.ts           — Quiz vocal : questions TTS + réponses STT + vérification IA
  image.ts                — Génération d'image via Agent Mistral (outil image_generation)
  chat.ts                 — Tuteur IA par chat avec appel d'outils
  router.ts               — Routeur automatique (contenu → générateurs recommandés)
  consigne.ts             — Détection de consignes de révision
  tts-provider.ts         — TTS Mistral Voxtral (synthèse vocale + listing des voix)
  tts.ts                  — Génération audio multi-voix (podcast + flashcards, concaténation de segments)
  stt.ts                  — Voxtral STT (audio → texte)
  websearch.ts            — Agent Mistral avec outil web_search (fallback)
  moderation.ts           — Modération de contenu (filtrage par âge)

routes/
  projects.ts             — CRUD projets
  profiles.ts             — CRUD profils avec gestion du PIN
  sources.ts              — Import fichiers (OCR + texte brut), texte libre, voix STT, scraping URL + recherche web, modération
  generate.ts             — Endpoints de génération (8 types + auto + route)
  generations.ts          — Tentatives de quiz/fill-blank, réponses vocales, lecture à voix haute
  chat.ts                 — Chat IA avec appel d'outils

helpers/
  # IO & parsing
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  audio-files.ts          — Persistance et lecture des fichiers audio générés (podcast, flashcards)
  logger.ts               — Logger structuré (niveaux, contexte JSON)

  # Génération & UX
  auto-title.ts           — autoTitle(type, data, lang) : préfixe auto pour carte liste (Fiche, Note, Quiz, etc.)
  choice-labels.ts        — Labels localisés des choix (quiz, quiz-vocal) — 9 langues
  diversity.ts            — Diversité des générations (exclusion du contenu déjà produit, `diversityParams` : temperature/presencePenalty/randomSeed)
  fill-blank-validate.ts  — Validation tolérante des réponses (normalisation, Levenshtein)
  dictation-diff.ts       — Comparaison stricte lettre à lettre pour la correction de dictée (local, zéro coût IA)
  reading-comfort.ts      — Option « Confort de lecture » par profil (police Luciole, espacements) — partagé serveur/client
  ocr-models.ts           — Source de vérité sélection OCR (OCR 4 défaut / OCR 3 option) + normalizeOcrModel

  # Codes d'erreur stables
  error-codes.ts              — Re-export mince de l'API publique
  error-code-resolution.ts    — Orchestration extractErrorCode(e, agent) → FailedStepCode
  error-code-rules.ts         — Règles de mapping par agent/step
  error-matchers.ts           — Matchers par pattern d'erreur HTTP/LLM (délimités pour Lizard)

  # Cost tracking API (suivi coûts €)
  pricing.ts              — MODEL_PRICING + PRICING_SOURCES (tarifs Mistral par prefix de modèle)
  cost-calc.ts            — Conversion ApiUsage → coût € (tokens / characters / pages / audio-seconds)
  cost-persist.ts         — Écriture dans Project.costLog + totalCost
  cost-middleware.ts      — Injection de costDelta dans la réponse HTTP
  tracked-client.ts       — Wrap du client Mistral (capture ApiUsage automatiquement)
  usage-context.ts        — AsyncLocalStorage pour propager l'usage dans les pipelines async

  # Clé API Mistral & sécurité
  mistral-client-factory.ts — Source UNIQUE de construction du client Mistral (buildTrackedClient, resolveClient, requireKeyMiddleware)
  rate-limit.ts           — Rate-limiters Express (authLimiter, aiLimiter, generalLimiter)
  security-headers.ts     — Options Helmet / CSP (createHelmetOptions)
  redact.ts               — Redaction des secrets dans les logs (clé API, headers sensibles)
  mistral-retry.ts        — Retry avec backoff sur erreurs transitoires Mistral (3 tentatives)

  # Événements & notifications (SSE)
  event-bus.ts            — Bus d'événements de génération en mémoire (dispatch SSE, filet anti-uncaughtException)
  event-key.ts            — Clé d'événement typée partagée client/serveur (idempotence notifications)

  # Voix & profils
  voice-selection.ts      — selectVoices : rotation déterministe par profil + langue (host/guest)
  voice-types.ts          — Type MistralVoice (importable côté frontend sans embarquer le SDK Mistral)

src/                      — Frontend (Vite + Handlebars)
  index.html              — Point d'entrée HTML principal
  main.ts                 — Entrée frontend (init Alpine.js + icônes Lucide)
  app/                    — Modules applicatifs Alpine.js
    state.ts              — Gestion d'état réactif
    navigation.ts         — Routage des vues + gardes par âge
    profiles.ts           — Logique du sélecteur de profils
    projects.ts           — CRUD des cours
    sources.ts            — Gestionnaires d'upload de sources
    generate.ts           — Déclencheurs de génération (individuel, tout, auto 2 phases)
    generations.ts        — Affichage + actions sur les générations
    chat.ts               — Interface de chat
    config.ts             — Interface de configuration (modèles, voix, modèle TTS)
    render.ts             — Helpers de rendu HTML
    i18n.ts               — Changement de langue
    ...
  components/
    quiz.ts               — Composant quiz interactif
    quiz-vocal.ts         — Composant quiz vocal
    fill-blank.ts         — Composant textes à trous
    fill-blank-validate.ts — Ré-export client de la validation textes à trous (validateAnswer)
    flashcards.ts         — Composant flashcards avec retournement
    dictation.ts          — Composant dictée interactif
    step-by-step.ts       — Mixin navigation pas-à-pas (quiz, fill-blank, flashcards)
  i18n/
    fr.ts, en.ts, es.ts, — Dictionnaires par langue (9 langues)
    pt.ts, it.ts, nl.ts,
    de.ts, hi.ts, ar.ts
    languages.ts          — Registre des langues UI disponibles
    index.ts              — Chargeur i18n
  partials/               — Partials HTML Handlebars (header, sidebar, dialogues, vues)
  styles/
    main.css              — Entrée TailwindCSS
    theme.css             — Variables de thème personnalisées

public/assets/            — Ressources statiques (logo, avatars, schémas architecture)
docs/                     — Notes internes (inventaire prompts, audits)
scripts/                  — Tooling : check-deps, check-security, check-complexity, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **Pentru colaboratorii AI** : consultați [`CLAUDE.md`](CLAUDE.md) pentru contextul arhitectural detaliat, regulile obligatorii (anti-leak prompts, coduri de eroare, cost tracking) și capcanele cunoscute (Lizard CCN, Opengrep, migrarea Codacy/Semgrep).

---

## Referință API

### Config
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/config` | Configurația curentă |
| `PUT` | `/api/config` | Modifică configurația (modele, voce, model TTS) |
| `GET` | `/api/config/status` | Starea API-urilor: `mistral` (cheie Mistral definită), `ttsAvailable` (alias pentru `mistral`, Mistral Voxtral este singurul furnizor TTS) |
| `POST` | `/api/config/reset` | Resetează configurația la valorile implicite |
| `GET` | `/api/config/voices` | Listează vocile Mistral TTS (opțional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorii de moderare disponibile + valori implicite după vârstă |
| `POST` | `/api/providers/mistral/validate` | Validează o cheie Mistral introdusă de utilizator — mereu 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), fără fallback env |

### Profiluri
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/profiles` | Listează toate profilurile |
| `POST` | `/api/profiles` | Creează un profil |
| `PUT` | `/api/profiles/:id` | Modifică un profil (PIN necesar pentru < 15 ani) |
| `DELETE` | `/api/profiles/:id` | Șterge un profil + cascadă proiecte `{pin?}` → `{ok, deletedProjects}` |

### Proiecte
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects` | Listează proiectele (`?profileId=` opțional) |
| `POST` | `/api/projects` | Creează un proiect `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detalii despre proiect |
| `PUT` | `/api/projects/:pid` | Redenumește `{name}` |
| `DELETE` | `/api/projects/:pid` | Șterge proiectul |
| `GET` | `/api/projects/:pid/events` | Flux SSE în timp real (`event: generation`) al tranzițiilor de generare (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Surse
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import fișiere multipart (OCR pentru JPG/PNG/PDF, citire directă pentru TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Text liber `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL sau căutare web `{query}` — returnează un tablou de surse |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Șterge o sursă |
| `POST` | `/api/projects/:pid/moderate` | Moderează `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectează instrucțiunile de revizuire |

### Generare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fișă de revizuire |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Texte cu spații lipsă |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictare (cuvinte + fraze-exemplu + reguli, 1 audio TTS per cuvânt; propusă și de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustrație |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revizuire adaptivă `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Fișă de recapitulare axată pe întrebările ratate dintr-un quiz `{generationId, weakQuestions}` — apelată în paralel cu `quiz-review` de butonul „Antrenează-mă pe greșelile mele” |
| `POST` | `/api/projects/:pid/generate/route` | Analiză de rutare (planul generatorilor de lansat) — returnează `{plan, costDelta}` (costul doar al rutării) |
| `POST` | `/api/projects/:pid/generate/auto` | Generare automată backend (rutare + 8 tipuri: rezumat, flashcards, quiz, completare-spații, podcast, quiz vocal, imagine, dictare). Execuție în paralel — presupune un tier Mistral cu rate-limit ≥ 8 cereri simultane; altfel mai multe 429 pot apărea în `failedSteps`. |

Toate rutele de generare acceptă `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` și `remediation-summary` necesită în plus `{generationId, weakQuestions}`.

### CRUD Generări
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Trimite răspunsurile la quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Trimite răspunsurile la textele cu spații lipsă `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Trimite răspunsurile de dictare `{answers}` (scor server strict) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verifică un răspuns oral (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Redare TTS cu voce tare (fișe/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Anulează o generare în curs (singura cale de anulare a unui pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Redenumește `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Șterge generarea |

### Chat
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperează istoricul chatului |
| `POST` | `/api/projects/:pid/chat` | Trimite un mesaj `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Șterge istoricul chatului |

---

## Decizii arhitecturale

| Decizie | Justificare |
|---|---|
| **Alpine.js în loc de React/Vue** | Amprentă minimă, reactivitate ușoară cu TypeScript compilat de Vite. Perfect pentru un hackathon în care viteza contează. |
| **Persistență în fișiere JSON** | Fără dependențe, pornire instantanee. Nicio bază de date de configurat — pornești și gata. |
| **Vite + Handlebars** | Ce-i mai bun din ambele lumi: HMR rapid pentru dezvoltare, partials HTML pentru organizarea codului, Tailwind JIT. |
| **Prompts centralizate** | Toate prompts-urile AI în `prompts.ts` — ușor de iterat, testat și adaptat pe limbă/grupă de vârstă. |
| **Sistem multi-generări** | Fiecare generare este un obiect independent cu propriul ID — permite mai multe fișe, quiz-uri etc. per curs. |
| **Prompts adaptate după vârstă** | 4 grupe de vârstă cu vocabular, complexitate și ton diferite — același conținut predă diferit în funcție de cursant. |
| **Funcționalități bazate pe Agenți** | Generarea de imagini și căutarea web folosesc Agenți Mistral temporari — ciclu de viață propriu cu curățare automată. |
| **Scraping inteligent de URL-uri** | Un singur câmp acceptă URL-uri și cuvinte-cheie amestecate — URL-urile sunt scrapate prin Readability (pagini statice) cu fallback Lightpanda (pagini JS/SPA), cuvintele-cheie declanșează un agent Mistral web_search. Fiecare rezultat creează o sursă independentă. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (fără cheie suplimentară dincolo de `MISTRAL_API_KEY`) — sinteză vocală integrată în lanțul de cost și în rezolvarea vocii după limbă. |

---

## Credite și mulțumiri

- **[Mistral AI](https://mistral.ai)** — Modele AI (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Cadru reactiv ușor
- **[TailwindCSS](https://tailwindcss.com)** — Cadru CSS utilitar
- **[Vite](https://vitejs.dev)** — Instrument de build frontend
- **[Lucide](https://lucide.dev)** — Bibliotecă de iconițe
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extragere de conținut web (tehnologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Browser headless ultra-ușor pentru scraping-ul paginilor JS/SPA
- **[Luciole](https://luciole-vision.com)** — Font conceput pentru cititorii cu deficiențe de vedere, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opțiunea «Confort de citire» a profilurilor)

Inițiat în timpul Mistral AI Worldwide Hackathon (martie 2026), dezvoltat integral cu IA folosind [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licență

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Articol tradus din fr în ro cu gpt-5.4-mini.**
