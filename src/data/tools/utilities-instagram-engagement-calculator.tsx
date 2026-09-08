import FavoriteIcon from '@mui/icons-material/Favorite';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/instagram-engagement-calculator",
    navName: "Instagram Engagement Calculator",
    navDescription: "Measure likes/comments vs followers.",
    name: "Instagram Engagement Calculator",
    description: "Calculate your Instagram engagement rate from likes, comments, and followers. Free online engagement rate calculator with benchmarks.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FavoriteIcon fontSize="large" color="primary"/>,
    seoTitle: "Instagram Engagement Calculator - Engagement Rate",
    seoDescription: "Free online Instagram engagement calculator. Enter followers, likes, and comments to get your engagement rate and see how it benchmarks.",
    keywords: ["instagram engagement calculator", "engagement rate calculator", "instagram engagement rate", "calculate engagement rate", "social media engagement", "reach engagement"],
    ogTitle: "Instagram Engagement Calculator - Engagement Rate | ToolZoneX",
    ogDescription: "Measure your Instagram engagement rate and see where you stand.",
    schemaName: "Instagram Engagement Calculator",
    schemaDescription: "Calculate the Instagram engagement rate from likes, comments, and followers.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is engagement rate calculated?", answer: "The standard formula is total interactions (likes + comments, and optionally saves) divided by followers, multiplied by 100. An average post with 200 likes and 20 comments on an account with 10,000 followers has a 2.2% rate." }, { question: "What is a good engagement rate?", answer: "As a rough benchmark: under 1% is low, 1–3.5% is average, 3.5–6% is high, and above 6% is excellent for influencer-sized accounts. Benchmarks differ across niches." }, { question: "Should I include saves and shares?", answer: "Many marketers now weight saves and shares too, since they signal deeper interest. The calculator offers a 'total reactions' mode that includes saves." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
