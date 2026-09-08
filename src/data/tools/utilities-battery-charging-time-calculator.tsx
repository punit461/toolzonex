import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/battery-charging-time-calculator",
    navName: "Battery Charging Time Calculator",
    navDescription: "Estimate time to fully charge a battery.",
    name: "Battery Charging Time Calculator - Estimate Full Charge Time",
    description: "Estimate battery charging time from capacity, charger output, current charge percentage, and charger efficiency.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BatteryChargingFullIcon fontSize="large" color="primary"/>,
    seoTitle: "Battery Charging Time Calculator - Estimate Full Charge Time",
    seoDescription: "Free online battery charging time calculator. Enter capacity, charger output, current charge %, and efficiency to estimate time to full charge.",
    keywords: ["battery charging time calculator", "phone charging time calculator", "how long to charge battery", "charge time estimator", "mah charging time"],
    ogTitle: "Battery Charging Time Calculator - Estimate Full Charge Time | ToolZoneX",
    ogDescription: "Estimate how long your battery will take to fully charge.",
    schemaName: "Battery Charging Time Calculator",
    schemaDescription: "Estimate battery charging time from capacity, charger output, current charge percentage, and efficiency.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why isn't charging 100% efficient?", answer: "Some energy is always lost as heat during charging, in the charger's power conversion circuitry and the battery's internal chemistry. A default of 85% efficiency is a reasonable general estimate for many consumer lithium-ion devices, though actual efficiency varies by charger and battery quality." }, { question: "How do I convert mAh to Wh?", answer: "Watt-hours equal milliamp-hours divided by 1,000, multiplied by the battery's nominal voltage (Wh = mAh ÷ 1000 × V). This calculator does that conversion automatically when you select mAh as your capacity unit and provide the battery's voltage." }, { question: "Why does real-world charging often take longer than this estimate?", answer: "Many devices use a tapering charge curve that slows down significantly above about 80-90% to protect battery health, so the last portion of a charge often takes proportionally longer than this calculator's constant-power estimate suggests." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
