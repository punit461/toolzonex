import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/merge-pdf",
    navName: "Merge PDF",
    navDescription: "Combine multiple PDFs into one.",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one, in the order you choose. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Merge PDF - Combine PDF Files Online Free",
    seoDescription: "Combine multiple PDF files into one, in the order you choose. Free, private, runs entirely in your browser.",
    keywords: ["merge pdf", "combine pdf files", "join pdf online", "pdf merger free"],
    ogTitle: "Merge PDF - Combine PDF Files Online Free | ToolZoneX",
    ogDescription: "Combine multiple PDF files into one, in the order you choose. Free, private, runs entirely in your browser.",
    schemaName: "MergePdf",
    schemaDescription: "Combine multiple PDF files into one, in the order you choose. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
