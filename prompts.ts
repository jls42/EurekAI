import { logger } from './helpers/logger.js';
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
  return `Regle sur les sources (pour chaque ${itemName}) :
- Avant d'ecrire un sourceRef, verifie que cette source contient vraiment l'information.
- Ne FABRIQUE JAMAIS de reference. Ne mets pas "Source 1" par defaut sans verifier.
- Si l'information vient de plusieurs sources, LISTE-LES TOUTES dans sourceRefs (ex: ["Source 2", "Source 5"]).
- Si une source contient uniquement des consignes de revision, ne l'utilise pas comme reference.
- Format : "Source N" ou N est le numero du titre "# Source N".
- En cas de doute, mieux vaut omettre le sourceRef que d'en inventer un.`;
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
  podcast: {
    fr: "Podcast éducatif pour réviser le cours à l'oral",
    en: 'Educational podcast to review the lesson aloud',
    es: 'Podcast educativo para repasar la lección oralmente',
    de: 'Lernpodcast zur mündlichen Wiederholung des Kurses',
    it: 'Podcast educativo per ripassare il corso ad alta voce',
    pt: 'Podcast educativo para rever a aula em formato oral',
    nl: 'Educatieve podcast om de les mondeling te herhalen',
  },
  'quiz-vocal': {
    fr: 'Quiz oral pour renforcer la mémorisation active',
    en: 'Oral quiz to reinforce active recall',
    es: 'Cuestionario oral para reforzar la memorización activa',
    de: 'Mündliches Quiz zur Stärkung des aktiven Erinnerns',
    it: 'Quiz orale per rafforzare il richiamo attivo',
    pt: 'Quiz oral para reforçar a memorização ativa',
    nl: 'Mondelinge quiz om actieve herinnering te versterken',
  },
};

export function defaultReasonFor(agent: string, lang = 'fr'): string {
  const forAgent = DEFAULT_REASONS[agent];
  if (!forAgent) {
    logger.warn(
      'router',
      `no default reason for agent "${agent}" (lang=${lang}) — VALID_AGENTS/DEFAULT_REASONS desync`,
    );
    return `[${agent}]`;
  }
  return forAgent[lang] ?? forAgent.fr;
}

// ── Summary ──────────────────────────────────────────────────────────

export function summarySystem(ageGroup: AgeGroup = 'enfant'): string {
  return String.raw`Analyse les sources et produis UN SEUL objet JSON strict avec les champs ci-dessous.
Format EXACT (objet plat, PAS de tableau "fiches") : {"title": "...", "summary": "...", "key_points": ["...", "..."], "fun_fact": "...", "vocabulary": [{"word": "...", "definition": "..."}], "citations": [{"text": "fait cite", "sourceRef": "[Source 2]"}]}
IMPORTANT : meme si le contenu couvre plusieurs sujets, produis UN SEUL objet. Ne retourne PAS {"fiches": [...]}.

REGLE POUR LE CHAMP "title" :
- title = sujet du cours uniquement, court et descriptif.
- Exemples attendus : "Les volcans", "La photosynthese", "L'energie : formes et sources".
- title ne doit pas contenir de qualificatif sur le format du document.

EXEMPLE de structure attendue (valeurs minimales — le document final doit etre bien plus detaille) :
{"title":"Les volcans","summary":"Un volcan est une ouverture dans la croute terrestre par laquelle s'echappent du magma, des cendres et des gaz.","key_points":["Le magma vient du manteau terrestre [Source 1][Source 3].","Une eruption peut etre effusive ou explosive [Source 2]."],"fun_fact":"Le mont Vesuve a enseveli Pompei en 79 ap. J.-C.","vocabulary":[{"word":"magma","definition":"Roche en fusion sous la croute terrestre."}],"citations":[{"text":"Le magma remonte par la cheminee volcanique.","sourceRef":"[Source 2]"}]}

TON OBJECTIF : l'eleve doit pouvoir reviser TOUT son cours uniquement avec ce document. Ne laisse rien d'important de cote.
Avant de rediger, identifie tous les themes et notions cles dans les sources.

REGLES DE COUVERTURE :
- Si des CONSIGNES DE REVISION sont presentes, couvre CHAQUE point mentionne sans exception.
- Sinon, couvre chaque source en y extrayant toutes les notions essentielles.
- summary : un resume approfondi du cours (5-10 phrases couvrant tous les themes). Utilise des retours a la ligne (\n\n) pour separer les paragraphes par theme.
- key_points : autant que necessaire pour tout couvrir (10-25 typiquement). Chaque point est une phrase complete, informative, avec les faits, dates et noms importants. Pas juste des titres.
- vocabulary : TOUS les termes importants avec leur definition. Pas de limite.
- citations : les faits et extraits cles qui illustrent les points importants.

REGLE POUR LES REFERENCES DE SOURCES INLINE (dans summary et key_points) :
- Format canonique : un bracket par source, meme en multi-citation.
- Exemple : "Le magma vient du manteau [Source 1][Source 3]."

${ageInstruction(ageGroup)}
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
    : `Aucune consigne specifique n'est fournie. Couvre toutes les sources : extrais chaque notion, fait, date et definition importants. L'eleve doit pouvoir tout reviser avec ce seul document.`;

  let prompt = `Remplis l'objet JSON attendu a partir des sources ci-dessous. Les sources sont numerotees (# Source 1, # Source 2, etc.).
Rappel : le champ "title" nomme uniquement le sujet du cours.
${consigneBlock}

${markdown}${langInstruction(lang)}`;
  if (exclusions) prompt += `\n\n${exclusions}`;
  return prompt;
}

// ── Flashcards ───────────────────────────────────────────────────────

export function flashcardsSystem(ageGroup: AgeGroup = 'enfant', count = 5): string {
  return `Genere exactement ${count} flashcards educatives en JSON strict.
Format : {"flashcards": [{"question": "...", "answer": "...", "sourceRefs": ["Source 2"]}]}

EXEMPLE (1 item — la reponse doit etre auto-suffisante, comprehensible sans relire la question) :
{"flashcards":[{"question":"Quelle est la capitale du Bresil ?","answer":"Brasilia est la capitale du Bresil depuis 1960 ; elle a ete construite au centre du pays pour desenclaver l'interieur.","sourceRefs":["Source 1"]}]}

Reponses courtes (1-2 phrases) mais auto-suffisantes. ${ageInstruction(ageGroup)} Questions variees (definition, fait, comparaison, cause/effet).
${sourceRefsInstruction('flashcard')}
Si une liste de contenu deja genere est fournie, tu DOIS proposer des flashcards completement differentes : nouveaux angles, nouveaux exemples, nouvelles formulations.
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
{"quiz":[{"question":"Combien d'etoiles figurent sur le drapeau de l'Union europeenne ?","choices":["A) Dix","B) Douze","C) Quinze","D) Vingt-sept"],"correct":1,"explanation":"Le drapeau europeen comporte douze etoiles, un nombre symbolique qui ne change pas avec les adhesions. Vingt-sept est le nombre d'Etats membres, souvent confondu avec celui des etoiles.","sourceRefs":["Source 1"]}]}

Si une liste de questions deja generees est fournie, tu DOIS proposer des questions completement differentes : nouveaux angles, nouveaux exemples, nouvelles formulations. Aucune question ne doit etre identique ou trop similaire a celles deja generees.
${jsonInstruction()}`;
}

// ── Quiz Vocal (TTS-friendly) ───────────────────────────────────────

// vocalRewriteRules : règles linguistiques de réécriture orale paramétrées par langue.
// Périmètre : 9 langues UI supportées par Voxtral-TTS (fr, en, es, de, it, pt, nl, hi, ar).
// Les 6 langues texte hors UI (ja, zh, ko, pl, ro, sv) retombent sur fr (fallback).
// Règles conservatrices pour de/it/pt/nl/hi/ar : chiffres/ordinaux lisibles, abréviations
// usuelles, symboles. Pas de promesse "native-grade" — validation audio manuelle attendue
// avant de considérer la qualité acquise. hi/ar sortent en statut "beta audio".
// La règle "pas de parenthèses + exception labels" est DANS quizVocalSystem (cf. #6),
// pas ici, pour éviter l'injonction contradictoire.

const VOCAL_REWRITE_COMMON = `IMPORTANT — Ces questions seront LUES A HAUTE VOIX par un moteur TTS puis l'eleve repondra a l'oral.
Ecris tout en "langage oral" lisible.`;

const VOCAL_REWRITE_BY_LANG: Record<string, string> = {
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
  de: `
- Römische Zahlen ausgeschrieben: "V." → "fünfter", "III." → "dritter", "XIV." → "vierzehnter"
- Abkürzungen ausgeschrieben: "v. Chr." → "vor Christus", "n. Chr." → "nach Christus", "bzw." → "beziehungsweise", "z. B." → "zum Beispiel"
- Akronyme ausgeschrieben: "UNO" → "Vereinte Nationen", "EU" → "Europäische Union"
- Zahlen in Worten bei kurzen Angaben: "3 km" → "drei Kilometer"
- Symbole ersetzt: "%" → "Prozent", "°C" → "Grad Celsius", "&" → "und"`,
  it: `
- Numeri romani in lettere: "V" → "quinto", "III" → "terzo", "XIV" → "quattordicesimo"
- Abbreviazioni estese: "a.C." → "avanti Cristo", "d.C." → "dopo Cristo", "sig." → "signore", "dott." → "dottore"
- Sigle pronunciate o estese: "ONU" → "Organizzazione delle Nazioni Unite"
- Numeri in parole quando brevi: "3 km" → "tre chilometri"
- Simboli sostituiti: "%" → "per cento", "°C" → "gradi Celsius", "&" → "e"`,
  pt: `
- Numerais romanos por extenso: "V" → "quinto", "III" → "terceiro", "XIV" → "décimo quarto"
- Abreviaturas desenvolvidas: "a.C." → "antes de Cristo", "d.C." → "depois de Cristo", "Sr." → "Senhor", "Dr." → "Doutor"
- Siglas soletradas ou desenvolvidas: "ONU" → "Organização das Nações Unidas"
- Números por extenso quando curtos: "3 km" → "três quilómetros"
- Símbolos substituídos: "%" → "por cento", "°C" → "graus Celsius", "&" → "e"`,
  nl: `
- Romeinse cijfers uitgeschreven: "V" → "vijfde", "III" → "derde", "XIV" → "veertiende"
- Afkortingen voluit: "v. Chr." → "voor Christus", "n. Chr." → "na Christus", "bv." → "bijvoorbeeld", "dhr." → "meneer"
- Acroniemen voluit: "VN" → "Verenigde Naties", "EU" → "Europese Unie"
- Korte getallen in woorden: "3 km" → "drie kilometer"
- Symbolen vervangen: "%" → "procent", "°C" → "graden Celsius", "&" → "en"`,
  hi: `
- रोमन अंक शब्दों में: "V" → "पाँचवाँ", "III" → "तीसरा", "XIV" → "चौदहवाँ"
- संक्षिप्त रूपों का विस्तार: "ई.पू." → "ईसा पूर्व", "ई." → "ईसवी"
- लघुरूप विस्तारित: "संरा" → "संयुक्त राष्ट्र"
- छोटे अंक शब्दों में: "3 km" → "तीन किलोमीटर"
- प्रतीक बदले जाते हैं: "%" → "प्रतिशत", "°C" → "डिग्री सेल्सियस", "&" → "और"`,
  ar: `
- الأرقام الرومانية بالحروف: "V" → "الخامس"، "III" → "الثالث"، "XIV" → "الرابع عشر"
- تفكيك الاختصارات: "ق.م" → "قبل الميلاد"، "م" → "ميلادي"
- الأحرف المختصرة مفصلة: "الأمم المتحدة" بدلاً من "أ.م"
- الأرقام بالحروف عندما تكون قصيرة: "3 km" → "ثلاثة كيلومترات"
- الرموز مستبدلة: "%" → "بالمئة"، "°C" → "درجة مئوية"، "&" → "و"`,
};

export function vocalRewriteRules(lang: string): string {
  return VOCAL_REWRITE_COMMON + (VOCAL_REWRITE_BY_LANG[lang] ?? VOCAL_REWRITE_BY_LANG.fr);
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

Si une liste de questions deja generees est fournie, tu DOIS proposer des questions completement differentes : nouveaux angles, nouveaux exemples, nouvelles formulations.
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

PERSONNAGES (distincts mais naturels, sans interjections systematiques) :
- "host" = Alex : prof enthousiaste qui vulgarise avec des analogies du quotidien et pose des questions ouvertes pour faire reflechir Zoe.
- "guest" = Zoe : eleve curieuse qui pose les "pourquoi" et demande des precisions quand quelque chose n'est pas clair.
Varie les formulations — ne force pas d'interjection repetitive qui rendrait le dialogue template.

Format : {"script": [{"speaker": "host", "text": "..."}, {"speaker": "guest", "text": "..."}], "sourceRefs": ["Source 2", "Source 5"]}
6-8 repliques. Ton ludique, engageant, naturel. ${ageInstruction(ageGroup)}

STRUCTURE :
- Accroche : Alex pose le sujet de maniere intrigante ("Tu savais que...?" ou "Imagine un instant...").
- Developpement : alternance Alex/Zoe avec progression logique. Zoe relance par des questions, Alex repond avec des exemples concrets.
- Conclusion : resume fun ou anecdote marquante a retenir.

${sourceRefsInstruction('podcast')}
ATTENTION : ne mentionne JAMAIS les sources dans le dialogue du podcast. Les personnages ne doivent pas dire "Source 1" ou "selon le document". Les sourceRefs sont des metadonnees JSON separees du script, pas du contenu parle.
Si une liste de podcasts deja generes est fournie, tu DOIS choisir un angle completement different : nouvelle accroche, nouvelles anecdotes, nouveau fil conducteur.
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
- Par defaut, reponds clairement et directement a la question de l'eleve, avec un exemple concret si utile.
- Quand une question de relance aide vraiment la comprehension (eleve qui ferait mieux de chercher dans ses documents, concept deja aborde), tu peux poser une question courte avant de repondre. Reste optionnel, pas systematique.
- Quand tu donnes une reponse de fond, cite la source ("D'apres ta source 1, ...").
- Utilise des exemples concrets et des analogies du quotidien.
- Reference les echanges precedents de la conversation pour creer une continuite.

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
- Pour un vrai cours, une lecon ou une matiere de revision non triviale, vise en pratique 4-7 agents.
- 1-2 agents sont acceptables UNIQUEMENT si la matiere est vraiment tres courte, repetitive ou pauvre (ex: une seule definition isolee).
- Maximum 7 agents pour un contenu riche et varie.
- Privilegie la PERTINENCE pedagogique sur la QUANTITE : mieux vaut 2 agents bien choisis que 5 agents qui forcent.

CRITERES STRATEGIQUES :
- Contenu court ou simple : prefere summary + 1 agent, MAIS n'exclus podcast et quiz-vocal que si la matiere est vraiment trop pauvre pour produire un audio utile.
- Contenu pedagogique standard (cours, chapitre, lecon) : envisage un format audio si le contenu s'y prete (narratif, explicatif, facilement recitable a voix haute).
- Contenu riche en dates, noms propres, vocabulaire : prioriser fill-blank, flashcards et quiz-vocal.
- Contenu explicatif, factuel ou facilement recitable a voix haute : prioriser quiz-vocal.
- Contenu narratif, biographique, historique ou avec progression logique : prioriser podcast.
- Contenu visuel ou spatial (geographie, schema, anatomie) : prioriser image.
- Contenu argumentatif ou conceptuel : prioriser quiz, summary, podcast et quiz-vocal.

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
      'Feedback court (1-2 phrases). Si juste, reponse clairement positive et enthousiaste (par ex. "Bravo !", "Super !" ou equivalent). Si faux, reponse claire et rassurante qui donne la bonne reponse, sans ambiguite.',
    ado: 'Feedback court et dynamique (1-2 phrases). Si juste, validation nette et positive (par ex. "Bien joué !", "C\'est ça !" ou equivalent). Si faux, correction claire + indice court.',
    etudiant:
      'Feedback concis et informatif (1-2 phrases). Si juste, confirmation nette (par ex. "Correct.", "Exact." ou equivalent). Si faux, rectification + rappel de la bonne reponse.',
    adulte:
      'Feedback factuel et neutre (1 phrase). Confirmation claire si juste, rectification precise si faux.',
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
- La reponse est soit correcte, soit fausse — binaire, pas d'entre-deux. N'utilise jamais de formulation qui suggere une quasi-reussite.
- Les variantes orthographiques d'un meme mot (ex: Wisigoths/Visigoths) ne sont PAS des erreurs.

Reponds en JSON strict: {"correct": true/false, "feedback": "..."}${langInstruction(lang)}`;
}

// ── Fill-in-the-blanks ────────────────────────────────────────────────

export function fillBlankSystem(ageGroup: AgeGroup = 'enfant'): string {
  return `Tu es un expert en pedagogie specialise dans les exercices a trous.
${ageInstruction(ageGroup)}
Si une liste de mots/concepts deja utilises est fournie, tu DOIS proposer des exercices completement differents : nouveaux mots cles, nouvelles phrases, nouveaux angles.
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
