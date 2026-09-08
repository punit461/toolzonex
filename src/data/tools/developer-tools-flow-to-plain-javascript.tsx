import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/flow-to-plain-javascript",
    navName: "Flow to Plain JavaScript",
    navDescription: "Strip Flow type annotations from source code.",
    name: "Flow to Plain JavaScript Converter",
    description: "Paste Flow-annotated source to instantly strip out its type annotations and produce plain, runnable JavaScript using Babel's Flow parser. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "Flow to Plain JavaScript Converter - Strip Flow Types Online",
    seoDescription: "Free online Flow to plain JavaScript converter. Paste Flow-annotated source to instantly strip out its type annotations using Babel's Flow parser.",
    keywords: ["flow to javascript", "strip flow types", "flow type stripper online", "remove flow annotations", "flow to plain js"],
    ogTitle: "Flow to Plain JavaScript Converter - Strip Flow Types Online | ToolZoneX",
    ogDescription: "Paste Flow-annotated source to strip out its type annotations and produce plain JavaScript.",
    schemaName: "Flow to Plain JavaScript Converter",
    schemaDescription: "Paste Flow-annotated source to instantly strip out its type annotations and produce plain, runnable JavaScript.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this an approximation, or does it produce exact output?", answer: "The logic is exact — every Flow type construct is removed via the same battle-tested Flow-parsing approach used across the JavaScript ecosystem, not a regex or a hand-written approximation. One honest caveat: the output is regenerated from the parsed syntax tree rather than a minimal patch of your original text, so formatting details like quote style or spacing can differ from your input even though the runtime behavior is identical." }, { question: "Does this type-check my code first?", answer: "No — it only removes type syntax; it doesn't verify that your Flow types were correct in the first place. If you need type-checking, run your code through the Flow compiler itself before using this tool." }, { question: "Is my code uploaded anywhere?", answer: "No — type removal happens entirely client-side in your browser, using Babel's parser loaded on demand. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
