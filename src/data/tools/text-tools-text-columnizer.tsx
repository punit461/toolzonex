import TableChartIcon from '@mui/icons-material/TableChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-columnizer",
    navName: "Text Columnizer",
    navDescription: "Arrange a flat list into aligned print-ready columns.",
    name: "Text Columnizer",
    description: "Rearrange a flat list into neatly aligned, space-padded columns with a choice of across-then-down or down-then-across fill order.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TableChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Columnizer - Arrange a List into Columns Online",
    seoDescription: "Rearrange a flat list into neatly aligned, space-padded columns with a choice of fill order. Free online text columnizer for print-ready lists.",
    keywords: ["text columnizer", "arrange list into columns", "print friendly list generator", "column formatter online", "raffle ticket columns"],
    ogTitle: "Text Columnizer - Arrange a List into Columns Online | ToolZoneX",
    ogDescription: "Rearrange a flat list into neatly aligned, space-padded columns.",
    schemaName: "Text Columnizer",
    schemaDescription: "Rearrange a flat list into neatly aligned, space-padded columns with a choice of across-then-down or down-then-across fill order.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between the two fill orders?", answer: "\"Across then down\" (row-major) fills row 1 completely with the first few items before starting row 2, like reading order. \"Down then across\" (column-major) instead fills column 1 top-to-bottom first, then moves to column 2 — useful when items should read down each column, like a printed ballot or numbered list." }, { question: "Why does the output use monospace font?", answer: "Monospace ensures every character takes up the same width, so the space-padded columns actually line up visually — with a variable-width font, the padding would look misaligned." }, { question: "What happens if the number of items doesn't divide evenly into columns?", answer: "The last row (or column) is simply left with empty cells for the remainder — the layout still renders correctly, just with some blank spots at the end." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
