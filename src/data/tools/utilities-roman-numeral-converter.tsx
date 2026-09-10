import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/roman-numeral-converter",
    navName: "Roman Numeral",
    navDescription: "Numbers to Roman numerals.",
    name: "Roman Numeral Converter - Numbers to Roman Numerals & Back",
    description: "Convert numbers to Roman numerals, or translate Roman numerals back to regular numbers, instantly. Free bi-directional roman numeral converter and translator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Roman Numeral Converter - Numbers to Roman Numerals & Back",
    seoDescription: "Convert numbers to Roman numerals, or translate Roman numerals back to regular numbers, instantly. Free bi-directional roman numeral converter and translator.",
    keywords: ["roman numeral converter", "roman numerals converter", "numbers to roman numerals", "translate roman numerals", "roman numeral calculator", "convert to roman numerals", "convert to roman", "number to roman converter", "calculator for roman numerals", "convert roman to english", "translate roman numerals to english", "roman number to english number", "change number to roman numerals", "translate into roman numerals", "numbers to roman", "roman numbers translate", "numbers to roman letters", "roman numeral to number", "roman numerals to numbers converter"],
    ogTitle: "Roman Numeral Converter - Numbers to Roman Numerals & Back | ToolZoneX",
    ogDescription: "Convert numbers to Roman numerals, or translate Roman numerals back to regular numbers, instantly. Free bi-directional roman numeral converter and translator.",
    schemaName: "Roman Numeral Converter",
    schemaDescription: "Convert numbers to Roman numerals, or translate Roman numerals back to regular numbers, instantly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I convert a number to Roman numerals?", answer: "Type your number into the \"Number\" field (any whole number from 1 to 3999) and the Roman numeral translation appears immediately in the \"Roman Numeral\" field below — no extra steps or button presses needed." }, { question: "Can I convert Roman numerals back to regular numbers with this tool?", answer: "Yes — this tool converts in both directions. Type the Roman numeral (like \"MCMXCIV\" or \"XIV\") into the \"Roman Numeral\" field and the regular (decimal) number appears instantly in the \"Number\" field — this is the same as translating Roman numerals to English or converting a Roman number to an English number." }, { question: "What is the Roman numeral for 2024?", answer: "2024 in Roman numerals is \"MMXXIV\" (M + M + XX + IV = 1000 + 1000 + 20 + 4). You can enter any year into the Number field to see its Roman numeral equivalent the same way." }, { question: "Why is there no number for zero in Roman numerals?", answer: "The classical Roman numeral system had no symbol for zero, which is why this converter supports whole numbers from 1 to 3999." }, { question: "What's the largest number I can convert to Roman numerals?", answer: "This converter supports numbers up to 3999 (MMMCMXCIX), which is the practical limit of standard Roman numeral notation without adding special overline symbols for larger values." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
