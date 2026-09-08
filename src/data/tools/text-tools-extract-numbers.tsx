import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/extract-numbers",
    navName: "Extract Numbers",
    navDescription: "Pull all numbers out of any text.",
    name: "Extract Numbers from Text",
    description: "Extract every numeric substring from text, including decimals and negative numbers, as a clean copyable list.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Extract Numbers from Text - Free Online Tool",
    seoDescription: "Extract every numeric substring from text, including decimals and negative numbers. Free online tool with copy and download support.",
    keywords: ["extract numbers", "extract numbers from text", "find numbers in text", "number extractor", "pull numbers from string"],
    ogTitle: "Extract Numbers from Text - Free Online Tool | ToolZoneX",
    ogDescription: "Extract every numeric substring from text, including decimals and negative numbers.",
    schemaName: "Extract Numbers",
    schemaDescription: "Extract every numeric substring from text, including decimals and negative numbers, as a clean copyable list.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does it handle negative numbers and decimals?", answer: "Yes — a minus sign directly before a number and a decimal point within a number are both recognized, so values like -45 and 3.14 are extracted correctly." }, { question: "Does it remove duplicate numbers?", answer: "No — every occurrence is listed in the order it appears, including repeats, since duplicate values (like a repeated total) are often meaningful in the source text." }, { question: "Can it extract numbers formatted with commas, like 1,000?", answer: "Thousands separators are treated as a break between numbers, so \"1,000\" is extracted as 1 and 000. Remove comma separators first if you need thousands to stay intact as a single number." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
