import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-file-information-viewer",
    navName: "PDF File Information Viewer",
    navDescription: "View file size, page count, version & more.",
    name: "PDF File Information Viewer",
    description: "View a PDF's file size, page count, PDF version, encryption status, and embedded metadata. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF File Information Viewer - Check PDF Details Online",
    seoDescription: "Free online PDF file information viewer. See file size, page count, PDF version, encryption status, and document metadata in one place.",
    keywords: ["pdf file information", "pdf info viewer", "check pdf details", "pdf file properties", "pdf encryption checker"],
    ogTitle: "PDF File Information Viewer - Check PDF Details Online | ToolZoneX",
    ogDescription: "View a PDF's file size, page count, PDF version, encryption status, and embedded metadata.",
    schemaName: "PDF File Information Viewer",
    schemaDescription: "View a PDF's file size, page count, PDF version, encryption status, and embedded metadata.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What if I can't enter the password?", answer: "You'll still see the file size, PDF version, and encryption status — page count and document properties require the password since those are stored inside the encrypted content." }, { question: "Does this modify my PDF?", answer: "No — this is a read-only viewer. Your original file stays exactly as it is." }, { question: "Is my file uploaded anywhere?", answer: "No — everything is read entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
