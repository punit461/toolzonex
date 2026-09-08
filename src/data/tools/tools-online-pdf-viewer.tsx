import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/online-pdf-viewer",
    navName: "Online PDF Viewer",
    navDescription: "View PDF pages in the browser without downloading.",
    name: "Online PDF Viewer - View PDF in Browser Free",
    description: "View PDF files directly in your browser without downloading. Scroll through pages and jump to any page instantly. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Online PDF Viewer - View PDF in Browser Free",
    seoDescription: "View PDF files online in your browser without downloading. Scroll pages and jump to any page. Free, private, runs in your browser.",
    keywords: ["online pdf viewer", "view pdf online", "pdf reader online", "open pdf in browser"],
    ogTitle: "Online PDF Viewer - View PDF in Browser Free | ToolZoneX",
    ogDescription: "View PDF files online in your browser without downloading. Free, private, runs in your browser.",
    schemaName: "Online Pdf Viewer",
    schemaDescription: "View PDF pages in the browser without downloading.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does viewing download the file to my device?", answer: "No — the pages are rendered in memory and displayed as images. Nothing is saved unless you choose to download." }, { question: "Can I view password-protected PDFs?", answer: "Not yet — this viewer is for unprotected documents. Use our unlock tool first if your file is password protected." }, { question: "Is my file uploaded anywhere?", answer: "No — rendering happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
