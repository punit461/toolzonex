import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-black-and-white-converter",
    navName: "PDF Black & White Converter",
    navDescription: "Threshold a PDF into pure black and white.",
    name: "PDF Black & White Converter",
    description: "Convert every page of a PDF into pure black and white using an adjustable brightness threshold. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Black and White Converter - Threshold PDF Online Free",
    seoDescription: "Free online PDF black and white converter. Threshold every page into pure black or white pixels with an adjustable slider, entirely in your browser.",
    keywords: ["pdf black and white converter", "pdf threshold", "convert pdf to black and white", "pdf binary threshold", "fax style pdf"],
    ogTitle: "PDF Black & White Converter Online Free | ToolZoneX",
    ogDescription: "Convert every page of a PDF into pure black and white using an adjustable brightness threshold.",
    schemaName: "PDF Black and White Converter",
    schemaDescription: "Convert every page of a PDF into pure black and white using an adjustable brightness threshold.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does the threshold control?", answer: "It's the brightness cutoff (0-255) that decides whether a pixel becomes white or black. A higher threshold makes more pixels turn black; a lower threshold makes more turn white." }, { question: "How is this different from Grayscale?", answer: "Grayscale keeps smooth shades of gray. This tool uses a hard threshold so every pixel becomes either pure black or pure white, like a fax or photocopy." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
