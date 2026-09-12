import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-blank-last-page",
    navName: "Add Blank Last Page",
    navDescription: "Append a blank page at the end of a PDF.",
    name: "Add Blank Last Page to PDF",
    description: "Append a blank page to the end of any PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Blank Last Page to PDF Online Free",
    seoDescription: "Append a blank page to the end of any PDF file online. Free, private, runs in your browser.",
    keywords: ["add blank page to pdf", "append blank page pdf", "add last page pdf", "blank page pdf"],
    ogTitle: "Add Blank Last Page to PDF Online Free | ToolZoneX",
    ogDescription: "Append a blank page to the end of any PDF file online. Free, private, runs in your browser.",
    schemaName: "AddBlankLastPage",
    schemaDescription: "Append a blank page to the end of any PDF file online.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I add more than one blank page?", answer: "This tool adds one blank page at a time. Run it again to add another." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
