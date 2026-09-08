import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/excel-to-png",
    navName: "Excel to PNG",
    navDescription: "Render a spreadsheet as a PNG image.",
    name: "Excel to PNG",
    description: "Convert a spreadsheet into a lossless PNG image of its table. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Excel to PNG Converter Online Free",
    seoDescription: "Free online Excel to PNG converter. Render a spreadsheet as a table and export it as a lossless PNG image, entirely in your browser.",
    keywords: ["excel to png", "convert excel to png", "spreadsheet to png image", "xlsx to png", "excel table to image"],
    ogTitle: "Excel to PNG Converter Online Free | ToolZoneX",
    ogDescription: "Convert a spreadsheet into a lossless PNG image of its table.",
    schemaName: "Excel to PNG",
    schemaDescription: "Convert a spreadsheet into a lossless PNG image of its table.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why choose PNG over JPG?", answer: "PNG is lossless, so text and gridlines in a table stay perfectly sharp with no compression artifacts — better than JPG for tables with fine text, at the cost of a somewhat larger file." }, { question: "Which sheet gets converted?", answer: "The first sheet in the workbook that contains data. Other sheets are ignored — split them into separate files first if you need images of each." }, { question: "Is my file uploaded anywhere?", answer: "No — reading and rendering both happen entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
