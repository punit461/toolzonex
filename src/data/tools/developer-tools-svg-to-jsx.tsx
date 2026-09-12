import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/svg-to-jsx",
    navName: "SVG to JSX",
    navDescription: "Convert SVG markup into a React JSX component.",
    name: "SVG to JSX Converter",
    description: "Paste raw SVG markup to instantly convert it into a React JSX component, with kebab-case attributes like fill-rule and stroke-width renamed to their camelCase equivalents. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "SVG to JSX Converter - Convert SVG Markup to React Components",
    seoDescription: "Free online SVG to JSX converter. Paste raw SVG markup to instantly generate a React JSX component with correctly camelCased attributes.",
    keywords: ["svg to jsx", "svg to react component", "convert svg to jsx", "svg jsx converter", "react svg icon component"],
    ogTitle: "SVG to JSX Converter - Convert SVG Markup to React Components | ToolZoneX",
    ogDescription: "Paste SVG markup to instantly generate a React JSX component.",
    schemaName: "SVG to JSX Converter",
    schemaDescription: "Paste raw SVG markup to instantly convert it into a React JSX component.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Which attributes get renamed?", answer: "Common SVG presentation attributes (fill-rule, clip-rule, stroke-width, stroke-linecap, font-family, xlink:href, and more) are mapped to their exact React/JSX camelCase equivalents. Any other kebab-case attribute without a known mapping is still camelCased automatically rather than dropped, and class always becomes className." }, { question: "Does it handle nested groups and gradients?", answer: "Yes — the converter walks the entire element tree recursively, so nested <g>, <defs>, <linearGradient>, and other child elements are all converted and indented to match their depth in the original markup." }, { question: "Is my SVG uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser using the native DOM parser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
