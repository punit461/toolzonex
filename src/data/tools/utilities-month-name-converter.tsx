import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/month-name-converter",
    navName: "Month Name Converter",
    navDescription: "Convert between month numbers and month names.",
    name: "Month Name Converter",
    description: "Convert a month number (1-12) to its full name, or a month name back to its number, with the standard 3-letter abbreviation shown for reference.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SwapHorizIcon fontSize="large" color="primary"/>,
    seoTitle: "Month Name Converter - Number to Month Name & Back",
    seoDescription: "Convert a month number to its full name, or a month name to its number, with the 3-letter abbreviation shown. Free bidirectional month converter.",
    keywords: ["month name converter", "month number to name", "month to number converter", "month abbreviation lookup", "convert month number"],
    ogTitle: "Month Name Converter - Number to Month Name & Back | ToolZoneX",
    ogDescription: "Convert a month number to its full name, or a month name to its number.",
    schemaName: "Month Name Converter",
    schemaDescription: "Convert a month number (1-12) to its full name, or a month name back to its number, with the standard 3-letter abbreviation shown for reference.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Are the two converters (number-to-name and name-to-number) linked?", answer: "No — they work as two independent converters side by side, so you can look up a number-to-name conversion and a name-to-number conversion at the same time without one affecting the other." }, { question: "What if I enter a number outside 1-12?", answer: "The number-to-name side shows a prompt to enter a valid number, since only 1 through 12 correspond to actual months." }, { question: "Are the abbreviations always exactly 3 letters?", answer: "Yes — this tool uses the standard, widely recognized 3-letter month abbreviations (Jan, Feb, Mar, and so on) used in most date formats and calendars." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
