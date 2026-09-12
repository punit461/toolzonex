import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-file-size-viewer",
    navName: "PDF File Size Viewer",
    navDescription: "Check PDF file size and metadata.",
    name: "PDF File Size Viewer - Check PDF File Size & Info Online",
    description: "View a PDF's file size in bytes, KB, and MB, plus page count and embedded metadata including title, author, creator, and producer. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF File Size Viewer - Check PDF File Size & Info Online",
    seoDescription: "Free online PDF file size viewer. Check PDF file size in bytes, KB, and MB, plus page count and embedded metadata.",
    keywords: ["pdf file size", "check pdf size", "pdf file information", "pdf size viewer"],
    ogTitle: "PDF File Size Viewer - Check PDF File Size & Info Online | ToolZoneX",
    ogDescription: "View a PDF's file size in bytes, KB, and MB, plus page count and embedded metadata.",
    schemaName: "PDF File Size Viewer",
    schemaDescription: "View a PDF's file size and embedded metadata including title, author, and creator.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why is the metadata empty?", answer: "Not all PDFs include title, author, or other metadata fields — the tool only displays metadata that was embedded in the file by its creator." }, { question: "Is my file uploaded anywhere?", answer: "No — all analysis happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
