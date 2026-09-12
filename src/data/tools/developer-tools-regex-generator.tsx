import DataObjectIcon from '@mui/icons-material/DataObject';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/regex-generator",
    navName: "Regex Generator",
    navDescription: "Build regex patterns visually with a live preview.",
    name: "Regex Generator - Build Regex Visually",
    description: "Build regular expressions visually by toggling character classes, anchors, and quantifiers, with a live preview of matches in your text.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <DataObjectIcon fontSize="large" color="primary"/>,
    seoTitle: "Regex Generator - Build Regular Expressions Visually Online",
    seoDescription: "Free regex generator. Build regular expressions visually by toggling digits, letters, whitespace, anchors, and quantifiers, with a live preview of matches in your sample text.",
    keywords: ["regex generator", "regex builder", "regular expression generator", "build regex", "regex creator", "regex pattern generator", "visual regex builder", "regex generator online"],
    ogTitle: "Regex Generator - Build Regular Expressions Visually | ToolZoneX",
    ogDescription: "Build regular expressions visually by toggling character classes, anchors, and quantifiers, with a live preview of matches.",
    schemaName: "Regex Generator",
    schemaDescription: "Build regular expressions visually with a live preview of matches in sample text.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What regex flavor does this generate?", answer: "JavaScript (ECMAScript) regex syntax, which is compatible with most modern languages and tools including browsers, Node.js, Python, and many text editors." }, { question: "How do I copy the regex?", answer: "Click the copy icon next to the generated regex string. It copies the full pattern including the delimiters and flags (e.g. /pattern/g)." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
