import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/remove-blank-pages",
    navName: "Remove Blank Pages",
    navDescription: "Remove blank or empty pages from a PDF.",
    name: "Remove Blank Pages from PDF Online Free",
    description: "Detect and remove blank pages from any PDF. Shows which pages were removed and delivers a cleaned file. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Blank Pages from PDF Online Free",
    seoDescription: "Free online tool to remove blank pages from a PDF. Detects empty pages by text content and deletes them automatically.",
    keywords: ["remove blank pages pdf", "delete empty pages pdf", "pdf blank page remover", "clean pdf pages"],
    ogTitle: "Remove Blank Pages from PDF Online Free | ToolZoneX",
    ogDescription: "Detect and remove blank pages from any PDF. Shows which pages were removed and delivers a cleaned file.",
    schemaName: "Remove Blank Pages",
    schemaDescription: "Detect and remove blank pages from a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How does it detect blank pages?", answer: "A page is considered blank if its text content layer has no items. Pages that contain only images but no text will not be flagged as blank." }, { question: "Can I undo this?", answer: "No — the modified file is saved as a new download. Keep the original if you may need it later." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
