import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/birth-flower-finder",
    navName: "Birth Flower Finder",
    navDescription: "Find your traditional birth flower by month.",
    name: "Birth Flower Finder",
    description: "Select your birth month to find its traditional birth flower and a brief note on its symbolic meaning.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalFloristIcon fontSize="large" color="primary"/>,
    seoTitle: "Birth Flower Finder - Find Your Birth Month Flower",
    seoDescription: "Free online birth flower finder. Select your birth month to instantly find its traditional birth flower and symbolic meaning.",
    keywords: ["birth flower finder", "birth month flower", "what is my birth flower", "flower by birth month", "birth flower meaning"],
    ogTitle: "Birth Flower Finder - Find Your Birth Month Flower | ToolZoneX",
    ogDescription: "Select your birth month to instantly find its traditional birth flower and meaning.",
    schemaName: "Birth Flower Finder",
    schemaDescription: "Select your birth month to find its traditional birth flower and a brief note on its symbolic meaning.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why do some months have two birth flowers?", answer: "Birth flower lists were compiled from different floral traditions over time, and for several months two flowers became commonly associated with that month rather than just one — both are considered traditionally valid." }, { question: "Is there one single official birth flower list?", answer: "Not exactly — different regions and eras have published slightly varying lists. This tool uses the most widely recognized standard list found in modern references." }, { question: "Is this related to my zodiac sign?", answer: "No — birth flowers are tied purely to birth month, while zodiac signs follow their own date ranges that don't align cleanly with calendar months." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
