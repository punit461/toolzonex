import MapIcon from '@mui/icons-material/Map';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sitemap-generator",
    navName: "Sitemap Generator",
    navDescription: "Build a sitemap.xml from your URLs.",
    name: "Sitemap Generator - Build sitemap.xml Online",
    description: "Paste a list of your page URLs and generate a valid sitemap.xml with changefreq, priority, and an optional lastmod date.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <MapIcon fontSize="large" color="primary"/>,
    seoTitle: "Sitemap Generator - Build sitemap.xml Online Free",
    seoDescription: "Free online sitemap generator. Paste your page URLs and generate a valid sitemap.xml with changefreq, priority, and lastmod. Copy or download instantly.",
    keywords: ["sitemap generator", "sitemap.xml generator", "create sitemap online", "xml sitemap generator", "free sitemap generator", "sitemap builder"],
    ogTitle: "Sitemap Generator - Build sitemap.xml Online Free | ToolZoneX",
    ogDescription: "Paste a list of your page URLs and generate a valid sitemap.xml with changefreq, priority, and an optional lastmod date.",
    schemaName: "Sitemap Generator",
    schemaDescription: "Build a valid sitemap.xml from a pasted list of page URLs.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this tool crawl my website automatically?", answer: "No — this tool doesn't crawl your site automatically. Browser-based tools can't fetch and follow links across an entire domain due to CORS restrictions and the lack of a backend crawler. Instead, paste your own list of page URLs and the tool builds a valid sitemap.xml from them." }, { question: "Can each URL have a different priority or change frequency?", answer: "This version applies one chosen change frequency and priority to every URL in the list for simplicity. If you need different values per URL, generate separate batches and merge the resulting <url> blocks manually." }, { question: "What does the priority value actually do?", answer: "Priority is a hint (0.0-1.0) to search engines about a page's relative importance within your own site — it doesn't affect ranking compared to other websites, and most search engines treat it as a weak signal at best." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
