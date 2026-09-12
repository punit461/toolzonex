import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/bond-price-calculator",
    navName: "Bond Price Calculator",
    navDescription: "Bond price from face value, coupon & yield.",
    name: "Bond Price Calculator",
    description: "Calculate a bond's price from its face value, coupon rate, market discount rate, and years to maturity using the standard discounted cash flow formula.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccountBalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Bond Price Calculator - Bond Valuation Calculator",
    seoDescription: "Free bond price calculator. Enter face value, coupon rate, market rate, and years to maturity to calculate a bond's present value price.",
    keywords: ["bond price calculator", "bond valuation calculator", "bond pricing formula", "bond present value calculator", "bond premium discount calculator"],
    ogTitle: "Bond Price Calculator - Bond Valuation Calculator | ToolZoneX",
    ogDescription: "Calculate a bond's price from face value, coupon rate, market rate, and maturity.",
    schemaName: "Bond Price Calculator",
    schemaDescription: "Calculate a bond's price from face value, coupon rate, market discount rate, and years to maturity.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why do bond prices fall when interest rates rise?", answer: "A bond's coupon payments are fixed once issued. When market rates rise, new bonds offer higher coupons, so existing bonds with lower fixed coupons become less attractive and must trade at a lower price to offer a competitive yield." }, { question: "What does trading at a premium or discount mean?", answer: "A bond trades at a premium when its price is above face value (coupon rate higher than market rate) and at a discount when its price is below face value (coupon rate lower than market rate). At par, the coupon rate equals the market rate exactly." }, { question: "Does this assume annual coupon payments?", answer: "Yes, this calculator assumes one coupon payment per year for simplicity. Many bonds pay semi-annually, which slightly changes the exact price but follows the same discounting principle applied to each smaller, more frequent payment." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
