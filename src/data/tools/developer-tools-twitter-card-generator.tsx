import ShareIcon from '@mui/icons-material/Share';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/twitter-card-generator",
    navName: "Twitter Card Generator",
    navDescription: "Generate Twitter/X Card meta tags.",
    name: "Twitter Card Meta Tag Generator",
    description: "Generate Twitter/X Card meta tags with a live card preview mockup and one-click copy.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ShareIcon fontSize="large" color="primary"/>,
    seoTitle: "Twitter Card Meta Tag Generator - Free Online Tool",
    seoDescription: "Generate Twitter/X Card meta tags (summary or summary_large_image) with a live preview mockup and one-click copy. Free online developer tool.",
    keywords: ["twitter card generator", "twitter card meta tags", "x card generator", "summary_large_image generator", "twitter meta tag generator"],
    ogTitle: "Twitter Card Meta Tag Generator - Free Online Tool | ToolZoneX",
    ogDescription: "Generate Twitter/X Card meta tags with a live preview mockup.",
    schemaName: "Twitter Card Meta Tag Generator",
    schemaDescription: "Generate Twitter/X Card meta tags with a live card preview mockup and one-click copy.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between \"summary\" and \"summary_large_image\"?", answer: "\"summary\" shows a small square thumbnail next to the title and description, while \"summary_large_image\" shows a full-width banner image above the text — better suited to photos, graphics, or featured images you want front and center." }, { question: "Do I still need Open Graph tags if I add Twitter Card tags?", answer: "Yes — X will fall back to Open Graph (og:title, og:description, og:image) tags if Twitter-specific ones are missing, but most other platforms (Facebook, LinkedIn, Slack) only read Open Graph tags, so it's best to include both." }, { question: "Is my data uploaded anywhere?", answer: "No — everything is generated entirely client-side in your browser. Nothing you type is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
