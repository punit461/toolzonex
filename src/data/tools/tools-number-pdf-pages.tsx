import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/number-pdf-pages",
    navName: "Add Page Numbers to PDF",
    navDescription: "Number every page of a PDF.",
    name: "Add Page Numbers to PDF",
    description: "Add page numbers to every page in a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Page Numbers to PDF Free Online",
    seoDescription: "Add page numbers to every page in a PDF. Free, private, runs entirely in your browser.",
    keywords: ["add page numbers to pdf", "pdf page numbering", "number pdf pages"],
    ogTitle: "Add Page Numbers to PDF Free Online | ToolZoneX",
    ogDescription: "Add page numbers to every page in a PDF. Free, private, runs entirely in your browser.",
    schemaName: "NumberPdfPages",
    schemaDescription: "Add page numbers to every page in a PDF. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
