import LaptopIcon from '@mui/icons-material/Laptop';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/laptop-battery-life-calculator",
    navName: "Laptop Battery Life Calculator",
    navDescription: "Estimated runtime from capacity & power draw.",
    name: "Laptop Battery Life Calculator",
    description: "Estimate laptop battery runtime from battery capacity (Wh or mAh + voltage) and an average power draw preset.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LaptopIcon fontSize="large" color="primary"/>,
    seoTitle: "Laptop Battery Life Calculator - Estimated Runtime",
    seoDescription: "Free laptop battery life calculator. Enter battery capacity and usage level to estimate how many hours your laptop will run.",
    keywords: ["laptop battery life calculator", "laptop battery runtime calculator", "how long will my laptop battery last", "battery life estimator laptop", "laptop battery hours calculator"],
    ogTitle: "Laptop Battery Life Calculator - Estimated Runtime | ToolZoneX",
    ogDescription: "Estimate laptop battery runtime from capacity and power draw.",
    schemaName: "Laptop Battery Life Calculator",
    schemaDescription: "Estimate laptop battery runtime in hours from battery capacity and average power draw.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Where do I find my laptop's battery capacity?", answer: "Check the battery's label (often on the underside if removable), the manufacturer's spec sheet, or your operating system's battery report tool, which frequently lists both design capacity and current capacity in Wh or mWh." }, { question: "Why does actual battery life vary so much from the marketed number?", answer: "Manufacturer estimates are usually measured under light, best-case conditions like video playback at low brightness. Real-world power draw jumps with screen brightness, active apps, background tasks, and especially gaming or video editing, which is why choosing a realistic preset here matters." }, { question: "Does battery age affect this estimate?", answer: "Yes — batteries lose capacity over charge cycles and time. If your laptop is a couple of years old, check your OS's current (not design) capacity for a more accurate Wh figure, since a worn battery will run for less time than its original rated capacity suggests." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
