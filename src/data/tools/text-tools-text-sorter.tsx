import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-sorter",
    navName: "Text Sorter",
    navDescription: "Sort lines alphabetically or by length.",
    name: "Text Sorter",
    description: "Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A).",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Sorter - Sort Lines Alphabetically Online",
    seoDescription: "Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A). Free online text sorter.",
    keywords: ["text sorter", "sort alphabetically", "alphabetical order", "sort list online", "A-Z sorter", "sort by length"],
    ogTitle: "Text Sorter - Sort Lines Alphabetically Online | ToolZoneX",
    ogDescription: "Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A). Free online text sorter.",
    schemaName: "Text Sorter",
    schemaDescription: "Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A).",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
