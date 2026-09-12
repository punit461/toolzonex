import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/words-to-number-converter",
    navName: "Words to Number",
    navDescription: "Convert number words to digits.",
    name: "Words to Number Converter",
    description: "Convert written English number words into digits. Free online words to number converter that handles millions and billions.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Words to Number Converter - Word to Digit",
    seoDescription: "Free online words to number converter. Type 'two hundred fifty thousand' and get 250000 instantly. Handles millions, billions, hyphens, and 'and'.",
    keywords: ["words to number", "word to number converter", "number words to digits", "spelled out number converter", "two hundred to 200", "english number words"],
    ogTitle: "Words to Number Converter - Word to Digit | ToolZoneX",
    ogDescription: "Convert written number words into digits instantly, up to billions.",
    schemaName: "Words to Number Converter",
    schemaDescription: "Convert English number words into numeric digits.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What number words does it accept?", answer: "English cardinal words — one to nine hundred ninety-nine, plus thousand, million, and billion scales, with optional 'and' and hyphens (e.g. 'twenty-one')." }, { question: "Can it handle decimals?", answer: "Yes — simple decimals like 'three point five' convert to 3.5. The parser treats 'point' followed by digits as the fractional part." }, { question: "How does the parser work?", answer: "It tokenizes and processes groups: a number under 1000 is accumulated, then multiplied by the following scale word (thousand, million, billion) and added to the total — the standard Western grouping system." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
