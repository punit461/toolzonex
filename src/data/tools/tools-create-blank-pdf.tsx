import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/create-blank-pdf",
    navName: "Create Blank PDF",
    navDescription: "Create empty PDF pages.",
    name: "Create Blank PDF Online Free",
    description: "Generate a blank PDF with a specified number of pages, page size, and orientation. Free, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Create Blank PDF Online Free",
    seoDescription: "Free online blank PDF creator. Generate empty PDF pages with A4, Letter, or Legal size in portrait or landscape orientation.",
    keywords: ["create blank pdf", "empty pdf", "blank pdf generator", "new pdf document", "create empty pdf", "blank pages pdf"],
    ogTitle: "Create Blank PDF Online Free | ToolZoneX",
    ogDescription: "Generate a blank PDF with a specified number of pages, size, and orientation. Free, runs entirely in your browser.",
    schemaName: "Create Blank PDF",
    schemaDescription: "Generate a blank PDF with a specified number of pages, page size, and orientation.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can the blank pages have lines or a grid?", answer: "No — this tool creates truly blank pages with no content. Use a PDF editor to add lines or grids." }, { question: "What is the maximum page count?", answer: "There is no hard limit, but creating hundreds of pages may slow down your browser briefly while the file is being assembled." }],
    isHub: false,
};

export default tool;
