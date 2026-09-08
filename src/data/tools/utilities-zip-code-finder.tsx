import MapIcon from '@mui/icons-material/Map';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/zip-code-finder",
    navName: "ZIP Code Finder",
    navDescription: "Look up ZIP codes for major US cities.",
    name: "ZIP Code Finder",
    description: "Search a curated list of roughly 200 major US cities to find a representative ZIP code by city name or ZIP prefix.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <MapIcon fontSize="large" color="primary"/>,
    seoTitle: "ZIP Code Finder - Look Up ZIP Codes for Major US Cities",
    seoDescription: "Free ZIP code finder covering roughly 200 major US cities. Search by city name or ZIP prefix to find a representative ZIP code instantly.",
    keywords: ["zip code finder", "find zip code by city", "us zip code lookup", "city zip code search", "zip code list"],
    ogTitle: "ZIP Code Finder - Look Up ZIP Codes for Major US Cities | ToolZoneX",
    ogDescription: "Search a curated list of major US cities to find a representative ZIP code.",
    schemaName: "ZIP Code Finder",
    schemaDescription: "Search a curated list of roughly 200 major US cities to find a representative ZIP code by city name or ZIP prefix.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this cover every US city and ZIP code?", answer: "No — this is a curated reference of roughly 200 of the largest US cities, not the full national ZIP code database, which contains tens of thousands of codes. For an exhaustive, authoritative lookup by exact address, use usps.com." }, { question: "Why does a city only show one ZIP code when it actually has many?", answer: "Large cities are typically split across dozens of ZIP codes by neighborhood. This tool lists one representative ZIP per city to keep the reference list compact and manageable rather than attempting to enumerate every ZIP a city contains." }, { question: "Can I search by partial ZIP code?", answer: "Yes — typing the first few digits of a ZIP code returns every listed city whose ZIP starts with those digits." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
