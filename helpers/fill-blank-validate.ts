function stripArticles(text: string): string {
  return text
    .replace(/^(l'|d'|un |une |le |la |les |des |du |de la |de l')/i, '')
    .trim();
}

export function normalizeAnswer(text: string): string {
  return stripArticles(
    text
      .toLowerCase()
      .normalize('NFD')
      .replaceAll(/[\u0300-\u036f]/g, '')
      .trim()
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/^[.,;:!?'"()\-]+|[.,;:!?'"()\-]+$/g, ''), // NOSONAR(S5852) — simple char-class alternation anchored to start/end, no backtracking risk
  );
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[m][n];
}

export function validateAnswer(childAnswer: string, correctAnswer: string): boolean {
  return validateFillBlankAnswer(childAnswer, correctAnswer).match;
}

export function validateFillBlankAnswer(
  childAnswer: string,
  correctAnswer: string,
): { match: boolean; distance: number } {
  const norm = normalizeAnswer(childAnswer);
  const expected = normalizeAnswer(correctAnswer);

  if (norm === expected) return { match: true, distance: 0 };

  const distance = levenshtein(norm, expected);
  let threshold: number;
  if (expected.length <= 5) threshold = 1;
  else if (expected.length <= 12) threshold = 2;
  else threshold = 3;

  return { match: distance <= threshold, distance };
}
