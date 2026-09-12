import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/csv-to-pdf",
    navName: "CSV to PDF",
    navDescription: "Convert a CSV into a PDF table.",
    name: "CSV to PDF",
    description: "Convert a CSV file into a simple PDF table. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "CSV to PDF - Convert CSV to PDF Table Free",
    seoDescription: "Convert a CSV file into a simple PDF table. Free, private, runs entirely in your browser.",
    keywords: ["csv to pdf", "csv to pdf converter", "convert spreadsheet to pdf", "csv convert to pdf"],
    ogTitle: "CSV to PDF - Convert CSV to PDF Table Free | ToolZoneX",
    ogDescription: "Convert a CSV file into a simple PDF table. Free, private, runs entirely in your browser.",
    schemaName: "CsvToPdf",
    schemaDescription: "Convert a CSV file into a simple PDF table. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does it preserve cell formatting or formulas?", answer: "No, this is a plain-text table conversion — formulas, colors, and formatting from the original spreadsheet aren't preserved." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion happens entirely in your browser." }, { question: "How do I csv convert to pdf on this page?", answer: "Upload your .csv file using the file picker, then click \"Convert to PDF\" — the file downloads automatically as a landscape PDF table with the first row bolded as a header." }, { question: "Is there a size or row limit for the CSV file?", answer: "There's no hard limit — the tool adds new pages automatically as rows fill the page, so a large CSV will simply produce a multi-page PDF." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
