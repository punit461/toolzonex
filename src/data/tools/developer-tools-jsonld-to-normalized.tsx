import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/jsonld-to-normalized",
    navName: "JSON-LD to Normalized",
    navDescription: "Canonicalize JSON-LD with URDNA2015.",
    name: "JSON-LD to Normalized (URDNA2015) Converter",
    description: "Paste a JSON-LD document to canonicalize it with URDNA2015, producing deterministic, byte-identical N-Quads output for hashing or signing. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON-LD to Normalized Converter - URDNA2015 Canonicalization Online",
    seoDescription: "Free online JSON-LD normalization tool. Paste a JSON-LD document to canonicalize it with URDNA2015 into deterministic, byte-identical N-Quads output.",
    keywords: ["json-ld to normalized", "json-ld urdna2015", "json-ld canonicalization", "jsonld.js normalize", "json-ld deterministic hash"],
    ogTitle: "JSON-LD to Normalized Converter - URDNA2015 Canonicalization Online | ToolZoneX",
    ogDescription: "Paste a JSON-LD document to canonicalize it with URDNA2015.",
    schemaName: "JSON-LD to Normalized (URDNA2015) Converter",
    schemaDescription: "Paste a JSON-LD document to canonicalize it with URDNA2015 into deterministic N-Quads.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the N-Quads tool?", answer: "N-Quads conversion (jsonld.js's toRDF) is a straightforward format change — your JSON-LD document turned into RDF statements in whatever order the processor happens to produce them. This tool instead applies the URDNA2015 canonicalization algorithm: it sorts statements and deterministically relabels every blank node so that the same underlying data always normalizes to byte-identical output, no matter how the original JSON was formatted, what order its keys appeared in, or what blank node identifiers it used. Two JSON-LD documents that describe the same graph will normalize to the exact same text, even if their source JSON looks completely different." }, { question: "What is this actually used for?", answer: "Deterministic, canonical output is what makes it possible to generate a stable content hash or a digital signature over a JSON-LD document (as used in, for example, Verifiable Credentials' data-integrity proofs) — you can't hash or sign a document reliably if trivial formatting differences (key order, whitespace, blank node naming) change the bytes you're hashing. Normalization strips all of that variability out first." }, { question: "Does this tool support remote @context URLs (like https://schema.org/)?", answer: "No — this tool intentionally disables network fetches for @context and document dereferencing, since a static, client-side tool can't reliably rely on a remote server's CORS policy or availability. Use a document with an inline @context object (a JSON object, not a URL string) — the sample document above and virtually every hand-written JSON-LD example works this way. If you paste a document whose @context is a URL, you'll get a clear error instead of an unpredictable network failure." }, { question: "Is my document uploaded anywhere?", answer: "No — all JSON-LD processing happens entirely client-side in your browser using the jsonld.js library. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
