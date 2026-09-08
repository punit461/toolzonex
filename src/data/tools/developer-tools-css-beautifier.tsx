import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-beautifier",
    navName: "CSS Beautifier",
    navDescription: "Format and pretty-print CSS code.",
    name: "CSS Beautifier & Formatter",
    description: "Format and pretty-print minified or unformatted CSS instantly in your browser.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Beautifier - Format & Pretty-Print CSS Online Free",
    seoDescription: "Free online CSS beautifier to format and pretty-print minified or unformatted CSS instantly. Adds proper indentation and line breaks in your browser.",
    keywords: ["css beautifier", "css formatter", "format css", "pretty print css", "css beautify online", "css indent tool"],
    ogTitle: "CSS Beautifier - Format & Pretty-Print CSS Online Free | ToolZoneX",
    ogDescription: "Format and pretty-print minified or unformatted CSS instantly in your browser.",
    schemaName: "CSS Beautifier",
    schemaDescription: "Format and pretty-print minified or unformatted CSS instantly in your browser.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this modify my CSS values?", answer: "No — only whitespace and formatting are changed. All property values, selectors, and rules remain exactly the same." }, { question: "Does it strip comments?", answer: "Yes — CSS comments (/* ... */) are removed to produce cleaner output. Keep your original if you need the comments." }, { question: "Does it validate CSS?", answer: "This tool only formats CSS — it does not validate whether the CSS is syntactically correct." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
