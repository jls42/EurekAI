<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verander elke inhoud in een interactieve leerervaring — aangedreven door <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Beveiligingsbeoordeling"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Betrouwbaarheidsbeoordeling"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Onderhoudbaarheidsbeoordeling"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Testdekking"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Kwetsbaarheden"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Regels code"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy-badge"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Het verhaal — Waarom EurekAI?

**EurekAI** ontstond tijdens de [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiële website](https://worldwide-hackathon.mistral.ai/)) (maart 2026). Ik had een onderwerp nodig — en het idee kwam voort uit iets heel concreets: ik bereid regelmatig toetsen voor met mijn dochter, en ik dacht dat het mogelijk moest zijn om dat met AI speelser en interactiever te maken.

Het doel: **elke vorm van invoer** — een foto van de lesstof, gekopieerde en geplakte tekst, een spraakopname, een zoekopdracht op het web — omzetten in **samenvattingen, flashcards, quizzen, podcasts, invulteksten, illustraties en nog veel meer**. Alles wordt aangedreven door de modellen van het Franse bedrijf Mistral AI, waardoor EurekAI van nature geschikt is voor Franstalige leerlingen.

Het [eerste prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) werd tijdens de hackathon in 48h ontworpen als proof of concept op basis van de diensten van Mistral — al functioneel, maar beperkt. Sindsdien is EurekAI uitgegroeid tot een volwaardig project: invulteksten, navigatie door oefeningen, webscraping, instelbare ouderlijke moderatie, grondige codereview en nog veel meer. Alle code is door AI gegenereerd — voornamelijk [Claude Code](https://code.claude.com/), met enkele bijdragen via [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Overzicht

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Rondleiding door EurekAI: bronnen, samenvatting, quiz, flashcards, illustraties" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — recente generaties, geschatte kosten per kaart en projecttotaal, knop ‘Auto — Magie!’ | ![Bronnen](docs/screenshots/sources.webp)<br>**Bronnen** — import van foto/PDF/tekst/spraak/web, genereren met één klik, detectie van leerinstructies |

Elke geïmporteerde bron toont de bijbehorende [OCR-betrouwbaarheidsscore, moderatie en geschatte kosten](docs/screenshots/sources-list.webp).

### De onderdelen in actie

| | |
|---|---|
| ![Samenvatting](docs/screenshots/notes.gif)<br>**Samenvatting** — kernpunten, woordenschat, citaten met bronvermelding, audio per onderdeel | ![Quiz](docs/screenshots/quiz.gif)<br>**Meerkeuzequiz** — één juist antwoord per vraag, directe feedback met uitleg, stapsgewijze navigatie |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — kaart omdraaien en jezelf beoordelen met ‘ik wist het / ik wist het niet’ | ![Invulteksten](docs/screenshots/fillblank.gif)<br>**Invulteksten** — hint op verzoek, soepele antwoordcontrole |
| ![Dictee](docs/screenshots/dictation.gif)<br>**Dictee** — woord wordt uitgesproken, strikte correctie letter voor letter | ![Mondelinge quiz](docs/screenshots/vocal-quiz.gif)<br>**Mondelinge quiz** — vraag wordt voorgelezen, antwoorden via de microfoon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — minipodcast met 2 stemmen, dialoogscript beschikbaar om te lezen | ![Illustraties](docs/screenshots/illustrations.gif)<br>**Illustraties** — educatieve afbeeldingen gegenereerd door een Agent |
| ![AI-tutor](docs/screenshots/chat.gif)<br>**AI-tutor** — chat op basis van de lesdocumenten, antwoorden met uitleg, kan quizzen en flashcards genereren | |

### Aan de slag

| | |
|---|---|
| ![Profiel kiezen](docs/screenshots/login.gif)<br>**Profiel kiezen** — elk kind heeft een eigen omgeving, avatar en taal | ![Profiel aanmaken](docs/screenshots/profile-create.gif)<br>**Profiel aanmaken** — leeftijd, avatar, ouderlijke pincode voor kinderen jonger dan 15 jaar |
| ![Cursus aanmaken](docs/screenshots/course.gif)<br>**Cursus aanmaken** — één project per les, klaar om bronnen toe te voegen | ![Instellingen](docs/screenshots/settings.gif)<br>**Instellingen** — API-status, keuze uit AI-modellen met vermelde tarieven |

---

## Functies

| | Functie | Beschrijving |
|---|---|---|
| 📷 | **Bestanden importeren** | Importeer je lesstof — foto, PDF (via Mistral OCR met een gemiddelde betrouwbaarheidsscore, niveaus `high`/`medium`/`low`) of tekstbestand (TXT, MD). Uploadsessies met opnieuw proberen per bestand en individuele voortgang |
| 📝 | **Tekstinvoer** | Typ of plak rechtstreeks elke gewenste tekst |
| 🎤 | **Spraakinvoer** | Neem jezelf op — Voxtral STT zet je spraak om in tekst |
| 🌐 | **Web / URL** | Plak een URL (directe scraping via Readability + Lightpanda) of typ een zoekopdracht (Mistral Agent web_search) |
| 📄 | **Samenvattingen** | Gestructureerde notities met kernpunten, woordenschat, citaten en anekdotes |
| 🃏 | **Flashcards** | Interactieve vraag-antwoordkaarten, voorgelezen als dialoog |
| ❓ | **Meerkeuzequiz** | Vragen met 4 opties en één juist antwoord, met adaptieve herhaling van fouten (aantal instelbaar) |
| ✏️ | **Invulteksten** | Invuloefeningen met hints en soepele antwoordcontrole |
| 🔤 | **Dictee** | Woorden uit een geïmporteerde lijst worden uitgesproken (Voxtral TTS), invoer via het toetsenbord, strikte correctie letter voor letter met uitleg van de spellingregel |
| 🎙️ | **Podcast** | Minipodcast met 2 stemmen — standaard Mistral-stemmen of eigen stemmen (van de ouders!) |
| 🖼️ | **Illustraties** | Educatieve afbeeldingen gegenereerd door een Mistral Agent |
| 🗣️ | **Mondelinge quiz** | Vragen worden voorgelezen (eigen stem mogelijk), mondeling antwoord, controle door AI |
| 💬 | **AI-tutor** | Contextuele chat met je lesdocumenten, met toolaanroepen |
| 🧠 | **Automatische router** | Een router op basis van `mistral-small-latest` analyseert de inhoud en stelt een combinatie van generators voor uit de 8 beschikbare typen |
| 🔁 | **Continuïteit tussen cursussen** | Imports, automatische generaties, microfoonopnames, chat, zoekopdrachten op het web en voorlezen blijven voor hun eigen cursus doorgaan wanneer je een andere opent; een melding vermeldt de cursus wanneer iets elders is voltooid |
| 🔒 | **Ouderlijk toezicht** | Instelbare moderatie per profiel (aanpasbare categorieën), ouderlijke pincode, chatbeperkingen |
| 🌍 | **Meertalig** | Interface beschikbaar in 9 talen; AI-generatie via prompts aan te sturen in 15 talen |
| 🔊 | **Voorlezen** | Beluister samenvattingen en flashcards (vraag-antwoorddialoog) via Mistral Voxtral TTS |
| 💶 | **API-kosten bijhouden** | Transparante schatting van de kosten in € van elke generatie en bron (tokens / tekens / pagina's / seconden audio). Badge per kaart + totaal per project, zichtbaar in het dashboard |
| 🎨 | **Thema per profiel** | Elk profiel kiest het thema `dark` of `light` — opgeslagen bij het profiel en opnieuw toegepast bij elke profielwissel |

---

## Architectuuroverzicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architectuuroverzicht" width="800" />
</p>

---

## Overzicht van het modelgebruik

<p align="center">
  <img src="public/assets/model-map.webp" alt="Koppeling van AI-modellen aan taken" width="800" />
</p>

---

## Gebruikersroute

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Leertraject van de leerling" width="800" />
</p>

---

## Uitgelicht — Functies

### Multimodale invoer

EurekAI accepteert 4 soorten bronnen, gemodereerd volgens het profiel (moderatie is standaard ingeschakeld voor kinder- en tienerprofielen):

- **Bestanden importeren** — JPG-, PNG- of PDF-bestanden verwerkt door Mistral OCR — standaard **OCR 4.1** (`mistral-ocr-4-1`), met **OCR 3** (`mistral-ocr-2512`) als optie in de Instellingen (goedkoper, ~½ van de kosten; leest handschrift beter) — voor gedrukte tekst, tabellen en handschrift; of tekstbestanden (TXT, MD) die rechtstreeks worden geïmporteerd. Uploads van meerdere bestanden gebruiken een systeem van **uploadsessies**: individuele voortgang per bestand, een mislukt bestand opnieuw proberen zonder de andere opnieuw in te dienen, en de sessie sluiten zodra deze voltooid is. OCR levert een gemiddelde **betrouwbaarheidsscore** (`average`, begrensd tot `[0,1]`, berekend op basis van de door Mistral geretourneerde `averagePageConfidenceScore`), weergegeven in de UI als een badge met niveau `high` / `medium` / `low` (drempels ~0.9 / ~0.7) — waarschuwt zonder te blokkeren als de scan van slechte kwaliteit is. De kopie van het document die voor OCR naar Mistral wordt gestuurd, wordt direct na de verwerking verwijderd, ook bij een fout.
- **Vrije tekst** — Typ of plak elke gewenste inhoud. Wordt vóór opslag gemodereerd als moderatie actief is.
- **Spraakinvoer** — Neem audio op in de browser. Standaard getranscribeerd door **Voxtral Mini Transcribe 2** (`voxtral-mini-2602`); **Voxtral Mini Transcribe 3** en **Voxtral Small Transcribe 3** (Mistral-preview) zijn als optie beschikbaar in de Instellingen. De interfacetaal wordt aan het model doorgegeven (`language`) om de herkenning te optimaliseren.
- **Web / URL** — Plak een of meer URL's om de inhoud rechtstreeks te scrapen (Readability + Lightpanda voor JS-pagina's), of typ trefwoorden voor een zoekopdracht op het web via een Mistral Agent. Hetzelfde veld accepteert beide — URL's en trefwoorden worden automatisch gescheiden, elk resultaat wordt een afzonderlijke bron.

### Inhoud genereren met AI

Acht soorten gegenereerd leermateriaal:

| Generator | Model | Uitvoer |
|---|---|---|
| **Samenvatting** | `mistral-large-latest` | Titel, samenvatting, kernpunten, woordenschat, citaten, anekdote |
| **Flashcards** | `mistral-large-latest` | Vraag-antwoordkaarten met bronverwijzingen (aantal instelbaar) |
| **Meerkeuzequiz** | `mistral-large-latest` | Vragen met 4 opties en één juist antwoord, uitleg, adaptieve herhaling (aantal instelbaar) |
| **Invulteksten** | `mistral-large-latest` | Invulzinnen met hints, soepele antwoordcontrole (Levenshtein) |
| **Dictee** | `mistral-large-latest` + Voxtral TTS | Kernwoorden worden uitgesproken (1 MP3/woord) → invoer via het toetsenbord → strikte correctie (een vergeten accent telt als fout) met uitleg van de regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script met 2 stemmen → MP3-audio |
| **Illustratie** | Agent `mistral-large-latest` | Educatieve afbeelding via de tool `image_generation` |
| **Mondelinge quiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-vragen → STT-antwoord → controle door AI |

### AI-tutor via chat

Een gesprekstutor met volledige toegang tot de lesdocumenten:

- Gebruikt `mistral-large-latest`
- **Toolaanroepen**: kan tijdens het gesprek samenvattingen, flashcards, quizzen of invulteksten genereren
- Geschiedenis van 50 berichten per cursus
- Moderatie indien ingeschakeld voor het profiel: het bericht wordt gecontroleerd, en gemarkeerde bronnen, bronnen waarvan de controle is mislukt en nog niet gecontroleerde bronnen worden uitgesloten van de context en de tools (de controle van bronnen waarvoor deze is mislukt of die nog niet zijn gecontroleerd, wordt eerst opnieuw gestart, maximaal 5 s)

### Automatische router

De router gebruikt `mistral-small-latest` om de inhoud van de bronnen te analyseren en de meest relevante generators uit de 8 beschikbare voor te stellen. De interface toont de voortgang in realtime: eerst een analysefase, daarna de afzonderlijke generaties, die kunnen worden geannuleerd.

Er draaien maximaal 3 langdurige generaties tegelijk in één tabblad (stappen van alle Auto-processen, afzonderlijk gestarte generaties, herhalingskaarten): de volgende wachten op hun beurt, en een cursus opent zonder te wachten tot de lopende generaties klaar zijn. ‘Alles annuleren’ stopt met één melding ook de nog wachtende Auto-stappen van de cursus, zelfs nadat je een andere cursus hebt geopend.

### Adaptief leren

- **Quizstatistieken**: bijhouden van pogingen en nauwkeurigheid per vraag
- **Quizherhaling**: genereert 5-10 nieuwe vragen gericht op minder goed beheerste concepten, op basis van de bronnen van de oorspronkelijke quiz (de moderatiecontrole geldt voor diezelfde bronnen)
- **Detectie van leerinstructies**: detecteert herhalingsinstructies ("Ik ken mijn lesstof als ik... kan") en geeft deze voorrang in de compatibele tekstgenerators (samenvatting, flashcards, quiz, invulteksten). Als moderatie actief is, wacht de detectie op de broncontrole en leest deze alleen bronnen die als veilig zijn beoordeeld; de instructie bewaart de lijst van oorspronkelijke bronnen: als een daarvan wordt gemarkeerd, wordt de instructie niet weergegeven of toegepast, en als een daarvan wordt verwijderd, wordt de instructie gewist. De kosten worden meegerekend
### Veiligheid & ouderlijk toezicht

- **4 leeftijdsgroepen** : kind (≤10 jaar), tiener (11-15), student (16-25), volwassene (26+)
- **Contentmoderatie** : `mistral-moderation-2603` (Mistral Moderation 2) met 11 beschikbare categorieën, waarvan er standaard 6 worden geblokkeerd voor nieuwe kinder-/tienerprofielen (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking` ; `criminal` toegevoegd na een meting op 50 lessen, inclusief geschiedenis, zonder foutpositieven). Categorieën zijn per profiel aanpasbaar in de instellingen ; Moderation 2 heeft de oude categorie ‘gevaarlijke content’ opgesplitst in `dangerous` + `criminal` (bestaande profielen worden automatisch gemigreerd en de geblokkeerde categorieën gelden ook voor eerder geïmporteerde bronnen). Standaard veilig: als het modelantwoord geen controle van een geblokkeerde categorie mogelijk maakt, wordt de content geweigerd (‘Moderatie niet beschikbaar’) ; bij actieve moderatie sluiten zowel generatie als chat gemarkeerde bronnen, bronnen waarvan de controle is mislukt en bronnen die nog worden gecontroleerd uit. Een bron die nooit is gecontroleerd (geïmporteerd toen moderatie uitgeschakeld was, of een oud project dat aan een profiel is gekoppeld) wordt vóór gebruik gecontroleerd. Moderatie die door een herstart is onderbroken, wordt bij het opstarten hervat als de serversleutel dat toestaat ; anders wordt ze, net als moderatie met een fout, hervat bij het openen van het project of bij de volgende generatie. Met de knop ‘Opnieuw controleren’ kan de controle op verzoek opnieuw worden gestart. Bij actieve moderatie blijft de inhoud van een bron verborgen voor het kind zolang de bron niet veilig is bevonden (voorbeeld, tekst, oorspronkelijk document) ; een ouder kan deze met zijn PIN voor één inzage weergeven. Het mondelinge antwoord in de gesproken quiz wordt gemodereerd voordat het wordt nagekeken. Gedateerde ID vastgezet in `helpers/moderation-model.ts` : de verouderde alias `-latest` wordt niet meer door de API vermeld.
- **Ouderlijke PIN** : SHA-256-hash, vereist voor profielen jonger dan 15 jaar ; maximaal 10 onjuiste codes per kwartier en per IP-adres (429 `rate_limited`). Gebruik voor een productiedeployment een trage hash met salt (Argon2id, bcrypt).
- **Servergegevens** : `/output` publiceert alleen projectmedia (audio, afbeeldingen, geïmporteerde bestanden) ; `profiles.json`, `config.json`, `projects.json` en de `project.json` worden nooit aangeboden
- **Chatbeperkingen** : AI-chat is standaard uitgeschakeld voor gebruikers jonger dan 16 jaar en kan door ouders worden ingeschakeld

### Systeem met meerdere profielen

- Meerdere profielen met naam, leeftijd, avatar en taalvoorkeuren
- **Stemmen per profiel** (`Profile.mistralVoices?: { host?, guest? }` — elke rol is optioneel) — elk kind kan een eigen stemmenpaar voor podcasts/gesproken quizzen hebben
- **Thema per profiel** (`Profile.theme: 'dark' | 'light'`) — schakelt automatisch bij een profielwissel en wordt in de backend opgeslagen
- Projecten zijn via `profileId` aan profielen gekoppeld ; een oud project zonder profiel wordt gekoppeld aan het eerste profiel dat het opent en vervolgens volgens dat profiel gemodereerd
- Verwijderen met cascade: bij het verwijderen van een profiel worden alle bijbehorende projecten verwijderd

### API-kosten bijhouden

Elke factureerbare Mistral-aanroep (chat, OCR, STT, TTS, agents), inclusief detectie van instructies en mondelinge antwoorden in de gesproken quiz, wordt geïnstrumenteerd om de gebruiker een **transparante** schatting in € te bieden. De gratis moderatie wordt niet meegerekend. De toolkosten van agents zijn inbegrepen: 0,03 $ per webzoekopdracht en 0,10 $ per gegenereerde afbeelding (Mistral-tarieven), plus de tokens die deze tools produceren, die de schatting tegen het inputtarief van het agentmodel berekent.

- **Gezaghebbende bron** : `helpers/pricing.ts` — `MODEL_PRICING` per modelprefix (bijv.: `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` met URL's van Mistral-documentatie voor periodiek opnieuw scrapen
- **Ondersteunde eenheden** : `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversie aangestuurd door `helpers/cost-calc.ts`
- **Instrumentatieketen** : `helpers/tracked-client.ts` (wikkelt de Mistral-client in) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injectie in het HTTP-antwoord)
- **UI** : kostenbadge per generatie (`src/partials/cost-badge-gen.html`), per bron (`cost-badge-src.html`), cumulatief totaal in het dashboard (`Project.totalCost`)
- **Endpoints** : de antwoorden `/generate/*` en `/sources/*` verrijken het geretourneerde object (`Generation` / `Source`) met `estimatedCost`, `usage` en `costBreakdown`. `POST /generate/route` voegt een veld `costDelta: number` toe voor uitsluitend de routingkosten ; `POST /detect-consigne` (`{consigne, costDelta}`) en de controle van een mondeling antwoord retourneren ook hun `costDelta`. `GET /projects/:pid` retourneert het project verrijkt met `totalCost` (som berekend op basis van `costLog[]`) + de volledige geschiedenis

### TTS (Mistral Voxtral) & aangepaste stemmen

- **Mistral Voxtral TTS** : standaard **Voxtral TTS** (`voxtral-mini-tts-2603`), optioneel **Voxtral TTS 3** (`voxtral-mini-tts-3-0`, Mistral-preview, native stemmen in meer talen) in de Instellingen ; spraaksynthese volledig via Mistral, geen extra sleutel nodig. Alleen stemmen die het gekozen model ondersteunt worden aangeboden: Voxtral TTS weigert stemmen die met Voxtral 3 zijn toegevoegd
- **Aangepaste stemmen** : ouders kunnen hun eigen stemmen maken via de Mistral Voices API (op basis van een audiofragment) en deze toewijzen aan de rollen presentator/gast — podcasts en gesproken quizzen worden dan voorgelezen met de stem van een ouder, waardoor de ervaring voor het kind nog meeslepender wordt
- Twee configureerbare stemrollen: **presentator** (hoofdverteller) en **gast** (tweede podcaststem)
- Volledige catalogus met Mistral-stemmen beschikbaar in de instellingen, filterbaar op taal
- Het afspelen (leerblad, podcast, dicteewoord) pauzeert wanneer je de weergave verlaat en wordt hervat waar het was gestopt
- De audio voor het voorlezen van flashcards wordt bij de eerste keer luisteren aangemaakt en vervolgens bij de generatie opgeslagen: deze wordt bij terugkeer niet opnieuw aangemaakt of in rekening gebracht
- Bronmarkeringen (`[Source N]`) worden niet voorgelezen

### Internationalisering

- Interface beschikbaar in 9 talen: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompts ondersteunen 15 talen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Taal instelbaar per profiel

---

## Technische stack

| Laag | Technologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server en typeveiligheid |
| **Backend** | Express 5.x | REST API |
| **Ontwikkelserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactieve interface, TypeScript gecompileerd door Vite |
| **Templating** | vite-plugin-handlebars | HTML-compositie met partials |
| **AI** | Mistral AI SDK | Chat, OCR, STT, TTS, Agents, Moderatie |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-2603` (Voxtral TTS 3 optioneel), geïntegreerde spraaksynthese |
| **Pictogrammen** | Lucide 1.x | Bibliotheek met SVG-pictogrammen |
| **Webscraping** | Readability + linkedom | Extractie van de hoofdinhoud van webpagina's (Firefox Reader View-technologie) |
| **Headless browser** | Lightpanda | Ultralichte headless browser (Zig + V8) voor JS/SPA-pagina's — fallback voor scraping |
| **Markdown** | Marked | Markdown-weergave in de chat |
| **Bestandsupload** | Multer 2.x | Verwerking van multipart-formulieren |
| **Audio** | ffmpeg-static | Samenvoegen van audiosegmenten |
| **Tests** | Vitest | Unittests — dekking gemeten door SonarCloud |
| **Persistentie** | JSON-bestanden | Opslag zonder afhankelijkheden |

---

## Modelreferentie

| Model | Gebruik | Waarom |
|---|---|---|
| `mistral-large-latest` | Leerblad, Flashcards, Podcast, Quiz, Invulteksten, Chat, Controle gesproken quiz, Image Agent, Web Search Agent, Instructiedetectie | Beste meertaligheid + opvolging van instructies |
| `mistral-ocr-4-1` (OCR 4.1, standaard) | OCR van documenten | Gedrukte tekst, tabellen, handschrift ($4 / 1000 pagina's) |
| `mistral-ocr-2512` (OCR 3, optioneel) | OCR van documenten | Selecteerbaar in Instellingen, goedkoper ($2 / 1000 pagina's), leest handschrift beter |
| `voxtral-mini-2602` (Voxtral Mini Transcribe 2, standaard) | Spraakherkenning (STT) | Spraakinvoer en mondelinge antwoorden in de gesproken quiz ($0.003 / min) |
| `voxtral-mini-transcribe-3-0` / `voxtral-small-transcribe-3-0` (Transcribe 3, optioneel, preview) | Spraakherkenning (STT) | Selecteerbaar in Instellingen ($0.0035 / min en $0.004 / min) |
| `voxtral-mini-tts-2603` (Voxtral TTS, standaard) | Spraaksynthese (TTS) | Podcasts, gesproken quiz, dictee, voorlezen ($16 / M tekens) |
| `voxtral-mini-tts-3-0` (Voxtral TTS 3, optioneel, preview) | Spraaksynthese (TTS) | Selecteerbaar in Instellingen, native stemmen in meer talen ($13 / M tekens) |
| `mistral-moderation-2603` | Contentmoderatie | 6 geblokkeerde categorieën voor kinderen/tieners (waaronder `jailbreaking`) |
| `mistral-small-latest` | Automatische router | Snelle inhoudsanalyse voor routingbeslissingen |

Op telefoons tonen de Instellingen onder elke keuzelijst het volledige label van het gekozen model (prijs, ‘Aanbevolen’ of ‘Preview’), dat in het gesloten menu werd afgekapt.

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

> **Opmerking** : Mistral Voxtral TTS is de enige TTS-provider — naast `MISTRAL_API_KEY` is geen extra sleutel nodig.

> **Door de gebruiker ingevoerde API-sleutel** : `MISTRAL_API_KEY` is voortaan **optioneel**. Als deze ontbreekt, start de app toch en wordt elke gebruiker gevraagd **zijn eigen Mistral-sleutel** in de interface in te voeren. De sleutel wordt **in de browser opgeslagen** (versleuteld via Web Crypto + IndexedDB in een beveiligde context) en per verzoek verzonden — **nooit permanent op de server opgeslagen**. Prioriteit: profielsleutel > algemene browsersleutel > `MISTRAL_API_KEY` (env). Het instellen van `EUREKAI_REQUIRE_USER_KEY=true` verplicht elke gebruiker een eigen sleutel op te geven (de omgevingssleutel wordt dan alleen nog voor vooraf laden gebruikt).

> **Lokale HTTPS (tablet/LAN)** : `localhost` is al een beveiligde context. Genereer voor LAN-toegang (tablet) een lokaal certificaat en schakel HTTPS in: de browser kan dan de opgeslagen sleutel versleutelen en de sleutel wordt tijdens de overdracht versleuteld:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Omgevingsvariabelen

| Variabele | Vereist | Standaard | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | optioneel | — | Mistral API-sleutel (chat, OCR, STT, TTS Voxtral, agents, moderatie). Als deze ontbreekt, voert de gebruiker zijn sleutel in de app in (opgeslagen in de browser, nooit op de server) |
| `EUREKAI_REQUIRE_USER_KEY` | optioneel | `false` | `true` → schakelt de fallback naar `MISTRAL_API_KEY` uit voor AI-verzoeken (elke gebruiker MOET een eigen sleutel opgeven). Handig voor een publiek toegankelijke instantie |
| `HTTPS_KEY` / `HTTPS_CERT` | optioneel | — | Paden naar TLS-sleutel/-certificaat (zie `scripts/gen-cert.sh`) → Express en Vite bieden HTTPS aan (beveiligde context voor LAN/tablet) |
| `PORT` | optioneel | `3000` | HTTP-poort van de Express-backend |
| `NODE_ENV` | optioneel | `development` | Als `production` → Express biedt de frontend aan vanuit `dist/` (anders `public/`) |
| `SONAR_TOKEN` | optioneel voor CI | — | Alleen gebruikt door de GitHub Actions-workflow voor SonarCloud |

### Tests, codekwaliteit en bijdragen

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-hooks (Husky)** : `pre-commit` voert achtereenvolgens `scripts/pre-commit-fast.sh` (conflicten, grote bestanden, shellcheck), `lint-staged` en `npm test` uit ; `pre-push` voert eerst een blokkerende controle `npm audit` uit (blokkeert zodra een afhankelijkheid, ook een transitieve, een kwetsbaarheid van niveau `critical` heeft, zie `scripts/audit-verdict.mjs`) en daarna `npm run security`. Elke hook blokkeert de commit/push zodra een van zijn stappen mislukt.

**Externe tools (optioneel om de applicatie te starten, noodzakelijk voor `pretest` en `npm run security`)** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Zonder deze tools mislukt `npm test` bij `pretest` (lizard ontbreekt) en mislukt `npm run security` (opengrep ontbreekt). De husky-hooks blokkeren dan de commit/push.

---

## Deployment met een container

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

> **`:U`** : rootless Podman-flag die automatisch de volumerechten aanpast.

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
  stt-models.ts           — Source de vérité sélection transcription (Mini Transcribe 2 défaut / Transcribe 3 option) + normalizeSttModel
  tts-models.ts           — Source de vérité sélection synthèse vocale (Voxtral TTS défaut / TTS 3 option) + compatibilité des voix
  tts-text.ts             — Texte envoyé au TTS : marqueurs de sources et crochets retirés (Voxtral les lit ou avale le mot)
  source-markers.ts       — Regex des marqueurs `[Source N]` des fiches (pastilles côté navigateur, texte lu côté serveur)
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
    view-media.ts         — Pause du son au changement de vue (position gardée)
    profiles.ts           — Logique du sélecteur de profils
    projects.ts           — CRUD des cours
    sources.ts            — Gestionnaires d'upload de sources
    generate.ts           — Déclencheurs de génération (individuel, tout, auto 2 phases)
    auto-runs.ts          — Générations automatiques en cours, par cours (elles continuent quand on change de cours)
    request-slots.ts      — Au plus 3 générations longues en même temps pour l'onglet, file d'attente FIFO
    moderation-gate.ts    — Pré-contrôle de modération des générations (vérifie d'abord les sources en attente)
    effective-moderation.ts — Statut de modération affiché et masquage du contenu des sources
    generations.ts        — Affichage + actions sur les générations
    chat.ts               — Interface de chat
    chat-in-flight.ts     — Messages du chat en attente de réponse, par cours
    config.ts             — Interface de configuration (modèles de chat, d'OCR, de transcription et de TTS, voix)
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

> **Voor AI-agents die aan de code bijdragen** : raadpleeg [`CLAUDE.md`](CLAUDE.md) (algemene regels, index) en de gedetailleerde regels in [`.claude/rules/`](.claude/rules/), die op verzoek worden geladen afhankelijk van de gelezen of gewijzigde bestanden, voor gedetailleerde architectuurcontext, verplichte regels (foutcodes, cost tracking en prompts zonder metawoorden, dus zonder omschrijvingen van het document zoals het type, omdat het model deze woorden anders in zijn uitvoer zou overnemen) en bekende valkuilen (Lizard CCN, Opengrep, Codacy/Semgrep-migratie).

---

## API-referentie

### Configuratie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/config` | Huidige configuratie |
| `PUT` | `/api/config` | Configuratie wijzigen (modellen, stemmen, TTS-model) |
| `GET` | `/api/config/status` | API-status: `mistral` (Mistral-sleutel ingesteld), `ttsAvailable` (alias van `mistral`, Mistral Voxtral is de enige TTS-provider) |
| `POST` | `/api/config/reset` | Standaardconfiguratie herstellen |
| `GET` | `/api/config/voices` | Mistral TTS-stemmen weergeven (optioneel `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Beschikbare moderatiecategorieën + standaardinstellingen per leeftijd |
| `POST` | `/api/providers/mistral/validate` | Een door de gebruiker ingevoerde Mistral-sleutel valideren — altijd 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), geen fallback naar env |

### Profielen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/profiles` | Alle profielen weergeven |
| `POST` | `/api/profiles` | Een profiel aanmaken |
| `PUT` | `/api/profiles/:id` | Een profiel wijzigen (PIN vereist voor < 15 jaar ; 10 onjuiste PIN-codes / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Een profiel verwijderen + bijbehorende projecten in cascade verwijderen `{pin?}` → `{ok, deletedProjects}` |

### Projecten
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects` | Projecten weergeven (`?profileId=` optioneel) |
| `POST` | `/api/projects` | Een project aanmaken `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projectdetails ; `?profileId=` koppelt een project zonder profiel aan het profiel dat het opent |
| `PUT` | `/api/projects/:pid` | Hernoemen `{name}` |
| `DELETE` | `/api/projects/:pid` | Het project verwijderen |
| `GET` | `/api/projects/:pid/events` | Realtime SSE-stream (`event: generation`) van generatieovergangen (`completed`/`failed`/`cancelled`) + keep-alive-heartbeat |

### Bronnen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-bestandsimport (OCR voor JPG/PNG/PDF, rechtstreeks lezen voor TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Vrije tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Spraak STT (multipart-audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping of webzoekopdracht `{query}` — retourneert een array met bronnen ; 422 `url_blocked` als alle adressen worden geweigerd (intern netwerk), 502 `all_sources_failed` als er geen bron kon worden aangemaakt |
| `POST` | `/api/projects/:pid/sources/moderate` | Wachtende of mislukte moderaties hervatten `{sourceIds?}` (maximaal 10 per aanroep, wachttijd ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Een bron, het geïmporteerde bestand en de bijbehorende instructie verwijderen → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Modereren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Leerinstructies detecteren (alleen gecontroleerde bronnen) → `{consigne, costDelta}` |
### Generatie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Leeroverzicht |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Meerkeuzequiz (4 opties, slechts één juist antwoord) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Invulteksten |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictee (woorden + voorbeeldzinnen + regels, 1 TTS-audio per woord; ook aangeboden door de auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustratie |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Mondelinge quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptief herhalen `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Herhalingsblad gericht op de fout beantwoorde vragen van een quiz `{generationId, weakQuestions}` — parallel aan `quiz-review` aangeroepen via de remediëringsknop in de quizweergave |
| `POST` | `/api/projects/:pid/generate/route` | Routinganalyse (plan van de te starten generators) — retourneert `{plan, costDelta}` (kosten van alleen de routing) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische backendgeneratie (routing + 8 typen: `summary`, `flashcards`, `quiz`, `fill-blank`, `podcast`, `quiz-vocal`, `image`, `dictation`). Parallelle uitvoering — vereist een Mistral-tier met een rate-limit ≥ 8 gelijktijdige requests; anders kunnen meerdere 429-fouten in `failedSteps` terechtkomen. |

Alle generatieroutes accepteren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; een onbekende `ageGroup` of een `lang` die geen geldige taalcode is (verwacht: `fr`, `pt-BR`…) → 400 `invalid_input`, vóór elke AI-aanroep. `quiz-review` en `remediation-summary` vereisen daarnaast `{generationId, weakQuestions}` en hebben betrekking op de bronnen van de oorspronkelijke quiz.

### CRUD Generaties
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antwoorden op invulteksten indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Dicteeantwoorden indienen `{answers}` (strikte scoreberekening op de server) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Een mondeling antwoord controleren (audio + questionIndex); het mondelinge antwoord wordt vóór de controle gemodereerd (afwijzing: 400 `quiz.answerBlocked`), kosten geretourneerd in `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Hardop voorlezen met TTS (leeroverzichten/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Een lopende generatie annuleren (enige manier om een pending te annuleren) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Hernoemen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | De generatie en bijbehorende media (audio, afbeelding) verwijderen |

### Chat
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | De chatgeschiedenis ophalen |
| `POST` | `/api/projects/:pid/chat` | Een bericht versturen `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | De chatgeschiedenis wissen |

---

## Architectuurbeslissingen

| Beslissing | Onderbouwing |
|---|---|
| **Alpine.js in plaats van React/Vue** | Minimale footprint, lichte reactiviteit met TypeScript gecompileerd door Vite. Perfect voor een hackathon waar snelheid telt. |
| **Opslag in JSON-bestanden** | Geen dependencies, direct opstarten. Geen database om te configureren — opstarten en aan de slag. |
| **Vite + Handlebars** | Het beste van twee werelden: snelle HMR voor ontwikkeling, HTML-partials voor de codeorganisatie, Tailwind JIT. |
| **Gecentraliseerde prompts** | Alle AI-prompts in `prompts.ts` — eenvoudig te verfijnen, testen en aanpassen per taal/leeftijdsgroep. |
| **Systeem met meerdere generaties** | Elke generatie is een onafhankelijk object met een eigen ID — maakt meerdere leeroverzichten, quizzen, enz. per cursus mogelijk. |
| **Prompts aangepast aan de leeftijd** | 4 leeftijdsgroepen met verschillende woordenschat, complexiteit en toon — dezelfde inhoud wordt anders onderwezen afhankelijk van de leerling. |
| **Functionaliteit op basis van Agents** | Afbeeldingsgeneratie en zoeken op het web gebruiken tijdelijke Mistral Agents — een beheerde levenscyclus met automatische opruiming. |
| **Intelligente URL-scraping** | Eén veld accepteert een combinatie van URL's en trefwoorden — de URL's worden gescrapet via Readability (statische pagina's) met Lightpanda als fallback (JS/SPA-pagina's), de trefwoorden activeren een Mistral Agent met web_search. Elk resultaat maakt een onafhankelijke bron aan. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (geen extra sleutel nodig naast `MISTRAL_API_KEY`) — spraaksynthese geïntegreerd in de kostenberekening en de stemselectie per taal. |

---

## Credits & dankwoord

- **[Mistral AI](https://mistral.ai)** — AI-modellen (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Licht reactief framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend-buildtool
- **[Lucide](https://lucide.dev)** — Iconenbibliotheek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extractie van webinhoud (technologie van Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralichte headless browser voor het scrapen van JS/SPA-pagina's
- **[Luciole](https://luciole-vision.com)** — Lettertype ontworpen voor slechtziende lezers, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (optie ‘Leescomfort’ in de profielen)

Gestart tijdens de Mistral AI Worldwide Hackathon (maart 2026), volledig ontwikkeld door AI met [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licentie

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel vertaald van het Frans naar het Nederlands met gpt-6.1-sol.**
