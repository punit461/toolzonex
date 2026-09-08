import ReceiptIcon from '@mui/icons-material/Receipt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/electricity-bill-calculator",
    navName: "Electricity Bill Calculator",
    navDescription: "Estimate your monthly bill from readings.",
    name: "Electricity Bill Calculator",
    description: "Estimate your monthly electricity bill from meter readings or units consumed. Free online electricity bill calculator with fixed charges.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ReceiptIcon fontSize="large" color="primary"/>,
    seoTitle: "Electricity Bill Calculator - Estimate From Meter Readings",
    seoDescription: "Free online electricity bill calculator. Enter previous and current meter readings or units consumed to estimate your energy charge, fixed charges, and total bill.",
    keywords: ["electricity bill calculator", "electric bill estimator", "meter reading calculator", "kwh bill calculator", "calculate electricity bill", "bihar electricity bill", "bses calculator"],
    ogTitle: "Electricity Bill Calculator - Estimate Your Bill | ToolZoneX",
    ogDescription: "Estimate your monthly electricity bill from meter readings and per-unit tariffs.",
    schemaName: "Electricity Bill Calculator",
    schemaDescription: "Estimate a monthly electricity bill from meter readings or units consumed.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is the bill calculated?", answer: "Units consumed = current reading − previous reading. The energy charge is units × per-unit rate, and a fixed monthly charge is added on top. Some utilities also add a fuel adjustment or power factor surcharge." }, { question: "Do slabs change the rate?", answer: "Many states use increasing slab rates — the first few hundred units cost less per unit than higher slabs. If your utility uses slabs, enter your slab rate or use an average per-unit rate from a recent bill." }, { question: "Which reading should I use?", answer: "Use the meter reading taken on the same day of month. The previous reading is the one from your last bill; the current reading is what the meter shows today." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
