import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/battery-backup-calculator",
    navName: "Battery Backup Calculator",
    navDescription: "Estimate battery runtime for your load.",
    name: "Battery Backup Calculator",
    description: "Calculate theoretical and practical battery backup runtime from voltage, capacity, and load power. Shows a capacity bar chart over time.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricBoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Battery Backup Calculator - Runtime Estimator",
    seoDescription: "Free battery backup calculator to estimate runtime. Enter voltage, capacity, and load for theoretical and practical results.",
    keywords: ["battery backup calculator", "battery runtime calculator", "ups runtime calculator", "battery life calculator", "wh calculator"],
    ogTitle: "Battery Backup Calculator - Estimate Runtime | ToolZoneX",
    ogDescription: "Calculate theoretical and practical battery backup runtime from voltage, capacity, and load power.",
    schemaName: "Battery Backup Calculator",
    schemaDescription: "Calculate theoretical and practical battery backup runtime from voltage, capacity, and load power.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
