import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-editor",
    navName: "PDF Editor",
    navDescription: "Visually delete, rotate, reorder & merge pages.",
    name: "PDF Editor",
    description: "Edit a PDF visually: see every page as a thumbnail, then delete, rotate, reorder, insert blank pages, merge in another PDF, and add a watermark. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Editor - Edit PDF Pages Online Free",
    seoDescription: "Edit a PDF visually: see every page as a thumbnail, then delete, rotate, reorder, insert blank pages, merge in another PDF, and add a watermark. Free, private, runs entirely in your browser.",
    keywords: ["pdf editor", "edit pdf online", "delete pdf pages visually", "rotate pdf pages online", "merge pdf pages", "unlock password protected pdf"],
    ogTitle: "PDF Editor - Edit PDF Pages Online Free | ToolZoneX",
    ogDescription: "Edit a PDF visually: see every page as a thumbnail, then delete, rotate, reorder, insert blank pages, merge in another PDF, and add a watermark.",
    schemaName: "PdfEditor",
    schemaDescription: "Edit a PDF visually: see every page as a thumbnail, then delete, rotate, reorder, insert blank pages, merge in another PDF, and add a watermark. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
