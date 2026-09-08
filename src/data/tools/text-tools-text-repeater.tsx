import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-repeater",
    navName: "Text Repeater",
    navDescription: "Repeat text multiple times.",
    name: "Text Repeater",
    description: "Repeat a word or phrase up to 100,000 times instantly. Free online text multiplier tool.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Repeater - Multiply Words and Phrases Online",
    seoDescription: "Repeat a word or phrase up to 100,000 times instantly. Free online text multiplier and string repeater tool.",
    keywords: ["text repeater", "repeat text online", "word multiplier", "string repeater", "repeat string 1000 times", "name multiplier", "sentence multiplier", "multiply text"],
    ogTitle: "Text Repeater - Multiply Words and Phrases Online | ToolZoneX",
    ogDescription: "Repeat a word or phrase up to 100,000 times instantly. Free online text multiplier.",
    schemaName: "Text Repeater",
    schemaDescription: "Repeat a word or phrase up to 100,000 times instantly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I use this as a name multiplier or sentence multiplier?", answer: "Yes — this tool works as a general text multiplier, so it doubles as a name multiplier (repeating a single name many times) or a sentence multiplier (repeating a full sentence). Just type the name or sentence in the input box and set how many times to multiply text." }, { question: "Is there a limit to how many times I can repeat text?", answer: "The tool supports very high repeat counts, though extremely large outputs may take a moment to render in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
