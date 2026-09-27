<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Förvandla vilket innehåll som helst till en interaktiv inlärningsupplevelse – drivs av <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube-demo"></a>
</p>

<h4 align="center">📊 Kodkvalitet</h4>

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

## Berättelsen – Varför EurekAI?

**EurekAI** föddes under [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiell webbplats](https://worldwide-hackathon.mistral.ai/)) (mars 2026). Jag behövde ett projekt – och idén kom från något väldigt konkret: jag pluggar regelbundet inför prov tillsammans med min dotter, och tänkte att det borde gå att göra det mer lekfullt och interaktivt med hjälp av AI.

Målet: att ta **vilken inmatning som helst** – ett foto av läxan, inklistrad text, en röstinspelning, en webbsökning – och omvandla den till **sammanfattningar, flashcards, quiz, poddar, lucktexter, illustrationer och mycket mer**. Allt drivs av modeller från det franska företaget Mistral AI, vilket gör EurekAI till en lösning som är naturligt anpassad för fransktalande elever.

Den [ursprungliga prototypen](https://github.com/jls42/worldwide-hackathon.mistral.ai) togs fram på 48 timmar under hackathonet som ett konceptbevis byggt på Mistrals tjänster – redan funktionell, men begränsad. Sedan dess har EurekAI utvecklats till ett fullfjädrat projekt: lucktexter, navigering i övningar, webbskrapning, anpassningsbar föräldramoderering, grundlig kodgranskning och mycket mer. All kod är AI-genererad – främst med [Claude Code](https://code.claude.com/), med vissa bidrag via [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Översikt

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Guidad tur i EurekAI: källor, sammanfattning, quiz, flashcards, illustrationer" width="820" />
</p>

| | |
|---|---|
| ![Översiktspanel](docs/screenshots/dashboard.webp)<br>**Översiktspanel** – senaste genereringar, beräknad kostnad per kort och totalt för projektet, knappen ”Auto – Magi!” | ![Källor](docs/screenshots/sources.webp)<br>**Källor** – import av foto/PDF/text/röst/webb, generering med ett klick, identifiering av instruktioner |

Varje importerad källa visar sin [OCR-tillförlitlighetspoäng, modereringsstatus och beräknade kostnad](docs/screenshots/sources-list.webp).

### Komponenterna i praktiken

| | |
|---|---|
| ![Sammanfattning](docs/screenshots/notes.gif)<br>**Sammanfattning** – nyckelpunkter, ordförråd, källhänvisade citat, ljuduppläsning per avsnitt | ![Quiz](docs/screenshots/quiz.gif)<br>**Flervalsquiz** – endast ett rätt svar per fråga, omedelbar feedback med förklaring, steg-för-steg-navigering |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** – vänd på kortet och gör en självbedömning: ”jag visste / jag visste inte” | ![Lucktexter](docs/screenshots/fillblank.gif)<br>**Lucktexter** – ledtråd på begäran, tolerant validering |
| ![Diktamen](docs/screenshots/dictation.gif)<br>**Diktamen** – ord dikterat med ljud, strikt rättning bokstav för bokstav | ![Röstquiz](docs/screenshots/vocal-quiz.gif)<br>**Röstquiz** – fråga som läses upp högt, svara med mikrofonen |
| ![Podd](docs/screenshots/podcast.gif)<br>**Podd** – mini-podd med 2 röster, läsbart dialogmanus | ![Illustrationer](docs/screenshots/illustrations.gif)<br>**Illustrationer** – pedagogiska bilder genererade av Agent |
| ![AI-handledare](docs/screenshots/chat.gif)<br>**AI-handledare** – chatt förankrad i kursdokumenten, förklarande svar, kan generera quiz och flashcards | |

### Kom igång

| | |
|---|---|
| ![Profilval](docs/screenshots/login.gif)<br>**Profilval** – varje barn har sitt eget utrymme, sin avatar och sitt språk | ![Skapa profil](docs/screenshots/profile-create.gif)<br>**Skapa profil** – ålder, avatar, föräldra-PIN för barn under 15 år |
| ![Skapa kurs](docs/screenshots/course.gif)<br>**Skapa kurs** – ett projekt per lektion, redo att ta emot källor | ![Inställningar](docs/screenshots/settings.gif)<br>**Inställningar** – API-status, val av AI-modeller med visade priser |

---

## Funktioner

| | Funktion | Beskrivning |
|---|---|---|
| 📷 | **Filimport** | Importera dina lektioner – foto, PDF (via Mistral OCR med genomsnittlig tillförlitlighetspoäng, nivåerna `high`/`medium`/`low`) eller textfil (TXT, MD). Uppladdningssessioner med återförsök per fil och individuell förloppsindikering |
| 📝 | **Textinmatning** | Skriv eller klistra in valfri text direkt |
| 🎤 | **Röstinmatning** | Spela in dig själv – Voxtral STT transkriberar din röst |
| 🌐 | **Webb / URL** | Klistra in en URL (direkt skrapning via Readability + Lightpanda) eller skriv en sökning (Mistral Agent web_search) |
| 📄 | **Sammanfattningar** | Strukturerade anteckningar med nyckelpunkter, ordförråd, citat, kuriosa |
| 🃏 | **Flashcards** | Interaktiva F&S-kort, uppläsning i dialogform |
| ❓ | **Flervalsquiz** | Frågor med 4 svarsalternativ varav endast ett är rätt, med adaptiv repetition av felaktiga svar (anpassningsbart antal) |
| ✏️ | **Lucktexter** | Fyll-i-övningar med ledtrådar och tolerant validering |
| 🔤 | **Diktamen** | Ord som dikteras med ljud (Voxtral TTS) från en importerad lista, tangentbordsinmatning, strikt rättning bokstav för bokstav med stavningsregel förklarad |
| 🎙️ | **Podd** | Mini-podd med 2 röster i ljudformat – standard Mistral-röster eller anpassade röster (föräldrar!) |
| 🖼️ | **Illustrationer** | Pedagogiska bilder genererade av en Mistral Agent |
| 🗣️ | **Röstquiz** | Frågor som läses upp högt (anpassad röst möjlig), muntligt svar, AI-verifiering |
| 💬 | **AI-handledare** | Kontextuell chatt med dina kursdokument, med verktygsanrop |
| 🧠 | **Automatisk dirigerare** | En dirigerare baserad på `mistral-small-latest` analyserar innehållet och föreslår en kombination av generatorer bland de 8 tillgängliga typerna |
| 🔒 | **Föräldrakontroll** | Konfigurerbar moderering per profil (anpassningsbara kategorier), föräldra-PIN, chattbegränsningar |
| 🌍 | **Flerspråkig** | Gränssnitt tillgängligt på 9 språk; AI-generering kan styras på 15 språk via prompter |
| 🔊 | **Uppläsning** | Lyssna på sammanfattningar och flashcards (fråga/svar-dialog) via Mistral Voxtral TTS |
| 💶 | **Spårning av API-kostnader** | Transparent uppskattning av kostnaden i € för varje generering och källa (tokens / tecken / sidor / ljudsekunder). Märke per kort + totalt per projekt, synligt i översiktspanelen |
| 🎨 | **Tema per profil** | Varje profil väljer sitt tema (`dark` eller `light`) – sparas med profilen och tillämpas vid varje profilbyte |

---

## Arkitekturöversikt

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Arkitekturöversikt" width="800" />
</p>

---

## Karta över modellanvändning

<p align="center">
  <img src="public/assets/model-map.webp" alt="Mappning av AI-modeller till uppgifter" width="800" />
</p>

---

## Användarresa

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Elevens inlärningsresa" width="800" />
</p>

---

## Djupdykning – Funktioner

### Multimodal inmatning

EurekAI accepterar 4 typer av källor, som modereras enligt profilen (moderering är aktiverad som standard för barn- och tonårsprofiler):

- **Filimport** – JPG-, PNG- eller PDF-filer bearbetas av Mistral OCR – **OCR 4 (`mistral-ocr-4-0`) som standard** (bästa kvalitet), **OCR 3 (`mistral-ocr-2512`) som tillval** i inställningarna (billigare, ~½ av kostnaden) – för tryckt text, tabeller och handstil; eller textfiler (TXT, MD) som importeras direkt. Flerfilsuppladdningar använder ett system med **uppladdningssessioner**: individuellt förlopp per fil, återförsök för misslyckad fil utan att skicka in de andra igen, och stängning av sessionen när den är klar. OCR visar en genomsnittlig **tillförlitlighetspoäng** (`average`, begränsad till `[0,1]`, beräknad från `averagePageConfidenceScore` som returneras av Mistral), vilket visas i gränssnittet som en nivåbricka (`high` / `medium` / `low`, tröskelvärden ~0,9 / ~0,7) – varnar utan att blockera om skanningen håller låg kvalitet. Kopian av dokumentet som skickas till Mistral för OCR raderas så snart behandlingen är klar, även vid eventuella fel.
- **Fritext** – Skriv eller klistra in valfritt innehåll. Modereras före lagring om moderering är aktiv.
- **Röstinmatning** – Spela in ljud i webbläsaren. Transkriberas av `voxtral-mini-latest`. Parametern `language="fr"` optimerar igenkänningen.
- **Webb / URL** – Klistra in en eller flera webbadresser för att skrapa innehållet direkt (Readability + Lightpanda för JS-sidor), eller skriv in sökord för en webbsökning via Mistral Agent. Det gemensamma fältet accepterar båda – webbadresser och sökord separeras automatiskt, och varje resultat skapar en oberoende källa.

### AI-innehållsgenerering

Åtta typer av genererat läromaterial:

| Generator | Modell | Utdata |
|---|---|---|
| **Sammanfattning** | `mistral-large-latest` | Titel, sammanfattning, nyckelpunkter, ordförråd, citat, kuriosa |
| **Flashcards** | `mistral-large-latest` | F&S-kort med källhänvisningar (anpassningsbart antal) |
| **Flervalsquiz** | `mistral-large-latest` | Frågor med 4 alternativ varav endast ett är rätt, förklaringar, adaptiv repetition (anpassningsbart antal) |
| **Lucktexter** | `mistral-large-latest` | Meningar att fylla i med ledtrådar, tolerant validering (Levenshtein) |
| **Diktamen** | `mistral-large-latest` + Voxtral TTS | Nyckelord dikterade som ljud (1 MP3/ord) → tangentbordsinmatning → strikt rättning (en glömd accent räknas som fel) med förklarad regel |
| **Podd** | `mistral-large-latest` + Voxtral TTS | Manus för 2 röster → MP3-ljud |
| **Illustration** | Agent `mistral-large-latest` | Pedagogisk bild via verktyget `image_generation` |
| **Röstquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-frågor → STT-svar → AI-verifiering |

### AI-handledare via chatt

En konversationsbaserad handledare med full tillgång till kursdokumenten:

- Använder `mistral-large-latest`
- **Verktygsanrop**: kan generera sammanfattningar, flashcards, quiz eller lucktexter under samtalets gång
- Historik på 50 meddelanden per kurs
- Moderering om det är aktiverat för profilen: meddelandet kontrolleras, och flaggade källor, källor vars verifiering misslyckades samt källor som ännu inte har verifierats exkluderas från kontexten och verktygen (verifieringen av misslyckade eller ännu inte verifierade källor startas först om, max 5 s)

### Automatisk dirigerare

Dirigeraren använder `mistral-small-latest` för att analysera källornas innehåll och föreslå de mest relevanta generatorerna bland de 8 tillgängliga. Gränssnittet visar förloppet i realtid: först en analysfas, sedan individuella genereringar med möjlighet att avbryta.

### Adaptivt lärande

- **Quizstatistik**: uppföljning av försök och träffsäkerhet per fråga
- **Repetition av quiz**: genererar 5–10 nya frågor inriktade på svaga koncept, baserat på källorna från ursprungsquizet (modereringsskyddet omfattar samma källor)
- **Identifiering av instruktioner**: identifierar repetitionsinstruktioner ("Jag kan min läxa om jag kan...") och prioriterar dem i kompatibla textgeneratorer (sammanfattning, flashcards, quiz, lucktexter). Med aktiv moderering väntar identifieringen på att källorna verifieras och läser endast de som bedöms som säkra; instruktionen behåller listan över sina ursprungskällor: om en av dem flaggas visas eller tillämpas instruktionen inte, och om en av dem raderas tas instruktionen bort. Dess kostnad medräknas

### Säkerhet och föräldrakontroll

- **4 åldersgrupper**: barn (≤10 år), tonåring (11–15), student (16–25), vuxen (26+)
- **Innehållsmoderering**: `mistral-moderation-2603` (Mistral Moderation 2) med 11 tillgängliga kategorier, varav 6 är blockerade som standard för nya barn-/tonårsprofiler (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` lades till efter mätning på 50 lektioner, inklusive historia, utan några falska positiva svar). Kategorierna kan anpassas per profil i inställningarna; Moderation 2 delade upp den tidigare kategorin ”farligt innehåll” i `dangerous` + `criminal` (befintliga profiler migreras automatiskt, och blockerade kategorier tillämpas även på redan importerade källor). Säkerhet som standard: om modellens svar inte gör det möjligt att verifiera en blockerad kategori nekas innehållet (”Moderering inte tillgänglig”); med aktiv moderering exkluderar både generering och chatt flaggade källor, källor vars verifiering misslyckades och källor som håller på att verifieras. En källa som aldrig har verifierats (importerad när moderering var inaktiverad, eller ett gammalt projekt kopplat till en profil) verifieras före användning. En moderering som avbröts av en omstart återupptas vid uppstart om servernyckeln tillåter det; annars återupptas den, precis som en moderering som stött på fel, när projektet öppnas eller vid nästa generering. Knappen ”Verifiera igen” startar om verifieringen på begäran. Med aktiv moderering är källans innehåll dolt för barnet (förhandsvisning, text, originaldokument) så länge källan inte bedöms som säker; en förälder kan visa det med sin PIN-kod, för en enstaka visning. Det muntliga svaret i röstquizet modereras innan det verifieras. Daterat id fäst i `helpers/moderation-model.ts`: det föråldrade aliaset `-latest` listas inte längre av API:et.
- **Föräldra-PIN**: SHA-256-hash, krävs för profiler under 15 år; max 10 felaktiga koder per kvart och IP-adress (429 `rate_limited`). För produktionsdriftsättning rekommenderas en långsam hash med salt (Argon2id, bcrypt).
- **Serverdata**: `/output` publicerar endast projektmedia (ljud, bilder, importerade filer); `profiles.json`, `config.json`, `projects.json` och `project.json` tillhandahålls aldrig
- **Chattbegränsningar**: AI-chatt är inaktiverad som standard för personer under 16 år, kan aktiveras av föräldrar

### Flerprofilssystem

- Flera profiler med namn, ålder, avatar, språkinställningar
- **Röst per profil** (`Profile.mistralVoices?: { host?, guest? }` – varje roll är valfri) – varje barn kan ha sitt eget par av röster för podd/röstquiz
- **Tema per profil** (`Profile.theme: 'dark' | 'light'`) – automatisk växling vid profilbyte, sparas i backend
- Projekt kopplas till profiler via `profileId`; ett äldre projekt utan profil knyts till den första profilen som öppnar det och modereras sedan enligt den profilen
- Kaskadradering: om en profil tas bort raderas alla dess projekt

### API-kostnadsuppföljning

Varje debiterbart Mistral-anrop (chatt, OCR, STT, TTS, agenter), inklusive identifiering av instruktioner och muntliga svar i röstquizet, är instrumenterat för att ge användaren en **transparent** uppskattning i €. Moderering, som är gratis, räknas inte med. Agenternas verktygskostnader ingår: 0,03 $ per webbsökning och 0,10 $ per genererad bild (Mistral-tariffer), plus de tokens som produceras av dessa verktyg, vilka uppskattningen räknar enligt agentmodellens input-taxa.

- **Sanningskälla**: `helpers/pricing.ts` — `MODEL_PRICING` per modellprefix (t.ex. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` med URL:er till Mistral-dokumentation för regelbunden om-scraping
- **Enheter som stöds**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konvertering styrs av `helpers/cost-calc.ts`
- **Instrumenteringskedja**: `helpers/tracked-client.ts` (kapslar in Mistral-klienten) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injicering i HTTP-svaret)
- **UI**: kostnadsbricka per generering (`src/partials/cost-badge-gen.html`), per källa (`cost-badge-src.html`), ackumulerad totalsumma i instrumentpanelen (`Project.totalCost`)
- **Ändpunkter**: svaren `/generate/*` och `/sources/*` dekorerar det returnerade objektet (`Generation` / `Source`) med `estimatedCost`, `usage` och `costBreakdown`. `POST /generate/route` lägger till ett fält `costDelta: number` för enbart routningskostnaden; `POST /detect-consigne` (`{consigne, costDelta}`) och verifieringen av ett muntligt svar returnerar också sitt `costDelta`. `GET /projects/:pid` returnerar projektet berikat med `totalCost` (summa beräknad från `costLog[]`) + den fullständiga historiken

### TTS (Mistral Voxtral) och anpassade röster

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100 % Mistral-talsyntes, ingen extra nyckel krävs
- **Anpassade röster**: föräldrar kan skapa sina egna röster via Mistral Voices API (från ett ljudprov) och tilldela dem till rollerna som värd/gäst — podcasts och röstquiz läses då upp med en förälders röst, vilket gör upplevelsen ännu mer uppslukande för barnet
- Två konfigurerbara röstroller: **värd** (huvudberättare) och **gäst** (podcastens andra röst)
- Fullständig katalog över Mistral-röster tillgänglig i inställningarna, filtrerbar efter språk

### Internationalisering

- Gränssnitt tillgängligt på 9 språk: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompter stöder 15 språk (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Språk kan konfigureras per profil

---

## Teknisk stack

| Lager | Teknik | Roll |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server och typsäkerhet |
| **Backend** | Express 5.x | REST-API |
| **Utvecklingsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktivt gränssnitt, TypeScript kompilerat av Vite |
| **Mallhantering** | vite-plugin-handlebars | HTML-komposition via partials |
| **AI** | Mistral AI SDK 2.x | Chatt, OCR, STT, TTS, agenter, moderering |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrerad talsyntes |
| **Ikoner** | Lucide 1.x | SVG-ikonbibliotek |
| **Webb-scraping** | Readability + linkedom | Extrahering av huvudinnehåll från webbsidor (Firefox Reader View-teknik) |
| **Headless-webbläsare** | Lightpanda | Ultralätt headless-webbläsare (Zig + V8) för JS/SPA-sidor — fallback för scraping |
| **Markdown** | Marked | Markdown-rendering i chatten |
| **Filuppladdning** | Multer 2.x | Hantering av multipart-formulär |
| **Ljud** | ffmpeg-static | Sammankoppling av ljudsegment |
| **Tester** | Vitest | Enhetstester — täckning mäts av SonarCloud |
| **Persistens** | JSON-filer | Beroendefri lagring |

---

## Modellreferens

| Modell | Användning | Varför |
|---|---|---|
| `mistral-large-latest` | Repetitionsblad, flashcards, podcast, quiz, lucktexter, chatt, verifiering av röstquiz, bildagent, webbsökningsagent, identifiering av instruktioner | Bäst flerspråkighet + instruktionsföljning |
| `mistral-ocr-4-0` (OCR 4, standard) | Dokument-OCR — överlägsen kvalitet | Tryckt text, tabeller, handskrift ($4 / 1 000 sidor) |
| `mistral-ocr-2512` (OCR 3, tillval) | Dokument-OCR | Valbar i Inställningar, billigare ($2 / 1 000 sidor) |
| `voxtral-mini-latest` | Röstigenkänning (STT) | Flerspråkig STT, optimerad med `language="fr"` |
| `voxtral-mini-tts-latest` | Talsyntes (TTS) | Podcasts, röstquiz, högläsning |
| `mistral-moderation-2603` | Innehållsmoderering | 6 kategorier blockerade för barn/ungdomar (inklusive `jailbreaking`) |
| `mistral-small-latest` | Automatisk router | Snabb innehållsanalys för routningsbeslut |

---

## Snabbstart

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

> **Obs**: Mistral Voxtral TTS är den enda TTS-leverantören — ingen ytterligare nyckel behövs utöver `MISTRAL_API_KEY`.

> **Användarangiven API-nyckel**: `MISTRAL_API_KEY` är numera **valfri**. Om den saknas startar appen ändå och uppmanar varje användare att ange **sin egen Mistral-nyckel** i gränssnittet. Nyckeln **lagras i webbläsaren** (krypterad via Web Crypto + IndexedDB i en säker kontext) och skickas per förfrågan — **sparas aldrig på servern**. Prioritetsordning: profilnyckel > global webbläsarnyckel > `MISTRAL_API_KEY` (env). Att ställa in `EUREKAI_REQUIRE_USER_KEY=true` tvingar varje användare att tillhandahålla sin nyckel (miljövariabelnyckeln används då endast för förladdningar).

> **Lokal HTTPS (surfplatta/LAN)**: `localhost` är redan en säker kontext. För LAN-åtkomst (surfplatta), generera ett lokalt certifikat och aktivera HTTPS: webbläsaren kan då kryptera nyckeln den lagrar, och nyckeln är krypterad under överföringen:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Miljövariabler

| Variabel | Krävs | Standard | Roll |
|---|---|---|---|
| `MISTRAL_API_KEY` | valfri | — | Mistral API-nyckel (chatt, OCR, STT, Voxtral TTS, agenter, moderering). Om den saknas anger användaren sin nyckel i appen (lagras i webbläsaren, aldrig på servern) |
| `EUREKAI_REQUIRE_USER_KEY` | valfri | `false` | `true` → inaktiverar fallback till `MISTRAL_API_KEY` för AI-förfrågningar (varje användare MÅSTE ange sin nyckel). Användbart på en exponerad instans |
| `HTTPS_KEY` / `HTTPS_CERT` | valfri | — | Sökvägar för TLS-nyckel/-certifikat (se `scripts/gen-cert.sh`) → Express och Vite körs över HTTPS (säker kontext för LAN/surfplatta) |
| `PORT` | valfri | `3000` | HTTP-port för Express-backend |
| `NODE_ENV` | valfri | `development` | Om `production` → Express levererar frontend från `dist/` (annars `public/`) |
| `SONAR_TOKEN` | valfri för CI | — | Används endast av GitHub Actions-arbetsflödet för SonarCloud |

### Tester, kodkvalitet och bidrag

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hookar (Husky)**: `pre-commit` kör sekventiellt `scripts/pre-commit-fast.sh` (konflikter, stora filer, shellcheck), `lint-staged` och sedan `npm test`; `pre-push` kör först en blockerande kontroll `npm audit` (blockerar så fort ett beroende, även transitivt, har en sårbarhet på nivå `critical`, se `scripts/audit-verdict.mjs`) och sedan `npm run security`. Varje hook blockerar commit/push så snart något av dess steg misslyckas.

**Externa verktyg (valfria för att starta applikationen, nödvändiga för `pretest` och `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Utan dessa verktyg misslyckas `npm test` vid `pretest` (lizard saknas) och `npm run security` misslyckas (opengrep saknas). Husky-hookarna blockerar då commit/push.

---

## Driftsättning med container

Avbildningen publiceras på **GitHub Container Registry**:

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

> **`:U`**: flagga för rotlös Podman (rootless) som automatiskt justerar volymbehörigheterna.

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## Projektstruktur

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

> **För AI-agenter som bidrar till koden**: se [`CLAUDE.md`](CLAUDE.md) för detaljerad arkitekturkontext, obligatoriska regler (felkoder, kostnadsuppföljning och prompter utan metaord, det vill säga utan beskrivande ord om dokumentet såsom dess typ, eftersom modellen skulle kopiera dessa ord i sina utdata) och kända fallgropar (Lizard CCN, Opengrep, migrering av Codacy/Semgrep).

---

## API-referens

### Konfiguration
| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| `GET` | `/api/config` | Aktuell konfiguration |
| `PUT` | `/api/config` | Ändra konfiguration (modeller, röster, TTS-modell) |
| `GET` | `/api/config/status` | API-status: `mistral` (Mistral-nyckel definierad), `ttsAvailable` (alias för `mistral`, Mistral Voxtral är den enda TTS-leverantören) |
| `POST` | `/api/config/reset` | Återställ till standardkonfiguration |
| `GET` | `/api/config/voices` | Lista Mistral TTS-röster (valfritt `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Tillgängliga modereringskategorier + standardvärden efter ålder |
| `POST` | `/api/providers/mistral/validate` | Validera en användarangiven Mistral-nyckel — alltid 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), ingen fallback till miljövariabel |

### Profiler
| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| `GET` | `/api/profiles` | Lista alla profiler |
| `POST` | `/api/profiles` | Skapa en profil |
| `PUT` | `/api/profiles/:id` | Ändra en profil (PIN krävs för < 15 år; 10 felaktiga PIN-koder / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Ta bort en profil + kaskad för projekt `{pin?}` → `{ok, deletedProjects}` |

### Projekt
| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| `GET` | `/api/projects` | Lista projekt (`?profileId=` valfritt) |
| `POST` | `/api/projects` | Skapa ett projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektdetaljer; `?profileId=` kopplar ett projekt utan profil till profilen som öppnar det |
| `PUT` | `/api/projects/:pid` | Byt namn på `{name}` |
| `DELETE` | `/api/projects/:pid` | Ta bort projektet |
| `GET` | `/api/projects/:pid/events` | SSE-ström i realtid (`event: generation`) över genereringsövergångar (`completed`/`failed`/`cancelled`) + keep-alive-heartbeat |

### Källor
| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import av multipart-filer (OCR för JPG/PNG/PDF, direktläsning för TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Fritext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Röst-STT (multipart-ljud) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping eller webbsökning `{query}` — returnerar en array med källor; 422 `url_blocked` om alla adresser nekas (internt nätverk), 502 `all_sources_failed` om ingen källa kunde skapas |
| `POST` | `/api/projects/:pid/sources/moderate` | Återuppta väntande modereringar eller modereringar med fel `{sourceIds?}` (högst 10 per anrop, väntetid ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ta bort en källa, dess importerade fil och instruktionen som beror på den → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderera `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Identifiera repetitionsinstruktioner (endast verifierade källor) → `{consigne, costDelta}` |

### Generering
| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Repetitionsblad |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Flervalsquiz (4 alternativ, endast ett rätt svar) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lucktexter |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktamen (ord + exempelmeningar + regler, 1 TTS-ljud per ord; föreslås även av den automatiska routern) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Röstquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptiv repetition `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Riktat repetitionsblad för missade quizfrågor `{generationId, weakQuestions}` — anropas parallellt med `quiz-review` via åtgärdsknappen i quizvyn |
| `POST` | `/api/projects/:pid/generate/route` | Routningsanalys (plan över generatorer att köra) — returnerar `{plan, costDelta}` (enbart routningskostnad) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatisk backend-generering (routtning + 8 typer: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Körs parallellt — förutsätter en Mistral-nivå med rate-limit ≥ 8 samtidiga förfrågningar; annars kan flera 429-fel returneras i `failedSteps`. |

Alla genereringsrutter accepterar `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; en okänd `ageGroup` eller en `lang` som inte är en giltig språkkod (förväntat: `fr`, `pt-BR`…) → 400 `invalid_input`, före något AI-anrop. `quiz-review` och `remediation-summary` kräver dessutom `{generationId, weakQuestions}` och baseras på källorna från det ursprungliga quizet.

### CRUD för genereringar
| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Skicka in quizsvar `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Skicka in svar för lucktexter `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Skicka in diktamensvar `{answers}` (strikt serverpoängräkning) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verifiera ett muntligt svar (ljud + questionIndex); det muntliga svaret modereras innan det verifieras (avslag: 400 `quiz.answerBlocked`), kostnad returneras i `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Högläsning via TTS (repetitionsblad/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Avbryt en pågående generering (enda sättet att avbryta en väntande process) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Byt namn på `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ta bort genereringen och dess media (ljud, bild) |

### Chatt
| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Hämta chatthistorik |
| `POST` | `/api/projects/:pid/chat` | Skicka ett meddelande `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Rensa chatthistorik |

---

## Arkitekturbeslut

| Beslut | Motivering |
|---|---|
| **Alpine.js istället för React/Vue** | Minimalt avtryck, lättviktsreaktivitet med TypeScript kompilerat av Vite. Perfekt för ett hackathon där snabbhet räknas. |
| **Persistens med JSON-filer** | Noll beroenden, omedelbar start. Ingen databas att konfigurera — starta och kör. |
| **Vite + Handlebars** | Det bästa av två världar: snabb HMR för utveckling, HTML-partials för kodorganisation, Tailwind JIT. |
| **Centraliserade prompter** | Alla AI-prompter i `prompts.ts` — enkelt att iterera, testa och anpassa per språk/åldersgrupp. |
| **System för flera genereringar** | Varje generering är ett självständigt objekt med sitt eget ID — möjliggör flera repetitionsblad, quiz etc. per kurs. |
| **Åldersanpassade prompter** | 4 åldersgrupper med olika ordförråd, komplexitet och tonfall — samma innehåll lärs ut på olika sätt beroende på vem som lär sig. |
| **Agentbaserade funktioner** | Bildgenerering och webbsökning använder tillfälliga Mistral-agenter — ren livscykel med automatisk upprensning. |
| **Intelligent URL-scraping** | Ett enda fält accepterar en blandning av URL:er och sökord — URL:er scrapas via Readability (statiska sidor) med Lightpanda som reserv (JS/SPA-sidor), sökord utlöser en Mistral web_search-agent. Varje resultat skapar en oberoende källa. |
| **100 % Mistral TTS** | Mistral Voxtral TTS (ingen extra nyckel utöver `MISTRAL_API_KEY`) — talsyntes integrerad i kostnadskedjan och röstmatchning per språk. |

---

## Tack & erkännanden

- **[Mistral AI](https://mistral.ai)** — AI-modeller (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lättviktigt reaktivt ramverk
- **[TailwindCSS](https://tailwindcss.com)** — Verktygsbaserat CSS-ramverk
- **[Vite](https://vitejs.dev)** — Frontend-byggverktyg
- **[Lucide](https://lucide.dev)** — Ikonbibliotek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extrahering av webbinnehåll (Firefox Reader View-teknik)
- **[Lightpanda](https://lightpanda.io)** — Ultralätt headless-webbläsare för skrapning av JS/SPA-sidor
- **[Luciole](https://luciole-vision.com)** — Typsnitt utformat för synsvaga läsare, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (alternativet ”Läskomfort” i profilerna)

Initierat under Mistral AI Worldwide Hackathon (mars 2026), helt utvecklat av AI med [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Författare

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licens

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel översatt från fr till sv med gemini-3.8-flash-high.**
