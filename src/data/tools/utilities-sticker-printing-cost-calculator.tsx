import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/sticker-printing-cost-calculator",
    navName: "Sticker Printing Cost Calculator",
    navDescription: "Die-cut sticker cost with quantity discount tiers.",
    name: "Sticker Printing Cost Calculator",
    description: "Calculate custom die-cut sticker printing cost from size and quantity using an illustrative tiered per-unit pricing table.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalOfferIcon fontSize="large" color="primary"/>,
    seoTitle: "Sticker Printing Cost Calculator - Quantity Discount Tiers",
    seoDescription: "Free sticker printing cost calculator. Pick a sticker size and quantity to estimate total cost and cost per sticker with quantity discount tiers.",
    keywords: ["sticker printing cost calculator", "how much do custom stickers cost", "die cut sticker price calculator", "sticker cost per unit calculator", "custom sticker pricing"],
    ogTitle: "Sticker Printing Cost Calculator - Quantity Discount Tiers | ToolZoneX",
    ogDescription: "Estimate custom die-cut sticker printing cost from size and quantity with tiered pricing.",
    schemaName: "Sticker Printing Cost Calculator",
    schemaDescription: "Estimate sticker printing cost by applying an illustrative per-unit price tier based on quantity and a size multiplier, then multiplying by quantity.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Are these real printer prices?", answer: "No — the per-unit price table and size multipliers used here are illustrative example figures for estimation purposes, not any specific printer's actual pricing. Real sticker pricing varies by printer, material, finish (glossy, matte, holographic), and shape complexity, so always check an actual quote for a precise cost." }, { question: "How is this different from the Label Printing Cost Calculator?", answer: "This tool is for individual custom die-cut stickers, priced per unit with quantity-based discount tiers — a typical model for small-batch custom stickers. The Label Printing Cost Calculator instead models bulk roll-based product or shipping labels, priced per roll rather than per individual unit — a different real-world purchasing model entirely." }, { question: "Why does a larger sticker cost more per unit?", answer: "Larger stickers use more material and vinyl per piece and often take longer to cut, which is reflected here as a size multiplier applied on top of the base quantity-tier price." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
