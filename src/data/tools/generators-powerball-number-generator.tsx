import CasinoIcon from '@mui/icons-material/Casino';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/powerball-number-generator",
    navName: "Powerball Number Generator",
    navDescription: "Generate random Powerball-style ticket numbers.",
    name: "Powerball Number Generator",
    description: "Generate random Powerball-style tickets — 5 unique numbers from 1-69 plus a Powerball from 1-26. For entertainment only, not affiliated with any official lottery.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CasinoIcon fontSize="large" color="primary"/>,
    seoTitle: "Powerball Number Generator - Random Quick Pick Numbers",
    seoDescription: "Free Powerball number generator. Instantly generate random Quick Pick-style tickets (5 numbers 1-69 + Powerball 1-26). Generate up to 20 tickets at once.",
    keywords: ["powerball number generator", "powerball numbers", "random powerball numbers", "powerball quick pick", "powerball number picker", "lottery number generator"],
    ogTitle: "Powerball Number Generator - Random Quick Pick Numbers | ToolZoneX",
    ogDescription: "Generate random Powerball-style tickets — 5 unique numbers from 1-69 plus a Powerball from 1-26.",
    schemaName: "Powerball Number Generator",
    schemaDescription: "Generate random Powerball-style tickets — 5 unique numbers from 1-69 plus a Powerball from 1-26.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Are these real Powerball winning numbers?", answer: "No. These are randomly generated for entertainment and planning purposes only. Official Powerball winning numbers are drawn live by the Multi-State Lottery Association." }, { question: "How does the Powerball number range work?", answer: "White balls are chosen from 1 to 69 (5 unique numbers), and the red Powerball is chosen separately from 1 to 26." }, { question: "Does picking my own numbers improve my odds?", answer: "No — every number and every combination in an official drawing has exactly the same probability, whether you pick numbers yourself or use a Quick Pick." }, { question: "Can I generate multiple tickets at once?", answer: "Yes — choose 1, 5, or 10 tickets, or generate again for up to 20, to quickly build numbers for a group play or pool." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
