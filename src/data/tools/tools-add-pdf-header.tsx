import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-pdf-header",
    navName: "Add PDF Header",
    navDescription: "Add custom text header to every page.",
    name: "Add Header to PDF",
    description: "Add a custom text header to every page of a PDF. Choose position and text. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Header to PDF Online Free",
    seoDescription: "Add a custom text header to every page of a PDF online. Free, private, runs in your browser.",
    keywords: ["add header to pdf", "pdf header", "add text to pdf top", "pdf page header"],
    ogTitle: "Add Header to PDF Online Free | ToolZoneX",
    ogDescription: "Add a custom text header to every page of a PDF online. Free, private, runs in your browser.",
    schemaName: "AddPdfHeader",
    schemaDescription: "Add a custom text header to every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I change the font size?", answer: "The header uses a standard 10pt Helvetica font for consistent rendering." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
