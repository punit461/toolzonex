import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/computer-electricity-cost-calculator",
    navName: "Computer Electricity Cost Calculator",
    navDescription: "PC running cost from idle & load power draw.",
    name: "Computer Electricity Cost Calculator",
    description: "Calculate a desktop or gaming PC's daily and monthly electricity cost from separate idle and load power draw and hours in each state.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricBoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Computer Electricity Cost Calculator - PC Running Cost",
    seoDescription: "Free computer electricity cost calculator. Enter idle and load power draw and hours to find your PC's daily and monthly electricity cost.",
    keywords: ["computer electricity cost calculator", "gaming pc electricity cost calculator", "pc power cost calculator", "how much does it cost to run a pc", "desktop electricity usage calculator"],
    ogTitle: "Computer Electricity Cost Calculator - PC Running Cost | ToolZoneX",
    ogDescription: "Calculate a desktop or gaming PC's electricity running cost.",
    schemaName: "Computer Electricity Cost Calculator",
    schemaDescription: "Calculate a PC's daily and monthly electricity cost from idle and load power draw and hours in each state.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How do I find my PC's idle and load wattage?", answer: "A plug-in power meter (like a Kill A Watt) gives the most accurate real-world reading. Without one, software tools like HWMonitor or your GPU's companion app can estimate component power draw, or you can add up your PSU-rated wattages for components and estimate 20-30% for idle draw versus full rated load for gaming." }, { question: "How is this different from a generic kWh cost calculator?", answer: "A generic appliance calculator assumes one fixed wattage for the whole time it's used, which works fine for something like a space heater. A computer spends most of its time idling at low power and only occasionally draws its peak wattage, so splitting the calculation into idle and load states gives a much more realistic cost estimate." }, { question: "Does this include monitors and peripherals?", answer: "No — this estimates the PC tower itself. Add a monitor's wattage (commonly 20-40W) separately if you want to include it, since monitors typically run whenever the PC is actively in use." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
