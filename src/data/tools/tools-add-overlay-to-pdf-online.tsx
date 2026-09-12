import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-overlay-to-pdf-online",
    navName: "Add Overlay to PDF",
    navDescription: "Add a text overlay to every PDF page.",
    name: "Add Overlay to PDF Online Free",
    description: "Add a text overlay to every page of a PDF. Choose text, position, font size, color, and opacity. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Overlay to PDF Online Free",
    seoDescription: "Free online tool to add a text overlay to every page of a PDF. Choose text content, position, font size, color, and opacity.",
    keywords: ["add overlay to pdf", "pdf overlay text", "stamp text on pdf", "pdf watermark overlay"],
    ogTitle: "Add Overlay to PDF Online Free | ToolZoneX",
    ogDescription: "Add a text overlay to every page of a PDF. Free, private, runs entirely in your browser.",
    schemaName: "Add Overlay to PDF Online",
    schemaDescription: "Add a text overlay to every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this create a watermark?", answer: "Yes — this tool draws semi-transparent text on top of every page, which functions as a visual overlay or watermark." }, { question: "Can I use different text on different pages?", answer: "Not yet — the same text, color, and position is applied to all pages." }, { question: "Is my file uploaded anywhere?", answer: "No — the overlay is applied entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
