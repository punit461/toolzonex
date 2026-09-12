import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-difference-highlighter",
    navName: "PDF Difference Highlighter",
    navDescription: "Highlight pixel-level visual differences between two PDFs.",
    name: "PDF Difference Highlighter",
    description: "Visually compare two PDFs pixel by pixel and highlight differences in red, page by page. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Difference Highlighter - Visual PDF Diff Online Free",
    seoDescription: "Free online visual PDF diff tool. Compare two PDFs pixel by pixel and highlight differences in red, entirely in your browser.",
    keywords: ["pdf difference highlighter", "visual pdf diff", "compare pdf images", "pdf pixel diff", "highlight pdf changes"],
    ogTitle: "PDF Difference Highlighter Online Free | ToolZoneX",
    ogDescription: "Visually compare two PDFs pixel by pixel and highlight differences in red, page by page.",
    schemaName: "PDF Difference Highlighter",
    schemaDescription: "Visually compare two PDFs pixel by pixel and highlight differences in red, page by page.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from Compare Two PDFs?", answer: "Compare Two PDFs compares extracted text word-by-word. This tool renders each page to an image and compares pixels directly, catching visual changes text comparison can't, including in scanned PDFs with no text layer." }, { question: "What happens if the two PDFs have different page counts?", answer: "Only pages up to the shorter document's page count are compared; a warning notes the mismatch." }, { question: "Is my file uploaded anywhere?", answer: "No — both files are processed and compared entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
