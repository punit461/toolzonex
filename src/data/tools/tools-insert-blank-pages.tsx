import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/insert-blank-pages",
    navName: "Insert Blank Pages",
    navDescription: "Insert blank pages at specific positions.",
    name: "Insert Blank Pages into PDF",
    description: "Insert blank pages at any position in a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Insert Blank Pages into PDF Online Free",
    seoDescription: "Insert blank pages at any position in a PDF online. Free, private, runs in your browser.",
    keywords: ["insert blank pages pdf", "add blank page to pdf", "pdf blank page insert", "insert page in pdf"],
    ogTitle: "Insert Blank Pages into PDF Online Free | ToolZoneX",
    ogDescription: "Insert blank pages at any position in a PDF online. Free, private, runs in your browser.",
    schemaName: "InsertBlankPages",
    schemaDescription: "Insert blank pages at any position in a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What page size will the blank pages have?", answer: "Blank pages match the dimensions of the adjacent page." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
