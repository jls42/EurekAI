<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logotyp" width="120" />
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

## Berättelsen — Varför EurekAI?

**EurekAI** föddes under [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiell webbplats](https://worldwide-hackathon.mistral.ai/)) (mars 2026). Jag behövde ett ämne — och idén kom från något mycket konkret: jag förbereder regelbundet prov tillsammans med min dotter, och jag tänkte att det måste gå att göra det mer lekfullt och interaktivt med hjälp av AI.

Målet: ta **vilken indata som helst** — ett foto av lektionen, en inkopierad text, en röstinspelning, en webbsökning — och förvandla den till **repetitionsanteckningar, flashcards, quiz, poddar, lucktexter, illustrationer och mer**. Allt drivs av de franska modellerna från Mistral AI, vilket gör det till en lösning som naturligt passar fransktalande elever.

Den [ursprungliga prototypen](https://github.com/jls42/worldwide-hackathon.mistral.ai) skapades på 48 timmar under hackathonet som ett konceptbevis kring Mistral-tjänsterna — redan fungerande, men begränsad. Sedan dess har EurekAI blivit ett riktigt projekt: lucktexter, navigering i övningar, webbskrapning, konfigurerbar föräldramoderering, djupgående kodgranskning och mycket mer. Hela koden genereras av AI — främst [Claude Code](https://code.claude.com/), med några bidrag via [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Översikt

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Guided tour av EurekAI: källor, anteckning, quiz, flashcards, illustrationer" width="820" />
</p>

| | |
|---|---|
| ![Instrumentpanel](docs/screenshots/dashboard.webp)<br>**Instrumentpanel** — senaste genereringar, uppskattad kostnad per kort och totalt för projektet, knappen « Auto — Magi! » | ![Källor](docs/screenshots/sources.webp)<br>**Källor** — import av foto/PDF/text/röst/webb, generering med ett klick, detektering av instruktioner |

Varje importerad källa visar sin [OCR-konfidenspoäng, sin moderering och sin uppskattade kostnad](docs/screenshots/sources-list.webp).

### Komponenterna i praktiken

| | |
|---|---|
| ![Repetitionsanteckning](docs/screenshots/notes.gif)<br>**Repetitionsanteckning** — nyckelpunkter, ordförråd, källhänvisade citat, uppläsning per avsnitt | ![Quiz](docs/screenshots/quiz.gif)<br>**Flervalsquiz** — omedelbar feedback med förklaring, steg-för-steg-navigering |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — vändbart kort och sedan självbedömning « jag kunde / jag kunde inte » | ![Lucktexter](docs/screenshots/fillblank.gif)<br>**Lucktexter** — ledtråd på begäran, tolerant validering |
| ![Diktamen](docs/screenshots/dictation.gif)<br>**Diktamen** — ord uppläst i ljud, strikt bokstav-för-bokstav-rättning | ![Röstquiz](docs/screenshots/vocal-quiz.gif)<br>**Röstquiz** — fråga uppläst högt, svar via mikrofon |
| ![Podd](docs/screenshots/podcast.gif)<br>**Podd** — mini-podd med 2 röster, dialogmanus som kan läsas | ![Illustrationer](docs/screenshots/illustrations.gif)<br>**Illustrationer** — utbildningsbilder genererade av Agent |
| ![AI-tutor](docs/screenshots/chat.gif)<br>**AI-tutor** — chatt förankrad i kursdokumenten, förklarade svar, kan generera quiz och flashcards | |

### Kom igång

| | |
|---|---|
| ![Val av profil](docs/screenshots/login.gif)<br>**Val av profil** — varje barn har sitt utrymme, sin avatar och sitt språk | ![Skapa profil](docs/screenshots/profile-create.gif)<br>**Skapa profil** — ålder, avatar, föräldra-PIN för under 15 år |
| ![Skapa kurs](docs/screenshots/course.gif)<br>**Skapa kurs** — ett projekt per lektion, redo att ta emot källor | ![Inställningar](docs/screenshots/settings.gif)<br>**Inställningar** — API-status, val av AI-modeller med visade priser |

---

## Funktioner

| | Funktion | Beskrivning |
|---|---|---|
| 📷 | **Filimport** | Importera dina lektioner — foto, PDF (via Mistral OCR med genomsnittlig konfidenspoäng, nivåer `high`/`medium`/`low`) eller textfil (TXT, MD). Uppladdningssessioner med omförsök per fil och individuell progress |
| 📝 | **Textinmatning** | Skriv eller klistra in vilken text som helst direkt |
| 🎤 | **Röstinmatning** | Spela in dig själv — Voxtral STT transkriberar din röst |
| 🌐 | **Webb / URL** | Klistra in en URL (direkt skrapning via Readability + Lightpanda) eller skriv en sökning (Agent Mistral web_search) |
| 📄 | **Repetitionsanteckningar** | Strukturerade anteckningar med nyckelpunkter, ordförråd, citat, anekdoter |
| 🃏 | **Flashcards** | Interaktiva F/S-kort, dialogisk uppläsning |
| ❓ | **Flervalsquiz** | Flervalsfrågor med adaptiv repetition av fel (konfigurerbart antal) |
| ✏️ | **Lucktexter** | Fyll-i-övningar med ledtrådar och tolerant validering |
| 🔤 | **Diktamen** | Ord upplästa i ljud (Voxtral TTS) från en importerad lista, tangentbordsinmatning, strikt bokstav-för-bokstav-rättning med förklarad stavningsregel |
| 🎙️ | **Podd** | Mini-podd med 2 röster i ljud — Mistral-röster som standard eller anpassade röster (föräldrar!) |
| 🖼️ | **Illustrationer** | Utbildningsbilder genererade av en Agent Mistral |
| 🗣️ | **Röstquiz** | Frågor upplästa högt (anpassad röst möjlig), muntligt svar, AI-verifiering |
| 💬 | **AI-tutor** | Kontextuell chatt med dina kursdokument, med verktygsanrop |
| 🧠 | **Automatisk router** | En router baserad på `mistral-small-latest` analyserar innehållet och föreslår en kombination av generatorer bland de 8 tillgängliga typerna |
| 🔒 | **Föräldrakontroll** | Konfigurerbar moderering per profil (anpassningsbara kategorier), föräldra-PIN, chattbegränsningar |
| 🌍 | **Flerspråkig** | Gränssnitt tillgängligt på 9 språk ; AI-generering styrbar på 15 språk via promptarna |
| 🔊 | **Uppläsning** | Lyssna på anteckningar och flashcards (fråga/svar-dialog) via Mistral Voxtral TTS |
| 💶 | **API-kostnadsspårning** | Transparent uppskattning av €-kostnaden för varje generering och källa (tokens / tecken / sidor / ljudsekunder). Badge per kort + total per projekt, synlig i instrumentpanelen |
| 🎨 | **Tema per profil** | Varje profil väljer sitt tema `dark` eller `light` — sparas vid profilbyte |

---

## Arkitekturöversikt

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Modellöversikt för användning

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Användarresa

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Djupdykning — Funktioner

### Multimodal indata

EurekAI accepterar 4 typer av källor, modererade enligt profilen (aktiverat som standard för barn och tonåring) :

- **Filimport** — JPG-, PNG- eller PDF-filer bearbetade med Mistral OCR — **OCR 4 (`mistral-ocr-4-0`) som standard** (bättre kvalitet), **OCR 3 (`mistral-ocr-2512`) som alternativ** i Inställningar (billigare, ~½ av kostnaden) — för tryckt text, tabeller och handskrift ; eller textfiler (TXT, MD) importerade direkt. Uppladdningar med flera filer använder ett system med **uppladdningssessioner** : individuell progress per fil, omförsök av misslyckad fil utan att skicka om de andra, avfärdande av sessionen när den är klar. OCR exponerar en genomsnittlig **konfidenspoäng** (`average`, begränsad inom `[0,1]`, beräknad från `averagePageConfidenceScore` returnerade av Mistral), visad i UI som badge-nivå `high` / `medium` / `low` (trösklar ~0.9 / ~0.7) — varnar utan att blockera om skanningen har dålig kvalitet.
- **Fritext** — Skriv eller klistra in vilket innehåll som helst. Modererat före lagring om moderering är aktiv.
- **Röstinmatning** — Spela in ljud i webbläsaren. Transkriberas av `voxtral-mini-latest`. Parametern `language="fr"` optimerar igenkänningen.
- **Webb / URL** — Klistra in en eller flera URL:er för att skrapa innehållet direkt (Readability + Lightpanda för JS-sidor), eller skriv nyckelord för en webbsökning via Agent Mistral. Det enda fältet accepterar båda — URL:er och nyckelord skiljs åt automatiskt, varje resultat skapar en oberoende källa.

### AI-innehållsgenerering

Åtta typer av genererat inlärningsmaterial :

| Generator | Modell | Utdata |
|---|---|---|
| **Repetitionsanteckning** | `mistral-large-latest` | Titel, sammanfattning, nyckelpunkter, ordförråd, citat, anekdot |
| **Flashcards** | `mistral-large-latest` | F/S-kort med källhänvisningar (konfigurerbart antal) |
| **Flervalsquiz** | `mistral-large-latest` | Flervalsfrågor, förklaringar, adaptiv repetition (konfigurerbart antal) |
| **Lucktexter** | `mistral-large-latest` | Meningar att komplettera med ledtrådar, tolerant validering (Levenshtein) |
| **Diktamen** | `mistral-large-latest` + Voxtral TTS | Nyckelord upplästa i ljud (1 MP3/ord) → tangentbordsinmatning → strikt rättning (accenter) med förklarad regel |
| **Podd** | `mistral-large-latest` + Voxtral TTS | Manus med 2 röster → MP3-ljud |
| **Illustration** | Agent `mistral-large-latest` | Utbildningsbild via verktyget `image_generation` |
| **Röstquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-frågor → STT-svar → AI-verifiering |

### AI-tutor via chatt

En konversationell tutor med full åtkomst till kursdokumenten :

- Använder `mistral-large-latest`
- **Verktygsanrop** : kan generera anteckningar, flashcards, quiz eller lucktexter under konversationen
- Historik med 50 meddelanden per kurs
- Innehållsmoderering om den är aktiverad för profilen

### Automatisk router

Routern använder `mistral-small-latest` för att analysera källornas innehåll och föreslå de mest relevanta generatorerna bland de 8 tillgängliga. Gränssnittet visar progress i realtid : först en analysfas, sedan individuella genereringar med möjlighet till avbrott.

### Adaptiv inlärning

- **Quizstatistik** : spårning av försök och precision per fråga
- **Quizrepetition** : genererar 5–10 nya frågor som riktar in sig på svaga begrepp
- **Instruktionsdetektering** : upptäcker repetitionsinstruktioner (« Jag kan min lektion om jag kan... ») och prioriterar dem i kompatibla textgeneratorer (anteckning, flashcards, quiz, lucktexter)

### Säkerhet & föräldrakontroll

- **4 åldersgrupper** : barn (≤10 år), tonåring (11–15), student (16–25), vuxen (26+)
- **Innehållsmoderering** : `mistral-moderation-2603` (Mistral Moderation 2) med 11 tillgängliga kategorier, 5 blockerade som standard för barn/tonåring (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Anpassningsbara kategorier per profil i inställningarna ; Moderation 2 har delat den tidigare kategorin « farligt innehåll » i `dangerous` + `criminal` (befintliga profiler migreras automatiskt, och blockerade kategorier gäller även redan importerade källor). Standardsäkerhet : om modellens svar inte gör det möjligt att verifiera en blockerad kategori avvisas innehållet (« Moderering otillgänglig ») ; med aktiv moderering utesluter både generering och chatt källor som är flaggade, i fel eller under verifiering (en importerad källa med moderering inaktiverad verifieras inte om). Datumförsett id låst i `helpers/moderation-model.ts` : aliaset `-latest`, som är föråldrat, listas inte längre av API:et.
- **Föräldra-PIN** : SHA-256-hash, krävs för profiler under 15 år. För en produktionsdistribution, planera för en långsam hash med salt (Argon2id, bcrypt).
- **Chattbegränsningar** : AI-chatt inaktiverad som standard för under 16 år, aktiverbar av föräldrar

### Multiprofilsystem

- Flera profiler med namn, ålder, avatar, språkpreferenser
- **Röst per profil** (`Profile.mistralVoices?: { host?, guest? }` — varje roll är valfri) — varje barn kan ha sitt eget röstpar för podd/röstquiz
- **Tema per profil** (`Profile.theme: 'dark' | 'light'`) — automatisk växling vid profilbyte, sparad på backendsidan
- Projekt kopplade till profiler via `profileId`
- Kaskadradering : att ta bort en profil tar bort alla dess projekt

### API-kostnadsspårning

Varje fakturerbart Mistral-anrop (chatt, OCR, STT, TTS, agents) instrumenteras för att ge en **transparent** €-uppskattning till användaren. Moderering, som är gratis, räknas inte. Känd begränsning : agentverktygens avgifter (webbsökning 30 $/1000 anrop, bildgenerering 100 $/1000 bilder) räknas ännu inte — den visade kostnaden för en illustration är underskattad.

- **Sanningskälla** : `helpers/pricing.ts` — `MODEL_PRICING` per modellprefix (t.ex. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` med Mistral-dokumentations-URL:er för periodisk om-skrapning
- **Stödda enheter** : `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konvertering styrd av `helpers/cost-calc.ts`
- **Instrumenteringskedja** : `helpers/tracked-client.ts` (wrappar Mistral-klienten) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injektion i HTTP-svaret)
- **UI** : kostnadsbadge per generering (`src/partials/cost-badge-gen.html`), per källa (`cost-badge-src.html`), kumulativ total i instrumentpanelen (`Project.totalCost`)
- **Endpoints** : svaren `/generate/*` och `/sources/*` dekorerar det returnerade objektet (Generation / Source) med `estimatedCost`, `usage` och `costBreakdown`. `POST /generate/route` lägger till ett fält `costDelta: number` för enbart routningskostnaden. `GET /projects/:pid` returnerar projektet berikat med `totalCost` (summa beräknad från `costLog[]`) + den fullständiga historiken

### TTS (Mistral Voxtral) & anpassade röster

- **Mistral Voxtral TTS** : `voxtral-mini-tts-latest`, 100 % Mistral-talssyntes, ingen extra nyckel behövs
- **Anpassade röster** : föräldrar kan skapa egna röster via Mistral Voices API (från ett ljudprov) och tilldela dem till värd-/gästroller — poddar och röstquiz läses då upp med en förälders röst, vilket gör upplevelsen ännu mer immersiv för barnet
- Två konfigurerbara röstroller : **värd** (huvudberättare) och **gäst** (poddens andra röst)
- Komplett katalog över Mistral-röster tillgänglig i inställningarna, filtrerbar efter språk
### Internationalisering

- Gränssnitt tillgängligt på 9 språk: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompts stöder 15 språk (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Språk konfigurerbart per profil

---

## Teknisk stack

| Lager | Teknologi | Roll |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server och typsäkerhet |
| **Backend** | Express 5.x | REST API |
| **Dev-server** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktivt gränssnitt, TypeScript kompilerat av Vite |
| **Templating** | vite-plugin-handlebars | HTML-komposition via partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderering |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, inbyggd talsyntes |
| **Ikoner** | Lucide 1.x | SVG-ikonbibliotek |
| **Web scraping** | Readability + linkedom | Extrahering av huvudinnehåll från webbsidor (Firefox Reader View-teknik) |
| **Headless browser** | Lightpanda | Ultralätt headless-webbläsare (Zig + V8) för JS/SPA-sidor — scraping-fallback |
| **Markdown** | Marked | Markdown-rendering i chatten |
| **Filuppladdning** | Multer 2.x | Hantering av multipart-formulär |
| **Audio** | ffmpeg-static | Sammanslagning av ljudsegment |
| **Tester** | Vitest | Enhetstester — täckning mätt av SonarCloud |
| **Persistens** | JSON-filer | Lagring utan beroende |

---

## Modellreferens

| Modell | Användning | Varför |
|---|---|---|
| `mistral-large-latest` | Sammanfattning, Flashcards, Podcast, Quiz, Cloze-texter, Chat, Verifiering av röstquiz, Agent Image, Agent Web Search, Instruktionsdetektering | Bäst multilingual + instruktionsföljning |
| `mistral-ocr-4-0` (OCR 4, standard) | Dokument-OCR — högre kvalitet | Tryckt text, tabeller, handskrift ($4 / 1000 sidor) |
| `mistral-ocr-2512` (OCR 3, alternativ) | Dokument-OCR | Valbart i Inställningar, billigare ($2 / 1000 sidor) |
| `voxtral-mini-latest` | Taligenkänning (STT) | Flerspråkig STT, optimerad med `language="fr"` |
| `voxtral-mini-tts-latest` | Talsyntes (TTS) | Podcasts, röstquiz, högläsning |
| `mistral-moderation-2603` | Innehållsmoderering | 5 blockerade kategorier för barn/ungdom (inklusive `jailbreaking`) |
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

> **Obs** : Mistral Voxtral TTS är den enda TTS-providern — ingen extra nyckel behövs utöver `MISTRAL_API_KEY`.

> **API-nyckel som anges av användaren** : `MISTRAL_API_KEY` är nu **valfri**. Om den saknas startar appen ändå och uppmanar varje användare att ange **sin egen Mistral-nyckel** i gränssnittet. Nyckeln **lagras i webbläsaren** (krypterad via Web Crypto + IndexedDB i säkert sammanhang) och skickas per förfrågan — **aldrig persisterad på servern**. Precedens: profilnyckel > global webbläsarnyckel > `MISTRAL_API_KEY` (env). Att sätta `EUREKAI_REQUIRE_USER_KEY=true` tvingar varje användare att ange sin nyckel (env-nyckeln används då endast för förladdningar).

> **Lokal HTTPS (surfplatta/LAN)** : `localhost` är redan ett säkert sammanhang. För LAN-åtkomst (surfplatta), generera ett lokalt certifikat och aktivera HTTPS för att låsa upp webbläsarkryptering + kryptera nyckeln under överföring :
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Miljövariabler

| Variabel | Krävs | Standard | Roll |
|---|---|---|---|
| `MISTRAL_API_KEY` | valfri | — | Mistral API-nyckel (chat, OCR, STT, TTS Voxtral, agents, moderering). Om den saknas anger användaren sin nyckel i appen (lagras i webbläsaren, aldrig på servern) |
| `EUREKAI_REQUIRE_USER_KEY` | valfri | `false` | `true` → inaktiverar fallback till `MISTRAL_API_KEY` för AI-förfrågningar (varje användare MÅSTE ange sin nyckel). Användbart på en exponerad instans |
| `HTTPS_KEY` / `HTTPS_CERT` | valfri | — | TLS-nyckel/cert-sökvägar (se `scripts/gen-cert.sh`) → Express och Vite serverar via HTTPS (secure context LAN/surfplatta) |
| `PORT` | valfri | `3000` | HTTP-port för Express-backend |
| `NODE_ENV` | valfri | `development` | Om `production` → Express serverar frontend från `dist/` (annars `public/`) |
| `SONAR_TOKEN` | valfri CI | — | Används endast av GitHub Actions-workflowen SonarCloud |

### Tester, kodkvalitet och bidrag

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)** : `pre-commit` kedjar `scripts/pre-commit-fast.sh` (konflikter, stora filer, shellcheck), `lint-staged` sedan `npm test` ; `pre-push` kör först en `npm audit`-gate (blockerar vid kritisk transitiv sårbarhet, se `scripts/audit-verdict.mjs`) sedan `npm run security`. Alla blockerar commit/push vid fel.

**Externa verktyg som krävs (valfria men används av `pretest` / `npm run security`)** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Utan dessa verktyg misslyckas `npm test` vid `pretest` (lizard saknas) och `npm run security` misslyckas (opengrep saknas). Husky-hooks blockerar då commit/push.

---

## Driftsättning med container

Image publiceras på **GitHub Container Registry** :

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

> **`:U`** är en Podman rootless-flagga som automatiskt justerar volymbehörigheter.

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

> **För AI-bidragsgivare** : se [`CLAUDE.md`](CLAUDE.md) för detaljerad arkitekturkontext, obligatoriska regler (anti-leak prompts, felkoder, cost tracking) och kända fallgropar (Lizard CCN, Opengrep, Codacy/Semgrep-migration).

---

## API-referens

### Config
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/config` | Aktuell konfiguration |
| `PUT` | `/api/config` | Ändra konfigurationen (modeller, röster, TTS-modell) |
| `GET` | `/api/config/status` | API-status : `mistral` (Mistral-nyckel angiven), `ttsAvailable` (alias för `mistral`, Mistral Voxtral är den enda TTS-providern) |
| `POST` | `/api/config/reset` | Återställ till standardkonfiguration |
| `GET` | `/api/config/voices` | Lista Mistral TTS-röster (valfri `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Tillgängliga modereringskategorier + standardvärden per ålder |
| `POST` | `/api/providers/mistral/validate` | Validera en Mistral-nyckel angiven av användaren — alltid 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), ingen env-fallback |

### Profiler
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/profiles` | Lista alla profiler |
| `POST` | `/api/profiles` | Skapa en profil |
| `PUT` | `/api/profiles/:id` | Ändra en profil (PIN krävs för < 15 år) |
| `DELETE` | `/api/profiles/:id` | Ta bort en profil + cascade-projekt `{pin?}` → `{ok, deletedProjects}` |

### Projekt
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects` | Lista projekt (`?profileId=` valfri) |
| `POST` | `/api/projects` | Skapa ett projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektdetaljer |
| `PUT` | `/api/projects/:pid` | Byt namn `{name}` |
| `DELETE` | `/api/projects/:pid` | Ta bort projektet |
| `GET` | `/api/projects/:pid/events` | Realtids-SSE-ström (`event: generation`) av genereringstransitioner (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Källor
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import av multipart-filer (OCR för JPG/PNG/PDF, direktläsning för TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Fri text `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-röst (multipart-ljud) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping eller websökning `{query}` — returnerar en array av källor |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ta bort en källa |
| `POST` | `/api/projects/:pid/moderate` | Moderera `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Upptäck repetitionsinstruktioner |

### Generering
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Repetitionssammanfattning |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Flervalsquiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Cloze-texter |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktamen (ord + exempelmeningar + regler, 1 TTS-ljud per ord ; föreslås även av auto-routern) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Röstquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptiv repetition `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Målinriktad påminnelsesammanfattning för felaktiga quizfrågor `{generationId, weakQuestions}` — anropas parallellt med `quiz-review` via knappen « Träna på mina fel » |
| `POST` | `/api/projects/:pid/generate/route` | Routningsanalys (plan för generatorer att starta) — returnerar `{plan, costDelta}` (kostnad för enbart routning) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatisk backend-generering (routning + 8 typer : summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Parallell körning — förutsätter en Mistral-tier med rate-limit ≥ 8 samtidiga förfrågningar ; annars kan flera 429 dyka upp i `failedSteps`. |

Alla genereringsrutter accepterar `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` och `remediation-summary` kräver dessutom `{generationId, weakQuestions}`.

### CRUD Genereringar
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Skicka in quizsvar `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Skicka in cloze-svar `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Skicka in diktamenssvar `{answers}` (strikt serverscore) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verifiera ett muntligt svar (ljud + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-högläsning (sammanfattningar/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Avbryt en pågående generering (enda avbrottsvägen för en pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Byt namn `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ta bort genereringen |

### Chat
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Hämta chatthistorik |
| `POST` | `/api/projects/:pid/chat` | Skicka ett meddelande `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Rensa chatthistoriken |

---

## Arkitekturbeslut

| Beslut | Motivering |
|---|---|
| **Alpine.js framför React/Vue** | Minimal fotavtryck, lätt reaktivitet med TypeScript kompilerat av Vite. Perfekt för en hackathon där hastighet räknas. |
| **Persistens i JSON-filer** | Noll beroende, omedelbar start. Ingen databas att konfigurera — man startar och kör. |
| **Vite + Handlebars** | Det bästa av två världar : snabb HMR för utveckling, HTML-partials för kodorganisation, Tailwind JIT. |
| **Centraliserade prompts** | Alla AI-prompts i `prompts.ts` — enkla att iterera, testa och anpassa per språk/åldersgrupp. |
| **System med flera genereringar** | Varje generering är ett oberoende objekt med eget ID — möjliggör flera sammanfattningar, quiz, etc. per kurs. |
| **Åldersanpassade prompts** | 4 åldersgrupper med olika ordförråd, komplexitet och ton — samma innehåll undervisas olika beroende på eleven. |
| **Agentbaserade funktioner** | Bildgenerering och websökning använder tillfälliga Mistral Agents — rent livscykelhantering med automatisk rensning. |
| **Intelligent URL-scraping** | Ett enda fält accepterar blandade URL:er och nyckelord — URL:er scrapas via Readability (statiska sidor) med Lightpanda-fallback (JS/SPA-sidor), nyckelord utlöser en Mistral web_search-agent. Varje resultat skapar en oberoende källa. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (ingen extra nyckel utöver `MISTRAL_API_KEY`) — talsyntes integrerad i kostnadskedjan och röstupplösning per språk. |

---

## Krediter & tack

- **[Mistral AI](https://mistral.ai)** — AI-modeller (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lätt reaktivt framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend-buildverktyg
- **[Lucide](https://lucide.dev)** — Ikonbibliotek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extrahering av webbinnehåll (Firefox Reader View-teknik)
- **[Lightpanda](https://lightpanda.io)** — Ultralätt headless-webbläsare för scraping av JS/SPA-sidor
- **[Luciole](https://luciole-vision.com)** — Typsnitt utformat för synskadade läsare, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (profilalternativet « Läskomfort »)

Initierat under Mistral AI Worldwide Hackathon (mars 2026), utvecklat helt med AI via [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Författare

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licens

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel översatt från fr till sv med grok-4.5.**
