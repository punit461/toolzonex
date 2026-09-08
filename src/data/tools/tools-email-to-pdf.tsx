import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/email-to-pdf",
    navName: "Email to PDF",
    navDescription: "Convert email content to a PDF document.",
    name: "Email to PDF Converter - Save Email as PDF Online",
    description: "Convert email content — HTML or plain text — into a formatted PDF document. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Email to PDF Converter - Save Email as PDF Online",
    seoDescription: "Convert email content — HTML or plain text — into a formatted PDF document. Free, private, runs entirely in your browser.",
    keywords: ["email to pdf", "save email as pdf", "convert email to pdf", "email pdf converter"],
    ogTitle: "Email to PDF Converter - Save Email as PDF Online | ToolZoneX",
    ogDescription: "Convert email content — HTML or plain text — into a formatted PDF document. Free, private, runs entirely in your browser.",
    schemaName: "Email to PDF Converter",
    schemaDescription: "Convert email content into a formatted PDF document.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I paste HTML directly?", answer: "Yes — select the HTML format option and paste your email HTML. Basic inline and embedded CSS is supported." }, { question: "Is my content uploaded anywhere?", answer: "No — conversion happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
