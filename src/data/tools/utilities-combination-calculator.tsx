import FunctionsIcon from '@mui/icons-material/Functions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/combination-calculator",
    navName: "Combination Calculator",
    navDescription: "Compute combinations (nCr) and permutations (nPr).",
    name: "Combination Calculator",
    description: "Compute combinations (nCr) and permutations (nPr) with exact integer results. Free online combination and permutation calculator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FunctionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Combination Calculator - nCr & nPr Permutation Calculator",
    seoDescription: "Free online combination and permutation calculator. Compute nCr combinations and nPr permutations with exact integer results.",
    keywords: ["combination calculator", "permutation calculator", "ncr calculator", "npr calculator", "n choose r", "combination and permutation"],
    ogTitle: "Combination Calculator - nCr & nPr | ToolZoneX",
    ogDescription: "Compute combinations (nCr) and permutations (nPr) with exact integer results.",
    schemaName: "Combination Calculator",
    schemaDescription: "Compute combinations (nCr) and permutations (nPr) with exact integer results.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
