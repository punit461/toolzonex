import ShowChartIcon from '@mui/icons-material/ShowChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/bond-yield-calculator",
    navName: "Bond Yield Calculator",
    navDescription: "Current yield and approximate YTM.",
    name: "Bond Yield Calculator",
    description: "Calculate a bond's current yield and an approximate yield to maturity from its face value, coupon rate, current price, and years to maturity.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ShowChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Bond Yield Calculator - Current Yield & Approx. YTM",
    seoDescription: "Free bond yield calculator. Enter face value, coupon rate, current price, and years to maturity to get current yield and approximate yield to maturity.",
    keywords: ["bond yield calculator", "current yield calculator", "yield to maturity calculator", "bond ytm calculator", "bond coupon yield"],
    ogTitle: "Bond Yield Calculator - Current Yield & Approx. YTM | ToolZoneX",
    ogDescription: "Calculate a bond's current yield and approximate yield to maturity.",
    schemaName: "Bond Yield Calculator",
    schemaDescription: "Calculate a bond's current yield and an approximate yield to maturity.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why is current yield different from the coupon rate?", answer: "The coupon rate is fixed against the bond's face value, but current yield is based on the price you actually pay. If a bond trades below face value, its current yield is higher than the coupon rate, and vice versa for a bond trading above face value." }, { question: "Is the YTM approximation exact?", answer: "No — it's a widely used simplified formula. The precise YTM requires solving for the discount rate that equates the bond's price to the present value of all future cash flows, which normally needs iterative calculation or financial software." }, { question: "What does it mean if a bond trades at a discount?", answer: "A bond trading below its face value (a discount) will return the face value at maturity, adding a capital gain on top of coupon payments — which is why its YTM is higher than its current yield." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
