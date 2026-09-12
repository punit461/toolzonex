import SearchIcon from '@mui/icons-material/Search';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/opensearch-generator",
    navName: "OpenSearch Generator",
    navDescription: "Generate an OpenSearch description document.",
    name: "OpenSearch Generator",
    description: "Generate a complete OpenSearch XML description document so browsers can add your site's search as a custom search engine.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SearchIcon fontSize="large" color="primary"/>,
    seoTitle: "OpenSearch Generator - Create opensearch.xml Online",
    seoDescription: "Generate a complete OpenSearch XML description document so browsers can add your site's search as a custom search engine. Free and instant.",
    keywords: ["opensearch generator", "opensearch.xml generator", "browser search plugin generator", "opensearchdescription", "add site search to browser"],
    ogTitle: "OpenSearch Generator - Create opensearch.xml Online | ToolZoneX",
    ogDescription: "Generate a complete OpenSearch XML description document for browser search integration.",
    schemaName: "OpenSearch Generator",
    schemaDescription: "Generate a complete OpenSearch XML description document so browsers can add your site's search as a custom search engine.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What happens if my search URL doesn't contain {searchTerms}?", answer: "The generator blocks output and shows an error, since a template without that placeholder gives the browser nowhere to insert the user's search query, making the description document useless." }, { question: "Where do I host the generated file?", answer: "Anywhere on your domain — commonly at the root, e.g. /opensearch.xml — then link to it from your page's <head> so browsers can discover it automatically." }, { question: "Do all browsers support OpenSearch autodiscovery?", answer: "Support varies by browser and has changed over time, so treat it as a nice-to-have enhancement for browsers that support it rather than a feature every visitor will see." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
