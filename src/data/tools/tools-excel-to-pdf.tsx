import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/excel-to-pdf",
    navName: "Excel to PDF",
    navDescription: "Convert a spreadsheet into a PDF table.",
    name: "Excel to PDF",
    description: "Convert an Excel spreadsheet into a PDF table. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Excel to PDF - Convert XLSX to PDF Free Online",
    seoDescription: "Convert an Excel spreadsheet into a PDF table. Free, private, runs entirely in your browser.",
    keywords: ["excel to pdf", "xlsx to pdf", "convert excel to pdf free", "spreadsheet to pdf"],
    ogTitle: "Excel to PDF - Convert XLSX to PDF Free Online | ToolZoneX",
    ogDescription: "Convert an Excel spreadsheet into a PDF table. Free, private, runs entirely in your browser.",
    schemaName: "ExcelToPdf",
    schemaDescription: "Convert an Excel spreadsheet into a PDF table. Free, private, runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
