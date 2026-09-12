import LightbulbIcon from '@mui/icons-material/Lightbulb';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/room-lighting-calculator",
    navName: "Room Lighting Calculator",
    navDescription: "Calculate lumens and fixtures needed.",
    name: "Room Lighting Calculator",
    description: "Calculate the total lumens needed and the recommended number of light fixtures for a room based on its size and desired brightness.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LightbulbIcon fontSize="large" color="primary"/>,
    seoTitle: "Room Lighting Calculator - Calculate Lumens & Fixtures Needed",
    seoDescription: "Free room lighting calculator. Enter your room size and desired brightness to calculate total lumens needed and recommended number of fixtures.",
    keywords: ["room lighting calculator", "lumens calculator", "how many lumens per room", "light fixture calculator", "foot candle calculator"],
    ogTitle: "Room Lighting Calculator - Calculate Lumens & Fixtures Needed | ToolZoneX",
    ogDescription: "Calculate total lumens needed and recommended fixtures for any room.",
    schemaName: "Room Lighting Calculator",
    schemaDescription: "Calculate the total lumens needed and the recommended number of light fixtures for a room based on its size and desired brightness.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What foot-candle level should I use?", answer: "It depends on the room's purpose — relaxing spaces like living rooms and bedrooms typically use 10-20 foot-candles, task-heavy spaces like kitchens and bathrooms use 30-40, and focused work areas like home offices often use 50 or more. The room type presets above set a reasonable starting point, which you can always adjust." }, { question: "Should I count lumens or watts when shopping for bulbs?", answer: "Lumens measure actual brightness output, while watts measure energy consumption — modern LED bulbs produce far more lumens per watt than older incandescent bulbs. Always check the lumens figure on the packaging rather than assuming a wattage equivalent." }, { question: "Does this account for natural light or room color?", answer: "No — this gives a baseline lumen target based on room size and desired brightness alone. Rooms with significant natural daylight or light-colored walls and ceilings that reflect more light may need slightly less artificial lighting than the calculated figure suggests." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
