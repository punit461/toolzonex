import ViewInArIcon from '@mui/icons-material/ViewInAr';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/room-volume-calculator",
    navName: "Room Volume Calculator",
    navDescription: "Calculate a room's air volume.",
    name: "Room Volume Calculator",
    description: "Calculate a room's volume in cubic feet and cubic meters from its length, width, and height.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ViewInArIcon fontSize="large" color="primary"/>,
    seoTitle: "Room Volume Calculator - Cubic Feet & Cubic Meters",
    seoDescription: "Free room volume calculator. Enter length, width, and height to calculate a room's volume in cubic feet and cubic meters, useful for HVAC sizing.",
    keywords: ["room volume calculator", "cubic feet calculator room", "room cubic footage calculator", "hvac room volume calculator", "cubic meters room calculator"],
    ogTitle: "Room Volume Calculator - Cubic Feet & Cubic Meters | ToolZoneX",
    ogDescription: "Calculate a room's volume for HVAC and ventilation sizing.",
    schemaName: "Room Volume Calculator",
    schemaDescription: "Calculate room volume in cubic feet and cubic meters from length, width, and height.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does volume matter more than floor area for HVAC sizing?", answer: "Heating, cooling, and air purification all work on the volume of air in a space, not just its floor footprint. A room with a 12-foot ceiling has 33% more air to condition than an identical-footprint room with a 9-foot ceiling, which directly affects the equipment capacity you need." }, { question: "How do I handle a room with a sloped or vaulted ceiling?", answer: "For a sloped ceiling, use the average height across the room as an approximation, or split the room into simpler rectangular and triangular sections, calculate each volume separately, and add them together for a more accurate total." }, { question: "What units does this calculator use?", answer: "Enter length, width, and height in feet, and the result shows both cubic feet and the metric equivalent in cubic meters, so you can use whichever unit your HVAC equipment or specifications reference." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
