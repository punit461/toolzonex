import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/xml-formatter",
    navName: "XML Formatter",
    navDescription: "Pretty-print and indent XML.",
    name: "XML Formatter - Pretty-Print & Indent XML",
    description: "Paste minified or unformatted XML and instantly convert it into a clean, properly indented document with copy and download options.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "XML Formatter - Pretty-Print & Indent XML Online",
    seoDescription: "Free online XML formatter. Paste minified XML and instantly pretty-print it with proper indentation. Copy or download the formatted result.",
    keywords: ["xml formatter", "xml pretty print", "format xml online", "xml beautifier", "indent xml", "minify xml"],
    ogTitle: "XML Formatter - Pretty-Print & Indent XML Online | ToolZoneX",
    ogDescription: "Paste minified or unformatted XML and instantly convert it into a clean, properly indented document.",
    schemaName: "XML Formatter",
    schemaDescription: "Pretty-print and indent minified XML into a clean, readable document.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this validate my XML?", answer: "Not strictly — this tool uses a lightweight, regex-based re-indenter rather than a full XML parser, so it focuses on reformatting tag structure rather than validating schema correctness or catching every possible malformed-XML edge case." }, { question: "Will it handle self-closing tags and comments correctly?", answer: "Yes — self-closing tags (like <br/>), XML declarations, and comments are each placed on their own line at the correct indentation level without adding unnecessary nested indenting after them." }, { question: "Is my XML data uploaded anywhere?", answer: "No — formatting happens entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
