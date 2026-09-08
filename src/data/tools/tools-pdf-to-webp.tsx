import ImageIcon from '@mui/icons-material/Image';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-webp",
    navName: "PDF to WebP",
    navDescription: "Convert PDF pages to modern WebP images.",
    name: "PDF to WEBP Converter - Convert PDF to WebP Online",
    description: "Convert every page of a PDF into a modern, lightweight WebP image with adjustable quality. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <ImageIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to WEBP Converter - Convert PDF to WebP Online",
    seoDescription: "Convert every page of a PDF into a modern WebP image. Adjustable quality for optimal file size.",
    keywords: ["pdf to webp", "convert pdf to webp", "pdf webp converter", "export pdf as webp"],
    ogTitle: "PDF to WEBP Converter - Convert PDF to WebP Online | ToolZoneX",
    ogDescription: "Convert every page of a PDF into a modern, lightweight WebP image with adjustable quality.",
    schemaName: "PDF to WebP",
    schemaDescription: "Convert every page of a PDF into a modern WebP image with adjustable quality.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is WebP supported everywhere?", answer: "All modern browsers (Chrome, Firefox, Edge, Safari 14+) support WebP. Older browsers may fall back to displaying the original." }, { question: "How does WebP compare to PNG?", answer: "WebP typically produces smaller files than PNG with comparable visual quality, especially for photographs and complex graphics." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
