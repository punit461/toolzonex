import LocationCityIcon from '@mui/icons-material/LocationCity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-city-generator",
    navName: "Random City Generator",
    navDescription: "Generate a random world city.",
    name: "Random City Generator - With Country",
    description: "Generate a random well-known city from around the world, shown alongside its country.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LocationCityIcon fontSize="large" color="primary"/>,
    seoTitle: "Random City Generator - With Country Shown",
    seoDescription: "Generate a random well-known city from around the world, shown alongside its country. Free and instant, great for travel ideas and games.",
    keywords: ["random city generator", "random city picker", "generate random city", "city name generator"],
    ogTitle: "Random City Generator - With Country Shown | ToolZoneX",
    ogDescription: "Generate a random well-known city from around the world, shown alongside its country.",
    schemaName: "Random City Generator",
    schemaDescription: "Generate a random well-known city from around the world, shown alongside its country.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Which cities are included?", answer: "The generator draws from a curated list of well-known major cities spanning every populated continent, rather than every city in the world." }, { question: "Can the same city appear twice in a row?", answer: "Yes — each click is an independent random pick, so the same city can come up more than once." }, { question: "Does it show which country the city is in?", answer: "Yes — every result shows both the city name and its country underneath." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
