import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-embedded-image-exporter",
    navName: "PDF Embedded Image Exporter",
    navDescription: "Extract all embedded images from a PDF.",
    name: "PDF Embedded Image Exporter - Extract All Images from PDF",
    description: "Export all embedded images from a PDF as individual PNG files. Preview thumbnails and download each one. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Embedded Image Exporter - Extract All Images from PDF",
    seoDescription: "Free online PDF image exporter. Extract all embedded images from a PDF — preview thumbnails and download each as a PNG file.",
    keywords: ["export pdf images", "extract embedded images pdf", "pdf image exporter", "get images from pdf"],
    ogTitle: "PDF Embedded Image Exporter - Extract All Images from PDF | ToolZoneX",
    ogDescription: "Export all embedded images from a PDF as individual PNG files. Free, private, runs entirely in your browser.",
    schemaName: "PDF Embedded Image Exporter",
    schemaDescription: "Extract all embedded images from a PDF as individual files.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What image formats does it support?", answer: "Any image embedded in the PDF — JPEG, PNG, or other formats — is detected and saved as a PNG file." }, { question: "Does it catch background images?", answer: "Yes — any image XObject on a page, whether foreground or background, will be detected and extracted." }, { question: "Is my file uploaded anywhere?", answer: "No — extraction runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
