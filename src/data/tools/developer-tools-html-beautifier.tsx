import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/html-beautifier",
    navName: "HTML Beautifier",
    navDescription: "Format and pretty-print HTML code.",
    name: "HTML Beautifier",
    description: "Instantly format and pretty-print minified HTML code with proper indentation. Free online developer tool — runs entirely in your browser.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "HTML Beautifier - Format & Pretty Print HTML Online",
    seoDescription: "Free online HTML beautifier to format and pretty-print minified HTML code with proper indentation. Client-side only — no data uploaded.",
    keywords: ["html beautifier", "format html", "pretty print html", "html formatter"],
    ogTitle: "HTML Beautifier - Format & Pretty Print HTML Online | ToolZoneX",
    ogDescription: "Instantly format and pretty-print minified HTML code with proper indentation. Free online developer tool.",
    schemaName: "HTML Beautifier",
    schemaDescription: "Instantly format and pretty-print minified HTML code with proper indentation.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
