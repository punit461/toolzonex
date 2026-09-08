import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-page-aspect-ratio",
    navName: "PDF Aspect Ratio Checker",
    navDescription: "Check aspect ratio of PDF pages.",
    name: "PDF Page Aspect Ratio Checker - Check PDF Page Ratios",
    description: "Check the aspect ratio of every page in a PDF and match each to a standard size (A4, Letter, Legal, A3, A5). Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Page Aspect Ratio Checker - Check PDF Page Ratios",
    seoDescription: "Free online PDF page aspect ratio checker. See the width-to-height ratio for every page and match to standard sizes like A4, Letter, and Legal.",
    keywords: ["pdf aspect ratio", "check pdf ratio", "pdf page ratio", "pdf page aspect ratio checker", "a4 aspect ratio", "letter aspect ratio"],
    ogTitle: "PDF Page Aspect Ratio Checker - Check PDF Page Ratios | ToolZoneX",
    ogDescription: "Check the aspect ratio of every page in a PDF and match each to a standard size.",
    schemaName: "PDF Page Aspect Ratio Checker",
    schemaDescription: "Check the aspect ratio of every page in a PDF and match each to a standard size.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why does a page show as \"Custom\"?", answer: "If the dimensions don't match any built-in standard (A4, A3, A5, Letter, Legal, Tabloid) within a few points, the page is labelled \"Custom\"." }, { question: "Is my file uploaded anywhere?", answer: "No — all analysis happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
