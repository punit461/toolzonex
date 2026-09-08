import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/duplicate-pdf-pages",
    navName: "Duplicate PDF Pages",
    navDescription: "Duplicate specific pages in a PDF.",
    name: "Duplicate PDF Pages",
    description: "Duplicate specific pages in a PDF any number of times. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Duplicate PDF Pages Online Free",
    seoDescription: "Duplicate specific pages in a PDF online. Free, private, runs in your browser.",
    keywords: ["duplicate pdf pages", "copy pdf pages", "replicate pdf page", "pdf page duplicator"],
    ogTitle: "Duplicate PDF Pages Online Free | ToolZoneX",
    ogDescription: "Duplicate specific pages in a PDF online. Free, private, runs in your browser.",
    schemaName: "DuplicatePdfPages",
    schemaDescription: "Duplicate specific pages in a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I duplicate multiple pages at once?", answer: "Yes, enter comma-separated page numbers (e.g., 1,3,5) and the number of copies." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
};

export default tool;
