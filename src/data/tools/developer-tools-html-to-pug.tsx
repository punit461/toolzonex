import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/html-to-pug",
    navName: "HTML to Pug",
    navDescription: "Convert HTML markup into Pug template syntax.",
    name: "HTML to Pug Converter",
    description: "Paste raw HTML to instantly convert it into Pug's indentation-based template syntax, with classes and IDs collapsed into shorthand notation. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "HTML to Pug Converter - Convert HTML to Pug Templates",
    seoDescription: "Free online HTML to Pug converter. Paste raw HTML to instantly generate Pug's indentation-based template syntax.",
    keywords: ["html to pug", "convert html to pug", "html to jade", "html to pug converter online", "pug template converter"],
    ogTitle: "HTML to Pug Converter - Convert HTML to Pug Templates | ToolZoneX",
    ogDescription: "Paste raw HTML to instantly generate Pug template syntax.",
    schemaName: "HTML to Pug Converter",
    schemaDescription: "Paste raw HTML to instantly convert it into Pug's indentation-based template syntax.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How are multiple classes handled?", answer: "Every class in a space-separated class attribute becomes its own chained shorthand, so class=\"card card--large\" becomes .card.card--large appended directly after the tag name." }, { question: "What happens to attributes with no value, like \"disabled\"?", answer: "This converter reads attribute values as reported by the browser's DOM parser, so boolean HTML attributes are emitted with their resolved value (e.g. disabled=\"\") inside the parentheses — you can trim the =\"\" by hand if your Pug setup prefers the bare form." }, { question: "Is my HTML uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
