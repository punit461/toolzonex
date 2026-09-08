import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-text",
    navName: "PDF to Text",
    navDescription: "Extract text from a PDF.",
    name: "PDF to Text - Extract Text from PDF",
    description: "Extract all selectable text from a PDF, page by page, then copy it or download it as a .txt file. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to Text - Extract Text from PDF Online Free",
    seoDescription: "Free online PDF to text converter. Extract all selectable text from a PDF, page by page, then copy it or download it as a .txt file.",
    keywords: ["pdf to text", "extract text from pdf", "pdf text extractor", "convert pdf to txt", "copy text from pdf"],
    ogTitle: "PDF to Text - Extract Text from PDF Online Free | ToolZoneX",
    ogDescription: "Extract all selectable text from a PDF, page by page, then copy it or download it as a .txt file.",
    schemaName: "PDF to Text",
    schemaDescription: "Extract the selectable text layer from every page of a PDF into plain text.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why does it say no text was found?", answer: "Scanned or photographed PDFs are usually just images of text with no underlying text layer, so there is nothing to extract. You would need OCR software to pull text out of those." }, { question: "Does this preserve formatting like tables or columns?", answer: "No — text is extracted in reading order as plain text, so complex layouts (multi-column pages, tables) may come out re-flowed." }, { question: "Is my file uploaded anywhere?", answer: "No — extraction happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
