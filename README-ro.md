<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformă orice conținut într-o experiență interactivă de învățare — susținut de <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

**EurekAI** a luat naștere în timpul [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (martie 2026). Aveam nevoie de o temă — iar ideea a venit dintr-un lucru foarte concret: fac recapitulări frecvent pentru teste cu fiica mea și m-am gândit că ar fi posibil să transformăm asta în ceva mai distractiv și interactiv cu ajutorul IA.

Obiectivul: să luăm **orice intrare** — o fotografie a lecției, un text copiat și lipit, o înregistrare vocală, o căutare pe web — și să o transformăm în **fișe de recapitulare, flashcarduri, quizuri, podcasturi, texte lacunare, ilustrații și multe altele**. Totul susținut de modelele franceze ale Mistral AI, ceea ce face ca soluția să fie adaptată în mod natural elevilor francofoni.

[Prototipul inițial](https://github.com/jls42/worldwide-hackathon.mistral.ai) a fost conceput în 48 de ore în timpul hackathonului ca o dovadă de concept în jurul serviciilor Mistral — deja funcțional, dar limitat. De atunci, EurekAI a devenit un proiect în toată regula: texte lacunare, navigare în exerciții, web scraping, moderare parentală configurabilă, revizuire aprofundată a codului și multe altele. Întregul cod este generat de IA — în principal [Claude Code](https://code.claude.com/), cu câteva contribuții prin [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Prezentare generală

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Tur ghidat EurekAI: surse, fișă, quiz, flashcarduri, ilustrații" width="820" />
</p>

| | |
|---|---|
| ![Panou de control](docs/screenshots/dashboard.webp)<br>**Panou de control** — generări recente, cost estimat per card și total pe proiect, buton « Auto — Magie! » | ![Surse](docs/screenshots/sources.webp)<br>**Surse** — import foto/PDF/text/voce/web, generare cu un singur clic, detectare a cerințelor |

Fiecare sursă importată afișează [scorul său de încredere OCR, starea moderării și costul estimat](docs/screenshots/sources-list.webp).

### Componentele în acțiune

| | |
|---|---|
| ![Fișă de recapitulare](docs/screenshots/notes.gif)<br>**Fișă de recapitulare** — puncte-cheie, vocabular, citate cu sursă indicată, redare audio pe secțiuni | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz grilă** — feedback imediat cu explicație, navigare pas cu pas |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcarduri** — cartonaș de întors, urmat de autoevaluare «știam / nu știam» | ![Texte lacunare](docs/screenshots/fillblank.gif)<br>**Texte lacunare** — indiciu la cerere, validare tolerantă |
| ![Dictare](docs/screenshots/dictation.gif)<br>**Dictare** — cuvânt dictat audio, corectare strictă literă cu literă | ![Quiz vocal](docs/screenshots/vocal-quiz.gif)<br>**Quiz vocal** — întrebare citită cu voce tare, răspuns la microfon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast pe 2 voci, script dialogat consultabil | ![Ilustrații](docs/screenshots/illustrations.gif)<br>**Ilustrații** — imagini educative generate de Agent |
| ![Tutor IA](docs/screenshots/chat.gif)<br>**Tutor IA** — chat ancorat în documentele cursului, răspunsuri explicate, poate genera quizuri și flashcarduri | |

### Primii pași

| | |
|---|---|
| ![Alegerea profilului](docs/screenshots/login.gif)<br>**Alegerea profilului** — fiecare copil are spațiul său, propriul avatar și propria limbă | ![Crearea profilului](docs/screenshots/profile-create.gif)<br>**Crearea profilului** — vârstă, avatar, PIN parental pentru cei sub 15 ani |
| ![Crearea cursului](docs/screenshots/course.gif)<br>**Crearea cursului** — un proiect per lecție, gata să primească surse | ![Setări](docs/screenshots/settings.gif)<br>**Setări** — stare API, alegerea modelelor IA cu tarife afișate |

---

## Funcționalități

| | Funcționalitate | Descriere |
|---|---|---|
| 📷 | **Import de fișiere** | Importați-vă lecțiile — foto, PDF (prin Mistral OCR cu scor de încredere mediat, categorii `high`/`medium`/`low`) sau fișier text (TXT, MD). Sesiuni de încărcare cu reîncercare per fișier și progres individual |
| 📝 | **Introducere text** | Introduceți sau lipiți orice text direct |
| 🎤 | **Intrare vocală** | Înregistrați-vă — Voxtral STT vă transcrie vocea |
| 🌐 | **Web / URL** | Lipiți un URL (scraping direct prin Readability + Lightpanda) sau tastați o căutare (Agent Mistral web_search) |
| 📄 | **Fișe de recapitulare** | Notițe structurate cu puncte-cheie, vocabular, citate, anecdote |
| 🃏 | **Flashcarduri** | Cartonașe interactive Î/R, redare audio dialogată |
| ❓ | **Quiz grilă** | Întrebări cu variante multiple de răspuns și recapitulare adaptivă a greșelilor (număr configurabil) |
| ✏️ | **Texte lacunare** | Exerciții de completare a spațiilor libere cu indicii și validare tolerantă |
| 🔤 | **Dictare** | Cuvinte dictate audio (Voxtral TTS) dintr-o listă importată, tastare, corectare strictă literă cu literă cu regula de ortografie explicată |
| 🎙️ | **Podcast** | Mini-podcast pe 2 voci în format audio — voci Mistral implicite sau voci personalizate (părinți!) |
| 🖼️ | **Ilustrații** | Imagini educative generate de un Agent Mistral |
| 🗣️ | **Quiz vocal** | Întrebări citite cu voce tare (posibilitate de voce personalizată), răspuns oral, verificare IA |
| 💬 | **Tutor IA** | Chat contextual cu documentele de curs, cu apelare de instrumente |
| 🧠 | **Rutare automată** | Un ruter bazat pe `mistral-small-latest` analizează conținutul și propune o combinație de generatoare dintre cele 8 tipuri disponibile |
| 🔒 | **Control parental** | Moderare configurabilă per profil (categorii personalizabile), PIN parental, restricții de chat |
| 🌍 | **Multilingv** | Interfață disponibilă în 9 limbi; generare IA controlabilă în 15 limbi prin prompturi |
| 🔊 | **Citire cu voce tare** | Ascultați fișele și flashcardurile (dialog întrebare/răspuns) prin Mistral Voxtral TTS |
| 💶 | **Monitorizarea costurilor API** | Estimare transparentă a costului în € pentru fiecare generare și sursă (tokenuri / caractere / pagini / secunde audio). Ecuson per card + total per proiect, vizibil în panoul de control |
| 🎨 | **Temă per profil** | Fiecare profil își alege tema `dark` sau `light` — se păstrează la schimbarea profilului |

---

## Prezentare generală a arhitecturii

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Harta de utilizare a modelelor

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Parcursul utilizatorului

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## În detaliu — Funcționalități

### Intrare multimodală

EurekAI acceptă 4 tipuri de surse, moderate în funcție de profil (activat în mod implicit pentru copil și adolescent):

- **Import de fișiere** — Fișiere JPG, PNG sau PDF procesate prin Mistral OCR — **OCR 4 (`mistral-ocr-4-0`) în mod implicit** (cea mai bună calitate), **OCR 3 (`mistral-ocr-2512`) opțional** în Setări (mai ieftin, ~½ din cost) — pentru text tipărit, tabele și scris de mână; sau fișiere text (TXT, MD) importate direct. Încărcările de fișiere multiple utilizează un sistem de **sesiuni de încărcare**: progres individual per fișier, reîncercare pentru fișierul eșuat fără retrimiterea celorlalte, închiderea sesiunii la finalizare. OCR-ul expune un **scor de încredere** mediat (`average`, limitat la intervalul `[0,1]`, calculat pe baza `averagePageConfidenceScore` returnate de Mistral), afișat în interfață sub forma unui ecuson de nivel `high` / `medium` / `low` (praguri ~0.9 / ~0.7) — avertizează fără a bloca dacă scanarea este de calitate slabă. Copia documentului trimisă către Mistral pentru OCR este ștearsă imediat după finalizarea procesării, chiar și în caz de eșec.
- **Text liber** — Tastați sau lipiți orice conținut. Moderat înainte de stocare dacă moderarea este activă.
- **Intrare vocală** — Înregistrați audio în browser. Transcris de `voxtral-mini-latest`. Parametrul `language="fr"` optimizează recunoașterea.
- **Web / URL** — Lipiți una sau mai multe adrese URL pentru a extrage direct conținutul (Readability + Lightpanda pentru paginile JS) sau tastați cuvinte-cheie pentru o căutare web prin intermediul Agentului Mistral. Câmpul unic acceptă ambele variante — URL-urile și cuvintele-cheie sunt separate automat, fiecare rezultat creând o sursă independentă.

### Generare de conținut IA

Opt tipuri de materiale de învățare generate:

| Generator | Model | Rezultat |
|---|---|---|
| **Fișă de recapitulare** | `mistral-large-latest` | Titlu, rezumat, puncte-cheie, vocabular, citate, anecdotă |
| **Flashcarduri** | `mistral-large-latest` | Cartonașe Î/R cu trimiteri la surse (număr configurabil) |
| **Quiz grilă** | `mistral-large-latest` | Întrebări cu variante multiple de răspuns, explicații, recapitulare adaptivă (număr configurabil) |
| **Texte lacunare** | `mistral-large-latest` | Propoziții de completat cu indicii, validare tolerantă (Levenshtein) |
| **Dictare** | `mistral-large-latest` + Voxtral TTS | Cuvinte-cheie dictate audio (1 MP3/cuvânt) → tastare → corectare strictă (diacritice) cu regula explicată |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script pe 2 voci → audio MP3 |
| **Ilustrație** | Agent `mistral-large-latest` | Imagine educativă prin instrumentul `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Întrebări TTS → răspuns STT → verificare IA |

### Tutor IA prin chat

Un tutor conversațional cu acces complet la documentele cursului:

- Utilizează `mistral-large-latest`
- **Apelare de instrumente**: poate genera fișe, flashcarduri, quizuri sau texte lacunare în timpul conversației
- Istoric de 50 de mesaje per curs
- Moderare dacă este activată pentru profil: mesajul este verificat, iar sursele semnalate, aflate în eroare sau neverificate încă sunt excluse din context, la fel ca și din instrumente (verificarea lor este mai întâi reluată, maximum 5 s)

### Rutare automată

Ruterul folosește `mistral-small-latest` pentru a analiza conținutul surselor și a propune cele mai relevante generatoare dintre cele 8 disponibile. Interfața afișează progresul în timp real: mai întâi o fază de analiză, apoi generările individuale, cu posibilitate de anulare.

### Învățare adaptivă

- **Statistici pentru quizuri**: monitorizarea încercărilor și a acurateței per întrebare
- **Recapitularea quizului**: generează 5-10 întrebări noi axate pe noțiunile slab stăpânite, pornind de la sursele quizului original (bariera de moderare se aplică acelorași surse)
- **Detectarea cerințelor**: detectează instrucțiunile de recapitulare („Știu lecția dacă știu...”) și le acordă prioritate în generatoarele textuale compatibile (fișă, flashcarduri, quiz, texte lacunare). Când moderarea este activă, detectarea așteaptă verificarea surselor și le citește doar pe cele considerate sigure; cerința păstrează lista surselor sale de origine, nu este nici afișată, nici aplicată dacă una dintre ele devine semnalată și dispare odată cu aceasta. Costul său este contorizat

### Securitate și control parental

- **4 grupe de vârstă**: copil (≤10 ani), adolescent (11-15), student (16-25), adult (26+)
- **Moderarea conținutului**: `mistral-moderation-2603` (Mistral Moderation 2) cu 11 categorii disponibile, 6 blocate în mod implicit pentru noile profiluri de copil/adolescent (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` adăugată după o evaluare pe 50 de lecții, inclusiv istorie, fără niciun rezultat fals pozitiv). Categorii personalizabile per profil în setări; Moderation 2 a divizat fosta categorie „conținut periculos” în `dangerous` + `criminal` (profilurile existente sunt migrate automat, iar categoriile blocate se aplică și surselor deja importate). Securitate implicită: dacă răspunsul modelului nu permite verificarea unei categorii blocate, conținutul este refuzat („Moderare indisponibilă”); cu moderarea activă, atât generarea, cât și chatul exclud sursele semnalate, aflate în eroare sau în curs de verificare. O sursă care nu a fost verificată niciodată (importată cu moderarea dezactivată, proiect vechi asociat unui profil) este verificată înainte de utilizare; o moderare întreruptă de o repornire sau eșuată este reluată automat (la pornire dacă cheia de server permite acest lucru, altfel la deschiderea proiectului sau la generarea următoare), iar un buton «Reverifică» o relansează la cerere. Conținutul unei surse semnalate sau în curs de verificare este ascuns copilului (previzualizare, text, document original); un părinte îl poate afișa cu ajutorul PIN-ului său, pe durata unei consultări. Răspunsul oral la quizul vocal este moderat înainte de a fi verificat. ID datat fixat în `helpers/moderation-model.ts`: aliasul depreciat `-latest` nu mai este listat de API.
- **PIN parental**: hash SHA-256, obligatoriu pentru profilurile sub 15 ani; cel mult 10 coduri greșite la fiecare sfert de oră și per adresă IP (429 `rate_limited`). Pentru o implementare în producție, se recomandă un hash lent cu sare (Argon2id, bcrypt).
- **Datele serverului**: `/output` publică exclusiv fișierele media ale proiectelor (audio, imagini, fișiere importate); `profiles.json`, `config.json` și fișierele proiectelor nu sunt niciodată servite
- **Restricții de chat**: chatul IA este dezactivat în mod implicit pentru cei sub 16 ani, putând fi activat de părinți

### Sistem multi-profil

- Profiluri multiple cu nume, vârstă, avatar, preferințe lingvistice
- **Voci per profil** (`Profile.mistralVoices?: { host?, guest? }` — fiecare rol este opțional) — fiecare copil poate avea propria pereche de voci pentru podcast/quiz vocal
- **Temă per profil** (`Profile.theme: 'dark' | 'light'`) — comutare automată la schimbarea profilului, salvată în backend
- Proiecte asociate profilurilor prin `profileId`; un proiect vechi fără profil este asociat primului profil care îl deschide, apoi este moderat conform acelui profil
- Ștergere în cascadă: ștergerea unui profil șterge toate proiectele sale

### Monitorizarea costurilor API

Fiecare apel Mistral facturabil (chat, OCR, STT, TTS, agenți), inclusiv detectarea cerințelor și răspunsurile vocale la quizul vocal, este instrumentat pentru a oferi o estimare în € **transparentă** utilizatorului. Moderarea, fiind gratuită, nu este contorizată. Costurile pentru instrumentele agenților sunt incluse: 0,03 $ per căutare web și 0,10 $ per imagine generată (tarife Mistral), plus tokenurile produse de aceste instrumente, contorizate la tariful de intrare (input) al modelului agentului.

- **Sursă de adevăr**: `helpers/pricing.ts` — `MODEL_PRICING` per prefix de model (ex.: `mistral-large` → input 0.5 €/M tokenuri, output 1.5 €/M tokenuri), `PRICING_SOURCES` cu URL-uri către documentația Mistral pentru re-scraping periodic
- **Unități acceptate**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie gestionată prin `helpers/cost-calc.ts`
- **Lanț de instrumentare**: `helpers/tracked-client.ts` (wrap client Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectare în răspunsul HTTP)
- **UI**: ecuson de cost per generare (`src/partials/cost-badge-gen.html`), per sursă (`cost-badge-src.html`), total cumulat în dashboard (`Project.totalCost`)
- **Endpointuri**: răspunsurile `/generate/*` și `/sources/*` decorează obiectul returnat (Generation / Source) cu `estimatedCost`, `usage` și `costBreakdown`. `POST /generate/route` adaugă un câmp `costDelta: number` doar pentru costul rutării; `POST /detect-consigne` (`{consigne, costDelta}`) și verificarea unui răspuns oral returnează de asemenea parametrul `costDelta`. `GET /projects/:pid` returnează proiectul îmbogățit cu `totalCost` (sumă calculată din `costLog[]`) + istoricul complet

### TTS (Mistral Voxtral) și voci personalizate

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, sinteză vocală 100% Mistral, nu este necesară nicio cheie suplimentară
- **Voci personalizate**: părinții își pot crea propriile voci prin intermediul API-ului Mistral Voices (pe baza unei mostre audio) și le pot asocia rolurilor de gazdă/invitat — podcasturile și quizurile vocale sunt apoi citite cu vocea unui părinte, făcând experiența și mai captivantă pentru copil
- Două roluri vocale configurabile: **gazdă** (narator principal) și **invitat** (a doua voce din podcast)
- Catalog complet al vocilor Mistral disponibil în setări, filtrabil după limbă

### Internaționalizare

- Interfață disponibilă în 9 limbi: fr, en, es, pt, it, nl, de, hi, ar
- Prompturile IA acceptă 15 limbi (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Limbă configurabilă per profil

---

## Stack tehnic

| Strat | Tehnologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server și siguranță a tipurilor |
| **Backend** | Express 5.x | API REST |
| **Server de dev** | Vite 8.x (Rolldown) + tsx | HMR, parțiale Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfață reactivă, TypeScript compilat de Vite |
| **Templating** | vite-plugin-handlebars | Compoziție HTML prin parțiale |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agenți, Moderare |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, sinteză vocală integrată |
| **Pictograme** | Lucide 1.x | Bibliotecă de pictograme SVG |
| **Scraping web** | Readability + linkedom | Extragerea conținutului principal al paginilor web (tehnologie Firefox Reader View) |
| **Browser headless** | Lightpanda | Browser headless ultra-ușor (Zig + V8) pentru pagini JS/SPA — fallback pentru scraping |
| **Markdown** | Marked | Redare markdown în chat |
| **Încărcare fișiere** | Multer 2.x | Gestionarea formularelor multipart |
| **Audio** | ffmpeg-static | Concatenare de segmente audio |
| **Teste** | Vitest | Teste unitare — acoperire măsurată prin SonarCloud |
| **Persistență** | Fișiere JSON | Stocare fără dependențe |

---

## Referința modelelor

| Model | Utilizare | De ce |
|---|---|---|
| `mistral-large-latest` | Fișă, Flashcarduri, Podcast, Quiz, Texte lacunare, Chat, Verificare quiz vocal, Agent Imagine, Agent Web Search, Detectare cerință | Cel mai bun multilingual + respectare a instrucțiunilor |
| `mistral-ocr-4-0` (OCR 4, implicit) | OCR pentru documente — calitate superioară | Text tipărit, tabele, scris de mână ($4 / 1000 de pagini) |
| `mistral-ocr-2512` (OCR 3, opțiune) | OCR pentru documente | Selectabil în Setări, mai ieftin ($2 / 1000 de pagini) |
| `voxtral-mini-latest` | Recunoaștere vocală (STT) | STT multilingv, optimizat cu `language="fr"` |
| `voxtral-mini-tts-latest` | Sinteză vocală (TTS) | Podcasturi, quiz vocal, citire cu voce tare |
| `mistral-moderation-2603` | Moderare de conținut | 6 categorii blocate pentru copii/adolescenți (inclusiv `jailbreaking`) |
| `mistral-small-latest` | Ruter automat | Analiză rapidă a conținutului pentru decizii de rutare |

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

> **Notă**: Mistral Voxtral TTS este singurul furnizor TTS — nu este necesară nicio cheie suplimentară în afară de `MISTRAL_API_KEY`.

> **Cheie API introdusă de utilizator**: `MISTRAL_API_KEY` este de acum **opțională**. Dacă lipsește, aplicația pornește oricum și solicită fiecărui utilizator să introducă **propria cheie Mistral** în interfață. Cheia este **stocată în browser** (criptată prin Web Crypto + IndexedDB într-un context securizat) și trimisă per cerere — **nu este persistată niciodată pe server**. Prioritate: cheia de profil > cheia globală din browser > `MISTRAL_API_KEY` (env). Setarea `EUREKAI_REQUIRE_USER_KEY=true` obligă fiecare utilizator să își furnizeze cheia (cheia din env mai este folosită doar pentru preîncărcări).

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
| `HTTPS_KEY` / `HTTPS_CERT` | opțional | — | Căi cheie/certificat TLS (cf. `scripts/gen-cert.sh`) → Express și Vite servesc prin HTTPS (context securizat LAN/tabletă) |
| `PORT` | opțional | `3000` | Portul HTTP al backend-ului Express |
| `NODE_ENV` | opțional | `development` | Dacă `production` → Express servește frontend-ul din `dist/` (altfel `public/`) |
| `SONAR_TOKEN` | opțional CI | — | Utilizat exclusiv de fluxul de lucru GitHub Actions SonarCloud |

### Teste, calitatea codului și contribuții

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hook-uri Git (Husky)**: `pre-commit` înlănțuie `scripts/pre-commit-fast.sh` (conflicte, fișiere mari, shellcheck), `lint-staged` apoi `npm test`; `pre-push` execută mai întâi o verificare (gate) `npm audit` (blochează la vulnerabilități critice tranzitive, cf. `scripts/audit-verdict.mjs`), apoi `npm run security`. Toate blochează commit-ul/push-ul în caz de eșec.

**Instrumente externe necesare (opționale, dar utilizate de `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Fără aceste instrumente, `npm test` eșuează la `pretest` (lizard absent), iar `npm run security` eșuează (opengrep absent). Hook-urile husky blochează atunci commit-ul/push-ul.

---

## Implementare prin containere

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

> **Pentru colaboratorii IA**: consultați [`CLAUDE.md`](CLAUDE.md) pentru contextul detaliat de arhitectură, regulile obligatorii (anti-leak prompts, coduri de eroare, cost tracking) și capcanele cunoscute (Lizard CCN, Opengrep, migrarea Codacy/Semgrep).

---

## Referință API

### Config
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/config` | Configurația curentă |
| `PUT` | `/api/config` | Modificarea configurației (modele, voci, model TTS) |
| `GET` | `/api/config/status` | Starea API-urilor: `mistral` (cheie Mistral definită), `ttsAvailable` (alias pentru `mistral`, Mistral Voxtral este singurul furnizor TTS) |
| `POST` | `/api/config/reset` | Resetarea configurației la valorile implicite |
| `GET` | `/api/config/voices` | Listarea vocilor Mistral TTS (opțional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorii de moderare disponibile + setări implicite în funcție de vârstă |
| `POST` | `/api/providers/mistral/validate` | Validarea unei chei Mistral introduse de utilizator — returnează întotdeauna 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), fără fallback pe env |

### Profiluri
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/profiles` | Listarea tuturor profilurilor |
| `POST` | `/api/profiles` | Crearea unui profil |
| `PUT` | `/api/profiles/:id` | Modificarea unui profil (PIN necesar pentru < 15 ani; 10 încercări greșite de PIN / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Ștergerea unui profil + ștergere în cascadă a proiectelor `{pin?}` → `{ok, deletedProjects}` |

### Proiecte
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects` | Listarea proiectelor (`?profileId=` opțional) |
| `POST` | `/api/projects` | Crearea unui proiect `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detalii despre proiect; `?profileId=` asociază un proiect fără profil la profilul care îl deschide |
| `PUT` | `/api/projects/:pid` | Redenumire `{name}` |
| `DELETE` | `/api/projects/:pid` | Ștergerea proiectului |
| `GET` | `/api/projects/:pid/events` | Flux SSE în timp real (`event: generation`) al tranzițiilor de generare (`completed`/`failed`/`cancelled`) + semnal keep-alive (heartbeat) |

### Surse
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import de fișiere multipart (OCR pentru JPG/PNG/PDF, citire directă pentru TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Text liber `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping de URL sau căutare web `{query}` — returnează un tablou de surse; 422 `url_blocked` dacă toate adresele sunt refuzate (rețea internă), 502 `all_sources_failed` dacă nu a putut fi creată nicio sursă |
| `POST` | `/api/projects/:pid/sources/moderate` | Reluarea moderărilor în așteptare sau cu eroare `{sourceIds?}` (cel mult 10 per apel, așteptare ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ștergerea unei surse, a fișierului său importat și a cerinței dependente → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderare `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectarea cerințelor de recapitulare (doar surse verificate) → `{consigne, costDelta}` |

### Generare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fișă de recapitulare |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcarduri |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz cu variante multiple (grilă) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Texte lacunare |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictare (cuvinte + exemple de propoziții + reguli, 1 fișier audio TTS per cuvânt; propusă și de ruterul automat) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustrație |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Recapitulare adaptivă `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Fișă recapitulativă axată pe întrebările greșite dintr-un quiz `{generationId, weakQuestions}` — apelată în paralel cu `quiz-review` prin butonul „Exersează pe baza greșelilor” |
| `POST` | `/api/projects/:pid/generate/route` | Analiză de rutare (planul generatoarelor de lansat) — returnează `{plan, costDelta}` (doar costul rutării) |
| `POST` | `/api/projects/:pid/generate/auto` | Generare automată backend (rutare + 8 tipuri: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Execuție în paralel — presupune un nivel (tier) Mistral cu limită de rată ≥ 8 cereri simultane; în caz contrar pot apărea mai multe erori 429 în `failedSteps`. |

Toate rutele de generare acceptă `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; un `lang` care nu este un cod de limbă (ex. `pt-BR`) sau un `ageGroup` necunoscut → 400 `invalid_input`, înainte de orice apel IA. `quiz-review` și `remediation-summary` solicită în plus `{generationId, weakQuestions}` și se bazează pe sursele quizului de origine.

### CRUD Generări
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Trimiterea răspunsurilor la quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Trimiterea răspunsurilor pentru textele lacunare `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Trimiterea răspunsurilor la dictare `{answers}` (punctaj strict pe server) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificarea unui răspuns oral (audio + questionIndex); răspuns moderat (400 `quiz.answerBlocked`), cost returnat în `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Citire TTS cu voce tare (fișe/flashcarduri) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Anularea unei generări în curs (singura modalitate de anulare a unei stări de așteptare/pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Redenumire `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ștergerea generării și a fișierelor media asociate (audio, imagine) |

### Chat
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Preluarea istoricului de chat |
| `POST` | `/api/projects/:pid/chat` | Trimiterea unui mesaj `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Ștergerea istoricului de chat |

---

## Decizii arhitecturale

| Decizie | Justificare |
|---|---|
| **Alpine.js în loc de React/Vue** | Amprentă minimă, reactivitate ușoară cu TypeScript compilat prin Vite. Perfect pentru un hackathon unde viteza contează. |
| **Persistență în fișiere JSON** | Zero dependențe, pornire instantanee. Nicio bază de date de configurat — se pornește și gata. |
| **Vite + Handlebars** | Ce e mai bun din ambele lumi: HMR rapid pentru dezvoltare, parțiale HTML pentru organizarea codului, Tailwind JIT. |
| **Prompturi centralizate** | Toate prompturile IA în `prompts.ts` — ușor de iterat, testat și adaptat în funcție de limbă/grupă de vârstă. |
| **Sistem multi-generare** | Fiecare generare este un obiect independent cu propriul ID — permite mai multe fișe, quizuri etc. per curs. |
| **Prompturi adaptate în funcție de vârstă** | 4 grupe de vârstă cu vocabular, complexitate și ton diferite — același conținut predă diferit în funcție de elev. |
| **Funcționalități bazate pe Agenți** | Generarea de imagini și căutarea web folosesc Agenți Mistral temporari — ciclu de viață curat cu curățare automată. |
| **Scraping inteligent de URL-uri** | Un câmp unic acceptă URL-uri și cuvinte-cheie amestecate — URL-urile sunt preluate prin Readability (pagini statice) cu fallback pe Lightpanda (pagini JS/SPA), iar cuvintele-cheie declanșează un Agent Mistral web_search. Fiecare rezultat creează o sursă independentă. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (fără nicio cheie suplimentară în afară de `MISTRAL_API_KEY`) — sinteză vocală integrată în lanțul de calcul al costurilor și în rezoluția vocilor per limbă. |

---

## Credite & mulțumiri

- **[Mistral AI](https://mistral.ai)** — Modele IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reactiv ușor
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitar
- **[Vite](https://vitejs.dev)** — Instrument de build frontend
- **[Lucide](https://lucide.dev)** — Bibliotecă de pictograme
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extragere de conținut web (tehnologie Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Browser headless ultra-ușor pentru scraping de pagini JS/SPA
- **[Luciole](https://luciole-vision.com)** — Font conceput pentru cititorii cu deficiențe de vedere, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opțiunea „Confort de lectură” a profilurilor)

Inițiat în timpul Mistral AI Worldwide Hackathon (martie 2026), dezvoltat integral prin IA cu [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licență

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Articol tradus din fr în ro cu gemini-3.8-flash-medium.**
