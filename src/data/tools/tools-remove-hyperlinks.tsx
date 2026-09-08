import LinkIcon from '@mui/icons-material/Link';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/remove-hyperlinks",
    navName: "Remove Hyperlinks",
    navDescription: "Strip hyperlink annotations from PDF pages.",
    name: "Remove Hyperlinks from PDF - Strip Links",
    description: "Remove all hyperlink annotations from a PDF while keeping the visible text intact. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <LinkIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Hyperlinks from PDF Online Free",
    seoDescription: "Remove all hyperlink annotations from a PDF while keeping the visible text intact. Free, private, runs in your browser.",
    keywords: ["remove hyperlinks pdf", "delete links from pdf", "pdf link remover", "strip pdf links"],
    ogTitle: "Remove Hyperlinks from PDF Online Free | ToolZoneX",
    ogDescription: "Remove all hyperlink annotations from a PDF while keeping the visible text intact. Free, private, runs in your browser.",
    schemaName: "Remove Hyperlinks from PDF",
    schemaDescription: "Remove all hyperlink annotations from a PDF while keeping the visible text intact.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will the visible text change?", answer: "No — only the hyperlink annotations are removed. The text and its formatting are preserved." }, { question: "Does this remove bookmarks or table-of-contents links?", answer: "Bookmarks (outlines) are separate from page annotations and are not affected. Only link annotations on pages are removed." }, { question: "Is my file uploaded anywhere?", answer: "No — processing happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
