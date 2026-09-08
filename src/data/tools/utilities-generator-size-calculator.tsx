import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/generator-size-calculator",
    navName: "Generator Size Calculator",
    navDescription: "Size a backup generator for your home.",
    name: "Generator Size Calculator",
    description: "Calculate the recommended size for a fuel-powered backup generator based on appliance running and surge watts, with an adjustable safety margin.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricalServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "Generator Size Calculator - What Size Generator Do I Need",
    seoDescription: "Free generator size calculator. List your appliances' running and surge watts to calculate the recommended size for a backup generator.",
    keywords: ["generator size calculator", "what size generator do i need", "backup generator sizing", "generator wattage calculator", "home generator calculator"],
    ogTitle: "Generator Size Calculator - What Size Generator Do I Need | ToolZoneX",
    ogDescription: "Calculate the recommended size for a fuel-powered backup generator.",
    schemaName: "Generator Size Calculator",
    schemaDescription: "Calculate the recommended size for a fuel-powered backup generator based on appliance running and surge watts, with an adjustable safety margin.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why doesn't this add up every appliance's surge watts?", answer: "In practice, appliances rarely start at the exact same instant, and most generator sizing guidance assumes only one motor-driven appliance is starting up at any given moment while the others are already running steadily. Summing every appliance's peak surge watts together would significantly oversize (and overspend on) the generator." }, { question: "How is this different from sizing a battery inverter?", answer: "A battery inverter or UPS-style backup draws from stored battery energy and is typically sized for a specific, often smaller, set of essential loads with attention to how long the battery will last. A fuel-powered generator burns fuel continuously and is generally sized around surge/running wattage rather than a battery runtime budget — use our separate Inverter Size Calculator if you're sizing a battery-based backup instead." }, { question: "What if I don't know an appliance's surge watts?", answer: "Check the appliance's nameplate or manual — motor-driven appliances (refrigerators, pumps, air conditioners, power tools) usually list a starting or locked-rotor amperage you can convert to watts. As a rough estimate, surge watts are often 2-3x running watts for motor-driven appliances, while non-motor loads like lights and electronics have little to no surge." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
