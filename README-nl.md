<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Zet elke inhoud om in een interactieve leerervaring — aangedreven door <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Kwaliteitsgate"></a>
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

**EurekAI** is ontstaan tijdens de [Mistral AI Wereldwijde Hackathon](https://luma.com/mistralhack-online) ([officiële site](https://worldwide-hackathon.mistral.ai/)) (maart 2026). Ik had een onderwerp nodig — en het idee kwam voort uit iets heel concreets: ik bereid regelmatig toetsen voor met mijn dochter, en ik dacht dat het toch mogelijk moest zijn om dat speelser en interactiever te maken met behulp van AI.

Het doel: **elke invoer** nemen — een foto van de les, een gekopieerde tekst, een geluidsopname, een webzoekopdracht — en die omzetten in **samenvattingsfiches, flashcards, quizzen, podcasts, gap-teksten, illustraties en meer**. Alles aangedreven door de Franse modellen van Mistral AI, waardoor het van nature een oplossing is die geschikt is voor Franstalige leerlingen.

De [eerste prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) werd in 48 uur tijdens de hackathon ontworpen als proof of concept rond de Mistral-diensten — al functioneel, maar beperkt. Sindsdien is EurekAI uitgegroeid tot een echt project: gap-teksten, navigatie in oefeningen, webscraping, configureerbare ouderlijke moderatie, diepgaande code-review en nog veel meer. De volledige code wordt gegenereerd door AI — voornamelijk [Claude Code](https://code.claude.com/), met enkele bijdragen via [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Functionaliteiten

| | Functionaliteit | Beschrijving |
|---|---|---|
| 📷 | **Bestanden importeren** | Importeer je lessen — foto, PDF (via Mistral OCR met gemiddeld vertrouwensscore, lagen `high`/`medium`/`low`) of tekstbestand (TXT, MD). Uploadsessies met retry per bestand en individuele voortgang |
| 📝 | **Tekstinvoer** | Typ of plak direct elke tekst |
| 🎤 | **Spraakinvoer** | Neem jezelf op — Voxtral STT transcribeert je stem |
| 🌐 | **Web / URL** | Plak een URL (rechtstreekse scraping via Readability + Lightpanda) of typ een zoekopdracht (Mistral web_search-agent) |
| 📄 | **Samenvattingsfiches** | Gestructureerde notities met kernpunten, woordenschat, citaten, anekdotes |
| 🃏 | **Flashcards** | Interactieve vraag/antwoord-kaarten, dialogische audio-afspeelmodus |
| ❓ | **Meerkeuzequiz** | Meerkeuzevragen met adaptieve herziening van fouten (aantal configureerbaar) |
| ✏️ | **Gap-teksten** | Oefeningen om aan te vullen met aanwijzingen en tolerante validatie |
| 🔤 | **Dictee** | Woorden gedicteerd in audio (Voxtral TTS) vanuit een geïmporteerde lijst, invoer via toetsenbord, strikte letter-voor-letter correctie met uitgelegde spellingsregel |
| 🎙️ | **Podcast** | Mini-podcast met 2 stemmen in audio — standaard Mistral-stem of aangepaste stemmen (ouders!) |
| 🖼️ | **Illustraties** | Educatieve afbeeldingen gegenereerd door een Mistral-agent |
| 🗣️ | **Vocale quiz** | Vragen hardop voorgelezen (aangepaste stem mogelijk), mondeling antwoord, AI-verificatie |
| 💬 | **AI-tutor** | Contextuele chat met je lesdocumenten, met toolaanroepen |
| 🧠 | **Automatische router** | Een op `mistral-small-latest` gebaseerde router analyseert de inhoud en stelt een combinatie van generatoren voor uit de 8 beschikbare typen |
| 🔒 | **Ouderlijk toezicht** | Configureerbare moderatie per profiel (aanpasbare categorieën), ouderlijke pincode, chatbeperkingen |
| 🌍 | **Meertalig** | Interface beschikbaar in 9 talen; AI-generatie aanstuurbaar in 15 talen via de prompts |
| 🔊 | **Hardop voorlezen** | Luister naar de fiches en flashcards (vraag/antwoord-dialogen) via Mistral Voxtral TTS |
| 💶 | **API-kosten volgen** | Transparante schatting van de €-kosten van elke generatie en bron (tokens / tekens / pagina's / seconden audio). Badge per kaart + totaal per project, zichtbaar in het dashboard |
| 🎨 | **Thema per profiel** | Elk profiel kiest zijn thema `dark` of `light` — blijft behouden bij profielwissel |

---

## Architectuuroverzicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architectuur-overzicht" width="800" />
</p>

---

## Kaart van modelgebruik

<p align="center">
  <img src="public/assets/model-map.webp" alt="Koppeling van AI-modellen aan taken" width="800" />
</p>

---

## Gebruikerspad

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Leertraject van de student" width="800" />
</p>

---

## Diepgaand — Functionaliteiten

### Multimodale invoer

EurekAI accepteert 4 soorten bronnen, gemodereerd volgens het profiel (standaard geactiveerd voor kind en tiener) :

- **Bestanden importeren** — JPG-, PNG- of PDF-bestanden verwerkt via Mistral OCR — **OCR 3 (`mistral-ocr-2512`) standaard**, **OCR 4 (`mistral-ocr-4-0`) optioneel** in de Instellingen (betere kwaliteit, maar 2× de kosten) — voor gedrukt tekst, tabellen en handschrift; of tekstbestanden (TXT, MD) die rechtstreeks worden geïmporteerd. Multi-bestandsuploads gebruiken een systeem van **uploadsessies**: individuele voortgang per bestand, retry van het mislukte bestand zonder de andere opnieuw te verzenden, sessie sluiten wanneer klaar. De OCR geeft een **gemiddelde vertrouwensscore** (`average`, begrensd in `[0,1]`, berekend op basis van `averagePageConfidenceScore` teruggegeven door Mistral), weergegeven in de UI als badge tier `high` / `medium` / `low` (drempels ~0.9 / ~0.7) — waarschuwt zonder te blokkeren als de scan van slechte kwaliteit is.
- **Vrije tekst** — Typ of plak elke inhoud. Gemodereerd vóór opslag als moderatie actief is.
- **Spraakinvoer** — Neem audio op in de browser. Getranscribeerd door `voxtral-mini-latest`. De instelling `language="fr"` optimaliseert de herkenning.
- **Web / URL** — Plak een of meerdere URL's om de inhoud rechtstreeks te scrapen (Readability + Lightpanda voor JS-pagina's), of typ trefwoorden voor een webzoekopdracht via een Mistral-agent. Het enkele veld accepteert beide — URL's en trefwoorden worden automatisch gescheiden, elk resultaat creëert een onafhankelijke bron.

### AI-contentgeneratie

Acht soorten gegenereerd leermateriaal:

| Generator | Model | Uitvoer |
|---|---|---|
| **Samenvattingsfiche** | `mistral-large-latest` | Titel, samenvatting, kernpunten, woordenschat, citaten, anekdote |
| **Flashcards** | `mistral-large-latest` | Vraag/antwoord-kaarten met verwijzingen naar de bronnen (aantal configureerbaar) |
| **Meerkeuzequiz** | `mistral-large-latest` | Meerkeuzevragen, uitleg, adaptieve herziening (aantal configureerbaar) |
| **Gap-teksten** | `mistral-large-latest` | Zinnen om aan te vullen met aanwijzingen, tolerante validatie (Levenshtein) |
| **Dictee** | `mistral-large-latest` + Voxtral TTS | Belangrijke woorden in audio gedicteerd (1 MP3/woord) → invoer via toetsenbord → strikte correctie (accenten) met uitgelegde regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script met 2 stemmen → MP3-audio |
| **Illustratie** | Agent `mistral-large-latest` | Educatieve afbeelding via de tool `image_generation` |
| **Vocale quiz** | `mistral-large-latest` + Voxtral TTS + STT | Vragen TTS → antwoord STT → AI-verificatie |

### AI-tutor via chat

Een conversationele tutor met volledige toegang tot de lesdocumenten:

- Gebruikt `mistral-large-latest`
- **Toolaanroepen**: kan tijdens het gesprek fiches, flashcards, quizzen of gap-teksten genereren
- Geschiedenis van 50 berichten per cursus
- Moderatie van inhoud als die is geactiveerd voor het profiel

### Automatische router

De router gebruikt `mistral-small-latest` om de inhoud van de bronnen te analyseren en de meest relevante generatoren voor te stellen uit de 8 beschikbare. De interface toont de voortgang in realtime: eerst een analysefase, daarna de afzonderlijke generaties met mogelijkheid tot annuleren.

### Adaptief leren

- **Quizstatistieken**: tracking van pogingen en nauwkeurigheid per vraag
- **Quizherziening**: genereert 5-10 nieuwe vragen gericht op zwakke concepten
- **Detectie van leerdoelen**: detecteert herzieningsinstructies ("Ik ken mijn les als ik weet...") en geeft daar prioriteit aan in compatibele tekstgeneratoren (fiche, flashcards, quiz, gap-teksten)

### Beveiliging & ouderlijk toezicht

- **4 leeftijdsgroepen**: kind (≤10 jaar), tiener (11-15), student (16-25), volwassene (26+)
- **Inhoudsmoderatie**: `mistral-moderation-latest` met 10 beschikbare categorieën, 5 standaard geblokkeerd voor kind/tiener (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorieën per profiel aanpasbaar in de instellingen.
- **Ouderlijke pincode**: SHA-256-hash, vereist voor profielen jonger dan 15 jaar. Voor productie-implementatie: gebruik een trage hash met zout (Argon2id, bcrypt).
- **Chatbeperkingen**: AI-chat standaard uitgeschakeld voor jonger dan 16 jaar, door ouders te activeren

### Multi-profielsysteem

- Meerdere profielen met naam, leeftijd, avatar, taalvoorkeuren
- **Stem per profiel** (`Profile.mistralVoices?: { host, guest }`) — elk kind kan zijn eigen podcast-/vocale quiz-stemmenpaar hebben
- **Thema per profiel** (`Profile.theme: 'dark' | 'light'`) — automatische wissel bij profielverandering, bewaard aan de backend-kant
- Projecten gekoppeld aan profielen via `profileId`
- Cascadeverwijdering: een profiel verwijderen verwijdert al zijn projecten

### API-kosten volgen

Elke Mistral-aanroep (chat, OCR, STT, TTS, moderatie, agents) wordt geïnstrumenteerd om een **transparante** €-schatting aan de gebruiker te geven — geen verrassingen op de factuur.

- **Bron van waarheid**: `helpers/pricing.ts` — `MODEL_PRICING` per modelprefix (bijv. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` met Mistral-doc-URL's voor periodieke her-scraping
- **Ondersteunde eenheden**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie aangestuurd door `helpers/cost-calc.ts`
- **Instrumentatieketen**: `helpers/tracked-client.ts` (wrap Mistral-client) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectie in de HTTP-respons)
- **UI**: kostenbadge per generatie (`src/partials/cost-badge-gen.html`), per bron (`cost-badge-src.html`), cumulatief totaal in het dashboard (`Project.totalCost`)
- **Endpoints**: de responses `/generate/*` en `/sources/*` decoreren het geretourneerde object (Generation / Source) met `estimatedCost`, `usage` en `costBreakdown`. `POST /generate/auto/route` voegt een veld `costDelta: number` toe voor de kosten van alleen de routering. `GET /projects/:pid` retourneert het verrijkte project met `totalCost` (som berekend vanaf `costLog[]`) + de volledige geschiedenis

### Multi-provider TTS & aangepaste stemmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral-spraaksynthese, geen extra sleutel nodig
- **Aangepaste stemmen**: ouders kunnen hun eigen stemmen maken via de Mistral Voices API (op basis van een audiofragment) en toewijzen aan de rollen host/gast — podcasts en vocale quizzen worden dan gelezen met de stem van een ouder, waardoor de ervaring voor het kind nog meeslepender wordt
- Twee configureerbare stemrollen: **host** (hoofdnarrator) en **gast** (tweede podcaststem)
- Volledige catalogus van Mistral-stemmen beschikbaar in de instellingen, filterbaar op taal

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
| **Ontwikkelserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Responsieve interface, door Vite gecompileerde TypeScript |
| **Templating** | vite-plugin-handlebars | HTML-compositie via partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderatie |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, geïntegreerde spraaksynthese |
| **Iconen** | Lucide 1.x | SVG-icoonbibliotheek |
| **Webscraping** | Readability + linkedom | Extractie van de hoofdinhoud van webpagina's (Firefox Reader View-technologie) |
| **Headless browser** | Lightpanda | Ultra-lichte headless browser (Zig + V8) voor JS-/SPA-pagina's — fallback scraping |
| **Markdown** | Marked | Markdown-rendering in de chat |
| **Bestandsupload** | Multer 2.x | Verwerking van multipart-formulieren |
| **Audio** | ffmpeg-static | Samenvoegen van audiosegmenten |
| **Tests** | Vitest | Unit-tests — dekking gemeten door SonarCloud |
| **Persistentie** | JSON-bestanden | Opslag zonder afhankelijkheden |

---

## Modelreferentie

| Model | Gebruik | Waarom |
|---|---|---|
| `mistral-large-latest` | Fiche, Flashcards, Podcast, Quiz, Gap-teksten, Chat, Controle vocale quiz, Beeld-agent, Web Search-agent, Detectie van instructies | Beste meertaligheid + instructievolging |
| `mistral-ocr-2512` (OCR 3, standaard) | OCR van documenten | Gedrukte tekst, tabellen, handschrift ($2 / 1000 pagina's) |
| `mistral-ocr-4-0` (OCR 4, optie) | OCR van documenten — superieure kwaliteit | Selecteerbaar in de Instellingen, 2× de kosten ($4 / 1000 pagina's) |
| `voxtral-mini-latest` | Spraakherkenning (STT) | Meertalige STT, geoptimaliseerd met `language="fr"` |
| `voxtral-mini-tts-latest` | Spraaksynthese (TTS) | Podcasts, vocale quiz, hardop voorlezen |
| `mistral-moderation-latest` | Inhoudsmoderatie | 5 categorieën geblokkeerd voor kind/tiener (+ jailbreaking) |
| `mistral-small-latest` | Automatische router | Snelle inhoudsanalyse voor routeringsbeslissingen |

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

> **Opmerking** : Mistral Voxtral TTS is de enige TTS-aanbieder — geen extra sleutel nodig bovenop `MISTRAL_API_KEY`.

> **Door de gebruiker ingevoerde API-sleutel** : `MISTRAL_API_KEY` is voortaan **optioneel**. Als die ontbreekt, start de app alsnog en vraagt elke gebruiker om **zijn eigen Mistral-sleutel** in de interface in te voeren. De sleutel wordt **in de browser opgeslagen** (versleuteld via Web Crypto + IndexedDB in een veilige context) en per verzoek verzonden — **nooit op de server persistent opgeslagen**. Voorrang: profielsleutel > globale browsersleutel > `MISTRAL_API_KEY` (env). Het instellen van `EUREKAI_REQUIRE_USER_KEY=true` verplicht elke gebruiker om zijn sleutel op te geven (de env-sleutel dient dan alleen nog voor preloads).

> **Lokale HTTPS (tablet/LAN)** : `localhost` is al een veilige context. Voor LAN-toegang (tablet) genereer je een lokaal certificaat en schakel je HTTPS in om browserversleuteling te ontgrendelen + de sleutel onderweg te versleutelen:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert indien beschikbaar, anders openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite via HTTPS
> ```

### Omgevingsvariabelen

| Variabele | Vereist | Standaard | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | optioneel | — | Mistral API-sleutel (chat, OCR, STT, Voxtral TTS, agents, moderatie). Als die ontbreekt, voert de gebruiker zijn sleutel in in de app (opgeslagen in de browser, nooit op de server) |
| `EUREKAI_REQUIRE_USER_KEY` | optioneel | `false` | `true` → schakelt de terugval op `MISTRAL_API_KEY` uit voor AI-verzoeken (elke gebruiker MOET zijn sleutel verstrekken). Nuttig op een publiek blootgestelde instantie |
| `HTTPS_KEY` / `HTTPS_CERT` | optioneel | — | TLS-sleutel/certificaatpaden (zie `scripts/gen-cert.sh`) → Express en Vite serveren via HTTPS (veilige LAN/tablet-context) |
| `PORT` | optioneel | `3000` | HTTP-poort van de Express-backend |
| `NODE_ENV` | optioneel | `development` | Als `production` → serveert Express de frontend vanaf `dist/` (anders `public/`) |
| `SONAR_TOKEN` | optioneel CI | — | Wordt alleen gebruikt door de GitHub Actions SonarCloud-workflow |

### Tests, codekwaliteit en bijdragen

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)** : `pre-commit` start `npm test`, `pre-push` start `npm run security`. Beide blokkeren de commit/push bij een mislukking.

**Vereiste externe tools (optioneel maar gebruikt door `pretest` / `npm run security`)** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Zonder deze tools faalt `npm test` bij `pretest` (lizard ontbreekt) en faalt `npm run security` (opengrep ontbreekt). De Husky-hooks blokkeren dan de commit/push.

---

## Containerimplementatie

De image is gepubliceerd op **GitHub Container Registry** :

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

> **`:U`** is een Podman rootless-vlag die automatisch de volumemachtigingen aanpast.

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

> **Voor AI-bijdragers** : raadpleeg [`CLAUDE.md`](CLAUDE.md) voor de gedetailleerde architectuurcontext, de verplichte regels (anti-leak prompts, foutcodes, kostenregistratie) en de bekende valkuilen (Lizard CCN, Opengrep, Codacy/Semgrep-migratie).

---

## API-referentie

### Configuratie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/config` | Huidige configuratie |
| `PUT` | `/api/config` | Configuratie wijzigen (modellen, stem, TTS-model) |
| `GET` | `/api/config/status` | API-status: `mistral` (Mistral-sleutel ingesteld), `ttsAvailable` (alias van `mistral`, Mistral Voxtral is de enige TTS-aanbieder) |
| `POST` | `/api/config/reset` | Standaardconfiguratie resetten |
| `GET` | `/api/config/voices` | Mistral TTS-stemmen opsommen (optioneel `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Beschikbare moderatiecategorieën + standaardwaarden per leeftijd |

### Profielen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/profiles` | Alle profielen opsommen |
| `POST` | `/api/profiles` | Een profiel aanmaken |
| `PUT` | `/api/profiles/:id` | Een profiel wijzigen (PIN vereist voor < 15 jaar) |
| `DELETE` | `/api/profiles/:id` | Een profiel verwijderen + cascaderende projecten `{pin?}` → `{ok, deletedProjects}` |

### Projecten
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects` | Projecten opsommen (`?profileId=` optioneel) |
| `POST` | `/api/projects` | Een project `{name, profileId}` aanmaken |
| `GET` | `/api/projects/:pid` | Projectdetails |
| `PUT` | `/api/projects/:pid` | Hernoemen `{name}` |
| `DELETE` | `/api/projects/:pid` | Het project verwijderen |

### Bronnen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-bestanden importeren (OCR voor JPG/PNG/PDF, directe lezing voor TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Vrije tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-stem (multipart-audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping of webzoekopdracht `{query}` — geeft een array van bronnen terug |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Een bron verwijderen |
| `POST` | `/api/projects/:pid/moderate` | Modereren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Herzieningsinstructies detecteren |

### Generatie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Herhalingsfiche |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Meerkeuzequiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Invulteksten |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictee (woorden + voorbeeldzinnen + regels, 1 TTS-audio per woord; ook voorgesteld door de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustratie |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Spraakquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptieve herziening `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Gerichte herhalingsfiche op de fout beantwoorde vragen van een quiz `{generationId, weakQuestions}` — wordt parallel aan `quiz-review` aangeroepen via de knop « Oefen op mijn fouten » |
| `POST` | `/api/projects/:pid/generate/route` | Routeringsanalyse (plan van de te starten generatoren) — geeft `{plan, costDelta}` terug (kosten van alleen de routering) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische backend-generatie (routering + 8 types: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Uitvoering parallel — veronderstelt een Mistral-tier met rate-limit ≥ 8 gelijktijdige verzoeken; anders kunnen meerdere 429's in `failedSteps` terugkomen. |

Alle generatieroutes accepteren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` en `remediation-summary` vereisen bovendien `{generationId, weakQuestions}`.

### CRUD voor generaties
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antwoorden op invulteksten indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Dictee-antwoorden indienen `{answers}` (strikte serverscore) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Een mondeling antwoord verifiëren (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-hardop voorlezen (fiches/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Hernoemen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | De generatie verwijderen |

### Chat
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | De chatgeschiedenis ophalen |
| `POST` | `/api/projects/:pid/chat` | Een bericht verzenden `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | De chatgeschiedenis wissen |

---

## Architectonische keuzes

| Beslissing | Motivatie |
|---|---|
| **Alpine.js in plaats van React/Vue** | Minimale footprint, lichte reactiviteit met TypeScript gecompileerd door Vite. Perfect voor een hackathon waar snelheid telt. |
| **Persistentie in JSON-bestanden** | Geen afhankelijkheden, direct opstarten. Geen database om te configureren — je start op en gaat meteen aan de slag. |
| **Vite + Handlebars** | Het beste van twee werelden: snelle HMR voor ontwikkeling, HTML-partials voor codeorganisatie, Tailwind JIT. |
| **Gecentraliseerde prompts** | Alle AI-prompts in `prompts.ts` — makkelijk te itereren, testen en aanpassen per taal/leeftijdsgroep. |
| **Multi-generatiesysteem** | Elke generatie is een onafhankelijk object met een eigen ID — maakt meerdere fiches, quizzen, enz. per les mogelijk. |
| **Leeftijdsafhankelijke prompts** | 4 leeftijdsgroepen met verschillende woordenschat, complexiteit en toon — dezelfde inhoud wordt verschillend onderwezen naargelang de leerling. |
| **Op Agents gebaseerde functies** | De beeldgeneratie en webzoekopdracht gebruiken tijdelijke Mistral Agents — een schone levenscyclus met automatische opruiming. |
| **Slim URL-scraping** | Eén enkel veld accepteert gemengde URL's en trefwoorden — URL's worden gescrapet via Readability (statische pagina's) met fallback Lightpanda (JS/SPA-pagina's), trefwoorden activeren een Mistral web_search-Agent. Elk resultaat maakt een onafhankelijke bron aan. |
| **100% Mistral TTS** | Mistral Voxtral TTS (geen extra sleutel bovenop `MISTRAL_API_KEY`) — spraaksynthese geïntegreerd in de kostenketen en de stemresolutie per taal. |

---

## Credits & dankbetuigingen

- **[Mistral AI](https://mistral.ai)** — AI-modellen (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Mistral AI Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lichtgewicht reactief framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend buildtool
- **[Lucide](https://lucide.dev)** — Iconenbibliotheek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extractie van webinhoud (technologie achter Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultra-lichte headless browser voor het scrapen van JS/SPA-pagina's
- **[Luciole](https://luciole-vision.com)** — Lettertype ontworpen voor slechtziende lezers, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (optie « Leescomfort » van de profielen)

Begonnen tijdens de Mistral AI Worldwide Hackathon (maart 2026), volledig ontwikkeld door AI met [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licentie

[AGPL-3.0](LICENSE) — Auteursrecht (C) 2026 Julien LS

**Artikel vertaald van fr naar nl met gpt-5.4-mini.**
