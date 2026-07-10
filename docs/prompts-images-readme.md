# Prompts de génération des diagrammes du README

Les 3 diagrammes du README (`public/assets/architecture-overview.webp`, `model-map.webp`, `user-journey.webp`) sont générés par IA (Gemini `gemini-3.1-flash-image` / Nano Banana 2, ratio 16:9 — script réutilisable : `scripts/generate-image.ts` du repo blog jls42-astro). Ce fichier est la **source de vérité des prompts** : quand une feature s'ajoute (nouveau générateur, nouvelle source), mettre à jour le prompt concerné ici PUIS régénérer l'image.

Règles communes :

- **Génériques par design** : ne jamais graver de nom de modèle Mistral daté (`mistral-large`, `voxtral-…`) dans une image — les modèles changent, l'image resterait fausse. Les catégories (« Large Language Model », « OCR Model ») suffisent.
- **Libellés exacts** : chaque prompt liste les labels à graver mot pour mot — vérifier l'orthographe au premier coup d'œil après génération (leçon : typo « FIll-in-the-blank » dans la v1).
- **Checklist post-génération** : les 8 générateurs présents (Summary, Flashcards, Quiz, Fill-in-the-blank, Dictation, Podcast, Illustration, Vocal quiz) + AI Tutor ; aucune typo ; **compter les cartes** (doublons et cartes vides = mode d'échec n°1 du flash) ; format 16:9 ; texte lisible à largeur 800px.
- **Export** : convertir en `.webp` (qualité ~85, ffmpeg libwebp) et remplacer le fichier au même chemin `public/assets/` — les 15 README pointent sur ces chemins, aucun besoin de les modifier.

## Leçons de génération (campagne 2026-07, gemini-3.1-flash-image)

1. **Le préambule fuit dans l'image** : la mention « for a GitHub README » s'est retrouvée gravée en titre (« Learner ty for your GitHub README »). Ne mettre dans le prompt AUCUN texte qu'on ne veut pas voir écrit. Pour les images sans titre, dire explicitement « Do NOT render any large title text ».
2. **Les numéros de liste fuient aussi** : une liste numérotée (`1. "Summary"`) produit des cartes « 1. Summary ». Énumérer en ordre de lecture, sans numéros.
3. **Le flash rate les comptes ≥ ~10 items** : doublons (« Document scanning » ×2, « Vocal quiz » ×2, « Add sources » ×2), cartes vides, labels inventés (« Disearch », « Speech routing »). Parades : « in reading order » + « every label is used exactly once, no card is empty, no label is duplicated, no label is invented » ; générer 2 candidats et choisir ; compter les cartes à la review.
4. **Édition chirurgicale > régénération** quand il ne reste qu'UN défaut : renvoyer l'image + instruction de retouche (« DELETE the duplicate card …, move X left, keep everything else EXACTLY unchanged ») au même modèle — a réparé model-map en un appel là où 4 régénérations complètes échouaient chacune différemment.

## Préambule de style (commun aux 3 prompts, à coller en tête de chacun)

```text
Wide 16:9 landscape professional product infographic, high resolution.
Premium dark SaaS aesthetic: deep navy-to-indigo gradient background, frosted-glass rounded
cards (glassmorphism) with thin light borders and soft inner glow, flat minimal white line
icons, a single clean sans-serif typeface, crisp high-contrast white text, elegant thin
gradient connector lines flowing blue to violet, sparing warm amber accents. Spacious,
grid-aligned, refined and modern — landing-page quality. NOT cluttered neon circuitry,
no printed-circuit patterns, no watermark, no brand logos, no extra text beyond the labels
specified below. Spell every label EXACTLY as written.
```

## 1. `architecture-overview.webp` — Vue d'ensemble de l'architecture

```text
[préambule de style]

Diagram: end-to-end data flow of an AI learning app, four vertical columns connected
left-to-right by flowing gradient lines.

Column header 1: "INPUT SOURCES" — four cards, each with an icon:
- camera icon, label "Photo / OCR"
- pencil icon, label "Text input"
- microphone icon, label "Voice (STT)"
- globe icon, label "Web & URL"

Column header 2: "PROCESSING" — three cards:
- shield with lock icon, label "Moderation"
- magnifying glass over document icon, label "Instruction detection"
- branching arrows icon, label "Smart routing"

Column header 3: "GENERATORS" — a tidy 3x3 grid of nine equal cards:
"Summary", "Flashcards", "Quiz", "Fill-in-the-blank", "Dictation", "Podcast",
"Illustration", "Vocal quiz", "AI Tutor"

Column header 4: "OUTPUTS" — three cards:
- speaker with sound waves icon, label "Audio (TTS)"
- database icon, label "JSON storage"
- computer screen icon, label "Interactive UI"
```

## 2. `model-map.webp` — Carte modèles → tâches

```text
[préambule de style]

Diagram: mapping between AI model families and the tasks they power, title at the top:
"AI MODEL-TO-TASK MAPPING".

Left column, six cards each with a small chip/brain icon:
"Large Language Model", "OCR Model", "Speech-to-Text Model", "Text-to-Speech Model",
"Moderation Model", "Fast Routing Model"

Right side, a tidy grid of task cards arranged in 3 columns and 5 rows (fifteen cards
total). The card labels are, in reading order:
"Summary", "Flashcards", "Quiz",
"Fill-in-the-blank", "Dictation", "Podcast script",
"Illustration", "Vocal quiz", "AI Tutor",
"Web search", "Document scanning", "Speech transcription",
"Voice synthesis", "Content filtering", "Auto-routing"
Every label is used exactly once. No card is empty, no label is duplicated, no label is
invented, and no numbers appear on the cards.

Thin elegant gradient lines connect models to their tasks:
- "Large Language Model" connects to: Summary, Flashcards, Quiz, Fill-in-the-blank,
  Dictation, Podcast script, Illustration, Vocal quiz, AI Tutor, Web search
- "OCR Model" connects to: Document scanning
- "Speech-to-Text Model" connects to: Speech transcription
- "Text-to-Speech Model" connects ONLY to: Voice synthesis (never to Speech transcription)
- "Moderation Model" connects to: Content filtering
- "Fast Routing Model" connects to: Auto-routing
Each model family and its lines share one accent hue (blue, teal, magenta, amber,
orange, green).
```

## 3. `user-journey.webp` — Parcours utilisateur

```text
[préambule de style — remplacer la 1re ligne par :
"Wide 16:9 landscape professional product infographic, high resolution. Do NOT render
any large title text at the top of the image."]

Diagram: a learner journey shown as ONE SINGLE HORIZONTAL ROW of exactly seven glowing
circular icon badges, evenly spaced, connected by small arrows. Exactly seven badges:
step 1 through step 7 below, each appearing exactly once, no duplicates, no extra badge,
no invented step:

1. person icon — title "Create a profile" — subtitle "Name, age, avatar"
2. open book icon — title "Create a course" — subtitle "One project per lesson"
3. upload cloud icon — title "Add sources" — subtitle "Photo, text, voice, web"
4. shield with check icon — title "Content moderation" — subtitle "Age-appropriate filtering"
5. sparkles icon — title "Generate materials" — subtitle "Summary, flashcards, quiz, podcast"
6. graduation cap icon — title "Study & practice" — subtitle "Quiz, dictation, AI tutor"
7. rising chart icon — title "Review & improve" — subtitle "Retry weak questions"
```
