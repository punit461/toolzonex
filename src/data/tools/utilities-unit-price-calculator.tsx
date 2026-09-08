import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/unit-price-calculator",
    navName: "Unit Price Calculator",
    navDescription: "Compare prices per unit between two products.",
    name: "Unit Price Calculator - Compare Cost Per Unit",
    description: "Calculate price per unit for two products and see which is the better deal, for comparison shopping.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ShoppingCartIcon fontSize="large" color="primary"/>,
    seoTitle: "Unit Price Calculator - Compare Cost Per Unit",
    seoDescription: "Free online unit price calculator. Enter price and quantity for two products to compare cost per unit and find the better deal instantly.",
    keywords: ["unit price calculator", "price per unit calculator", "cost comparison calculator", "price per ounce calculator", "grocery price comparison"],
    ogTitle: "Unit Price Calculator - Compare Cost Per Unit | ToolZoneX",
    ogDescription: "Compare unit price between two products to find the better deal.",
    schemaName: "Unit Price Calculator",
    schemaDescription: "Calculate price per unit for two products and compare which is the better deal.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why do both products need the same unit of measure?", answer: "Unit price is only a fair comparison when both quantities are measured the same way — for example, both in ounces, or both in milliliters. Comparing a product priced per ounce against one priced per gram without converting first would give a misleading result." }, { question: "Does the cheapest unit price always mean the best value?", answer: "Usually, but not always — factors like product quality, whether you'll actually use the larger quantity before it expires, and storage space can matter too. Unit price is a great starting point for comparison, not the only factor in a purchase decision." }, { question: "Can I use this for non-grocery items?", answer: "Yes — unit price comparison works for anything sold by quantity, including cleaning supplies, pet food, office supplies, or items sold by count (like a pack of batteries), using the \"item\" unit option." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
