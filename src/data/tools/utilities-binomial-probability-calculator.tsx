import FunctionsIcon from '@mui/icons-material/Functions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/binomial-probability-calculator",
    navName: "Binomial Probability Calculator",
    navDescription: "Probability of k successes in n trials.",
    name: "Binomial Probability Calculator",
    description: "Calculate the exact and cumulative probability of a given number of successes across a fixed number of independent trials.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FunctionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Binomial Probability Calculator - Exact & Cumulative",
    seoDescription: "Free binomial probability calculator. Enter trials, successes, and probability per trial to calculate exact and cumulative probability.",
    keywords: ["binomial probability calculator", "binomial distribution calculator", "probability of k successes calculator", "binomial formula calculator", "cumulative binomial probability"],
    ogTitle: "Binomial Probability Calculator - Exact & Cumulative | ToolZoneX",
    ogDescription: "Calculate exact and cumulative binomial probability across a fixed number of independent trials.",
    schemaName: "Binomial Probability Calculator",
    schemaDescription: "Calculate the exact and cumulative probability of a given number of successes across a fixed number of independent trials.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the generic Probability Calculator?", answer: "The generic Probability Calculator handles single events and combinations of two independent events (both happening, or at least one happening). This calculator is specifically for the binomial distribution — repeating the same trial many times and asking about the count of successes across all those repeated trials." }, { question: "Why is n capped at 100?", answer: "Very large trial counts can push factorial-based combination math into floating-point overflow or precision loss. This calculator uses a numerically stable iterative method for C(n,k) rather than computing raw factorials, and the cap keeps results both fast and reliable." }, { question: "What's the difference between P(X = k) and P(X ≤ k)?", answer: "P(X = k), the exact probability, is the chance of getting precisely k successes. P(X ≤ k), the cumulative probability, is the chance of getting k successes or fewer — it's the sum of the exact probabilities for every outcome from 0 up to k." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
