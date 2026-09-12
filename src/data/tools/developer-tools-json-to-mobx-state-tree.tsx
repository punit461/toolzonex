import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-mobx-state-tree",
    navName: "JSON to MobX-State-Tree",
    navDescription: "Generate MST models from JSON.",
    name: "JSON to MobX-State-Tree Converter",
    description: "Paste a JSON sample to instantly generate matching MobX-State-Tree types.model definitions, with nested models, arrays, and optional/nullable fields inferred automatically. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to MobX-State-Tree Converter - Generate MST Models Online",
    seoDescription: "Free online JSON to MobX-State-Tree converter. Paste any JSON sample to instantly generate matching types.model definitions, including nested models and optional/nullable fields.",
    keywords: ["json to mobx-state-tree", "json to mst", "generate mst model from json", "mobx state tree model generator", "json to types.model"],
    ogTitle: "JSON to MobX-State-Tree Converter - Generate MST Models Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching MobX-State-Tree models.",
    schemaName: "JSON to MobX-State-Tree Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching MobX-State-Tree types.model definitions.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between types.maybe and types.maybeNull in the output?", answer: "types.maybe(T) is used when a property was missing from at least one sample object (it allows undefined), while types.maybeNull(T) is used when a property was ever observed as null. A field that's both optional and nullable gets wrapped in both." }, { question: "Are nested objects extracted into separate models?", answer: "Yes — every nested object becomes its own const XModel = types.model(\"X\", {...}) declaration, named after the property path, and is referenced by name from its parent model." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and model generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
