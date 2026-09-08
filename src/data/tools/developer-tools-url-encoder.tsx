import PublicIcon from '@mui/icons-material/Public';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/url-encoder",
    navName: "URL Encoder",
    navDescription: "Encode text into a URL-safe string.",
    name: "URL Encoder",
    description: "Encode plain text into a URL-safe, percent-encoded string instantly. Free, single-purpose online URL encoder.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <PublicIcon fontSize="large" color="primary"/>,
    seoTitle: "URL Encoder - Encode Text to URL Safe Strings Online",
    seoDescription: "Free online URL encoder. Type or paste text and instantly get a percent-encoded, URL-safe string — no decode mode, no sign-up, no upload.",
    keywords: ["url encoder", "encode url", "url encode online", "percent encode", "encode url safe string"],
    ogTitle: "URL Encoder - Encode Text to URL Safe Strings Online | ToolZoneX",
    ogDescription: "Type or paste text and instantly get a percent-encoded, URL-safe string.",
    schemaName: "URL Encoder",
    schemaDescription: "Encode plain text into a URL-safe, percent-encoded string instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What characters are encoded?", answer: "Spaces, special characters (!, @, #, etc.), and non-ASCII characters (unicode) are converted to percent-encoded form (%XX)." }, { question: "What is percent encoding?", answer: "It is the standard encoding used in URLs where unsafe characters are replaced with % followed by two hex digits." }, { question: "Does this tool also decode URL-encoded strings?", answer: "This page is encode-only, for a simpler, focused experience. Use our dedicated URL Decoder tool if you need to decode instead." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
