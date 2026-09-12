import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/html-to-pdf",
    navName: "HTML to PDF",
    navDescription: "Convert HTML markup into a PDF.",
    name: "HTML to PDF",
    description: "Convert HTML markup into a PDF document. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "HTML to PDF - Convert HTML to PDF Free Online",
    seoDescription: "Convert HTML markup into a PDF document. Free, private, runs entirely in your browser.",
    keywords: ["html to pdf", "convert html to pdf free", "html to pdf converter online"],
    ogTitle: "HTML to PDF - Convert HTML to PDF Free Online | ToolZoneX",
    ogDescription: "Convert HTML markup into a PDF document. Free, private, runs entirely in your browser.",
    schemaName: "HtmlToPdf",
    schemaDescription: "Convert HTML markup into a PDF document. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
