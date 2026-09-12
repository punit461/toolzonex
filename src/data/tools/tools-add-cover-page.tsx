import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-cover-page",
    navName: "Add Cover Page",
    navDescription: "Insert a blank or titled cover page at the beginning.",
    name: "Add Cover Page to PDF",
    description: "Insert a cover page at the beginning of any PDF. Optionally add a title. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Cover Page to PDF Online Free",
    seoDescription: "Insert a cover page at the beginning of any PDF file online. Free, private, runs in your browser.",
    keywords: ["add cover page pdf", "insert cover page pdf", "pdf cover page", "add title page pdf"],
    ogTitle: "Add Cover Page to PDF Online Free | ToolZoneX",
    ogDescription: "Insert a cover page at the beginning of any PDF file online. Free, private, runs in your browser.",
    schemaName: "AddCoverPage",
    schemaDescription: "Insert a cover page at the beginning of any PDF file online.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I add text to the cover page?", answer: "Yes, you can enter a title that will be drawn on the cover page." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
