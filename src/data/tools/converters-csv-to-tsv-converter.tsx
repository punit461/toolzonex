import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/csv-to-tsv-converter",
    navName: "CSV to TSV",
    navDescription: "Convert CSV data to TSV.",
    name: "CSV to TSV Converter",
    description: "Convert comma-separated values (CSV) into tab-separated values (TSV) instantly, correctly parsing quoted fields.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "CSV to TSV Converter - Convert Comma-Separated Data Online",
    seoDescription: "Free CSV to TSV converter. Paste comma-separated values and convert them to tab-separated TSV instantly, with quoted fields parsed correctly.",
    keywords: ["csv to tsv", "csv to tsv converter", "convert csv to tsv", "comma separated to tsv", "csv converter", "comma delimited to tsv"],
    ogTitle: "CSV to TSV Converter - Convert Comma-Separated Data Online | ToolZoneX",
    ogDescription: "Convert comma-separated values into tab-separated TSV instantly.",
    schemaName: "CSV to TSV Converter",
    schemaDescription: "Convert comma-separated values (CSV) into tab-separated values (TSV) instantly, correctly parsing quoted fields.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What happens to a comma that was inside a quoted CSV field?", answer: "It's preserved as a literal comma in the output — TSV uses tabs as the column separator, so a comma inside a field is no longer special once the field is correctly identified during CSV parsing." }, { question: "What if a field contains a tab character or a line break?", answer: "Since TSV has no standard way to escape or quote a tab or newline inside a field, any tab or line break found inside a CSV field is replaced with a single space so it doesn't get misread as a column or row break in the TSV output." }, { question: "Does this handle escaped double quotes inside a field?", answer: "Yes — a doubled double-quote (\"\") inside a quoted CSV field is correctly parsed as a single literal quote character before conversion." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
