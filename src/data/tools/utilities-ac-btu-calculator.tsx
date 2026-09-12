import AcUnitIcon from '@mui/icons-material/AcUnit';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/ac-btu-calculator",
    navName: "AC BTU Calculator",
    navDescription: "Size an air conditioner for a room.",
    name: "AC BTU Calculator - Air Conditioner Sizing Guide",
    description: "Estimate the recommended BTU cooling capacity for a room from its area, ceiling height, sun exposure, and occupancy.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AcUnitIcon fontSize="large" color="primary"/>,
    seoTitle: "AC BTU Calculator - Air Conditioner Sizing Guide",
    seoDescription: "Free AC BTU calculator. Enter room size, ceiling height, sun exposure, and occupants to find the recommended air conditioner capacity in BTUs.",
    keywords: ["ac btu calculator", "air conditioner size calculator", "btu calculator for room size", "what size ac do i need", "mini split sizing calculator"],
    ogTitle: "AC BTU Calculator - Air Conditioner Sizing Guide | ToolZoneX",
    ogDescription: "Find the recommended BTU capacity for your room's air conditioner.",
    schemaName: "AC BTU Calculator",
    schemaDescription: "Estimate the recommended BTU cooling capacity for a room from its area, ceiling height, sun exposure, and occupancy.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What's the 20 BTU per square foot rule based on?", answer: "It's a widely used general guideline for a typical living space with a standard 8 ft ceiling and normal insulation. It's a solid starting point for most rooms, but rooms with poor insulation, lots of windows, or unusual layouts may need a more detailed load calculation from an HVAC professional." }, { question: "Why does sun exposure change the recommendation?", answer: "A room with large west- or south-facing windows and lots of direct sunlight absorbs significantly more heat during the day than a shaded room, so it needs extra cooling capacity to keep up. Shaded rooms need somewhat less." }, { question: "Should I round the result up or down?", answer: "Round up to the nearest common AC unit size (5,000, 6,000, 8,000, 10,000, 12,000, 14,000 BTU, and so on) rather than down — an undersized unit will run constantly without effectively cooling the room, while a modestly oversized one just cycles off sooner." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
