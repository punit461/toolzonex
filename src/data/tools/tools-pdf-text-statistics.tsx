import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-text-statistics",
    navName: "PDF Text Statistics",
    navDescription: "Word count & text analysis for PDFs.",
    name: "PDF Text Statistics - Word Count & Text Analysis Online",
    description: "Get word count, character count, sentence count, and average words per sentence for any PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Text Statistics - Word Count & Text Analysis Online",
    seoDescription: "Free online PDF text statistics tool. Get word count, character count, sentence count, paragraph count, and average words per sentence for any PDF.",
    keywords: ["pdf word count", "pdf text statistics", "count words in pdf", "pdf text analysis", "word count pdf", "pdf character count"],
    ogTitle: "PDF Text Statistics - Word Count & Text Analysis Online | ToolZoneX",
    ogDescription: "Get word count, character count, sentence count, and average words per sentence for any PDF. Free, private, runs entirely in your browser.",
    schemaName: "PDF Text Statistics",
    schemaDescription: "Get word count, character count, sentence count, and average words per sentence for any PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this count text in images or scanned pages?", answer: "No — only the selectable text layer is extracted. Scanned PDFs without an OCR text layer will show zero words." }, { question: "Are headers and footers included?", answer: "Yes — every piece of selectable text on every page is counted." }, { question: "Is my file uploaded anywhere?", answer: "No — all analysis happens entirely in your browser; the PDF never leaves your device." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
