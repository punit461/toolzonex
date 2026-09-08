import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/jsonld-to-n-quads",
    navName: "JSON-LD to N-Quads",
    navDescription: "Convert JSON-LD to N-Quads RDF.",
    name: "JSON-LD to N-Quads Converter",
    description: "Paste a JSON-LD document to convert it into N-Quads, the plain-text line-based RDF format used by triple stores and linked-data tooling. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON-LD to N-Quads Converter - Convert JSON-LD to RDF Online",
    seoDescription: "Free online JSON-LD to N-Quads converter. Paste a JSON-LD document to convert it into N-Quads RDF statements for triple stores and linked-data tooling.",
    keywords: ["json-ld to n-quads", "json-ld to rdf", "jsonld.js toRDF", "convert json-ld to nquads", "json-ld rdf conversion"],
    ogTitle: "JSON-LD to N-Quads Converter - Convert JSON-LD to RDF Online | ToolZoneX",
    ogDescription: "Paste a JSON-LD document to convert it into N-Quads RDF.",
    schemaName: "JSON-LD to N-Quads Converter",
    schemaDescription: "Paste a JSON-LD document to convert it into N-Quads RDF statements.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What is N-Quads, and why does the output look so different from JSON?", answer: "N-Quads is a plain-text, line-based RDF serialization — every line is one subject-predicate-object statement (a \"quad,\" optionally with a fourth graph name), terminated with a period. It has nothing to do with JSON syntax; it's the format most RDF tooling (triple stores, SPARQL engines, linked-data pipelines) expects as an interchange format, so this tool converts your JSON-LD document into that statement-per-line form." }, { question: "Is this the same as the Normalized / URDNA2015 output?", answer: "No, and this is the most common point of confusion between the two tools. This N-Quads tool just runs jsonld.js's toRDF conversion once and prints whatever order it produces — running the same document through it twice will generally give you the same result, but the ordering isn't a canonicalization guarantee, and isn't guaranteed to be stable across different-but-equivalent input documents (different key order, different blank node labels, etc.). If you need a byte-for-byte deterministic output — for hashing or digitally signing a JSON-LD document — use the Normalized (URDNA2015) tool instead, which sorts and relabels everything into one canonical form regardless of how the input was written." }, { question: "Does this tool support remote @context URLs (like https://schema.org/)?", answer: "No — this tool intentionally disables network fetches for @context and document dereferencing, since a static, client-side tool can't reliably rely on a remote server's CORS policy or availability. Use a document with an inline @context object (a JSON object, not a URL string) — the sample document above and virtually every hand-written JSON-LD example works this way. If you paste a document whose @context is a URL, you'll get a clear error instead of an unpredictable network failure." }, { question: "Is my document uploaded anywhere?", answer: "No — all JSON-LD processing happens entirely client-side in your browser using the jsonld.js library. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
