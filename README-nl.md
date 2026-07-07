<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Zet elke vorm van inhoud om in een interactieve leerervaring — mogelijk gemaakt door <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Engels</a> · <a href="README-es.md">🇪🇸 Spaans</a> · <a href="README-pt.md">🇧🇷 Portugees</a> · <a href="README-de.md">🇩🇪 Duits</a> · <a href="README-it.md">🇮🇹 Italiaans</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 Arabisch</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chinees</a> · <a href="README-ja.md">🇯🇵 Japans</a> · <a href="README-ko.md">🇰🇷 Koreaans</a> · <a href="README-pl.md">🇵🇱 Pools</a> · <a href="README-ro.md">🇷🇴 Roemeens</a> · <a href="README-sv.md">🇸🇪 Zweeds</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube-demo"></a>
</p>

<h4 align="center">📊 Codekwaliteit</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Quality Gate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Beveiligingsscore"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Betrouwbaarheidsscore"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Onderhoudbaarheidsscore"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Dekking"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Kwetsbaarheden"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Codegeuren"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Regels code"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy-badge"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Het verhaal — Waarom EurekAI?

**EurekAI** is ontstaan tijdens de [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiële site](https://worldwide-hackathon.mistral.ai/)) (maart 2026). Ik had een onderwerp nodig — en het idee kwam voort uit iets heel concreets: ik bereid regelmatig toetsen voor met mijn dochter, en ik dacht dat het mogelijk moest zijn om dat speelser en interactiever te maken met AI.

Het doel: **elke invoer** nemen — een foto van de les, gekopieerde tekst, een spraakopname, een webzoekopdracht — en die omzetten in **samenvattingen, flashcards, quizzen, podcasts, invuloefeningen, illustraties en nog veel meer**. Alles aangedreven door de Franse modellen van Mistral AI, waardoor het een oplossing is die natuurlijk aansluit bij Nederlandstalige leerlingen.

Het [eerste prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) werd in 48 uur tijdens de hackathon gemaakt als proof of concept rond de diensten van Mistral — al functioneel, maar beperkt. Sindsdien is EurekAI uitgegroeid tot een echt project: invuloefeningen, navigatie in oefeningen, webscraping, configureerbare ouderlijke moderatie, uitgebreide codereview en nog veel meer. De volledige code wordt door AI gegenereerd — voornamelijk [Claude Code](https://code.claude.com/), met enkele bijdragen via [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Functies

| | Functie | Beschrijving |
|---|---|---|
| 📷 | **Bestandsimport** | Importeer je lessen — foto, PDF (via Mistral OCR met gemiddeld vertrouwensscore, derde `high`/`medium`/`low`) of tekstbestand (TXT, MD). Uploadsessies met retry per bestand en individuele voortgang |
| 📝 | **Tekstinvoer** | Typ of plak direct elke tekst |
| 🎤 | **Spraakinvoer** | Neem jezelf op — Voxtral STT transcribeert je stem |
| 🌐 | **Web / URL** | Plak een URL (directe scraping via Readability + Lightpanda) of typ een zoekopdracht (Mistral-agent web_search) |
| 📄 | **Samenvattingen** | Gestructureerde notities met kernpunten, woordenschat, цитaten, anekdotes |
| 🃏 | **Flashcards** | Interactieve Q/A-kaarten, dialogische audio-lezing |
| ❓ | **Meerkeuzequiz** | Meerkeuzevragen met adaptieve herziening van fouten (aantal configureerbaar) |
| ✏️ | **Invuloefeningen** | Oefeningen om aan te vullen met hints en tolerante validatie |
| 🔤 | **Dictee** | In audio gedicteerde woorden (Voxtral TTS) uit een geïmporteerde lijst, invoer via toetsenbord, strikte letter-voor-letter-correctie met uitgelegde spellingsregel |
| 🎙️ | **Podcast** | Mini-podcast met 2 stemmen in audio — standaard Mistral-stem of aangepaste stemmen (ouders!) |
| 🖼️ | **Illustraties** | Educatieve afbeeldingen gegenereerd door een Mistral-agent |
| 🗣️ | **Spraakquiz** | Vragen hardop voorgelezen (aangepaste stem mogelijk), mondeling antwoord, AI-verificatie |
| 💬 | **AI-tutor** | Contextuele chat met je lesdocumenten, met toolaanroepen |
| 🧠 | **Automatische router** | Een router op basis van `mistral-small-latest` analyseert de inhoud en stelt een combinatie van generators voor uit de 8 beschikbare types |
| 🔒 | **Ouderlijk toezicht** | Configureerbare moderatie per profiel (aanpasbare categorieën), ouderlijke pincode, chatbeperkingen |
| 🌍 | **Meertalig** | Interface beschikbaar in 9 talen; AI-generatie bestuurbaar in 15 talen via prompts |
| 🔊 | **Voorlezen** | Luister naar samenvattingen en flashcards (vraag/antwoorddialoog) via Mistral Voxtral TTS |
| 💶 | **API-kosten volgen** | Transparante schatting van de €-kosten van elke generatie en bron (tokens / tekens / pagina's / audioseconden). Badge per kaart + totaal per project, zichtbaar in het dashboard |
| 🎨 | **Thema per profiel** | Elk profiel kiest zijn `dark`- of `light`-thema — blijft behouden bij wisselen van profiel |

---

## Architectuuroverzicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architectuuroverzicht" width="800" />
</p>

---

## Modelgebruikskaart

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI-model-naar-taak-mapping" width="800" />
</p>

---

## Gebruikersreis

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Leertraject van de leerling" width="800" />
</p>

---

## Diepgaande duik — Functies

### Multimodale invoer

EurekAI accepteert 4 soorten bronnen, gemodereerd volgens het profiel (standaard ingeschakeld voor kind en tiener) :

- **Bestandsimport** — JPG-, PNG- of PDF-bestanden verwerkt door Mistral OCR — **OCR 4 (`mistral-ocr-4-0`) standaard** (beste kwaliteit), **OCR 3 (`mistral-ocr-2512`) optioneel** in de Instellingen (goedkoper, ~½ van de kosten) — voor gedrukt tekst, tabellen en handschrift; of tekstbestanden (TXT, MD) direct geïmporteerd. Multi-bestandsuploads gebruiken een systeem van **uploadsessies**: individuele voortgang per bestand, retry van het mislukte bestand zonder de andere opnieuw in te dienen, sessie sluiten wanneer voltooid. De OCR geeft een gemiddeld **vertrouwensscore** terug (`average`, afgekapt in `[0,1]`, berekend op basis van `averagePageConfidenceScore` teruggegeven door Mistral), weergegeven in de UI als tier `high` / `medium` / `low`-badge (drempels ~0.9 / ~0.7) — waarschuwt zonder te blokkeren als de scan van slechte kwaliteit is.
- **Vrije tekst** — Typ of plak elke inhoud. Wordt gemodereerd vóór opslag als moderatie actief is.
- **Spraakinvoer** — Neem audio op in de browser. Getranscribeerd door `voxtral-mini-latest`. De parameter `language="fr"` optimaliseert de herkenning.
- **Web / URL** — Plak een of meerdere URL's om de inhoud rechtstreeks te scrapen (Readability + Lightpanda voor JS-pagina's), of typ trefwoorden voor een webzoekopdracht via Mistral Agent. Het ene veld accepteert beide — URL's en trefwoorden worden automatisch gescheiden, elk resultaat maakt een onafhankelijke bron aan.

### AI-contentgeneratie

Acht types gegenereerd leermateriaal:

| Generator | Model | Uitvoer |
|---|---|---|
| **Samenvatting** | `mistral-large-latest` | Titel, samenvatting, kernpunten, woordenschat, citaten, anekdote |
| **Flashcards** | `mistral-large-latest` | Q/A-kaarten met verwijzingen naar bronnen (aantal configureerbaar) |
| **Meerkeuzequiz** | `mistral-large-latest` | Meerkeuzevragen, uitleg, adaptieve herhaling (aantal configureerbaar) |
| **Invuloefeningen** | `mistral-large-latest` | Zinnen om aan te vullen met hints, tolerante validatie (Levenshtein) |
| **Dictee** | `mistral-large-latest` + Voxtral TTS | In audio gedicteerde kernwoorden (1 MP3/woord) → invoer via toetsenbord → strikte correctie (accenten) met uitgelegde regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script met 2 stemmen → MP3-audio |
| **Illustratie** | Agent `mistral-large-latest` | Educatieve afbeelding via de tool `image_generation` |
| **Spraakquiz** | `mistral-large-latest` + Voxtral TTS + STT | Vragen via TTS → antwoord via STT → AI-verificatie |

### AI-tutor via chat

Een conversatieve tutor met volledige toegang tot de lesdocumenten:

- Gebruikt `mistral-large-latest`
- **Toolaanroepen**: kan tijdens het gesprek samenvattingen, flashcards, quizzen of invuloefeningen genereren
- Geschiedenis van 50 berichten per les
- Inhoudsmoderatie indien geactiveerd voor het profiel

### Automatische router

De router gebruikt `mistral-small-latest` om de inhoud van de bronnen te analyseren en de meest relevante generators voor te stellen uit de 8 beschikbare. De interface toont de voortgang in realtime: eerst een analysefase, daarna de afzonderlijke generaties met mogelijkheid tot annuleren.

### Adaptief leren

- **Quizstatistieken**: opvolging van pogingen en nauwkeurigheid per vraag
- **Quizherhaling**: genereert 5-10 nieuwe vragen die zich richten op zwakke concepten
- **Instructiedetectie**: detecteert herzieningsinstructies ("Ik ken mijn les als ik weet...") en geeft ze prioriteit in de compatibele tekstgeneratoren (samenvatting, flashcards, quiz, invuloefeningen)

### Beveiliging & ouderlijk toezicht

- **4 leeftijdsgroepen**: kind (≤10 jaar), tiener (11-15), student (16-25), volwassene (26+)
- **Inhoudsmoderatie**: `mistral-moderation-2603` (Mistral Moderation 2) met 10 beschikbare categorieën, 5 standaard geblokkeerd voor kind/tiener (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Aanpasbare categorieën per profiel in de instellingen. De alias `-latest` wordt bewust vermeden (wijst nog steeds naar een verouderde versie).
- **Ouderlijke pincode**: SHA-256-hash, vereist voor profielen jonger dan 15 jaar. Voor een productie-implementatie: gebruik een trage hash met zout (Argon2id, bcrypt).
- **Chatbeperkingen**: AI-chat standaard uitgeschakeld voor jongeren onder 16 jaar, door ouders in te schakelen

### Multiprofielsysteem

- Meerdere profielen met naam, leeftijd, avatar, taalvoorkeuren
- **Stem per profiel** (`Profile.mistralVoices?: { host, guest }`) — elk kind kan zijn eigen podcast-/spraakquiz-stemmenpaar hebben
- **Thema per profiel** (`Profile.theme: 'dark' | 'light'`) — automatische overschakeling bij profielwissel, blijvend aan de backendkant
- Projecten gekoppeld aan profielen via `profileId`
- Cascaderende verwijdering: een profiel verwijderen verwijdert al zijn projecten

### API-kosten volgen

Elke Mistral-aanroep (chat, OCR, STT, TTS, moderatie, agents) wordt geïnstrumenteerd om de gebruiker een **transparante** €-schatting te geven — geen verrassingen op de factuur.

- **Enige bron van waarheid**: `helpers/pricing.ts` — `MODEL_PRICING` per modelprefix (bijv. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` met Mistral-doc-URL's voor periodieke herscraping
- **Ondersteunde eenheden**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie gestuurd door `helpers/cost-calc.ts`
- **Instrumentatieketen**: `helpers/tracked-client.ts` (wrap Mistral-client) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectie in de HTTP-response)
- **UI**: kostenbadge per generatie (`src/partials/cost-badge-gen.html`), per bron (`cost-badge-src.html`), gecumuleerd totaal in het dashboard (`Project.totalCost`)
- **Endpoints**: de `/generate/*`- en `/sources/*`-responses decoreren het teruggegeven object (Generation / Source) met `estimatedCost`, `usage` en `costBreakdown`. `POST /generate/route` voegt een veld `costDelta: number` toe voor alleen de routeringskosten. `GET /projects/:pid` geeft het project terug, verrijkt met `totalCost` (som berekend vanaf `costLog[]`) + de volledige geschiedenis

### TTS (Mistral Voxtral) & aangepaste stemmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral spraaksynthese, geen extra sleutel nodig
- **Aangepaste stemmen**: ouders kunnen hun eigen stemmen maken via de Mistral Voices API (op basis van een audiofragment) en ze toewijzen aan de rollen host/gast — podcasts en spraakquizzen worden dan afgespeeld met de stem van een ouder, wat de ervaring nog meeslepender maakt voor het kind
- Twee configureerbare stemrollen: **host** (hoofdnarrator) en **gast** (tweede podcaststem)
- Volledige catalogus van Mistral-stemmen beschikbaar in de instellingen, filterbaar per taal

### Internationalisering

- Interface beschikbaar in 9 talen: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompts ondersteunen 15 talen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Taal configureerbaar per profiel

---

## Technische stack

| Laag | Technologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server en typeveiligheid |
| **Backend** | Express 5.x | REST API |
| **Devserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactieve interface, TypeScript gecompileerd door Vite |
| **Templating** | vite-plugin-handlebars | HTML-samenstelling via partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderatie |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, ingebouwde spraaksynthese |
| **Iconen** | Lucide 1.x | SVG-icoonbibliotheek |
| **Webscraping** | Readability + linkedom | Extractie van de hoofdinhoud van webpagina's (technologie van Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultrichtgewicht headless browser (Zig + V8) voor JS-/SPA-pagina's — fallback scraping |
| **Markdown** | Marked | Markdown-rendering in de chat |
| **Bestandsupload** | Multer 2.x | Afhandeling van multipart-formulieren |
| **Audio** | ffmpeg-static | Samenvoegen van audiosegmenten |
| **Tests** | Vitest | Unit-tests — dekking gemeten door SonarCloud |
| **Persistentie** | JSON-bestanden | Opslag zonder afhankelijkheden |

---

## Modelreferentie

| Model | Gebruik | Waarom |
|---|---|---|
| `mistral-large-latest` | Samenvatting, Flashcards, Podcast, Quiz, Invuloefeningen, Chat, Verificatie spraakquiz, Afbeeldingsagent, Web Search-agent, Detectie van instructies | Beste multilinguale ondersteuning + instructievolging |
| `mistral-ocr-4-0` (OCR 4, standaard) | OCR van documenten — superieure kwaliteit | Gedrukte tekst, tabellen, handschrift ($4 / 1000 pagina's) |
| `mistral-ocr-2512` (OCR 3, optie) | OCR van documenten | Selecteerbaar in Instellingen, goedkoper ($2 / 1000 pagina's) |
| `voxtral-mini-latest` | Spraakherkenning (STT) | Meertalig STT, geoptimaliseerd met `language="fr"` |
| `voxtral-mini-tts-latest` | Spraaksynthese (TTS) | Podcasts, spraakquiz, voorlezen |
| `mistral-moderation-2603` | Inhoudsmoderatie | 5 categorieën geblokkeerd voor kind/tiener (waaronder `jailbreaking`) |
| `mistral-small-latest` | Automatische router | Snelle analyse van inhoud voor routeringsbeslissingen |

---
## Snel aan de slag

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

> **Opmerking**: Mistral Voxtral TTS is de enige TTS-provider — geen extra sleutel nodig naast `MISTRAL_API_KEY`.

> **Door de gebruiker ingevoerde API-sleutel**: `MISTRAL_API_KEY` is voortaan **optioneel**. Als deze ontbreekt, start de app toch en vraagt elke gebruiker om **zijn eigen Mistral-sleutel** in de interface in te voeren. De sleutel wordt **in de browser opgeslagen** (versleuteld via Web Crypto + IndexedDB in een beveiligde context) en per verzoek verzonden — **nooit op de server bewaard**. Prioriteit: profielsleutel > globale browsersleutel > `MISTRAL_API_KEY` (env). Door `EUREKAI_REQUIRE_USER_KEY=true` in te stellen, moet elke gebruiker zijn sleutel opgeven (de env-sleutel dient dan alleen nog voor preloads).

> **Lokale HTTPS (tablet/LAN)**: `localhost` is al een beveiligde context. Voor LAN-toegang (tablet) genereer je een lokaal certificaat en activeer je HTTPS om browserversleuteling te ontgrendelen + de sleutel onderweg te versleutelen:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert indien beschikbaar, anders openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite in HTTPS
> ```

### Omgevingsvariabelen

| Variabele | Vereist | Standaard | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | optioneel | — | Mistral API-sleutel (chat, OCR, STT, Voxtral TTS, agents, moderatie). Als deze ontbreekt, voert de gebruiker zijn sleutel in in de app (opgeslagen in de browser, nooit op de server) |
| `EUREKAI_REQUIRE_USER_KEY` | optioneel | `false` | `true` → schakelt de fallback naar `MISTRAL_API_KEY` uit voor AI-verzoeken (elke gebruiker MOET zijn sleutel opgeven). Handig op een blootgestelde instantie |
| `HTTPS_KEY` / `HTTPS_CERT` | optioneel | — | TLS-sleutel-/certpaden (zie `scripts/gen-cert.sh`) → Express en Vite serveren via HTTPS (beveiligde context LAN/tablet) |
| `PORT` | optioneel | `3000` | HTTP-poort van de Express-backend |
| `NODE_ENV` | optioneel | `development` | Als `production` → serveert Express de frontend vanuit `dist/` (anders `public/`) |
| `SONAR_TOKEN` | optioneel CI | — | Wordt alleen gebruikt door de GitHub Actions SonarCloud-workflow |

### Tests, codekwaliteit en bijdragen

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)**: `pre-commit` voert `npm test` uit, `pre-push` voert `npm run security` uit. Beide blokkeren de commit/push bij een fout.

**Vereiste externe tools (optioneel maar gebruikt door `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Zonder deze tools faalt `npm test` bij `pretest` (lizard ontbreekt) en faalt `npm run security` (opengrep ontbreekt). De Husky-hooks blokkeren dan de commit/push.

---

## Implementatie met container

De image wordt gepubliceerd op **GitHub Container Registry**:

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

> **`:U`** is een rootless Podman-flag die automatisch de volumepermissies aanpast.

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## Projectstructuur

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

> **Voor AI-bijdragers**: raadpleeg [`CLAUDE.md`](CLAUDE.md) voor de gedetailleerde architectuurcontext, de verplichte regels (anti-leak prompts, foutcodes, cost tracking) en bekende valkuilen (Lizard CCN, Opengrep, Codacy/Semgrep-migratie).

---

## API-referentie

### Configuratie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/config` | Huidige configuratie |
| `PUT` | `/api/config` | Configuratie wijzigen (modellen, stemmen, TTS-model) |
| `GET` | `/api/config/status` | API-status: `mistral` (Mistral-sleutel ingesteld), `ttsAvailable` (alias van `mistral`, Mistral Voxtral is de enige TTS-provider) |
| `POST` | `/api/config/reset` | Standaardconfiguratie resetten |
| `GET` | `/api/config/voices` | Mistral TTS-stemmen weergeven (optioneel `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Beschikbare moderatiecategorieën + standaardinstellingen per leeftijd |
| `POST` | `/api/providers/mistral/validate` | Een door de gebruiker ingevoerde Mistral-sleutel valideren — altijd 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), geen env-fallback |

### Profielen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/profiles` | Alle profielen weergeven |
| `POST` | `/api/profiles` | Een profiel aanmaken |
| `PUT` | `/api/profiles/:id` | Een profiel wijzigen (PIN vereist voor < 15 jaar) |
| `DELETE` | `/api/profiles/:id` | Een profiel verwijderen + cascade projecten `{pin?}` → `{ok, deletedProjects}` |

### Projecten
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects` | Projecten weergeven (`?profileId=` optioneel) |
| `POST` | `/api/projects` | Een `{name, profileId}`-project aanmaken |
| `GET` | `/api/projects/:pid` | Projectdetails |
| `PUT` | `/api/projects/:pid` | `{name}` hernoemen |
| `DELETE` | `/api/projects/:pid` | Het project verwijderen |
| `GET` | `/api/projects/:pid/events` | Realtime SSE-stroom (`event: generation`) van generatietransities (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Bronnen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-bestanden importeren (OCR voor JPG/PNG/PDF, directe lezing voor TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Vrije tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-stem (multipart-audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping of webzoekopdracht `{query}` — geeft een array van bronnen terug |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Een bron verwijderen |
| `POST` | `/api/projects/:pid/moderate` | `{text}` modereren |
| `POST` | `/api/projects/:pid/detect-consigne` | Herzieningsinstructies detecteren |

### Generatie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Herzieningsfiche |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Meerkeuzequiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Teksten met invulvakken |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictee (woorden + voorbeeldzinnen + regels, 1 TTS-audio per woord; ook aangeboden door de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustratie |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Spraakquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptieve herhaling `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Herinneringsfiche gericht op de gemiste vragen van een quiz `{generationId, weakQuestions}` — parallel aangeroepen met `quiz-review` via de knop « Oefenen op mijn fouten » |
| `POST` | `/api/projects/:pid/generate/route` | Routeringsanalyse (plan van de te starten generators) — geeft `{plan, costDelta}` terug (alleen routeringskosten) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische backend-generatie (routing + 8 types: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Parallel uitgevoerd — veronderstelt een Mistral-tier met rate-limit ≥ 8 gelijktijdige verzoeken; anders kunnen meerdere 429’s in `failedSteps` terugkomen. |

Alle generatieroutes accepteren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` en `remediation-summary` vereisen bovendien `{generationId, weakQuestions}`.

### CRUD-generaties
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antwoorden op teksten met invulvakken indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Dictee-antwoorden indienen `{answers}` (strikte serverscore) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Een mondeling antwoord controleren (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-hardop afspelen (fiches/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Een lopende generatie annuleren (enige annuleringspad van een pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` hernoemen |
| `DELETE` | `/api/projects/:pid/generations/:gid` | De generatie verwijderen |

### Chat
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | De chatgeschiedenis ophalen |
| `POST` | `/api/projects/:pid/chat` | Een bericht `{message, lang, ageGroup}` verzenden |
| `DELETE` | `/api/projects/:pid/chat` | De chatgeschiedenis wissen |

---

## Architecturale beslissingen

| Beslissing | Motivatie |
|---|---|
| **Alpine.js in plaats van React/Vue** | Minimale footprint, lichte reactiviteit met TypeScript gecompileerd door Vite. Perfect voor een hackathon waar snelheid telt. |
| **Persistentie in JSON-bestanden** | Geen afhankelijkheden, onmiddellijke start. Geen database om te configureren — je start gewoon en gaat aan de slag. |
| **Vite + Handlebars** | Het beste van twee werelden: snelle HMR voor ontwikkeling, HTML-partials voor codeorganisatie, Tailwind JIT. |
| **Gecentraliseerde prompts** | Alle AI-prompts in `prompts.ts` — gemakkelijk itereren, testen en aanpassen per taal/leeftijdsgroep. |
| **Multi-generatiesysteem** | Elke generatie is een zelfstandig object met een eigen ID — maakt meerdere fiches, quizzen, enz. per cursus mogelijk. |
| **Op leeftijd aangepaste prompts** | 4 leeftijdsgroepen met verschillende woordenschat, complexiteit en toon — dezelfde inhoud leert anders afhankelijk van de leerling. |
| **Op Agents gebaseerde functies** | De generatie van afbeeldingen en webzoekopdrachten gebruiken tijdelijke Mistral Agents — nette levenscyclus met automatische opschoning. |
| **Slimme URL-scraping** | Eén enkel veld accepteert gemengde URLs en trefwoorden — de URLs worden gescrapet via Readability (statische pagina’s) met fallback Lightpanda (JS/SPA-pagina’s), de trefwoorden starten een Mistral web_search Agent. Elk resultaat maakt een onafhankelijke bron aan. |
| **100% Mistral TTS** | Mistral Voxtral TTS (geen extra sleutel nodig naast `MISTRAL_API_KEY`) — spraaksynthese geïntegreerd in de kostenketen en de stemresolutie per taal. |

---

## Credits & dankbetuigingen

- **[Mistral AI](https://mistral.ai)** — AI-modellen (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lichtgewicht reactief framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend buildtool
- **[Lucide](https://lucide.dev)** — Iconenbibliotheek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extractie van webinhoud (technologie van Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralichte headless browser voor het scrapen van JS/SPA-pagina’s
- **[Luciole](https://luciole-vision.com)** — Lettertype ontworpen voor slechtziende lezers, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (optie « Leescomfort » van profielen)

Opgestart tijdens de Mistral AI Worldwide Hackathon (maart 2026), volledig ontwikkeld door AI met [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licentie

[AGPL-3.0](LICENSE) — Auteursrecht (C) 2026 Julien LS

**Artikel vertaald van fr naar nl met gpt-5.4-mini.**
