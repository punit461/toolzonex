import LinkIcon from '@mui/icons-material/Link';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/canonical-url-generator",
    navName: "Canonical URL Generator",
    navDescription: "Strip tracking params and generate a canonical tag.",
    name: "Canonical URL Generator - Clean URLs & Canonical Tags",
    description: "Strip common tracking parameters from a URL and generate a cleaned canonical URL plus a ready-to-paste <link rel=\"canonical\"> tag.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <LinkIcon fontSize="large" color="primary"/>,
    seoTitle: "Canonical URL Generator - Clean URLs & Canonical Tags",
    seoDescription: "Free canonical URL generator. Strip utm_*, fbclid, gclid and other tracking parameters, and generate a ready-to-paste canonical link tag.",
    keywords: ["canonical url generator", "canonical tag generator", "remove utm parameters from url", "strip tracking parameters", "link rel canonical generator"],
    ogTitle: "Canonical URL Generator - Clean URLs & Canonical Tags | ToolZoneX",
    ogDescription: "Strip tracking parameters from a URL and generate a cleaned canonical URL plus link tag.",
    schemaName: "Canonical URL Generator",
    schemaDescription: "Strip common tracking parameters from a URL and generate a cleaned canonical URL plus a ready-to-paste <link rel=\"canonical\"> tag.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: [{ question: "Why does a canonical tag matter for SEO?", answer: "A canonical tag tells search engines which URL is the authoritative version of a page when the same content is reachable through multiple URLs (with different tracking parameters, for example). Without it, search engines may split ranking signals across several near-duplicate URLs instead of consolidating them onto one." }, { question: "Should I strip every query parameter, not just tracking ones?", answer: "Not necessarily — parameters that change the actual page content (like a product ID or search query) usually should stay in the canonical URL, while tracking parameters that don't affect the content (like utm_* tags) are the ones typically safe to strip." }, { question: "What does the base URL override field do?", answer: "It lets you swap the scheme and domain of the cleaned URL — useful if your page is reachable on multiple domains or subdomains but you want the canonical tag to always point at one preferred domain, while keeping the same path and cleaned query string." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
