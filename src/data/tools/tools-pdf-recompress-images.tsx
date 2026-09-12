import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-recompress-images",
    navName: "PDF Recompress Images",
    navDescription: "Recompress images to shrink PDF file size.",
    name: "PDF Recompress Images - Reduce PDF Image Size Online",
    description: "Recompress the images inside a PDF to reduce file size. Choose low, medium, or high quality. See before/after size comparison. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Recompress Images - Reduce PDF Image Size Online",
    seoDescription: "Recompress images inside a PDF to reduce file size. Choose low, medium, or high quality. Free online tool.",
    keywords: ["recompress pdf images", "compress pdf images", "reduce pdf image size", "pdf image compressor", "shrink pdf images", "pdf image recompress", "reduce pdf file size images", "pdf photo compressor", "compress images in pdf", "pdf image size reducer", "smaller pdf images", "pdf image recompression tool", "pdf image shrinker", "pdf reduce image quality", "compress pdf images online free", "recompress images in pdf free", "pdf image compressor online", "reduce pdf size by compressing images", "pdf image recompress tool", "how to reduce pdf image size", "pdf image compression tool", "compress embedded images pdf", "pdf image optimizer", "reduce pdf photo size", "pdf image recompress online free", "recompress images pdf to reduce size online free"],
    ogTitle: "PDF Recompress Images - Reduce PDF Image Size Online | ToolZoneX",
    ogDescription: "Recompress images inside a PDF to reduce file size. Low, medium, or high quality. Free, private, runs in your browser.",
    schemaName: "PDF Recompress Images",
    schemaDescription: "Recompress the images inside a PDF to reduce file size.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will this reduce text quality?", answer: "No — only embedded raster images are re-encoded. Text and vector graphics remain crisp." }, { question: "Why is the output sometimes larger?", answer: "If the original images were already compressed aggressively, re-encoding may not shrink them further and can even produce a slightly larger file." }, { question: "Is my file uploaded anywhere?", answer: "No — recompression runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
