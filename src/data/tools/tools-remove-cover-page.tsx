import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/remove-cover-page",
    navName: "Remove Cover Page",
    navDescription: "Remove the first page from a PDF.",
    name: "Remove Cover Page from PDF",
    description: "Remove the first page (cover page) from any PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Cover Page from PDF Online Free",
    seoDescription: "Remove the first page from any PDF online. Free, private, runs in your browser.",
    keywords: ["remove cover page pdf", "delete first page pdf", "remove first page pdf", "pdf cover page remover"],
    ogTitle: "Remove Cover Page from PDF Online Free | ToolZoneX",
    ogDescription: "Remove the first page from any PDF online. Free, private, runs in your browser.",
    schemaName: "RemoveCoverPage",
    schemaDescription: "Remove the first page from any PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I undo this?", answer: "No, but you can re-upload the original file if needed." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
};

export default tool;
