import PriceChangeIcon from '@mui/icons-material/PriceChange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/sale-price-calculator",
    navName: "Sale Price Calculator",
    navDescription: "Original price from sale price & discount.",
    name: "Sale Price Calculator",
    description: "Calculate a sale price from an original price and discount percentage, or reverse it to find the original price from a known sale price and discount.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PriceChangeIcon fontSize="large" color="primary"/>,
    seoTitle: "Sale Price Calculator - Find Original or Sale Price",
    seoDescription: "Free sale price calculator. Find the sale price from an original price and discount, or reverse it to find the original price from a sale price.",
    keywords: ["sale price calculator", "original price calculator", "reverse discount calculator", "find original price from sale price", "discount calculator"],
    ogTitle: "Sale Price Calculator - Find Original or Sale Price | ToolZoneX",
    ogDescription: "Calculate sale price from an original price and discount, or reverse it to find original price.",
    schemaName: "Sale Price Calculator",
    schemaDescription: "Calculate a sale price from an original price and discount percentage, or find the original price from a sale price and discount.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why isn't the original price just the sale price plus the discount percentage added back?", answer: "Because the discount percentage was applied to the original price, not the sale price. Adding 20% to an $80 sale price gives $96, not the correct $100 original price — you have to divide by (1 − discount %) to reverse the math correctly." }, { question: "How do I stack multiple discounts?", answer: "Apply them sequentially, not by adding percentages — a 10% discount followed by another 10% off is a 19% total discount, not 20%, since the second discount applies to the already-reduced price." }, { question: "What happens if the discount is 100%?", answer: "A 100% discount means the sale price is $0, and reversing from a $0 sale price can't determine a unique original price — the calculator can't solve for the original price when the discount is exactly 100%." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
