import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/text-to-pdf",
    navName: "Text to PDF",
    navDescription: "Convert plain text into a PDF.",
    name: "Text to PDF",
    description: "Convert plain text into a PDF document. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Text to PDF - Convert Text to PDF Free Online",
    seoDescription: "Convert plain text into a PDF document. Free, private, runs entirely in your browser.",
    keywords: ["text to pdf", "txt to pdf converter", "convert text to pdf online"],
    ogTitle: "Text to PDF - Convert Text to PDF Free Online | ToolZoneX",
    ogDescription: "Convert plain text into a PDF document. Free, private, runs entirely in your browser.",
    schemaName: "TxtToPdf",
    schemaDescription: "Convert plain text into a PDF document. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
