import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/remove-pdf-images",
    navName: "Remove PDF Images",
    navDescription: "Strip all images from a PDF file.",
    name: "Remove Images from PDF Online Free",
    description: "Remove all raster images from a PDF while keeping text and vector content. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Images from PDF Online Free",
    seoDescription: "Remove all raster images from a PDF while keeping text and vector content. Free, private, runs entirely in your browser.",
    keywords: ["remove images from pdf", "delete pdf images", "pdf image remover", "strip images pdf"],
    ogTitle: "Remove Images from PDF Online Free | ToolZoneX",
    ogDescription: "Remove all raster images from a PDF while keeping text and vector content. Free, private, runs entirely in your browser.",
    schemaName: "Remove PDF Images",
    schemaDescription: "Remove all raster images from a PDF while keeping text and vector content.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this remove vector graphics too?", answer: "No — only raster image XObjects are removed. Vector paths, lines, and text remain intact." }, { question: "Is my file uploaded anywhere?", answer: "No — all processing happens in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
