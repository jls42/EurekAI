<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Zet elke inhoud om in een interactieve leerervaring — aangedreven door <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube-demo"></a>
</p>

<h4 align="center">📊 Codekwaliteit</h4>

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

## Het verhaal — Waarom EurekAI?

**EurekAI** is ontstaan tijdens de [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiële site](https://worldwide-hackathon.mistral.ai/)) (maart 2026). Ik had een onderwerp nodig — en het idee kwam uit iets heel concreets: ik bereid regelmatig toetsen voor met mijn dochter, en ik dacht dat het mogelijk moest zijn om dat speelser en interactiever te maken met AI.

Het doel: **elke invoer** nemen — een foto van de les, gekopieerde tekst, een spraakopname, een webzoekopdracht — en die omzetten in **samenvattingen, flashcards, quizzen, podcasts, invuloefeningen, illustraties, en meer**. Alles aangedreven door de Franse modellen van Mistral AI, waardoor het van nature goed aansluit bij Franstalige leerlingen.

Het [initiële prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) is in 48 uur tijdens de hackathon gebouwd als proof of concept rond de Mistral-diensten — al werkend, maar beperkt. Sindsdien is EurekAI een echt project geworden: invuloefeningen, navigatie door oefeningen, web scraping, configureerbare ouderlijke moderatie, grondige code review, en nog veel meer. De volledige code is gegenereerd door AI — voornamelijk [Claude Code](https://code.claude.com/), met enkele bijdragen via [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Overzicht

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Rondleiding door EurekAI: bronnen, samenvatting, quiz, flashcards, illustraties" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — recente generaties, geschatte kosten per kaart en projecttotaal, knop « Auto — Magie! » | ![Bronnen](docs/screenshots/sources.webp)<br>**Bronnen** — import van foto/PDF/tekst/spraak/web, generatie met één klik, detectie van leerdoelen |

Elke geïmporteerde bron toont zijn [OCR-betrouwbaarheidsscore, moderatie en geschatte kosten](docs/screenshots/sources-list.webp).

### De componenten in actie

| | |
|---|---|
| ![Samenvatting](docs/screenshots/notes.gif)<br>**Samenvatting** — kernpunten, vocabulaire, bronvermeldingen, audioweergave per sectie | ![Quiz](docs/screenshots/quiz.gif)<br>**Meerkeuzequiz** — directe feedback met uitleg, stap-voor-stap navigatie |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — omkeerbare kaart met zelfbeoordeling « ik wist het / ik wist het niet » | ![Invuloefeningen](docs/screenshots/fillblank.gif)<br>**Invuloefeningen** — tip op aanvraag, tolerante validatie |
| ![Dictee](docs/screenshots/dictation.gif)<br>**Dictee** — woord gedicteerd in audio, strikte letter-voor-letter correctie | ![Spraakquiz](docs/screenshots/vocal-quiz.gif)<br>**Spraakquiz** — vraag hardop voorgelezen, antwoord via microfoon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast met 2 stemmen, raadpleegbaar dialoogscript | ![Illustraties](docs/screenshots/illustrations.gif)<br>**Illustraties** — educatieve afbeeldingen gegenereerd door Agent |
| ![AI-tutor](docs/screenshots/chat.gif)<br>**AI-tutor** — chat verankerd in de cursusdocumenten, uitgelegde antwoorden, kan quizzen en flashcards genereren | |

### Aan de slag

| | |
|---|---|
| ![Profielkeuze](docs/screenshots/login.gif)<br>**Profielkeuze** — elk kind heeft zijn eigen ruimte, avatar en taal | ![Profiel aanmaken](docs/screenshots/profile-create.gif)<br>**Profiel aanmaken** — leeftijd, avatar, ouderlijke PIN voor jongeren onder de 15 |
| ![Cursus aanmaken](docs/screenshots/course.gif)<br>**Cursus aanmaken** — één project per les, klaar om bronnen te ontvangen | ![Instellingen](docs/screenshots/settings.gif)<br>**Instellingen** — API-status, keuze van AI-modellen met getoonde tarieven |

---

## Functies

| | Functie | Beschrijving |
|---|---|---|
| 📷 | **Bestanden importeren** | Importeer je lessen — foto, PDF (via Mistral OCR met gemiddelde betrouwbaarheidsscore, tiers `high`/`medium`/`low`) of tekstbestand (TXT, MD). Upload-sessies met retry per bestand en individuele voortgang |
| 📝 | **Tekstinvoer** | Typ of plak willekeurige tekst rechtstreeks |
| 🎤 | **Spraakinvoer** | Neem jezelf op — Voxtral STT transcribeert je stem |
| 🌐 | **Web / URL** | Plak een URL (direct scraping via Readability + Lightpanda) of typ een zoekopdracht (Agent Mistral web_search) |
| 📄 | **Samenvattingen** | Gestructureerde notities met kernpunten, vocabulaire, citaten, anekdotes |
| 🃏 | **Flashcards** | Interactieve V/A-kaarten, audioweergave als dialoog |
| ❓ | **Meerkeuzequiz** | Meerkeuzevragen met adaptieve herhaling van fouten (configureerbaar aantal) |
| ✏️ | **Invuloefeningen** | Invuloefeningen met tips en tolerante validatie |
| 🔤 | **Dictee** | Woorden gedicteerd in audio (Voxtral TTS) vanuit een geïmporteerde lijst, toetsenbordinvoer, strikte letter-voor-letter correctie met uitgelegde spellingsregel |
| 🎙️ | **Podcast** | Mini-podcast met 2 stemmen in audio — standaard Mistral-stemmen of aangepaste stemmen (ouders!) |
| 🖼️ | **Illustraties** | Educatieve afbeeldingen gegenereerd door een Mistral Agent |
| 🗣️ | **Spraakquiz** | Hardop voorgelezen vragen (aangepaste stem mogelijk), mondeling antwoord, AI-controle |
| 💬 | **AI-tutor** | Contextuele chat met je cursusdocumenten, met tool calling |
| 🧠 | **Automatische router** | Een router op basis van `mistral-small-latest` analyseert de inhoud en stelt een combinatie van generatoren voor uit de 8 beschikbare typen |
| 🔒 | **Ouderlijk toezicht** | Configureerbare moderatie per profiel (aanpasbare categorieën), ouderlijke PIN, chatbeperkingen |
| 🌍 | **Meertalig** | Interface beschikbaar in 9 talen; AI-generatie stuurbaar in 15 talen via de prompts |
| 🔊 | **Voorlezen** | Beluister samenvattingen en flashcards (vraag/antwoord-dialoog) via Mistral Voxtral TTS |
| 💶 | **API-kostenopvolging** | Transparante schatting van de €-kosten van elke generatie en bron (tokens / tekens / pagina's / seconden audio). Badge per kaart + totaal per project, zichtbaar in het dashboard |
| 🎨 | **Thema per profiel** | Elk profiel kiest zijn thema `dark` of `light` — blijft behouden bij wisselen van profiel |

---

## Architectuuroverzicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Modelgebruikskaart

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Gebruikersreis

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Diepere duik — Functies

### Multimodale invoer

EurekAI accepteert 4 soorten bronnen, gemodereerd volgens het profiel (standaard ingeschakeld voor kind en tiener):

- **Bestanden importeren** — JPG-, PNG- of PDF-bestanden verwerkt door Mistral OCR — **OCR 4 (`mistral-ocr-4-0`) standaard** (beste kwaliteit), **OCR 3 (`mistral-ocr-2512`) optioneel** in de Instellingen (goedkoper, ~½ van de kosten) — voor gedrukte tekst, tabellen en handschrift; of tekstbestanden (TXT, MD) rechtstreeks geïmporteerd. Multi-bestandsuploads gebruiken een systeem van **upload-sessies**: individuele voortgang per bestand, retry van het mislukte bestand zonder de andere opnieuw in te dienen, dismiss van de sessie wanneer deze klaar is. De OCR levert een gemiddelde **betrouwbaarheidsscore** (`average`, geclampt in `[0,1]`, berekend op basis van `averagePageConfidenceScore` teruggegeven door Mistral), weergegeven in de UI als tier-badge `high` / `medium` / `low` (drempels ~0.9 / ~0.7) — waarschuwt zonder te blokkeren als de scan van slechte kwaliteit is.
- **Vrije tekst** — Typ of plak willekeurige inhoud. Gemodereerd vóór opslag als moderatie actief is.
- **Spraakinvoer** — Neem audio op in de browser. Getranscribeerd door `voxtral-mini-latest`. De parameter `language="fr"` optimaliseert de herkenning.
- **Web / URL** — Plak een of meer URL's om de inhoud rechtstreeks te scrapen (Readability + Lightpanda voor JS-pagina's), of typ trefwoorden voor een webzoekopdracht via Agent Mistral. Het enkele veld accepteert beide — URL's en trefwoorden worden automatisch gescheiden, elk resultaat maakt een onafhankelijke bron aan.

### AI-contentgeneratie

Acht typen gegenereerd leermateriaal:

| Generator | Model | Uitvoer |
|---|---|---|
| **Samenvatting** | `mistral-large-latest` | Titel, samenvatting, kernpunten, vocabulaire, citaten, anekdote |
| **Flashcards** | `mistral-large-latest` | V/A-kaarten met bronverwijzingen (configureerbaar aantal) |
| **Meerkeuzequiz** | `mistral-large-latest` | Meerkeuzevragen, uitleg, adaptieve herhaling (configureerbaar aantal) |
| **Invuloefeningen** | `mistral-large-latest` | Aan te vullen zinnen met tips, tolerante validatie (Levenshtein) |
| **Dictee** | `mistral-large-latest` + Voxtral TTS | Trefwoorden gedicteerd in audio (1 MP3/woord) → toetsenbordinvoer → strikte correctie (accenten) met uitgelegde regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script met 2 stemmen → MP3-audio |
| **Illustratie** | Agent `mistral-large-latest` | Educatieve afbeelding via de tool `image_generation` |
| **Spraakquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-vragen → STT-antwoord → AI-controle |

### AI-tutor via chat

Een conversationele tutor met volledige toegang tot de cursusdocumenten:

- Gebruikt `mistral-large-latest`
- **Tool calling**: kan tijdens het gesprek samenvattingen, flashcards, quizzen of invuloefeningen genereren
- Geschiedenis van 50 berichten per cursus
- Contentmoderatie indien ingeschakeld voor het profiel

### Automatische router

De router gebruikt `mistral-small-latest` om de inhoud van de bronnen te analyseren en de meest relevante generatoren voor te stellen uit de 8 beschikbare. De interface toont de voortgang in realtime: eerst een analysefase, daarna de individuele generaties met mogelijkheid tot annuleren.

### Adaptief leren

- **Quizstatistieken**: opvolging van pogingen en nauwkeurigheid per vraag
- **Quizherhaling**: genereert 5-10 nieuwe vragen gericht op zwakke concepten
- **Detectie van leerdoelen**: detecteert herhalingsinstructies (« Ik ken mijn les als ik weet... ») en prioriteert ze in compatibele tekstgeneratoren (samenvatting, flashcards, quiz, invuloefeningen)

### Beveiliging & ouderlijk toezicht

- **4 leeftijdsgroepen**: kind (≤10 jaar), tiener (11-15), student (16-25), volwassene (26+)
- **Contentmoderatie**: `mistral-moderation-2603` (Mistral Moderation 2) met 11 beschikbare categorieën, 5 standaard geblokkeerd voor kind/tiener (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorieën aanpasbaar per profiel in de instellingen; Moderation 2 heeft de oude categorie « gevaarlijke inhoud » gesplitst in `dangerous` + `criminal` (bestaande profielen worden automatisch gemigreerd, en geblokkeerde categorieën gelden ook voor reeds geïmporteerde bronnen). Standaardbeveiliging: als het modelantwoord het niet mogelijk maakt een geblokkeerde categorie te verifiëren, wordt de inhoud geweigerd (« Moderatie niet beschikbaar »); met actieve moderatie wijzen zowel generatie als chat gemarkeerde, foutieve of in controle zijnde bronnen af (een geïmporteerde bron met uitgeschakelde moderatie wordt niet opnieuw gecontroleerd). Gedateerde id vastgezet in `helpers/moderation-model.ts`: de alias `-latest`, verouderd, wordt niet meer door de API vermeld.
- **Ouderlijke PIN**: SHA-256-hash, vereist voor profielen onder de 15 jaar. Voor een productie-deployment: voorzie een trage hash met salt (Argon2id, bcrypt).
- **Chatbeperkingen**: AI-chat standaard uitgeschakeld voor jongeren onder de 16, inschakelbaar door ouders

### Multiprofielsysteem

- Meerdere profielen met naam, leeftijd, avatar, taalvoorkeuren
- **Stemmen per profiel** (`Profile.mistralVoices?: { host?, guest? }` — elke rol is optioneel) — elk kind kan zijn eigen podcast-/spraakquiz-stemmenpaar hebben
- **Thema per profiel** (`Profile.theme: 'dark' | 'light'`) — automatische wissel bij verandering van profiel, opgeslagen aan de backend-kant
- Projecten gekoppeld aan profielen via `profileId`
- Cascaderende verwijdering: een profiel verwijderen verwijdert al zijn projecten

### API-kostenopvolging

Elke factureerbare Mistral-aanroep (chat, OCR, STT, TTS, agents) is geïnstrumenteerd om een **transparante** €-schatting aan de gebruiker te bieden. Moderatie, die gratis is, wordt niet meegeteld. Bekende beperking: de toolkosten van agents (webzoekopdracht 30 $/1000 aanroepen, beeldgeneratie 100 $/1000 afbeeldingen) worden nog niet meegeteld — de weergegeven kosten van een illustratie zijn onderschat.

- **Bron van waarheid**: `helpers/pricing.ts` — `MODEL_PRICING` per modelprefix (bijv.: `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` met Mistral-doc-URL's voor periodieke re-scraping
- **Ondersteunde eenheden**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie aangestuurd door `helpers/cost-calc.ts`
- **Instrumentatieketen**: `helpers/tracked-client.ts` (wrap Mistral-client) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectie in de HTTP-respons)
- **UI**: kostenbadge per generatie (`src/partials/cost-badge-gen.html`), per bron (`cost-badge-src.html`), cumulatief totaal in het dashboard (`Project.totalCost`)
- **Endpoints**: de antwoorden `/generate/*` en `/sources/*` decoreren het geretourneerde object (Generation / Source) met `estimatedCost`, `usage` en `costBreakdown`. `POST /generate/route` voegt een veld `costDelta: number` toe voor alleen de routeringskosten. `GET /projects/:pid` retourneert het project verrijkt met `totalCost` (som berekend vanuit `costLog[]`) + de volledige geschiedenis

### TTS (Mistral Voxtral) & aangepaste stemmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral-spraak-synthese, geen extra sleutel nodig
- **Aangepaste stemmen**: ouders kunnen hun eigen stemmen aanmaken via de Mistral Voices API (op basis van een audiofragment) en deze toewijzen aan de rollen host/gast — podcasts en spraakquizzen worden dan gelezen met de stem van een ouder, waardoor de ervaring nog immersiever wordt voor het kind
- Twee configureerbare stemrollen: **host** (hoofdnarrator) en **gast** (tweede stem van de podcast)
- Volledige catalogus van Mistral-stemmen beschikbaar in de instellingen, filterbaar op taal
### Internationalisatie

- Interface beschikbaar in 9 talen: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompts ondersteunen 15 talen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Taal configureerbaar per profiel

---

## Technische stack

| Laag | Technologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server en typesafety |
| **Backend** | Express 5.x | REST API |
| **Dev-server** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactieve interface, TypeScript gecompileerd door Vite |
| **Templating** | vite-plugin-handlebars | HTML-compositie via partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderatie |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, geïntegreerde spraaksynthese |
| **Iconen** | Lucide 1.x | SVG-iconenbibliotheek |
| **Webscraping** | Readability + linkedom | Extractie van de hoofdinhoud van webpagina's (technologie Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultralichte headless browser (Zig + V8) voor JS/SPA-pagina's — scraping-fallback |
| **Markdown** | Marked | Markdown-rendering in de chat |
| **Bestandsupload** | Multer 2.x | Beheer van multipart-formulieren |
| **Audio** | ffmpeg-static | Concatenatie van audio-segmenten |
| **Tests** | Vitest | Unittests — dekking gemeten door SonarCloud |
| **Persistentie** | JSON-bestanden | Opslag zonder afhankelijkheden |

---

## Modelreferentie

| Model | Gebruik | Waarom |
|---|---|---|
| `mistral-large-latest` | Samenvatting, Flashcards, Podcast, Quiz, Invuloefeningen, Chat, Verificatie orale quiz, Agent Image, Agent Web Search, Opdrachtendetectie | Beste multilingual + opvolging van instructies |
| `mistral-ocr-4-0` (OCR 4, standaard) | Document-OCR — superieure kwaliteit | Gedrukte tekst, tabellen, handschrift ($4 / 1000 pagina's) |
| `mistral-ocr-2512` (OCR 3, optie) | Document-OCR | Selecteerbaar in Instellingen, goedkoper ($2 / 1000 pagina's) |
| `voxtral-mini-latest` | Spraakherkenning (STT) | Meertalige STT, geoptimaliseerd met `language="fr"` |
| `voxtral-mini-tts-latest` | Spraaksynthese (TTS) | Podcasts, orale quiz, voorlezen |
| `mistral-moderation-2603` | Contentmoderatie | 5 geblokkeerde categorieën voor kind/tiener (waaronder `jailbreaking`) |
| `mistral-small-latest` | Automatische router | Snelle contentanalyse voor routeringsbeslissingen |

---

## Snel starten

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

> **API-sleutel ingevoerd door de gebruiker**: `MISTRAL_API_KEY` is nu **optioneel**. Als deze ontbreekt, start de app toch en nodigt elke gebruiker uit om **zijn eigen Mistral-sleutel** in de interface in te voeren. De sleutel wordt **opgeslagen in de browser** (versleuteld via Web Crypto + IndexedDB in een beveiligde context) en per verzoek meegestuurd — **nooit opgeslagen op de server**. Precedentie: profielsleutel > globale browsersleutel > `MISTRAL_API_KEY` (env). `EUREKAI_REQUIRE_USER_KEY=true` instellen dwingt elke gebruiker om zijn sleutel te leveren (de env-sleutel dient dan alleen nog voor preloads).

> **Lokale HTTPS (tablet/LAN)**: `localhost` is al een beveiligde context. Voor LAN-toegang (tablet), genereer een lokaal certificaat en activeer HTTPS om browserversleuteling te ontgrendelen + de sleutel onderweg te versleutelen:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Omgevingsvariabelen

| Variabele | Vereist | Standaard | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | optioneel | — | Mistral API-sleutel (chat, OCR, STT, TTS Voxtral, agents, moderatie). Als deze ontbreekt, voert de gebruiker zijn sleutel in de app in (opgeslagen in de browser, nooit op de server) |
| `EUREKAI_REQUIRE_USER_KEY` | optioneel | `false` | `true` → schakelt de fallback op `MISTRAL_API_KEY` uit voor AI-verzoeken (elke gebruiker MOET zijn sleutel leveren). Nuttig op een publiek toegankelijke instantie |
| `HTTPS_KEY` / `HTTPS_CERT` | optioneel | — | Paden TLS-sleutel/certificaat (zie `scripts/gen-cert.sh`) → Express en Vite serveren via HTTPS (secure context LAN/tablet) |
| `PORT` | optioneel | `3000` | HTTP-poort van de Express-backend |
| `NODE_ENV` | optioneel | `development` | Als `production` → Express serveert de frontend vanuit `dist/` (anders `public/`) |
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

**Git-hooks (Husky)**: `pre-commit` koppelt `scripts/pre-commit-fast.sh` (conflicten, grote bestanden, shellcheck), `lint-staged` en daarna `npm test`; `pre-push` voert eerst een gate `npm audit` uit (blokkeert bij kritieke transitieve kwetsbaarheid, zie `scripts/audit-verdict.mjs`) en daarna `npm run security`. Alle blokkeren de commit/push bij mislukking.

**Vereiste externe tools (optioneel maar gebruikt door `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Zonder deze tools faalt `npm test` bij `pretest` (lizard ontbreekt) en faalt `npm run security` (opengrep ontbreekt). De husky-hooks blokkeren dan de commit/push.

---

## Deployen met container

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

> **`:U`** is een rootless Podman-flag die automatisch de volumerechten aanpast.

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

> **Voor AI-bijdragers**: raadpleeg [`CLAUDE.md`](CLAUDE.md) voor de gedetailleerde architectuurcontext, de verplichte regels (anti-leak prompts, foutcodes, cost tracking) en de bekende valkuilen (Lizard CCN, Opengrep, Codacy/Semgrep-migratie).

---

## API-referentie

### Config
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/config` | Huidige configuratie |
| `PUT` | `/api/config` | Configuratie wijzigen (modellen, stemmen, TTS-model) |
| `GET` | `/api/config/status` | Status van de API's: `mistral` (Mistral-sleutel gedefinieerd), `ttsAvailable` (alias van `mistral`, Mistral Voxtral is de enige TTS-provider) |
| `POST` | `/api/config/reset` | Configuratie terugzetten naar standaard |
| `GET` | `/api/config/voices` | Mistral TTS-stemmen weergeven (optioneel `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Beschikbare moderatiecategorieën + standaardwaarden per leeftijd |
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
| `POST` | `/api/projects` | Een project aanmaken `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projectdetails |
| `PUT` | `/api/projects/:pid` | Hernoemen `{name}` |
| `DELETE` | `/api/projects/:pid` | Het project verwijderen |
| `GET` | `/api/projects/:pid/events` | Realtime SSE-stream (`event: generation`) van generatietransities (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Bronnen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-bestanden importeren (OCR voor JPG/PNG/PDF, directe lezing voor TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Vrije tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Stem STT (multipart-audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping of webzoekopdracht `{query}` — retourneert een array van bronnen |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Een bron verwijderen |
| `POST` | `/api/projects/:pid/moderate` | Modereren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Revisieopdrachten detecteren |

### Generatie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Revisiefiche |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Meerkeuzequiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Invuloefeningen |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictee (woorden + voorbeeldzinnen + regels, 1 TTS-audio per woord; ook voorgesteld door de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustratie |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Orale quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptieve revisie `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Gerichte geheugenfiche op de gemiste vragen van een quiz `{generationId, weakQuestions}` — parallel aangeroepen met `quiz-review` via de knop « Oefenen op mijn fouten » |
| `POST` | `/api/projects/:pid/generate/route` | Routeringsanalyse (plan van te starten generatoren) — retourneert `{plan, costDelta}` (kosten van alleen de routering) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische backend-generatie (routering + 8 types: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Parallelle uitvoering — vereist een Mistral-tier met rate-limit ≥ 8 gelijktijdige verzoeken; anders kunnen meerdere 429's verschijnen in `failedSteps`. |

Alle generatieroutes accepteren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` en `remediation-summary` vereisen bovendien `{generationId, weakQuestions}`.

### CRUD Generaties
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antwoorden op invuloefeningen indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Dicteeantwoorden indienen `{answers}` (strikte serverscores) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Een oraal antwoord controleren (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-voorlezing (fiches/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Een lopende generatie annuleren (enige annuleringspad voor een pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Hernoemen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | De generatie verwijderen |

### Chat
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatgeschiedenis ophalen |
| `POST` | `/api/projects/:pid/chat` | Een bericht versturen `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatgeschiedenis wissen |

---

## Architecturale beslissingen

| Beslissing | Rechtvaardiging |
|---|---|
| **Alpine.js in plaats van React/Vue** | Minimale footprint, lichte reactiviteit met door Vite gecompileerd TypeScript. Perfect voor een hackathon waar snelheid telt. |
| **Persistentie in JSON-bestanden** | Nul afhankelijkheden, directe start. Geen database te configureren — starten en gaan. |
| **Vite + Handlebars** | Het beste van twee werelden: snelle HMR voor ontwikkeling, HTML-partials voor code-organisatie, Tailwind JIT. |
| **Gecentraliseerde prompts** | Alle AI-prompts in `prompts.ts` — eenvoudig te itereren, testen en aanpassen per taal/leeftijdsgroep. |
| **Multi-generatiesysteem** | Elke generatie is een onafhankelijk object met een eigen ID — maakt meerdere fiches, quizzes, enz. per cursus mogelijk. |
| **Leeftijdsafhankelijke prompts** | 4 leeftijdsgroepen met verschillende woordenschat, complexiteit en toon — dezelfde inhoud onderwijst anders afhankelijk van de lerende. |
| **Op Agents gebaseerde functionaliteiten** | Beeldgeneratie en webzoekopdrachten gebruiken tijdelijke Mistral Agents — nette levenscyclus met automatische opruiming. |
| **Intelligente URL-scraping** | Eén veld accepteert gemengde URL's en zoekwoorden — URL's worden gescraped via Readability (statische pagina's) met Lightpanda-fallback (JS/SPA-pagina's), zoekwoorden activeren een Mistral web_search-Agent. Elk resultaat creëert een onafhankelijke bron. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (geen extra sleutel naast `MISTRAL_API_KEY`) — spraaksynthese geïntegreerd in de kostenketen en de stemresolutie per taal. |

---

## Credits & dankbetuigingen

- **[Mistral AI](https://mistral.ai)** — AI-modellen (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lichtgewicht reactief framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend build-tool
- **[Lucide](https://lucide.dev)** — Iconenbibliotheek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extractie van webinhoud (technologie Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralichte headless browser voor scraping van JS/SPA-pagina's
- **[Luciole](https://luciole-vision.com)** — Lettertype ontworpen voor slechtziende lezers, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (optie « Leescomfort » van de profielen)

Gestart tijdens de Mistral AI Worldwide Hackathon (maart 2026), volledig ontwikkeld door AI met [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licentie

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel vertaald van fr naar nl met grok-4.5.**
