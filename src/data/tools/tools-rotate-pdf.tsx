import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/rotate-pdf",
    navName: "Rotate PDF",
    navDescription: "Rotate all pages by 90/180/270°.",
    name: "Rotate PDF",
    description: "Rotate all pages in a PDF by 90, 180, or 270 degrees. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Rotate PDF - Rotate PDF Pages Online Free",
    seoDescription: "Rotate all pages in a PDF by 90, 180, or 270 degrees. Free, private, runs entirely in your browser.",
    keywords: ["rotate pdf", "rotate pdf pages", "fix pdf orientation", "turn pdf online"],
    ogTitle: "Rotate PDF - Rotate PDF Pages Online Free | ToolZoneX",
    ogDescription: "Rotate all pages in a PDF by 90, 180, or 270 degrees. Free, private, runs entirely in your browser.",
    schemaName: "RotatePdf",
    schemaDescription: "Rotate all pages in a PDF by 90, 180, or 270 degrees. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
