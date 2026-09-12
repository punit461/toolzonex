import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/tsv-to-csv-converter",
    navName: "TSV to CSV",
    navDescription: "Convert TSV data to CSV.",
    name: "TSV to CSV Converter",
    description: "Convert tab-separated values (TSV) into comma-separated values (CSV) instantly, with proper quoting.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "TSV to CSV Converter - Convert Tab-Separated Data Online",
    seoDescription: "Free TSV to CSV converter. Paste tab-separated values and convert them to comma-separated CSV instantly, with commas and quotes inside fields handled automatically.",
    keywords: ["tsv to csv", "tsv to csv converter", "convert tsv to csv", "tab separated to csv", "tsv converter", "tab delimited to csv"],
    ogTitle: "TSV to CSV Converter - Convert Tab-Separated Data Online | ToolZoneX",
    ogDescription: "Convert tab-separated values into comma-separated CSV instantly.",
    schemaName: "TSV to CSV Converter",
    schemaDescription: "Convert tab-separated values (TSV) into comma-separated values (CSV) instantly, with proper quoting.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What happens if a cell already contains a comma?", answer: "The tool wraps that field in double quotes automatically, so the comma is treated as part of the value rather than a new column separator in the resulting CSV." }, { question: "Does this handle quotes inside a cell?", answer: "Yes — any double quote character inside a field is escaped by doubling it (per the CSV standard), and the field is wrapped in quotes." }, { question: "Can I paste data copied directly from a spreadsheet?", answer: "Yes — Excel and Google Sheets both copy selected cells as tab-separated values by default, so you can paste directly into the input box above without reformatting anything first." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
