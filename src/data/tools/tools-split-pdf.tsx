import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/split-pdf",
    navName: "Split PDF",
    navDescription: "Split a PDF into multiple files.",
    name: "Split PDF",
    description: "Split a PDF into multiple files at the page numbers you choose. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Split PDF - Split PDF Files Online Free",
    seoDescription: "Split a PDF into multiple files at the page numbers you choose. Free, private, runs entirely in your browser.",
    keywords: ["split pdf", "divide pdf", "pdf splitter free", "split pdf pages"],
    ogTitle: "Split PDF - Split PDF Files Online Free | ToolZoneX",
    ogDescription: "Split a PDF into multiple files at the page numbers you choose. Free, private, runs entirely in your browser.",
    schemaName: "SplitPdf",
    schemaDescription: "Split a PDF into multiple files at the page numbers you choose. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
