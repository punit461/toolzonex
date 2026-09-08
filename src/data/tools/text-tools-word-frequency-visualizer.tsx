import BarChartIcon from '@mui/icons-material/BarChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/word-frequency-visualizer",
    navName: "Word Frequency Visualizer",
    navDescription: "Bar-chart view of the most frequent words.",
    name: "Word Frequency Visualizer",
    description: "Visualize the top most frequent words in text as a horizontal bar chart scaled to the most-repeated word.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <BarChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Word Frequency Visualizer - Bar Chart of Top Words",
    seoDescription: "Visualize the top most frequent words in any text as a horizontal bar chart. Free and instant, no sign-up required.",
    keywords: ["word frequency visualizer", "word frequency chart", "most frequent words", "word frequency bar chart"],
    ogTitle: "Word Frequency Visualizer - Bar Chart of Top Words | ToolZoneX",
    ogDescription: "Visualize the top most frequent words in any text as a horizontal bar chart.",
    schemaName: "Word Frequency Visualizer",
    schemaDescription: "Visualize the top most frequent words in text as a horizontal bar chart scaled to the most-repeated word.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is this case-sensitive?", answer: "No — all words are lowercased before counting, so \"The\" and \"the\" are combined into one bar." }, { question: "How many words does it show?", answer: "The top 15 most frequent words are shown as bars. For a full table of every distinct word and its count, use the Word Frequency Counter tool instead." }, { question: "Does it exclude common words like \"the\" or \"and\"?", answer: "No — this tool visualizes raw frequency for every word as typed. If you want frequent words with common stopwords filtered out, use the Keyword Extractor tool instead." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
