import TableChartIcon from '@mui/icons-material/TableChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/word-frequency-counter",
    navName: "Word Frequency Counter",
    navDescription: "Table of every word and its count.",
    name: "Word Frequency Counter",
    description: "See a full table of every distinct word in text and how often it occurs, sorted by frequency descending, with a case-insensitivity toggle.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TableChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Word Frequency Counter - Word Occurrence Table Online",
    seoDescription: "See a full table of every distinct word in your text and how often it occurs, sorted by frequency descending. Free and instant.",
    keywords: ["word frequency counter", "word occurrence counter", "count word occurrences", "word frequency table"],
    ogTitle: "Word Frequency Counter - Word Occurrence Table Online | ToolZoneX",
    ogDescription: "See a full table of every distinct word and how often it occurs.",
    schemaName: "Word Frequency Counter",
    schemaDescription: "See a full table of every distinct word in text and how often it occurs, sorted by frequency descending, with a case-insensitivity toggle.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Word Frequency Visualizer?", answer: "This tool shows a complete, sortable table of every distinct word and its exact count. The Word Frequency Visualizer instead shows only the top 15 words as a bar chart for a quicker visual overview — use whichever format suits your needs." }, { question: "Is counting case-sensitive by default?", answer: "No — case-insensitive counting is on by default, so \"The\", \"THE\", and \"the\" are combined into a single row. Untick the option to count them separately." }, { question: "Does it exclude common stopwords?", answer: "No — every word is counted, including common words like \"the\" and \"and\". If you want frequent words with stopwords filtered out, use the Keyword Extractor tool instead." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
