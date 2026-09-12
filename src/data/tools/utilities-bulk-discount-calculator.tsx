import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/bulk-discount-calculator",
    navName: "Bulk Discount Calculator",
    navDescription: "Tiered, quantity-based wholesale pricing.",
    name: "Bulk Discount Calculator",
    description: "Calculate total price and savings using an editable tiered discount schedule where the discount rate depends on quantity purchased.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <Inventory2Icon fontSize="large" color="primary"/>,
    seoTitle: "Bulk Discount Calculator - Tiered Wholesale Pricing",
    seoDescription: "Free bulk discount calculator. Set up quantity-based discount tiers, enter your unit price and quantity, and see total price and savings.",
    keywords: ["bulk discount calculator", "tiered pricing calculator", "wholesale discount calculator", "quantity discount calculator", "volume discount calculator"],
    ogTitle: "Bulk Discount Calculator - Tiered Wholesale Pricing | ToolZoneX",
    ogDescription: "Calculate total price and savings using a tiered, quantity-based discount schedule.",
    schemaName: "Bulk Discount Calculator",
    schemaDescription: "Calculate total price and savings using an editable tiered discount schedule based on purchase quantity.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Discount Calculator?", answer: "The Discount Calculator applies one flat percentage off a single item's price. This tool is built for quantity-based wholesale pricing, where the discount rate itself changes depending on how many units you buy — you set up multiple tiers, and the calculator automatically applies whichever one your quantity qualifies for." }, { question: "What happens if my quantity doesn't meet any tier's threshold?", answer: "No discount is applied, and you pay the full unit price times quantity — the same as the lowest, no-discount starting point before any tier threshold is reached." }, { question: "Can tiers overlap or apply cumulatively?", answer: "No — this calculator applies only the single best-matching tier (the highest threshold your quantity meets or exceeds), not a stack of every tier you've passed. This matches how most real-world bulk/wholesale pricing schedules work." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
