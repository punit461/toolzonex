import CallSplitIcon from '@mui/icons-material/CallSplit';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-divider",
    navName: "Text Divider",
    navDescription: "Split text by delimiter or chunk size.",
    name: "Text Divider",
    description: "Divide text into labeled sections by a custom delimiter, a fixed character count, or a fixed word count, each with its own copy button.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <CallSplitIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Divider - Split Text into Sections Online",
    seoDescription: "Divide text into labeled sections by a custom delimiter, a fixed character count, or a fixed word count. Free and instant.",
    keywords: ["text divider", "split text online", "divide text into sections", "text chunker"],
    ogTitle: "Text Divider - Split Text into Sections Online | ToolZoneX",
    ogDescription: "Divide text into labeled sections by delimiter, character count, or word count.",
    schemaName: "Text Divider",
    schemaDescription: "Divide text into labeled sections by a custom delimiter, a fixed character count, or a fixed word count, each with its own copy button.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I split on a blank line?", answer: "Choose \"Custom Delimiter\" and enter \\n\\n as the delimiter — this splits the text wherever two consecutive line breaks occur, effectively dividing it by paragraph." }, { question: "Do the fixed character/word sections split mid-word or mid-sentence?", answer: "Fixed word count sections always end on a whole word. Fixed character count sections cut at an exact character position, which may land in the middle of a word — use word count mode if you need clean word boundaries." }, { question: "Can I copy just one section instead of everything?", answer: "Yes — every section has its own \"Copy\" button, so you can copy individual sections without selecting text manually." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
