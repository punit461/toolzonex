import CableIcon from '@mui/icons-material/Cable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/extension-cord-load-calculator",
    navName: "Extension Cord Load Calculator",
    navDescription: "Check voltage drop for a cord length and gauge.",
    name: "Extension Cord Load Calculator",
    description: "Estimate voltage drop for an extension cord based on length, wire gauge, current draw, and supply voltage, with a safe/caution/not-recommended rating.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CableIcon fontSize="large" color="primary"/>,
    seoTitle: "Extension Cord Load Calculator - Voltage Drop Checker",
    seoDescription: "Free extension cord load calculator. Enter cord length, wire gauge, and current draw to estimate voltage drop and check if it's safe.",
    keywords: ["extension cord load calculator", "extension cord voltage drop calculator", "extension cord gauge calculator", "wire gauge voltage drop calculator", "extension cord amp calculator"],
    ogTitle: "Extension Cord Load Calculator - Voltage Drop Checker | ToolZoneX",
    ogDescription: "Estimate voltage drop for an extension cord based on length, wire gauge, and current draw.",
    schemaName: "Extension Cord Load Calculator",
    schemaDescription: "Estimate voltage drop for an extension cord based on length, wire gauge, current draw, and supply voltage, with a safe/caution/not-recommended rating.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this an exact substitute for the cord's rated ampacity?", answer: "No — this is a general voltage-drop estimate using standard published resistance values per gauge. Always check the actual ampacity rating printed on your specific extension cord and follow your local electrical code; a cord's real-world rated capacity depends on its insulation, construction, and intended use (indoor vs. outdoor), not just voltage drop math." }, { question: "Why does cord length matter so much for voltage drop?", answer: "Voltage drop scales directly with the round-trip length of wire the current has to travel through — doubling the cord length roughly doubles the resistance the current encounters, which doubles the voltage drop for the same current and gauge." }, { question: "What happens if the voltage drop is too high?", answer: "Motors and heating elements can run hotter, less efficiently, or fail to start correctly, and the cord itself can heat up more than expected. Switching to a thicker gauge (a lower AWG number) or using a shorter cord reduces resistance and brings the voltage drop back down." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
