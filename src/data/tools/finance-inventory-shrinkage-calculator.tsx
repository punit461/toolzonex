import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/inventory-shrinkage-calculator",
    navName: "Inventory Shrinkage Calculator",
    navDescription: "Inventory lost to theft, damage, or error.",
    name: "Inventory Shrinkage Calculator",
    description: "Calculate inventory shrinkage and shrinkage percentage from recorded (book) inventory value and actual (counted) inventory value.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingDownIcon fontSize="large" color="primary"/>,
    seoTitle: "Inventory Shrinkage Calculator - Shrinkage $ & %",
    seoDescription: "Free inventory shrinkage calculator. Enter recorded and actual inventory value to calculate shrinkage amount and shrinkage percentage.",
    keywords: ["inventory shrinkage calculator", "shrinkage percentage calculator", "inventory loss calculator", "retail shrinkage calculator", "how to calculate inventory shrinkage"],
    ogTitle: "Inventory Shrinkage Calculator - Shrinkage $ & % | ToolZoneX",
    ogDescription: "Calculate inventory shrinkage and shrinkage percentage from recorded and actual inventory value.",
    schemaName: "Inventory Shrinkage Calculator",
    schemaDescription: "Calculate inventory shrinkage as recorded value minus actual value, and shrinkage percentage as shrinkage divided by recorded value.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Inventory Turnover Calculator?", answer: "Inventory turnover measures how quickly inventory sells — it's about sales velocity, calculated from cost of goods sold and average inventory value. Shrinkage measures inventory that is simply lost — to theft, damage, or record errors — regardless of how fast the remaining stock sells. They answer completely different questions." }, { question: "How is this different from the Inventory Carrying Cost Calculator?", answer: "Carrying cost estimates what it costs to hold inventory over time — storage, insurance, obsolescence, and opportunity cost on the capital tied up. Shrinkage instead measures inventory that has physically disappeared from stock. Carrying cost is about the cost of keeping inventory; shrinkage is about inventory you no longer have at all." }, { question: "What's a typical shrinkage rate?", answer: "Retail shrinkage rates commonly cited in industry surveys often fall around 1-2% of sales, though this varies significantly by industry, store type, and loss-prevention practices. Use your own historical shrinkage rate as the most relevant benchmark for your business." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
