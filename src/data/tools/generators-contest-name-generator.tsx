import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/contest-name-generator",
    navName: "Contest Name Generator",
    navDescription: "Generate catchy contest & giveaway names.",
    name: "Contest Name Generator",
    description: "Generate catchy name suggestions for a contest, giveaway, or competition, combining energetic adjectives with competition-style nouns.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <MilitaryTechIcon fontSize="large" color="primary"/>,
    seoTitle: "Contest Name Generator - Catchy Giveaway & Contest Names",
    seoDescription: "Free contest name generator. Get catchy suggestions for a contest, giveaway, or competition in one click.",
    keywords: ["contest name generator", "giveaway name generator", "competition name ideas", "catchy contest names", "sweepstakes name generator"],
    ogTitle: "Contest Name Generator - Catchy Giveaway & Contest Names | ToolZoneX",
    ogDescription: "Get catchy contest, giveaway, or competition name suggestions.",
    schemaName: "Contest Name Generator",
    schemaDescription: "Generate catchy name suggestions for a contest, giveaway, or competition, combining energetic adjectives with competition-style nouns.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Are these names ready to publish as-is?", answer: "Yes, most work fine directly, but feel free to tweak them with your brand name or a specific prize to make them more personal." }, { question: "Do these names include official contest rules or legal terms?", answer: "No — this tool only generates a name. You'll still need to write your own official rules, eligibility terms, and prize details separately, and check local regulations for running contests." }, { question: "Can I regenerate if I don't like the options?", answer: "Yes — click \"Regenerate\" as many times as you like for a fresh batch of 5 names." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
