<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformă orice conținut într-o experiență de învățare interactivă — alimentată de <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Engleză</a> · <a href="README-es.md">🇪🇸 Spaniolă</a> · <a href="README-pt.md">🇧🇷 Portugheză</a> · <a href="README-de.md">🇩🇪 Germană</a> · <a href="README-it.md">🇮🇹 Italiană</a> · <a href="README-nl.md">🇳🇱 Neerlandeză</a> · <a href="README-ar.md">🇸🇦 Arabă</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chineză</a> · <a href="README-ja.md">🇯🇵 Japoneză</a> · <a href="README-ko.md">🇰🇷 Coreeană</a> · <a href="README-pl.md">🇵🇱 Poloneză</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Suedeză</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demo YouTube"></a>
</p>

<h4 align="center">📊 Calitatea codului</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Poartă de calitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Evaluare de securitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Evaluare de fiabilitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Evaluare de mentenabilitate"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Acoperire"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilități"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Mirosuri de cod"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Linii de cod"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Insigna Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Povestea — De ce EurekAI?

**EurekAI** s-a născut în timpul [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (martie 2026). Aveam nevoie de un subiect — și ideea a venit din ceva foarte concret: pregătesc în mod regulat verificările împreună cu fiica mea și mi-am spus că trebuie să existe o modalitate de a face asta mai distractivă și mai interactivă cu ajutorul AI.

Obiectivul: să iau **orice intrare** — o fotografie a lecției, un text copiat și lipit, o înregistrare vocală, o căutare web — și să o transform în **fișe de recapitulare, flashcards, quiz-uri, podcasturi, texte cu spații de completat, ilustrații și multe altele**. Totul alimentat de modelele franceze Mistral AI, ceea ce îl face o soluție adaptată în mod natural elevilor francofoni.

[Prototipul inițial](https://github.com/jls42/worldwide-hackathon.mistral.ai) a fost conceput în 48h în timpul hackathonului ca dovadă de concept în jurul serviciilor Mistral — deja funcțional, dar limitat. De atunci, EurekAI a devenit un proiect adevărat: texte cu spații de completat, navigare în exerciții, scraping web, moderare parentală configurabilă, revizuire aprofundată a codului și multe altele. Întregul cod este generat de AI — în principal [Claude Code](https://code.claude.com/), cu câteva contribuții prin [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Funcționalități

| | Funcționalitate | Descriere |
|---|---|---|
| 📷 | **Import de fișiere** | Importați lecțiile — fotografie, PDF (prin Mistral OCR cu scor de încredere mediat, nivelurile `high`/`medium`/`low`) sau fișier text (TXT, MD). Sesiuni de upload cu retry per fișier și progres individual |
| 📝 | **Introducere de text** | Tastați sau lipiți orice text direct |
| 🎤 | **Intrare vocală** | Înregistrați-vă — Voxtral STT vă transcrie vocea |
| 🌐 | **Web / URL** | Lipiți un URL (scraping direct prin Readability + Lightpanda) sau introduceți o căutare (Agent Mistral web_search) |
| 📄 | **Fișe de recapitulare** | Note structurate cu puncte-cheie, vocabular, citate, anecdote |
| 🃏 | **Flashcards** | Carduri Q/R interactive, redare audio dialogată |
| ❓ | **Quiz QCM** | Întrebări cu alegere multiplă cu revizuire adaptivă a erorilor (număr configurabil) |
| ✏️ | **Texte cu spații de completat** | Exerciții de completat cu indicii și validare tolerantă |
| 🔤 | **Dictare** | Cuvinte dictate audio (Voxtral TTS) dintr-o listă importată, introducere de la tastatură, corectare strictă literă cu literă cu regulă de ortografie explicată |
| 🎙️ | **Podcast** | Mini-podcast în 2 voci audio — voce Mistral implicită sau voci personalizate (părinți!) |
| 🖼️ | **Ilustrații** | Imagini educative generate de un Agent Mistral |
| 🗣️ | **Quiz vocal** | Întrebări citite cu voce tare (voce personalizată posibilă), răspuns oral, verificare AI |
| 💬 | **Tutor AI** | Chat contextual cu documentele voastre de curs, cu apel de instrumente |
| 🧠 | **Rută automată** | Un router bazat pe `mistral-small-latest` analizează conținutul și propune o combinație de generatoare dintre cele 8 tipuri disponibile |
| 🔒 | **Control parental** | Moderare configurabilă pe profil (categorii personalizabile), PIN parental, restricții ale chatului |
| 🌍 | **Multilingv** | Interfață disponibilă în 9 limbi; generarea AI poate fi controlată în 15 limbi prin prompturi |
| 🔊 | **Redare cu voce tare** | Ascultați fișele și flashcards-urile (dialog între întrebare/răspuns) prin Mistral Voxtral TTS |
| 💶 | **Urmărirea costurilor API** | Estimare transparentă a costului € pentru fiecare generare și sursă (tokeni / caractere / pagini / secunde audio). Badge per card + total per proiect, vizibil în dashboard |
| 🎨 | **Temă per profil** | Fiecare profil își alege tema `dark` sau `light` — se păstrează la schimbarea profilului |

---

## Prezentare generală a arhitecturii

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Prezentare generală a arhitecturii" width="800" />
</p>

---

## Harta de utilizare a modelelor

<p align="center">
  <img src="public/assets/model-map.webp" alt="Maparea modelelor AI la sarcini" width="800" />
</p>

---

## Parcursul utilizatorului

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Parcursul de învățare al elevului" width="800" />
</p>

---

## Analiză în profunzime — Funcționalități

### Intrare multimodală

EurekAI acceptă 4 tipuri de surse, moderatate în funcție de profil (activat implicit pentru copil și adolescent):

- **Import de fișiere** — Fișiere JPG, PNG sau PDF procesate prin OCR Mistral — **OCR 3 (`mistral-ocr-2512`) implicit**, **OCR 4 (`mistral-ocr-4-0`) opțional** în Setări (calitate mai bună, dar cost de 2×) — pentru text tipărit, tabele și scriere de mână; sau fișiere text (TXT, MD) importate direct. Upload-urile multi-fișier folosesc un sistem de **sesiuni de upload**: progres individual per fișier, retry al fișierului eșuat fără a retransmite celelalte, închiderea sesiunii când este terminată. OCR-ul expune un **scor de încredere** mediat (`average`, limitat în `[0,1]`, calculat din `averagePageConfidenceScore` returnate de Mistral), afișat în UI sub forma unui badge de nivel `high` / `medium` / `low` (praguri ~0.9 / ~0.7) — avertizează fără a bloca dacă scanarea este de calitate slabă.
- **Text liber** — Tastați sau lipiți orice conținut. Moderat înainte de stocare dacă moderarea este activă.
- **Intrare vocală** — Înregistrați audio în browser. Transcris de `voxtral-mini-latest`. Parametrul `language="fr"` optimizează recunoașterea.
- **Web / URL** — Lipiți unul sau mai multe URL-uri pentru a face scraping direct al conținutului (Readability + Lightpanda pentru paginile JS), sau introduceți cuvinte-cheie pentru o căutare web prin Agent Mistral. Câmpul unic le acceptă pe ambele — URL-urile și cuvintele-cheie sunt separate automat, fiecare rezultat creează o sursă independentă.

### Generarea de conținut AI

Opt tipuri de material educațional generat:

| Generator | Model | Rezultat |
|---|---|---|
| **Fișă de recapitulare** | `mistral-large-latest` | Titlu, rezumat, puncte-cheie, vocabular, citate, anecdotă |
| **Flashcards** | `mistral-large-latest` | Carduri Q/R cu referințe la surse (număr configurabil) |
| **Quiz QCM** | `mistral-large-latest` | Întrebări cu alegere multiplă, explicații, revizuire adaptivă (număr configurabil) |
| **Texte cu spații de completat** | `mistral-large-latest` | Propoziții de completat cu indicii, validare tolerantă (Levenshtein) |
| **Dictare** | `mistral-large-latest` + Voxtral TTS | Cuvinte-cheie dictate audio (1 MP3/cuvânt) → introducere de la tastatură → corectare strictă (accente) cu regulă explicată |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script în 2 voci → audio MP3 |
| **Ilustrație** | Agent `mistral-large-latest` | Imagine educativă prin instrumentul `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Întrebări TTS → răspuns STT → verificare AI |

### Tutor AI prin chat

Un tutor conversațional cu acces complet la documentele de curs:

- Folosește `mistral-large-latest`
- **Apel de instrumente**: poate genera fișe, flashcards, quiz-uri sau texte cu spații de completat în timpul conversației
- Istoric de 50 de mesaje per curs
- Moderarea conținutului dacă este activată pentru profil

### Rută automată

Routerul folosește `mistral-small-latest` pentru a analiza conținutul surselor și a propune cei mai relevanți generatori dintre cei 8 disponibili. Interfața afișează progresul în timp real: mai întâi o fază de analiză, apoi generările individuale cu posibilitatea de anulare.

### Învățare adaptivă

- **Statistici de quiz**: urmărirea încercărilor și a preciziei per întrebare
- **Revizuire de quiz**: generează 5-10 întrebări noi care vizează conceptele slabe
- **Detectarea instrucțiunilor**: detectează instrucțiunile de revizuire („Știu lecția dacă știu...”) și le prioritizează în generatoarele textuale compatibile (fișă, flashcards, quiz, texte cu spații de completat)

### Securitate & control parental

- **4 grupe de vârstă**: copil (≤10 ani), adolescent (11-15), student (16-25), adult (26+)
- **Moderarea conținutului**: `mistral-moderation-latest` cu 10 categorii disponibile, 5 blocate implicit pentru copil/adolescent (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorii personalizabile per profil în setări.
- **PIN parental**: hash SHA-256, necesar pentru profilurile sub 15 ani. Pentru o implementare în producție, folosiți un hash lent cu sare (Argon2id, bcrypt).
- **Restricții ale chatului**: chatul AI dezactivat implicit pentru cei sub 16 ani, activabil de părinți

### Sistem multi-profil

- Mai multe profiluri cu nume, vârstă, avatar, preferințe de limbă
- **Voci per profil** (`Profile.mistralVoices?: { host, guest }`) — fiecare copil poate avea propria pereche de voci pentru podcast/quiz vocal
- **Temă per profil** (`Profile.theme: 'dark' | 'light'`) — comutare automată la schimbarea profilului, păstrată pe backend
- Proiecte legate de profiluri prin `profileId`
- Ștergere în cascadă: ștergerea unui profil elimină toate proiectele sale

### Urmărirea costurilor API

Fiecare apel Mistral (chat, OCR, STT, TTS, moderare, agenți) este instrumentat pentru a oferi utilizatorului o estimare € **transparentă** — fără surprize la facturare.

- **Sursa de adevăr**: `helpers/pricing.ts` — `MODEL_PRICING` după prefixul modelului (ex: `mistral-large` → input 0.5 €/M tokeni, output 1.5 €/M tokeni), `PRICING_SOURCES` cu URL-urile documentației Mistral pentru re-scraping periodic
- **Unități suportate**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie coordonată de `helpers/cost-calc.ts`
- **Lanțul de instrumentare**: `helpers/tracked-client.ts` (wrapper client Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectare în răspunsul HTTP)
- **UI**: badge de cost per generare (`src/partials/cost-badge-gen.html`), per sursă (`cost-badge-src.html`), total acumulat în dashboard (`Project.totalCost`)
- **Endpoint-uri**: răspunsurile `/generate/*` și `/sources/*` decorează obiectul returnat (Generation / Source) cu `estimatedCost`, `usage` și `costBreakdown`. `POST /generate/auto/route` adaugă un câmp `costDelta: number` pentru costul doar al rutării. `GET /projects/:pid` returnează proiectul îmbogățit cu `totalCost` (sumă calculată din `costLog[]`) + istoricul complet

### TTS multi-provider & voci personalizate

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, sinteză vocală 100% Mistral, fără a fi necesară o cheie suplimentară
- **Voci personalizate**: părinții pot crea propriile voci prin API-ul Mistral Voices (pornind de la un eșantion audio) și le pot atribui rolurilor gazdă/participant — podcasturile și quiz-urile vocale sunt astfel citite cu vocea unui părinte, făcând experiența și mai imersivă pentru copil
- Două roluri vocale configurabile: **gazdă** (narator principal) și **participant** (a doua voce a podcastului)
- Catalogul complet al vocilor Mistral disponibil în setări, filtrabil după limbă

### Internaționalizare

- Interfață disponibilă în 9 limbi: fr, en, es, pt, it, nl, de, hi, ar
- Prompturile AI suportă 15 limbi (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Limbă configurabilă per profil

---

## Stack tehnic

| Strat | Tehnologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server și siguranța tipurilor |
| **Backend** | Express 5.x | API REST |
| **Server de dezvoltare** | Vite 8.x (Rolldown) + tsx | HMR, partiale Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfață reactivă, TypeScript compilat de Vite |
| **Templating** | vite-plugin-handlebars | Compoziție HTML prin partiale |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, agenți, moderare |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, sinteză vocală integrată |
| **Pictograme** | Lucide 1.x | Bibliotecă de pictograme SVG |
| **Scraping web** | Readability + linkedom | Extragerea conținutului principal al paginilor web (tehnologia Firefox Reader View) |
| **Browser headless** | Lightpanda | Browser headless ultraușor (Zig + V8) pentru paginile JS/SPA — fallback scraping |
| **Markdown** | Marked | Randare markdown în chat |
| **Upload fișiere** | Multer 2.x | Gestionarea formularelor multipart |
| **Audio** | ffmpeg-static | Concatenarea segmentelor audio |
| **Teste** | Vitest | Teste unitare — acoperirea este măsurată de SonarCloud |
| **Persistență** | Fișiere JSON | Stocare fără dependențe |

---

## Referința modelelor

| Model | Utilizare | De ce |
|---|---|---|
| `mistral-large-latest` | Fișă, Flashcards, Podcast, Quiz, texte cu spații de completat, Chat, verificare quiz vocal, agent de imagini, agent de căutare web, detectarea instrucțiunilor | Cel mai bun multilingv + urmărirea instrucțiunilor |
| `mistral-ocr-2512` (OCR 3, implicit) | OCR de documente | Text tipărit, tabele, scriere de mână ($2 / 1000 pagini) |
| `mistral-ocr-4-0` (OCR 4, opțiune) | OCR de documente — calitate superioară | Selectabil în Setări, cost de 2× ($4 / 1000 pagini) |
| `voxtral-mini-latest` | Recunoaștere vocală (STT) | STT multilingv, optimizat cu `language="fr"` |
| `voxtral-mini-tts-latest` | Sinteză vocală (TTS) | Podcasturi, quiz vocal, redare cu voce tare |
| `mistral-moderation-latest` | Moderarea conținutului | 5 categorii blocate pentru copil/adolescent (+ jailbreaking) |
| `mistral-small-latest` | Rută automată | Analiză rapidă a conținutului pentru decizii de rutare |

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

> **Notă**: Mistral Voxtral TTS este singurul provider TTS — nu este necesară nicio cheie suplimentară dincolo de `MISTRAL_API_KEY`.

> **Cheie API introdusă de utilizator**: `MISTRAL_API_KEY` este acum **opțională**. Dacă lipsește, aplicația pornește oricum și îi cere fiecărui utilizator să introducă **propria cheie Mistral** în interfață. Cheia este **stocată în browser** (criptată prin Web Crypto + IndexedDB în context securizat) și trimisă prin cerere — **niciodată persistată pe server**. Prioritate: cheia profilului > cheia globală din browser > `MISTRAL_API_KEY` (env). Setarea `EUREKAI_REQUIRE_USER_KEY=true` obligă fiecare utilizator să își furnizeze cheia (cheia din env nu mai servește decât pentru preîncărcări).

> **HTTPS local (tabletă/LAN)**: `localhost` este deja un context securizat. Pentru acces LAN (tabletă), generează un certificat local și activează HTTPS pentru a debloca criptarea în browser + a cripta cheia în tranzit:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variabile de mediu

| Variabilă | Necesar | Implicit | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | opțional | — | Cheie API Mistral (chat, OCR, STT, TTS Voxtral, agenți, moderare). Dacă lipsește, utilizatorul își introduce cheia în aplicație (stocată în browser, niciodată pe server) |
| `EUREKAI_REQUIRE_USER_KEY` | opțional | `false` | `true` → dezactivează fallback-ul pe `MISTRAL_API_KEY` pentru cererile IA (fiecare utilizator TREBUIE să își furnizeze cheia). Util pe o instanță expusă |
| `HTTPS_KEY` / `HTTPS_CERT` | opțional | — | Căi pentru cheia/certificatul TLS (cf. `scripts/gen-cert.sh`) → Express și Vite servesc prin HTTPS (secure context LAN/tabletă) |
| `PORT` | opțional | `3000` | Portul HTTP al backend-ului Express |
| `NODE_ENV` | opțional | `development` | Dacă `production` → Express servește frontend-ul din `dist/` (altfel `public/`) |
| `SONAR_TOKEN` | opțional CI | — | Folosit doar de workflow-ul GitHub Actions SonarCloud |

### Teste, calitatea codului și contribuție

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hook-uri Git (Husky)**: `pre-commit` lansează `npm test`, `pre-push` lansează `npm run security`. Ambele blochează commit/push în caz de eșec.

**Instrumente externe necesare (opționale, dar folosite de `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Fără aceste instrumente, `npm test` eșuează la `pretest` (lizard absent) și `npm run security` eșuează (opengrep absent). Hook-urile husky blochează atunci commit/push.

---

## Implementare cu container

Imaginea este publicată pe **GitHub Container Registry**:

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
config.ts                 — Config runtime (modèles, voix, TTS provider), persistée dans output/config.json
store.ts                  — ProjectStore : CRUD projets/sources/générations, persistance JSON
profiles.ts               — ProfileStore : gestion des profils, hachage PIN
types.ts                  — Types TypeScript : Source, Generation (8 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, 15 langues)

generators/
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (8 agents) + MAX_AUTO_PLAN_LENGTH
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF) avec extraction interne des scores de confiance moyens par page
  summary.ts              — Génération de fiche de révision (JSON structuré)
  flashcards.ts           — Flashcards Q/R (5-50, configurable)
  quiz.ts                 — Quiz QCM (5-50 questions, configurable) + révision adaptative
  fill-blank.ts           — Exercices à trous avec validation tolérante
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
    config.ts             — Interface de configuration (modèles, voix, TTS provider)
    render.ts             — Helpers de rendu HTML
    i18n.ts               — Changement de langue
    ...
  components/
    quiz.ts               — Composant quiz interactif
    quiz-vocal.ts         — Composant quiz vocal
    fill-blank.ts         — Composant textes à trous
    flashcards.ts         — Composant flashcards avec retournement
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

> **Pentru contributorii IA**: consultați [`CLAUDE.md`](CLAUDE.md) pentru contextul arhitectural detaliat, regulile obligatorii (anti-leak prompts, coduri de eroare, urmărirea costurilor) și capcanele cunoscute (Lizard CCN, Opengrep, migrarea Codacy/Semgrep).

---

## Referință API

### Configurație
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/config` | Configurația curentă |
| `PUT` | `/api/config` | Modifică configurația (modele, voci, model TTS) |
| `GET` | `/api/config/status` | Starea API-urilor: `mistral` (cheie Mistral definită), `ttsAvailable` (alias pentru `mistral`, Mistral Voxtral este singurul provider TTS) |
| `POST` | `/api/config/reset` | Resetează configurația la valorile implicite |
| `GET` | `/api/config/voices` | Listează vocile Mistral TTS (opțional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorii de moderare disponibile + valori implicite pe vârstă |

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
| `GET` | `/api/projects/:pid` | Detalii proiect |
| `PUT` | `/api/projects/:pid` | Redenumește `{name}` |
| `DELETE` | `/api/projects/:pid` | Șterge proiectul |

### Surse
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importă fișiere multipart (OCR pentru JPG/PNG/PDF, citire directă pentru TXT/MD) |
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
| `POST` | `/api/projects/:pid/generate/flashcards` | Carduri de memorare |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz grilă |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Texte cu spații lipsă |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictare (cuvinte + propoziții-exemplu + reguli, 1 audio TTS per cuvânt ; de asemenea propusă de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustrație |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revizuire adaptivă `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Fișă de recapitulare axată pe întrebările ratate dintr-un quiz `{generationId, weakQuestions}` — apelată în paralel cu `quiz-review` de butonul « Mă antrenez pe greșelile mele » |
| `POST` | `/api/projects/:pid/generate/route` | Analiză de rutare (planul generatorilor de lansat) — returnează `{plan, costDelta}` (costul doar al rutării) |
| `POST` | `/api/projects/:pid/generate/auto` | Generare automată backend (rutare + 8 types : summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Execuție în paralel — presupune un tier Mistral cu rate-limit ≥ 8 cereri simultane ; altfel mai multe 429 pot apărea în `failedSteps`. |

Toate rutele de generare acceptă `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` și `remediation-summary` necesită în plus `{generationId, weakQuestions}`.

### CRUD Generări
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Trimite răspunsurile quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Trimite răspunsurile textelor cu spații lipsă `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Trimite răspunsurile de dictare `{answers}` (scor server strict) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verifică un răspuns oral (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Redare TTS cu voce tare (fișe/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Redenumește `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Șterge generația |

### Chat
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Preia istoricul chatului |
| `POST` | `/api/projects/:pid/chat` | Trimite un mesaj `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Șterge istoricul chatului |

---

## Decizii arhitecturale

| Decizie | Justificare |
|---|---|
| **Alpine.js mai degrabă decât React/Vue** | Amprentă minimă, reactivitate ușoară cu TypeScript compilat de Vite. Perfect pentru un hackathon în care viteza contează. |
| **Persistență în fișiere JSON** | Zero dependențe, pornire instantanee. Nicio bază de date de configurat — pornim și gata. |
| **Vite + Handlebars** | Cel mai bun din ambele lumi: HMR rapid pentru dezvoltare, partials HTML pentru organizarea codului, Tailwind JIT. |
| **Prompturi centralizate** | Toate prompturile IA în `prompts.ts` — ușor de iterat, testat și adaptat pe limbă/grup de vârstă. |
| **Sistem multi-generări** | Fiecare generație este un obiect independent cu propriul ID — permite mai multe fișe, quiz-uri etc. per curs. |
| **Prompturi adaptate vârstei** | 4 grupuri de vârstă cu vocabular, complexitate și ton diferite — același conținut predă diferit în funcție de cursant. |
| **Funcționalități bazate pe Agents** | Generarea de imagini și căutarea web folosesc Agents Mistral temporari — ciclu de viață curat cu curățare automată. |
| **Scraping inteligent de URL** | Un singur câmp acceptă URL-uri și cuvinte-cheie amestecate — URL-urile sunt scrapate prin Readability (pagini statice) cu fallback Lightpanda (pagini JS/SPA), iar cuvintele-cheie declanșează un Agent Mistral web_search. Fiecare rezultat creează o sursă independentă. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (fără cheie suplimentară dincolo de `MISTRAL_API_KEY`) — sinteză vocală integrată în lanțul de cost și în rezolvarea vocii după limbă. |

---

## Credite & mulțumiri

- **[Mistral AI](https://mistral.ai)** — Modele IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reactiv ușor
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitar
- **[Vite](https://vitejs.dev)** — Instrument de build frontend
- **[Lucide](https://lucide.dev)** — Bibliotecă de pictograme
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extragere de conținut web (tehnologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Navigator headless ultra-ușor pentru scraping-ul paginilor JS/SPA
- **[Luciole](https://luciole-vision.com)** — Font conceput pentru cititorii cu deficiențe de vedere, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opțiunea «Confort de lectură» din profiluri)

Inițiat în timpul Mistral AI Worldwide Hackathon (martie 2026), dezvoltat integral de IA cu [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licență

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Articol tradus din fr în ro cu gpt-5.4-mini.**
