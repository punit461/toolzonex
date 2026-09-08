import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/car-loan-calculator",
    navName: "Car Loan Calculator",
    navDescription: "Monthly auto loan payment with tax & trade-in.",
    name: "Car Loan Calculator - Auto Loan Payment Estimator",
    description: "Calculate your monthly car loan payment from vehicle price, down payment, trade-in value, sales tax rate, loan term, and interest rate.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "Car Loan Calculator - Auto Loan Monthly Payment Estimator",
    seoDescription: "Free car loan calculator. Enter vehicle price, down payment, trade-in value, sales tax, and loan term to get your monthly payment and total interest.",
    keywords: ["car loan calculator", "auto loan calculator", "car payment calculator", "vehicle loan calculator", "car financing calculator"],
    ogTitle: "Car Loan Calculator - Auto Loan Monthly Payment Estimator | ToolZoneX",
    ogDescription: "Calculate your monthly car loan payment including sales tax, down payment, and trade-in value.",
    schemaName: "Car Loan Calculator",
    schemaDescription: "Calculate your monthly car loan payment from vehicle price, down payment, trade-in value, sales tax rate, loan term, and interest rate.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the generic EMI Calculator?", answer: "The EMI Calculator only takes a principal, rate, and tenure. This Car Loan Calculator is auto-specific — it also accounts for down payment, trade-in value, and sales tax, all of which change the actual amount you finance versus the vehicle's sticker price." }, { question: "Does trade-in value always reduce sales tax?", answer: "In most US states, yes — sales tax is charged on the price minus the trade-in value. A few states tax the full purchase price regardless of trade-in, so check your local rules for an exact figure." }, { question: "Why is my loan amount higher than the price minus down payment?", answer: "Because sales tax is added into the amount financed unless you pay it separately in cash. If you plan to pay tax and fees out of pocket, set the down payment high enough to cover them." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
