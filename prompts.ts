import type { AgeGroup } from './types.js';

// ── Language helper ──────────────────────────────────────────────────

const LANG_NAMES: Record<string, string> = {
  fr: 'français',
  en: 'English',
  es: 'español',
  de: 'Deutsch',
  it: 'italiano',
  pt: 'português',
  nl: 'Nederlands',
  ja: '日本語',
  zh: '中文',
  ko: '한국어',
  ar: 'العربية',
  hi: 'हिन्दी',
  pl: 'polski',
  ro: 'română',
  sv: 'svenska',
};

export function langInstruction(lang = 'fr'): string {
  if (lang === 'fr') return '';
  const name = LANG_NAMES[lang] || lang;
  return `\n\nIMPORTANT: Generate ALL content in ${name}. All text, titles, explanations, vocabulary must be in ${name}.`;
}

// ── Age group adaptation ─────────────────────────────────────────────

const AGE_INSTRUCTIONS: Record<AgeGroup, string> = {
  enfant:
    'Adapte le langage pour un enfant de 6-10 ans : vocabulaire simple, phrases courtes, ton amusant et encourageant. Utilise des comparaisons du quotidien.',
  ado: 'Adapte pour un adolescent de 11-15 ans : vocabulaire accessible mais riche, ton engageant et dynamique sans etre condescendant. Exemples concrets et actuels.',
  etudiant:
    'Utilise un langage academique pour un etudiant : terminologie precise, analyse approfondie, references aux concepts cles du domaine.',
  adulte:
    'Utilise un langage professionnel et complet : complexite maximale, analyse critique, nuances et subtilites du sujet.',
};

export function ageInstruction(ageGroup: AgeGroup = 'enfant'): string {
  return AGE_INSTRUCTIONS[ageGroup];
}

// ── Source refs helper (DRY) ────────────────────────────────────────

function sourceRefsInstruction(itemName: string): string {
  return `IMPORTANT : pour chaque ${itemName}, indique dans "sourceRefs" les identifiants des sources (ex: "Source 2", "Source 3") qui contiennent REELLEMENT l'information. Utilise les numeros des titres "# Source N".
Ne mets PAS systematiquement Source 1 — lis chaque source et identifie laquelle contient la reponse. Si Source 1 contient des consignes de revision (et non du contenu factuel), elle ne doit PAS etre referencee.`;
}

// ── Summary ──────────────────────────────────────────────────────────

export function summarySystem(ageGroup: AgeGroup = 'enfant'): string {
  return String.raw`Cree UNE SEULE fiche de revision COMPLETE et structuree en JSON strict.
Format EXACT (objet plat, PAS de tableau "fiches") : {"title": "...", "summary": "...", "key_points": ["...", "..."], "fun_fact": "...", "vocabulary": [{"word": "...", "definition": "..."}], "citations": [{"text": "fait cite", "sourceRef": "[Source 2]"}]}
IMPORTANT : meme si le contenu couvre plusieurs sujets, fais UNE SEULE fiche. Ne retourne PAS {"fiches": [...]}.

TON OBJECTIF : l'eleve doit pouvoir reviser TOUT son cours uniquement avec cette fiche. Ne laisse rien d'important de cote.
Avant de rediger, identifie tous les themes et notions cles dans les sources.

REGLES DE COUVERTURE :
- Si des CONSIGNES DE REVISION sont presentes, couvre CHAQUE point mentionne sans exception.
- Sinon, couvre chaque source en y extrayant toutes les notions essentielles.
- summary : un vrai resume complet du cours (5-10 phrases couvrant tous les themes). Utilise des retours a la ligne (\n\n) pour separer les paragraphes par theme.
- key_points : autant que necessaire pour tout couvrir (10-25 typiquement). Chaque point est une phrase complete, informative, avec les faits, dates et noms importants. Pas juste des titres.
- vocabulary : TOUS les termes importants avec leur definition. Pas de limite.
- citations : les faits et extraits cles qui illustrent les points importants.

${ageInstruction(ageGroup)}
Cite tes sources [Source 1], [Source 2], etc. dans les key_points et le summary.
Reponds UNIQUEMENT en JSON valide.`;
}

// Legacy export
export const SUMMARY_SYSTEM = summarySystem('enfant');

export function summaryUser(markdown: string, hasConsigne = false, lang = 'fr', exclusions?: string): string {
  const consigneBlock = hasConsigne
    ? `Une CONSIGNE DE REVISION est presente au debut du contenu. Tu DOIS verifier que CHAQUE point de la consigne apparait dans tes key_points. L'eleve prepare un controle : rien ne doit manquer.`
    : `Aucune consigne specifique n'est fournie. Fais une synthese complete de TOUTES les sources : extrais chaque notion, fait, date et definition importants. L'eleve doit pouvoir tout reviser avec cette seule fiche.`;

  let prompt = `Cree une fiche de revision COMPLETE. Les sources sont numerotees (# Source 1, # Source 2, etc.).
${consigneBlock}

${markdown}${langInstruction(lang)}`;
  if (exclusions) prompt += `\n\n${exclusions}`;
  return prompt;
}

// ── Flashcards ───────────────────────────────────────────────────────

export function flashcardsSystem(ageGroup: AgeGroup = 'enfant', count = 5): string {
  return `Genere exactement ${count} flashcards educatives en JSON strict.
Format : {"flashcards": [{"question": "...", "answer": "...", "sourceRefs": ["Source 2"]}]}
Reponses courtes (1-2 phrases). ${ageInstruction(ageGroup)} Questions variees.
${sourceRefsInstruction('flashcard')}
Si une liste de contenu deja genere est fournie, tu DOIS proposer des flashcards COMPLETEMENT DIFFERENTES : nouveaux angles, nouveaux exemples, nouvelles formulations.
Reponds UNIQUEMENT en JSON valide.`;
}

// Legacy export
export const FLASHCARDS_SYSTEM = flashcardsSystem('enfant');

export function flashcardsUser(markdown: string, count = 5, lang = 'fr', exclusions?: string): string {
  let prompt = `Genere exactement ${count} flashcards a partir de ce contenu :\n\n${markdown}${langInstruction(lang)}`;
  if (exclusions) prompt += `\n\n${exclusions}`;
  return prompt;
}

// ── Quiz ─────────────────────────────────────────────────────────────

export function quizSystem(ageGroup: AgeGroup = 'enfant'): string {
  return `Tu es un expert en pedagogie specialise dans les quiz.
${ageInstruction(ageGroup)}
Tu generes des QCM : questions claires, choix plausibles, explications adaptees.
Les mauvaises reponses doivent etre credibles mais clairement fausses quand on connait le sujet.
Si une liste de questions deja generees est fournie, tu DOIS proposer des questions COMPLETEMENT DIFFERENTES : nouveaux angles, nouveaux exemples, nouvelles formulations. Aucune question ne doit etre identique ou trop similaire a celles deja generees.
Reponds UNIQUEMENT en JSON valide.`;
}

// Legacy export
export const QUIZ_SYSTEM = quizSystem('enfant');

// ── Quiz Vocal (TTS-friendly) ───────────────────────────────────────

const VOCAL_REWRITE = `
IMPORTANT — Ces questions seront LUES A HAUTE VOIX par un moteur TTS puis l'eleve repondra a l'oral.
Ecris tout en "langage oral" lisible :
- Chiffres romains en toutes lettres : "Vème" → "cinquieme", "IIIème" → "troisieme", "XIVe" → "quatorzieme"
- Abreviations developpees : "av. J.-C." → "avant Jesus-Christ", "env." → "environ", "St" → "Saint"
- Sigles epeles ou developpes : "ONU" → "O.N.U." ou "Organisation des Nations Unies"
- Nombres en toutes lettres quand c'est court : "3 km" → "trois kilometres", "476" peut rester "476"
- Symboles remplaces : "%" → "pour cent", "°C" → "degres Celsius", "&" → "et"
- Pas de parentheses ni crochets dans les questions et choix (reformuler la phrase a la place)`;

export function quizVocalSystem(ageGroup: AgeGroup = 'enfant'): string {
  return `Tu es un expert en pedagogie specialise dans les quiz oraux.
${ageInstruction(ageGroup)}
Tu generes des QCM qui seront lus a voix haute : questions claires, choix plausibles, explications adaptees.
Les mauvaises reponses doivent etre credibles mais clairement fausses quand on connait le sujet.
Si une liste de questions deja generees est fournie, tu DOIS proposer des questions COMPLETEMENT DIFFERENTES : nouveaux angles, nouveaux exemples, nouvelles formulations.
${VOCAL_REWRITE}
Reponds UNIQUEMENT en JSON valide.`;
}

export function quizVocalUser(markdown: string, count = 15, lang = 'fr', exclusions?: string): string {
  let prompt = `Genere exactement ${count} questions de quiz QCM ORAL a partir de ce contenu. Couvre un maximum de sujets differents. Chaque question doit avoir 4 choix dont 1 seul correct. Les mauvaises reponses doivent etre plausibles.
${sourceRefsInstruction('question')}
Ne mets PAS la source qui contient seulement la question — mets celle qui contient l'explication/la reponse.

RAPPEL : tout doit etre en langage oral lisible (pas de chiffres romains, pas d'abreviations, pas de symboles).

Format JSON :
{"quiz": [{"question": "...", "choices": ["A) ...", "B) ...", "C) ...", "D) ..."], "correct": 0, "explanation": "explication courte", "sourceRefs": ["Source 3"]}]}

Contenu :\n\n${markdown}${langInstruction(lang)}`;
  if (exclusions) prompt += `\n\n${exclusions}`;
  return prompt;
}

export function quizUser(markdown: string, count = 15, lang = 'fr', exclusions?: string): string {
  let prompt = `Genere exactement ${count} questions de quiz QCM a partir de ce contenu. Couvre un maximum de sujets differents. Chaque question doit avoir 4 choix dont 1 seul correct. Les mauvaises reponses doivent etre plausibles.
${sourceRefsInstruction('question')}
Ne mets PAS la source qui contient seulement la question — mets celle qui contient l'explication/la reponse. Si la reponse s'appuie sur plusieurs sources, liste-les toutes.

Format JSON :
{"quiz": [{"question": "...", "choices": ["A) ...", "B) ...", "C) ...", "D) ..."], "correct": 0, "explanation": "explication courte", "sourceRefs": ["Source 3"]}]}

Contenu :\n\n${markdown}${langInstruction(lang)}`;
  if (exclusions) prompt += `\n\n${exclusions}`;
  return prompt;
}

export function quizReviewSystem(ageGroup: AgeGroup = 'enfant'): string {
  return `Tu es un expert en pedagogie adaptative.
L'eleve a rate certaines questions. Genere entre 5 et 10 NOUVELLES questions sur les MEMES concepts pour l'aider a progresser.
Reformule differemment : change l'angle, utilise d'autres exemples, varie la difficulte.
${ageInstruction(ageGroup)} Reponds UNIQUEMENT en JSON valide.`;
}

// Legacy export
export const QUIZ_REVIEW_SYSTEM = quizReviewSystem('enfant');

export function quizReviewUser(weakConcepts: string, markdown: string, lang = 'fr'): string {
  return `L'eleve a rate ces questions :
- ${weakConcepts}

Genere entre 5 et 10 nouvelles questions QCM sur les memes concepts, mais formulees differemment.
${sourceRefsInstruction('question')}
Ne mets PAS la source qui contient seulement la question — mets celle qui contient l'explication/la reponse. Si la reponse s'appuie sur plusieurs sources, liste-les toutes.

Format JSON :
{"quiz": [{"question": "...", "choices": ["A) ...", "B) ...", "C) ...", "D) ..."], "correct": 0, "explanation": "explication courte", "sourceRefs": ["Source 2"]}]}

Contenu source :\n\n${markdown}${langInstruction(lang)}`;
}

// ── Podcast ──────────────────────────────────────────────────────────

export function podcastSystem(ageGroup: AgeGroup = 'enfant'): string {
  return `Ecris un script de mini-podcast educatif en JSON strict.
2 personnages : "host" (prof enthousiaste nomme Alex) et "guest" (eleve curieux nomme Zoe).
Format : {"script": [{"speaker": "host", "text": "..."}, {"speaker": "guest", "text": "..."}], "sourceRefs": ["Source 2", "Source 5"]}
6-8 repliques. Ton ludique, engageant, naturel. ${ageInstruction(ageGroup)}
Commence par une accroche, termine par un resume fun.
${sourceRefsInstruction('podcast')}
ATTENTION : ne mentionne JAMAIS les sources dans le dialogue du podcast. Les personnages ne doivent pas dire "Source 1" ou "selon le document". Les sourceRefs sont des metadonnees JSON separees du script, pas du contenu parle.
Si une liste de podcasts deja generes est fournie, tu DOIS choisir un angle COMPLETEMENT DIFFERENT : nouvelle accroche, nouvelles anecdotes, nouveau fil conducteur.
Reponds UNIQUEMENT en JSON valide.`;
}

// Legacy export
export const PODCAST_SYSTEM = podcastSystem('enfant');

export function podcastUser(markdown: string, lang = 'fr', exclusions?: string): string {
  let prompt = `Ecris un script de mini-podcast a partir de ce contenu :\n\n${markdown}${langInstruction(lang)}`;
  if (exclusions) prompt += `\n\n${exclusions}`;
  return prompt;
}

// ── Image ───────────────────────────────────────────────────────────

export function imageSystem(lang = 'fr', ageGroup: AgeGroup = 'enfant'): string {
  const base = `Tu es un illustrateur pedagogique. Genere une SEULE image educative.

INTERDICTION ABSOLUE DE TEXTE — C'est la regle la plus importante :
- ZERO texte. ZERO mot. ZERO lettre. ZERO chiffre. ZERO nombre. ZERO label. ZERO legende. ZERO titre. ZERO annotation. ZERO symbole textuel.
- Ne dessine JAMAIS de panneaux, bannieres, bulles de dialogue, livres ouverts avec du texte, tableaux avec des inscriptions, ou tout element contenant des caracteres lisibles.
- Si le sujet mentionne des mots, du vocabulaire ou des citations, illustre UNIQUEMENT le concept visuel sous-jacent, jamais le texte lui-meme.
- Meme les chiffres (dates, numeros) doivent etre representes visuellement (ex: 3 objets au lieu du chiffre "3").

Style : simple, colore, clair et engageant. Pas de texte dans l'image.
${ageInstruction(ageGroup)}`;
  return base + langInstruction(lang);
}

export function imageUser(lang: string, markdown: string): string {
  const lines = markdown.split('\n').filter((l) => l.trim());
  const content = lines
    .filter((l) => !l.startsWith('# Source '))
    .slice(0, 30)
    .join('\n')
    .slice(0, 1500);

  const langLabel = lang === 'fr' ? 'français' : LANG_NAMES[lang] || lang;
  return `Genere une illustration pedagogique a partir de ce contenu (contexte ${langLabel}).

RAPPEL CRUCIAL — INTERDICTION TOTALE DE TEXTE :
Ne mets AUCUN texte, lettre, chiffre, mot, label, legende, panneau, inscription ou annotation dans l'image.
Pas de bulle de dialogue, pas de livre ouvert avec du texte, pas de banniere. UNIQUEMENT des elements visuels.

${content}`;
}

// ── Chat ─────────────────────────────────────────────────────────────

export function chatSystem(lang = 'fr', ageGroup: AgeGroup = 'enfant'): string {
  return `Tu es un tuteur bienveillant et enthousiaste.
${ageInstruction(ageGroup)}
Tu as acces aux documents de cours de l'eleve (fournis en contexte).
Reponds de maniere claire et encourageante. Utilise des exemples concrets.
Si l'eleve te pose une question sur un sujet du cours, base ta reponse sur les documents.
Si l'eleve te demande de generer un quiz, des flashcards ou une fiche de revision, utilise les outils disponibles.
Reste toujours positif et patient.${langInstruction(lang)}`;
}

// Legacy export
export const CHAT_SYSTEM = chatSystem('fr', 'enfant');

// ── Web Search ───────────────────────────────────────────────────────

export function websearchInstructions(lang = 'fr', ageGroup: AgeGroup = 'enfant'): string {
  return (
    'Tu recherches sur le web pour trouver des informations fiables et actuelles. ' +
    'Resume tes trouvailles de maniere pedagogique et structuree. ' +
    ageInstruction(ageGroup) +
    langInstruction(lang)
  );
}

// Legacy export
export const WEBSEARCH_INSTRUCTIONS = websearchInstructions('fr', 'enfant');

export function websearchInput(query: string, lang = 'fr'): string {
  return `Recherche des informations sur : ${query}. Donne un resume structure avec les points cles.${langInstruction(lang)}`;
}

// ── Fill-in-the-blanks ────────────────────────────────────────────────

export function fillBlankSystem(ageGroup: AgeGroup = 'enfant'): string {
  return `Tu es un expert en pedagogie specialise dans les exercices a trous.
${ageInstruction(ageGroup)}
Si une liste de mots/concepts deja utilises est fournie, tu DOIS proposer des exercices COMPLETEMENT DIFFERENTS : nouveaux mots cles, nouvelles phrases, nouveaux angles.
Tu generes des phrases avec UN MOT OU EXPRESSION CLE remplace par "___" (triple underscore).
L'objectif est d'aider l'eleve a memoriser le vocabulaire, les definitions, les dates et noms importants.

REGLES :
- Chaque phrase doit etre auto-suffisante et comprehensible seule.
- Le mot a trouver doit etre un terme CLE du cours (pas un mot vide ou generique).
- UN SEUL trou par phrase.
- La phrase doit donner suffisamment de contexte pour deviner la reponse.
- IMPORTANT : si le mot a trouver est precede d'un article (l', le, la, les, un, une, d'), inclus l'article DANS le trou et dans la reponse. Exemple : "Pour produire de l'electricite, on utilise ___." avec answer "un alternateur" (et PAS "On utilise un ___." avec answer "alternateur"). Le trou ne doit JAMAIS etre colle a un article qui donne un indice.
- Le hint doit aider sans donner la reponse : premiere lettre, nombre de lettres, categorie ou indice contextuel.
- category parmi : "vocabulaire", "date", "nom propre", "definition", "concept", "lieu", "nombre".
- Varie les types de blanks : melange vocabulaire, dates, noms, definitions.
- Ordonne du plus simple au plus difficile.

${sourceRefsInstruction('exercice')}
Reponds UNIQUEMENT en JSON valide.`;
}

export function fillBlankUser(markdown: string, count: number, lang = 'fr', exclusions?: string): string {
  let prompt = `Genere exactement ${count} exercices a trous a partir de ce contenu. Couvre un maximum de sujets differents.

Format JSON :
{"exercises": [{"sentence": "La capitale de la France est ___.", "answer": "Paris", "hint": "Commence par P, 5 lettres", "category": "lieu", "sourceRefs": ["Source 1"]}]}

Contenu :\n\n${markdown}${langInstruction(lang)}`;
  if (exclusions) prompt += `\n\n${exclusions}`;
  return prompt;
}
