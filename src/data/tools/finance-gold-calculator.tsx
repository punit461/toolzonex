import DiamondIcon from '@mui/icons-material/Diamond';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/gold-calculator",
    navName: "Gold Rate Calculator",
    navDescription: "Gold price by weight, currency & region tax (GST/VAT/sales tax).",
    name: "Gold Rate Calculator",
    description: "Calculate the final price of gold in any weight unit and currency, with region-based tax.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <DiamondIcon fontSize="large" color="primary"/>,
    seoTitle: "Gold Rate Calculator - Gold Price with Making Charges & GST",
    seoDescription: "Free gold rate calculator to calculate gold jewellery price including making charges and GST in India. Calculate gold price per gram for 24K, 22K, and 18K gold.",
    keywords: ["gold rate calculator", "gold price", "gold making charges", "24K gold", "22K gold", "18K gold", "gold jewelry price", "gold GST", "gold jewellery calculator india", "gold calculator with gst", "calculate gold rate per gram", "how to calculate gold price by weight", "how to calculate gold price in grams", "gold making charge calculator", "gold sell price calculator", "gold cost per gram calculator", "how to calculate 18kt gold price", "how to calculate the gold price per gram", "how to calculate price of gold per gram"],
    ogTitle: "Gold Rate Calculator - Gold Price with Making Charges & GST | ToolZoneX",
    ogDescription: "Calculate gold price including making charges and GST.",
    schemaName: "Gold Rate Calculator",
    schemaDescription: "Calculate gold price with making charges and GST.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "How do making charges work on gold jewellery in India?", answer: "Making charges are what the jeweller charges for turning raw gold into a finished piece of jewellery, usually quoted as a percentage of the gold value (commonly 5-20% depending on the design's complexity) or occasionally as a flat rate per gram. Enter your jeweller's quoted making charge percentage in the calculator to see it added on top of the gold value." }, { question: "How does GST apply to gold jewellery purchases?", answer: "In India, 3% GST is charged on the total of the gold value plus making charges, not on the gold value alone — that's the default when you select the India region above, though you can edit the percentage if your invoice differs." }, { question: "What's the difference between 18K, 22K, and 24K gold pricing?", answer: "Karat measures gold purity: 24K is 99.9% pure gold, 22K is about 91.6% pure, and 18K is about 75% pure. Since purity drives price, each karat trades at a different rate per gram — this calculator doesn't look up karat-specific rates for you, so enter the per-gram (or per-10-gram) rate your jeweller quotes for the specific karat you're buying." }, { question: "Does the buy price differ from the sell-back price for gold?", answer: "Yes. When buying, you pay the gold value plus making charges plus GST. When selling gold jewellery back, most jewellers only pay for the gold's weight and purity — making charges and GST are typically not refunded, and some deduct a further amount for wastage or old-jewellery testing. To estimate a sell price, set making charges and tax to 0 and enter the buyback rate your jeweller quotes." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
