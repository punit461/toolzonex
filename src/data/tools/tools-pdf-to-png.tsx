import ImageIcon from '@mui/icons-material/Image';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-png",
    navName: "PDF to PNG",
    navDescription: "Export PDF pages as lossless PNG files.",
    name: "PDF to PNG Converter - Convert PDF to PNG Online Free",
    description: "Export every page of a PDF as a lossless PNG image at your chosen DPI. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <ImageIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to PNG Converter - Convert PDF to PNG Online Free",
    seoDescription: "Export every page of a PDF as a lossless PNG image. Choose 72, 144, or 216 DPI output.",
    keywords: ["pdf to png", "convert pdf to png", "pdf png converter", "export pdf as png"],
    ogTitle: "PDF to PNG Converter - Convert PDF to PNG Online Free | ToolZoneX",
    ogDescription: "Export every page of a PDF as a lossless PNG image at your chosen DPI.",
    schemaName: "PDF to PNG",
    schemaDescription: "Export every page of a PDF as a lossless PNG image at your chosen DPI.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What DPI is best for my use case?", answer: "72 DPI is fine for screen thumbnails, 144 DPI for standard printing, and 216 DPI for high-quality archival or large-format prints." }, { question: "Is there a page limit?", answer: "No — all pages are processed regardless of the PDF length." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
