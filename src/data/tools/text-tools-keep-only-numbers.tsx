import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/keep-only-numbers",
    navName: "Keep Only Numbers",
    navDescription: "Strip everything except digits from text.",
    name: "Keep Only Numbers",
    description: "Strip every character that isn't a digit from text, with an option to preserve decimal points and minus signs.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Keep Only Numbers - Extract Digits from Text Online",
    seoDescription: "Strip every character that isn't a digit from text, with an option to preserve decimal points and minus signs. Free online numbers-only extractor.",
    keywords: ["keep only numbers", "extract numbers from text", "remove letters from text", "digits only converter", "extract phone number from text"],
    ogTitle: "Keep Only Numbers - Extract Digits from Text Online | ToolZoneX",
    ogDescription: "Strip every character that isn't a digit from text, with an option to preserve decimal points and minus signs.",
    schemaName: "Keep Only Numbers",
    schemaDescription: "Strip every character that isn't a digit from text, with an option to preserve decimal points and minus signs.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Will it keep the minus sign in a negative number?", answer: "Yes, if \"Preserve decimal points and minus signs\" is checked — every hyphen/minus character in the text is kept, though note that in text with multiple dashes (like a formatted phone number), all of those dashes are preserved too, not just ones meant as a negative sign." }, { question: "Does it keep commas used as thousands separators?", answer: "No — commas are always removed; only digits (and optionally the decimal point and minus sign) are preserved." }, { question: "Can I use this to clean up a pasted phone number?", answer: "Yes — untick the decimal/minus option to strip parentheses, spaces, and dashes down to plain digits, giving you a clean number ready to dial or store." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
