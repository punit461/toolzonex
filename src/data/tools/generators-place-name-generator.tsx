import LocationCityIcon from '@mui/icons-material/LocationCity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/place-name-generator",
    navName: "Place Name Generator",
    navDescription: "Generate realistic or fantasy town and city names.",
    name: "Place Name Generator - Realistic & Fantasy Town Names",
    description: "Choose Realistic or Fantasy style and generate a new town, city, or region name by combining word parts — great for writers, worldbuilders, and game masters.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LocationCityIcon fontSize="large" color="primary"/>,
    seoTitle: "Place Name Generator - Realistic & Fantasy Town Names",
    seoDescription: "Free place name generator. Generate realistic or fantasy town, city, and region names instantly for your novel, RPG campaign, or worldbuilding project.",
    keywords: ["place name generator", "fantasy place name generator", "town name generator", "city name generator", "fantasy city name generator"],
    ogTitle: "Place Name Generator - Realistic & Fantasy Town Names | ToolZoneX",
    ogDescription: "Generate realistic or fantasy town and city names instantly.",
    schemaName: "Place Name Generator",
    schemaDescription: "Choose Realistic or Fantasy style and generate a new town, city, or region name by combining word parts.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between Realistic and Fantasy mode?", answer: "Realistic mode combines real-world-sounding English place-name parts (like \"New\", \"-ville\", \"-burg\") to produce names that could plausibly be a real town. Fantasy mode combines invented, evocative syllables (like \"El-\", \"-dor\", \"-hold\") to produce names that sound like they belong in an invented fantasy world." }, { question: "Can I get the same place name twice?", answer: "Yes — each click randomly recombines the word parts, so repeats are possible, though the range of combinations is large." }, { question: "Are these real places?", answer: "No — every generated name is an invented combination of word parts and isn't checked against real-world place names, so some may coincidentally resemble a real town." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
