import { getToolOrNull } from './toolRegistry';

/**
 * Curated tools surfaced in the header mega-menu and mobile drawer.
 *
 * Why this file exists: the nav used to render *every* tool in a group --
 * up to 336 links in a single dropdown, producing a menu ~5,760px wide that
 * ran off the side of the screen. It also put ~1,350 identical links in the
 * header of all ~1,350 pages, which spreads internal link equity thin and
 * buries the category hubs that should be collecting it.
 *
 * Nothing is orphaned by curating this list: every category hub page
 * (src/components/CategoryDashboard.tsx) still lists its full tool inventory,
 * and each menu links straight to its hub, so crawlers reach everything in
 * one extra hop while the hubs accumulate the internal links.
 *
 * Selection came from three real signals rather than guesswork:
 *  - Search Console query data (measured impressions/position), which is why
 *    tip-screen, readability, dividend-yield, markup, team-name-generator,
 *    lorem-ipsum, roman-numeral, character-counter, hex-to-rgb,
 *    wheel-of-fortune, what-is-my-ip, body-fat, keyword-density,
 *    time-duration, average and VAT are here;
 *  - the 15 links already hand-curated in src/components/Footer.tsx
 *    (EMI, SIP, income tax, GST, PPF, gold, BMI, BMR, TDEE, age, date,
 *    percentage, notepad);
 *  - the 75 hand-written guides in src/data/tool-blogs.handwritten.ts, which
 *    mark the tools that got real editorial investment.
 *
 * Routes are validated against the registry at module load, so a typo or a
 * renamed tool quietly drops out of the menu instead of throwing at render.
 */

/** Nav group label -> curated tool routes, in display order. */
const CURATED_ROUTES: Record<string, string[]> = {
  'AI Tools': [
    '/ai/llm-cost-calculator',
    '/ai/gpu-cost-calculator',
  ],
  'Finance & Health': [
    '/finance/emi-calculator',
    '/finance/income-tax-calculator',
    '/finance/sip-calculator',
    '/finance/ppf-calculator',
    '/finance/gst-calculator',
    '/finance/gold-calculator',
    '/finance/dividend-yield-calculator',
    '/finance/markup-calculator',
    '/finance/vat-calculator',
    '/finance/paycheck-calculator',
    '/health/bmi-calculator',
    '/health/bmr-calculator',
    '/health/tdee-calculator',
    '/health/body-fat-calculator',
    '/health/calorie-calculator',
  ],
  'Math & Utilities': [
    '/utilities/age-calculator',
    '/utilities/percentage-calculator',
    '/utilities/average-calculator',
    '/utilities/date-calculator',
    '/utilities/time-duration-calculator',
    '/utilities/roman-numeral-converter',
    '/utilities/number-to-words-converter',
    '/utilities/probability-calculator',
    '/utilities/gpa-calculator',
    '/utilities/tip-calculator',
    '/utilities/tip-screen',
    '/utilities/stopwatch',
  ],
  'Text & Content': [
    '/text-tools/character-counter',
    '/text-tools/word-counter',
    '/text-tools/alphabetical-sorter',
    '/text-tools/remove-special-characters',
    '/text-tools/keyword-density-analyzer',
    '/tools/text-readability-score',
    '/generators/lorem-ipsum-generator',
    '/generators/password-generator',
    '/generators/team-name-generator',
    '/generators/random-username-generator',
    '/generators/wheel-of-fortune-spinner',
    '/generators/numerology-calculator',
  ],
  'Dev & Converters': [
    '/developer-tools/json-formatter',
    '/developer-tools/regex-tester',
    '/developer-tools/jwt-decoder',
    '/developer-tools/qr-code-generator',
    '/developer-tools/api-key-generator',
    '/developer-tools/cron-job-parser',
    '/converters/hex-to-rgb',
    '/converters/base64-encode-decode',
    '/converters/csv-to-json',
    '/converters/epoch-converter',
    '/converters/hex-to-text',
    '/converters/markdown-to-html',
  ],
  'Web Tools': [
    '/tools/what-is-my-ip',
    '/tools/online-notepad',
    '/tools/image-resizer',
    '/tools/image-converter',
    '/tools/mailto-link-generator',
    '/tools/user-agent-parser',
    '/tools/pdf-tools',
    '/tools/merge-pdf',
    '/tools/compress-pdf',
  ],
};

export interface FeaturedTool {
  label: string;
  path: string;
  description: string;
}

/**
 * Resolved curated tools per nav group. Unknown routes are dropped rather
 * than throwing, so the menu degrades gracefully if a tool is renamed.
 */
export const featuredToolsByGroup: Record<string, FeaturedTool[]> = Object.fromEntries(
  Object.entries(CURATED_ROUTES).map(([group, routes]) => [
    group,
    routes
      .map((route) => {
        const tool = getToolOrNull(route);
        if (!tool) return null;
        return { label: tool.navName, path: tool.route, description: tool.navDescription };
      })
      .filter((t): t is FeaturedTool => t !== null),
  ])
);
