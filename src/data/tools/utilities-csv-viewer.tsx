import DatasetIcon from '@mui/icons-material/Dataset';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/csv-viewer",
    navName: "CSV Viewer",
    navDescription: "View & sort CSV data as a table.",
    name: "CSV Viewer",
    description: "Paste or upload CSV data and view it as a sortable table, entirely in your browser.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DatasetIcon fontSize="large" color="primary"/>,
    seoTitle: "CSV Viewer - View & Sort CSV Files Online Free",
    seoDescription: "Free CSV viewer to paste or upload CSV data and view it as a sortable table in your browser. No upload to any server — your data stays private.",
    keywords: ["csv viewer", "view csv online", "csv to table", "csv reader online", "sort csv data", "csv file viewer"],
    ogTitle: "CSV Viewer - View & Sort CSV Files Online Free | ToolZoneX",
    ogDescription: "Paste or upload CSV data and view it as a sortable table, entirely in your browser.",
    schemaName: "CSV Viewer",
    schemaDescription: "View CSV data as a sortable table by pasting text or uploading a file, entirely in the browser.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this upload my data?", answer: "No — everything is processed entirely in your browser. Your CSV data never leaves your device." }, { question: "What CSV formats are supported?", answer: "Standard comma-delimited CSV with optional quoted fields. Tab-separated and other delimiter formats may not parse correctly." }, { question: "Can I sort the data?", answer: "Yes — click any column header to sort ascending or descending. Numeric columns sort numerically." }, { question: "Is there a row limit?", answer: "The viewer handles thousands of rows, but very large files may slow down the browser. For best performance, keep files under 10,000 rows." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
