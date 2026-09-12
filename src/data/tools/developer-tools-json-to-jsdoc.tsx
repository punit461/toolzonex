import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-jsdoc",
    navName: "JSON to JSDoc",
    navDescription: "Generate JSDoc @typedef blocks from JSON.",
    name: "JSON to JSDoc Converter",
    description: "Paste a JSON sample to instantly generate matching JSDoc @typedef blocks for editor autocomplete in plain JavaScript. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to JSDoc Converter - Generate @typedef Blocks Online",
    seoDescription: "Free online JSON to JSDoc converter. Paste any JSON sample to instantly generate matching @typedef blocks with @property tags for editor autocomplete.",
    keywords: ["json to jsdoc", "json to jsdoc typedef", "generate jsdoc from json", "jsdoc typedef generator", "json2jsdoc alternative"],
    ogTitle: "JSON to JSDoc Converter - Generate @typedef Blocks Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching JSDoc @typedef blocks.",
    schemaName: "JSON to JSDoc Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching JSDoc @typedef blocks.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How do optional properties look in the output?", answer: "Following standard JSDoc convention, an optional property's name is wrapped in brackets, like @property {string} [zip], rather than using a separate optional-type marker." }, { question: "Can I use these typedefs with @ts-check?", answer: "Yes — paste the generated @typedef blocks above a function and reference the type name in a @param {Root} or @returns {Root} tag; VS Code and other TypeScript-powered editors will pick it up automatically." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and typedef generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
