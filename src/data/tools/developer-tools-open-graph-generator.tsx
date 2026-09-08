import ShareIcon from '@mui/icons-material/Share';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/open-graph-generator",
    navName: "Open Graph Generator",
    navDescription: "Generate Open Graph & Twitter Card tags.",
    name: "Open Graph & Twitter Card Generator",
    description: "Fill in your page's title, description, and image to generate Open Graph and Twitter Card meta tags. Free online Open Graph generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ShareIcon fontSize="large" color="primary"/>,
    seoTitle: "Open Graph Generator - Free Social Share Meta Tags Tool",
    seoDescription: "Free online Open Graph and Twitter Card meta tag generator. Fill in title, description, and image to get a live social preview mockup and ready-to-paste tags.",
    keywords: ["open graph generator", "og meta tags generator", "twitter card generator", "social share meta tags", "opengraph tag generator"],
    ogTitle: "Open Graph Generator - Free Social Share Meta Tags Tool | ToolZoneX",
    ogDescription: "Generate Open Graph and Twitter Card meta tags with a live preview.",
    schemaName: "Open Graph & Twitter Card Generator",
    schemaDescription: "Fill in a page's title, description, and image to generate Open Graph and Twitter Card meta tags.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What image size works best for og:image?", answer: "A 1200×630px image is the widely recommended size — it displays well as a large preview across Facebook, LinkedIn, and X/Twitter without being cropped awkwardly." }, { question: "Why doesn't my updated preview show on Facebook/X right away?", answer: "Social platforms cache preview data per URL. After changing your tags, use that platform's own debugger/sharing tool (like Facebook's Sharing Debugger) to force it to re-scrape the page." }, { question: "Is my data uploaded anywhere?", answer: "No — everything is generated entirely client-side in your browser. Nothing you type is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
