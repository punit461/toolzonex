import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/jsonld-to-expanded",
    navName: "JSON-LD to Expanded",
    navDescription: "Expand a JSON-LD document into full IRIs.",
    name: "JSON-LD to Expanded Converter",
    description: "Paste a JSON-LD document to expand it, removing context-dependent shortcuts and rewriting every property and type as a full, absolute IRI. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON-LD to Expanded Converter - Expand JSON-LD Online",
    seoDescription: "Free online JSON-LD expansion tool. Paste a JSON-LD document to expand it into full, absolute IRIs with no context-dependent shortcuts.",
    keywords: ["json-ld to expanded", "json-ld expansion tool", "expand json-ld online", "jsonld.js expand", "json-ld iri expansion"],
    ogTitle: "JSON-LD to Expanded Converter - Expand JSON-LD Online | ToolZoneX",
    ogDescription: "Paste a JSON-LD document to expand it into full IRIs.",
    schemaName: "JSON-LD to Expanded Converter",
    schemaDescription: "Paste a JSON-LD document to expand it into full, absolute IRIs.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What does expansion do to a JSON-LD document?", answer: "Expansion removes all context-dependent shortcuts — short property names, prefixes, and term aliases — and rewrites every property and type as its full, absolute IRI. The result has no @context section at all, because none is needed: every key is already an unambiguous IRI. This is the canonical, most \"spelled-out\" form of a JSON-LD document." }, { question: "Why would I want the expanded form instead of the original document?", answer: "Expansion is JSON-LD's normal form for programmatic processing — once a document is expanded, you can compare, merge, or process it without needing to know which context (or which shorthand terms) the original author used. It's usually an internal step before flattening, framing, or converting to RDF, but it's also useful on its own for inspecting exactly what a document \"really means\" at the IRI level." }, { question: "Does this tool support remote @context URLs (like https://schema.org/)?", answer: "No — this tool intentionally disables network fetches for @context and document dereferencing, since a static, client-side tool can't reliably rely on a remote server's CORS policy or availability. Use a document with an inline @context object (a JSON object, not a URL string) — the sample document above and virtually every hand-written JSON-LD example works this way. If you paste a document whose @context is a URL, you'll get a clear error instead of an unpredictable network failure." }, { question: "Is my document uploaded anywhere?", answer: "No — all JSON-LD processing happens entirely client-side in your browser using the jsonld.js library. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
