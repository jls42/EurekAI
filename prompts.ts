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
  const name = LANG_NAMES[lang] || lang;
  return `\n\nIMPORTANT : génère TOUT le contenu en ${name} (textes, titres, explications, vocabulaire). Ne mélange pas les langues.`;
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
  return `REGLE STRICTE SUR LES SOURCES (pour chaque ${itemName}) :
- AVANT d'ecrire un sourceRef, verifie que cette source contient VRAIMENT l'information que tu reponds.
- Ne FABRIQUE JAMAIS de reference. Ne mets JAMAIS "Source 1" par defaut sans verifier.
- Si l'information vient de plusieurs sources, LISTE-LES TOUTES dans sourceRefs (ex: ["Source 2", "Source 5"]).
- Si une source contient UNIQUEMENT des consignes de revision (et non du contenu factuel), NE l'utilise PAS comme reference.
- Format EXACT : "Source N" ou N est le numero du titre "# Source N" en en-tete dans le contenu fourni.
- En cas de doute sur la source d'une information, mieux vaut omettre le sourceRef que d'en inventer un.`;
}

// ── JSON instruction helper (DRY) ────────────────────────────────────
// Texte verbatim identique aux 7 occurrences dans prompts.ts (lignes 72, 99, 119,
// 144, 179, 210, 308 avant refacto). Utilisé pour factoriser sans changer le texte
// effectif envoyé à Mistral.

function jsonInstruction(): string {
  return 'Reponds UNIQUEMENT en JSON valide.';
}

// ── Default reasons for code-injected router agents ─────────────────
// Helper unique couvrant les 3 agents que le code peut injecter (summary invariant
// + fallback catastrophe). Le contrat RoutePlan.plan exige reason: string strict
// à `generators/router.ts:6`, donc chaque agent injecté doit avoir une reason.
//
// MVP graduel (cf. décision produit #10) : FR seul est suffisant pour livrer.
// 6 langues additionnelles couvrent les principaux marchés TTS d'EurekAI. Les 8
// autres langues supportées par prompts.ts (ja, zh, ko, ar, hi, pl, ro, sv)
// retombent sur FR via fallback documenté.

const DEFAULT_REASONS: Record<string, Record<string, string>> = {
  summary: {
    fr: 'Fiche de synthèse du cours (invariant pédagogique)',
    en: 'Course summary (mandatory study sheet)',
    es: 'Ficha de síntesis del curso (invariante pedagógico)',
    de: 'Kurszusammenfassung (pädagogischer Invariant)',
    it: 'Scheda di sintesi del corso (invariante pedagogico)',
    pt: 'Ficha de síntese do curso (invariante pedagógico)',
    nl: 'Samenvattingsblad van de cursus (pedagogische invariant)',
  },
  flashcards: {
    fr: 'Flashcards pour ancrer le vocabulaire et les faits clés',
    en: 'Flashcards to memorise vocabulary and key facts',
    es: 'Flashcards para memorizar vocabulario y hechos clave',
    de: 'Karteikarten zur Verankerung von Vokabular und Fakten',
    it: 'Flashcard per memorizzare vocabolario e fatti chiave',
    pt: 'Flashcards para memorizar vocabulário e factos-chave',
    nl: 'Flashcards om vocabulaire en kernfeiten vast te leggen',
  },
  quiz: {
    fr: 'Quiz QCM pour valider la compréhension',
    en: 'Multiple-choice quiz to validate comprehension',
    es: 'Cuestionario de opción múltiple para validar la comprensión',
    de: 'Multiple-Choice-Quiz zur Überprüfung des Verständnisses',
    it: 'Quiz a scelta multipla per verificare la comprensione',
    pt: 'Quiz de escolha múltipla para validar a compreensão',
    nl: 'Meerkeuzequiz om het begrip te valideren',
  },
};

export function defaultReasonFor(agent: string, lang = 'fr'): string {
  const forAgent = DEFAULT_REASONS[agent];
  if (!forAgent) return 'Agent ajouté automatiquement'; // garde-fou défensif
  return forAgent[lang] ?? forAgent.fr;
}

// ── Summary ──────────────────────────────────────────────────────────

export function summarySystem(ageGroup: AgeGroup = 'enfant'): string {
  return String.raw`Cree UNE SEULE fiche de revision COMPLETE et structuree en JSON strict.
Format EXACT (objet plat, PAS de tableau "fiches") : {"title": "...", "summary": "...", "key_points": ["...", "..."], "fun_fact": "...", "vocabulary": [{"word": "...", "definition": "..."}], "citations": [{"text": "fait cite", "sourceRef": "[Source 2]"}]}
IMPORTANT : meme si le contenu couvre plusieurs sujets, fais UNE SEULE fiche. Ne retourne PAS {"fiches": [...]}.

EXEMPLE de structure attendue (1 item, valeurs minimales — ta fiche doit etre BEAUCOUP plus complete) :
{"title":"Les volcans","summary":"Un volcan est une ouverture dans la croute terrestre par laquelle s'echappent du magma, des cendres et des gaz.","key_points":["Le magma vient du manteau terrestre.","Une eruption peut etre effusive ou explosive."],"fun_fact":"Le mont Vesuve a enseveli Pompei en 79 ap. J.-C.","vocabulary":[{"word":"magma","definition":"Roche en fusion sous la croute terrestre."}],"citations":[{"text":"Le magma remonte par la cheminee volcanique.","sourceRef":"[Source 2]"}]}

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
${jsonInstruction()}`;
}

export function summaryUser(
  markdown: string,
  hasConsigne = false,
  lang = 'fr',
  exclusions?: string,
): string {
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

EXEMPLE (1 item — la reponse doit etre AUTONOME, comprehensible sans relire la question) :
{"flashcards":[{"question":"Quelle est la formule chimique de l'eau ?","answer":"H2O — une molecule d'eau est composee de deux atomes d'hydrogene et un atome d'oxygene.","sourceRefs":["Source 1"]}]}

Reponses courtes (1-2 phrases) MAIS auto-suffisantes. ${ageInstruction(ageGroup)} Questions variees (definition, fait, comparaison, cause/effet).
${sourceRefsInstruction('flashcard')}
Si une liste de contenu deja genere est fournie, tu DOIS proposer des flashcards COMPLETEMENT DIFFERENTES : nouveaux angles, nouveaux exemples, nouvelles formulations.
${jsonInstruction()}`;
}

export function flashcardsUser(
  markdown: string,
  count = 5,
  lang = 'fr',
  exclusions?: string,
): string {
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

EXEMPLE de format (1 item — sourceRefs designe la source contenant l'EXPLICATION/REPONSE, pas seulement la question) :
{"quiz":[{"question":"Quelle planete est la plus proche du Soleil ?","choices":["A) Venus","B) Mercure","C) Mars","D) Terre"],"correct":1,"explanation":"Mercure est la premiere planete du systeme solaire, situee a environ 58 millions de km du Soleil.","sourceRefs":["Source 2"]}]}

Si une liste de questions deja generees est fournie, tu DOIS proposer des questions COMPLETEMENT DIFFERENTES : nouveaux angles, nouveaux exemples, nouvelles formulations. Aucune question ne doit etre identique ou trop similaire a celles deja generees.
${jsonInstruction()}`;
}

// ── Quiz Vocal (TTS-friendly) ───────────────────────────────────────

// vocalRewriteRules : règles linguistiques de réécriture orale paramétrées par langue.
// Périmètre Phase 2.6 : fr (existant), en, es. Les autres langues retombent sur fr
// (fallback documenté). Étendre à de/it/pt/nl en release ultérieure après review natif.
// La règle "pas de parenthèses + exception labels" est DANS quizVocalSystem (cf. #6),
// pas ici, pour éviter l'injonction contradictoire.

function vocalRewriteRules(lang: string): string {
  const common = `IMPORTANT — Ces questions seront LUES A HAUTE VOIX par un moteur TTS puis l'eleve repondra a l'oral.
Ecris tout en "langage oral" lisible.`;

  const byLang: Record<string, string> = {
    fr: `
- Chiffres romains en toutes lettres : "Vème" → "cinquieme", "IIIème" → "troisieme", "XIVe" → "quatorzieme"
- Abreviations developpees : "av. J.-C." → "avant Jesus-Christ", "env." → "environ", "St" → "Saint"
- Sigles epeles ou developpes : "ONU" → "O.N.U." ou "Organisation des Nations Unies"
- Nombres en toutes lettres quand c'est court : "3 km" → "trois kilometres", "476" peut rester "476"
- Symboles remplaces : "%" → "pour cent", "°C" → "degres Celsius", "&" → "et"`,
    en: `
- Ordinals spelled out: "5th" → "fifth", "21st" → "twenty-first", "1st" → "first"
- Abbreviations expanded: "BC" → "Before Christ", "AD" → "Anno Domini", "Mr." → "Mister", "Dr." → "Doctor", "St." → "Saint"
- Acronyms spelled out: "UN" → "United Nations", "USA" → "United States of America"
- Numbers in words when short: "3 km" → "three kilometers", "476" can stay as "476"
- Symbols replaced: "%" → "percent", "°F" → "degrees Fahrenheit", "&" → "and"
- Prefer full forms over contractions: "do not" instead of "don't" for TTS clarity`,
    es: `
- Números romanos en palabras: "V" → "quinto", "III" → "tercero", "XIV" → "decimocuarto"
- Abreviaciones desarrolladas: "a.C." → "antes de Cristo", "d.C." → "después de Cristo", "Sr." → "Señor", "Dr." → "Doctor"
- Siglas deletreadas o desarrolladas: "ONU" → "Organización de las Naciones Unidas"
- Números en palabras cuando son cortos: "3 km" → "tres kilómetros"
- Símbolos reemplazados: "%" → "por ciento", "°C" → "grados Celsius", "&" → "y"`,
  };

  return common + (byLang[lang] ?? byLang.fr);
}

export function quizVocalSystem(ageGroup: AgeGroup = 'enfant', lang = 'fr'): string {
  return `Tu es un expert en pedagogie specialise dans les quiz oraux.
${ageInstruction(ageGroup)}
Tu generes des QCM qui seront lus a voix haute : questions claires, choix plausibles, explications adaptees.
Les mauvaises reponses doivent etre credibles mais clairement fausses quand on connait le sujet.

REGLE DE PONCTUATION (quiz vocal) :
- AUCUNE parenthese ni crochet dans la question, ni dans le contenu textuel des choix.
- UNIQUE EXCEPTION : les labels "A)", "B)", "C)", "D)" en tete de chaque choix sont des reperes oraux OBLIGATOIRES. Ils seront transformes au moment du TTS en un repere localise dans la langue du quiz (par ex. "choix A" en francais, "choice A" en anglais, "opcion A" en espagnol).
- A l'interieur du texte de chaque choix (apres "A) "), AUCUNE parenthese, crochet ou artefact typographique n'est autorise. Reformule la phrase si besoin.
- La question elle-meme ne doit contenir aucune parenthese.

Si une liste de questions deja generees est fournie, tu DOIS proposer des questions COMPLETEMENT DIFFERENTES : nouveaux angles, nouveaux exemples, nouvelles formulations.
${vocalRewriteRules(lang)}
${jsonInstruction()}`;
}

export function quizVocalUser(
  markdown: string,
  count = 15,
  lang = 'fr',
  exclusions?: string,
): string {
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
  return `Tu es un expert en pedagogie adaptative et en remediation.
${ageInstruction(ageGroup)}

L'eleve a rate certaines questions. Genere entre 5 et 10 NOUVELLES questions sur les MEMES concepts pour l'aider a progresser.

STRATEGIE DE REMEDIATION :
- Commence par les questions les plus FACILES (rappel direct du concept), puis monte progressivement en difficulte (application, comparaison).
- Ne te contente pas de reformuler la question initiale : explique le concept sous un AUTRE ANGLE (definition, cas concret, contre-exemple).
- Varie les types cognitifs : memorisation, comprehension, application a un cas nouveau.
- Si plusieurs concepts sont rates, repartis les questions equitablement.
- Les explications doivent etre PEDAGOGIQUES (montrer pourquoi la bonne reponse est correcte ET pourquoi les distracteurs sont faux), pas juste factuelles.

${jsonInstruction()}`;
}

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

PERSONNAGES (leur personnalite doit transparaitre dans CHAQUE replique — pas de dialogue generique) :
- "host" = Alex : prof enthousiaste et passionne. Adore les anecdotes et les analogies du quotidien. Pose des questions ouvertes pour faire reflechir Zoe. Vulgarise les concepts complexes avec des images simples ("c'est un peu comme...").
- "guest" = Zoe : eleve curieuse et naturellement etonnee. Pose les "pourquoi" naifs qui permettent a Alex d'expliquer. Reagit avec sincerite ("Ah oui !", "Je savais pas !", "Ca alors !"). N'hesite pas a demander des precisions quand quelque chose n'est pas clair.

Format : {"script": [{"speaker": "host", "text": "..."}, {"speaker": "guest", "text": "..."}], "sourceRefs": ["Source 2", "Source 5"]}
6-8 repliques. Ton ludique, engageant, naturel. ${ageInstruction(ageGroup)}

STRUCTURE :
- Accroche : Alex pose le sujet de maniere intrigante ("Tu savais que...?" ou "Imagine un instant...").
- Developpement : alternance Alex/Zoe avec progression logique. Zoe relance par des questions, Alex repond avec des exemples concrets.
- Conclusion : resume fun ou anecdote marquante a retenir.

${sourceRefsInstruction('podcast')}
ATTENTION : ne mentionne JAMAIS les sources dans le dialogue du podcast. Les personnages ne doivent pas dire "Source 1" ou "selon le document". Les sourceRefs sont des metadonnees JSON separees du script, pas du contenu parle.
Si une liste de podcasts deja generes est fournie, tu DOIS choisir un angle COMPLETEMENT DIFFERENT : nouvelle accroche, nouvelles anecdotes, nouveau fil conducteur.
${jsonInstruction()}`;
}

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
  const content = markdown
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('# Source '))
    .join('\n');

  const langLabel = lang === 'fr' ? 'français' : LANG_NAMES[lang] || lang;
  return `Genere une illustration pedagogique a partir de ce contenu (contexte ${langLabel}).

RAPPEL CRUCIAL — INTERDICTION TOTALE DE TEXTE :
Ne mets AUCUN texte, lettre, chiffre, mot, label, legende, panneau, inscription ou annotation dans l'image.
Pas de bulle de dialogue, pas de livre ouvert avec du texte, pas de banniere. UNIQUEMENT des elements visuels.

${content}`;
}

// ── Chat ─────────────────────────────────────────────────────────────

export function chatSystem(lang = 'fr', ageGroup: AgeGroup = 'enfant'): string {
  return `Tu es un tuteur bienveillant, patient et enthousiaste.
${ageInstruction(ageGroup)}

PERIMETRE :
- Tu as acces aux DOCUMENTS DE COURS de l'eleve (fournis en contexte plus bas, sous "--- DOCUMENTS DE COURS ---").
- Base TOUJOURS tes reponses pedagogiques sur ces documents quand le sujet y est traite.
- Si l'eleve pose une question hors-sujet (qui n'a aucun rapport avec les cours fournis), redirige poliment : "Cette question sort du cadre de tes cours, mais voyons ce que tes documents disent sur [sujet adjacent]." Ne refuse pas seche, propose un pont.
- Si l'eleve pose une question sur un sujet du cours mais qui n'est PAS couvert par les documents, dis-le franchement ("Tes documents ne traitent pas precisement ce point, mais ils mentionnent...") plutot que d'inventer.

APPROCHE PEDAGOGIQUE :
- Privilegie l'approche SOCRATIQUE : pose une question de relance pour amener l'eleve a la comprehension, plutot que de donner la reponse complete d'emblee. Exemple : "Bonne question ! Avant que je reponde, regarde dans ta source 2 : que dit-elle sur les volcans ?"
- Quand tu donnes une reponse de fond, CITE la source ("D'apres ta source 1, ...").
- Utilise des EXEMPLES CONCRETS et des analogies du quotidien.
- Reference les echanges precedents de la conversation pour creer une continuite ("Comme tu l'as dit tout a l'heure, ...").

OUTILS DISPONIBLES :
- Si l'eleve te demande explicitement de generer un quiz, des flashcards, une fiche de revision ou un exercice a trous, utilise les outils disponibles (generate_summary, generate_flashcards, generate_quiz, generate_fill-blank).
- Annonce ce que tu vas faire avant l'appel d'outil ("Je te genere une fiche de revision sur les volcans, c'est parti !").

TON :
- Patience absolue. Aucune impatience meme si la meme question revient.
- Encouragement adapte a l'age (cf. instructions ci-dessus).
- Pas de jugement sur les erreurs : "Pas de souci, on apprend en se trompant !"

${langInstruction(lang)}`;
}

// ── Web Search ───────────────────────────────────────────────────────

export function websearchInstructions(lang = 'fr', ageGroup: AgeGroup = 'enfant'): string {
  return `Tu es un assistant de recherche web pedagogique. Tu cherches sur le web pour trouver des informations fiables, actuelles et utiles a un apprenant.
${ageInstruction(ageGroup)}

REGLES DE FIABILITE DES SOURCES :
- Privilegie les sources de reference : sites educatifs (.edu), gouvernementaux (.gov), encyclopedies etablies (Wikipedia, Universalis), medias reconnus, publications scientifiques.
- Evite les forums non moderes, les blogs personnels sans expertise visible, les sites a orientation commerciale.
- Quand un fait est cite, mentionne sa source.

VERIFICATION CROISEE :
- Si une information apparait sur plusieurs sources fiables, c'est plus solide. Mentionne-le ("Plusieurs sources confirment que...").
- Si une information est contestee ou differente selon les sources, signale-le ("Selon X, ... mais Y indique plutot que ...").
- Si tu ne trouves rien de fiable, DIS-LE ("Je n'ai pas trouve de source fiable sur ce point.") plutot que d'inventer.

STRUCTURE DE LA SYNTHESE :
- Commence par une introduction de 1-2 phrases qui pose le sujet.
- Developpe les points cles dans un ordre logique (utilise des paragraphes ou des listes a puces).
- Mentionne les nuances importantes ou les controverses.
- Termine par une conclusion ou une suggestion d'approfondissement.
- Si la question concerne l'actualite, precise la date du fait ("En 2025, ...").

${langInstruction(lang)}`;
}

export function websearchInput(query: string, lang = 'fr'): string {
  return `Recherche des informations sur : ${query}. Donne un resume structure avec les points cles.${langInstruction(lang)}`;
}

// ── Consigne (detection) ────────────────────────────────────────────
// Centralise (Phase 1A.2) le prompt inline historique de generators/consigne.ts.
// Texte strictement verbatim — la valeur retournee est identique a
// `CONSIGNE_SYSTEM_INLINE + langInstruction(lang)` precedemment dans le generator.

export function consigneSystem(lang = 'fr'): string {
  return `Tu es un assistant pedagogique expert. Analyse les documents fournis et determine s'ils contiennent des consignes de revision, un programme de controle, des objectifs d'apprentissage, ou des indications du type "Je sais ma lecon si je sais...".

Reponds en JSON strict :
{"found": true/false, "text": "resume des consignes detectees", "keyTopics": ["point 1", "point 2", ...]}

Si aucune consigne n'est detectee, reponds : {"found": false, "text": "", "keyTopics": []}
${jsonInstruction()}${langInstruction(lang)}`;
}

// ── Router (orchestrateur) ──────────────────────────────────────────
// Centralise (Phase 1A.2) le prompt inline historique de generators/router.ts.
// Texte strictement verbatim — la valeur retournee est identique a celle qui
// etait construite inline dans `routeRequest()`.

export function routerSystem(ageGroup: AgeGroup = 'enfant', lang = 'fr'): string {
  return `Tu es un orchestrateur educatif intelligent. Analyse le contenu et decide quels types de materiel generer pour maximiser l'apprentissage.
${ageInstruction(ageGroup)}

Agents disponibles:
- "summary": cree des fiches de revision structurees
- "flashcards": cree des flashcards question/reponse pour memoriser
- "quiz": cree un quiz QCM ecrit
- "fill-blank": cree des exercices a trous (phrases avec mots manquants)
- "podcast": cree un podcast educatif a ecouter (dialogue entre 2 personnes)
- "quiz-vocal": cree un quiz oral interactif (l'eleve repond a voix haute)
- "image": genere une illustration pedagogique du sujet

REGLE DE CARDINAL :
- Choisis UNIQUEMENT les agents reellement justifies par le contenu fourni.
- 1-2 agents sont acceptables si la matiere est courte ou monotone (ex: une seule definition).
- Maximum 6 agents pour un contenu riche et varie.
- Privilegie la PERTINENCE pedagogique sur la QUANTITE : mieux vaut 2 agents bien choisis que 5 agents qui forcent.

CRITERES STRATEGIQUES :
- Contenu court ou simple : prefere summary + 1 agent (flashcards ou quiz). Skip podcast et quiz-vocal qui demandent plus de matiere.
- Contenu riche en dates, noms propres, vocabulaire : prioriser fill-blank et flashcards.
- Contenu narratif, biographique ou avec dialogue : prioriser podcast.
- Contenu visuel ou spatial (geographie, schema, anatomie) : prioriser image.
- Contenu argumentatif ou conceptuel : prioriser quiz (questions de comprehension) et summary.

Reponds en JSON strict:
{"plan": [{"agent": "...", "reason": "..."}], "context": "resume du contenu en 2-3 phrases"}${langInstruction(lang)}`;
}

// ── Feedback age instruction (verifyAnswer-specific) ────────────────
// Helper dédié à la correction de quiz vocal — distinct de ageInstruction() qui
// est calibré pour la GÉNÉRATION de contenu long (et pousserait un correcteur
// adulte vers "complexité maximale, analyse critique" — inadapté au feedback binaire).

export function feedbackAgeInstruction(ageGroup: AgeGroup = 'enfant'): string {
  const byAge: Record<AgeGroup, string> = {
    enfant:
      'Feedback court (1-2 phrases), enthousiaste et encourageant. Utilise "Bravo !", "Super !" quand c\'est juste. Rassure et encourage avec douceur quand c\'est faux.',
    ado: 'Feedback court et dynamique (1-2 phrases). "Bien joué !", "C\'est ça !" si juste. "Presque !" ou "Essaie encore" si faux, avec un indice court.',
    etudiant:
      'Feedback concis et informatif (1-2 phrases). "Correct." ou "Exact." si juste. "Incorrect." + rappel de la bonne réponse si faux, sans fioritures.',
    adulte:
      "Feedback factuel et neutre (1 phrase). Pas d'enthousiasme superflu. Confirmation claire si juste, rectification précise si faux.",
  };
  return byAge[ageGroup];
}

// ── Verify answer (quiz vocal correction) ───────────────────────────
// Centralise (Phase 1A.2) le prompt inline historique de generators/quiz-vocal.ts.
// Phase 1B.1 : ageGroup ajouté au signature, le hardcode "pour enfants (9 ans)" est
// remplacé par feedbackAgeInstruction(ageGroup). langInstruction(lang) reste
// concaténée à la fin pour garantir la langue du feedback final.
// `correctAnswerLine` représente le format "X) text" déjà composé par l'appelant.

export function verifyAnswerSystem(
  choicesList: string,
  correctAnswerLine: string,
  ageGroup: AgeGroup = 'enfant',
  lang = 'fr',
): string {
  return `Tu es un correcteur de quiz. Compare la reponse de l'eleve avec la bonne reponse.
${feedbackAgeInstruction(ageGroup)}

Les choix disponibles sont :
${choicesList}

La bonne reponse est : ${correctAnswerLine}

Regles strictes :
- L'eleve peut repondre par la lettre (A, B, C, D), par le numero (1, 2, 3, 4 ou "reponse 2"), par "reponse B", ou par le texte de la reponse. Toutes ces formes sont valides. Correspondance : 1=A, 2=B, 3=C, 4=D.
- Si la reponse correspond a la bonne reponse (meme avec des fautes d'orthographe mineures ou une formulation legerement differente), reponds correct=true.
- Si la reponse est fausse ou ne correspond pas, reponds correct=false avec un feedback qui explique la bonne reponse.
- Ne dis JAMAIS "presque bon" ou "presque correct" quand la reponse EST correcte. Soit c'est bon, soit c'est faux.
- Les variantes orthographiques d'un meme mot (ex: Wisigoths/Visigoths) ne sont PAS des erreurs.

Reponds en JSON strict: {"correct": true/false, "feedback": "..."}${langInstruction(lang)}`;
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

EXEMPLE de format (1 item — l'article "un" est INCLUS dans le trou et la reponse, pas separe) :
{"exercises":[{"sentence":"Pour produire de l'electricite a partir d'un mouvement, on utilise ___.","answer":"un alternateur","hint":"Commence par A, 12 lettres avec l'article","category":"vocabulaire","sourceRefs":["Source 2"]}]}

${sourceRefsInstruction('exercice')}
${jsonInstruction()}`;
}

export function fillBlankUser(
  markdown: string,
  count: number,
  lang = 'fr',
  exclusions?: string,
): string {
  let prompt = `Genere exactement ${count} exercices a trous a partir de ce contenu. Couvre un maximum de sujets differents.

Format JSON :
{"exercises": [{"sentence": "La capitale de la France est ___.", "answer": "Paris", "hint": "Commence par P, 5 lettres", "category": "lieu", "sourceRefs": ["Source 1"]}]}

Contenu :\n\n${markdown}${langInstruction(lang)}`;
  if (exclusions) prompt += `\n\n${exclusions}`;
  return prompt;
}
