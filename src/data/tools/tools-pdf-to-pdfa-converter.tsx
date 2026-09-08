import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-pdfa-converter",
    navName: "PDF to PDF/A Converter",
    navDescription: "Apply PDF/A-style metadata for basic archival hygiene.",
    name: "PDF to PDF/A Converter",
    description: "Apply PDF/A-style metadata and confirm a PDF isn't encrypted — an approximation aimed at basic archival best practices, not certified PDF/A validation. Free, private, browser-based.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to PDF/A Converter Online Free - Archival PDF Metadata",
    seoDescription: "Free online PDF to PDF/A converter. Apply PDF/A-style metadata and confirm a PDF isn't encrypted, entirely in your browser. Approximation only, not certified PDF/A validation.",
    keywords: ["pdf to pdfa converter", "convert pdf to pdf/a", "pdf/a converter online free", "pdf archival format converter", "pdf/a compliance tool"],
    ogTitle: "PDF to PDF/A Converter Online Free | ToolZoneX",
    ogDescription: "Apply PDF/A-style metadata and confirm a PDF isn't encrypted — an approximation aimed at basic archival best practices.",
    schemaName: "PDF to PDF/A Converter",
    schemaDescription: "Apply PDF/A-style metadata and confirm a PDF isn't encrypted — an approximation aimed at basic archival best practices.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will this pass a PDF/A validator like veraPDF?", answer: "Not guaranteed. This tool doesn't verify or fix font embedding, color profile conformance, or transparency usage — all of which a strict validator checks. Treat the output as PDF/A-style, not certified PDF/A." }, { question: "What does it actually change?", answer: "It confirms the file isn't encrypted, sets title/author/producer/creator metadata and creation/modification dates, sets a document language if missing, and re-saves the file with a clean structure." }, { question: "My PDF has non-embedded fonts — does this embed them?", answer: "No. Font embedding depends on the original PDF's construction and isn't something this tool inspects or modifies." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
