import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/string-escaper",
    navName: "String Escaper",
    navDescription: "Escape or unescape JSON/HTML/URL.",
    name: "String Escaper & Encoder",
    description: "Escape or unescape strings for JSON, HTML entities, or URL encoding. Free online developer utility.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "String Escaper & Encoder - JSON, HTML, URL Online",
    seoDescription: "Escape or unescape strings for JSON, HTML entities, or URL encoding. Free online developer utility to safely format code strings.",
    keywords: ["string escaper", "json escape", "html entities encode", "url encode", "url decode", "unescape string"],
    ogTitle: "String Escaper & Encoder - JSON, HTML, URL Online | ToolZoneX",
    ogDescription: "Escape or unescape strings for JSON, HTML entities, or URL encoding. Free online developer utility.",
    schemaName: "String Escaper & Encoder",
    schemaDescription: "Escape or unescape strings for JSON, HTML entities, or URL encoding.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
