import TableChartIcon from '@mui/icons-material/TableChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/hourly-billing-calculator",
    navName: "Hourly Billing Calculator",
    navDescription: "Multiple billable tasks at varying rates.",
    name: "Hourly Billing Calculator",
    description: "Tally multiple billable tasks with individually varying hourly rates into a grand total for a billing period, with no tax or discount handling.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TableChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Hourly Billing Calculator - Multiple Tasks & Rates",
    seoDescription: "Free hourly billing calculator. List billable tasks with hours and hourly rates (which can differ per task) to get a grand total for the billing period.",
    keywords: ["hourly billing calculator", "billable hours calculator", "freelance billing calculator", "multiple rate billing calculator", "contractor billing calculator"],
    ogTitle: "Hourly Billing Calculator - Multiple Tasks & Rates | ToolZoneX",
    ogDescription: "Tally multiple billable tasks with individually varying hourly rates into a grand total.",
    schemaName: "Hourly Billing Calculator",
    schemaDescription: "Calculate a grand total from a list of billable tasks, each with its own hours and hourly rate, for a single billing period.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Hourly to Salary Calculator?", answer: "The Hourly to Salary Calculator converts a single wage into projected weekly, monthly, and annual salary figures — a totally different purpose focused on income projection, not billing. This tool tallies actual billable tasks with individually varying rates for a specific billing period." }, { question: "How is this different from the Invoice Total Calculator?", answer: "The Invoice Total Calculator handles quantity × unit price line items with tax and discount machinery for a single invoice document. This tool is specifically for freelancers or contractors tallying multiple billable TASKS by hours × rate, with no tax or discount handling — it's the underlying hours-based billing math, not full invoice formatting." }, { question: "Can different tasks use completely different rates?", answer: "Yes — every row has its own independent rate field, so you can mix a lower rate for administrative tasks with a higher rate for specialized work, or bill different clients' work at their respective rates within the same list." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
