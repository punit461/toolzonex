import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-page-counter",
    navName: "PDF Page Counter",
    navDescription: "Count pages in a PDF instantly.",
    name: "PDF Page Counter - Count Pages in a PDF Online Free",
    description: "Count the total number of pages in any PDF file instantly. Shows file name and size alongside the page count. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Page Counter - Count Pages in a PDF Online Free",
    seoDescription: "Free online PDF page counter. Count the total number of pages in any PDF file instantly. Shows file name and size alongside the page count.",
    keywords: ["pdf page counter", "count pdf pages", "how many pages in pdf", "pdf page count tool"],
    ogTitle: "PDF Page Counter - Count Pages in a PDF Online Free | ToolZoneX",
    ogDescription: "Count the total number of pages in any PDF file instantly. Shows file name and size alongside the page count.",
    schemaName: "PDF Page Counter",
    schemaDescription: "Count the total number of pages in any PDF file instantly.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this work with password-protected PDFs?", answer: "Yes — if the PDF is password-protected, you will be prompted to enter the password before the page count is calculated." }, { question: "Is my file uploaded anywhere?", answer: "No — the page count is calculated entirely in your browser; the PDF never leaves your device." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
