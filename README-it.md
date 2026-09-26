<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Trasforma qualsiasi contenuto in un'esperienza di apprendimento interattiva — basato su <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demo YouTube"></a>
</p>

<h4 align="center">📊 Qualità del codice</h4>

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

## La storia — Perché EurekAI?

**EurekAI** è nato durante il [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([sito ufficiale](https://worldwide-hackathon.mistral.ai/)) (marzo 2026). Mi serviva un'idea — ed è nata da qualcosa di molto concreto: preparo regolarmente le verifiche con mia figlia e ho pensato che dovesse essere possibile rendere tutto ciò più divertente e interattivo grazie all'IA.

L'obiettivo: prendere **qualsiasi input** — una foto della lezione, un testo copiato e incollato, una registrazione vocale, una ricerca web — e trasformarlo in **schede di ripasso, flashcard, quiz, podcast, testi a buchi, illustrazioni e molto altro**. Il tutto basato sui modelli francesi di Mistral AI, rendendolo una soluzione naturalmente adatta agli studenti francofoni.

Il [prototipo iniziale](https://github.com/jls42/worldwide-hackathon.mistral.ai) è stato sviluppato in 48 ore durante l'hackathon come proof of concept attorno ai servizi Mistral — già funzionante, ma limitato. Da allora, EurekAI è diventato un vero e proprio progetto: testi a buchi, navigazione tra gli esercizi, web scraping, moderazione parentale configurabile, code review approfondita e molto altro. L'intero codice è generato dall'IA — principalmente [Claude Code](https://code.claude.com/), con alcuni contributi tramite [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Panoramica

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Tour guidato di EurekAI: fonti, scheda, quiz, flashcard, illustrazioni" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — generazioni recenti, costo stimato per scheda e totale del progetto, pulsante «Auto — Magia!» | ![Fonti](docs/screenshots/sources.webp)<br>**Fonti** — importazione foto/PDF/testo/voce/web, generazione con un clic, rilevamento delle consegne |

Ogni fonte importata mostra il suo [punteggio di affidabilità OCR, la moderazione e il costo stimato](docs/screenshots/sources-list.webp).

### I componenti in azione

| | |
|---|---|
| ![Scheda di ripasso](docs/screenshots/notes.gif)<br>**Scheda di ripasso** — punti chiave, vocabolario, citazioni con fonte, lettura audio per sezione | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz a risposta multipla** — feedback immediato con spiegazione, navigazione passo-passo |
| ![Flashcard](docs/screenshots/flashcards.gif)<br>**Flashcard** — carta da girare e autovalutazione «lo sapevo / non lo sapevo» | ![Testi a buchi](docs/screenshots/fillblank.gif)<br>**Testi a buchi** — suggerimento su richiesta, convalida tollerante |
| ![Dettato](docs/screenshots/dictation.gif)<br>**Dettato** — parola dettata in audio, correzione rigorosa lettera per lettera | ![Quiz vocale](docs/screenshots/vocal-quiz.gif)<br>**Quiz vocale** — domanda letta ad alta voce, risposta al microfono |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast a 2 voci, trascrizione del dialogo consultabile | ![Illustrazioni](docs/screenshots/illustrations.gif)<br>**Illustrazioni** — immagini educative generate da Agent |
| ![Tutor IA](docs/screenshots/chat.gif)<br>**Tutor IA** — chat ancorata ai documenti del corso, risposte spiegate, può generare quiz e flashcard | |

### Primi passi

| | |
|---|---|
| ![Scelta del profilo](docs/screenshots/login.gif)<br>**Scelta del profilo** — ogni bambino ha il proprio spazio, il proprio avatar e la propria lingua | ![Creazione del profilo](docs/screenshots/profile-create.gif)<br>**Creazione del profilo** — età, avatar, PIN genitoriale per i minori di 15 anni |
| ![Creazione del corso](docs/screenshots/course.gif)<br>**Creazione del corso** — un progetto per lezione, pronto ad accogliere le fonti | ![Impostazioni](docs/screenshots/settings.gif)<br>**Impostazioni** — stato delle API, scelta dei modelli IA con tariffe indicate |

---

## Funzionalità

| | Funzionalità | Descrizione |
|---|---|---|
| 📷 | **Importazione di file** | Importa le tue lezioni — foto, PDF (tramite Mistral OCR con punteggio di affidabilità medio, livelli `high`/`medium`/`low`) o file di testo (TXT, MD). Sessioni di upload con retry per file e avanzamento individuale |
| 📝 | **Inserimento testo** | Digita o incolla qualsiasi testo direttamente |
| 🎤 | **Input vocale** | Registrati — Voxtral STT trascrive la tua voce |
| 🌐 | **Web / URL** | Incolla un URL (scraping diretto tramite Readability + Lightpanda) o digita una ricerca (Agent Mistral web_search) |
| 📄 | **Schede di ripasso** | Appunti strutturati con punti chiave, vocabolario, citazioni, curiosità |
| 🃏 | **Flashcard** | Carte D&R interattive, lettura audio dialogata |
| ❓ | **Quiz a risposta multipla** | Domande a risposta multipla con ripasso adattivo degli errori (numero configurabile) |
| ✏️ | **Testi a buchi** | Esercizi di completamento con indizi e convalida tollerante |
| 🔤 | **Dettato** | Parole dettate in audio (Voxtral TTS) da un elenco importato, digitazione da tastiera, correzione rigorosa lettera per lettera con regola ortografica spiegata |
| 🎙️ | **Podcast** | Mini-podcast a 2 voci in audio — voci Mistral predefinite o voci personalizzate (genitori!) |
| 🖼️ | **Illustrazioni** | Immagini educative generate da un Agent Mistral |
| 🗣️ | **Quiz vocale** | Domande lette ad alta voce (possibilità di voce personalizzata), risposta orale, verifica IA |
| 💬 | **Tutor IA** | Chat contestuale con i documenti del tuo corso, con chiamata di strumenti |
| 🧠 | **Router automatico** | Un router basato su `mistral-small-latest` analizza il contenuto e propone una combinazione di generatori tra gli 8 tipi disponibili |
| 🔒 | **Controllo genitori** | Moderazione configurabile per profilo (categorie personalizzabili), PIN genitoriale, restrizioni della chat |
| 🌍 | **Multilingue** | Interfaccia disponibile in 9 lingue; generazione IA gestibile in 15 lingue tramite i prompt |
| 🔊 | **Lettura ad alta voce** | Ascolta le schede e le flashcard (dialogo domanda/risposta) tramite Mistral Voxtral TTS |
| 💶 | **Monitoraggio dei costi API** | Stima trasparente del costo in € di ogni generazione e fonte (token / caratteri / pagine / secondi audio). Badge per scheda + totale per progetto, visibile nella dashboard |
| 🎨 | **Tema per profilo** | Ogni profilo sceglie il proprio tema `dark` o `light` — persiste al cambio di profilo |

---

## Panoramica dell'architettura

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Mappa di utilizzo dei modelli

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Percorso utente

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Approfondimento — Funzionalità

### Input multimodale

EurekAI accetta 4 tipi di fonti, moderate in base al profilo (attivo per impostazione predefinita per bambini e adolescenti):

- **Importazione di file** — File JPG, PNG o PDF elaborati tramite Mistral OCR — **OCR 4 (`mistral-ocr-4-0`) predefinito** (qualità migliore), **OCR 3 (`mistral-ocr-2512`) opzionale** nelle Impostazioni (più economico, ~½ del costo) — per testo stampato, tabelle e scrittura a mano; oppure file di testo (TXT, MD) importati direttamente. I caricamenti multifile utilizzano un sistema di **sessioni di upload**: avanzamento individuale per file, retry del file non riuscito senza dover inviare nuovamente gli altri, chiusura (dismiss) della sessione al termine. L'OCR espone un **punteggio di affidabilità** medio (`average`, vincolato in `[0,1]`, calcolato a partire da `averagePageConfidenceScore` restituiti da Mistral), visualizzato nella UI sotto forma di badge di livello `high` / `medium` / `low` (soglie ~0.9 / ~0.7) — avvisa senza bloccare se la scansione è di bassa qualità. La copia del documento inviata a Mistral per l'OCR viene eliminata non appena l'elaborazione è completata, anche in caso di errore.
- **Testo libero** — Digita o incolla qualsiasi contenuto. Moderato prima del salvataggio se la moderazione è attiva.
- **Input vocale** — Registra l'audio nel browser. Trascritto da `voxtral-mini-latest`. Il parametro `language="fr"` ottimizza il riconoscimento.
- **Web / URL** — Incolla uno o più URL per estrarre direttamente i contenuti (Readability + Lightpanda per le pagine JS), oppure digita parole chiave per una ricerca web tramite Agent Mistral. Il campo unico accetta entrambi — URL e parole chiave vengono separati automaticamente, e ogni risultato crea una fonte indipendente.

### Generazione di contenuti IA

Otto tipi di materiali di apprendimento generati:

| Generatore | Modello | Output |
|---|---|---|
| **Scheda di ripasso** | `mistral-large-latest` | Titolo, riassunto, punti chiave, vocabolario, citazioni, curiosità |
| **Flashcard** | `mistral-large-latest` | Carte D&R con riferimenti alle fonti (numero configurabile) |
| **Quiz a risposta multipla** | `mistral-large-latest` | Domande a risposta multipla, spiegazioni, ripasso adattivo (numero configurabile) |
| **Testi a buchi** | `mistral-large-latest` | Frasi da completare con indizi, convalida tollerante (Levenshtein) |
| **Dettato** | `mistral-large-latest` + Voxtral TTS | Parole chiave dettate in audio (1 MP3/parola) → digitazione da tastiera → correzione rigorosa (accenti) con regola spiegata |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script a 2 voci → audio MP3 |
| **Illustrazione** | Agent `mistral-large-latest` | Immagine educativa tramite lo strumento `image_generation` |
| **Quiz vocale** | `mistral-large-latest` + Voxtral TTS + STT | Domande TTS → risposta STT → verifica IA |

### Tutor IA tramite chat

Un tutor conversazionale con accesso completo ai documenti del corso:

- Utilizza `mistral-large-latest`
- **Chiamata di strumenti** (tool calling): può generare schede, flashcard, quiz o testi a buchi durante la conversazione
- Cronologia di 50 messaggi per corso
- Moderazione se attiva per il profilo: il messaggio viene verificato, e le fonti segnalate, in errore o non ancora verificate vengono escluse dal contesto e dagli strumenti (la loro verifica viene prima rilanciata, al massimo per 5 s)

### Router automatico

Il router utilizza `mistral-small-latest` per analizzare il contenuto delle fonti e proporre i generatori più pertinenti tra gli 8 disponibili. L'interfaccia mostra l'avanzamento in tempo reale: prima una fase di analisi, poi le generazioni individuali con possibilità di annullamento.

### Apprendimento adattivo

- **Statistiche dei quiz**: monitoraggio dei tentativi e della precisione per domanda
- **Ripasso dei quiz**: genera 5-10 nuove domande mirate sui concetti più deboli, a partire dalle fonti del quiz originale (il controllo di moderazione si applica a queste stesse fonti)
- **Rilevamento delle consegne**: rileva le istruzioni di studio («So la mia lezione se so...») e assegna loro la priorità nei generatori testuali compatibili (scheda, flashcard, quiz, testi a buchi). Con la moderazione attiva, il rilevamento attende la verifica delle fonti e legge solo quelle ritenute sicure; la consegna mantiene l'elenco delle fonti di origine, non viene visualizzata né applicata se una di esse viene segnalata, e scompare insieme a essa. Il relativo costo viene conteggiato

### Sicurezza e controllo genitori

- **4 fasce d'età**: bambini (≤10 anni), adolescenti (11-15), studenti (16-25), adulti (26+)
- **Moderazione dei contenuti**: `mistral-moderation-2603` (Mistral Moderation 2) con 11 categorie disponibili, 6 bloccate per impostazione predefinita per i nuovi profili bambini/adolescenti (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` aggiunto dopo un test su 50 lezioni, inclusa storia, senza alcun falso positivo). Categorie personalizzabili per profilo nelle impostazioni; Moderation 2 ha suddiviso la vecchia categoria «contenuti pericolosi» in `dangerous` + `criminal` (i profili esistenti vengono migrati automaticamente e le categorie bloccate si applicano anche alle fonti già importate). Sicurezza per impostazione predefinita: se la risposta del modello non consente di verificare una categoria bloccata, il contenuto viene rifiutato («Moderazione non disponibile»); con la moderazione attiva, sia la generazione sia la chat escludono le fonti segnalate, in errore o in fase di verifica. Una fonte mai verificata (importata con moderazione disattivata, vecchio progetto collegato) viene verificata prima dell'uso; una moderazione interrotta da un riavvio o fallita viene ripresa automaticamente (all'avvio se la chiave del server lo consente, altrimenti all'apertura del progetto o alla generazione successiva), e un pulsante «Ricontrolla» la riavvia su richiesta. Il contenuto di una fonte segnalata o in fase di verifica è nascosto al bambino (anteprima, testo, documento originale); un genitore può visualizzarlo inserendo il proprio PIN, per la durata di una consultazione. La risposta orale del quiz vocale viene moderata prima di essere verificata. ID datato fissato in `helpers/moderation-model.ts`: l'alias `-latest`, deprecato, non è più elencato dall'API.
- **PIN genitoriale**: hash SHA-256, richiesto per i profili di età inferiore a 15 anni; massimo 10 tentativi errati per quarto d'ora e per indirizzo IP (429 `rate_limited`). Per un deployment in produzione, prevedere un hash lento con salt (Argon2id, bcrypt).
- **Dati del server**: `/output` rende pubblici solo i media dei progetti (audio, immagini, file importati); `profiles.json`, `config.json` e i file dei progetti non vengono mai serviti
- **Restrizioni della chat**: chat IA disattivata per impostazione predefinita per i minori di 16 anni, attivabile dai genitori

### Sistema multi-profilo

- Profili multipli con nome, età, avatar, preferenze di lingua
- **Voci per profilo** (`Profile.mistralVoices?: { host?, guest? }` — ciascun ruolo è opzionale) — ogni bambino può avere la propria coppia di voci per podcast/quiz vocale
- **Tema per profilo** (`Profile.theme: 'dark' | 'light'`) — cambio automatico al passaggio da un profilo all'altro, persistito sul backend
- Progetti collegati ai profili tramite `profileId`; un vecchio progetto senza profilo viene associato al primo profilo che lo apre, quindi moderato in base a quel profilo
- Eliminazione a cascata: l'eliminazione di un profilo comporta l'eliminazione di tutti i suoi progetti

### Monitoraggio dei costi API

Ogni chiamata Mistral fatturabile (chat, OCR, STT, TTS, agenti), inclusi il rilevamento delle consegne e le risposte orali del quiz vocale, è strumentata per fornire una stima in € **trasparente** all'utente. La moderazione, gratuita, non viene conteggiata. I costi degli strumenti degli agenti sono inclusi: 0,03 $ per ricerca web e 0,10 $ per immagine generata (tariffe Mistral), più i token prodotti da questi strumenti, conteggiati alla tariffa di input del modello dell'agente.

- **Fonte di verità**: `helpers/pricing.ts` — `MODEL_PRICING` per prefisso di modello (es.: `mistral-large` → input 0.5 €/M token, output 1.5 €/M token), `PRICING_SOURCES` con URL della documentazione Mistral per il re-scraping periodico
- **Unità supportate**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversione gestita da `helpers/cost-calc.ts`
- **Catena di strumentazione**: `helpers/tracked-client.ts` (wrap del client Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (iniezione nella risposta HTTP)
- **UI**: badge del costo per generazione (`src/partials/cost-badge-gen.html`), per fonte (`cost-badge-src.html`), totale cumulativo nella dashboard (`Project.totalCost`)
- **Endpoint**: le risposte `/generate/*` e `/sources/*` decorano l'oggetto restituito (Generation / Source) con `estimatedCost`, `usage` e `costBreakdown`. `POST /generate/route` aggiunge un campo `costDelta: number` per il costo del solo routing; `POST /detect-consigne` (`{consigne, costDelta}`) e la verifica di una risposta orale restituiscono anch'esse il proprio `costDelta`. `GET /projects/:pid` restituisce il progetto arricchito con `totalCost` (somma calcolata a partire da `costLog[]`) + la cronologia completa

### TTS (Mistral Voxtral) & voci personalizzate

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, sintesi vocale 100% Mistral, nessuna chiave aggiuntiva necessaria
- **Voci personalizzate**: i genitori possono creare le proprie voci tramite l'API Mistral Voices (a partire da un campione audio) e assegnarle ai ruoli host/ospite — i podcast e i quiz vocali vengono quindi letti con la voce di un genitore, rendendo l'esperienza ancora più immersiva per il bambino
- Due ruoli vocali configurabili: **host** (narratore principale) e **ospite** (seconda voce del podcast)
- Catalogo completo delle voci Mistral disponibile nelle impostazioni, filtrabile per lingua

### Internazionalizzazione

- Interfaccia disponibile in 9 lingue: fr, en, es, pt, it, nl, de, hi, ar
- I prompt dell'IA supportano 15 lingue (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Lingua configurabile per profilo

---

## Stack tecnologico

| Livello | Tecnologia | Ruolo |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server e type safety |
| **Backend** | Express 5.x | API REST |
| **Server di sviluppo** | Vite 8.x (Rolldown) + tsx | HMR, partial Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfaccia reattiva, TypeScript compilato da Vite |
| **Templating** | vite-plugin-handlebars | Composizione HTML tramite partial |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, agenti, moderazione |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, sintesi vocale integrata |
| **Icone** | Lucide 1.x | Libreria di icone SVG |
| **Scraping web** | Readability + linkedom | Estrazione del contenuto principale delle pagine web (tecnologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Browser headless ultra-leggero (Zig + V8) per pagine JS/SPA — fallback per lo scraping |
| **Markdown** | Marked | Rendering markdown nella chat |
| **Upload file** | Multer 2.x | Gestione dei form multipart |
| **Audio** | ffmpeg-static | Concatenazione di segmenti audio |
| **Test** | Vitest | Test unitari — copertura misurata da SonarCloud |
| **Persistenza** | File JSON | Archiviazione senza dipendenze |

---

## Riferimento dei modelli

| Modello | Utilizzo | Perché |
|---|---|---|
| `mistral-large-latest` | Scheda di ripasso, flashcard, podcast, quiz, testi a buchi, chat, verifica quiz vocale, agente immagini, agente web search, rilevamento consegne | Miglior supporto multilingue + instruction following |
| `mistral-ocr-4-0` (OCR 4, predefinito) | OCR di documenti — qualità superiore | Testo stampato, tabelle, scrittura a mano ($4 / 1000 pagine) |
| `mistral-ocr-2512` (OCR 3, opzione) | OCR di documenti | Selezionabile nelle Impostazioni, più economico ($2 / 1000 pagine) |
| `voxtral-mini-latest` | Riconoscimento vocale (STT) | STT multilingue, ottimizzato con `language="fr"` |
| `voxtral-mini-tts-latest` | Sintesi vocale (TTS) | Podcast, quiz vocale, lettura ad alta voce |
| `mistral-moderation-2603` | Moderazione dei contenuti | 6 categorie bloccate per bambini/adolescenti (tra cui `jailbreaking`) |
| `mistral-small-latest` | Router automatico | Analisi rapida dei contenuti per decisioni di routing |

---

## Avvio rapido

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

> **Nota**: Mistral Voxtral TTS è l'unico provider TTS — nessuna chiave aggiuntiva necessaria oltre a `MISTRAL_API_KEY`.

> **Chiave API inserita dall'utente**: `MISTRAL_API_KEY` è ora **opzionale**. Se assente, l'app si avvia comunque e invita ciascun utente a inserire **la propria chiave Mistral** nell'interfaccia. La chiave viene **memorizzata nel browser** (crittografata tramite Web Crypto + IndexedDB in un contesto sicuro) e inviata per ogni richiesta — **mai persistita sul server**. Precedenza: chiave del profilo > chiave globale del browser > `MISTRAL_API_KEY` (env). Impostare `EUREKAI_REQUIRE_USER_KEY=true` obbliga ciascun utente a fornire la propria chiave (la chiave d'ambiente serve solo per i precaricamenti).

> **HTTPS locale (tablet/LAN)**: `localhost` è già un contesto sicuro. Per l'accesso da LAN (tablet), genera un certificato locale e attiva HTTPS per sbloccare la crittografia nel browser + crittografare la chiave in transito:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert se disponibile, altrimenti openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite in HTTPS
> ```

### Variabili d'ambiente

| Variabile | Obbligatorio | Predefinito | Ruolo |
|---|---|---|---|
| `MISTRAL_API_KEY` | opzionale | — | Chiave API Mistral (chat, OCR, STT, TTS Voxtral, agenti, moderazione). Se assente, l'utente inserisce la propria chiave nell'app (memorizzata nel browser, mai sul server) |
| `EUREKAI_REQUIRE_USER_KEY` | opzionale | `false` | `true` → disabilita il fallback su `MISTRAL_API_KEY` per le richieste IA (ciascun utente DEVE fornire la propria chiave). Utile su un'istanza esposta |
| `HTTPS_KEY` / `HTTPS_CERT` | opzionale | — | Percorsi chiave/certificato TLS (cfr. `scripts/gen-cert.sh`) → Express e Vite servono in HTTPS (secure context LAN/tablet) |
| `PORT` | opzionale | `3000` | Porta HTTP del backend Express |
| `NODE_ENV` | opzionale | `development` | Se `production` → Express serve il frontend da `dist/` (altrimenti `public/`) |
| `SONAR_TOKEN` | opzionale CI | — | Utilizzato esclusivamente dal workflow GitHub Actions SonarCloud |

### Test, qualità del codice e contributo

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hook Git (Husky)**: `pre-commit` esegue in sequenza `scripts/pre-commit-fast.sh` (conflitti, file di grandi dimensioni, shellcheck), `lint-staged` poi `npm test`; `pre-push` esegue prima un gate `npm audit` (blocca in caso di vulnerabilità critica transitiva, cfr. `scripts/audit-verdict.mjs`) poi `npm run security`. Tutti bloccano il commit/push in caso di fallimento.

**Strumenti esterni richiesti (opzionali ma usati da `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Senza questi strumenti, `npm test` fallisce a `pretest` (lizard assente) e `npm run security` fallisce (opengrep assente). Gli hook di Husky bloccano quindi il commit/push.

---

## Distribuzione con container

L'immagine è pubblicata su **GitHub Container Registry**:

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

> **`:U`** è un flag di Podman rootless che regola automaticamente i permessi del volume.

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## Struttura del progetto

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

> **Per i collaboratori IA**: consultare [`CLAUDE.md`](CLAUDE.md) per il contesto architetturale dettagliato, le regole obbligatorie (prompt anti-leak, codici di errore, tracciamento dei costi) e le insidie note (Lizard CCN, Opengrep, migrazione Codacy/Semgrep).

---

## Riferimento API

### Config
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/config` | Configurazione corrente |
| `PUT` | `/api/config` | Modificare la configurazione (modelli, voci, modello TTS) |
| `GET` | `/api/config/status` | Stato delle API: `mistral` (chiave Mistral definita), `ttsAvailable` (alias di `mistral`, Mistral Voxtral è l'unico provider TTS) |
| `POST` | `/api/config/reset` | Ripristinare la configurazione predefinita |
| `GET` | `/api/config/voices` | Elencare le voci Mistral TTS (opzionale `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorie di moderazione disponibili + impostazioni predefinite per età |
| `POST` | `/api/providers/mistral/validate` | Convalidare una chiave Mistral inserita dall'utente — sempre 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), nessun fallback env |

### Profili
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/profiles` | Elencare tutti i profili |
| `POST` | `/api/profiles` | Creare un profilo |
| `PUT` | `/api/profiles/:id` | Modificare un profilo (PIN richiesto per < 15 anni; 10 PIN errati / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Eliminare un profilo + propagazione a cascata sui progetti `{pin?}` → `{ok, deletedProjects}` |

### Progetti
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/projects` | Elencare i progetti (`?profileId=` opzionale) |
| `POST` | `/api/projects` | Creare un progetto `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Dettagli del progetto; `?profileId=` associa un progetto senza profilo al profilo che lo apre |
| `PUT` | `/api/projects/:pid` | Rinominare `{name}` |
| `DELETE` | `/api/projects/:pid` | Eliminare il progetto |
| `GET` | `/api/projects/:pid/events` | Flusso SSE in tempo reale (`event: generation`) delle transizioni di generazione (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Fonti
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importazione file multipart (OCR per JPG/PNG/PDF, lettura diretta per TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Testo libero `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL o ricerca web `{query}` — restituisce un array di fonti; 422 `url_blocked` se tutti gli indirizzi vengono rifiutati (rete interna), 502 `all_sources_failed` se non è stato possibile creare alcuna fonte |
| `POST` | `/api/projects/:pid/sources/moderate` | Riprendere le moderazioni in sospeso o con errori `{sourceIds?}` (massimo 10 per chiamata, attesa ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eliminare una fonte, il file importato corrispondente e la consegna dipendente → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderare `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Rilevare le consegne di ripasso (solo fonti verificate) → `{consigne, costDelta}` |

### Generazione
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Scheda di ripasso |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcard |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz a risposta multipla |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Testi a buchi |
| `POST` | `/api/projects/:pid/generate/dictation` | Dettato (parole + frasi di esempio + regole, 1 audio TTS per parola; proposto anche dall'auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustrazione |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocale |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Ripasso adattivo `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Scheda di riepilogo mirata sulle domande sbagliate di un quiz `{generationId, weakQuestions}` — chiamata in parallelo a `quiz-review` tramite il pulsante «Allenarmi sui miei errori» |
| `POST` | `/api/projects/:pid/generate/route` | Analisi di routing (piano dei generatori da avviare) — restituisce `{plan, costDelta}` (costo del solo routing) |
| `POST` | `/api/projects/:pid/generate/auto` | Generazione automatica backend (routing + 8 tipi: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Esecuzione in parallelo — presuppone un tier Mistral con rate limit ≥ 8 richieste simultanee; altrimenti diversi 429 potrebbero comparire in `failedSteps`. |

Tutte le route di generazione accettano `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; un `lang` che non sia un codice lingua (es. `pt-BR`) o un `ageGroup` sconosciuto → 400 `invalid_input`, prima di qualsiasi chiamata IA. `quiz-review` e `remediation-summary` richiedono inoltre `{generationId, weakQuestions}` e si basano sulle fonti del quiz di origine.

### CRUD Generazioni
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Inviare le risposte del quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Inviare le risposte dei testi a buchi `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Inviare le risposte del dettato `{answers}` (punteggio server rigoroso) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificare una risposta orale (audio + questionIndex); risposta moderata (400 `quiz.answerBlocked`), costo restituito in `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Lettura TTS ad alta voce (schede/flashcard) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Annullare una generazione in corso (unica via per annullare un'operazione pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Rinominare `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Eliminare la generazione e i relativi media (audio, immagini) |

### Chat
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperare la cronologia della chat |
| `POST` | `/api/projects/:pid/chat` | Inviare un messaggio `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Cancellare la cronologia della chat |

---

## Decisioni architetturali

| Decisione | Motivazione |
|---|---|
| **Alpine.js piuttosto che React/Vue** | Footprint minimo, reattività leggera con TypeScript compilato da Vite. Perfetto per un hackathon in cui la velocità conta. |
| **Persistenza su file JSON** | Zero dipendenze, avvio istantaneo. Nessun database da configurare — si avvia ed è subito pronto. |
| **Vite + Handlebars** | Il meglio di entrambi i mondi: HMR veloce per lo sviluppo, partial HTML per l'organizzazione del codice, Tailwind JIT. |
| **Prompt centralizzati** | Tutti i prompt IA in `prompts.ts` — facile da iterare, testare e adattare per lingua/fascia d'età. |
| **Sistema multi-generazione** | Ciascuna generazione è un oggetto indipendente con il proprio ID — consente più schede, quiz, ecc. per corso. |
| **Prompt adattati per età** | 4 fasce d'età con vocabolario, complessità e tono differenti — lo stesso contenuto viene insegnato diversamente a seconda dell'apprendente. |
| **Funzionalità basate su agenti** | La generazione di immagini e la ricerca web utilizzano agenti Mistral temporanei — ciclo di vita pulito con pulizia automatica. |
| **Scraping intelligente degli URL** | Un unico campo accetta URL e parole chiave combinati — gli URL vengono acquisiti tramite scraping con Readability (pagine statiche) con fallback a Lightpanda (pagine JS/SPA), le parole chiave attivano un agente Mistral web_search. Ciascun risultato crea una fonte indipendente. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (nessuna chiave aggiuntiva oltre a `MISTRAL_API_KEY`) — sintesi vocale integrata nella catena di calcolo dei costi e nella risoluzione vocale per lingua. |

---

## Crediti e ringraziamenti

- **[Mistral AI](https://mistral.ai)** — Modelli IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reattivo leggero
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS basato su classi di utilità
- **[Vite](https://vitejs.dev)** — Strumento di build frontend
- **[Lucide](https://lucide.dev)** — Libreria di icone
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Estrazione di contenuti web (tecnologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Browser headless ultraleggero per lo scraping di pagine JS/SPA
- **[Luciole](https://luciole-vision.com)** — Carattere tipografico progettato per persone ipovedenti, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opzione « Comfort di lettura » dei profili)

Iniziato durante il Mistral AI Worldwide Hackathon (marzo 2026), sviluppato interamente tramite IA con [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Autore

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licenza

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Articolo tradotto dal fr all'it con gemini-3.8-flash-medium.**
