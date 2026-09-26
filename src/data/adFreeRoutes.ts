/**
 * Pages that never load the AdSense script.
 *
 * The Alphabet Learning Tool is ABC flashcards for young children. Personalised
 * ads on a child-directed page are what COPPA (US) and DPDP Act s.9 (India:
 * no tracking or targeted advertising directed at children) prohibit, and
 * AdSense's per-ad child-directed tag doesn't reach Auto Ads. So the script
 * simply isn't loaded on these routes. The same URLs should also be added as
 * page exclusions in the site's Auto ads settings in AdSense, which covers a
 * visitor who navigates here from a page where the script had already loaded.
 */
export const AD_FREE_ROUTES = new Set<string>([
  '/utilities/alphabet-learning-tool',
]);

export function isAdFreeRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return AD_FREE_ROUTES.has(path);
}
