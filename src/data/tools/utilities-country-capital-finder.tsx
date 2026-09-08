import LocationCityIcon from '@mui/icons-material/LocationCity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/country-capital-finder",
    navName: "Country Capital Finder",
    navDescription: "Search a country or capital city to find the other.",
    name: "Country Capital Finder",
    description: "Search around 195 countries by country name or capital city name to instantly find the matching capital or country.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocationCityIcon fontSize="large" color="primary"/>,
    seoTitle: "Country Capital Finder - Search by Country or Capital",
    seoDescription: "Free country capital finder. Search any country name or capital city name to instantly find the match.",
    keywords: ["country capital finder", "capital city finder", "country capitals lookup", "find country by capital", "world capitals search"],
    ogTitle: "Country Capital Finder - Search by Country or Capital | ToolZoneX",
    ogDescription: "Search a country or capital city name to find the match instantly.",
    schemaName: "Country Capital Finder",
    schemaDescription: "Search around 195 countries by country name or capital city name to instantly find the matching capital or country.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this cover every country?", answer: "It covers roughly 195 widely-recognized countries — all UN member states plus a few commonly searched additional entries — rather than every dependent territory in the world." }, { question: "What about countries with more than one capital?", answer: "A few countries (like South Africa or Bolivia) have multiple official capitals for different branches of government. This tool lists the single most commonly cited capital for simplicity." }, { question: "Can I search using a partial name?", answer: "Yes — the search matches any part of the country or capital name, so typing just a few letters is often enough to find what you're looking for." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
