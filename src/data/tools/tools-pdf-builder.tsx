import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-builder",
    navName: "PDF Builder",
    navDescription: "Create a new PDF from typed text content.",
    name: "PDF Builder",
    description: "Create a brand-new PDF document from text you type, with automatic line wrapping and page breaks.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Builder - Create PDF from Text Online Free",
    seoDescription: "Free online PDF builder to create a new PDF document from text. Choose page size and font size, with automatic line wrapping and page breaks.",
    keywords: ["pdf builder", "create pdf online", "make pdf from text", "pdf generator"],
    ogTitle: "PDF Builder - Create PDF from Text Online Free | ToolZoneX",
    ogDescription: "Free online PDF builder to create a new PDF document from typed text.",
    schemaName: "PDF Builder",
    schemaDescription: "Create a new PDF document from text with automatic line wrapping and page breaks.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this support images or formatting?", answer: "No — this tool creates text-only PDFs. For rich formatting, use a word processor and export as PDF." }, { question: "How are page breaks handled?", answer: "Text wraps automatically. When a page fills up, a new page is created with the same margins and formatting." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
