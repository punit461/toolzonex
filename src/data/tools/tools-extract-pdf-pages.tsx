import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/extract-pdf-pages",
    navName: "Extract PDF Pages",
    navDescription: "Pull specific pages into a new PDF.",
    name: "Extract PDF Pages",
    description: "Pull specific pages out of a PDF into a new file. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Extract PDF Pages - Pull Pages from PDF Free",
    seoDescription: "Pull specific pages out of a PDF into a new file. Free, private, runs entirely in your browser.",
    keywords: ["extract pdf pages", "pull pages from pdf", "pdf page extractor"],
    ogTitle: "Extract PDF Pages - Pull Pages from PDF Free | ToolZoneX",
    ogDescription: "Pull specific pages out of a PDF into a new file. Free, private, runs entirely in your browser.",
    schemaName: "ExtractPdfPages",
    schemaDescription: "Pull specific pages out of a PDF into a new file. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
