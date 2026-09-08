import LocationCityIcon from '@mui/icons-material/LocationCity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/super-built-up-area-calculator",
    navName: "Super Built-up Area Calculator",
    navDescription: "Carpet to super built-up area (India).",
    name: "Super Built-up Area Calculator",
    description: "Calculate super built-up area from carpet area or built-up area using adjustable loading and common-area factors, showing the full chain of multipliers.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocationCityIcon fontSize="large" color="primary"/>,
    seoTitle: "Super Built-up Area Calculator - Indian Real Estate Pricing Area",
    seoDescription: "Free super built-up area calculator. Convert carpet or built-up area into super built-up area using adjustable loading and common-area factors.",
    keywords: ["super built-up area calculator", "super built up area formula", "carpet to super built-up area", "common area factor calculator", "indian apartment area calculator"],
    ogTitle: "Super Built-up Area Calculator - Indian Real Estate | ToolZoneX",
    ogDescription: "Calculate super built-up area from carpet or built-up area.",
    schemaName: "Super Built-up Area Calculator",
    schemaDescription: "Calculate super built-up area from carpet area or built-up area using adjustable loading and common-area factors.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Built-up Area Calculator?", answer: "The Built-up Area Calculator stops at built-up area (carpet area plus wall thickness and balconies). This Super Built-up Area Calculator goes one step further, adding a common-area factor for shared building spaces — the figure actually used to price most apartments in Indian real estate listings." }, { question: "What's a typical common-area factor?", answer: "Most developments use somewhere between 15% and 30%, depending on how much shared amenity space (lobbies, clubhouses, gyms) the building offers. Larger, amenity-heavy developments tend toward the higher end." }, { question: "Why does the usable carpet area feel so much smaller than the price I'm quoted?", answer: "Because pricing is based on super built-up area, which can be 25–50% larger than the actual usable carpet area once both the loading factor and common-area factor are applied. Always ask for the carpet area figure directly to know your true usable space." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
