import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-reading-time",
    navName: "PDF Reading Time",
    navDescription: "Estimate how long a PDF takes to read.",
    name: "PDF Reading Time Calculator - How Long to Read a PDF",
    description: "Calculate estimated reading time for any PDF based on word count and average reading speeds. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Reading Time Calculator - How Long to Read a PDF",
    seoDescription: "Free online PDF reading time calculator. See how long it takes to read a PDF at slow, average, and fast reading speeds.",
    keywords: ["pdf reading time", "how long to read pdf", "pdf reading speed", "reading time calculator", "pdf word count time"],
    ogTitle: "PDF Reading Time Calculator - How Long to Read a PDF | ToolZoneX",
    ogDescription: "Calculate estimated reading time for any PDF based on word count and average reading speeds. Free, private, runs entirely in your browser.",
    schemaName: "PDF Reading Time Calculator",
    schemaDescription: "Calculate estimated reading time for any PDF based on word count and average reading speeds.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What words-per-minute speeds are used?", answer: "Slow: 200 wpm, Average: 225 wpm, Fast: 250 wpm — based on typical adult reading speed research." }, { question: "Does this include images and charts?", answer: "No — only the text layer is counted. Time spent studying graphics or tables is not included." }, { question: "Is my file uploaded anywhere?", answer: "No — all calculation happens entirely in your browser; the PDF never leaves your device." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
