import GrassIcon from '@mui/icons-material/Grass';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/lawn-seed-calculator",
    navName: "Lawn Seed Calculator",
    navDescription: "Grass seed needed for new lawns or overseeding.",
    name: "Lawn Seed Calculator",
    description: "Calculate how much grass seed is needed for a new lawn or overseeding, based on lawn area and seeding rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GrassIcon fontSize="large" color="primary"/>,
    seoTitle: "Lawn Seed Calculator - Grass Seed Needed by Area",
    seoDescription: "Free lawn seed calculator. Enter lawn area and application type (new lawn or overseeding) to calculate how much grass seed you need.",
    keywords: ["lawn seed calculator", "grass seed calculator", "how much grass seed do i need", "overseeding calculator", "new lawn seed calculator"],
    ogTitle: "Lawn Seed Calculator - Grass Seed Needed by Area | ToolZoneX",
    ogDescription: "Calculate how much grass seed is needed for a new lawn or overseeding based on lawn area.",
    schemaName: "Lawn Seed Calculator",
    schemaDescription: "Calculate seed needed in pounds as lawn area divided by 1000, times the seeding rate per 1000 square feet.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does a new lawn need so much more seed than overseeding?", answer: "A new lawn starts from bare soil, so every seed needs to establish and fill in the space on its own. Overseeding fills gaps in an already-established lawn, so a lighter rate is enough to thicken the turf without wasting seed or causing overcrowding." }, { question: "Should I use the exact rate this tool defaults to?", answer: "Treat the defaults as a reasonable general starting point — always check the seed bag's label for the specific grass species and blend you're using, since recommended rates vary by grass type, and adjust the rate field to match." }, { question: "Does this account for seed waste or uneven coverage?", answer: "No — it calculates the straightforward amount based on area and rate. Many gardeners buy a small extra margin (5-10%) to account for uneven spreading, wind, or birds eating exposed seed." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
