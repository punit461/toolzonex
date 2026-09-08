import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/extract-hyperlinks",
    navName: "Extract Hyperlinks from PDF",
    navDescription: "List every clickable link in a PDF.",
    name: "Extract Hyperlinks from PDF",
    description: "Find every clickable hyperlink in a PDF, with the page number it appears on. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Extract Hyperlinks from PDF Online Free",
    seoDescription: "Free online tool to extract all hyperlinks from a PDF. List every clickable link with its page number, then copy or download the list.",
    keywords: ["extract hyperlinks from pdf", "find links in pdf", "pdf link extractor", "list pdf hyperlinks", "pdf url extractor"],
    ogTitle: "Extract Hyperlinks from PDF Online Free | ToolZoneX",
    ogDescription: "Find every clickable hyperlink in a PDF, with the page number it appears on.",
    schemaName: "Extract Hyperlinks from PDF",
    schemaDescription: "Find every clickable hyperlink in a PDF, with the page number it appears on.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this find plain-text URLs too?", answer: "No — only clickable link annotations embedded in the PDF are detected. A URL written as plain text without a link annotation won't be picked up." }, { question: "Does this include internal links (like a table of contents)?", answer: "No — only links with an external web address (a URL) are listed; internal page-to-page jump links are skipped." }, { question: "Is my file uploaded anywhere?", answer: "No — extraction happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
