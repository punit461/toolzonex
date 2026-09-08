import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-scala-case-class",
    navName: "JSON to Scala Case Class",
    navDescription: "Generate Scala case classes from JSON.",
    name: "JSON to Scala Case Class Converter",
    description: "Paste a JSON sample to instantly generate matching Scala case classes with Option[Type] wrapping optional and nullable fields. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to Scala Case Class Converter - Generate Types Online",
    seoDescription: "Free online JSON to Scala case class converter. Paste any JSON sample to instantly generate matching Scala case class declarations with nested types and Option wrapping.",
    keywords: ["json to scala", "json to scala case class", "generate scala from json", "scala case class generator", "json2scala alternative"],
    ogTitle: "JSON to Scala Case Class Converter - Generate Types Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching Scala case classes.",
    schemaName: "JSON to Scala Case Class Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching Scala case classes with Option[Type] wrapping optional and nullable fields.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why does the generator use Option instead of nullable types?", answer: "Idiomatic Scala avoids null in favor of Option[T], which forces callers to explicitly handle the absent case. Any field that's missing from at least one sample or was ever null is wrapped in Option with a None default." }, { question: "Will this work directly with circe or play-json?", answer: "The generated case classes are plain Scala and are exactly the shape both libraries expect for automatic derivation — you'll still need to bring the relevant codec/format derivation into scope for your library of choice." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and code generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
