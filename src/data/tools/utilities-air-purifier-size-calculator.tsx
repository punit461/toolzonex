import AirIcon from '@mui/icons-material/Air';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/air-purifier-size-calculator",
    navName: "Air Purifier Size Calculator",
    navDescription: "Recommended CADR for your room size.",
    name: "Air Purifier Size Calculator",
    description: "Calculate the recommended air purifier CADR (Clean Air Delivery Rate) for a room from its length, width, and ceiling height.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AirIcon fontSize="large" color="primary"/>,
    seoTitle: "Air Purifier Size Calculator - Recommended CADR",
    seoDescription: "Free air purifier size calculator. Enter room length, width, and ceiling height to get a recommended CADR (Clean Air Delivery Rate) for your space.",
    keywords: ["air purifier size calculator", "cadr calculator", "air purifier room size", "what size air purifier do i need", "air changes per hour calculator"],
    ogTitle: "Air Purifier Size Calculator - Recommended CADR | ToolZoneX",
    ogDescription: "Calculate the recommended air purifier CADR for your room size.",
    schemaName: "Air Purifier Size Calculator",
    schemaDescription: "Calculate the recommended air purifier CADR (Clean Air Delivery Rate) for a room from its length, width, and ceiling height.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What is CADR, exactly?", answer: "CADR (Clean Air Delivery Rate) is an independently tested rating showing how much filtered air (in cubic feet per minute) a purifier delivers for smoke, dust, and pollen specifically. It's printed on most reputable air purifiers and is the standard way to compare cleaning power across models." }, { question: "Why does ceiling height matter if it's not in the main formula?", answer: "This calculator's area-based estimate assumes a standard ceiling height (around 8 ft). Room volume is shown separately for reference — for unusually tall or vaulted ceilings, you may want to increase the recommended CADR factor since there's more total air volume to clean." }, { question: "Should allergy sufferers use a higher CADR target?", answer: "Yes — people with allergies, asthma, or pet sensitivities often benefit from a higher air-changes-per-hour target (5 or more), which means increasing the factor input above the default 1.5 to get a higher recommended CADR." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
