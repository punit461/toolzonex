import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/leave-balance-calculator",
    navName: "Leave Balance Calculator",
    navDescription: "Track your remaining leave balance.",
    name: "Leave Balance Calculator",
    description: "Calculate your remaining leave balance from a fixed annual allotment or a monthly accrual rate, minus days used.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EventAvailableIcon fontSize="large" color="primary"/>,
    seoTitle: "Leave Balance Calculator - Track Remaining PTO/Leave",
    seoDescription: "Free leave balance calculator. Track your remaining vacation or PTO balance from a fixed annual allotment or a monthly accrual rate.",
    keywords: ["leave balance calculator", "pto balance calculator", "vacation days calculator", "leave accrual calculator", "remaining leave calculator"],
    ogTitle: "Leave Balance Calculator - Track Remaining PTO/Leave | ToolZoneX",
    ogDescription: "Calculate your remaining leave or PTO balance.",
    schemaName: "Leave Balance Calculator",
    schemaDescription: "Calculate remaining leave balance from a fixed annual allotment or monthly accrual rate, minus days used.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What's the difference between the two modes?", answer: "The fixed allotment mode assumes your full annual leave is available from day one, which fits policies that grant all leave upfront each year. The accrual mode instead builds up leave gradually based on a per-month rate, which fits policies where you earn leave as you work rather than receiving it all at once." }, { question: "Can my remaining balance be negative?", answer: "Yes, if you've used more leave than you've accrued or been allotted so far — this typically happens under accrual policies if leave is taken in advance of it being earned, which some employers allow and others don't." }, { question: "Does this account for carryover from a previous year?", answer: "No — enter your allotment (or accrual total) as the full amount available for the period you're tracking, including any carried-over days, and this calculator will simply subtract what you've used from that total." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
