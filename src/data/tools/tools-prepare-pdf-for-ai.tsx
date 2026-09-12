import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/prepare-pdf-for-ai",
    navName: "Prepare PDF for AI",
    navDescription: "Clean and chunk PDF text for LLMs.",
    name: "Prepare PDF for AI",
    description: "Extract, clean, and chunk a PDF's text for LLM or RAG ingestion, with configurable chunk size and overlap. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Prepare PDF for AI / RAG - Clean & Chunk Text Online",
    seoDescription: "Free online tool to prepare a PDF for AI. Extracts and cleans text, then splits it into configurable chunks for LLM context windows or RAG pipelines.",
    keywords: ["prepare pdf for ai", "pdf chunking for rag", "pdf text chunker", "pdf for llm", "chunk pdf text"],
    ogTitle: "Prepare PDF for AI / RAG Online Free | ToolZoneX",
    ogDescription: "Extract, clean, and chunk a PDF's text for LLM or RAG ingestion.",
    schemaName: "Prepare PDF for AI",
    schemaDescription: "Extract, clean, and chunk a PDF's text for LLM or RAG ingestion, with configurable chunk size and overlap.",
    applicationCategory: "DeveloperApplication",
    currency: "USD",
    faqs: [{ question: "Why use overlap between chunks?", answer: "Overlap keeps a bit of context from the end of one chunk repeated in the next, so a fact or sentence split at a chunk boundary isn't lost when a language model or search index processes each chunk independently." }, { question: "What size chunk should I use?", answer: "500–1500 characters works well for most RAG setups; use smaller chunks for precise retrieval or larger chunks if your model or index handles more context per entry." }, { question: "Is my file uploaded anywhere?", answer: "No — extraction, cleaning, and chunking all happen entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
