import SmartToyIcon from '@mui/icons-material/SmartToy';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/robots-txt-generator",
    navName: "Robots.txt Generator",
    navDescription: "Generate a robots.txt file for your website.",
    name: "Robots.txt Generator",
    description: "Generate a valid robots.txt file with custom allow/disallow rules, crawl delay, and sitemap URL.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SmartToyIcon fontSize="large" color="primary"/>,
    seoTitle: "Robots.txt Generator - Create robots.txt Online Free",
    seoDescription: "Free robots.txt generator to create a valid robots.txt file for your website. Add allow/disallow rules, crawl delay, and sitemap URL instantly.",
    keywords: ["robots.txt generator", "generate robots.txt", "robots txt creator", "crawl rules generator", "seo robots.txt", "sitemap robots.txt"],
    ogTitle: "Robots.txt Generator - Create robots.txt Online Free | ToolZoneX",
    ogDescription: "Generate a valid robots.txt file with custom allow/disallow rules, crawl delay, and sitemap URL.",
    schemaName: "Robots.txt Generator",
    schemaDescription: "Generate a valid robots.txt file with custom allow/disallow rules, crawl delay, and sitemap URL.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Where do I put the robots.txt file?", answer: "Upload it to the root directory of your website (e.g., https://example.com/robots.txt)." }, { question: "Does a robots.txt block all crawlers?", answer: "No — it is a voluntary standard. Legitimate search engine bots respect it, but malicious bots may ignore it." }, { question: "What is Crawl-delay?", answer: "It tells compliant crawlers how many seconds to wait between requests to your site, helping reduce server load." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
