import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/word-to-pdf",
    navName: "Word to PDF",
    navDescription: "Convert a .docx file into a PDF.",
    name: "Word to PDF",
    description: "Convert a .docx Word document into a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Word to PDF - Convert DOCX to PDF Free Online",
    seoDescription: "Convert a .docx Word document into a PDF. Free, private, runs entirely in your browser.",
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf free", "doc to pdf converter"],
    ogTitle: "Word to PDF - Convert DOCX to PDF Free Online | ToolZoneX",
    ogDescription: "Convert a .docx Word document into a PDF. Free, private, runs entirely in your browser.",
    schemaName: "WordToPdf",
    schemaDescription: "Convert a .docx Word document into a PDF. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
