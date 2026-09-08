import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-excel",
    navName: "PDF to Excel",
    navDescription: "Extract tables from a PDF into Excel format.",
    name: "PDF to Excel - Extract Table from PDF to Excel",
    description: "Extract tabular data from a PDF and convert it to an Excel-compatible .xlsx file. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to Excel Converter - Extract Table from PDF to Excel",
    seoDescription: "Free online PDF to Excel converter. Extract tabular data from a PDF and download it as an Excel .xlsx file for use in spreadsheets.",
    keywords: ["pdf to excel", "convert pdf to xlsx", "pdf table to excel", "extract table from pdf"],
    ogTitle: "PDF to Excel Converter - Extract Table from PDF to Excel | ToolZoneX",
    ogDescription: "Extract tabular data from a PDF and convert it to Excel. Free, private, runs in your browser.",
    schemaName: "PDF to Excel",
    schemaDescription: "Extract tabular data from a PDF and convert it to Excel.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why are some columns missing or merged?", answer: "PDF tables without clear cell boundaries or with merged cells are hard to detect automatically. The tool uses text-position heuristics, so heavily formatted or multi-line cells may not split perfectly." }, { question: "Does this work with scanned PDFs?", answer: "No — scanned PDFs contain images, not a text layer. You need OCR software first to make the text selectable." }, { question: "Is my file uploaded anywhere?", answer: "No — extraction runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
