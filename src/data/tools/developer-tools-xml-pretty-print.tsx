import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/xml-pretty-print",
    navName: "XML Pretty Print",
    navDescription: "Pretty-print or minify XML.",
    name: "XML Pretty Print & Minify Tool",
    description: "Pretty-print XML into clean, indented markup or minify it down to a single compact line, with one toggle.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "XML Pretty Print & Minify Tool - Free Online Developer Tool",
    seoDescription: "Paste any XML and pretty-print it into indented markup or minify it into a single compact line — flip a switch to choose. Free online developer tool.",
    keywords: ["xml pretty print", "xml minifier", "pretty print xml online", "minify xml", "xml formatter and minifier"],
    ogTitle: "XML Pretty Print & Minify Tool - Free Online Developer Tool | ToolZoneX",
    ogDescription: "Pretty-print XML into indented markup or minify it into a single compact line.",
    schemaName: "XML Pretty Print & Minify Tool",
    schemaDescription: "Pretty-print XML into clean, indented markup or minify it down to a single compact line, with one toggle.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this validate my XML?", answer: "Not strictly — this tool uses a lightweight, regex-based processor rather than a full XML parser, so it focuses on reformatting or compacting tag structure rather than validating schema correctness or catching every possible malformed-XML edge case." }, { question: "What does minify mode actually remove?", answer: "Minify mode strips whitespace (spaces, tabs, and line breaks) sitting between tags, collapsing the document onto a single line. It doesn't alter attribute values or text content inside elements." }, { question: "Is my XML data uploaded anywhere?", answer: "No — formatting and minifying happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
