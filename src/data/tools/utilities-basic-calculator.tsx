import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/basic-calculator",
    navName: "Basic Calculator",
    navDescription: "Standard math operations.",
    name: "Basic Calculator",
    description: "A simple, fast, and free online calculator for standard mathematical operations. Perfect for quick everyday math.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Basic Calculator - Free Online Math Calculator",
    seoDescription: "A simple, fast, and free online calculator for standard mathematical operations. Perfect for quick everyday math.",
    keywords: ["online calculator", "basic calculator", "math calculator", "addition subtraction calculator", "basic operations calculator", "simple online calculator", "normal calculator online"],
    ogTitle: "Basic Calculator - Free Online Math Calculator | ToolZoneX",
    ogDescription: "A simple, fast, and free online calculator for standard mathematical operations.",
    schemaName: "Basic Calculator",
    schemaDescription: "A simple, fast, and free online calculator for standard mathematical operations.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this basic calculator have a percentage button?", answer: "This basic calculator covers the four standard operations — addition, subtraction, multiplication, and division — without a dedicated percentage button. For percentage math (discounts, tax, percentage change), use the dedicated Percentage Calculator instead." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
