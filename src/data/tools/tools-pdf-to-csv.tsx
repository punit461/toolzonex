import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-csv",
    navName: "PDF to CSV",
    navDescription: "Extract tables from a PDF into CSV format.",
    name: "PDF to CSV - Extract Table from PDF",
    description: "Extract tabular data from a PDF and convert it to CSV. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to CSV Converter - Extract Table from PDF Online",
    seoDescription: "Free online PDF to CSV converter. Extract tabular data from a PDF and download it as a CSV file for use in spreadsheets.",
    keywords: ["pdf to csv", "convert pdf to csv", "extract table from pdf", "pdf table to csv"],
    ogTitle: "PDF to CSV Converter - Extract Table from PDF Online | ToolZoneX",
    ogDescription: "Extract tabular data from a PDF and convert it to CSV. Free, private, runs in your browser.",
    schemaName: "PDF to CSV",
    schemaDescription: "Extract tabular data from a PDF and convert it to CSV.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why are some columns missing or merged?", answer: "PDF tables without clear cell boundaries or with merged cells are hard to detect automatically. The tool uses text-position heuristics, so heavily formatted or multi-line cells may not split perfectly." }, { question: "Does this work with scanned PDFs?", answer: "No — scanned PDFs contain images, not a text layer. You need OCR software first to make the text selectable." }, { question: "Is my file uploaded anywhere?", answer: "No — extraction runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
