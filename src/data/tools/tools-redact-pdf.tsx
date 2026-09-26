import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/redact-pdf",
    navName: "Redact PDF",
    navDescription: "Black out content from PDF pages.",
    name: "Redact PDF Online Free - Black Out Content",
    description: "Black out areas of PDF pages by drawing opaque rectangles over them. Visual cover only: the text underneath stays in the file. Runs in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Redact PDF Online Free - Black Out Content",
    seoDescription: "Black out areas of PDF pages online by drawing opaque boxes over them. Visual cover only: the underlying text is not removed. Runs in your browser.",
    keywords: ["redact pdf", "black out pdf content", "pdf redaction", "censor pdf"],
    ogTitle: "Redact PDF Online Free - Black Out Content | ToolZoneX",
    ogDescription: "Redact (black out) content from PDF pages online. Free, private, runs in your browser.",
    schemaName: "Redact Pdf",
    schemaDescription: "Redact content from PDF pages by drawing opaque rectangles.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is the original text really removed?", answer: "This tool paints an opaque black rectangle on top of the content. The text is not deleted from the file, so treat the redaction as visual cover." }, { question: "Where is the origin (0,0)?", answer: "Coordinates are measured from the bottom-left corner of the page, which matches how PDF pages are laid out." }, { question: "Is my file uploaded anywhere?", answer: "No — redaction happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
