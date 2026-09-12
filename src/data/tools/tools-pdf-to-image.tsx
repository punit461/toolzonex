import ImageIcon from '@mui/icons-material/Image';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-image",
    navName: "PDF to Image",
    navDescription: "Convert PDF pages to PNG images.",
    name: "PDF to Image Converter - Convert PDF to PNG Online",
    description: "Convert every page of a PDF into a high-quality PNG image. Choose 1x, 2x, or 3x resolution. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <ImageIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to Image Converter - Convert PDF to PNG Online",
    seoDescription: "Convert every page of a PDF into a high-quality PNG image. Choose your desired resolution and download each page as a separate PNG file.",
    keywords: ["pdf to image", "convert pdf to png", "pdf to png", "pdf image converter"],
    ogTitle: "PDF to Image Converter - Convert PDF to PNG Online | ToolZoneX",
    ogDescription: "Convert every page of a PDF into a high-quality PNG image. Choose 1x, 2x, or 3x resolution.",
    schemaName: "PDF to Image",
    schemaDescription: "Convert all pages of a PDF into individual PNG images at your chosen resolution.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What resolution should I pick?", answer: "Use 1x for web thumbnails, 2x for standard prints, and 3x for high-DPI displays or large prints." }, { question: "Does this work with encrypted PDFs?", answer: "Yes — you will be prompted to enter the password before conversion begins." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
