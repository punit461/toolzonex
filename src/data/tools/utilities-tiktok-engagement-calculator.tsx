import MusicNoteIcon from '@mui/icons-material/MusicNote';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/tiktok-engagement-calculator",
    navName: "TikTok Engagement Calculator",
    navDescription: "View-based TikTok engagement rate.",
    name: "TikTok Engagement Calculator",
    description: "Calculate your TikTok engagement rate from likes, comments, shares, and views, using TikTok's view-based engagement convention.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <MusicNoteIcon fontSize="large" color="primary"/>,
    seoTitle: "TikTok Engagement Calculator - View-Based Engagement Rate",
    seoDescription: "Free TikTok engagement calculator. Enter likes, comments, shares, and views to calculate your view-based TikTok engagement rate.",
    keywords: ["tiktok engagement calculator", "tiktok engagement rate", "tiktok views engagement", "calculate tiktok engagement", "tiktok creator metrics"],
    ogTitle: "TikTok Engagement Calculator - View-Based Engagement Rate | ToolZoneX",
    ogDescription: "Calculate your TikTok engagement rate from likes, comments, shares, and views.",
    schemaName: "TikTok Engagement Calculator",
    schemaDescription: "Calculate TikTok engagement rate as (likes + comments + shares) divided by views, TikTok's conventional view-based formula.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Instagram Engagement Calculator?", answer: "The Instagram Engagement Calculator measures engagement against followers, which fits Instagram's feed-driven, follower-based distribution model. TikTok content, by contrast, is primarily discovered through the algorithmic For You feed regardless of follower count, so its creator community conventionally measures engagement against views instead — this tool matches that TikTok-specific convention." }, { question: "Why use views instead of followers for TikTok?", answer: "A TikTok video can rack up far more views than a creator has followers if it goes viral on the For You page, so dividing by followers would produce a misleadingly high or unstable rate. Dividing by views instead reflects engagement relative to the actual audience that saw the content." }, { question: "Should I include video saves/bookmarks in this formula?", answer: "This calculator uses the standard likes + comments + shares formula common in TikTok creator reporting. Some creators additionally track saves separately as a signal of deeper interest, but it isn't part of the conventional engagement rate calculation used here." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
