<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Förvandla vilket innehåll som helst till en interaktiv inlärningsupplevelse — drivs av <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

## Historien — Varför EurekAI?

**EurekAI** föddes under [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiell webbplats](https://worldwide-hackathon.mistral.ai/)) (mars 2026). Jag behövde ett ämne — och idén kom från något väldigt konkret: jag pluggar regelbundet inför prov med min dotter, och jag tänkte att det borde vara möjligt att göra det mer lekfullt och interaktivt med hjälp av AI.

Målet: ta **vilken indata som helst** — ett foto av lektionen, en kopierad och inklistrad text, en röstinspelning, en webbsökning — och förvandla det till **sammanfattningar, flashcards, frågesporter, poddar, lucktexter, illustrationer och mycket mer**. Allt drivet av franska modeller från Mistral AI, vilket gör det till en lösning som är naturligt anpassad för fransktalande elever.

Den [ursprungliga prototypen](https://github.com/jls42/worldwide-hackathon.mistral.ai) togs fram under 48 timmar under hackathonet som ett konceptbevis kring Mistral-tjänsterna — redan funktionell, men begränsad. Sedan dess har EurekAI vuxit till ett riktigt projekt: lucktexter, övningsnavigering, webbskrapning, konfigurerbar föräldramoderering, djupgående kodgranskning och mycket mer. Hela koden är AI-genererad — främst [Claude Code](https://code.claude.com/), med några bidrag via [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Översikt

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Guidad tur i EurekAI: källor, sammanfattning, frågesport, flashcards, illustrationer" width="820" />
</p>

| | |
|---|---|
| ![Kontrollpanel](docs/screenshots/dashboard.webp)<br>**Kontrollpanel** — senaste genereringar, beräknad kostnad per kort och totalt för projektet, knappen ”Auto — Magi!” | ![Källor](docs/screenshots/sources.webp)<br>**Källor** — import av foto/PDF/text/röst/webb, generering med ett klick, instruktionsidentifiering |

Varje importerad källa visar sin [OCR-konfidenspoäng, moderering och beräknade kostnad](docs/screenshots/sources-list.webp).

### Komponenterna i aktion

| | |
|---|---|
| ![Sammanfattning](docs/screenshots/notes.gif)<br>**Sammanfattning** — nyckelpunkter, ordförråd, källhänvisade citat, ljuduppläsning per avsnitt | ![Frågesport](docs/screenshots/quiz.gif)<br>**Flervalsfrågesport** — omedelbar feedback med förklaring, steg-för-steg-navigering |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — vänd kortet och självutvärdera ”jag visste / jag visste inte” | ![Lucktexter](docs/screenshots/fillblank.gif)<br>**Lucktexter** — ledtråd på begäran, tolerant validering |
| ![Diktamen](docs/screenshots/dictation.gif)<br>**Diktamen** — uppläst ord i ljudformat, strikt rättning bokstav för bokstav | ![Röstfrågesport](docs/screenshots/vocal-quiz.gif)<br>**Röstfrågesport** — fråga läses upp högt, svar via mikrofon |
| ![Podd](docs/screenshots/podcast.gif)<br>**Podd** — minipodd med 2 röster, läsbart dialogmanus | ![Illustrationer](docs/screenshots/illustrations.gif)<br>**Illustrationer** — utbildningsbilder genererade av Agent |
| ![AI-handledare](docs/screenshots/chat.gif)<br>**AI-handledare** — chatt förankrad i kursdokumenten, förklarade svar, kan generera frågesporter och flashcards | |

### Komma igång

| | |
|---|---|
| ![Profilval](docs/screenshots/login.gif)<br>**Profilval** — varje barn har sitt eget utrymme, sin avatar och sitt språk | ![Skapa profil](docs/screenshots/profile-create.gif)<br>**Skapa profil** — ålder, avatar, föräldra-PIN för under 15 år |
| ![Skapa kurs](docs/screenshots/course.gif)<br>**Skapa kurs** — ett projekt per lektion, redo att ta emot källor | ![Inställningar](docs/screenshots/settings.gif)<br>**Inställningar** — API-status, val av AI-modeller med visade priser |

---

## Funktioner

| | Funktion | Beskrivning |
|---|---|---|
| 📷 | **Filimport** | Importera dina lektioner — foto, PDF (via Mistral OCR med medelvärdesberäknad konfidenspoäng, nivåerna `high`/`medium`/`low`) eller textfil (TXT, MD). Uppladdningssessioner med återförsök per fil och individuellt förlopp |
| 📝 | **Textinmatning** | Skriv eller klistra in valfri text direkt |
| 🎤 | **Röstinmatning** | Spela in dig själv — Voxtral STT transkriberar din röst |
| 🌐 | **Webb / URL** | Klistra in en URL (direkt skrapning via Readability + Lightpanda) eller skriv en sökning (Mistral-agent web_search) |
| 📄 | **Sammanfattningar** | Strukturerade anteckningar med nyckelpunkter, ordförråd, citat, kuriosa |
| 🃏 | **Flashcards** | Interaktiva F/S-kort, dialogbaserad ljuduppläsning |
| ❓ | **Flervalsfrågesport** | Flervalsfrågor med adaptiv repetition av felaktiga svar (konfigurerbart antal) |
| ✏️ | **Lucktexter** | Övningar att fylla i med ledtrådar och tolerant validering |
| 🔤 | **Diktamen** | Upplästa ord i ljudformat (Voxtral TTS) från en importerad lista, tangentbordsinmatning, strikt rättning bokstav för bokstav med förklarad stavningsregel |
| 🎙️ | **Podd** | Minipodd med 2 röster som ljud — Mistral-standardröster eller anpassade röster (föräldrar!) |
| 🖼️ | **Illustrationer** | Utbildningsbilder genererade av en Mistral-agent |
| 🗣️ | **Röstfrågesport** | Frågor som läses upp högt (möjlighet till anpassad röst), muntligt svar, AI-verifiering |
| 💬 | **AI-handledare** | Kontextuell chatt med dina kursdokument, med verktygsanrop |
| 🧠 | **Automatisk router** | En router baserad på `mistral-small-latest` analyserar innehållet och föreslår en kombination av generatorer bland de 8 tillgängliga typerna |
| 🔒 | **Föräldrakontroll** | Konfigurerbar moderering per profil (anpassningsbara kategorier), föräldra-PIN, chattbegränsningar |
| 🌍 | **Flerspråkig** | Gränssnittet finns på 9 språk; AI-generering kan styras på 15 språk via prompter |
| 🔊 | **Högläsning** | Lyssna på sammanfattningar och flashcards (fråga/svar-dialog) via Mistral Voxtral TTS |
| 💶 | **API-kostnadsuppföljning** | Transparent uppskattning av kostnaden i € för varje generering och källa (tokens / tecken / sidor / ljudsekunder). Badge per kort + totalt per projekt, synligt i kontrollpanelen |
| 🎨 | **Tema per profil** | Varje profil väljer sitt tema (`dark` eller `light`) — bevaras vid profilbyte |

---

## Arkitekturöversikt

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Karta över modellanvändning

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Användarresa

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Fördjupning — Funktioner

### Multimodal inmatning

EurekAI accepterar 4 typer av källor, modererade utifrån profilen (aktiverat som standard för barn och tonåring):

- **Filimport** — JPG-, PNG- eller PDF-filer som behandlas med Mistral OCR — **OCR 4 (`mistral-ocr-4-0`) som standard** (bästa kvalitet), **OCR 3 (`mistral-ocr-2512`) som tillval** i Inställningar (billigare, ~½ av kostnaden) — för tryckt text, tabeller och handstil; eller textfiler (TXT, MD) som importeras direkt. Flerfilsuppladdningar använder ett system med **uppladdningssessioner**: individuellt förlopp per fil, återförsök för misslyckad fil utan att skicka in de andra igen, avfärdande av sessionen när den är klar. OCR visar en medelvärdesberäknad **konfidenspoäng** (`average`, begränsad till `[0,1]`, beräknad från `averagePageConfidenceScore` som returneras av Mistral), som visas i användargränssnittet som en nivåbadge (`high` / `medium` / `low`, tröskelvärden ~0.9 / ~0.7) — varnar utan att blockera om skanningen är av dålig kvalitet. Kopian av dokumentet som skickas till Mistral för OCR raderas så snart behandlingen är klar, även vid fel.
- **Fritext** — Skriv eller klistra in valfritt innehåll. Modereras före lagring om moderering är aktiv.
- **Röstinmatning** — Spela in ljud i webbläsaren. Transkriberas av `voxtral-mini-latest`. Parametern `language="fr"` optimerar igenkänningen.
- **Webb / URL** — Klistra in en eller flera URL:er för att skrapa innehållet direkt (Readability + Lightpanda för JS-sidor), eller skriv sökord för en webbsökning via Mistral-agent. Det gemensamma fältet accepterar båda — URL:er och sökord separeras automatiskt, och varje resultat skapar en oberoende källa.

### Generering av AI-innehåll

Åtta typer av genererat studiematerial:

| Generator | Modell | Utdata |
|---|---|---|
| **Sammanfattning** | `mistral-large-latest` | Titel, sammanfattning, nyckelpunkter, ordförråd, citat, kuriosa |
| **Flashcards** | `mistral-large-latest` | F/S-kort med källhänvisningar (konfigurerbart antal) |
| **Flervalsfrågesport** | `mistral-large-latest` | Flervalsfrågor, förklaringar, adaptiv repetition (konfigurerbart antal) |
| **Lucktexter** | `mistral-large-latest` | Meningar att komplettera med ledtrådar, tolerant validering (Levenshtein) |
| **Diktamen** | `mistral-large-latest` + Voxtral TTS | Upplästa nyckelord som ljud (1 MP3/ord) → tangentbordsinmatning → strikt rättning (accenter) med förklarad regel |
| **Podd** | `mistral-large-latest` + Voxtral TTS | 2-rösters manus → MP3-ljud |
| **Illustration** | Agent `mistral-large-latest` | Utbildningsbild via verktyget `image_generation` |
| **Röstfrågesport** | `mistral-large-latest` + Voxtral TTS + STT | TTS-frågor → STT-svar → AI-verifiering |

### AI-handledare via chatt

En samtalsbaserad handledare med full tillgång till kursdokumenten:

- Använder `mistral-large-latest`
- **Verktygsanrop**: kan generera sammanfattningar, flashcards, frågesporter eller lucktexter under samtalets gång
- Historik med 50 meddelanden per kurs
- Moderering om det är aktiverat för profilen: meddelandet kontrolleras, och källor som flaggats, vars kontroll misslyckades eller som ännu inte har kontrollerats utesluts från kontexten såväl som från verktygen (deras kontroll startas först om, högst 5 s)

### Automatisk router

Routern använder `mistral-small-latest` för att analysera innehållet i källorna och föreslå de mest relevanta generatorerna bland de 8 tillgängliga. Gränssnittet visar förloppet i realtid: först en analysfas, sedan individuella genereringar med möjlighet att avbryta.

### Adaptivt lärande

- **Frågesportsstatistik**: uppföljning av försök och träffsäkerhet per fråga
- **Repetition av frågesport**: genererar 5–10 nya frågor inriktade på svaga koncept, baserat på källorna från den ursprungliga frågesporten (modereringsspärren omfattar samma källor)
- **Instruktionsidentifiering**: upptäcker repetitionsinstruktioner ("Jag kan min lektion om jag kan...") och prioriterar dem i kompatibla textgeneratorer (sammanfattning, flashcards, frågesport, lucktexter). Med aktiv moderering väntar identifieringen på att källorna ska kontrolleras och läser endast de som bedömts som säkra; instruktionen behåller listan över sina ursprungliga källor, varken visas eller tillämpas om någon av dem blir flaggad, och försvinner tillsammans med den. Dess kostnad räknas in

### Säkerhet & föräldrakontroll

- **4 åldersgrupper**: barn (≤10 år), tonåring (11–15), student (16–25), vuxen (26+)
- **Innehållsmoderering**: `mistral-moderation-2603` (Mistral Moderation 2) med 11 tillgängliga kategorier, varav 6 blockerade som standard för nya barn-/tonårsprofiler (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` lades till efter en mätning på 50 lektioner, inklusive historia, utan några falska positiva). Kategorierna kan anpassas per profil i inställningarna; Moderation 2 delade upp den tidigare kategorin ”farligt innehåll” i `dangerous` + `criminal` (befintliga profiler migreras automatiskt, och blockerade kategorier tillämpas även på redan importerade källor). Säkerhet som standard: om modellens svar inte gör det möjligt att verifiera en blockerad kategori nekas innehållet (”Moderering ej tillgänglig”); med aktiv moderering utesluter såväl generering som chatt källor som flaggats, vars kontroll misslyckades eller som håller på att verifieras. En källa som aldrig har kontrollerats (importerad med avaktiverad moderering, gammalt kopplat projekt) kontrolleras före användning; en moderering som avbrutits av en omstart eller stött på ett fel återupptas automatiskt (vid uppstart om servernyckeln tillåter det, annars när projektet öppnas eller vid nästa generering), och knappen ”Kontrollera igen” startar om den på begäran. Innehållet i en flaggad källa eller en källa under kontroll döljs för barnet (förhandsgranskning, text, originaldokument); en förälder kan visa det med sin PIN-kod under en enskild granskning. Det muntliga svaret i röstfrågesporten modereras innan det verifieras. Daterat id fäst i `helpers/moderation-model.ts`: det föråldrade aliaset `-latest` listas inte längre av API:et.
- **Föräldra-PIN**: SHA-256-hash, krävs för profiler under 15 år; högst 10 felaktiga koder per kvart och IP-adress (429 `rate_limited`). För produktionsdriftsättning bör en långsam hash med salt användas (Argon2id, bcrypt).
- **Serverdata**: `/output` publicerar endast projektmedier (ljud, bilder, importerade filer); `profiles.json`, `config.json` och projektfiler exponeras aldrig
- **Chattbegränsningar**: AI-chatt är inaktiverad som standard för personer under 16 år, kan aktiveras av föräldrar

### Multiprofilsystem

- Flera profiler med namn, ålder, avatar, språkinställningar
- **Röster per profil** (`Profile.mistralVoices?: { host?, guest? }` — varje roll är valfri) — varje barn kan ha sitt eget par av röster för podd/röstfrågesport
- **Tema per profil** (`Profile.theme: 'dark' | 'light'`) — växlar automatiskt vid profilbyte, bevaras på serversidan
- Projekt kopplade till profiler via `profileId`; ett äldre projekt utan profil knyts till den första profilen som öppnar det och modereras sedan utifrån den profilen
- Kaskadradering: att ta bort en profil raderar alla dess projekt

### Spårning av API-kostnader

Varje debiterbart Mistral-anrop (chatt, OCR, STT, TTS, agenter), inklusive instruktionsidentifiering och muntliga svar i röstfrågesporten, är instrumenterat för att ge användaren en **transparent** uppskattning i €. Moderering, som är gratis, räknas inte. Agenternas verktygskostnader ingår: 0,03 $ per webbsökning och 0,10 $ per genererad bild (Mistral-priser), plus tokens som produceras av dessa verktyg, vilka räknas enligt agentmodellens input-taxa.

- **Sanningskälla**: `helpers/pricing.ts` — `MODEL_PRICING` per modellprefix (t.ex. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` med Mistral-dok-URL:er för regelbunden om-scraping
- **Enheter som stöds**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konvertering styrd av `helpers/cost-calc.ts`
- **Instrumenteringskedja**: `helpers/tracked-client.ts` (wrap Mistral-klient) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injektering i HTTP-svaret)
- **UI**: kostnadsbricka per generering (`src/partials/cost-badge-gen.html`), per källa (`cost-badge-src.html`), ackumulerad totalsumma i instrumentpanelen (`Project.totalCost`)
- **Slutpunkter**: svaren `/generate/*` och `/sources/*` dekorerar det returnerade objektet (Generation / Source) med `estimatedCost`, `usage` och `costBreakdown`. `POST /generate/route` lägger till ett fält `costDelta: number` för enbart routningskostnaden; `POST /detect-consigne` (`{consigne, costDelta}`) och verifieringen av ett muntligt svar returnerar också sin `costDelta`. `GET /projects/:pid` returnerar projektet berikat med `totalCost` (summa beräknad från `costLog[]`) + hela historiken

### TTS (Mistral Voxtral) & anpassade röster

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, talsyntes 100 % Mistral, ingen extra nyckel krävs
- **Anpassade röster**: föräldrar kan skapa sina egna röster via API:et Mistral Voices (från ett ljudprov) och tilldela dem till rollerna värd/gäst — poddar och röstfrågesporter läses då upp med en förälders röst, vilket gör upplevelsen ännu mer engagerande för barnet
- Två konfigurerbara röstroller: **värd** (huvudberättare) och **gäst** (poddens andra röst)
- Komplett katalog över Mistral-röster tillgänglig i inställningarna, filtrerbar efter språk

### Internationalisering

- Gränssnitt tillgängligt på 9 språk: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompter stöder 15 språk (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Språk konfigurerbart per profil

---

## Teknisk stack

| Lager | Teknik | Roll |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server och typsäkerhet |
| **Backend** | Express 5.x | REST-API |
| **Utvecklingsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktivt gränssnitt, TypeScript kompilerat av Vite |
| **Templating** | vite-plugin-handlebars | HTML-komposition via partials |
| **AI** | Mistral AI SDK 2.x | Chatt, OCR, STT, TTS, agenter, moderering |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrerad talsyntes |
| **Ikoner** | Lucide 1.x | SVG-ikonbibliotek |
| **Webbskrapning** | Readability + linkedom | Extrahering av huvudinnehåll från webbsidor (teknik från Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultralätt headless-webbläsare (Zig + V8) för JS/SPA-sidor — fallback-scraping |
| **Markdown** | Marked | Markdown-rendering i chatten |
| **Filuppladdning** | Multer 2.x | Hantering av multipart-formulär |
| **Audio** | ffmpeg-static | Sammankoppling av ljudsegment |
| **Tester** | Vitest | Enhetstester — täckning mätt med SonarCloud |
| **Persistens** | JSON-filer | Beroendefri lagring |

---

## Modellreferens

| Modell | Användning | Varför |
|---|---|---|
| `mistral-large-latest` | Sammanfattning, flashcards, podd, frågesport, lucktexter, chatt, verifiering av röstfrågesport, bildagent, webbsökningsagent, instruktionsidentifiering | Bästa flerspråkighet + instruktionsföljsamhet |
| `mistral-ocr-4-0` (OCR 4, standard) | Dokument-OCR — överlägsen kvalitet | Tryckt text, tabeller, handstil ($4 / 1000 sidor) |
| `mistral-ocr-2512` (OCR 3, tillval) | Dokument-OCR | Valbar i Inställningar, billigare ($2 / 1000 sidor) |
| `voxtral-mini-latest` | Röstigenkänning (STT) | Flerspråkig STT, optimerad med `language="fr"` |
| `voxtral-mini-tts-latest` | Talsyntes (TTS) | Poddar, röstfrågesport, uppläsning |
| `mistral-moderation-2603` | Innehållsmoderering | 6 blockerade kategorier för barn/tonåringar (inklusive `jailbreaking`) |
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

> **Observera**: Mistral Voxtral TTS är den enda TTS-leverantören — ingen extra nyckel behövs utöver `MISTRAL_API_KEY`.

> **Användarangiven API-nyckel**: `MISTRAL_API_KEY` är numera **valfri**. Om den saknas startar appen ändå och uppmanar varje användare att ange **sin egen Mistral-nyckel** i gränssnittet. Nyckeln **lagras i webbläsaren** (krypterad via Web Crypto + IndexedDB i en säker kontext) och skickas per förfrågan — **sparas aldrig på servern**. Prioritetsordning: profilnyckel > global webbläsarnyckel > `MISTRAL_API_KEY` (env). Att ange `EUREKAI_REQUIRE_USER_KEY=true` tvingar varje användare att tillhandahålla sin nyckel (miljövariabelnyckeln används då endast för förinläsning).

> **Lokal HTTPS (surfplatta/LAN)**: `localhost` är redan en säker kontext. För LAN-åtkomst (surfplatta), generera ett lokalt certifikat och aktivera HTTPS för att låsa upp webbläsarkryptering + kryptera nyckeln under överföring:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Miljövariabler

| Variabel | Krävs | Standard | Roll |
|---|---|---|---|
| `MISTRAL_API_KEY` | valfri | — | Mistral API-nyckel (chatt, OCR, STT, Voxtral TTS, agenter, moderering). Om den saknas anger användaren sin nyckel i appen (lagras i webbläsaren, aldrig på servern) |
| `EUREKAI_REQUIRE_USER_KEY` | valfri | `false` | `true` → inaktiverar fallback till `MISTRAL_API_KEY` för AI-förfrågningar (varje användare MÅSTE tillhandahålla sin nyckel). Användbart på en exponerad instans |
| `HTTPS_KEY` / `HTTPS_CERT` | valfri | — | TLS-sökvägar för nyckel/certifikat (se `scripts/gen-cert.sh`) → Express och Vite körs via HTTPS (säker kontext LAN/surfplatta) |
| `PORT` | valfri | `3000` | HTTP-port för Express-backend |
| `NODE_ENV` | valfri | `development` | Om `production` → Express levererar frontend från `dist/` (annars `public/`) |
| `SONAR_TOKEN` | valfri för CI | — | Används endast av SonarCloud GitHub Actions-arbetsflödet |

### Tester, kodkvalitet och bidrag

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)**: `pre-commit` kör i följd `scripts/pre-commit-fast.sh` (konflikter, stora filer, shellcheck), `lint-staged` och sedan `npm test`; `pre-push` kör först en kontrollgate med `npm audit` (blockerar vid transitiv kritisk sårbarhet, se `scripts/audit-verdict.mjs`) och sedan `npm run security`. Alla blockerar commit/push vid fel.

**Externa verktyg som krävs (valfria men används av `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Utan dessa verktyg misslyckas `npm test` vid `pretest` (lizard saknas) och `npm run security` misslyckas (opengrep saknas). Husky-hooks blockerar då commit/push.

---

## Distribution med container

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

> **`:U`** är en rootless Podman-flagga som automatiskt justerar volymbehörigheterna.

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

> **För AI-bidragsgivare**: se [`CLAUDE.md`](CLAUDE.md) för detaljerad arkitekturkontext, obligatoriska regler (skydd mot promptläckor, felkoder, kostnadsuppföljning) och kända fällor (Lizard CCN, Opengrep, Codacy/Semgrep-migrering).

---

## API-referens

### Konfiguration
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `GET` | `/api/config` | Aktuell konfiguration |
| `PUT` | `/api/config` | Ändra konfigurationen (modeller, röster, TTS-modell) |
| `GET` | `/api/config/status` | API-status: `mistral` (Mistral-nyckel definierad), `ttsAvailable` (alias för `mistral`, Mistral Voxtral är den enda TTS-leverantören) |
| `POST` | `/api/config/reset` | Återställ konfigurationen till standardvärden |
| `GET` | `/api/config/voices` | Lista Mistral TTS-röster (valfritt `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Tillgängliga modereringskategorier + standardvärden efter ålder |
| `POST` | `/api/providers/mistral/validate` | Validera en användarangiven Mistral-nyckel — alltid 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), ingen fallback till miljövariabel |

### Profiler
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `GET` | `/api/profiles` | Lista alla profiler |
| `POST` | `/api/profiles` | Skapa en profil |
| `PUT` | `/api/profiles/:id` | Ändra en profil (PIN-kod krävs för < 15 år; 10 felaktiga PIN-koder / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Ta bort en profil + kaskadborttagning av projekt `{pin?}` → `{ok, deletedProjects}` |

### Projekt
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `GET` | `/api/projects` | Lista projekt (`?profileId=` valfritt) |
| `POST` | `/api/projects` | Skapa ett projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektdetaljer; `?profileId=` kopplar ett projekt utan profil till profilen som öppnar det |
| `PUT` | `/api/projects/:pid` | Byt namn `{name}` |
| `DELETE` | `/api/projects/:pid` | Ta bort projektet |
| `GET` | `/api/projects/:pid/events` | SSE-realtidsflöde (`event: generation`) för genereringsövergångar (`completed`/`failed`/`cancelled`) + keep-alive-heartbeat |

### Källor
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importera multipart-filer (OCR för JPG/PNG/PDF, direktläsning för TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Fritext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-röst (multipart-ljud) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping eller webbsökning `{query}` — returnerar en array med källor; 422 `url_blocked` om alla adresser nekas (internt nätverk), 502 `all_sources_failed` om ingen källa kunde skapas |
| `POST` | `/api/projects/:pid/sources/moderate` | Återuppta väntande eller misslyckade modereringar `{sourceIds?}` (högst 10 per anrop, väntetid ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ta bort en källa, dess importerade fil och den instruktion som beror på den → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderera `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Identifiera repetitionsinstruktioner (endast verifierade källor) → `{consigne, costDelta}` |

### Generering
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Sammanfattning |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Flervalsfrågesport |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lucktexter |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktamen (ord + exempelmeningar + regler, 1 TTS-ljud per ord; föreslås även av den automatiska routern) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podd |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Röstfrågesport |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptiv repetition `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Riktat repetitionsblad baserat på felaktigt besvarade quizfrågor `{generationId, weakQuestions}` — anropas parallellt med `quiz-review` via knappen "Träna på mina misstag" |
| `POST` | `/api/projects/:pid/generate/route` | Routningsanalys (plan över generatorer som ska köras) — returnerar `{plan, costDelta}` (enbart routningskostnaden) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatisk backend-generering (routning + 8 typer: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Körs parallellt — förutsätter en Mistral-nivå med hastighetsgräns (rate limit) på ≥ 8 samtidiga förfrågningar; annars kan flera 429-fel returneras i `failedSteps`. |

Alla genereringsrutter accepterar `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; en `lang` som inte är en språkkod (t.ex. `pt-BR`) eller en okänd `ageGroup` → 400 `invalid_input`, före varje AI-anrop. `quiz-review` och `remediation-summary` kräver dessutom `{generationId, weakQuestions}` och baseras på det ursprungliga quizets källor.

### CRUD Genereringar
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Skicka in quizsvar `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Skicka in svar för lucktexter `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Skicka in diktamensvar `{answers}` (strikt serverpoängsättning) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verifiera ett muntligt svar (ljud + questionIndex); modererat svar (400 `quiz.answerBlocked`), kostnad returneras i `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-uppläsning (sammanfattningar/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Avbryt en pågående generering (enda sättet att avbryta en pågående/pending generering) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Byt namn `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ta bort genereringen och dess mediefiler (ljud, bild) |

### Chatt
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Hämta chatthistorik |
| `POST` | `/api/projects/:pid/chat` | Skicka ett meddelande `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Rensa chatthistorik |

---

## Arkitektoniska beslut

| Beslut | Motivering |
|---|---|
| **Alpine.js istället för React/Vue** | Minimalt fotavtryck, lättviktig reaktivitet med TypeScript kompilerat av Vite. Perfekt för ett hackathon där hastighet räknas. |
| **Persistens i JSON-filer** | Noll beroenden, omedelbar start. Ingen databas att konfigurera — starta och kör. |
| **Vite + Handlebars** | Det bästa av två världar: snabb HMR för utveckling, HTML-partials för kodstruktur, Tailwind JIT. |
| **Centraliserade prompter** | Alla AI-prompter i `prompts.ts` — enkelt att iterera, testa och anpassa per språk/åldersgrupp. |
| **Multigenereringssystem** | Varje generering är ett oberoende objekt med ett eget ID — tillåter flera sammanfattningar, frågesporter etc. per kurs. |
| **Åldersanpassade prompter** | 4 åldersgrupper med olika ordförråd, komplexitet och ton — samma innehåll lärs ut på olika sätt beroende på vem som lär sig. |
| **Agentbaserade funktioner** | Bildgenerering och webbsökning använder tillfälliga Mistral-agenter — ren livscykel med automatisk rensning. |
| **Intelligent URL-scraping** | Ett enda fält accepterar en blandning av URL:er och sökord — URL:er scrapas via Readability (statiska sidor) med Lightpanda som fallback (JS/SPA-sidor), sökord utlöser en Mistral web_search-agent. Varje resultat skapar en oberoende källa. |
| **TTS 100 % Mistral** | Mistral Voxtral TTS (ingen extra nyckel utöver `MISTRAL_API_KEY`) — talsyntes integrerad i kostnadskedjan och röstupplösning per språk. |

---

## Tack & erkännanden

- **[Mistral AI](https://mistral.ai)** — AI-modeller (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lättviktigt reaktivt ramverk
- **[TailwindCSS](https://tailwindcss.com)** — Verktygsbaserat CSS-ramverk
- **[Vite](https://vitejs.dev)** — Frontend-byggverktyg
- **[Lucide](https://lucide.dev)** — Ikonbibliotek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extrahering av webbinnehåll (teknik från Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralätt headless-webbläsare för webbskrapning av JS/SPA-sidor
- **[Luciole](https://luciole-vision.com)** — Typsnitt utformat för synsvaga läsare, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (alternativet ”Läskomfort” i profilerna)

Initierat under Mistral AI Worldwide Hackathon (mars 2026), utvecklat helt av AI med [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Författare

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licens

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel översatt från fr till sv med gemini-3.8-flash-medium.**
