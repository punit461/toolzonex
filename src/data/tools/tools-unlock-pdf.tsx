import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/unlock-pdf",
    navName: "Unlock PDF",
    navDescription: "Remove password from a PDF.",
    name: "Unlock PDF",
    description: "Remove the password from a PDF file so it opens without prompting. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Unlock PDF - Remove PDF Password Online Free",
    seoDescription: "Remove the password from a PDF file so it opens without prompting. Free, private, runs entirely in your browser.",
    keywords: ["unlock pdf", "remove pdf password", "pdf password remover", "decrypt pdf"],
    ogTitle: "Unlock PDF - Remove PDF Password Online Free | ToolZoneX",
    ogDescription: "Remove the password from a PDF file so it opens without prompting. Free, private, runs entirely in your browser.",
    schemaName: "Unlock PDF",
    schemaDescription: "Remove the password from a PDF file so it opens without prompting.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Do I need to know the password?", answer: "Yes — you must provide the correct password. This tool does not bypass or crack encryption." }, { question: "Is my file uploaded anywhere?", answer: "No — everything runs in your browser. The file and password never leave your device." }],
    isHub: false,
    noindex: true,
};

export default tool;
