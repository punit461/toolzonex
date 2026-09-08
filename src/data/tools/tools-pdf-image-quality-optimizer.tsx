import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-image-quality-optimizer",
    navName: "PDF Image Quality Optimizer",
    navDescription: "Fine-tune image quality in a PDF with a slider.",
    name: "PDF Image Quality Optimizer - Optimize PDF Images Online",
    description: "Optimize image quality in a PDF with a granular quality slider from 10% to 100%. Re-encodes images at your chosen quality to shrink file size. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Image Quality Optimizer - Optimize PDF Images Online",
    seoDescription: "Fine-tune image quality in a PDF with a quality slider from 10% to 100%. Free online optimizer.",
    keywords: ["optimize pdf images", "pdf image quality", "reduce pdf image quality", "pdf image optimizer", "pdf image quality slider", "adjust pdf image quality", "pdf image compression control", "optimize images in pdf online", "pdf image quality reducer", "pdf image optimizer tool", "pdf image quality optimizer online free", "control pdf image quality", "pdf image quality settings", "reduce image quality pdf", "optimize pdf images online free", "pdf image quality slider tool", "pdf image compression optimizer", "pdf image quality reducer tool", "adjust image quality in pdf", "pdf image optimization online", "how to optimize pdf images", "pdf image quality compressor", "pdf image quality optimizer free", "pdf image size optimizer", "reduce pdf image quality online", "optimize pdf images for web free online"],
    ogTitle: "PDF Image Quality Optimizer - Optimize PDF Images Online | ToolZoneX",
    ogDescription: "Fine-tune image quality in a PDF with a granular slider from 10% to 100%. Free, private, runs in your browser.",
    schemaName: "PDF Image Quality Optimizer",
    schemaDescription: "Optimize image quality in a PDF with a granular quality slider from 10% to 100%.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What quality percentage should I pick?", answer: "40-60% is a good starting point for most documents. Text and vector elements are completely unaffected by this change." }, { question: "Does this affect text sharpness?", answer: "No — only raster images embedded in the PDF are re-encoded. Text and vector paths remain untouched." }, { question: "Is my file uploaded anywhere?", answer: "No — optimization runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
