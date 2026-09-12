import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/jsonld-to-framed",
    navName: "JSON-LD to Framed",
    navDescription: "Reshape a JSON-LD document with a frame.",
    name: "JSON-LD to Framed Converter",
    description: "Paste a JSON-LD document and a frame to reshape the document into the exact structure the frame describes. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON-LD to Framed Converter - Frame JSON-LD Online",
    seoDescription: "Free online JSON-LD framing tool. Paste a JSON-LD document and a frame to reshape the document into the exact structure the frame describes.",
    keywords: ["json-ld to framed", "json-ld framing tool", "frame json-ld online", "jsonld.js frame", "json-ld frame example"],
    ogTitle: "JSON-LD to Framed Converter - Frame JSON-LD Online | ToolZoneX",
    ogDescription: "Paste a JSON-LD document and a frame to reshape the document.",
    schemaName: "JSON-LD to Framed Converter",
    schemaDescription: "Paste a JSON-LD document and a frame to reshape the document into the frame's structure.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What does a JSON-LD frame do?", answer: "A frame is a JSON-LD document (or document with a @context) that describes the shape you want the output in — which node type or properties must be present, and what order/nesting to arrange matching nodes. Framing matches your input document against the frame's pattern and rebuilds a document in that shape, filling in only the branches that matched." }, { question: "Why did framing return an empty result / just the context?", answer: "Framing only includes nodes that match every constraint in your frame — if you require a specific @type, a specific property to exist, or a specific value, only nodes satisfying all of it are used, and everything else is dropped silently. If you get back an empty (or nearly empty) result, double-check that the property names and values in your frame actually match what's in your document — for instance, a frame requiring \"@type\": \"http://schema.org/Person\" won't match anything unless your document actually sets that type on a node." }, { question: "Does this tool support remote @context URLs (like https://schema.org/)?", answer: "No — this tool intentionally disables network fetches for @context and document dereferencing, since a static, client-side tool can't reliably rely on a remote server's CORS policy or availability. Use a document and frame with an inline @context object (a JSON object, not a URL string) — the sample above works this way. If either your document or your frame has a @context that's a URL, you'll get a clear error instead of an unpredictable network failure." }, { question: "Is my document uploaded anywhere?", answer: "No — all JSON-LD processing happens entirely client-side in your browser using the jsonld.js library. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
