import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/jsonld-to-flattened",
    navName: "JSON-LD to Flattened",
    navDescription: "Flatten a JSON-LD document into one node array.",
    name: "JSON-LD to Flattened Converter",
    description: "Paste a JSON-LD document to flatten it, collecting every node — however deeply nested — into a single flat array indexed by @id. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON-LD to Flattened Converter - Flatten JSON-LD Online",
    seoDescription: "Free online JSON-LD flattening tool. Paste a JSON-LD document to flatten every node, nested or not, into a single flat array indexed by @id.",
    keywords: ["json-ld to flattened", "json-ld flattening tool", "flatten json-ld online", "jsonld.js flatten", "json-ld node array"],
    ogTitle: "JSON-LD to Flattened Converter - Flatten JSON-LD Online | ToolZoneX",
    ogDescription: "Paste a JSON-LD document to flatten every node into one array.",
    schemaName: "JSON-LD to Flattened Converter",
    schemaDescription: "Paste a JSON-LD document to flatten every node into a single flat array.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What does flattening do?", answer: "Flattening collects every node in a JSON-LD document — including deeply nested ones — into a single flat array, each with its own @id, and replaces nested object references with @id-only pointers. It removes multiple levels of nesting from the document's structure, which makes it easier to look up any node by its identifier without walking the whole tree." }, { question: "How is flattening different from expansion?", answer: "Expansion resolves shorthand terms into full IRIs but keeps the document's original nested shape. Flattening goes a step further: it also restructures the document itself, pulling every node — nested or not — out into one flat top-level array of node objects. In this tool, flattening runs on the expanded form internally and the result is itself in expanded (IRI) form, not recompacted against your original context." }, { question: "Does this tool support remote @context URLs (like https://schema.org/)?", answer: "No — this tool intentionally disables network fetches for @context and document dereferencing, since a static, client-side tool can't reliably rely on a remote server's CORS policy or availability. Use a document with an inline @context object (a JSON object, not a URL string) — the sample document above and virtually every hand-written JSON-LD example works this way. If you paste a document whose @context is a URL, you'll get a clear error instead of an unpredictable network failure." }, { question: "Is my document uploaded anywhere?", answer: "No — all JSON-LD processing happens entirely client-side in your browser using the jsonld.js library. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
