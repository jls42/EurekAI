<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformeer elke content in een interactieve leerervaring — aangedreven door <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Kwetsbaarheden"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Regels code"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy Badge"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Het verhaal — Waarom EurekAI?

**EurekAI** is ontstaan tijdens de [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiële site](https://worldwide-hackathon.mistral.ai/)) (maart 2026). Ik had een onderwerp nodig — en het idee kwam voort uit iets heel concreets: ik oefen regelmatig voor toetsen met mijn dochter, en ik dacht dat het mogelijk moest zijn om dat leuker en interactiever te maken dankzij AI.

Het doel: **elke willekeurige invoer** nemen — een foto van de les, een gekopieerde en geplakte tekst, een spraakopname, een zoekopdracht op het web — en deze omzetten in **samenvattingen, flashcards, quizzen, podcasts, invuloefeningen, illustraties en meer**. Dit alles aangedreven door de Franse modellen van Mistral AI, wat het een oplossing maakt die van nature geschikt is voor Franstalige leerlingen.

Het [oorspronkelijke prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) werd in 48 uur ontworpen tijdens de hackathon als proof-of-concept rond de diensten van Mistral — al functioneel, maar beperkt. Sindsdien is EurekAI uitgegroeid tot een volwaardig project: invuloefeningen, navigatie door oefeningen, webscraping, configureerbare ouderlijke moderatie, grondige code-reviews en nog veel meer. De volledige code is gegenereerd door AI — voornamelijk [Claude Code](https://code.claude.com/), met enkele bijdragen via [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Overzicht

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Rondleiding door EurekAI: bronnen, samenvatting, quiz, flashcards, illustraties" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — recente generaties, geschatte kosten per kaart en projecttotaal, knop "Auto — Magie!" | ![Bronnen](docs/screenshots/sources.webp)<br>**Bronnen** — import foto/pdf/tekst/spraak/web, generatie in één klik, instructiedetectie |

Elke geïmporteerde bron toont zijn [OCR-betrouwbaarheidsscore, moderatiestatus en geschatte kosten](docs/screenshots/sources-list.webp).

### De componenten in actie

| | |
|---|---|
| ![Samenvatting](docs/screenshots/notes.gif)<br>**Samenvatting** — kernpunten, woordenschat, broncitaten, audioweergave per sectie | ![Quiz](docs/screenshots/quiz.gif)<br>**Meerkeuzequiz** — directe feedback met uitleg, stapsgewijze navigatie |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — kaart omdraaien en vervolgens zelfevaluatie "ik wist het / ik wist het niet" | ![Invuloefeningen](docs/screenshots/fillblank.gif)<br>**Invuloefeningen** — hint op aanvraag, tolerante validatie |
| ![Dictee](docs/screenshots/dictation.gif)<br>**Dictee** — audio-gedicteerd woord, strikte letter-voor-letter correctie | ![Spraakquiz](docs/screenshots/vocal-quiz.gif)<br>**Spraakquiz** — hardop voorgelezen vraag, antwoord via de microfoon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — minipodcast met 2 stemmen, dialoogscript raadpleegbaar | ![Illustraties](docs/screenshots/illustrations.gif)<br>**Illustraties** — educatieve afbeeldingen gegenereerd door Agent |
| ![AI-tutor](docs/screenshots/chat.gif)<br>**AI-tutor** — chat verankerd in de cursusdocumenten, toegelichte antwoorden, kan quizzen en flashcards genereren | |

### Aan de slag

| | |
|---|---|
| ![Profielkeuze](docs/screenshots/login.gif)<br>**Profielkeuze** — elk kind heeft zijn eigen ruimte, avatar en taal | ![Profiel aanmaken](docs/screenshots/profile-create.gif)<br>**Profiel aanmaken** — leeftijd, avatar, ouderlijke pincode voor jonger dan 15 jaar |
| ![Cursus aanmaken](docs/screenshots/course.gif)<br>**Cursus aanmaken** — één project per les, klaar om bronnen te ontvangen | ![Instellingen](docs/screenshots/settings.gif)<br>**Instellingen** — API-status, keuze van AI-modellen met getoonde tarieven |

---

## Functies

| | Functie | Beschrijving |
|---|---|---|
| 📷 | **Bestandsimport** | Importeer je lessen — foto, pdf (via Mistral OCR met gemiddelde betrouwbaarheidsscore, niveaus `high`/`medium`/`low`) of tekstbestand (TXT, MD). Uploadsessies met retry per bestand en individuele voortgang |
| 📝 | **Tekstinvoer** | Typ of plak direct willekeurige tekst |
| 🎤 | **Spraakinvoer** | Neem jezelf op — Voxtral STT transcribeert je stem |
| 🌐 | **Web / URL** | Plak een URL (direct scrapen via Readability + Lightpanda) of typ een zoekopdracht (Mistral-agent web_search) |
| 📄 | **Samenvattingen** | Gestructureerde notities met kernpunten, woordenschat, citaten, weetjes |
| 🃏 | **Flashcards** | Interactieve V/A-kaarten, dialoogvormige audioweergave |
| ❓ | **Meerkeuzequiz** | Meerkeuzevragen met adaptieve herhaling van fouten (instelbaar aantal) |
| ✏️ | **Invuloefeningen** | In te vullen oefeningen met hints en tolerante validatie |
| 🔤 | **Dictee** | Woorden gedicteerd via audio (Voxtral TTS) uit een geïmporteerde lijst, toetsenbordinvoer, strikte letter-voor-letter correctie met uitleg van spellingregels |
| 🎙️ | **Podcast** | Audio-minipodcast met 2 stemmen — standaard Mistral-stemmen of aangepaste stemmen (ouders!) |
| 🖼️ | **Illustraties** | Educatieve afbeeldingen gegenereerd door een Mistral-agent |
| 🗣️ | **Spraakquiz** | Hardop voorgelezen vragen (aangepaste stem mogelijk), mondeling antwoord, AI-controle |
| 💬 | **AI-tutor** | Contextuele chat met je lesdocumenten, met tool calling |
| 🧠 | **Automatische router** | Een router op basis van `mistral-small-latest` analyseert de content en stelt een combinatie van generatoren voor uit de 8 beschikbare typen |
| 🔒 | **Ouderlijk toezicht** | Configureerbare moderatie per profiel (aanpasbare categorieën), ouderlijke pincode, chatbeperkingen |
| 🌍 | **Meertalig** | Interface beschikbaar in 9 talen; AI-generatie aanstuurbaar in 15 talen via prompts |
| 🔊 | **Hardop voorlezen** | Beluister samenvattingen en flashcards (vraag/antwoord-dialoog) via Mistral Voxtral TTS |
| 💶 | **Inzicht in API-kosten** | Transparante schatting van de kosten in € van elke generatie en bron (tokens / tekens / pagina's / audioseconden). Badge per kaart + totaal per project, zichtbaar in het dashboard |
| 🎨 | **Thema per profiel** | Elk profiel kiest zijn thema `dark` of `light` — blijft behouden bij het wisselen van profiel |

---

## Architectuuroverzicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Overzicht van modelgebruik

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Gebruikersreis

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Verdieping — Functionaliteiten

### Multimodale invoer

EurekAI accepteert 4 typen bronnen, gemodereerd volgens het profiel (standaard ingeschakeld voor kind en tiener):

- **Bestandsimport** — JPG-, PNG- of PDF-bestanden verwerkt door Mistral OCR — **standaard OCR 4 (`mistral-ocr-4-0`)** (beste kwaliteit), **optioneel OCR 3 (`mistral-ocr-2512`)** in de Instellingen (goedkoper, ~½ van de kosten) — voor gedrukte tekst, tabellen en handschrift; of direct geïmporteerde tekstbestanden (TXT, MD). Uploads van meerdere bestanden maken gebruik van een systeem van **uploadsessies**: individuele voortgang per bestand, opnieuw proberen van het mislukte bestand zonder de andere opnieuw in te dienen, sluiten van de sessie wanneer deze voltooid is. De OCR biedt een gemiddelde **betrouwbaarheidsscore** (`average`, begrensd tot `[0,1]`, berekend op basis van door Mistral geretourneerde `averagePageConfidenceScore`), weergegeven in de UI als een niveaubadge `high` / `medium` / `low` (drempels ~0,9 / ~0,7) — waarschuwt zonder te blokkeren als de scan van slechte kwaliteit is. De kopie van het document die naar Mistral is verzonden voor OCR wordt direct na afloop van de verwerking verwijderd, zelfs bij een fout.
- **Vrije tekst** — Typ of plak willekeurige content. Gemodereerd vóór opslag als moderatie actief is.
- **Spraakinvoer** — Neem audio op in de browser. Getranscribeerd door `voxtral-mini-latest`. De parameter `language="fr"` optimaliseert de herkenning.
- **Web / URL** — Plak een of meer URL's om de content direct te scrapen (Readability + Lightpanda voor JS-pagina's), of typ trefwoorden voor een zoekopdracht op het web via de Mistral-agent. Het enkele invoerveld accepteert beide — URL's en trefwoorden worden automatisch gescheiden, elk resultaat creëert een onafhankelijke bron.

### AI-contentgeneratie

Acht typen gegenereerd leermateriaal:

| Generator | Model | Uitvoer |
|---|---|---|
| **Samenvatting** | `mistral-large-latest` | Titel, samenvatting, kernpunten, woordenschat, citaten, weetje |
| **Flashcards** | `mistral-large-latest` | V/A-kaarten met bronverwijzingen (instelbaar aantal) |
| **Meerkeuzequiz** | `mistral-large-latest` | Meerkeuzevragen, uitleg, adaptieve herhaling (instelbaar aantal) |
| **Invuloefeningen** | `mistral-large-latest` | In te vullen zinnen met hints, tolerante validatie (Levenshtein) |
| **Dictee** | `mistral-large-latest` + Voxtral TTS | Sleutelwoorden gedicteerd via audio (1 mp3/woord) → toetsenbordinvoer → strikte correctie (accenten) met uitgelegde regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script met 2 stemmen → MP3-audio |
| **Illustratie** | Agent `mistral-large-latest` | Educatieve afbeelding via de tool `image_generation` |
| **Spraakquiz** | `mistral-large-latest` + Voxtral TTS + STT | Vragen via TTS → antwoord via STT → AI-controle |

### AI-tutor via chat

Een conversationele tutor met volledige toegang tot cursusdocumenten:

- Gebruikt `mistral-large-latest`
- **Tool calling**: kan tijdens het gesprek samenvattingen, flashcards, quizzen of invuloefeningen genereren
- Geschiedenis van 50 berichten per cursus
- Moderatie indien ingeschakeld voor het profiel: het bericht wordt gecontroleerd, en gemarkeerde bronnen, bronnen waarvan de controle is mislukt of nog niet geverifieerde bronnen worden uitgesloten van de context en van de tools (hun verificatie wordt eerst opnieuw gestart, maximaal 5 s)

### Automatische router

De router gebruikt `mistral-small-latest` om de inhoud van de bronnen te analyseren en de meest relevante generatoren voor te stellen uit de 8 beschikbare opties. De interface toont de voortgang in realtime: eerst een analysefase, daarna de afzonderlijke generaties met de mogelijkheid tot annuleren.

### Adaptief leren

- **Quizstatistieken**: bijhouden van pogingen en nauwkeurigheid per vraag
- **Herhaling van quizzen**: genereert 5-10 nieuwe vragen gericht op zwakke concepten, op basis van de bronnen van de oorspronkelijke quiz (de moderatiecontrole is van toepassing op diezelfde bronnen)
- **Instructiedetectie**: detecteert herhalingsinstructies ("Ik ken mijn les als ik...") en geeft hieraan prioriteit in de compatibele tekstuele generatoren (samenvatting, flashcards, quiz, invuloefeningen). Met actieve moderatie wacht de detectie op de verificatie van de bronnen en leest deze alleen de bronnen die als veilig zijn beoordeeld; de instructie behoudt de lijst van haar oorspronkelijke bronnen, wordt niet weergegeven noch toegepast als een ervan wordt gemarkeerd, en verdwijnt samen met deze. De kosten hiervan worden meegeteld

### Veiligheid en ouderlijk toezicht

- **4 leeftijdsgroepen**: kind (≤10 jaar), tiener (11-15), student (16-25), volwassene (26+)
- **Contentmoderatie**: `mistral-moderation-2603` (Mistral Moderation 2) met 11 beschikbare categorieën, waarvan 6 standaard geblokkeerd voor nieuwe profielen van kinderen/tieners (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` toegevoegd na een meting op 50 lessen, inclusief geschiedenis, zonder enig vals-positief resultaat). Categorieën per profiel aanpasbaar in de instellingen; Moderation 2 heeft de voormalige categorie "gevaarlijke inhoud" opgesplitst in `dangerous` + `criminal` (bestaande profielen worden automatisch gemigreerd, en de geblokkeerde categorieën zijn ook van toepassing op reeds geïmporteerde bronnen). Veiligheid als standaard: als de respons van het model het niet mogelijk maakt om een geblokkeerde categorie te verifiëren, wordt de content geweigerd ("Moderatie niet beschikbaar"); bij actieve moderatie sluiten zowel generatie als chat gemarkeerde bronnen, bronnen waarvan de controle is mislukt of bronnen die worden geverifieerd uit. Een bron die nooit is geverifieerd (geïmporteerd met uitgeschakelde moderatie, uit een oud project dat aan een profiel is gekoppeld) wordt vóór gebruik geverifieerd; een moderatie die is onderbroken door een herstart of in een fout is geëindigd, wordt automatisch hervat (bij het opstarten als de serversleutel dit toestaat, anders bij het openen van het project of bij de volgende generatie), en een knop "Opnieuw controleren" start deze op verzoek opnieuw. De inhoud van een gemarkeerde bron of een bron die wordt geverifieerd, wordt verborgen voor het kind (voorbeeld, tekst, origineel document); een ouder kan deze weergeven met zijn/haar pincode, voor de duur van één raadpleging. Het gesproken antwoord van de spraakquiz wordt gemodereerd voordat het wordt gecontroleerd. Gedateerde ID vastgezet in `helpers/moderation-model.ts`: de alias `-latest`, die is verouderd, wordt niet meer vermeld door de API.
- **Ouderlijke pincode**: SHA-256-hash, vereist voor profielen van jonger dan 15 jaar; maximaal 10 onjuiste codes per kwartier en per IP-adres (429 `rate_limited`). Voor een productie-uitrol wordt een trage hash met salt aanbevolen (Argon2id, bcrypt).
- **Servergegevens**: `/output` publiceert alleen de media van de projecten (audio, afbeeldingen, geïmporteerde bestanden); `profiles.json`, `config.json` en de projectbestanden worden nooit geserveerd
- **Chatbeperkingen**: AI-chat is standaard uitgeschakeld voor jongeren onder de 16 jaar, kan door ouders worden ingeschakeld

### Multi-profielsysteem

- Meerdere profielen met naam, leeftijd, avatar, taalvoorkeuren
- **Stem per profiel** (`Profile.mistralVoices?: { host?, guest? }` — elke rol is optioneel) — elk kind kan zijn eigen paar stemmen hebben voor podcast/spraakquiz
- **Thema per profiel** (`Profile.theme: 'dark' | 'light'`) — automatische omschakeling bij verandering van profiel, persistent opgeslagen aan de backendzijde
- Projecten gekoppeld aan profielen via `profileId`; een oud project zonder profiel wordt gekoppeld aan het eerste profiel dat het opent, en vervolgens gemodereerd volgens dat profiel
- Trapsgewijze verwijdering: het verwijderen van een profiel verwijdert al zijn projecten

### Bijhouden van API-kosten

Elke factureerbare Mistral-aanroep (chat, OCR, STT, TTS, agents), inclusief instructiedetectie en mondelinge antwoorden van de spraakquiz, is geïnstrumenteerd om een **transparante** schatting in € aan de gebruiker te bieden. Moderatie is gratis en wordt niet meegeteld. De toolkosten van de agents zijn inbegrepen: $ 0,03 per zoekopdracht op het web en $ 0,10 per gegenereerde afbeelding (Mistral-tarieven), plus de door deze tools geproduceerde tokens, geteld tegen het inputtarief van het model van de agent.

- **Source of truth**: `helpers/pricing.ts` — `MODEL_PRICING` per modelprefix (bijv.: `mistral-large` → input 0,5 €/M tokens, output 1,5 €/M tokens), `PRICING_SOURCES` met Mistral doc-URL's voor periodiek opnieuw scrapen
- **Ondersteunde eenheden**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie aangestuurd door `helpers/cost-calc.ts`
- **Instrumentatieketen**: `helpers/tracked-client.ts` (Mistral client wrap) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectie in het HTTP-antwoord)
- **UI**: kostenbadge per generatie (`src/partials/cost-badge-gen.html`), per bron (`cost-badge-src.html`), gecumuleerd totaal in het dashboard (`Project.totalCost`)
- **Endpoints**: de antwoorden van `/generate/*` en `/sources/*` verrijken het geretourneerde object (Generation / Source) met `estimatedCost`, `usage` en `costBreakdown`. `POST /generate/route` voegt een veld `costDelta: number` toe voor uitsluitend de routeringskosten; `POST /detect-consigne` (`{consigne, costDelta}`) en de verificatie van een mondeling antwoord retourneren ook hun `costDelta`. `GET /projects/:pid` retourneert het project verrijkt met `totalCost` (berekende som vanaf `costLog[]`) + de volledige geschiedenis

### TTS (Mistral Voxtral) & aangepaste stemmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral-spraaksynthese, geen extra sleutel nodig
- **Aangepaste stemmen**: ouders kunnen hun eigen stemmen aanmaken via de Mistral Voices API (op basis van een audiofragment) en deze toewijzen aan de rollen gastheer/gast — podcasts en spraakquizzen worden dan voorgelezen met de stem van een ouder, wat de ervaring voor het kind nog meeslepender maakt
- Twee configureerbare stemrollen: **gastheer** (hoofdverteller) en **gast** (tweede stem van de podcast)
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
| **Devserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactieve interface, TypeScript gecompileerd door Vite |
| **Templating** | vite-plugin-handlebars | HTML-compositie via partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderatie |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, geïntegreerde spraaksynthese |
| **Pictogrammen** | Lucide 1.x | SVG-pictogrammenbibliotheek |
| **Webscraping** | Readability + linkedom | Extractie van hoofdinhoud van webpagina's (Firefox Reader View-technologie) |
| **Headless browser** | Lightpanda | Ultralichte headless browser (Zig + V8) voor JS/SPA-pagina's — fallback voor scraping |
| **Markdown** | Marked | Markdown-rendering in de chat |
| **Bestandsupload** | Multer 2.x | Beheer van multipart-formulieren |
| **Audio** | ffmpeg-static | Samenvoeging van audiosegmenten |
| **Tests** | Vitest | Unittests — dekking gemeten door SonarCloud |
| **Persistentie** | JSON-bestanden | Opslag zonder afhankelijkheden |

---

## Modelreferentie

| Model | Gebruik | Waarom |
|---|---|---|
| `mistral-large-latest` | Samenvatting, Flashcards, Podcast, Quiz, Invuloefeningen, Chat, Verificatie spraakquiz, Agent Afbeelding, Agent Web Search, Instructiedetectie | Beste meertaligheid + instructieopvolging |
| `mistral-ocr-4-0` (OCR 4, standaard) | OCR van documenten — hogere kwaliteit | Gedrukte tekst, tabellen, handschrift ($ 4 / 1000 pagina's) |
| `mistral-ocr-2512` (OCR 3, optie) | OCR van documenten | Te selecteren in Instellingen, goedkoper ($ 2 / 1000 pagina's) |
| `voxtral-mini-latest` | Spraakherkenning (STT) | Meertalige STT, geoptimaliseerd met `language="fr"` |
| `voxtral-mini-tts-latest` | Spraaksynthese (TTS) | Podcasts, spraakquiz, hardop voorlezen |
| `mistral-moderation-2603` | Inhoudsmoderatie | 6 geblokkeerde categorieën voor kind/tiener (waaronder `jailbreaking`) |
| `mistral-small-latest` | Automatische router | Snelle inhoudsanalyse voor routeringsbeslissingen |

---

## Snelle start

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

> **Opmerking**: Mistral Voxtral TTS is de enige TTS-provider — geen extra sleutel vereist naast `MISTRAL_API_KEY`.

> **Door de gebruiker ingevoerde API-sleutel**: `MISTRAL_API_KEY` is voortaan **optioneel**. Indien afwezig start de app nog steeds en wordt elke gebruiker gevraagd om **diens eigen Mistral-sleutel** in te voeren in de interface. De sleutel wordt **opgeslagen in de browser** (versleuteld via Web Crypto + IndexedDB in een beveiligde context) en per verzoek verzonden — **nooit bewaard op de server**. Prioriteit: profielsleutel > globale browsersleutel > `MISTRAL_API_KEY` (env). Het instellen van `EUREKAI_REQUIRE_USER_KEY=true` dwingt elke gebruiker om een sleutel op te geven (de omgevingssleutel dient dan alleen nog voor preloading).

> **Lokale HTTPS (tablet/LAN)**: `localhost` is al een beveiligde context. Voor LAN-toegang (tablet): genereer een lokaal certificaat en activeer HTTPS om browserversleuteling te ontgrendelen + de sleutel tijdens overdracht te versleutelen:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert indien beschikbaar, anders openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite via HTTPS
> ```

### Omgevingsvariabelen

| Variabele | Vereist | Standaard | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | optioneel | — | Mistral API-sleutel (chat, OCR, STT, Voxtral TTS, agents, moderatie). Indien afwezig voert de gebruiker de sleutel in via de app (opgeslagen in browser, nooit op de server) |
| `EUREKAI_REQUIRE_USER_KEY` | optioneel | `false` | `true` → schakelt fallback op `MISTRAL_API_KEY` uit voor AI-verzoeken (elke gebruiker MOET diens eigen sleutel opgeven). Handig bij een openbaar toegankelijke instantie |
| `HTTPS_KEY` / `HTTPS_CERT` | optioneel | — | Paden naar TLS sleutel/cert (zie `scripts/gen-cert.sh`) → Express en Vite serveren via HTTPS (beveiligde context voor LAN/tablet) |
| `PORT` | optioneel | `3000` | HTTP-poort van de Express-backend |
| `NODE_ENV` | optioneel | `development` | Indien `production` → serveert Express de frontend vanuit `dist/` (anders `public/`) |
| `SONAR_TOKEN` | optioneel CI | — | Uitsluitend gebruikt door de SonarCloud GitHub Actions-workflow |

### Tests, codekwaliteit en bijdragen

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)**: `pre-commit` koppelt `scripts/pre-commit-fast.sh` (conflicten, grote bestanden, shellcheck), `lint-staged` en vervolgens `npm test` aaneen; `pre-push` voert eerst een kwaliteitscontrole `npm audit` uit (blokkeert bij kritieke transitieve kwetsbaarheden, zie `scripts/audit-verdict.mjs`) en daarna `npm run security`. Bij falen blokkeren ze allemaal de commit/push.

**Vereiste externe tools (optioneel, maar gebruikt door `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Zonder deze tools mislukt `npm test` bij `pretest` (lizard ontbreekt) en mislukt `npm run security` (opengrep ontbreekt). De husky-hooks blokkeren dan de commit/push.

---

## Implementatie met container

De image is gepubliceerd op **GitHub Container Registry**:

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

> **`:U`** is een rootless Podman-vlag die de volumerechten automatisch aanpast.

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

> **Voor AI-bijdragers**: raadpleeg [`CLAUDE.md`](CLAUDE.md) voor de gedetailleerde architectuurcontext, de verplichte regels (anti-leak prompts, foutcodes, cost tracking) en bekende valkuilen (Lizard CCN, Opengrep, Codacy/Semgrep-migratie).

---

## API-referentie

### Config
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/config` | Huidige configuratie |
| `PUT` | `/api/config` | Configuratie wijzigen (modellen, stemmen, TTS-model) |
| `GET` | `/api/config/status` | Status van de API's: `mistral` (Mistral-sleutel ingesteld), `ttsAvailable` (alias van `mistral`, Mistral Voxtral is de enige TTS-provider) |
| `POST` | `/api/config/reset` | Standaardconfiguratie herstellen |
| `GET` | `/api/config/voices` | Mistral TTS-stemmen weergeven (optioneel `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Beschikbare moderatiecategorieën + standaardwaarden per leeftijd |
| `POST` | `/api/providers/mistral/validate` | Een door de gebruiker ingevoerde Mistral-sleutel valideren — altijd 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), geen env-fallback |

### Profielen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/profiles` | Alle profielen weergeven |
| `POST` | `/api/profiles` | Een profiel aanmaken |
| `PUT` | `/api/profiles/:id` | Een profiel bewerken (pincode vereist voor < 15 jaar; 10 foute pincodes / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Een profiel verwijderen + projectcascadering `{pin?}` → `{ok, deletedProjects}` |

### Projecten
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects` | Projecten weergeven (`?profileId=` optioneel) |
| `POST` | `/api/projects` | Een project aanmaken `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projectdetails; `?profileId=` koppelt een project zonder profiel aan het profiel dat het opent |
| `PUT` | `/api/projects/:pid` | Hernoemen `{name}` |
| `DELETE` | `/api/projects/:pid` | Het project verwijderen |
| `GET` | `/api/projects/:pid/events` | Realtime SSE-stream (`event: generation`) van generatietransities (`completed`/`failed`/`cancelled`) + keep-alive heartbeat |

### Bronnen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-bestandsimport (OCR voor JPG/PNG/PDF, direct inlezen voor TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Vrije tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Spraak STT (multipart-audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping of zoekopdracht op het web `{query}` — retourneert een array met bronnen; 422 `url_blocked` als alle adressen worden geweigerd (intern netwerk), 502 `all_sources_failed` als er geen enkele bron kon worden aangemaakt |
| `POST` | `/api/projects/:pid/sources/moderate` | Moderaties die in afwachting zijn of een foutmelding geven hervatten `{sourceIds?}` (maximaal 10 per oproep, wachttijd ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Een bron, het geïmporteerde bestand en de bijbehorende instructie verwijderen → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Modereer `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Herhalingsinstructies detecteren (alleen geverifieerde bronnen) → `{consigne, costDelta}` |

### Generatie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Samenvatting |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Meerkeuzequiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Invuloefeningen |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictee (woorden + voorbeeldzinnen + regels, 1 TTS-audio per woord; ook voorgesteld door de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustratie |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Spraakquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptieve herhaling `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Herhalingsblad gericht op de foutief beantwoorde vragen van een quiz `{generationId, weakQuestions}` — parallel aangeroepen met `quiz-review` via de knop "Oefenen met mijn fouten" |
| `POST` | `/api/projects/:pid/generate/route` | Routeringsanalyse (plan van de te starten generators) — retourneert `{plan, costDelta}` (alleen routeringskosten) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische backend-generatie (routering + 8 types: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Parallelle uitvoering — vereist een Mistral-tier met rate-limit ≥ 8 gelijktijdige verzoeken; anders kunnen meerdere 429-fouten optreden in `failedSteps`. |

Alle generatieroutes accepteren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; een `lang` dat geen taalcode is (bijv. `pt-BR`) of een onbekende `ageGroup` → 400 `invalid_input`, voorafgaand aan elke AI-aanroep. `quiz-review` en `remediation-summary` vereisen bovendien `{generationId, weakQuestions}` en hebben betrekking op de bronnen van de oorspronkelijke quiz.

### CRUD Generaties
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antwoorden op invuloefeningen indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Dicteeantwoorden indienen `{answers}` (strikte serverbeoordeling) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Een mondeling antwoord verifiëren (audio + questionIndex); gemodereerd antwoord (400 `quiz.answerBlocked`), kosten geretourneerd in `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Hardop voorlezen via TTS (samenvattingen/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Een lopende generatie annuleren (de enige manier om een pending-taak te annuleren) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Hernoemen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | De generatie en bijbehorende media (audio, afbeelding) verwijderen |

### Chat
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatgeschiedenis ophalen |
| `POST` | `/api/projects/:pid/chat` | Een bericht verzenden `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatgeschiedenis wissen |

---

## Architectuurbeslissingen

| Beslissing | Verantwoording |
|---|---|
| **Alpine.js in plaats van React/Vue** | Minimale voetafdruk, lichte reactiviteit met TypeScript gecompileerd door Vite. Perfect voor een hackathon waar snelheid telt. |
| **Persistentie in JSON-bestanden** | Geen enkele afhankelijkheid, directe opstart. Geen database om te configureren — starten en klaar. |
| **Vite + Handlebars** | Het beste van twee werelden: snelle HMR voor ontwikkeling, HTML-partials voor code-organisatie, Tailwind JIT. |
| **Gecentraliseerde prompts** | Alle AI-prompts in `prompts.ts` — eenvoudig te itereren, te testen en aan te passen per taal/leeftijdsgroep. |
| **Multi-generatiesysteem** | Elke generatie is een onafhankelijk object met een eigen ID — maakt meerdere samenvattingen, quizzen, enz. per les mogelijk. |
| **Leeftijdsgebonden prompts** | 4 leeftijdsgroepen met verschillende woordenschat, complexiteit en toon — dezelfde inhoud onderwijst anders afhankelijk van de leerling. |
| **Functionaliteiten op basis van Agents** | Het genereren van afbeeldingen en zoeken op het web maken gebruik van tijdelijke Mistral Agents — een schone levenscyclus met automatische opschoning. |
| **Intelligente URL-scraping** | Eén enkel veld accepteert gemengde URL's en trefwoorden — URL's worden gescrapet via Readability (statische pagina's) met terugval op Lightpanda (JS/SPA-pagina's), trefwoorden activeren een web_search Mistral Agent. Elk resultaat creëert een onafhankelijke bron. |
| **100% Mistral TTS** | Mistral Voxtral TTS (geen extra sleutel nodig naast `MISTRAL_API_KEY`) — spraaksynthese geïntegreerd in de kostenketen en stemresolutie per taal. |

---

## Credits & dankbetuigingen

- **[Mistral AI](https://mistral.ai)** — AI-modellen (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lichtgewicht reactief framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend build-tool
- **[Lucide](https://lucide.dev)** — Iconenbibliotheek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Webcontentextractie (Firefox Reader View-technologie)
- **[Lightpanda](https://lightpanda.io)** — Ultralichte headless browser voor het scrapen van JS/SPA-pagina's
- **[Luciole](https://luciole-vision.com)** — Lettertype ontworpen voor slechtziende lezers, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (optie « Leescomfort » van de profielen)

Gestart tijdens de Mistral AI Worldwide Hackathon (maart 2026), volledig ontwikkeld door AI met [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licentie

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel vertaald van fr naar nl met gemini-3.8-flash-medium.**
