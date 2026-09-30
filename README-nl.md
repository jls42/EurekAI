<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verander elke soort content in een interactieve leerervaring — aangedreven door <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

**EurekAI** ontstond tijdens de [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiële website](https://worldwide-hackathon.mistral.ai/)) (maart 2026). Ik had een onderwerp nodig — en het idee kwam voort uit iets heel concreets: ik bereid regelmatig toetsen voor met mijn dochter en bedacht dat het dankzij AI mogelijk moest zijn om dat speelser en interactiever te maken.

Het doel: **elke soort invoer** — een foto van de les, gekopieerde en geplakte tekst, een spraakopname, een zoekopdracht op het web — omzetten in **samenvattingen, flashcards, quizzen, podcasts, invulteksten, illustraties en meer**. Alles aangedreven door de modellen van het Franse bedrijf Mistral AI, waardoor EurekAI van nature goed aansluit bij Franstalige leerlingen.

Het [oorspronkelijke prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) werd tijdens de hackathon in 48 uur gebouwd als proof of concept op basis van de diensten van Mistral — al functioneel, maar beperkt. Sindsdien is EurekAI uitgegroeid tot een volwaardig project: invulteksten, navigatie door oefeningen, webscraping, configureerbaar ouderlijk toezicht, grondige codereview en nog veel meer. Alle code is door AI gegenereerd — voornamelijk door [Claude Code](https://code.claude.com/), met enkele bijdragen via [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Overzicht

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Rondleiding door EurekAI: bronnen, samenvatting, quiz, flashcards, illustraties" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — recente generaties, geschatte kosten per kaart en totaalbedrag per project, knop ‘Auto — Magie!’ | ![Bronnen](docs/screenshots/sources.webp)<br>**Bronnen** — foto/PDF/tekst/spraak/web importeren, genereren met één klik, instructiedetectie |

Bij elke geïmporteerde bron worden de [OCR-betrouwbaarheidsscore, moderatie en geschatte kosten](docs/screenshots/sources-list.webp) weergegeven.

### De componenten in actie

| | |
|---|---|
| ![Samenvatting](docs/screenshots/notes.gif)<br>**Samenvatting** — kernpunten, woordenschat, citaten met bronvermelding, audio per sectie | ![Quiz](docs/screenshots/quiz.gif)<br>**Meerkeuzequiz** — slechts één juist antwoord per vraag, onmiddellijke feedback met uitleg, stapsgewijze navigatie |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — kaart omdraaien en daarna zelfevaluatie ‘ik wist het / ik wist het niet’ | ![Invulteksten](docs/screenshots/fillblank.gif)<br>**Invulteksten** — hint op aanvraag, tolerante validatie |
| ![Dictee](docs/screenshots/dictation.gif)<br>**Dictee** — woord als audio gedicteerd, strikte correctie letter voor letter | ![Spraakquiz](docs/screenshots/vocal-quiz.gif)<br>**Spraakquiz** — vraag wordt voorgelezen, antwoord via de microfoon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — minipodcast met 2 stemmen, dialoogscript kan worden bekeken | ![Illustraties](docs/screenshots/illustrations.gif)<br>**Illustraties** — educatieve afbeeldingen gegenereerd door een Agent |
| ![AI-tutor](docs/screenshots/chat.gif)<br>**AI-tutor** — chat op basis van de lesdocumenten, antwoorden met uitleg, kan quizzen en flashcards genereren | |

### Aan de slag

| | |
|---|---|
| ![Profiel kiezen](docs/screenshots/login.gif)<br>**Profiel kiezen** — ieder kind heeft een eigen omgeving, avatar en taal | ![Profiel aanmaken](docs/screenshots/profile-create.gif)<br>**Profiel aanmaken** — leeftijd, avatar, ouderlijke PIN voor kinderen jonger dan 15 jaar |
| ![Cursus aanmaken](docs/screenshots/course.gif)<br>**Cursus aanmaken** — één project per les, klaar om bronnen te ontvangen | ![Instellingen](docs/screenshots/settings.gif)<br>**Instellingen** — API-status, keuze uit AI-modellen met weergegeven tarieven |

---

## Functies

| | Functie | Beschrijving |
|---|---|---|
| 📷 | **Bestanden importeren** | Importeer je lessen — foto, PDF (via Mistral OCR met gemiddelde betrouwbaarheidsscore, niveaus `high`/`medium`/`low`) of tekstbestand (TXT, MD). Uploadsessies met retry per bestand en afzonderlijke voortgang |
| 📝 | **Tekstinvoer** | Typ of plak rechtstreeks elke gewenste tekst |
| 🎤 | **Spraakinvoer** | Neem jezelf op — Voxtral STT transcribeert je stem |
| 🌐 | **Web/URL** | Plak een URL (directe scraping via Readability + Lightpanda) of voer een zoekopdracht in (Mistral Agent web_search) |
| 📄 | **Samenvattingen** | Gestructureerde notities met kernpunten, woordenschat, citaten en weetjes |
| 🃏 | **Flashcards** | Interactieve vraag-en-antwoordkaarten, audio als dialoog |
| ❓ | **Meerkeuzequizzen** | Vragen met 4 opties waarvan er slechts één juist is, met adaptieve herhaling van fouten (configureerbaar aantal) |
| ✏️ | **Invulteksten** | Oefeningen om aan te vullen, met hints en tolerante validatie |
| 🔤 | **Dictee** | Woorden uit een geïmporteerde lijst worden als audio gedicteerd (Voxtral TTS), invoer via het toetsenbord, strikte correctie letter voor letter met uitleg van de spellingsregel |
| 🎙️ | **Podcast** | Minipodcast met 2 stemmen als audio — standaardstemmen van Mistral of gepersonaliseerde stemmen (ouders!) |
| 🖼️ | **Illustraties** | Educatieve afbeeldingen gegenereerd door een Mistral Agent |
| 🗣️ | **Spraakquiz** | Vragen worden hardop voorgelezen (aangepaste stem mogelijk), mondeling antwoord, verificatie door AI |
| 💬 | **AI-tutor** | Contextuele chat met je lesdocumenten, met tool calls |
| 🧠 | **Automatische router** | Een router op basis van `mistral-small-latest` analyseert de content en stelt een combinatie van generators voor uit de 8 beschikbare typen |
| 🔒 | **Ouderlijk toezicht** | Configureerbare moderatie per profiel (aanpasbare categorieën), ouderlijke PIN, chatbeperkingen |
| 🌍 | **Meertalig** | Interface beschikbaar in 9 talen; AI-generatie via prompts aanstuurbaar in 15 talen |
| 🔊 | **Voorlezen** | Luister naar samenvattingen en flashcards (vraag-en-antwoorddialoog) via Mistral Voxtral TTS |
| 💶 | **API-kosten bijhouden** | Transparante schatting in euro's van de kosten voor elke generatie en bron (tokens/tekens/pagina's/seconden audio). Badge per kaart plus totaal per project, zichtbaar op het dashboard |
| 🎨 | **Thema per profiel** | Elk profiel kiest het thema `dark` of `light` — opgeslagen bij het profiel en opnieuw toegepast wanneer van profiel wordt gewisseld |

---

## Architectuuroverzicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architectuuroverzicht" width="800" />
</p>

---

## Overzicht van modelgebruik

<p align="center">
  <img src="public/assets/model-map.webp" alt="Koppeling tussen AI-modellen en taken" width="800" />
</p>

---

## Gebruikerstraject

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Leertraject van de leerling" width="800" />
</p>

---

## Diepgaande uitleg — Functies

### Multimodale invoer

EurekAI accepteert 4 typen bronnen, die op basis van het profiel worden gemodereerd (moderatie is standaard ingeschakeld voor kinder- en tienerprofielen):

- **Bestanden importeren** — JPG-, PNG- of PDF-bestanden die worden verwerkt door Mistral OCR — standaard **OCR 4.1 (`mistral-ocr-4-1`)**, optioneel **OCR 3 (`mistral-ocr-2512`)** in de Instellingen (goedkoper, ongeveer de helft van de kosten; leest handschrift beter) — voor gedrukte tekst, tabellen en handschrift; of tekstbestanden (TXT, MD) die rechtstreeks worden geïmporteerd. Uploads van meerdere bestanden gebruiken een systeem van **uploadsessies**: afzonderlijke voortgang per bestand, retry van een mislukt bestand zonder de andere opnieuw in te dienen en de sessie sluiten wanneer die voltooid is. De OCR levert een gemiddelde **betrouwbaarheidsscore** (`average`, begrensd in `[0,1]`, berekend op basis van de door Mistral geretourneerde `averagePageConfidenceScore`), die in de UI als badge van niveau `high` / `medium` / `low` wordt weergegeven (drempels van ongeveer 0,9 / ongeveer 0,7) — deze waarschuwt zonder te blokkeren als de scan van slechte kwaliteit is. De kopie van het document die voor OCR naar Mistral wordt gestuurd, wordt meteen na de verwerking verwijderd, ook als die mislukt.
- **Vrije tekst** — Typ of plak willekeurige content. Wordt vóór opslag gemodereerd als moderatie actief is.
- **Spraakinvoer** — Neem audio op in de browser. Wordt getranscribeerd door `voxtral-mini-latest`. De parameter `language="fr"` optimaliseert de herkenning.
- **Web/URL** — Plak een of meer URL's om de content rechtstreeks te scrapen (Readability + Lightpanda voor JS-pagina's), of voer trefwoorden in om via een Mistral Agent op het web te zoeken. Hetzelfde veld accepteert beide — URL's en trefwoorden worden automatisch gescheiden en elk resultaat maakt een afzonderlijke bron aan.

### Generatie van AI-content

Acht typen gegenereerd leermateriaal:

| Generator | Model | Uitvoer |
|---|---|---|
| **Samenvatting** | `mistral-large-latest` | Titel, samenvatting, kernpunten, woordenschat, citaten, weetje |
| **Flashcards** | `mistral-large-latest` | Vraag-en-antwoordkaarten met bronverwijzingen (configureerbaar aantal) |
| **Meerkeuzequiz** | `mistral-large-latest` | Vragen met 4 opties waarvan er slechts één juist is, uitleg, adaptieve herhaling (configureerbaar aantal) |
| **Invulteksten** | `mistral-large-latest` | Zinnen om aan te vullen met hints, tolerante validatie (Levenshtein) |
| **Dictee** | `mistral-large-latest` + Voxtral TTS | Sleutelwoorden gedicteerd als audio (1 MP3/woord) → invoer via toetsenbord → strikte correctie (een vergeten accent telt als fout) met uitleg van de regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script met 2 stemmen → MP3-audio |
| **Illustratie** | Agent `mistral-large-latest` | Educatieve afbeelding via de tool `image_generation` |
| **Spraakquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-vragen → STT-antwoord → AI-verificatie |

### AI-tutor via chat

Een conversationele tutor met volledige toegang tot de lesdocumenten:

- Gebruikt `mistral-large-latest`
- **Tool calls**: kan tijdens het gesprek samenvattingen, flashcards, quizzen of invulteksten genereren
- Geschiedenis van 50 berichten per cursus
- Moderatie indien ingeschakeld voor het profiel: het bericht wordt gecontroleerd, terwijl gemarkeerde bronnen, bronnen waarvan de controle is mislukt en bronnen die nog niet zijn gecontroleerd, uit de context en tools worden geweerd (de controle van mislukte of nog niet gecontroleerde bronnen wordt eerst opnieuw gestart, gedurende maximaal 5 seconden)

### Automatische router

De router gebruikt `mistral-small-latest` om de content van de bronnen te analyseren en de relevantste generators voor te stellen uit de 8 beschikbare opties. De interface toont de voortgang in realtime: eerst een analysefase en daarna de afzonderlijke generaties, die kunnen worden geannuleerd.

### Adaptief leren

- **Quizstatistieken**: houdt het aantal pogingen en de nauwkeurigheid per vraag bij
- **Quizherhaling**: genereert 5-10 nieuwe vragen die gericht zijn op zwakke concepten, op basis van de bronnen van de oorspronkelijke quiz (de moderatiecontrole heeft betrekking op diezelfde bronnen)
- **Instructiedetectie**: detecteert herhalingsinstructies (‘Ik ken mijn les als ik...’) en geeft ze prioriteit in compatibele tekstgenerators (samenvatting, flashcards, quiz, invulteksten). Als moderatie actief is, wacht de detectie op de controle van de bronnen en leest ze alleen bronnen die als veilig zijn beoordeeld; de instructie bewaart de lijst met haar oorspronkelijke bronnen: als een daarvan wordt gemarkeerd, wordt de instructie niet weergegeven of toegepast, en als een daarvan wordt verwijderd, wordt de instructie gewist. De kosten ervan worden meegerekend

### Beveiliging en ouderlijk toezicht

- **4 leeftijdsgroepen**: kind (≤10 jaar), tiener (11-15), student (16-25), volwassene (26+)
- **Contentmoderatie**: `mistral-moderation-2603` (Mistral Moderation 2) met 11 beschikbare categorieën, waarvan er standaard 6 worden geblokkeerd voor nieuwe kinder- en tienerprofielen (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` toegevoegd na een meting op 50 lessen, inclusief geschiedenis, zonder één vals-positief resultaat). Categorieën kunnen per profiel in de instellingen worden aangepast; Moderation 2 heeft de oude categorie ‘gevaarlijke content’ opgesplitst in `dangerous` + `criminal` (bestaande profielen worden automatisch gemigreerd en de geblokkeerde categorieën gelden ook voor reeds geïmporteerde bronnen). Standaardveiligheid: als op basis van het antwoord van het model een geblokkeerde categorie niet kan worden gecontroleerd, wordt de content geweigerd (‘Moderatie niet beschikbaar’); als moderatie actief is, weren zowel de generatie als de chat gemarkeerde bronnen, bronnen waarvan de controle is mislukt en bronnen die nog worden gecontroleerd. Een bron die nooit is gecontroleerd (geïmporteerd toen moderatie was uitgeschakeld of een ouder project dat aan een profiel is gekoppeld) wordt vóór gebruik gecontroleerd. Moderatie die door een herstart is onderbroken, wordt bij het opstarten hervat als de serversleutel dit toestaat; anders wordt ze, net als moderatie waarbij een fout is opgetreden, hervat wanneer het project wordt geopend of bij de volgende generatie. Met de knop ‘Opnieuw controleren’ kan de controle op verzoek opnieuw worden gestart. Zolang een bron bij actieve moderatie niet als veilig is beoordeeld, wordt de content ervan voor het kind verborgen (voorbeeld, tekst, oorspronkelijk document); een ouder kan deze met de PIN voor één enkele raadpleging weergeven. Het mondelinge antwoord bij de spraakquiz wordt gemodereerd voordat het wordt gecontroleerd. Gedateerde ID vastgelegd in `helpers/moderation-model.ts`: de verouderde alias `-latest` wordt niet langer door de API vermeld.
- **Ouderlijke PIN**: SHA-256-hash, verplicht voor profielen jonger dan 15 jaar; maximaal 10 onjuiste codes per kwartier en per IP-adres (429 `rate_limited`). Gebruik voor een productie-implementatie een langzame hash met salt (Argon2id, bcrypt).
- **Servergegevens**: `/output` publiceert alleen de media van projecten (audio, afbeeldingen, geïmporteerde bestanden); `profiles.json`, `config.json`, `projects.json` en de `project.json` worden nooit aangeboden
- **Chatbeperkingen**: AI-chat is standaard uitgeschakeld voor gebruikers jonger dan 16 jaar en kan door de ouders worden ingeschakeld

### Multiprofielsysteem

- Meerdere profielen met naam, leeftijd, avatar en taalvoorkeuren
- **Stemmen per profiel** (`Profile.mistralVoices?: { host?, guest? }` — elke rol is optioneel) — ieder kind kan een eigen stemmenpaar hebben voor de podcast en spraakquiz
- **Thema per profiel** (`Profile.theme: 'dark' | 'light'`) — automatisch wisselen wanneer van profiel wordt veranderd, opgeslagen in de backend
- Projecten zijn via `profileId` aan profielen gekoppeld; een ouder project zonder profiel wordt gekoppeld aan het eerste profiel waarmee het wordt geopend en vervolgens volgens dat profiel gemodereerd
- Trapsgewijs verwijderen: als een profiel wordt verwijderd, worden al zijn projecten verwijderd
### API-kosten bijhouden

Elke factureerbare Mistral-aanroep (chat, OCR, STT, TTS, agents), inclusief instructiedetectie en mondelinge antwoorden bij de gesproken quiz, wordt geïnstrumenteerd om de gebruiker een **transparante** kostenraming in € te bieden. Moderatie is gratis en wordt niet meegerekend. De toolkosten van agents zijn inbegrepen: $ 0,03 per zoekopdracht op het web en $ 0,10 per gegenereerde afbeelding (Mistral-tarieven), plus de tokens die deze tools produceren en die in de raming worden berekend tegen het invoertarief van het agentmodel.

- **Bron van waarheid**: `helpers/pricing.ts` — `MODEL_PRICING` per modelprefix (bijv. `mistral-large` → input € 0,5/M tokens, output € 1,5/M tokens), `PRICING_SOURCES` met URL's naar Mistral-documentatie voor periodiek opnieuw scrapen
- **Ondersteunde eenheden**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie aangestuurd door `helpers/cost-calc.ts`
- **Instrumentatieketen**: `helpers/tracked-client.ts` (wikkelt de Mistral-client in) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectie in het HTTP-antwoord)
- **UI**: kostenbadge per generatie (`src/partials/cost-badge-gen.html`), per bron (`cost-badge-src.html`), cumulatief totaal in het dashboard (`Project.totalCost`)
- **Endpoints**: de antwoorden van `/generate/*` en `/sources/*` breiden het geretourneerde object (`Generation` / `Source`) uit met `estimatedCost`, `usage` en `costBreakdown`. `POST /generate/route` voegt een veld `costDelta: number` toe voor uitsluitend de routeringskosten; `POST /detect-consigne` (`{consigne, costDelta}`) en de verificatie van een mondeling antwoord retourneren ook hun `costDelta`. `GET /projects/:pid` retourneert het project, uitgebreid met `totalCost` (som berekend vanuit `costLog[]`) en de volledige geschiedenis

### TTS (Mistral Voxtral) en aangepaste stemmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral-spraaksynthese, geen extra sleutel nodig
- **Aangepaste stemmen**: ouders kunnen via de Mistral Voices API hun eigen stemmen maken (op basis van een audiofragment) en deze toewijzen aan de rollen presentator/gast — podcasts en gesproken quizzen worden dan voorgelezen met de stem van een ouder, wat de ervaring voor het kind nog meeslepender maakt
- Twee configureerbare stemrollen: **presentator** (hoofdverteller) en **gast** (tweede podcaststem)
- Volledige catalogus met Mistral-stemmen beschikbaar in de instellingen, filterbaar op taal

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
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactieve interface, TypeScript gecompileerd door Vite |
| **Templating** | vite-plugin-handlebars | HTML-compositie met partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderatie |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, geïntegreerde spraaksynthese |
| **Pictogrammen** | Lucide 1.x | Bibliotheek met SVG-pictogrammen |
| **Webscraping** | Readability + linkedom | Extractie van de hoofdinhoud van webpagina's (Firefox Reader View-technologie) |
| **Headless browser** | Lightpanda | Ultralichte headless browser (Zig + V8) voor JS-/SPA-pagina's — fallback voor scraping |
| **Markdown** | Marked | Markdown-rendering in de chat |
| **Bestandsuploads** | Multer 2.x | Beheer van multipart-formulieren |
| **Audio** | ffmpeg-static | Samenvoeging van audiosegmenten |
| **Tests** | Vitest | Unittests — dekking gemeten door SonarCloud |
| **Persistentie** | JSON-bestanden | Opslag zonder afhankelijkheden |

---

## Modelreferentie

| Model | Gebruik | Waarom |
|---|---|---|
| `mistral-large-latest` | Studiefiche, Flashcards, Podcast, Quiz, Invulteksten, Chat, Verificatie gesproken quiz, Afbeeldingsagent, Web Search-agent, Instructiedetectie | Beste meertaligheid + opvolging van instructies |
| `mistral-ocr-4-1` (OCR 4.1, standaard) | OCR van documenten | Gedrukte tekst, tabellen, handschrift ($ 4 / 1000 pagina's) |
| `mistral-ocr-2512` (OCR 3, optioneel) | OCR van documenten | Selecteerbaar in Instellingen, goedkoper ($ 2 / 1000 pagina's), leest handschrift beter |
| `voxtral-mini-latest` | Spraakherkenning (STT) | Meertalige STT, geoptimaliseerd met `language="fr"` |
| `voxtral-mini-tts-latest` | Spraaksynthese (TTS) | Podcasts, gesproken quiz, hardop voorlezen |
| `mistral-moderation-2603` | Inhoudsmoderatie | 6 geblokkeerde categorieën voor kinderen/tieners (waaronder `jailbreaking`) |
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

> **Opmerking**: Mistral Voxtral TTS is de enige TTS-provider — naast `MISTRAL_API_KEY` is geen extra sleutel nodig.

> **Door de gebruiker ingevoerde API-sleutel**: `MISTRAL_API_KEY` is voortaan **optioneel**. Als deze ontbreekt, start de app toch en wordt iedere gebruiker gevraagd **een eigen Mistral-sleutel** in de interface in te voeren. De sleutel wordt **in de browser opgeslagen** (versleuteld via Web Crypto + IndexedDB in een beveiligde context) en per verzoek verzonden — **nooit op de server opgeslagen**. Prioriteit: profielsleutel > globale browsersleutel > `MISTRAL_API_KEY` (env). Het instellen van `EUREKAI_REQUIRE_USER_KEY=true` verplicht iedere gebruiker een eigen sleutel op te geven (de env-sleutel wordt dan alleen nog voor vooraf laden gebruikt).

> **Lokale HTTPS (tablet/LAN)**: `localhost` is al een beveiligde context. Genereer voor LAN-toegang (tablet) een lokaal certificaat en activeer HTTPS: de browser kan de opgeslagen sleutel dan versleutelen en de sleutel wordt tijdens het transport versleuteld:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Omgevingsvariabelen

| Variabele | Vereist | Standaard | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | optioneel | — | Mistral API-sleutel (chat, OCR, STT, TTS Voxtral, agents, moderatie). Als deze ontbreekt, voert de gebruiker de sleutel in de app in (opgeslagen in de browser, nooit op de server) |
| `EUREKAI_REQUIRE_USER_KEY` | optioneel | `false` | `true` → schakelt de fallback naar `MISTRAL_API_KEY` uit voor AI-verzoeken (iedere gebruiker MOET een sleutel opgeven). Nuttig op een publiek toegankelijke instantie |
| `HTTPS_KEY` / `HTTPS_CERT` | optioneel | — | Paden naar TLS-sleutel/-certificaat (zie `scripts/gen-cert.sh`) → Express en Vite bieden HTTPS aan (beveiligde context voor LAN/tablet) |
| `PORT` | optioneel | `3000` | HTTP-poort van de Express-backend |
| `NODE_ENV` | optioneel | `development` | Als `production` → Express biedt de frontend aan vanuit `dist/` (anders `public/`) |
| `SONAR_TOKEN` | optioneel in CI | — | Uitsluitend gebruikt door de GitHub Actions-workflow voor SonarCloud |

### Tests, codekwaliteit en bijdragen

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)**: `pre-commit` voert achtereenvolgens `scripts/pre-commit-fast.sh` (conflicten, grote bestanden, shellcheck), `lint-staged` en vervolgens `npm test` uit; `pre-push` voert eerst een blokkerende controle met `npm audit` uit (blokkeert zodra een afhankelijkheid, ook een transitieve, een kwetsbaarheid van niveau `critical` heeft, zie `scripts/audit-verdict.mjs`) en daarna `npm run security`. Elke hook blokkeert de commit/push zodra een van de stappen mislukt.

**Externe tools (optioneel om de applicatie uit te voeren, vereist voor `pretest` en `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Zonder deze tools mislukt `npm test` bij `pretest` (lizard ontbreekt) en mislukt `npm run security` (opengrep ontbreekt). De Husky-hooks blokkeren dan de commit/push.

---

## Implementatie met een container

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

> **`:U`**: rootless Podman-flag die de volumerechten automatisch aanpast.

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

> **Voor AI-agents die aan de code bijdragen**: raadpleeg [`CLAUDE.md`](CLAUDE.md) voor de gedetailleerde architectuurcontext, de verplichte regels (foutcodes, cost tracking en prompts zonder meta-woorden, dat wil zeggen zonder kwalificaties van het document, zoals het type ervan, omdat het model deze woorden anders in zijn uitvoer zou overnemen) en bekende valkuilen (Lizard CCN, Opengrep, migratie van Codacy/Semgrep).

---

## API-referentie

### Configuratie
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
| `POST` | `/api/profiles` | Een profiel maken |
| `PUT` | `/api/profiles/:id` | Een profiel wijzigen (pincode vereist voor < 15 jaar; 10 onjuiste pincodes / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Een profiel verwijderen + cascade van projecten `{pin?}` → `{ok, deletedProjects}` |

### Projecten
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects` | Projecten weergeven (`?profileId=` optioneel) |
| `POST` | `/api/projects` | Een project maken `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projectdetails; `?profileId=` koppelt een project zonder profiel aan het profiel dat het opent |
| `PUT` | `/api/projects/:pid` | `{name}` hernoemen |
| `DELETE` | `/api/projects/:pid` | Het project verwijderen |
| `GET` | `/api/projects/:pid/events` | Realtime SSE-stream (`event: generation`) van generatieovergangen (`completed`/`failed`/`cancelled`) + keep-alive-heartbeat |

### Bronnen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-bestanden importeren (OCR voor JPG/PNG/PDF, rechtstreeks lezen voor TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Vrije tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-spraak (multipart-audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL scrapen of op het web zoeken `{query}` — retourneert een array met bronnen; 422 `url_blocked` als alle adressen worden geweigerd (intern netwerk), 502 `all_sources_failed` als geen enkele bron kon worden gemaakt |
| `POST` | `/api/projects/:pid/sources/moderate` | Moderaties hervatten die in behandeling zijn of een fout bevatten `{sourceIds?}` (maximaal 10 per aanroep, wachttijd ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Een bron, het geïmporteerde bestand en de daarvan afhankelijke instructie verwijderen → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | `{text}` modereren |
| `POST` | `/api/projects/:pid/detect-consigne` | Studie-instructies detecteren (alleen geverifieerde bronnen) → `{consigne, costDelta}` |

### Generatie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Studiefiche |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Meerkeuzequiz (4 keuzes, slechts één juist antwoord) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Invulteksten |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictee (woorden + voorbeeldzinnen + regels, 1 TTS-audiofragment per woord; ook voorgesteld door de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustratie |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Gesproken quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptieve herhaling `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Herhalingsfiche gericht op fout beantwoorde vragen uit een quiz `{generationId, weakQuestions}` — parallel met `quiz-review` aangeroepen door de remediëringsknop in de quizweergave |
| `POST` | `/api/projects/:pid/generate/route` | Routeringsanalyse (plan van de uit te voeren generatoren) — retourneert `{plan, costDelta}` (uitsluitend de routeringskosten) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische backendgeneratie (routering + 8 typen: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Parallelle uitvoering — veronderstelt een Mistral-tier met een rate-limit van ≥ 8 gelijktijdige verzoeken; anders kunnen meerdere 429-fouten in `failedSteps` verschijnen. |

Alle generatieroutes accepteren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; een onbekende `ageGroup` of een `lang` die geen geldige taalcode is (verwacht: `fr`, `pt-BR`…) → 400 `invalid_input`, vóór elke AI-aanroep. `quiz-review` en `remediation-summary` vereisen daarnaast `{generationId, weakQuestions}` en hebben betrekking op de bronnen van de oorspronkelijke quiz.

### CRUD voor generaties
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antwoorden op invulteksten indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Dicteeantwoorden indienen `{answers}` (strikte serverscore) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Een mondeling antwoord controleren (audio + questionIndex); het mondelinge antwoord wordt gemodereerd voordat het wordt gecontroleerd (weigering: 400 `quiz.answerBlocked`), kosten geretourneerd in `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Hardop voorlezen via TTS (studiefiches/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Een lopende generatie annuleren (enige annuleringsroute voor een pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` hernoemen |
| `DELETE` | `/api/projects/:pid/generations/:gid` | De generatie en bijbehorende media (audio, afbeelding) verwijderen |

### Chat
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatgeschiedenis ophalen |
| `POST` | `/api/projects/:pid/chat` | Een bericht verzenden `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatgeschiedenis wissen |

---

## Architectuurbeslissingen

| Beslissing | Motivering |
|---|---|
| **Alpine.js in plaats van React/Vue** | Minimale footprint, lichte reactiviteit met TypeScript gecompileerd door Vite. Perfect voor een hackathon waar snelheid telt. |
| **Persistentie in JSON-bestanden** | Geen afhankelijkheden, onmiddellijke start. Geen database om te configureren — starten en klaar. |
| **Vite + Handlebars** | Het beste van twee werelden: snelle HMR voor ontwikkeling, HTML-partials voor codeorganisatie, Tailwind JIT. |
| **Gecentraliseerde prompts** | Alle AI-prompts in `prompts.ts` — eenvoudig te itereren, testen en aanpassen per taal/leeftijdsgroep. |
| **Systeem met meerdere generaties** | Elke generatie is een onafhankelijk object met een eigen ID — maakt meerdere studiefiches, quizzen enz. per cursus mogelijk. |
| **Aan leeftijd aangepaste prompts** | 4 leeftijdsgroepen met verschillende woordenschat, complexiteit en toon — dezelfde inhoud wordt anders onderwezen afhankelijk van de leerling. |
| **Op Agents gebaseerde functies** | Afbeeldingsgeneratie en zoeken op het web gebruiken tijdelijke Mistral Agents — een nette levenscyclus met automatische opschoning. |
| **Intelligent scrapen van URL's** | Eén veld accepteert een combinatie van URL's en trefwoorden — URL's worden gescrapet via Readability (statische pagina's) met Lightpanda als fallback (JS-/SPA-pagina's), terwijl trefwoorden een Mistral-agent met web_search activeren. Elk resultaat maakt een onafhankelijke bron. |
| **100% Mistral TTS** | Mistral Voxtral TTS (geen extra sleutel naast `MISTRAL_API_KEY`) — spraaksynthese geïntegreerd in de kostenketen en in de stemselectie per taal. |

---
## Credits & dankbetuigingen

- **[Mistral AI](https://mistral.ai)** — AI-modellen (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lichtgewicht reactief framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend-buildtool
- **[Lucide](https://lucide.dev)** — Icoonbibliotheek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extractie van webcontent (technologie van Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralichte headless browser voor het scrapen van JS-/SPA-pagina's
- **[Luciole](https://luciole-vision.com)** — Lettertype ontworpen voor slechtziende lezers, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (optie ‘Leescomfort’ van de profielen)

Gestart tijdens de Mistral AI Worldwide Hackathon (maart 2026), volledig ontwikkeld door AI met [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licentie

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel vertaald van het Frans naar het Nederlands met gpt-5.6-sol.**
