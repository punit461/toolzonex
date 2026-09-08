import WhatshotIcon from '@mui/icons-material/Whatshot';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/heater-size-calculator",
    navName: "Heater Size Calculator",
    navDescription: "Recommended heater BTU capacity for a room.",
    name: "Heater Size Calculator",
    description: "Calculate the recommended heater BTU capacity for a room from its size, ceiling height, insulation quality, and climate severity.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <WhatshotIcon fontSize="large" color="primary"/>,
    seoTitle: "Heater Size Calculator - Recommended BTU Capacity",
    seoDescription: "Free heater size calculator. Enter room dimensions, insulation quality, and climate severity to find the recommended heater BTU capacity for your space.",
    keywords: ["heater size calculator", "heater btu calculator", "space heater size calculator", "how many btu heater do i need", "room heater calculator"],
    ogTitle: "Heater Size Calculator - Recommended BTU Capacity | ToolZoneX",
    ogDescription: "Calculate the recommended heater BTU capacity for a room.",
    schemaName: "Heater Size Calculator",
    schemaDescription: "Calculate recommended heater BTU capacity from room size, ceiling height, insulation quality, and climate severity.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the AC BTU Calculator?", answer: "The AC BTU Calculator sizes cooling capacity using sun exposure and occupant count, since heat gain from sunlight and body heat matters most for cooling. This calculator instead sizes heating capacity using insulation quality and climate severity, since heat loss through walls, windows, and outside temperature matters most for heating. They use different inputs because heating and cooling loads are driven by different factors." }, { question: "Why does insulation matter so much for heating?", answer: "Poorly insulated rooms lose heat quickly through walls, windows, and gaps, so a heater has to work harder and longer to maintain temperature. Well-insulated rooms retain heat better, letting a smaller heater keep up." }, { question: "Should I round the result up or down?", answer: "Round up to the nearest common heater size (1,500, 5,000, 10,000, 15,000 BTU, and so on) rather than down — an undersized heater will run constantly without keeping the room comfortable, especially during the coldest stretches of your climate." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
