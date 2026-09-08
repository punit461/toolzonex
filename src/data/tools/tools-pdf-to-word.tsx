import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-word",
    navName: "PDF to Word",
    navDescription: "Extract PDF text into an editable .docx file.",
    name: "PDF to Word",
    description: "Extract a PDF's text into a real, Word-compatible .docx file. Text only — original layout, fonts, and images aren't preserved. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to Word Converter - Convert PDF to DOCX Online Free",
    seoDescription: "Free online PDF to Word converter. Extract a PDF's text into a real .docx file, entirely in your browser. Text only — layout and images aren't preserved.",
    keywords: ["pdf to word", "pdf to word converter", "convert pdf to docx", "pdf to docx online free", "pdf to editable word document"],
    ogTitle: "PDF to Word Converter Online Free | ToolZoneX",
    ogDescription: "Extract a PDF's text into a real, Word-compatible .docx file.",
    schemaName: "PDF to Word",
    schemaDescription: "Extract a PDF's text into a real, Word-compatible .docx file.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will the formatting, fonts, and layout be preserved?", answer: "No — only the extracted plain text is preserved, with paragraph breaks and a page break between original pages. Fonts, colors, images, tables, and multi-column layouts from the source PDF are not carried over." }, { question: "Is the output a real .docx file?", answer: "Yes — it's a genuinely valid Word Open XML document that opens natively in Microsoft Word, Google Docs, and LibreOffice, not a renamed text file." }, { question: "Why does it say no text was found?", answer: "Scanned or photographed PDFs are usually just images with no underlying text layer. Run the OCR PDF tool first to recognize the text, then convert that." }, { question: "Is my file uploaded anywhere?", answer: "No — extraction and document creation both happen entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
