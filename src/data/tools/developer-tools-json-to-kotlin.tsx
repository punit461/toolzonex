import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-kotlin",
    navName: "JSON to Kotlin",
    navDescription: "Generate Kotlin data classes from JSON.",
    name: "JSON to Kotlin Data Class Converter",
    description: "Paste a JSON sample to instantly generate matching Kotlin data classes with nullable properties inferred automatically. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to Kotlin Converter - Generate Data Classes Online",
    seoDescription: "Free online JSON to Kotlin converter. Paste any JSON sample to instantly generate matching Kotlin data class declarations with nested types and nullable properties.",
    keywords: ["json to kotlin", "json to kotlin data class", "generate kotlin from json", "kotlin data class generator", "json2kotlin alternative"],
    ogTitle: "JSON to Kotlin Converter - Generate Data Classes Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching Kotlin data classes.",
    schemaName: "JSON to Kotlin Data Class Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching Kotlin data classes with nullable properties inferred automatically.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why do some properties get a default value of null?", answer: "Giving optional or nullable properties a = null default lets you construct instances of the data class without supplying every field, which mirrors how the property might legitimately be absent from the JSON." }, { question: "Does this work with kotlinx.serialization?", answer: "The generated data classes are plain Kotlin and map cleanly onto kotlinx.serialization or Moshi models — you may want to add @Serializable or @JsonClass annotations depending on which library you use." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and code generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
