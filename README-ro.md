<p align="center">
  <img src="public/assets/logo.webp" alt="Sigla EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformă orice conținut într-o experiență de învățare interactivă — bazată pe <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demonstrație YouTube"></a>
</p>

<h4 align="center">📊 Calitatea codului</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Prag de calitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Evaluarea securității"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Evaluarea fiabilității"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Evaluarea mentenabilității"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Acoperire"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilități"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Probleme de calitate a codului"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Linii de cod"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Insignă Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Povestea — De ce EurekAI?

**EurekAI** s-a născut în timpul [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (martie 2026). Aveam nevoie de un subiect — iar ideea a pornit de la ceva foarte concret: mă pregătesc în mod regulat pentru teste împreună cu fiica mea și m-am gândit că ar trebui să fie posibil să facem acest proces mai distractiv și mai interactiv cu ajutorul inteligenței artificiale.

Obiectivul: să preia **orice fel de conținut de intrare** — o fotografie a lecției, un text copiat și lipit, o înregistrare vocală, o căutare pe web — și să îl transforme în **fișe de recapitulare, flashcards, chestionare, podcasturi, texte cu spații libere, ilustrații și multe altele**. Totul este bazat pe modelele Mistral AI, o companie franceză, ceea ce face din EurekAI o soluție adaptată în mod natural elevilor francofoni.

[Prototipul inițial](https://github.com/jls42/worldwide-hackathon.mistral.ai) a fost conceput în 48 de ore în timpul hackathonului ca dovadă de concept construită pe serviciile Mistral — deja funcțională, dar limitată. De atunci, EurekAI a devenit un proiect adevărat: texte cu spații libere, navigare prin exerciții, scraping web, moderare parentală configurabilă, revizuire aprofundată a codului și multe altele. Întregul cod este generat de inteligența artificială — în principal de [Claude Code](https://code.claude.com/), cu unele contribuții prin [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Prezentare generală

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Tur ghidat EurekAI: surse, fișă, chestionar, flashcards, ilustrații" width="820" />
</p>

| | |
|---|---|
| ![Tablou de bord](docs/screenshots/dashboard.webp)<br>**Tablou de bord** — generări recente, cost estimat pentru fiecare card și totalul proiectului, butonul „Automat — Magie!” | ![Surse](docs/screenshots/sources.webp)<br>**Surse** — import fotografie/PDF/text/voce/web, generare cu un singur clic, detectarea instrucțiunilor |

Fiecare sursă importată afișează [scorul său de încredere OCR, moderarea și costul estimat](docs/screenshots/sources-list.webp).

### Componentele în acțiune

| | |
|---|---|
| ![Fișă de recapitulare](docs/screenshots/notes.gif)<br>**Fișă de recapitulare** — idei-cheie, vocabular, citate cu surse, redare audio pentru fiecare secțiune | ![Chestionar](docs/screenshots/quiz.gif)<br>**Chestionar cu variante multiple** — un singur răspuns corect pentru fiecare întrebare, feedback imediat cu explicație, navigare pas cu pas |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — card care poate fi întors, urmat de autoevaluarea „știam / nu știam” | ![Texte cu spații libere](docs/screenshots/fillblank.gif)<br>**Texte cu spații libere** — indiciu la cerere, validare tolerantă |
| ![Dictare](docs/screenshots/dictation.gif)<br>**Dictare** — cuvânt dictat audio, corectare strictă literă cu literă | ![Chestionar vocal](docs/screenshots/vocal-quiz.gif)<br>**Chestionar vocal** — întrebare citită cu voce tare, răspuns prin microfon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast cu 2 voci, script dialogat disponibil pentru consultare | ![Ilustrații](docs/screenshots/illustrations.gif)<br>**Ilustrații** — imagini educaționale generate de Agent |
| ![Tutor IA](docs/screenshots/chat.gif)<br>**Tutor IA** — chat ancorat în documentele cursului, răspunsuri explicate, poate genera chestionare și flashcards | |

### Primii pași

| | |
|---|---|
| ![Alegerea profilului](docs/screenshots/login.gif)<br>**Alegerea profilului** — fiecare copil are propriul spațiu, propriul avatar și propria limbă | ![Crearea profilului](docs/screenshots/profile-create.gif)<br>**Crearea profilului** — vârstă, avatar, PIN parental pentru cei sub 15 ani |
| ![Crearea cursului](docs/screenshots/course.gif)<br>**Crearea cursului** — câte un proiect pentru fiecare lecție, pregătit să primească surse | ![Setări](docs/screenshots/settings.gif)<br>**Setări** — starea API-ului, alegerea modelelor IA cu tarifele afișate |

---

## Funcționalități

| | Funcționalitate | Descriere |
|---|---|---|
| 📷 | **Import de fișiere** | Importați-vă lecțiile — fotografie, PDF (prin Mistral OCR, cu scor de încredere mediu și niveluri `high`/`medium`/`low`) sau fișier text (TXT, MD). Sesiuni de încărcare cu reîncercare pentru fiecare fișier și progres individual |
| 📝 | **Introducere text** | Tastați sau lipiți direct orice text |
| 🎤 | **Intrare vocală** | Înregistrați-vă — Voxtral STT vă transcrie vocea |
| 🌐 | **Web / URL** | Lipiți un URL (scraping direct prin Readability + Lightpanda) sau introduceți o căutare (Agent Mistral web_search) |
| 📄 | **Fișe de recapitulare** | Notițe structurate cu idei-cheie, vocabular, citate și informații interesante |
| 🃏 | **Flashcards** | Carduri interactive cu întrebări și răspunsuri, redare audio dialogată |
| ❓ | **Chestionar cu variante multiple** | Întrebări cu 4 variante și un singur răspuns corect, cu recapitulare adaptivă a greșelilor (număr configurabil) |
| ✏️ | **Texte cu spații libere** | Exerciții de completat cu indicii și validare tolerantă |
| 🔤 | **Dictare** | Cuvinte dictate audio (Voxtral TTS) dintr-o listă importată, introducere de la tastatură, corectare strictă literă cu literă, cu explicarea regulii ortografice |
| 🎙️ | **Podcast** | Mini-podcast audio cu 2 voci — voci Mistral implicite sau voci personalizate (ale părinților!) |
| 🖼️ | **Ilustrații** | Imagini educaționale generate de un Agent Mistral |
| 🗣️ | **Chestionar vocal** | Întrebări citite cu voce tare (este posibilă o voce personalizată), răspuns oral, verificare prin IA |
| 💬 | **Tutor IA** | Chat contextual cu documentele cursului dumneavoastră, cu apelarea instrumentelor |
| 🧠 | **Router automat** | Un router bazat pe `mistral-small-latest` analizează conținutul și propune o combinație de generatoare dintre cele 8 tipuri disponibile |
| 🔒 | **Control parental** | Moderare configurabilă pentru fiecare profil (categorii personalizabile), PIN parental, restricții pentru chat |
| 🌍 | **Multilingv** | Interfață disponibilă în 9 limbi; generare IA controlabilă în 15 limbi prin prompturi |
| 🔊 | **Citire cu voce tare** | Ascultați fișele și flashcards (dialog întrebare/răspuns) prin Mistral Voxtral TTS |
| 💶 | **Monitorizarea costurilor API** | Estimare transparentă a costului în € pentru fiecare generare și sursă (tokenuri / caractere / pagini / secunde audio). Insignă pentru fiecare card + total pentru fiecare proiect, vizibile în tabloul de bord |
| 🎨 | **Temă pentru fiecare profil** | Fiecare profil își alege tema `dark` sau `light` — memorată împreună cu profilul și reaplicată la fiecare schimbare a profilului |

---

## Prezentare generală a arhitecturii

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Prezentarea generală a arhitecturii" width="800" />
</p>

---

## Harta utilizării modelelor

<p align="center">
  <img src="public/assets/model-map.webp" alt="Maparea modelelor IA la sarcini" width="800" />
</p>

---

## Parcursul utilizatorului

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Parcursul de învățare al elevului" width="800" />
</p>

---

## Analiză aprofundată — Funcționalități

### Intrare multimodală

EurekAI acceptă 4 tipuri de surse, moderate în funcție de profil (moderarea este activată implicit pentru profilurile de copil și adolescent):

- **Import de fișiere** — Fișiere JPG, PNG sau PDF procesate prin Mistral OCR — **OCR 4.1 (`mistral-ocr-4-1`) implicit**, **OCR 3 (`mistral-ocr-2512`) opțional** în Setări (mai ieftin, ~½ din cost; citește mai bine scrisul de mână) — pentru text tipărit, tabele și scris de mână; sau fișiere text (TXT, MD) importate direct. Încărcările cu mai multe fișiere utilizează un sistem de **sesiuni de încărcare**: progres individual pentru fiecare fișier, reîncercarea fișierului care a eșuat fără retrimiterea celorlalte, închiderea sesiunii după finalizare. OCR-ul furnizează un **scor de încredere** mediu (`average`, limitat în `[0,1]`, calculat pe baza valorilor `averagePageConfidenceScore` returnate de Mistral), afișat în interfață ca insignă de nivel `high` / `medium` / `low` (praguri ~0.9 / ~0.7) — avertizează fără a bloca dacă scanarea are o calitate slabă. Copia documentului trimisă către Mistral pentru OCR este ștearsă imediat după încheierea procesării, inclusiv în caz de eșec.
- **Text liber** — Tastați sau lipiți orice conținut. Este moderat înainte de stocare dacă moderarea este activă.
- **Intrare vocală** — Înregistrați sunet în browser. Este transcris de `voxtral-mini-latest`. Parametrul `language="fr"` optimizează recunoașterea.
- **Web / URL** — Lipiți unul sau mai multe URL-uri pentru a extrage direct conținutul (Readability + Lightpanda pentru paginile JS) sau introduceți cuvinte-cheie pentru o căutare web prin Agent Mistral. Câmpul unic le acceptă pe ambele — URL-urile și cuvintele-cheie sunt separate automat, iar fiecare rezultat creează o sursă independentă.

### Generarea de conținut prin IA

Opt tipuri de materiale de învățare generate:

| Generator | Model | Rezultat |
|---|---|---|
| **Fișă de recapitulare** | `mistral-large-latest` | Titlu, rezumat, idei-cheie, vocabular, citate, informație interesantă |
| **Flashcards** | `mistral-large-latest` | Carduri cu întrebări și răspunsuri, cu referințe la surse (număr configurabil) |
| **Chestionar cu variante multiple** | `mistral-large-latest` | Întrebări cu 4 variante și un singur răspuns corect, explicații, recapitulare adaptivă (număr configurabil) |
| **Texte cu spații libere** | `mistral-large-latest` | Propoziții de completat cu indicii, validare tolerantă (Levenshtein) |
| **Dictare** | `mistral-large-latest` + Voxtral TTS | Cuvinte-cheie dictate audio (1 MP3/cuvânt) → introducere de la tastatură → corectare strictă (omiterea unui accent este considerată greșeală), cu explicarea regulii |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script cu 2 voci → audio MP3 |
| **Ilustrație** | Agent `mistral-large-latest` | Imagine educațională prin instrumentul `image_generation` |
| **Chestionar vocal** | `mistral-large-latest` + Voxtral TTS + STT | Întrebări TTS → răspuns STT → verificare prin IA |

### Tutor IA prin chat

Un tutor conversațional cu acces complet la documentele cursului:

- Utilizează `mistral-large-latest`
- **Apelarea instrumentelor**: poate genera fișe, flashcards, chestionare sau texte cu spații libere în timpul conversației
- Istoric de 50 de mesaje pentru fiecare curs
- Moderare, dacă este activată pentru profil: mesajul este verificat, iar sursele semnalate, cele a căror verificare a eșuat și cele care nu au fost încă verificate sunt excluse din context și din instrumente (verificarea surselor eșuate sau neverificate este mai întâi relansată, timp de cel mult 5 s)

### Router automat

Routerul utilizează `mistral-small-latest` pentru a analiza conținutul surselor și a propune cele mai relevante generatoare dintre cele 8 disponibile. Interfața afișează progresul în timp real: mai întâi o etapă de analiză, apoi generările individuale, care pot fi anulate.

### Învățare adaptivă

- **Statistici pentru chestionare**: monitorizarea încercărilor și a preciziei pentru fiecare întrebare
- **Recapitularea chestionarului**: generează 5-10 întrebări noi care vizează conceptele însușite insuficient, pe baza surselor chestionarului inițial (filtrul de moderare se aplică acelorași surse)
- **Detectarea instrucțiunilor**: detectează instrucțiunile de recapitulare („Îmi știu lecția dacă știu...”) și le prioritizează în generatoarele textuale compatibile (fișă, flashcards, chestionar, texte cu spații libere). Când moderarea este activă, detectarea așteaptă verificarea surselor și le citește numai pe cele considerate sigure; instrucțiunea păstrează lista surselor sale inițiale: dacă una dintre acestea este ulterior semnalată, instrucțiunea nu este nici afișată, nici aplicată, iar dacă una dintre ele este ștearsă, instrucțiunea este eliminată. Costul său este contabilizat

### Securitate și control parental

- **4 grupe de vârstă**: copil (≤10 ani), adolescent (11-15), student (16-25), adult (26+)
- **Moderarea conținutului**: `mistral-moderation-2603` (Mistral Moderation 2), cu 11 categorii disponibile, dintre care 6 sunt blocate implicit pentru profilurile noi de copil/adolescent (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` a fost adăugat după o evaluare pe 50 de lecții, inclusiv de istorie, fără niciun rezultat fals pozitiv). Categorii personalizabile pentru fiecare profil în setări; Moderation 2 a împărțit vechea categorie „conținut periculos” în `dangerous` + `criminal` (profilurile existente sunt migrate automat, iar categoriile blocate se aplică și surselor deja importate). Securitate implicită: dacă răspunsul modelului nu permite verificarea unei categorii blocate, conținutul este refuzat („Moderare indisponibilă”); când moderarea este activă, atât generarea, cât și chatul exclud sursele semnalate, cele a căror verificare a eșuat și cele aflate în curs de verificare. O sursă neverificată vreodată (importată când moderarea era dezactivată sau un proiect vechi asociat unui profil) este verificată înainte de utilizare. O moderare întreruptă de o repornire este reluată la pornire dacă cheia serverului permite acest lucru; în caz contrar, asemenea unei moderări care a eșuat, este reluată la deschiderea proiectului sau la următoarea generare. Un buton „Verifică din nou” relansează verificarea la cerere. Când moderarea este activă, conținutul unei surse este ascuns copilului până când aceasta este considerată sigură (previzualizare, text, document original); un părinte îl poate afișa folosind PIN-ul său, pentru o singură consultare. Răspunsul oral din chestionarul vocal este moderat înainte de verificare. ID-ul cu dată fixat în `helpers/moderation-model.ts`: aliasul `-latest`, depreciat, nu mai este enumerat de API.
- **PIN parental**: hash SHA-256, obligatoriu pentru profilurile persoanelor sub 15 ani; cel mult 10 coduri greșite într-un interval de un sfert de oră și pentru fiecare adresă IP (429 `rate_limited`). Pentru o implementare în producție, trebuie prevăzut un hash lent cu salt (Argon2id, bcrypt).
- **Datele serverului**: `/output` publică numai fișierele media ale proiectelor (audio, imagini, fișiere importate); `profiles.json`, `config.json`, `projects.json` și `project.json` nu sunt servite niciodată
- **Restricțiile chatului**: chatul IA este dezactivat implicit pentru persoanele sub 16 ani și poate fi activat de părinți

### Sistem cu mai multe profiluri

- Profiluri multiple cu nume, vârstă, avatar și preferințe lingvistice
- **Voci pentru fiecare profil** (`Profile.mistralVoices?: { host?, guest? }` — fiecare rol este opțional) — fiecare copil poate avea propria pereche de voci pentru podcast/chestionar vocal
- **Temă pentru fiecare profil** (`Profile.theme: 'dark' | 'light'`) — schimbare automată la schimbarea profilului, salvată în backend
- Proiecte asociate profilurilor prin `profileId`; un proiect vechi fără profil este asociat primului profil care îl deschide, apoi este moderat în funcție de profilul respectiv
- Ștergere în cascadă: ștergerea unui profil șterge toate proiectele sale
### Urmărirea costurilor API

Fiecare apel Mistral facturabil (chat, OCR, STT, TTS, agenți), inclusiv detectarea instrucțiunilor și răspunsurile orale din quizul vocal, este instrumentat pentru a oferi utilizatorului o estimare în € **transparentă**. Moderarea, care este gratuită, nu este luată în calcul. Costurile instrumentelor agenților sunt incluse: 0,03 $ per căutare web și 0,10 $ per imagine generată (tarife Mistral), plus tokenurile produse de aceste instrumente, pe care estimarea le calculează la tariful de intrare al modelului agentului.

- **Sursa adevărului**: `helpers/pricing.ts` — `MODEL_PRICING` per prefix de model (ex.: `mistral-large` → intrare 0.5 €/M tokenuri, ieșire 1.5 €/M tokenuri), `PRICING_SOURCES` cu URL-uri către documentația Mistral pentru re-scraping periodic
- **Unități acceptate**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie controlată de `helpers/cost-calc.ts`
- **Lanț de instrumentare**: `helpers/tracked-client.ts` (încapsulează clientul Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectare în răspunsul HTTP)
- **UI**: insignă de cost per generare (`src/partials/cost-badge-gen.html`), per sursă (`cost-badge-src.html`), total cumulat în dashboard (`Project.totalCost`)
- **Endpointuri**: răspunsurile `/generate/*` și `/sources/*` completează obiectul returnat (`Generation` / `Source`) cu `estimatedCost`, `usage` și `costBreakdown`. `POST /generate/route` adaugă un câmp `costDelta: number` pentru costul exclusiv al rutării; `POST /detect-consigne` (`{consigne, costDelta}`) și verificarea unui răspuns oral returnează, de asemenea, propriul `costDelta`. `GET /projects/:pid` returnează proiectul completat cu `totalCost` (sumă calculată din `costLog[]`) + istoricul complet

### TTS (Mistral Voxtral) și voci personalizate

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, sinteză vocală 100% Mistral, fără a fi necesară o cheie suplimentară
- **Voci personalizate**: părinții își pot crea propriile voci prin API-ul Mistral Voices (pornind de la o mostră audio) și le pot atribui rolurilor de gazdă/invitat — podcasturile și quizurile vocale sunt apoi redate cu vocea unui părinte, făcând experiența și mai captivantă pentru copil
- Două roluri vocale configurabile: **gazdă** (narator principal) și **invitat** (a doua voce a podcastului)
- Catalogul complet al vocilor Mistral este disponibil în setări și poate fi filtrat după limbă

### Internaționalizare

- Interfață disponibilă în 9 limbi: fr, en, es, pt, it, nl, de, hi, ar
- Prompturile AI acceptă 15 limbi (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Limbă configurabilă per profil

---

## Stack tehnologic

| Strat | Tehnologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server și siguranța tipurilor |
| **Backend** | Express 5.x | API REST |
| **Server de dezvoltare** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfață reactivă, TypeScript compilat de Vite |
| **Templating** | vite-plugin-handlebars | Compunere HTML prin partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, agenți, moderare |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, sinteză vocală integrată |
| **Pictograme** | Lucide 1.x | Bibliotecă de pictograme SVG |
| **Scraping web** | Readability + linkedom | Extragerea conținutului principal al paginilor web (tehnologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Browser headless ultra-ușor (Zig + V8) pentru pagini JS/SPA — fallback pentru scraping |
| **Markdown** | Marked | Randare Markdown în chat |
| **Trimitere de fișiere** | Multer 2.x | Gestionarea formularelor multipart |
| **Audio** | ffmpeg-static | Concatenarea segmentelor audio |
| **Teste** | Vitest | Teste unitare — acoperire măsurată de SonarCloud |
| **Persistență** | Fișiere JSON | Stocare fără dependențe |

---

## Referința modelelor

| Model | Utilizare | Motiv |
|---|---|---|
| `mistral-large-latest` | Fișă, Flashcards, Podcast, Quiz, Texte cu spații libere, Chat, Verificarea quizului vocal, Agent de imagini, Agent de căutare web, Detectarea instrucțiunilor | Cel mai bun suport multilingual + respectarea instrucțiunilor |
| `mistral-ocr-4-1` (OCR 4.1, implicit) | OCR pentru documente | Text tipărit, tabele, scris de mână ($4 / 1000 de pagini) |
| `mistral-ocr-2512` (OCR 3, opțional) | OCR pentru documente | Poate fi selectat în Setări, mai ieftin ($2 / 1000 de pagini), citește mai bine scrisul de mână |
| `voxtral-mini-latest` | Recunoaștere vocală (STT) | STT multilingv, optimizat cu `language="fr"` |
| `voxtral-mini-tts-latest` | Sinteză vocală (TTS) | Podcasturi, quiz vocal, citire cu voce tare |
| `mistral-moderation-2603` | Moderarea conținutului | 6 categorii blocate pentru copii/adolescenți (inclusiv `jailbreaking`) |
| `mistral-small-latest` | Router automat | Analiză rapidă a conținutului pentru deciziile de rutare |

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

> **Notă**: Mistral Voxtral TTS este singurul provider TTS — nu este necesară nicio cheie suplimentară în afară de `MISTRAL_API_KEY`.

> **Cheie API introdusă de utilizator**: `MISTRAL_API_KEY` este acum **opțională**. Dacă lipsește, aplicația pornește oricum și invită fiecare utilizator să introducă **propria cheie Mistral** în interfață. Cheia este **stocată în browser** (criptată prin Web Crypto + IndexedDB într-un context securizat) și trimisă cu fiecare cerere — **nu este păstrată niciodată pe server**. Precedență: cheia profilului > cheia globală din browser > `MISTRAL_API_KEY` (env). Definirea `EUREKAI_REQUIRE_USER_KEY=true` obligă fiecare utilizator să furnizeze cheia sa (cheia din env mai este utilizată doar pentru preîncărcări).

> **HTTPS local (tabletă/LAN)**: `localhost` este deja un context securizat. Pentru acces LAN (tabletă), generează un certificat local și activează HTTPS: browserul poate apoi cripta cheia pe care o stochează, iar cheia este criptată în timpul tranzitului:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variabile de mediu

| Variabilă | Obligatoriu | Valoare implicită | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | opțional | — | Cheie API Mistral (chat, OCR, STT, TTS Voxtral, agenți, moderare). Dacă lipsește, utilizatorul își introduce cheia în aplicație (stocată în browser, niciodată pe server) |
| `EUREKAI_REQUIRE_USER_KEY` | opțional | `false` | `true` → dezactivează fallback-ul la `MISTRAL_API_KEY` pentru cererile AI (fiecare utilizator TREBUIE să își furnizeze cheia). Util pe o instanță expusă |
| `HTTPS_KEY` / `HTTPS_CERT` | opțional | — | Căile cheii/certificatului TLS (vezi `scripts/gen-cert.sh`) → Express și Vite servesc prin HTTPS (context securizat LAN/tabletă) |
| `PORT` | opțional | `3000` | Portul HTTP al backendului Express |
| `NODE_ENV` | opțional | `development` | Dacă `production` → Express servește frontendul din `dist/` (altfel `public/`) |
| `SONAR_TOKEN` | CI opțional | — | Utilizat numai de workflow-ul GitHub Actions SonarCloud |

### Teste, calitatea codului și contribuții

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hook-uri Git (Husky)**: `pre-commit` rulează succesiv `scripts/pre-commit-fast.sh` (conflicte, fișiere mari, shellcheck), `lint-staged`, apoi `npm test`; `pre-push` execută mai întâi un control blocant `npm audit` (blochează imediat ce o dependență, chiar și tranzitivă, are o vulnerabilitate de nivel `critical`, vezi `scripts/audit-verdict.mjs`), apoi `npm run security`. Fiecare hook blochează commitul/push-ul de îndată ce una dintre etapele sale eșuează.

**Instrumente externe (opționale pentru rularea aplicației, indispensabile pentru `pretest` și `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Fără aceste instrumente, `npm test` eșuează la `pretest` (lizard lipsește), iar `npm run security` eșuează (opengrep lipsește). Hook-urile Husky blochează atunci commitul/push-ul.

---

## Implementare cu un container

Imaginea este publicată în **GitHub Container Registry**:

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

> **`:U`**: flag Podman rootless care ajustează automat permisiunile volumului.

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
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, tryParseJson, retryTurns, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  audio-files.ts          — Persistance et lecture des fichiers audio générés (podcast, flashcards)
  generation-media.ts     — Noms uniques des médias (MP3/PNG) et suppression avec leur génération
  media-ledger.ts         — Médias écrits pendant une génération, supprimés si elle échoue ou est annulée
  keyed-lock.ts           — File d'attente par clé (OCR sérialisé par contenu)
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
  moderation-http.ts      — Statut de modération → réponse HTTP (400 signalé / 503 indisponible / 409 en cours), statut effectif, garde de la consigne
  moderation-profile.ts   — Profil propriétaire du projet et catégories actives (source unique des routes)
  source-moderation.ts    — Modérations en vol et reprise (démarrage, génération, chat, « Revérifier »)
  input-moderation.ts     — Modération d'un texte saisi ou dicté (texte libre, recherche web, réponse orale)
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
  rate-limit.ts           — Rate-limiters Express (authLimiter, pinLimiter, aiLimiter / aiPathLimiter, generalLimiter), 429 `rate_limited`
  request-validation.ts   — Validation de lang / ageGroup sur toutes les routes IA (400 invalid_input)
  output-static.ts        — Liste blanche du montage statique /output (médias des projets seulement)
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
    moderation-gate.ts    — Pré-contrôle de modération des générations (vérifie d'abord les sources en attente)
    effective-moderation.ts — Statut de modération affiché et masquage du contenu des sources
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

> **Pentru agenții AI care contribuie la cod**: consultați [`CLAUDE.md`](CLAUDE.md) pentru contextul arhitectural detaliat, regulile obligatorii (coduri de eroare, urmărirea costurilor și prompturi fără cuvinte meta, adică fără calificative ale documentului, precum tipul său, deoarece modelul ar copia aceste cuvinte în rezultatele sale) și capcanele cunoscute (Lizard CCN, Opengrep, migrarea Codacy/Semgrep).

---

## Referință API

### Configurare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/config` | Configurația curentă |
| `PUT` | `/api/config` | Modificarea configurației (modele, voci, model TTS) |
| `GET` | `/api/config/status` | Starea API-urilor: `mistral` (cheie Mistral definită), `ttsAvailable` (alias pentru `mistral`, Mistral Voxtral este singurul provider TTS) |
| `POST` | `/api/config/reset` | Resetarea configurației implicite |
| `GET` | `/api/config/voices` | Listarea vocilor Mistral TTS (`?lang=fr` opțional) |
| `GET` | `/api/moderation-categories` | Categorii de moderare disponibile + valori implicite în funcție de vârstă |
| `POST` | `/api/providers/mistral/validate` | Validarea unei chei Mistral introduse de utilizator — întotdeauna 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), fără fallback la env |

### Profiluri
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/profiles` | Listarea tuturor profilurilor |
| `POST` | `/api/profiles` | Crearea unui profil |
| `PUT` | `/api/profiles/:id` | Modificarea unui profil (PIN necesar pentru cei sub 15 ani; 10 PIN-uri greșite / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Ștergerea unui profil + ștergerea în cascadă a proiectelor `{pin?}` → `{ok, deletedProjects}` |

### Proiecte
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects` | Listarea proiectelor (`?profileId=` opțional) |
| `POST` | `/api/projects` | Crearea unui proiect `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detaliile proiectului; `?profileId=` atașează un proiect fără profil profilului care îl deschide |
| `PUT` | `/api/projects/:pid` | Redenumirea `{name}` |
| `DELETE` | `/api/projects/:pid` | Ștergerea proiectului |
| `GET` | `/api/projects/:pid/events` | Flux SSE în timp real (`event: generation`) al tranzițiilor de generare (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Surse
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importarea fișierelor multipart (OCR pentru JPG/PNG/PDF, citire directă pentru TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Text liber `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping al unui URL sau căutare web `{query}` — returnează un tabel de surse; 422 `url_blocked` dacă toate adresele sunt refuzate (rețea internă), 502 `all_sources_failed` dacă nu a putut fi creată nicio sursă |
| `POST` | `/api/projects/:pid/sources/moderate` | Reluarea moderărilor în așteptare sau cu erori `{sourceIds?}` (cel mult 10 per apel, așteptare ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ștergerea unei surse, a fișierului său importat și a instrucțiunii care depinde de ea → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderarea `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectarea instrucțiunilor de recapitulare (numai surse verificate) → `{consigne, costDelta}` |

### Generare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fișă de recapitulare |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz cu variante multiple (4 opțiuni, un singur răspuns corect) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Texte cu spații libere |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictare (cuvinte + propoziții-exemplu + reguli, 1 fișier audio TTS per cuvânt; propusă și de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustrație |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Recapitulare adaptivă `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Fișă de reamintire axată pe întrebările la care s-a răspuns greșit într-un quiz `{generationId, weakQuestions}` — apelată în paralel cu `quiz-review` de butonul de remediere din vizualizarea quizului |
| `POST` | `/api/projects/:pid/generate/route` | Analiza rutării (planul generatoarelor care trebuie lansate) — returnează `{plan, costDelta}` (doar costul rutării) |
| `POST` | `/api/projects/:pid/generate/auto` | Generare automată în backend (rutare + 8 tipuri: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Execuție în paralel — presupune un tier Mistral cu rate-limit ≥ 8 cereri simultane; altfel, mai multe erori 429 pot apărea în `failedSteps`. |

Toate rutele de generare acceptă `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; un `ageGroup` necunoscut sau un `lang` care nu este un cod de limbă valid (așteptat: `fr`, `pt-BR`…) → 400 `invalid_input`, înaintea oricărui apel AI. `quiz-review` și `remediation-summary` necesită în plus `{generationId, weakQuestions}` și se aplică surselor quizului original.

### CRUD Generări
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Trimiterea răspunsurilor la quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Trimiterea răspunsurilor la textele cu spații libere `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Trimiterea răspunsurilor la dictare `{answers}` (evaluare strictă pe server) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificarea unui răspuns oral (audio + questionIndex); răspunsul oral este moderat înainte de verificare (refuz: 400 `quiz.answerBlocked`), costul este returnat în `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Citire TTS cu voce tare (fișe/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Anularea unei generări în curs (singura modalitate de anulare a unei stări pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Redenumirea `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ștergerea generării și a conținutului său media (audio, imagine) |

### Chat
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Preluarea istoricului chatului |
| `POST` | `/api/projects/:pid/chat` | Trimiterea unui mesaj `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Ștergerea istoricului chatului |

---

## Decizii arhitecturale

| Decizie | Justificare |
|---|---|
| **Alpine.js în loc de React/Vue** | Amprentă minimă, reactivitate ușoară cu TypeScript compilat de Vite. Perfect pentru un hackathon în care viteza contează. |
| **Persistență în fișiere JSON** | Zero dependențe, pornire instantanee. Nicio bază de date de configurat — pornești și totul este gata. |
| **Vite + Handlebars** | Ce este mai bun din ambele lumi: HMR rapid pentru dezvoltare, partials HTML pentru organizarea codului, Tailwind JIT. |
| **Prompturi centralizate** | Toate prompturile AI în `prompts.ts` — ușor de iterat, testat și adaptat în funcție de limbă/grupă de vârstă. |
| **Sistem cu generări multiple** | Fiecare generare este un obiect independent, cu propriul ID — permite mai multe fișe, quizuri etc. per curs. |
| **Prompturi adaptate în funcție de vârstă** | 4 grupe de vârstă cu vocabular, complexitate și ton diferite — același conținut este predat diferit în funcție de cursant. |
| **Funcționalități bazate pe agenți** | Generarea imaginilor și căutarea web utilizează agenți Mistral temporari — ciclu de viață bine gestionat, cu curățare automată. |
| **Scraping inteligent al URL-urilor** | Un singur câmp acceptă URL-uri și cuvinte-cheie combinate — URL-urile sunt prelucrate prin scraping folosind Readability (pagini statice), cu fallback la Lightpanda (pagini JS/SPA), iar cuvintele-cheie declanșează un agent Mistral web_search. Fiecare rezultat creează o sursă independentă. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (fără cheie suplimentară în afară de `MISTRAL_API_KEY`) — sinteză vocală integrată în lanțul de costuri și în rezolvarea vocilor în funcție de limbă. |

---
## Credite și mulțumiri

- **[Mistral AI](https://mistral.ai)** — Modele AI (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reactiv ușor
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitar
- **[Vite](https://vitejs.dev)** — Instrument de build frontend
- **[Lucide](https://lucide.dev)** — Bibliotecă de pictograme
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extragerea conținutului web (tehnologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Browser headless ultraușor pentru scrapingul paginilor JS/SPA
- **[Luciole](https://luciole-vision.com)** — Font conceput pentru cititorii cu deficiențe de vedere, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opțiunea „Confort la citire” din profiluri)

Inițiat în timpul Mistral AI Worldwide Hackathon (martie 2026), dezvoltat integral de AI cu [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licență

[AGPL-3.0](LICENSE) — Drepturi de autor (C) 2026 Julien LS

**Articol tradus din fr în ro cu gpt-5.6-sol.**
