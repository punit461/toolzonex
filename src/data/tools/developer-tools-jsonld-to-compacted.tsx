import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/jsonld-to-compacted",
    navName: "JSON-LD to Compacted",
    navDescription: "Compact a JSON-LD document using its context.",
    name: "JSON-LD to Compacted Converter",
    description: "Paste a JSON-LD document to compact it against its own @context (or an empty context), shortening IRIs into terms and cleaning up structural noise. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON-LD to Compacted Converter - Compact JSON-LD Online",
    seoDescription: "Free online JSON-LD compaction tool. Paste a JSON-LD document to compact it against its own @context, shortening IRIs into short terms and simplifying structure.",
    keywords: ["json-ld to compacted", "json-ld compaction tool", "compact json-ld online", "jsonld.js compact", "json-ld context compaction"],
    ogTitle: "JSON-LD to Compacted Converter - Compact JSON-LD Online | ToolZoneX",
    ogDescription: "Paste a JSON-LD document to compact it against its own context.",
    schemaName: "JSON-LD to Compacted Converter",
    schemaDescription: "Paste a JSON-LD document to compact it against its own @context or an empty context.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Where does the context used for compaction come from?", answer: "If your document already has its own @context (the common case — see the example above), this tool compacts against that same context, which is exactly what compaction is meant to do: shorten the document using terms it already defines. If the document has no @context at all, compaction runs against an empty context ({}), which still normalizes structure (for example, collapsing single-value arrays into plain values) but can't shorten any IRIs into short terms, since there are no terms to shorten them to." }, { question: "What does compaction actually change in a JSON-LD document?", answer: "Compaction rewrites a JSON-LD document to use the short terms, prefixes, and aliases defined in a context instead of full IRIs, and simplifies structural noise like single-element arrays and redundant @id wrappers. It's the inverse of expansion — the same data, expressed as compactly as the context allows." }, { question: "Does this tool support remote @context URLs (like https://schema.org/)?", answer: "No — this tool intentionally disables network fetches for @context and document dereferencing, since a static, client-side tool can't reliably rely on a remote server's CORS policy or availability. Use a document with an inline @context object (a JSON object, not a URL string) — the sample document above and virtually every hand-written JSON-LD example works this way. If you paste a document whose @context is a URL, you'll get a clear error instead of an unpredictable network failure." }, { question: "Is my document uploaded anywhere?", answer: "No — all JSON-LD processing happens entirely client-side in your browser using the jsonld.js library. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
