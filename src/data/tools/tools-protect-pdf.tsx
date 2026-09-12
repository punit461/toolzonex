import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/protect-pdf",
    navName: "Protect PDF",
    navDescription: "Password-protect a PDF file.",
    name: "Protect PDF with Password",
    description: "Password-protect a PDF file and restrict printing, copying, and editing. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Protect PDF with Password Online Free",
    seoDescription: "Password-protect a PDF file and restrict printing, copying, and editing. Free, private, runs entirely in your browser.",
    keywords: ["protect pdf", "password protect pdf", "encrypt pdf", "pdf password protection"],
    ogTitle: "Protect PDF with Password Online Free | ToolZoneX",
    ogDescription: "Password-protect a PDF file and restrict printing, copying, and editing. Free, private, runs entirely in your browser.",
    schemaName: "Protect PDF",
    schemaDescription: "Password-protect a PDF file and restrict printing, copying, and editing.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between user and owner passwords?", answer: "A user password is required to open the file. An owner password only restricts what viewers can do (print, copy, edit)." }, { question: "Is my file uploaded anywhere?", answer: "No — encryption happens entirely in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
