import LoyaltyIcon from '@mui/icons-material/Loyalty';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/coupon-savings-calculator",
    navName: "Coupon Savings Calculator",
    navDescription: "Stack multiple coupons applied in sequence.",
    name: "Coupon Savings Calculator",
    description: "Calculate the final price and total savings when stacking multiple percentage and fixed-dollar coupons applied one after another.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LoyaltyIcon fontSize="large" color="primary"/>,
    seoTitle: "Coupon Savings Calculator - Stack Multiple Coupons",
    seoDescription: "Free coupon savings calculator. Stack multiple percentage and fixed-dollar coupons applied in sequence to find your final price and total savings.",
    keywords: ["coupon savings calculator", "stack coupons calculator", "coupon stacking calculator", "multiple coupon calculator", "coupon discount calculator"],
    ogTitle: "Coupon Savings Calculator - Stack Multiple Coupons | ToolZoneX",
    ogDescription: "Calculate final price and total savings when stacking multiple coupons in sequence.",
    schemaName: "Coupon Savings Calculator",
    schemaDescription: "Calculate final price and total savings from multiple percentage and fixed-dollar coupons applied sequentially to a price.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Discount Calculator?", answer: "The Discount Calculator applies a single flat percentage discount to a price. This tool supports stacking multiple coupons of mixed types (percentage and fixed-dollar) applied one after another in sequence, matching how real-world coupon stacking actually works at checkout." }, { question: "Does the order coupons are applied in matter?", answer: "Yes, for percentage-off coupons — since each percentage is calculated on the current running price, applying a percentage coupon earlier (against a higher price) yields a larger dollar discount than applying the same percentage later (against an already-reduced price). Fixed-dollar coupons subtract the same amount regardless of order." }, { question: "Can a coupon ever bring the price below zero?", answer: "No — a fixed-dollar coupon larger than the current running price is capped at reducing the price to $0 rather than going negative, matching how retailers typically handle over-sized fixed coupons." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
