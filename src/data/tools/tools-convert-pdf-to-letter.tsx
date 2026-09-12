import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/convert-pdf-to-letter",
    navName: "Convert PDF to Letter",
    navDescription: "Convert any PDF to US Letter page size.",
    name: "Convert PDF to Letter Size Online Free",
    description: "Resize all pages of a PDF to US Letter dimensions (8.5 × 11 inches). Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Convert PDF to Letter Size Online Free",
    seoDescription: "Free online tool to convert any PDF to US Letter size (8.5 × 11 inches). Resize all pages instantly in your browser.",
    keywords: ["convert pdf to letter", "pdf to letter size", "letter pdf converter", "resize pdf to letter", "change pdf to letter", "us letter pdf"],
    ogTitle: "Convert PDF to Letter Size Online Free | ToolZoneX",
    ogDescription: "Resize all pages of a PDF to US Letter dimensions. Free, private, runs entirely in your browser.",
    schemaName: "Convert PDF to Letter",
    schemaDescription: "Resize all pages of a PDF to US Letter dimensions (8.5 × 11 inches).",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is US Letter size?", answer: "US Letter is 8.5 × 11 inches (612 × 792 points). It is slightly wider and shorter than A4 (210 × 297 mm)." }, { question: "Will an A4 PDF look right after conversion?", answer: "A4 is 595.28 × 841.89 points, so the Letter canvas is slightly wider and shorter. Content near the top or bottom of A4 pages may shift, but nothing should be cut off at normal margins." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion happens entirely in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
