import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-sanitizer",
    navName: "PDF Sanitizer",
    navDescription: "Remove JavaScript, embedded files, and other risks from a PDF.",
    name: "PDF Sanitizer - Clean PDF Security Risks Online",
    description: "Remove potentially dangerous content from a PDF: JavaScript, embedded files, launch actions, and AcroForm definitions. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Sanitizer - Clean PDF Security Risks Online",
    seoDescription: "Free online PDF sanitizer. Remove JavaScript, embedded files, launch actions, and other security risks from a PDF before opening or sharing it.",
    keywords: ["sanitize pdf", "clean pdf", "pdf security cleaner", "remove javascript from pdf"],
    ogTitle: "PDF Sanitizer - Clean PDF Security Risks Online | ToolZoneX",
    ogDescription: "Remove potentially dangerous content from a PDF: JavaScript, embedded files, launch actions. Free, private, runs entirely in your browser.",
    schemaName: "PDF Sanitizer",
    schemaDescription: "Remove JavaScript, embedded files, and other security risks from a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does this remove?", answer: "Embedded file attachments, document-level JavaScript, AcroForm definitions, and additional action dictionaries that trigger on open or click." }, { question: "Will this break my PDF?", answer: "In rare cases, if the PDF relies on JavaScript for basic rendering, the sanitized version may display differently. Text and images are always preserved." }, { question: "Is my file uploaded anywhere?", answer: "No — sanitization runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
