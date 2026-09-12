import BalanceIcon from '@mui/icons-material/Balance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/decision-list-generator",
    navName: "Decision List Generator",
    navDescription: "Weigh pros and cons to see which side wins.",
    name: "Decision List Generator - Weighted Pros and Cons",
    description: "List weighted pros and cons for a decision (importance 1-5 each) and see the total weighted score for each side and which one wins.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Decision List Generator - Weighted Pros and Cons",
    seoDescription: "Free online decision list generator. Weigh your pros and cons by importance (1-5) and see the weighted score for each side to help you decide.",
    keywords: ["decision list generator", "weighted pros and cons list", "decision matrix generator", "pros and cons calculator", "decision making tool online"],
    ogTitle: "Decision List Generator - Weighted Pros and Cons | ToolZoneX",
    ogDescription: "Weigh your pros and cons by importance and see which side wins with a weighted score.",
    schemaName: "Decision List Generator",
    schemaDescription: "List weighted pros and cons for a decision and see the total weighted score for each side and which one wins.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How should I choose a weight for each reason?", answer: "Use 5 for reasons that would almost single-handedly decide the outcome, and 1 for minor factors that barely tip the scale — the exact numbers matter less than being consistent between your pros and cons." }, { question: "What happens with a Tie?", answer: "A tie means your weighted pros and cons are exactly balanced, which usually signals that the decision comes down to a factor you haven't weighted yet, or that either choice is reasonably fine." }, { question: "Can I add more than two pros or cons?", answer: "Yes — use the Add Pro or Add Con button as many times as you need; there's no limit on how many weighted reasons you can list on either side." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
