<p align="center">
  <img src="public/assets/logo.webp" alt="Sigla EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformă orice conținut într-o experiență de învățare interactivă — cu ajutorul <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Engleză</a> · <a href="README-es.md">🇪🇸 Spaniolă</a> · <a href="README-pt.md">🇧🇷 Portugheză</a> · <a href="README-de.md">🇩🇪 Germană</a> · <a href="README-it.md">🇮🇹 Italiană</a> · <a href="README-nl.md">🇳🇱 Neerlandeză</a> · <a href="README-ar.md">🇸🇦 Arabă</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chineză</a> · <a href="README-ja.md">🇯🇵 Japoneză</a> · <a href="README-ko.md">🇰🇷 Coreeană</a> · <a href="README-pl.md">🇵🇱 Poloneză</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Suedeză</a>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Linii de cod"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Insignă Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Povestea — De ce EurekAI?

**EurekAI** a luat naștere în timpul [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (martie 2026). Aveam nevoie de o temă — iar ideea a venit dintr-o situație foarte concretă: pregătesc regulat testele împreună cu fiica mea și m-am gândit că ar trebui să fie posibil să facem asta mai distractiv și mai interactiv cu ajutorul AI.

Obiectivul: să preluăm **orice tip de intrare** — o fotografie a lecției, un text copiat și lipit, o înregistrare vocală, o căutare web — și să o transformăm în **fișe de recapitulare, flashcards, quizuri, podcasturi, texte lacunare, ilustrații și multe altele**. Totul cu ajutorul modelelor Mistral AI, o companie franceză, ceea ce face din EurekAI o soluție adaptată în mod natural elevilor francofoni.

[Prototipul inițial](https://github.com/jls42/worldwide-hackathon.mistral.ai) a fost conceput în 48h în timpul hackathonului ca demonstrație de concept construită pe serviciile Mistral — deja funcțional, dar limitat. De atunci, EurekAI a devenit un proiect în toată regula: texte lacunare, navigare prin exerciții, scraping web, moderare parentală configurabilă, revizuire aprofundată a codului și multe altele. Întregul cod este generat de AI — în principal [Claude Code](https://code.claude.com/), cu câteva contribuții prin [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Prezentare generală

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Tur ghidat EurekAI: surse, fișă, quiz, flashcards, ilustrații" width="820" />
</p>

| | |
|---|---|
| ![Panou de control](docs/screenshots/dashboard.webp)<br>**Panou de control** — generări recente, cost estimat pentru fiecare card și total pe proiect, buton „Auto — Magie!” | ![Surse](docs/screenshots/sources.webp)<br>**Surse** — import fotografie/PDF/text/voce/web, generare cu un singur clic, detectarea instrucțiunilor |

Fiecare sursă importată afișează [scorul de încredere OCR, moderarea și costul estimat](docs/screenshots/sources-list.webp).

### Componentele în acțiune

| | |
|---|---|
| ![Fișă de recapitulare](docs/screenshots/notes.gif)<br>**Fișă de recapitulare** — puncte esențiale, vocabular, citate cu surse, lectură audio pentru fiecare secțiune | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz cu variante de răspuns** — un singur răspuns corect la fiecare întrebare, feedback imediat cu explicație, navigare pas cu pas |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — card de întors, apoi autoevaluare „știam / nu știam” | ![Texte lacunare](docs/screenshots/fillblank.gif)<br>**Texte lacunare** — indiciu la cerere, validare tolerantă |
| ![Dictare](docs/screenshots/dictation.gif)<br>**Dictare** — cuvânt dictat audio, corectare strictă literă cu literă | ![Quiz vocal](docs/screenshots/vocal-quiz.gif)<br>**Quiz vocal** — întrebare citită cu voce tare, răspuns la microfon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast cu 2 voci, scenariu dialogat disponibil pentru consultare | ![Ilustrații](docs/screenshots/illustrations.gif)<br>**Ilustrații** — imagini educaționale generate de un Agent |
| ![Tutore AI](docs/screenshots/chat.gif)<br>**Tutore AI** — chat bazat pe documentele cursului, răspunsuri explicate, poate genera quizuri și flashcards | |

### Primii pași

| | |
|---|---|
| ![Alegerea profilului](docs/screenshots/login.gif)<br>**Alegerea profilului** — fiecare copil are propriul spațiu, avatar și limbă | ![Crearea profilului](docs/screenshots/profile-create.gif)<br>**Crearea profilului** — vârstă, avatar, PIN parental pentru cei sub 15 ani |
| ![Crearea cursului](docs/screenshots/course.gif)<br>**Crearea cursului** — un proiect pentru fiecare lecție, pregătit să primească surse | ![Setări](docs/screenshots/settings.gif)<br>**Setări** — starea API, alegerea modelelor AI cu tarife afișate |

---

## Funcționalități

| | Funcționalitate | Descriere |
|---|---|---|
| 📷 | **Import de fișiere** | Importați lecțiile — fotografie, PDF (prin Mistral OCR cu scor mediu de încredere, niveluri `high`/`medium`/`low`) sau fișier text (TXT, MD). Sesiuni de upload cu retry pentru fiecare fișier și progres individual |
| 📝 | **Introducere de text** | Scrieți sau lipiți direct orice text |
| 🎤 | **Intrare vocală** | Înregistrați-vă — Voxtral STT vă transcrie vocea |
| 🌐 | **Web / URL** | Lipiți un URL (scraping direct prin Readability + Lightpanda) sau introduceți o căutare (Agent Mistral web_search) |
| 📄 | **Fișe de recapitulare** | Notițe structurate cu puncte esențiale, vocabular, citate, anecdote |
| 🃏 | **Flashcards** | Carduri interactive întrebare/răspuns, lectură audio dialogată |
| ❓ | **Quiz cu variante de răspuns** | Întrebări cu 4 variante și un singur răspuns corect, cu recapitulare adaptivă a greșelilor (număr configurabil) |
| ✏️ | **Texte lacunare** | Exerciții de completare cu indicii și validare tolerantă |
| 🔤 | **Dictare** | Cuvinte dictate audio (Voxtral TTS) dintr-o listă importată, introducere de la tastatură, corectare strictă literă cu literă cu explicarea regulii de ortografie |
| 🎙️ | **Podcast** | Mini-podcast audio cu 2 voci — voci Mistral implicite sau voci personalizate (ale părinților!) |
| 🖼️ | **Ilustrații** | Imagini educaționale generate de un Agent Mistral |
| 🗣️ | **Quiz vocal** | Întrebări citite cu voce tare (poate fi folosită o voce personalizată), răspuns oral, verificare AI |
| 💬 | **Tutore AI** | Chat contextual cu documentele cursului, cu apelare de instrumente |
| 🧠 | **Router automat** | Un router bazat pe `mistral-small-latest` analizează conținutul și propune o combinație de generatoare dintre cele 8 tipuri disponibile |
| 🔁 | **Continuitate între cursuri** | Importurile, generările automate, înregistrarea la microfon, chatul, căutarea web și lectura cu voce tare continuă pentru cursul lor când se deschide altul; o notificare indică numele cursului când o operațiune se încheie în alt curs |
| 🔒 | **Control parental** | Moderare configurabilă pentru fiecare profil (categorii personalizabile), PIN parental, restricții de chat |
| 🌍 | **Multilingv** | Interfață disponibilă în 9 limbi; generare AI configurabilă în 15 limbi prin prompts |
| 🔊 | **Lectură cu voce tare** | Ascultați fișele și flashcards (dialog întrebare/răspuns) prin Mistral Voxtral TTS |
| 💶 | **Monitorizarea costurilor API** | Estimare transparentă a costului în € pentru fiecare generare și sursă (tokens / caractere / pagini / secunde audio). Insignă pentru fiecare card + total pe proiect, vizibil în panoul de control |
| 🎨 | **Temă pentru fiecare profil** | Fiecare profil își alege tema `dark` sau `light` — salvată în profil și reaplicată la fiecare schimbare de profil |

---

## Privire de ansamblu asupra arhitecturii

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Privire de ansamblu asupra arhitecturii" width="800" />
</p>

---

## Harta utilizării modelelor

<p align="center">
  <img src="public/assets/model-map.webp" alt="Asocierea modelelor AI cu sarcinile" width="800" />
</p>

---

## Parcursul utilizatorului

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Parcursul de învățare al elevului" width="800" />
</p>

---

## În detaliu — Funcționalități

### Intrare multimodală

EurekAI acceptă 4 tipuri de surse, moderate în funcție de profil (moderarea este activată implicit pentru profilurile de copii și adolescenți):

- **Import de fișiere** — Fișiere JPG, PNG sau PDF procesate prin OCR Mistral — **OCR 4.1** (`mistral-ocr-4-1`) implicit, **OCR 3** (`mistral-ocr-2512`) opțional în Setări (mai ieftin, ~½ din cost; citește mai bine scrisul de mână) — pentru text tipărit, tabele și scris de mână; sau fișiere text (TXT, MD) importate direct. Uploadurile cu mai multe fișiere folosesc un sistem de **sesiuni de upload**: progres individual pentru fiecare fișier, retry pentru fișierul eșuat fără retrimiterea celorlalte, închiderea sesiunii la finalizare. OCR expune un **scor de încredere** mediu (`average`, limitat la `[0,1]`, calculat din `averagePageConfidenceScore` returnate de Mistral), afișat în UI ca insignă de nivel `high` / `medium` / `low` (praguri ~0.9 / ~0.7) — avertizează fără a bloca dacă scanarea este de slabă calitate. Copia documentului trimisă la Mistral pentru OCR este ștearsă imediat după încheierea procesării, chiar și în caz de eșec.
- **Text liber** — Scrieți sau lipiți orice conținut. Este moderat înainte de stocare dacă moderarea este activă.
- **Intrare vocală** — Înregistrați audio în browser. Transcrierea se face implicit cu **Voxtral Mini Transcribe 2** (`voxtral-mini-2602`); **Voxtral Mini Transcribe 3** și **Voxtral Small Transcribe 3** (versiuni preliminare Mistral) sunt disponibile opțional în Setări. Limba interfeței este transmisă modelului (`language`) pentru a optimiza recunoașterea.
- **Web / URL** — Lipiți unul sau mai multe URL-uri pentru a extrage direct conținutul prin scraping (Readability + Lightpanda pentru paginile JS) sau introduceți cuvinte-cheie pentru o căutare web prin Agent Mistral. Câmpul unic acceptă ambele variante — URL-urile și cuvintele-cheie sunt separate automat, iar fiecare rezultat creează o sursă independentă.

### Generare de conținut AI

Opt tipuri de materiale de învățare generate:

| Generator | Model | Rezultat |
|---|---|---|
| **Fișă de recapitulare** | `mistral-large-latest` | Titlu, rezumat, puncte esențiale, vocabular, citate, anecdotă |
| **Flashcards** | `mistral-large-latest` | Carduri întrebare/răspuns cu referințe la surse (număr configurabil) |
| **Quiz cu variante de răspuns** | `mistral-large-latest` | Întrebări cu 4 variante și un singur răspuns corect, explicații, recapitulare adaptivă (număr configurabil) |
| **Texte lacunare** | `mistral-large-latest` | Propoziții de completat cu indicii, validare tolerantă (Levenshtein) |
| **Dictare** | `mistral-large-latest` + Voxtral TTS | Cuvinte-cheie dictate audio (1 MP3/cuvânt) → introducere de la tastatură → corectare strictă (un accent omis se consideră greșeală) cu explicarea regulii |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Scenariu cu 2 voci → audio MP3 |
| **Ilustrație** | Agent `mistral-large-latest` | Imagine educațională prin instrumentul `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Întrebări TTS → răspuns STT → verificare AI |

### Tutore AI prin chat

Un tutore conversațional cu acces complet la documentele cursului:

- Folosește `mistral-large-latest`
- **Apelare de instrumente**: poate genera fișe, flashcards, quizuri sau texte lacunare în timpul conversației
- Istoric de 50 de mesaje pentru fiecare curs
- Moderare dacă este activată pentru profil: mesajul este verificat, iar sursele semnalate, cele a căror verificare a eșuat și cele încă neverificate sunt excluse din context și din instrumente (verificarea surselor cu verificare eșuată sau încă neverificate este mai întâi relansată, timp de cel mult 5 s)

### Router automat

Routerul folosește `mistral-small-latest` pentru a analiza conținutul surselor și a propune cele mai relevante generatoare dintre cele 8 disponibile. Interfața afișează progresul în timp real: mai întâi o fază de analiză, apoi generările individuale, cu posibilitate de anulare.

Cel mult 3 generări de lungă durată rulează simultan într-o filă (etapele tuturor operațiunilor Auto, generările lansate individual, fișele de reamintire): următoarele își așteaptă rândul, iar un curs se deschide fără a aștepta încheierea generărilor în desfășurare. „Anulează tot” oprește și etapele Auto ale cursului aflate încă în așteptare, chiar și după trecerea printr-un alt curs, cu un singur mesaj.

### Învățare adaptivă

- **Statistici de quiz**: monitorizarea încercărilor și a preciziei pentru fiecare întrebare
- **Recapitulare prin quiz**: generează 5-10 întrebări noi care vizează conceptele insuficient stăpânite, pe baza surselor quizului inițial (controlul de moderare se aplică acelorași surse)
- **Detectarea instrucțiunilor**: detectează instrucțiunile de recapitulare („Știu lecția dacă știu să...”) și le acordă prioritate în generatoarele de text compatibile (fișă, flashcards, quiz, texte lacunare). Când moderarea este activă, detectarea așteaptă verificarea surselor și le citește doar pe cele considerate sigure; instrucțiunea păstrează lista surselor sale inițiale: dacă una dintre ele este semnalată, instrucțiunea nu este nici afișată, nici aplicată, iar dacă una dintre ele este ștearsă, instrucțiunea este eliminată. Costul său este contabilizat
### Siguranță și control parental

- **4 grupe de vârstă**: copil (≤10 ani), adolescent (11-15), student (16-25), adult (26+)
- **Moderarea conținutului**: `mistral-moderation-2603` (Mistral Moderation 2) cu 11 categorii disponibile, 6 blocate implicit pentru profilurile noi de copil/adolescent (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` adăugată după o evaluare pe 50 de lecții, inclusiv de istorie, fără niciun rezultat fals pozitiv). Categoriile pot fi personalizate pentru fiecare profil din setări; Moderation 2 a împărțit vechea categorie „conținut periculos” în `dangerous` + `criminal` (profilurile existente sunt migrate automat, iar categoriile blocate se aplică și surselor deja importate). Siguranță implicită: dacă răspunsul modelului nu permite verificarea unei categorii blocate, conținutul este refuzat („Moderare indisponibilă”); cu moderarea activă, atât generarea, cât și chatul exclud sursele semnalate, pe cele a căror verificare a eșuat și pe cele în curs de verificare. O sursă care nu a fost niciodată verificată (importată când moderarea era dezactivată sau dintr-un proiect vechi asociat unui profil) este verificată înainte de utilizare. O moderare întreruptă de o repornire este reluată la pornire dacă cheia serverului permite acest lucru; în caz contrar, la fel ca o moderare care a eșuat, este reluată la deschiderea proiectului sau la următoarea generare. Un buton „Verifică din nou” reia verificarea la cerere. Cu moderarea activă, până când o sursă este considerată sigură, conținutul său este ascuns copilului (previzualizare, text, document original); un părinte îl poate afișa folosind PIN-ul său, pentru o singură consultare. Răspunsul oral la quizul vocal este moderat înainte de a fi verificat. ID-ul datat este fixat în `helpers/moderation-model.ts`: aliasul `-latest`, depreciat, nu mai este listat de API.
- **PIN parental**: hash SHA-256, obligatoriu pentru profilurile sub 15 ani; cel mult 10 coduri greșite într-un sfert de oră pentru fiecare adresă IP (429 `rate_limited`). Pentru o implementare în producție, se recomandă un hash lent cu salt (Argon2id, bcrypt).
- **Datele serverului**: `/output` publică doar fișierele media ale proiectelor (audio, imagini, fișiere importate); `profiles.json`, `config.json`, `projects.json` și `project.json` nu sunt niciodată servite
- **Restricțiile chatului**: chatul AI este dezactivat implicit pentru cei sub 16 ani și poate fi activat de părinți

### Sistem cu profiluri multiple

- Profiluri multiple cu nume, vârstă, avatar, preferințe de limbă
- **Voci pentru fiecare profil** (`Profile.mistralVoices?: { host?, guest? }` — fiecare rol este opțional) — fiecare copil poate avea propria pereche de voci pentru podcast/quiz vocal
- **Temă pentru fiecare profil** (`Profile.theme: 'dark' | 'light'`) — schimbare automată la trecerea la alt profil, salvată în backend
- Proiecte asociate profilurilor prin `profileId`; un proiect vechi fără profil este asociat primului profil care îl deschide, apoi moderat conform acelui profil
- Ștergere în cascadă: ștergerea unui profil șterge toate proiectele sale

### Urmărirea costurilor API

Fiecare apel Mistral facturabil (chat, OCR, STT, TTS, agenți), inclusiv detectarea instrucțiunilor și răspunsurile orale la quizul vocal, este instrumentat pentru a oferi utilizatorului o estimare **transparentă** în €. Moderarea, gratuită, nu este contabilizată. Taxele pentru instrumentele agenților sunt incluse: 0,03 $ pentru fiecare căutare web și 0,10 $ pentru fiecare imagine generată (tarife Mistral), plus tokenii produși de aceste instrumente, pe care estimarea îi contabilizează la tariful de intrare al modelului agentului.

- **Sursa de referință**: `helpers/pricing.ts` — `MODEL_PRICING` după prefixul modelului (ex.: `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` cu URL-uri ale documentației Mistral pentru re-scraping periodic
- **Unități acceptate**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie controlată de `helpers/cost-calc.ts`
- **Lanțul de instrumentare**: `helpers/tracked-client.ts` (încapsulează clientul Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectare în răspunsul HTTP)
- **UI**: indicator de cost pentru fiecare generare (`src/partials/cost-badge-gen.html`), pentru fiecare sursă (`cost-badge-src.html`), total cumulat în dashboard (`Project.totalCost`)
- **Endpoints**: răspunsurile `/generate/*` și `/sources/*` adaugă obiectului returnat (`Generation` / `Source`) câmpurile `estimatedCost`, `usage` și `costBreakdown`. `POST /generate/route` adaugă un câmp `costDelta: number` pentru costul exclusiv al rutării; `POST /detect-consigne` (`{consigne, costDelta}`) și verificarea unui răspuns oral returnează, de asemenea, propriul `costDelta`. `GET /projects/:pid` returnează proiectul completat cu `totalCost` (sumă calculată din `costLog[]`) + istoricul complet

### TTS (Mistral Voxtral) și voci personalizate

- **Mistral Voxtral TTS**: **Voxtral TTS** (`voxtral-mini-tts-2603`) implicit, **Voxtral TTS 3** (`voxtral-mini-tts-3-0`, versiune preliminară Mistral, voci native în mai multe limbi) opțional în Setări; sinteză vocală 100% Mistral, fără a necesita o cheie suplimentară. Sunt oferite doar vocile acceptate de modelul ales: Voxtral TTS refuză vocile adăugate cu Voxtral 3
- **Voci personalizate**: părinții își pot crea propriile voci prin API-ul Mistral Voices (pornind de la o mostră audio) și le pot atribui rolurilor de gazdă/invitat — podcasturile și quizurile vocale sunt apoi citite cu vocea unui părinte, făcând experiența și mai captivantă pentru copil
- Două roluri vocale configurabile: **gazdă** (narator principal) și **invitat** (a doua voce a podcastului)
- Catalogul complet al vocilor Mistral este disponibil în setări și poate fi filtrat după limbă
- Redarea (fișă, podcast, cuvânt de dictare) se întrerupe când părăsești vizualizarea și se reia de unde s-a oprit
- Înregistrarea audio pentru citirea cu voce tare a flashcardurilor este creată la prima ascultare, apoi păstrată în generarea lor: nu este recreată și nici facturată din nou la fiecare revenire
- Marcajele surselor (`[Source N]`) nu sunt citite cu voce tare

### Internaționalizare

- Interfață disponibilă în 9 limbi: fr, en, es, pt, it, nl, de, hi, ar
- Prompturile AI acceptă 15 limbi (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Limbă configurabilă pentru fiecare profil

---

## Stack tehnic

| Strat | Tehnologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server și siguranța tipurilor |
| **Backend** | Express 5.x | API REST |
| **Server de dezvoltare** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfață reactivă, TypeScript compilat de Vite |
| **Templating** | vite-plugin-handlebars | Compunere HTML prin partials |
| **AI** | Mistral AI SDK | Chat, OCR, STT, TTS, agenți, moderare |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-2603` (Voxtral TTS 3 opțional), sinteză vocală integrată |
| **Pictograme** | Lucide 1.x | Bibliotecă de pictograme SVG |
| **Scraping web** | Readability + linkedom | Extragerea conținutului principal al paginilor web (tehnologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Browser headless foarte ușor (Zig + V8) pentru paginile JS/SPA — fallback pentru scraping |
| **Markdown** | Marked | Redare Markdown în chat |
| **Încărcarea fișierelor** | Multer 2.x | Gestionarea formularelor multipart |
| **Audio** | ffmpeg-static | Concatenarea segmentelor audio |
| **Teste** | Vitest | Teste unitare — acoperire măsurată de SonarCloud |
| **Persistență** | Fișiere JSON | Stocare fără dependențe |

---

## Referința modelelor

| Model | Utilizare | Motivație |
|---|---|---|
| `mistral-large-latest` | Fișă, flashcarduri, podcast, quiz, texte lacunare, chat, verificarea quizului vocal, agent Image, agent Web Search, detectarea instrucțiunilor | Cele mai bune capacități multilingve și de respectare a instrucțiunilor |
| `mistral-ocr-4-1` (OCR 4.1, implicit) | OCR pentru documente | Text tipărit, tabele, scris de mână ($4 / 1000 pagini) |
| `mistral-ocr-2512` (OCR 3, opțional) | OCR pentru documente | Selectabil în Setări, mai ieftin ($2 / 1000 pagini), citește mai bine scrisul de mână |
| `voxtral-mini-2602` (Voxtral Mini Transcribe 2, implicit) | Recunoaștere vocală (STT) | Introducere vocală și răspunsuri orale la quizul vocal ($0.003 / min) |
| `voxtral-mini-transcribe-3-0` / `voxtral-small-transcribe-3-0` (Transcribe 3, opțional, versiune preliminară) | Recunoaștere vocală (STT) | Selectabile în Setări ($0.0035 / min și $0.004 / min) |
| `voxtral-mini-tts-2603` (Voxtral TTS, implicit) | Sinteză vocală (TTS) | Podcasturi, quiz vocal, dictare, citire cu voce tare ($16 / M caractere) |
| `voxtral-mini-tts-3-0` (Voxtral TTS 3, opțional, versiune preliminară) | Sinteză vocală (TTS) | Selectabil în Setări, voci native în mai multe limbi ($13 / M caractere) |
| `mistral-moderation-2603` | Moderarea conținutului | 6 categorii blocate pentru copii/adolescenți (inclusiv `jailbreaking`) |
| `mistral-small-latest` | Router automat | Analiză rapidă a conținutului pentru decizii de rutare |

Pe telefon, Setările afișează sub fiecare selector eticheta completă a modelului ales (preț, „Recomandat” sau „Versiune preliminară”), pe care meniul închis o trunchia.

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

> **Cheie API introdusă de utilizator**: `MISTRAL_API_KEY` este acum **opțională**. Dacă lipsește, aplicația pornește oricum și invită fiecare utilizator să introducă **propria cheie Mistral** în interfață. Cheia este **stocată în browser** (criptată prin Web Crypto + IndexedDB într-un context securizat) și trimisă cu fiecare cerere — **niciodată salvată pe server**. Ordine de prioritate: cheia profilului > cheia globală din browser > `MISTRAL_API_KEY` (env). Setarea `EUREKAI_REQUIRE_USER_KEY=true` obligă fiecare utilizator să furnizeze propria cheie (cheia din env este folosită doar pentru preîncărcări).

> **HTTPS local (tabletă/LAN)**: `localhost` este deja un context securizat. Pentru acces prin LAN (tabletă), generează un certificat local și activează HTTPS: browserul poate astfel cripta cheia pe care o stochează, iar cheia este criptată în timpul transferului:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variabile de mediu

| Variabilă | Obligatoriu | Valoare implicită | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | opțional | — | Cheie API Mistral (chat, OCR, STT, TTS Voxtral, agenți, moderare). Dacă lipsește, utilizatorul își introduce cheia în aplicație (stocată în browser, niciodată pe server) |
| `EUREKAI_REQUIRE_USER_KEY` | opțional | `false` | `true` → dezactivează fallback-ul la `MISTRAL_API_KEY` pentru cererile AI (fiecare utilizator TREBUIE să furnizeze propria cheie). Util pe o instanță expusă |
| `HTTPS_KEY` / `HTTPS_CERT` | opțional | — | Căile cheii/certificatului TLS (vezi `scripts/gen-cert.sh`) → Express și Vite servesc prin HTTPS (context securizat LAN/tabletă) |
| `PORT` | opțional | `3000` | Portul HTTP al backendului Express |
| `NODE_ENV` | opțional | `development` | Dacă `production` → Express servește frontendul din `dist/` (altfel `public/`) |
| `SONAR_TOKEN` | opțional în CI | — | Folosit doar de workflow-ul GitHub Actions SonarCloud |

### Teste, calitatea codului și contribuții

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooks Git (Husky)**: `pre-commit` execută succesiv `scripts/pre-commit-fast.sh` (conflicte, fișiere mari, shellcheck), `lint-staged`, apoi `npm test`; `pre-push` execută mai întâi o verificare obligatorie `npm audit` (blochează imediat ce o dependență, chiar și tranzitivă, are o vulnerabilitate de nivel `critical`, vezi `scripts/audit-verdict.mjs`), apoi `npm run security`. Fiecare hook blochează commitul/pushul imediat ce una dintre etapele sale eșuează.

**Instrumente externe (opționale pentru pornirea aplicației, indispensabile pentru `pretest` și `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Fără aceste instrumente, `npm test` eșuează la `pretest` (lizard lipsește), iar `npm run security` eșuează (opengrep lipsește). Hookurile Husky blochează atunci commitul/pushul.

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
  stt-models.ts           — Source de vérité sélection transcription (Mini Transcribe 2 défaut / Transcribe 3 option) + normalizeSttModel
  tts-models.ts           — Source de vérité sélection synthèse vocale (Voxtral TTS défaut / TTS 3 option) + compatibilité des voix
  tts-text.ts             — Texte envoyé au TTS : marqueurs de sources et crochets retirés (Voxtral les lit ou avale le mot)
  source-markers.ts       — Regex des marqueurs `[Source N]` des fiches (pastilles côté navigateur, texte lu côté serveur)
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
    view-media.ts         — Pause du son au changement de vue (position gardée)
    profiles.ts           — Logique du sélecteur de profils
    projects.ts           — CRUD des cours
    sources.ts            — Gestionnaires d'upload de sources
    generate.ts           — Déclencheurs de génération (individuel, tout, auto 2 phases)
    auto-runs.ts          — Générations automatiques en cours, par cours (elles continuent quand on change de cours)
    request-slots.ts      — Au plus 3 générations longues en même temps pour l'onglet, file d'attente FIFO
    moderation-gate.ts    — Pré-contrôle de modération des générations (vérifie d'abord les sources en attente)
    effective-moderation.ts — Statut de modération affiché et masquage du contenu des sources
    generations.ts        — Affichage + actions sur les générations
    chat.ts               — Interface de chat
    chat-in-flight.ts     — Messages du chat en attente de réponse, par cours
    config.ts             — Interface de configuration (modèles de chat, d'OCR, de transcription et de TTS, voix)
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

> **Pentru agenții AI care contribuie la cod**: consultați [`CLAUDE.md`](CLAUDE.md) (reguli generale, index) și regulile detaliate din [`.claude/rules/`](.claude/rules/), încărcate la cerere în funcție de fișierele citite sau modificate, pentru contextul arhitectural detaliat, regulile obligatorii (coduri de eroare, cost tracking și prompturi fără cuvinte meta, adică fără calificative ale documentului, cum ar fi tipul său, deoarece modelul ar copia aceste cuvinte în rezultatele sale) și capcanele cunoscute (Lizard CCN, Opengrep, migrarea Codacy/Semgrep).

---

## Referință API

### Configurare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/config` | Configurația curentă |
| `PUT` | `/api/config` | Modificarea configurației (modele, voci, model TTS) |
| `GET` | `/api/config/status` | Starea API-urilor: `mistral` (cheie Mistral definită), `ttsAvailable` (alias pentru `mistral`, Mistral Voxtral este singurul provider TTS) |
| `POST` | `/api/config/reset` | Restabilirea configurației implicite |
| `GET` | `/api/config/voices` | Listarea vocilor Mistral TTS (`?lang=fr` opțional) |
| `GET` | `/api/moderation-categories` | Categoriile de moderare disponibile + valorile implicite după vârstă |
| `POST` | `/api/providers/mistral/validate` | Validarea unei chei Mistral introduse de utilizator — întotdeauna 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), fără fallback la env |

### Profiluri
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/profiles` | Listarea tuturor profilurilor |
| `POST` | `/api/profiles` | Crearea unui profil |
| `PUT` | `/api/profiles/:id` | Modificarea unui profil (PIN obligatoriu pentru < 15 ani; 10 PIN-uri greșite / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Ștergerea unui profil + ștergerea în cascadă a proiectelor `{pin?}` → `{ok, deletedProjects}` |

### Proiecte
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects` | Listarea proiectelor (`?profileId=` opțional) |
| `POST` | `/api/projects` | Crearea unui proiect `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detaliile proiectului; `?profileId=` asociază un proiect fără profil cu profilul care îl deschide |
| `PUT` | `/api/projects/:pid` | Redenumire `{name}` |
| `DELETE` | `/api/projects/:pid` | Ștergerea proiectului |
| `GET` | `/api/projects/:pid/events` | Flux SSE în timp real (`event: generation`) al tranzițiilor de generare (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Surse
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import de fișiere multipart (OCR pentru JPG/PNG/PDF, citire directă pentru TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Text liber `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL sau căutare web `{query}` — returnează un array de surse; 422 `url_blocked` dacă toate adresele sunt refuzate (rețea internă), 502 `all_sources_failed` dacă nu a putut fi creată nicio sursă |
| `POST` | `/api/projects/:pid/sources/moderate` | Reluarea moderărilor în așteptare sau eșuate `{sourceIds?}` (cel mult 10 per apel, așteptare ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ștergerea unei surse, a fișierului său importat și a instrucțiunii care depinde de ea → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderare `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectarea instrucțiunilor de recapitulare (doar surse verificate) → `{consigne, costDelta}` |
### Generare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fișă de recapitulare |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz cu variante multiple de răspuns (4 variante, un singur răspuns corect) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Texte lacunare |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictare (cuvinte + propoziții exemplificative + reguli, 1 audio TTS per cuvânt; propusă și de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustrație |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Recapitulare adaptivă `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Fișă de reamintire axată pe întrebările cu răspuns greșit dintr-un quiz `{generationId, weakQuestions}` — apelată în paralel cu `quiz-review` prin butonul de remediere din vizualizarea quizului |
| `POST` | `/api/projects/:pid/generate/route` | Analiză de rutare (planul generatoarelor de lansat) — returnează `{plan, costDelta}` (doar costul rutării) |
| `POST` | `/api/projects/:pid/generate/auto` | Generare automată în backend (rutare + 8 tipuri: `summary`, `flashcards`, `quiz`, `fill-blank`, `podcast`, `quiz-vocal`, `image`, `dictation`). Execuție în paralel — presupune un tier Mistral cu rate-limit ≥ 8 cereri simultane; în caz contrar, pot apărea mai multe erori 429 în `failedSteps`. |

Toate rutele de generare acceptă `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; un `ageGroup` necunoscut sau un `lang` care nu este un cod de limbă valid (așteptat: `fr`, `pt-BR`…) → 400 `invalid_input`, înainte de orice apel AI. `quiz-review` și `remediation-summary` necesită în plus `{generationId, weakQuestions}` și vizează sursele quizului inițial.

### CRUD Generări
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Trimite răspunsurile la quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Trimite răspunsurile la textele lacunare `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Trimite răspunsurile la dictare `{answers}` (punctaj strict calculat pe server) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verifică un răspuns oral (audio + questionIndex); răspunsul oral este moderat înainte de verificare (refuz: 400 `quiz.answerBlocked`), costul este returnat în `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Citire TTS cu voce tare (fișe/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Anulează o generare în curs (singura modalitate de anulare a unui pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Redenumește `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Șterge generarea și fișierele media asociate (audio, imagine) |

### Chat
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Obține istoricul chatului |
| `POST` | `/api/projects/:pid/chat` | Trimite un mesaj `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Șterge istoricul chatului |

---

## Decizii arhitecturale

| Decizie | Justificare |
|---|---|
| **Alpine.js în loc de React/Vue** | Amprentă minimă, reactivitate ușoară cu TypeScript compilat prin Vite. Perfect pentru un hackathon unde viteza contează. |
| **Persistență în fișiere JSON** | Zero dependențe, pornire instantanee. Nicio bază de date de configurat — pornești și începi imediat. |
| **Vite + Handlebars** | Avantajele ambelor soluții: HMR rapid pentru dezvoltare, partials HTML pentru organizarea codului, Tailwind JIT. |
| **Prompturi centralizate** | Toate prompturile AI în `prompts.ts` — ușor de îmbunătățit iterativ, testat și adaptat în funcție de limbă/grupa de vârstă. |
| **Sistem cu generări multiple** | Fiecare generare este un obiect independent cu propriul ID — permite mai multe fișe, quizuri etc. pentru fiecare curs. |
| **Prompturi adaptate vârstei** | 4 grupe de vârstă cu vocabular, complexitate și ton diferite — același conținut este predat diferit în funcție de cursant. |
| **Funcționalități bazate pe Agents** | Generarea de imagini și căutarea web folosesc Agents Mistral temporari — ciclu de viață bine gestionat, cu curățare automată. |
| **Scraping inteligent de URL-uri** | Un singur câmp acceptă URL-uri și cuvinte-cheie amestecate — conținutul URL-urilor este extras prin Readability (pagini statice), cu fallback Lightpanda (pagini JS/SPA), iar cuvintele-cheie declanșează un Agent Mistral web_search. Fiecare rezultat creează o sursă independentă. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (fără cheie suplimentară în afară de `MISTRAL_API_KEY`) — sinteză vocală integrată în lanțul de calcul al costurilor și în selectarea vocii în funcție de limbă. |

---

## Credite și mulțumiri

- **[Mistral AI](https://mistral.ai)** — Modele AI (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reactiv ușor
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitar
- **[Vite](https://vitejs.dev)** — Instrument de build frontend
- **[Lucide](https://lucide.dev)** — Bibliotecă de pictograme
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extragere de conținut web (tehnologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Browser headless foarte ușor pentru scrapingul paginilor JS/SPA
- **[Luciole](https://luciole-vision.com)** — Font conceput pentru cititorii cu deficiențe de vedere, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opțiunea „Confort la citire” din profiluri)

Inițiat în timpul Mistral AI Worldwide Hackathon (martie 2026), dezvoltat integral cu AI folosind [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licență

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Articol tradus din fr în ro cu gpt-6.1-sol.**
