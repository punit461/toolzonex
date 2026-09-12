import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/convert-pdf-to-a4",
    navName: "Convert PDF to A4",
    navDescription: "Convert any PDF to A4 page size.",
    name: "Convert PDF to A4 Size Online Free",
    description: "Resize all pages of a PDF to standard A4 dimensions (210 × 297 mm). Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Convert PDF to A4 Size Online Free",
    seoDescription: "Free online tool to convert any PDF to A4 size. Resize all pages to standard A4 dimensions (210 × 297 mm) instantly in your browser.",
    keywords: ["convert pdf to a4", "pdf to a4", "a4 pdf converter", "resize pdf to a4", "change pdf to a4 size", "make pdf a4"],
    ogTitle: "Convert PDF to A4 Size Online Free | ToolZoneX",
    ogDescription: "Resize all pages of a PDF to standard A4 dimensions. Free, private, runs entirely in your browser.",
    schemaName: "Convert PDF to A4",
    schemaDescription: "Resize all pages of a PDF to standard A4 dimensions (210 × 297 mm).",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will the content stretch or get cut off?", answer: "The page canvas is resized to A4 dimensions. Content is not reflowed, so some elements may shift if the original size was significantly different." }, { question: "What if my PDF is already A4?", answer: "The tool will still run, but the file will be essentially unchanged — it simply ensures all pages are exactly A4." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion happens entirely in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
