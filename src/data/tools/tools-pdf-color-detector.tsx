import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-color-detector",
    navName: "PDF Color Detector",
    navDescription: "Find dominant colors in any PDF file.",
    name: "PDF Color Detector",
    description: "Analyze a PDF and discover its dominant colors with hex codes and percentages.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Color Detector - Find Dominant Colors in PDF",
    seoDescription: "Free online PDF color detector to find the dominant colors in any PDF document. Get hex codes and percentage breakdowns of your PDF's color palette.",
    keywords: ["pdf color detector", "find colors in pdf", "pdf color analysis", "extract pdf colors"],
    ogTitle: "PDF Color Detector - Find Dominant Colors in PDF | ToolZoneX",
    ogDescription: "Free online PDF color detector to find the dominant colors in any PDF document.",
    schemaName: "PDF Color Detector",
    schemaDescription: "Analyze a PDF and discover its dominant colors with hex codes and percentages.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How many pages does the tool analyze?", answer: "It samples up to 5 pages to give you a representative color palette without being too slow for large documents." }, { question: "Does this detect text color?", answer: "Yes — all visible pixels including text, backgrounds, images, and graphics are sampled to give you the overall dominant colors." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
