import ScheduleIcon from '@mui/icons-material/Schedule';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/shift-differential-pay-calculator",
    navName: "Shift Differential Pay Calculator",
    navDescription: "Pay with a % or flat shift premium.",
    name: "Shift Differential Pay Calculator",
    description: "Calculate shift differential pay using either a percentage add-on or a flat dollar add-on applied to a base hourly rate.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ScheduleIcon fontSize="large" color="primary"/>,
    seoTitle: "Shift Differential Pay Calculator - Percentage or Flat",
    seoDescription: "Free shift differential pay calculator. Enter base rate, hours, and a percentage or flat dollar differential to calculate total shift pay.",
    keywords: ["shift differential pay calculator", "shift differential calculator", "night shift differential calculator", "weekend differential pay calculator", "shift premium calculator"],
    ogTitle: "Shift Differential Pay Calculator - Percentage or Flat | ToolZoneX",
    ogDescription: "Calculate shift differential pay using a percentage or flat dollar add-on.",
    schemaName: "Shift Differential Pay Calculator",
    schemaDescription: "Calculate total shift pay from a base hourly rate, hours worked, and a percentage or flat dollar shift differential.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What's a typical shift differential percentage?", answer: "Common ranges are around 5-10% for evening shifts and 10-20% for night, weekend, or holiday shifts, though this varies widely by employer, industry, and union agreements. Check your employer's specific policy." }, { question: "Should I use a percentage or a flat dollar differential?", answer: "Either is valid — percentage differentials scale automatically with base pay raises, while flat dollar differentials stay fixed regardless of base rate. Use whichever structure matches your employer's actual pay policy." }, { question: "Does this account for overtime rules on top of the differential?", answer: "No — this calculates straight differential pay for the hours entered only. If differential hours also qualify as overtime, calculate the overtime premium separately using the Overtime Pay Calculator." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
