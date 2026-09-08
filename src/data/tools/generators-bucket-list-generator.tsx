import StarIcon from '@mui/icons-material/Star';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/bucket-list-generator",
    navName: "Bucket List Generator",
    navDescription: "Generate random bucket list ideas to try.",
    name: "Bucket List Generator",
    description: "Generate a random mix of bucket-list ideas across Adventure, Travel, Personal Growth, and more, and keep the ones you like.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <StarIcon fontSize="large" color="primary"/>,
    seoTitle: "Bucket List Generator - Random Bucket List Ideas",
    seoDescription: "Generate a random mix of bucket-list ideas across Adventure, Travel, Personal Growth, and more. Free online bucket list idea generator.",
    keywords: ["bucket list generator", "bucket list ideas", "life goals generator", "things to do before you die", "bucket list maker"],
    ogTitle: "Bucket List Generator - Random Bucket List Ideas | ToolZoneX",
    ogDescription: "Generate a random mix of bucket-list ideas across Adventure, Travel, Personal Growth, and more.",
    schemaName: "Bucket List Generator",
    schemaDescription: "Generate a random mix of bucket-list ideas across Adventure, Travel, Personal Growth, and more, and keep the ones you like.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Will I see the same 10 ideas every time?", answer: "No — each click of Generate or Regenerate randomly selects 10 ideas from the full pool of around 50, so results vary each time." }, { question: "Are the checked ideas saved anywhere?", answer: "No — kept ideas are only tracked while you have the page open and reset if you reload, so copy down any ideas you want to keep permanently." }, { question: "Can I get more than 10 ideas at once?", answer: "Not in a single batch, but you can keep clicking Regenerate to see different random selections until you've seen everything in the pool." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
