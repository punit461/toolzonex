import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/donation-list-generator",
    navName: "Donation List Generator",
    navDescription: "Track donated items with a running total estimated value.",
    name: "Donation List Generator",
    description: "Add donated items with estimated value, category, date, and organization, and get an organized list with a running total estimated value.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CardGiftcardIcon fontSize="large" color="primary"/>,
    seoTitle: "Donation List Generator - Track Charitable Donations",
    seoDescription: "Free donation list generator. Track donated items with estimated value, category, and organization, with a running total value.",
    keywords: ["donation list generator", "charitable donation tracker", "donation log maker", "goodwill donation list", "donation value tracker"],
    ogTitle: "Donation List Generator - Track Charitable Donations | ToolZoneX",
    ogDescription: "Track donated items with a running total estimated value.",
    schemaName: "Donation List Generator",
    schemaDescription: "Add donated items with estimated value, category, date, and organization, and get an organized list with a running total estimated value.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I use this list for official tax deduction documentation?", answer: "This tool is meant for personal record-keeping only — consult a tax professional for the official documentation and valuation requirements needed to claim a charitable deduction." }, { question: "How is the total estimated value calculated?", answer: "It's simply the sum of the estimated value you enter for every item in your list, updated automatically as you add, edit, or remove items." }, { question: "Is my donation list saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
