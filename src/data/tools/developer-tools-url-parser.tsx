import LinkIcon from '@mui/icons-material/Link';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/url-parser",
    navName: "URL Parser",
    navDescription: "Break a URL into its component parts.",
    name: "URL Parser",
    description: "Paste any full URL to instantly break it down into protocol, host, path, query parameters, and hash. Free online URL parser.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <LinkIcon fontSize="large" color="primary"/>,
    seoTitle: "URL Parser - Break Down Any URL Online",
    seoDescription: "Free online URL parser. Paste any full URL to instantly break it down into protocol, host, port, pathname, query parameters, and hash.",
    keywords: ["url parser", "parse url online", "url breakdown tool", "extract query parameters", "url component parser"],
    ogTitle: "URL Parser - Break Down Any URL Online | ToolZoneX",
    ogDescription: "Paste any full URL to instantly break it down into its component parts.",
    schemaName: "URL Parser",
    schemaDescription: "Paste any full URL to instantly break it down into its component parts.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this work with relative URLs?", answer: "No — the browser's URL object requires a fully-qualified URL with a protocol (like https:// or ftp://). Relative paths on their own can't be parsed this way." }, { question: "Does it decode percent-encoded characters?", answer: "Query parameter values are decoded automatically, since they're read via the URL object's searchParams API, which handles percent-decoding for you." }, { question: "Is my URL sent anywhere?", answer: "No — parsing happens entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
