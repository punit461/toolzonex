import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-comment-extractor",
    navName: "PDF Comment Extractor",
    navDescription: "Pull all annotations out of a PDF and view them.",
    name: "PDF Comment Extractor - Extract Comments from PDF Online",
    description: "Extract all comments, highlights, and annotations from a PDF and display them in a table. Download as text or JSON. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Comment Extractor - Extract Comments from PDF Online",
    seoDescription: "Extract all comments, highlights, and annotations from a PDF. View in table, download as text or JSON. Free online tool.",
    keywords: ["extract pdf comments", "get pdf annotations", "pdf comment extractor", "pdf notes extractor", "extract annotations from pdf", "pdf comment reader", "read pdf comments", "pdf annotation viewer", "export pdf comments", "pdf comment list", "pdf annotation extractor tool", "get comments from pdf online", "extract pdf annotations online free", "pdf comment extractor online free", "read pdf annotations online", "pdf notes extractor online", "export pdf annotations to text", "pdf comment extractor tool", "how to extract comments from pdf", "extract highlights from pdf", "pdf annotation reader online", "get annotations from pdf online", "pdf comments to text", "pdf comment extractor free", "extract all comments from pdf", "pdf annotation list tool"],
    ogTitle: "PDF Comment Extractor - Extract Comments from PDF Online | ToolZoneX",
    ogDescription: "Extract all comments, highlights, and annotations from a PDF. View in a table, download as text or JSON. Free, private, runs in your browser.",
    schemaName: "PDF Comment Extractor",
    schemaDescription: "Extract all comments, highlights, and annotations from a PDF and display them.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What types of annotations are extracted?", answer: "All types that have content, an author, or a popup — highlights, text notes, stamps, free-text annotations, and more." }, { question: "Will it find empty sticky notes?", answer: "Only annotations with visible content, an author, or a popup are listed. Completely empty annotations with no metadata are skipped." }, { question: "Is my file uploaded anywhere?", answer: "No — extraction runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
