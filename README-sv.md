<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logotyp" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Förvandla vilket innehåll som helst till en interaktiv lärandeupplevelse — driven av <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

**EurekAI** föddes under [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiella webbplatsen](https://worldwide-hackathon.mistral.ai/)) (mars 2026). Jag behövde ett ämne — och idén kom från något väldigt konkret: jag förbereder regelbundet prov med min dotter, och jag tänkte att det borde gå att göra det mer lekfullt och interaktivt med hjälp av AI.

Målet: att ta **vilken inmatning som helst** — ett foto av läxan, en inklistrad text, en ljudinspelning, en webbsökning — och förvandla den till **repetitionsblad, flashkort, quiz, podcasts, lucktexter, illustrationer och mer**. Allt drivet av Mistral AI:s franska modeller, vilket gör det till en naturligt anpassad lösning för fransktalande elever.

Den [första prototypen](https://github.com/jls42/worldwide-hackathon.mistral.ai) byggdes på 48 timmar under hackathonet som ett bevis på koncept kring Mistral-tjänsterna — redan fungerande, men begränsat. Sedan dess har EurekAI blivit ett riktigt projekt: lucktexter, navigering i övningarna, webbskrapning, konfigurerbar föräldramodering, djupgående kodgranskning och mycket mer. Hela koden genereras av AI — främst [Claude Code](https://code.claude.com/), med vissa bidrag via [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Funktioner

| | Funktion | Beskrivning |
|---|---|---|
| 📷 | **Filimport** | Importera dina lektioner — foto, PDF (via Mistral OCR med genomsnittlig förtroendescore, nivå `high`/`medium`/`low`) eller textfil (TXT, MD). Uppladdningssessioner med omförsök per fil och individuella framsteg |
| 📝 | **Textinmatning** | Skriv eller klistra in vilken text som helst direkt |
| 🎤 | **Röstinmatning** | Spela in dig själv — Voxtral STT transkriberar din röst |
| 🌐 | **Webb / URL** | Klistra in en URL (direkt skrapning via Readability + Lightpanda) eller skriv en sökning (Mistral web_search-agent) |
| 📄 | **Repetitionsblad** | Strukturerade anteckningar med nyckelpunkter, vokabulär, citat, anekdoter |
| 🃏 | **Flashkort** | Interaktiva frågor/svar-kort, dialogisk ljuduppspelning |
| ❓ | **Flervalsquiz** | Flervalsfrågor med adaptiv genomgång av fel (konfigurerbart antal) |
| ✏️ | **Lucktexter** | Övningar att fylla i med ledtrådar och tolerant validering |
| 🎙️ | **Podcast** | Mini-podcast med två röster i ljud — Mistral-röst som standard eller anpassade röster (föräldrar!) |
| 🖼️ | **Illustrationer** | Pedagogiska bilder genererade av en Mistral-agent |
| 🗣️ | **Röstquiz** | Frågor upplästa högt (anpassad röst möjlig), muntligt svar, AI-verifiering |
| 💬 | **AI-handledare** | Kontextuell chatt med dina kursdokument, med verktygsanrop |
| 🧠 | **Automatisk rutning** | En router baserad på `mistral-small-latest` analyserar innehållet och föreslår en kombination av generatorer bland de 7 tillgängliga typerna |
| 🔒 | **Föräldrakontroll** | Konfigurerbar moderering per profil (anpassningsbara kategorier), föräldrakod, chattbegränsningar |
| 🌍 | **Flerspråkigt** | Gränssnitt tillgängligt på 9 språk; AI-generering styrbar på 15 språk via prompts |
| 🔊 | **Högläsning** | Lyssna på repetitionsblad och flashkort (fråga/svar-dialog) via Mistral Voxtral TTS |
| 💶 | **Spårning av API-kostnader** | Transparent uppskattning av €-kostnaden för varje generering och källa (tokens / tecken / sidor / ljudsekunder). Badge per kort + totalsumma per projekt, synlig i instrumentpanelen |
| 🎨 | **Tema per profil** | Varje profil väljer sitt tema `dark` eller `light` — bestående vid profilbyte |

---

## Översikt över arkitekturen

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Översikt över arkitekturen" width="800" />
</p>

---

## Karta över modellanvändning

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI-modell-till-uppgiftsmappning" width="800" />
</p>

---

## Användarresa

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Studentens läranderesa" width="800" />
</p>

---

## Djupdykning — Funktioner

### Multimodal inmatning

EurekAI accepterar 4 typer av källor, modererade enligt profilen (aktiverat som standard för barn och tonåringar) :

- **Filimport** — JPG-, PNG- eller PDF-filer behandlade med Mistral OCR — **OCR 3 (`mistral-ocr-2512`) som standard**, **OCR 4 (`mistral-ocr-4-0`) som tillval** i inställningarna (bättre kvalitet, men 2× kostnaden) — för tryckt text, tabeller och handskrift; eller textfiler (TXT, MD) importerade direkt. Multi-fil-uppladdningar använder ett system med **uppladdningssessioner**: individuell framdrift per fil, omförsök för den misslyckade filen utan att skicka om de andra, avvisning av sessionen när den är klar. OCR exponerar en **genomsnittlig förtroendescore** (`average`, klampad till `[0,1]`, beräknad från `averagePageConfidenceScore` returnerade av Mistral), visad i UI som en nivåbadge `high` / `medium` / `low` (trösklar ~0.9 / ~0.7) — varnar utan att blockera om skanningen är av dålig kvalitet.
- **Fri text** — Skriv eller klistra in vilket innehåll som helst. Modereras före lagring om moderering är aktiv.
- **Röstinmatning** — Spela in ljud i webbläsaren. Transkriberas av `voxtral-mini-latest`. Parametern `language="fr"` optimerar igenkänningen.
- **Webb / URL** — Klistra in en eller flera URLs för att skrapa innehållet direkt (Readability + Lightpanda för JS-sidor), eller skriv nyckelord för en webbsökning via Mistral-agenten. Det enda fältet accepterar båda — URLs och nyckelord separeras automatiskt, och varje resultat skapar en separat källa.

### AI-innehållsgenerering

Sju typer av genererat undervisningsmaterial:

| Generator | Modell | Utdata |
|---|---|---|
| **Repetitionsblad** | `mistral-large-latest` | Titel, sammanfattning, nyckelpunkter, vokabulär, citat, anekdot |
| **Flashkort** | `mistral-large-latest` | Fråga/svar-kort med källhänvisningar (konfigurerbart antal) |
| **Flervalsquiz** | `mistral-large-latest` | Flervalsfrågor, förklaringar, adaptiv genomgång (konfigurerbart antal) |
| **Lucktexter** | `mistral-large-latest` | Sats att fylla i med ledtrådar, tolerant validering (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Manus för 2 röster → MP3-ljud |
| **Illustration** | Agent `mistral-large-latest` | Pedagogisk bild via verktyget `image_generation` |
| **Röstquiz** | `mistral-large-latest` + Voxtral TTS + STT | Frågor TTS → svar STT → AI-verifiering |

### AI-handledare via chatt

En konversationshandledare med full åtkomst till kursdokumenten:

- Använder `mistral-large-latest`
- **Verktygsanrop**: kan generera repetitionsblad, flashkort, quiz eller lucktexter under samtalet
- Historik med 50 meddelanden per kurs
- Innehållsmoderering om aktiverad för profilen

### Automatisk router

Routern använder `mistral-small-latest` för att analysera innehållet i källorna och föreslå de mest relevanta generatorerna bland de 7 tillgängliga. Gränssnittet visar framstegen i realtid: först en analysfas, sedan individuella genereringar med möjlighet att avbryta.

### Adaptivt lärande

- **Quizstatistik**: uppföljning av försök och träffsäkerhet per fråga
- **Quizgenomgång**: genererar 5-10 nya frågor som riktar in sig på svaga koncept
- **Instruktionsdetektering**: känner igen repetitionsinstruktioner ("Jag kan min läxa om jag kan...") och prioriterar dem i kompatibla textgeneratorer (repetitionsblad, flashkort, quiz, lucktexter)

### Säkerhet & föräldrakontroll

- **4 åldersgrupper**: barn (≤10 år), tonåring (11-15), student (16-25), vuxen (26+)
- **Innehållsmoderering**: `mistral-moderation-latest` med 10 tillgängliga kategorier, 5 blockerade som standard för barn/tonåringar (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Anpassningsbara kategorier per profil i inställningarna.
- **Föräldrakod**: SHA-256-hash, krävs för profiler under 15 år. För produktionsdrift, använd en långsam hash med salt (Argon2id, bcrypt).
- **Chattbegränsningar**: AI-chatt avaktiverad som standard för under 16 år, kan aktiveras av föräldrar

### System med flera profiler

- Flera profiler med namn, ålder, avatar, språkinställningar
- **Röster per profil** (`Profile.mistralVoices?: { host, guest }`) — varje barn kan ha sitt eget par av podcast-/röstquiz-röster
- **Tema per profil** (`Profile.theme: 'dark' | 'light'`) — automatisk växling vid profilbyte, lagras bestående i backend
- Projekt kopplade till profiler via `profileId`
- Kaskadborttagning: att ta bort en profil tar bort alla dess projekt

### Spårning av API-kostnader

Varje Mistral-anrop (chatt, OCR, STT, TTS, moderering, agenter) instrumenteras för att ge en **transparent** uppskattning av € för användaren — inga överraskningar på fakturan.

- **Sanningens källa**: `helpers/pricing.ts` — `MODEL_PRICING` per modellprefix (t.ex. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` med Mistral-dokumentations-URLs för periodisk omskrapning
- **Stödda enheter**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konvertering styrd av `helpers/cost-calc.ts`
- **Instrumenteringskedja**: `helpers/tracked-client.ts` (wrap klient Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injektion i HTTP-svaret)
- **UI**: kostnadsbadge per generering (`src/partials/cost-badge-gen.html`), per källa (`cost-badge-src.html`), ackumulerad totalsumma i instrumentpanelen (`Project.totalCost`)
- **Endpoints**: svaren `/generate/*` och `/sources/*` dekorerar det returnerade objektet (Generation / Source) med `estimatedCost`, `usage` och `costBreakdown`. `POST /generate/auto/route` lägger till ett fält `costDelta: number` för kostnaden för själva routingen. `GET /projects/:pid` returnerar projektet berikat med `totalCost` (summa beräknad från `costLog[]`) + hela historiken

### TTS med flera leverantörer & anpassade röster

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral-syntetiserad tal, ingen extra nyckel behövs
- **Anpassade röster**: föräldrar kan skapa sina egna röster via Mistral Voices API (från ett ljudprov) och tilldela dem till rollerna värd/gäst — podcasts och röstquiz läses då med en förälders röst, vilket gör upplevelsen ännu mer uppslukande för barnet
- Två konfigurerbara röstroller: **värd** (huvudberättare) och **gäst** (podcastens andra röst)
- Komplett katalog över Mistrals röster tillgänglig i inställningarna, filtrerbar efter språk

### Internationalisering

- Gränssnitt tillgängligt på 9 språk: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompts stöder 15 språk (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Språk konfigurerbart per profil

---

## Teknikstack

| Lager | Teknik | Roll |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server och typsäkerhet |
| **Backend** | Express 5.x | REST API |
| **Utvecklingsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Responsivt gränssnitt, TypeScript kompilerat av Vite |
| **Templating** | vite-plugin-handlebars | HTML-komposition via partials |
| **AI** | Mistral AI SDK 2.x | Chatt, OCR, STT, TTS, agenter, moderering |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, inbyggd talsyntes |
| **Ikoner** | Lucide 1.x | SVG-ikonsbibliotek |
| **Webbskrapning** | Readability + linkedom | Extraktion av huvudinnehållet i webbsidor (teknik från Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultralätt headless-webbläsare (Zig + V8) för JS/SPA-sidor — fallback vid skrapning |
| **Markdown** | Marked | Markdown-rendering i chatten |
| **Filuppladdning** | Multer 2.x | Hantering av multipart-formulär |
| **Ljud** | ffmpeg-static | Sammanfogning av ljudsegment |
| **Tester** | Vitest | Enhetstester — täckning mätt av SonarCloud |
| **Persistens** | JSON-filer | Lagring utan beroenden |

---

## Modellreferens

| Modell | Användning | Varför |
|---|---|---|
| `mistral-large-latest` | Repetitionsblad, Flashcards, Podcast, Quiz, Lucktexter, Chatt, Verifiering av röstquiz, Bildagent, Webb­sökningsagent, Instruktionsdetektering | Bäst på flerspråkighet + instruktionsföljning |
| `mistral-ocr-2512` (OCR 3, standard) | OCR av dokument | Tryckt text, tabeller, handskrift ($2 / 1000 sidor) |
| `mistral-ocr-4-0` (OCR 4, tillval) | OCR av dokument — högre kvalitet | Kan väljas i Inställningar, 2× kostnaden ($4 / 1000 sidor) |
| `voxtral-mini-latest` | Taligenkänning (STT) | Flerspråkig STT, optimerad med `language="fr"` |
| `voxtral-mini-tts-latest` | Talsyntes (TTS) | Podcasts, röstquiz, högläsning |
| `mistral-moderation-latest` | Innehållsmoderering | 5 kategorier blockerade för barn/tonåringar (+ jailbreaking) |
| `mistral-small-latest` | Automatisk router | Snabb analys av innehållet för routningsbeslut |

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

> **Användarinskriven API-nyckel**: `MISTRAL_API_KEY` är nu **valfri**. Om den saknas startar appen ändå och uppmanar varje användare att ange **sin egen Mistral-nyckel** i gränssnittet. Nyckeln **lagras i webbläsaren** (krypterad via Web Crypto + IndexedDB i säker kontext) och skickas per begäran — **aldrig lagrad på servern**. Prioritet: profilnyckel > global webbläsarnyckel > `MISTRAL_API_KEY` (env). Att sätta `EUREKAI_REQUIRE_USER_KEY=true` tvingar varje användare att ange sin nyckel (env-nyckeln används då endast för förinläsningar).

> **Lokalt HTTPS (surfplatta/LAN)**: `localhost` är redan en säker kontext. För LAN-åtkomst (surfplatta), generera ett lokalt certifikat och aktivera HTTPS för att låsa upp webbläsarkryptering + kryptera nyckeln under transport:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert om tillgängligt, annars openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite i HTTPS
> ```
### Miljövariabler

| Variabel | Krävs | Standard | Roll |
|---|---|---|---|
| `MISTRAL_API_KEY` | valfritt | — | Mistral API-nyckel (chatt, OCR, STT, Voxtral TTS, agenter, moderering). Om den saknas anger användaren sin nyckel i appen (lagras i webbläsaren, aldrig på servern) |
| `EUREKAI_REQUIRE_USER_KEY` | valfritt | `false` | `true` → inaktiverar fallback till `MISTRAL_API_KEY` för AI-förfrågningar (varje användare MÅSTE ange sin egen nyckel). Användbart på en exponerad instans |
| `HTTPS_KEY` / `HTTPS_CERT` | valfritt | — | Sökvägar för TLS-nyckel/certifikat (se `scripts/gen-cert.sh`) → Express och Vite serverar via HTTPS (säker kontext på LAN/surfplatta) |
| `PORT` | valfritt | `3000` | HTTP-port för Express-backenden |
| `NODE_ENV` | valfritt | `development` | Om `production` → serverar Express frontend från `dist/` (annars `public/`) |
| `SONAR_TOKEN` | valfritt CI | — | Används endast av GitHub Actions-workflödet SonarCloud |

### Tester, kodkvalitet och bidrag

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)** : `pre-commit` kör `npm test`, `pre-push` kör `npm run security`. Båda blockerar commit/push vid fel.

**Krävda externa verktyg (valfria men används av `pretest` / `npm run security`)** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Utan dessa verktyg misslyckas `npm test` vid `pretest` (lizard saknas) och `npm run security` misslyckas (opengrep saknas). Husky-hooks blockerar då commit/push.

---

## Driftsättning med container

Imagen publiceras på **GitHub Container Registry** :

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

> **`:U`** är en rootless Podman-flagga som automatiskt justerar volymens behörigheter.

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
types.ts                  — Types TypeScript : Source, Generation (7 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, 15 langues)

generators/
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (7 agents) + MAX_AUTO_PLAN_LENGTH
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
  generate.ts             — Endpoints de génération (7 types + auto + route)
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

> **För AI-bidragare** : se [`CLAUDE.md`](CLAUDE.md) för detaljerad arkitekturkontekst, obligatoriska regler (anti-leak prompts, felkoder, kostnadsuppföljning) och kända fallgropar (Lizard CCN, Opengrep, Codacy/Semgrep-migrering).

---

## API-referens

### Konfiguration
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/config` | Aktuell konfiguration |
| `PUT` | `/api/config` | Ändra konfigurationen (modeller, röster, TTS-modell) |
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
| `DELETE` | `/api/profiles/:id` | Ta bort en profil + kaskad för projekt `{pin?}` → `{ok, deletedProjects}` |

### Projekt
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects` | Lista projekten (`?profileId=` valfritt) |
| `POST` | `/api/projects` | Skapa ett projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektinformation |
| `PUT` | `/api/projects/:pid` | Byt namn på `{name}` |
| `DELETE` | `/api/projects/:pid` | Ta bort projektet |

### Källor
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importera multipart-filer (OCR för JPG/PNG/PDF, direktläsning för TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Fritext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-röst (multipart-ljud) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping eller webbsökning `{query}` — returnerar en array med källor |
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
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Vokal quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptiv repetition `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Routningsanalys (plan för vilka generatorer som ska köras) — returnerar `{plan, costDelta}` (kostnaden för enbart routningen) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatisk backendgenerering (routing + 7 typer: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image). Körs parallellt — förutsätter ett Mistral-abonnemang med rate limit ≥ 7 samtidiga förfrågningar; annars kan flera 429:or komma tillbaka i `failedSteps`. |

Alla genereringsrutter accepterar `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` kräver dessutom `{generationId, weakQuestions}`.

### CRUD för genereringar
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Skicka in quizsvar `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Skicka in svar för lucktexter `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Kontrollera ett muntligt svar (ljud + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-uppläsning högt (repetitionsblad/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Byt namn på `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ta bort genereringen |

### Chatt
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Hämta chattens historik |
| `POST` | `/api/projects/:pid/chat` | Skicka ett meddelande `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Rensa chattens historik |

---

## Arkitekturbeslut

| Beslut | Motivering |
|---|---|
| **Alpine.js i stället för React/Vue** | Minimal fotavtryck, lätt reaktivitet med TypeScript kompilerat av Vite. Perfekt för en hackathon där hastighet räknas. |
| **Persistens i JSON-filer** | Noll beroenden, omedelbar start. Ingen databas att konfigurera — vi startar och kör. |
| **Vite + Handlebars** | Det bästa av två världar: snabb HMR för utveckling, HTML-partials för kodstrukturering, Tailwind JIT. |
| **Centraliserade prompts** | Alla AI-prompts i `prompts.ts` — enkla att iterera, testa och anpassa efter språk/åldersgrupp. |
| **System för flera genereringar** | Varje generering är ett oberoende objekt med eget ID — möjliggör flera blad, quiz etc. per kurs. |
| **Åldersanpassade prompts** | 4 åldersgrupper med olika vokabulär, komplexitet och ton — samma innehåll lär ut olika beroende på eleven. |
| **Funktioner baserade på agenter** | Bildgenerering och webbsökning använder temporära Mistral-agenter — ren livscykel med automatisk städning. |
| **Intelligent URL-scraping** | Ett enda fält accepterar blandade URL:er och nyckelord — URL:erna scrapas via Readability (statiska sidor) med fallback till Lightpanda (JS/SPA-sidor), nyckelorden utlöser en Mistral web_search-agent. Varje resultat skapar en oberoende källa. |
| **100 % Mistral TTS** | Mistral Voxtral TTS (ingen extra nyckel utöver `MISTRAL_API_KEY`) — talsyntes integrerad i kostnadskedjan och röstval per språk. |

---

## Tack och erkännanden

- **[Mistral AI](https://mistral.ai)** — AI-modeller (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lätt reaktivt ramverk
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS-ramverk
- **[Vite](https://vitejs.dev)** — Frontend-byggverktyg
- **[Lucide](https://lucide.dev)** — Ikonbibliotek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Webbinnehållsextraktion (Firefox Reader View-teknik)
- **[Lightpanda](https://lightpanda.io)** — Ultralätt headless-webbläsare för scraping av JS/SPA-sidor

Initierat under Mistral AI Worldwide Hackathon (mars 2026), utvecklat helt av AI med [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Författare

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licens

[AGPL-3.0](LICENSE) — Upphovsrätt (C) 2026 Julien LS

**Artikel översatt från fr till sv med gpt-5.4-mini.**
