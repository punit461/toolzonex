import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-react-proptypes",
    navName: "JSON to React PropTypes",
    navDescription: "Generate React PropTypes from JSON.",
    name: "JSON to React PropTypes Converter",
    description: "Paste a JSON sample to instantly generate a matching propTypes object for a React component, with nested shapes, arrays, and required fields inferred automatically. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to React PropTypes Converter - Generate PropTypes Online",
    seoDescription: "Free online JSON to React PropTypes converter. Paste any JSON sample to instantly generate a matching propTypes object with nested shapes and required fields.",
    keywords: ["json to proptypes", "json to react proptypes", "generate proptypes from json", "react proptypes generator", "json2proptypes alternative"],
    ogTitle: "JSON to React PropTypes Converter - Generate PropTypes Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching React PropTypes.",
    schemaName: "JSON to React PropTypes Converter",
    schemaDescription: "Paste a JSON sample to instantly generate a matching React propTypes object.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is .isRequired decided?", answer: "A field gets .isRequired whenever it was present in every sample object you pasted. If you paste an array of objects and a property is missing from at least one of them, it's left without .isRequired instead." }, { question: "Do I need to rename MyComponent in the output?", answer: "Yes — the generated code uses MyComponent as a placeholder. Replace it with the actual name of the component you're adding prop types to before pasting it into your project." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and PropTypes generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
