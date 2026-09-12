import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/vacation-savings-calculator",
    navName: "Vacation Savings Calculator",
    navDescription: "Monthly savings needed to reach a trip goal.",
    name: "Vacation Savings Calculator",
    description: "Calculate the monthly savings needed to reach a target vacation cost by your trip date, based on current savings and time remaining.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BeachAccessIcon fontSize="large" color="primary"/>,
    seoTitle: "Vacation Savings Calculator - Monthly Savings Needed",
    seoDescription: "Free vacation savings calculator. Enter your target trip cost, months until the trip, and current savings to find how much to save each month.",
    keywords: ["vacation savings calculator", "trip savings calculator", "how much to save for vacation", "vacation fund calculator", "savings goal calculator vacation"],
    ogTitle: "Vacation Savings Calculator - Monthly Savings Needed | ToolZoneX",
    ogDescription: "Calculate the monthly savings needed to reach a target vacation cost.",
    schemaName: "Vacation Savings Calculator",
    schemaDescription: "Calculate monthly savings needed to reach a target vacation cost from months remaining and current savings.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Travel Budget Calculator?", answer: "The Travel Budget Calculator estimates what a trip will cost in total, based on trip length and per-day spending. This calculator instead takes a target cost — however you arrived at it — and works out the monthly savings plan needed to afford it by a given date. Use the Travel Budget Calculator first to estimate your target cost, then use this one to plan how to save for it." }, { question: "What if I can't save the required monthly amount?", answer: "Either push back the trip date to spread the same savings goal over more months, or reduce your target vacation cost by trimming the budget in a category like lodging or activities." }, { question: "Should I account for price increases like inflation or flight costs rising?", answer: "This calculator uses a fixed target cost, so if you expect prices to rise before your trip, it's worth padding your target cost estimate by a small buffer (5-10%) rather than using today's exact prices." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
