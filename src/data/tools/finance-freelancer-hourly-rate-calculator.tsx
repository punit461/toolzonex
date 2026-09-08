import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/freelancer-hourly-rate-calculator",
    navName: "Freelancer Hourly Rate Calculator",
    navDescription: "Hourly rate needed to hit your income goal.",
    name: "Freelancer Hourly Rate Calculator",
    description: "Calculate the hourly rate to charge based on your desired annual income, billable hours, business expenses, and a non-billable time buffer.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <RequestQuoteIcon fontSize="large" color="primary"/>,
    seoTitle: "Freelancer Hourly Rate Calculator - What to Charge",
    seoDescription: "Free freelancer hourly rate calculator. Enter your income goal, billable hours, expenses, and non-billable buffer to find the rate you should charge.",
    keywords: ["freelancer hourly rate calculator", "what should i charge freelance", "freelance rate calculator", "hourly rate calculator freelance", "consultant rate calculator"],
    ogTitle: "Freelancer Hourly Rate Calculator - What to Charge | ToolZoneX",
    ogDescription: "Calculate the hourly rate to charge based on your income goal, billable hours, and expenses.",
    schemaName: "Freelancer Hourly Rate Calculator",
    schemaDescription: "Calculate the hourly rate to charge based on your desired annual income, billable hours, business expenses, and a non-billable time buffer.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why isn't billable hours the same as total working hours?", answer: "Most freelancers spend a meaningful chunk of their working time on tasks they can't directly bill a client for — finding new clients, sending invoices, bookkeeping, and general admin. The buffer percentage accounts for this so your billable hours still cover your full income goal." }, { question: "Does this include taxes?", answer: "No — this calculates the rate needed to hit your target take-home income after business expenses, but before personal and self-employment taxes. Freelancers typically need to set aside a portion of income separately for taxes; see our Self-Employment Tax Calculator for that estimate." }, { question: "What buffer percentage should I use?", answer: "20% is a common starting point, but it varies by how much non-billable work your business requires. Freelancers who spend a lot of time on marketing or client acquisition may want a higher buffer, while those with steady repeat clients may need less." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
