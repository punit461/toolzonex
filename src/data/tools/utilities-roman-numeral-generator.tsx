import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/roman-numeral-generator",
    navName: "Roman Numeral Generator",
    navDescription: "Generate a Roman numeral from a number.",
    name: "Roman Numeral Generator",
    description: "Generate the Roman numeral for any whole number from 1 to 3999 — a simple, one-directional number-to-Roman-numeral tool.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Roman Numeral Generator - Convert Numbers to Roman Numerals",
    seoDescription: "Free Roman numeral generator. Type any whole number from 1 to 3999 and instantly generate its Roman numeral equivalent.",
    keywords: ["roman numeral generator", "generate roman numeral", "number to roman numeral generator", "roman numeral maker", "convert number to roman numerals"],
    ogTitle: "Roman Numeral Generator - Convert Numbers to Roman Numerals | ToolZoneX",
    ogDescription: "Generate the Roman numeral for any whole number from 1 to 3999.",
    schemaName: "Roman Numeral Generator",
    schemaDescription: "Generate the Roman numeral for any whole number from 1 to 3999 — a simple, one-directional number-to-Roman-numeral tool.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What is the Roman numeral for 2024?", answer: "2024 in Roman numerals is \"MMXXIV\". Enter any year into the field above to generate its Roman numeral equivalent the same way." }, { question: "Can I also convert Roman numerals back to numbers with this tool?", answer: "This generator is one-directional — number to Roman numeral only, for a simpler, faster experience. If you need to convert Roman numerals back into regular numbers too, use our bi-directional Roman Numeral Converter instead." }, { question: "What's the largest number I can generate a Roman numeral for?", answer: "This generator supports numbers up to 3999 (MMMCMXCIX), the practical limit of standard Roman numeral notation without adding special overline symbols for larger values." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
