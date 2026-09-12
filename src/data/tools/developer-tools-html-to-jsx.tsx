import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/html-to-jsx",
    navName: "HTML to JSX",
    navDescription: "Convert raw HTML into valid JSX.",
    name: "HTML to JSX Converter",
    description: "Paste raw HTML to instantly convert it into valid JSX, with class renamed to className, for renamed to htmlFor, inline styles converted to style objects, and void elements self-closed. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "HTML to JSX Converter - Convert HTML Markup to Valid JSX",
    seoDescription: "Free online HTML to JSX converter. Paste raw HTML to instantly generate valid JSX with className, htmlFor, style objects, and self-closed void elements.",
    keywords: ["html to jsx", "convert html to jsx", "html to react jsx", "html to jsx converter online", "jsx converter"],
    ogTitle: "HTML to JSX Converter - Convert HTML Markup to Valid JSX | ToolZoneX",
    ogDescription: "Paste raw HTML to instantly generate valid JSX.",
    schemaName: "HTML to JSX Converter",
    schemaDescription: "Paste raw HTML to instantly convert it into valid JSX.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What happens to data- and aria- attributes?", answer: "They're left exactly as-is — data-* and aria-* attributes stay kebab-case in JSX per React convention, unlike other HTML attributes which are camelCased." }, { question: "Does it handle curly braces in text content?", answer: "Yes — literal { and } characters found in text nodes are escaped as {'{'} and {'}'} so the output compiles as valid JSX instead of being misread as an expression." }, { question: "Is my HTML uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
