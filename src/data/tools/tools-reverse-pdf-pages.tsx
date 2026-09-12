import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/reverse-pdf-pages",
    navName: "Reverse PDF Pages",
    navDescription: "Reverse the order of all pages in a PDF.",
    name: "Reverse PDF Page Order",
    description: "Reverse the page order of any PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Reverse PDF Page Order Online Free",
    seoDescription: "Reverse the page order of any PDF online. Free, private, runs in your browser.",
    keywords: ["reverse pdf pages", "reverse page order pdf", "pdf page reverser", "flip pdf order"],
    ogTitle: "Reverse PDF Page Order Online Free | ToolZoneX",
    ogDescription: "Reverse the page order of any PDF online. Free, private, runs in your browser.",
    schemaName: "ReversePdfPages",
    schemaDescription: "Reverse the page order of any PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I undo this?", answer: "Just run the tool again — reversing twice restores the original order." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
