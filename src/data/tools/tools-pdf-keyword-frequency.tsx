import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-keyword-frequency",
    navName: "PDF Keyword Frequency",
    navDescription: "Find how often words appear in a PDF.",
    name: "PDF Keyword Frequency - Find Word Frequency in PDF Online",
    description: "Search for keywords in a PDF and see how often each appears, with frequency percentages. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Keyword Frequency - Find Word Frequency in PDF Online",
    seoDescription: "Free online PDF keyword frequency tool. Search for one or more keywords and see how often each appears with frequency percentages.",
    keywords: ["pdf keyword frequency", "word frequency pdf", "search keywords in pdf", "pdf word count tool", "pdf keyword search", "keyword density pdf"],
    ogTitle: "PDF Keyword Frequency - Find Word Frequency in PDF Online | ToolZoneX",
    ogDescription: "Search for keywords in a PDF and see how often each appears, with frequency percentages. Free, private, runs entirely in your browser.",
    schemaName: "PDF Keyword Frequency",
    schemaDescription: "Search for keywords in a PDF and see how often each appears, with frequency percentages.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is the search case-insensitive?", answer: "Yes — 'Revenue', 'revenue', and 'REVENUE' are all counted together." }, { question: "Does it match partial words?", answer: "No — keyword matching is by whole word. Searching for 'profit' will not match 'profitable'." }, { question: "Is my file uploaded anywhere?", answer: "No — all analysis happens entirely in your browser; the PDF never leaves your device." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
