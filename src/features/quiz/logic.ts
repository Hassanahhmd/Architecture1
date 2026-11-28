/** Scoring copied exactly from the original script: count the answers, then
 *  luxury by default, minimal if it ties or beats both others, then modern. */
export type Style = "luxury" | "minimal" | "modern";

export function scoreQuiz(answers: Style[]): Style {
  const counts: Record<Style, number> = { luxury: 0, minimal: 0, modern: 0 };
  for (const answer of answers) counts[answer] += 1;
  if (counts.minimal >= counts.luxury && counts.minimal >= counts.modern) return "minimal";
  if (counts.modern >= counts.luxury && counts.modern >= counts.minimal) return "modern";
  return "luxury";
}
