import BoltIcon from '@mui/icons-material/Bolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/dare-generator",
    navName: "Dare Generator",
    navDescription: "Random dares for parties & game night.",
    name: "Dare Generator",
    description: "Generate a random dare challenge by category — Mild, Adventurous, or Silly — for a dares-only party game.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Dare Generator - Random Dares for Parties & Game Night",
    seoDescription: "Free dare generator. Choose Mild, Adventurous, or Silly to generate a random dare challenge for parties, game night, or group hangouts.",
    keywords: ["dare generator", "random dare generator", "dares for party", "dare ideas", "dare challenge generator"],
    ogTitle: "Dare Generator - Random Dares for Parties & Game Night | ToolZoneX",
    ogDescription: "Generate a random dare challenge by category.",
    schemaName: "Dare Generator",
    schemaDescription: "Generate a random dare challenge by category — Mild, Adventurous, or Silly — for a dares-only party game.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Truth or Dare Generator?", answer: "The Truth or Dare Generator splits its content between truth questions and dare challenges. This tool is dare-only, with a larger, more varied set of dares organized into Mild, Adventurous, and Silly categories instead — use this one when you specifically want dares without any truth questions mixed in." }, { question: "Is the content appropriate for all ages?", answer: "Yes — every dare across all three categories is written to be family-friendly and suitable for a general audience. \"Adventurous\" simply means bolder and more active, not inappropriate." }, { question: "Can players skip a dare they do not like?", answer: "Yes — this is just a prompt generator. It is entirely up to your group's own house rules whether skipping is allowed, and what happens if someone does." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
