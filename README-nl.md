<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformeert elke inhoud in een interactieve leerervaring — aangedreven door <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

**EurekAI** is ontstaan tijdens de [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiële website](https://worldwide-hackathon.mistral.ai/)) (maart 2026). Ik had een onderwerp nodig — en het idee kwam voort uit iets heel concreets: ik bereid regelmatig toetsen voor met mijn dochter, en ik dacht dat het mogelijk moest zijn om dat leuker en interactiever te maken dankzij AI.

Het doel: **willekeurige invoer** nemen — een foto van de les, gekopieerde en geplakte tekst, een spraakopname, een zoekopdracht op internet — en deze omzetten in **samenvattingen, flashcards, quizzen, podcasts, invuloefeningen, illustraties en meer**. Dit alles aangedreven door de modellen van Mistral AI, een Frans bedrijf, wat EurekAI een oplossing maakt die van nature geschikt is voor Franstalige leerlingen.

Het [initiële prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) werd in 48 uur ontworpen tijdens de hackathon als proof-of-concept gebouwd op de diensten van Mistral — al functioneel, maar beperkt. Sindsdien is EurekAI uitgegroeid tot een volwaardig project: invuloefeningen, navigatie door oefeningen, webscraping, configureerbare ouderlijke moderatie, grondige code review en nog veel meer. De volledige code is gegenereerd door AI — voornamelijk [Claude Code](https://code.claude.com/), met enkele bijdragen via [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Overzicht

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Rondleiding door EurekAI: bronnen, samenvatting, quiz, flashcards, illustraties" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — recente generaties, geschatte kosten per kaart en projecttotaal, knop "Auto — Magie!" | ![Bronnen](docs/screenshots/sources.webp)<br>**Bronnen** — import foto/pdf/tekst/spraak/web, generatie met één klik, instructiedetectie |

Elke geïmporteerde bron toont zijn [OCR-betrouwbaarheidsscore, moderatiestatus en geschatte kosten](docs/screenshots/sources-list.webp).

### De componenten in actie

| | |
|---|---|
| ![Samenvatting](docs/screenshots/notes.gif)<br>**Samenvatting** — kernpunten, woordenschat, citaten met bronvermelding, audio voorlezen per sectie | ![Quiz](docs/screenshots/quiz.gif)<br>**Meerkeuzequiz** — één juist antwoord per vraag, directe feedback met uitleg, stapsgewijze navigatie |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — kaart omdraaien en vervolgens zelfevaluatie "ik wist het / ik wist het niet" | ![Invuloefeningen](docs/screenshots/fillblank.gif)<br>**Invuloefeningen** — hint op aanvraag, tolerante validatie |
| ![Dictee](docs/screenshots/dictation.gif)<br>**Dictee** — woord gedicteerd via audio, strikte correctie letter voor letter | ![Gesproken quiz](docs/screenshots/vocal-quiz.gif)<br>**Gesproken quiz** — hardop voorgelezen vraag, antwoorden via de microfoon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast met 2 stemmen, dialoogscript beschikbaar | ![Illustraties](docs/screenshots/illustrations.gif)<br>**Illustraties** — educatieve afbeeldingen gegenereerd door Agent |
| ![AI-tutor](docs/screenshots/chat.gif)<br>**AI-tutor** — chat verankerd in de cursusdocumenten, toegelichte antwoorden, kan quizzen en flashcards genereren | |

### Aan de slag

| | |
|---|---|
| ![Profielkeuze](docs/screenshots/login.gif)<br>**Profielkeuze** — elk kind heeft zijn eigen ruimte, avatar en taal | ![Profiel aanmaken](docs/screenshots/profile-create.gif)<br>**Profiel aanmaken** — leeftijd, avatar, ouderlijke pincode voor kinderen onder de 15 jaar |
| ![Les aanmaken](docs/screenshots/course.gif)<br>**Les aanmaken** — één project per les, klaar om bronnen te ontvangen | ![Instellingen](docs/screenshots/settings.gif)<br>**Instellingen** — API-status, keuze van AI-modellen met weergegeven tarieven |

---

## Functies

| | Functie | Beschrijving |
|---|---|---|
| 📷 | **Bestandsimport** | Importeer je lessen — foto, pdf (via Mistral OCR met gemiddelde betrouwbaarheidsscore, niveaus `high`/`medium`/`low`) of tekstbestand (TXT, MD). Uploadsessies met retry per bestand en individuele voortgang |
| 📝 | **Tekstinvoer** | Typ of plak direct willekeurige tekst |
| 🎤 | **Spraakinvoer** | Neem jezelf op — Voxtral STT transcribeert je stem |
| 🌐 | **Web / URL** | Plak een URL (direct scrapen via Readability + Lightpanda) of typ een zoekopdracht (Mistral-agent web_search) |
| 📄 | **Samenvattingen** | Gestructureerde notities met kernpunten, woordenschat, citaten, anekdotes |
| 🃏 | **Flashcards** | Interactieve vraag- en antwoordkaarten, gesproken dialoogweergave |
| ❓ | **Meerkeuzequiz** | Vragen met 4 keuzes waarvan slechts één juist antwoord, met adaptieve herhaling van fouten (configureerbaar aantal) |
| ✏️ | **Invuloefeningen** | Oefeningen om in te vullen met hints en tolerante validatie |
| 🔤 | **Dictee** | Woorden gedicteerd via audio (Voxtral TTS) uit een geïmporteerde lijst, toetsenbordinvoer, strikte correctie letter voor letter met uitgelegde spellingsregel |
| 🎙️ | **Podcast** | Mini-podcast met 2 stemmen in audio — standaard Mistral-stemmen of aangepaste stemmen (ouders!) |
| 🖼️ | **Illustraties** | Educatieve afbeeldingen gegenereerd door een Mistral-agent |
| 🗣️ | **Gesproken quiz** | Vragen hardop voorgelezen (aangepaste stem mogelijk), mondeling antwoord, AI-verificatie |
| 💬 | **AI-tutor** | Contextuele chat met je cursusdocumenten, met tool calling |
| 🧠 | **Automatische router** | Een router op basis van `mistral-small-latest` analyseert de inhoud en stelt een combinatie van generatoren voor uit de 8 beschikbare types |
| 🔒 | **Ouderlijk toezicht** | Configureerbare moderatie per profiel (aanpasbare categorieën), ouderlijke pincode, chatbeperkingen |
| 🌍 | **Meertalig** | Interface beschikbaar in 9 talen; AI-generatie aanstuurbaar in 15 talen via prompts |
| 🔊 | **Voorlezen** | Beluister de samenvattingen en flashcards (vraag-en-antwoorddialoog) via Mistral Voxtral TTS |
| 💶 | **API-kosten bijhouden** | Transparante schatting van de kosten in € van elke generatie en bron (tokens / tekens / pagina's / audioseconden). Badge per kaart + totaal per project, zichtbaar in het dashboard |
| 🎨 | **Thema per profiel** | Elk profiel kiest zijn `dark`- of `light`-thema — opgeslagen bij het profiel en opnieuw toegepast bij elke profielwissel |

---

## Architectuuroverzicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Overzichtskaart modelgebruik

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Gebruikersreis

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Diepe duik — Functies

### Multimodale invoer

EurekAI accepteert 4 typen bronnen, gemodereerd op basis van het profiel (moderatie standaard ingeschakeld voor kind- en tienerprofielen):

- **Bestandsimport** — JPG-, PNG- of PDF-bestanden verwerkt via Mistral OCR — **standaard OCR 4 (`mistral-ocr-4-0`)** (beste kwaliteit), **optioneel OCR 3 (`mistral-ocr-2512`)** in de Instellingen (goedkoper, ~½ van de kosten) — voor gedrukte tekst, tabellen en handschrift; of rechtstreeks geïmporteerde tekstbestanden (TXT, MD). Uploads van meerdere bestanden gebruiken een systeem van **uploadsessies**: individuele voortgang per bestand, opnieuw proberen van een mislukt bestand zonder de andere opnieuw in te dienen, sluiten van de sessie wanneer deze is voltooid. De OCR biedt een gemiddelde **betrouwbaarheidsscore** (`average`, begrensd binnen `[0,1]`, berekend op basis van `averagePageConfidenceScore` geretourneerd door Mistral), weergegeven in de UI als een niveau-badge `high` / `medium` / `low` (drempels ~0.9 / ~0.7) — waarschuwt zonder te blokkeren als de scan van slechte kwaliteit is. De kopie van het document die naar Mistral is verzonden voor OCR wordt direct na afloop van de verwerking verwijderd, zelfs bij een mislukte poging.
- **Vrije tekst** — Typ of plak willekeurige inhoud. Wordt vóór opslag gemodereerd als moderatie actief is.
- **Spraakinvoer** — Neem audio op in de browser. Getranscribeerd door `voxtral-mini-latest`. De parameter `language="fr"` optimaliseert de herkenning.
- **Web / URL** — Plak een of meer URL's om de inhoud direct te scrapen (Readability + Lightpanda voor JS-pagina's), of typ trefwoorden voor een zoekopdracht op internet via een Mistral-agent. Het enkele invoerveld accepteert beide — URL's en trefwoorden worden automatisch gescheiden, elk resultaat creëert een onafhankelijke bron.

### AI-contentgeneratie

Acht soorten gegenereerd leermateriaal:

| Generator | Model | Uitvoer |
|---|---|---|
| **Samenvatting** | `mistral-large-latest` | Titel, samenvatting, kernpunten, woordenschat, citaten, anekdote |
| **Flashcards** | `mistral-large-latest` | Vraag- en antwoordkaarten met bronverwijzingen (configureerbaar aantal) |
| **Meerkeuzequiz** | `mistral-large-latest` | Vragen met 4 keuzes waarvan slechts één juist antwoord, uitleg, adaptieve herhaling (configureerbaar aantal) |
| **Invuloefeningen** | `mistral-large-latest` | Aan te vullen zinnen met hints, tolerante validatie (Levenshtein) |
| **Dictee** | `mistral-large-latest` + Voxtral TTS | Sleutelwoorden gedicteerd via audio (1 MP3/woord) → toetsenbordinvoer → strikte correctie (een vergeten accent telt als een fout) met uitgelegde regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script met 2 stemmen → MP3-audio |
| **Illustratie** | Agent `mistral-large-latest` | Educatieve afbeelding via de tool `image_generation` |
| **Gesproken quiz** | `mistral-large-latest` + Voxtral TTS + STT | Vragen via TTS → antwoord via STT → AI-verificatie |

### AI-chattutor

Een conversationele tutor met volledige toegang tot de cursusdocumenten:

- Maakt gebruik van `mistral-large-latest`
- **Tool calling**: kan samenvattingen, flashcards, quizzen of invuloefeningen genereren tijdens het gesprek
- Geschiedenis van 50 berichten per les
- Moderatie indien ingeschakeld voor het profiel: het bericht wordt gecontroleerd en gemarkeerde bronnen, bronnen waarvan de verificatie is mislukt en bronnen die nog niet zijn geverifieerd, worden uitgesloten van de context en tools (de verificatie van mislukte of nog niet geverifieerde bronnen wordt eerst opnieuw gestart, maximaal 5 s)

### Automatische router

De router gebruikt `mistral-small-latest` om de inhoud van de bronnen te analyseren en de meest relevante generatoren voor te stellen uit de 8 beschikbare types. De interface toont de voortgang in realtime: eerst een analysefase, daarna de afzonderlijke generaties met de mogelijkheid tot annuleren.

### Adaptief leren

- **Quizstatistieken**: bijhouden van pogingen en nauwkeurigheid per vraag
- **Quizherhaling**: genereert 5-10 nieuwe vragen gericht op zwakke concepten, op basis van de bronnen van de oorspronkelijke quiz (de moderatiebewaking geldt voor dezelfde bronnen)
- **Instructiedetectie**: detecteert herhalingsinstructies ("Ik ken mijn les als ik weet...") en geeft hieraan prioriteit in de compatibele tekstuele generatoren (samenvatting, flashcards, quiz, invuloefeningen). Met actieve moderatie wacht de detectie op de verificatie van de bronnen en leest alleen die welke als veilig worden beschouwd; de instructie behoudt de lijst van de oorspronkelijke bronnen: als een ervan wordt gemarkeerd, wordt de instructie niet weergegeven noch toegepast, en als een ervan wordt verwijderd, wordt de instructie gewist. De kosten hiervan worden meegeteld

### Veiligheid & ouderlijk toezicht

- **4 leeftijdsgroepen**: kind (≤10 jaar), tiener (11-15), student (16-25), volwassene (26+)
- **Inhoudsmoderatie**: `mistral-moderation-2603` (Mistral Moderation 2) met 11 beschikbare categorieën, waarvan er 6 standaard zijn geblokkeerd voor nieuwe kind-/tienerprofielen (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` toegevoegd na een meting op 50 lessen, inclusief geschiedenis, zonder valse positieven). Categorieën per profiel aanpasbaar in de instellingen; Moderation 2 heeft de voormalige categorie "gevaarlijke inhoud" gesplitst in `dangerous` + `criminal` (bestaande profielen worden automatisch gemigreerd en geblokkeerde categorieën zijn ook van toepassing op reeds geïmporteerde bronnen). Veiligheid als standaard: als het antwoord van het model het niet mogelijk maakt om een geblokkeerde categorie te verifiëren, wordt de inhoud geweigerd ("Moderatie niet beschikbaar"); met actieve moderatie sluiten zowel generatie als chat gemarkeerde bronnen uit, evenals bronnen waarvan de verificatie is mislukt en bronnen die worden geverifieerd. Een bron die nooit is geverifieerd (geïmporteerd toen moderatie was uitgeschakeld, of een oud project dat aan een profiel is gekoppeld) wordt vóór gebruik geverifieerd. Een moderatie die is onderbroken door een herstart wordt bij het opstarten hervat als de serversleutel dit toestaat; anders wordt deze, net als een moderatie met een fout, hervat bij het openen van het project of bij de volgende generatie. Een knop "Opnieuw verifiëren" start de verificatie op aanvraag opnieuw. Met actieve moderatie wordt, zolang een bron niet als veilig wordt beschouwd, de inhoud ervan verborgen voor het kind (voorbeeld, tekst, origineel document); een ouder kan deze weergeven met zijn pincode voor een eenmalige raadpleging. Het mondelinge antwoord van de gesproken quiz wordt gemodereerd voordat het wordt geverifieerd. Gedateerde ID vastgezet in `helpers/moderation-model.ts`: de alias `-latest`, verouderd, wordt niet meer vermeld door de API.
- **Ouderlijke pincode**: SHA-256-hash, vereist voor profielen onder de 15 jaar; maximaal 10 onjuiste codes per kwartier en per IP-adres (429 `rate_limited`). Voor een productieomgeving wordt een trage hash met salt aanbevolen (Argon2id, bcrypt).
- **Servergegevens**: `/output` publiceert alleen projectmedia (audio, afbeeldingen, geïmporteerde bestanden); `profiles.json`, `config.json`, `projects.json` en de `project.json` worden nooit geserveerd
- **Chatbeperkingen**: AI-chat standaard uitgeschakeld voor jongeren onder de 16 jaar, kan door ouders worden ingeschakeld

### Multiprofielsysteem

- Meerdere profielen met naam, leeftijd, avatar, taalvoorkeuren
- **Stem per profiel** (`Profile.mistralVoices?: { host?, guest? }` — elke rol is optioneel) — elk kind kan zijn eigen paar podcast-/gesproken quiz-stemmen hebben
- **Thema per profiel** (`Profile.theme: 'dark' | 'light'`) — automatische omschakeling bij profielwissel, persistent bewaard aan de backend-zijde
- Projecten gekoppeld aan profielen via `profileId`; een oud project zonder profiel wordt gekoppeld aan het eerste profiel dat het opent, en vervolgens gemodereerd volgens dat profiel
- Trapsgewijze verwijdering: het verwijderen van een profiel verwijdert al zijn projecten

### Opvolging van API-kosten

Elke factureerbare Mistral-aanroep (chat, OCR, STT, TTS, agents), inclusief instructiedetectie en mondelinge antwoorden van de gesproken quiz, is geïnstrumenteerd om de gebruiker een **transparante** schatting in € te bieden. Moderatie, die gratis is, wordt niet meegerekend. De toolkosten van agents zijn inbegrepen: $ 0,03 per webzoekopdracht en $ 0,10 per gegenereerde afbeelding (Mistral-tarieven), plus de tokens die door deze tools worden geproduceerd, die de schatting berekent tegen het invoertarief van het model van de agent.

- **Bron van waarheid**: `helpers/pricing.ts` — `MODEL_PRICING` per modelprefix (bijv.: `mistral-large` → input 0,5 €/M tokens, output 1,5 €/M tokens), `PRICING_SOURCES` met Mistral-documentatie-URL's voor periodiek opnieuw scrapen
- **Ondersteunde eenheden**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie gestuurd door `helpers/cost-calc.ts`
- **Instrumentatieketen**: `helpers/tracked-client.ts` (wrapt de Mistral-client) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectie in het HTTP-antwoord)
- **UI**: kostenbadge per generatie (`src/partials/cost-badge-gen.html`), per bron (`cost-badge-src.html`), cumulatief totaal in het dashboard (`Project.totalCost`)
- **Endpoints**: de antwoorden `/generate/*` en `/sources/*` verrijken het geretourneerde object (`Generation` / `Source`) met `estimatedCost`, `usage` en `costBreakdown`. `POST /generate/route` voegt een veld `costDelta: number` toe voor enkel de routeringskosten; `POST /detect-consigne` (`{consigne, costDelta}`) en de verificatie van een mondeling antwoord retourneren ook hun `costDelta`. `GET /projects/:pid` retourneert het project verrijkt met `totalCost` (som berekend vanuit `costLog[]`) + de volledige geschiedenis

### TTS (Mistral Voxtral) & aangepaste stemmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral-spraakweergave, geen extra sleutel nodig
- **Aangepaste stemmen**: ouders kunnen hun eigen stemmen aanmaken via de Mistral Voices API (op basis van een audiofragment) en deze toewijzen aan de rollen host/gast — podcasts en gesproken quizzen worden dan voorgelezen met de stem van een ouder, wat de ervaring voor het kind nog meeslepender maakt
- Twee configureerbare stemrollen: **host** (hoofdverteller) en **gast** (tweede stem van de podcast)
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
| **Backend** | Express 5.x | REST-API |
| **Ontwikkelserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactieve interface, TypeScript gecompileerd door Vite |
| **Templating** | vite-plugin-handlebars | HTML-compositie via partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderatie |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, geïntegreerde spraaksynthese |
| **Pictogrammen** | Lucide 1.x | SVG-iconenbibliotheek |
| **Webscraping** | Readability + linkedom | Extractie van de hoofdinhoud van webpagina's (Firefox Reader View-technologie) |
| **Headless browser** | Lightpanda | Ultralichte headless browser (Zig + V8) voor JS/SPA-pagina's — fallback voor scraping |
| **Markdown** | Marked | Markdown-rendering in de chat |
| **Bestandsupload** | Multer 2.x | Verwerking van multipart-formulieren |
| **Audio** | ffmpeg-static | Samenvoeging van audiosegmenten |
| **Tests** | Vitest | Unittests — dekking gemeten door SonarCloud |
| **Persistentie** | JSON-bestanden | Opslag zonder afhankelijkheden |

---

## Modelreferentie

| Model | Gebruik | Waarom |
|---|---|---|
| `mistral-large-latest` | Studiefiche, Flashcards, Podcast, Quiz, Invuloefeningen, Chat, Verificatie gesproken quiz, Agent Image, Agent Web Search, Instructiedetectie | Beste meertaligheid + opvolgen van instructies |
| `mistral-ocr-4-0` (OCR 4, standaard) | Document-OCR — superieure kwaliteit | Gedrukte tekst, tabellen, handschrift ($ 4 / 1000 pagina's) |
| `mistral-ocr-2512` (OCR 3, optie) | Document-OCR | Te selecteren in Instellingen, goedkoper ($ 2 / 1000 pagina's) |
| `voxtral-mini-latest` | Spraakherkenning (STT) | Meertalige STT, geoptimaliseerd met `language="fr"` |
| `voxtral-mini-tts-latest` | Spraaksynthese (TTS) | Podcasts, gesproken quiz, voorlezen |
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

> **Opmerking**: Mistral Voxtral TTS is de enige TTS-provider — geen extra sleutel nodig buiten `MISTRAL_API_KEY`.

> **Door de gebruiker ingevoerde API-sleutel**: `MISTRAL_API_KEY` is voortaan **optioneel**. Indien afwezig, start de app toch op en wordt elke gebruiker uitgenodigd om **zijn eigen Mistral-sleutel** in te voeren in de interface. De sleutel wordt **opgeslagen in de browser** (versleuteld via Web Crypto + IndexedDB in een beveiligde context) en per verzoek verzonden — **nooit bewaard op de server**. Prioriteit: profielsleutel > globale browsersleutel > `MISTRAL_API_KEY` (env). Het instellen van `EUREKAI_REQUIRE_USER_KEY=true` dwingt elke gebruiker om zijn sleutel op te geven (de env-sleutel dient dan enkel nog voor preloads).

> **Lokale HTTPS (tablet/LAN)**: `localhost` is al een beveiligde context. Genereer voor LAN-toegang (tablet) een lokaal certificaat en activeer HTTPS: de browser kan dan de opgeslagen sleutel versleutelen, en de sleutel is tijdens de overdracht versleuteld:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Omgevingsvariabelen

| Variabele | Vereist | Standaard | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | optioneel | — | Mistral API-sleutel (chat, OCR, STT, Voxtral TTS, agents, moderatie). Indien afwezig voert de gebruiker zijn sleutel in de app in (opgeslagen in de browser, nooit op de server) |
| `EUREKAI_REQUIRE_USER_KEY` | optioneel | `false` | `true` → schakelt de fallback naar `MISTRAL_API_KEY` uit voor AI-verzoeken (elke gebruiker MOET zijn sleutel opgeven). Handig voor een publiek toegankelijke instantie |
| `HTTPS_KEY` / `HTTPS_CERT` | optioneel | — | TLS-sleutel-/certificaatpaden (zie `scripts/gen-cert.sh`) → Express en Vite serveren via HTTPS (veilige LAN-/tabletcontext) |
| `PORT` | optioneel | `3000` | HTTP-poort van de Express-backend |
| `NODE_ENV` | optioneel | `development` | Indien `production` → Express serveert de frontend vanuit `dist/` (anders `public/`) |
| `SONAR_TOKEN` | optioneel CI | — | Alleen gebruikt door de SonarCloud GitHub Actions-workflow |

### Tests, codekwaliteit en bijdragen

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)**: `pre-commit` voert achtereenvolgens `scripts/pre-commit-fast.sh` (conflicten, grote bestanden, shellcheck), `lint-staged` en vervolgens `npm test` uit; `pre-push` voert eerst een blokkerende controle `npm audit` uit (blokkeert zodra een afhankelijkheid, zelfs transitief, een kwetsbaarheid van niveau `critical` heeft, zie `scripts/audit-verdict.mjs`) en daarna `npm run security`. Elke hook blokkeert de commit/push zodra een van de stappen mislukt.

**Externe tools (optioneel om de applicatie te starten, onmisbaar voor `pretest` en `npm run security`)**:

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

> **`:U`**: rootless Podman-flag die automatisch de volumerechten aanpast.

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

> **Voor AI-agents die bijdragen aan de code**: raadpleeg [`CLAUDE.md`](CLAUDE.md) voor de gedetailleerde architectuurcontext, de verplichte regels (foutcodes, cost tracking en prompts zonder metaworden, dat wil zeggen zonder kwalificaties van het document zoals het type, omdat het model deze woorden in zijn output zou overnemen) en bekende valkuilen (Lizard CCN, Opengrep, Codacy/Semgrep-migratie).

---

## API-referentie

### Config
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/config` | Huidige configuratie |
| `PUT` | `/api/config` | De configuratie wijzigen (modellen, stemmen, TTS-model) |
| `GET` | `/api/config/status` | Status van de API's: `mistral` (Mistral-sleutel ingesteld), `ttsAvailable` (alias van `mistral`, Mistral Voxtral is de enige TTS-provider) |
| `POST` | `/api/config/reset` | Configuratie herstellen naar de standaardwaarden |
| `GET` | `/api/config/voices` | Mistral TTS-stemmen oplijsten (optioneel `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Beschikbare moderatiecategorieën + standaardwaarden per leeftijd |
| `POST` | `/api/providers/mistral/validate` | Een door de gebruiker ingevoerde Mistral-sleutel valideren — altijd 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), geen env-fallback |

### Profielen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/profiles` | Alle profielen oplijsten |
| `POST` | `/api/profiles` | Een profiel aanmaken |
| `PUT` | `/api/profiles/:id` | Een profiel wijzigen (pincode vereist voor < 15 jaar; 10 foute pincodes / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Een profiel verwijderen + projectencascade `{pin?}` → `{ok, deletedProjects}` |

### Projecten
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects` | Projecten oplijsten (`?profileId=` optioneel) |
| `POST` | `/api/projects` | Een project aanmaken `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projectdetails; `?profileId=` koppelt een project zonder profiel aan het profiel dat het opent |
| `PUT` | `/api/projects/:pid` | `{name}` hernoemen |
| `DELETE` | `/api/projects/:pid` | Het project verwijderen |
| `GET` | `/api/projects/:pid/events` | Realtime SSE-stream (`event: generation`) van generatietransities (`completed`/`failed`/`cancelled`) + keep-alive-heartbeat |

### Bronnen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-bestandsupload (OCR voor JPG/PNG/PDF, direct inlezen voor TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Vrije tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-spraak (multipart-audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping of webzoekopdracht `{query}` — retourneert een array van bronnen; 422 `url_blocked` als alle adressen geweigerd worden (intern netwerk), 502 `all_sources_failed` als er geen bron kon worden aangemaakt |
| `POST` | `/api/projects/:pid/sources/moderate` | Moderaties die in afwachting zijn of een fout bevatten hervatten `{sourceIds?}` (maximaal 10 per aanroep, wachttijd ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Een bron, het geïmporteerde bestand en de afhankelijke instructie verwijderen → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | `{text}` modereren |
| `POST` | `/api/projects/:pid/detect-consigne` | Studie-instructies detecteren (alleen geverifieerde bronnen) → `{consigne, costDelta}` |

### Generatie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Studiefiche |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Meerkeuzequiz (4 keuzes, één juist antwoord) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Invuloefeningen |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictee (woorden + voorbeeldzinnen + regels, 1 TTS-audio per woord; ook voorgesteld door de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustratie |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Gesproken quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptieve revisie `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Herhalingsfiche gericht op foute vragen van een quiz `{generationId, weakQuestions}` — parallel aangeroepen met `quiz-review` via de remediëringsknop van de quizweergave |
| `POST` | `/api/projects/:pid/generate/route` | Routeringsanalyse (plan van de te starten generators) — retourneert `{plan, costDelta}` (kosten van alleen de routering) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische backend-generatie (routering + 8 types: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Parallelle uitvoering — veronderstelt een Mistral-tier met rate-limit ≥ 8 gelijktijdige verzoeken; anders kunnen er meerdere 429's optreden in `failedSteps`. |

Alle generatieroutes accepteren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; een onbekende `ageGroup` of een `lang` die geen geldige taalcode is (verwacht: `fr`, `pt-BR`…) → 400 `invalid_input`, voorafgaand aan elke AI-aanroep. `quiz-review` en `remediation-summary` vereisen bovendien `{generationId, weakQuestions}` en hebben betrekking op de bronnen van de oorspronkelijke quiz.

### CRUD Generaties
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antwoorden voor invuloefeningen indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Dictee-antwoorden indienen `{answers}` (strikte serverbeoordeling) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Een mondeling antwoord verifiëren (audio + questionIndex); het mondelinge antwoord wordt gemodereerd alvorens te worden geverifieerd (weigering: 400 `quiz.answerBlocked`), kosten geretourneerd in `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Hardop voorlezen via TTS (studiefiches/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Een lopende generatie annuleren (enige manier om een pending-status te annuleren) |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` hernoemen |
| `DELETE` | `/api/projects/:pid/generations/:gid` | De generatie en bijbehorende media (audio, afbeelding) verwijderen |

### Chat
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chathistorie ophalen |
| `POST` | `/api/projects/:pid/chat` | Een bericht verzenden `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Chathistorie wissen |

---

## Architectuurbeslissingen

| Beslissing | Verantwoording |
|---|---|
| **Alpine.js in plaats van React/Vue** | Minimale voetafdruk, lichte reactiviteit met door Vite gecompileerde TypeScript. Perfect voor een hackathon waar snelheid telt. |
| **Persistentie in JSON-bestanden** | Geen afhankelijkheden, onmiddellijke opstart. Geen database om te configureren — starten en klaar. |
| **Vite + Handlebars** | Het beste van twee werelden: snelle HMR voor ontwikkeling, HTML-partials voor code-organisatie, Tailwind JIT. |
| **Gecentraliseerde prompts** | Alle AI-prompts in `prompts.ts` — eenvoudig te itereren, te testen en aan te passen per taal/leeftijdsgroep. |
| **Multi-generatiesysteem** | Elke generatie is een onafhankelijk object met een eigen ID — maakt meerdere studiefiches, quizzen, enz. per les mogelijk. |
| **Op leeftijd afgestemde prompts** | 4 leeftijdsgroepen met verschillende woordenschat, complexiteit en toon — dezelfde inhoud onderwijst anders afhankelijk van de leerling. |
| **Functionaliteiten gebaseerd op agents** | Het genereren van afbeeldingen en webzoekopdrachten maken gebruik van tijdelijke Mistral-agents — schone levenscyclus met automatische opschoning. |
| **Intelligente URL-scraping** | Eén enkel veld accepteert gemengde URL's en trefwoorden — URL's worden gescraped via Readability (statische pagina's) met een Lightpanda-fallback (JS/SPA-pagina's), trefwoorden activeren een Mistral web_search-agent. Elk resultaat creëert een onafhankelijke bron. |
| **100% Mistral TTS** | Mistral Voxtral TTS (geen extra sleutel nodig buiten `MISTRAL_API_KEY`) — spraaksynthese geïntegreerd in de kostenketen en stemresolutie per taal. |

---

## Credits & dankbetuigingen

- **[Mistral AI](https://mistral.ai)** — AI-modellen (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lichtgewicht reactief framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend-buildtool
- **[Lucide](https://lucide.dev)** — Icoonbibliotheek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extractie van webinhoud (technologie van Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralichte headless browser voor het scrapen van JS/SPA-pagina's
- **[Luciole](https://luciole-vision.com)** — Lettertype ontworpen voor slechtziende lezers, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (optie "Leescomfort" van de profielen)

Gestart tijdens de Mistral AI Worldwide Hackathon (maart 2026), volledig ontwikkeld door AI met [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licentie

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel vertaald van fr naar nl met gemini-3.8-flash-high.**
