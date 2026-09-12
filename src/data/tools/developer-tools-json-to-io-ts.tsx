import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-io-ts",
    navName: "JSON to io-ts",
    navDescription: "Generate io-ts codecs from JSON.",
    name: "JSON to io-ts Codec Converter",
    description: "Paste a JSON sample to instantly generate a matching io-ts codec, using t.intersection for objects with optional properties. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to io-ts Converter - Generate Codecs Online",
    seoDescription: "Free online JSON to io-ts converter. Paste any JSON sample to instantly generate a matching io-ts codec with t.type, t.partial, and t.intersection where needed.",
    keywords: ["json to io-ts", "json to io-ts codec", "generate io-ts from json", "io-ts codec generator", "fp-ts io-ts generator"],
    ogTitle: "JSON to io-ts Converter - Generate Codecs Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate a matching io-ts codec.",
    schemaName: "JSON to io-ts Codec Converter",
    schemaDescription: "Paste a JSON sample to instantly generate a matching io-ts codec.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why does io-ts need t.intersection for optional fields?", answer: "Unlike Zod's per-field .optional(), io-ts models optionality at the object level: t.type declares required properties and t.partial declares optional ones. To combine both in a single object, io-ts's documented pattern is to intersect the two codecs." }, { question: "Does the generated code include an io-ts import?", answer: "No — only the codec declarations are generated. Add import * as t from \"io-ts\"; at the top of the file where you paste the output." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and codec generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
