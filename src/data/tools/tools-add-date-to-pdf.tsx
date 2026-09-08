import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-date-to-pdf",
    navName: "Add Date to PDF",
    navDescription: "Stamp today's date on every page of a PDF.",
    name: "Add Date to PDF",
    description: "Stamp the current date on every page of a PDF. Choose position and font size. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Date to PDF Online Free",
    seoDescription: "Stamp today's date on every page of a PDF online. Free, private, runs in your browser.",
    keywords: ["add date to pdf", "stamp date on pdf", "pdf date stamp", "insert date in pdf"],
    ogTitle: "Add Date to PDF Online Free | ToolZoneX",
    ogDescription: "Stamp today's date on every page of a PDF online. Free, private, runs in your browser.",
    schemaName: "AddDateToPdf",
    schemaDescription: "Stamp the current date on every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What date format is used?", answer: "The date uses your browser's local format (e.g., MM/DD/YYYY or DD/MM/YYYY)." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
};

export default tool;
