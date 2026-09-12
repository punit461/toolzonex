import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/chinese-zodiac-finder",
    navName: "Chinese Zodiac Finder",
    navDescription: "Find your Chinese zodiac animal from your birth year.",
    name: "Chinese Zodiac Finder",
    description: "Enter a birth year to find the corresponding Chinese zodiac animal from the 12-year cycle, along with a short trait description.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Chinese Zodiac Finder - Find Your Zodiac Animal by Birth Year",
    seoDescription: "Free online Chinese zodiac finder. Enter your birth year to instantly find your Chinese zodiac animal sign and personality traits.",
    keywords: ["Chinese zodiac finder", "Chinese zodiac animal by year", "what is my Chinese zodiac sign", "Chinese zodiac calculator", "12 year zodiac cycle"],
    ogTitle: "Chinese Zodiac Finder - Find Your Zodiac Animal by Birth Year | ToolZoneX",
    ogDescription: "Enter your birth year to instantly find your Chinese zodiac animal sign.",
    schemaName: "Chinese Zodiac Finder",
    schemaDescription: "Enter a birth year to find the corresponding Chinese zodiac animal from the 12-year cycle, along with a short trait description.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Zodiac Calculator and Zodiac Sign Finder?", answer: "Those tools determine your WESTERN zodiac sign (like Gemini or Leo) from your birth date's month and day — 12 signs tied to the time of year you were born. The Chinese zodiac is a completely different, unrelated system: a 12-year cycle of animal signs based purely on your birth YEAR, with no connection to month or day at all." }, { question: "Why does the tool mention January and February specifically?", answer: "The Chinese New Year doesn't fall on a fixed calendar date — it shifts each year, typically landing between late January and mid-February based on the lunar calendar. Someone born in that window before the actual Chinese New Year date technically belongs to the previous year's animal sign. This tool uses a simple calendar-year approximation, so results near that boundary may be off by one sign — a fully precise version would need the exact lunar new year date for each specific year." }, { question: "Is the 12-year cycle always in the same order?", answer: "Yes — the cycle always follows the same fixed sequence (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig) and simply repeats every 12 years indefinitely in both directions." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
