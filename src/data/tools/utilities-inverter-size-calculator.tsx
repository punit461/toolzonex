import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/inverter-size-calculator",
    navName: "Inverter Size Calculator",
    navDescription: "Size an inverter from your appliance load.",
    name: "Inverter Size Calculator - Recommended Inverter Wattage",
    description: "Calculate total appliance load and recommended inverter size, including a safety margin for startup surge.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BatteryChargingFullIcon fontSize="large" color="primary"/>,
    seoTitle: "Inverter Size Calculator - Recommended Inverter Wattage",
    seoDescription: "Free inverter size calculator. Add your appliances and wattages plus a safety margin to find the recommended inverter size in watts/VA.",
    keywords: ["inverter size calculator", "what size inverter do i need", "solar inverter sizing calculator", "inverter wattage calculator", "home inverter calculator"],
    ogTitle: "Inverter Size Calculator | ToolZoneX",
    ogDescription: "Find the recommended inverter size for your appliance load.",
    schemaName: "Inverter Size Calculator",
    schemaDescription: "Calculate total appliance load and recommended inverter size, including a safety margin for startup surge.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why add a safety margin on top of the running wattage?", answer: "Motors and compressors (like those in refrigerators, pumps, and air conditioners) draw a surge of current well above their steady running wattage when they first start up. The safety margin buffers for that startup surge plus normal inverter efficiency losses, so the inverter doesn't get overwhelmed the moment a motor-driven appliance kicks on." }, { question: "What's the difference between watts and VA?", answer: "For purely resistive loads (like incandescent lights or heaters), watts and volt-amps (VA) are roughly equal. Inductive loads with motors have a power factor below 1, meaning their VA requirement is higher than their wattage — treat the wattage total here as a starting point and lean toward a larger margin for motor-heavy loads." }, { question: "Should I add up every appliance in the house?", answer: "No — only include appliances you realistically expect to run at the same time. Very few households run every appliance simultaneously, so sizing for your actual expected simultaneous load (not the sum of everything you own) gives a more realistic and cost-effective inverter size." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
