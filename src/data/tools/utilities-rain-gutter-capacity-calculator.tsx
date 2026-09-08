import WavesIcon from '@mui/icons-material/Waves';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/rain-gutter-capacity-calculator",
    navName: "Rain Gutter Capacity Calculator",
    navDescription: "Check if your gutter size can drain your roof.",
    name: "Rain Gutter Capacity Calculator",
    description: "Check whether a gutter size can adequately drain a roof at a given rainfall intensity, or get a recommendation to upsize.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <WavesIcon fontSize="large" color="primary"/>,
    seoTitle: "Rain Gutter Capacity Calculator - Gutter Sizing Check",
    seoDescription: "Free rain gutter capacity calculator. Enter roof area, rainfall intensity, and gutter size to check if your gutters can handle heavy rain.",
    keywords: ["rain gutter capacity calculator", "gutter sizing calculator", "gutter capacity chart calculator", "what size gutter do i need calculator", "gutter drainage calculator"],
    ogTitle: "Rain Gutter Capacity Calculator - Gutter Sizing Check | ToolZoneX",
    ogDescription: "Check whether a gutter size can adequately drain a roof at a given rainfall intensity.",
    schemaName: "Rain Gutter Capacity Calculator",
    schemaDescription: "Compare roof area against a gutter size's rated maximum drainage area at a given rainfall intensity to determine adequacy.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Rainfall Collection Calculator?", answer: "The Rainfall Collection Calculator estimates the total volume of water you could harvest into a rain barrel or cistern from a roof over time. This tool answers a different question — whether your gutter system's size can adequately drain your roof during a heavy rain event without overflowing." }, { question: "What rainfall intensity should I design for?", answer: "Many gutter sizing guidelines use a 1 in/hr storm as a standard reference point, but check your local climate data for a more accurate design storm intensity — areas prone to intense downpours may need to plan for a higher rate." }, { question: "Are these gutter capacity figures exact for every manufacturer?", answer: "No — these are reasonable illustrative figures consistent with commonly published K-style gutter sizing tables. Actual capacity varies by gutter profile, slope, and number/placement of downspouts, so consult your gutter manufacturer's specifications for a precise design." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
