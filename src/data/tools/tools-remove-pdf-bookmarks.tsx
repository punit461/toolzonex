import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/remove-pdf-bookmarks",
    navName: "Remove PDF Bookmarks",
    navDescription: "Remove all bookmarks from a PDF.",
    name: "Remove PDF Bookmarks",
    description: "Remove all bookmarks and outlines from a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove PDF Bookmarks Online Free",
    seoDescription: "Remove all bookmarks and outlines from a PDF. Free, private, runs entirely in your browser.",
    keywords: ["remove pdf bookmarks", "delete pdf bookmarks", "pdf bookmark remover", "clear pdf outline"],
    ogTitle: "Remove PDF Bookmarks Online Free | ToolZoneX",
    ogDescription: "Remove all bookmarks and outlines from a PDF. Free, private, runs entirely in your browser.",
    schemaName: "Remove PDF Bookmarks",
    schemaDescription: "Remove all bookmarks and outlines from a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I undo this?", answer: "No — once bookmarks are removed, they cannot be restored. Keep a backup of the original." }, { question: "Does this affect page content?", answer: "No — only the outline/bookmark structure is removed. All pages, text, and images remain intact." }],
    isHub: false,
};

export default tool;
