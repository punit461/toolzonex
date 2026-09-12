import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-go-bson",
    navName: "JSON to Go BSON",
    navDescription: "Generate Go structs with json + bson tags.",
    name: "JSON to Go BSON Struct Converter",
    description: "Paste a JSON sample to instantly generate matching Go structs tagged with both json and bson, for use with the MongoDB Go driver. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to Go BSON Struct Converter - MongoDB Go Types Online",
    seoDescription: "Free online JSON to Go BSON struct converter. Paste any JSON sample to instantly generate Go structs tagged with both json and bson for the MongoDB Go driver.",
    keywords: ["json to go bson", "json to mongodb go struct", "go bson struct generator", "json to go struct with bson tags", "mongodb go driver struct generator"],
    ogTitle: "JSON to Go BSON Struct Converter - MongoDB Go Types Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate Go structs tagged with json and bson.",
    schemaName: "JSON to Go BSON Struct Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching Go structs tagged with both json and bson.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why include both json and bson tags?", answer: "In practice, most Go services that talk to MongoDB also expose or consume JSON over HTTP using the same struct. Adding both tags up front means you don't have to double back and add the missing one later." }, { question: "Does this work with the official MongoDB Go driver?", answer: "Yes — the bson:\"...\" tag format matches what go.mongodb.org/mongo-driver expects for marshaling and unmarshaling BSON documents." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and struct generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
