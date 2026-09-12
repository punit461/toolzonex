import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/crop-pdf",
    navName: "Crop PDF",
    navDescription: "Crop margins from PDF pages.",
    name: "Crop PDF Pages Online Free",
    description: "Trim margins from every page of a PDF by specifying top, right, bottom, and left crop amounts in millimetres. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Crop PDF Pages Online Free",
    seoDescription: "Free online PDF cropper. Trim margins from every page of a PDF by specifying crop amounts for each edge in millimetres.",
    keywords: ["crop pdf", "crop pdf pages", "trim pdf margins", "pdf margin remover", "cut pdf edges", "pdf crop tool"],
    ogTitle: "Crop PDF Pages Online Free | ToolZoneX",
    ogDescription: "Trim margins from every page of a PDF by specifying crop amounts for each edge. Free, private, runs entirely in your browser.",
    schemaName: "Crop PDF",
    schemaDescription: "Trim margins from every page of a PDF by specifying crop amounts for each edge.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What happens if the margins are too large?", answer: "If the crop area would be zero or negative on any dimension, that page is left unchanged to avoid creating an invalid PDF." }, { question: "Does this delete the content outside the margins?", answer: "It sets the crop and media boxes so the trimmed area is no longer visible or printed. The original content may still exist in the file but won't be displayed." }, { question: "Is my file uploaded anywhere?", answer: "No — cropping happens entirely in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
