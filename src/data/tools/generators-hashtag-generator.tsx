import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/hashtag-generator",
    navName: "Hashtag Generator",
    navDescription: "Extract hashtags from text.",
    name: "Hashtag Generator",
    description: "Extract keywords from text to generate SEO and social media hashtags instantly.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Hashtag Generator - Extract Tags from Text Online",
    seoDescription: "Extract keywords from text to generate SEO and social media hashtags instantly. Free online hashtag maker for Instagram and Twitter.",
    keywords: ["hashtag generator", "extract hashtags", "social media tags", "instagram hashtag maker", "seo tag generator"],
    ogTitle: "Hashtag Generator - Extract Tags from Text Online | ToolZoneX",
    ogDescription: "Extract keywords from text to generate SEO and social media hashtags instantly.",
    schemaName: "Hashtag Generator",
    schemaDescription: "Extract keywords from text to generate SEO and social media hashtags instantly.",
    applicationCategory: "SocialNetworkingApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
