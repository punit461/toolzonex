import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-splitter",
    navName: "Text Splitter",
    navDescription: "Split text into chunks.",
    name: "Text Splitter",
    description: "Split text by characters, lines, or delimiters. Break large texts into smaller chunks online for free.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Splitter - Split Text by Lines, Chars, or Delimiters",
    seoDescription: "Split text by characters, lines, or delimiters. Break large texts into smaller chunks online for free. Ideal for Twitter threads or CSVs.",
    keywords: ["text splitter", "split text online", "break text into chunks", "split string by delimiter", "text chunker"],
    ogTitle: "Text Splitter - Split Text by Lines, Chars, or Delimiters | ToolZoneX",
    ogDescription: "Split text by characters, lines, or delimiters. Break large texts into smaller chunks online.",
    schemaName: "Text Splitter",
    schemaDescription: "Split text by characters, lines, or delimiters.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
