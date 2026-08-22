// Tokenized search matcher shared by the homepage grid and header search box.
// Splits the query into words and requires every word to appear somewhere in
// the haystack (title/description), so word order and which word the user
// starts typing don't matter — "string generator" and "generator string"
// both match "Random String Generator".
export const toolMatchesQuery = (haystack: string, query: string): boolean => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const h = haystack.toLowerCase();
  return q.split(/\s+/).every((word) => h.includes(word));
};
