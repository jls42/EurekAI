<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logotyp" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Förvandla vilket innehåll som helst till en interaktiv inlärningsupplevelse — drivet av <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

**EurekAI** föddes under [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiella webbplatsen](https://worldwide-hackathon.mistral.ai/)) (mars 2026). Jag behövde ett ämne — och idén kom från något väldigt konkret: jag förbereder regelbundet proven med min dotter, och jag tänkte att det borde gå att göra det mer lekfullt och interaktivt med hjälp av AI.

Målet: ta **vilken inmatning som helst** — ett foto av lektionen, en klistrad text, en ljudinspelning, en webbsökning — och omvandla den till **repetitionsblad, flashcards, quiz, podcasts, text med luckor, illustrationer och mycket mer**. Allt drivet av de franska modellerna från Mistral AI, vilket gör det till en naturligt anpassad lösning för franskspråkiga elever.

Den [första prototypen](https://github.com/jls42/worldwide-hackathon.mistral.ai) byggdes på 48 timmar under hackathonet som ett proof of concept kring Mistral-tjänsterna — redan fungerande, men begränsad. Sedan dess har EurekAI blivit ett riktigt projekt: text med luckor, navigering i övningar, webbscraping, konfigurerbar föräldramoderering, grundlig kodgranskning och mycket mer. Hela kodbasen genereras av AI — främst [Claude Code](https://code.claude.com/), med vissa bidrag via [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Funktioner

| | Funktion | Beskrivning |
|---|---|---|
| 📷 | **Filimport** | Importera dina lektioner — foto, PDF (via Mistral OCR med medelvärdesberäknad förtroendepoäng, nivå `high`/`medium`/`low`) eller textfil (TXT, MD). Uppladdningssessioner med omförsök per fil och individuell förloppvisning |
| 📝 | **Textinmatning** | Skriv eller klistra in vilken text som helst direkt |
| 🎤 | **Röstinmatning** | Spela in dig själv — Voxtral STT transkriberar din röst |
| 🌐 | **Webb / URL** | Klistra in en URL (direkt scraping via Readability + Lightpanda) eller skriv en sökning (Mistral-agent web_search) |
| 📄 | **Repetitionsblad** | Strukturerade anteckningar med nyckelpunkter, vokabulär, citat, anekdoter |
| 🃏 | **Flashcards** | Interaktiva fråge-/svarskort, dialogisk ljuduppspelning |
| ❓ | **Flervalsquiz** | Flervalsfrågor med adaptiv genomgång av fel (konfigurerbart antal) |
| ✏️ | **Text med luckor** | Övningar att fylla i med ledtrådar och tolerant validering |
| 🔤 | **Diktamen** | Dikterade ord i ljud (Voxtral TTS) från en importerad lista, tangentbordsinmatning, strikt bokstav-för-bokstav-korrigering med förklarad stavningsregel |
| 🎙️ | **Podcast** | Mini-podcast med två röster i ljud — Mistral-röst som standard eller anpassade röster (föräldrar!) |
| 🖼️ | **Illustrationer** | Pedagogiska bilder genererade av en Mistral-agent |
| 🗣️ | **Muntligt quiz** | Frågor lästa högt (anpassad röst möjlig), muntligt svar, AI-verifiering |
| 💬 | **AI-handledare** | Kontextuell chatt med dina kursdokument, med verktygsanrop |
| 🧠 | **Automatisk router** | En router baserad på `mistral-small-latest` analyserar innehållet och föreslår en kombination av genererare bland de 8 tillgängliga typerna |
| 🔒 | **Föräldrakontroll** | Konfigurerbar moderering per profil (anpassningsbara kategorier), föräldra-PIN, chattrestriktioner |
| 🌍 | **Flerspråkigt** | Gränssnitt tillgängligt på 9 språk; AI-generering kan styras på 15 språk via promptarna |
| 🔊 | **Uppläsning** | Lyssna på repetitionsblad och flashcards (fråga/svar-dialog) via Mistral Voxtral TTS |
| 💶 | **Uppföljning av API-kostnader** | Transparent uppskattning av €-kostnaden för varje generering och källa (tokens / tecken / sidor / ljudsekunder). Märke per kort + total per projekt, synlig i dashboarden |
| 🎨 | **Tema per profil** | Varje profil väljer sitt `dark`- eller `light`-tema — persisterar när profilen byts |

---

## Översikt över arkitekturen

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Översikt över arkitekturen" width="800" />
</p>

---

## Modellkarta för användning

<p align="center">
  <img src="public/assets/model-map.webp" alt="Koppling mellan AI-modeller och uppgifter" width="800" />
</p>

---

## Användarresa

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Studentens läranderesa" width="800" />
</p>

---

## Fördjupning — Funktioner

### Multimodal inmatning

EurekAI accepterar 4 typer av källor, modererade enligt profilen (aktiverat som standard för barn och tonåringar) :

- **Filimport** — JPG-, PNG- eller PDF-filer behandlas med Mistral OCR — **OCR 3 (`mistral-ocr-2512`) som standard**, **OCR 4 (`mistral-ocr-4-0`) som tillval** i Inställningar (bättre kvalitet, men 2× kostnaden) — för tryckt text, tabeller och handskrift; eller textfiler (TXT, MD) importeras direkt. Uppladdningar med flera filer använder ett system med **uppladdningssessioner**: individuell förlopp per fil, omförsök för den fil som misslyckas utan att skicka in de andra igen, avvisning av sessionen när den är klar. OCR exponerar en **medelvärdesberäknad förtroendepoäng** (`average`, begränsad i `[0,1]`, beräknad från `averagePageConfidenceScore` som returneras av Mistral), visad i gränssnittet som ett nivåbadge `high` / `medium` / `low` (trösklar ~0.9 / ~0.7) — varnar utan att blockera om skanningen är av dålig kvalitet.
- **Fri text** — Skriv eller klistra in vilket innehåll som helst. Modereras före lagring om modereringen är aktiv.
- **Röstdinmatning** — Spela in ljud i webbläsaren. Transkriberas av `voxtral-mini-latest`. Parametern `language="fr"` optimerar igenkänningen.
- **Webb / URL** — Klistra in en eller flera URL:er för att scrapa innehållet direkt (Readability + Lightpanda för JS-sidor), eller skriv nyckelord för en webbsökning via Mistral-agenten. Det enda fältet accepterar båda — URL:er och nyckelord separeras automatiskt, varje resultat skapar en oberoende källa.

### AI-innehållsgenerering

Åtta typer av genererat lärmaterial:

| Generator | Modell | Utdata |
|---|---|---|
| **Repetitionsblad** | `mistral-large-latest` | Titel, sammanfattning, nyckelpunkter, vokabulär, citat, anekdot |
| **Flashcards** | `mistral-large-latest` | Fråge-/svarskort med källreferenser (konfigurerbart antal) |
| **Flervalsquiz** | `mistral-large-latest` | Flervalsfrågor, förklaringar, adaptiv genomgång (konfigurerbart antal) |
| **Text med luckor** | `mistral-large-latest` | Meningar att fylla i med ledtrådar, tolerant validering (Levenshtein) |
| **Diktamen** | `mistral-large-latest` + Voxtral TTS | Nyckelord dikteras i ljud (1 MP3/ord) → tangentbordsinmatning → strikt korrigering (accenter) med förklarad regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Manus med 2 röster → MP3-ljud |
| **Illustration** | Agent `mistral-large-latest` | Pedagogisk bild via verktyget `image_generation` |
| **Muntligt quiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-frågor → STT-svar → AI-verifiering |

### AI-handledare via chatt

En konversationshandledare med full tillgång till kursdokumenten:

- Använder `mistral-large-latest`
- **Verktygsanrop**: kan generera repetitionsblad, flashcards, quiz eller texter med luckor under konversationen
- Historik med 50 meddelanden per kurs
- Innehållsmoderering om den är aktiverad för profilen

### Automatisk router

Routern använder `mistral-small-latest` för att analysera innehållet i källorna och föreslå de mest relevanta generatorerna bland de 8 tillgängliga. Gränssnittet visar förloppet i realtid: först en analysfas, sedan de enskilda genereringarna med möjlighet till avbrytning.

### Adaptivt lärande

- **Quizstatistik**: uppföljning av försök och träffsäkerhet per fråga
- **Quizrepetition**: genererar 5–10 nya frågor som riktar in sig på svaga koncept
- **Detektering av instruktioner**: upptäcker repetitionsinstruktioner ("Jag kan min lektion om jag kan...") och prioriterar dem i kompatibla textgeneratorer (blad, flashcards, quiz, texter med luckor)

### Säkerhet & föräldrakontroll

- **4 åldersgrupper**: barn (≤10 år), tonåring (11–15), student (16–25), vuxen (26+)
- **Innehållsmoderering**: `mistral-moderation-latest` med 10 tillgängliga kategorier, 5 blockerade som standard för barn/tonåringar (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Anpassningsbara kategorier per profil i inställningarna.
- **Föräldra-PIN**: SHA-256-hash, krävs för profiler under 15 år. För en produktionsmiljö bör en långsam hash med salt användas (Argon2id, bcrypt).
- **Chattrestriktioner**: AI-chatt avaktiverad som standard för personer under 16 år, kan aktiveras av föräldrar

### System med flera profiler

- Flera profiler med namn, ålder, avatar, språkpreferenser
- **Röster per profil** (`Profile.mistralVoices?: { host, guest }`) — varje barn kan ha sin egen röstparning för podcast/muntligt quiz
- **Tema per profil** (`Profile.theme: 'dark' | 'light'`) — automatisk växling när profilen byts, sparas i backend
- Projekt kopplade till profiler via `profileId`
- Kaskaderadering: att ta bort en profil tar bort alla dess projekt

### Uppföljning av API-kostnader

Varje Mistral-anrop (chatt, OCR, STT, TTS, moderering, agenter) instrumenteras för att ge en **transparent** €-uppskattning till användaren — inga överraskningar på fakturan.

- **Sanningskälla**: `helpers/pricing.ts` — `MODEL_PRICING` per modellprefix (t.ex. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` med Mistral-dokumentations-URL:er för periodisk omscraping
- **Stödda enheter**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konvertering styrd av `helpers/cost-calc.ts`
- **Instrumenteringskedja**: `helpers/tracked-client.ts` (omsluter Mistral-klienten) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injektion i HTTP-svaret)
- **UI**: kostnadsbadge per generering (`src/partials/cost-badge-gen.html`), per källa (`cost-badge-src.html`), total ackumulerad i dashboarden (`Project.totalCost`)
- **Endpoints**: svaren `/generate/*` och `/sources/*` dekorerar det returnerade objektet (Generation / Source) med `estimatedCost`, `usage` och `costBreakdown`. `POST /generate/auto/route` lägger till ett fält `costDelta: number` för kostnaden för själva routingen. `GET /projects/:pid` returnerar projektet utökat med `totalCost` (summa beräknad från `costLog[]`) + hela historiken

### TTS med flera leverantörer & anpassade röster

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100 % Mistral-baserad talsyntes, ingen extra nyckel behövs
- **Anpassade röster**: föräldrar kan skapa sina egna röster via Mistral Voices-API:t (från ett ljudprov) och tilldela dem till rollerna värd/gäst — podcastar och muntliga quiz läses då med en förälders röst, vilket gör upplevelsen ännu mer uppslukande för barnet
- Två konfigurerbara röstroller: **värd** (huvudberättare) och **gäst** (podcastens andra röst)
- Hela katalogen med Mistral-röster finns i inställningarna och kan filtreras efter språk

### Internationalisering

- Gränssnittet finns på 9 språk: fr, en, es, pt, it, nl, de, hi, ar
- AI-promptar stöder 15 språk (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Språk konfigurerbart per profil

---

## Teknisk stack

| Lager | Teknik | Roll |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server och typsäkerhet |
| **Backend** | Express 5.x | REST API |
| **Utvecklingsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Responsivt gränssnitt, TypeScript kompileras av Vite |
| **Templating** | vite-plugin-handlebars | HTML-sammansättning via partials |
| **AI** | Mistral AI SDK 2.x | Chatt, OCR, STT, TTS, agenter, moderering |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrerad talsyntes |
| **Ikoner** | Lucide 1.x | SVG-ikonbibliotek |
| **Webbscraping** | Readability + linkedom | Extrahering av huvudinnehåll från webbsidor (teknik från Firefox Reader View) |
| **Headless-webbläsare** | Lightpanda | Ultralätt headless-webbläsare (Zig + V8) för JS-/SPA-sidor — fallback-scraping |
| **Markdown** | Marked | Markdown-rendering i chatten |
| **Filuppladdning** | Multer 2.x | Hantering av multipart-formulär |
| **Ljud** | ffmpeg-static | Sammanfogning av ljudsegment |
| **Tester** | Vitest | Enhetstester — täckning mätt av SonarCloud |
| **Persistens** | JSON-filer | Lagring utan beroenden |

---

## Modellreferens

| Modell | Användning | Varför |
|---|---|---|
| `mistral-large-latest` | Blad, Flashcards, Podcast, Quiz, Texter med luckor, Chatt, Verifiering av muntligt quiz, Bildagent, Webbsökningsagent, Detektering av instruktioner | Bäst för flerspråkighet + instruktionsföljning |
| `mistral-ocr-2512` (OCR 3, standard) | OCR av dokument | Tryckt text, tabeller, handskrift ($2 / 1000 sidor) |
| `mistral-ocr-4-0` (OCR 4, tillval) | OCR av dokument — överlägsen kvalitet | Kan väljas i Inställningar, 2× kostnaden ($4 / 1000 sidor) |
| `voxtral-mini-latest` | Röstigenkänning (STT) | Flerspråkig STT, optimerad med `language="fr"` |
| `voxtral-mini-tts-latest` | Talsyntes (TTS) | Podcasts, muntligt quiz, uppläsning |
| `mistral-moderation-latest` | Innehållsmoderering | 5 blockerade kategorier för barn/tonåringar (+ jailbreaking) |
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

> **Obs**: Mistral Voxtral TTS är den enda TTS-leverantören — ingen extra nyckel behövs utöver `MISTRAL_API_KEY`.

> **API-nyckel som anges av användaren**: `MISTRAL_API_KEY` är nu **valfri**. Om den saknas startar appen ändå och uppmanar varje användare att ange **sin egen Mistral-nyckel** i gränssnittet. Nyckeln **lagras i webbläsaren** (krypterad via Web Crypto + IndexedDB i en säker kontext) och skickas med varje begäran — **aldrig persistent lagrad på servern**. Prioritet: profilnyckel > global webbläsarnyckel > `MISTRAL_API_KEY` (env). Om du sätter `EUREKAI_REQUIRE_USER_KEY=true` tvingas varje användare att ange sin nyckel (env-nyckeln används då bara för förladdningar).

> **Lokalt HTTPS (surfplatta/LAN)**: `localhost` är redan en säker kontext. För LAN-åtkomst (surfplatta), generera ett lokalt certifikat och aktivera HTTPS för att låsa upp webbläsarkryptering + kryptera nyckeln under överföring:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert om tillgängligt, annars openssl-signerat cert
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite i HTTPS
> ```

### Miljövariabler

| Variabel | Krävs | Standard | Roll |
|---|---|---|---|
| `MISTRAL_API_KEY` | valfritt | — | Mistral API-nyckel (chat, OCR, STT, TTS Voxtral, agenter, moderering). Om den saknas anger användaren sin nyckel i appen (lagras i webbläsaren, aldrig på servern) |
| `EUREKAI_REQUIRE_USER_KEY` | valfritt | `false` | `true` → inaktiverar fallback till `MISTRAL_API_KEY` för AI-förfrågningar (varje användare MÅSTE ange sin nyckel). Användbart på en exponerad instans |
| `HTTPS_KEY` / `HTTPS_CERT` | valfritt | — | TLS-nyckel-/cert-sökvägar (se `scripts/gen-cert.sh`) → Express och Vite serverar via HTTPS (secure context LAN/surfplatta) |
| `PORT` | valfritt | `3000` | HTTP-port för Express-backenden |
| `NODE_ENV` | valfritt | `development` | Om `production` → Express serverar frontend från `dist/` (annars `public/`) |
| `SONAR_TOKEN` | valfritt CI | — | Används endast av GitHub Actions-workflowet för SonarCloud |

### Tester, kodkvalitet och bidrag

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)**: `pre-commit` kör `npm test`, `pre-push` kör `npm run security`. Båda blockerar commit/push vid fel.

**Externa verktyg som krävs (valfria men används av `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Utan dessa verktyg misslyckas `npm test` vid `pretest` (lizard saknas) och `npm run security` misslyckas (opengrep saknas). Husky-hookarna blockerar då commit/push.

---

## Containerdistribution

Bilden publiceras på **GitHub Container Registry** :

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
config.ts                 — Config runtime (modèles, voix, TTS provider), persistée dans output/config.json
store.ts                  — ProjectStore : CRUD projets/sources/générations, persistance JSON
profiles.ts               — ProfileStore : gestion des profils, hachage PIN
types.ts                  — Types TypeScript : Source, Generation (8 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, 15 langues)

generators/
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (8 agents) + MAX_AUTO_PLAN_LENGTH
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF) avec extraction interne des scores de confiance moyens par page
  summary.ts              — Génération de fiche de révision (JSON structuré)
  flashcards.ts           — Flashcards Q/R (5-50, configurable)
  quiz.ts                 — Quiz QCM (5-50 questions, configurable) + révision adaptative
  fill-blank.ts           — Exercices à trous avec validation tolérante
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
    config.ts             — Interface de configuration (modèles, voix, TTS provider)
    render.ts             — Helpers de rendu HTML
    i18n.ts               — Changement de langue
    ...
  components/
    quiz.ts               — Composant quiz interactif
    quiz-vocal.ts         — Composant quiz vocal
    fill-blank.ts         — Composant textes à trous
    flashcards.ts         — Composant flashcards avec retournement
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

> **För AI-bidragsgivare**: se [`CLAUDE.md`](CLAUDE.md) för detaljerad arkitekturkontext, obligatoriska regler (anti-leak prompts, felkoder, kostnadsspårning) och kända fallgropar (Lizard CCN, Opengrep, Codacy/Semgrep-migrering).

---

## API-referens

### Konfiguration
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/config` | Nuvarande konfiguration |
| `PUT` | `/api/config` | Ändra konfigurationen (modeller, röst, TTS-modell) |
| `GET` | `/api/config/status` | API-status: `mistral` (Mistral-nyckel definierad), `ttsAvailable` (alias för `mistral`, Mistral Voxtral är den enda TTS-leverantören) |
| `POST` | `/api/config/reset` | Återställ standardkonfigurationen |
| `GET` | `/api/config/voices` | Lista Mistral TTS-röster (valfritt `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Tillgängliga modereringskategorier + standardvärden per ålder |

### Profiler
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/profiles` | Lista alla profiler |
| `POST` | `/api/profiles` | Skapa en profil |
| `PUT` | `/api/profiles/:id` | Ändra en profil (PIN krävs för < 15 år) |
| `DELETE` | `/api/profiles/:id` | Ta bort en profil + kaskadprojekt `{pin?}` → `{ok, deletedProjects}` |

### Projekt
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects` | Lista projekten (`?profileId=` valfritt) |
| `POST` | `/api/projects` | Skapa ett projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projdetaljer |
| `PUT` | `/api/projects/:pid` | Byt namn på `{name}` |
| `DELETE` | `/api/projects/:pid` | Ta bort projektet |

### Källor
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importera multipart-filer (OCR för JPG/PNG/PDF, direktläsning för TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Fritext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-röst (multipart-ljud) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-skrapning eller webbsökning `{query}` — returnerar en array av källor |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ta bort en källa |
| `POST` | `/api/projects/:pid/moderate` | Moderera `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Upptäcka repetitionsinstruktioner |

### Generering
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Repetitionsblad |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Flervalsquiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lucktexter |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktamen (ord + exempelmeningar + regler, 1 TTS-ljud per ord; erbjuds också av auto-routern) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Röstquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptiv repetition `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Riktat repetitionsblad för de missade frågorna i ett quiz `{generationId, weakQuestions}` — anropas parallellt med `quiz-review` av knappen «Öva på mina misstag» |
| `POST` | `/api/projects/:pid/generate/route` | Routningsanalys (plan för generatorerna som ska köras) — returnerar `{plan, costDelta}` (kostnaden för endast routningen) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatisk backendgenerering (routning + 8 typer: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Körs parallellt — förutsätter en Mistral-nivå med rate-limit ≥ 8 samtidiga förfrågningar; annars kan flera 429:or rapporteras i `failedSteps`. |

Alla genereringsrutter accepterar `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` och `remediation-summary` kräver dessutom `{generationId, weakQuestions}`.

### CRUD-genereringar
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Skicka in quizsvar `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Skicka in svar för lucktexter `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Skicka in diktamensvar `{answers}` (strikt serverscore) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Kontrollera ett muntligt svar (ljud + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Läs upp TTS högt (blad/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Byt namn på `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ta bort genereringen |

### Chatt
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Hämta chatthistoriken |
| `POST` | `/api/projects/:pid/chat` | Skicka ett meddelande `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Rensa chatthistoriken |

---

## Arkitekturval

| Val | Motivering |
|---|---|
| **Alpine.js i stället för React/Vue** | Minimalt fotavtryck, lättviktig reaktivitet med TypeScript kompilerat av Vite. Perfekt för ett hackathon där snabbhet räknas. |
| **Persistens i JSON-filer** | Noll beroenden, omedelbar start. Ingen databas att konfigurera — man startar och kör direkt. |
| **Vite + Handlebars** | Det bästa av två världar: snabb HMR för utveckling, HTML-partials för kodorganisation, Tailwind JIT. |
| **Centraliserade prompts** | Alla AI-prompts i `prompts.ts` — enkelt att iterera, testa och anpassa efter språk/åldersgrupp. |
| **System för flera genereringar** | Varje generering är ett oberoende objekt med eget ID — möjliggör flera blad, quiz osv. per kurs. |
| **Åldersanpassade prompts** | 4 åldersgrupper med olika ordförråd, komplexitet och ton — samma innehåll lär ut olika beroende på eleven. |
| **Agent-baserade funktioner** | Bildgenerering och webbsökning använder tillfälliga Mistral Agents — korrekt livscykel med automatisk städning. |
| **Intelligent URL-skrapning** | Ett enda fält accepterar blandade URL:er och nyckelord — URL:er skrapas via Readability (statiska sidor) med Lightpanda-fallback (JS/SPA-sidor), nyckelord triggar en Mistral web_search-Agent. Varje resultat skapar en oberoende källa. |
| **100% Mistral TTS** | Mistral Voxtral TTS (ingen extra nyckel utöver `MISTRAL_API_KEY`) — talsyntes integrerad i kostnadskedjan och i röståtergivningen per språk. |

---

## Tack och erkännanden

- **[Mistral AI](https://mistral.ai)** — AI-modeller (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lättviktigt reaktivt ramverk
- **[TailwindCSS](https://tailwindcss.com)** — Utility-baserat CSS-ramverk
- **[Vite](https://vitejs.dev)** — Frontend-byggeverktyg
- **[Lucide](https://lucide.dev)** — Ikonbibliotek
- **[Marked](https://marked.js.org)** — Markdown-parserare
- **[Readability](https://github.com/mozilla/readability)** — Extrahering av webbinnehåll (tekniken bakom Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralätt headless-webbläsare för scraping av JS/SPA-sidor
- **[Luciole](https://luciole-vision.com)** — Typsnitt utformat för läsare med nedsatt syn, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (alternativet «Läskomfort» i profilerna)

Initierat under Mistral AI Worldwide Hackathon (mars 2026), utvecklat helt med AI med [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Författare

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licens

[AGPL-3.0](LICENSE) — Upphovsrätt (C) 2026 Julien LS

**Artikel översatt från fr till sv med gpt-5.4-mini.**
