<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Trasforma qualsiasi contenuto in un'esperienza di apprendimento interattiva — grazie a <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Inglese</a> · <a href="README-es.md">🇪🇸 Spagnolo</a> · <a href="README-pt.md">🇧🇷 Portoghese</a> · <a href="README-de.md">🇩🇪 Tedesco</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Olandese</a> · <a href="README-ar.md">🇸🇦 Arabo</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Cinese</a> · <a href="README-ja.md">🇯🇵 Giapponese</a> · <a href="README-ko.md">🇰🇷 Coreano</a> · <a href="README-pl.md">🇵🇱 Polacco</a> · <a href="README-ro.md">🇷🇴 Rumeno</a> · <a href="README-sv.md">🇸🇪 Svedese</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demo YouTube"></a>
</p>

<h4 align="center">📊 Qualità del codice</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Quality Gate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Valutazione della sicurezza"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Valutazione dell'affidabilità"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Valutazione della manutenibilità"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Copertura"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilità"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Righe di codice"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Badge Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## La storia — Perché EurekAI?

**EurekAI** è nato durante il [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([sito ufficiale](https://worldwide-hackathon.mistral.ai/)) (marzo 2026). Mi serviva un tema — e l'idea è nata da qualcosa di molto concreto: preparo regolarmente le verifiche con mia figlia e mi sono detto che doveva essere possibile rendere questa attività più divertente e interattiva grazie all'IA.

L'obiettivo: prendere **qualsiasi input** — una foto della lezione, un testo copiato e incollato, una registrazione vocale, una ricerca web — e trasformarlo in **schede di ripasso, flashcard, quiz, podcast, testi da completare, illustrazioni e molto altro**. Il tutto grazie ai modelli di Mistral AI, azienda francese, il che rende EurekAI una soluzione naturalmente adatta agli studenti francofoni.

Il [prototipo iniziale](https://github.com/jls42/worldwide-hackathon.mistral.ai) è stato realizzato in 48h durante l'hackathon come prova di concetto basata sui servizi Mistral — già funzionante, ma limitata. Da allora, EurekAI è diventato un vero progetto: testi da completare, navigazione negli esercizi, scraping web, moderazione parentale configurabile, revisione approfondita del codice e molto altro. L'intero codice è generato dall'IA — principalmente [Claude Code](https://code.claude.com/), con alcuni contributi tramite [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Panoramica

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Tour guidato di EurekAI: fonti, scheda, quiz, flashcard, illustrazioni" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — generazioni recenti, costo stimato per scheda e totale del progetto, pulsante «Auto — Magia!» | ![Fonti](docs/screenshots/sources.webp)<br>**Fonti** — importazione di foto/PDF/testo/voce/web, generazione con un clic, rilevamento delle istruzioni |

Ogni fonte importata mostra il proprio [punteggio di affidabilità OCR, la moderazione e il costo stimato](docs/screenshots/sources-list.webp).

### I componenti in azione

| | |
|---|---|
| ![Scheda di ripasso](docs/screenshots/notes.gif)<br>**Scheda di ripasso** — punti chiave, vocabolario, citazioni con fonti, lettura audio per sezione | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz a scelta multipla** — una sola risposta corretta per domanda, feedback immediato con spiegazione, navigazione passo dopo passo |
| ![Flashcard](docs/screenshots/flashcards.gif)<br>**Flashcard** — carta da girare e poi autovalutazione «lo sapevo / non lo sapevo» | ![Testi da completare](docs/screenshots/fillblank.gif)<br>**Testi da completare** — suggerimento su richiesta, validazione tollerante |
| ![Dettato](docs/screenshots/dictation.gif)<br>**Dettato** — parola dettata in audio, correzione rigorosa lettera per lettera | ![Quiz vocale](docs/screenshots/vocal-quiz.gif)<br>**Quiz vocale** — domanda letta ad alta voce, risposta al microfono |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast a 2 voci, copione dialogato consultabile | ![Illustrazioni](docs/screenshots/illustrations.gif)<br>**Illustrazioni** — immagini didattiche generate da un Agent |
| ![Tutor IA](docs/screenshots/chat.gif)<br>**Tutor IA** — chat basata sui documenti del corso, risposte spiegate, può generare quiz e flashcard | |

### Primi passi

| | |
|---|---|
| ![Scelta del profilo](docs/screenshots/login.gif)<br>**Scelta del profilo** — ogni bambino ha il proprio spazio, avatar e lingua | ![Creazione del profilo](docs/screenshots/profile-create.gif)<br>**Creazione del profilo** — età, avatar, PIN parentale per i minori di 15 anni |
| ![Creazione del corso](docs/screenshots/course.gif)<br>**Creazione del corso** — un progetto per lezione, pronto a ricevere le fonti | ![Impostazioni](docs/screenshots/settings.gif)<br>**Impostazioni** — stato API, scelta dei modelli IA con tariffe visualizzate |

---

## Funzionalità

| | Funzionalità | Descrizione |
|---|---|---|
| 📷 | **Importazione di file** | Importa le tue lezioni — foto, PDF (tramite Mistral OCR con punteggio di affidabilità medio, livelli `high`/`medium`/`low`) o file di testo (TXT, MD). Sessioni di upload con retry per file e avanzamento individuale |
| 📝 | **Inserimento di testo** | Digita o incolla direttamente qualsiasi testo |
| 🎤 | **Input vocale** | Registrati — Voxtral STT trascrive la tua voce |
| 🌐 | **Web / URL** | Incolla un URL (scraping diretto tramite Readability + Lightpanda) o digita una ricerca (Agent Mistral web_search) |
| 📄 | **Schede di ripasso** | Appunti strutturati con punti chiave, vocabolario, citazioni, aneddoti |
| 🃏 | **Flashcard** | Carte domanda/risposta interattive, lettura audio dialogata |
| ❓ | **Quiz a scelta multipla** | Domande con 4 opzioni e una sola risposta corretta, con ripasso adattivo degli errori (numero configurabile) |
| ✏️ | **Testi da completare** | Esercizi da completare con suggerimenti e validazione tollerante |
| 🔤 | **Dettato** | Parole dettate in audio (Voxtral TTS) da un elenco importato, inserimento da tastiera, correzione rigorosa lettera per lettera con spiegazione della regola ortografica |
| 🎙️ | **Podcast** | Mini-podcast a 2 voci in audio — voci Mistral predefinite o voci personalizzate (dei genitori!) |
| 🖼️ | **Illustrazioni** | Immagini didattiche generate da un Agent Mistral |
| 🗣️ | **Quiz vocale** | Domande lette ad alta voce (anche con voce personalizzata), risposta orale, verifica IA |
| 💬 | **Tutor IA** | Chat contestuale con i tuoi documenti del corso, con chiamata di strumenti |
| 🧠 | **Router automatico** | Un router basato su `mistral-small-latest` analizza il contenuto e propone una combinazione di generatori tra gli 8 tipi disponibili |
| 🔁 | **Continuità tra i corsi** | Importazioni, generazioni automatiche, registrazione al microfono, chat, ricerca web e lettura ad alta voce proseguono per il rispettivo corso quando se ne apre un altro; una notifica indica il nome del corso quando l'attività termina altrove |
| 🔒 | **Controllo parentale** | Moderazione configurabile per profilo (categorie personalizzabili), PIN parentale, restrizioni della chat |
| 🌍 | **Multilingue** | Interfaccia disponibile in 9 lingue; generazione IA impostabile in 15 lingue tramite i prompt |
| 🔊 | **Lettura ad alta voce** | Ascolta le schede e le flashcard (dialogo domanda/risposta) tramite Mistral Voxtral TTS |
| 💶 | **Monitoraggio dei costi API** | Stima trasparente del costo in € di ogni generazione e fonte (token / caratteri / pagine / secondi audio). Badge per scheda + totale per progetto, visibile nella dashboard |
| 🎨 | **Tema per profilo** | Ogni profilo sceglie il proprio tema `dark` o `light` — memorizzato nel profilo e riapplicato a ogni cambio di profilo |

---

## Panoramica dell'architettura

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Panoramica dell'architettura" width="800" />
</p>

---

## Mappa di utilizzo dei modelli

<p align="center">
  <img src="public/assets/model-map.webp" alt="Mappatura dei modelli IA alle attività" width="800" />
</p>

---

## Percorso utente

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Percorso di apprendimento dello studente" width="800" />
</p>

---

## Approfondimento — Funzionalità

### Input multimodale

EurekAI accetta 4 tipi di fonti, moderati in base al profilo (moderazione attiva per impostazione predefinita per i profili di bambini e adolescenti):

- **Importazione di file** — File JPG, PNG o PDF elaborati da Mistral OCR — **OCR 4.1** (`mistral-ocr-4-1`) per impostazione predefinita, **OCR 3** (`mistral-ocr-2512`) opzionale nelle Impostazioni (più economico, ~½ del costo; legge meglio la scrittura a mano) — per testo stampato, tabelle e scrittura a mano; oppure file di testo (TXT, MD) importati direttamente. Gli upload di più file usano un sistema di **sessioni di upload**: avanzamento individuale per file, retry del file non riuscito senza inviare nuovamente gli altri, chiusura della sessione al termine. L'OCR espone un **punteggio di affidabilità** medio (`average`, limitato a `[0,1]`, calcolato a partire dai `averagePageConfidenceScore` restituiti da Mistral), visualizzato nell'UI come badge di livello `high` / `medium` / `low` (soglie ~0.9 / ~0.7) — avvisa senza bloccare se la scansione è di scarsa qualità. La copia del documento inviata a Mistral per l'OCR viene eliminata al termine dell'elaborazione, anche in caso di errore.
- **Testo libero** — Digita o incolla qualsiasi contenuto. Viene moderato prima del salvataggio se la moderazione è attiva.
- **Input vocale** — Registra l'audio nel browser. Trascritto da **Voxtral Mini Transcribe 2** (`voxtral-mini-2602`) per impostazione predefinita; **Voxtral Mini Transcribe 3** e **Voxtral Small Transcribe 3** (anteprima Mistral) opzionali nelle Impostazioni. La lingua dell'interfaccia viene trasmessa al modello (`language`) per ottimizzare il riconoscimento.
- **Web / URL** — Incolla uno o più URL per estrarre direttamente il contenuto tramite scraping (Readability + Lightpanda per le pagine JS), oppure digita parole chiave per una ricerca web tramite Agent Mistral. Il campo unico accetta entrambi — URL e parole chiave vengono separati automaticamente, ogni risultato crea una fonte indipendente.

### Generazione di contenuti IA

Otto tipi di materiale didattico generato:

| Generatore | Modello | Output |
|---|---|---|
| **Scheda di ripasso** | `mistral-large-latest` | Titolo, riassunto, punti chiave, vocabolario, citazioni, aneddoto |
| **Flashcard** | `mistral-large-latest` | Carte domanda/risposta con riferimenti alle fonti (numero configurabile) |
| **Quiz a scelta multipla** | `mistral-large-latest` | Domande con 4 opzioni e una sola risposta corretta, spiegazioni, ripasso adattivo (numero configurabile) |
| **Testi da completare** | `mistral-large-latest` | Frasi da completare con suggerimenti, validazione tollerante (Levenshtein) |
| **Dettato** | `mistral-large-latest` + Voxtral TTS | Parole chiave dettate in audio (1 MP3/parola) → inserimento da tastiera → correzione rigorosa (un accento dimenticato conta come errore) con spiegazione della regola |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Copione a 2 voci → audio MP3 |
| **Illustrazione** | Agent `mistral-large-latest` | Immagine didattica tramite lo strumento `image_generation` |
| **Quiz vocale** | `mistral-large-latest` + Voxtral TTS + STT | Domande TTS → risposta STT → verifica IA |

### Tutor IA via chat

Un tutor conversazionale con accesso completo ai documenti del corso:

- Usa `mistral-large-latest`
- **Chiamata di strumenti**: può generare schede, flashcard, quiz o testi da completare durante la conversazione
- Cronologia di 50 messaggi per corso
- Moderazione se attiva per il profilo: il messaggio viene verificato e le fonti segnalate, quelle la cui verifica non è riuscita e quelle non ancora verificate vengono escluse dal contesto e dagli strumenti (la verifica delle fonti non riuscite o non ancora verificate viene prima riavviata, per un massimo di 5 s)

### Router automatico

Il router usa `mistral-small-latest` per analizzare il contenuto delle fonti e proporre i generatori più pertinenti tra gli 8 disponibili. L'interfaccia mostra l'avanzamento in tempo reale: prima una fase di analisi, poi le singole generazioni con possibilità di annullamento.

La funzione Auto viene eseguita sul server: prosegue se la pagina viene ricaricata, se si apre un altro corso o se si cambia profilo, e viene eseguita una sola operazione Auto alla volta per corso (una seconda scheda si collega a quella in corso). Il server avvia al massimo 3 generazioni contemporaneamente per chiave Mistral. Ogni generazione completata ha il proprio messaggio, poi viene visualizzato un riepilogo finale una sola volta; se termina mentre è visualizzato un altro corso, il messaggio indica il nome del suo corso. Una singola generazione annullata non conta come errore nel riepilogo. «Annulla tutto» interrompe l'intero gruppo di generazioni del corso, con un solo messaggio. Se il server si riavvia durante un'operazione Auto, questa viene segnalata come interrotta, con un pulsante «Riprendi» che riavvia solo le generazioni che non erano terminate, senza ripetere l'analisi.

Vengono eseguite contemporaneamente al massimo 3 generazioni lunghe avviate dalla scheda del browser (generazioni avviate singolarmente, schede di richiamo): le successive attendono il proprio turno e un corso si apre senza attendere la fine delle generazioni in corso.

### Apprendimento adattivo

- **Statistiche dei quiz**: monitoraggio dei tentativi e dell'accuratezza per domanda
- **Ripasso dei quiz**: genera 5-10 nuove domande mirate ai concetti meno consolidati, a partire dalle fonti del quiz originale (il controllo di moderazione riguarda queste stesse fonti)
- **Rilevamento delle istruzioni**: rileva le istruzioni di ripasso ("Conosco la lezione se so...") e dà loro priorità nei generatori testuali compatibili (scheda, flashcard, quiz, testi da completare). Con la moderazione attiva, il rilevamento attende la verifica delle fonti e legge solo quelle ritenute sicure; l'istruzione conserva l'elenco delle proprie fonti originali: se una di esse viene segnalata, l'istruzione non viene né visualizzata né applicata, e se una di esse viene eliminata, l'istruzione viene cancellata. Il relativo costo viene conteggiato
### Sicurezza e controllo parentale

- **4 fasce d'età**: bambino (≤10 anni), adolescente (11-15), studente (16-25), adulto (26+)
- **Moderazione dei contenuti**: `mistral-moderation-2603` (Mistral Moderation 2) con 11 categorie disponibili, 6 bloccate per impostazione predefinita per i nuovi profili bambino/adolescente (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` aggiunta dopo una valutazione su 50 lezioni, storia compresa, senza alcun falso positivo). Categorie personalizzabili per profilo nelle impostazioni; Moderation 2 ha suddiviso la precedente categoria «contenuti pericolosi» in `dangerous` + `criminal` (i profili esistenti vengono migrati automaticamente e le categorie bloccate si applicano anche alle fonti già importate). Sicurezza predefinita: se la risposta del modello non consente di verificare una categoria bloccata, il contenuto viene rifiutato («Moderazione non disponibile»); con la moderazione attiva, sia la generazione sia la chat escludono le fonti segnalate, quelle la cui verifica è fallita e quelle in corso di verifica. Una fonte mai verificata (importata quando la moderazione era disattivata, oppure un vecchio progetto associato a un profilo) viene verificata prima dell'uso. Una moderazione interrotta da un riavvio viene ripresa all'avvio se la chiave del server lo consente; altrimenti, come una moderazione terminata con un errore, viene ripresa all'apertura del progetto o alla generazione successiva. Un pulsante «Verifica di nuovo» riavvia la verifica su richiesta. Con la moderazione attiva, finché una fonte non viene ritenuta sicura, il suo contenuto viene nascosto al bambino (anteprima, testo, documento originale); un genitore può visualizzarlo con il proprio PIN, per una sola consultazione. La risposta orale del quiz vocale viene moderata prima di essere verificata. ID datato fissato in `helpers/moderation-model.ts`: l'alias `-latest`, deprecato, non è più elencato dall'API.
- **PIN parentale**: hash SHA-256, richiesto per i profili di età inferiore a 15 anni; al massimo 10 codici errati ogni quarto d'ora e per indirizzo IP (429 `rate_limited`). Per un deployment in produzione, prevedere un hash lento con salt (Argon2id, bcrypt).
- **Dati del server**: `/output` pubblica solo i media dei progetti (audio, immagini, file importati); `profiles.json`, `config.json`, `projects.json` e i `project.json` non vengono mai serviti
- **Restrizioni della chat**: chat IA disattivata per impostazione predefinita per i minori di 16 anni, attivabile dai genitori

### Sistema multiprofilo

- Profili multipli con nome, età, avatar, preferenze linguistiche
- **Voci per profilo** (`Profile.mistralVoices?: { host?, guest? }` — ogni ruolo è facoltativo) — ogni bambino può avere la propria coppia di voci per podcast/quiz vocale
- **Tema per profilo** (`Profile.theme: 'dark' | 'light'`) — cambio automatico al cambio di profilo, salvato nel backend
- Progetti collegati ai profili tramite `profileId`; un vecchio progetto senza profilo viene associato al primo profilo che lo apre, quindi moderato in base a quel profilo
- Eliminazione a cascata: eliminare un profilo elimina tutti i suoi progetti

### Monitoraggio dei costi API

Ogni chiamata Mistral fatturabile (chat, OCR, STT, TTS, agenti), compresi il rilevamento delle istruzioni e le risposte orali del quiz vocale, viene strumentata per fornire all'utente una stima in € **trasparente**. La moderazione, gratuita, non viene conteggiata. Sono inclusi i costi degli strumenti degli agenti: 0,03 $ per ricerca web e 0,10 $ per immagine generata (tariffe Mistral), più i token prodotti da questi strumenti, che la stima conteggia alla tariffa di input del modello dell'agente.

- **Fonte di verità**: `helpers/pricing.ts` — `MODEL_PRICING` per prefisso del modello (es.: `mistral-large` → input 0.5 €/M token, output 1.5 €/M token), `PRICING_SOURCES` con URL della documentazione Mistral per scraping periodico
- **Unità supportate**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversione gestita da `helpers/cost-calc.ts`
- **Catena di strumentazione**: `helpers/tracked-client.ts` (avvolge il client Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (iniezione nella risposta HTTP)
- **UI**: badge del costo per generazione (`src/partials/cost-badge-gen.html`), per fonte (`cost-badge-src.html`), totale cumulato nella dashboard (`Project.totalCost`)
- **Endpoint**: le risposte `/generate/*` e `/sources/*` arricchiscono l'oggetto restituito (`Generation` / `Source`) con `estimatedCost`, `usage` e `costBreakdown`. `POST /generate/route` aggiunge un campo `costDelta: number` per il solo costo del routing; `POST /detect-consigne` (`{consigne, costDelta}`) e la verifica di una risposta orale restituiscono anche il proprio `costDelta`. `GET /projects/:pid` restituisce il progetto arricchito di `totalCost` (somma calcolata da `costLog[]`) + la cronologia completa

### TTS (Mistral Voxtral) e voci personalizzate

- **Mistral Voxtral TTS**: **Voxtral TTS** (`voxtral-mini-tts-2603`) per impostazione predefinita, **Voxtral TTS 3** (`voxtral-mini-tts-3-0`, anteprima Mistral, voci native in più lingue) opzionale nelle Impostazioni; sintesi vocale 100% Mistral, nessuna chiave aggiuntiva necessaria. Vengono proposte solo le voci accettate dal modello scelto: Voxtral TTS rifiuta le voci aggiunte con Voxtral 3
- **Voci personalizzate**: i genitori possono creare le proprie voci tramite l'API Mistral Voices (a partire da un campione audio) e assegnarle ai ruoli conduttore/ospite — i podcast e i quiz vocali vengono quindi letti con la voce di un genitore, rendendo l'esperienza ancora più immersiva per il bambino
- Due ruoli vocali configurabili: **conduttore** (narratore principale) e **ospite** (seconda voce del podcast)
- Catalogo completo delle voci Mistral disponibile nelle impostazioni, filtrabile per lingua
- Una riproduzione (scheda, podcast, parola del dettato) viene messa in pausa quando si esce dalla relativa vista e riprende da dove si era interrotta
- L'audio della lettura ad alta voce delle flashcard viene creato al primo ascolto, poi conservato nella relativa generazione: non viene ricreato né fatturato nuovamente a ogni ritorno
- I marcatori delle fonti (`[Source N]`) non vengono letti ad alta voce

### Internazionalizzazione

- Interfaccia disponibile in 9 lingue: fr, en, es, pt, it, nl, de, hi, ar
- I prompt IA supportano 15 lingue (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Lingua configurabile per profilo

---

## Stack tecnico

| Livello | Tecnologia | Ruolo |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server e sicurezza dei tipi |
| **Backend** | Express 5.x | API REST |
| **Server di sviluppo** | Vite 8.x (Rolldown) + tsx | HMR, partial Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfaccia reattiva, TypeScript compilato da Vite |
| **Templating** | vite-plugin-handlebars | Composizione HTML tramite partial |
| **IA** | Mistral AI SDK | Chat, OCR, STT, TTS, Agents, Moderazione |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-2603` (Voxtral TTS 3 opzionale), sintesi vocale integrata |
| **Icone** | Lucide 1.x | Libreria di icone SVG |
| **Scraping web** | Readability + linkedom | Estrazione del contenuto principale delle pagine web (tecnologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Browser headless ultraleggero (Zig + V8) per le pagine JS/SPA — fallback per lo scraping |
| **Markdown** | Marked | Rendering markdown nella chat |
| **Caricamento di file** | Multer 2.x | Gestione dei moduli multipart |
| **Audio** | ffmpeg-static | Concatenazione di segmenti audio |
| **Test** | Vitest | Test unitari — copertura misurata da SonarCloud |
| **Persistenza** | File JSON | Archiviazione senza dipendenze |

---

## Riferimento dei modelli

| Modello | Utilizzo | Motivo |
|---|---|---|
| `mistral-large-latest` | Scheda, Flashcard, Podcast, Quiz, Testi da completare, Chat, Verifica quiz vocale, Agente Image, Agente Web Search, Rilevamento istruzioni | Migliore supporto multilingue + rispetto delle istruzioni |
| `mistral-ocr-4-1` (OCR 4.1, predefinito) | OCR di documenti | Testo stampato, tabelle, scrittura a mano ($4 / 1000 pagine) |
| `mistral-ocr-2512` (OCR 3, opzionale) | OCR di documenti | Selezionabile nelle Impostazioni, più economico ($2 / 1000 pagine), legge meglio la scrittura a mano |
| `voxtral-mini-2602` (Voxtral Mini Transcribe 2, predefinito) | Riconoscimento vocale (STT) | Input vocale e risposte orali del quiz vocale ($0.003 / min) |
| `voxtral-mini-transcribe-3-0` / `voxtral-small-transcribe-3-0` (Transcribe 3, opzionale, anteprima) | Riconoscimento vocale (STT) | Selezionabili nelle Impostazioni ($0.0035 / min e $0.004 / min) |
| `voxtral-mini-tts-2603` (Voxtral TTS, predefinito) | Sintesi vocale (TTS) | Podcast, quiz vocale, dettato, lettura ad alta voce ($16 / M caratteri) |
| `voxtral-mini-tts-3-0` (Voxtral TTS 3, opzionale, anteprima) | Sintesi vocale (TTS) | Selezionabile nelle Impostazioni, voci native in più lingue ($13 / M caratteri) |
| `mistral-moderation-2603` | Moderazione dei contenuti | 6 categorie bloccate per bambino/adolescente (tra cui `jailbreaking`) |
| `mistral-small-latest` | Router automatico | Analisi rapida del contenuto per decisioni di routing |

Sul telefono, le Impostazioni mostrano sotto ogni selettore l'etichetta completa del modello scelto (prezzo, «Consigliato» o «Anteprima»), che il menu chiuso troncava.

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

> **Nota**: Mistral Voxtral TTS è l'unico provider TTS — non è necessaria alcuna chiave aggiuntiva oltre a `MISTRAL_API_KEY`.

> **Chiave API inserita dall'utente**: `MISTRAL_API_KEY` è ora **facoltativa**. Se è assente, l'app si avvia comunque e invita ogni utente a inserire **la propria chiave Mistral** nell'interfaccia. La chiave viene **memorizzata nel browser** (cifrata tramite Web Crypto + IndexedDB in un contesto sicuro) e inviata a ogni richiesta — **mai salvata sul server**. Precedenza: chiave del profilo > chiave globale del browser > `MISTRAL_API_KEY` (env). Impostare `EUREKAI_REQUIRE_USER_KEY=true` obbliga ogni utente a fornire la propria chiave (la chiave env serve solo per i precaricamenti).

> **HTTPS locale (tablet/LAN)**: `localhost` è già un contesto sicuro. Per l'accesso LAN (tablet), genera un certificato locale e attiva HTTPS: il browser può così cifrare la chiave che memorizza e la chiave viene cifrata durante il transito:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variabili d'ambiente

| Variabile | Richiesta | Valore predefinito | Ruolo |
|---|---|---|---|
| `MISTRAL_API_KEY` | facoltativa | — | Chiave API Mistral (chat, OCR, STT, TTS Voxtral, agenti, moderazione). Se assente, l'utente inserisce la propria chiave nell'app (memorizzata nel browser, mai sul server) |
| `EUREKAI_REQUIRE_USER_KEY` | facoltativa | `false` | `true` → disattiva il fallback su `MISTRAL_API_KEY` per le richieste IA (ogni utente DEVE fornire la propria chiave). Utile su un'istanza esposta |
| `HTTPS_KEY` / `HTTPS_CERT` | facoltative | — | Percorsi chiave/certificato TLS (vedi `scripts/gen-cert.sh`) → Express e Vite servono in HTTPS (secure context LAN/tablet) |
| `PORT` | facoltativa | `3000` | Porta HTTP del backend Express |
| `NODE_ENV` | facoltativa | `development` | Se `production` → Express serve il frontend da `dist/` (altrimenti `public/`) |
| `SONAR_TOKEN` | facoltativa CI | — | Utilizzata solo dal workflow GitHub Actions SonarCloud |

### Test, qualità del codice e contributi

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hook Git (Husky)**: `pre-commit` esegue in sequenza `scripts/pre-commit-fast.sh` (conflitti, file di grandi dimensioni, shellcheck), `lint-staged` e poi `npm test`; `pre-push` esegue prima un controllo bloccante `npm audit` (blocca non appena una dipendenza, anche transitiva, presenta una vulnerabilità di livello `critical`, vedi `scripts/audit-verdict.mjs`) e poi `npm run security`. Ogni hook blocca il commit/push non appena una delle sue fasi fallisce.

**Strumenti esterni (facoltativi per avviare l'applicazione, indispensabili per `pretest` e `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Senza questi strumenti, `npm test` fallisce in `pretest` (lizard assente) e `npm run security` fallisce (opengrep assente). Gli hook husky bloccano quindi il commit/push.

---

## Deployment con container

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

> **`:U`**: flag Podman rootless che regola automaticamente i permessi del volume.

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
  generate.ts             — Endpoints de génération (8 types + route)
  auto-runs.ts            — Lots Auto côté serveur : lancement, analyse et étapes en arrière-plan, état, annulation
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
  keyed-slots.ts          — Places par clé (au plus 3 étapes d'Auto en même temps par clé Mistral)
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
  event-bus.ts            — Bus d'événements de génération et de lots Auto en mémoire (dispatch SSE, filet anti-uncaughtException)
  auto-run-state.ts       — Transitions d'un lot Auto (fonctions pures, appliquées par le store)
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
    generate.ts           — Déclencheurs de génération (individuel, tout, Auto)
    auto-launch.ts        — Lancement d'un Auto côté serveur, suivi pendant qu'un autre cours est affiché, annulation
    auto-runs.ts          — Auto suivis par l'onglet : état reçu du serveur, bilan affiché une seule fois, coût de l'analyse
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

> **Per gli agenti IA che contribuiscono al codice**: consultare [`CLAUDE.md`](CLAUDE.md) (regole trasversali, indice) e le regole dettagliate di [`.claude/rules/`](.claude/rules/), caricate su richiesta in base ai file letti o modificati, per il contesto architetturale dettagliato, le regole obbligatorie (codici di errore, cost tracking e prompt senza parole meta, cioè senza qualificazioni del documento come il suo tipo, perché il modello copierebbe queste parole nei propri output) e le insidie note (Lizard CCN, Opengrep, migrazione Codacy/Semgrep).

---

## Riferimento API

### Config
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/config` | Configurazione attuale |
| `PUT` | `/api/config` | Modificare la configurazione (modelli, voci, modello TTS) |
| `GET` | `/api/config/status` | Stato delle API: `mistral` (chiave Mistral impostata), `ttsAvailable` (alias di `mistral`, Mistral Voxtral è l'unico provider TTS) |
| `POST` | `/api/config/reset` | Ripristinare la configurazione predefinita |
| `GET` | `/api/config/voices` | Elencare le voci Mistral TTS (`?lang=fr` facoltativo) |
| `GET` | `/api/moderation-categories` | Categorie di moderazione disponibili + impostazioni predefinite per età |
| `POST` | `/api/providers/mistral/validate` | Validare una chiave Mistral inserita dall'utente — sempre 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), nessun fallback env |

### Profili
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/profiles` | Elencare tutti i profili |
| `POST` | `/api/profiles` | Creare un profilo |
| `PUT` | `/api/profiles/:id` | Modificare un profilo (PIN richiesto per < 15 anni; 10 PIN errati / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Eliminare un profilo + progetti a cascata `{pin?}` → `{ok, deletedProjects}` |

### Progetti
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/projects` | Elencare i progetti (`?profileId=` facoltativo) |
| `POST` | `/api/projects` | Creare un progetto `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Dettagli del progetto; `?profileId=` associa un progetto senza profilo al profilo che lo apre |
| `PUT` | `/api/projects/:pid` | Rinominare `{name}` |
| `DELETE` | `/api/projects/:pid` | Eliminare il progetto |
| `GET` | `/api/projects/:pid/events` | Flusso SSE in tempo reale (`event: generation`) delle transizioni di generazione (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Fonti
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importazione di file multipart (OCR per JPG/PNG/PDF, lettura diretta per TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Testo libero `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL o ricerca web `{query}` — restituisce un array di fonti; 422 `url_blocked` se tutti gli indirizzi vengono rifiutati (rete interna), 502 `all_sources_failed` se non è stato possibile creare alcuna fonte |
| `POST` | `/api/projects/:pid/sources/moderate` | Riprendere le moderazioni in attesa o in errore `{sourceIds?}` (al massimo 10 per chiamata, attesa ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eliminare una fonte, il relativo file importato e l'istruzione che ne dipende → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderare `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Rilevare le istruzioni di ripasso (solo fonti verificate) → `{consigne, costDelta}` |
### Generazione
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Scheda di ripasso |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz a scelta multipla (4 opzioni, una sola risposta corretta) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Testi da completare |
| `POST` | `/api/projects/:pid/generate/dictation` | Dettato (parole + frasi di esempio + regole, 1 audio TTS per parola; proposto anche dall'auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustrazione |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocale |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Ripasso adattivo `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Scheda di richiamo mirata alle domande sbagliate di un quiz `{generationId, weakQuestions}` — chiamata in parallelo a `quiz-review` dal pulsante di recupero della vista quiz |
| `POST` | `/api/projects/:pid/generate/route` | Analisi di routing (piano dei generatori da avviare) — restituisce `{plan, costDelta}` (costo del solo routing) |
| `POST` | `/api/projects/:pid/generate/auto/start` | Avviare un lotto Auto lato server `{runId, …}`: risposta 202 immediata, poi analisi e fasi in background, al massimo 3 fasi contemporaneamente per chiave Mistral; il lotto continua se la pagina viene ricaricata. 409 `auto_busy` se un lotto è già in esecuzione per questo corso |
| `POST` | `/api/projects/:pid/generate/auto/resume` | Riprendere un lotto Auto interrotto da un riavvio del server `{runId}`: le fasi interrotte ripartono con la chiave di questa richiesta, senza ripetere l'analisi (risposta 202) |
| `GET` | `/api/projects/:pid/auto-runs/:runId` | Stato di un lotto Auto: analisi, fasi ed esito di ciascuna |
| `POST` | `/api/projects/:pid/auto-runs/:runId/cancel` | Annullare un intero lotto Auto (una singola fase si annulla come una generazione) |

Tutte le route di generazione accettano `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; un `ageGroup` sconosciuto o un `lang` che non è un codice lingua valido (previsti: `fr`, `pt-BR`…) → 400 `invalid_input`, prima di qualsiasi chiamata IA. `quiz-review` e `remediation-summary` richiedono inoltre `{generationId, weakQuestions}` e riguardano le fonti del quiz originale.

### CRUD Generazioni
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Inviare le risposte al quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Inviare le risposte ai testi da completare `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Inviare le risposte al dettato `{answers}` (punteggio rigoroso lato server) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificare una risposta orale (audio + questionIndex); la risposta orale viene moderata prima della verifica (rifiuto: 400 `quiz.answerBlocked`), costo restituito in `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Lettura TTS ad alta voce (schede/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Annullare una generazione in corso (unico percorso per annullare un pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Rinominare `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Eliminare la generazione e i relativi media (audio, immagine) |

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
| **Alpine.js anziché React/Vue** | Ingombro minimo, reattività leggera con TypeScript compilato da Vite. Perfetto per un hackathon in cui la velocità conta. |
| **Persistenza in file JSON** | Zero dipendenze, avvio istantaneo. Nessun database da configurare — si avvia e si parte. |
| **Vite + Handlebars** | Il meglio dei due mondi: HMR rapido per lo sviluppo, partials HTML per l'organizzazione del codice, Tailwind JIT. |
| **Prompt centralizzati** | Tutti i prompt IA in `prompts.ts` — facili da perfezionare, testare e adattare per lingua/fascia d'età. |
| **Sistema multigenerazione** | Ogni generazione è un oggetto indipendente con il proprio ID — consente più schede, quiz, ecc. per corso. |
| **Prompt adattati per età** | 4 fasce d'età con vocabolario, complessità e tono diversi — lo stesso contenuto insegna in modo diverso a seconda di chi apprende. |
| **Funzionalità basate sugli Agents** | La generazione di immagini e la ricerca web utilizzano Agents Mistral temporanei — ciclo di vita ben gestito con pulizia automatica. |
| **Scraping intelligente di URL** | Un unico campo accetta URL e parole chiave mescolati — lo scraping degli URL avviene tramite Readability (pagine statiche) con fallback Lightpanda (pagine JS/SPA), le parole chiave attivano un Agent Mistral web_search. Ogni risultato crea una fonte indipendente. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (nessuna chiave aggiuntiva oltre a `MISTRAL_API_KEY`) — sintesi vocale integrata nella catena dei costi e nella risoluzione della voce per lingua. |

---

## Crediti e ringraziamenti

- **[Mistral AI](https://mistral.ai)** — Modelli IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reattivo leggero
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS di utilità
- **[Vite](https://vitejs.dev)** — Strumento di build frontend
- **[Lucide](https://lucide.dev)** — Libreria di icone
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Estrazione di contenuti web (tecnologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Browser headless ultraleggero per lo scraping di pagine JS/SPA
- **[Luciole](https://luciole-vision.com)** — Font progettato per i lettori ipovedenti, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opzione «Comfort di lettura» dei profili)

Avviato durante il Mistral AI Worldwide Hackathon (marzo 2026), sviluppato interamente tramite IA con [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Autore

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licenza

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Articolo tradotto dal fr all’it con gpt-6.1-sol.**
