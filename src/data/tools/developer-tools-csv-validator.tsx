import TableChartIcon from '@mui/icons-material/TableChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/csv-validator",
    navName: "CSV Validator",
    navDescription: "Check CSV structural well-formedness.",
    name: "CSV Validator - Structural Well-Formedness Checker",
    description: "Check a CSV file for consistent column counts and proper RFC 4180 quote escaping, with specific row numbers for any issues.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <TableChartIcon fontSize="large" color="primary"/>,
    seoTitle: "CSV Validator - Free Online Structural Well-Formedness Checker",
    seoDescription: "Paste or upload a CSV file and check whether it's structurally well-formed — consistent columns and proper RFC 4180 quote escaping, with specific row numbers for issues. Free online tool.",
    keywords: ["csv validator", "validate csv online", "csv structure checker", "rfc 4180 validator", "check csv format"],
    ogTitle: "CSV Validator - Free Online Structural Well-Formedness Checker | ToolZoneX",
    ogDescription: "Check a CSV file's structure — consistent columns and proper quote escaping.",
    schemaName: "CSV Validator",
    schemaDescription: "Check a CSV file for consistent column counts and proper RFC 4180 quote escaping, with specific row numbers for any issues.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this check that my data types are correct?", answer: "No — this tool only checks structural well-formedness (consistent columns and proper quote escaping). It does not verify that a column meant to hold numbers actually contains numbers, or enforce any business rules about the data's content." }, { question: "What counts as a properly escaped quote in CSV?", answer: "Per RFC 4180, if a field's value needs to contain a double-quote character, the whole field must be wrapped in quotes and the internal quote doubled — for example, a value of Say \"Hi\" should be written as \"Say \"\"Hi\"\"\" in the CSV file." }, { question: "Is my CSV data uploaded anywhere?", answer: "No — parsing and validation happen entirely client-side in your browser. Your file is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
