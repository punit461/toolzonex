import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-pdf-footer",
    navName: "Add PDF Footer",
    navDescription: "Add custom text footer to every page.",
    name: "Add Footer to PDF",
    description: "Add a custom text footer to every page of a PDF. Choose position and text. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Footer to PDF Online Free",
    seoDescription: "Add a custom text footer to every page of a PDF online. Free, private, runs in your browser.",
    keywords: ["add footer to pdf", "pdf footer", "add text to pdf bottom", "pdf page footer"],
    ogTitle: "Add Footer to PDF Online Free | ToolZoneX",
    ogDescription: "Add a custom text footer to every page of a PDF online. Free, private, runs in your browser.",
    schemaName: "AddPdfFooter",
    schemaDescription: "Add a custom text footer to every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I add page numbers as a footer?", answer: "Yes, just type a page number or use the dedicated Page Number tool for automatic numbering." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
};

export default tool;
