import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/permutation-calculator",
    navName: "Permutation Calculator",
    navDescription: "Calculate nPr permutations step by step.",
    name: "Permutation Calculator - Calculate nPr",
    description: "Calculate the number of permutations (nPr) of r items chosen from n items, with a step-by-step factorial breakdown.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FormatListNumberedRtlIcon fontSize="large" color="primary"/>,
    seoTitle: "Permutation Calculator - Calculate nPr",
    seoDescription: "Free online permutation calculator. Enter n and r to calculate nPr = n!/(n-r)! instantly, with a step-by-step formula breakdown.",
    keywords: ["permutation calculator", "npr calculator", "permutation formula", "n choose r", "combinatorics calculator"],
    ogTitle: "Permutation Calculator - Calculate nPr | ToolZoneX",
    ogDescription: "Calculate permutations (nPr) instantly with a step-by-step breakdown.",
    schemaName: "Permutation Calculator",
    schemaDescription: "Calculate the number of permutations (nPr) of r items chosen from n items.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between permutations and combinations?", answer: "Permutations count arrangements where order matters (ABC is different from BCA), while combinations count selections where order doesn't matter (ABC and BCA are considered the same group). Since every combination of r items can be arranged in r! different orders, nPr is always r! times larger than nCr for the same n and r." }, { question: "What does 0! (zero factorial) equal?", answer: "0! is defined as 1 by convention. This makes formulas like nPr work correctly even when r equals n (choosing and arranging every item), since (n − n)! = 0! = 1." }, { question: "What happens if r is greater than n?", answer: "It's not possible to arrange more items than exist in the set, so nPr is undefined when r > n. This calculator shows an error message in that case instead of a numeric result." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
