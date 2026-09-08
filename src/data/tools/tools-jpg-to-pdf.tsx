import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/jpg-to-pdf",
    navName: "JPG to PDF",
    navDescription: "Convert images into a PDF.",
    name: "JPG to PDF",
    description: "Convert JPG or PNG images into a single PDF, one image per page. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "JPG to PDF - Convert Images to PDF Free",
    seoDescription: "Convert JPG or PNG images into a single PDF, one image per page. Free, private, runs entirely in your browser.",
    keywords: ["jpg to pdf", "png to pdf", "image to pdf converter free"],
    ogTitle: "JPG to PDF - Convert Images to PDF Free | ToolZoneX",
    ogDescription: "Convert JPG or PNG images into a single PDF, one image per page. Free, private, runs entirely in your browser.",
    schemaName: "JpgToPdf",
    schemaDescription: "Convert JPG or PNG images into a single PDF, one image per page. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
