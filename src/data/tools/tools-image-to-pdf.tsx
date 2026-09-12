import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/image-to-pdf",
    navName: "Image to PDF",
    navDescription: "Convert multiple images into an A4 PDF with reordering.",
    name: "Image to PDF Converter - Convert Images to PDF Free",
    description: "Convert JPG, PNG, and WEBP images into a PDF document. Upload multiple images, reorder them with arrow buttons, and get a neatly formatted A4 PDF. Free, private, runs entirely in your browser.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Image to PDF Converter - Convert Images to PDF Free",
    seoDescription: "Convert images to PDF online for free. Upload multiple JPG, PNG, or WEBP images, reorder them, and get an A4 PDF. No uploads.",
    keywords: ["image to pdf", "convert image to pdf", "jpg to pdf", "photo to pdf"],
    ogTitle: "Image to PDF Converter - Convert Images to PDF Free | ToolZoneX",
    ogDescription: "Convert multiple images to a PDF online. Reorder pages and download. Free, private, runs in your browser.",
    schemaName: "Image to PDF Converter",
    schemaDescription: "Convert multiple images into an A4 PDF with reordering.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What image formats are supported?", answer: "JPG, PNG, and WEBP. All are converted to PNG internally before embedding." }, { question: "Does it fit images to A4?", answer: "Yes — each image is scaled proportionally to fill an A4 page with a small margin." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion happens entirely in your browser using pdf-lib." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
