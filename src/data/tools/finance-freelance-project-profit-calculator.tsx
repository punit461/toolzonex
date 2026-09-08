import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/freelance-project-profit-calculator",
    navName: "Freelance Project Profit Calculator",
    navDescription: "Real profit and effective rate on a fixed fee.",
    name: "Freelance Project Profit Calculator",
    description: "Calculate the real profit and effective hourly rate of a fixed-fee freelance project after accounting for estimated hours and project expenses.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BusinessCenterIcon fontSize="large" color="primary"/>,
    seoTitle: "Freelance Project Profit Calculator - Fixed-Fee Profit",
    seoDescription: "Free freelance project profit calculator. Enter a fixed project fee, estimated hours, and expenses to find your real profit and effective hourly rate.",
    keywords: ["freelance project profit calculator", "fixed fee project calculator", "freelance profit calculator", "project profitability calculator", "effective hourly rate calculator"],
    ogTitle: "Freelance Project Profit Calculator - Fixed-Fee Profit | ToolZoneX",
    ogDescription: "Calculate the real profit and effective hourly rate of a fixed-fee freelance project.",
    schemaName: "Freelance Project Profit Calculator",
    schemaDescription: "Calculate profit as project fee minus expenses, and effective hourly rate as profit divided by estimated hours, for a fixed-fee freelance project.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Freelancer Hourly Rate Calculator?", answer: "The Freelancer Hourly Rate Calculator works backward from a desired annual income to figure out a TARGET rate you should charge going forward. This tool works forward from an ALREADY-QUOTED fixed-fee project to evaluate whether it's actually profitable given your time estimate and expenses — it's a reality check on a specific offer, not a rate-setting tool." }, { question: "What should count as a project expense?", answer: "Include any direct cost tied specifically to completing this project — software or tool subscriptions bought for it, subcontractor or freelancer payments, materials, or specialized services. General overhead like your regular office rent usually isn't included here." }, { question: "What if my effective hourly rate comes out lower than expected?", answer: "That's exactly the value of this check — a fixed fee that seemed attractive can turn into a low effective rate once expenses and a realistic time estimate are factored in, which is useful information before accepting or renegotiating the project." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
