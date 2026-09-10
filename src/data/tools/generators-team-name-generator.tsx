import GroupsIcon from '@mui/icons-material/Groups';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/team-name-generator",
    navName: "Team Name Generator",
    navDescription: "Themed random team name ideas.",
    name: "Team Name Generator - Sports, Gaming & More",
    description: "Generate random team names by theme — Sports, Gaming, Corporate, or Funny — combining adjectives and nouns from curated word lists.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GroupsIcon fontSize="large" color="primary"/>,
    seoTitle: "Team Name Generator - Sports, Gaming & Funny",
    seoDescription: "Generate random team names by theme — Sports, Gaming, Corporate, or Funny. Free online tool, five suggestions per click.",
    keywords: ["team name generator", "random team name generator", "sports team name generator", "funny team name generator", "cool team name generator", "gaming team name generator"],
    ogTitle: "Team Name Generator - Sports, Gaming & Funny | ToolZoneX",
    ogDescription: "Generate random team names by theme — Sports, Gaming, Corporate, or Funny.",
    schemaName: "Team Name Generator",
    schemaDescription: "Generate random team names by theme — Sports, Gaming, Corporate, or Funny — combining adjectives and nouns from curated word lists.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I generate more names in the same theme?", answer: "Yes — click \"Generate Team Names\" again for a new batch of five random suggestions in the same theme." }, { question: "Are the names checked for trademarks?", answer: "No — these are randomly generated suggestions for inspiration. Always check that a name isn't already trademarked or in use before committing to it." }, { question: "Can I mix and match parts of different suggestions?", answer: "Absolutely — feel free to combine the adjective from one suggestion with the noun from another." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
