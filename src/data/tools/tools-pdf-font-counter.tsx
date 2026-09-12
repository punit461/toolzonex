import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-font-counter",
    navName: "PDF Font Counter",
    navDescription: "Count distinct fonts used in a PDF.",
    name: "PDF Font Counter",
    description: "Count how many distinct fonts are used across every page of a PDF, and see their names. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Font Counter - Count Fonts Used in a PDF",
    seoDescription: "Free online PDF font counter. Count how many distinct fonts are used in a PDF and see every font name found.",
    keywords: ["pdf font counter", "count fonts in pdf", "pdf font count", "how many fonts pdf", "pdf typeface counter"],
    ogTitle: "PDF Font Counter - Count Fonts Used in a PDF | ToolZoneX",
    ogDescription: "Count how many distinct fonts are used across every page of a PDF, and see their names.",
    schemaName: "PDF Font Counter",
    schemaDescription: "Count how many distinct fonts are used across every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why does it say no fonts were detected?", answer: "Scanned or photographed PDFs are just images of text with no underlying text layer, so there are no fonts to detect." }, { question: "Are the font names always the original font family name?", answer: "Usually, but some PDFs use subsetted or renamed fonts, which can show an internal identifier rather than the exact original font name." }, { question: "Is my file uploaded anywhere?", answer: "No — analysis happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
