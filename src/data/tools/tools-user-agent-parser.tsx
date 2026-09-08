import ComputerIcon from '@mui/icons-material/Computer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/user-agent-parser",
    navName: "User Agent Parser",
    navDescription: "Parse browser and device from UA string.",
    name: "User Agent Parser",
    description: "Parse and analyze user agent strings. Identify browser, OS, device, and engine information.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <ComputerIcon fontSize="large" color="primary"/>,
    seoTitle: "User Agent Parser - Analyze Browser Information",
    seoDescription: "Parse and analyze user agent strings to detect browser, OS, device, and engine information. Free online user agent parser tool.",
    keywords: ["user agent parser", "analyze browser", "user agent string", "browser detection", "device information", "OS detection", "user agent analyzer", "browser information"],
    ogTitle: "User Agent Parser - Analyze Browser Information | ToolZoneX",
    ogDescription: "Parse and analyze user agent strings to detect browser, OS, device, and engine information. Free online user agent parser tool.",
    schemaName: "User Agent Parser",
    schemaDescription: "Parse and analyze user agent strings to detect browser, OS, device, and engine information. Free online user agent parser tool.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
