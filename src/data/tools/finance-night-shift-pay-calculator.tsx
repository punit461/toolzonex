import NightlightIcon from '@mui/icons-material/Nightlight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/night-shift-pay-calculator",
    navName: "Night Shift Pay Calculator",
    navDescription: "Pay for actual overlap with night hours.",
    name: "Night Shift Pay Calculator",
    description: "Calculate night shift pay based on the actual time overlap between a shift's start/end time and a defined night-hours window, handling shifts that cross midnight.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <NightlightIcon fontSize="large" color="primary"/>,
    seoTitle: "Night Shift Pay Calculator - Night Hours Overlap",
    seoDescription: "Free night shift pay calculator. Enter shift start/end times, a night differential, and a night-hours window to calculate pay for the actual overlapping hours.",
    keywords: ["night shift pay calculator", "night shift differential calculator", "night hours pay calculator", "overnight shift pay calculator", "night premium calculator"],
    ogTitle: "Night Shift Pay Calculator - Night Hours Overlap | ToolZoneX",
    ogDescription: "Calculate night shift pay based on the actual overlap between shift hours and a night-hours window.",
    schemaName: "Night Shift Pay Calculator",
    schemaDescription: "Calculate total shift pay by computing the actual time overlap between a shift's start/end time and a defined night-hours window, applying a differential to overlapping hours.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Shift Differential Pay Calculator?", answer: "The Shift Differential Pay Calculator applies one flat differential to ALL hours in a shift you've already labeled as a \"differential shift\" — it doesn't look at actual clock times. This tool instead calculates the ACTUAL time overlap between a specific shift's start/end time and a defined night-hours window, so a shift that only partially overlaps night hours gets premium pay for just the overlapping portion, not the entire shift." }, { question: "What if my shift and the night window are exactly the same hours?", answer: "Then the entire shift falls within the night window, and every hour earns the night differential — the calculator correctly detects full overlap in this case." }, { question: "Can the night window itself cross midnight?", answer: "Yes — enter a start time later than the end time (like 22:00 to 06:00) and the calculator correctly treats it as spanning past midnight, the same way it handles a shift that crosses midnight." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
