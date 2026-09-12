import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/http-status-code-lookup",
    navName: "HTTP Status Code Lookup",
    navDescription: "Search HTTP status codes by number or keyword.",
    name: "HTTP Status Code Lookup",
    description: "Search over 60 standard HTTP status codes across the 1xx-5xx range by number or keyword to see the reason phrase and a plain-English explanation.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <NetworkCheckIcon fontSize="large" color="primary"/>,
    seoTitle: "HTTP Status Code Lookup - Search HTTP Status Codes",
    seoDescription: "Free online HTTP status code lookup. Search over 60 standard HTTP status codes by number or keyword to see their meaning and reason phrase.",
    keywords: ["HTTP status code lookup", "HTTP status codes list", "what does status code 404 mean", "HTTP error codes reference", "HTTP status code search"],
    ogTitle: "HTTP Status Code Lookup - Search HTTP Status Codes | ToolZoneX",
    ogDescription: "Search over 60 standard HTTP status codes by number or keyword.",
    schemaName: "HTTP Status Code Lookup",
    schemaDescription: "Search over 60 standard HTTP status codes across the 1xx-5xx range by number or keyword to see the reason phrase and a plain-English explanation.",
    applicationCategory: "DeveloperApplication",
    currency: "USD",
    faqs: [{ question: "What do the different number ranges mean?", answer: "1xx codes are informational, 2xx codes indicate success, 3xx codes indicate redirection, 4xx codes indicate a client error, and 5xx codes indicate a server error — the first digit always tells you the general category." }, { question: "Is 418 \"I'm a Teapot\" a real status code?", answer: "Yes — it originates from RFC 2324, an April Fools' joke RFC from 1998 about a Hyper Text Coffee Pot Control Protocol, but it has since been kept in the registry and is occasionally used intentionally by some servers and frameworks as an easter egg." }, { question: "Does this list cover every possible status code?", answer: "It covers the most commonly referenced standard codes across the full range, including some rarer and non-standard ones like 509. A small number of obscure or vendor-specific codes outside common use may not be included." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
