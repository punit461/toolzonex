import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/convert-pdf-to-legal",
    navName: "Convert PDF to Legal",
    navDescription: "Convert any PDF to US Legal page size.",
    name: "Convert PDF to Legal Size Online Free",
    description: "Resize all pages of a PDF to US Legal dimensions (8.5 × 14 inches). Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Convert PDF to Legal Size Online Free",
    seoDescription: "Free online tool to convert any PDF to US Legal size (8.5 × 14 inches). Resize all pages instantly in your browser.",
    keywords: ["convert pdf to legal", "pdf to legal size", "legal pdf converter", "resize pdf to legal", "change pdf to legal", "us legal pdf"],
    ogTitle: "Convert PDF to Legal Size Online Free | ToolZoneX",
    ogDescription: "Resize all pages of a PDF to US Legal dimensions. Free, private, runs entirely in your browser.",
    schemaName: "Convert PDF to Legal",
    schemaDescription: "Resize all pages of a PDF to US Legal dimensions (8.5 × 14 inches).",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is US Legal size?", answer: "US Legal is 8.5 × 14 inches (612 × 1008 points). It is taller than US Letter (8.5 × 11 inches)." }, { question: "Will content be cut off?", answer: "The canvas is resized but content is not reflowed. If the original page was wider than 8.5 inches, some content may extend beyond the Legal page boundary." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion happens entirely in your browser." }],
    isHub: false,
};

export default tool;
