import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-pdf-margins",
    navName: "Add PDF Margins",
    navDescription: "Add extra white space around PDF pages.",
    name: "Add Margins to PDF",
    description: "Add extra margins (white space) around every page of a PDF. Enter margin size in mm. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Margins to PDF Online Free",
    seoDescription: "Add extra margins around every page of a PDF online. Free, private, runs in your browser.",
    keywords: ["add margins to pdf", "pdf margins", "increase pdf margins", "pdf margin adjuster"],
    ogTitle: "Add Margins to PDF Online Free | ToolZoneX",
    ogDescription: "Add extra margins around every page of a PDF online. Free, private, runs in your browser.",
    schemaName: "AddPdfMargins",
    schemaDescription: "Add extra margins around every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will this affect the content?", answer: "No, it expands the page size while keeping the content at its original position." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
};

export default tool;
