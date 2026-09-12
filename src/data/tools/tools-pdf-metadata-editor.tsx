import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-metadata-editor",
    navName: "PDF Metadata Editor",
    navDescription: "Edit PDF document properties.",
    name: "PDF Metadata Editor",
    description: "Edit PDF metadata fields — title, author, subject, keywords, creator, and producer. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Metadata Editor - Edit PDF Properties Online",
    seoDescription: "Edit PDF metadata fields — title, author, subject, keywords, creator, and producer. Free, private, runs entirely in your browser.",
    keywords: ["edit pdf metadata", "change pdf properties", "pdf metadata editor", "modify pdf info"],
    ogTitle: "PDF Metadata Editor - Edit PDF Properties Online | ToolZoneX",
    ogDescription: "Edit PDF metadata fields — title, author, subject, keywords, creator, and producer. Free, private, runs entirely in your browser.",
    schemaName: "PDF Metadata Editor",
    schemaDescription: "Edit PDF metadata fields — title, author, subject, keywords, creator, and producer.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will this change the visible content of the PDF?", answer: "No — only the document properties (metadata) are modified. The pages, text, and images stay the same." }, { question: "Can I clear a field entirely?", answer: "Yes — just delete the text in the field and save." }],
    isHub: false,
    noindex: true,
};

export default tool;
