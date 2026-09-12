import PaymentsIcon from '@mui/icons-material/Payments';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/monthly-salary-calculator",
    navName: "Monthly Salary Calculator",
    navDescription: "Convert annual salary to monthly, weekly, daily & hourly.",
    name: "Monthly Salary Calculator",
    description: "Convert annual salary to monthly, biweekly, weekly, daily, and hourly pay. Supports hourly-to-annual conversion and optional tax deductions.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PaymentsIcon fontSize="large" color="primary"/>,
    seoTitle: "Monthly Salary Calculator - Annual to Monthly Pay",
    seoDescription: "Free monthly salary calculator. Convert annual salary to monthly, biweekly, weekly, daily, and hourly pay with optional tax deductions.",
    keywords: ["monthly salary calculator", "annual to monthly salary", "salary converter", "pay calculator", "hourly to annual salary"],
    ogTitle: "Monthly Salary Calculator - Annual to Monthly Pay | ToolZoneX",
    ogDescription: "Convert annual salary to monthly, biweekly, weekly, daily, and hourly pay.",
    schemaName: "Monthly Salary Calculator",
    schemaDescription: "Convert annual salary to monthly, biweekly, weekly, daily, and hourly pay.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between RPM and CPM?", answer: "RPM is your actual revenue per 1,000 views (after YouTube's cut). CPM is what advertisers pay per 1,000 ad impressions. RPM directly reflects what you earn." }, { question: "Why does YouTube take a 45% cut?", answer: "YouTube keeps roughly 45% of ad revenue for infrastructure and operating costs, leaving about 55% for the creator. Not every view is monetized, which is why RPM is lower than CPM." }, { question: "Is this a guaranteed amount?", answer: "No — this is an estimate. Actual earnings depend on your audience, ad fill rate, geography, video length, and niche." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
