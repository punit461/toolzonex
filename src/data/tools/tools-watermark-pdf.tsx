import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/watermark-pdf",
    navName: "Watermark PDF",
    navDescription: "Add a diagonal text watermark to a PDF.",
    name: "Watermark PDF",
    description: "Add a diagonal text watermark to every page of a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Watermark PDF - Add Text Watermark Free Online",
    seoDescription: "Add a diagonal text watermark to every page of a PDF. Free, private, runs entirely in your browser.",
    keywords: ["watermark pdf", "add watermark to pdf", "pdf watermark tool"],
    ogTitle: "Watermark PDF - Add Text Watermark Free Online | ToolZoneX",
    ogDescription: "Add a diagonal text watermark to every page of a PDF. Free, private, runs entirely in your browser.",
    schemaName: "WatermarkPdf",
    schemaDescription: "Add a diagonal text watermark to every page of a PDF. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
