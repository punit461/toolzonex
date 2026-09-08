import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/flatten-pdf",
    navName: "Flatten PDF",
    navDescription: "Make PDF form fields permanent.",
    name: "Flatten PDF",
    description: "Flatten a PDF's fillable form fields into permanent page content. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Flatten PDF - Flatten Form Fields Free Online",
    seoDescription: "Flatten a PDF's fillable form fields into permanent page content. Free, private, runs entirely in your browser.",
    keywords: ["flatten pdf", "flatten pdf form", "lock pdf form fields"],
    ogTitle: "Flatten PDF - Flatten Form Fields Free Online | ToolZoneX",
    ogDescription: "Flatten a PDF's fillable form fields into permanent page content. Free, private, runs entirely in your browser.",
    schemaName: "FlattenPdf",
    schemaDescription: "Flatten a PDF's fillable form fields into permanent page content. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
