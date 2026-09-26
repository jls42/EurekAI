<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformă orice conținut într-o experiență de învățare interactivă — alimentat de <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demo YouTube"></a>
</p>

<h4 align="center">📊 Calitatea codului</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Quality Gate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Security Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Reliability Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Maintainability Rating"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Coverage"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilities"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Lines of Code"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy Badge"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Povestea — De ce EurekAI?

**EurekAI** s-a născut în timpul [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (martie 2026). Aveam nevoie de un subiect — iar ideea a venit din ceva foarte concret: pregătesc regulat controalele împreună cu fiica mea și mi-am spus că ar trebui să fie posibil să fac asta mai ludic și interactiv cu ajutorul IA.

Obiectivul: să iau **orice tip de intrare** — o fotografie a lecției, un text copiat-lipit, o înregistrare vocală, o căutare pe web — și să o transform în **fișe de recapitulare, flashcards, quiz-uri, podcast-uri, texte cu spații de completat, ilustrații și multe altele**. Totul alimentat de modelele franceze ale Mistral AI, ceea ce o face o soluție adaptată în mod natural elevilor vorbitori de franceză.

[Prototipul inițial](https://github.com/jls42/worldwide-hackathon.mistral.ai) a fost conceput în 48 de ore în timpul hackathonului ca dovadă de concept în jurul serviciilor Mistral — deja funcțional, dar limitat. De atunci, EurekAI a devenit un proiect adevărat: texte cu spații de completat, navigare în exerciții, scraping web, moderare parentală configurabilă, review aprofundat al codului și multe altele. Întregul cod este generat de IA — în principal [Claude Code](https://code.claude.com/), cu câteva contribuții prin [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Prezentare generală

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Tur ghidat EurekAI: surse, fișă, quiz, flashcards, ilustrații" width="820" />
</p>

| | |
|---|---|
| ![Tablou de bord](docs/screenshots/dashboard.webp)<br>**Tablou de bord** — generări recente, cost estimat pe card și total pe proiect, butonul « Auto — Magie! » | ![Surse](docs/screenshots/sources.webp)<br>**Surse** — import foto/PDF/text/voce/web, generare dintr-un clic, detectarea consemnului |

Fiecare sursă importată afișează [scorul de încredere OCR, moderarea și costul estimat](docs/screenshots/sources-list.webp).

### Componentele în acțiune

| | |
|---|---|
| ![Fișă de recapitulare](docs/screenshots/notes.gif)<br>**Fișă de recapitulare** — puncte cheie, vocabular, citate cu surse, lectură audio pe secțiuni | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz cu alegere multiplă** — feedback imediat cu explicație, navigare pas cu pas |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — carte de întors, apoi autoevaluare « știam / nu știam » | ![Texte cu spații de completat](docs/screenshots/fillblank.gif)<br>**Texte cu spații de completat** — indiciu la cerere, validare tolerantă |
| ![Dicteu](docs/screenshots/dictation.gif)<br>**Dicteu** — cuvânt dictat audio, corectare strictă literă cu literă | ![Quiz vocal](docs/screenshots/vocal-quiz.gif)<br>**Quiz vocal** — întrebare citită cu voce tare, răspuns la microfon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast cu 2 voci, script dialogat consultabil | ![Ilustrații](docs/screenshots/illustrations.gif)<br>**Ilustrații** — imagini educaționale generate de Agent |
| ![Tutor IA](docs/screenshots/chat.gif)<br>**Tutor IA** — chat ancorat în documentele cursului, răspunsuri explicate, poate genera quiz-uri și flashcards | |

### Primii pași

| | |
|---|---|
| ![Alegerea profilului](docs/screenshots/login.gif)<br>**Alegerea profilului** — fiecare copil are spațiul său, avatarul și limba sa | ![Crearea profilului](docs/screenshots/profile-create.gif)<br>**Crearea profilului** — vârstă, avatar, PIN parental pentru cei sub 15 ani |
| ![Crearea cursului](docs/screenshots/course.gif)<br>**Crearea cursului** — un proiect pe lecție, gata să primească surse | ![Setări](docs/screenshots/settings.gif)<br>**Setări** — status API, alegerea modelelor IA cu tarife afișate |

---

## Funcționalități

| | Funcționalitate | Descriere |
|---|---|---|
| 📷 | **Import de fișiere** | Importați lecțiile — fotografie, PDF (prin Mistral OCR cu scor de încredere mediat, niveluri `high`/`medium`/`low`) sau fișier text (TXT, MD). Sesiuni de upload cu retry pe fișier și progress individual |
| 📝 | **Introducere text** | Tastați sau lipiți orice text direct |
| 🎤 | **Intrare vocală** | Înregistrați-vă — Voxtral STT vă transcrie vocea |
| 🌐 | **Web / URL** | Lipiți un URL (scraping direct prin Readability + Lightpanda) sau tastați o căutare (Agent Mistral web_search) |
| 📄 | **Fișe de recapitulare** | Note structurate cu puncte cheie, vocabular, citate, anecdote |
| 🃏 | **Flashcards** | Carduri Î/R interactive, lectură audio dialogată |
| ❓ | **Quiz cu alegere multiplă** | Întrebări cu alegere multiplă și recapitulare adaptivă a greșelilor (număr configurabil) |
| ✏️ | **Texte cu spații de completat** | Exerciții de completat cu indicii și validare tolerantă |
| 🔤 | **Dicteu** | Cuvinte dictate audio (Voxtral TTS) dintr-o listă importată, introducere de la tastatură, corectare strictă literă cu literă cu regula de ortografie explicată |
| 🎙️ | **Podcast** | Mini-podcast cu 2 voci în audio — voci Mistral implicite sau voci personalizate (părinți!) |
| 🖼️ | **Ilustrații** | Imagini educaționale generate de un Agent Mistral |
| 🗣️ | **Quiz vocal** | Întrebări citite cu voce tare (voce custom posibilă), răspuns oral, verificare IA |
| 💬 | **Tutor IA** | Chat contextual cu documentele de curs, cu apel de instrumente |
| 🧠 | **Router automat** | Un router bazat pe `mistral-small-latest` analizează conținutul și propune o combinație de generatoare dintre cele 8 tipuri disponibile |
| 🔒 | **Control parental** | Moderare configurabilă pe profil (categorii personalizabile), PIN parental, restricții pentru chat |
| 🌍 | **Multilingv** | Interfață disponibilă în 9 limbi; generarea IA controlabilă în 15 limbi prin prompturi |
| 🔊 | **Lectură cu voce tare** | Ascultați fișele și flashcards (dialog întrebare/răspuns) prin Mistral Voxtral TTS |
| 💶 | **Urmărirea costurilor API** | Estimare transparentă a costului € pentru fiecare generare și sursă (tokeni / caractere / pagini / secunde audio). Badge pe card + total pe proiect, vizibil în dashboard |
| 🎨 | **Temă pe profil** | Fiecare profil își alege tema `dark` sau `light` — persistă la schimbarea profilului |

---

## Prezentare generală a arhitecturii

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Prezentare generală a arhitecturii" width="800" />
</p>

---

## Hartă de utilizare a modelelor

<p align="center">
  <img src="public/assets/model-map.webp" alt="Maparea modelelor IA pe sarcini" width="800" />
</p>

---

## Parcursul utilizatorului

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Parcursul de învățare al elevului" width="800" />
</p>

---

## Analiză detaliată — Funcționalități

### Intrare multimodală

EurekAI acceptă 4 tipuri de surse, moderate în funcție de profil (activate implicit pentru copil și adolescent):

- **Import de fișiere** — Fișiere JPG, PNG sau PDF procesate prin OCR Mistral — **OCR 4 (`mistral-ocr-4-0`) implicit** (cea mai bună calitate), **OCR 3 (`mistral-ocr-2512`) opțional** în Setări (mai ieftin, ~½ din cost) — pentru text tipărit, tabele și scriere de mână; sau fișiere text (TXT, MD) importate direct. Upload-urile multi-fișier folosesc un sistem de **sesiuni de upload**: progress individual pe fișier, retry al fișierului eșuat fără a re-trimite celelalte, dismiss al sesiunii când este terminată. OCR-ul expune un **scor de încredere** mediat (`average`, limitat în `[0,1]`, calculat din `averagePageConfidenceScore` returnate de Mistral), afișat în UI sub formă de badge de nivel `high` / `medium` / `low` (praguri ~0.9 / ~0.7) — avertizează fără a bloca dacă scanarea este de calitate slabă.
- **Text liber** — Tastați sau lipiți orice conținut. Moderat înainte de stocare dacă moderarea este activă.
- **Intrare vocală** — Înregistrați audio în browser. Transcris de `voxtral-mini-latest`. Parametrul `language="fr"` optimizează recunoașterea.
- **Web / URL** — Lipiți unul sau mai multe URL-uri pentru a extrage conținutul direct (Readability + Lightpanda pentru paginile JS), sau tastați cuvinte-cheie pentru o căutare web prin Agent Mistral. Câmpul unic acceptă ambele — URL-urile și cuvintele-cheie sunt separate automat, fiecare rezultat creează o sursă independentă.

### Generarea de conținut IA

Opt tipuri de materiale de învățare generate:

| Generator | Model | Ieșire |
|---|---|---|
| **Fișă de recapitulare** | `mistral-large-latest` | Titlu, rezumat, puncte cheie, vocabular, citate, anecdotă |
| **Flashcards** | `mistral-large-latest` | Carduri Î/R cu referințe la surse (număr configurabil) |
| **Quiz cu alegere multiplă** | `mistral-large-latest` | Întrebări cu alegere multiplă, explicații, recapitulare adaptivă (număr configurabil) |
| **Texte cu spații de completat** | `mistral-large-latest` | Propoziții de completat cu indicii, validare tolerantă (Levenshtein) |
| **Dicteu** | `mistral-large-latest` + Voxtral TTS | Cuvinte cheie dictate audio (1 MP3/cuvânt) → introducere de la tastatură → corectare strictă (accente) cu regula explicată |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script cu 2 voci → audio MP3 |
| **Ilustrație** | Agent `mistral-large-latest` | Imagine educațională prin instrumentul `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Întrebări TTS → răspuns STT → verificare IA |

### Tutor IA prin chat

Un tutor conversațional cu acces complet la documentele de curs:

- Folosește `mistral-large-latest`
- **Apel de instrumente**: poate genera fișe, flashcards, quiz-uri sau texte cu spații de completat în timpul conversației
- Istoric de 50 de mesaje pe curs
- Moderarea conținutului dacă este activată pentru profil

### Router automat

Routerul folosește `mistral-small-latest` pentru a analiza conținutul surselor și a propune cele mai relevante generatoare dintre cele 8 disponibile. Interfața afișează progresul în timp real: mai întâi o fază de analiză, apoi generările individuale cu posibilitate de anulare.

### Învățare adaptivă

- **Statistici de quiz**: urmărirea încercărilor și a preciziei pe întrebare
- **Recapitulare de quiz**: generează 5-10 întrebări noi care vizează conceptele slabe
- **Detectarea consemnului**: detectează instrucțiunile de recapitulare („Știu lecția dacă știu…”) și le prioritizează în generatoarele textuale compatibile (fișă, flashcards, quiz, texte cu spații de completat)

### Securitate și control parental

- **4 grupuri de vârstă**: copil (≤10 ani), adolescent (11-15), student (16-25), adult (26+)
- **Moderarea conținutului**: `mistral-moderation-2603` (Mistral Moderation 2) cu 11 categorii disponibile, 5 blocate implicit pentru copil/adolescent (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorii personalizabile pe profil în setări; Moderation 2 a împărțit vechea categorie « conținut periculos » în `dangerous` + `criminal` (profilurile existente sunt migrate automat, iar categoriile blocate se aplică și surselor deja importate). Securitate implicită: dacă răspunsul modelului nu permite verificarea unei categorii blocate, conținutul este refuzat (« Moderare indisponibilă »); cu moderarea activă, atât generarea, cât și chatul exclud sursele semnalate, eronate sau în curs de verificare (o sursă importată cu moderarea dezactivată nu este re-verificată). Id datat fixat în `helpers/moderation-model.ts`: aliasul `-latest`, depreciat, nu mai este listat de API.
- **PIN parental**: hash SHA-256, necesar pentru profilurile sub 15 ani. Pentru un deployment în producție, prevădeți un hash lent cu salt (Argon2id, bcrypt).
- **Restricții pentru chat**: chatul IA dezactivat implicit pentru cei sub 16 ani, activabil de către părinți

### Sistem multi-profiluri

- Profiluri multiple cu nume, vârstă, avatar, preferințe de limbă
- **Voci pe profil** (`Profile.mistralVoices?: { host?, guest? }` — fiecare rol este opțional) — fiecare copil poate avea perechea sa de voci pentru podcast/quiz vocal
- **Temă pe profil** (`Profile.theme: 'dark' | 'light'`) — comutare automată la schimbarea profilului, persistată pe backend
- Proiecte legate de profiluri prin `profileId`
- Ștergere în cascadă: ștergerea unui profil șterge toate proiectele sale

### Urmărirea costurilor API

Fiecare apel Mistral facturabil (chat, OCR, STT, TTS, agenți) este instrumentat pentru a oferi o estimare € **transparentă** utilizatorului. Moderarea, gratuită, nu este contabilizată. Limită cunoscută: taxele instrumentelor agenților (căutare web 30 $/1000 apeluri, generare de imagine 100 $/1000 imagini) nu sunt încă contabilizate — costul afișat al unei ilustrații este subestimat.

- **Sursa de adevăr**: `helpers/pricing.ts` — `MODEL_PRICING` pe prefix de model (ex: `mistral-large` → input 0.5 €/M tokeni, output 1.5 €/M tokeni), `PRICING_SOURCES` cu URL-uri din documentația Mistral pentru re-scraping periodic
- **Unități suportate**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie controlată de `helpers/cost-calc.ts`
- **Lanț de instrumentare**: `helpers/tracked-client.ts` (wrap client Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectare în răspunsul HTTP)
- **UI**: badge de cost pe generare (`src/partials/cost-badge-gen.html`), pe sursă (`cost-badge-src.html`), total cumulat în dashboard (`Project.totalCost`)
- **Endpoint-uri**: răspunsurile `/generate/*` și `/sources/*` decorează obiectul returnat (Generation / Source) cu `estimatedCost`, `usage` și `costBreakdown`. `POST /generate/route` adaugă un câmp `costDelta: number` pentru costul doar al routingului. `GET /projects/:pid` returnează proiectul îmbogățit cu `totalCost` (sumă calculată din `costLog[]`) + istoricul complet

### TTS (Mistral Voxtral) și voci personalizate

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, sinteză vocală 100% Mistral, fără cheie suplimentară necesară
- **Voci personalizate**: părinții pot crea propriile voci prin API-ul Mistral Voices (pornind de la un eșantion audio) și le pot atribui rolurilor gazdă/invitat — podcasturile și quiz-urile vocale sunt apoi citite cu vocea unui părinte, făcând experiența și mai imersivă pentru copil
- Două roluri vocale configurabile: **gazdă** (narator principal) și **invitat** (a doua voce a podcastului)
- Catalogul complet al vocilor Mistral disponibil în setări, filtrabil pe limbă
### Internaționalizare

- Interfață disponibilă în 9 limbi : fr, en, es, pt, it, nl, de, hi, ar
- Prompturile IA suportă 15 limbi (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Limbă configurabilă pe profil

---

## Stack tehnic

| Strat | Tehnologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server și siguranța tipurilor |
| **Backend** | Express 5.x | API REST |
| **Server de dezvoltare** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfață reactivă, TypeScript compilat de Vite |
| **Templating** | vite-plugin-handlebars | Compoziție HTML prin partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderare |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, sinteză vocală integrată |
| **Iconițe** | Lucide 1.x | Bibliotecă de iconițe SVG |
| **Scraping web** | Readability + linkedom | Extracția conținutului principal al paginilor web (tehnologie Firefox Reader View) |
| **Headless browser** | Lightpanda | Browser headless ultra-ușor (Zig + V8) pentru paginile JS/SPA — fallback scraping |
| **Markdown** | Marked | Randare markdown în chat |
| **Upload fișiere** | Multer 2.x | Gestionarea formularelor multipart |
| **Audio** | ffmpeg-static | Concatenarea segmentelor audio |
| **Teste** | Vitest | Teste unitare — acoperire măsurată de SonarCloud |
| **Persistență** | Fișiere JSON | Stocare fără dependență |

---

## Referința modelelor

| Model | Utilizare | De ce |
|---|---|---|
| `mistral-large-latest` | Fișă, Flashcards, Podcast, Quiz, Texte cu spații, Chat, Verificare quiz vocal, Agent Image, Agent Web Search, Detectare consigne | Cel mai bun multilingual + urmărirea instrucțiunilor |
| `mistral-ocr-4-0` (OCR 4, implicit) | OCR de documente — calitate superioară | Text tipărit, tabele, scriere de mână ($4 / 1000 pagini) |
| `mistral-ocr-2512` (OCR 3, opțiune) | OCR de documente | Selectabil în Setări, mai ieftin ($2 / 1000 pagini) |
| `voxtral-mini-latest` | Recunoaștere vocală (STT) | STT multilingv, optimizat cu `language="fr"` |
| `voxtral-mini-tts-latest` | Sinteză vocală (TTS) | Podcasturi, quiz vocal, citire cu voce tare |
| `mistral-moderation-2603` | Moderare de conținut | 5 categorii blocate pentru copil/adolescent (inclusiv `jailbreaking`) |
| `mistral-small-latest` | Router automat | Analiză rapidă a conținutului pentru decizii de rutare |

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

> **Notă** : Mistral Voxtral TTS este singurul provider TTS — nu este necesară nicio cheie suplimentară dincolo de `MISTRAL_API_KEY`.

> **Cheie API introdusă de utilizator** : `MISTRAL_API_KEY` este acum **opțională**. Dacă lipsește, aplicația pornește oricum și invită fiecare utilizator să introducă **propria cheie Mistral** în interfață. Cheia este **stocată în browser** (criptată prin Web Crypto + IndexedDB în context securizat) și trimisă pe cerere — **niciodată persistată pe server**. Precedență : cheia profilului > cheia globală din browser > `MISTRAL_API_KEY` (env). Definirea `EUREKAI_REQUIRE_USER_KEY=true` forțează fiecare utilizator să furnizeze cheia sa (cheia din env servește doar la preîncărcări).

> **HTTPS local (tabletă/LAN)** : `localhost` este deja un context securizat. Pentru acces LAN (tabletă), generează un certificat local și activează HTTPS pentru a debloca criptarea din browser + a cripta cheia în tranzit :
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variabile de mediu

| Variabilă | Obligatoriu | Implicit | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | opțional | — | Cheie API Mistral (chat, OCR, STT, TTS Voxtral, agenți, moderare). Dacă lipsește, utilizatorul introduce cheia în aplicație (stocată în browser, niciodată pe server) |
| `EUREKAI_REQUIRE_USER_KEY` | opțional | `false` | `true` → dezactivează fallback-ul pe `MISTRAL_API_KEY` pentru cererile IA (fiecare utilizator TREBUIE să furnizeze cheia sa). Util pe o instanță expusă |
| `HTTPS_KEY` / `HTTPS_CERT` | opțional | — | Căi cheie/cert TLS (cf. `scripts/gen-cert.sh`) → Express și Vite servesc în HTTPS (secure context LAN/tabletă) |
| `PORT` | opțional | `3000` | Portul HTTP al backend-ului Express |
| `NODE_ENV` | opțional | `development` | Dacă `production` → Express servește frontend-ul din `dist/` (altfel `public/`) |
| `SONAR_TOKEN` | opțional CI | — | Folosit doar de workflow-ul GitHub Actions SonarCloud |

### Teste, calitatea codului și contribuție

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hook-uri Git (Husky)** : `pre-commit` înlănțuie `scripts/pre-commit-fast.sh` (conflicte, fișiere mari, shellcheck), `lint-staged` apoi `npm test` ; `pre-push` execută mai întâi un gate `npm audit` (blochează pe vulnerabilitate critică tranzitivă, cf. `scripts/audit-verdict.mjs`) apoi `npm run security`. Toate blochează commit/push în caz de eșec.

**Instrumente externe necesare (opționale, dar folosite de `pretest` / `npm run security`)** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Fără aceste instrumente, `npm test` eșuează la `pretest` (lizard absent) și `npm run security` eșuează (opengrep absent). Hook-urile husky blochează atunci commit/push.

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
  moderation-model.ts     — Modèle de modération épinglé + ses 11 catégories + migration des catégories legacy
  moderation-http.ts      — Statut de modération → réponse HTTP (400 signalé / 503 indisponible / 409 en cours)
  chat-sources.ts         — Sources accessibles au chat (sans les sources non vérifiées si la modération est active)

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
docs/                     — Notes internes (inventaire prompts, audits, prompts des diagrammes) + screenshots du README
scripts/                  — Tooling : check-deps, check-models, check-security, check-complexity, gen-cert, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **Pentru contribuitorii IA** : consultați [`CLAUDE.md`](CLAUDE.md) pentru contextul arhitectural detaliat, regulile obligatorii (anti-leak prompts, coduri de eroare, cost tracking) și capcanele cunoscute (Lizard CCN, Opengrep, migrare Codacy/Semgrep).

---

## Referință API

### Config
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/config` | Configurația curentă |
| `PUT` | `/api/config` | Modificarea configurației (modele, voci, model TTS) |
| `GET` | `/api/config/status` | Starea API-urilor : `mistral` (cheie Mistral definită), `ttsAvailable` (alias al `mistral`, Mistral Voxtral este singurul provider TTS) |
| `POST` | `/api/config/reset` | Resetarea configurației la valorile implicite |
| `GET` | `/api/config/voices` | Listarea vocilor Mistral TTS (opțional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorii de moderare disponibile + valori implicite pe vârstă |
| `POST` | `/api/providers/mistral/validate` | Validarea unei chei Mistral introduse de utilizator — întotdeauna 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), fără fallback env |

### Profile
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/profiles` | Listarea tuturor profilurilor |
| `POST` | `/api/profiles` | Crearea unui profil |
| `PUT` | `/api/profiles/:id` | Modificarea unui profil (PIN necesar pentru < 15 ani) |
| `DELETE` | `/api/profiles/:id` | Ștergerea unui profil + cascade proiecte `{pin?}` → `{ok, deletedProjects}` |

### Proiecte
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects` | Listarea proiectelor (`?profileId=` opțional) |
| `POST` | `/api/projects` | Crearea unui proiect `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detaliile proiectului |
| `PUT` | `/api/projects/:pid` | Redenumire `{name}` |
| `DELETE` | `/api/projects/:pid` | Ștergerea proiectului |
| `GET` | `/api/projects/:pid/events` | Flux SSE în timp real (`event: generation`) al tranzițiilor de generare (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Surse
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import fișiere multipart (OCR pentru JPG/PNG/PDF, citire directă pentru TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Text liber `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL sau căutare web `{query}` — returnează un tablou de surse |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ștergerea unei surse |
| `POST` | `/api/projects/:pid/moderate` | Moderare `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectarea consignelor de recapitulare |

### Generare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fișă de recapitulare |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Texte cu spații |
| `POST` | `/api/projects/:pid/generate/dictation` | Dicteu (cuvinte + propoziții-exemplu + reguli, 1 audio TTS pe cuvânt ; propusă și de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustrație |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Recapitulare adaptivă `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Fișă de reamintire axată pe întrebările greșite dintr-un quiz `{generationId, weakQuestions}` — apelată în paralel cu `quiz-review` de butonul « Să mă antrenez pe greșelile mele » |
| `POST` | `/api/projects/:pid/generate/route` | Analiză de rutare (planul generatoarelor de lansat) — returnează `{plan, costDelta}` (costul doar al rutării) |
| `POST` | `/api/projects/:pid/generate/auto` | Generare auto backend (rutare + 8 tipuri : summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Execuție în paralel — presupune un tier Mistral cu rate-limit ≥ 8 cereri simultane ; altfel mai multe 429 pot apărea în `failedSteps`. |

Toate rutele de generare acceptă `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` și `remediation-summary` cer în plus `{generationId, weakQuestions}`.

### CRUD Generări
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Trimiterea răspunsurilor quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Trimiterea răspunsurilor texte cu spații `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Trimiterea răspunsurilor de dicteu `{answers}` (scor server strict) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificarea unui răspuns oral (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Citire TTS cu voce tare (fișe/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Anularea unei generări în curs (singura cale de anulare a unui pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Redenumire `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ștergerea generării |

### Chat
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperarea istoricului chatului |
| `POST` | `/api/projects/:pid/chat` | Trimiterea unui mesaj `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Ștergerea istoricului chatului |

---

## Decizii arhitecturale

| Decizie | Justificare |
|---|---|
| **Alpine.js în loc de React/Vue** | Amprentă minimă, reactivitate ușoară cu TypeScript compilat de Vite. Perfect pentru un hackathon unde viteza contează. |
| **Persistență în fișiere JSON** | Zero dependență, pornire instantanee. Nicio bază de date de configurat — pornești și gata. |
| **Vite + Handlebars** | Ce e mai bun din ambele lumi : HMR rapid pentru dezvoltare, partials HTML pentru organizarea codului, Tailwind JIT. |
| **Prompturi centralizate** | Toate prompturile IA în `prompts.ts` — ușor de iterat, testat și adaptat pe limbă/grupă de vârstă. |
| **Sistem multi-generări** | Fiecare generare este un obiect independent cu propriul ID — permite mai multe fișe, quizuri etc. pe curs. |
| **Prompturi adaptate pe vârstă** | 4 grupe de vârstă cu vocabular, complexitate și ton diferite — același conținut predă diferit în funcție de învățăcel. |
| **Funcționalități bazate pe Agents** | Generarea de imagini și căutarea web folosesc Agents Mistral temporari — ciclu de viață curat cu curățare automată. |
| **Scraping inteligent de URL** | Un singur câmp acceptă URL-uri și cuvinte-cheie amestecate — URL-urile sunt scrapate prin Readability (pagini statice) cu fallback Lightpanda (pagini JS/SPA), cuvintele-cheie declanșează un Agent Mistral web_search. Fiecare rezultat creează o sursă independentă. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (fără cheie suplimentară dincolo de `MISTRAL_API_KEY`) — sinteză vocală integrată în lanțul de cost și în rezolvarea vocii pe limbă. |

---

## Credite & mulțumiri

- **[Mistral AI](https://mistral.ai)** — Modele IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reactiv ușor
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitar
- **[Vite](https://vitejs.dev)** — Instrument de build frontend
- **[Lucide](https://lucide.dev)** — Bibliotecă de iconițe
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extracție de conținut web (tehnologie Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Browser headless ultra-ușor pentru scraping-ul paginilor JS/SPA
- **[Luciole](https://luciole-vision.com)** — Font conceput pentru cititorii cu deficiențe de vedere, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opțiunea « Confort de lectură » a profilurilor)

Inițiat în timpul Mistral AI Worldwide Hackathon (martie 2026), dezvoltat integral de IA cu [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licență

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Articol tradus din fr în ro cu grok-4.5.**
