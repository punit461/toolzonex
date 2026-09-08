import CheckroomIcon from '@mui/icons-material/Checkroom';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/neck-tie-length-guide",
    navName: "Neck Tie Length Guide",
    navDescription: "Recommended tie length based on your height.",
    name: "Neck Tie Length Guide",
    description: "Enter your height to get a recommended tie length using standard published men's-fashion guidelines, from short to extra-long (XL).",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CheckroomIcon fontSize="large" color="primary"/>,
    seoTitle: "Neck Tie Length Guide - Find Your Ideal Tie Length by Height",
    seoDescription: "Free online neck tie length guide. Enter your height to get a recommended standard, XL, or short tie length based on published fashion guidelines.",
    keywords: ["neck tie length guide", "tie length by height", "what tie length should I buy", "extra long tie length", "standard tie length chart"],
    ogTitle: "Neck Tie Length Guide - Find Your Ideal Tie Length by Height | ToolZoneX",
    ogDescription: "Enter your height to get a recommended tie length based on published fashion guidelines.",
    schemaName: "Neck Tie Length Guide",
    schemaDescription: "Enter your height to get a recommended tie length using standard published men's-fashion guidelines, from short to extra-long (XL).",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does tie length also depend on knot style?", answer: "Yes, to a smaller degree — bulkier knots like the Windsor use more fabric than a simple four-in-hand, which can make a tie sit slightly shorter than expected. This guide gives a solid starting point, but trying a specific tie with your preferred knot is the most reliable check." }, { question: "Where should a properly tied tie end?", answer: "The classic guideline is that the tip of the tie should just reach your belt buckle or the top of your waistband — noticeably shorter or longer than that usually looks off." }, { question: "Are there tie lengths made specifically for shorter people?", answer: "Yes — many brands offer shorter cuts specifically to avoid excess length, which this guide reflects for those under about 5'5\"." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
