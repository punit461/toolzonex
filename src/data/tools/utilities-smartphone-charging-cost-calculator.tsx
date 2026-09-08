import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/smartphone-charging-cost-calculator",
    navName: "Smartphone Charging Cost Calculator",
    navDescription: "Cost to charge a phone from battery capacity.",
    name: "Smartphone Charging Cost Calculator",
    description: "Estimate weekly, monthly, and annual smartphone charging cost from battery capacity, voltage, charger efficiency, charges per week, and electricity rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BatteryChargingFullIcon fontSize="large" color="primary"/>,
    seoTitle: "Smartphone Charging Cost Calculator - Weekly, Monthly & Annual",
    seoDescription: "Free smartphone charging cost calculator. Enter battery capacity, charger efficiency, charges per week, and electricity rate to estimate charging cost.",
    keywords: ["smartphone charging cost calculator", "how much does it cost to charge a phone", "phone charging cost calculator", "phone battery electricity cost", "cost to charge iphone"],
    ogTitle: "Smartphone Charging Cost Calculator - Weekly, Monthly & Annual | ToolZoneX",
    ogDescription: "Estimate smartphone charging cost from battery capacity, charger efficiency, and electricity rate.",
    schemaName: "Smartphone Charging Cost Calculator",
    schemaDescription: "Estimate smartphone charging cost by converting battery mAh and voltage to watt-hours, adjusting for charger efficiency, and multiplying by electricity rate and charges per week.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is charging a phone really this cheap?", answer: "Yes — because phone batteries hold a tiny amount of energy compared to almost any other household device, the annual cost to charge one is typically well under $1-2 a year at average electricity rates, even with daily charging. It's one of the smallest line items in a home electricity bill by far." }, { question: "Why include charger efficiency at all if the cost is so small?", answer: "It's included for accuracy — no charger is 100% efficient, and some energy is always lost as heat during AC-to-DC conversion. Even though the dollar impact is negligible for a phone, the same charging-efficiency concept matters more for larger devices like laptops or EVs." }, { question: "Where do I find my phone's exact battery capacity and voltage?", answer: "Check your phone manufacturer's official spec sheet, which typically lists battery capacity in mAh and sometimes voltage; if voltage isn't listed, 3.85V is a safe typical assumption for most modern smartphones." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
