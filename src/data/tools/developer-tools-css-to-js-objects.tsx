import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-to-js-objects",
    navName: "CSS to JS Objects",
    navDescription: "Convert CSS rules into JS style objects.",
    name: "CSS to JS Objects Converter",
    description: "Paste CSS to instantly convert each rule into a JavaScript object literal suitable for React inline style props, with camelCased property names. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS to JS Objects Converter - Convert CSS to React Style Objects",
    seoDescription: "Free online CSS to JS objects converter. Paste CSS to instantly generate camelCased JavaScript style objects for React.",
    keywords: ["css to js objects", "css to react style object", "convert css to javascript object", "css to js converter", "css in js object generator"],
    ogTitle: "CSS to JS Objects Converter - Convert CSS to React Style Objects | ToolZoneX",
    ogDescription: "Paste CSS to instantly generate JavaScript style objects.",
    schemaName: "CSS to JS Objects Converter",
    schemaDescription: "Paste CSS to instantly convert each rule into a JavaScript object literal.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Are numeric values converted to plain numbers?", answer: "No — all values are kept as strings (e.g. '16px'), including pixel values. React accepts string values for every style property, and guessing which unitless properties can take a bare number risks generating incorrect styles, so this tool always plays it safe." }, { question: "How are selector names turned into JS variable names?", answer: "Leading . or # characters are stripped, non-alphanumeric characters are removed, and hyphen-or-space-separated words are joined in camelCase — so .btn-primary becomes btnPrimary." }, { question: "Is my CSS uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
