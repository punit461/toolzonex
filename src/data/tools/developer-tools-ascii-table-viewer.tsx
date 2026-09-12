import TableChartIcon from '@mui/icons-material/TableChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/ascii-table-viewer",
    navName: "ASCII Table Viewer",
    navDescription: "Browse the full ASCII table with search.",
    name: "ASCII Table Viewer",
    description: "Browse the complete standard ASCII table (codes 0-127) with decimal, hex, octal, and binary values, searchable by character, value, or name.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <TableChartIcon fontSize="large" color="primary"/>,
    seoTitle: "ASCII Table Viewer - Full ASCII Reference Table Online",
    seoDescription: "Browse the complete ASCII table (codes 0-127) with decimal, hex, octal, and binary values. Free searchable ASCII reference table.",
    keywords: ["ascii table viewer", "ascii table online", "ascii code reference", "ascii character table", "control character codes"],
    ogTitle: "ASCII Table Viewer - Full ASCII Reference Table Online | ToolZoneX",
    ogDescription: "Browse the complete ASCII table (codes 0-127) with decimal, hex, octal, and binary values.",
    schemaName: "ASCII Table Viewer",
    schemaDescription: "Browse the complete standard ASCII table (codes 0-127) with decimal, hex, octal, and binary values, searchable by character, value, or name.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Unicode Character Lookup or Finder?", answer: "Those tools look up detailed information about one specific Unicode character at a time, across the entire Unicode range (which spans over a million code points). This ASCII Table Viewer is a complete browsable reference table specifically of the foundational 128-character ASCII set — you scroll or search through the whole table rather than inspecting a single character." }, { question: "Why does the table stop at 127?", answer: "Standard ASCII is defined as exactly 128 characters, codes 0 through 127. Codes above 127 (128-255 and beyond) belong to extended character sets like Latin-1 or full Unicode, which sit outside the original ASCII standard." }, { question: "What do the control character names mean?", answer: "They're standard abbreviations from the ASCII specification for non-printable control codes — for example, LF (line feed) and CR (carriage return) are used to represent new lines, and ESC (escape) is used to start special escape sequences in terminals." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
