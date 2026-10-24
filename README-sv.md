<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logotyp" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Förvandla vilket innehåll som helst till en interaktiv lärandeupplevelse — med kraft från <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Engelska</a> · <a href="README-es.md">🇪🇸 Spanska</a> · <a href="README-pt.md">🇧🇷 Portugisiska</a> · <a href="README-de.md">🇩🇪 Tyska</a> · <a href="README-it.md">🇮🇹 Italienska</a> · <a href="README-nl.md">🇳🇱 Nederländska</a> · <a href="README-ar.md">🇸🇦 Arabiska</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Kinesiska</a> · <a href="README-ja.md">🇯🇵 Japanska</a> · <a href="README-ko.md">🇰🇷 Koreanska</a> · <a href="README-pl.md">🇵🇱 Polska</a> · <a href="README-ro.md">🇷🇴 Rumänska</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube-demo"></a>
</p>

<h4 align="center">📊 Kodkvalitet</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Kvalitetsgrind"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Säkerhetsbetyg"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Tillförlitlighetsbetyg"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Underhållbarhetsbetyg"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Testtäckning"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Sårbarheter"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Kodrader"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy-märke"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Historien — Varför EurekAI?

**EurekAI** föddes under [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiell webbplats](https://worldwide-hackathon.mistral.ai/)) (mars 2026). Jag behövde ett ämne — och idén kom från något väldigt konkret: jag brukar förbereda min dotter inför prov, och jag tänkte att det borde gå att göra det mer lekfullt och interaktivt med hjälp av AI.

Målet: att ta **vilket underlag som helst** — ett foto av läxan, en inklistrad text, en röstinspelning, en webbsökning — och förvandla det till **repetitionsblad, flashcards, quiz, poddar, lucktexter, illustrationer och mycket mer**. Allt drivs av modeller från det franska företaget Mistral AI, vilket gör EurekAI till en lösning som är naturligt anpassad för franskspråkiga elever.

Den [första prototypen](https://github.com/jls42/worldwide-hackathon.mistral.ai) skapades på 48h under hackathonet som ett koncepttest byggt på Mistrals tjänster — redan fungerande, men begränsat. Sedan dess har EurekAI blivit ett riktigt projekt: lucktexter, navigering i övningarna, webbskrapning, konfigurerbar föräldramoderering, djupgående kodgranskning och mycket mer. All kod är genererad av AI — främst [Claude Code](https://code.claude.com/), med några bidrag via [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Översikt

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Guidad tur i EurekAI: källor, repetitionsblad, quiz, flashcards, illustrationer" width="820" />
</p>

| | |
|---|---|
| ![Översiktspanel](docs/screenshots/dashboard.webp)<br>**Översiktspanel** — senaste genereringar, uppskattad kostnad per kort och totalt för projektet, knappen ”Auto — Magi!” | ![Källor](docs/screenshots/sources.webp)<br>**Källor** — import av foto/PDF/text/röst/webb, generering med ett klick, identifiering av instruktioner |

Varje importerad källa visar sin [OCR-konfidenspoäng, moderering och uppskattade kostnad](docs/screenshots/sources-list.webp).

### Komponenterna i praktiken

| | |
|---|---|
| ![Repetitionsblad](docs/screenshots/notes.gif)<br>**Repetitionsblad** — huvudpunkter, ordförråd, källbelagda citat, uppläsning per avsnitt | ![Quiz](docs/screenshots/quiz.gif)<br>**Flervalsquiz** — ett enda rätt svar per fråga, omedelbar återkoppling med förklaring, stegvis navigering |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — vänd kortet och bedöm sedan själv: ”jag kunde / jag kunde inte” | ![Lucktexter](docs/screenshots/fillblank.gif)<br>**Lucktexter** — ledtråd på begäran, tolerant validering |
| ![Diktamen](docs/screenshots/dictation.gif)<br>**Diktamen** — ord läses upp, strikt rättning bokstav för bokstav | ![Röstquiz](docs/screenshots/vocal-quiz.gif)<br>**Röstquiz** — frågan läses upp, svar via mikrofon |
| ![Podd](docs/screenshots/podcast.gif)<br>**Podd** — minipodd med 2 röster, dialogmanus som går att läsa | ![Illustrationer](docs/screenshots/illustrations.gif)<br>**Illustrationer** — pedagogiska bilder genererade av en Agent |
| ![AI-handledare](docs/screenshots/chat.gif)<br>**AI-handledare** — chatt förankrad i kursmaterialet, förklarande svar, kan generera quiz och flashcards | |

### Kom igång

| | |
|---|---|
| ![Profilval](docs/screenshots/login.gif)<br>**Profilval** — varje barn har sitt eget utrymme, sin avatar och sitt språk | ![Skapa profil](docs/screenshots/profile-create.gif)<br>**Skapa profil** — ålder, avatar, föräldra-PIN för barn under 15 år |
| ![Skapa kurs](docs/screenshots/course.gif)<br>**Skapa kurs** — ett projekt per lektion, redo att ta emot källor | ![Inställningar](docs/screenshots/settings.gif)<br>**Inställningar** — API-status, val av AI-modeller med visade priser |

---

## Funktioner

| | Funktion | Beskrivning |
|---|---|---|
| 📷 | **Filimport** | Importera dina läxor — foto, PDF (via Mistral OCR med genomsnittlig konfidenspoäng, nivåerna `high`/`medium`/`low`) eller textfil (TXT, MD). Uppladdningssessioner med återförsök per fil och individuell förloppsvisning |
| 📝 | **Textinmatning** | Skriv eller klistra in valfri text direkt |
| 🎤 | **Röstinmatning** | Spela in dig själv — Voxtral STT transkriberar din röst |
| 🌐 | **Webb / URL** | Klistra in en URL (direkt skrapning via Readability + Lightpanda) eller skriv en sökning (Agent Mistral web_search) |
| 📄 | **Repetitionsblad** | Strukturerade anteckningar med huvudpunkter, ordförråd, citat och anekdoter |
| 🃏 | **Flashcards** | Interaktiva fråge- och svarskort, uppläsning i dialogform |
| ❓ | **Flervalsquiz** | Frågor med 4 svarsalternativ och ett enda rätt svar, med adaptiv repetition av fel (konfigurerbart antal) |
| ✏️ | **Lucktexter** | Fyll-i-övningar med ledtrådar och tolerant validering |
| 🔤 | **Diktamen** | Ord från en importerad lista läses upp (Voxtral TTS), tangentbordsinmatning, strikt rättning bokstav för bokstav med förklaring av stavningsregeln |
| 🎙️ | **Podd** | Minipodd med 2 röster — Mistral-röster som standard eller anpassade röster (föräldrar!) |
| 🖼️ | **Illustrationer** | Pedagogiska bilder genererade av en Mistral Agent |
| 🗣️ | **Röstquiz** | Frågor läses upp (anpassad röst möjlig), muntliga svar, AI-kontroll |
| 💬 | **AI-handledare** | Kontextuell chatt med ditt kursmaterial och verktygsanrop |
| 🧠 | **Automatisk router** | En router baserad på `mistral-small-latest` analyserar innehållet och föreslår en kombination av generatorer bland de 8 tillgängliga typerna |
| 🔁 | **Kontinuitet mellan kurser** | Importer, automatiska genereringar, mikrofoninspelning, chatt, webbsökning och uppläsning fortsätter för sin kurs när en annan öppnas; en avisering anger kursens namn när något slutförs i en annan kurs |
| 🔒 | **Föräldrakontroll** | Konfigurerbar moderering per profil (anpassningsbara kategorier), föräldra-PIN, chattbegränsningar |
| 🌍 | **Flerspråkighet** | Gränssnittet finns på 9 språk; AI-generering kan styras på 15 språk via prompts |
| 🔊 | **Uppläsning** | Lyssna på repetitionsblad och flashcards (dialog med frågor och svar) via Mistral Voxtral TTS |
| 💶 | **Spårning av API-kostnader** | Transparent uppskattning av kostnaden i € för varje generering och källa (tokens / tecken / sidor / ljudsekunder). Märke per kort + totalsumma per projekt, synligt i översiktspanelen |
| 🎨 | **Tema per profil** | Varje profil väljer sitt tema `dark` eller `light` — sparas med profilen och tillämpas på nytt vid varje profilbyte |

---

## Arkitekturöversikt

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Arkitekturöversikt" width="800" />
</p>

---

## Karta över modellanvändning

<p align="center">
  <img src="public/assets/model-map.webp" alt="Koppling mellan AI-modeller och uppgifter" width="800" />
</p>

---

## Användarresa

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Elevens läranderesa" width="800" />
</p>

---

## Fördjupning — Funktioner

### Multimodal inmatning

EurekAI accepterar 4 typer av källor, som modereras utifrån profilen (moderering är aktiverad som standard för barn- och tonårsprofiler):

- **Filimport** — JPG-, PNG- eller PDF-filer behandlas av Mistral OCR — **OCR 4.1** (`mistral-ocr-4-1`) som standard, **OCR 3** (`mistral-ocr-2512`) som alternativ i Inställningar (billigare, ~½ av kostnaden; läser handstil bättre) — för tryckt text, tabeller och handstil; eller textfiler (TXT, MD) som importeras direkt. Uppladdning av flera filer använder ett system med **uppladdningssessioner**: individuell förloppsvisning per fil, återförsök för den misslyckade filen utan att skicka in de andra igen, möjlighet att stänga sessionen när den är klar. OCR visar en genomsnittlig **konfidenspoäng** (`average`, begränsad till `[0,1]`, beräknad från `averagePageConfidenceScore` som returneras av Mistral), som visas i gränssnittet som ett nivåmärke `high` / `medium` / `low` (tröskelvärden ~0.9 / ~0.7) — varnar utan att blockera om skanningen har dålig kvalitet. Dokumentkopian som skickas till Mistral för OCR raderas så snart behandlingen är klar, även vid fel.
- **Fritext** — Skriv eller klistra in valfritt innehåll. Modereras före lagring om moderering är aktiv.
- **Röstinmatning** — Spela in ljud i webbläsaren. Transkriberas av **Voxtral Mini Transcribe 2** (`voxtral-mini-2602`) som standard; **Voxtral Mini Transcribe 3** och **Voxtral Small Transcribe 3** (förhandsversion från Mistral) finns som alternativ i Inställningar. Gränssnittets språk skickas till modellen (`language`) för att optimera igenkänningen.
- **Webb / URL** — Klistra in en eller flera URL:er för att skrapa innehållet direkt (Readability + Lightpanda för JS-sidor), eller skriv sökord för en webbsökning via Mistral Agent. Samma fält accepterar båda — URL:er och sökord separeras automatiskt, och varje resultat skapar en separat källa.

### AI-generering av innehåll

Åtta typer av genererat läromaterial:

| Generator | Modell | Utdata |
|---|---|---|
| **Repetitionsblad** | `mistral-large-latest` | Titel, sammanfattning, huvudpunkter, ordförråd, citat, anekdot |
| **Flashcards** | `mistral-large-latest` | Fråge- och svarskort med källhänvisningar (konfigurerbart antal) |
| **Flervalsquiz** | `mistral-large-latest` | Frågor med 4 svarsalternativ och ett enda rätt svar, förklaringar, adaptiv repetition (konfigurerbart antal) |
| **Lucktexter** | `mistral-large-latest` | Meningar att fylla i med ledtrådar, tolerant validering (Levenshtein) |
| **Diktamen** | `mistral-large-latest` + Voxtral TTS | Nyckelord läses upp (1 MP3/ord) → tangentbordsinmatning → strikt rättning (en saknad accent räknas som fel) med förklarad regel |
| **Podd** | `mistral-large-latest` + Voxtral TTS | Manus med 2 röster → MP3-ljud |
| **Illustration** | Agent `mistral-large-latest` | Pedagogisk bild via verktyget `image_generation` |
| **Röstquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-frågor → STT-svar → AI-kontroll |

### AI-handledare via chatt

En samtalsbaserad handledare med full tillgång till kursmaterialet:

- Använder `mistral-large-latest`
- **Verktygsanrop**: kan generera repetitionsblad, flashcards, quiz eller lucktexter under samtalet
- Historik med 50 meddelanden per kurs
- Moderering om den är aktiverad för profilen: meddelandet kontrolleras, och flaggade källor, källor vars kontroll misslyckats och källor som ännu inte kontrollerats utesluts från kontexten och verktygen (kontrollen av källor vars kontroll misslyckats eller som ännu inte kontrollerats startas först om, högst 5 s)

### Automatisk router

Routern använder `mistral-small-latest` för att analysera källornas innehåll och föreslå de mest relevanta generatorerna bland de 8 tillgängliga. Gränssnittet visar förloppet i realtid: först en analysfas, sedan de enskilda genereringarna som kan avbrytas.

Högst 3 långvariga genereringar körs samtidigt i en flik (steg från alla Auto-körningar, genereringar som startas en i taget, påminnelseblad): övriga väntar på sin tur, och en kurs öppnas utan att invänta att pågående genereringar blir klara. ”Avbryt allt” stoppar även kursens Auto-steg som fortfarande väntar, även efter att man har varit inne i en annan kurs, med ett enda meddelande.

### Adaptivt lärande

- **Quizstatistik**: spårning av försök och träffsäkerhet per fråga
- **Quizrepetition**: genererar 5-10 nya frågor riktade mot svaga begrepp, utifrån källorna till det ursprungliga quizet (modereringskontrollen gäller samma källor)
- **Identifiering av instruktioner**: identifierar repetitionsinstruktioner (”Jag kan min läxa om jag kan ...”) och prioriterar dem i kompatibla textgeneratorer (repetitionsblad, flashcards, quiz, lucktexter). När moderering är aktiv väntar identifieringen på att källorna kontrolleras och läser bara dem som bedöms som säkra; instruktionen behåller listan över sina ursprungliga källor: om någon av dem flaggas varken visas eller tillämpas instruktionen, och om någon av dem raderas tas instruktionen bort. Dess kostnad räknas med
### Säkerhet & föräldrakontroll

- **4 åldersgrupper**: barn (≤10 år), tonåring (11-15), student (16-25), vuxen (26+)
- **Innehållsmoderering**: `mistral-moderation-2603` (Mistral Moderation 2) med 11 tillgängliga kategorier, varav 6 blockeras som standard för nya barn-/tonårsprofiler (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` lades till efter en mätning på 50 lektioner, inklusive historia, utan några falska positiva resultat). Kategorierna kan anpassas per profil i inställningarna; Moderation 2 har delat upp den tidigare kategorin ”farligt innehåll” i `dangerous` + `criminal` (befintliga profiler migreras automatiskt, och de blockerade kategorierna gäller även redan importerade källor). Säkerhet som standard: om modellens svar inte gör det möjligt att kontrollera en blockerad kategori avvisas innehållet (”Moderering ej tillgänglig”); när moderering är aktiv utesluter både generering och chatt flaggade källor, källor vars kontroll har misslyckats och källor som håller på att kontrolleras. En källa som aldrig har kontrollerats (importerad när moderering var avstängd, eller ett äldre projekt som kopplats till en profil) kontrolleras före användning. Moderering som avbrutits av en omstart återupptas vid uppstart om servernyckeln tillåter det; annars återupptas den, precis som moderering som misslyckats, när projektet öppnas eller vid nästa generering. Knappen ”Kontrollera igen” startar en ny kontroll på begäran. När moderering är aktiv döljs källans innehåll för barnet (förhandsvisning, text, originaldokument) tills källan bedömts som säker; en förälder kan visa det med sin PIN-kod, för en enda visning. Det muntliga svaret i röstquizet modereras innan det rättas. Ett daterat ID är fast angivet i `helpers/moderation-model.ts`: det utfasade aliaset `-latest` listas inte längre av API:et.
- **Föräldra-PIN**: SHA-256-hash, krävs för profiler under 15 år; högst 10 felaktiga koder per kvart och IP-adress (429 `rate_limited`). Vid produktionsdriftsättning bör en långsam hash med salt användas (Argon2id, bcrypt).
- **Serverdata**: `/output` publicerar endast projektens medier (ljud, bilder, importerade filer); `profiles.json`, `config.json`, `projects.json` och `project.json` tillhandahålls aldrig
- **Chattbegränsningar**: AI-chatt är avstängd som standard för barn under 16 år och kan aktiveras av föräldrar

### System med flera profiler

- Flera profiler med namn, ålder, avatar och språkinställningar
- **Röster per profil** (`Profile.mistralVoices?: { host?, guest? }` — varje roll är valfri) — varje barn kan ha sitt eget röstpar för podcast/röstquiz
- **Tema per profil** (`Profile.theme: 'dark' | 'light'`) — växlar automatiskt vid profilbyte och sparas i backend
- Projekt kopplas till profiler via `profileId`; ett äldre projekt utan profil kopplas till den första profil som öppnar det och modereras sedan enligt den profilen
- Kaskadradering: när en profil tas bort raderas alla dess projekt

### Uppföljning av API-kostnader

Varje debiterbart Mistral-anrop (chatt, OCR, STT, TTS, agents), inklusive identifiering av instruktioner och muntliga svar i röstquizet, instrumenteras för att ge användaren en **transparent** kostnadsuppskattning i €. Den kostnadsfria modereringen räknas inte med. Agenternas verktygsavgifter ingår: 0,03 $ per webbsökning och 0,10 $ per genererad bild (Mistrals priser), plus de tokens som verktygen producerar och som uppskattningen räknar enligt agentmodellens pris för input.

- **Auktoritativ källa**: `helpers/pricing.ts` — `MODEL_PRICING` per modellprefix (t.ex. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` med URL:er till Mistrals dokumentation för regelbunden omskrapning
- **Enheter som stöds**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konvertering styrd av `helpers/cost-calc.ts`
- **Instrumenteringskedja**: `helpers/tracked-client.ts` (omsluter Mistral-klienten) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (infogas i HTTP-svaret)
- **UI**: kostnadsmärke per generering (`src/partials/cost-badge-gen.html`), per källa (`cost-badge-src.html`), ackumulerad totalsumma i dashboard (`Project.totalCost`)
- **Endpoints**: svaren från `/generate/*` och `/sources/*` utökar det returnerade objektet (`Generation` / `Source`) med `estimatedCost`, `usage` och `costBreakdown`. `POST /generate/route` lägger till fältet `costDelta: number` för enbart routningskostnaden; `POST /detect-consigne` (`{consigne, costDelta}`) och kontrollen av ett muntligt svar returnerar också sitt `costDelta`. `GET /projects/:pid` returnerar projektet utökat med `totalCost` (summa beräknad från `costLog[]`) + hela historiken

### TTS (Mistral Voxtral) & anpassade röster

- **Mistral Voxtral TTS**: **Voxtral TTS** (`voxtral-mini-tts-2603`) som standard, **Voxtral TTS 3** (`voxtral-mini-tts-3-0`, förhandsversion från Mistral, inbyggda röster på fler språk) som alternativ i Inställningar; talsyntes helt via Mistral, ingen extra nyckel behövs. Endast röster som den valda modellen stöder erbjuds: Voxtral TTS avvisar röster som lagts till med Voxtral 3
- **Anpassade röster**: föräldrar kan skapa egna röster via Mistral Voices API (från ett ljudprov) och tilldela dem rollerna värd/gäst — podcasts och röstquiz läses då upp med en förälders röst, vilket gör upplevelsen ännu mer engagerande för barnet
- Två konfigurerbara röstroller: **värd** (huvudberättare) och **gäst** (podcastens andra röst)
- En fullständig katalog över Mistrals röster finns i inställningarna och kan filtreras efter språk
- Uppspelning (studieblad, podcast, diktamensord) pausas när man lämnar vyn och återupptas där den avbröts
- Ljudet för högläsning av flashcards skapas vid första uppspelningen och sparas sedan i deras generering: det återskapas eller debiteras inte på nytt varje gång man återvänder
- Källmarkörer (`[Source N]`) läses inte upp

### Internationalisering

- Gränssnittet finns på 9 språk: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompts stöder 15 språk (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Språk kan ställas in per profil

---

## Teknikstack

| Lager | Teknik | Roll |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server och typsäkerhet |
| **Backend** | Express 5.x | REST-API |
| **Utvecklingsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktivt gränssnitt, TypeScript kompilerat av Vite |
| **Templating** | vite-plugin-handlebars | HTML-komposition med partials |
| **AI** | Mistral AI SDK | Chatt, OCR, STT, TTS, Agents, moderering |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-2603` (Voxtral TTS 3 som alternativ), inbyggd talsyntes |
| **Ikoner** | Lucide 1.x | Bibliotek med SVG-ikoner |
| **Web scraping** | Readability + linkedom | Extrahering av webbsidors huvudinnehåll (tekniken bakom Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultralätt headless-webbläsare (Zig + V8) för JS-/SPA-sidor — fallback för scraping |
| **Markdown** | Marked | Markdown-rendering i chatten |
| **Filuppladdning** | Multer 2.x | Hantering av multipart-formulär |
| **Ljud** | ffmpeg-static | Sammanfogning av ljudsegment |
| **Tester** | Vitest | Enhetstester — täckning mätt av SonarCloud |
| **Persistens** | JSON-filer | Lagring utan beroenden |

---

## Modellreferens

| Modell | Användning | Varför |
|---|---|---|
| `mistral-large-latest` | Studieblad, Flashcards, Podcast, Quiz, lucktexter, chatt, rättning av röstquiz, Agent Image, Agent Web Search, identifiering av instruktioner | Bäst flerspråkighet + instruktionsföljning |
| `mistral-ocr-4-1` (OCR 4.1, standard) | OCR av dokument | Tryckt text, tabeller, handskrift ($4 / 1000 sidor) |
| `mistral-ocr-2512` (OCR 3, alternativ) | OCR av dokument | Kan väljas i Inställningar, billigare ($2 / 1000 sidor), läser handskrift bättre |
| `voxtral-mini-2602` (Voxtral Mini Transcribe 2, standard) | Taligenkänning (STT) | Röstinmatning och muntliga svar i röstquizet ($0.003 / min) |
| `voxtral-mini-transcribe-3-0` / `voxtral-small-transcribe-3-0` (Transcribe 3, alternativ, förhandsversion) | Taligenkänning (STT) | Kan väljas i Inställningar ($0.0035 / min respektive $0.004 / min) |
| `voxtral-mini-tts-2603` (Voxtral TTS, standard) | Talsyntes (TTS) | Podcasts, röstquiz, diktamen, högläsning ($16 / M tecken) |
| `voxtral-mini-tts-3-0` (Voxtral TTS 3, alternativ, förhandsversion) | Talsyntes (TTS) | Kan väljas i Inställningar, inbyggda röster på fler språk ($13 / M tecken) |
| `mistral-moderation-2603` | Innehållsmoderering | 6 blockerade kategorier för barn/tonåringar (inklusive `jailbreaking`) |
| `mistral-small-latest` | Automatisk router | Snabb innehållsanalys för routningsbeslut |

På telefon visar Inställningar den valda modellens fullständiga beteckning under varje väljare (pris, ”Rekommenderad” eller ”Förhandsversion”), eftersom den stängda menyn klippte av den.

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

> **Obs**: Mistral Voxtral TTS är den enda TTS-leverantören — ingen extra nyckel behövs utöver `MISTRAL_API_KEY`.

> **API-nyckel som anges av användaren**: `MISTRAL_API_KEY` är nu **valfri**. Om den saknas startar appen ändå och uppmanar varje användare att ange **sin egen Mistral-nyckel** i gränssnittet. Nyckeln **lagras i webbläsaren** (krypterad via Web Crypto + IndexedDB i en säker kontext) och skickas med varje begäran — **sparas aldrig på servern**. Prioritetsordning: profilnyckel > global webbläsarnyckel > `MISTRAL_API_KEY` (env). Om `EUREKAI_REQUIRE_USER_KEY=true` anges måste varje användare ange sin nyckel (miljönyckeln används då bara för förladdningar).

> **Lokal HTTPS (surfplatta/LAN)**: `localhost` är redan en säker kontext. För åtkomst via LAN (surfplatta), generera ett lokalt certifikat och aktivera HTTPS: webbläsaren kan då kryptera nyckeln den lagrar, och nyckeln krypteras under överföringen:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Miljövariabler

| Variabel | Krävs | Standard | Roll |
|---|---|---|---|
| `MISTRAL_API_KEY` | valfri | — | Mistral API-nyckel (chatt, OCR, STT, TTS Voxtral, agents, moderering). Om den saknas anger användaren sin nyckel i appen (lagras i webbläsaren, aldrig på servern) |
| `EUREKAI_REQUIRE_USER_KEY` | valfri | `false` | `true` → inaktiverar fallback till `MISTRAL_API_KEY` för AI-anrop (varje användare MÅSTE ange sin nyckel). Användbart på en exponerad instans |
| `HTTPS_KEY` / `HTTPS_CERT` | valfri | — | Sökvägar till TLS-nyckel/certifikat (se `scripts/gen-cert.sh`) → Express och Vite tillhandahåller HTTPS (säker kontext för LAN/surfplatta) |
| `PORT` | valfri | `3000` | HTTP-port för Express-backend |
| `NODE_ENV` | valfri | `development` | Om `production` → Express tillhandahåller frontend från `dist/` (annars `public/`) |
| `SONAR_TOKEN` | valfri i CI | — | Används endast av GitHub Actions-arbetsflödet för SonarCloud |

### Tester, kodkvalitet och bidrag

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)**: `pre-commit` kör i tur och ordning `scripts/pre-commit-fast.sh` (konflikter, stora filer, shellcheck), `lint-staged` och sedan `npm test`; `pre-push` kör först en blockerande kontroll med `npm audit` (blockerar så snart ett beroende, även transitivt, har en sårbarhet på nivån `critical`, se `scripts/audit-verdict.mjs`) och sedan `npm run security`. Varje hook blockerar commit/push så snart något av dess steg misslyckas.

**Externa verktyg (valfria för att starta applikationen, nödvändiga för `pretest` och `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Utan dessa verktyg misslyckas `npm test` vid `pretest` (lizard saknas) och `npm run security` misslyckas (opengrep saknas). Husky-hooks blockerar då commit/push.

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

> **`:U`**: flagga för rootless Podman som automatiskt justerar volymens behörigheter.

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

> **För AI-agenter som bidrar till koden**: se [`CLAUDE.md`](CLAUDE.md) (övergripande regler, index) och de detaljerade reglerna i [`.claude/rules/`](.claude/rules/), som läses in vid behov utifrån vilka filer som läses eller ändras, för detaljerad arkitekturkontext, obligatoriska regler (felkoder, cost tracking och prompts utan metaord, det vill säga utan beskrivningar av dokumentet såsom dess typ, eftersom modellen annars skulle kopiera dessa ord till sina utdata) och kända fallgropar (Lizard CCN, Opengrep, Codacy/Semgrep-migrering).

---

## API-referens

### Konfiguration
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/config` | Aktuell konfiguration |
| `PUT` | `/api/config` | Ändra konfigurationen (modeller, röster, TTS-modell) |
| `GET` | `/api/config/status` | API-status: `mistral` (Mistral-nyckel angiven), `ttsAvailable` (alias för `mistral`, Mistral Voxtral är den enda TTS-leverantören) |
| `POST` | `/api/config/reset` | Återställ standardkonfigurationen |
| `GET` | `/api/config/voices` | Lista Mistral TTS-röster (valfritt `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Tillgängliga modereringskategorier + standardvärden per ålder |
| `POST` | `/api/providers/mistral/validate` | Validera en Mistral-nyckel som användaren angett — alltid 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), ingen fallback till env |

### Profiler
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/profiles` | Lista alla profiler |
| `POST` | `/api/profiles` | Skapa en profil |
| `PUT` | `/api/profiles/:id` | Ändra en profil (PIN krävs för < 15 år; 10 felaktiga PIN / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Ta bort en profil + kaskadradera projekt `{pin?}` → `{ok, deletedProjects}` |

### Projekt
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects` | Lista projekt (`?profileId=` valfritt) |
| `POST` | `/api/projects` | Skapa ett projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektinformation; `?profileId=` kopplar ett projekt utan profil till den profil som öppnar det |
| `PUT` | `/api/projects/:pid` | Byt namn `{name}` |
| `DELETE` | `/api/projects/:pid` | Ta bort projektet |
| `GET` | `/api/projects/:pid/events` | SSE-ström i realtid (`event: generation`) för övergångar i genereringen (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Källor
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import av multipart-filer (OCR för JPG/PNG/PDF, direktläsning för TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Fritext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Röst STT (multipart-ljud) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping eller webbsökning `{query}` — returnerar en array med källor; 422 `url_blocked` om alla adresser avvisas (internt nätverk), 502 `all_sources_failed` om ingen källa kunde skapas |
| `POST` | `/api/projects/:pid/sources/moderate` | Återuppta väntande eller misslyckad moderering `{sourceIds?}` (högst 10 per anrop, väntetid ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ta bort en källa, dess importerade fil och instruktionen som är beroende av den → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderera `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Identifiera repetitionsinstruktioner (endast kontrollerade källor) → `{consigne, costDelta}` |
### Generering
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Repetitionsblad |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Flervalsquiz (4 alternativ, endast ett rätt svar) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lucktexter |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktamen (ord + exempelmeningar + regler, 1 TTS-ljud per ord; föreslås även av auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Röstquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptiv repetition `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Repetitionsblad inriktat på felbesvarade frågor i ett quiz `{generationId, weakQuestions}` — anropas parallellt med `quiz-review` av knappen för stödinsatser i quizvyn |
| `POST` | `/api/projects/:pid/generate/route` | Routinganalys (plan över generatorer som ska startas) — returnerar `{plan, costDelta}` (kostnaden för enbart routing) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatisk generering i backend (routing + 8 typer: `summary`, `flashcards`, `quiz`, `fill-blank`, `podcast`, `quiz-vocal`, `image`, `dictation`). Parallell körning — förutsätter en Mistral-nivå med rate-limit ≥ 8 samtidiga anrop; annars kan flera 429-fel returneras i `failedSteps`. |

Alla genereringsrutter accepterar `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; ett okänt `ageGroup` eller ett `lang` som inte är en giltig språkkod (förväntat: `fr`, `pt-BR`…) → 400 `invalid_input`, före alla AI-anrop. `quiz-review` och `remediation-summary` kräver dessutom `{generationId, weakQuestions}` och gäller källorna till det ursprungliga quizet.

### CRUD för genereringar
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Skicka in quizsvar `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Skicka in svar på lucktexter `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Skicka in diktamenssvar `{answers}` (strikt poängsättning på servern) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Kontrollera ett muntligt svar (ljud + questionIndex); det muntliga svaret modereras före kontrollen (avslag: 400 `quiz.answerBlocked`), kostnaden returneras i `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Högläsning med TTS (repetitionsblad/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Avbryt en pågående generering (enda sättet att avbryta en pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Byt namn `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ta bort genereringen och dess medier (ljud, bild) |

### Chatt
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Hämta chatthistoriken |
| `POST` | `/api/projects/:pid/chat` | Skicka ett meddelande `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Rensa chatthistoriken |

---

## Arkitekturbeslut

| Beslut | Motivering |
|---|---|
| **Alpine.js framför React/Vue** | Minimalt resursbehov, lättviktig reaktivitet med TypeScript kompilerat av Vite. Perfekt för ett hackathon där snabbhet räknas. |
| **Lagring i JSON-filer** | Inga beroenden, omedelbar start. Ingen databas att konfigurera — bara att starta och köra. |
| **Vite + Handlebars** | Det bästa av två världar: snabb HMR för utveckling, HTML-partials för kodorganisation, Tailwind JIT. |
| **Centraliserade prompts** | Alla AI-prompts i `prompts.ts` — enkelt att iterera, testa och anpassa efter språk/åldersgrupp. |
| **System med flera genereringar** | Varje generering är ett oberoende objekt med eget ID — möjliggör flera repetitionsblad, quiz osv. per kurs. |
| **Åldersanpassade prompts** | 4 åldersgrupper med olika ordförråd, komplexitet och ton — samma innehåll lärs ut på olika sätt beroende på den som lär sig. |
| **Agentbaserade funktioner** | Bildgenerering och webbsökning använder tillfälliga Mistral Agents — välhanterad livscykel med automatisk rensning. |
| **Intelligent URL-scraping** | Ett enda fält accepterar en blandning av URL:er och sökord — URL:er skrapas via Readability (statiska sidor) med Lightpanda som fallback (JS/SPA-sidor), sökorden aktiverar en Mistral Agent med web_search. Varje resultat skapar en oberoende källa. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (ingen extra nyckel utöver `MISTRAL_API_KEY`) — talsyntes integrerad i kostnadskedjan och valet av röst per språk. |

---

## Erkännanden & tack

- **[Mistral AI](https://mistral.ai)** — AI-modeller (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lättviktigt reaktivt ramverk
- **[TailwindCSS](https://tailwindcss.com)** — CSS-ramverk med utility-klasser
- **[Vite](https://vitejs.dev)** — Byggverktyg för frontend
- **[Lucide](https://lucide.dev)** — Ikonbibliotek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extrahering av webbinnehåll (tekniken bakom Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralätt headless-webbläsare för scraping av JS/SPA-sidor
- **[Luciole](https://luciole-vision.com)** — Typsnitt utformat för läsare med synnedsättning, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (profilalternativet ”Läskomfort”)

Påbörjat under Mistral AI Worldwide Hackathon (mars 2026), helt utvecklat med AI med hjälp av [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Författare

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licens

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel översatt från franska till svenska med gpt-6.1-sol.**
