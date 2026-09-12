import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-attachment-extractor",
    navName: "PDF Attachment Extractor",
    navDescription: "Extract embedded file attachments from a PDF.",
    name: "PDF Attachment Extractor - Extract Files from PDF Online",
    description: "Extract embedded file attachments from any PDF. View attachment names and sizes, then download each file. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Attachment Extractor - Extract Files from PDF Online",
    seoDescription: "Free online PDF attachment extractor. Pull embedded files out of any PDF — view names, sizes, and download each one.",
    keywords: ["extract pdf attachments", "pdf file extractor", "get attachments from pdf", "pdf embedded files"],
    ogTitle: "PDF Attachment Extractor - Extract Files from PDF Online | ToolZoneX",
    ogDescription: "Extract embedded file attachments from any PDF. View attachment names and sizes, then download each file.",
    schemaName: "PDF Attachment Extractor",
    schemaDescription: "Extract embedded file attachments from a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What if no attachments are found?", answer: "Not all PDFs contain attachments. Only files that were explicitly embedded by the PDF creator will appear here." }, { question: "What file types can be extracted?", answer: "Any file type that was embedded in the PDF — there is no restriction on format or extension." }, { question: "Is my file uploaded anywhere?", answer: "No — extraction happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
