import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/csv-minifier",
    navName: "CSV Minifier",
    navDescription: "Shrink CSV by stripping unnecessary whitespace.",
    name: "CSV Minifier",
    description: "Minify CSV by stripping unnecessary whitespace around delimiters and unneeded quotes, while preserving whitespace inside quoted fields. Free online CSV minifier.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "CSV Minifier - Shrink CSV File Size Online",
    seoDescription: "Free online CSV minifier. Strip unnecessary whitespace and quotes from CSV data for the smallest possible valid output.",
    keywords: ["csv minifier", "minify csv", "shrink csv file size", "compact csv online", "csv whitespace remover"],
    ogTitle: "CSV Minifier - Shrink CSV File Size Online | ToolZoneX",
    ogDescription: "Minify CSV by stripping unnecessary whitespace and quotes for the smallest possible file size.",
    schemaName: "CSV Minifier",
    schemaDescription: "Minify CSV by stripping unnecessary whitespace around delimiters and unneeded quotes, while preserving whitespace inside quoted fields.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the CSV Formatter?", answer: "The CSV Formatter does the opposite job — it ALIGNS CSV into readable, padded columns for easier reading by a human. This CSV Minifier strips all non-essential whitespace instead, aiming for the smallest possible file size rather than readability." }, { question: "Will this change what my CSV actually contains?", answer: "No — the output parses to exactly the same rows and values as the input. Only insignificant whitespace (padding around delimiters and outside quoted fields) and unnecessary quote marks are removed; any whitespace that was genuinely inside a quoted field is preserved exactly." }, { question: "Does it handle fields containing commas or quotes correctly?", answer: "Yes — fields that contain a comma, a quote character, or a newline are automatically kept quoted (with embedded quotes doubled per the CSV standard) so the minified output still parses correctly." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
