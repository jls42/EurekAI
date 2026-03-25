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
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/^[.,;:!?'"()\-]+|[.,;:!?'"()\-]+$/g, ''),
  );
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
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

export function validateFillBlankAnswer(
  childAnswer: string,
  correctAnswer: string,
): { match: boolean; distance: number } {
  const norm = normalizeAnswer(childAnswer);
  const expected = normalizeAnswer(correctAnswer);

  if (norm === expected) return { match: true, distance: 0 };

  const distance = levenshtein(norm, expected);
  const threshold = expected.length <= 5 ? 1 : expected.length <= 12 ? 2 : 3;

  return { match: distance <= threshold, distance };
}
