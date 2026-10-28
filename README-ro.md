<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformă orice conținut într-o experiență interactivă de învățare — propulsat de <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

**EurekAI** s-a născut în timpul [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site-ul oficial](https://worldwide-hackathon.mistral.ai/)) (martie 2026). Aveam nevoie de o temă — iar ideea a venit dintr-un lucru foarte concret: pregătesc în mod regulat testele cu fiica mea și m-am gândit că ar trebui să fie posibil să facem acest proces mai distractiv și interactiv cu ajutorul AI-ului.

Obiectivul: preluarea **oricărui tip de conținut de intrare** — o fotografie a lecției, un text copiat și lipit, o înregistrare vocală, o căutare pe web — și transformarea acestuia în **fișe de recapitulare, flashcarduri, quizuri, podcasturi, texte lacunare, ilustrații și multe altele**. Totul propulsat de modelele Mistral AI, o companie franceză, ceea ce face din EurekAI o soluție adaptată în mod natural elevilor francofoni.

[Prototipul inițial](https://github.com/jls42/worldwide-hackathon.mistral.ai) a fost conceput în 48 de ore în timpul hackathonului ca o dovadă de concept (proof of concept) construită pe serviciile Mistral — deja funcțional, dar limitat. De atunci, EurekAI a devenit un proiect în toată regula: texte lacunare, navigare printre exerciții, web scraping, moderare parentală configurabilă, revizuire aprofundată a codului și multe altele. Întregul cod este generat de AI — în principal [Claude Code](https://code.claude.com/), cu câteva contribuții prin [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Prezentare generală

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Tur ghidat al EurekAI: surse, fișă, quiz, flashcarduri, ilustrații" width="820" />
</p>

| | |
|---|---|
| ![Panou de control](docs/screenshots/dashboard.webp)<br>**Panou de control** — generări recente, cost estimat per card și total pe proiect, buton „Auto — Magie!” | ![Surse](docs/screenshots/sources.webp)<br>**Surse** — import foto/PDF/text/voce/web, generare cu un singur clic, detectare a cerințelor |

Fiecare sursă importată afișează [scorul său de încredere OCR, moderarea și costul estimat](docs/screenshots/sources-list.webp).

### Componentele în acțiune

| | |
|---|---|
| ![Fișă de recapitulare](docs/screenshots/notes.gif)<br>**Fișă de recapitulare** — puncte-cheie, vocabular, citate cu sursă, redare audio pe secțiuni | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz cu variante multiple** — un singur răspuns corect per întrebare, feedback imediat cu explicație, navigare pas cu pas |
| ![Flashcarduri](docs/screenshots/flashcards.gif)<br>**Flashcarduri** — card de întors și autoevaluare „știam / nu știam” | ![Texte lacunare](docs/screenshots/fillblank.gif)<br>**Texte lacunare** — indiciu la cerere, validare tolerantă |
| ![Dictare](docs/screenshots/dictation.gif)<br>**Dictare** — cuvânt dictat audio, corectare strictă literă cu literă | ![Quiz vocal](docs/screenshots/vocal-quiz.gif)<br>**Quiz vocal** — întrebare citită cu voce tare, răspuns la microfon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast cu 2 voci, scenariu de dialog consultabil | ![Ilustrații](docs/screenshots/illustrations.gif)<br>**Ilustrații** — imagini educative generate de Agent |
| ![Tutor AI](docs/screenshots/chat.gif)<br>**Tutor AI** — chat ancorat în documentele cursului, răspunsuri explicate, poate genera quizuri și flashcarduri | |

### Primii pași

| | |
|---|---|
| ![Alegerea profilului](docs/screenshots/login.gif)<br>**Alegerea profilului** — fiecare copil are spațiul său, avatarul și limba sa | ![Crearea profilului](docs/screenshots/profile-create.gif)<br>**Crearea profilului** — vârstă, avatar, PIN parental pentru copiii sub 15 ani |
| ![Crearea cursului](docs/screenshots/course.gif)<br>**Crearea cursului** — un proiect per lecție, gata să primească surse | ![Setări](docs/screenshots/settings.gif)<br>**Setări** — stare API, alegerea modelelor AI cu prețuri afișate |

---

## Funcționalități

| | Funcționalitate | Descriere |
|---|---|---|
| 📷 | **Import de fișiere** | Importați lecțiile — foto, PDF (prin Mistral OCR cu scor mediu de încredere, niveluri `high`/`medium`/`low`) sau fișiere text (TXT, MD). Sesiuni de încărcare cu reîncercare per fișier și progres individual |
| 📝 | **Introducere text** | Introduceți sau lipiți orice text direct |
| 🎤 | **Intrare vocală** | Înregistrați-vă — Voxtral STT vă transcrie vocea |
| 🌐 | **Web / URL** | Lipiți un URL (scraping direct prin Readability + Lightpanda) sau tastați o căutare (Agent Mistral web_search) |
| 📄 | **Fișe de recapitulare** | Notițe structurate cu puncte-cheie, vocabular, citate, anecdote |
| 🃏 | **Flashcarduri** | Carduri Q&A interactive, redare audio sub formă de dialog |
| ❓ | **Quiz cu variante multiple** | Întrebări cu 4 variante și un singur răspuns corect, cu recapitulare adaptivă a greșelilor (număr configurabil) |
| ✏️ | **Texte lacunare** | Exerciții de completat cu indicii și validare tolerantă |
| 🔤 | **Dictare** | Cuvinte dictate audio (Voxtral TTS) dintr-o listă importată, tastare, corectare strictă literă cu literă cu regula de ortografie explicată |
| 🎙️ | **Podcast** | Mini-podcast audio cu 2 voci — voci implicite Mistral sau voci personalizate (părinți!) |
| 🖼️ | **Ilustrații** | Imagini educative generate de un Agent Mistral |
| 🗣️ | **Quiz vocal** | Întrebări citite cu voce tare (voce personalizată posibilă), răspuns oral, verificare AI |
| 💬 | **Tutor AI** | Chat contextual cu documentele de curs, cu apelare de instrumente |
| 🧠 | **Ruter automat** | Un ruter bazat pe `mistral-small-latest` analizează conținutul și propune o combinație de generatoare dintre cele 8 tipuri disponibile |
| 🔁 | **Continuitate între cursuri** | Importurile, generările automate, înregistrarea la microfon, chatul, căutarea pe web și citirea cu voce tare continuă pentru cursul lor atunci când deschideți un altul; o notificare specifică numele cursului când procesul se încheie în altă parte |
| 🔒 | **Control parental** | Moderare configurabilă per profil (categorii personalizabile), PIN parental, restricții de chat |
| 🌍 | **Multilingv** | Interfață disponibilă în 9 limbi; generare AI controlabilă în 15 limbi prin intermediul prompturilor |
| 🔊 | **Citire cu voce tare** | Ascultați fișele și flashcardurile (dialog întrebare/răspuns) prin Mistral Voxtral TTS |
| 💶 | **Urmărirea costurilor API** | Estimare transparentă a costului în € pentru fiecare generare și sursă (tokeni / caractere / pagini / secunde audio). Ecuson per card + total per proiect, vizibil în panoul de control |
| 🎨 | **Temă per profil** | Fiecare profil își alege tema `dark` sau `light` — memorată cu profilul și reaplicată la fiecare schimbare de profil |

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

EurekAI acceptă 4 tipuri de surse, moderate în funcție de profil (moderare activată implicit pentru profilurile de copil și adolescent):

- **Import de fișiere** — Fișiere JPG, PNG sau PDF procesate prin Mistral OCR — **OCR 4.1** (`mistral-ocr-4-1`) implicit, **OCR 3** (`mistral-ocr-2512`) opțional în Setări (mai ieftin, ~½ din cost; citește mai bine scrisul de mână) — pentru text tipărit, tabele și scris de mână; sau fișiere text (TXT, MD) importate direct. Încărcările de fișiere multiple folosesc un sistem de **sesiuni de încărcare**: progres individual per fișier, reîncercare a fișierului eșuat fără retrimiterea celorlalte, închiderea sesiunii la finalizare. OCR-ul expune un **scor de încredere** mediu (`average`, limitat în `[0,1]`, calculat pe baza valorilor `averagePageConfidenceScore` returnate de Mistral), afișat în UI sub formă de ecuson de nivel `high` / `medium` / `low` (praguri ~0,9 / ~0,7) — avertizează fără a bloca dacă scanarea este de slabă calitate. Copia documentului trimisă la Mistral pentru OCR este ștearsă imediat după finalizarea procesării, chiar și în caz de eșec.
- **Text liber** — Introduceți sau lipiți orice conținut. Moderat înainte de stocare dacă moderarea este activă.
- **Intrare vocală** — Înregistrați conținut audio în browser. Transcris de **Voxtral Mini Transcribe 2** (`voxtral-mini-2602`) în mod implicit; **Voxtral Mini Transcribe 3** și **Voxtral Small Transcribe 3** (versiune preliminară Mistral) opționale în Setări. Limba interfeței este transmisă modelului (`language`) pentru a optimiza recunoașterea.
- **Web / URL** — Lipiți unul sau mai multe URL-uri pentru a extrage direct conținutul (Readability + Lightpanda pentru paginile JS), sau tastați cuvinte-cheie pentru o căutare web printr-un Agent Mistral. Câmpul unic le acceptă pe ambele — URL-urile și cuvintele-cheie sunt separate automat, fiecare rezultat creând o sursă independentă.

### Generare de conținut AI

Opt tipuri de materiale de învățare generate:

| Generator | Model | Rezultat |
|---|---|---|
| **Fișă de recapitulare** | `mistral-large-latest` | Titlu, rezumat, puncte-cheie, vocabular, citate, anecdotă |
| **Flashcarduri** | `mistral-large-latest` | Carduri Q&A cu referințe la surse (număr configurabil) |
| **Quiz cu variante multiple** | `mistral-large-latest` | Întrebări cu 4 variante și un singur răspuns corect, explicații, recapitulare adaptivă (număr configurabil) |
| **Texte lacunare** | `mistral-large-latest` | Propoziții de completat cu indicii, validare tolerantă (Levenshtein) |
| **Dictare** | `mistral-large-latest` + Voxtral TTS | Cuvinte-cheie dictate audio (1 MP3/cuvânt) → tastare → corectare strictă (un accent omis contează ca greșeală) cu regula explicată |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Scenariu cu 2 voci → audio MP3 |
| **Ilustrație** | Agent `mistral-large-latest` | Imagine educativă prin instrumentul `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Întrebări TTS → răspuns STT → verificare AI |

### Tutor AI prin chat

Un tutor conversațional cu acces complet la documentele de curs:

- Folosește `mistral-large-latest`
- **Apelare de instrumente**: poate genera fișe, flashcarduri, quizuri sau texte lacunare în timpul conversației
- Istoric de 50 de mesaje per curs
- Moderare dacă este activată pentru profil: mesajul este verificat, iar sursele semnalate, cele a căror verificare a eșuat și cele neverificate încă sunt excluse din context și din instrumente (verificarea surselor eșuate sau neverificate încă este mai întâi reluată, maximum 5 secunde)

### Ruter automat

Ruterul folosește `mistral-small-latest` pentru a analiza conținutul surselor și a propune generatoarele cele mai relevante dintre cele 8 disponibile. Interfața afișează progresul în timp real: mai întâi o fază de analiză, apoi generările individuale, cu posibilitatea de anulare.

Funcția Auto rulează pe server: continuă dacă pagina este reîncărcată, dacă se deschide un alt curs sau dacă se schimbă profilul, iar o singură sesiune Auto rulează la un moment dat per curs (o a doua filă se alătură celei în desfășurare). Serverul lansează cel mult 3 generări simultane per cheie Mistral. Fiecare generare finalizată are propriul mesaj, apoi un rezumat final este afișat o singură dată; dacă se finalizează în timp ce este afișat un alt curs, mesajul menționează numele cursului său. O generare anulată individual nu este considerată eșec în rezumat. „Anulează tot” oprește întregul lot al cursului, cu un singur mesaj. Dacă serverul repornește în timpul unui Auto, acesta este marcat ca întrerupt, cu un buton „Reia” care relansează doar generările nefinalizate, fără a repeta analiza.

Cel mult 3 generări de lungă durată lansate din filă rulează simultan (generări lansate una câte una, fișe de recapitulare): următoarele își așteaptă rândul, iar un curs se deschide fără a aștepta finalizarea generărilor în curs.

### Învățare adaptivă

- **Statistici de quiz**: urmărirea încercărilor și a preciziei per întrebare
- **Recapitulare a quizului**: generează 5-10 întrebări noi care vizează conceptele slab înțelese, pe baza surselor din quizul inițial (protecția de moderare se aplică acelorași surse)
- **Detectarea cerințelor**: detectează instrucțiunile de recapitulare („Îmi știu lecția dacă știu...”) și le acordă prioritate în generatoarele de text compatibile (fișă, flashcarduri, quiz, texte lacunare). Când moderarea este activă, detectarea așteaptă verificarea surselor și le citește doar pe cele considerate sigure; cerința păstrează lista surselor sale de origine: dacă una dintre ele devine semnalată, cerința nu mai este afișată și nici aplicată, iar dacă una dintre ele este ștearsă, cerința este eliminată. Costul acesteia este contorizat

### Securitate și control parental

- **4 grupe de vârstă**: copil (≤10 ani), adolescent (11-15), student (16-25), adult (26+)
- **Moderarea conținutului**: `mistral-moderation-2603` (Mistral Moderation 2) cu 11 categorii disponibile, 6 blocate în mod implicit pentru noile profiluri de copil/adolescent (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` adăugat după o evaluare pe 50 de lecții, inclusiv istorie, fără niciun rezultat fals pozitiv). Categorii personalizabile per profil în setări; Moderation 2 a împărțit fosta categorie „conținut periculos” în `dangerous` + `criminal` (profilurile existente sunt migrate automat, iar categoriile blocate se aplică și surselor deja importate). Siguranță implicită: dacă răspunsul modelului nu permite verificarea unei categorii blocate, conținutul este refuzat („Moderare indisponibilă”); cu moderarea activă, atât generarea, cât și chatul exclud sursele semnalate, pe cele a căror verificare a eșuat și pe cele în curs de verificare. O sursă neverificată vreodată (importată când moderarea era dezactivată sau un proiect vechi asociat unui profil) este verificată înainte de utilizare. O moderare întreruptă de o repornire este reluată la pornire dacă cheia serverului permite acest lucru; în caz contrar, la fel ca o moderare eșuată, este reluată la deschiderea proiectului sau la următoarea generare. Un buton „Reverifică” relansează verificarea la cerere. Cu moderarea activă, atâta timp cât o sursă nu este considerată sigură, conținutul acesteia este ascuns copilului (previzualizare, text, document original); un părinte îl poate afișa cu codul său PIN, pentru o singură consultare. Răspunsul oral la quizul vocal este moderat înainte de a fi verificat. Id datat fixat în `helpers/moderation-model.ts`: aliasul `-latest`, perimat, nu mai este listat de API.
- **PIN parental**: hash SHA-256, obligatoriu pentru profilurile sub 15 ani; cel mult 10 coduri greșite pe sfert de oră și per adresă IP (429 `rate_limited`). Pentru o implementare în producție, se recomandă un hash lent cu salt (Argon2id, bcrypt).
- **Datele serverului**: `/output` publică doar fișierele media ale proiectelor (audio, imagini, fișiere importate); `profiles.json`, `config.json`, `projects.json` și `project.json` nu sunt niciodată servite
- **Restricții de chat**: chat AI dezactivat în mod implicit pentru cei sub 16 ani, poate fi activat de părinți

### Sistem multi-profil

- Profiluri multiple cu nume, vârstă, avatar, preferințe de limbă
- **Voce per profil** (`Profile.mistralVoices?: { host?, guest? }` — fiecare rol este opțional) — fiecare copil poate avea propria pereche de voci pentru podcast/quiz vocal
- **Temă per profil** (`Profile.theme: 'dark' | 'light'`) — comutare automată la schimbarea profilului, persistată pe backend
- Proiecte asociate profilurilor prin `profileId`; un proiect vechi fără profil este asociat primului profil care îl deschide, apoi moderat conform acelui profil
- Ștergere în cascadă: ștergerea unui profil șterge toate proiectele acestuia

### Monitorizarea costurilor API

Fiecare apel Mistral facturabil (chat, OCR, STT, TTS, agenți), inclusiv detectarea instrucțiunilor și răspunsurile orale la quizul vocal, este instrumentat pentru a oferi o estimare în € **transparentă** utilizatorului. Moderarea, fiind gratuită, nu este contorizată. Costurile instrumentelor pentru agenți sunt incluse: 0,03 $ per căutare web și 0,10 $ per imagine generată (tarife Mistral), plus tokenurile produse de aceste instrumente, pe care estimarea le calculează la tariful de intrare al modelului agentului.

- **Sursă de referință**: `helpers/pricing.ts` — `MODEL_PRICING` per prefix de model (ex.: `mistral-large` → input 0.5 €/M tokenuri, output 1.5 €/M tokenuri), `PRICING_SOURCES` cu URL-uri către documentația Mistral pentru re-scraping periodic
- **Unități acceptate**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie gestionată de `helpers/cost-calc.ts`
- **Lanț de instrumentare**: `helpers/tracked-client.ts` (împachetează clientul Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectare în răspunsul HTTP)
- **UI**: etichetă de cost per generare (`src/partials/cost-badge-gen.html`), per sursă (`cost-badge-src.html`), total cumulat în dashboard (`Project.totalCost`)
- **Endpoint-uri**: răspunsurile `/generate/*` și `/sources/*` decorează obiectul returnat (`Generation` / `Source`) cu `estimatedCost`, `usage` și `costBreakdown`. `POST /generate/route` adaugă un câmp `costDelta: number` doar pentru costul rutării; `POST /detect-consigne` (`{consigne, costDelta}`) și verificarea unui răspuns oral returnează, de asemenea, propriul `costDelta`. `GET /projects/:pid` returnează proiectul îmbogățit cu `totalCost` (sumă calculată din `costLog[]`) + istoricul complet

### TTS (Mistral Voxtral) & voci personalizate

- **Mistral Voxtral TTS**: **Voxtral TTS** (`voxtral-mini-tts-2603`) în mod implicit, **Voxtral TTS 3** (`voxtral-mini-tts-3-0`, versiune preliminară Mistral, voci native în mai multe limbi) opțional în Setări; sinteză vocală 100% Mistral, nu este necesară nicio cheie suplimentară. Sunt propuse doar vocile pe care modelul selectat le acceptă: Voxtral TTS refuză vocile adăugate cu Voxtral 3
- **Voci personalizate**: părinții își pot crea propriile voci prin API-ul Mistral Voices (pe baza unui eșantion audio) și le pot atribui rolurilor de gazdă/invitat — podcasturile și quizurile vocale sunt apoi redate cu vocea unui părinte, făcând experiența și mai captivantă pentru copil
- Două roluri vocale configurabile: **gazdă** (narator principal) și **invitat** (a doua voce a podcastului)
- Catalogul complet al vocilor Mistral este disponibil în setări, filtrabil după limbă
- O redare (fișă, podcast, cuvânt de dictare) se întrerupe când se părăsește vizualizarea acesteia și se reia de unde a rămas
- Fișierul audio pentru citirea cu voce tare a cartonașelor (flashcards) este creat la prima ascultare, apoi păstrat în generarea acestora: nu este recreat și nici refacturat la fiecare revenire
- Marcatorii de sursă (`[Source N]`) nu sunt citiți cu voce tare

### Internaționalizare

- Interfață disponibilă în 9 limbi: fr, en, es, pt, it, nl, de, hi, ar
- Prompturile AI acceptă 15 limbi (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Limbă configurabilă per profil

---

## Stiva tehnică

| Strat | Tehnologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server și siguranță a tipurilor |
| **Backend** | Express 5.x | API REST |
| **Server de dezvoltare** | Vite 8.x (Rolldown) + tsx | HMR, parțiale Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfață reactivă, TypeScript compilat de Vite |
| **Șabloane (Templating)** | vite-plugin-handlebars | Compoziție HTML prin parțiale |
| **AI** | Mistral AI SDK | Chat, OCR, STT, TTS, Agenți, Moderare |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-2603` (Voxtral TTS 3 opțional), sinteză vocală integrată |
| **Pictograme** | Lucide 1.x | Bibliotecă de pictograme SVG |
| **Web scraping** | Readability + linkedom | Extragerea conținutului principal din pagini web (tehnologia Firefox Reader View) |
| **Browser headless** | Lightpanda | Browser headless ultra-ușor (Zig + V8) pentru pagini JS/SPA — fallback pentru scraping |
| **Markdown** | Marked | Randare markdown în chat |
| **Încărcare fișiere** | Multer 2.x | Gestionarea formularelor multipart |
| **Audio** | ffmpeg-static | Concatenare de segmente audio |
| **Teste** | Vitest | Teste unitare — acoperire măsurată de SonarCloud |
| **Persistență** | Fișiere JSON | Stocare fără dependențe |

---

## Referința modelelor

| Model | Utilizare | De ce |
|---|---|---|
| `mistral-large-latest` | Fișă, Flashcards, Podcast, Quiz, Texte lacunare, Chat, Verificare quiz vocal, Agent Imagine, Agent Web Search, Detectare instrucțiuni | Cel mai bun multilingual + respectare a instrucțiunilor |
| `mistral-ocr-4-1` (OCR 4.1, implicit) | OCR pentru documente | Text tipărit, tabele, scris de mână ($4 / 1000 de pagini) |
| `mistral-ocr-2512` (OCR 3, opțional) | OCR pentru documente | Selectabil în Setări, mai ieftin ($2 / 1000 de pagini), citește mai bine scrisul de mână |
| `voxtral-mini-2602` (Voxtral Mini Transcribe 2, implicit) | Recunoaștere vocală (STT) | Intrare vocală și răspunsuri orale la quizul vocal ($0.003 / min) |
| `voxtral-mini-transcribe-3-0` / `voxtral-small-transcribe-3-0` (Transcribe 3, opțional, versiune preliminară) | Recunoaștere vocală (STT) | Selectabile în Setări ($0.0035 / min și $0.004 / min) |
| `voxtral-mini-tts-2603` (Voxtral TTS, implicit) | Sinteză vocală (TTS) | Podcasturi, quiz vocal, dictare, citire cu voce tare ($16 / M caractere) |
| `voxtral-mini-tts-3-0` (Voxtral TTS 3, opțional, versiune preliminară) | Sinteză vocală (TTS) | Selectabil în Setări, voci native în mai multe limbi ($13 / M caractere) |
| `mistral-moderation-2603` | Moderare de conținut | 6 categorii blocate pentru copil/adolescent (inclusiv `jailbreaking`) |
| `mistral-small-latest` | Ruter automat | Analiză rapidă a conținutului pentru decizii de rutare |

Pe telefon, Setările afișează sub fiecare selector denumirea completă a modelului ales (preț, „Recomandat” sau „Versiune preliminară”), pe care meniul închis o trunchia.

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

> **Cheie API introdusă de utilizator**: `MISTRAL_API_KEY` este acum **opțională**. Dacă lipsește, aplicația pornește oricum și invită fiecare utilizator să introducă **propria cheie Mistral** în interfață. Cheia este **stocată în browser** (criptată prin Web Crypto + IndexedDB într-un context securizat) și trimisă la fiecare cerere — **nu este persistată niciodată pe server**. Prioritate: cheia profilului > cheia globală a browserului > `MISTRAL_API_KEY` (env). Definirea `EUREKAI_REQUIRE_USER_KEY=true` obligă fiecare utilizator să își furnizeze cheia (cheia din env este utilizată doar pentru preîncărcări).

> **HTTPS local (tabletă/LAN)**: `localhost` este deja un context securizat. Pentru acces LAN (tabletă), generează un certificat local și activează HTTPS: browserul poate atunci cripta cheia pe care o stochează, iar cheia este criptată în timpul tranzitului:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variabile de mediu

| Variabilă | Necesar | Implicit | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | opțional | — | Cheie API Mistral (chat, OCR, STT, TTS Voxtral, agenți, moderare). Dacă lipsește, utilizatorul introduce cheia în aplicație (stocată în browser, niciodată pe server) |
| `EUREKAI_REQUIRE_USER_KEY` | opțional | `false` | `true` → dezactivează fallback-ul pe `MISTRAL_API_KEY` pentru cererile AI (fiecare utilizator TREBUIE să își furnizeze cheia). Util pe o instanță expusă |
| `HTTPS_KEY` / `HTTPS_CERT` | opțional | — | Căi cheie/certificat TLS (vezi `scripts/gen-cert.sh`) → Express și Vite servesc prin HTTPS (context securizat LAN/tabletă) |
| `PORT` | opțional | `3000` | Port HTTP pentru backend-ul Express |
| `NODE_ENV` | opțional | `development` | Dacă `production` → Express servește frontend-ul din `dist/` (altfel `public/`) |
| `SONAR_TOKEN` | opțional CI | — | Utilizat exclusiv de fluxul de lucru GitHub Actions SonarCloud |

### Teste, calitatea codului și contribuție

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hook-uri Git (Husky)**: `pre-commit` înlănțuie `scripts/pre-commit-fast.sh` (conflicte, fișiere mari, shellcheck), `lint-staged` apoi `npm test`; `pre-push` execută mai întâi o verificare blocantă `npm audit` (blochează de îndată ce o dependență, chiar și tranzitivă, are o vulnerabilitate de nivel `critical`, conform `scripts/audit-verdict.mjs`), apoi `npm run security`. Fiecare hook blochează comiterea/push-ul de îndată ce una dintre etapele sale eșuează.

**Instrumente externe (opționale pentru lansarea aplicației, indispensabile pentru `pretest` și `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Fără aceste instrumente, `npm test` eșuează la `pretest` (lizard lipsește) și `npm run security` eșuează (opengrep lipsește). Hook-urile husky blochează atunci comiterea/push-ul.

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
  generate.ts             — Endpoints de génération (8 types + route)
  auto-runs.ts            — Lots Auto côté serveur : lancement, analyse et étapes en arrière-plan, état, annulation
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
  keyed-slots.ts          — Places par clé (au plus 3 étapes d'Auto en même temps par clé Mistral)
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
  event-bus.ts            — Bus d'événements de génération et de lots Auto en mémoire (dispatch SSE, filet anti-uncaughtException)
  auto-run-state.ts       — Transitions d'un lot Auto (fonctions pures, appliquées par le store)
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
    generate.ts           — Déclencheurs de génération (individuel, tout, Auto)
    auto-launch.ts        — Lancement d'un Auto côté serveur, suivi pendant qu'un autre cours est affiché, annulation
    auto-runs.ts          — Auto suivis par l'onglet : état reçu du serveur, bilan affiché une seule fois, coût de l'analyse
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

> **Pentru agenții AI care contribuie la cod**: consultați [`CLAUDE.md`](CLAUDE.md) (reguli transversale, index) și regulile detaliate din [`.claude/rules/`](.claude/rules/), încărcate la cerere în funcție de fișierele citite sau modificate, pentru contextul arhitectural detaliat, regulile obligatorii (coduri de eroare, urmărirea costurilor și prompturi fără cuvinte meta, adică fără calificative ale documentului cum ar fi tipul acestuia, deoarece modelul ar reproduce aceste cuvinte în răspunsurile generate) și capcanele cunoscute (Lizard CCN, Opengrep, migrarea Codacy/Semgrep).

---

## Referință API

### Config
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/config` | Configurația curentă |
| `PUT` | `/api/config` | Modifică configurația (modele, voci, model TTS) |
| `GET` | `/api/config/status` | Starea API-urilor: `mistral` (cheie Mistral definită), `ttsAvailable` (alias pentru `mistral`, Mistral Voxtral este singurul furnizor TTS) |
| `POST` | `/api/config/reset` | Resetează configurația la valorile implicite |
| `GET` | `/api/config/voices` | Listează vocile Mistral TTS (`?lang=fr` opțional) |
| `GET` | `/api/moderation-categories` | Categorii de moderare disponibile + valori implicite în funcție de vârstă |
| `POST` | `/api/providers/mistral/validate` | Validează o cheie Mistral introdusă de utilizator — întotdeauna 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), fără fallback env |

### Profiluri
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/profiles` | Listează toate profilurile |
| `POST` | `/api/profiles` | Creează un profil |
| `PUT` | `/api/profiles/:id` | Modifică un profil (PIN necesar pentru < 15 ani; 10 PIN-uri greșite / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Șterge un profil + cascadă proiecte `{pin?}` → `{ok, deletedProjects}` |

### Proiecte
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects` | Listează proiectele (`?profileId=` opțional) |
| `POST` | `/api/projects` | Creează un proiect `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detalii despre proiect; `?profileId=` asociază un proiect fără profil profilului care îl deschide |
| `PUT` | `/api/projects/:pid` | Redenumește `{name}` |
| `DELETE` | `/api/projects/:pid` | Șterge proiectul |
| `GET` | `/api/projects/:pid/events` | Flux SSE în timp real (`event: generation`) al tranzițiilor de generare (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Surse
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import fișiere multipart (OCR pentru JPG/PNG/PDF, citire directă pentru TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Text liber `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL sau căutare web `{query}` — returnează un tablou de surse; 422 `url_blocked` dacă toate adresele sunt refuzate (rețea internă), 502 `all_sources_failed` dacă nicio sursă nu a putut fi creată |
| `POST` | `/api/projects/:pid/sources/moderate` | Reia moderările în așteptare sau eșuate `{sourceIds?}` (cel mult 10 per apel, așteptare ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Șterge o sursă, fișierul său importat și cerința dependentă de aceasta → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderează `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectează instrucțiunile de recapitulare (doar surse verificate) → `{consigne, costDelta}` |

### Generare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fișă de recapitulare |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcarduri |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz cu variante multiple (4 opțiuni, un singur răspuns corect) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Texte lacunare |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictare (cuvinte + propoziții-exemplu + reguli, 1 fișier audio TTS per cuvânt; propusă și de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustrație |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Recapitulare adaptivă `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Fișă de recapitulare țintită pe întrebările greșite dintr-un quiz `{generationId, weakQuestions}` — apelată în paralel cu `quiz-review` prin butonul de remediere din vizualizarea quiz-ului |
| `POST` | `/api/projects/:pid/generate/route` | Analiză de rutare (planul generatoarelor de lansat) — returnează `{plan, costDelta}` (doar costul rutării) |
| `POST` | `/api/projects/:pid/generate/auto/start` | Lansarea unui lot Auto pe server `{runId, …}`: răspuns 202 imediat, apoi analiză și etape în fundal, cel mult 3 etape simultan per cheie Mistral; lotul continuă dacă pagina este reîncărcată. 409 `auto_busy` dacă un lot rulează deja pentru acest curs |
| `POST` | `/api/projects/:pid/generate/auto/resume` | Reluarea unui lot Auto întrerupt de o repornire a serverului `{runId}`: etapele sale întrerupte repornesc cu cheia acestei cereri, fără a relua analiza (răspuns 202) |
| `GET` | `/api/projects/:pid/auto-runs/:runId` | Starea unui lot Auto: analiză, etape și rezultatul fiecăreia |
| `POST` | `/api/projects/:pid/auto-runs/:runId/cancel` | Anularea unui întreg lot Auto (o etapă individuală se anulează ca o generare) |

Toate rutele de generare acceptă `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; un `ageGroup` necunoscut sau un `lang` care nu este un cod de limbă valid (așteptat: `fr`, `pt-BR`…) → 400 `invalid_input`, înainte de orice apel IA. `quiz-review` și `remediation-summary` solicită în plus `{generationId, weakQuestions}` și se bazează pe sursele quiz-ului inițial.

### CRUD Generări
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Trimiterea răspunsurilor la quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Trimiterea răspunsurilor pentru textele lacunare `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Trimiterea răspunsurilor la dictare `{answers}` (punctaj strict pe server) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificarea unui răspuns oral (audio + questionIndex); răspunsul oral este moderat înainte de a fi verificat (refuz: 400 `quiz.answerBlocked`), costul fiind returnat în `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Lectură TTS cu voce tare (fișe/flashcarduri) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Anularea unei generări în curs (singura modalitate de anulare a unei stări pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Redenumire `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ștergerea generării și a elementelor media asociate (audio, imagine) |

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
| **Alpine.js în loc de React/Vue** | Amprentă minimă, reactivitate ușoară cu TypeScript compilat prin Vite. Perfect pentru un hackathon în care viteza contează. |
| **Persistență în fișiere JSON** | Zero dependențe, pornire instantanee. Nicio bază de date de configurat — pornești și ești gata. |
| **Vite + Handlebars** | Ce e mai bun din ambele lumi: HMR rapid pentru dezvoltare, parțiale HTML pentru organizarea codului, Tailwind JIT. |
| **Prompturi centralizate** | Toate prompturile IA în `prompts.ts` — ușor de iterat, testat și adaptat în funcție de limbă/grupă de vârstă. |
| **Sistem multi-generare** | Fiecare generare este un obiect independent cu propriul ID — permite mai multe fișe, quiz-uri etc. per curs. |
| **Prompturi adaptate în funcție de vârstă** | 4 grupe de vârstă cu vocabular, complexitate și ton diferite — același conținut predă diferit în funcție de cursant. |
| **Funcționalități bazate pe Agenți** | Generarea de imagini și căutarea web utilizează Agenți Mistral temporari — ciclu de viață curat cu curățare automată. |
| **Scraping inteligent de URL-uri** | Un singur câmp acceptă URL-uri și cuvinte-cheie amestecate — URL-urile sunt extrase prin scraping via Readability (pagini statice) cu fallback la Lightpanda (pagini JS/SPA), iar cuvintele-cheie declanșează un Agent Mistral web_search. Fiecare rezultat creează o sursă independentă. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (fără cheie suplimentară în afară de `MISTRAL_API_KEY`) — sinteză vocală integrată în lanțul de costuri și în rezoluția vocii per limbă. |

---

## Credite și mulțumiri

- **[Mistral AI](https://mistral.ai)** — Modele IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reactiv ușor
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitar
- **[Vite](https://vitejs.dev)** — Instrument de build pentru frontend
- **[Lucide](https://lucide.dev)** — Bibliotecă de pictograme
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extragere de conținut web (tehnologie Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Browser headless ultra-ușor pentru scraping-ul paginilor JS/SPA
- **[Luciole](https://luciole-vision.com)** — Font conceput pentru cititorii cu deficiențe de vedere, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opțiunea „Confort de lectură” din profiluri)

Inițiat în timpul Mistral AI Worldwide Hackathon (martie 2026), dezvoltat integral prin IA cu [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licență

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Articol tradus din fr în ro cu gemini-3.8-flash-high.**
