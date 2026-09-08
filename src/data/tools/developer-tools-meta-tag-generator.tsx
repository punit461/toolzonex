import DescriptionIcon from '@mui/icons-material/Description';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/meta-tag-generator",
    navName: "Meta Tag Generator",
    navDescription: "Generate HTML meta tags for SEO.",
    name: "HTML Meta Tag Generator",
    description: "Fill in your page's title, description, and keywords to generate ready-to-paste HTML meta tags. Free online meta tag generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <DescriptionIcon fontSize="large" color="primary"/>,
    seoTitle: "Meta Tag Generator - Free Online HTML Meta Tags Tool",
    seoDescription: "Free online HTML meta tag generator. Fill in title, description, keywords, author, and robots directive to generate ready-to-paste meta tags with a live preview.",
    keywords: ["meta tag generator", "html meta tags generator", "seo meta tags online", "meta description generator", "generate meta tags"],
    ogTitle: "Meta Tag Generator - Free Online HTML Meta Tags Tool | ToolZoneX",
    ogDescription: "Generate ready-to-paste HTML meta tags for any page.",
    schemaName: "HTML Meta Tag Generator",
    schemaDescription: "Fill in a page's title, description, and keywords to generate ready-to-paste HTML meta tags.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does the meta keywords tag still matter for SEO?", answer: "Major search engines like Google no longer use the keywords meta tag for ranking, but some smaller search tools and internal site search systems still read it, so it's harmless to include." }, { question: "What does the robots meta tag control?", answer: "It tells search engine crawlers whether to index the page and whether to follow its links — noindex keeps a page out of search results, and nofollow tells crawlers not to pass ranking credit through its links." }, { question: "Is my data uploaded anywhere?", answer: "No — the tags are generated entirely client-side in your browser. Nothing you type is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
