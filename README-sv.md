<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logotypen" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Förvandla vilket innehåll som helst till en interaktiv inlärningsupplevelse — driven av <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Täckning"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Sårbarheter"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Kodlukt"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Kodrader"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy-märke"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Historien — Varför EurekAI?

**EurekAI** föddes under [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiell webbplats](https://worldwide-hackathon.mistral.ai/)) (mars 2026). Jag behövde ett ämne — och idén kom från något väldigt konkret: jag förbereder regelbundet prov med min dotter, och jag tänkte att det måste gå att göra det här roligare och mer interaktivt med hjälp av AI.

Målet: ta emot **vilken inmatning som helst** — ett foto av lektionen, en kopierad text, en ljudinspelning, en webbsökning — och förvandla den till **repetitionsblad, flashcards, quiz, poddar, lucktexter, illustrationer och mycket mer**. Allt drivet av Mistral AIs franska modeller, vilket gör det till en naturligt anpassad lösning för svensktalande elever.

Den [första prototypen](https://github.com/jls42/worldwide-hackathon.mistral.ai) byggdes på 48 timmar under hackathonet som en proof of concept kring Mistrals tjänster — redan fungerande, men begränsad. Sedan dess har EurekAI blivit ett riktigt projekt: lucktexter, navigering i övningarna, webbscraping, konfigurerbar föräldramodering, grundlig kodgranskning och mycket mer. Hela koden genereras av AI — främst [Claude Code](https://code.claude.com/), med vissa bidrag via [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Funktioner

| | Funktion | Beskrivning |
|---|---|---|
| 📷 | **Filimport** | Importera dina lektioner — foto, PDF (via Mistral OCR med medelvärde av förtroendepoäng, trösklar `high`/`medium`/`low`) eller textfil (TXT, MD). Uppladdningssessioner med återförsök per fil och individuell förloppsindikator |
| 📝 | **Textinmatning** | Skriv eller klistra in vilken text som helst direkt |
| 🎤 | **Röstmatare** | Spela in dig själv — Voxtral STT transkriberar din röst |
| 🌐 | **Webb / URL** | Klistra in en URL (direkt scraping via Readability + Lightpanda) eller skriv en sökning (Agent Mistral web_search) |
| 📄 | **Repetitionsblad** | Strukturerade anteckningar med nyckelpunkter, vokabulär, citat, anekdoter |
| 🃏 | **Flashcards** | Interaktiva frågor/svar-kort, dialogbaserad ljuduppläsning |
| ❓ | **Flervalsquiz** | Flervalsfrågor med adaptiv repetition av fel (konfigurerbart antal) |
| ✏️ | **Lucktexter** | Övningar att fylla i med ledtrådar och tolerant validering |
| 🔤 | **Diktamen** | Ord som dikteras i ljud (`mistral-small-latest`) från en importerad lista, tangentbordsinmatning, strikt bokstav-för-bokstav-korrigering med förklarad stavningsregel |
| 🎙️ | **Podcast** | Mini-podcast med två röster i ljud — Mistral-röster som standard eller anpassade röster (föräldrar!) |
| 🖼️ | **Illustrationer** | Pedagogiska bilder genererade av en Mistral Agent |
| 🗣️ | **Muntligt quiz** | Frågor läses upp högt (anpassad röst möjlig), muntligt svar, AI-verifiering |
| 💬 | **AI-handledare** | Kontextuell chatt med dina kursdokument, med verktygskall |
| 🧠 | **Automatisk router** | En router baserad på `dark` analyserar innehållet och föreslår en kombination av generatorer bland de 8 tillgängliga typerna |
| 🔒 | **Föräldrakontroll** | Konfigurerbar moderering per profil (anpassningsbara kategorier), föräldra-PIN, chattbegränsningar |
| 🌍 | **Flerspråkig** | Gränssnitt tillgängligt på 9 språk; AI-generering kan styras på 15 språk via promptarna |
| 🔊 | **Uppläsning** | Lyssna på repetitionsblad och flashcards (fråga/svar-dialog) via Mistral Voxtral TTS |
| 💶 | **Spårning av API-kostnader** | Transparent uppskattning av kostnaden € för varje generering och källa (tokens / tecken / sidor / ljudsekunder). Märke per kort + total per projekt, synligt i kontrollpanelen |
| 🎨 | **Tema per profil** | Varje profil väljer sitt tema `light` eller `mistral-ocr-4-0` — består vid profilbyte |

---

## Översikt över arkitekturen

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Översikt över arkitekturen" width="800" />
</p>

---

## Modellkarta för användning

<p align="center">
  <img src="public/assets/model-map.webp" alt="Mappning av AI-modell till uppgift" width="800" />
</p>

---

## Användarresa

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Studentens läranderesa" width="800" />
</p>

---

## Djupdykning — Funktioner

### Multimodal inmatning

EurekAI accepterar 4 typer av källor, modererade enligt profilen (aktiverat som standard för barn och tonåring) :

- **Filimport** — JPG-, PNG- eller PDF-filer behandlas av Mistral OCR — **OCR 4 (`mistral-ocr-2512`) som standard** (bästa kvalitet), **OCR 3 (`average`) som tillval** i inställningarna (billigare, ~½ av kostnaden) — för tryckt text, tabeller och handskrift; eller textfiler (TXT, MD) som importeras direkt. Uppladdningar med flera filer använder ett system med **uppladdningssessioner**: individuell förloppsindikator per fil, återförsök för misslyckad fil utan att skicka om de andra, stängning av sessionen när den är klar. OCR exponerar ett **medelvärde av förtroendepoäng** (`[0,1]`, klampad inom `averagePageConfidenceScore`, beräknad utifrån `high` som returneras av Mistral), visad i gränssnittet som ett märke på nivå `medium` / `low` / `voxtral-mini-latest` (trösklar ~0.9 / ~0.7) — varnar utan att blockera om skanningen håller dålig kvalitet.
- **Fri text** — Skriv eller klistra in vilket innehåll som helst. Moduleras innan lagring om modereringen är aktiv.
- **Röstmatare** — Spela in ljud i webbläsaren. Transkriberas av `language="fr"`. Parametern `mistral-large-latest` optimerar igenkänningen.
- **Webb / URL** — Klistra in en eller flera URL:er för att skrapa innehållet direkt (Readability + Lightpanda för JS-sidor), eller skriv nyckelord för en webbsökning via Agent Mistral. Det enda fältet accepterar båda — URL:er och nyckelord separeras automatiskt, och varje resultat skapar en oberoende källa.

### Generering av AI-innehåll

Åtta typer av genererat lärmaterial:

| Generator | Modell | Utdata |
|---|---|---|
| **Repetitionsblad** | `mistral-large-latest` | Titel, sammanfattning, nyckelpunkter, vokabulär, citat, anekdot |
| **Flashcards** | `mistral-large-latest` | Fråga/svar-kort med referenser till källorna (konfigurerbart antal) |
| **Flervalsquiz** | `mistral-large-latest` | Flervalsfrågor, förklaringar, adaptiv repetition (konfigurerbart antal) |
| **Lucktexter** | `mistral-large-latest` | Meningar att komplettera med ledtrådar, tolerant validering (Levenshtein) |
| **Diktamen** | `mistral-large-latest` + Voxtral TTS | Dikterade nyckelord i ljud (1 MP3/ord) → tangentbordsinmatning → strikt korrigering (accenter) med förklarad regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Manus med 2 röster → MP3-ljud |
| **Illustration** | Agent `image_generation` | Pedagogisk bild via verktyget `mistral-large-latest` |
| **Muntligt quiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-frågor → STT-svar → AI-verifiering |

### AI-handledare via chatt

En konversationshandledare med full tillgång till kursdokumenten:

- Använder `mistral-small-latest`
- **Verktygskall**: kan generera repetitionsblad, flashcards, quiz eller lucktexter under samtalet
- Historik på 50 meddelanden per kurs
- Innehållsmoderering om den är aktiverad för profilen

### Automatisk router

Routern använder `mistral-moderation-2603` för att analysera innehållet i källorna och föreslå de mest relevanta generatorerna bland de 8 tillgängliga. Gränssnittet visar framstegen i realtid: först en analysfas, sedan de enskilda genereringarna med möjlighet att avbryta.

### Adaptivt lärande

- **Quizstatistik**: uppföljning av försök och precision per fråga
- **Quizrepetition**: genererar 5–10 nya frågor som riktar sig mot svaga koncept
- **Instruktionsdetektering**: upptäcker repetitionsinstruktioner ("Jag kan min läxa om jag kan...") och prioriterar dem i kompatibla textgeneratorer (repetitionsblad, flashcards, quiz, lucktexter)

### Säkerhet & föräldrakontroll

- **4 åldersgrupper**: barn (≤10 år), tonåring (11–15), student (16–25), vuxen (26+)
- **Innehållsmoderering**: `sexual` (Mistral Moderation 2) med 10 tillgängliga kategorier, 5 blockerade som standard för barn/tonåring (`hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`, `-latest`). Anpassningsbara kategorier per profil i inställningarna. Aliaset `Profile.mistralVoices?: { host, guest }` undviks medvetet (det pekar fortfarande på en avvecklad version).
- **Föräldra-PIN**: SHA-256-hash, krävs för profiler under 15 år. För en produktionssättning, använd en långsam hash med salt (Argon2id, bcrypt).
- **Chattbegränsningar**: AI-chatt inaktiverad som standard för personer under 16 år, kan aktiveras av föräldrarna

### Multi-profilssystem

- Flera profiler med namn, ålder, avatar, språkpreferenser
- **Röster per profil** (`Profile.theme: 'dark' | 'light'`) — varje barn kan ha sin egen parvisa röst för podcast/muntligt quiz
- **Tema per profil** (`profileId`) — automatisk växling vid profilbyte, sparas i backend
- Projekt kopplade till profiler via `helpers/pricing.ts`
- Kaskaderadering: att ta bort en profil tar bort alla dess projekt

### Spårning av API-kostnader

Varje Mistral-anrop (chatt, OCR, STT, TTS, moderering, agenter) instrumenteras för att ge en **transparent** uppskattning € till användaren — inga överraskningar på fakturan.

- **Sanningskälla**: `MODEL_PRICING` — `mistral-large` per modellprefix (ex: `PRICING_SOURCES` → input 0.5 €/M tokens, output 1.5 €/M tokens), `tokens` med Mistral-dokumentations-URL:er för periodisk omgenomsökning
- **Stödda enheter**: `characters`, `pages` (TTS), `audio-seconds` (OCR), `helpers/cost-calc.ts` (STT) — konvertering styrd av `helpers/tracked-client.ts`
- **Instrumenteringskedja**: `helpers/usage-context.ts` (wrap Mistral-klient) → `helpers/cost-calc.ts` (AsyncLocalStorage) → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` → `src/partials/cost-badge-gen.html` (injektion i HTTP-svaret)
- **UI**: kostnadsmärke per generering (`cost-badge-src.html`), per källa (`Project.totalCost`), ackumulerad total i kontrollpanelen (`/generate/*`)
- **Endpoints**: svaren `/sources/*` och `estimatedCost` dekorerar det returnerade objektet (Generation / Source) med `usage`, `costBreakdown` och `POST /generate/route`. `costDelta: number` lägger till ett fält `GET /projects/:pid` för kostnaden för själva routingen. `totalCost` returnerar projektet berikat med `costLog[]` (summa beräknad från `voxtral-mini-tts-latest`) + hela historiken

### TTS (Mistral Voxtral) & anpassade röster

- **Mistral Voxtral TTS** : `voxtral-mini-tts-latest`, 100 % Mistral-röstsyntes, ingen extra nyckel behövs
- **Anpassade röster**: föräldrar kan skapa sina egna röster via Mistral Voices-API:t (utifrån ett ljudprov) och tilldela dem till rollerna värd/gäst — poddarna och de muntliga quizen läses då med en förälders röst, vilket gör upplevelsen ännu mer engagerande för barnet
- Två konfigurerbara röstroller: **värd** (huvudberättare) och **gäst** (poddens andra röst)
- Fullständigt katalog över Mistrals röster finns i inställningarna, filtrerbar efter språk

### Internationalisering

- Gränssnitt tillgängligt på 9 språk: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompter stöder 15 språk (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Språk kan konfigureras per profil

---

## Teknikstack

| Lager | Teknologi | Roll |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server och typsäkerhet |
| **Backend** | Express 5.x | REST API |
| **Utvecklingsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Responsivt gränssnitt, TypeScript kompilerat av Vite |
| **Templating** | vite-plugin-handlebars | HTML-komposition via partials |
| **AI** | Mistral AI SDK 2.x | Chatt, OCR, STT, TTS, agenter, moderering |
| **TTS** | Mistral Voxtral TTS | `mistral-large-latest`, inbyggd röstsyntes |
| **Ikoner** | Lucide 1.x | SVG-ikonsbibliotek |
| **Webbscraping** | Readability + linkedom | Extraktion av huvudinnehållet från webbsidor (Firefox Reader View-teknik) |
| **Headless webbläsare** | Lightpanda | Ultrlätt headless-webbläsare (Zig + V8) för JS-/SPA-sidor — fallback-scraping |
| **Markdown** | Marked | Markdown-rendering i chatten |
| **Filuppladdning** | Multer 2.x | Hantering av multipart-formulär |
| **Ljud** | ffmpeg-static | Sammanfogning av ljudsegment |
| **Tester** | Vitest | Enhetstester — täckning mätt av SonarCloud |
| **Persistens** | JSON-filer | Lagring utan beroenden |

---

## Modellreferens

| Modell | Användning | Varför |
|---|---|---|
| `mistral-ocr-4-0` | Repetitionsblad, Flashcards, Podcast, Quiz, Lucktexter, Chatt, Verifiering av muntligt quiz, Bildagent, Web Search-agent, Instruktionsdetektering | Bäst på flerspråkighet + instruktioner |
| `mistral-ocr-2512` (OCR 4, standard) | OCR av dokument — överlägsen kvalitet | Tryckt text, tabeller, handskrift ($4 / 1000 sidor) |
| `voxtral-mini-latest` (OCR 3, tillval) | OCR av dokument | Valbar i inställningarna, billigare ($2 / 1000 sidor) |
| `language="fr"` | Röståterkänning (STT) | Flerspråkig STT, optimerad med `voxtral-mini-tts-latest` |
| `mistral-moderation-2603` | Röstsyntes (TTS) | Poddar, muntligt quiz, uppläsning |
| `jailbreaking` | Innehållsmoderering | 5 blockerade kategorier för barn/tonåring (inklusive `mistral-small-latest`) |
| `MISTRAL_API_KEY` | Automatisk router | Snabb innehållsanalys för routningsbeslut |

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

> **Användarens API-nyckel**: `MISTRAL_API_KEY` är nu **valfri**. Om den saknas startar appen ändå och uppmanar varje användare att ange **sin egen Mistral-nyckel** i gränssnittet. Nyckeln **lagras i webbläsaren** (krypterad via Web Crypto + IndexedDB i en säker kontext) och skickas per begäran — **aldrig permanent lagrad på servern**. Prioritet: profilnyckel > global webbläsarnyckel > `MISTRAL_API_KEY` (env). Om `EUREKAI_REQUIRE_USER_KEY=true` anges tvingas varje användare att ange sin nyckel (env-nyckeln används då endast för förinläsningar).

> **Lokal HTTPS (surfplatta/LAN)**: `localhost` är redan en säker kontext. För LAN-åtkomst (surfplatta), generera ett lokalt certifikat och aktivera HTTPS för att låsa upp webbläsarkryptering + kryptera nyckeln under transport:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert om tillgängligt, annars openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite via HTTPS
> ```

### Miljövariabler

| Variabel | Krävs | Standard | Roll |
|---|---|---|---|
| `MISTRAL_API_KEY` | valfritt | — | Mistral API-nyckel (chat, OCR, STT, Voxtral TTS, agenter, moderering). Om den saknas anger användaren sin nyckel i appen (lagras i webbläsaren, aldrig på servern) |
| `EUREKAI_REQUIRE_USER_KEY` | valfritt | `false` | `true` → inaktiverar fallback på `MISTRAL_API_KEY` för AI-förfrågningar (varje användare MÅSTE ange sin nyckel). Användbart på en exponerad instans |
| `HTTPS_KEY` / `HTTPS_CERT` | valfritt | — | TLS-nyckel-/certifikatvägar (se `scripts/gen-cert.sh`) → Express och Vite serverar via HTTPS (säker kontext LAN/surfplatta) |
| `PORT` | valfritt | `3000` | HTTP-port för Express-backend |
| `NODE_ENV` | valfritt | `development` | Om `production` → Express serverar frontend från `dist/` (annars `public/`) |
| `SONAR_TOKEN` | valfritt CI | — | Används endast av GitHub Actions-workflowt för SonarCloud |

### Tester, kodkvalitet och bidrag

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)**: `pre-commit` kör `npm test`, `pre-push` kör `npm run security`. Båda blockerar commit/push vid fel.

**Krävda externa verktyg (valfria men används av `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Utan dessa verktyg misslyckas `npm test` vid `pretest` (lizard saknas) och `npm run security` misslyckas (opengrep saknas). Husky-hooks blockerar då commit/push.

---

## Distribuering med container

Bilden publiceras på **GitHub Container Registry**:

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

> **`:U`** är en Podman rootless-flagga som automatiskt justerar volymbehörigheterna.

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
docs/                     — Notes internes (inventaire prompts, audits)
scripts/                  — Tooling : check-deps, check-security, check-complexity, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **För AI-bidragare**: se [`CLAUDE.md`](CLAUDE.md) för detaljerad arkitekturkontext, obligatoriska regler (anti-leak-prompter, felkoder, kostnadsspårning) och kända fallgropar (Lizard CCN, Opengrep, Codacy/Semgrep-migrering).

---

## API-referens

### Konfiguration
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/config` | Aktuell konfiguration |
| `PUT` | `/api/config` | Ändra konfigurationen (modeller, röst, TTS-modell) |
| `GET` | `/api/config/status` | API-status: `mistral` (Mistral-nyckel definierad), `ttsAvailable` (alias för `mistral`, Mistral Voxtral är den enda TTS-leverantören) |
| `POST` | `/api/config/reset` | Återställ standardkonfigurationen |
| `GET` | `/api/config/voices` | Lista Mistral TTS-röster (valfritt `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Tillgängliga modereringskategorier + standardvärden per ålder |
| `POST` | `/api/providers/mistral/validate` | Verifiera en av användaren angiven Mistral-nyckel — alltid 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), ingen env-fallback |

### Profiler
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/profiles` | Lista alla profiler |
| `POST` | `/api/profiles` | Skapa en profil |
| `PUT` | `/api/profiles/:id` | Ändra en profil (PIN krävs för < 15 år) |
| `DELETE` | `/api/profiles/:id` | Ta bort en profil + kaskad till projekt `{pin?}` → `{ok, deletedProjects}` |

### Projekt
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects` | Lista projekten (`?profileId=` valfritt) |
| `POST` | `/api/projects` | Skapa ett projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektdetaljer |
| `PUT` | `/api/projects/:pid` | Byt namn på `{name}` |
| `DELETE` | `/api/projects/:pid` | Ta bort projektet |
| `GET` | `/api/projects/:pid/events` | Realtids-SSE-flöde (`event: generation`) för genereringsövergångar (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Källor
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importera multipart-filer (OCR för JPG/PNG/PDF, direktläsning för TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Fritext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-röst (multipart-ljud) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-skrapning eller webbsökning `{query}` — returnerar en källarray |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ta bort en källa |
| `POST` | `/api/projects/:pid/moderate` | Moderera `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Identifiera repetitionsinstruktioner |

### Generering
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Repetitionsblad |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Flervalsquiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lucktexter |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktamen (ord + exempelmeningar + regler, 1 TTS-ljud per ord; föreslås också av auto-routaren) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Muntligt quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptiv repetition `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Riktat minnesblad för felaktiga frågor i ett quiz `{generationId, weakQuestions}` — anropas parallellt med `quiz-review` via knappen «Träna på mina misstag» |
| `POST` | `/api/projects/:pid/generate/route` | Routningsanalys (plan för vilka generatorer som ska köras) — returnerar `{plan, costDelta}` (kostnaden för endast routingen) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatisk backend-generering (routing + 8 typer: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Körs parallellt — förutsätter en Mistral-nivå med rate-limit ≥ 8 samtidiga förfrågningar; annars kan flera 429:or komma tillbaka i `failedSteps`. |

Alla genereringsrutter accepterar `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` och `remediation-summary` kräver dessutom `{generationId, weakQuestions}`.

### CRUD-genereringar
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Skicka in quizsvar `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Skicka in svar för lucktexter `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Skicka in diktamentsvar `{answers}` (strikt serverscore) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verifiera ett muntligt svar (ljud + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-uppläsning högt (repetitionsblad/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Avbryt en pågående generering (enda avbrytningsvägen för en pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Byt namn på `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ta bort genereringen |

### Chatt
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Hämta chatthistoriken |
| `POST` | `/api/projects/:pid/chat` | Skicka ett meddelande `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Rensa chatthistoriken |

---

## Arkitekturbeslut

| Beslut | Motivering |
|---|---|
| **Alpine.js i stället för React/Vue** | Minimal yta, lätt reaktivitet med TypeScript kompilerat av Vite. Perfekt för en hackathon där snabbhet räknas. |
| **Persistens i JSON-filer** | Inga beroenden, omedelbar start. Ingen databas att konfigurera — man startar och kör. |
| **Vite + Handlebars** | Det bästa av två världar: snabb HMR för utveckling, HTML-partials för kodorganisation, Tailwind JIT. |
| **Centraliserade prompter** | Alla AI-prompter i `prompts.ts` — enkelt att iterera, testa och anpassa per språk/åldersgrupp. |
| **Multi-genereringssystem** | Varje generering är ett självständigt objekt med eget ID — möjliggör flera blad, quiz, etc. per kurs. |
| **Åldersanpassade prompter** | 4 åldersgrupper med olika ordförråd, komplexitet och ton — samma innehåll lär ut olika beroende på elev. |
| **Agentbaserade funktioner** | Bildgenerering och webbsökning använder tillfälliga Mistral-agenter — ren livscykel med automatisk städning. |
| **Intelligent URL-skrapning** | Ett enda fält accepterar blandade URL:er och nyckelord — URL:er skrapas via Readability (statiska sidor) med Lightpanda-fallback (JS/SPA-sidor), nyckelord utlöser en Mistral web_search-agent. Varje resultat skapar en separat källa. |
| **100 % Mistral TTS** | Mistral Voxtral TTS (ingen extra nyckel utöver `MISTRAL_API_KEY`) — talsyntes integrerad i kostnadskedjan och i röstupplösningen per språk. |

---

## Tack och erkännanden

- **[Mistral AI](https://mistral.ai)** — AI-modeller (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lättviktigt reaktivt ramverk
- **[TailwindCSS](https://tailwindcss.com)** — Verktygsorienterat CSS-ramverk
- **[Vite](https://vitejs.dev)** — Front-end-byggverktyg
- **[Lucide](https://lucide.dev)** — Ikonbibliotek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extrahering av webbinnehåll (Firefox Reader View-teknik)
- **[Lightpanda](https://lightpanda.io)** — Ultralätt headless-webbläsare för skrapning av JS/SPA-sidor
- **[Luciole](https://luciole-vision.com)** — Typsnitt utformat för synsvaga läsare, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (profilernas alternativ «Läskomfort»)

Initierat under Mistral AI Worldwide Hackathon (mars 2026), utvecklat helt av AI med [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Författare

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licens

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel översatt från fr till sv med gpt-5.4-mini.**
