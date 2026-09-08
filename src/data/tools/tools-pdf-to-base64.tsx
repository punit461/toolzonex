import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-base64",
    navName: "PDF to Base64",
    navDescription: "Convert a PDF to a Base64 string.",
    name: "PDF to Base64 Converter Online Free",
    description: "Convert any PDF file to a Base64-encoded string. Copy the full string or preview it inline. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to Base64 Converter Online Free",
    seoDescription: "Free online PDF to Base64 converter. Encode any PDF file as a Base64 string for embedding in JSON, APIs, or databases.",
    keywords: ["pdf to base64", "base64 pdf", "encode pdf base64", "pdf base64 string", "pdf to base64 converter", "pdf base64 encoding"],
    ogTitle: "PDF to Base64 Converter Online Free | ToolZoneX",
    ogDescription: "Convert any PDF file to a Base64-encoded string. Copy the full string or preview it inline. Free, private, runs entirely in your browser.",
    schemaName: "PDF to Base64 Converter",
    schemaDescription: "Convert any PDF file to a Base64-encoded string for embedding in JSON, APIs, or databases.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why does the Base64 string look longer than the file?", answer: "Base64 encoding expands data by roughly 33% — three binary bytes become four printable characters, so the output is always about a third larger than the original." }, { question: "Is my file uploaded anywhere?", answer: "No — encoding happens entirely in your browser." }],
    isHub: false,
};

export default tool;
