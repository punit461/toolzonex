import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ups-runtime-calculator",
    navName: "UPS Runtime Calculator",
    navDescription: "Estimated backup runtime from load & capacity.",
    name: "UPS Runtime Calculator",
    description: "Estimate UPS battery backup runtime in minutes from capacity (VA or Wh), connected load, and UPS efficiency.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BatteryChargingFullIcon fontSize="large" color="primary"/>,
    seoTitle: "UPS Runtime Calculator - Estimate Backup Runtime",
    seoDescription: "Free UPS runtime calculator. Enter UPS capacity (VA or Wh), connected load, and efficiency to estimate backup runtime in minutes.",
    keywords: ["ups runtime calculator", "ups battery backup calculator", "ups sizing calculator", "va to watts ups calculator", "ups runtime estimator"],
    ogTitle: "UPS Runtime Calculator - Backup Runtime | ToolZoneX",
    ogDescription: "Estimate UPS battery backup runtime from capacity, load, and efficiency.",
    schemaName: "UPS Runtime Calculator",
    schemaDescription: "Estimate UPS battery backup runtime in minutes from capacity (VA or Wh), connected load, and UPS efficiency.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why does VA capacity need a power factor to estimate watt-hours?", answer: "VA (apparent power) and watts (real power) are only equal when the power factor is 1.0, which is rare for real equipment. Most UPS units and the loads they power have a power factor around 0.6-0.9, so this calculator uses 0.8 as a reasonable estimate — check your UPS's documentation for its exact rated watts if you need a more precise figure." }, { question: "What efficiency should I use for my UPS?", answer: "Standard offline/line-interactive UPS units are commonly rated around 80-90% efficient in normal (non-battery) operation; online double-conversion units can run somewhat lower due to constant AC-DC-AC conversion. Check your unit's spec sheet, or use 80% as a conservative default." }, { question: "Is this runtime estimate exact?", answer: "No — it's a simplified estimate. Real UPS runtime also depends on battery age and health, temperature, and the specific discharge curve of the battery chemistry, all of which can shift actual runtime below a brand-new battery's rated figures." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
