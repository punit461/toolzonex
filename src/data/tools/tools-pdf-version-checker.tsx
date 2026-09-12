import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-version-checker",
    navName: "PDF Version Checker",
    navDescription: "Check the PDF version of a file.",
    name: "PDF Version Checker - Check PDF File Version Online",
    description: "Check the PDF version, compatibility, file size, and page count of any PDF file. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Version Checker - Check PDF File Version Online",
    seoDescription: "Free online PDF version checker. See the PDF version number, compatibility information, file size, and page count for any PDF.",
    keywords: ["pdf version", "check pdf version", "pdf version checker", "pdf file version", "pdf compatibility", "pdf iso standard"],
    ogTitle: "PDF Version Checker - Check PDF File Version Online | ToolZoneX",
    ogDescription: "Check the PDF version, compatibility, file size, and page count of any PDF file. Free, private, runs entirely in your browser.",
    schemaName: "PDF Version Checker",
    schemaDescription: "Check the PDF version, compatibility, file size, and page count of any PDF file.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the most common PDF version?", answer: "PDF 1.7 is the most widely used version today, as it is the basis for ISO 32000-1 and is supported by nearly all modern software." }, { question: "Is PDF 2.0 widely supported?", answer: "PDF 2.0 was standardized in 2017, but full reader support is still rolling out. Most readers handle it gracefully but may fall back to 1.7 features." }, { question: "Is my file uploaded anywhere?", answer: "No — the check happens entirely in your browser; the PDF never leaves your device." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
