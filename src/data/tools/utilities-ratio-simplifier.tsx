import TuneIcon from '@mui/icons-material/Tune';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/ratio-simplifier",
    navName: "Ratio Simplifier",
    navDescription: "Simplify any multi-term ratio using GCD.",
    name: "Ratio Simplifier - Reduce a Ratio to Lowest Terms",
    description: "Simplify a ratio of two or more numbers to its lowest whole-number terms using GCD reduction.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TuneIcon fontSize="large" color="primary"/>,
    seoTitle: "Ratio Simplifier - Reduce a Ratio to Lowest Terms",
    seoDescription: "Free ratio simplifier. Enter two or more numbers to reduce your ratio to its simplest whole-number form using GCD, with support for multi-term ratios.",
    keywords: ["ratio simplifier", "simplify ratio", "reduce ratio to lowest terms", "ratio simplifier calculator", "simplify a ratio calculator"],
    ogTitle: "Ratio Simplifier - Reduce a Ratio to Lowest Terms | ToolZoneX",
    ogDescription: "Simplify any ratio, with any number of terms, to its lowest form.",
    schemaName: "Ratio Simplifier",
    schemaDescription: "Simplify a ratio of two or more numbers to its lowest whole-number terms using GCD reduction.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the site's general Ratio Calculator?", answer: "The general Ratio Calculator handles exactly two numbers and also offers a \"Scale to Total\" mode for splitting a total by a ratio. This tool is a focused simplifier that accepts any number of terms — add as many rows as your ratio needs — for when you specifically want to simplify a multi-term ratio." }, { question: "Can I simplify a ratio with decimal numbers?", answer: "This tool rounds each term to the nearest whole number before finding the GCD, since GCD is a whole-number concept. For a ratio made of decimals, multiply every term by 10, 100, etc. first to make them whole numbers, then simplify." }, { question: "What does it mean if one of my terms is zero?", answer: "A zero term stays zero after simplifying — dividing zero by any GCD is still zero — as long as at least one other term is non-zero so a valid GCD can be found." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
