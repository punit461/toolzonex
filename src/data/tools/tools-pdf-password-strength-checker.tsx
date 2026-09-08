import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-password-strength-checker",
    navName: "PDF Password Checker",
    navDescription: "Check if a PDF is password-protected.",
    name: "PDF Password Strength Checker - Check if PDF is Protected",
    description: "Check whether a PDF file is password-protected or encrypted. Also shows file size and page count. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Password Strength Checker - Check if PDF is Protected",
    seoDescription: "Free online PDF password strength checker. Check if a PDF is password-protected or encrypted. Shows file size and page count.",
    keywords: ["pdf password", "check pdf password", "is pdf password protected", "pdf password checker", "pdf encryption checker", "check if pdf is protected"],
    ogTitle: "PDF Password Strength Checker - Check if PDF is Protected | ToolZoneX",
    ogDescription: "Check whether a PDF file is password-protected or encrypted. Free, private, runs entirely in your browser.",
    schemaName: "PDF Password Strength Checker",
    schemaDescription: "Check whether a PDF file is password-protected or encrypted.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can this tool crack or remove PDF passwords?", answer: "No — it only detects whether a PDF is encrypted. It cannot bypass or remove password protection." }, { question: "Is my file uploaded anywhere?", answer: "No — detection happens entirely in your browser; the PDF never leaves your device." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
