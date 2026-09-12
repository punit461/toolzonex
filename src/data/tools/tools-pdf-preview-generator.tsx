import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-preview-generator",
    navName: "PDF Preview Generator",
    navDescription: "Preview all pages of a PDF as thumbnails.",
    name: "PDF Preview Generator - Preview PDF Pages Online Free",
    description: "Preview all pages of a PDF file online. See every page as a thumbnail before downloading or printing.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Preview Generator - Preview PDF Pages Online Free",
    seoDescription: "Free online PDF preview generator. View every page of a PDF as a thumbnail in a responsive grid. Click any page to zoom in.",
    keywords: ["pdf preview", "preview pdf online", "pdf page preview", "view pdf pages", "pdf thumbnail viewer", "see pdf pages"],
    ogTitle: "PDF Preview Generator - Preview PDF Pages Online Free | ToolZoneX",
    ogDescription: "Preview all pages of a PDF file as thumbnails. Click any page for a larger view. Free, private, runs entirely in your browser.",
    schemaName: "PDF Preview Generator",
    schemaDescription: "Preview all pages of a PDF file online. See every page as a thumbnail before downloading or printing.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is my PDF uploaded to a server?", answer: "No, the preview is generated entirely in your browser. The file never leaves your device." }, { question: "Can I download individual pages?", answer: "Yes, right-click any thumbnail to save it as an image." }, { question: "Does it work with large PDFs?", answer: "Yes, though very large documents with hundreds of pages may take longer to render all thumbnails." }],
    isHub: false,
    noindex: true,
};

export default tool;
