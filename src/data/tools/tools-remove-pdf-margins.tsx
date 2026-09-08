import CropIcon from '@mui/icons-material/Crop';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/remove-pdf-margins",
    navName: "Remove PDF Margins",
    navDescription: "Strip crop, trim, and bleed margins from PDF pages.",
    name: "Remove PDF Margins - Strip Margins from PDF",
    description: "Remove crop, trim, bleed, and art box margins from every page of a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <CropIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove PDF Margins Online Free",
    seoDescription: "Remove crop, trim, bleed, and art box margins from every page of a PDF. Free, private, runs in your browser.",
    keywords: ["remove pdf margins", "trim pdf margins", "pdf margin remover", "crop pdf margins"],
    ogTitle: "Remove PDF Margins Online Free | ToolZoneX",
    ogDescription: "Remove crop, trim, bleed, and art box margins from every page of a PDF. Free, private, runs in your browser.",
    schemaName: "Remove PDF Margins",
    schemaDescription: "Remove crop, trim, bleed, and art box margins from every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this actually crop the content?", answer: "It removes the crop, trim, bleed, and art boxes so the viewer uses the full media box. Content inside the media box is preserved." }, { question: "What if the PDF has no extra margins?", answer: "The tool still runs safely — if no trim or bleed boxes exist, the output is effectively unchanged." }, { question: "Is my file uploaded anywhere?", answer: "No — processing happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
