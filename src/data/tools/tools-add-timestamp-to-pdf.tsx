import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-timestamp-to-pdf",
    navName: "Add Timestamp to PDF",
    navDescription: "Stamp date and time on every page of a PDF.",
    name: "Add Timestamp to PDF",
    description: "Stamp the current date and time on every page of a PDF. Choose position and font size. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Timestamp to PDF Online Free",
    seoDescription: "Stamp date and time on every page of a PDF online. Free, private, runs in your browser.",
    keywords: ["add timestamp to pdf", "pdf timestamp", "stamp time on pdf", "pdf date time stamp"],
    ogTitle: "Add Timestamp to PDF Online Free | ToolZoneX",
    ogDescription: "Stamp date and time on every page of a PDF online. Free, private, runs in your browser.",
    schemaName: "AddTimestampToPdf",
    schemaDescription: "Stamp the current date and time on every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What timestamp format is used?", answer: "The format includes both date and time in your browser's local format." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
