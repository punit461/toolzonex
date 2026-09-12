import TimerIcon from '@mui/icons-material/Timer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/double-time-pay-calculator",
    navName: "Double Time Pay Calculator",
    navDescription: "Tiered daily overtime: 1x, 1.5x, 2x.",
    name: "Double Time Pay Calculator",
    description: "Calculate daily tiered overtime pay — regular rate up to 8 hours, 1.5x from 8-12 hours, and 2x double time beyond 12 hours — from total hours worked in a day.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TimerIcon fontSize="large" color="primary"/>,
    seoTitle: "Double Time Pay Calculator - Tiered Daily Overtime",
    seoDescription: "Free double time pay calculator. Enter hourly rate and total daily hours to calculate tiered pay across regular, 1.5x, and 2x double-time thresholds.",
    keywords: ["double time pay calculator", "california overtime calculator", "double time calculator", "daily overtime calculator", "tiered overtime pay calculator"],
    ogTitle: "Double Time Pay Calculator - Tiered Daily Overtime | ToolZoneX",
    ogDescription: "Calculate tiered daily overtime pay across regular, 1.5x, and double-time thresholds.",
    schemaName: "Double Time Pay Calculator",
    schemaDescription: "Calculate daily tiered pay by splitting total hours worked into regular (0-8 hrs), 1.5x overtime (8-12 hrs), and 2x double-time (12+ hrs) tiers.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Overtime Pay Calculator?", answer: "The Overtime Pay Calculator applies ONE flat, user-chosen overtime multiplier uniformly to all overtime hours you enter — you decide the split and the multiplier yourself. This tool instead implements the specific TIERED daily-threshold structure (regular → 1.5× → 2×) used in double-time jurisdictions, automatically calculating each tier from the total hours worked in a single day rather than requiring you to split them manually." }, { question: "Does every state use this 8/12-hour tiered structure?", answer: "No — this structure mirrors California's daily overtime law specifically. Most other US states only require overtime after 40 hours in a week, with no separate daily double-time tier. Check your local labor law to confirm which structure applies to you." }, { question: "Does this calculator also apply weekly overtime rules?", answer: "No — this calculates tiers based only on the single day's total hours entered. Weekly overtime thresholds (like the federal 40-hour rule) would need to be checked separately across your full week." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
