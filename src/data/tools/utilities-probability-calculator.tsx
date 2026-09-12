import CasinoIcon from '@mui/icons-material/Casino';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/probability-calculator",
    navName: "Probability Calculator",
    navDescription: "Single, joint & combined event probability.",
    name: "Probability Calculator - Single & Combined Events",
    description: "Calculate probability for a single event, two independent events both happening, or at least one of two events happening.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CasinoIcon fontSize="large" color="primary"/>,
    seoTitle: "Probability Calculator - Single & Combined Events",
    seoDescription: "Free online probability calculator. Calculate single event probability, joint probability of two events, or probability of at least one event.",
    keywords: ["probability calculator", "probability of two events", "independent events probability", "at least one probability calculator", "odds calculator"],
    ogTitle: "Probability Calculator - Single & Combined Events | ToolZoneX",
    ogDescription: "Calculate probability for single or combined independent events.",
    schemaName: "Probability Calculator",
    schemaDescription: "Calculate probability for a single event, two independent events, or at least one of two events.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does \"independent events\" mean?", answer: "Two events are independent if the outcome of one has no effect on the outcome of the other, like flipping a coin twice or rolling two separate dice. The multiplication and \"at least one\" formulas here only apply to independent events — dependent events require conditional probability instead." }, { question: "Why isn't P(A or B) just P(A) + P(B)?", answer: "Simply adding the probabilities would double-count the case where both events happen. The formula 1 − (1 − P(A))(1 − P(B)) correctly accounts for this by first finding the probability that neither event happens, then subtracting that from 1." }, { question: "Can probability be greater than 1 or less than 0?", answer: "No — probability is always between 0 (impossible) and 1 (certain), inclusive. This calculator expects inputs within that valid range for the compound event modes." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
