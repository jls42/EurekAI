<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformeer elke content in een interactieve leerervaring — aangedreven door <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

**EurekAI** is ontstaan tijdens de [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiële site](https://worldwide-hackathon.mistral.ai/)) (maart 2026). Ik had een onderwerp nodig — en het idee kwam uit iets heel concreets: ik bereid regelmatig de toetsen voor met mijn dochter, en ik dacht dat het mogelijk moest zijn om dat leuker en interactiever te maken met behulp van AI.

Het doel: **elke invoer** nemen — een foto van de les, een gekopieerde tekst, een spraakopname, een webzoekopdracht — en die omzetten in **samenvattingsfiches, flashcards, quizzen, podcasts, invuloefeningen, illustraties, en nog veel meer**. Alles aangedreven door de Franse modellen van Mistral AI, waardoor het een oplossing is die van nature geschikt is voor Franstalige leerlingen.

Het [initiële prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) werd in 48 uur tijdens de hackathon ontworpen als proof of concept rond de Mistral-diensten — al werkend, maar beperkt. Sindsdien is EurekAI uitgegroeid tot een echt project: invuloefeningen, navigatie door oefeningen, webscraping, configureerbare ouderlijke moderatie, diepgaande codereview, en nog veel meer. De volledige code wordt gegenereerd door AI — voornamelijk [Claude Code](https://code.claude.com/), met enkele bijdragen via [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Overzicht

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Rondleiding door EurekAI: bronnen, fiche, quiz, flashcards, illustraties" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — recente generaties, geschatte kosten per kaart en projecttotaal, knop « Auto — Magie ! » | ![Bronnen](docs/screenshots/sources.webp)<br>**Bronnen** — import van foto/PDF/tekst/stem/web, generatie met één klik, opdrachtdetectie |

Elke geïmporteerde bron toont zijn [OCR-vertrouwensscore, moderatie en geschatte kosten](docs/screenshots/sources-list.webp).

### Componenten in actie

| | |
|---|---|
| ![Samenvattingsfiche](docs/screenshots/notes.gif)<br>**Samenvattingsfiche** — kernpunten, woordenschat, bronvermelde citaten, audio-voorlezen per sectie | ![Quiz](docs/screenshots/quiz.gif)<br>**Meerkeuzequiz** — directe feedback met uitleg, stapsgewijze navigatie |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — om te draaien kaart en daarna zelfevaluatie « ik wist het / ik wist het niet » | ![Invuloefeningen](docs/screenshots/fillblank.gif)<br>**Invuloefeningen** — hint op aanvraag, tolerante validatie |
| ![Dictee](docs/screenshots/dictation.gif)<br>**Dictee** — woord gedicteerd in audio, strikte letter-voor-lettercorrectie | ![Spraakquiz](docs/screenshots/vocal-quiz.gif)<br>**Spraakquiz** — vraag hardop voorgelezen, antwoord via microfoon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast met 2 stemmen, raadpleegbaar dialoogscript | ![Illustraties](docs/screenshots/illustrations.gif)<br>**Illustraties** — educatieve beelden gegenereerd door Agent |
| ![AI-mentor](docs/screenshots/chat.gif)<br>**AI-mentor** — chat verankerd in de cursusdocumenten, uitgelegde antwoorden, kan quizzen en flashcards genereren | |

### Aan de slag

| | |
|---|---|
| ![Keuze van profiel](docs/screenshots/login.gif)<br>**Keuze van profiel** — elk kind heeft zijn eigen ruimte, avatar en taal | ![Profiel aanmaken](docs/screenshots/profile-create.gif)<br>**Profiel aanmaken** — leeftijd, avatar, ouderlijke pincode voor jonger dan 15 jaar |
| ![Cursus aanmaken](docs/screenshots/course.gif)<br>**Cursus aanmaken** — één project per les, klaar om bronnen te ontvangen | ![Instellingen](docs/screenshots/settings.gif)<br>**Instellingen** — API-status, keuze van AI-modellen met getoonde tarieven |

---

## Functies

| | Functie | Beschrijving |
|---|---|---|
| 📷 | **Bestandsimport** | Importeer je lessen — foto, PDF (via Mistral OCR met gemiddeld vertrouwensscore, niveaus `high`/`medium`/`low`) of tekstbestand (TXT, MD). Uploadsessies met retry per bestand en individuele voortgang |
| 📝 | **Tekstinvoer** | Typ of plak rechtstreeks elke tekst |
| 🎤 | **Spraakinvoer** | Neem jezelf op — Voxtral STT transcribeert je stem |
| 🌐 | **Web / URL** | Plak een URL (direct scrapen via Readability + Lightpanda) of typ een zoekopdracht (Agent Mistral web_search) |
| 📄 | **Samenvattingsfiches** | Gestructureerde notities met kernpunten, woordenschat, citaten, anekdotes |
| 🃏 | **Flashcards** | Interactieve Q&A-kaarten, dialogische audioweergave |
| ❓ | **Meerkeuzequiz** | Meerkeuzevragen met adaptieve herziening van fouten (configureerbaar aantal) |
| ✏️ | **Invuloefeningen** | Oefeningen om aan te vullen met hints en tolerante validatie |
| 🔤 | **Dictee** | Gedicteerde woorden in audio (Voxtral TTS) uit een geïmporteerde lijst, invoer via toetsenbord, strikte letter-voor-lettercorrectie met uitgelegde spellingsregel |
| 🎙️ | **Podcast** | Mini-podcast met 2 stemmen in audio — standaard Mistral-stem of aangepaste stemmen (ouders!) |
| 🖼️ | **Illustraties** | Educatieve beelden gegenereerd door een Mistral Agent |
| 🗣️ | **Spraakquiz** | Hardop voorgelezen vragen (aangepaste stem mogelijk), mondeling antwoord, AI-verificatie |
| 💬 | **AI-mentor** | Contextuele chat met je cursusdocumenten, met toolaanroepen |
| 🧠 | **Automatische router** | Een router op basis van `mistral-small-latest` analyseert de content en stelt een combinatie van generators voor uit de 8 beschikbare types |
| 🔒 | **Ouderlijk toezicht** | Configureerbare moderatie per profiel (aanpasbare categorieën), ouderlijke pincode, chatbeperkingen |
| 🌍 | **Meertalig** | Interface beschikbaar in 9 talen; AI-generatie aanstuurbaar in 15 talen via de prompts |
| 🔊 | **Voorlezen** | Luister naar de fiches en flashcards (vraag/antwoord-dialogue) via Mistral Voxtral TTS |
| 💶 | **API-kostenbewaking** | Transparante schatting van de €-kosten van elke generatie en bron (tokens / tekens / pagina's / audioseconden). Badge per kaart + totaal per project, zichtbaar in het dashboard |
| 🎨 | **Thema per profiel** | Elk profiel kiest zijn `dark` of `light`-thema — blijft behouden bij profielwissel |

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
  <img src="public/assets/user-journey.webp" alt="Leerreis van de student" width="800" />
</p>

---

## Diepgaande blik — Functies

### Multimodale invoer

EurekAI accepteert 4 soorten bronnen, gemodereerd op basis van het profiel (standaard ingeschakeld voor kind en tiener) :

- **Bestandsimport** — JPG-, PNG- of PDF-bestanden verwerkt via Mistral OCR — **OCR 4 (`mistral-ocr-4-0`) standaard** (beste kwaliteit), **OCR 3 (`mistral-ocr-2512`) optioneel** in de Instellingen (goedkoper, ~½ van de kosten) — voor gedrukte tekst, tabellen en handschrift; of tekstbestanden (TXT, MD) die rechtstreeks worden geïmporteerd. Multi-bestandsuploads gebruiken een **uploadsessie**-systeem: individuele voortgang per bestand, retry van het mislukte bestand zonder de andere opnieuw te verzenden, de sessie sluiten wanneer klaar. De OCR biedt een gemiddeld **vertrouwensscore** (`average`, afgekapt in `[0,1]`, berekend op basis van `averagePageConfidenceScore` geretourneerd door Mistral), weergegeven in de UI als badge niveau `high` / `medium` / `low` (drempels ~0.9 / ~0.7) — waarschuwt zonder te blokkeren als de scan van slechte kwaliteit is.
- **Vrije tekst** — Typ of plak elke inhoud. Voor opslag gemodereerd als moderatie actief is.
- **Spraakinvoer** — Neem audio op in de browser. Getranscribeerd door `voxtral-mini-latest`. De parameter `language="fr"` optimaliseert de herkenning.
- **Web / URL** — Plak één of meerdere URL's om de content rechtstreeks te scrapen (Readability + Lightpanda voor JS-pagina's), of typ trefwoorden voor een webzoekopdracht via Agent Mistral. Het enkele veld accepteert beide — URL's en trefwoorden worden automatisch gescheiden, elk resultaat creëert een onafhankelijke bron.

### AI-contentgeneratie

Acht soorten gegenereerd leermateriaal:

| Generator | Model | Uitvoer |
|---|---|---|
| **Samenvattingsfiche** | `mistral-large-latest` | Titel, samenvatting, kernpunten, woordenschat, citaten, anekdote |
| **Flashcards** | `mistral-large-latest` | Q&A-kaarten met bronverwijzingen (configureerbaar aantal) |
| **Meerkeuzequiz** | `mistral-large-latest` | Meerkeuzevragen, uitleg, adaptieve herziening (configureerbaar aantal) |
| **Invuloefeningen** | `mistral-large-latest` | Zinnen om aan te vullen met hints, tolerante validatie (Levenshtein) |
| **Dictee** | `mistral-large-latest` + Voxtral TTS | Gedicteerde kernwoorden in audio (1 MP3/woord) → invoer via toetsenbord → strikte correctie (accenten) met uitgelegde regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script met 2 stemmen → MP3-audio |
| **Illustratie** | Agent `mistral-large-latest` | Educatieve afbeelding via de tool `image_generation` |
| **Spraakquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-vragen → STT-antwoord → AI-verificatie |

### AI-mentor via chat

Een conversatieve tutor met volledige toegang tot de cursusdocumenten:

- Gebruikt `mistral-large-latest`
- **Toolaanroep**: kan tijdens het gesprek fiches, flashcards, quizzen of invuloefeningen genereren
- Geschiedenis van 50 berichten per cursus
- Moderatie van content als die is ingeschakeld voor het profiel

### Automatische router

De router gebruikt `mistral-small-latest` om de inhoud van de bronnen te analyseren en de meest relevante generators voor te stellen uit de 8 beschikbare. De interface toont de voortgang in realtime: eerst een analysefase, daarna de afzonderlijke generaties met mogelijkheid tot annuleren.

### Adaptief leren

- **Quizstatistieken**: opvolging van pogingen en nauwkeurigheid per vraag
- **Quizherziening**: genereert 5-10 nieuwe vragen die zich richten op zwakke concepten
- **Opdrachtdetectie**: detecteert herzieningsinstructies ("Ik ken mijn les als ik weet...") en geeft ze prioriteit in de compatibele tekstgenerators (fiche, flashcards, quiz, invuloefeningen)

### Beveiliging & ouderlijk toezicht

- **4 leeftijdsgroepen**: kind (≤10 jaar), tiener (11-15), student (16-25), volwassene (26+)
- **Contentmoderatie**: `mistral-moderation-2603` (Mistral Moderation 2) met 10 beschikbare categorieën, 5 standaard geblokkeerd voor kind/tiener (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorieën aanpasbaar per profiel in de instellingen. De alias `-latest` wordt bewust vermeden (wijst nog steeds naar een verouderde versie).
- **Ouderlijke pincode**: SHA-256-hash, vereist voor profielen jonger dan 15 jaar. Voor een productie-uitrol moet je een trage hash met salt voorzien (Argon2id, bcrypt).
- **Chatbeperkingen**: AI-chat standaard uitgeschakeld voor jongeren onder 16 jaar, door ouders te activeren

### Systeem met meerdere profielen

- Meerdere profielen met naam, leeftijd, avatar, taalvoorkeuren
- **Stem per profiel** (`Profile.mistralVoices?: { host?, guest? }` — elke rol is optioneel) — elk kind kan zijn eigen podcast-/spraakquiz-stemmenpaar hebben
- **Thema per profiel** (`Profile.theme: 'dark' | 'light'`) — automatische omschakeling bij profielwissel, bewaard aan backendzijde
- Projecten gekoppeld aan profielen via `profileId`
- Cascaderende verwijdering: het verwijderen van een profiel verwijdert al zijn projecten

### API-kostenbewaking

Elke Mistral-aanroep (chat, OCR, STT, TTS, moderatie, agents) wordt geïnstrumenteerd om de gebruiker een **transparante** €-schatting te geven — geen verrassingen op de factuur.

- **Bron van waarheid**: `helpers/pricing.ts` — `MODEL_PRICING` per modelprefix (bv: `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` met Mistral-doc-URL's voor periodieke her-scraping
- **Ondersteunde eenheden**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie aangestuurd door `helpers/cost-calc.ts`
- **Instrumentatieketen**: `helpers/tracked-client.ts` (wrap Mistral-client) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectie in de HTTP-respons)
- **UI**: kostenbadge per generatie (`src/partials/cost-badge-gen.html`), per bron (`cost-badge-src.html`), cumulatief totaal in het dashboard (`Project.totalCost`)
- **Endpoints**: de `/generate/*`- en `/sources/*`-responsen decoreren het geretourneerde object (Generation / Source) met `estimatedCost`, `usage` en `costBreakdown`. `POST /generate/route` voegt een veld `costDelta: number` toe voor alleen de kosten van de routering. `GET /projects/:pid` retourneert het verrijkte project met `totalCost` (som berekend vanaf `costLog[]`) + de volledige geschiedenis

### TTS (Mistral Voxtral) & aangepaste stemmen

- **Mistral Voxtral TTS** : `voxtral-mini-tts-latest`, 100% Mistral-spraaksynthese, geen extra sleutel nodig
- **Aangepaste stemmen**: ouders kunnen hun eigen stemmen aanmaken via de Mistral Voices-API (op basis van een audiofragment) en toewijzen aan de rollen host/gast — de podcasts en spraakquizzen worden dan voorgelezen met de stem van een ouder, wat de ervaring voor het kind nog meeslepender maakt
- Twee configureerbare stemrollen: **host** (hoofdnarrator) en **gast** (tweede podcaststem)
- De volledige catalogus van Mistral-stemmen is beschikbaar in de instellingen, filterbaar per taal

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
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, moderatie |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, geïntegreerde spraaksynthese |
| **Iconen** | Lucide 1.x | SVG-iconenbibliotheek |
| **Webscraping** | Readability + linkedom | Extractie van de hoofdinhoud van webpagina's (Firefox Reader View-technologie) |
| **Headless browser** | Lightpanda | Ultralichte headless browser (Zig + V8) voor JS/SPA-pagina's — fallback scraping |
| **Markdown** | Marked | Markdown-rendering in de chat |
| **Bestanden uploaden** | Multer 2.x | Beheer van multipart-formulieren |
| **Audio** | ffmpeg-static | Samenvoegen van audiosegmenten |
| **Tests** | Vitest | Unit tests — dekking gemeten door SonarCloud |
| **Persistie** | JSON-bestanden | Opslag zonder afhankelijkheden |

---

## Modelreferentie

| Model | Gebruik | Waarom |
|---|---|---|
| `mistral-large-latest` | Fiche, Flashcards, Podcast, Quiz, Teksten met invulvelden, Chat, Stemquizcontrole, Image Agent, Web Search Agent, Detectie van instructies | Beste meertaligheid + instructievolging |
| `mistral-ocr-4-0` (OCR 4, standaard) | Document-OCR — superieure kwaliteit | Gedrukte tekst, tabellen, handschrift ($4 / 1000 pagina's) |
| `mistral-ocr-2512` (OCR 3, optie) | Document-OCR | Te selecteren in Instellingen, goedkoper ($2 / 1000 pagina's) |
| `voxtral-mini-latest` | Spraakherkenning (STT) | Meertalige STT, geoptimaliseerd met `language="fr"` |
| `voxtral-mini-tts-latest` | Spraaksynthese (TTS) | Podcasts, stemquiz, hardop voorlezen |
| `mistral-moderation-2603` | Inhoudsmoderatie | 5 geblokkeerde categorieën voor kind/tiener (waaronder `jailbreaking`) |
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

> **Opmerking**: Mistral Voxtral TTS is de enige TTS-provider — geen extra sleutel nodig naast `MISTRAL_API_KEY`.

> **Door de gebruiker ingevoerde API-sleutel**: `MISTRAL_API_KEY` is nu **optioneel**. Als deze ontbreekt, start de app alsnog en vraagt elke gebruiker om **zijn of haar eigen Mistral-sleutel** in de interface in te voeren. De sleutel wordt **in de browser opgeslagen** (versleuteld via Web Crypto + IndexedDB in een beveiligde context) en per verzoek verzonden — **nooit persistent opgeslagen op de server**. Prioriteit: profielsleutel > globale browsersleutel > `MISTRAL_API_KEY` (env). Als `EUREKAI_REQUIRE_USER_KEY=true` wordt ingesteld, moet elke gebruiker zijn sleutel opgeven (de env-sleutel wordt dan alleen nog gebruikt voor preloads).

> **Lokale HTTPS (tablet/LAN)**: `localhost` is al een beveiligde context. Voor LAN-toegang (tablet) genereer je een lokaal certificaat en schakel je HTTPS in om browserversleuteling te ontgrendelen + de sleutel onderweg te versleutelen:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert indien beschikbaar, anders self-signed openssl
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite via HTTPS
> ```

### Omgevingsvariabelen

| Variabele | Vereist | Standaard | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | optioneel | — | Mistral API-sleutel (chat, OCR, STT, TTS Voxtral, agents, moderatie). Als deze ontbreekt, voert de gebruiker zijn sleutel in in de app (opgeslagen in de browser, nooit op de server) |
| `EUREKAI_REQUIRE_USER_KEY` | optioneel | `false` | `true` → schakelt de fallback naar `MISTRAL_API_KEY` uit voor AI-verzoeken (elke gebruiker MOET zijn sleutel opgeven). Handig op een blootgestelde instance |
| `HTTPS_KEY` / `HTTPS_CERT` | optioneel | — | Paden voor TLS-sleutel/certificaat (zie `scripts/gen-cert.sh`) → Express en Vite serveren via HTTPS (veilige LAN/tablet-context) |
| `PORT` | optioneel | `3000` | HTTP-poort van de Express-backend |
| `NODE_ENV` | optioneel | `development` | Als `production` → serveert Express het frontend vanaf `dist/` (anders `public/`) |
| `SONAR_TOKEN` | optioneel CI | — | Alleen gebruikt door de GitHub Actions SonarCloud-workflow |

### Tests, codekwaliteit en bijdragen

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)**: `pre-commit` voert achtereenvolgens `scripts/pre-commit-fast.sh` uit (conflicten, grote bestanden, shellcheck), `lint-staged` en daarna `npm test`; `pre-push` voert eerst een `npm audit`-gate uit (blokkeert bij transitive kritieke kwetsbaarheid, zie `scripts/audit-verdict.mjs`) en daarna `npm run security`. Alles blokkeert commit/push bij een fout.

**Vereiste externe tools (optioneel maar gebruikt door `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Zonder deze tools faalt `npm test` bij `pretest` (lizard ontbreekt) en `npm run security` faalt (opengrep ontbreekt). De Husky-hooks blokkeren dan de commit/push.

---

## Container-deployment

De image wordt gepubliceerd op **GitHub Container Registry** :

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

> **`:U`** is een rootless Podman-flag die automatisch de rechten van het volume aanpast.

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
docs/                     — Notes internes (inventaire prompts, audits, prompts des diagrammes) + screenshots du README
scripts/                  — Tooling : check-deps, check-models, check-security, check-complexity, gen-cert, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **Voor AI-bijdragers**: raadpleeg [`CLAUDE.md`](CLAUDE.md) voor de gedetailleerde architectuurcontext, de verplichte regels (anti-leak prompts, foutcodes, cost tracking) en de bekende valkuilen (Lizard CCN, Opengrep, Codacy/Semgrep-migratie).

---

## API-referentie

### Configuratie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/config` | Huidige configuratie |
| `PUT` | `/api/config` | Configuratie wijzigen (modellen, stem, TTS-model) |
| `GET` | `/api/config/status` | API-status: `mistral` (Mistral-sleutel ingesteld), `ttsAvailable` (alias van `mistral`, Mistral Voxtral is de enige TTS-provider) |
| `POST` | `/api/config/reset` | Configuratie terugzetten naar standaardwaarden |
| `GET` | `/api/config/voices` | Mistral TTS-stemmen opsommen (optioneel `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Beschikbare moderatiecategorieën + standaardwaarden per leeftijd |
| `POST` | `/api/providers/mistral/validate` | Een door de gebruiker ingevoerde Mistral-sleutel valideren — altijd 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), geen env-fallback |

### Profielen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/profiles` | Alle profielen opsommen |
| `POST` | `/api/profiles` | Een profiel aanmaken |
| `PUT` | `/api/profiles/:id` | Een profiel wijzigen (PIN vereist voor < 15 jaar) |
| `DELETE` | `/api/profiles/:id` | Een profiel verwijderen + cascade projecten `{pin?}` → `{ok, deletedProjects}` |

### Projecten
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects` | Projecten opsommen (`?profileId=` optioneel) |
| `POST` | `/api/projects` | Een project `{name, profileId}` aanmaken |
| `GET` | `/api/projects/:pid` | Projectdetails |
| `PUT` | `/api/projects/:pid` | `{name}` hernoemen |
| `DELETE` | `/api/projects/:pid` | Het project verwijderen |
| `GET` | `/api/projects/:pid/events` | Realtime SSE-stroom (`event: generation`) van generatietransities (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Bronnen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-bestanden importeren (OCR voor JPG/PNG/PDF, directe uitlezing voor TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Vrije tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-spraak (multipart-audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping of webzoekopdracht `{query}` — retourneert een array met bronnen |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Een bron verwijderen |
| `POST` | `/api/projects/:pid/moderate` | `{text}` modereren |
| `POST` | `/api/projects/:pid/detect-consigne` | Herhalingsinstructies detecteren |

### Generatie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Herzieningsfiche |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Meerkeuzequiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Invulteksten |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictee (woorden + voorbeeldzinnen + regels, 1 TTS-audio per woord; ook voorgesteld door de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustratie |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Stemquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptieve herhaling `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Gerichte herhalingsfiche op de vragen die fout waren in een quiz `{generationId, weakQuestions}` — parallel aangeroepen met `quiz-review` door de knop « Oefenen op mijn fouten » |
| `POST` | `/api/projects/:pid/generate/route` | Routeringsanalyse (plan van de te starten generators) — geeft `{plan, costDelta}` terug (kost van alleen de routering) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische backend-generatie (routering + 8 types: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Uitvoering parallel — veronderstelt een Mistral-tier met rate-limit ≥ 8 gelijktijdige verzoeken; anders kunnen meerdere 429's in `failedSteps` terugkomen. |

Alle generatieroutes accepteren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` en `remediation-summary` vereisen bovendien `{generationId, weakQuestions}`.

### CRUD-generaties
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antwoorden op invulteksten indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Dictee-antwoorden indienen `{answers}` (strikte serverscore) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Een mondeling antwoord controleren (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-voorlezing hardop (fiches/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Een lopende generatie annuleren (enige annuleringspad van een pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` hernoemen |
| `DELETE` | `/api/projects/:pid/generations/:gid` | De generatie verwijderen |

### Chat
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatgeschiedenis ophalen |
| `POST` | `/api/projects/:pid/chat` | Een bericht verzenden `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatgeschiedenis wissen |

---

## Architecturale keuzes

| Beslissing | Motivatie |
|---|---|
| **Alpine.js in plaats van React/Vue** | Minimale footprint, lichte reactiviteit met door Vite gecompileerde TypeScript. Perfect voor een hackathon waar snelheid telt. |
| **Persistie in JSON-bestanden** | Geen afhankelijkheden, direct opstarten. Geen database om te configureren — gewoon starten en gaan. |
| **Vite + Handlebars** | Het beste van twee werelden: snelle HMR voor ontwikkeling, HTML-partials voor code-organisatie, Tailwind JIT. |
| **Gecentraliseerde prompts** | Alle AI-prompts in `prompts.ts` — gemakkelijk itereren, testen en aanpassen per taal/leeftijdsgroep. |
| **Multi-generatiesysteem** | Elke generatie is een onafhankelijk object met een eigen ID — maakt meerdere fiches, quizzen, enz. per les mogelijk. |
| **Leeftijdsgebonden prompts** | 4 leeftijdsgroepen met verschillende woordenschat, complexiteit en toon — dezelfde inhoud onderwijst anders afhankelijk van de leerling. |
| **Op Agents gebaseerde functies** | De beeldgeneratie en webzoekopdracht gebruiken tijdelijke Mistral Agents — schone levenscyclus met automatische opschoning. |
| **Slim URL-scraping** | Eén enkel veld accepteert gemengde URL's en sleutelwoorden — de URL's worden gescrapet via Readability (statische pagina's) met Lightpanda-fallback (JS/SPA-pagina's), de sleutelwoorden starten een Mistral web_search-Agent. Elk resultaat creëert een onafhankelijke bron. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (geen extra sleutel nodig naast `MISTRAL_API_KEY`) — spraaksynthese geïntegreerd in de kostenketen en in de stemresolutie per taal. |

---

## Credits & dankbetuigingen

- **[Mistral AI](https://mistral.ai)** — AI-modellen (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lichte reactieve framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend buildtool
- **[Lucide](https://lucide.dev)** — Iconenbibliotheek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extractie van webinhoud (Firefox Reader View-technologie)
- **[Lightpanda](https://lightpanda.io)** — Ultralichte headless browser voor het scrapen van JS/SPA-pagina's
- **[Luciole](https://luciole-vision.com)** — Lettertype ontworpen voor slechtziende lezers, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (optie « Leescomfort » van profielen)

Opgestart tijdens de Mistral AI Worldwide Hackathon (maart 2026), volledig ontwikkeld door AI met [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licentie

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel vertaald van fr naar nl met gpt-5.4-mini.**
