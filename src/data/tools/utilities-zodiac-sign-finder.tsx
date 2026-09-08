import StarIcon from '@mui/icons-material/Star';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/zodiac-sign-finder",
    navName: "Zodiac Sign Finder",
    navDescription: "Find your zodiac sign from your birthday.",
    name: "Zodiac Sign Finder - Find Your Zodiac Sign by Birthday",
    description: "Find your zodiac sign, element, ruling planet, and personality traits from your birthday. Free online zodiac sign finder.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <StarIcon fontSize="large" color="primary"/>,
    seoTitle: "Zodiac Sign Finder - Find Your Zodiac Sign by Birthday",
    seoDescription: "Free online zodiac sign finder. Enter your birthday to discover your sun sign, element, ruling planet, and personality traits.",
    keywords: ["zodiac sign finder", "what is my zodiac sign", "star sign finder", "zodiac sign by birthday", "horoscope sign finder"],
    ogTitle: "Zodiac Sign Finder - Find Your Zodiac Sign by Birthday | ToolZoneX",
    ogDescription: "Find your zodiac sign, element, ruling planet, and personality traits from your birthday.",
    schemaName: "Zodiac Sign Finder",
    schemaDescription: "Find your zodiac sign, element, ruling planet, and personality traits from your birthday.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between sun, moon, and rising signs?", answer: "Your sun sign is determined by the Sun's position at birth and represents your core identity. This tool calculates only your sun sign." }, { question: "Can the dates change year to year?", answer: "The exact dates can shift by a day or two due to the Gregorian calendar and leap years. The dates used here are the most widely accepted standard ranges." }, { question: "What do the elements mean?", answer: "Fire signs are passionate and energetic. Earth signs are grounded and practical. Air signs are intellectual and social. Water signs are emotional and intuitive." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
