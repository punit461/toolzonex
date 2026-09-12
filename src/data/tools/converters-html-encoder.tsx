import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/html-encoder",
    navName: "HTML Encoder",
    navDescription: "Encode text to HTML entities.",
    name: "HTML Encoder",
    description: "Encode plain text or HTML into HTML entities instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "HTML Encoder - Encode Text to HTML Entities Online",
    seoDescription: "Free HTML encoder that converts text or HTML into HTML entities instantly. Encode angle brackets, ampersands, and special characters for safe display.",
    keywords: ["html encoder", "encode html", "html entity encoder", "encode html entities", "html character encoder", "html encoder online"],
    ogTitle: "HTML Encoder - Encode Text to HTML Entities Online | ToolZoneX",
    ogDescription: "Encode plain text or HTML into HTML entities instantly.",
    schemaName: "HTML Encoder",
    schemaDescription: "Encode plain text or HTML into HTML entities instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this enough to prevent XSS attacks on its own?", answer: "Encoding output is one important layer of defense, but a complete security approach also includes proper input validation and context-aware escaping throughout your application." }, { question: "Which characters get encoded?", answer: "Angle brackets, ampersands, and non-ASCII characters are converted into their numeric HTML entity equivalents (e.g. &#60;), leaving standard ASCII letters, numbers, and punctuation untouched." }, { question: "Does this tool also decode HTML entities?", answer: "This page is encode-only, for a simpler, focused experience. Use our HTML Entity Encode/Decode tool if you need to convert entities back into plain HTML." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
