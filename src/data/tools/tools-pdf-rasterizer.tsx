import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-rasterizer",
    navName: "PDF Rasterizer",
    navDescription: "Convert PDF pages to PNG images.",
    name: "PDF Rasterizer - Convert PDF to Images Online Free",
    description: "Convert every page of a PDF into a high-resolution PNG image. Download individual pages or preview them all. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Rasterizer - Convert PDF to Images Online Free",
    seoDescription: "Free online PDF rasterizer. Convert every page of a PDF into a high-resolution PNG image at 2× resolution.",
    keywords: ["pdf rasterizer", "pdf to png", "convert pdf to images", "pdf page to image", "pdf to picture", "pdf image converter"],
    ogTitle: "PDF Rasterizer - Convert PDF to Images Online Free | ToolZoneX",
    ogDescription: "Convert every page of a PDF into a high-resolution PNG image. Download individual pages. Free, private, runs entirely in your browser.",
    schemaName: "PDF Rasterizer",
    schemaDescription: "Convert every page of a PDF into a high-resolution PNG image.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why are the images larger than the screen display?", answer: "Pages are rendered at 2× resolution to produce sharp images. The actual pixel dimensions will be roughly double the on-screen points." }, { question: "Can I control the output resolution?", answer: "This version uses a fixed 2× scale. For most uses this provides a good balance between quality and file size." }, { question: "Is my file uploaded anywhere?", answer: "No — rasterization happens entirely in your browser." }],
    isHub: false,
};

export default tool;
