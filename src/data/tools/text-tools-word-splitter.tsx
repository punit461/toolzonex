import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/word-splitter",
    navName: "Word Splitter",
    navDescription: "Split text into words by space, comma, or custom delimiter.",
    name: "Word Splitter",
    description: "Split text into individual words by space, newline, comma, or a custom delimiter, with word, character, and line counts.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Word Splitter - Split Text Into Words Online",
    seoDescription: "Free word splitter to break text into individual words by space, newline, comma, or a custom delimiter, with instant word and character counts.",
    keywords: ["word splitter", "split text into words", "split by delimiter", "text splitter online", "split comma separated text"],
    ogTitle: "Word Splitter - Split Text Into Words Online | ToolZoneX",
    ogDescription: "Split text into individual words by space, newline, comma, or a custom delimiter.",
    schemaName: "Word Splitter",
    schemaDescription: "Split text into individual words by space, newline, comma, or a custom delimiter, with word, character, and line counts.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I sort the results?", answer: "Yes — check the \"Sort Alphabetically\" option before splitting." }, { question: "What delimiter should I use?", answer: "Choose \"Custom Delimiter\" and enter any character or string (e.g., |, ;, or ::) to split on." }, { question: "Does it trim whitespace?", answer: "Yes — leading and trailing whitespace around each word is automatically removed." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
