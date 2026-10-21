// Regex des marqueurs de sources (`[Source N]`, `[Source N, M]`…) que les générateurs écrivent dans
// le texte des fiches. Source unique : rendu des pastilles et sources référencées côté navigateur
// (`src/app/source-markers.ts`), texte lu à voix haute côté serveur (`helpers/tts-text.ts`).
//
// Classe niée, linéaire par construction (pas de backtracking catastrophique, règle SonarQube
// typescript:S5852) ; le contenu capturé est analysé à part (`parseInnerToNums`).
export const SOURCE_MARKER_RE = /\[Source([^\]]+)\]/gi;
