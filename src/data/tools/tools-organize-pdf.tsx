import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/organize-pdf",
    navName: "Organize PDF",
    navDescription: "Reorder pages in a PDF.",
    name: "Organize PDF",
    description: "Reorder the pages in a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Organize PDF - Reorder PDF Pages Online Free",
    seoDescription: "Reorder the pages in a PDF. Free, private, runs entirely in your browser.",
    keywords: ["organize pdf", "reorder pdf pages", "rearrange pdf pages"],
    ogTitle: "Organize PDF - Reorder PDF Pages Online Free | ToolZoneX",
    ogDescription: "Reorder the pages in a PDF. Free, private, runs entirely in your browser.",
    schemaName: "OrganizePdf",
    schemaDescription: "Reorder the pages in a PDF. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
