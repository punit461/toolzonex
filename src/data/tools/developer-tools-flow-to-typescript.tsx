import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/flow-to-typescript",
    navName: "Flow to TypeScript",
    navDescription: "Convert Flow source to TypeScript (best-effort).",
    name: "Flow to TypeScript Converter (Best-Effort)",
    description: "Paste Flow-annotated source to get back a TypeScript file combining generated type declarations with a type-stripped implementation. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "Flow to TypeScript Converter - Convert Flow Source Online",
    seoDescription: "Free online Flow to TypeScript converter. Paste Flow-annotated source to get back a TypeScript file combining generated type declarations with a type-stripped implementation.",
    keywords: ["flow to typescript", "convert flow to typescript online", "flow to ts converter", "migrate flow to typescript", "flow source to typescript"],
    ogTitle: "Flow to TypeScript Converter - Convert Flow Source Online | ToolZoneX",
    ogDescription: "Paste Flow-annotated source to get back a combined TypeScript declarations-plus-implementation file.",
    schemaName: "Flow to TypeScript Converter (Best-Effort)",
    schemaDescription: "Paste Flow-annotated source to get back a TypeScript file combining generated type declarations with a type-stripped implementation.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Are the parameter and variable types restored inline in the implementation?", answer: "No — and this is the most important limitation to understand. This tool combines two independent conversions: a types-only declaration block (generated the same way as the separate \"Flow to TypeScript Declaration\" tool) and a type-stripped implementation (generated the same way as the separate \"Flow to Plain JavaScript\" tool). The two are stitched together as a declaration block followed by an implementation — they are not merged, so the function bodies and variable declarations below the declaration block do not have their original parameter or variable types annotated in place. If you need that level of fidelity, use the \"Flow to TypeScript Declaration\" tool for the types and \"Flow to Plain JavaScript\" for the implementation separately, and merge the two by hand where precision matters." }, { question: "Why not just generate fully-typed TypeScript directly?", answer: "Generating types and stripping types are two different, well-understood operations, but mapping a generated type declaration back onto the exact position of each parameter and variable in the implementation is a much harder problem with no reliable general solution — so this tool is deliberately transparent about combining the two outputs rather than pretending to solve that problem." }, { question: "Is my code uploaded anywhere?", answer: "No — both conversions happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
