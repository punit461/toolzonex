import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-llamaindex-json",
    navName: "PDF to LlamaIndex JSON",
    navDescription: "Convert a PDF into LlamaIndex JSON.",
    name: "PDF to LlamaIndex JSON",
    description: "Convert a PDF's per-page text into a JSON array matching LlamaIndex's Document format. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to LlamaIndex JSON Converter Online Free",
    seoDescription: "Free online tool to convert a PDF into LlamaIndex-ready JSON. Extracts per-page text with metadata for RAG and LLM ingestion pipelines.",
    keywords: ["pdf to llamaindex json", "llamaindex document format", "pdf to json for llm", "pdf rag json", "pdf to llm json"],
    ogTitle: "PDF to LlamaIndex JSON Converter Online Free | ToolZoneX",
    ogDescription: "Convert a PDF's per-page text into a JSON array matching LlamaIndex's Document format.",
    schemaName: "PDF to LlamaIndex JSON",
    schemaDescription: "Convert a PDF's per-page text into a JSON array matching LlamaIndex's Document format.",
    applicationCategory: "DeveloperApplication",
    currency: "USD",
    faqs: [{ question: "Why does one document's text come out empty?", answer: "Scanned or photographed pages have no underlying text layer, so there is nothing to extract from that page — the JSON entry is still created, just with empty text." }, { question: "Does this exactly match LlamaIndex's internal Document class?", answer: "It matches the common simple JSON shape (text + metadata) used when loading documents manually — you can load this JSON and construct Document objects from it in your own ingestion code." }, { question: "Is my file uploaded anywhere?", answer: "No — extraction happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
