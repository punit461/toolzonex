import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/label-printing-cost-calculator",
    navName: "Label Printing Cost Calculator",
    navDescription: "Roll-based label cost from rolls needed.",
    name: "Label Printing Cost Calculator",
    description: "Calculate bulk roll-based label printing cost from labels per roll, price per roll, and total labels needed.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Label Printing Cost Calculator - Roll-Based Pricing",
    seoDescription: "Free label printing cost calculator. Enter labels per roll, price per roll, and total labels needed to calculate rolls needed and total cost.",
    keywords: ["label printing cost calculator", "shipping label cost calculator", "roll of labels cost calculator", "product label pricing calculator", "how many rolls of labels do i need"],
    ogTitle: "Label Printing Cost Calculator - Roll-Based Pricing | ToolZoneX",
    ogDescription: "Calculate roll-based label printing cost from labels per roll, price per roll, and total labels needed.",
    schemaName: "Label Printing Cost Calculator",
    schemaDescription: "Calculate rolls needed by rounding up total labels needed divided by labels per roll, then total cost as rolls needed times price per roll.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Sticker Printing Cost Calculator?", answer: "The Sticker Printing Cost Calculator is for individual custom die-cut stickers, priced per unit with quantity-based discount tiers — a typical small-batch custom order model. This tool instead models bulk roll-based product or shipping labels, priced per roll rather than per individual sticker, which is how labels are typically purchased for higher-volume operational use like shipping or product packaging." }, { question: "Why round rolls up instead of buying a partial roll?", answer: "Rolls are sold as a fixed physical unit — you can't buy a fraction of a roll — so rounding up to the next whole roll ensures you have enough labels, with the small leftover surplus available for your next batch." }, { question: "Does a larger roll size always lower cost per label?", answer: "Not necessarily by itself — it depends on the price of that larger roll. Compare the total cost and resulting cost-per-label across different roll sizes and their respective prices to find the most economical option for your volume." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
