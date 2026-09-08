import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/keep-only-letters",
    navName: "Keep Only Letters",
    navDescription: "Strip everything except alphabetic letters.",
    name: "Keep Only Letters",
    description: "Strip every character that isn't an alphabetic letter from text, with an option to preserve spaces.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Keep Only Letters - Remove Numbers & Symbols from Text",
    seoDescription: "Strip every character that isn't an alphabetic letter from text, with an option to preserve spaces. Free online letters-only text cleaner.",
    keywords: ["keep only letters", "remove numbers from text", "strip symbols from text", "letters only converter", "alphabetic characters only"],
    ogTitle: "Keep Only Letters - Remove Numbers & Symbols from Text | ToolZoneX",
    ogDescription: "Strip every character that isn't an alphabetic letter from text, with an option to preserve spaces.",
    schemaName: "Keep Only Letters",
    schemaDescription: "Strip every character that isn't an alphabetic letter from text, with an option to preserve spaces.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this remove numbers too?", answer: "Yes — only alphabetic letters are kept; every digit, symbol, and punctuation mark is stripped out along with everything else that isn't a letter." }, { question: "Why keep the spaces toggle on by default?", answer: "Stripping spaces along with everything else usually isn't what people want, since it jams every word together into one unreadable block — keeping spaces preserved by default keeps the result usable out of the box." }, { question: "Are accented letters like é or ñ kept?", answer: "No — only the standard A-Z / a-z letters are treated as letters; accented and non-Latin characters are removed along with numbers and symbols." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
