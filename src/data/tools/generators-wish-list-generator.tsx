import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/wish-list-generator",
    navName: "Wish List Generator",
    navDescription: "Organize wanted items by priority with a running total.",
    name: "Wish List Generator - Organize Items by Priority and Price",
    description: "Add wanted items with estimated price, priority, and notes, and get them sorted by priority with a running total estimated cost.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CardGiftcardIcon fontSize="large" color="primary"/>,
    seoTitle: "Wish List Generator - Organize Items by Priority and Price",
    seoDescription: "Free online wish list generator. Add items with price and priority and get an organized wish list with a running total estimated cost.",
    keywords: ["wish list generator", "wishlist maker online", "gift wish list organizer", "priority wish list tool", "wish list with price tracker"],
    ogTitle: "Wish List Generator - Organize Items by Priority and Price | ToolZoneX",
    ogDescription: "Add items with price and priority and get an organized wish list with a running total.",
    schemaName: "Wish List Generator",
    schemaDescription: "Add wanted items with estimated price, priority, and notes, and get them sorted by priority with a running total estimated cost.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Bucket List Generator?", answer: "The Bucket List Generator randomly generates bucket-list experience ideas for inspiration (like \"go skydiving\"). This Wish List Generator instead organizes a personal list of specific items you already want to buy, complete with price and priority tracking — it doesn't generate any ideas for you." }, { question: "Does the estimated total include items I haven't priced yet?", answer: "No — any item left with a blank price field is treated as $0 in the total, so fill in an estimate for every item you want reflected in the running total." }, { question: "Can I save my wish list for later?", answer: "Not automatically — the list resets on reload since nothing is stored on a server, so copy down your list or take a screenshot if you want to keep a lasting record." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
