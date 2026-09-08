import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/delete-pdf-pages",
    navName: "Delete PDF Pages",
    navDescription: "Remove specific pages from a PDF.",
    name: "Delete PDF Pages",
    description: "Remove specific pages from a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Delete PDF Pages - Remove Pages from PDF Free",
    seoDescription: "Remove specific pages from a PDF. Free, private, runs entirely in your browser.",
    keywords: ["delete pdf pages", "remove pdf pages", "pdf page remover"],
    ogTitle: "Delete PDF Pages - Remove Pages from PDF Free | ToolZoneX",
    ogDescription: "Remove specific pages from a PDF. Free, private, runs entirely in your browser.",
    schemaName: "DeletePdfPages",
    schemaDescription: "Remove specific pages from a PDF. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
