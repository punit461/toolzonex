import PersonAddIcon from '@mui/icons-material/PersonAdd';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/cost-per-lead-calculator",
    navName: "Cost Per Lead Calculator",
    navDescription: "CPL overall and broken down by channel.",
    name: "Cost Per Lead Calculator",
    description: "Calculate cost per lead (CPL) from total marketing spend and leads generated, with an optional breakdown by marketing channel.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PersonAddIcon fontSize="large" color="primary"/>,
    seoTitle: "Cost Per Lead Calculator - CPL by Channel",
    seoDescription: "Free cost per lead calculator. Enter total spend and leads generated to calculate CPL, with an optional breakdown by marketing channel.",
    keywords: ["cost per lead calculator", "cpl calculator", "lead generation cost calculator", "marketing cost per lead", "cost per lead by channel"],
    ogTitle: "Cost Per Lead Calculator - CPL by Channel | ToolZoneX",
    ogDescription: "Calculate cost per lead (CPL) from marketing spend and leads generated, with a per-channel breakdown.",
    schemaName: "Cost Per Lead Calculator",
    schemaDescription: "Calculate cost per lead (CPL) from total marketing spend and leads generated, with an optional breakdown by marketing channel.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Where does CPL fit in the marketing funnel?", answer: "Marketing spend first generates leads (measured by CPL), and those leads then convert into paying customers (measured by conversion rate and customer acquisition cost). A low CPL is only good news if those leads actually convert — a channel generating cheap but low-quality leads can end up costing more per customer than a channel with a higher CPL but better lead quality." }, { question: "How is CPL different from CPC?", answer: "Cost per click (CPC) measures spend per ad click, regardless of whether that click converts into a lead. Cost per lead measures spend per actual lead (like a form submission or sign-up) — a more meaningful metric since not every click results in a lead." }, { question: "What counts as a \"lead\"?", answer: "It depends on your business — a lead could be a form submission, a phone call, a newsletter sign-up, or a sales inquiry. Define it consistently across channels so your CPL comparisons are measuring the same thing everywhere." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
