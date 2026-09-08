import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/excel-to-jpg",
    navName: "Excel to JPG",
    navDescription: "Render a spreadsheet as a JPG image.",
    name: "Excel to JPG",
    description: "Convert a spreadsheet into a JPG image of its table. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Excel to JPG Converter Online Free",
    seoDescription: "Free online Excel to JPG converter. Render a spreadsheet as a table and export it as a JPG image, entirely in your browser.",
    keywords: ["excel to jpg", "convert excel to jpg", "spreadsheet to image", "xlsx to jpg", "excel table to image"],
    ogTitle: "Excel to JPG Converter Online Free | ToolZoneX",
    ogDescription: "Convert a spreadsheet into a JPG image of its table.",
    schemaName: "Excel to JPG",
    schemaDescription: "Convert a spreadsheet into a JPG image of its table.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Which sheet gets converted?", answer: "The first sheet in the workbook that contains data. Other sheets are ignored — split them into separate files first if you need images of each." }, { question: "Are charts, colors, or cell formatting preserved?", answer: "No — cell values are rendered into a plain bordered table; Excel-specific formatting, charts, and conditional formatting are not carried over." }, { question: "Is my file uploaded anywhere?", answer: "No — reading and rendering both happen entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
