import CampaignIcon from '@mui/icons-material/Campaign';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/excuse-generator",
    navName: "Excuse Generator",
    navDescription: "Lighthearted random excuses.",
    name: "Excuse Generator - Work, School & Social",
    description: "Generate a random, lighthearted excuse by category — Work, School, or Social — framed clearly as entertainment and icebreaker content.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CampaignIcon fontSize="large" color="primary"/>,
    seoTitle: "Excuse Generator - Funny Work, School & Social Excuses",
    seoDescription: "Generate a random, lighthearted excuse by category — Work, School, or Social. Free online tool for jokes, icebreakers, and party games.",
    keywords: ["excuse generator", "funny excuse generator", "random excuse generator", "work excuse generator"],
    ogTitle: "Excuse Generator - Funny Work, School & Social Excuses | ToolZoneX",
    ogDescription: "Generate a random, lighthearted excuse by category — Work, School, or Social.",
    schemaName: "Excuse Generator",
    schemaDescription: "Generate a random, lighthearted excuse by category — Work, School, or Social — framed clearly as entertainment and icebreaker content.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Are these real excuses I should use?", answer: "No — every excuse here is intentionally over-the-top and meant purely as a joke or icebreaker, not a genuine reason to give a boss, teacher, or friend." }, { question: "Can I get the same excuse twice?", answer: "Yes — each click randomly selects from that category's list independently, so repeats are possible." }, { question: "Is this appropriate for a general audience?", answer: "Yes — every excuse is written to be lighthearted, family-friendly, and safe to share in any group setting." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
