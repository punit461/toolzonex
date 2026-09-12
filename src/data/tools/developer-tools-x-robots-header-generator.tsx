import SmartToyIcon from '@mui/icons-material/SmartToy';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/x-robots-header-generator",
    navName: "X-Robots Header Generator",
    navDescription: "Build an X-Robots-Tag HTTP header.",
    name: "X-Robots Header Generator",
    description: "Generate an X-Robots-Tag HTTP header with noindex, nofollow, and other directives, with optional user-agent targeting.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SmartToyIcon fontSize="large" color="primary"/>,
    seoTitle: "X-Robots Header Generator - X-Robots-Tag Builder",
    seoDescription: "Generate an X-Robots-Tag HTTP header with noindex, nofollow, and other directives, with optional user-agent targeting. Free and instant.",
    keywords: ["x-robots-tag generator", "x-robots header generator", "noindex header", "http header seo", "page-level indexing control"],
    ogTitle: "X-Robots Header Generator - X-Robots-Tag Builder | ToolZoneX",
    ogDescription: "Generate an X-Robots-Tag HTTP header with noindex, nofollow, and other directives.",
    schemaName: "X-Robots Header Generator",
    schemaDescription: "Generate an X-Robots-Tag HTTP header with noindex, nofollow, and other directives, with optional user-agent targeting.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Robots.txt Generator?", answer: "Robots.txt is a text file that controls CRAWLING at the site or path level, and it can only stop a crawler from fetching a URL — it can't deindex a URL search engines already know about. X-Robots-Tag is an HTTP response HEADER applied per-resource that gives page-level INDEXING control, and it's the only option for non-HTML files like PDFs or images, which can't carry a meta robots tag at all." }, { question: "What does the \"none\" directive do?", answer: "It's shorthand equivalent to combining noindex and nofollow in a single directive." }, { question: "When should I target a specific user-agent?", answer: "Use it when you want different crawlers to receive different instructions for the same resource — for example, allowing a general search engine to index a page while blocking a specific bot by name." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
